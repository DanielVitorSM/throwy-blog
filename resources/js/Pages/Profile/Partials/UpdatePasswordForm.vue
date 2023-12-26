<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";

const form = useForm({
	current_password: "",
	password: "",
	password_confirmation: ""
});

const updatePassword = () => {
	form.put(route("profile.change_password"), {
		preserveScroll: true,
		onSuccess: () => form.reset()
	});
};
</script>

<template>
	<section>
		<h4 class="text-h6 q-my-none q-mb-md">Alterar senha</h4>

		<p>
			Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer
			segura.
		</p>

		<q-form
			style="max-width: 400px"
			class="column items-start q-col-gutter-md"
			@submit.prevent="updatePassword"
		>
			<q-input
				v-model="form.current_password"
				borderless
				class="full-width"
				label="Senha atual"
				hide-bottom-space
				dense
				type="password"
				@blur="form.clearErrors()"
				outlined
				:error="Boolean(form.errors.current_password)"
				:error-message="form.errors.current_password"
			/>

			<q-input
				v-model="form.password"
				borderless
				label="Senha nova"
				type="password"
				hide-bottom-space
				dense
				@blur="form.clearErrors()"
				outlined
				class="full-width"
				:error="Boolean(form.errors.password)"
				:error-message="form.errors.password"
			/>

			<q-input
				v-model="form.password_confirmation"
				borderless
				label="Confirmar senha nova"
				hide-bottom-space
				dense
				type="password"
				class="full-width"
				@blur="form.clearErrors()"
				outlined
				:error="Boolean(form.errors.password_confirmation)"
				:error-message="form.errors.password_confirmation"
			/>

			<div>
				<q-btn
					:disable="form.processing"
					no-caps
					label="Salvar"
					color="primary"
					type="submit"
					unelevated
				/>
			</div>
		</q-form>
	</section>
</template>
