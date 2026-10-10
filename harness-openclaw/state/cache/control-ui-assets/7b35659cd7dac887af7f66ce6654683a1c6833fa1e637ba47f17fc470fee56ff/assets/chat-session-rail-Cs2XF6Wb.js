import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Gt as r,Kt as i,Sl as a,Tl as o,Wt as s,on as c,sn as l,un as u,wl as d}from"./control-ui-core-CndkyZ8m.js";import{$ as f,Q as p,at as m,dt as h,nt as g,pt as _,v,x as y}from"./lit-runtime-CIjzngcy.js";import{Di as b,Ei as x,wi as S}from"./control-ui-core-C5mtYcym.js";import{Fi as C,Li as w}from"./control-ui-boot-shared-DlJEsz5Q.js";import{$n as T,Ft as E,It as D,O,Rt as k,k as A,nr as j,qi as M,zt as N}from"./control-ui-boot-shared-DpHhsTHW.js";import{Bn as P,Hn as F,Vn as I,Wn as L,ar as R,rr as z,zn as B}from"./control-ui-boot-shared-6jDbGebE.js";function V(e){let t=null,n=e=>{let n=e instanceof HTMLTextAreaElement?e:null;t&&t!==n&&P(t),t=n,n&&(F(n),L(n))};return{ref:n,dispose(){n()},syncDraft(e){t?.isConnected&&t.value!==e&&L(t)},handleKeydown:t=>{if(t.isComposing||t.keyCode===229)return;let n=e.sendShortcut()===`enter`||t.metaKey||t.ctrlKey;t.key===`Enter`&&!t.shiftKey&&n&&(t.preventDefault(),t.repeat||e.submit())},handleInput:t=>{let n=t.currentTarget;n instanceof HTMLTextAreaElement&&(B(n),e.onDraftChange(n.value))}}}function H(){return(H=e((()=>{I()})))()}function U(e){return e.digest?e.running?e.activeRunId&&e.digest.runId===e.activeRunId?e.digest:null:e.digest:null}function W(e,t){return(e.health===`done`||e.health===`failed`)&&(t??0)<e.updatedAt}function G(e){return n(`chat.rail.health.${e}`)}function K(e){return n(`chat.pullRequests.${e===`draft`?`draft`:e}`)}function q(e){let t=e.checks;return t?t.state===`passing`?n(`chat.rail.checksPassing`,{count:String(t.passed)}):t.state===`failing`?n(`chat.rail.checksFailing`,{count:String(t.failed)}):n(`chat.rail.checksPending`,{count:String(t.running)}):null}var J,Y,X,Z;function Q(){return(Q=e((()=>{p(),m(),v(),b(),k(),j(),O(),E(),S(),M(),o(),w(),u(),d(),s(),z(),H(),J=class{constructor(e=r()){this.displayPreference=e,this.autoExpandedRunIds=new Set,this.autoExpandedRunId=null,this.transientExpanded=!1,this.manualOpen=!1}resetTransientState(){this.transientExpanded=!1,this.autoExpandedRunId=null,this.manualOpen=!1}tryAutoOpen(){return this.displayPreference!==`off`&&(this.transientExpanded=!0,!0)}mode(e){let t=U(e),n=t!==null&&(e.running||W(t,e.lastReadAt))||e.hasCompanionActivity||this.manualOpen||this.transientExpanded;if(this.displayPreference===`off`||!n)return this.autoExpandedRunId=null,`hidden`;let r=e.activeRunId??t?.runId??null;return(t?.health===`stuck`||t?.health===`waiting-on-user`)&&r&&!this.autoExpandedRunIds.has(r)&&(this.autoExpandedRunIds.add(r),this.autoExpandedRunId=r),this.displayPreference===`card`||this.transientExpanded||r!==null&&this.autoExpandedRunId===r?`expanded`:`pill`}expand(){this.displayPreference=`card`,this.transientExpanded=!1,this.autoExpandedRunId=null,i(`card`)}collapse(){this.displayPreference=`pill`,this.transientExpanded=!1,this.autoExpandedRunId=null,this.manualOpen=!1,i(`pill`)}hide(){this.displayPreference=`off`,this.resetTransientState(),i(`off`)}openExplicitly(){this.displayPreference=`pill`,this.transientExpanded=!0,this.autoExpandedRunId=null,this.manualOpen=!0,i(`pill`)}},Y=[`changed`,`stopped`,`remaining`],X={busy:`chat.rail.askBusy`,"history-unavailable":`chat.rail.askHistoryUnavailable`,missing:`chat.rail.askMissing`,"model-unavailable":`chat.rail.askModelUnavailable`,"rate-limited":`chat.rail.askRateLimited`,unavailable:`chat.rail.askUnavailable`},Z=class extends a{constructor(...e){super(...e),this.sessionKey=``,this.digest=null,this.running=!1,this.activeRunId=null,this.pullRequests=[],this.companion={turns:[],loading:!1,draft:``},this.connected=!1,this.sendShortcut=`enter`,this.command=null,this.consumedCommandGeneration=0,this.embedded=!1,this.presented=!1,this.now=Date.now(),this.railState=new J,this.clock=null,this.renderedMode=`hidden`,this.reportedMode=null,this.terminalAgeReference=Date.now(),this.composer=V({submit:()=>this.submit(),onDraftChange:e=>this.onDraftChange?.(e),sendShortcut:()=>this.sendShortcut})}disconnectedCallback(){this.stopClock(),this.composer.dispose(),super.disconnectedCallback()}willUpdate(e){e.has(`sessionKey`)&&(this.terminalAgeReference=Date.now(),this.railState.resetTransientState()),e.has(`digest`)&&this.digest&&(this.digest.health===`done`||this.digest.health===`failed`)&&(this.terminalAgeReference=Date.now()),e.has(`command`)&&this.applyPaneCommand()}applyPaneCommand(){let e=this.command;if(!(!e||e.generation<=this.consumedCommandGeneration)){if(this.onCommandConsumed?.(e.generation),e.intent===`open`){this.railState.tryAutoOpen()&&this.onVisibilityChange?.(!0);return}if(this.renderedMode===`expanded`){this.railState.collapse();return}this.railState.openExplicitly(),this.onVisibilityChange?.(!0)}}updated(e){let t=e.has(`focusRequest`)?this.focusRequest?.():void 0;this.presented&&(this.canFocus?.()??!0)&&(t??e.has(`presented`))&&this.querySelector(`.chat-session-rail__input:not(:disabled)`)?.focus({preventScroll:!0}),this.running&&this.startedAt!=null&&U(this.input())?this.scheduleClock():this.stopClock(),this.reportedMode!==this.renderedMode&&(this.reportedMode=this.renderedMode,this.onModeChange?.(this.renderedMode))}input(){return{running:this.running,activeRunId:this.activeRunId,digest:this.digest,lastReadAt:this.lastReadAt,hasCompanionActivity:this.companion.turns.length>0||this.companion.draft.length>0}}scheduleClock(){this.clock===null&&(this.clock=globalThis.setTimeout(()=>{this.clock=null,this.now=Date.now()},1e3))}stopClock(){this.clock!==null&&(globalThis.clearTimeout(this.clock),this.clock=null)}collapse(){this.railState.collapse(),this.requestUpdate()}expand(){this.railState.expand(),this.requestUpdate()}hide(){this.railState.hide(),this.onVisibilityChange?.(!1),this.requestUpdate()}submit(){let e=this.companion.draft.trim();e&&this.connected&&!this.companion.turns.some(e=>e.status===`pending`)&&this.onSubmit?.(e)}renderStatus(e){let t=e.health===`done`||e.health===`failed`,n=e.health===`stuck`||e.health===`waiting-on-user`;return g`
      <span
        class="chat-session-rail__status ${n?`chat-session-rail__status--critical`:``}"
        data-health=${e.health}
      >
        ${t?g`<span class="chat-session-rail__status-icon" aria-hidden="true"
                >${e.health===`done`?x.check:x.x}</span
              >`:g`<span class="chat-session-rail__status-dot" aria-hidden="true"></span>`}
        <span>${G(e.health)}</span>
      </span>
    `}renderPullRequests(){let e=this.pullRequests.slice(0,2);return e.length===0?f:g`
      <div class="chat-session-rail__prs" aria-label=${n(`chat.rail.pullRequests`)}>
        ${e.map(e=>{let t=q(e);return g`
            <a
              class="chat-session-rail__pr"
              href=${e.url}
              target="_blank"
              rel="noopener noreferrer"
              title=${e.title}
            >
              <span>#${e.number}</span>
              <span>${K(e.state)}</span>
              ${t?g`<span class="chat-session-rail__pr-checks">${t}</span>`:f}
            </a>
          `})}
      </div>
    `}renderDigestDetails(e){return e?g`
      ${e.assessment?g`<p class="chat-session-rail__assessment">${e.assessment}</p>`:f}
      ${this.renderPullRequests()}
    `:f}renderStarters(){return g`
      <div class="chat-session-rail__starters">
        ${Y.map(e=>{let t=n(`chat.rail.starters.${e}`);return g`
            <button
              class="chip chat-session-rail__starter"
              type="button"
              ?disabled=${!this.connected}
              @click=${()=>this.onSubmit?.(t)}
            >
              ${x.spark}<span>${t}</span>
            </button>
          `})}
      </div>
    `}renderThread(e){let{turns:t}=this.companion,r=JSON.stringify(t.map(e=>[e.question,e.status]));return g`
      <div
        class="chat-session-rail__thread"
        aria-live="polite"
        @click=${T}
        ${N()}
        ${y(e=>{e instanceof HTMLElement&&e.dataset.railScrollKey!==r&&(e.dataset.railScrollKey=r,e.scrollTop=e.scrollHeight)})}
      >
        ${this.companion.loading&&t.length===0?D(`chat`,n(`chat.thread.loading`)):f}
        ${!this.companion.loading&&t.length===0?A({icon:x.bot,heading:n(`chat.sidePanel.companion`),description:n(`chat.rail.empty`)}):f}
        ${t.map(t=>g`
            <article
              class="chat-session-rail__exchange ${t.status===`pending`?`chat-session-rail__exchange--pending`:t.status===`failed`?`chat-session-rail__exchange--error`:``}"
            >
              <div class="chat-group user chat-session-rail__message">
                <div class="chat-bubble chat-session-rail__question">
                  ${R(t.question,t.question,{role:`user`,isStreaming:!1},{codeBlockChrome:`none`,codeBlockInteraction:`static`})}
                </div>
              </div>
              ${t.status===`answered`?g`
                      <div class="chat-group assistant chat-session-rail__message">
                        <div class="chat-bubble chat-session-rail__answer">
                          ${R(t.answer,String(t.ts),{role:`assistant`,isStreaming:!1},{codeBlockInteraction:`interactive`})}
                        </div>
                      </div>
                      <time
                        class="chat-session-rail__timestamp"
                        datetime=${new Date(t.ts).toISOString()}
                      >
                        ${n(`chat.rail.asOf`,{time:l(t.ts,{hour:`numeric`,minute:`2-digit`},``)})}
                      </time>
                    `:g`
                      <div class="chat-session-rail__hint">
                        ${n(t.status===`pending`?`chat.rail.askPending`:X[t.hint])}
                      </div>
                      ${t.status===`failed`&&t.retryable&&this.connected&&this.onSubmit?g`<button
                              class="btn btn--secondary chat-session-rail__retry"
                              type="button"
                              ?disabled=${e}
                              @click=${()=>this.onSubmit?.(t)}
                            >
                              ${n(`chat.rail.askRetry`)}
                            </button>`:f}
                    `}
            </article>
          `)}
      </div>
    `}render(){this.composer.syncDraft(this.companion.draft);let e=this.companion.turns.some(e=>e.status===`pending`),t=this.input(),r=this.embedded?`expanded`:this.railState.mode(t);if(this.renderedMode=r,r===`hidden`)return f;let i=U(t);if(r===`pill`)return g`
        <div class="chat-session-rail chat-session-rail--pill" aria-live="polite">
          ${i?this.renderStatus(i):f}
          <button
            class="chat-session-rail__expand"
            type="button"
            aria-label=${n(`chat.rail.expand`)}
            @click=${()=>this.expand()}
          >
            <span class="chat-session-rail__headline"
              >${i?.headline??n(`chat.rail.title`)}</span
            >
          </button>
          <button
            class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__hide"
            type="button"
            aria-label=${n(`chat.rail.close`)}
            @click=${()=>this.hide()}
          >
            ${x.x}
          </button>
          <button
            class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__toggle"
            type="button"
            aria-label=${n(`chat.rail.expand`)}
            @click=${()=>this.expand()}
          >
            ${x.chevronDown}
          </button>
        </div>
      `;let a=this.running&&this.startedAt!=null?C(Math.max(0,this.now-this.startedAt)):null,o=i&&(i.health===`done`||i.health===`failed`)?n(`chat.rail.finished`,{time:c(Math.max(0,this.terminalAgeReference-i.updatedAt))}):null;return g`
      <section
        class="chat-session-rail chat-session-rail--expanded ${this.embedded?`chat-session-rail--embedded`:``}"
        role="region"
        aria-label=${n(`chat.rail.title`)}
        tabindex="-1"
        @keydown=${e=>{!this.embedded&&e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),this.collapse())}}
      >
        ${this.embedded?f:g`<header class="rail-header chat-session-rail__header">
                <div class="rail-header__copy chat-session-rail__header-copy">
                  <div class="chat-session-rail__status-row">
                    ${i?this.renderStatus(i):g`<strong>${n(`chat.rail.title`)}</strong>`}
                    ${a?g`<span class="chat-session-rail__timing">${a}</span>`:o?g`<span class="chat-session-rail__timing">${o}</span>`:f}
                  </div>
                  ${i?g`<strong class="chat-session-rail__headline"
                          >${i.headline}</strong
                        >`:g`<span class="chat-session-rail__subtitle"
                          >${n(`chat.rail.subtitle`)}</span
                        >`}
                </div>
                <div class="rail-header__actions chat-session-rail__actions">
                  <button
                    class="rail-header__action chat-session-rail__hide"
                    type="button"
                    aria-label=${n(`chat.rail.close`)}
                    @click=${()=>this.hide()}
                  >
                    ${x.x}
                  </button>
                  <button
                    class="rail-header__action chat-session-rail__toggle"
                    type="button"
                    aria-label=${n(`chat.rail.collapse`)}
                    @click=${()=>this.collapse()}
                  >
                    ${x.chevronUp}
                  </button>
                </div>
              </header>`}
        ${i?g`<div class="chat-session-rail__digest">${this.renderDigestDetails(i)}</div>`:f}
        ${this.renderThread(e)}
        ${this.companion.turns.some(e=>e.status!==`failed`)?f:this.renderStarters()}
        <form
          class="agent-chat__input chat-session-rail__composer"
          @submit=${e=>{e.preventDefault(),this.submit()}}
        >
          <div class="agent-chat__composer-input-row">
            <label class="agent-chat__composer-combobox chat-session-rail__prompt">
              <textarea
                class="chat-session-rail__input"
                rows="1"
                maxlength="400"
                autocomplete="off"
                aria-label=${n(`chat.rail.askLabel`)}
                aria-keyshortcuts=${this.sendShortcut===`enter`?`Enter`:`Control+Enter Meta+Enter`}
                .value=${this.companion.draft}
                placeholder=${n(e?`chat.rail.askPending`:`chat.rail.askPlaceholder`)}
                ?disabled=${!this.connected||e}
                @keydown=${this.composer.handleKeydown}
                @input=${this.composer.handleInput}
                ${y(this.composer.ref)}
              ></textarea>
            </label>
          </div>
          <div class="agent-chat__composer-footer">
            <div class="agent-chat__composer-trail">
              <div class="agent-chat__composer-actions">
                <button
                  class="chat-send-btn"
                  type="submit"
                  aria-label=${n(`chat.rail.askSubmit`)}
                  ?disabled=${!this.connected||e||!this.companion.draft.trim()}
                >
                  ${x.arrowUp}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    `}},t([_({attribute:!1})],Z.prototype,`sessionKey`,void 0),t([_({attribute:!1})],Z.prototype,`digest`,void 0),t([_({attribute:!1})],Z.prototype,`running`,void 0),t([_({attribute:!1})],Z.prototype,`activeRunId`,void 0),t([_({attribute:!1})],Z.prototype,`startedAt`,void 0),t([_({attribute:!1})],Z.prototype,`lastReadAt`,void 0),t([_({attribute:!1})],Z.prototype,`pullRequests`,void 0),t([_({attribute:!1})],Z.prototype,`companion`,void 0),t([_({attribute:!1})],Z.prototype,`connected`,void 0),t([_({attribute:!1})],Z.prototype,`sendShortcut`,void 0),t([_({attribute:!1})],Z.prototype,`command`,void 0),t([_({attribute:!1})],Z.prototype,`consumedCommandGeneration`,void 0),t([_({attribute:!1})],Z.prototype,`onCommandConsumed`,void 0),t([_({attribute:!1})],Z.prototype,`onSubmit`,void 0),t([_({attribute:!1})],Z.prototype,`onDraftChange`,void 0),t([_({attribute:!1})],Z.prototype,`onModeChange`,void 0),t([_({attribute:!1})],Z.prototype,`onVisibilityChange`,void 0),t([_({type:Boolean})],Z.prototype,`embedded`,void 0),t([_({type:Boolean})],Z.prototype,`presented`,void 0),t([_({attribute:!1})],Z.prototype,`focusRequest`,void 0),t([_({attribute:!1})],Z.prototype,`canFocus`,void 0),t([h()],Z.prototype,`now`,void 0),customElements.get(`openclaw-chat-session-rail`)||customElements.define(`openclaw-chat-session-rail`,Z)})))()}Q();export{Z as ChatSessionRailElement,J as ChatSessionRailState};
//# sourceMappingURL=chat-session-rail-Cs2XF6Wb.js.map