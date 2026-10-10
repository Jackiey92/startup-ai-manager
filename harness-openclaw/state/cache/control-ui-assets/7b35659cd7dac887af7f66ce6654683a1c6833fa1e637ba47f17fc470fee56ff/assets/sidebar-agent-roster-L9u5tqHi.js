import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,F as r,Pt as i,Tl as a}from"./control-ui-core-CndkyZ8m.js";import{$ as o,Q as s,at as c,c as l,dt as u,nt as d,pt as f,s as p}from"./lit-runtime-CIjzngcy.js";import{Di as m,Ei as h,Nt as g,Vt as _,a as v,fa as y,ia as b,jt as x,o as S}from"./control-ui-core-C5mtYcym.js";import{Gr as C,Lr as w,Rr as T,Wr as E,Xi as D,Zi as O,zr as k}from"./control-ui-boot-shared-DpHhsTHW.js";import{a as A,i as j,n as M,o as N,r as P,t as F}from"./roster-element-L4DzfTsy.js";function I(e,t){return d`<openclaw-sidebar-new-session-menu
    .host=${e}
    .active=${e.navigationVisible}
    .triggerClass=${t}
  ></openclaw-sidebar-new-session-menu>`}function L(e,t){return d`<openclaw-sidebar-agent-roster
    .host=${e}
    .active=${e.navigationVisible}
    .sections=${t}
    .involvingMe=${e.sessionInvolvingMeFilterActive}
  ></openclaw-sidebar-agent-roster>`}var R,z;function B(){return(B=e((()=>{s(),c(),p(),b(),x(),a(),A(),P(),M(),w(),m(),D(),v(),E(),N(),R=class extends F{constructor(...e){super(...e),this.sections=[],this.involvingMe=!1,this.collapsed=new Set,this.settingsScope=null,this.published=null}willUpdate(){let e=this.context.gateway.connection.gatewayUrl;this.settingsScope!==e&&(this.settingsScope=e,this.collapsed=new Set(g(e).sidebarCollapsedAgentIds??[]));let t=j(this.context);t.setInvolvingMe(this.involvingMe);let n=t.snapshot;(this.published?.snapshot!==n||this.published.collapsed!==this.collapsed)&&(this.published={snapshot:n,collapsed:this.collapsed},this.host.rosterSessionSource={result:n.result,agentIds:n.cards.map(e=>e.id),collapsedAgentIds:this.collapsed})}disconnectedCallback(){this.host.rosterSessionSource=null,j(this.context).setInvolvingMe(!1),super.disconnectedCallback()}toggleAgent(e){let t=new Set(this.collapsed);t.delete(e)||t.add(e),this.setCollapsedAgents(t)}setCollapsedAgents(e){_({gatewayUrl:this.context.gateway.connection.gatewayUrl,sidebarCollapsedAgentIds:[...e]},{selectGateway:!1}),this.collapsed=e}render(){return this.avatars.withActiveRoutes(()=>{let e=this.cards(),t=this.roster.error??this.roster.subscriptionError,i=this.host.readNewSessionAccess();return T(this.host,d`<div class="sidebar-agent-roster">
          ${t?d`<button class="sidebar-agent-roster__link" @click=${()=>void this.refresh()}>${n(`agentsHome.loadFailed`)}</button>`:o}
          ${this.roster.loading&&e.length===0?d`<span role="status" aria-label=${n(`common.loading`)} class="skeleton skeleton-line"></span>`:o}
          ${l(e,e=>e.id,t=>{let a=this.collapsed.has(t.id),s=this.sections.filter(e=>e.id.startsWith(`agent:${t.id}:`)),c=a?s.flatMap(e=>e.rows):[];return d`<section
                class="sidebar-agent-roster__group"
                data-agent-group=${t.id}
                aria-label=${t.name}
              >
                <div class="sidebar-agent-roster__header">
                  <button
                    type="button"
                    class="sidebar-agent-roster__action sidebar-agent-roster__chevron"
                    data-agent-collapse=${t.id}
                    aria-label=${n(a?`agentsHome.expandAgent`:`agentsHome.collapseAgent`,{agent:t.name})}
                    aria-expanded=${String(!a)}
                    @click=${()=>this.toggleAgent(t.id)}
                  >
                    <span class="sidebar-agent-roster__chevron" aria-hidden="true"
                      >${a?h.chevronRight:h.chevronDown}</span
                    >
                  </button>
                  <a
                    class="sidebar-agent-roster__row"
                    data-agent-id=${t.id}
                    href=${t.target.href}
                    title=${n(`agentsHome.openChat`)}
                    @click=${e=>{r(e)&&(e.preventDefault(),this.host.openMainSession(t.id))}}
                  >
                    <span class="sidebar-agent-roster__avatar" aria-hidden="true">
                      ${O(t)}
                    </span>
                    <span class="sidebar-agent-roster__copy"><span>${t.name}</span></span>
                  </a>
                  <span class="sidebar-agent-roster__signals">
                    ${a?C(c,!0,c.length,c.reduce((e,t)=>e+(t.workspaceConflictCount??0),0)):o}
                  </span>
                  <span
                    class="sidebar-agent-roster__actions"
                    @keydown=${e=>{e.key===` `&&e.target instanceof HTMLAnchorElement&&(e.preventDefault(),e.target.click())}}
                  >
                    ${S({basePath:this.host.basePath,agentId:t.id,className:`sidebar-agent-roster__action sidebar-agent-roster__new`,label:`${n(`agentChip.newConversation`)}: ${t.name}`,disabledReason:i.allowed?void 0:i.reason,onOpen:(e,t)=>this.host.requestOpenNewSession(e,t)})}
                    <wa-dropdown
                      placement="bottom-end"
                      @wa-show=${()=>this.host.dismissTransientMenus()}
                      @wa-select=${n=>{switch(n.detail.item.value){case`main`:this.host.openMainSession(t.id);break;case`sessions`:this.context.agentSelection.setScope(t.id),this.host.onNavigate?.(`sessions`);break;case`collapse-others`:this.setCollapsedAgents(new Set(e.filter(e=>e.id!==t.id).map(e=>e.id)))}}}
                    >
                      <button
                        slot="trigger"
                        type="button"
                        class="sidebar-agent-roster__action"
                        aria-label=${n(`agentsHome.agentOptions`,{agent:t.name})}
                      >
                        ${h.moreHorizontal}
                      </button>
                      <wa-dropdown-item value="main"
                        >${n(`agentsHome.openMainChat`)}</wa-dropdown-item
                      >
                      <wa-dropdown-item value="sessions"
                        >${n(`agentsHome.allSessions`)}</wa-dropdown-item
                      >
                      <wa-dropdown-item value="collapse-others"
                        >${n(`agentsHome.collapseOthers`)}</wa-dropdown-item
                      >
                    </wa-dropdown>
                  </span>
                </div>
                ${a?o:s.map(e=>k({host:this.host,section:e,personHeaders:void 0}))}
              </section>`})}
        </div>`)})}},t([f({attribute:!1})],R.prototype,`host`,void 0),t([f({attribute:!1})],R.prototype,`sections`,void 0),t([f({attribute:!1})],R.prototype,`involvingMe`,void 0),t([u()],R.prototype,`collapsed`,void 0),customElements.define(`openclaw-sidebar-agent-roster`,R),z=class extends F{constructor(...e){super(...e),this.triggerClass=``}render(){return this.avatars.withActiveRoutes(()=>{let e=this.host.readNewSessionAccess(),t=this.cards();return d`<wa-dropdown
        class="sidebar-new-session-menu"
        placement="bottom-end"
        aria-label=${n(`agentChip.agents`)}
        @wa-show=${()=>this.host.dismissTransientMenus()}
        @wa-select=${n=>{let r=n.detail.item;if(n.preventDefault(),r.dataset.nativeNavigation){delete r.dataset.nativeNavigation;return}let i=r.value;if(e.allowed&&i&&t.some(e=>e.id===i)){let e=this.querySelector(`wa-dropdown`);e&&(e.open=!1),this.host.requestOpenNewSession(i)}}}
      >
        <button
          slot="trigger"
          type="button"
          class=${this.triggerClass}
          aria-label=${n(`agentChip.newConversation`)}
          title=${e.allowed?n(`agentChip.newConversation`):e.reason}
          ?disabled=${!e.allowed||t.length===0}
        >
          ${h.plus}
        </button>
        ${t.map(e=>d`<wa-dropdown-item
            value=${e.id}
            @click=${e=>{r(e)?e.preventDefault():e.currentTarget instanceof HTMLElement&&(e.currentTarget.dataset.nativeNavigation=`true`)}}
            ><a
              class="sidebar-agent-roster__link"
              href=${`${y(`new-session`,this.host.basePath)}${i(e.id)}`}
              tabindex="-1"
              ><span class="sidebar-agent-roster__avatar" aria-hidden="true">
                ${O(e)} </span
              ><span>${e.name}</span></a
            >
          </wa-dropdown-item>`)}
      </wa-dropdown>`})}},t([f({attribute:!1})],z.prototype,`host`,void 0),t([f({attribute:!1})],z.prototype,`triggerClass`,void 0),customElements.define(`openclaw-sidebar-new-session-menu`,z)})))()}B();export{L as renderSidebarAgentRoster,I as renderSidebarNewSessionMenu};
//# sourceMappingURL=sidebar-agent-roster-L9u5tqHi.js.map