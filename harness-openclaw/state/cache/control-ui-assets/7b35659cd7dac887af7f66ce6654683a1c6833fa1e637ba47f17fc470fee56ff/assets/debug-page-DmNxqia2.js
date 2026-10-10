import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as a,Sl as o,Ss as s,Tl as c,Vs as l,bs as u,sn as ee,un as d,wl as f}from"./control-ui-core-CndkyZ8m.js";import{$ as p,Q as m,at as h,c as g,dt as _,h as v,m as te,nt as y,r as b,s as x,t as S}from"./lit-runtime-CIjzngcy.js";import{$r as C,Ii as ne,Li as w,Qr as re,si as ie,xi as ae}from"./control-ui-core-C5mtYcym.js";import{Fa as T,Ia as E,Ni as D,Pi as O}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as k,U as A,V as j,z as M}from"./control-ui-boot-shared-DwSLfX8E.js";import{_t as N,dt as P,ht as F,nr as I,nt as L,ot as R,pt as z,tr as B}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as V,r as H,t as U}from"./control-ui-boot-shared-Bt2ZINpX.js";import{n as W,t as G}from"./settings-workspace-gGOfyDax.js";import{i as K,s as q}from"./presenter-DTSxSRZD.js";import{a as J,i as oe,n as se,t as ce}from"./lane-table-rRVUGW78.js";function Y(e,t){return z({title:e,stacked:!0,control:y`<pre class="code-block">
${v([t],()=>b(B(JSON.stringify(t??{},null,2))))}</pre>`})}function le(e){let t=(e.status&&typeof e.status==`object`?e.status.securityAudit:null)?.summary??null;if(!t)return p;let n=t.critical??0,r=t.warn??0,a=t.info??0,o=n>0?`danger`:r>0?`warn`:`ok`,s=n>0?i(`debug.security.critical`,{count:String(n)}):r>0?i(`debug.security.warnings`,{count:String(r)}):i(`debug.security.noCriticalIssues`),c=a>0?` · ${i(`debug.security.info`,{count:String(a)})}`:``;return z({title:i(`debug.security.audit`),description:y`
      ${i(`debug.security.runPrefix`)}
      <span class="mono">openclaw security audit --deep</span>
      ${i(`debug.security.runSuffix`)}
    `,control:N({kind:o,label:`${s}${c}`})})}function ue(e){return e?y`
    <div class="settings-row" role="alert">
      <div class="settings-row__text">
        <span class="settings-row__title">
          ${N({kind:`danger`,label:i(`common.failed`)})}
        </span>
        <span class="settings-row__desc">${e}</span>
      </div>
    </div>
  `:p}function de(e){if(!(e.connected?e.loading:e.offlineStable))return p;let t=e.connected;return z({title:N({kind:t?`accent`:`muted`,label:i(t?`common.refreshing`:`common.offline`)}),description:i(t?`debug.refreshingSnapshots`:`debug.offlineSnapshots`)})}function fe(e){return z({title:e.event,description:ee(e.ts,void 0,``),stacked:!0,control:y`<pre class="code-block">
${v([e.payload],()=>b(B(K(e.payload))))}</pre>`})}function pe(e){let t=e.connected&&e.loading,n=F({title:i(`debug.snapshotsTitle`),description:i(`debug.snapshotsSubtitle`),actions:y`
        <button
          class="btn"
          ?disabled=${!e.connected||e.loading}
          @click=${e.onRefresh}
        >
          ${i(t?`common.refreshing`:`common.refresh`)}
        </button>
      `},y`
      ${de(e)} ${ue(e.diagnosticsError)}
      ${le(e)} ${Y(i(`debug.status`),e.status)}
      ${Y(i(`debug.health`),e.health)}
      ${Y(i(`debug.lastHeartbeat`),e.heartbeat)}
    `),r=F({title:i(`debug.lanes.title`),description:i(`debug.lanes.subtitle`),actions:y`
        <button class="btn" @click=${e.onOpenOverlay}>
          ${w()?i(`debug.overlay.open`):i(`debug.overlay.openWithShortcut`,{shortcut:U})}
        </button>
      `},y`
      <div class="data-table-container command-lanes-table-wrap">
        <table class="data-table command-lanes-table settings-table--stacked" role="table">
          <thead>
            <tr>
              <th scope="col">${i(`debug.lanes.lane`)}</th>
              <th scope="col">${i(`debug.lanes.active`)}</th>
              <th scope="col">${i(`debug.lanes.queued`)}</th>
              <th scope="col">${i(`debug.lanes.group`)}</th>
              <th scope="col">${i(`debug.lanes.blocked`)}</th>
            </tr>
          </thead>
          <tbody>
            ${se({lanes:e.lanes,dynamic:e.dynamic})}
          </tbody>
        </table>
      </div>
    `),a=F({title:i(`debug.manualRpcTitle`),description:i(`debug.manualRpcSubtitle`)},y`
      ${z({title:i(`debug.method`),control:y`
          <select
            class="settings-select"
            aria-label=${i(`debug.method`)}
            .value=${e.callMethod}
            @change=${t=>e.onCallMethodChange(t.target.value)}
          >
            ${e.callMethod?p:y` <option value="" disabled>${i(`debug.selectMethod`)}</option> `}
            ${e.methods.map(e=>y`<option value=${e}>${e}</option>`)}
          </select>
        `})}
      ${z({title:i(`debug.paramsJson`),stacked:!0,control:y`
          <textarea
            class="settings-input"
            aria-label=${i(`debug.paramsJson`)}
            .value=${e.callParams}
            @input=${t=>e.onCallParamsChange(t.target.value)}
            rows="6"
          ></textarea>
        `})}
      ${z({title:i(`common.call`),control:y`
          <button class="btn primary" @click=${e.onCall}>${i(`common.call`)}</button>
        `})}
      ${e.callError?y`
              <div class="settings-row settings-row--stacked">
                ${N({kind:`danger`,label:i(`debug.callFailed`)})}
                <pre class="code-block">${e.callError}</pre>
              </div>
            `:p}
      ${e.callResult?y`
              <div class="settings-row settings-row--stacked">
                ${N({kind:`ok`,label:i(`common.ok`)})}
                <pre class="code-block">
${v([e.callResult],()=>b(B(e.callResult)))}</pre>
              </div>
            `:p}
    `),o=F({title:i(`debug.modelsTitle`),description:i(`debug.modelsSubtitle`)},y`
      <div class="settings-row settings-row--stacked">
        <pre class="code-block">
${v([e.models],()=>b(B(JSON.stringify(e.models??[],null,2))))}</pre>
      </div>
    `),s=F({title:i(`debug.eventLogTitle`),description:i(`debug.eventLogSubtitle`)},e.eventLog.length===0?R(i(`debug.noEvents`)):g(e.eventLog,e=>e,fe));return P(y`${n} ${r} ${a} ${o} ${s}`,{wide:!0})}function X(){return(X=e((()=>{m(),te(),x(),S(),ne(),I(),L(),c(),d(),q(),V(),ce()})))()}var Z,Q;function $(){return($=e((()=>{r(),M(),m(),h(),ie(),C(),G(),s(),E(),f(),O(),l(),V(),X(),Z=3e3,Q=class extends o{constructor(...e){super(...e),this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugLanes=[],this.debugDynamic=null,this.debugCallMethod=``,this.debugCallParams=`{}`,this.debugCallResult=null,this.debugCallError=null,this.debugDiagnosticsError=null,this.debugLiveError=null,this.eventLog=[],this.polling=new D(this,Z,()=>{this.loadLiveDiagnostics()},!1),this.callEpoch=0,this.diagnosticsTaskActiveClient=null,this.diagnosticsAgentId=null,this.diagnosticsNeedsRefresh=!0,this.diagnosticsTask=new k(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.context?.settingsAgentSelection.state.selectedId??null],task:([e,t],{signal:n})=>e?J(e,t,n):j,onComplete:e=>{this.diagnosticsTaskActiveClient=null,this.debugDiagnosticsError=null,this.debugLiveError=null,this.debugStatus=e.status,this.debugHealth=e.health,this.debugModels=e.models,this.debugHeartbeat=e.heartbeat,this.debugLanes=e.lanes,this.debugDynamic=e.dynamic},onError:e=>{this.diagnosticsTaskActiveClient=null,this.debugDiagnosticsError=u(e)}}),this.liveTask=new k(this,{autoRun:!1,task:async([e],{signal:t})=>{if(!e)return j;let[n,r]=await Promise.all([e.request(`last-heartbeat`,{},{signal:t}),oe(e,t)]);return{heartbeat:n,...r}},onComplete:e=>{this.debugHeartbeat=e.heartbeat,this.debugLanes=e.lanes,this.debugDynamic=e.dynamic,this.debugLiveError=null},onError:e=>{this.debugLiveError=u(e)}}),this.gateway=new T(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugLanes=[],this.debugDynamic=null,this.debugCallResult=null,this.debugCallError=null,this.debugDiagnosticsError=null,this.debugLiveError=null},invalidateRequests:()=>{this.diagnosticsTask.run([null,null]),this.liveTask.run([null]),this.diagnosticsTaskActiveClient=null,this.diagnosticsNeedsRefresh=!0,this.callEpoch+=1},onSnapshot:()=>{this.syncPolling(),this.ensureInitialDebug()}}),this.subscriptions=new a(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribeEventLog(t),e=>{this.eventLog=e.eventLog}).watch(()=>this.context?.settingsAgentSelection,(e,t)=>e.subscribe(t),e=>{let t=e.state.selectedId;t!==this.diagnosticsAgentId&&(this.diagnosticsAgentId=t,this.debugModels=[],this.diagnosticsTask.run([null,null]),this.diagnosticsTaskActiveClient=null,this.diagnosticsNeedsRefresh=!0,this.loadDiagnostics())})}disconnectedCallback(){this.subscriptions.clear(),this.diagnosticsTask.run([null,null]),this.liveTask.run([null]),this.diagnosticsTaskActiveClient=null,this.diagnosticsAgentId=null,this.diagnosticsNeedsRefresh=!0,this.callEpoch+=1,super.disconnectedCallback()}syncPolling(){if(!this.gateway.connected||!this.gateway.client){this.polling.stop();return}this.polling.start()}ensureInitialDebug(){this.gateway.connected&&this.gateway.client&&this.diagnosticsNeedsRefresh&&!this.diagnosticsTaskActiveClient&&this.loadDiagnostics()}loadDiagnostics(){let e=this.gateway.connected?this.gateway.client:null;return!e||this.diagnosticsTaskActiveClient?Promise.resolve():(this.liveTask.run([null]),this.diagnosticsTaskActiveClient=e,this.diagnosticsNeedsRefresh=!1,this.diagnosticsAgentId=this.context.settingsAgentSelection.state.selectedId,this.diagnosticsTask.run([e,this.context.settingsAgentSelection.state.selectedId]))}loadLiveDiagnostics(){let e=this.gateway.connected?this.gateway.client:null;return!e||this.diagnosticsTaskActiveClient||this.liveTask.status===A.PENDING?Promise.resolve():this.liveTask.run([e])}async callDebugMethod(){let e=this.gateway.connected?this.gateway.client:null;if(!e)return;this.debugCallError=null,this.debugCallResult=null;let t=this.gateway.gateway,n=++this.callEpoch,r=()=>this.gateway.connected&&this.gateway.client===e&&this.gateway.gateway===t&&this.context.gateway===t&&this.callEpoch===n;try{let t=this.debugCallParams.trim()?JSON.parse(this.debugCallParams):{},n=await e.request(this.debugCallMethod.trim(),t);r()&&(this.debugCallResult=JSON.stringify(n,null,2))}catch(e){r()&&(this.debugCallError=u(e))}}render(){let e=pe({connected:this.gateway.connected,offlineStable:this.gateway.snapshot?.offlineStable??!1,loading:this.diagnosticsTask.status===A.PENDING,status:this.debugStatus,health:this.debugHealth,models:this.debugModels,heartbeat:this.debugHeartbeat,lanes:this.debugLanes,dynamic:this.debugDynamic,diagnosticsError:this.debugDiagnosticsError??this.debugLiveError,eventLog:this.eventLog,methods:(this.context.gateway.snapshot.hello?.features?.methods??[]).toSorted(),callMethod:this.debugCallMethod,callParams:this.debugCallParams,callResult:this.debugCallResult,callError:this.debugCallError,onCallMethodChange:e=>this.debugCallMethod=e,onCallParamsChange:e=>this.debugCallParams=e,onRefresh:()=>void this.loadDiagnostics(),onOpenOverlay:H,onCall:()=>void this.callDebugMethod()});return y`
      <section class="content-header">
        <div>
          <div class="page-title">${ae(`debug`)}</div>
        </div>
      </section>
      ${W(e)}
    `}},t([n({context:re,subscribe:!0})],Q.prototype,`context`,void 0),t([_()],Q.prototype,`debugStatus`,void 0),t([_()],Q.prototype,`debugHealth`,void 0),t([_()],Q.prototype,`debugModels`,void 0),t([_()],Q.prototype,`debugHeartbeat`,void 0),t([_()],Q.prototype,`debugLanes`,void 0),t([_()],Q.prototype,`debugDynamic`,void 0),t([_()],Q.prototype,`debugCallMethod`,void 0),t([_()],Q.prototype,`debugCallParams`,void 0),t([_()],Q.prototype,`debugCallResult`,void 0),t([_()],Q.prototype,`debugCallError`,void 0),t([_()],Q.prototype,`debugDiagnosticsError`,void 0),t([_()],Q.prototype,`debugLiveError`,void 0),t([_()],Q.prototype,`eventLog`,void 0),customElements.get(`openclaw-debug-page`)||customElements.define(`openclaw-debug-page`,Q)})))()}$();
//# sourceMappingURL=debug-page-DmNxqia2.js.map