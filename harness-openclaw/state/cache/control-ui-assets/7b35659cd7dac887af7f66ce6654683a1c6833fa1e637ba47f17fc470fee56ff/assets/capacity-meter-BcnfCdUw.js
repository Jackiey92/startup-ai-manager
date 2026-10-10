import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Q as t,nt as n}from"./lit-runtime-CIjzngcy.js";function r(e){if(e.mode===`discrete`&&e.total<=12)return n`<span
      class="capacity-meter-pips session-context-meter--${e.tone}"
      role="img"
      aria-label=${e.label}
    >
      ${Array.from({length:e.total},(t,r)=>n`
          <span
            class="capacity-meter-pips__pip ${e.used!==null&&r<e.used?`capacity-meter-pips__pip--filled`:``}"
          ></span>
        `)}
    </span>`;let t=e.mode===`continuous`?e.percent:e.used===null?0:e.used/e.total*100;return n`<span
    class="session-context-meter session-context-meter--${e.tone}"
    role="img"
    aria-label=${e.label}
  >
    <span class="session-context-meter__fill" style=${`width: ${t}%`}></span>
  </span>`}function i(){return(i=e((()=>{t()})))()}export{r as n,i as t};
//# sourceMappingURL=capacity-meter-BcnfCdUw.js.map