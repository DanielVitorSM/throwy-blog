import{Q as m,_ as f}from"./PostCard.vue_vue_type_script_setup_true_lang-25b4cec7.js";import{Q as x}from"./QImg-fa65725b.js";import{d as q,o as s,g as o,a as r,u as b,w as c,c as n,b as e,C as h,t as l,i as a,F as d,B as g,U as k,Z as _}from"./app-600ac085.js";import{Q as v}from"./AppLogo-d1fd441a.js";import{_ as p}from"./AppLayout.vue_vue_type_script_setup_true_lang-74c974c5.js";import{_ as y}from"./ShareButtons.vue_vue_type_script_setup_true_lang-ca0e23cf.js";import"./use-ratio-d86bf576.js";import"./QSpace-375ace99.js";import"./QTooltip-5d9be61e.js";import"./position-engine-dd91bf20.js";import"./functions-1f795916.js";const w={class:"row"},Q=e("section",{class:"col"},null,-1),B={class:"fixed-container q-py-lg"},P={class:"text-h3 text-bold q-mt-none q-mb-md"},$={class:"text-body1"},C={key:3},N=["innerHTML"],T={key:4,class:"q-mb-xl"},V=e("span",{class:"text-overline"},"Tags:",-1),A={class:"row q-gutter-xs"},L={class:"row items-center q-gutter-lg"},j=["src"],F={class:"column"},H=e("span",{style:{"line-height":"unset"},class:"text-overline"}," O Autor ",-1),M={class:"q-ma-none text-h6 text-bold"},O={key:0,class:"text-body1 q-mt-md q-mb-lg"},z={class:"col relative-position"},D={key:0,class:"row justify-center"},E={class:"fixed-container"},I={class:"column"},S=e("h2",{class:"text-h4"},"Postagens relacionadas",-1),ot=q({__name:"Post",props:{post:{type:Object,required:!0},similarPosts:Array},setup(t){return(u,U)=>(s(),o(d,null,[r(b(_),{title:t.post.title},null,8,["title"]),r(p,null,{default:c(()=>[t.post?(s(),n(v,{key:0,padding:""},{default:c(()=>[e("section",w,[Q,e("section",B,[t.post.category?(s(),n(m,{key:0,color:"secondary","text-color":"white",class:"q-ma-none q-mb-md"},{default:c(()=>[h(l(t.post.category.name),1)]),_:1})):a("",!0),e("h1",P,l(t.post.title),1),e("p",$,l(t.post.caption),1),u.$q.screen.gt.sm?a("",!0):(s(),n(y,{key:1,slug:t.post.slug,title:t.post.title,"as-row":"",class:"q-mb-xs"},null,8,["slug","title"])),t.post.banner?(s(),n(x,{key:2,src:t.post.banner,class:"full-width rounded-borders"},null,8,["src"])):(s(),o("hr",C)),e("div",{class:"q-my-xl text-body1",innerHTML:t.post.content},null,8,N),t.post.tags&&t.post.tags.length>0?(s(),o("div",T,[V,e("div",A,[(s(!0),o(d,null,g(t.post.tags,i=>(s(),n(m,{color:"grey-8","text-color":"white",key:i.id},{default:c(()=>[h(l(i.name),1)]),_:2},1024))),128))])])):a("",!0),e("section",null,[e("div",L,[r(k,{size:"60px",icon:t.post.author.avatar?"":"face",color:"grey-5"},{default:c(()=>[t.post.author.avatar?(s(),o("img",{key:0,src:t.post.author.avatar},null,8,j)):a("",!0)]),_:1},8,["icon"]),e("div",F,[H,e("span",M,l(t.post.author.name),1)])]),t.post.author.description?(s(),o("p",O,l(t.post.author.description),1)):a("",!0)])]),e("section",z,[u.$q.screen.gt.sm?(s(),n(y,{key:0,slug:t.post.slug,title:t.post.title},null,8,["slug","title"])):a("",!0)])]),t.similarPosts?(s(),o("section",D,[e("div",E,[e("section",I,[S,(s(!0),o(d,null,g(t.similarPosts,i=>(s(),n(f,{key:i.id,post:i,class:"q-mb-xl"},null,8,["post"]))),128))])])])):a("",!0)]),_:1})):a("",!0)]),_:1})],64))}});export{ot as default};
