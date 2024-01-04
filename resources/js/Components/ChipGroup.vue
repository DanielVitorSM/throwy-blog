<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import type { PropType } from "vue";

type ItemType = {
	[key: string]: any;
};

defineProps({
	items: {
		type: Array as PropType<ItemType[]>,
		required: true
	},
	routeName: {
		type: String,
		required: true
	},
	labelName: {
		type: String,
		default: () => "name"
	},
	keyName: {
		type: String,
		default: () => "id"
	},
	title: {
		type: String,
		default: () => "Descubra"
	}
});
</script>

<template>
	<div class="column items-start q-mb-xl">
		<b class="text-h6">{{ title }}</b>

		<div class="row q-gutter-s q-mt-sm q-mb-md">
			<Link
				v-for="(item, i) in items"
				:key="i"
				:data="{ search: item[labelName] }"
				class="text-reset"
				:href="`${$route('home')}`"
			>
				<q-chip class="q-ml-none bg-gray-6">
					{{ item[labelName] }}
				</q-chip>
			</Link>
		</div>

		<!-- <q-btn
			flat
			no-caps
			unelevated
			padding="none"
			class="no-hover"
			icon-right="arrow_forward"
			label="Ver todos"
		/> -->
	</div>
</template>
