import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as a,Ol as o,Sl as s,Ss as c,Tl as l,Vs as u,bs as d,wl as f}from"./control-ui-core-CndkyZ8m.js";import{$ as p,Q as m,at as h,dt as g,nt as _}from"./lit-runtime-CIjzngcy.js";import{$ as v,$r as y,Q as b,Qr as x,nr as S,rr as C,si as w,xi as T}from"./control-ui-core-C5mtYcym.js";import{dt as E,ft as D,it as O,lt as k,nt as A,st as j}from"./control-ui-boot-shared-DpHhsTHW.js";import{r as M,t as N}from"./approval-result-validators-D8jeMsyE.js";import{n as P,t as F}from"./settings-workspace-gGOfyDax.js";function I(e,t){if(e.revokedAtMs!==null)return i(`standingGrants.stateRevoked`);if(e.expiresAtMs!==null&&e.expiresAtMs<=t)return i(`standingGrants.stateExpired`);if(e.expiresAtMs!==null){let n=Math.max(1,Math.ceil((e.expiresAtMs-t)/864e5));return i(`standingGrants.stateExpiresIn`,{count:String(n)})}return i(`standingGrants.stateUntilRevoked`)}function L(e,t){return e.revokedAtMs===null&&(e.expiresAtMs===null||e.expiresAtMs>t)}function R(e){return new Intl.DateTimeFormat(o.getLocale(),{dateStyle:`medium`,timeStyle:`short`}).format(new Date(e))}function z(e){switch(e){case`exec`:return i(`approvalHistory.kinds.exec`);case`plugin`:return i(`approvalHistory.kinds.plugin`);case`system-agent`:return i(`approvalHistory.kinds.systemAgent`)}return e}function B(e){switch(e){case`allowed`:return i(`approvalHistory.statuses.allowed`);case`denied`:return i(`approvalHistory.statuses.denied`);case`expired`:return i(`approvalHistory.statuses.expired`);case`cancelled`:return i(`approvalHistory.statuses.cancelled`)}return e}function V(e){switch(e){case`allow-once`:return i(`approvalHistory.decisions.allowOnce`);case`allow-always`:return i(`approvalHistory.decisions.allowAlways`);case`deny`:return i(`approvalHistory.decisions.deny`);case void 0:return i(`approvalHistory.notApplicable`)}return e}function H(e){switch(e){case`user`:return i(`approvalHistory.reasons.user`);case`timeout`:return i(`approvalHistory.reasons.timeout`);case`malformed-verdict`:return i(`approvalHistory.reasons.malformedVerdict`);case`no-route`:return i(`approvalHistory.reasons.noRoute`);case`run-aborted`:return i(`approvalHistory.reasons.runAborted`);case`gateway-restart`:return i(`approvalHistory.reasons.gatewayRestart`);case`storage-corrupt`:return i(`approvalHistory.reasons.storageCorrupt`)}return e}function U(e){let t=e.presentation;return(t.kind===`exec`?t.commandText:t.title)||i(`approvalHistory.unknown`)}function W(e){let t=[e.source?.agentId,e.source?.sessionKey].filter(e=>!!e);return t.length>0?t.join(` · `):i(`approvalHistory.unknown`)}function G(e){return e.resolver?e.resolver.id?`${e.resolver.kind} · ${e.resolver.id}`:e.resolver.kind:i(`approvalHistory.unknown`)}var K,q,J,Y;function X(){return(X=e((()=>{r(),m(),h(),N(),w(),y(),b(),S(),A(),F(),l(),c(),f(),u(),K=50,q=`operator.approvals`,J=`https://docs.openclaw.ai/tools/exec-approvals`,Y=class extends s{constructor(...e){super(...e),this.items=[],this.grants=[],this.grantsError=null,this.revokingGrantId=null,this.nextCursor=null,this.loading=!1,this.loadingMore=!1,this.error=null,this.connected=!1,this.approvalsAccess=!0,this.client=null,this.gatewaySource=null,this.requestGeneration=0,this.hasLoaded=!1,this.historyRefreshPending=!1,this.subscriptions=new a(this).effect(()=>this.context?.gateway,e=>{this.gatewaySource!==e&&this.resetHistory(!0),this.gatewaySource=e,this.applyGatewaySnapshot(e.snapshot);let t=e.subscribe(t=>{this.gatewaySource===e&&this.context.gateway===e&&this.applyGatewaySnapshot(t)}),n=e.subscribeEvents(t=>{this.gatewaySource===e&&this.context.gateway===e&&this.approvalsAccess&&C(e.snapshot).canReviewApprovals&&v(t.event,t.payload)&&(this.historyRefreshPending=!0,!this.loading&&!this.loadingMore&&this.loadPage(!0))});return()=>{t(),n()}})}disconnectedCallback(){this.subscriptions.clear(),this.resetHistory(!1),this.gatewaySource=null,super.disconnectedCallback()}resetHistory(e){this.requestGeneration+=1,this.loading=!1,this.loadingMore=!1,this.historyRefreshPending=!1,e&&(this.hasLoaded=!1,this.items=[],this.nextCursor=null,this.error=null)}applyGatewaySnapshot(e){let t=e.client!==this.client,n=e.phase===`connected`!==this.connected,r=C(e).canReviewApprovals,i=r!==this.approvalsAccess;this.connected=e.phase===`connected`,this.approvalsAccess=r,t||i?(this.client=e.client,this.resetHistory(!0)):n&&(this.resetHistory(!1),e.phase===`connected`&&(this.hasLoaded=!1)),e.phase===`connected`&&e.client&&this.approvalsAccess&&!this.hasLoaded&&!this.loading&&this.loadPage(!0)}async loadPage(e){let t=this.client,n=this.gatewaySource;if(!t||!n||!this.connected||!this.approvalsAccess||!C(n.snapshot).canReviewApprovals||this.loading||this.loadingMore)return;let r=this.requestGeneration,a=e?void 0:this.nextCursor??void 0;if(!e&&!a)return;e?(this.historyRefreshPending=!1,this.loading=!0):this.loadingMore=!0,this.error=null;let o=()=>this.isConnected&&this.connected&&this.approvalsAccess&&this.gatewaySource===n&&this.context.gateway===n&&n.snapshot.phase===`connected`&&C(n.snapshot).canReviewApprovals&&this.client===t&&this.requestGeneration===r;try{let n=await t.request(`approval.history`,{...a?{cursor:a}:{},limit:K});if(!M(n))throw Error(i(`approvalHistory.invalidResponse`));if(!o())return;this.items=e?n.items:[...this.items,...n.items],this.nextCursor=n.nextCursor??null,this.hasLoaded=!0,e&&this.loadGrants(t,o)}catch(e){o()&&(this.error=d(e),this.hasLoaded=!0)}finally{o()&&(this.loading=!1,this.loadingMore=!1,this.historyRefreshPending&&this.loadPage(!0))}}async loadGrants(e,t){try{let n=await e.request(`exec.approval.grants.list`,{});if(!t())return;this.grants=Array.isArray(n.grants)?n.grants:[],this.grantsError=null}catch(e){t()&&(this.grantsError=d(e))}}async revokeGrant(e){let t=this.client;if(t&&this.revokingGrantId===null){this.revokingGrantId=e;try{await t.request(`exec.approval.grants.revoke`,{grantId:e});let n=Date.now();this.grants=this.grants.map(t=>t.grantId===e?{...t,revokedAtMs:n}:t),this.grantsError=null}catch(e){this.grantsError=d(e)}finally{this.revokingGrantId=null}}}renderGrants(){let e=Date.now();return _`
      <h2 class="settings-section-title">${i(`standingGrants.title`)}</h2>
      <p class="settings-section-subtitle">${i(`standingGrants.description`)}</p>
      ${this.grantsError?_`<div class="callout danger">${this.grantsError}</div>`:p}
      <div class="data-table-container">
        <table class="data-table standing-grants-table settings-table--stacked" role="table">
          <thead>
            <tr>
              <th scope="col">${i(`standingGrants.columns.automation`)}</th>
              <th scope="col">${i(`standingGrants.columns.command`)}</th>
              <th scope="col">${i(`standingGrants.columns.uses`)}</th>
              <th scope="col">${i(`standingGrants.columns.state`)}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            ${this.grants.length===0?_`
                    <tr>
                      <td colspan="5" class="data-table-empty-cell">
                        <div class="data-table-empty-state" role="status" aria-live="polite">
                          ${i(`standingGrants.empty`)}
                        </div>
                      </td>
                    </tr>
                  `:this.grants.map(t=>_`
                      <tr>
                        <td data-label=${i(`standingGrants.columns.automation`)}>
                          ${t.cronJobName??t.cronJobId}
                        </td>
                        <td class="mono" data-label=${i(`standingGrants.columns.command`)}>
                          ${t.command}
                        </td>
                        <td data-label=${i(`standingGrants.columns.uses`)}>${t.useCount}</td>
                        <td data-label=${i(`standingGrants.columns.state`)}>
                          ${I(t,e)}
                        </td>
                        <td>
                          ${L(t,e)?_`
                                  <button
                                    class="btn btn--sm"
                                    ?disabled=${this.revokingGrantId!==null}
                                    @click=${()=>void this.revokeGrant(t.grantId)}
                                  >
                                    ${this.revokingGrantId===t.grantId?i(`standingGrants.revoking`):i(`standingGrants.revoke`)}
                                  </button>
                                `:p}
                        </td>
                      </tr>
                    `)}
          </tbody>
        </table>
      </div>
    `}renderTable(){return this.loading&&this.items.length===0?j(k({label:i(`approvalHistory.loading`)})):_`
      <div class="data-table-container">
        <table class="data-table approval-history-table settings-table--stacked" role="table">
          <thead>
            <tr>
              <th scope="col">${i(`approvalHistory.columns.resolved`)}</th>
              <th scope="col">${i(`approvalHistory.columns.kind`)}</th>
              <th scope="col">${i(`approvalHistory.columns.request`)}</th>
              <th scope="col">${i(`approvalHistory.columns.decision`)}</th>
              <th scope="col">${i(`approvalHistory.columns.reason`)}</th>
              <th scope="col">${i(`approvalHistory.columns.source`)}</th>
              <th scope="col">${i(`approvalHistory.columns.resolver`)}</th>
            </tr>
          </thead>
          <tbody>
            ${this.items.length===0?_`
                    <tr>
                      <td colspan="7" class="data-table-empty-cell">
                        <div class="data-table-empty-state" role="status" aria-live="polite">
                          ${this.error||!this.hasLoaded?i(`approvalHistory.unknown`):i(`approvalHistory.empty`)}
                        </div>
                      </td>
                    </tr>
                  `:this.items.map(e=>_`
                      <tr>
                        <td data-label=${i(`approvalHistory.columns.resolved`)}>
                          ${R(e.resolvedAtMs)}
                        </td>
                        <td data-label=${i(`approvalHistory.columns.kind`)}>
                          ${z(e.presentation.kind)}
                        </td>
                        <td class="mono" data-label=${i(`approvalHistory.columns.request`)}>
                          ${U(e)}
                        </td>
                        <td data-label=${i(`approvalHistory.columns.decision`)}>
                          ${B(e.status)} ·
                          ${V(`decision`in e?e.decision:void 0)}
                        </td>
                        <td data-label=${i(`approvalHistory.columns.reason`)}>
                          ${H(e.reason)}
                        </td>
                        <td class="mono" data-label=${i(`approvalHistory.columns.source`)}>
                          ${W(e)}
                        </td>
                        <td class="mono" data-label=${i(`approvalHistory.columns.resolver`)}>
                          ${G(e)}
                        </td>
                      </tr>
                    `)}
          </tbody>
        </table>
      </div>
      <div class="data-table-pagination">
        <div class="data-table-pagination__info">${i(`approvalHistory.retention`)}</div>
        <div class="data-table-pagination__controls">
          ${this.nextCursor?_`
                  <button ?disabled=${this.loadingMore} @click=${()=>void this.loadPage(!1)}>
                    ${this.loadingMore?i(`approvalHistory.loadingMore`):i(`approvalHistory.loadMore`)}
                  </button>
                `:p}
        </div>
      </div>
    `}render(){let e=E(_`
        ${this.connected?p:_`<div class="callout warn">${i(`approvalHistory.offline`)}</div>`}
        ${this.connected&&!this.approvalsAccess?_`
                <div class="callout warn" role="status">
                  ${i(`common.disabled`)} · <code>${q}</code>
                </div>
              `:p}
        ${this.approvalsAccess&&this.error?_`
                <div class="callout danger">
                  ${this.error}
                  <button class="btn btn--sm" @click=${()=>void this.loadPage(!0)}>
                    ${i(`common.retry`)}
                  </button>
                </div>
              `:p}
        ${this.approvalsAccess?this.renderGrants():p}
        ${this.approvalsAccess?_`<h2 class="settings-section-title">${i(`standingGrants.historyTitle`)}</h2>`:p}
        ${this.approvalsAccess?this.renderTable():p}
      `,{wide:!0});return _`
      ${D({title:T(`approvals`),subtitle:_`${i(`approvalHistory.description`)}
        ${O(J)}`})}
      ${P(e)}
    `}},t([n({context:x,subscribe:!0})],Y.prototype,`context`,void 0),t([g()],Y.prototype,`items`,void 0),t([g()],Y.prototype,`grants`,void 0),t([g()],Y.prototype,`grantsError`,void 0),t([g()],Y.prototype,`revokingGrantId`,void 0),t([g()],Y.prototype,`nextCursor`,void 0),t([g()],Y.prototype,`loading`,void 0),t([g()],Y.prototype,`loadingMore`,void 0),t([g()],Y.prototype,`error`,void 0),t([g()],Y.prototype,`connected`,void 0),t([g()],Y.prototype,`approvalsAccess`,void 0),customElements.get(`openclaw-approvals-page`)||customElements.define(`openclaw-approvals-page`,Y)})))()}X();
//# sourceMappingURL=approvals-page-CKTRN9yz.js.map