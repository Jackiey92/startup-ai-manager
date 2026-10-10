import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Br as a,Bs as o,Sl as s,Ss as c,Tl as l,Vs as ee,bs as te,fc as u,mc as ne,pc as d,wl as f,xs as p,zr as m}from"./control-ui-core-CndkyZ8m.js";import{$ as h,Q as g,at as re,dt as _,nt as v}from"./lit-runtime-CIjzngcy.js";import{$r as y,Di as ie,Ei as b,Qr as x,Zn as S,bi as ae,lr as C,nr as w,si as T,xi as E}from"./control-ui-core-C5mtYcym.js";import{c as oe,u as se}from"./gateway-runtime-BvWNTqPo.js";import{B as ce,U as D,V as le,z as ue}from"./control-ui-boot-shared-DwSLfX8E.js";import{Hi as de,_t as O,bt as k,dt as A,ft as j,ht as M,it as N,nt as P,ot as F,pt as I,xt as L,zi as R}from"./control-ui-boot-shared-DpHhsTHW.js";import{ct as z}from"./control-ui-boot-new-CQMzhCGu.js";import{n as B,t as V}from"./settings-workspace-gGOfyDax.js";import{n as H,t as fe}from"./en-memory-import-P-qt8Qqz.js";function pe(e){return e.backfillRollbackPending?v`
    <openclaw-modal-dialog
      label=${i(`memoryImport.backfill.rollbackConfirmTitle`)}
      description=${i(`memoryImport.backfill.rollbackConfirmDescription`)}
      @modal-cancel=${e.onBackfillRollbackCancel}
    >
      <div class="exec-approval-card memory-import__confirm">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">
              ${i(`memoryImport.backfill.rollbackConfirmTitle`)}
            </div>
            <div class="exec-approval-sub">
              ${i(`memoryImport.backfill.rollbackConfirmDescription`)}
            </div>
          </div>
        </div>
        <div class="callout warn">${i(`memoryImport.backfill.rollbackWarning`)}</div>
        <div class="exec-approval-actions">
          <button
            class="btn danger"
            data-test-id="memory-backfill-rollback-confirm"
            ?disabled=${e.backfillBusy!==null||e.applyingProviderId!==null}
            @click=${e.onBackfillRollbackConfirm}
          >
            ${i(`memoryImport.backfill.rollback`)}
          </button>
          <button
            class="btn"
            ?disabled=${e.backfillBusy!==null||e.applyingProviderId!==null}
            @click=${e.onBackfillRollbackCancel}
          >
            ${i(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `:h}function U(){return(U=e((()=>{g(),C(),l()})))()}function W(e,t){let n=e.details?.[t];return typeof n==`string`&&n.trim()?n:void 0}function me(e){let t=new Map;for(let n of e){let e=W(n,`collectionId`)??n.id,r=W(n,`collectionLabel`)??W(n,`sourceLabel`)??i(`memoryImport.unknownCollection`),a=t.get(e)??{id:e,label:r,items:[]};a.items.push(n),t.set(e,a)}return[...t.values()].toSorted((e,t)=>e.label.localeCompare(t.label))}function G(e){return e.providerId===`claude`?i(`memoryImport.claudeCode`):e.label}function he(e){return e.providerId===`codex`?i(`memoryImport.codexDescription`):e.providerId===`claude`?i(`memoryImport.claudeDescription`):i(`memoryImport.providerFallback`)}function K(e){return i(e===1?`memoryImport.fileCountOne`:`memoryImport.fileCount`,{count:String(e)})}function ge(e){return i(e===1?`memoryImport.backfill.processedDayCountOne`:`memoryImport.backfill.processedDayCount`,{count:String(e)})}function q(e){let t=W(e,`relativePath`);if(t)return t;let n=e.target??e.source??e.id;return n.split(/[\\/]/u).at(-1)??n}function _e(e,t,n,r,a){let o=t.items.filter(e=>e.status===`planned`).map(e=>e.id),s=o.length>0&&o.every(e=>n.has(e)),c=t.items.filter(e=>e.status===`conflict`).length;return v`
    <div class="settings-row settings-row--stacked memory-import__collection">
      <div class="memory-import__collection-header">
        <label class="memory-import__collection-choice">
          <input
            type="checkbox"
            .checked=${s}
            ?disabled=${o.length===0||a}
            @change=${t=>r(e.providerId,o,t.currentTarget.checked)}
          />
          <span>
            <strong>${t.label}</strong>
            <small>${K(t.items.length)}</small>
          </span>
        </label>
        ${c>0?O({kind:`warn`,label:i(`memoryImport.alreadyImported`,{count:String(c)})}):h}
      </div>
      <details ?open=${t.items.length<=4}>
        <summary>${i(`memoryImport.reviewFiles`)}</summary>
        <ul class="memory-import__files">
          ${t.items.map(e=>v`
              <li>
                <span class="memory-import__file-icon" aria-hidden="true">${b.fileText}</span>
                <code title=${e.source??q(e)}>${q(e)}</code>
                <span class="memory-import__file-status memory-import__file-status--${e.status}">
                  ${e.status===`planned`?i(`memoryImport.ready`):e.status===`conflict`?i(`memoryImport.existing`):e.status}
                </span>
              </li>
            `)}
        </ul>
      </details>
    </div>
  `}function ve(e){if(!e)return h;let t=e.summary.errors>0||e.summary.conflicts>0,n=e.items.filter(e=>e.status===`error`||e.status===`conflict`||W(e,`recoveryRecordPath`)!==void 0);return v`
    <div
      class="settings-row settings-row--stacked memory-import__result ${t?`memory-import__result--incomplete`:``}"
      role=${t?`alert`:`status`}
    >
      <span aria-hidden="true">${t?b.alertTriangle:b.check}</span>
      <div>
        <strong>
          ${i(t?`memoryImport.importIncomplete`:`memoryImport.importComplete`)}
        </strong>
        <span>
          ${t?i(`memoryImport.importedWithIssues`,{conflicts:String(e.summary.conflicts),errors:String(e.summary.errors),migrated:String(e.summary.migrated)}):i(`memoryImport.importedCount`,{count:String(e.summary.migrated)})}
        </span>
        ${e.reportDir?v`<span class="memory-import__result-path">
                ${i(`memoryImport.reportSaved`)}:
                <code title=${e.reportDir}>${e.reportDir}</code>
              </span>`:h}
        ${n.length>0?v`<ul class="memory-import__result-issues">
                ${n.map(e=>{let t=[{label:i(`memoryImport.recoveryFile`),path:W(e,`recoveryPath`)},{label:i(`memoryImport.recoveryJournal`),path:W(e,`recoveryRecordPath`)},{label:i(`memoryImport.itemBackup`),path:W(e,`backupPath`)}].filter(e=>!!e.path);return v`<li>
                    <strong>${q(e)}</strong>
                    <span>${p(e.reason??e.message,e.status)}</span>
                    ${t.map(e=>v`<span class="memory-import__result-artifact">
                        <span>${e.label}</span>
                        <code title=${e.path}>${e.path}</code>
                      </span>`)}
                  </li>`})}
              </ul>`:h}
      </div>
    </div>
  `}function ye(e,t){let n=new Set(e.selectedByProvider[t.providerId]??[]),r=me(t.items),a=e.applyingProviderId===t.providerId,o=e.backfillBusy===`apply`||e.backfillBusy===`rollback`||e.backfillRollbackPending,s=t.error?v`<div class="callout danger" role="alert">${p(t.error)}</div>`:t.found?v`
          ${t.source?I({title:i(`memoryImport.source`),control:L(t.source,{mono:!0})}):h}
          ${t.target?I({title:i(`memoryImport.destination`),control:L(`${t.target}/memory/imports/`,{mono:!0})}):h}
          ${r.map(r=>_e(t,r,n,e.onToggleCollection,e.loading||e.applyingProviderId!==null||e.error!==null||o))}
          ${I({title:n.size>0?i(`memoryImport.selectedCount`,{count:String(n.size)}):i(`memoryImport.selectAtLeastOne`),control:v`
              <button
                class="btn primary"
                data-test-id="memory-import-provider-button"
                ?disabled=${n.size===0||e.applyingProviderId!==null||o||e.loading||e.error!==null}
                @click=${()=>e.onRequestImport(t.providerId)}
              >
                ${i(a?`common.importing`:`memoryImport.importSelected`)}
              </button>
            `})}
        `:F(t.message??i(`memoryImport.noMemoryFound`));return v`
    <div data-provider-id=${t.providerId}>
      ${M({title:v`<span class="memory-import__provider-title">
            ${de(t.providerId,{className:`memory-import__provider-icon`})}
            ${G(t)}
          </span>`,description:he(t),actions:O({kind:t.found?`ok`:`muted`,label:t.found?K(t.items.length):i(`memoryImport.notFound`)})},v`${s}${ve(e.lastResults[t.providerId])}`)}
    </div>
  `}function be(e){let t=e.plan?.providers.find(t=>t.providerId===e.pendingProviderId);if(!t)return h;let n=e.selectedByProvider[t.providerId]?.length??0,r=i(`memoryImport.confirmTitle`,{provider:G(t)}),a=i(`memoryImport.confirmDescription`,{count:String(n)});return v`
    <openclaw-modal-dialog
      label=${r}
      description=${a}
      @modal-cancel=${()=>{e.applyingProviderId===null&&e.onCancelImport()}}
    >
      <div class="exec-approval-card memory-import__confirm">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">${r}</div>
            <div class="exec-approval-sub">${a}</div>
          </div>
        </div>
        <div class="callout ${e.replaceExisting?`warn`:``}">
          ${e.replaceExisting?i(`memoryImport.confirmReplace`):i(`memoryImport.confirmBackup`)}
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            data-test-id="memory-import-confirm"
            ?disabled=${e.applyingProviderId!==null}
            @click=${e.onConfirmImport}
          >
            ${i(`memoryImport.confirmImport`)}
          </button>
          <button
            class="btn"
            ?disabled=${e.applyingProviderId!==null}
            @click=${e.onCancelImport}
          >
            ${i(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function xe(e){let t=e.loading||e.applyingProviderId!==null||e.backfillBusy!==null;return M({title:i(`memoryImport.title`),description:i(`memoryImport.subtitle`),actions:v`
        <button class="btn btn--sm" ?disabled=${t} @click=${e.onRefresh}>
          ${e.loading?i(`common.refreshing`):i(`common.refresh`)}
        </button>
      `},v`
      ${e.agents.length>1?I({title:i(`memoryImport.agent`),control:v`
                <openclaw-agent-select
                  class="agent-select--settings"
                  name="memory-import-agent"
                  .options=${e.agents.map(e=>({value:e.id,label:ne(e),agent:e}))}
                  .value=${e.selectedAgentId??``}
                  .accessibleLabel=${i(`memoryImport.agent`)}
                  .disabled=${t}
                  .onSelect=${e.onSelectAgent}
                ></openclaw-agent-select>
              `}):h}
      ${k({title:i(`memoryImport.replaceExisting`),description:i(`memoryImport.replaceHint`),checked:e.replaceExisting,disabled:t,onChange:t=>e.onReplaceExisting(t)})}
    `)}function Se(e){let t=e.backfillBusy!==null||e.applyingProviderId!==null,n=e.backfillPreview;return v`
    <div data-test-id="memory-session-backfill">
      ${M({title:i(`memoryImport.backfill.title`),description:i(`memoryImport.backfill.subtitle`)},v`
          ${e.backfillAvailable?v`
                  ${I({title:i(`memoryImport.backfill.dateRange`),description:i(`memoryImport.backfill.dateRangeHint`),control:v`<div class="memory-import__backfill-dates">
                      <label>
                        <span>${i(`memoryImport.backfill.from`)}</span>
                        <input
                          class="input"
                          type="date"
                          .value=${e.backfillFrom}
                          ?disabled=${t}
                          @input=${t=>e.onBackfillFromChange(t.currentTarget.value)}
                        />
                      </label>
                      <label>
                        <span>${i(`memoryImport.backfill.to`)}</span>
                        <input
                          class="input"
                          type="date"
                          .value=${e.backfillTo}
                          ?disabled=${t}
                          @input=${t=>e.onBackfillToChange(t.currentTarget.value)}
                        />
                      </label>
                    </div>`})}
                  ${I({title:i(`memoryImport.backfill.actions`),control:v`<div class="memory-import__backfill-actions">
                      <button
                        class="btn"
                        data-test-id="memory-backfill-preview"
                        ?disabled=${t}
                        @click=${e.onBackfillPreview}
                      >
                        ${e.backfillBusy===`preview`?i(`memoryImport.backfill.previewing`):i(`memoryImport.backfill.preview`)}
                      </button>
                      <button
                        class="btn primary"
                        data-test-id="memory-backfill-apply"
                        ?disabled=${t}
                        @click=${e.onBackfillApply}
                      >
                        ${e.backfillBusy===`apply`?i(`memoryImport.backfill.applying`):i(`memoryImport.backfill.apply`)}
                      </button>
                      <button
                        class="btn danger"
                        data-test-id="memory-backfill-rollback"
                        ?disabled=${t}
                        @click=${e.onBackfillRollbackRequest}
                      >
                        ${i(`memoryImport.backfill.rollback`)}
                      </button>
                    </div>`})}
                  ${e.backfillError?v`<div class="callout danger" role="alert">${e.backfillError}</div>`:h}
                  ${n?v`<div
                          class="settings-row settings-row--stacked memory-import__backfill-preview"
                        >
                          <strong>
                            ${i(`memoryImport.backfill.previewSummary`,{candidates:String(n.candidates),days:String(n.days)})}
                          </strong>
                          ${n.perDay.length>0?v`<ul>
                                  ${n.perDay.map(e=>v`<li>
                                      <div>
                                        <strong>${e.day}</strong>
                                        <span>
                                          ${i(`memoryImport.backfill.candidateCount`,{count:String(e.candidateCount)})}
                                        </span>
                                      </div>
                                      ${e.sample.length>0?v`<ul>
                                              ${e.sample.map(e=>v`<li>${e}</li>`)}
                                            </ul>`:h}
                                    </li>`)}
                                </ul>`:v`<span>${i(`memoryImport.backfill.noCandidates`)}</span>`}
                          ${n.truncated?v`<div class="callout warn">
                                  ${i(`memoryImport.backfill.previewTruncated`)}
                                </div>`:h}
                        </div>`:h}
                  ${e.backfillProgress?v`<div
                          class="settings-row settings-row--stacked memory-import__backfill-progress"
                          role="status"
                        >
                          <strong>
                            ${e.backfillProgress.complete?i(`memoryImport.backfill.complete`,{count:String(e.backfillProgress.staged)}):i(`memoryImport.backfill.progress`,{days:String(e.backfillProgress.days),staged:String(e.backfillProgress.staged)})}
                          </strong>
                          <span>
                            ${i(`memoryImport.backfill.processedCandidates`,{count:String(e.backfillProgress.candidates)})}
                            · ${ge(e.backfillProgress.days)}
                          </span>
                        </div>`:h}
                  ${e.backfillRollbackResult?v`<div class="settings-row settings-row--stacked" role="status">
                          <strong>${i(`memoryImport.backfill.rollbackComplete`)}</strong>
                          <span>
                            ${i(`memoryImport.backfill.rollbackCounts`,{diary:String(e.backfillRollbackResult.removedDiaryEntries),staged:String(e.backfillRollbackResult.removedStagedEntries)})}
                          </span>
                        </div>`:h}
                `:F(i(`memoryImport.backfill.unavailable`))}
        `)}
      ${pe(e)}
    </div>
  `}function Ce(e){return e.connected?e.canAdmin?v`
    <div class="memory-import" data-test-id="memory-import-page">
      ${A(v`
        ${xe(e)} ${Se(e)}
        ${e.error?v`<div class="callout danger" role="alert">${e.error}</div>`:h}
        ${e.applyError?v`<div class="callout danger" role="alert">${e.applyError}</div>`:h}
        ${e.loading&&!e.plan?v`<div class="settings-group memory-import__loading" aria-busy="true">
                <div class="skeleton memory-import__skeleton"></div>
                <div class="skeleton memory-import__skeleton"></div>
              </div>`:(e.plan?.providers??[]).map(t=>ye(e,t))}
        ${be(e)}
      `)}
    </div>
  `:A(F(i(`memoryImport.adminRequired`))):A(F(i(`memoryImport.disconnected`)))}function J(){return(J=e((()=>{g(),z(),C(),ie(),R(),P(),l(),fe(),u(),c(),U(),H()})))()}function Y(e){return te(e,`request failed`)}var X,Z,Q;function $(){return($=e((()=>{r(),ue(),g(),re(),T(),y(),w(),P(),V(),u(),c(),oe(),a(),f(),ee(),J(),X=14,Z=`https://docs.openclaw.ai/install/migrating`,Q=class extends s{constructor(...e){super(...e),this.replaceExisting=!1,this.selectedByProvider={},this.applyingProviderId=null,this.pendingImport=null,this.applyError=null,this.lastResults={},this.backfillFrom=``,this.backfillTo=``,this.backfillBusy=null,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillRollbackPending=!1,this.applyEpoch=0,this.backfillEpoch=0,this.lastPlanValue=null,this.subscriptions=new o(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentSelection,(e,t)=>e.subscribe(t)),this.planTask=new ce(this,{args:()=>{let e=this.context?.gateway.snapshot;return[this.isConnected&&e?.phase===`connected`?e.client??null:null,e?S(e.hello?.auth??null):!1,this.currentAgentId(),this.replaceExisting]},task:async([e,t,n,r],{signal:i})=>!e||!t||!n?le:{client:e,agentId:n,overwrite:r,plan:await e.request(`migrations.memory.plan`,{agentId:n,overwrite:r},{signal:i})},onComplete:e=>{let t=this.lastPlanValue;t&&(t.client!==e.client||t.agentId!==e.agentId||t.overwrite!==e.overwrite)&&(this.resetMutationState({preserveAttemptedImport:t.client!==e.client}),(t.client!==e.client||t.agentId!==e.agentId)&&this.resetBackfillState()),this.lastPlanValue=e;let{plan:n}=e;this.selectedByProvider=Object.fromEntries(n.providers.map(e=>[e.providerId,e.items.filter(e=>e.status===`planned`).map(e=>e.id)]))}})}disconnectedCallback(){this.planTask.run([null,!1,null,this.replaceExisting]),this.applyEpoch+=1,this.backfillEpoch+=1,this.subscriptions.clear(),super.disconnectedCallback()}updated(){let e=this.context.gateway.snapshot;this.pendingImport&&(e.phase!==`connected`||e.client!==(this.planTask.value??this.lastPlanValue)?.client||this.currentAgentId()!==this.pendingImport.agentId)&&this.resetMutationState({preserveAttemptedImport:!0}),e.phase!==`connected`&&(this.backfillBusy!==null||this.backfillRollbackPending)&&this.resetBackfillState()}currentAgentId(){let e=this.context.agents.state.agentsList;if(!e)return null;let t=d(e.agents),n=this.context.agentSelection.state.selectedId;return n&&t.some(e=>e.id===n)?n:t.some(t=>t.id===e.defaultId)?e.defaultId:t[0]?.id??null}get plan(){let e=this.planTask.value??this.lastPlanValue,t=this.context.gateway.snapshot,n=this.currentAgentId();return e&&t.phase===`connected`&&e.client===t.client&&e.agentId===n&&e.overwrite===this.replaceExisting?e.plan:null}get loading(){return this.planTask.status===D.PENDING}get error(){return this.planTask.status===D.ERROR?Y(this.planTask.error):null}get canAdmin(){return S(this.context.gateway.snapshot.hello?.auth??null)}resetMutationState(e={}){let t=e.preserveAttemptedImport&&this.pendingImport?.attempted?this.pendingImport:null;this.applyEpoch+=1,this.selectedByProvider={},this.applyingProviderId=null,this.pendingImport=t,this.applyError=null,this.lastResults={}}refresh(){return this.currentAgentId()?this.planTask.run():this.context.agents.ensureList().then(()=>void 0)}selectAgent(e){this.context.agentSelection.set(e),this.resetMutationState(),this.resetBackfillState()}setReplaceExisting(e){this.replaceExisting=e,this.resetMutationState()}toggleCollection(e,t,n){let r=new Set(this.selectedByProvider[e]??[]);for(let e of t)n?r.add(e):r.delete(e);this.selectedByProvider={...this.selectedByProvider,[e]:[...r]}}requestImport(e){if(!this.canAdmin)return;let t=this.currentAgentId(),n=this.plan?.providers.find(t=>t.providerId===e)?.planFingerprint,r=this.selectedByProvider[e]??[];!this.loading&&this.error===null&&this.applyingProviderId===null&&this.backfillBusy!==`apply`&&this.backfillBusy!==`rollback`&&!this.backfillRollbackPending&&t&&this.plan?.agentId===t&&n&&r.length!==0&&(this.applyError=null,this.pendingImport={providerId:e,agentId:t,planFingerprint:n,itemIds:[...r],overwrite:this.replaceExisting,idempotencyKey:m(),attempted:!1})}async confirmImport(){if(!this.canAdmin||this.applyingProviderId!==null||this.backfillBusy===`apply`||this.backfillBusy===`rollback`||this.backfillRollbackPending)return;let e=this.pendingImport,t=this.context.gateway.snapshot;if(!e||!t.client||this.currentAgentId()!==e.agentId||this.plan?.agentId!==e.agentId)return;let n={...e,attempted:!0},r=t.client;this.pendingImport=n;let i=++this.applyEpoch;this.applyingProviderId=n.providerId,this.applyError=null;try{let e=await r.request(`migrations.memory.apply`,{idempotencyKey:n.idempotencyKey,agentId:n.agentId,providerId:n.providerId,planFingerprint:n.planFingerprint,itemIds:n.itemIds,overwrite:n.overwrite});if(i!==this.applyEpoch||this.context.gateway.snapshot.phase!==`connected`||this.context.gateway.snapshot.client!==r||this.currentAgentId()!==n.agentId)return;this.lastResults={...this.lastResults,[n.providerId]:e},this.pendingImport=null,await this.refresh()}catch(e){i===this.applyEpoch&&(this.applyError=Y(e))}finally{i===this.applyEpoch&&(this.applyingProviderId=null)}}resetBackfillState(){this.backfillEpoch+=1,this.backfillFrom=``,this.backfillTo=``,this.backfillBusy=null,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillRollbackPending=!1}backfillRequest(e){return{agentId:e,...this.backfillFrom?{from:this.backfillFrom}:{},...this.backfillTo?{to:this.backfillTo}:{},limitDays:X}}isCurrentBackfillRequest(e,t,n){return e===this.backfillEpoch&&this.context.gateway.snapshot.phase===`connected`&&this.context.gateway.snapshot.client===t&&this.currentAgentId()===n}async previewBackfill(){let e=this.context.gateway.snapshot.client,t=this.currentAgentId();if(!this.canAdmin||!e||!t||this.backfillBusy!==null||this.applyingProviderId!==null)return;let n=++this.backfillEpoch;this.backfillBusy=`preview`,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null;try{let r=await e.request(`memory.sessionBackfill.preview`,this.backfillRequest(t));this.isCurrentBackfillRequest(n,e,t)&&(this.backfillPreview=r)}catch(r){this.isCurrentBackfillRequest(n,e,t)&&(this.backfillError=Y(r))}finally{this.isCurrentBackfillRequest(n,e,t)&&(this.backfillBusy=null)}}async applyBackfill(){let e=this.context.gateway.snapshot.client,t=this.currentAgentId();if(!this.canAdmin||!e||!t||this.backfillBusy!==null||this.applyingProviderId!==null)return;let n=++this.backfillEpoch;this.backfillBusy=`apply`,this.backfillError=null,this.backfillPreview=null,this.backfillRollbackResult=null,this.backfillProgress={days:0,candidates:0,staged:0,complete:!1};let r=this.backfillProgress,i=new Set;try{for(;;){let a=await e.request(`memory.sessionBackfill.apply`,this.backfillRequest(t));if(!this.isCurrentBackfillRequest(n,e,t))return;if(a.candidates>0&&a.cursor?.advanced!==!0)throw Error(`Session backfill stopped because the server cursor did not advance.`);if(a.candidates===0&&a.cursor?.exhausted!==!0)throw Error(`Session backfill stopped because the server cursor was not exhausted.`);for(let e of a.perDay)i.add(e.day);if(r={days:i.size,candidates:r.candidates+a.candidates,staged:r.staged+a.staged,complete:a.candidates===0},this.backfillProgress=r,a.candidates===0)break}}catch(r){this.isCurrentBackfillRequest(n,e,t)&&(this.backfillError=Y(r))}finally{this.isCurrentBackfillRequest(n,e,t)&&(this.backfillBusy=null)}}async confirmBackfillRollback(){let e=this.context.gateway.snapshot.client,t=this.currentAgentId();if(!this.canAdmin||!e||!t||this.backfillBusy!==null||this.applyingProviderId!==null||!this.backfillRollbackPending)return;let n=++this.backfillEpoch;this.backfillBusy=`rollback`,this.backfillError=null;try{let r=await e.request(`memory.sessionBackfill.rollback`,{agentId:t});this.isCurrentBackfillRequest(n,e,t)&&(this.backfillRollbackResult=r,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackPending=!1)}catch(r){this.isCurrentBackfillRequest(n,e,t)&&(this.backfillError=Y(r))}finally{this.isCurrentBackfillRequest(n,e,t)&&(this.backfillBusy=null)}}render(){let e=this.context.gateway.snapshot,t=this.context.agents.state.agentsList,n=this.currentAgentId(),r=Ce({connected:e.phase===`connected`,canAdmin:this.canAdmin,agents:d(t?.agents??[]),selectedAgentId:n,plan:this.plan,loading:this.loading||this.context.agents.state.agentsLoading,error:(n?null:this.context.agents.state.agentsError)??this.error,applyError:this.applyError,replaceExisting:this.replaceExisting,selectedByProvider:this.selectedByProvider,applyingProviderId:this.applyingProviderId,pendingProviderId:this.pendingImport?.agentId===n?this.pendingImport.providerId:null,lastResults:this.lastResults,backfillAvailable:se(e,`memory.sessionBackfill.preview`)!==!1,backfillFrom:this.backfillFrom,backfillTo:this.backfillTo,backfillBusy:this.backfillBusy,backfillError:this.backfillError,backfillPreview:this.backfillPreview,backfillProgress:this.backfillProgress,backfillRollbackResult:this.backfillRollbackResult,backfillRollbackPending:this.backfillRollbackPending,onSelectAgent:e=>this.selectAgent(e),onReplaceExisting:e=>this.setReplaceExisting(e),onRefresh:()=>void this.refresh(),onToggleCollection:(e,t,n)=>this.toggleCollection(e,t,n),onRequestImport:e=>this.requestImport(e),onConfirmImport:()=>void this.confirmImport(),onCancelImport:()=>{this.applyingProviderId===null&&(this.pendingImport=null,this.applyError=null)},onBackfillFromChange:e=>{this.backfillFrom=e,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillError=null},onBackfillToChange:e=>{this.backfillTo=e,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillError=null},onBackfillPreview:()=>void this.previewBackfill(),onBackfillApply:()=>void this.applyBackfill(),onBackfillRollbackRequest:()=>{this.backfillBusy===null&&(this.backfillRollbackPending=!0,this.backfillError=null)},onBackfillRollbackConfirm:()=>void this.confirmBackfillRollback(),onBackfillRollbackCancel:()=>{this.backfillBusy===null&&(this.backfillRollbackPending=!1)}});return v`
      ${j({title:E(`memory-import`),subtitle:v`${ae(`memory-import`)}
        ${N(Z)}`})}
      ${B(r)}
    `}},t([n({context:x,subscribe:!0})],Q.prototype,`context`,void 0),t([_()],Q.prototype,`replaceExisting`,void 0),t([_()],Q.prototype,`selectedByProvider`,void 0),t([_()],Q.prototype,`applyingProviderId`,void 0),t([_()],Q.prototype,`pendingImport`,void 0),t([_()],Q.prototype,`applyError`,void 0),t([_()],Q.prototype,`lastResults`,void 0),t([_()],Q.prototype,`backfillFrom`,void 0),t([_()],Q.prototype,`backfillTo`,void 0),t([_()],Q.prototype,`backfillBusy`,void 0),t([_()],Q.prototype,`backfillError`,void 0),t([_()],Q.prototype,`backfillPreview`,void 0),t([_()],Q.prototype,`backfillProgress`,void 0),t([_()],Q.prototype,`backfillRollbackResult`,void 0),t([_()],Q.prototype,`backfillRollbackPending`,void 0),customElements.get(`openclaw-memory-import-page`)||customElements.define(`openclaw-memory-import-page`,Q)})))()}$();
//# sourceMappingURL=memory-import-page-DTIYm7iJ.js.map