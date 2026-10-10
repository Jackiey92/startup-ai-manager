import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$ as t,Q as n,_t as r,c as i,nt as a,s as o,v as s,x as c}from"./lit-runtime-CIjzngcy.js";import{Di as l,Ei as u,wi as d}from"./control-ui-core-C5mtYcym.js";import{Zt as f}from"./control-ui-boot-shared-DpHhsTHW.js";function p(e){let t=e;return t&&Array.isArray(t.hostedTabs)&&typeof t.selectHostedTab==`function`&&typeof t.closeHostedTab==`function`?t:null}var m;function h(){return(h=e((()=>{m=`openclaw:panel-hosted-tabs-change`})))()}function g(e){e.closest(`wa-tab-group`)?.querySelectorAll(`.is-drop-before, .is-drop-after`).forEach(e=>e.classList.remove(`is-drop-before`,`is-drop-after`))}function _(e){return e.closest(`wa-tab-group`)?.dataset.draggedPanelTab??``}function v(e){g(e),e.closest(`wa-tab-group`)?.removeAttribute(`data-dragged-panel-tab`)}function y(e){let t=e.getRootNode();return t instanceof ShadowRoot?t.activeElement??document.activeElement:document.activeElement}function b(){let e=document.activeElement;for(;e instanceof HTMLElement&&e.shadowRoot?.activeElement;)e=e.shadowRoot.activeElement;return e instanceof HTMLElement?e.id:null}function x(e,t){let n=e.getRootNode();return t===document.body||t===document.documentElement||n instanceof ShadowRoot&&t===n.host}function S(){let e=null;return t=>{if(e?.disconnect(),e=null,!(t instanceof HTMLElement))return;let n=()=>{let e=t.scrollWidth>t.clientWidth+1;t.classList.toggle(`is-overflowing`,e),t.parentElement?.classList.toggle(`has-label-overflow`,e),t.toggleAttribute(`data-tooltip-overflow`,e)};n(),typeof ResizeObserver==`function`&&(e=new ResizeObserver(n),e.observe(t))}}function C(){let e=null,t=null,n=0;return r=>{n+=1;let i=n;e?.disconnect(),e=null,t?.(),t=null,r instanceof HTMLElement&&(async()=>{await r.updateComplete;let a=r.shadowRoot?.querySelector(`[part~="tabs"]`);if(!a||!r.isConnected||i!==n)return;let o=()=>{let e=[...r.children].map(e=>e.getBoundingClientRect());if(e.length===0)return;let t=a.getBoundingClientRect(),n=Math.min(...e.map(e=>e.left)),i=Math.max(...e.map(e=>e.right));r.classList.toggle(`has-scroll-left`,t.left-n>8),r.classList.toggle(`has-scroll-right`,i-t.right>8)};o(),a.addEventListener(`scroll`,o,{passive:!0}),t=()=>a.removeEventListener(`scroll`,o),typeof ResizeObserver==`function`&&(e=new ResizeObserver(o),e.observe(a))})()}}function w(e,t){let n=t.getBoundingClientRect();return e.clientX>n.left+n.width/2==(getComputedStyle(t).direction===`rtl`)?`before`:`after`}function T(e,t,n){if(!(e instanceof HTMLElement))return;let r=D.get(e)!==t;D.set(e,t),(r||n)&&queueMicrotask(()=>{e.isConnected&&(e.closest(`wa-tab-group`)?.updateComplete??Promise.resolve()).then(()=>{if(!e.isConnected)return;e.scrollIntoView?.({block:`nearest`,inline:`nearest`});let t=y(e);n&&x(e,t)&&e.focus({preventScroll:!0})})})}function E(e){let n=n=>e.newControl===t?t:e.newControl?a`<span slot=${n?`nav`:t} class="tabstrip-new-control"
            >${e.newControl}</span
          >`:a`
            <button
              slot=${n?`nav`:t}
              class="rail-header__action tabstrip-new"
              type="button"
              ?data-new-tab-action=${e.newTabAction}
              ?disabled=${e.newDisabled}
              title=${e.newLabel}
              aria-label=${e.newLabel}
              @click=${e.onNew}
            >
              ${u.plus}
            </button>
          `;if(e.tabs.length===0)return n(!1);let r=b(),o=e.tabs.some(e=>e.domId===r)?r:null,s=JSON.stringify([e.activeId,e.tabs.map(e=>e.id)]);return a`
    <wa-tab-group
      class="tabstrip"
      ${c(C())}
      .active=${e.activeId??``}
      activation="auto"
      without-scroll-controls
      @wa-tab-show=${t=>{t.detail.name!==e.activeId&&e.onSelect(t.detail.name)}}
    >
      ${i(e.tabs,e=>e.id,(n,r)=>{let i=n.id===e.activeId,l=n.reorderId??n.id,d=!!e.onReorder&&n.draggable!==!1,f=e.separateTabs===!0&&r<e.tabs.length-1&&(n.group===void 0||n.group!==e.tabs[r+1]?.group),p=a`
            ${n.icon==null||n.icon===t?t:a`<span class="tabstrip-tab__icon" aria-hidden="true">${n.icon}</span>`}
            <span class="tabstrip-tab__label" ${c(S())}>${n.label}</span>
            ${n.badge?a`<span class="tabstrip-tab__badge">${n.badge}</span>`:t}
            ${n.statusLabel?a`<span class="tabstrip-tab__status">${n.statusLabel}</span>`:t}
          `;return a`
            <wa-tab
              id=${n.domId}
              class=${`tabstrip-tab ${n.className??``}`}
              panel=${n.id}
              aria-controls=${e.ariaControls}
              aria-selected=${i?`true`:`false`}
              title=${n.title||t}
              ?active=${i}
              draggable=${d?`true`:t}
              .tabIndex=${i?0:-1}
              ${i?c(e=>T(e,s,o===n.domId)):t}
              @click=${e=>{n.onActivate&&(e.stopPropagation(),n.onActivate())}}
              @keydown=${e=>{n.onActivate&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),e.stopPropagation(),e.repeat||n.onActivate())}}
              @auxclick=${t=>{t.button===1&&(t.preventDefault(),e.onClose(n.id))}}
              @dragstart=${e=>{if(d&&e.dataTransfer&&(e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(k,l),e.currentTarget instanceof Element)){let t=e.currentTarget.closest(`wa-tab-group`);t&&(t.dataset.draggedPanelTab=l)}}}
              @dragover=${t=>{if(!e.onReorder||!t.dataTransfer)return;let n=t.currentTarget instanceof Element?_(t.currentTarget):``;if(!n||n===l)return;t.preventDefault(),t.dataTransfer.dropEffect=`move`;let r=t.currentTarget;r instanceof Element&&(g(r),r.classList.add(`is-drop-${w(t,r)}`))}}
              @dragleave=${e=>{e.currentTarget instanceof Element&&!(e.relatedTarget instanceof Node&&e.currentTarget.contains(e.relatedTarget))&&e.currentTarget.classList.remove(`is-drop-before`,`is-drop-after`)}}
              @drop=${t=>{if(!e.onReorder||!t.dataTransfer)return;let n=t.currentTarget,r=n instanceof Element?_(n)||t.dataTransfer.getData(k):``;if(!r||r===l||!(n instanceof Element))return;t.preventDefault();let i=w(t,n);v(n),e.onReorder(r,l,i)}}
              @dragend=${e=>{e.currentTarget instanceof Element&&v(e.currentTarget)}}
            >
              ${n.labelTooltip?a`<openclaw-tooltip
                      class="tabstrip-tab__label-tooltip"
                      .content=${n.labelTooltip}
                    >
                      <span class="tabstrip-tab__tooltip-trigger">${p}</span>
                    </openclaw-tooltip>`:p}
            </wa-tab>
            <button
              slot="nav"
              class="rail-header__action tabstrip-tab__close"
              type="button"
              .tabIndex=${i?0:-1}
              aria-label=${n.closeLabel}
              @keydown=${e=>{(e.key===`Enter`||e.key===` `)&&e.currentTarget instanceof Element&&O.add(e.currentTarget)}}
              @click=${async t=>{let r=t.currentTarget,i=r instanceof Node?r.getRootNode():null,a=i instanceof ShadowRoot?i.host:null,o=r instanceof Element&&(O.delete(r)||y(r)===r);if(await e.onClose(n.id),!o)return;await a?.updateComplete;let s=[...i?.querySelectorAll(`wa-tab-group`)??[]].find(t=>[...t.querySelectorAll(`wa-tab`)].some(t=>t.getAttribute(`aria-controls`)===e.ariaControls));await s?.updateComplete;let c=[...s?.querySelectorAll(`wa-tab`)??[]].find(e=>e.getAttribute(`panel`)===n.id),l=s?.querySelector(`wa-tab[active]`),u=l?y(l):null;!c&&l&&x(l,u)&&l.focus({preventScroll:!0})}}
            >
              <span class="tabstrip-tab__close-box">${u.x}</span>
            </button>
            ${f?a`<span slot="nav" class="tabstrip-separator" aria-hidden="true"></span>`:t}
          `})}
      ${n(!0)}
    </wa-tab-group>
  `}var D,O,k,A;function j(){return(j=e((()=>{n(),s(),o(),l(),d(),f(),D=new WeakMap,O=new WeakSet,k=`application/x-openclaw-panel-tab`,A=r`
  :where(.tp-header, .bp-header) {
    --rail-header-height: 46px;
    --rail-header-padding-start: 8px;
  }
  :where(.tp-actions, .bp-actions) {
    padding-left: 8px;
    border-left: 1px solid var(--border, #262b34);
  }
  .tabstrip {
    --track-width: 0;
    display: block;
    /* Allow the strip to shrink inside a flex header so wide tab rows scroll
       here instead of squeezing out sibling header controls. */
    min-width: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tabstrip::part(nav) {
    display: flex;
    align-items: center;
  }
  .tabstrip::part(body) {
    display: none;
  }
  .tabstrip::-webkit-scrollbar {
    display: none;
  }
  .tabstrip-tab::part(base) {
    display: flex;
    align-items: center;
    gap: 7px;
    height: 30px;
    padding: 0 34px 0 10px;
    border: 0;
    border-radius: 7px;
    color: var(--muted, #8a919e);
    white-space: nowrap;
    font-size: 12.5px;
    transition:
      color 0.12s ease,
      background 0.12s ease,
      box-shadow 0.12s ease;
  }
  .tabstrip-tab:hover::part(base) {
    color: var(--text, #d7dae0);
    background: color-mix(in srgb, var(--text, #d7dae0) 6%, transparent);
  }
  .tabstrip-tab[active]::part(base) {
    color: var(--text, #d7dae0);
    background: var(--bg-hover, #1f2330);
    box-shadow: inset 0 0 0 1px var(--border-strong, #2e3040);
  }
  .tabstrip-tab.is-exited:not([active])::part(base) {
    opacity: 0.55;
  }
  .tabstrip-tab.is-connecting .tabstrip-tab__icon {
    animation: tabstrip-pulse 1.2s ease-in-out infinite;
  }
  .tabstrip-tab__icon {
    display: inline-flex;
    color: var(--accent, #ff5c5c);
  }
  .tabstrip-tab__favicon {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    object-fit: contain;
  }
  .tabstrip-tab.is-exited .tabstrip-tab__icon {
    color: var(--muted, #8a919e);
  }
  .tabstrip-tab__label {
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-variant-numeric: tabular-nums;
  }
  .tabstrip-tab__tooltip-trigger {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: inherit;
    flex: 1 1 auto;
  }
  .tabstrip-tab__status {
    font-size: 11px;
    color: var(--muted, #8a919e);
  }
  .tabstrip-tab__badge {
    border: 1px solid color-mix(in srgb, var(--accent, #ff5c5c) 45%, transparent);
    border-radius: 999px;
    color: var(--accent, #ff5c5c);
    font-size: 9px;
    line-height: 14px;
    padding: 0 5px;
    text-transform: uppercase;
  }
  /* Keep the close action inside the tab surface without nesting it in wa-tab;
     wa-tab-group still owns the direct tab children for keyboard navigation. */
  .tabstrip-tab__close {
    flex: 0 0 auto;
    align-self: center;
    z-index: 1;
    margin-left: -32px;
    margin-right: 4px;
    opacity: 0;
    transition: opacity 0.12s ease;
  }
  .tabstrip-tab__close-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 5px;
  }
  :where(.tabstrip-tab:hover, .tabstrip-tab[active]) + .tabstrip-tab__close,
  .tabstrip-tab__close:hover,
  .tabstrip-tab__close:focus-visible {
    opacity: 1;
  }
  .tabstrip-new {
    flex: none;
    align-self: center;
    margin-left: 2px;
  }
  .tabstrip-new-control {
    display: inline-flex;
    flex: none;
    align-self: center;
  }
  .tabstrip-separator {
    flex: 0 0 auto;
    align-self: center;
  }
  @keyframes tabstrip-pulse {
    50% {
      opacity: 0.35;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tabstrip-tab.is-connecting .tabstrip-tab__icon {
      animation: none;
    }
  }
`})))()}export{h as a,m as i,A as n,p as o,E as r,j as t};
//# sourceMappingURL=panel-tab-strip-BIRzRpfc.js.map