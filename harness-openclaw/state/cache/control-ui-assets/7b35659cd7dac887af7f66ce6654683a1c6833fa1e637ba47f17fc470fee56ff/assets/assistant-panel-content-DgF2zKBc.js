import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Lr as n,Rr as r,zr as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,Bs as o,Sl as s,Tl as c,Vs as l,wl as u}from"./control-ui-core-CndkyZ8m.js";import{$ as d,Q as f,T as p,at as m,dt as h,nt as g,pt as _,w as v}from"./lit-runtime-CIjzngcy.js";import{$r as y,Di as b,Ei as x,Qr as S}from"./control-ui-core-C5mtYcym.js";import{i as C,r as w,t as T}from"./custodian-surface-D4gFPpgI.js";import{ct as E,lt as D,ot as O,st as k,t as A}from"./control-ui-boot-shared-hN7_nGsj.js";import"./control-ui-boot-shared-CoE663Cg.js";import{L as j}from"./control-ui-boot-chat-CLUFzlXZ.js";var M;function N(){return(N=e((()=>{i(),f(),m(),v(),y(),c(),u(),E(),A(),j(),b(),M=class extends s{constructor(...e){super(...e),this.sessionKey=``,this.agentId=``,this.workContext={page:`chat`},this.includeContext=!0,this.selection=``,this.selectionAvailable=!1,this.selectionScope=``,this.updateSelectionAvailability=()=>{let e=window.getSelection();this.selectionAvailable=!(!e||e.isCollapsed||!e.anchorNode||this.contains(e.anchorNode))},this.attachSelection=e=>{e.preventDefault();let t=window.getSelection();!t||t.isCollapsed||t.anchorNode&&this.contains(t.anchorNode)||(this.selection=n(t.toString(),640),this.includeContext=!0)}}connectedCallback(){super.connectedCallback(),document.addEventListener(`selectionchange`,this.updateSelectionAvailability),this.updateSelectionAvailability()}disconnectedCallback(){document.removeEventListener(`selectionchange`,this.updateSelectionAvailability),super.disconnectedCallback()}willUpdate(){let e=this.workContext,t=JSON.stringify([this.context.gateway.connection.gatewayUrl,e.page,e.sessionKey,e.sessionId,e.agentId,e.file]);this.selectionScope&&this.selectionScope!==t&&(this.selection=``),this.selectionScope=t}render(){let e={...this.workContext,selection:this.selection||void 0},t=k(e),n=JSON.stringify([this.context.gateway.connection.gatewayUrl,this.agentId,this.sessionKey]);return g`
      <div class="assistant-panel-context">
        ${this.includeContext?g`
                <details>
                  <summary>
                    ${a(`assistantPanel.context`,{context:e.title||e.page})}
                  </summary>
                  <pre>${t}</pre>
                </details>
                <button
                  type="button"
                  class="rail-header__action"
                  aria-label=${a(`assistantPanel.removeContext`)}
                  @click=${()=>{this.includeContext=!1}}
                >
                  ${x.x}
                </button>
              `:g`<button
                type="button"
                class="btn btn--sm"
                @click=${()=>{this.includeContext=!0}}
              >
                ${a(`assistantPanel.includeContext`)}
              </button>`}
        <button
          type="button"
          class="rail-header__action"
          aria-label=${a(`assistantPanel.attachSelection`)}
          ?disabled=${!this.selectionAvailable}
          title=${a(`assistantPanel.attachSelection`)}
          @mousedown=${this.attachSelection}
          @click=${e=>{e.detail===0&&this.attachSelection(e)}}
        >
          ${x.messageSquare}
        </button>
        ${this.selection?g`<button
                type="button"
                class="btn btn--sm"
                aria-label=${a(`assistantPanel.removeSelection`)}
                @click=${()=>{this.selection=``}}
              >
                ${a(`assistantPanel.selection`)} ${x.x}
              </button>`:d}
      </div>
      ${p(n,g`<openclaw-chat-pane
          .paneId=${`home-dock:${n}`}
          .presentationId=${`home-dock:${n}`}
          .sessionKey=${this.sessionKey}
          .agentId=${this.agentId}
          .inputRegion=${`dock`}
          .active=${!0}
          .compact=${!0}
          .narrow=${!0}
          .workContext=${this.includeContext?t:void 0}
        ></openclaw-chat-pane>`)}
    `}},t([r({context:S,subscribe:!0})],M.prototype,`context`,void 0),t([_({attribute:!1})],M.prototype,`sessionKey`,void 0),t([_({attribute:!1})],M.prototype,`agentId`,void 0),t([_({attribute:!1})],M.prototype,`workContext`,void 0),t([h()],M.prototype,`includeContext`,void 0),t([h()],M.prototype,`selection`,void 0),t([h()],M.prototype,`selectionAvailable`,void 0),customElements.define(`openclaw-home-session`,M)})))()}var P;function F(){return(F=e((()=>{f(),m(),u(),l(),E(),C(),T(),N(),P=class extends s{constructor(){super(),this.active=!1,this.destination=`custodian`,this.sessionKey=``,this.agentId=``,this.pageRouteId=`chat`,this.pageSessionKey=``,this.pageAgentId=``,this.custodianVisible=!1,new o(this).watch(()=>this.store??w,(e,t)=>e.subscribe(t)).watch(()=>this.context,(e,t)=>D(e,t)).watch(()=>this.context?.sessions,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t))}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent(`assistant-custodian-store`,{detail:this.store??w,bubbles:!0}))}willUpdate(){let e=this.active&&this.destination===`custodian`;e&&!this.custodianVisible&&(this.store??w).refreshTranscriptIfIdle(),this.custodianVisible=e}render(){if(!this.active)return d;let e=this.store??w;return this.destination===`home`?g`<openclaw-home-session
          .sessionKey=${this.sessionKey}
          .agentId=${this.agentId}
          .workContext=${this.context?O(this.context,this.pageRouteId,this.pageSessionKey,this.pageAgentId):void 0}
        ></openclaw-home-session>`:g`<openclaw-custodian-surface
          .store=${e}
          .onboarding=${e.activeVariant===`onboarding`}
          .newAgentIntent=${e.activeVariant===`new-agent`}
          compact
        ></openclaw-custodian-surface>`}},t([_({type:Boolean})],P.prototype,`active`,void 0),t([_()],P.prototype,`destination`,void 0),t([_()],P.prototype,`sessionKey`,void 0),t([_()],P.prototype,`agentId`,void 0),t([_({attribute:!1})],P.prototype,`context`,void 0),t([_()],P.prototype,`pageRouteId`,void 0),t([_()],P.prototype,`pageSessionKey`,void 0),t([_()],P.prototype,`pageAgentId`,void 0),t([_({attribute:!1})],P.prototype,`store`,void 0),customElements.define(`openclaw-assistant-panel-content`,P)})))()}F();export{P as OpenClawAssistantPanelContent};
//# sourceMappingURL=assistant-panel-content-DgF2zKBc.js.map