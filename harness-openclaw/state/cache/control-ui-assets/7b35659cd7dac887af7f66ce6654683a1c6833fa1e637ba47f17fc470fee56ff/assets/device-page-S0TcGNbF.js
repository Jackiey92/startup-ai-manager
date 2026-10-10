import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as a,Sl as o,Tl as s,Vs as c,wl as l}from"./control-ui-core-CndkyZ8m.js";import{$ as u,Q as d,at as f,dt as p,i as m,nt as h,o as g}from"./lit-runtime-CIjzngcy.js";import{$r as _,Qr as v,oi as y,si as b}from"./control-ui-core-C5mtYcym.js";import{_t as x,bt as S,dt as C,ft as w,ht as T,it as E,nt as D,ot as O,pt as k,xt as A}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as j,t as M}from"./en-settings-BjX72HeL.js";import{n as N,t as P}from"./en-apps-CC47goqX.js";import{n as F,t as I}from"./settings-workspace-gGOfyDax.js";function L(e){let t=z.get(e);if(t)return t;let n={domains:null,targetProfile:null};return z.set(e,n),n}function R(e,t,n){let r=z.get(e);r&&r[t]===n&&(r[t]=null,r.domains===null&&r.targetProfile===null&&z.delete(e))}var z,B;function V(){return(V=e((()=>{r(),d(),f(),m(),b(),_(),D(),I(),s(),P(),M(),l(),c(),N(),j(),z=new WeakMap,B=class extends o{constructor(...e){super(...e),this.newDomain=``,this.extensionSetupRunning=!1,this.extensionSetupResult=null,this.extensionSetupFailed=!1,this.targetProfileTimer=null,this.subscriptions=new a(this).watch(()=>this.context?.nativeDeviceSettings,(e,t)=>e.subscribe(t),e=>{this.targetProfileTimer&&this.targetProfileTimer.capability!==e&&this.flushTargetProfile()})}disconnectedCallback(){this.flushTargetProfile(),this.subscriptions.clear(),super.disconnectedCallback()}toggle(e,t,n,r,a=!1){return t===void 0?u:S({title:i(`configPage.deviceSettings.${n}`),description:r,checked:t,disabled:a,onChange:t=>this.context.nativeDeviceSettings?.set(e,t)})}editTargetProfile(e){let t=this.context.nativeDeviceSettings;t&&(this.targetProfileTimer!==null&&clearTimeout(this.targetProfileTimer.timer),L(t).targetProfile={value:e,sent:!1},this.targetProfileTimer={capability:t,timer:setTimeout(()=>this.flushTargetProfile(),400)},this.requestUpdate())}flushTargetProfile(){let e=this.targetProfileTimer;if(!e)return;clearTimeout(e.timer),this.targetProfileTimer=null;let t=z.get(e.capability)?.targetProfile;t&&!t.sent&&(t.sent=!0,e.capability.set(`browser.cookieSync.targetProfile`,t.value,()=>{R(e.capability,`targetProfile`,t)}))}updateDomains(e){let t=this.context.nativeDeviceSettings;if(!t)return;let n=z.get(t)?.domains??t.snapshot?.browser?.cookieSync.domains;if(!n)return;let r=[...new Set(e(n).map(e=>e.trim().toLowerCase()).filter(Boolean))];L(t).domains=r,this.requestUpdate(),t.set(`browser.cookieSync.domains`,r,()=>{R(t,`domains`,r)})}renderBrowser(e){let t=this.context.nativeDeviceSettings,n=e.cookieSync,r=t?z.get(t):void 0,a=r?.domains??n.domains,o=()=>{this.updateDomains(e=>[...e,this.newDomain]),this.newDomain=``};return h`
      ${T({title:i(`configPage.deviceSettings.chromeExtension`)},k({title:i(`configPage.deviceSettings.chromeExtensionSetup`),description:i(`configPage.deviceSettings.chromeExtensionHint`),stacked:!0,control:h`
            <div class="device-extension-setup">
              <div class="device-extension-setup__actions">
                <button
                  type="button"
                  class="btn"
                  ?disabled=${this.extensionSetupRunning}
                  @click=${()=>this.installChromeExtension()}
                >
                  ${i(this.extensionSetupRunning?`configPage.deviceSettings.chromeExtensionPreparing`:`configPage.deviceSettings.chromeExtensionSetup`)}
                </button>
                <a
                  href="https://chromewebstore.google.com/detail/openclaw/kcdjddhmeafeomebliikmbpblkmkfoig"
                  target="_blank"
                  rel="noopener noreferrer"
                  >${i(`appsPage.ctaChromeWebStore`)}</a
                >
                ${E(`https://docs.openclaw.ai/tools/chrome-extension`)}
              </div>
              <p role="status">
                ${this.extensionSetupFailed?i(`configPage.deviceSettings.chromeExtensionFailed`):this.extensionSetupResult?i(this.extensionSetupResult.nativeHostRegistered?this.extensionSetupResult.discoveredProfiles>0?`configPage.deviceSettings.chromeExtensionInstalled`:this.extensionSetupResult.installRequested?`configPage.deviceSettings.chromeExtensionPending`:`configPage.deviceSettings.chromeExtensionStoreRequired`:`configPage.deviceSettings.chromeExtensionFailed`):u}
              </p>
            </div>
          `}))}
      ${e.importAvailable||!n.available?T({title:i(`configPage.deviceSettings.browser`)},h`
                ${e.importAvailable?k({title:i(`configPage.deviceSettings.browserImport`),description:i(`configPage.deviceSettings.browserImportHint`),control:h`<button
                          type="button"
                          class="btn"
                          @click=${()=>t?.openPanel(`browser-import`)}
                        >
                          ${i(`configPage.deviceSettings.importBrowserLogins`)}
                        </button>`}):u}
                ${n.available?u:k({title:i(`configPage.deviceSettings.cookieSync`),description:i(`configPage.deviceSettings.cookieSyncUnavailable`)})}
              `):u}
      ${n.available?T({title:i(e.importAvailable?`configPage.deviceSettings.cookieSync`:`configPage.deviceSettings.browser`),description:e.importAvailable?void 0:i(`configPage.deviceSettings.cookieSync`)},h`
                ${this.toggle(`browser.cookieSync.enabled`,n.enabled,`cookieSyncEnabled`,i(`configPage.deviceSettings.cookieSyncHint`))}
                ${k({title:i(`configPage.deviceSettings.domains`),description:i(`configPage.deviceSettings.domainsHint`),stacked:!0,control:h`<div class="device-domains">
                    ${a.map(e=>h`<div class="device-domain-entry">
                        ${A(e)}
                        <button
                          type="button"
                          class="btn small"
                          aria-label=${i(`configPage.deviceSettings.removeDomain`,{domain:e})}
                          @click=${()=>this.updateDomains(t=>t.filter(t=>t!==e))}
                        >
                          ${i(`common.remove`)}
                        </button>
                      </div>`)}
                    <form
                      class="device-domain-entry"
                      @submit=${e=>{e.preventDefault(),o()}}
                    >
                      <input
                        type="text"
                        class="settings-input"
                        aria-label=${i(`configPage.deviceSettings.addDomain`)}
                        .value=${g(this.newDomain)}
                        @input=${e=>{this.newDomain=e.currentTarget.value}}
                      />
                      <button type="submit" class="btn" ?disabled=${!this.newDomain.trim()}>
                        ${i(`configPage.deviceSettings.addDomain`)}
                      </button>
                    </form>
                  </div>`})}
                ${k({title:i(`configPage.deviceSettings.targetProfile`),description:i(`configPage.deviceSettings.targetProfileHint`),control:h`<input
                    type="text"
                    class="settings-input"
                    aria-label=${i(`configPage.deviceSettings.targetProfile`)}
                    .value=${g(r?.targetProfile?.value??n.targetProfile)}
                    @input=${e=>{this.editTargetProfile(e.currentTarget.value)}}
                    @change=${()=>this.flushTargetProfile()}
                  />`})}
                ${k({title:i(`configPage.deviceSettings.syncStatus`),description:n.detail??void 0,control:x({kind:n.state===`error`?`danger`:n.state===`running`?`accent`:`muted`,label:i(`configPage.deviceSettings.syncStates.${n.state}`)})})}
              `):u}
    `}async installChromeExtension(){let e=this.context.nativeDeviceSettings;if(e&&!this.extensionSetupRunning){this.extensionSetupRunning=!0,this.extensionSetupFailed=!1,this.extensionSetupResult=null;try{let t=await e.installChromeExtension();this.isConnected&&this.context.nativeDeviceSettings===e&&(this.extensionSetupResult=t)}catch{this.isConnected&&this.context.nativeDeviceSettings===e&&(this.extensionSetupFailed=!0)}finally{this.extensionSetupRunning=!1}}}renderSettings(e){let{app:t,capabilities:n}=e,r=this.context.nativeDeviceSettings;return h`
      ${t?T({title:i(`configPage.deviceSettings.app`)},h`
                ${this.toggle(`app.nativeExperienceEnabled`,t.nativeExperienceEnabled,`nativeExperience`,i(`configPage.deviceSettings.nativeExperienceHint`))}
                ${t.appearance===void 0?u:k({title:i(`configPage.deviceSettings.appearance`),control:h`<select
                          class="settings-select"
                          aria-label=${i(`configPage.deviceSettings.appearance`)}
                          .value=${g(t.appearance)}
                          @change=${e=>{let t=e.currentTarget.value;r?.set(`app.appearance`,t)}}
                        >
                          ${[`system`,`light`,`dark`].map(e=>h`<option value=${e} ?selected=${e===t.appearance}>${i(`configPage.deviceSettings.appearanceModes.${e}`)}</option>`)}
                        </select>`})}
                ${this.toggle(`app.notificationsEnabled`,t.notificationsEnabled,`notificationsEnabled`,i(`configPage.deviceSettings.notificationsEnabledHint`))}
                ${this.toggle(`app.showDockIcon`,t.showDockIcon,`showDockIcon`,i(`configPage.deviceSettings.showDockIconHint`))}
                ${t.iconStyle?k({title:i(`configPage.deviceSettings.iconStyle`),description:i(`configPage.deviceSettings.iconStyleHint`),control:h`<select
                          class="settings-select"
                          aria-label=${i(`configPage.deviceSettings.iconStyle`)}
                          .value=${g(t.iconStyle.selectedId)}
                          ?disabled=${t.iconStyle.available.length===0}
                          @change=${e=>{let t=e.currentTarget.value;r?.set(`app.iconStyle`,t)}}
                        >
                          ${t.iconStyle.available.map(e=>h`<option
                              value=${e.id}
                              ?selected=${e.id===t.iconStyle?.selectedId}
                            >
                              ${e.name}
                            </option>`)}
                        </select>`}):u}
                ${this.toggle(`app.iconAnimationsEnabled`,t.iconAnimationsEnabled,`iconAnimations`,i(`configPage.deviceSettings.iconAnimationsHint`))}
                ${this.toggle(`app.launchAtLogin`,t.launchAtLogin,`launchAtLogin`,t.launchAtLoginAvailable===!1?i(`configPage.deviceSettings.launchAtLoginUnavailable`):void 0,t.launchAtLoginAvailable===!1)}
                ${this.toggle(`app.quickChatEnabled`,t.quickChatEnabled,`quickChat`,i(`configPage.deviceSettings.quickChatHint`))}
                ${t.quickChatShortcut===void 0?u:k({title:i(`configPage.deviceSettings.quickChatShortcut`),control:h`
                          ${A(t.quickChatShortcut??i(`configPage.deviceSettings.notSet`))}
                          <button
                            type="button"
                            class="btn"
                            @click=${()=>r?.openPanel(`quick-chat-shortcut`)}
                          >
                            ${i(`configPage.deviceSettings.changeShortcut`)}
                          </button>
                        `})}
              `):u}
      ${n?T({title:i(`configPage.deviceSettings.capabilities`)},h`
                ${this.toggle(`capabilities.canvasEnabled`,n.canvasEnabled,`canvas`,i(`configPage.deviceSettings.canvasHint`))}
                ${this.toggle(`capabilities.cameraEnabled`,n.cameraEnabled,`camera`,i(`configPage.deviceSettings.cameraHint`))}
                ${this.toggle(`capabilities.keepAwakeEnabled`,n.keepAwakeEnabled,`keepAwake`,i(`configPage.deviceSettings.keepAwakeHint`))}
                ${n.healthSummaryAvailable?this.toggle(`capabilities.healthSummaryEnabled`,n.healthSummaryEnabled,`healthSummary`,i(`configPage.deviceSettings.healthSummaryHint`)):u}
                ${this.toggle(`capabilities.computerControlEnabled`,n.computerControlEnabled,`computerControl`,i(`configPage.deviceSettings.computerControlHint`))}
                ${this.toggle(`capabilities.unattendedDesktopEnabled`,n.unattendedDesktopEnabled,`unattendedDesktop`,i(`configPage.deviceSettings.unattendedDesktopHint`))}
                ${e.desktopAvailability?k({title:i(`configPage.deviceSettings.desktopAvailability`),control:x({kind:e.desktopAvailability.state===`unlocked`?`ok`:`warn`,label:i(`configPage.deviceSettings.desktopStates.${e.desktopAvailability.state}`)})}):u}
                ${n.computerControlEnabled&&n.computerControlProvider!==void 0?k({title:i(`configPage.deviceSettings.computerControlProvider`),control:h`<select
                          class="settings-select"
                          aria-label=${i(`configPage.deviceSettings.computerControlProvider`)}
                          .value=${n.computerControlProvider}
                          @change=${e=>{let t=e.currentTarget.value;r?.set(`capabilities.computerControlProvider`,t)}}
                        >
                          <option
                            value="peekaboo"
                            ?selected=${n.computerControlProvider===`peekaboo`}
                          >
                            ${i(`configPage.deviceSettings.peekaboo`)}
                          </option>
                          <option
                            value="cua"
                            ?selected=${n.computerControlProvider===`cua`}
                            ?disabled=${!n.cuaDriverBundled}
                          >
                            ${i(n.cuaDriverBundled?`configPage.deviceSettings.cua`:`configPage.deviceSettings.cuaUnavailable`)}
                          </option>
                        </select>`}):u}
                ${this.toggle(`capabilities.peekabooBridgeEnabled`,n.peekabooBridgeEnabled,`peekabooBridge`,i(`configPage.deviceSettings.peekabooBridgeHint`),!n.computerControlEnabled)}
              `):u}
      ${e.browser?this.renderBrowser(e.browser):u}
      ${t?.debugPaneEnabled===void 0?u:T({title:i(`configPage.deviceSettings.developer`)},h`
                ${this.toggle(`app.debugPaneEnabled`,t.debugPaneEnabled,`debugTools`)}
                ${t.debugPaneEnabled?k({title:i(`configPage.deviceSettings.debugWindow`),control:h`<button type="button" class="btn" @click=${()=>r?.openPanel(`debug`)}>${i(`configPage.deviceSettings.openDebug`)}</button>`}):u}
              `)}
      ${e.device.platform===`ios`?T({title:i(`configPage.deviceSettings.device`)},h`${[`diagnostics`,`licenses`,`about`,`watch`].map(e=>k({title:i(`configPage.deviceSettings.panels.${e}`),control:h`<button
                    type="button"
                    class="btn"
                    @click=${()=>r?.openPanel(e)}
                  >
                    ${i(`configPage.deviceSettings.openPanel`)}
                  </button>`}))}`):u}
    `}render(){let e=this.context?.nativeDeviceSettings,t=e?.snapshot,n=e?t?this.renderSettings(t):O(i(`configPage.deviceSettings.loading`)):O(i(`configPage.deviceSettings.appOnly`));return h`
      ${w({title:i(y(t)),subtitle:h`${i(t?.device.platform===`ios`?`configPage.deviceSettings.introIos`:`configPage.deviceSettings.intro`)}
        ${E(t?.device.platform===`ios`?`https://docs.openclaw.ai/platforms/ios`:`https://docs.openclaw.ai/platforms/macos`)}`})}
      ${F(C(n))}
    `}},t([n({context:v,subscribe:!0})],B.prototype,`context`,void 0),t([p()],B.prototype,`newDomain`,void 0),t([p()],B.prototype,`extensionSetupRunning`,void 0),t([p()],B.prototype,`extensionSetupResult`,void 0),t([p()],B.prototype,`extensionSetupFailed`,void 0),customElements.get(`openclaw-device-page`)||customElements.define(`openclaw-device-page`,B)})))()}V();
//# sourceMappingURL=device-page-S0TcGNbF.js.map