import{d as p,T as c,r as b,o as i,c as f,w as l,a as r,u as o,b as n,e as g,Q as m,f as w,g as _,h as V,i as v,j as y,Z as h}from"./app-5030ba9c.js";import{Q}from"./QForm-b40cd24c.js";import{Q as B}from"./AppLogo-f446dfdb.js";import{_ as x}from"./AppLayout.vue_vue_type_script_setup_true_lang-28d4d97e.js";import"./QResizeObserver-f0dde46e.js";import"./position-engine-fff9eec8.js";import"./QSpace-ddeb61a4.js";import"./QItem-07e05882.js";const k={class:"row full-height col-grow justify-center items-center"},E={class:"q-col-gutter-md fixed-container"},C=n("h1",{class:"q-ma-none text-bold text-h4"},"Entrar",-1),P={key:0,class:"row items-center justify-between"},R=p({__name:"Login",props:{canResetPassword:Boolean},setup(d){const e=c({email:"",password:"",remember:!1}),u=()=>{e.post(route("login"),{onFinish:()=>e.reset("password")})},t=b(!1);return(S,s)=>(i(),f(x,null,{default:l(()=>[r(o(h),{title:"Entrar"}),r(B,{class:"column"},{default:l(()=>[n("section",k,[n("div",E,[C,r(Q,{onSubmit:g(u,["prevent"]),class:"q-gutter-md column"},{default:l(()=>[r(m,{"hide-bottom-space":"",outlined:"",modelValue:o(e).email,"onUpdate:modelValue":s[0]||(s[0]=a=>o(e).email=a),label:"Email","lazy-rules":"",error:!!o(e).errors.email,"error-message":o(e).errors.email,disable:o(e).processing},null,8,["modelValue","error","error-message","disable"]),r(m,{"hide-bottom-space":"",outlined:"",modelValue:o(e).password,"onUpdate:modelValue":s[2]||(s[2]=a=>o(e).password=a),label:"Senha",type:t.value?"text":"password","lazy-rules":"",error:!!o(e).errors.password,"error-message":o(e).errors.password,disable:o(e).processing},{append:l(()=>[r(w,{name:t.value?"visibility":"visibility_off",class:"cursor-pointer",onClick:s[1]||(s[1]=a=>t.value=!t.value)},null,8,["name"])]),_:1},8,["modelValue","type","error","error-message","disable"]),d.canResetPassword?(i(),_("div",P,[r(V,{modelValue:o(e).remember,"onUpdate:modelValue":s[3]||(s[3]=a=>o(e).remember=a),label:"Manter-me conectado"},null,8,["modelValue"])])):v("",!0),r(y,{size:"lg","no-caps":"",unelevated:"",label:"Entrar",type:"submit",disable:o(e).processing,color:"primary"},null,8,["disable"])]),_:1},8,["onSubmit"])])])]),_:1})]),_:1}))}});export{R as default};
