import{m as h,k as u,A as x,aq as q,d as y,o as m,c as g,w as t,a,P as r,b as n,u as s,l as i,t as l,C as f,H as v,i as C,N as B}from"./app-62487061.js";import{Q as w}from"./QImg-f828ca8a.js";const $=["top","middle","bottom"],N=h({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>$.includes(e)}},setup(e,{slots:o}){const d=u(()=>e.align!==void 0?{verticalAlign:e.align}:null),b=u(()=>{const c=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(c!==void 0?` text-${c}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>x("div",{class:b.value,style:d.value,role:"status","aria-label":e.label},q(o.default,e.label!==void 0?[e.label]:[]))}}),Q={class:"text-caption text-grey"},S=n("span",{class:"q-mx-sm"},"●",-1),V={class:"text-h6 text-bold q-mt-sm q-mb-xs"},k={class:"text-caption q-mt-none q-mb-xs"},L=y({__name:"PostCard",props:{post:{type:Object,required:!0}},setup(e){return(o,d)=>(m(),g(B,{flat:"",class:"bg-transparent"},{default:t(()=>[a(r,{horizontal:""},{default:t(()=>[a(r,{class:"q-pa-none full-width"},{default:t(()=>[n("div",Q,[a(s(i),{class:"text-reset",data:{search:e.post.author.name},href:`${o.$route("home")}`},{default:t(()=>[n("b",null,l(e.post.author.name),1)]),_:1},8,["data","href"]),S,f(" "+l(s(v)(e.post.published_at??e.post.created_at).fromNow()),1)]),a(s(i),{class:"text-reset",href:o.$route("blog.show",{slug:e.post.slug})},{default:t(()=>[n("div",V,l(e.post.title),1),n("p",k,l(e.post.caption),1)]),_:1},8,["href"]),a(s(i),{class:"text-reset",data:{search:e.post.category.name},href:`${o.$route("home")}`},{default:t(()=>[a(N,{color:"secondary","text-color":"white",class:"q-ma-none"},{default:t(()=>[f(l(e.post.category.name),1)]),_:1})]),_:1},8,["data","href"])]),_:1}),e.post.banner?(m(),g(r,{key:0,class:"q-py-none col-3 row items-start"},{default:t(()=>[a(w,{class:"rounded-borders",src:e.post.banner,ratio:1},null,8,["src"])]),_:1})):C("",!0)]),_:1})]),_:1}))}});export{N as Q,L as _};
