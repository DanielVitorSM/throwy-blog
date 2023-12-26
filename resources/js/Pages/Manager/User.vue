<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, useForm, router } from "@inertiajs/vue3";
import { useQuasar, type QEditorProps, QSelect, QEditor } from "quasar";
import { ref, type PropType, computed } from "vue";
import Cropper from "@/Components/Cropper.vue";
import { formatDatetime } from "@/Utils/functions";
import ExpansionCard from "@/Components/ExpansionCard.vue";

const $q = useQuasar();

const { user } = defineProps({
	user: {
		type: Object as PropType<User>
	},
	roles: {
		type: Object,
		required: true
	}
});

const form = useForm({
	_method: user ? "PUT" : "POST",
	name: user?.name ?? "",
	slug: user?.slug ?? "",
	description: user?.description ?? "",
	avatar: user?.avatar ?? "",
	email: user?.email ?? null,
	password: "",
	password_confirmation: "",
	role: user?.role ?? "reader"
});

const save = () => {
	const formRoute = user ? route("users.update", { id: user.id }) : route("users.store");
	const headers = user ? { "X-Reload": "true" } : undefined;
	form.post(formRoute, { headers });
};

const title = computed(() => (user ? "Editar usuário" : "Novo usuário"));
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
							<Cropper :aspect-ratio="1" v-model="form.avatar">
								<template v-slot:button="{ getFile, previewSrc }">
									<div class="row items-center q-gutter-md">
										<q-avatar
											v-if="(user && user.avatar) || previewSrc"
											size="60px"
										>
											<img v-if="previewSrc" :src="previewSrc" />
											<img
												v-else-if="user && user.avatar"
												:src="user.avatar"
											/>
										</q-avatar>

										<q-avatar v-else size="60px" icon="face" color="grey-5" />
										<q-btn dense @click="getFile" no-caps flat color="primary">
											{{
												!(previewSrc || user?.avatar)
													? "Adicionar"
													: "Alterar"
											}}
										</q-btn>
									</div>
								</template>
							</Cropper>
						</div>

						<div class="col-12 col-md-6">
							<q-input
								hide-bottom-space
								outlined
								dense
								@blur="form.clearErrors()"
								v-model="form.name"
								label="Nome"
								:error="Boolean(form.errors.name)"
								:error-message="form.errors.name"
							/>
						</div>

						<div class="col-12 col-md-6">
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
								v-model="form.email"
								label="Email"
								type="email"
								:error="Boolean(form.errors.email)"
								:error-message="form.errors.email"
							/>
						</div>

						<div class="col-12 col-md-6">
							<q-input
								hide-bottom-space
								dense
								@blur="form.clearErrors()"
								outlined
								v-model="form.password"
								label="Senha"
								type="password"
								:error="Boolean(form.errors.password)"
								:error-message="form.errors.password"
							/>
						</div>

						<div class="col-12 col-md-6">
							<q-input
								hide-bottom-space
								dense
								@blur="form.clearErrors()"
								outlined
								v-model="form.password_confirmation"
								label="Confirmar senha"
								type="password"
								:error="Boolean(form.errors.password_confirmation)"
								:error-message="form.errors.password_confirmation"
							/>
						</div>

						<div class="col-12">
							<q-input
								hide-bottom-space
								dense
								@blur="form.clearErrors()"
								outlined
								v-model="form.description"
								label="Descrição"
								type="textarea"
								:rows="3"
								:error="Boolean(form.errors.description)"
								:error-message="form.errors.description"
							/>
						</div>
					</section>
				</div>

				<div class="col-12 col-md-4">
					<section class="row">
						<div class="col-12 q-gutter-md">
							<ExpansionCard model-value label="Salvar">
								<div v-if="!user">
									<p class="q-ma-none">
										Após adicionado, o usuário estará apto a entrar no sistema
										utilizando as credenciais informadas. Recomenda-se que o
										mesmo altere sua senha após entrar pela primeira vez.
									</p>
								</div>
								<div
									v-if="user && user.last_login_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Último login em:</span>
									<span class="text-bold">
										{{ formatDatetime(user.last_login_at) }}
									</span>
								</div>

								<div
									v-if="user && user.created_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Criado em:</span>
									<span class="text-bold">
										{{ formatDatetime(user.created_at) }}
									</span>
								</div>

								<div
									v-if="user && user.updated_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Atualizado em:</span>
									<span class="text-bold">
										{{ formatDatetime(user.updated_at) }}
									</span>
								</div>

								<div
									v-if="user && user.deleted_at"
									class="row q-gutter-xs items-center"
								>
									<q-icon name="event" color="grey-8" />
									<span>Arquivado em:</span>
									<span class="text-bold">
										{{ formatDatetime(user.deleted_at) }}
									</span>
								</div>

								<template v-slot:footer>
									<q-btn
										:disable="form.processing"
										dense
										v-if="user"
										flat
										no-caps
										unelevated
										:label="
											user.deleted_at ? 'Remover permanentemente' : 'Remover'
										"
										color="negative"
										@click="
											() =>
												router.delete(
													$route('users.destroy', { id: user?.id })
												)
										"
									/>
									<q-space />
									<q-btn
										:percentage="form.progress ? form.progress.percentage : 100"
										:disable="form.processing"
										dense
										no-caps
										@click="save"
										unelevated
										color="primary"
									>
										{{ user ? "Atualizar" : "Adicionar" }}
									</q-btn>
								</template>
							</ExpansionCard>
							<ExpansionCard
								model-value
								:error-message="form.errors.role"
								label="Tipo de Acesso"
							>
								<q-option-group
									v-model="form.role"
									dense
									type="radio"
									size="sm"
									:options="
										Object.entries(roles).map(([v, k]) => ({
											label: k,
											value: v
										}))
									"
									color="primary"
								/>
							</ExpansionCard>
						</div>
					</section>
				</div>
			</q-form>
		</section>
	</AuthenticatedLayout>
</template>
