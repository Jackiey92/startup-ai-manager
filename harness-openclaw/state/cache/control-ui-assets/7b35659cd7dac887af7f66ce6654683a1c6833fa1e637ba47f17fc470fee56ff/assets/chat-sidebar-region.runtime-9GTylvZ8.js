import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Sl as r,Tl as i,wl as a}from"./control-ui-core-CndkyZ8m.js";import{$ as o,Q as s,at as c,c as l,et as u,nt as d,pt as f,s as p,v as m,x as h}from"./lit-runtime-CIjzngcy.js";import{Di as g,Ea as _,Ei as v,Oa as y,br as ee,fr as b,vr as x,wi as S}from"./control-ui-core-C5mtYcym.js";import{Ft as C,It as w,O as T,k as E}from"./control-ui-boot-shared-DpHhsTHW.js";import{S as D,x as O}from"./control-ui-boot-shared-hN7_nGsj.js";import{fr as k,pr as te}from"./control-ui-boot-shared-6jDbGebE.js";import{n as A,t as j}from"./control-ui-boot-shared-DwO55ELU.js";import{X as M,_t as N,et as P,gt as F,ht as I,mt as L,vt as R}from"./control-ui-boot-shared-Bt2ZINpX.js";import{a as z,i as B,o as V,r as H,t as U}from"./panel-tab-strip-BIRzRpfc.js";function W(){return G+=1,`chat-files-content-${G}`}var G,K;function q(){return(q=e((()=>{s(),c(),p(),g(),z(),C(),U(),i(),a(),k(),G=0,K=class extends r{constructor(...e){super(...e),this.contentId=W(),this.previews=[],this.activeId=null,this.tabsInHeader=!0,this.browser=o,this.renderDetail=null,this.onSelect=()=>{},this.onClose=()=>{}}get hostedTabs(){let e=this.previews.map(({id:e,label:t,content:n})=>({id:e,label:t,title:n.kind===`file`?n.path:t,icon:te({filename:t,mode:`preview-with-favicon`}),className:n.kind===`loading`?`is-connecting`:void 0}));return this.activeId===null&&e.length?[{id:`browse`,label:n(`chat.sidePanel.files`),icon:v.folder},...e]:e}get activeHostedTabId(){return this.activeId??(this.previews.length?`browse`:null)}get hostedActions(){return d`<button
      class="rail-header__action"
      type="button"
      aria-label=${n(`chat.sidePanel.files`)}
      title=${n(`chat.sidePanel.files`)}
      @click=${()=>this.onSelect(null)}
    >
      ${v.folder}
    </button>`}selectHostedTab(e){this.onSelect(e===`browse`?null:e)}async closeHostedTab(e){e===`browse`?this.onSelect(this.previews.at(-1)?.id??null):this.onClose(e)}updated(){this.dispatchEvent(new CustomEvent(B,{bubbles:!0}))}render(){return d`
      ${this.tabsInHeader?o:d`<header class="rail-header side-panel__header">
              <div class="side-panel__header-tabs">
                ${H({tabs:this.hostedTabs.map(e=>({...e,domId:`${this.contentId}-tab-${e.id}`,closeLabel:`${n(`browser.closeTab`)}: ${e.label}`})),activeId:this.activeHostedTabId,ariaControls:this.contentId,onSelect:e=>this.selectHostedTab(e),onClose:e=>this.closeHostedTab(e),onNew:()=>this.onSelect(null),newLabel:n(`chat.sidePanel.files`),newControl:this.hostedActions})}
              </div>
            </header>`}
      <div id=${this.contentId} class="chat-files-panel__content">
        <div class="chat-files-panel__page" ?hidden=${this.activeId!==null}>${this.browser}</div>
        ${l(this.previews,e=>e.id,e=>d`
            <div class="chat-files-panel__page" ?hidden=${this.activeId!==e.id}>
              ${e.content.kind===`loading`?w(`files`,n(`common.loading`)):e.content.kind===`unavailable`?d`<div class="callout danger" role="alert">
                        ${e.content.message}
                      </div>`:this.renderDetail?.(e.content)}
            </div>
          `)}
      </div>
    `}},t([f({attribute:!1})],K.prototype,`previews`,void 0),t([f({attribute:!1})],K.prototype,`activeId`,void 0),t([f({type:Boolean})],K.prototype,`tabsInHeader`,void 0),t([f({attribute:!1})],K.prototype,`browser`,void 0),t([f({attribute:!1})],K.prototype,`renderDetail`,void 0),t([f({attribute:!1})],K.prototype,`onSelect`,void 0),t([f({attribute:!1})],K.prototype,`onClose`,void 0),customElements.get(`openclaw-chat-files-panel`)||customElements.define(`openclaw-chat-files-panel`,K)})))()}function J(e){return d`<resizable-divider
    ${h(e.onElement??(()=>{}))}
    class=${e.className??o}
    .splitRatio=${e.splitRatio}
    .minRatio=${e.minRatio??.4}
    .maxRatio=${e.maxRatio??.7}
    .measureRatio=${e.measureRatio}
    .measureSize=${e.measureSize}
    .label=${e.label}
    .orientation=${e.orientation}
    @dragover=${e.onDragover??(()=>{})}
    @drop=${e.onDrop??(()=>{})}
    @resize=${e.onResize}
  ></resizable-divider>`}function Y(){return(Y=e((()=>{s(),m()})))()}function X(e,t){let n=e.find(e=>e.slot===t);if(!n)throw Error(`Missing sidebar panel definition for ${t}`);return n}function Z(e,t=!1){return d`
    <span slot=${t?`icon`:o} class="side-panel-type-option__icon" aria-hidden="true"
      >${e.icon}</span
    >
    <span class="side-panel-type-option__label">${e.label}</span>
    ${e.shortcut?d`<kbd slot=${t?`details`:o} class="side-panel-type-option__shortcut"
            >${e.shortcut}</kbd
          >`:o}
  `}function ne(e){return e.columns[0]?.panels??[]}var Q;function $(){return($=e((()=>{q(),s(),c(),p(),y(),g(),T(),z(),U(),ee(),S(),i(),a(),O(),j(),P(),Y(),Q=class extends r{constructor(...e){super(...e),this.layout={columns:[]},this.panelDefinitions=D(),this.panelTemplates={},this.panelActions={},this.availableSlots=[],this.callbacks=null,this.narrow=!1,this.availableWidth=0,this.previousGeometry=``,this.contentMounted=!1,this.focusedSurface=null,this.refreshHostedTabs=()=>this.requestUpdate(),this.trackFocus=e=>{let t=e.composedPath().find(e=>e instanceof Element&&e.matches(`[data-region], [data-region-header]`));this.focusedSurface=t&&t.closest(`.sidebar-region`)===this.parentElement?t:null},this.closeFocusedPanel=e=>{if(e.defaultPrevented||!this.layout.open||this.layout.expanded&&!this.layout.expandedSide||!this.callbacks)return;let t=e instanceof CustomEvent?e.detail?.browserScope:void 0,n=typeof t==`string`?[...this.parentElement?.querySelectorAll(`[data-native-browser-scope]`)??[]].find(e=>e.dataset.nativeBrowserScope===t):void 0,r=document.activeElement instanceof HTMLIFrameElement?document.activeElement.closest(`[data-region]`):null,i=typeof t==`string`?n?.closest(`[data-region]`):r??this.focusedSurface,a=I(this.layout);if(!a||!i?.isConnected||i.closest(`.sidebar-region`)!==this.parentElement||!i.matches(`[data-region="side"], [data-region-header="side"]`)||i.closest(`[hidden], [inert], [aria-hidden="true"]`)||document.openClawModalLayers?.size||document.querySelector(`dialog[open], [aria-modal='true']`))return;e.preventDefault();let o=this.parentElement?.querySelector(`[data-region-header="side"]`)??null;this.focusedSurface=o;let s=()=>{this.layout.open&&this.focusedSurface===o&&o?.isConnected&&o.querySelector(`wa-tab[active]`)?.focus()},c=this.hostedTabsElement(a),l=c?.activeHostedTabId;if(c&&l&&c.hostedTabs.some(e=>e.id===l)){c.closeHostedTab(l).then(()=>this.updateComplete).then(s);return}this.callbacks.closeSlot(a.slot),this.requestUpdate(),this.updateComplete.then(s)}}connectedCallback(){super.connectedCallback(),this.nativeCloseListeners=new AbortController;let e={capture:!0,signal:this.nativeCloseListeners.signal};this.parentElement?.addEventListener(B,this.refreshHostedTabs,{signal:this.nativeCloseListeners.signal}),document.addEventListener(`pointerdown`,this.trackFocus,e),document.addEventListener(`focusin`,this.trackFocus,e),window.addEventListener(`openclaw:native-close-focused-panel`,this.closeFocusedPanel,e)}disconnectedCallback(){this.nativeCloseListeners?.abort(),this.nativeCloseListeners=void 0,this.focusedSurface=null,super.disconnectedCallback()}hostedTabsElement(e){return V(this.parentElement?.querySelector(`[data-panel-slot="${e.slot}"]`)?.firstElementChild)}deliverPanelEvent(e,t){let n=this.parentElement?.querySelector(`[data-panel-slot="${e}"]`)?.firstElementChild;return!(n instanceof HTMLElement)||typeof n.handleToggleRequest!=`function`?!1:(n.handleToggleRequest(t),!0)}panelTypes(){return this.availableSlots.map(e=>X(this.panelDefinitions,e))}renderTypeMenu(){let e=new Set(ne(this.layout).map(e=>e.slot));return d`
      <wa-dropdown
        class="side-panel-type-menu"
        placement="bottom-start"
        @wa-select=${t=>{let n=t.detail.item.value;n&&(this.callbacks?.openSlot(n),n===`browser`&&e.has(n)&&this.deliverPanelEvent(n,new CustomEvent(b,{detail:{open:!0,newTab:!0}})),n===`terminal`&&e.has(n)&&this.deliverPanelEvent(n,new CustomEvent(x,{detail:{open:!0,newSession:!0}})))}}
      >
        <button
          slot="trigger"
          class="rail-header__action side-panel-type-menu__trigger"
          type="button"
          aria-label=${n(`chat.sidePanel.addTab`)}
          title=${n(`chat.sidePanel.addTab`)}
        >
          ${v.plus}
        </button>
        ${this.panelTypes().filter(t=>t.slot===`browser`||t.slot===`terminal`||!e.has(t.slot)).map(e=>d`
              <wa-dropdown-item
                class="side-panel-type-menu__item session-menu__item"
                .value=${e.slot}
              >
                ${Z(e,!0)}
              </wa-dropdown-item>
            `)}
      </wa-dropdown>
    `}renderHostedTabIcon(e){if(e.favicon)return d`<img class="tabstrip-tab__favicon" src=${e.favicon} alt="" />`;let t=``;try{t=e.url?new URL(e.url).hostname:``}catch{}let n=t&&this.fetchFavicon?A(t,this.fetchFavicon,this.refreshHostedTabs):null;return n?d`<img class="tabstrip-tab__favicon" src=${n} alt="" />`:e.icon}renderHeader(e){let t=R(this.layout),r=t.flatMap(e=>{let t=this.hostedTabsElement(e);return t?[{panel:e,element:t,tabs:t.hostedTabs}]:[]}),i=e=>{for(let t of r){let n=`hosted:${t.panel.id}:`;if(e.startsWith(n)){let r=e.slice(n.length);if(t.tabs.some(e=>e.id===r))return{...t,tabId:r}}}return null},a=t.flatMap(t=>{let i=r.find(e=>e.panel.id===t.id);if(i?.tabs.length)return i.tabs.map(e=>({id:`hosted:${t.id}:${e.id}`,domId:`side-panel-tab-${t.id}-${e.id}`,label:e.label,labelTooltip:e.label,title:e.title,icon:this.renderHostedTabIcon(e),statusLabel:e.statusLabel,badge:e.badge,className:e.className,closeLabel:`${n(`browser.closeTab`)}: ${e.label}`,group:t.id,draggable:!1,reorderId:t.id}));let a=X(this.panelDefinitions,t.slot);return[{id:t.id,domId:`side-panel-tab-${t.id}`,label:a.label,labelTooltip:t.slot===`dashboard`?n(this.layout.expanded&&this.layout.expandedSide&&e.activePanelId===t.id?`chat.sidePanel.restore`:`chat.sidePanel.expandPanel`,{panel:a.label}):a.label,onActivate:t.slot===`dashboard`?()=>this.callbacks?.togglePanelExpanded(t.id):void 0,icon:a.icon,closeLabel:n(`chat.sidebarColumns.close`,{panel:a.label})}]}),s=I(this.layout),c=r.find(e=>e.panel.id===s?.id),l=c?.tabs.some(e=>e.id===c.element.activeHostedTabId)?`hosted:${c.panel.id}:${c.element.activeHostedTabId}`:s?.id??null,u=e.panels.find(e=>e.id===s?.id),f=(u?this.panelActions[u.slot]:null)??null;return d`
      <header
        class="rail-header side-panel__header"
        data-region-header="side"
        @mousedown=${_}
      >
        <div class="side-panel__header-tabs">
          ${H({tabs:a,activeId:l,ariaControls:`chat-side-panel-content`,onSelect:t=>{let n=i(t);n?(e.activePanelId!==n.panel.id&&this.callbacks?.activatePanel(n.panel.id),n.element.selectHostedTab(n.tabId)):this.callbacks?.activatePanel(t)},onClose:async t=>{let n=i(t);if(n){await n.element.closeHostedTab(n.tabId);return}let r=e.panels.find(e=>e.id===t);r&&this.callbacks?.closeSlot(r.slot)},onNew:()=>void 0,newLabel:n(`chat.sidePanel.addTab`),newControl:o,separateTabs:!0,onReorder:(e,t,n)=>this.callbacks?.reorderPanel(e,t,n)})}
          ${this.renderTypeMenu()}
        </div>
        ${this.renderHeaderActions(f,c?.element.hostedActions??o)}
      </header>
    `}renderHeaderActions(e,t){let r=I(this.layout),i=this.layout.expanded===!0&&this.layout.expandedSide===!0,a=i?n(`chat.sidePanel.restore`):n(`chat.sidePanel.expandPanel`,{panel:r?X(this.panelDefinitions,r.slot).label:``});return d`<div class="rail-header__actions side-panel__actions">
      ${e||t!==o?d`<span class="side-panel__action-group side-panel__action-group--content">
              ${t} ${e}
            </span>`:o}
      <span class="side-panel__action-group side-panel__action-group--close">
        ${r?d`<openclaw-tooltip .content=${a}>
                <button
                  class="rail-header__action side-panel__expand"
                  type="button"
                  aria-label=${a}
                  aria-pressed=${String(i)}
                  @click=${()=>this.callbacks?.togglePanelExpanded(r.id)}
                >
                  ${i?v.minimize:v.maximize}
                </button>
              </openclaw-tooltip>`:o}
        <openclaw-tooltip .content=${n(`common.close`)}>
          <button
            class="rail-header__action side-panel__minimize"
            type="button"
            aria-label=${n(`common.close`)}
            @click=${()=>this.callbacks?.setOpen(!1)}
          >
            ${v.x}
          </button>
        </openclaw-tooltip>
      </span>
    </div>`}renderEmpty(e){if(e){let t=X(this.panelDefinitions,e.slot);return d`<div class="side-panel-empty side-panel-empty--type">
        ${E({icon:t.icon,heading:t.label,description:t.empty.description,action:t.empty.action})}
      </div>`}return d`<div class="side-panel-empty side-panel-empty--selector">
      <div class="side-panel-empty__types" role="list">
        ${this.panelTypes().map(e=>d`<button
            class="side-panel-empty__type"
            type="button"
            role="listitem"
            @click=${()=>this.callbacks?.openSlot(e.slot)}
          >
            ${Z(e)}
          </button>`)}
      </div>
    </div>`}renderBody(e){return d`<div id="chat-side-panel-content" class="side-panel__body">
      ${l(this.panelDefinitions.flatMap(t=>(e?.panels??[]).filter(e=>e.slot===t.slot&&e.slot!==`conversation`)),e=>e.id,e=>d`<div
          class="side-panel__panel"
          data-panel-slot=${e.slot}
          data-region=${e.id===this.layout.mainPanelId?`main`:`side`}
          ?hidden=${!L(this.layout,e.slot)}
        >
          ${this.panelTemplates[e.slot]??this.renderEmpty(e)}
        </div>`)}
      ${R(this.layout).length===0?d`<div class="side-panel__empty-body" data-region="side">${this.renderEmpty()}</div>`:o}
    </div>`}renderDivider(e){let t=F(this.layout),r=()=>{let n=this.parentElement,r=n?.querySelector(`[data-region="main"]`),i=n?.querySelector(`[data-region="side"]:not([hidden])`),a=t===`bottom`?r?.getBoundingClientRect().height??0:r?.getBoundingClientRect().width??0,o=t===`bottom`?i?.getBoundingClientRect().height??e.height:i?.getBoundingClientRect().width??e.width;return{primarySize:a,panelSize:o,total:a+o}};return J({className:`sidebar-column__divider`,label:n(`chat.sidePanel.resize`),orientation:t===`bottom`?`horizontal`:`vertical`,splitRatio:.5,minRatio:.05,maxRatio:.95,measureRatio:()=>{let{primarySize:e,panelSize:n,total:i}=r();return i>0?(t===`left`?n:e)/i:.5},measureSize:()=>r().total,onResize:n=>{let i=this.parentElement?.getBoundingClientRect(),a=t===`bottom`?i?.height??0:this.availableWidth>0?this.availableWidth:i?.width??0,o=(r().total||a)*(t===`left`?n.detail.splitRatio:1-n.detail.splitRatio),s=t===`bottom`?220:260,c=Math.max(s,a*.6);this.callbacks?.resizePanel(e.id,Math.max(s,Math.min(o,c)))}})}renderPanel(){let e=this.layout.columns[0];return e?(this.contentMounted||=this.layout.open===!0&&(!this.layout.expanded||this.layout.expandedSide===!0)||(N(this.layout)?.slot??`conversation`)!==`conversation`,d`${!this.narrow&&this.layout.open&&!this.layout.expanded&&e?this.renderDivider(e):o}
      <section class="side-panel" aria-label=${n(`chat.sidePanel.label`)}>
        ${e&&R(this.layout).length>0?this.renderHeader(e):o}
        ${this.contentMounted?this.renderBody(e):o}
      </section>`):(this.contentMounted=!1,o)}updated(){let e=this.parentElement?.querySelector(`.sidebar-region__right-runtime`);if(e){u(this.renderPanel(),e);let t=e.querySelector(`.side-panel`),n=Array.from(this.parentElement.querySelectorAll(`.sidebar-region__primary, .side-panel__panel`),e=>`${e.dataset.panelSlot??`conversation`}:${e.getBoundingClientRect().width}`).join(`:`);t?.dispatchEvent(new CustomEvent(M,{bubbles:!0,detail:{widthChanged:n!==this.previousGeometry}})),this.previousGeometry=n}}render(){return o}},t([f({attribute:!1})],Q.prototype,`layout`,void 0),t([f({attribute:!1})],Q.prototype,`panelDefinitions`,void 0),t([f({attribute:!1})],Q.prototype,`panelTemplates`,void 0),t([f({attribute:!1})],Q.prototype,`panelActions`,void 0),t([f({attribute:!1})],Q.prototype,`availableSlots`,void 0),t([f({attribute:!1})],Q.prototype,`fetchFavicon`,void 0),t([f({attribute:!1})],Q.prototype,`callbacks`,void 0),t([f({type:Boolean})],Q.prototype,`narrow`,void 0),t([f({type:Number})],Q.prototype,`availableWidth`,void 0),customElements.get(`openclaw-chat-sidebar-region`)||customElements.define(`openclaw-chat-sidebar-region`,Q)})))()}$();
//# sourceMappingURL=chat-sidebar-region.runtime-9GTylvZ8.js.map