<script setup lang="ts">
import { type ParamsType } from "@/Pages/Tools/Partials/CompoundInterestForm.vue";
import { computed, ref } from "vue";
import { exportTable, toCurrency, toFixed } from "@/Utils/functions";
import ApexCharts from "vue3-apexcharts";
import ptBr from "apexcharts/dist/locales/pt-br.json";
import type { QTable } from "quasar";

interface SerieType {
	real: number;
	irrfDiscount: number;
	total: number;
	invested: number;
	fees?: number;
	ipca: number;
	monthlyFees: number;
	label: String;
	realFees: number;
}

const IRRF_REGRESSIVE_TABLE = {
	0: 22.5,
	180: 20.0,
	360: 17.5,
	720: 15.0
};

const {
	period,
	periodType,
	ipca,
	ipcaType,
	feesTax,
	feesTaxType,
	initialValue,
	irrf,
	monthlyValue
} = defineProps<ParamsType>();

const tab = ref("charts");
const percentToMonth = (value: number) => (Math.pow(value / 100 + 1, 1 / 12) - 1) * 100;

const feesTaxPerMonth = computed<number>(() =>
	feesTaxType == "monthly" ? feesTax : percentToMonth(feesTax)
);
const ipcaTaxPerMonth = computed<number>(() =>
	ipcaType && ipca ? (ipcaType == "monthly" ? ipca : percentToMonth(ipca)) : 0
);
const periodInMonths = computed<number>(() => (periodType == "months" ? period : period * 12));
const formattedTaxType = computed<string>(() => (feesTaxType == "monthly" ? "mensal" : "anual"));
const formattedIpcaType = computed<string>(() => (ipcaType == "monthly" ? "mensal" : "anual"));
const formattedPeriodType = computed<string>(() => (periodInMonths.value > 1 ? "meses" : "mês"));

const calculateContributionsFees = (
	months: number,
	tax: number = feesTaxPerMonth.value,
	perMonth: number = monthlyValue
) => (tax === 0 ? perMonth * months : (perMonth * ((1 + tax) ** months - 1)) / tax);

const calculateInitialFees = (
	months: number,
	tax: number = feesTaxPerMonth.value,
	initial: number = initialValue
) => initial * (1 + tax) ** months;

const getIrrfTax = (months: number) => {
	const days = months * 30;
	let irrfTax = 0;

	if (irrf)
		Object.entries(IRRF_REGRESSIVE_TABLE).forEach(([d, v]) => {
			if (days > Number(d)) irrfTax = v;
		});
	return irrfTax;
};

const calculateSummary = (months: number, lastMonthyFees: number = 0) => {
	const irrfTax = getIrrfTax(months);
	const feesTax = feesTaxPerMonth.value / 100;
	const ipcaTax = (ipcaTaxPerMonth.value * -1) / 100;
	const invested = months * monthlyValue + initialValue;
	const contributionsIpcaFees = calculateContributionsFees(months, ipcaTax, monthlyValue);
	const initialIpcaFees = calculateInitialFees(months, ipcaTax, initialValue);
	const contributionsFees = calculateContributionsFees(months, feesTax, monthlyValue);
	const initialFees = calculateInitialFees(months, feesTax, initialValue);
	const fees = contributionsFees + initialFees - invested;
	const ipca = contributionsIpcaFees + initialIpcaFees - invested;
	const irrfDiscount = (fees * (irrfTax * -1)) / 100;
	const total = contributionsFees + initialFees;
	const real = invested + fees + ipca + irrfDiscount;
	const realFees = fees + ipca;
	const monthlyFees = fees - lastMonthyFees;

	return {
		real,
		irrfDiscount,
		total,
		invested,
		fees,
		ipca,
		realFees,
		monthlyFees
	};
};

const summary = computed(() => calculateSummary(periodInMonths.value));

const series = computed(() => {
	let array: SerieType[] = [];
	let last = 0;

	for (let i = 1; i <= periodInMonths.value; i++) {
		const sum = calculateSummary(i, last);
		array.push({
			label: String(i),
			...sum
		});
		last = sum.fees;
	}

	return array;
});

const options = computed(() => ({
	chart: {
		locales: [ptBr],
		defaultLocale: "pt-br"
	},
	legend: {
		position: "top"
	},
	tooltip: {
		x: {
			formatter: (seriesName: string) => `Mês ${seriesName}`
		},
		y: {
			formatter: toCurrency
		}
	},
	dataLabels: {
		enabled: false
	}
}));

const getSeriesData = (y: string) => {
	const maxOnScreen = 24;
	const data = series.value;
	const size = data.length;
	const step = Math.ceil(size / maxOnScreen);
	const maxSteps = size <= maxOnScreen ? 1 : Math.ceil(size / step);
	let array: any = [];

	for (let i = 0; i <= maxSteps * maxOnScreen; i += step) {
		const e: any = i >= size ? data[size - 1] : data[i];
		array.push({ x: e.label, y: e[y] });
		if (i >= size - 1) break;
	}

	return array;
};

const seriesChart = computed(() => {
	return [
		{
			name: "Valor investido",
			data: getSeriesData("invested")
		},
		{
			name: "Total em juros",
			data: getSeriesData("realFees")
		}
	];
});

const columns = computed<QTable["columns"]>(() => {
	let array: Array<any> = [
		{
			name: "label",
			field: "label",
			headerClasses: "bg-grey-12 text-dark",
			label: "Mês",
			align: "center"
		},
		{
			name: "monthlyFees",
			field: "monthlyFees",
			label: "Juros",
			headerClasses: "bg-grey-12 text-dark",
			align: "center",
			format: toCurrency
		},
		{
			name: "invested",
			field: "invested",
			classes: "bg-green-11",
			headerClasses: "bg-green-14 text-white",
			label: "Total Investido",
			align: "center",
			format: toCurrency
		},
		{
			name: "fees",
			field: "fees",
			classes: "bg-blue-11",
			headerClasses: "bg-blue-14 text-white",
			label: "Total Juros",
			align: "center",
			format: toCurrency
		},
		{
			name: "total",
			field: "total",
			classes: "bg-grey-12",
			headerClasses: "bg-grey-14 text-white",
			label: "Total Acumulado",
			align: "center",
			format: toCurrency
		}
	];

	if (ipca && ipcaType) {
		array.push({
			name: "real",
			field: (item: SerieType) => item.invested + item.realFees,
			classes: "bg-grey-12",
			headerClasses: "bg-grey-14 text-white",
			label: "Total Corrigido",
			align: "center",
			format: toCurrency
		});
	}

	return array;
});
</script>

<template>
	<section class="q-gutter-md q-my-lg">
		<article>
			<h4 class="text-weight-bold">Parâmetros</h4>
			<q-list bordered separator>
				<q-item>
					<q-item-section>Valor inicial</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ toCurrency(initialValue) }}
						</b>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section>Valor mensal</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ toCurrency(monthlyValue) }}
						</b>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section>Taxa de juros</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ toFixed(feesTax) }}% ({{ formattedTaxType }})
						</b>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section>Período em</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ periodInMonths }} {{ formattedPeriodType }}
						</b>
					</q-item-section>
				</q-item>
				<q-item v-if="ipca && ipcaType">
					<q-item-section>IPCA Médio</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ toFixed(ipca) }}% ({{ formattedIpcaType }})
						</b>
					</q-item-section>
				</q-item>
				<q-item v-if="irrf">
					<q-item-section>Imposto de Renda Retido na Fonte</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ toFixed(getIrrfTax(periodInMonths)) }}%
						</b>
					</q-item-section>
				</q-item>
			</q-list>
		</article>

		<article>
			<h4 class="text-weight-bold">Resultados</h4>
			<q-list bordered separator>
				<q-item>
					<q-item-section>Valor total investido</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-primary text-dark text-weight-bolder">
							{{ toCurrency(summary.invested) }}
						</b>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section>Total em juros</q-item-section>
					<q-item-section side>
						<b
							class="text-body1 text-dark text-weight-bolder"
							:class="{
								'text-green-8': summary.fees > 0,
								'text-red-8': summary.fees < 0
							}"
						>
							{{ toCurrency(summary.fees) }}
						</b>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section>Valor total bruto</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ toCurrency(summary.total) }}
						</b>
					</q-item-section>
				</q-item>
				<q-item v-if="irrf">
					<q-item-section>Valor descontado do IRRF</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-red-8 text-dark text-weight-bolder">
							{{ toCurrency(summary.irrfDiscount) }}
						</b>
					</q-item-section>
				</q-item>
				<q-item v-if="ipca && ipcaType">
					<q-item-section>Desvalorização do IPCA</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-red-8 text-dark text-weight-bolder">
							{{ toCurrency(summary.ipca) }}
						</b>
					</q-item-section>
				</q-item>
				<q-item v-if="(ipca && ipcaType) || irrf">
					<q-item-section>Valor total final</q-item-section>
					<q-item-section side>
						<b class="text-body1 text-dark text-weight-bolder">
							{{ toCurrency(summary.real) }}
						</b>
					</q-item-section>
				</q-item>
			</q-list>
		</article>
		<q-card bordered flat>
			<q-tabs
				v-model="tab"
				class="text-dark"
				active-bg-color="primary"
				active-color="white"
				indicator-color="transparent"
				align="justify"
				narrow-indicator
			>
				<q-tab name="charts" label="Gráficos" />
				<q-tab name="tables" label="Tabelas" />
			</q-tabs>

			<q-separator />

			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="charts">
					<article>
						<div class="row">
							<div class="col-12 col-md-6" :class="{ 'offset-md-3': !irrf }">
								<ApexCharts
									width="100%"
									type="pie"
									:options="{
										...options,
										labels: ['Valor investido', 'Valor em juros']
									}"
									:series="[summary.invested, summary.fees]"
								></ApexCharts>
							</div>
							<div v-if="irrf" class="col-12 col-md-6">
								<ApexCharts
									width="100%"
									type="pie"
									:options="{
										...options,
										labels: ['Imposto de Renda', 'Valor em Juros']
									}"
									:series="[
										summary.irrfDiscount * -1,
										summary.fees + summary.irrfDiscount
									]"
								></ApexCharts>
							</div>
						</div>
						<ApexCharts
							width="100%"
							type="bar"
							:options="{
								...options,
								chart: { ...options.chart, stacked: true },
								xaxis: { title: { text: 'Meses' }, offsetY: -10 },
								yaxis: { decimalsInFloat: 0 }
							}"
							:series="seriesChart"
						></ApexCharts>
					</article>
				</q-tab-panel>

				<q-tab-panel name="tables" class="q-pa-none">
					<q-table
						flat
						class="text-body1"
						square
						virtual-scroll
						:rows="series"
						:columns="columns"
						hide-pagination
						row-key="label"
						:rows-per-page-options="[0]"
					>
						<template v-slot:top-right>
							<q-btn
								color="dark"
								icon-right="archive"
								label="Exportar em CSV"
								no-caps
								dense
								flat
								@click="() => exportTable(columns, series)"
							/>
						</template>
					</q-table>
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</section>
</template>
