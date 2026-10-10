import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$ as t,Q as n,nt as r}from"./lit-runtime-CIjzngcy.js";import{Hi as i,mr as a,pr as o,zi as s}from"./control-ui-boot-shared-DpHhsTHW.js";function c(e){let n=`__openclaw_custom_model__`,o=new Set([e.value,...e.options.map(e=>e.value)]);for(;o.has(n);)n+=`_`;let s=e.options.some(t=>t.value===e.value),c=[...e.options.map(e=>({...e,description:e.detail})),...e.custom?[{value:n,label:e.custom.label}]:[]];return r`
    <div class="model-picker">
      ${a({id:e.id,label:e.label,value:e.value,options:c,disabled:e.disabled,title:e.title,placement:e.placement,searchable:!0,showOptionTooltips:!1,showSelectedDescription:e.showSelectedDetail,className:`model-picker__select ${e.className??``}`,onOpen:e.onOpen,renderLeading:e=>e.provider?i(e.provider,{className:`model-picker__provider-icon`}):t,onChange:e.onChange,onChangeTarget:(t,r)=>{let i=r.closest(`.model-picker`)?.querySelector(`.model-picker__custom`);if(t===n&&i){i.hidden=!1,queueMicrotask(()=>i.focus());return}i&&(i.hidden=!0),e.onChange(t)}})}
      ${e.custom?r`<input
              id=${e.custom.id??t}
              class="settings-input model-picker__custom"
              aria-label=${e.custom.label}
              aria-invalid=${e.custom.invalid?`true`:`false`}
              aria-describedby=${e.custom.describedBy??t}
              placeholder=${e.custom.placeholder??``}
              .value=${e.value}
              ?hidden=${s}
              ?disabled=${e.disabled}
              @input=${t=>{e.custom?.commit!==`change`&&e.onChange(t.currentTarget.value)}}
              @change=${t=>{e.custom?.commit===`change`&&e.onChange(t.currentTarget.value)}}
            />`:t}
    </div>
  `}function l(){return(l=e((()=>{n(),s(),o()})))()}export{c as n,l as t};
//# sourceMappingURL=model-picker-5inXghL_.js.map