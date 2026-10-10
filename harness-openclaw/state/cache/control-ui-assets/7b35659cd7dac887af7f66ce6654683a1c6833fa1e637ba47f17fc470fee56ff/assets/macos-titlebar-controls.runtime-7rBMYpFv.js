import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Tl as r,wl as i,xl as a}from"./control-ui-core-CndkyZ8m.js";import{$ as o,Q as s,at as c,nt as l,pt as u}from"./lit-runtime-CIjzngcy.js";import{Di as d,Ea as f,Ei as p,Oa as m,wi as h}from"./control-ui-core-C5mtYcym.js";var g;function _(){return(_=e((()=>{s(),c(),m(),r(),i(),d(),h(),g=class extends a{constructor(...e){super(...e),this.navCollapsed=!1,this.historyOnly=!1,this.canGoBack=!1,this.canGoForward=!1}render(){let e=this.navCollapsed?n(`nav.expand`):n(`nav.collapse`);return l`
      <nav class="macos-titlebar-controls" @mousedown=${f}>
        ${this.historyOnly?o:this.renderButton({label:e,icon:this.navCollapsed?p.panelLeftOpen:p.panelLeftClose,ariaExpanded:!this.navCollapsed,onClick:this.onToggleSidebar,className:`macos-titlebar-controls__sidebar-toggle`})}
        ${this.renderButton({label:n(`nav.back`),icon:p.chevronLeft,disabled:!this.canGoBack,onClick:()=>globalThis.history.back(),className:`macos-titlebar-controls__back`})}
        ${this.renderButton({label:n(`nav.forward`),icon:p.chevronRight,disabled:!this.canGoForward,onClick:()=>globalThis.history.forward(),className:`macos-titlebar-controls__forward`})}
        ${this.historyOnly?o:l`
                ${this.renderButton({label:n(`chat.openCommandPalette`),tooltip:n(`chat.commandPaletteTitle`),icon:p.search,onClick:this.onOpenPalette,className:`macos-titlebar-controls__search`})}
                ${this.navCollapsed?this.renderButton({label:n(`chat.runControls.newSession`),tooltip:this.newSessionDisabledReason,icon:p.plus,disabled:!!this.newSessionDisabledReason,onClick:this.onOpenNewSession,className:`macos-titlebar-controls__new-session`}):o}
              `}
      </nav>
    `}renderButton(e){return l`
      <openclaw-tooltip .content=${e.tooltip??e.label}>
        <button
          type="button"
          class="topbar-icon-btn macos-titlebar-controls__button ${e.className}"
          aria-label=${e.label}
          aria-expanded=${e.ariaExpanded===void 0?o:String(e.ariaExpanded)}
          ?disabled=${e.disabled||!e.onClick}
          @click=${e.onClick}
        >
          ${e.icon}
        </button>
      </openclaw-tooltip>
    `}},t([u({attribute:!1})],g.prototype,`navCollapsed`,void 0),t([u({attribute:!1})],g.prototype,`historyOnly`,void 0),t([u({attribute:!1})],g.prototype,`canGoBack`,void 0),t([u({attribute:!1})],g.prototype,`canGoForward`,void 0),t([u({attribute:!1})],g.prototype,`newSessionDisabledReason`,void 0),t([u({attribute:!1})],g.prototype,`onToggleSidebar`,void 0),t([u({attribute:!1})],g.prototype,`onOpenPalette`,void 0),t([u({attribute:!1})],g.prototype,`onOpenNewSession`,void 0),customElements.get(`openclaw-macos-titlebar-controls`)||customElements.define(`openclaw-macos-titlebar-controls`,g)})))()}_();
//# sourceMappingURL=macos-titlebar-controls.runtime-7rBMYpFv.js.map