<script lang="ts" setup>
import { computed, ref } from "vue";
import constants from "@/Utils/constants";
import { shareOn } from "@/Utils/functions";
import { copyToClipboard } from "quasar";

const { slug, name, current } = defineProps({
	slug: {
		type: String
	},
	name: {
		type: String
	},
	current: {
		type: Boolean,
		default: () => false
	},
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		default: () => "Olha que artigo legal"
	},
	asRow: {
		type: Boolean,
		default: () => false
	}
});

const shareLink = computed(() => {
	if (current) return window.location.href;
	if (slug) return route("blog.show", { slug });
	if (name) return route(name);
	return route("home");
});
const showingShareLinkTooltip = ref(false);

const copyShareLink = () =>
	copyToClipboard(shareLink.value).then(() => {
		showingShareLinkTooltip.value = true;
		setTimeout(() => (showingShareLinkTooltip.value = false), 1500);
	});
</script>

<template>
	<div
		:class="asRow ? 'bg-white' : 'q-mx-sm q-mt-lg'"
		style="position: sticky; top: 70px; z-index: 999; align-self: flex-start"
	>
		<div :class="{ column: !asRow, row: asRow }" class="items-start q-gutter-sm">
			<q-btn icon="link" unelevated flat round @click="copyShareLink">
				<q-tooltip
					no-parent-event
					anchor="top middle"
					self="bottom middle"
					v-model="showingShareLinkTooltip"
					class="bg-green-8"
				>
					Copiado para a área de transferência!
				</q-tooltip>
			</q-btn>
			<a
				v-for="[type, icon] in Object.entries(constants.SHARE_BUTTONS_ICONS)"
				:key="type"
				:href="shareOn(type, title, shareLink, text) ?? '/'"
				target="_blank"
				class="text-reset"
			>
				<q-btn :icon="icon" round unelevated flat />
			</a>
		</div>
	</div>
</template>
