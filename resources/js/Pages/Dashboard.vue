<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
</script>

<template>
	<Head title="Dashboard" />

	<AuthenticatedLayout>
		<section class="q-mb-md">
			<h2 class="text-bold text-h4 q-ma-none">Dashboard</h2>
		</section>
	</AuthenticatedLayout>
</template>
