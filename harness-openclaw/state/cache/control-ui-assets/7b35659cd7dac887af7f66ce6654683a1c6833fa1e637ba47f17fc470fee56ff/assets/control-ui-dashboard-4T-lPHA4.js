const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./board-view-DrLpj9i6.js","./control-ui-boot-shared-DpHhsTHW.js","./rolldown-runtime-8BhlS34s.js","./control-ui-foundation-DaCuy7E_.js","./control-ui-core-CndkyZ8m.js","./lit-runtime-CIjzngcy.js","./control-ui-core-C5mtYcym.js","./gateway-runtime-BvWNTqPo.js","./control-ui-boot-shared-ChkOvQif.js","./control-ui-boot-shared-DNpYeKSN.js","./control-ui-boot-shared-DwSLfX8E.js","./control-ui-boot-shared-DPto3YH7.js","./control-ui-boot-shared-C018SffO.js","./markdown-runtime-vPNULjtl.js","./config-runtime-B4vvJ76O.js","./control-ui-boot-shared-DF3-KJRn.js","./control-ui-boot-shared-DlJEsz5Q.js","./control-ui-boot-shared-hN7_nGsj.js","./control-ui-boot-shared-6jDbGebE.js","./control-ui-boot-shared-DwO55ELU.js","./control-ui-boot-shared-CoE663Cg.js","./control-ui-boot-shared-Bt2ZINpX.js","./board-view-Dx8NxXII.js","./control-ui-disabled-Bu0pNy8y.js","./near-viewport-observer-BF_iROOc.js","./board-widget-cell-render-C-h1I45M.js","./widget-sandbox-host-XANoO9rS.js","./control-ui-core-DvoiO6cr.css","./control-ui-boot-shared-BahwINek.css","./board-view-DiE8-i4O.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Mi as n,ji as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Sl as a,Tl as o,wl as s}from"./control-ui-core-CndkyZ8m.js";import{$ as c,Q as l,at as u,dt as d,nt as f,pt as p}from"./lit-runtime-CIjzngcy.js";import{Di as m,Ei as h,Lr as g,Rr as _}from"./control-ui-core-C5mtYcym.js";import{Jn as v,Yn as y,Zn as b,qn as x}from"./control-ui-boot-shared-DlJEsz5Q.js";function S(){return g(`openclaw-board-view`,()=>r(()=>import(`./board-view-DrLpj9i6.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]),import.meta.url))}var C;function w(){return(w=e((()=>{l(),u(),_(),m(),o(),b(),s(),n(),C=class extends a{constructor(...e){super(...e),this.session=null,this.client=null,this.connected=!1,this.canMutate=!1,this.canGrant=!1,this.presented=!0,this.provider=null,this.expanded=!1,this.activeTabId=``,this.viewError=null,this.viewLoad=null,this.lease=null,this.unsubscribeSnapshot=null,this.expansionInitialized=!1}connectedCallback(){super.connectedCallback(),this.requestUpdate()}updated(){this.viewLoad??=S().catch(e=>{this.viewError=e instanceof Error?e.message:String(e)}),this.synchronizeProvider()}disconnectedCallback(){this.releaseProvider(),super.disconnectedCallback()}synchronizeProvider(){let e=this.session,t=this.client;if(!this.isConnected||!e?.sessionKey.trim()||!t){this.releaseProvider();return}let n=y(e);if(this.lease?.client===t&&this.lease.cacheKey===n){(this.lease.session.sessionKey!==e.sessionKey||this.lease.session.agentId!==e.agentId)&&(this.lease.session={...e},this.requestUpdate()),this.lease.update(t,this.connected,{canPinWidgets:!1,canPinMcpApps:!1,canMutate:this.canMutate,canGrant:this.canGrant});return}this.releaseProvider(),this.expansionInitialized=!1,this.activeTabId=``;let r=x(e,t,this.connected,!1,!1,this.canMutate,this.canGrant);this.lease={...r,client:t,cacheKey:n,session:{...e}},this.provider=r.provider,this.unsubscribeSnapshot=r.provider.snapshot$.subscribe(()=>{this.reconcileSnapshot(r.provider),this.requestUpdate()}),this.reconcileSnapshot(r.provider),this.requestUpdate()}releaseProvider(){this.unsubscribeSnapshot?.(),this.unsubscribeSnapshot=null,this.lease?.release(),this.lease=null,this.provider=null}reconcileSnapshot(e){let t=e.snapshot$.value,n=t.tabs[0]?.tabId??``;t.tabs.some(e=>e.tabId===this.activeTabId)||(this.activeTabId=n),!this.expansionInitialized&&e.hasLoadedSnapshot&&(this.expansionInitialized=!0,this.expanded=v(t))}render(){let e=this.provider,t=e?.snapshot$.value,n=this.lease?.session,r=!!(t&&v(t)),a=e?{appViewGeneration:e.appViewGeneration,applyOps:t=>e.applyOps(t),grant:(t,n)=>e.grant(t,n),selectTab:e=>{this.activeTabId=e},frameLoadFailed:t=>e.refreshWidgetFrame(t),widgetAppView:(t,n)=>e.widgetAppView(t,n),refreshWidgetAppView:(t,n)=>e.refreshWidgetAppView(t,n)}:null;return f`
      <section class="plugin-session-dashboard">
        <button
          type="button"
          class="plugin-session-dashboard__toggle"
          aria-expanded=${this.expanded?`true`:`false`}
          @click=${()=>{this.expansionInitialized=!0,this.expanded=!this.expanded}}
        >
          <span class="plugin-session-dashboard__title">
            ${h.kanban}<span>${i(`pluginUi.dashboardTitle`)}</span>
          </span>
          <span class="plugin-session-dashboard__chevron" aria-hidden="true"
            >${h.arrowDown}</span
          >
        </button>
        <div class="plugin-session-dashboard__body" ?hidden=${!this.expanded}>
          ${this.viewError?f`<p role="alert">${this.viewError}</p>
                  <button
                    type="button"
                    @click=${()=>{this.viewLoad=null,this.viewError=null}}
                  >
                    ${i(`common.retry`)}
                  </button>`:r&&e&&t&&n&&a?f`
                    <openclaw-board-view
                      .active=${this.expanded&&this.presented}
                      .session=${n}
                      .snapshot=${t}
                      .activeTabId=${this.activeTabId}
                      .widgetFrameUrl=${(t,n)=>e.widgetFrameUrl(t,n)}
                      .callbacks=${a}
                      .sessions=${[]}
                      .canMutate=${this.canMutate}
                      .canGrant=${this.canGrant}
                    ></openclaw-board-view>
                  `:f`<p class="plugin-session-dashboard__empty">
                    ${i(`pluginUi.dashboardEmpty`)}
                  </p>`}
        </div>
        ${!this.expanded&&this.expansionInitialized&&!r?f`<p class="plugin-session-dashboard__collapsed-empty">
                ${i(`pluginUi.dashboardEmpty`)}
              </p>`:c}
      </section>
    `}},t([p({attribute:!1})],C.prototype,`session`,void 0),t([p({attribute:!1})],C.prototype,`client`,void 0),t([p({attribute:!1})],C.prototype,`connected`,void 0),t([p({attribute:!1})],C.prototype,`canMutate`,void 0),t([p({attribute:!1})],C.prototype,`canGrant`,void 0),t([p({attribute:!1})],C.prototype,`presented`,void 0),t([d()],C.prototype,`provider`,void 0),t([d()],C.prototype,`expanded`,void 0),t([d()],C.prototype,`activeTabId`,void 0),t([d()],C.prototype,`viewError`,void 0),customElements.get(`openclaw-plugin-session-dashboard`)||customElements.define(`openclaw-plugin-session-dashboard`,C)})))()}w();
//# sourceMappingURL=control-ui-dashboard-4T-lPHA4.js.map