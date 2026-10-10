import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Sl as r,Tl as i,wl as a}from"./control-ui-core-CndkyZ8m.js";import{Q as o,at as s,nt as c,pt as l}from"./lit-runtime-CIjzngcy.js";import{Di as u,Ei as d}from"./control-ui-core-C5mtYcym.js";import{Ci as f,Di as p,Ei as m,Ti as h,qi as g,wi as _}from"./control-ui-boot-shared-DpHhsTHW.js";var v;function y(){return(y=e((()=>{o(),s(),i(),a(),p(),u(),_(),g(),v=class extends r{constructor(...e){super(...e),this.x=0,this.y=0,this.trigger=null,this.onAction=()=>{},this.onClose=()=>{},this.menuLifecycle=new m(this,{getTrigger:()=>this.trigger,onClose:()=>this.onClose(),onKeydown:e=>f(this,e)})}runAction(e){this.onClose(),this.onAction(e)}render(){let e=Math.max(8,Math.min(this.x,window.innerWidth-264-8)),t=Math.max(8,Math.min(this.y,window.innerHeight-136-8));return c`
      <wa-dropdown
        class="session-menu native-link-menu"
        .open=${!0}
        placement="bottom-start"
        .distance=${0}
        aria-label=${n(`nativeLinkMenu.label`)}
        @wa-select=${e=>{e.preventDefault();let t=e.detail.item.value;t&&(this.trigger?.focus(),this.runAction(t))}}
        @wa-after-hide=${()=>{this.onClose()}}
      >
        <button
          slot="trigger"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          aria-label=${n(`nativeLinkMenu.label`)}
          style="position: fixed; left: ${e}px; top: ${t}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
        ></button>
        <wa-dropdown-item
          class="session-menu__item"
          value="inline"
          data-shortcut="s"
          aria-keyshortcuts="S"
        >
          <span slot="icon" class="session-menu__icon" aria-hidden="true"
            >${d.panelRightOpen}</span
          >
          <span class="session-menu__text">${n(`nativeLinkMenu.openInline`)}</span>
          ${h(`s`)}
        </wa-dropdown-item>
        <wa-dropdown-item
          class="session-menu__item"
          value="external"
          data-new-tab-action
          data-shortcut="b"
          aria-keyshortcuts="B"
        >
          <span slot="icon" class="session-menu__icon" aria-hidden="true"
            >${d.externalLink}</span
          >
          <span class="session-menu__text">${n(`nativeLinkMenu.openExternal`)}</span>
          ${h(`b`)}
        </wa-dropdown-item>
        <div class="session-menu__separator" role="separator"></div>
        <wa-dropdown-item
          class="session-menu__item"
          value="copy"
          data-shortcut="c"
          aria-keyshortcuts="C"
        >
          <span slot="icon" class="session-menu__icon" aria-hidden="true">${d.copy}</span>
          <span class="session-menu__text">${n(`nativeLinkMenu.copy`)}</span>
          ${h(`c`)}
        </wa-dropdown-item>
      </wa-dropdown>
    `}},t([l({attribute:!1})],v.prototype,`x`,void 0),t([l({attribute:!1})],v.prototype,`y`,void 0),t([l({attribute:!1})],v.prototype,`trigger`,void 0),t([l({attribute:!1})],v.prototype,`onAction`,void 0),t([l({attribute:!1})],v.prototype,`onClose`,void 0),customElements.get(`openclaw-native-link-menu`)||customElements.define(`openclaw-native-link-menu`,v)})))()}y();export{v as NativeLinkMenu};
//# sourceMappingURL=native-link-menu.runtime-jE1xpKH6.js.map