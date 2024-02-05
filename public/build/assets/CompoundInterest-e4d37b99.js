import{d as f,k as b,o as s,g as p,a as t,u as d,w as n,b as o,t as g,c as r,j as v,i as u,aU as C,au as y,F as T,C as e,Z as x,l as j}from"./app-b69ccc3c.js";import{Q as q}from"./AppLogo-1bf7f7a9.js";import{_ as w}from"./AppLayout.vue_vue_type_script_setup_true_lang-04e858de.js";import{_ as S}from"./ShareButtons.vue_vue_type_script_setup_true_lang-55bd9200.js";import{_ as V}from"./CompoundInterestForm.vue_vue_type_script_setup_true_lang-51dceaca.js";import{_ as k}from"./CompoundInterestSummary.vue_vue_type_script_setup_true_lang-8e7bfbaa.js";import"./QResizeObserver-40ffc2d6.js";import"./position-engine-2451d219.js";import"./QSpace-654b85e0.js";import"./QItem-91d9023b.js";import"./QTooltip-901db448.js";import"./functions-1e89eafd.js";import"./use-quasar-daa21963.js";import"./QExpansionItem-ca75eda7.js";import"./QForm-b03f552f.js";import"./index.esm-bundler-d1d05260.js";import"./use-fullscreen-75389d89.js";import"./QChip-f3f6b2f3.js";import"./format-702da16c.js";import"./touch-5ff41afe.js";import"./use-cache-e4206936.js";import"./QTable-04f69b69.js";const J={class:"row"},N=o("section",{class:"col"},null,-1),P={class:"fixed-container q-py-lg"},z=o("p",{class:"text-body1"}," Com apenas alguns cliques, descubra o potencial de seus investimentos e tome decisões financeiras com confiança. ",-1),$={class:"text-body1"},B={key:0},F=o("h3",{class:"text-weight-bold"}," Como utilizar a Calculadora de Juros Compostos da Throwy ",-1),I=o("ol",null,[o("li",null,[e(" Preencha o campo do "),o("b",null,"Valor inicial"),e(" ; ")]),o("li",null,[e(" Preencha o campo do "),o("b",null,"Valor mensal"),e(" que será somado mensalmente; ")]),o("li",null,[e(" Preencha a "),o("b",null,"Taxa de juros"),e(" mensal ou anual; ")]),o("li",null,[e(" Preencha o campo do "),o("b",null,"período"),e(" em meses ou anos; ")]),o("li",null,[e(" Clique em "),o("b",null,"Calcular"),e(" e veja os resultados. ")])],-1),O=[F,I],A=o("article",null,[o("h3",{class:"text-weight-bold"}," Juros Compostos: O Poder de Multiplicar Seu Dinheiro "),o("p",null,[e(' Os juros compostos são frequentemente chamados de a " '),o("i",null,"oitava maravilha do mundo"),e(' " por sua capacidade de '),o("b",null,"multiplicar seu dinheiro de forma exponencial"),e(" ao longo do tempo. Diferentemente dos juros simples, onde você ganha juros apenas sobre o principal inicial, os juros compostos permitem que você ganhe juros sobre os juros acumulados. Isso significa que quanto "),o("b",null," mais tempo seu dinheiro estiver investido, mais ele poderá crescer "),e(" . ")])],-1),D=o("article",null,[o("h3",{class:"text-weight-bold"},"Como Funcionam os Juros Compostos"),o("p",null,[e(" A fórmula básica para calcular juros compostos é: "),o("br"),o("br"),o("b",null,"M = C(1 + i)ⁿ"),o("br"),o("br"),e(" Onde: ")]),o("ul",null,[o("li",null,[o("b",null,"M"),e(" é o montante futuro que será acumulado; ")]),o("li",null,[o("b",null,"C"),e(" é o capital inicial; ")]),o("li",null,[o("b",null,"i"),e(" é a taxa de juros mensal; ")]),o("li",null,[o("b",null,"n"),e(" é o tempo (meses) que o dinheiro é investido. ")])])],-1),E=o("article",null,[o("h3",{class:"text-weight-bold"}," A Calculadora de Juros Compostos da Throwy "),o("p",null,[e(" A Calculadora de Juros Compostos da Throwy é uma ferramenta online projetada para "),o("b",null,"ajudar investidores"),e(" a prever o crescimento de seus investimentos utilizando o poder dos juros compostos. Com uma interface amigável, permite aos usuários inserir o montante inicial do investimento, a taxa de juros mensal ou anual, o período de tempo em meses ou anos, e a frequência de capitalização dos juros, fornecendo uma "),o("b",null,"visão detalhada"),e(" do montante que será acumulado ao final do período. ")])],-1),M=o("article",null,[o("h3",{class:"text-weight-bold"},"Juros Simples vs. Juros Compostos"),o("p",null,[e(" Enquanto os juros compostos capitalizam o valor investido ao longo do tempo, os juros simples são calculados "),o("b",null,"apenas sobre o principal inicial"),e(" . Isso significa que, em um investimento a longo prazo, os juros compostos podem gerar um "),o("b",null,"retorno significativamente maior"),e(" . ")])],-1),Q={class:"col"},c="Calculadora de Juros Compostos",po=f({__name:"CompoundInterest",props:{initialValue:String,monthlyValue:String,feesTax:String,feesTaxType:String,period:String,periodType:String,ipca:String,ipcaType:String,irrf:String},setup(h){const a=h,l=b(()=>{const i=["feesTax","feesTaxType","period","periodType"];return Object.entries(a).filter(([m,_])=>i.includes(m)&&_).length>=i.length?{initialValue:Number(a.initialValue),monthlyValue:Number(a.monthlyValue),feesTax:Number(a.feesTax),feesTaxType:a.feesTaxType,period:Number(a.period),periodType:a.periodType,ipca:a.ipca?Number(a.ipca):void 0,ipcaType:a.ipcaType,irrf:a.irrf=="true"}:null});return(i,m)=>(s(),p(T,null,[t(d(x),{title:`${c} - Calculos Financeiros`},null,8,["title"]),t(w,null,{default:n(()=>[t(q,{padding:""},{default:n(()=>[o("section",J,[N,o("section",P,[o("h1",{class:"text-bold q-mt-none q-mb-sm"},g(c)),z,l.value?(s(),r(d(j),{key:0,href:i.$route("tools.compound_interest_calculator")},{default:n(()=>[t(v,{label:"Fazer outro cálculo",color:"primary",icon:"arrow_back",unelevated:""})]),_:1},8,["href"])):u("",!0),l.value?(s(),r(k,C(y({key:2},l.value)),null,16)):(s(),r(V,{key:1})),o("section",$,[l.value?u("",!0):(s(),p("article",B,O)),A,D,E,M])]),o("section",Q,[i.$q.screen.gt.sm?(s(),r(S,{key:0,current:"",title:c,text:"Confira essa Calculadora de Juros Compostos e preveja o rendimento dos seus investimentos"})):u("",!0)])])]),_:1})]),_:1})],64))}});export{po as default};
