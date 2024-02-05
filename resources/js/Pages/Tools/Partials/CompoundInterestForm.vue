<script setup lang="ts">
import QCurrencyInput from "@/Components/QCurrencyInput.vue";
import { computed, ref } from "vue";
import { router, useForm } from "@inertiajs/vue3";

export interface ParamsType {
	initialValue: number;
	monthlyValue: number;
	feesTax: number;
	feesTaxType: "annually" | "monthly";
	period: number;
	periodType: "years" | "months";

	irrf: boolean;
	ipca?: number;
	ipcaType?: "annually" | "monthly";
}

const PERIOD_TYPES: { [key: string]: string } = {
	years: "Anos",
	months: "Meses"
};
const TAX_TYPES: { [key: string]: string } = {
	annually: "Anual",
	monthly: "Mensal"
};
const PARAMS: ParamsType = {
	initialValue: 0,
	monthlyValue: 0,
	feesTax: 0,
	feesTaxType: "annually",
	period: 0,
	periodType: "years",
	irrf: true,
	ipca: 0,
	ipcaType: "annually"
};

const form = useForm<ParamsType>(Object.assign({}, PARAMS));
const loading = ref(false);
const advanced = ref(false);

const changeTaxType = () =>
	(form.feesTaxType = form.feesTaxType == "annually" ? "monthly" : "annually");

const taxTypeLabel = computed(() => TAX_TYPES[form.feesTaxType]);

const changePeriodType = () => (form.periodType = form.periodType == "years" ? "months" : "years");

const periodTypeLabel = computed(() => PERIOD_TYPES[form.periodType]);

const changeIpcaType = () => (form.ipcaType = form.ipcaType == "annually" ? "monthly" : "annually");

const ipcaTypeLabel = computed(() => (form.ipcaType ? TAX_TYPES[form.ipcaType] : "Não encontrado"));

const submit = () => {
	loading.value = true;
	let data = form.data() as any;

	if (!advanced.value) {
		data.ipca = undefined;
		data.ipcaType = undefined;
		data.irrf = undefined;
	}
	router.reload({
		preserveState: true,
		data,
		onFinish: () => (loading.value = false)
	});
};

const reset = () => form.reset();
</script>

<template>
	<q-form @submit.prevent="submit" @reset="reset">
		<div class="row q-col-gutter-md">
			<div class="col-12 col-md-6">
				<q-currency-input
					stack-label
					:disable="loading"
					label="Valor inicial"
					v-model="form.initialValue"
				>
					<template v-slot:prepend>
						<q-icon name="attach_money" />
					</template>
				</q-currency-input>
			</div>
			<div class="col-12 col-md-6">
				<q-currency-input
					stack-label
					:disable="loading"
					label="Valor mensal"
					v-model="form.monthlyValue"
				>
					<template v-slot:prepend>
						<q-icon name="attach_money" />
					</template>
				</q-currency-input>
			</div>
			<div class="col-12 col-md-6">
				<q-input
					outlined
					stack-label
					label="Taxa de juros"
					mask="#,##"
					fill-mask="0"
					:disable="loading"
					reverse-fill-mask
					hide-bottom-space
					unmasked-value
					:rules="[(val) => Number(val) > 0 || 'Insira uma taxa de juros']"
					:model-value="String(form.feesTax * 100)"
					@update:model-value="(val) => (form.feesTax = Number(val) / 100)"
				>
					<template v-slot:prepend>
						<q-icon name="percent" />
					</template>

					<template v-slot:append>
						<q-btn
							:label="taxTypeLabel"
							@click="changeTaxType"
							no-caps
							:disable="loading"
							flat
							color="primary"
						/>
					</template>
				</q-input>
			</div>
			<div class="col-12 col-md-6">
				<q-input
					stack-label
					placeholder="0"
					:disable="loading"
					hide-bottom-space
					outlined
					label="Período em"
					type="number"
					:rules="[(val) => Number(val) > 0 || 'Insira um período']"
					:model-value="form.period <= 0 ? null : form.period"
					@update:model-value="(val) => (form.period = Number(val))"
				>
					<template v-slot:append>
						<q-btn
							:label="periodTypeLabel"
							@click="changePeriodType"
							no-caps
							:disable="loading"
							flat
							color="primary"
						/>
					</template>
				</q-input>
			</div>

			<div class="col-12">
				<q-expansion-item
					v-model="advanced"
					label="Opções avançadas"
					caption="Habilita o cálculo de juros reais e recolhimento de imposto de renda"
					class="full-width"
				>
					<div class="row q-col-gutter-md q-mt-xs">
						<div class="col-12 col-md-6">
							<q-input
								outlined
								stack-label
								label="IPCA médio"
								mask="#,##"
								fill-mask="0"
								:disable="loading && !advanced"
								reverse-fill-mask
								unmasked-value
								hide-bottom-space
								:model-value="String((form.ipca || 0) * 100)"
								@update:model-value="(val) => (form.ipca = Number(val) / 100)"
							>
								<template v-slot:prepend>
									<q-icon name="percent" />
								</template>

								<template v-slot:append>
									<q-btn
										:label="ipcaTypeLabel"
										@click="changeIpcaType"
										no-caps
										:disable="loading"
										flat
										color="primary"
									/>
								</template>
							</q-input>
						</div>

						<div class="col-12 col-md-6">
							<div class="row items-center h-100" style="height: 56px">
								<q-checkbox
									v-model="form.irrf"
									class="q-mr-sm"
									label="Considerar imposto de Renda"
								/>
								<q-icon name="info">
									<q-tooltip tri max-width="300px" class="text-caption">
										Caso essa seja uma aplicação de renda fixa, pode-se
										descontar o Imposto de Renda Retido na Fonte calculado
										segundo a
										<b>Tabela Regressiva</b>
										para obter uma melhor aproximação líquida.
									</q-tooltip>
								</q-icon>
							</div>
						</div>
					</div>
				</q-expansion-item>
			</div>

			<div class="col-12">
				<div class="row items-center justify-end q-gutter-md">
					<q-btn
						:disable="loading"
						label="Limpar"
						type="reset"
						no-caps
						flat
						color="grey-8"
					/>
					<q-btn
						:loading="loading"
						label="Calcular"
						type="submit"
						no-caps
						unelevated
						color="primary"
					/>
				</div>
			</div>
		</div>
	</q-form>
</template>
