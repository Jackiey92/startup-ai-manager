import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Tl as r,ds as i,gs as a,wl as o,xl as s}from"./control-ui-core-CndkyZ8m.js";import{$ as c,Q as l,at as u,ct as d,dt as f,nt as p,pt as m}from"./lit-runtime-CIjzngcy.js";import{lr as h}from"./control-ui-core-C5mtYcym.js";import{mn as g}from"./control-ui-boot-shared-DlJEsz5Q.js";import{C as _,S as v,T as y,Ur as b,Vr as x,w as S,x as C}from"./control-ui-boot-shared-DpHhsTHW.js";function w(e){let t=e.queue.filter(t=>t.id!==e.activeId);return t.length===0?c:p`
    <div class="exec-approval-list" aria-label=${n(`execApproval.otherPending`)}>
      <div class="exec-approval-list__heading">${n(`execApproval.otherPending`)}</div>
      ${t.map(t=>{let r=x(t.request.command),i=t.request.agentId?.trim()||`—`;return p`
          <button
            class="exec-approval-list__item"
            type="button"
            aria-label=${n(`execApproval.reviewRequest`,{agent:i,command:r})}
            @click=${()=>e.onSelect(t.id)}
          >
            <span class="exec-approval-list__agent">${i}</span>
            <span class="exec-approval-list__command mono">${r}</span>
            <openclaw-approval-countdown
              class="exec-approval-list__expiry"
              aria-hidden="true"
              .expiresAtMs=${t.expiresAtMs}
              .compact=${!0}
            ></openclaw-approval-countdown>
          </button>
        `})}
    </div>
  `}function T(e){return e.composedPath().some(e=>e instanceof Element&&e.closest(`input, textarea, [contenteditable]:not([contenteditable='false'])`)!==null)}function E(e){return T(e)?null:a(i.approveAlways,e)?`allow-always`:a(i.modifiedEnter,e)?`allow-once`:a(i.denyApproval,e)?`deny`:null}var D;function O(){return(O=e((()=>{l(),u(),b(),r(),g(),o(),_(),h(),D=class extends s{constructor(...e){super(...e),this.selectedApprovalId=null,this.explicitlyOpen=!1}show(){this.props?.queue.length&&(this.explicitlyOpen=!0,this.updateComplete.then(()=>this.dialog?.show()))}get dialogOpen(){return this.explicitlyOpen&&(this.props?.queue.length??0)>0}handleKeydown(e,t){if(e.defaultPrevented||e.repeat||this.props?.busy||!this.props?.canGrant)return;let n=E(e);n&&y(t).includes(n)&&(e.preventDefault(),this.props?.onDecision(t.id,n))}willUpdate(e){if(e.get(`props`)?.queue.length&&!this.props?.queue.length){this.explicitlyOpen=!1,this.selectedApprovalId=null;return}let t=this.props?.queue??[];t.some(e=>e.id===this.selectedApprovalId)||(this.selectedApprovalId=t.at(0)?.id??null)}render(){let e=this.props,t=e?.queue??[],n=t.find(e=>e.id===this.selectedApprovalId)??t.at(0);return!e||!this.explicitlyOpen||!n?c:p`
      <openclaw-modal-dialog
        label=${v(n)}
        description=${C(n.expiresAtMs,Date.now())}
        @keydown=${e=>this.handleKeydown(e,n)}
        @modal-cancel=${t=>{if(e.busy){t.preventDefault();return}this.explicitlyOpen=!1}}
      >
        <div class="exec-approval-modal-stack">
          ${S({approval:n,busy:e.busy,canGrant:e.canGrant,error:e.errors.get(n.id)??null,variant:`modal`,queueCount:t.length,onDecision:e.onDecision})}
          ${w({queue:t,activeId:n.id,onSelect:e=>{this.selectedApprovalId=e}})}
        </div>
      </openclaw-modal-dialog>
    `}},t([m({attribute:!1})],D.prototype,`props`,void 0),t([d(`openclaw-modal-dialog`)],D.prototype,`dialog`,void 0),t([f()],D.prototype,`selectedApprovalId`,void 0),t([f()],D.prototype,`explicitlyOpen`,void 0),customElements.get(`openclaw-exec-approval`)||customElements.define(`openclaw-exec-approval`,D)})))()}O();
//# sourceMappingURL=exec-approval-Bsvl8Ndb.js.map