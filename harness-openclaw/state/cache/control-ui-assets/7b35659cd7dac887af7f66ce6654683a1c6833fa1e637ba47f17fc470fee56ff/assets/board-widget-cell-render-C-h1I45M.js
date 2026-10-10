import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Ss as n,Tl as r,bs as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,nt as s}from"./lit-runtime-CIjzngcy.js";import{Di as c,Ei as l}from"./control-ui-core-C5mtYcym.js";function u(e){let{widget:n}=e,r=n.declared?.netOrigins??[],i=n.declared?.tools??[];return s`
    <div class="board-widget__grant board-widget__grant--pending" data-test-id="board-pending">
      <div class="board-widget__grant-mark" aria-hidden="true">!</div>
      <strong>${t(`board.widget.needsApproval`)}</strong>
      ${r.length>0||i.length>0?s`<div class="board-widget__grant-groups">
              ${r.length>0?s`<section>
                      <strong>${t(`board.widget.networkAccess`)}</strong>
                      <ul class="board-widget__grant-summary">
                        ${r.map(e=>s`<li>${e}</li>`)}
                      </ul>
                    </section>`:a}
              ${i.length>0?s`<section>
                      <strong>${t(`board.widget.hostTools`)}</strong>
                      <ul class="board-widget__grant-summary">
                        ${i.map(e=>s`<li>${e}</li>`)}
                      </ul>
                    </section>`:a}
            </div>`:n.declaredSummary?.length?s`<ul class="board-widget__grant-summary">
                ${n.declaredSummary.map(e=>s`<li>${e}</li>`)}
              </ul>`:s`<span>${t(`board.widget.needsApprovalDetail`)}</span>`}
      <div class="board-widget__grant-actions">
        <button
          class="btn btn--small btn--primary"
          type="button"
          data-test-id="board-grant-allow"
          ?disabled=${e.disabled}
          @click=${()=>e.onGrant(`granted`)}
        >
          ${t(`board.widget.allow`)}
        </button>
        <button
          class="btn btn--small"
          type="button"
          data-test-id="board-grant-reject"
          ?disabled=${e.disabled}
          @click=${()=>e.onGrant(`rejected`)}
        >
          ${t(`board.widget.reject`)}
        </button>
      </div>
      ${e.error??a}
    </div>
  `}function d(e){if(e.grantState!==`granted`||!e.declared)return a;let n=[...(e.declared.netOrigins??[]).map(e=>t(`board.widget.networkCapability`,{capability:e})),...(e.declared.tools??[]).map(e=>t(`board.widget.toolCapability`,{capability:e}))];return n.length===0?a:s`
    <openclaw-tooltip
      .content=${`${t(`board.widget.activeCapabilities`)}\n${n.join(`
`)}`}
    >
      <span class="board-widget__capabilities" data-test-id="board-capabilities-granted">
        ${t(`board.widget.granted`)}
      </span>
    </openclaw-tooltip>
  `}function f(){return(f=e((()=>{o(),r()})))()}function p(e){let t=e.querySelector(`.board-widget__menu`);t&&(t.open=!1)}function m(e){let{widget:n,tabs:r,disabled:i,onSelect:o}=e,c=r.filter(e=>e.tabId!==n.tabId);return s`
    <wa-dropdown class="board-widget__menu" placement="bottom-end" @wa-select=${o}>
      <button
        class="board-widget__menu-trigger"
        slot="trigger"
        type="button"
        aria-label=${t(`board.widget.menuLabel`)}
        title=${t(`board.widget.menuLabel`)}
      >
        ⋮
      </button>
      <div class="board-widget__menu-heading">${t(`board.widget.moveToTab`)}</div>
      ${c.length>0?c.map(e=>s`
                <wa-dropdown-item value=${`move:${e.tabId}`} ?disabled=${i}>
                  ${e.title}
                </wa-dropdown-item>
              `):s`<span class="board-widget__menu-empty">${t(`board.widget.noOtherTabs`)}</span>`}
      <div class="board-widget__menu-heading">${t(`board.widget.resize`)}</div>
      ${Object.entries(b).map(([e,t])=>s`
          <wa-dropdown-item
            class="board-widget__preset"
            value=${`resize:${e}`}
            ?disabled=${i}
          >
            ${e.toUpperCase()}
            <span slot="details">${t.w}×${t.h}</span>
          </wa-dropdown-item>
        `)}
      ${n.contentKind===`html`?s`<wa-dropdown-item
              class="board-widget__preset"
              type="checkbox"
              value="height:auto"
              ?checked=${n.heightMode!==`fixed`}
              ?disabled=${i}
            >
              ${t(`board.widget.autoHeight`)}
            </wa-dropdown-item>`:a}
      <div class="board-widget__menu-separator" role="separator"></div>
      <wa-dropdown-item class="board-widget__menu-danger" value="remove" ?disabled=${i}>
        <span slot="icon" class="board-widget__menu-icon" aria-hidden="true">${l.trash}</span>
        ${t(`board.widget.remove`)}
      </wa-dropdown-item>
    </wa-dropdown>
  `}function h(e){return u(e)}function g(e){return s`
    <div class="board-widget__grant board-widget__grant--rejected" data-test-id="board-rejected">
      <strong>${t(`board.widget.rejected`)}</strong>
      <span>${t(`board.widget.rejectedDetail`)}</span>
      <button
        class="btn btn--small"
        type="button"
        ?disabled=${e.disabled}
        @click=${e.onRemove}
      >
        ${t(`board.widget.remove`)}
      </button>
    </div>
  `}function _(e){return s`
    <div class="board-widget__disabled-plugin" data-test-id="board-disabled-plugin">
      ${e.content??s`<strong>${t(`board.widget.disabledPlugin`,{pluginId:e.pluginId})}</strong>`}
      <button
        class="btn btn--small"
        type="button"
        ?disabled=${e.disabled}
        @click=${e.onRemove}
      >
        ${t(`board.widget.remove`)}
      </button>
    </div>
  `}function v(e,n){let r=i(e);return s`
    <div class="board-widget__error" role="alert" data-test-id="board-widget-error">
      <strong>${t(`board.widget.errorTitle`)}</strong>
      <span>${t(`board.widget.errorDetail`)}</span>
      <details>
        <summary>${t(`board.widget.errorShow`)}</summary>
        <code>${r}</code>
      </details>
      ${n?s`<button class="btn btn--small" type="button" @click=${n}>
              ${t(`board.widget.retry`)}
            </button>`:a}
    </div>
  `}function y(e,n=!1){return s`
    <div
      class=${`board-widget__error ${n?`board-widget__error--inline`:``}`}
      role="alert"
      data-test-id="board-widget-action-error"
    >
      <strong>${t(`board.widget.actionErrorTitle`)}</strong>
      <span>${t(`board.widget.actionErrorDetail`)}</span>
      <details>
        <summary>${t(`board.widget.errorShow`)}</summary>
        <code>${e}</code>
      </details>
    </div>
  `}var b;function x(){return(x=e((()=>{o(),r(),n(),c(),f(),b={sm:{w:3,h:3},md:{w:6,h:4},lg:{w:8,h:6},xl:{w:12,h:8}}})))()}export{y as a,h as c,d,_ as i,g as l,p as n,v as o,x as r,m as s,b as t,f as u};
//# sourceMappingURL=board-widget-cell-render-C-h1I45M.js.map