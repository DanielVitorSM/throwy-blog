<script setup lang="ts">
import { useForm } from "@inertiajs/vue3";
import { useQuasar } from "quasar";

const $q = useQuasar();

const form = useForm({
	password: ""
});

const confirmUserDeletion = () => {
	$q.dialog({
		title: "Remover conta",
		message: "Para remover sua conta é necessário confirmar sua senha",
		prompt: {
			model: "",
			type: "text"
		},
		cancel: true,
		persistent: true
	}).onOk((data) => {
		const dialog = $q.dialog({
			message: "Removendo...",
			progress: true,
			persistent: true,
			ok: false
		});

		form.password = data;

		form.delete(route("profile.destroy"), {
			preserveScroll: true,
			onSuccess: () => dialog.hide()
		});
	});
};
</script>

<template>
	<section>
		<h4 class="text-h6 q-my-none q-mb-md">Remover conta</h4>
		<p>
			Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos
			permanentemente. Antes de excluir sua conta, baixe quaisquer dados ou informações que
			você deseja reter.
		</p>
		<q-btn no-caps label="Remover conta" color="negative" @click="confirmUserDeletion" unelevated />
	</section>
</template>
