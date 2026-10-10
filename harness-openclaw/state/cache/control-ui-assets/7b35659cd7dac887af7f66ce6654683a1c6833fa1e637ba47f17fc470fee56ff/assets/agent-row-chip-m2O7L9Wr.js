import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Bs as i,Pc as a,Sl as o,Vs as s,Yc as c,fc as l,gl as u,mc as d,ml as f,wl as p,yc as m}from"./control-ui-core-CndkyZ8m.js";import{Q as h,at as g,nt as _,pt as v}from"./lit-runtime-CIjzngcy.js";import{$r as y,Qr as b}from"./control-ui-core-C5mtYcym.js";import{Co as x,So as S}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Xi as C,Zi as w}from"./control-ui-boot-shared-DpHhsTHW.js";function T(e){return _`<openclaw-agent-row-chip .agentId=${e}></openclaw-agent-row-chip>`}var E;function D(){return(D=e((()=>{r(),h(),g(),y(),l(),f(),x(),a(),p(),s(),C(),E=class extends o{constructor(){super(),this.avatars=new S(this),new i(this).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentIdentity,(e,t)=>e.subscribe(t)).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t))}render(){let e=this.context?.agents.state.agentsList,t=this.agentId?.trim()||c({agentsList:e,hello:this.context?.gateway.snapshot.hello}),n=e?.agents.find(e=>e.id===t)??{id:t},r=this.context?.agentIdentity.get(t),i=d(n,r),a=i===t?`agent:${t}`:`${i} (agent:${t})`,o=u(n,r);return this.avatars.withActiveRoutes(()=>{let e=o?this.avatars.resolve(o):null;return _`<span
        class="agent-row-chip"
        data-agent-id=${t}
        role="img"
        aria-label=${a}
        title=${a}
      >
        ${w({id:t,avatar:e,textAvatar:m(n,r)},`agent-row-chip__avatar`)}
        <span class="agent-row-chip__name">${i}</span>
      </span>`})}},t([n({context:b,subscribe:!0}),v({attribute:!1})],E.prototype,`context`,void 0),t([v({attribute:!1})],E.prototype,`agentId`,void 0),customElements.get(`openclaw-agent-row-chip`)||customElements.define(`openclaw-agent-row-chip`,E)})))()}export{T as n,D as t};
//# sourceMappingURL=agent-row-chip-m2O7L9Wr.js.map