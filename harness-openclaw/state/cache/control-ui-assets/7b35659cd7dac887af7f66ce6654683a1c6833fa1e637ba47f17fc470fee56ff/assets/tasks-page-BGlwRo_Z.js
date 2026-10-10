import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{$s as i,Al as a,Bs as o,Cr as s,F as c,Gn as l,Js as u,Kn as d,Pc as f,Qs as ee,Sl as te,Ss as p,Tl as m,Uc as h,Vs as ne,Xs as re,Xt as ie,Zs as ae,an as oe,bs as g,qc as se,qs as _,un as v,wl as ce,xs as y}from"./control-ui-core-CndkyZ8m.js";import{$ as b,Q as x,at as le,c as ue,dt as S,nt as C,s as de}from"./lit-runtime-CIjzngcy.js";import{$r as fe,Dn as pe,On as me,Qr as he,bi as w,er as T,nr as E,si as D,tr as O,xi as k}from"./control-ui-core-C5mtYcym.js";import{Bt as A,Fa as j,Ht as M,Ia as N,Jt as P,Kt as F,Wt as I,Xt as L,Yc as R,Yt as z,Zt as ge,an as _e,en as ve,in as ye,on as B,qt as be,rn as xe}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as Se,U as V,V as Ce,z as we}from"./control-ui-boot-shared-DwSLfX8E.js";import{_t as Te,dt as Ee,ft as De,ht as Oe,nt as H,ot as U}from"./control-ui-boot-shared-DpHhsTHW.js";import{dn as ke,fn as Ae,mn as je,pn as Me,un as Ne}from"./control-ui-boot-shared-6jDbGebE.js";import"./control-ui-boot-shared-CoE663Cg.js";import{n as Pe,t as Fe}from"./settings-workspace-gGOfyDax.js";import{n as Ie,t as Le}from"./agent-row-chip-m2O7L9Wr.js";import{n as Re,t as ze}from"./agent-scope-control-CS9bqwlc.js";function Be(e,t){let n=e.childSessionKey??e.sessionKey;if(!n)return b;let r=t.sessionRow(n),o=i({face:ae(r),sessionKey:n,fallbackAgentId:t.agentId,basePath:t.basePath,mainKey:t.mainKey,row:r,preferenceDerivedFace:!0}).href;return C`<a
    class="session-link"
    href=${o}
    @click=${e=>{c(e)&&(e.preventDefault(),t.onNavigateToChat(n))}}
    >${a(`tasksPage.openSession`)}</a
  >`}function Ve(e,t,n){let r=e.status===`queued`||e.status===`running`,i=_e(e.updatedAt??e.createdAt),o=ve(e),s=B(e),c=t.cancellingTaskIds.has(e.id),l=e.terminalOutcome===`blocked`,u=l&&e.deliveryStatus===`failed`,d=l&&e.deliveryStatus===`dismissed`,f=r&&t.canCancel||l&&t.canCopy||u&&t.canCancel;return C`
    <div class="settings-row task-row" data-task-id=${e.id}>
      <div class="settings-row__text task-row__content">
        <div class="settings-row__title">${s}</div>
        <div class="task-row__facts">
          <span data-task-status
            >${Te({kind:He(e.status),label:ye(e.status)})}</span
          >
          <span>${xe(e)}</span>
          ${e.agentId?Ie(e.agentId):b}
        </div>
        ${o?C`<div class="settings-row__desc">${o}</div>`:b}
        ${l?C`<div class="task-row__warning">
                <span
                  >${a(d?`tasksPage.deliveryDismissed`:`tasksPage.deliveryBlocked`)}</span
                >
                ${u?C`<span class="muted">${a(`tasksPage.duplicateRisk`)}</span>`:b}
              </div>`:b}
      </div>
      <div class="settings-row__control task-row__control">
        <div class="task-row__links">
          ${i>0?C`<span title=${n(i)}
                  >${oe(i)}</span
                >`:C`<span>${a(`common.na`)}</span>`}
          ${e.hasTranscript&&t.canCopy?C`<button class="btn btn--sm" type="button" ?disabled=${!t.connected} @click=${()=>t.onViewTranscript(e.id)}>${a(`tasksPage.viewTranscript`)}</button>`:b}
          ${Be(e,t)}
        </div>
        ${f?C`<div class="task-row__actions">
                ${r&&t.canCancel?C`<button
                        class="btn btn--sm"
                        type="button"
                        aria-label=${a(`tasksPage.cancelTask`,{title:s})}
                        ?disabled=${c||!t.connected}
                        @click=${()=>t.onCancel(e.taskId)}
                      >
                        ${a(c?`tasksPage.cancelling`:`common.cancel`)}
                      </button>`:b}
                ${l&&t.canCopy?C`<button
                        class="btn btn--sm"
                        type="button"
                        ?disabled=${c||!t.connected}
                        @click=${()=>t.onCopyResult(e.taskId)}
                      >
                        ${a(`tasksPage.copyResult`)}
                      </button>`:b}
                ${u&&t.canCancel?C`
                        <button
                          class="btn btn--sm"
                          type="button"
                          ?disabled=${c||!t.connected}
                          @click=${()=>t.onRetry(e.taskId)}
                        >
                          ${a(`tasksPage.retryDelivery`)}
                        </button>
                        <button
                          class="btn btn--sm"
                          type="button"
                          ?disabled=${c||!t.connected}
                          @click=${()=>t.onDismiss(e.taskId)}
                        >
                          ${a(`tasksPage.dismissDelivery`)}
                        </button>
                      `:b}
              </div>`:b}
      </div>
    </div>
  `}function He(e){switch(e){case`completed`:return`ok`;case`failed`:case`timed_out`:return`danger`;case`queued`:case`running`:return`warn`;case`cancelled`:return`muted`}return e}function W(e,...t){return e.filter(e=>t.includes(e.status)).length}function Ue(e,t){let n=e===`active`?[[W(t,`running`),a(`tasksPage.status.running`)],[W(t,`queued`),a(`tasksPage.status.queued`)]]:[[W(t,`completed`),a(`tasksPage.status.completed`)],[W(t,`failed`,`timed_out`),a(`tasksPage.status.failed`)]];return C`<span class="task-heading-facts">
    ${n.map(([e,t],n)=>C`
        ${n>0?C`<span aria-hidden="true">·</span>`:b}
        <span><strong>${e}</strong> ${t}</span>
      `)}
  </span>`}function G(e,t,n,r,i,a){let o=n.length===0?U(r):ue(n,e=>e.id,e=>Ve(e,i,a));return C`<div data-task-section=${e}>
    ${Oe({title:C`${t}${Ue(e,n)}`},o)}
  </div>`}function K(e){let t=ie(),{active:n,recent:r}=ge(e.tasks);return Ee(C`<div class="tasks-page-list">
      ${e.connected?b:C`<div class="callout warn">${a(`tasksPage.disconnected`)}</div>`}
      ${e.error?C`<div class="callout danger" role="alert">${e.error}</div>`:b}
      ${e.copyResultError?C`<div class="callout danger" role="alert">${e.copyResultError}</div>`:b}
      ${e.loading&&e.tasks.length===0?U(a(`tasksPage.loading`)):b}
      ${!e.loading&&e.tasks.length===0?U(a(`tasksPage.empty`)):b}
      ${G(`active`,a(`tasksPage.active`),n,a(`tasksPage.emptyActive`),e,t)}
      ${G(`recent`,a(`tasksPage.recent`),r,a(`tasksPage.emptyRecent`),e,t)}
    </div>`,{wide:!0})}function q(){return(q=e((()=>{x(),de(),Le(),H(),m(),v(),u(),M()})))()}function J(e,t){return t?e.agentId?.trim()?e.agentId.trim().toLowerCase()===t:[e.sessionKey,e.childSessionKey,e.ownerKey].some(e=>h(e)?.agentId===t):!0}function We(e){return e instanceof pe&&e.gatewayCode===`INVALID_REQUEST`}async function Ge(e){let t=[],n,r=new Set;for(;;){let i;try{i=await e.client.request(`tasks.list`,{status:[`queued`,`running`],limit:500,...e.agentId?{agentId:e.agentId}:{},...n===void 0?{}:{cursor:n}},{signal:e.signal})}catch(e){throw n!==void 0&&We(e)?new X(e):e}let o=z(i);if(!o)throw Error(a(`tasksPage.invalidResponse`));if(t=I(t,o.tasks),o.nextCursor===void 0)return t;if(!o.nextCursor||r.has(o.nextCursor))throw new X(Error(a(`tasksPage.invalidResponse`)));r.add(o.nextCursor),n=o.nextCursor}}async function Y(e){let[t,n]=await Promise.all([Ge(e),e.client.request(`tasks.list`,{status:Z,sortBy:`endedAt`,limit:200,...e.agentId?{agentId:e.agentId}:{}},{signal:e.signal})]),r=z(n);if(!r)throw Error(a(`tasksPage.invalidResponse`));return{active:t,recent:r.tasks}}async function Ke(e){try{return await Y(e)}catch(t){if(!(t instanceof X))throw t;return await Y(e)}}var X,Z,Q;function $(){return($=e((()=>{r(),we(),x(),le(),me(),D(),fe(),E(),ze(),H(),Fe(),m(),s(),d(),p(),u(),f(),M(),N(),ce(),ne(),Ae(),Ne(),q(),X=class extends Error{constructor(e){super(`task list continuation failed`),this.reason=e}},Z=[`completed`,`failed`,`timed_out`,`cancelled`],Q=class extends te{constructor(...e){super(...e),this.tasks=[],this.error=null,this.copyResultError=null,this.cancellingTaskIds=new Set,this.transcriptTaskId=null,this.transcriptHost={client:null,connected:!1,requestUpdate:()=>this.requestUpdate()},this.taskRefreshEvents=null,this.taskSnapshotInvalidated=!1,this.copyResultAttempt=0,this.gateway=new j(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.tasks=[],this.taskSnapshotInvalidated=!1,this.error=null,this.copyResultError=null},invalidateRequests:()=>this.cancelGatewayWork(),onSnapshot:()=>{this.gateway.connected&&this.context.agents.ensureList()},ensureInitialData:()=>void this.refreshTasks()}),this.observeAgentScope=R(()=>{this.gateway.invalidate(),this.cancelGatewayWork(),this.invalidateTaskSnapshot(),this.gateway.connected&&this.refreshTasks(),this.requestUpdate()}),this.listTask=new Se(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.gateway:null,this.gateway.connected?this.gateway.client:null,this.context?.agentSelection.state.scopeId??null],task:async([e,t,n],{signal:r})=>{if(!e||!t)return Ce;let i={gateway:e,client:t,scopeId:n,events:[]};return this.taskRefreshEvents=i,{...await Ke({client:t,agentId:n??void 0,signal:r}),buffer:i}},onComplete:({active:e,recent:t,buffer:n})=>{let r=I(e,t);for(let e of n.events)r=A(r,e).tasks;this.taskSnapshotInvalidated=!1,this.tasks=r,this.reconcileTranscriptSelection(),this.taskRefreshEvents===n&&(this.taskRefreshEvents=null)},onError:e=>{e instanceof X?this.invalidateTaskSnapshot():this.taskRefreshEvents=null,this.error=g(e instanceof X?e.reason:e,a(`tasksPage.loadFailed`))}}),this.subscriptions=new o(this).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{if(this.gateway.gateway!==e||this.context.gateway!==e||!this.gateway.connected||t.event!==`task`)return;let n=this.context.agentSelection.state.scopeId,r=F(t.payload);if((r?.action===`deleted`||r?.action===`upserted`&&J(r.task,n))&&this.bufferTaskRefreshEvent(r),this.taskSnapshotInvalidated)return;let i=A(this.tasks,t.payload);if(i.refetch){this.refreshTasks();return}this.tasks=i.tasks.filter(e=>J(e,n)),this.reconcileTranscriptSelection(),r&&Me(this.transcriptHost,r)})).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t))}bufferTaskRefreshEvent(e){let t=this.taskRefreshEvents;e&&e.action!==`restored`&&t&&t.gateway===this.gateway.gateway&&t.client===this.gateway.client&&t.scopeId===this.context.agentSelection.state.scopeId&&t.events.push(e)}invalidateTaskSnapshot(){this.closeTranscript(),this.taskRefreshEvents=null,this.taskSnapshotInvalidated=!0,this.tasks=[]}disconnectedCallback(){this.closeTranscript(),this.copyResultAttempt+=1,this.copyResultError=null,this.subscriptions.clear(),super.disconnectedCallback()}cancelGatewayWork(){this.closeTranscript(),this.copyResultAttempt+=1,this.copyResultError=null,this.taskRefreshEvents=null,this.listTask.run([null,null,null]),this.cancellingTaskIds=new Set}refreshTasks(){let e=this.gateway.gateway,t=this.gateway.client;if(!e||this.context.gateway!==e||!this.gateway.connected||!t)return Promise.resolve();let n=this.context.agentSelection.state.scopeId;return this.error=null,this.copyResultError=null,this.listTask.run([e,t,n])}async cancelTask(e){let t=this.gateway.capture(),n=this.gateway.gateway;if(t&&n&&this.context.gateway===n&&!this.cancellingTaskIds.has(e)){this.cancellingTaskIds=new Set([...this.cancellingTaskIds,e]),this.error=null;try{let n=await t.client.request(`tasks.cancel`,{taskId:e});if(!this.gateway.isCurrent(t))return;let r=be(n);if(r?.task){let e=F({action:`upserted`,task:r.task});this.bufferTaskRefreshEvent(e),this.tasks=A(this.tasks,{action:`upserted`,task:r.task}).tasks}r?.cancelled||(this.error=y(r?.reason,a(`tasksPage.cancelFailed`)))}catch(e){this.gateway.isCurrent(t)&&(this.error=g(e,a(`tasksPage.cancelFailed`)))}finally{if(this.gateway.isCurrent(t)){let t=new Set(this.cancellingTaskIds);t.delete(e),this.cancellingTaskIds=t}}}}async recoverTask(e,t){let n=this.gateway.capture(),r=this.gateway.gateway;if(n&&r&&this.context.gateway===r&&!this.cancellingTaskIds.has(e)){this.cancellingTaskIds=new Set([...this.cancellingTaskIds,e]),this.error=null;try{let r=t===`retry`?await n.client.request(`tasks.retry`,{taskIds:[e]}):await n.client.request(`tasks.dismiss`,{taskIds:[e]});if(!this.gateway.isCurrent(n))return;let i=L(r)?.results[0];if(!i?.ok){this.error=y(i?.reason,a(`tasksPage.recoveryFailed`));return}if(i.task){let e=F({action:`upserted`,task:i.task});this.bufferTaskRefreshEvent(e),this.tasks=A(this.tasks,e).tasks}}catch(e){this.gateway.isCurrent(n)&&(this.error=g(e,a(`tasksPage.recoveryFailed`)))}finally{if(this.gateway.isCurrent(n)){let t=new Set(this.cancellingTaskIds);t.delete(e),this.cancellingTaskIds=t}}}}async copyTaskResult(e){let t=++this.copyResultAttempt,n=this.gateway.capture(),r=this.gateway.gateway;if(n&&r&&this.context.gateway===r)try{let r=P(await n.client.request(`tasks.get`,{taskId:e}));if(!this.gateway.isCurrent(n)||t!==this.copyResultAttempt)return;let i=r?.result??r?.progressSummary;if(!i){this.copyResultError=a(`tasksPage.recoveryFailed`);return}let o=await l(i,()=>this.gateway.isCurrent(n)&&t===this.copyResultAttempt);this.gateway.isCurrent(n)&&t===this.copyResultAttempt&&(this.copyResultError=o?null:a(`common.copyFailed`))}catch(e){this.gateway.isCurrent(n)&&t===this.copyResultAttempt&&(this.copyResultError=g(e,a(`tasksPage.recoveryFailed`)))}}async viewTranscript(e){if(this.transcriptTaskId=e,await this.updateComplete,!this.isConnected||this.transcriptTaskId!==e)return;let t=this.querySelector(`.tasks-transcript`);t?.focus({preventScroll:!0}),t?.scrollIntoView({block:`start`,behavior:`instant`})}closeTranscript(){je(this.transcriptHost),this.transcriptTaskId=null}reconcileTranscriptSelection(){this.transcriptTaskId&&!this.tasks.some(e=>e.id===this.transcriptTaskId)&&this.closeTranscript()}renderTranscript(){let e=this.tasks.find(e=>e.id===this.transcriptTaskId);return e?(Object.assign(this.transcriptHost,{client:this.gateway.client,connected:this.gateway.connected,connectionEpoch:this.gateway.epoch}),C`<section
      class="tasks-transcript"
      tabindex="-1"
      aria-label=${a(`tasksPage.transcript`)}
    >
      <div class="tasks-transcript__header">
        <h2>${B(e)}</h2>
        <button class="btn btn--sm" type="button" @click=${()=>this.closeTranscript()}>
          ${a(`common.close`)}
        </button>
      </div>
      ${ke({host:this.transcriptHost,task:e})}
    </section>`):b}render(){let e=re(this.context);return C`
      ${De({title:k(`tasks`),subtitle:w(`tasks`),actions:C`
          ${Re({agents:this.context.agents.state.agentsList?.agents??[],selection:this.context.agentSelection})}
          <button
            class="btn"
            type="button"
            ?disabled=${!this.gateway.connected||this.listTask.status===V.PENDING}
            @click=${()=>void this.refreshTasks()}
          >
            ${this.listTask.status===V.PENDING?a(`common.refreshing`):a(`common.refresh`)}
          </button>
        `})}
      ${Pe(C`${this.renderTranscript()}${K({basePath:this.context.basePath,agentId:e,mainKey:se({agentsList:this.context.agents.state.agentsList,hello:this.context.gateway.snapshot.hello}),connected:this.gateway.connected,canCopy:T(this.context.gateway.snapshot.hello?.auth??null),canCancel:O(this.context.gateway.snapshot.hello?.auth??null),loading:this.listTask.status===V.PENDING,error:this.error,copyResultError:this.copyResultError,tasks:this.tasks,cancellingTaskIds:this.cancellingTaskIds,sessionRow:e=>_(this.context,e),onCancel:e=>void this.cancelTask(e),onRetry:e=>void this.recoverTask(e,`retry`),onDismiss:e=>void this.recoverTask(e,`dismiss`),onCopyResult:e=>void this.copyTaskResult(e),onViewTranscript:e=>void this.viewTranscript(e),onNavigateToChat:e=>{let t=ee(this.context,e);this.context.navigate(t,i({context:this.context,face:t,sessionKey:e,preferenceDerivedFace:!0}).options)}})}`)}
    `}},t([n({context:he,subscribe:!0})],Q.prototype,`context`,void 0),t([S()],Q.prototype,`tasks`,void 0),t([S()],Q.prototype,`error`,void 0),t([S()],Q.prototype,`copyResultError`,void 0),t([S()],Q.prototype,`cancellingTaskIds`,void 0),t([S()],Q.prototype,`transcriptTaskId`,void 0),customElements.get(`openclaw-tasks-page`)||customElements.define(`openclaw-tasks-page`,Q)})))()}$();
//# sourceMappingURL=tasks-page-BGlwRo_Z.js.map