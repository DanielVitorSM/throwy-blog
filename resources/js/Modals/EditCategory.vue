<script lang="ts" setup>
import { useDialogPluginComponent } from "quasar";
import { router, useForm } from "@inertiajs/vue3";
import { ref, type PropType, onMounted } from "vue";

const loading = ref(false);
const { dialogRef, onDialogCancel, onDialogHide, onDialogOK } = useDialogPluginComponent();

const form = useForm({
	name: "",
	slug: ""
});

const { categoryId } = defineProps({
	categoryId: String
});

onMounted(() => {
	if (categoryId) {
		loading.value = true;
		axios
			.get<Response<Category>>(route("categories.show", { id: categoryId }))
			.then((res) => {
				const { body } = res.data;

				form.name = body.name;
				form.slug = body.slug;
			})
			.catch(() => onDialogHide())
			.finally(() => (loading.value = false));
	}
});

const save = () => {
	const formRoute = categoryId
		? route("categories.update", { id: categoryId })
		: route("categories.store");
	const method = categoryId ? "put" : "post";

	form[method](formRoute, {
		onSuccess: () => onDialogOK(),
		headers: {
			"X-Reload": "1"
		}
	});
};

const remove = () => {
	form.delete(route("categories.destroy", { id: categoryId }), {
		onSuccess: () => onDialogOK(),
		headers: {
			"X-Reload": "1"
		}
	});
};
</script>

<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide" :persistent="form.processing">
		<q-card style="max-width: 350px; width: 100%">
			<q-card-section>
				<div class="text-h6">
					{{ categoryId ? "Editar categoria" : "Adicionar categoria" }}
				</div>
			</q-card-section>

			<q-form @submit.prevent="() => save()">
				<q-card-section class="q-pt-none q-gutter-md">
					<q-input
						dense
						v-model="form.name"
						:loading="loading"
						autofocus
						:disabled="form.processing"
						label="Nome"
						:error="Boolean(form.errors.name)"
						outlined
						@blur="form.clearErrors()"
						hide-bottom-space
						:error-message="form.errors.name"
					/>

					<q-input
						v-if="categoryId"
						dense
						@blur="form.clearErrors()"
						v-model="form.slug"
						:loading="loading"
						autofocus
						:disabled="form.processing"
						label="Slug"
						:error="Boolean(form.errors.slug)"
						outlined
						hide-bottom-space
						:error-message="form.errors.slug"
					/>
				</q-card-section>
			</q-form>

			<q-card-actions>
				<q-btn
					:disable="form.processing"
					v-if="categoryId"
					color="negative"
					@click="remove"
					flat
					label="Remover"
				/>
				<q-space />
				<q-btn
					:disable="form.processing"
					@click="onDialogCancel"
					flat
					label="Cancelar"
					v-close-popup
				/>
				<q-btn
					color="primary"
					@click="save"
					:disable="form.processing || loading"
					flat
					label="Salvar"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
