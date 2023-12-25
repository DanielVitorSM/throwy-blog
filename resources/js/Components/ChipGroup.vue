<script setup lang="ts">
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
			<q-chip class="q-ml-none bg-gray-6" v-for="item in items">
				{{ item[labelName] }}
			</q-chip>
		</div>

		<q-btn
			flat
			no-caps
			unelevated
			padding="none"
			class="no-hover"
			icon-right="arrow_forward"
			label="Ver todos"
		/>
	</div>
</template>
