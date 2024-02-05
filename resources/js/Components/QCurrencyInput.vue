<script setup lang="ts">
import { useCurrencyInput, CurrencyDisplay, ValueScaling } from "vue-currency-input";
import { watch } from "vue";
import constants from "@/Utils/constants";

const props = defineProps({
	modelValue: Number
});

const { inputRef, formattedValue, setValue } = useCurrencyInput(constants.CURRENCY_CONFIG);

watch(
	() => props.modelValue,
	(value) => setValue(value ?? 0)
);
</script>

<template>
	<q-input ref="inputRef" v-model="formattedValue" outlined>
		<template v-for="(_, name) in ($slots as {})" #[name]="slotData: any">
			<slot :name="name" v-bind="slotData || {}" />
		</template>
	</q-input>
</template>
