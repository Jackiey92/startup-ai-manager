import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$ as t,Q as n,nt as r}from"./lit-runtime-CIjzngcy.js";import{wi as i}from"./control-ui-core-C5mtYcym.js";function a(e){let n=e.destinations.filter(t=>t.dock!==e.current);return n.length===0?t:r`<span class=${e.groupClass} role="group" aria-label=${e.groupLabel}>
    ${n.map(t=>r`<openclaw-tooltip .content=${t.label}>
        <button
          class=${`rail-header__action ${t.className??``}`}
          type="button"
          aria-label=${t.label}
          @click=${()=>e.onSelect(t.dock)}
        >
          ${t.icon}
        </button>
      </openclaw-tooltip>`)}
  </span>`}function o(){return(o=e((()=>{n(),i()})))()}export{a as n,o as t};
//# sourceMappingURL=dock-destination-controls-DIWMQYZZ.js.map