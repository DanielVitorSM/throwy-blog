<script setup lang="ts">
import { Head, Link } from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";
import ShareButtons from "@/Pages/Partials/ShareButtons.vue";
import { computed } from "vue";
import CompoundInterestForm, {
	type ParamsType
} from "@/Pages/Tools/Partials/CompoundInterestForm.vue";
import CompoundInterestSummary from "@/Pages/Tools/Partials/CompoundInterestSummary.vue";

const TITLE = "Calculadora de Juros Compostos";

const props = defineProps({
	initialValue: String,
	monthlyValue: String,
	feesTax: String,
	feesTaxType: String,
	period: String,
	periodType: String,
	ipca: String,
	ipcaType: String,
	irrf: String
});

const propsParsed = computed<ParamsType | null>(() => {
	const required = ["feesTax", "feesTaxType", "period", "periodType"];
	if (
		Object.entries(props).filter(([k, v]) => required.includes(k) && v).length >=
		required.length
	)
		return {
			initialValue: Number(props.initialValue),
			monthlyValue: Number(props.monthlyValue),
			feesTax: Number(props.feesTax),
			feesTaxType: props.feesTaxType,
			period: Number(props.period),
			periodType: props.periodType,
			ipca: props.ipca ? Number(props.ipca) : undefined,
			ipcaType: props.ipcaType,
			irrf: props.irrf == "true"
		} as ParamsType;
	return null;
});
</script>

<template>
	<Head :title="`${TITLE} - Calculos Financeiros`"></Head>

	<AppLayout>
		<q-page padding>
			<section class="row">
				<section class="col"></section>
				<section class="fixed-container q-py-lg">
					<h1 class="text-bold q-mt-none q-mb-sm">{{ TITLE }}</h1>
					<p class="text-body1">
						Com apenas alguns cliques, descubra o potencial de seus investimentos e tome
						decisões financeiras com confiança.
					</p>

					<Link v-if="propsParsed" :href="$route('tools.compound_interest_calculator')">
						<q-btn
							label="Fazer outro cálculo"
							color="primary"
							icon="arrow_back"
							unelevated
						/>
					</Link>
					<CompoundInterestForm v-if="!propsParsed" />
					<CompoundInterestSummary v-else v-bind="propsParsed" />

					<section class="text-body1">
						<article v-if="!propsParsed">
							<h3 class="text-weight-bold">
								Como utilizar a Calculadora de Juros Compostos da Throwy
							</h3>
							<ol>
								<li>
									Preencha o campo do
									<b>Valor inicial</b>
									;
								</li>
								<li>
									Preencha o campo do
									<b>Valor mensal</b>
									que será somado mensalmente;
								</li>
								<li>
									Preencha a
									<b>Taxa de juros</b>
									mensal ou anual;
								</li>
								<li>
									Preencha o campo do
									<b>período</b>
									em meses ou anos;
								</li>
								<li>
									Clique em
									<b>Calcular</b>
									e veja os resultados.
								</li>
							</ol>
						</article>
						<article>
							<h3 class="text-weight-bold">
								Juros Compostos: O Poder de Multiplicar Seu Dinheiro
							</h3>
							<p>
								Os juros compostos são frequentemente chamados de a "
								<i>oitava maravilha do mundo</i>
								" por sua capacidade de
								<b>multiplicar seu dinheiro de forma exponencial</b>
								ao longo do tempo. Diferentemente dos juros simples, onde você ganha
								juros apenas sobre o principal inicial, os juros compostos permitem
								que você ganhe juros sobre os juros acumulados. Isso significa que
								quanto
								<b>
									mais tempo seu dinheiro estiver investido, mais ele poderá
									crescer
								</b>
								.
							</p>
						</article>
						<article>
							<h3 class="text-weight-bold">Como Funcionam os Juros Compostos</h3>
							<p>
								A fórmula básica para calcular juros compostos é:
								<br />
								<br />
								<b>M = C(1 + i)&#x207F;</b>
								<br />
								<br />

								Onde:
							</p>
							<ul>
								<li>
									<b>M</b>
									é o montante futuro que será acumulado;
								</li>
								<li>
									<b>C</b>
									é o capital inicial;
								</li>
								<li>
									<b>i</b>
									é a taxa de juros mensal;
								</li>
								<li>
									<b>n</b>
									é o tempo (meses) que o dinheiro é investido.
								</li>
							</ul>
						</article>
						<article>
							<h3 class="text-weight-bold">
								A Calculadora de Juros Compostos da Throwy
							</h3>
							<p>
								A Calculadora de Juros Compostos da Throwy é uma ferramenta online
								projetada para
								<b>ajudar investidores</b>
								a prever o crescimento de seus investimentos utilizando o poder dos
								juros compostos. Com uma interface amigável, permite aos usuários
								inserir o montante inicial do investimento, a taxa de juros mensal
								ou anual, o período de tempo em meses ou anos, e a frequência de
								capitalização dos juros, fornecendo uma
								<b>visão detalhada</b>
								do montante que será acumulado ao final do período.
							</p>
						</article>
						<article>
							<h3 class="text-weight-bold">Juros Simples vs. Juros Compostos</h3>
							<p>
								Enquanto os juros compostos capitalizam o valor investido ao longo
								do tempo, os juros simples são calculados
								<b>apenas sobre o principal inicial</b>
								. Isso significa que, em um investimento a longo prazo, os juros
								compostos podem gerar um
								<b>retorno significativamente maior</b>
								.
							</p>
						</article>
					</section>
				</section>
				<section class="col">
					<ShareButtons
						v-if="$q.screen.gt.sm"
						current
						:title="TITLE"
						text="Confira essa Calculadora de Juros Compostos e preveja o rendimento dos seus investimentos"
					/>
				</section>
			</section>
		</q-page>
	</AppLayout>
</template>
