import{V as Ht,q as je,r as B,k as w,v as W,aw as Lt,af as vt,ac as Tt,ad as Rt,a0 as Qe,J as Z,A as V,m as mt,cU as Ue,cV as St,cW as gt,cX as ht,cY as Pt,cZ as Dt,c_ as rt,K as pe,a4 as $t,a5 as Nt,_ as Ne,f as Kt,c$ as jt,X as ve,z as Qt,Y as Ut,a1 as me,S as Wt,an as Xt,d0 as Yt,M as Jt,d1 as st}from"./app-5030ba9c.js";import{Q as Zt}from"./QChip-b322b801.js";import{a as Gt,b as el,Q as tl}from"./QItem-07e05882.js";import{a as ll}from"./QResizeObserver-f0dde46e.js";import{n as ct}from"./format-7985d814.js";let Be=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const i=document.createElement("div");Object.assign(i.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(i),e.scrollLeft=-1e3,Be=e.scrollLeft>=0,e.remove()}const N=1e3,ul=["start","center","end","start-force","center-force","end-force"],yt=Array.prototype.filter,nl=window.getComputedStyle(document.body).overflowAnchor===void 0?Ht:function(e,i){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const r=e.children||[];yt.call(r,A=>A.dataset&&A.dataset.qVsAnchor!==void 0).forEach(A=>{delete A.dataset.qVsAnchor});const f=r[i];f&&f.dataset&&(f.dataset.qVsAnchor="")}))};function Se(e,i){return e+i}function Ke(e,i,r,f,A,a,F,d){const v=e===window?document.scrollingElement||document.documentElement:e,z=A===!0?"offsetWidth":"offsetHeight",s={scrollStart:0,scrollViewSize:-F-d,scrollMaxSize:0,offsetStart:-F,offsetEnd:-d};if(A===!0?(e===window?(s.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,s.scrollViewSize+=document.documentElement.clientWidth):(s.scrollStart=v.scrollLeft,s.scrollViewSize+=v.clientWidth),s.scrollMaxSize=v.scrollWidth,a===!0&&(s.scrollStart=(Be===!0?s.scrollMaxSize-s.scrollViewSize:0)-s.scrollStart)):(e===window?(s.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,s.scrollViewSize+=document.documentElement.clientHeight):(s.scrollStart=v.scrollTop,s.scrollViewSize+=v.clientHeight),s.scrollMaxSize=v.scrollHeight),r!==null)for(let h=r.previousElementSibling;h!==null;h=h.previousElementSibling)h.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetStart+=h[z]);if(f!==null)for(let h=f.nextElementSibling;h!==null;h=h.nextElementSibling)h.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetEnd+=h[z]);if(i!==e){const h=v.getBoundingClientRect(),C=i.getBoundingClientRect();A===!0?(s.offsetStart+=C.left-h.left,s.offsetEnd-=C.width):(s.offsetStart+=C.top-h.top,s.offsetEnd-=C.height),e!==window&&(s.offsetStart+=s.scrollStart),s.offsetEnd+=s.scrollMaxSize-s.offsetStart}return s}function dt(e,i,r,f){i==="end"&&(i=(e===window?document.body:e)[r===!0?"scrollWidth":"scrollHeight"]),e===window?r===!0?(f===!0&&(i=(Be===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-i),window.scrollTo(i,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,i):r===!0?(f===!0&&(i=(Be===!0?e.scrollWidth-e.offsetWidth:0)-i),e.scrollLeft=i):e.scrollTop=i}function xe(e,i,r,f){if(r>=f)return 0;const A=i.length,a=Math.floor(r/N),F=Math.floor((f-1)/N)+1;let d=e.slice(a,F).reduce(Se,0);return r%N!==0&&(d-=i.slice(a*N,r).reduce(Se,0)),f%N!==0&&f!==A&&(d-=i.slice(f,F*N).reduce(Se,0)),d}const wt={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},Sl=Object.keys(wt),ol={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...wt};function al({virtualScrollLength:e,getVirtualScrollTarget:i,getVirtualScrollEl:r,virtualScrollItemSizeComputed:f}){const A=je(),{props:a,emit:F,proxy:d}=A,{$q:v}=d;let z,s,h,C=[],k;const q=B(0),$=B(0),H=B({}),U=B(null),X=B(null),L=B(null),M=B({from:0,to:0}),ke=w(()=>a.tableColspan!==void 0?a.tableColspan:100);f===void 0&&(f=w(()=>a.virtualScrollItemSize));const O=w(()=>f.value+";"+a.virtualScrollHorizontal),Y=w(()=>O.value+";"+a.virtualScrollSliceRatioBefore+";"+a.virtualScrollSliceRatioAfter);W(Y,()=>{K()}),W(O,G);function G(){oe(s,!0)}function ge(l){oe(l===void 0?s:l)}function ee(l,o){const m=i();if(m==null||m.nodeType===8)return;const x=Ke(m,r(),U.value,X.value,a.virtualScrollHorizontal,v.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd);h!==x.scrollViewSize&&K(x.scrollViewSize),R(m,x,Math.min(e.value-1,Math.max(0,parseInt(l,10)||0)),0,ul.indexOf(o)>-1?o:s>-1&&l>s?"end":"start")}function Fe(){const l=i();if(l==null||l.nodeType===8)return;const o=Ke(l,r(),U.value,X.value,a.virtualScrollHorizontal,v.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd),m=e.value-1,x=o.scrollMaxSize-o.offsetStart-o.offsetEnd-$.value;if(z===o.scrollStart)return;if(o.scrollMaxSize<=0){R(l,o,0,0);return}h!==o.scrollViewSize&&K(o.scrollViewSize),he(M.value.from);const E=Math.floor(o.scrollMaxSize-Math.max(o.scrollViewSize,o.offsetEnd)-Math.min(k[m],o.scrollViewSize/2));if(E>0&&Math.ceil(o.scrollStart)>=E){R(l,o,m,o.scrollMaxSize-o.offsetEnd-C.reduce(Se,0));return}let y=0,g=o.scrollStart-o.offsetStart,_=g;if(g<=x&&g+o.scrollViewSize>=q.value)g-=q.value,y=M.value.from,_=g;else for(let S=0;g>=C[S]&&y<m;S++)g-=C[S],y+=N;for(;g>0&&y<m;)g-=k[y],g>-o.scrollViewSize?(y++,_=g):_=k[y]+g;R(l,o,y,_)}function R(l,o,m,x,E){const y=typeof E=="string"&&E.indexOf("-force")>-1,g=y===!0?E.replace("-force",""):E,_=g!==void 0?g:"start";let S=Math.max(0,m-H.value[_]),P=S+H.value.total;P>e.value&&(P=e.value,S=Math.max(0,P-H.value.total)),z=o.scrollStart;const J=S!==M.value.from||P!==M.value.to;if(J===!1&&g===void 0){ye(m);return}const{activeElement:Ie}=document,j=L.value;J===!0&&j!==null&&j!==Ie&&j.contains(Ie)===!0&&(j.addEventListener("focusout",ze),setTimeout(()=>{j!==null&&j.removeEventListener("focusout",ze)})),nl(j,m-S);const Me=g!==void 0?k.slice(S,m).reduce(Se,0):0;if(J===!0){const te=P>=M.value.from&&S<=M.value.to?M.value.to:P;M.value={from:S,to:te},q.value=xe(C,k,0,S),$.value=xe(C,k,P,e.value),requestAnimationFrame(()=>{M.value.to!==P&&z===o.scrollStart&&(M.value={from:M.value.from,to:P},$.value=xe(C,k,P,e.value))})}requestAnimationFrame(()=>{if(z!==o.scrollStart)return;J===!0&&he(S);const te=k.slice(S,m).reduce(Se,0),le=te+o.offsetStart+q.value,Oe=le+k[m];let be=le+x;if(g!==void 0){const Le=te-Me,Ve=o.scrollStart+Le;be=y!==!0&&Ve<le&&Oe<Ve+o.scrollViewSize?Ve:g==="end"?Oe-o.scrollViewSize:le-(g==="start"?0:Math.round((o.scrollViewSize-k[m])/2))}z=be,dt(l,be,a.virtualScrollHorizontal,v.lang.rtl),ye(m)})}function he(l){const o=L.value;if(o){const m=yt.call(o.children,S=>S.classList&&S.classList.contains("q-virtual-scroll--skip")===!1),x=m.length,E=a.virtualScrollHorizontal===!0?S=>S.getBoundingClientRect().width:S=>S.offsetHeight;let y=l,g,_;for(let S=0;S<x;){for(g=E(m[S]),S++;S<x&&m[S].classList.contains("q-virtual-scroll--with-prev")===!0;)g+=E(m[S]),S++;_=g-k[y],_!==0&&(k[y]+=_,C[Math.floor(y/N)]+=_),y++}}}function ze(){L.value!==null&&L.value!==void 0&&L.value.focus()}function oe(l,o){const m=1*f.value;(o===!0||Array.isArray(k)===!1)&&(k=[]);const x=k.length;k.length=e.value;for(let y=e.value-1;y>=x;y--)k[y]=m;const E=Math.floor((e.value-1)/N);C=[];for(let y=0;y<=E;y++){let g=0;const _=Math.min((y+1)*N,e.value);for(let S=y*N;S<_;S++)g+=k[S];C.push(g)}s=-1,z=void 0,q.value=xe(C,k,0,M.value.from),$.value=xe(C,k,M.value.to,e.value),l>=0?(he(M.value.from),Z(()=>{ee(l)})):ae()}function K(l){if(l===void 0&&typeof window<"u"){const g=i();g!=null&&g.nodeType!==8&&(l=Ke(g,r(),U.value,X.value,a.virtualScrollHorizontal,v.lang.rtl,a.virtualScrollStickySizeStart,a.virtualScrollStickySizeEnd).scrollViewSize)}h=l;const o=parseFloat(a.virtualScrollSliceRatioBefore)||0,m=parseFloat(a.virtualScrollSliceRatioAfter)||0,x=1+o+m,E=l===void 0||l<=0?1:Math.ceil(l/f.value),y=Math.max(1,E,Math.ceil((a.virtualScrollSliceSize>0?a.virtualScrollSliceSize:10)/x));H.value={total:Math.ceil(y*x),start:Math.ceil(y*o),center:Math.ceil(y*(.5+o)),end:Math.ceil(y*(1+o)),view:E}}function He(l,o){const m=a.virtualScrollHorizontal===!0?"width":"height",x={["--q-virtual-scroll-item-"+m]:f.value+"px"};return[l==="tbody"?V(l,{class:"q-virtual-scroll__padding",key:"before",ref:U},[V("tr",[V("td",{style:{[m]:`${q.value}px`,...x},colspan:ke.value})])]):V(l,{class:"q-virtual-scroll__padding",key:"before",ref:U,style:{[m]:`${q.value}px`,...x}}),V(l,{class:"q-virtual-scroll__content",key:"content",ref:L,tabindex:-1},o.flat()),l==="tbody"?V(l,{class:"q-virtual-scroll__padding",key:"after",ref:X},[V("tr",[V("td",{style:{[m]:`${$.value}px`,...x},colspan:ke.value})])]):V(l,{class:"q-virtual-scroll__padding",key:"after",ref:X,style:{[m]:`${$.value}px`,...x}})]}function ye(l){s!==l&&(a.onVirtualScroll!==void 0&&F("virtualScroll",{index:l,from:M.value.from,to:M.value.to-1,direction:l<s?"decrease":"increase",ref:d}),s=l)}K();const ae=Lt(Fe,v.platform.is.ios===!0?120:35);vt(()=>{K()});let we=!1;return Tt(()=>{we=!0}),Rt(()=>{if(we!==!0)return;const l=i();z!==void 0&&l!==void 0&&l!==null&&l.nodeType!==8?dt(l,z,a.virtualScrollHorizontal,v.lang.rtl):ee(s)}),Qe(()=>{ae.cancel()}),Object.assign(d,{scrollTo:ee,reset:G,refresh:ge}),{virtualScrollSliceRange:M,virtualScrollSliceSizeComputed:H,setVirtualScrollSize:K,onVirtualScrollEvt:ae,localResetVirtualScroll:oe,padVirtualScroll:He,scrollTo:ee,reset:G,refresh:ge}}const il=mt({name:"QField",inheritAttrs:!1,props:{...Ue,tag:{type:String,default:"label"}},emits:St,setup(){return gt(ht({requiredForAttr:!1,tagProp:!0}))}}),ft=e=>["add","add-unique","toggle"].includes(e),rl=".*+?^${}()|[]\\",sl=Object.keys(Ue),gl=mt({name:"QSelect",inheritAttrs:!1,props:{...ol,...Pt,...Ue,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:ft},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[...St,"add","remove","inputValue","newValue","keyup","keypress","keydown","filterAbort"],setup(e,{slots:i,emit:r}){const{proxy:f}=je(),{$q:A}=f,a=B(!1),F=B(!1),d=B(-1),v=B(""),z=B(!1),s=B(!1);let h=null,C=null,k,q,$,H=null,U,X,L,M;const ke=B(null),O=B(null),Y=B(null),G=B(null),ge=B(null),ee=Dt(e),Fe=jt(ut),R=w(()=>Array.isArray(e.options)?e.options.length:0),he=w(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:ze,virtualScrollSliceSizeComputed:oe,localResetVirtualScroll:K,padVirtualScroll:He,onVirtualScrollEvt:ye,scrollTo:ae,setVirtualScrollSize:we}=al({virtualScrollLength:R,getVirtualScrollTarget:pt,getVirtualScrollEl:tt,virtualScrollItemSizeComputed:he}),l=ht(),o=w(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,n=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&k!==void 0?k:[],c=n.map(p=>Ct(p,u));return e.modelValue===null&&t===!0?c.filter(p=>p!==null):c}return n}),m=w(()=>{const t={};return sl.forEach(n=>{const u=e[n];u!==void 0&&(t[n]=u)}),t}),x=w(()=>e.optionsDark===null?l.isDark.value:e.optionsDark),E=w(()=>rt(o.value)),y=w(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||o.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),g=w(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),_=w(()=>R.value===0),S=w(()=>o.value.map(t=>D.value(t)).join(", ")),P=w(()=>e.displayValue!==void 0?e.displayValue:S.value),J=w(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),Ie=w(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||o.value.some(J.value))),j=w(()=>l.focused.value===!0?e.tabindex:-1),Me=w(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":a.value===!0?"true":"false","aria-controls":`${l.targetUid.value}_lb`};return d.value>=0&&(t["aria-activedescendant"]=`${l.targetUid.value}_${d.value}`),t}),te=w(()=>({id:`${l.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),le=w(()=>o.value.map((t,n)=>({index:n,opt:t,html:J.value(t),selected:!0,removeAtIndex:Vt,toggleOption:ue,tabindex:j.value}))),Oe=w(()=>{if(R.value===0)return[];const{from:t,to:n}=ze.value;return e.options.slice(t,n).map((u,c)=>{const p=ie.value(u)===!0,b=t+c,I={clickable:!0,active:!1,activeClass:Ve.value,manualFocus:!0,focused:!1,disable:p,tabindex:-1,dense:e.optionsDense,dark:x.value,role:"option",id:`${l.targetUid.value}_${b}`,onClick:()=>{ue(u)}};return p!==!0&&(Pe(u)===!0&&(I.active=!0),d.value===b&&(I.focused=!0),I["aria-selected"]=I.active===!0?"true":"false",A.platform.is.desktop===!0&&(I.onMousemove=()=>{a.value===!0&&re(b)})),{index:b,opt:u,html:J.value(u),label:D.value(u),selected:I.active,focused:I.focused,toggleOption:ue,setOptionIndex:re,itemProps:I}})}),be=w(()=>e.dropdownIcon!==void 0?e.dropdownIcon:A.iconSet.arrow.dropdown),Le=w(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Ve=w(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),Q=w(()=>Re(e.optionValue,"value")),D=w(()=>Re(e.optionLabel,"label")),ie=w(()=>Re(e.optionDisable,"disable")),qe=w(()=>o.value.map(t=>Q.value(t))),bt=w(()=>{const t={onInput:ut,onChange:Fe,onKeydown:et,onKeyup:Ze,onKeypress:Ge,onFocus:Ye,onClick(n){q===!0&&ve(n)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Fe,t});W(o,t=>{k=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&l.innerLoading.value!==!0&&(F.value!==!0&&a.value!==!0||E.value!==!0)&&($!==!0&&fe(),(F.value===!0||a.value===!0)&&se(""))},{immediate:!0}),W(()=>e.fillInput,fe),W(a,De),W(R,Bt);function We(t){return e.emitValue===!0?Q.value(t):t}function Te(t){if(t>-1&&t<o.value.length)if(e.multiple===!0){const n=e.modelValue.slice();r("remove",{index:t,value:n.splice(t,1)[0]}),r("update:modelValue",n)}else r("update:modelValue",null)}function Vt(t){Te(t),l.focus()}function Xe(t,n){const u=We(t);if(e.multiple!==!0){e.fillInput===!0&&Ce(D.value(t),!0,!0),r("update:modelValue",u);return}if(o.value.length===0){r("add",{index:0,value:u}),r("update:modelValue",e.multiple===!0?[u]:u);return}if(n===!0&&Pe(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const c=e.modelValue.slice();r("add",{index:c.length,value:u}),c.push(u),r("update:modelValue",c)}function ue(t,n){if(l.editable.value!==!0||t===void 0||ie.value(t)===!0)return;const u=Q.value(t);if(e.multiple!==!0){n!==!0&&(Ce(e.fillInput===!0?D.value(t):"",!0,!0),ne()),O.value!==null&&O.value.focus(),(o.value.length===0||pe(Q.value(o.value[0]),u)!==!0)&&r("update:modelValue",e.emitValue===!0?u:t);return}if((q!==!0||z.value===!0)&&l.focus(),Ye(),o.value.length===0){const b=e.emitValue===!0?u:t;r("add",{index:0,value:b}),r("update:modelValue",e.multiple===!0?[b]:b);return}const c=e.modelValue.slice(),p=qe.value.findIndex(b=>pe(b,u));if(p>-1)r("remove",{index:p,value:c.splice(p,1)[0]});else{if(e.maxValues!==void 0&&c.length>=e.maxValues)return;const b=e.emitValue===!0?u:t;r("add",{index:c.length,value:b}),c.push(b)}r("update:modelValue",c)}function re(t){if(A.platform.is.desktop!==!0)return;const n=t>-1&&t<R.value?t:-1;d.value!==n&&(d.value=n)}function Ee(t=1,n){if(a.value===!0){let u=d.value;do u=ct(u+t,-1,R.value-1);while(u!==-1&&u!==d.value&&ie.value(e.options[u])===!0);d.value!==u&&(re(u),ae(u),n!==!0&&e.useInput===!0&&e.fillInput===!0&&_e(u>=0?D.value(e.options[u]):U,!0))}}function Ct(t,n){const u=c=>pe(Q.value(c),t);return e.options.find(u)||n.find(u)||t}function Re(t,n){const u=t!==void 0?t:n;return typeof u=="function"?u:c=>c!==null&&typeof c=="object"&&u in c?c[u]:c}function Pe(t){const n=Q.value(t);return qe.value.find(u=>pe(u,n))!==void 0}function Ye(t){e.useInput===!0&&O.value!==null&&(t===void 0||O.value===t.target&&t.target.value===S.value)&&O.value.select()}function Je(t){Qt(t,27)===!0&&a.value===!0&&(ve(t),ne(),fe()),r("keyup",t)}function Ze(t){const{value:n}=t.target;if(t.keyCode!==void 0){Je(t);return}if(t.target.value="",h!==null&&(clearTimeout(h),h=null),C!==null&&(clearTimeout(C),C=null),fe(),typeof n=="string"&&n.length!==0){const u=n.toLocaleLowerCase(),c=b=>{const I=e.options.find(T=>b.value(T).toLocaleLowerCase()===u);return I===void 0?!1:(o.value.indexOf(I)===-1?ue(I):ne(),!0)},p=b=>{c(Q)!==!0&&(c(D)===!0||b===!0||se(n,!0,()=>p(!0)))};p()}else l.clearValue(t)}function Ge(t){r("keypress",t)}function et(t){if(r("keydown",t),Ut(t)===!0)return;const n=v.value.length!==0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(d.value>-1||n===!0);if(t.keyCode===27){Ne(t);return}if(t.keyCode===9&&u===!1){ce();return}if(t.target===void 0||t.target.id!==l.targetUid.value||l.editable.value!==!0)return;if(t.keyCode===40&&l.innerLoading.value!==!0&&a.value===!1){me(t),de();return}if(t.keyCode===8&&(e.useChips===!0||e.clearable===!0)&&e.hideSelected!==!0&&v.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?Te(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&r("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof v.value!="string"||v.value.length===0)&&(me(t),d.value=-1,Ee(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&oe.value!==void 0&&(me(t),d.value=Math.max(-1,Math.min(R.value,d.value+(t.keyCode===33?-1:1)*oe.value.view)),Ee(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(me(t),Ee(t.keyCode===38?-1:1,e.multiple));const c=R.value;if((L===void 0||M<Date.now())&&(L=""),c>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||L.length!==0)){a.value!==!0&&de(t);const p=t.key.toLocaleLowerCase(),b=L.length===1&&L[0]===p;M=Date.now()+1500,b===!1&&(me(t),L+=p);const I=new RegExp("^"+L.split("").map($e=>rl.indexOf($e)>-1?"\\"+$e:$e).join(".*"),"i");let T=d.value;if(b===!0||T<0||I.test(D.value(e.options[T]))!==!0)do T=ct(T+1,-1,c-1);while(T!==d.value&&(ie.value(e.options[T])===!0||I.test(D.value(e.options[T]))!==!0));d.value!==T&&Z(()=>{re(T),ae(T),T>=0&&e.useInput===!0&&e.fillInput===!0&&_e(D.value(e.options[T]),!0)});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||L!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&me(t),d.value>-1&&d.value<c){ue(e.options[d.value]);return}if(n===!0){const p=(b,I)=>{if(I){if(ft(I)!==!0)return}else I=e.newValueMode;if(Ce("",e.multiple!==!0,!0),b==null)return;(I==="toggle"?ue:Xe)(b,I==="add-unique"),e.multiple!==!0&&(O.value!==null&&O.value.focus(),ne())};if(e.onNewValue!==void 0?r("newValue",v.value,p):p(v.value),e.multiple!==!0)return}a.value===!0?ce():l.innerLoading.value!==!0&&de()}}function tt(){return q===!0?ge.value:Y.value!==null&&Y.value.contentEl!==null?Y.value.contentEl:void 0}function pt(){return tt()}function xt(){return e.hideSelected===!0?[]:i["selected-item"]!==void 0?le.value.map(t=>i["selected-item"](t)).slice():i.selected!==void 0?[].concat(i.selected()):e.useChips===!0?le.value.map((t,n)=>V(Zt,{key:"option-"+n,removable:l.editable.value===!0&&ie.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:j.value,onRemove(){t.removeAtIndex(n)}},()=>V("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:D.value(t.opt)}))):[V("span",{[Ie.value===!0?"innerHTML":"textContent"]:P.value})]}function lt(){if(_.value===!0)return i["no-option"]!==void 0?i["no-option"]({inputValue:v.value}):void 0;const t=i.option!==void 0?i.option:u=>V(tl,{key:u.index,...u.itemProps},()=>V(Gt,()=>V(el,()=>V("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let n=He("div",Oe.value.map(t));return i["before-options"]!==void 0&&(n=i["before-options"]().concat(n)),Xt(i["after-options"],n)}function At(t,n){const u=n===!0?{...Me.value,...l.splitAttrs.attributes.value}:void 0,c={ref:n===!0?O:void 0,key:"i_t",class:y.value,style:e.inputStyle,value:v.value!==void 0?v.value:"",type:"search",...u,id:n===!0?l.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...bt.value};return t!==!0&&q===!0&&(Array.isArray(c.class)===!0?c.class=[...c.class,"no-pointer-events"]:c.class+=" no-pointer-events"),V("input",c)}function ut(t){h!==null&&(clearTimeout(h),h=null),C!==null&&(clearTimeout(C),C=null),!(t&&t.target&&t.target.qComposing===!0)&&(_e(t.target.value||""),$=!0,U=v.value,l.focused.value!==!0&&(q!==!0||z.value===!0)&&l.focus(),e.onFilter!==void 0&&(h=setTimeout(()=>{h=null,se(v.value)},e.inputDebounce)))}function _e(t,n){v.value!==t&&(v.value=t,n===!0||e.inputDebounce===0||e.inputDebounce==="0"?r("inputValue",t):C=setTimeout(()=>{C=null,r("inputValue",t)},e.inputDebounce))}function Ce(t,n,u){$=u!==!0,e.useInput===!0&&(_e(t,!0),(n===!0||u!==!0)&&(U=t),n!==!0&&se(t))}function se(t,n,u){if(e.onFilter===void 0||n!==!0&&l.focused.value!==!0)return;l.innerLoading.value===!0?r("filterAbort"):(l.innerLoading.value=!0,s.value=!0),t!==""&&e.multiple!==!0&&o.value.length!==0&&$!==!0&&t===D.value(o.value[0])&&(t="");const c=setTimeout(()=>{a.value===!0&&(a.value=!1)},10);H!==null&&clearTimeout(H),H=c,r("filter",t,(p,b)=>{(n===!0||l.focused.value===!0)&&H===c&&(clearTimeout(H),typeof p=="function"&&p(),s.value=!1,Z(()=>{l.innerLoading.value=!1,l.editable.value===!0&&(n===!0?a.value===!0&&ne():a.value===!0?De(!0):a.value=!0),typeof b=="function"&&Z(()=>{b(f)}),typeof u=="function"&&Z(()=>{u(f)})}))},()=>{l.focused.value===!0&&H===c&&(clearTimeout(H),l.innerLoading.value=!1,s.value=!1),a.value===!0&&(a.value=!1)})}function kt(){return V(ll,{ref:Y,class:g.value,style:e.popupContentStyle,modelValue:a.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&_.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:x.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,square:Le.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...te.value,onScrollPassive:ye,onBeforeShow:ot,onBeforeHide:Ft,onShow:zt},lt)}function Ft(t){at(t),ce()}function zt(){we()}function It(t){ve(t),O.value!==null&&O.value.focus(),z.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function Mt(t){ve(t),Z(()=>{z.value=!1})}function Ot(){const t=[V(il,{class:`col-auto ${l.fieldClass.value}`,...m.value,for:l.targetUid.value,dark:x.value,square:!0,loading:s.value,itemAligned:!1,filled:!0,stackLabel:v.value.length!==0,...l.splitAttrs.listeners.value,onFocus:It,onBlur:Mt},{...i,rawControl:()=>l.getControl(!0),before:void 0,after:void 0})];return a.value===!0&&t.push(V("div",{ref:ge,class:g.value+" scroll",style:e.popupContentStyle,...te.value,onClick:Ne,onScrollPassive:ye},lt())),V(Wt,{ref:G,modelValue:F.value,position:e.useInput===!0?"top":void 0,transitionShow:X,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:ot,onBeforeHide:qt,onHide:Et,onShow:_t},()=>V("div",{class:"q-select__dialog"+(x.value===!0?" q-select__dialog--dark q-dark":"")+(z.value===!0?" q-select__dialog--focused":"")},t))}function qt(t){at(t),G.value!==null&&G.value.__updateRefocusTarget(l.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),l.focused.value=!1}function Et(t){ne(),l.focused.value===!1&&r("blur",t),fe()}function _t(){const t=document.activeElement;(t===null||t.id!==l.targetUid.value)&&O.value!==null&&O.value!==t&&O.value.focus(),we()}function ce(){F.value!==!0&&(d.value=-1,a.value===!0&&(a.value=!1),l.focused.value===!1&&(H!==null&&(clearTimeout(H),H=null),l.innerLoading.value===!0&&(r("filterAbort"),l.innerLoading.value=!1,s.value=!1)))}function de(t){l.editable.value===!0&&(q===!0?(l.onControlFocusin(t),F.value=!0,Z(()=>{l.focus()})):l.focus(),e.onFilter!==void 0?se(v.value):(_.value!==!0||i["no-option"]!==void 0)&&(a.value=!0))}function ne(){F.value=!1,ce()}function fe(){e.useInput===!0&&Ce(e.multiple!==!0&&e.fillInput===!0&&o.value.length!==0&&D.value(o.value[0])||"",!0,!0)}function De(t){let n=-1;if(t===!0){if(o.value.length!==0){const u=Q.value(o.value[0]);n=e.options.findIndex(c=>pe(Q.value(c),u))}K(n)}re(n)}function Bt(t,n){a.value===!0&&l.innerLoading.value===!1&&(K(-1,!0),Z(()=>{a.value===!0&&l.innerLoading.value===!1&&(t>n?K():De(!0))}))}function nt(){F.value===!1&&Y.value!==null&&Y.value.updatePosition()}function ot(t){t!==void 0&&ve(t),r("popupShow",t),l.hasPopupOpen=!0,l.onControlFocusin(t)}function at(t){t!==void 0&&ve(t),r("popupHide",t),l.hasPopupOpen=!1,l.onControlFocusout(t)}function it(){q=A.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?i["no-option"]!==void 0||e.onFilter!==void 0||_.value===!1:!0),X=A.platform.is.ios===!0&&q===!0&&e.useInput===!0?"fade":e.transitionShow}return $t(it),Nt(nt),it(),Qe(()=>{h!==null&&clearTimeout(h),C!==null&&clearTimeout(C)}),Object.assign(f,{showPopup:de,hidePopup:ne,removeAtIndex:Te,add:Xe,toggleOption:ue,getOptionIndex:()=>d.value,setOptionIndex:re,moveOptionSelection:Ee,filter:se,updateMenuPosition:nt,updateInputValue:Ce,isOptionSelected:Pe,getEmittingOptionValue:We,isOptionDisabled:(...t)=>ie.value.apply(null,t)===!0,getOptionValue:(...t)=>Q.value.apply(null,t),getOptionLabel:(...t)=>D.value.apply(null,t)}),Object.assign(l,{innerValue:o,fieldClass:w(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:ke,targetRef:O,hasValue:E,showPopup:de,floatingLabel:w(()=>e.hideSelected!==!0&&E.value===!0||typeof v.value=="number"||v.value.length!==0||rt(e.displayValue)),getControlChild:()=>{if(l.editable.value!==!1&&(F.value===!0||_.value!==!0||i["no-option"]!==void 0))return q===!0?Ot():kt();l.hasPopupOpen===!0&&(l.hasPopupOpen=!1)},controlEvents:{onFocusin(t){l.onControlFocusin(t)},onFocusout(t){l.onControlFocusout(t,()=>{fe(),ce()})},onClick(t){if(Ne(t),q!==!0&&a.value===!0){ce(),O.value!==null&&O.value.focus();return}de(t)}},getControl:t=>{const n=xt(),u=t===!0||F.value!==!0||q!==!0;if(e.useInput===!0)n.push(At(t,u));else if(l.editable.value===!0){const p=u===!0?Me.value:void 0;n.push(V("input",{ref:u===!0?O:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?l.targetUid.value:void 0,value:P.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...p,onKeydown:et,onKeyup:Je,onKeypress:Ge})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length!==0&&n.push(V("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Ze}))}if(ee.value!==void 0&&e.disable!==!0&&qe.value.length!==0){const p=qe.value.map(b=>V("option",{value:b,selected:!0}));n.push(V("select",{class:"hidden",name:ee.value,multiple:e.multiple},p))}const c=e.useInput===!0||u!==!0?void 0:l.splitAttrs.attributes.value;return V("div",{class:"q-field__native row items-center",...c,...l.splitAttrs.listeners.value},n)},getInnerAppend:()=>e.loading!==!0&&s.value!==!0&&e.hideDropdownIcon!==!0?[V(Kt,{class:"q-select__dropdown-icon"+(a.value===!0?" rotate-180":""),name:be.value})]:null}),gt(l)}});let Ae=0;const hl={fullscreen:Boolean,noRouteFullscreenExit:Boolean},yl=["update:fullscreen","fullscreen"];function wl(){const e=je(),{props:i,emit:r,proxy:f}=e;let A,a,F;const d=B(!1);Yt(e)===!0&&W(()=>f.$route.fullPath,()=>{i.noRouteFullscreenExit!==!0&&s()}),W(()=>i.fullscreen,h=>{d.value!==h&&v()}),W(d,h=>{r("update:fullscreen",h),r("fullscreen",h)});function v(){d.value===!0?s():z()}function z(){d.value!==!0&&(d.value=!0,F=f.$el.parentNode,F.replaceChild(a,f.$el),document.body.appendChild(f.$el),Ae++,Ae===1&&document.body.classList.add("q-body--fullscreen-mixin"),A={handler:s},st.add(A))}function s(){d.value===!0&&(A!==void 0&&(st.remove(A),A=void 0),F.replaceChild(f.$el,a),d.value=!1,Ae=Math.max(0,Ae-1),Ae===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),f.$el.scrollIntoView!==void 0&&setTimeout(()=>{f.$el.scrollIntoView()})))}return vt(()=>{a=document.createElement("span")}),Jt(()=>{i.fullscreen===!0&&z()}),Qe(s),Object.assign(f,{toggleFullscreen:v,setFullscreen:z,exitFullscreen:s}),{inFullscreen:d,toggleFullscreen:v}}export{gl as Q,yl as a,wl as b,ol as c,al as d,Sl as e,Be as r,hl as u};
