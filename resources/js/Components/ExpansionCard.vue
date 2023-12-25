<script lang="ts" setup>
import { type QExpansionItemProps } from "quasar";
import type { PropType } from "vue";

interface Props extends QExpansionItemProps {
	errorMessage?: string | undefined;
}

defineProps<Props>();
</script>

<template>
	<q-list bordered>
		<q-expansion-item
			v-bind="$props"
			:icon="errorMessage ? 'error' : ''"
			:header-class="!errorMessage ? 'text-bold' : 'text-bold text-negative'"
		>
			<q-card>
				<q-card-section v-if="$slots['default']" class="column">
					<slot></slot>
				</q-card-section>

				<q-separator v-if="$slots['footer'] && $slots['default']" />

				<q-card-actions v-if="$slots['footer']">
					<slot name="footer"></slot>
				</q-card-actions>
			</q-card>
		</q-expansion-item>

		<small v-if="errorMessage" class="text-negative">{{ errorMessage }}</small>
	</q-list>
</template>
