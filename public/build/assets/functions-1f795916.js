import{H as c}from"./app-600ac085.js";const r={SHARE_BUTTONS_ICONS:{twitter:"fab fa-twitter",facebook:"fab fa-facebook",linkedin:"fab fa-linkedin",whatsapp:"fab fa-whatsapp",mail:"mail"},MAX_UPLOAD_SIZE_BYTES:4*1024*1024,ACCEPTED_IMAGE_FORMATS:["jpg","jpeg","png"]},f=(t,o,e)=>{const i={twitter:`https://twitter.com/intent/tweet?text=${o}&url=${e}`,facebook:`https://www.facebook.com/sharer/sharer.php?u=${e}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,whatsapp:`https://api.whatsapp.com/send?text=Olha%20que%20artigo%20legal:%20${e}`,mail:`mailto:?subject=${o}&body=Veja%20sobre%20esse%20artigo%20em:%20${e}`};return t in i?i[t]:null},m=(t,o=!0)=>{t||(t=0);const e={B:"bytes",KB:"kilobytes",MB:"megabytes",GB:"gigabytes",TB:"terabytes"};let i=t,n=Object.entries(e)[0],a=Object.keys(e).length;for(let s=1;s<=a;s++)if(!(t>=Math.pow(1024,s+1)&&s<a)){i=t/Math.pow(1024,s),n=Object.entries(e)[s];break}return[i,n[Number(o)]]},l=(t,o="e")=>{if(t.length===1)return t[0];const e=t.slice(-2);return[...t.slice(0,-2),e.join(` ${o} `)].join(", ")},h=(t,o=r.ACCEPTED_IMAGE_FORMATS)=>{const[e,i]=m(r.MAX_UPLOAD_SIZE_BYTES);if(t.size>r.MAX_UPLOAD_SIZE_BYTES)throw new Error(`Não é permitido o envio de arquivos maiores que ${e} ${i}`);const a=t.type.split("/").pop()??"void";if(!o.includes(a))throw new Error(`Não é permitido o envio de arquivos que não sejam: ${l(o,"ou")}`)},w=t=>t?c(t).format("DD/MM/YYYY HH:mm:ss"):"-";export{r as c,w as f,f as s,h as v};
