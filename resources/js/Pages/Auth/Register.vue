<script setup lang="ts">
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { requiredRule, minLengthRule, confirmPasswordRule, emailRule } from "@/Utils/validations";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import route from 'ziggy-js'

const form = useForm({
	name: "",
	email: "",
	password: "",
	password_confirmation: "",
	terms: false
});

const submit = () => {
	form.post(route("register"), {
		onFinish: () => form.reset("password", "password_confirmation")
	});
};

const showPassword = ref(false);
</script>

<template>
	<GuestLayout>
		<Head title="Cadastrar"></Head>

		<q-page padding class="items-center">
			<section class="row justify-center">
				<div class="col-12 column q-col-gutter-md" style="max-width: 400px">
					<h1 class="q-ma-none text-bold text-h5 text-center">Cadastrar</h1>

					<div class="q-gutter-md row items-center justify-center">
						<q-btn unelevated class="q-px-lg q-py-md" size="sm" color="google" icon="fa-brands fa-google" />
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
					</div>

					<q-form @submit.prevent="submit" class="q-gutter-md column">
						<q-input
							hide-bottom-space
							outlined
							v-model="form.name"
							label="Nome"
							lazy-rules
							:rules="[requiredRule]"
						/>

						<q-input
							hide-bottom-space
							outlined
							v-model="form.email"
							label="Email"
							lazy-rules
							:rules="[requiredRule, emailRule]"
						/>

						<q-input
							hide-bottom-space
							outlined
							v-model="form.password"
							label="Senha"
							lazy-rules
							:type="showPassword ? 'text' : 'password'"
							:rules="[requiredRule, minLengthRule(6)]"
						>
							<template v-slot:append>
								<q-icon
									:name="!showPassword ? 'visibility_off' : 'visibility'"
									class="cursor-pointer"
									@click="showPassword = !showPassword"
								/>
							</template>
						</q-input>

						<q-input
							hide-bottom-space
							outlined
							v-model="form.password_confirmation"
							label="Confirmar Senha"
							reactive-rules
							lazy-rules
							:type="showPassword ? 'text' : 'password'"
							:rules="[requiredRule, (val) => confirmPasswordRule(val, form.password)]"
						/>

						<q-toggle v-model="form.terms" label="Li e concordo com os Termos e Condições" />

						<q-btn size="lg" no-caps unelevated label="Cadastrar" type="submit" color="primary" />
					</q-form>
                    
					<span class="text-dark text-body1 q-mt-md text-center">
						Já possui uma conta?
						<Link :href="route('login')" class="text-primary">Entre agora</Link>
						e continue de onde parou!
					</span>
				</div>
			</section>
		</q-page>
	</GuestLayout>
</template>
