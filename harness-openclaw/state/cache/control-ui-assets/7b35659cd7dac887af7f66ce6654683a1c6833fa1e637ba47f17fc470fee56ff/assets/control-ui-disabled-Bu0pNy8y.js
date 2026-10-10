import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,F as n,Tl as r}from"./control-ui-core-CndkyZ8m.js";import{Q as i,nt as a}from"./lit-runtime-CIjzngcy.js";import{fa as o,ia as s}from"./control-ui-core-C5mtYcym.js";function c(e,r,i){if(e?.plugins?.errors.some(e=>e.pluginId===r&&e.code===`custom-plugin-ui-disabled`))return a`<div class="card-title">${t(`pluginUi.customPluginsDisabled`)}</div>
    <p class="card-sub">${t(`pluginUi.customPluginsEnableHint`)}</p>
    <a
      class="btn btn--sm"
      href=${o(`labs`,e.basePath)}
      @click=${t=>{n(t)&&(t.preventDefault(),i?.(),e.navigate(`labs`))}}
      >${t(`pluginUi.openLabs`)}</a
    >`}function l(){return(l=e((()=>{i(),s(),r()})))()}export{c as n,l as t};
//# sourceMappingURL=control-ui-disabled-Bu0pNy8y.js.map