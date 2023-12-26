<script setup lang="ts">
import { Head, useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import AppLayout from "@/Layouts/AppLayout.vue";

defineProps({
	canResetPassword: Boolean,
});

const form = useForm({
	email: "",
	password: "",
	remember: false
});

const onSubmit = () => {
	form.post(route("login"), {
		onFinish: () => form.reset("password")
	});
};

const showPassword = ref(false);
</script>

<template>
	<AppLayout>
		<Head title="Entrar"></Head>

		<q-page class="column">
			<section class="row full-height col-grow justify-center items-center">
				<div class="q-col-gutter-md fixed-container">
					<h1 class="q-ma-none text-bold text-h4">Entrar</h1>

					<!-- <div class="q-gutter-md row items-center justify-center">
						<q-btn
							unelevated
							class="q-px-lg q-py-md"
							size="sm"
							color="google"
							icon="fa-brands fa-google"
						/>
						<q-btn
							class="q-px-lg q-py-md"
							size="sm"
							color="facebook"
							unelevated
							icon="fa-brands fa-facebook"
						/>
					</div>

					<div class="q-mt-md">
						<span class="relative-position">
							<hr />
							<span class="absolute-center text-body1 bg-white q-px-sm">ou</span>
						</span>
					</div> -->

					<q-form @submit.prevent="onSubmit" class="q-gutter-md column">
						<q-input
							hide-bottom-space
							outlined
							v-model="form.email"
							label="Email"
							lazy-rules
							:error="Boolean(form.errors.email)"
							:error-message="form.errors.email"
							:disable="form.processing"
						/>

						<q-input
							hide-bottom-space
							outlined
							v-model="form.password"
							label="Senha"
							:type="showPassword ? 'text' : 'password'"
							lazy-rules
							:error="Boolean(form.errors.password)"
							:error-message="form.errors.password"
							:disable="form.processing"
						>
							<template v-slot:append>
								<q-icon
									:name="!showPassword ? 'visibility_off' : 'visibility'"
									class="cursor-pointer"
									@click="showPassword = !showPassword"
								/>
							</template>
						</q-input>

						<div class="row items-center justify-between" v-if="canResetPassword">
							<q-toggle v-model="form.remember" label="Manter-me conectado" />
							<!-- <a href="" class="text-primary text-right">Esqueceu a senha?</a> -->
						</div>

						<q-btn
							size="lg"
							no-caps
							unelevated
							label="Entrar"
							type="submit"
							:disable="form.processing"
							color="primary"
						/>
					</q-form>

					<!-- <span class="text-dark text-body1 q-mt-md text-center">
						Novo por aqui?
						<Link :href="$route('register')" class="text-primary">Crie sua conta</Link>
						e desfrute de um novo controle financeiro!
					</span> -->
				</div>
			</section>
		</q-page>
	</AppLayout>
</template>
