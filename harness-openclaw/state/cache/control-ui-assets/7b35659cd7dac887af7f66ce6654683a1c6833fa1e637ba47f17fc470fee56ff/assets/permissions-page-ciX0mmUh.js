import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as a,Sl as o,Tl as s,Vs as c,wl as l}from"./control-ui-core-CndkyZ8m.js";import{$ as u,Q as d,nt as f}from"./lit-runtime-CIjzngcy.js";import{$r as p,Qr as m,si as h,xi as g}from"./control-ui-core-C5mtYcym.js";import{_t as _,bt as v,dt as y,ft as b,gt as x,ht as S,it as C,nt as w,ot as T,pt as E}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as D,t as O}from"./en-settings-BjX72HeL.js";import{n as k,t as A}from"./settings-workspace-gGOfyDax.js";var j;function M(){return(M=e((()=>{r(),d(),h(),p(),w(),A(),s(),O(),l(),c(),D(),j=class extends o{constructor(...e){super(...e),this.subscriptions=new a(this).watch(()=>this.context?.nativeDeviceSettings,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}renderPermissions(e){let t=this.context.nativeDeviceSettings,{permissions:n}=e,r=n.location.preciseEditable??e.device.platform===`macos`;return f`
      ${S({title:i(`configPage.deviceSettings.systemAccess`)},n.entries.map(({id:e,status:n})=>E({title:i(`configPage.deviceSettings.permissions.${e}.title`),description:i(`configPage.deviceSettings.permissions.${e}.hint`),stackedOnNarrow:!0,control:f`
              ${_({kind:n===`granted`?`ok`:n===`denied`?`danger`:`muted`,label:i(`configPage.deviceSettings.permissionStatuses.${n}`)})}
              ${n===`notDetermined`?f`<button type="button" class="btn" @click=${()=>t?.requestPermission(e)}>${i(`configPage.deviceSettings.grant`)}</button>`:n===`denied`?f`<button type="button" class="btn" @click=${()=>t?.openSystemSettings(e)}>${i(`configPage.deviceSettings.openSystemSettings`)}</button>`:u}
            `})))}
      ${S({title:i(`configPage.deviceSettings.location`)},f`
          ${E({title:i(`configPage.deviceSettings.locationAccess`),description:i(`configPage.deviceSettings.locationHint`),stackedOnNarrow:!0,control:x({value:n.location.mode,ariaLabel:i(`configPage.deviceSettings.locationAccess`),options:[`off`,`whileUsing`,`always`].map(e=>({value:e,label:i(`configPage.deviceSettings.locationModes.${e}`)})),onChange:e=>t?.set(`permissions.location.mode`,e)})})}
          ${r?v({title:i(`configPage.deviceSettings.preciseLocation`),description:i(`configPage.deviceSettings.preciseLocationHint`),checked:n.location.precise,disabled:n.location.mode===`off`,onChange:e=>t?.set(`permissions.location.precise`,e)}):E({title:i(`configPage.deviceSettings.preciseLocation`),description:i(`configPage.deviceSettings.preciseLocationReadOnlyHint`),stackedOnNarrow:!0,control:f`
                    ${_({kind:n.location.precise?`ok`:`muted`,label:i(n.location.precise?`configPage.deviceSettings.preciseLocationStatuses.enabled`:`configPage.deviceSettings.preciseLocationStatuses.disabled`)})}
                    <button
                      type="button"
                      class="btn"
                      @click=${()=>t?.openSystemSettings(`location`)}
                    >
                      ${i(`configPage.deviceSettings.openSettings`)}
                    </button>
                  `})}
        `)}
      ${e.capabilities?.activeComputerPresenceEnabled===void 0?u:S({title:i(`configPage.deviceSettings.privacy`)},v({title:i(`configPage.deviceSettings.activePresence`),description:i(`configPage.deviceSettings.activePresenceHint`),checked:e.capabilities.activeComputerPresenceEnabled,onChange:e=>t?.set(`capabilities.activeComputerPresenceEnabled`,e)}))}
    `}render(){let e=this.context?.nativeDeviceSettings,t=e?.snapshot,n=e?t?this.renderPermissions(t):T(i(`configPage.deviceSettings.loading`)):T(i(`configPage.deviceSettings.appOnly`));return f`
      ${b({title:g(`device-permissions`),subtitle:f`${i(t?.device.platform===`ios`?`configPage.deviceSettings.permissionsIntroIos`:`configPage.deviceSettings.permissionsIntro`)}
        ${C(t?.device.platform===`ios`?`https://docs.openclaw.ai/platforms/ios`:`https://docs.openclaw.ai/platforms/macos`)}`})}
      ${k(y(n))}
    `}},t([n({context:m,subscribe:!0})],j.prototype,`context`,void 0),customElements.get(`openclaw-device-permissions-page`)||customElements.define(`openclaw-device-permissions-page`,j)})))()}M();
//# sourceMappingURL=permissions-page-ciX0mmUh.js.map