import{Q as g}from"./QTooltip-c398c1dc.js";import{aS as h,aT as p,d as v,k as w,r as x,o as r,g as s,b,a as l,w as u,C as y,j as c,F as k,B as S,u as d,D as m}from"./app-5030ba9c.js";import{c as C}from"./constants-dc375e8c.js";import{s as B}from"./functions-143f5d97.js";function T(e){const t=document.createElement("textarea");t.value=e,t.contentEditable="true",t.style.position="fixed";const a=()=>{};h(a),document.body.appendChild(t),t.focus(),t.select();const o=document.execCommand("copy");return t.remove(),p(a),o}function V(e){return navigator.clipboard!==void 0?navigator.clipboard.writeText(e):new Promise((t,a)=>{const o=T(e);o?t(!0):a(o)})}const q=["href"],L=v({__name:"ShareButtons",props:{slug:{type:String},name:{type:String},current:{type:Boolean,default:()=>!1},title:{type:String,required:!0},text:{type:String,default:()=>"Olha que artigo legal"},asRow:{type:Boolean,default:()=>!1}},setup(e){const t=w(()=>e.current?window.location.href:e.slug?route("blog.show",{slug:e.slug}):e.name?route(e.name):route("home")),a=x(!1),o=()=>V(t.value).then(()=>{a.value=!0,setTimeout(()=>a.value=!1,1500)});return(N,i)=>(r(),s("div",{class:m(e.asRow?"bg-white":"q-mx-sm q-mt-lg"),style:{position:"sticky",top:"70px","z-index":"999","align-self":"flex-start"}},[b("div",{class:m([{column:!e.asRow,row:e.asRow},"items-start q-gutter-sm"])},[l(c,{icon:"link",unelevated:"",flat:"",round:"",onClick:o},{default:u(()=>[l(g,{"no-parent-event":"",anchor:"top middle",self:"bottom middle",modelValue:a.value,"onUpdate:modelValue":i[0]||(i[0]=n=>a.value=n),class:"bg-green-8"},{default:u(()=>[y(" Copiado para a área de transferência! ")]),_:1},8,["modelValue"])]),_:1}),(r(!0),s(k,null,S(Object.entries(d(C).SHARE_BUTTONS_ICONS),([n,f])=>(r(),s("a",{key:n,href:d(B)(n,e.title,t.value,e.text)??"/",target:"_blank",class:"text-reset"},[l(c,{icon:f,round:"",unelevated:"",flat:""},null,8,["icon"])],8,q))),128))],2)],2))}});export{L as _};
