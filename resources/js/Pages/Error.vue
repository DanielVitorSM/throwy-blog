<script lang="ts" setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { computed } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";

const { status } = defineProps({
	status: {
		type: String,
		required: true
	},
	type: {
		type: String,
		default: () => "guest"
	}
});

const options: { [key: number]: string } = {
	404: "Página não encontrada",
	403: "Você não tem permissões para acessar essa página",
	500: "Houve um erro no servidor, contate o administrador"
};

const message = computed(() => {
	if (status in options) return options[Number(status)];

	return "Contate o administrador";
});
</script>

<template>
	<Head :title="`${status} - ${message}`" />

	<AuthenticatedLayout v-if="type == 'manager'">
		<section
			style="min-height: calc(100vh - 180px)"
			class="column items-center full-width vh-100 justify-center text-center"
		>
			<span class="text-h1 text-bold q-mb-md">{{ status }}</span>
			<p class="q-ma-none text-h4 text-thin">{{ message }}</p>
		</section>
	</AuthenticatedLayout>

	<AppLayout v-else>
		<section
			style="min-height: calc(100vh - 180px)"
			class="column items-center full-width vh-100 justify-center text-center"
		>
			<span class="text-h1 text-bold q-mb-md">{{ status }}</span>
			<p class="q-ma-none text-h4 text-thin q-mb-lg">{{ message }}</p>
			<Link class="text-reset" :href="$route('home')">
				<q-btn label="Página inicial" color="primary" unelevated no-caps />
			</Link>
		</section>
	</AppLayout>
</template>
