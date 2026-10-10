import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{wa as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Pc as r,Tl as i,fc as a,mc as o,pc as s}from"./control-ui-core-CndkyZ8m.js";import{$ as c,Q as l,nt as u}from"./lit-runtime-CIjzngcy.js";import{Di as d,Ei as f}from"./control-ui-core-C5mtYcym.js";import{ct as p}from"./control-ui-boot-new-CQMzhCGu.js";function m(e){let r=e.selectedId??e.selection.state.scopeId??``,i=r?t(r):``,a=e.allowAll!==!1,l=n=>e.agents.some(e=>e.kind===`system`&&t(e.id)===n),d=s(e.agents);if(d.length<=1)return c;let p=new Map(d.map(e=>{let n=t(e.id);return[n,n===e.id?e:{...e,id:n}]}));for(let n of e.additionalAgentIds??[]){if(!n.trim())continue;let e=t(n);!l(e)&&!p.has(e)&&p.set(e,{id:e})}i&&!l(i)&&!p.has(i)&&p.set(i,{id:i});let m=[...p.values()].toSorted((e,t)=>o(e).localeCompare(o(t))),h=l(i)?a?``:m[0]?.id??``:i,g=[...a?[{value:``,label:n(`agentScope.allAgents`),icon:f.users}]:[],...m.map(e=>({value:e.id,label:o(e),agent:e}))];return u`
    <div class="agent-scope-control">
      <openclaw-agent-select
        .options=${g}
        .value=${h}
        .accessibleLabel=${n(`agentScope.label`)}
        .menuLabel=${n(`agentScope.label`)}
        .onSelect=${t=>a?e.selection.setScope(t||null):e.selection.set(t||null)}
      ></openclaw-agent-select>
    </div>
  `}function h(){return(h=e((()=>{l(),i(),a(),r(),p(),d()})))()}export{m as n,h as t};
//# sourceMappingURL=agent-scope-control-CS9bqwlc.js.map