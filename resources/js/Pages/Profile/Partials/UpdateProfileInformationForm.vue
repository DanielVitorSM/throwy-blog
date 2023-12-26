<script setup lang="ts">
import { useForm, usePage } from "@inertiajs/vue3";
import Cropper from "@/Components/Cropper.vue";
import { computed } from "vue";

const page = usePage<PageProps>();
const user = computed(() => page.props.auth.user);

const form = useForm({
	_method: "PATCH",
	name: user.value?.name ?? "",
	email: user.value?.email ?? "",
	slug: user.value?.slug ?? "",
	description: user.value?.description ?? "",
	avatar: undefined
});
</script>

<template>
	<section>
		<h4 class="text-h6 q-my-none q-mb-md">Dados pessoais</h4>

		<q-form
			style="max-width: 400px"
			class="column items-start q-col-gutter-md"
			@submit.prevent="form.post($route('profile.update'))"
		>
			<Cropper :aspect-ratio="1" v-model="form.avatar">
				<template v-slot:button="{ getFile, previewSrc }">
					<div class="row items-center q-gutter-md">
						<q-avatar v-if="(user && user.avatar) || previewSrc" size="60px">
							<img v-if="previewSrc" :src="previewSrc" />
							<img v-else-if="user && user.avatar" :src="user.avatar" />
						</q-avatar>

						<q-avatar v-else size="60px" icon="face" color="grey-5" />
						<q-btn dense @click="getFile" no-caps flat color="primary">
							{{ !(previewSrc || user?.avatar) ? "Adicionar" : "Alterar" }}
						</q-btn>
					</div>
				</template>
			</Cropper>

			<q-input
				v-model="form.name"
				label="Nome"
				hide-bottom-space
				dense
				class="full-width"
				@blur="form.clearErrors()"
				outlined
				:error="Boolean(form.errors.name)"
				:error-message="form.errors.name"
			/>

			<q-input
				v-model="form.slug"
				label="Slug"
				class="full-width"
				hide-bottom-space
				dense
				@blur="form.clearErrors()"
				outlined
				:error="Boolean(form.errors.slug)"
				:error-message="form.errors.slug"
			/>

			<q-input
				v-model="form.email"
				label="Email"
				hide-bottom-space
				dense
				class="full-width"
				@blur="form.clearErrors()"
				outlined
				type="email"
				:error="Boolean(form.errors.email)"
				:error-message="form.errors.email"
			/>

			<q-input
				v-model="form.description"
				label="Descrição"
				type="textarea"
				:rows="3"
				hide-bottom-space
				class="full-width"
				dense
				@blur="form.clearErrors()"
				outlined
				:error="Boolean(form.errors.description)"
				:error-message="form.errors.description"
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
