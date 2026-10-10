import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,F as n,Tl as r,an as i,un as a}from"./control-ui-core-CndkyZ8m.js";import{$ as o,Q as s,c,nt as l,s as u}from"./lit-runtime-CIjzngcy.js";import{bi as d,fa as f,ia as p,si as m,xi as h}from"./control-ui-core-C5mtYcym.js";import{c as g,s as _}from"./gateway-runtime-BvWNTqPo.js";import{Xi as v,Zi as y,ft as b,nt as x}from"./control-ui-boot-shared-DpHhsTHW.js";import{a as S,n as C,o as w,t as T}from"./roster-element-L4DzfTsy.js";function E(e){let{context:r}=e,a=(e,t,i)=>{n(e)&&(e.preventDefault(),r.navigate(t,i))},s=l`<a
    class="btn"
    href=${f(`agents`,r.basePath)}
    @click=${e=>a(e,`agents`)}
    >${t(`agentsHome.manage`)}</a
  >`;return l` <div class="agents-home__header">
      ${b({title:h(`agents-home`),subtitle:d(`agents-home`),actions:l`${s}
          <a
            class="btn primary"
            href=${e.canCreate?`${f(`custodian`,r.basePath)}?intent=new-agent`:f(`agents`,r.basePath)}
            @click=${t=>a(t,e.canCreate?`custodian`:`agents`,e.canCreate?{search:`?intent=new-agent`}:void 0)}
            >${t(`agentsHome.create`)}</a
          >`})}
    </div>
    <section class="agents-home" aria-label=${h(`agents-home`)}>
      ${e.connected?o:l`<div class="callout warn" role="status">${t(`agentsHome.disconnected`)}</div>`}
      ${e.connected&&e.error?l`<div class="callout danger" role="alert">
              ${e.error}
              <button class="btn btn--sm" @click=${e.onRetry}>${t(`common.retry`)}</button>
            </div>`:o}
      ${e.connected&&e.loading&&e.cards.length===0?l` <div
              role="status"
              aria-label=${t(`agentsHome.loading`)}
              class="agents-home__grid"
            >
              ${[0,1,2,3].map(()=>l`<div class="agents-home__skeleton" aria-hidden="true"></div>`)}
            </div>`:o}
      ${e.connected&&!e.loading&&!e.error&&e.cards.length===0?l` <div class="agents-home__empty">
              <p>${t(`agentsHome.empty`)}</p>
              ${s}
            </div>`:o}
      <div class="agents-home__grid">
        ${c(e.cards,e=>e.id,e=>l` <a
            class="agents-home__card"
            data-agent-id=${e.id}
            href=${e.target.href}
            @click=${t=>a(t,`chat`,e.target.options)}
          >
            <div class="agents-home__identity">
              <div class="agents-home__avatar" aria-hidden="true">
                ${y(e)}
              </div>
              <div class="agents-home__name">
                <h2>${e.name}</h2>
                ${e.role?l`<p>${e.role}</p>`:o}
              </div>
            </div>
            ${e.model?l`<span class="agents-home__model" title=${e.model}>${e.model}</span>`:o}
            <div class="agents-home__activity">
              ${e.activeNow?l`<span class="agents-home__working">${t(`agentsHome.working`)}</span>`:e.lastActiveAt?t(`agentsHome.lastActive`,{time:i(e.lastActiveAt)}):t(`agentsHome.neverActive`)}
            </div>
            <p class="agents-home__preview" title=${e.preview??``}>
              ${e.preview||t(`agentsHome.noMessage`)}
            </p>
            <span class="btn primary agents-home__open">${t(`agentsHome.openChat`)}</span>
          </a>`)}
      </div>
    </section>`}function D(){return(D=e((()=>{s(),u(),m(),p(),v(),x(),r(),S(),a(),w()})))()}var O,k,A;function j(){return(j=e((()=>{s(),C(),g(),D(),O=class extends T{render(){return this.avatars.withActiveRoutes(()=>E({cards:this.cards().toSorted((e,t)=>Number(t.activeNow)-Number(e.activeNow)||t.lastActiveAt-e.lastActiveAt||Number(t.id===this.context.agents.state.agentsList?.defaultId)-Number(e.id===this.context.agents.state.agentsList?.defaultId)||e.id.localeCompare(t.id)),context:this.context,connected:this.connected,loading:this.roster.loading,error:this.roster.error??this.roster.subscriptionError,onRetry:()=>void this.refresh(),canCreate:_(this.context.gateway.snapshot,`openclaw.chat`,`operator.admin`)}))}},k=!0,A=()=>l`<openclaw-agents-home-page></openclaw-agents-home-page>`,customElements.get(`openclaw-agents-home-page`)||customElements.define(`openclaw-agents-home-page`,O)})))()}j();export{O as AgentsHomePage,k as header,A as render};
//# sourceMappingURL=agents-home-page-DeqPf662.js.map