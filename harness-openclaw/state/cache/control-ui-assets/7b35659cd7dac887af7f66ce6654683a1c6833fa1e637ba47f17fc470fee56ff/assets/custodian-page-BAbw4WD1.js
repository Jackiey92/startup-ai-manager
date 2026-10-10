import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as a,Sl as o,Tl as s,Vs as c,_r as l,an as u,mr as d,un as f,wl as p}from"./control-ui-core-CndkyZ8m.js";import{$ as m,Q as h,at as g,dt as _,nt as v,pt as y}from"./lit-runtime-CIjzngcy.js";import{$r as b,Qr as x}from"./control-ui-core-C5mtYcym.js";import{c as S,u as C}from"./gateway-runtime-BvWNTqPo.js";import{Lt as w,lt as T,nt as E}from"./control-ui-boot-shared-DpHhsTHW.js";import{i as D,r as O,t as k}from"./custodian-surface-D4gFPpgI.js";import"./settings-rVWcgEC0.js";function A(e){switch(e){case`system-agent`:return i(`custodian.history.sources.systemAgent`);case`doctor`:return i(`custodian.history.sources.doctor`);case`config-rpc`:return i(`custodian.history.sources.settings`);case`external`:return i(`custodian.history.sources.manualEdit`);case`cli`:return i(`custodian.history.sources.cli`);case`plugin-install`:return i(`custodian.history.sources.pluginInstall`);case`unknown`:return i(`custodian.history.sources.unknown`)}return e}function j(e){return v`
    <article class="custodian__change-card ${e.invalid?`is-invalid`:``}">
      <div class="custodian__change-meta">
        <span class="custodian__change-source">${A(e.source)}</span>
        <time datetime=${new Date(e.at).toISOString()}
          >${u(e.at)}</time
        >
      </div>
      <div class="custodian__change-summary">${e.summary}</div>
      ${e.invalid?v`<div class="custodian__change-warning">${i(`custodian.history.invalidEdit`)}</div>`:m}
      ${e.opaqueChange?v`<div class="custodian__change-note">${i(`custodian.history.opaqueChange`)}</div>`:m}
      ${e.changedPaths?.length?v`<details class="custodian__change-paths">
              <summary>
                ${i(`custodian.history.changedPaths`,{count:String(e.changedPaths.length)})}
              </summary>
              <ul>
                ${e.changedPaths.map(e=>v`<li><code>${e}</code></li>`)}
              </ul>
            </details>`:m}
    </article>
  `}function M(e){return v`
    <section class="custodian__history" aria-label=${i(`custodian.history.title`)}>
      <div class="custodian__history-heading">
        <strong>${i(`custodian.history.title`)}</strong>
        <span>${i(`custodian.history.description`)}</span>
      </div>
      ${e.error?v`<div class="custodian__history-error" role="alert">
              <span>${e.error}</span>
              <button class="btn btn--sm" type="button" @click=${()=>e.onLoad(!0)}>
                ${i(`common.retry`)}
              </button>
            </div>`:m}
      ${e.loading&&e.entries.length===0?T({label:i(`custodian.history.loading`)}):v`<div class="custodian__change-list">
              ${e.entries.map(j)}
              ${e.loading?v`<div
                      class="custodian__history-state"
                      role="status"
                      aria-label=${i(`custodian.history.loading`)}
                    >
                      <span class="custodian__history-spinner" aria-hidden="true"></span>
                    </div>`:e.loaded&&e.entries.length===0&&!e.error?v`<div class="custodian__history-state" role="status">
                        ${i(`custodian.history.empty`)}
                      </div>`:m}
            </div>`}
      ${e.nextCursor?v`<button
              class="btn btn--ghost custodian__history-more"
              type="button"
              ?disabled=${e.loadingMore}
              @click=${()=>e.onLoad(!1)}
            >
              ${e.loadingMore?i(`custodian.history.loadingMore`):i(`custodian.history.loadMore`)}
            </button>`:m}
    </section>
  `}function N(){return(N=e((()=>{h(),E(),s(),f()})))()}var P,F;function I(){return(I=e((()=>{r(),h(),g(),b(),w(),s(),l(),S(),p(),c(),N(),D(),k(),P=50,F=class extends o{constructor(){super(),this.onboarding=!1,this.newAgentIntent=!1,this.store=O,this.historyAvailable=!1,this.historyOpen=!1,this.historyEntries=[],this.historyNextCursor=null,this.historyLoading=!1,this.historyLoadingMore=!1,this.historyError=null,this.historyLoaded=!1,this.historyClient=null,this.historyRequestEpoch=0,this.channelsSource=null,new a(this).watch(()=>this.store,(e,t)=>{let n=e.subscribe(t);return e.refreshTranscriptIfIdle(),n}).effect(()=>this.context?.channels,e=>{this.channelsSource=e;let t=e.subscribe(()=>{this.ensureOnboardingChannelStatus(),this.requestUpdate()});return this.ensureOnboardingChannelStatus(),()=>{t(),this.channelsSource===e&&(this.channelsSource=null)}})}async getUpdateComplete(){let e=await super.getUpdateComplete();return await this.querySelector(`openclaw-custodian-surface`)?.updateComplete,e}willUpdate(){this.synchronizeHistoryClient(),this.ensureOnboardingChannelStatus()}ensureOnboardingChannelStatus(){let e=this.channelsSource;if(!this.onboarding||this.store.channelOnboardingNudgeClosed||!e)return;let t=e.state;!t.connected||t.channelsSnapshot||t.channelsLoading||t.channelsError||e.refresh(!1)}synchronizeHistoryClient(){let e=this.context.gateway.snapshot,t=e.phase===`connected`?e.client:null,n=t!==null&&C(e,`openclaw.changes.list`)===!0;(t!==this.historyClient||n!==this.historyAvailable)&&(this.historyClient=t,this.historyAvailable=n,this.historyOpen=!1,this.resetHistory())}resetHistory(){this.historyRequestEpoch+=1,this.historyEntries=[],this.historyNextCursor=null,this.historyLoading=!1,this.historyLoadingMore=!1,this.historyError=null,this.historyLoaded=!1}toggleHistory(){this.historyOpen=!this.historyOpen,this.historyOpen&&!this.historyLoading&&!this.historyLoadingMore&&this.loadHistory(!0)}async loadHistory(e){let t=this.historyClient,n=e?void 0:this.historyNextCursor??void 0;if(!t||!this.historyAvailable||this.historyLoading||this.historyLoadingMore||!e&&!n)return;let r=++this.historyRequestEpoch;e?this.historyLoading=!0:this.historyLoadingMore=!0,this.historyError=null;let a=()=>this.isConnected&&this.historyClient===t&&this.historyRequestEpoch===r&&this.historyAvailable;try{let r=await t.request(`openclaw.changes.list`,{limit:P,...n?{beforeCursor:n}:{}});if(!a())return;this.historyEntries=e?r.entries:[...this.historyEntries,...r.entries],this.historyNextCursor=r.nextCursor??null,this.historyLoaded=!0}catch{a()&&(this.historyError=i(`custodian.history.requestFailed`),this.historyLoaded=!0)}finally{a()&&(this.historyLoading=!1,this.historyLoadingMore=!1)}}render(){let e=this.channelsSource?.state,t=e?.channelsSnapshot??null,n=this.onboarding&&!this.store.channelOnboardingNudgeClosed&&e?.connected?e?.channelsError??null:null,r=this.onboarding&&!this.store.channelOnboardingNudgeClosed&&e?.connected&&!e.channelsLoading&&n===null&&t!==null&&t.partial!==!0&&!d(t),a=this.historyOpen&&this.historyAvailable?M({entries:this.historyEntries,error:this.historyError,loaded:this.historyLoaded,loading:this.historyLoading,loadingMore:this.historyLoadingMore,nextCursor:this.historyNextCursor,onLoad:e=>void this.loadHistory(e)}):m;return v`
      <section
        class="custodian custodian--page ${this.store.setupRequired?`custodian--setup-required`:``}"
      >
        <header
          class="custodian__header custodian__column ${this.onboarding?`custodian__header--minimal`:``}"
        >
          ${this.onboarding?m:v`<div class="custodian__identity">
                  <div class="custodian__mark" aria-hidden="true">
                    <openclaw-mascot
                      .mood=${this.store.sending?`thinking`:`idle`}
                      .size=${38}
                    ></openclaw-mascot>
                  </div>
                  <div>
                    <h1>${i(`custodian.title`)}</h1>
                    <p>${i(`custodian.subtitleCaretaker`)}</p>
                  </div>
                </div>`}
          <div class="custodian__header-actions">
            ${this.onboarding?v`<openclaw-sidebar-attention></openclaw-sidebar-attention>`:m}
            ${this.historyAvailable?v`<button
                    class="btn btn--ghost custodian__history-toggle"
                    type="button"
                    aria-expanded=${this.historyOpen?`true`:`false`}
                    @click=${()=>this.toggleHistory()}
                  >
                    ${i(`custodian.history.button`)}
                  </button>`:m}
            ${this.onboarding?v`<button
                    class="btn btn--ghost"
                    type="button"
                    @click=${()=>this.store.exitSetup()}
                  >
                    ${i(`custodian.exitSetup`)}
                  </button>`:m}
          </div>
        </header>

        <openclaw-custodian-surface
          class="custodian__column"
          .store=${this.store}
          .onboarding=${this.onboarding}
          .newAgentIntent=${this.newAgentIntent}
          .showChannelOnboardingNudge=${r}
          .channelOnboardingError=${n}
          .channelOnboardingRetrying=${e?.channelsLoading??!1}
          .onRetryChannelOnboarding=${()=>void this.channelsSource?.refresh(!1)}
          .historyContent=${a}
        ></openclaw-custodian-surface>
      </section>
    `}},t([n({context:x,subscribe:!0})],F.prototype,`context`,void 0),t([y({attribute:!1})],F.prototype,`onboarding`,void 0),t([y({attribute:!1})],F.prototype,`newAgentIntent`,void 0),t([y({attribute:!1})],F.prototype,`store`,void 0),t([_()],F.prototype,`historyAvailable`,void 0),t([_()],F.prototype,`historyOpen`,void 0),t([_()],F.prototype,`historyEntries`,void 0),t([_()],F.prototype,`historyNextCursor`,void 0),t([_()],F.prototype,`historyLoading`,void 0),t([_()],F.prototype,`historyLoadingMore`,void 0),t([_()],F.prototype,`historyError`,void 0),customElements.get(`openclaw-custodian-page`)||customElements.define(`openclaw-custodian-page`,F)})))()}I();
//# sourceMappingURL=custodian-page-BAbw4WD1.js.map