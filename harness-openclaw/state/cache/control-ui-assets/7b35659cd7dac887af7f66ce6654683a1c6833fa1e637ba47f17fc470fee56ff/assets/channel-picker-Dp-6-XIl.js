import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$ as t,Q as n,nt as r}from"./lit-runtime-CIjzngcy.js";import{mr as i,pr as a}from"./control-ui-boot-shared-DpHhsTHW.js";import{$ as o,Q as s,et as c}from"./control-ui-boot-shared-CoE663Cg.js";import{n as l,t as u}from"./image-with-fallback-DE6ZLOFG.js";function d(){return(d=e((()=>{})))()}function f(e,t,n,i={}){let a=n===`picker`?`tile`:n;return r`${u(i.pluginIconUrl,(s,l)=>{let[u,d]=s?[``,``]:o(e),f=`${n===`picker`?`--channels-art-size:24px;`:``}${s?``:`--channels-art-a:${u};--channels-art-b:${d}`}`,p=n===`cover`&&i.pluginIconUrl?` channels-cover--icon`:``;return r`<span
      class=${`channels-${a}${p}${s?``:` channels-${a}--fallback`}`}
      style=${f}
      aria-hidden="true"
    >
      ${s?r`<img src=${s} alt="" loading="lazy" decoding="async" @error=${l} />`:r`<span>${c(t)}</span>`}
    </span>`})}`}function p(){return(p=e((()=>{n(),s(),l()})))()}function m(e){return i({...e,className:`channel-picker`,renderLeading:e=>e.kind===`neutral`?t:f(e.value,e.label,`picker`)})}function h(){return(h=e((()=>{n(),p(),a()})))()}export{d as a,f as i,m as n,p as r,h as t};
//# sourceMappingURL=channel-picker-Dp-6-XIl.js.map