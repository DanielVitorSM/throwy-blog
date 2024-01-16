<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, useForm, router, Link } from "@inertiajs/vue3";
import { useQuasar, type QEditorProps, QSelect, QEditor } from "quasar";
import { ref, type PropType, computed } from "vue";
import Cropper from "@/Components/Cropper.vue";
import { formatDatetime } from "@/Utils/functions";
import ExpansionCard from "@/Components/ExpansionCard.vue";
import EditCategory from "@/Modals/EditCategory.vue";

const $q = useQuasar();
const tagOptions = ref<Tag[]>([]);
const editorRef = ref<QEditor>();

const { post } = defineProps({
	post: {
		type: Object as PropType<Post>
	},
	categories: {
		type: Array as PropType<Category[]>,
		required: true
	},
	tags: {
		type: Array as PropType<Tag[]>
	}
});

const form = useForm({
	_method: post ? "PUT" : "POST",
	title: post?.title ?? "",
	slug: post?.slug ?? "",
	caption: post?.caption ?? "",
	content: post?.content ?? "",
	category_id: post?.category.id ?? null,
	tags: post?.tags.map((e) => e.name) ?? [],
	banner: undefined,
	published: post?.published ?? false
});

const toolbar: QEditorProps["toolbar"] = [
	["bold", "italic", "strike", "underline", "subscript", "superscript"],
	[
		{
			icon: $q.iconSet.editor.align,
			fixedLabel: true,
			list: "only-icons",
			options: ["left", "center", "right", "justify"]
		},
		"quote",
		"unordered",
		"ordered",
		"outdent",
		"indent"
	],
	[
		"hr",
		"link",
		{
			icon: $q.iconSet.editor.formatting,
			list: "no-icons",
			options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"]
		},
		{
			icon: $q.iconSet.editor.fontSize,
			fixedLabel: true,
			fixedIcon: true,
			list: "no-icons",
			options: ["size-1", "size-2", "size-3", "size-4", "size-5", "size-6", "size-7"]
		},
		'removeFormat'
	],
	["undo", "redo", "fullscreen", "viewsource"]
];

const addCategory = () => $q.dialog({ component: EditCategory });
const editCategory = (id: string) =>
	$q.dialog({ component: EditCategory, componentProps: { categoryId: id } });

const onAborFilterTags = () => {
	tagOptions.value = [];
};

const onFilterTags = (
	search: string,
	doneFn: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
	abortFn: () => void
) => {
	if (search.length <= 2) return abortFn();

	axios
		.get<Response<Tag[]>>(route("tags.index"), { params: { search } })
		.then((res) => {
			const { body } = res.data;
			doneFn(() => {
				tagOptions.value = body;
			});
		})
		.catch(() => abortFn());
};

const save = () => {
	const formRoute = post ? route("posts.update", { id: post.id }) : route("posts.store");
	const headers = post ? { "X-Reload": "true" } : undefined;
	form.post(formRoute, { headers });
};

const onPaste = (evt: any) => {
	if (evt.target.nodeName === "INPUT") return;
	if (!editorRef.value) return;
	let text, onPasteStripFormattingIEPaste;
	evt.preventDefault();
	evt.stopPropagation();

	if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
		text = evt.originalEvent.clipboardData.getData("text/plain");
		editorRef.value.runCmd("insertText", text);
	} else if (evt.clipboardData && evt.clipboardData.getData) {
		text = evt.clipboardData.getData("text/plain");
		editorRef.value.runCmd("insertText", text);
	} else if (window.clipboardData && window.clipboardData.getData) {
		if (!onPasteStripFormattingIEPaste) {
			onPasteStripFormattingIEPaste = true;
			editorRef.value.runCmd("ms-pasteTextOnly", text);
		}

		onPasteStripFormattingIEPaste = false;
	}
};

const title = computed(() => (post ? "Editar post" : "Novo post"));
</script>

<template>
	<Head :title="title" />

	<AuthenticatedLayout>
		<section class="q-mb-lg row items-center">
			<h2 class="text-bold text-h4 q-ma-none">{{ title }}</h2>
		</section>

		<section>
			<q-form @submit.prevent="save" class="row q-col-gutter-md">
				<div class="col-12 col-md-8">
					<section class="row q-col-gutter-md">
						<div class="col-12">
							<q-input
								hide-bottom-space
								outlined
								dense
								@blur="form.clearErrors()"
								v-model="form.title"
								label="Título"
								:error="Boolean(form.errors.title)"
								:error-message="form.errors.title"
							/>
						</div>

						<div class="col-12" v-if="post">
							<q-input
								hide-bottom-space
								outlined
								dense
								@blur="form.clearErrors()"
								v-model="form.slug"
								label="Slug"
								:error="Boolean(form.errors.slug)"
								:error-message="form.errors.slug"
							/>
						</div>

						<div class="col-12">
							<q-input
								hide-bottom-space
								dense
								@blur="form.clearErrors()"
								outlined
								v-model="form.caption"
								label="Legenda"
								type="textarea"
								:rows="3"
								:error="Boolean(form.errors.caption)"
								:error-message="form.errors.caption"
							/>
						</div>

						<div class="col-12 fixed-toolbar">
							<q-editor
								ref="editorRef"
								hide-bottom-space
								v-model="form.content"
								:dense="$q.screen.lt.md"
								@blur="form.clearErrors()"
								@paste="onPaste"
								:toolbar="toolbar"
								:toolbar-bg="form.errors.content ? 'negative' : ''"
								:toolbar-text-color="form.errors.content ? 'white' : ''"
							/>
							<small class="text-negative" v-if="form.errors.content">
								{{ form.errors.content }}
							</small>
						</div>
					</section>
				</div>

				<div class="col-12 col-md-4">
					<section class="row">
						<div class="col-12 q-gutter-md">
							<ExpansionCard model-value label="Publicar">
								<div
									v-if="post && post.author"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="person" color="grey-8" />
									<span>Autor:</span>
									<span class="text-bold">
										{{ post.author.name }}
									</span>
								</div>

								<div class="row q-gutter-xs items-center">
									<q-icon name="visibility" color="grey-8" />
									<span>Visibilidade:</span>
									<div>
										<span class="text-bold">
											{{ form.published ? "Público" : "Privado" }}
										</span>
										<q-btn dense icon="edit" size="sm" round flat>
											<q-popup-edit
												v-model="form.published"
												v-slot="scope"
												auto-save
											>
												<q-toggle v-model="scope.value" label="Público" />
											</q-popup-edit>
										</q-btn>
									</div>
								</div>

								<div
									v-if="post && post.published_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Publicado em:</span>
									<span class="text-bold">
										{{ formatDatetime(post.published_at) }}
									</span>
								</div>

								<div
									v-if="post && post.created_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Criado em:</span>
									<span class="text-bold">
										{{ formatDatetime(post.created_at) }}
									</span>
								</div>

								<div
									v-if="post && post.updated_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Atualizado em:</span>
									<span class="text-bold">
										{{ formatDatetime(post.updated_at) }}
									</span>
								</div>

								<div
									v-if="post && post.deleted_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Arquivado em:</span>
									<span class="text-bold">
										{{ formatDatetime(post.deleted_at) }}
									</span>
								</div>

								<template v-slot:footer>
									<q-btn
										:disable="form.processing"
										dense
										v-if="post"
										flat
										no-caps
										unelevated
										:label="
											post.deleted_at ? 'Remover permanentemente' : 'Remover'
										"
										color="negative"
										@click="
											() =>
												router.delete(
													$route('posts.destroy', { id: post?.id })
												)
										"
									/>
									<q-space />
									<Link
										v-if="post"
										:href="$route('blog.show', { slug: post?.slug })"
										class="q-mr-sm text-reset"
									>
										<q-btn
											:disable="form.processing"
											dense
											round
											unelevated
											icon="visibility"
											size="md"
										/>
									</Link>
									<q-btn
										:percentage="form.progress ? form.progress.percentage : 100"
										:disable="form.processing"
										dense
										no-caps
										@click="save"
										unelevated
										color="primary"
									>
										{{ post ? "Atualizar" : "Publicar" }}
									</q-btn>
								</template>
							</ExpansionCard>

							<ExpansionCard :error-message="form.errors.banner" label="Capa">
								<template v-slot:footer>
									<Cropper v-model="form.banner">
										<template v-slot:button="{ getFile, previewSrc }">
											<q-img
												class="q-mb-md rounded-borders"
												:src="previewSrc"
												v-if="previewSrc"
											/>
											<q-img
												class="q-mb-md rounded-borders"
												:src="post?.banner"
												v-else-if="post?.banner"
											/>
											<q-btn
												dense
												@click="getFile"
												no-caps
												flat
												color="primary"
											>
												{{
													!(previewSrc || post?.banner)
														? "Adicionar"
														: "Alterar"
												}}
											</q-btn>
										</template>
									</Cropper>
								</template>
							</ExpansionCard>

							<ExpansionCard label="Tags">
								<q-select
									placeholder="Adicionar tag"
									dense
									outlined
									class="full-width"
									hide-bottom-space
									:input-debounce="200"
									@filter="onFilterTags"
									@filter-abort="onAborFilterTags"
									:options="tagOptions"
									option-label="name"
									option-value="id"
									v-model="form.tags"
									:error="Boolean(form.errors.tags)"
									:error-message="form.errors.tags"
									use-input
									use-chips
									multiple
									hide-dropdown-icon
									new-value-mode="add-unique"
								/>
							</ExpansionCard>

							<ExpansionCard
								:error-message="form.errors.category_id"
								label="Categoria"
							>
								<q-option-group
									v-model="form.category_id"
									dense
									type="radio"
									size="sm"
									:options="
										categories.map((e) => ({ label: e.name, value: e.id }))
									"
									color="primary"
								>
									<template v-slot:label="opt">
										<div class="row items-center">
											<span
												@click.prevent.stop="() => editCategory(opt.value)"
												class="text-underline-hover"
											>
												{{ opt.label }}
											</span>
										</div>
									</template>
								</q-option-group>

								<template v-slot:footer>
									<q-btn @click="addCategory" dense no-caps flat color="primary">
										Adicionar
									</q-btn>
								</template>
							</ExpansionCard>
						</div>
					</section>
				</div>
			</q-form>
		</section>
	</AuthenticatedLayout>
</template>