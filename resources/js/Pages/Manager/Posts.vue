<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, router, Link } from "@inertiajs/vue3";
import { ref, type PropType } from "vue";
import { QTable } from "quasar";

const { active, pagination } = defineProps({
	posts: {
		type: Array as PropType<Post[]>,
		required: true
	},
	pagination: {
		type: Object as PropType<QTable["pagination"]>,
		required: true
	},
	active: {
		type: Boolean,
		default: () => true
	}
});

const columns: QTable["columns"] = [
	{
		name: "title",
		field: "title",
		label: "Título",
		align: "left",
		sortable: true
	},
	{
		name: "category",
		field: (val: Post) => val.category.name,
		label: "Categoria",
		align: "left"
	},
	{
		name: "author",
		field: (val: Post) => val.author.name,
		label: "Autor",
		align: "left"
	},
	{
		name: "views_count",
		field: "views_count",
		label: "Visualizações",
		align: "center",
		sortable: true
	},
	{
		name: "published",
		field: "published",
		label: "Publicado",
		align: "center",
		sortable: true
	},
	{
		name: "actions",
		field: (val: Post) => val,
		label: "Ações",
		align: "center"
	}
];

const loading = ref(false);

const onRequest = (props: any) => {
	const { page, rowsPerPage, sortBy, descending } = props.pagination;

	loading.value = true;
	router.reload({
		only: ["posts", "pagination"],
		preserveState: true,
		data: {
			page,
			rowsPerPage,
			sortBy,
			descending,
			active
		},
		onFinish: () => (loading.value = false)
	});
};
</script>

<template>
	<Head title="Todos os Posts" />

	<AuthenticatedLayout>
		<section class="q-mb-lg q-col-gutter-lg row items-center">
			<h2 class="text-bold text-h4 q-ma-none">Todos os Posts</h2>
			<q-space v-if="$q.screen.gt.xs" />

			<q-btn-group unelevated flat>
				<q-btn
					color="secondary"
					:outline="!active"
					:disable="loading || active"
					label="Ativos"
					unelevated
					no-caps
					@click="() => router.reload({ data: { active: true } })"
				/>
				<q-btn
					color="secondary"
					:outline="active"
					:disable="loading || !active"
					label="Arquivados"
					unelevated
					no-caps
					@click="() => router.reload({ data: { active: false } })"
				/>
			</q-btn-group>

			<Link :href="$route('posts.create')">
				<q-btn color="primary" :disable="loading" label="Novo" unelevated no-caps />
			</Link>
		</section>

		<section>
			<q-table
				flat
				class="full-width sticky-last-column"
				bordered
				:key="(+new Date()).toString(36)"
				@request="onRequest"
				:rows-per-page-options="[5, 10, 25, 50]"
				:loading="loading"
				binary-state-sort
				:rows="posts"
				:pagination="pagination"
				:columns="columns"
				row-key="id"
			>
				<template v-slot:body-cell-published="props">
					<q-td :props="props">
						<q-icon name="check" size="xs" color="green" v-if="props.value" />
						<q-icon name="close" size="xs" color="red" v-else />
					</q-td>
				</template>

				<template v-slot:body-cell-actions="props">
					<q-td :props="props">
						<q-btn icon="more_horiz" flat round>
							<q-menu>
								<q-list dense style="min-width: 100px">
									<Link :href="$route('blog.show', { slug: props.value.slug })">
										<q-item dense clickable v-close-popup>
											<q-item-section>Visualizar</q-item-section>
										</q-item>
									</Link>
									<Link :href="$route('posts.edit', { id: props.value.id })">
										<q-item dense clickable v-close-popup>
											<q-item-section>Editar</q-item-section>
										</q-item>
									</Link>

									<q-item
										v-if="props.value.deleted_at"
										@click="
											router.post(
												$route('posts.restore', { id: props.value.id }),
												{ headers: { 'X-Reload': 'true' } }
											)
										"
										dense
										clickable
										v-close-popup
									>
										<q-item-section>Restaurar</q-item-section>
									</q-item>
									<q-separator />

									<q-item
										@click="
											router.delete(
												$route('posts.destroy', { id: props.value.id }),
												{ headers: { 'X-Reload': 'true' } }
											)
										"
										dense
										clickable
										class="text-red-8"
										v-close-popup
									>
										<q-item-section>
											{{
												props.value.deleted_at
													? "Remover permanentemente"
													: "Remover"
											}}
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</section>
	</AuthenticatedLayout>
</template>
