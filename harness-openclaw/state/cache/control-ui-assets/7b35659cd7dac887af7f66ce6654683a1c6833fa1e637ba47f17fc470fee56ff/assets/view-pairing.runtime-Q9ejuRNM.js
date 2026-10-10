import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Tl as n,en as r,un as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,nt as s}from"./lit-runtime-CIjzngcy.js";import{Di as c,Ei as l,lr as u}from"./control-ui-core-C5mtYcym.js";import{ci as d,li as f,ui as p}from"./control-ui-boot-shared-DlJEsz5Q.js";import{cr as m,dr as h,lr as g}from"./control-ui-boot-shared-DpHhsTHW.js";function _(e){return t(e===`limited`?`devices.pairing.limitedAccess`:e===`node`?`devices.pairing.nodeAccessSummary`:`devices.pairing.fullAccessSummary`)}function v(e){if(!e.open)return a;let n=e.lifecycle,i=t(`devices.pairing.title`),o=n.phase===`success`?t(`devices.pairing.pairedTitle`):n.phase===`delivery-uncertain`?t(`devices.pairing.deliveryUncertainTitle`):n.phase===`expired`?t(`devices.pairing.expiredTitle`):t(`devices.pairing.subtitle`),c=t(`devices.pairing.copySetupCode`),u=n.phase===`waiting`?n.setup:null,p=u?.gatewayUrls??(u?[u.gatewayUrl]:[]),g=n.access===`node`,v=g?b:y,S=u?`openclaw node run --pair "oc-pair://${u.setupCode}"`:``,C=!!(u&&u.expiresAtMs<=e.nowMs),w=n.phase!==`success`&&n.phase!==`delivery-uncertain`&&n.phase!==`reconciling`&&(n.phase!==`error`||n.source!==`status`),T=n.phase===`selection`||n.phase===`error`&&n.source===`create`;return s`
    <openclaw-modal-dialog label=${i} description=${o} @modal-cancel=${e.onClose}>
      <section class="device-pair-setup">
        <header class="device-pair-setup__header">
          <div class="device-pair-setup__phone" aria-hidden="true">
            ${g?l.server:l.smartphone}
          </div>
          <div>
            <h2>${i}</h2>
            <p>${o}</p>
            ${n.phase!==`success`&&!g?s`<p class="device-pair-setup__get-apps">
                    ${t(`devices.pairing.noApp`)}
                    <button type="button" @click=${e.onGetApps}>
                      ${t(`devices.pairing.getApps`)}
                    </button>
                  </p>`:a}
          </div>
          <button
            class="btn btn--icon btn--ghost device-pair-setup__close"
            type="button"
            aria-label=${t(`common.dismiss`)}
            @click=${e.onClose}
          >
            ${l.x}
          </button>
        </header>

        <div class="device-pair-setup__body">
          ${w?s`<fieldset class="device-pair-setup__access" ?disabled=${!T}>
                  <legend>${t(`devices.pairing.accessTitle`)}</legend>
                  ${x.map(([r,i,a])=>s`<label>
                      <input
                        type="radio"
                        name="device-pair-access"
                        .checked=${n.access===r}
                        @change=${()=>e.onAccessChange(r)}
                      />
                      <span>
                        <strong>${t(i)}</strong>
                        <small>${t(a)}</small>
                      </span>
                    </label>`)}
                </fieldset>`:a}
          ${n.phase===`selection`?s`
                  <button class="btn primary" type="button" @click=${e.onRefresh}>
                    ${g?l.server:l.smartphone}
                    ${t(`devices.pairing.generateCode`)}
                  </button>
                `:a}
          ${n.phase===`loading`?s`
                  <div class="device-pair-setup__loading" role="status" aria-live="polite">
                    <span class="device-pair-setup__spinner" aria-hidden="true"></span>
                    <span>${t(`devices.pairing.generating`)}</span>
                  </div>
                `:a}
          ${n.phase===`reconciling`?s`
                  <div class="device-pair-setup__loading" role="status" aria-live="polite">
                    <span class="device-pair-setup__spinner" aria-hidden="true"></span>
                    <span>${t(`common.loading`)}</span>
                  </div>
                `:a}
          ${n.phase===`error`?s`
                  <div class="callout danger device-pair-setup__error" role="alert">
                    <strong
                      >${t(n.source===`status`?`devices.pairing.statusFailed`:`devices.pairing.failed`)}</strong
                    >
                    <span>${n.message}</span>
                  </div>
                  <button class="btn primary" type="button" @click=${e.onRefresh}>
                    ${l.refresh} ${t(`common.reload`)}
                  </button>
                `:a}
          ${u?s`
                  ${g?s`<div class="device-pair-setup__command">
                          ${C?a:s`<div class="login-gate__command">
                                  <code>${S}</code>
                                  ${h(S,t(`connection.help.copyCommand`))}
                                </div>`}
                          <p class="device-pair-setup__waiting" role="timer" aria-live="off">
                            ${C?t(`devices.pairing.nodeExpired`):t(`devices.pairing.nodeExpiresIn`,{time:r(u.expiresAtMs,e.nowMs)})}
                          </p>
                        </div>`:s`<div class="device-pair-setup__qr-frame">
                          ${u.qrDataUrl?s`<img
                                  class="device-pair-setup__qr"
                                  src=${u.qrDataUrl}
                                  alt=${t(`devices.pairing.qrAlt`)}
                                  width="360"
                                  height="360"
                                  draggable="false"
                                />`:s`<div class="device-pair-setup__qr-unavailable">
                                  ${t(`devices.pairing.qrUnavailable`)}
                                </div>`}
                        </div>`}

                  <div class="device-pair-setup__meta">
                    <span class="settings-status settings-status--accent">
                      <span class="settings-status__dot"></span>
                      ${u.auth}
                    </span>
                    <div class="device-pair-setup__gateways">
                      ${p.map(e=>s`
                          <span class="device-pair-setup__gateway" title=${e}
                            >${e}</span
                          >
                        `)}
                    </div>
                  </div>

                  ${u.accessDowngraded?s`
                          <div class="callout warn device-pair-setup__access-warning" role="status">
                            <strong>${t(`devices.pairing.transportLimitedTitle`)}</strong>
                            <span>${t(`devices.pairing.transportLimitedHint`)}</span>
                          </div>
                        `:a}

                  <div class="device-pair-setup__actions">
                    ${g?a:s`<button
                            class="btn primary"
                            type="button"
                            @click=${e=>void m(e,u.setupCode,c)}
                          >
                            ${l.copy} <span data-copy-label>${c}</span>
                          </button>`}
                    <button class="btn" type="button" @click=${e.onRefresh}>
                      ${l.refresh} ${t(`devices.pairing.newCode`)}
                    </button>
                  </div>

                  <details class="device-pair-setup__fallback">
                    <summary>${t(`devices.pairing.showSetupCode`)}</summary>
                    <code>${u.setupCode}</code>
                  </details>

                  ${e.pendingCount>0?s`
                          <div class="callout warn device-pair-setup__pending">
                            <span>
                              ${t(`devices.pairing.pending`,{count:String(e.pendingCount)})}
                            </span>
                            <button class="btn btn--sm" @click=${e.onManageDevices}>
                              ${t(`devices.pairing.review`)}
                            </button>
                          </div>
                        `:s`<p class="device-pair-setup__waiting">
                          ${t(g?`devices.pairing.nodeWaiting`:`devices.pairing.waiting`)}
                        </p>`}
                `:a}
          ${n.phase===`success`?s`<div class="device-pair-setup__state" role="status" aria-live="polite">
                  <div
                    class="device-pair-setup__state-icon device-pair-setup__state-icon--success"
                    aria-hidden="true"
                  >
                    ${l.badgeCheck}
                  </div>
                  <h3>${n.deviceName??t(`devices.pairing.pairedTitle`)}</h3>
                  <p>
                    ${n.deviceName?s`${t(`devices.pairing.pairedTitle`)}
                            <span aria-hidden="true">·</span> `:a}${_(n.access)}
                  </p>
                  <button class="btn primary" type="button" @click=${e.onClose}>
                    ${t(`devices.pairing.done`)}
                  </button>
                </div>`:a}
          ${n.phase===`delivery-uncertain`?s`<div class="device-pair-setup__state" role="alert">
                  <div class="device-pair-setup__state-icon" aria-hidden="true">
                    ${l.alertTriangle}
                  </div>
                  <h3>${t(`devices.pairing.deliveryUncertainTitle`)}</h3>
                  <p>${t(`devices.pairing.deliveryUncertainHint`)}</p>
                  <div class="device-pair-setup__actions">
                    <button class="btn primary" type="button" @click=${e.onRefresh}>
                      ${l.refresh} ${t(`devices.pairing.generateNewCode`)}
                    </button>
                  </div>
                </div>`:a}
          ${n.phase===`expired`?s`<div class="device-pair-setup__state" role="status" aria-live="polite">
                  <div class="device-pair-setup__state-icon" aria-hidden="true">
                    ${l.refresh}
                  </div>
                  <h3>${t(`devices.pairing.expiredTitle`)}</h3>
                  <button class="btn primary" type="button" @click=${e.onRefresh}>
                    ${l.refresh} ${t(`devices.pairing.generateNewCode`)}
                  </button>
                </div>`:a}
        </div>

        <footer class="device-pair-setup__footer">
          <a
            href=${v}
            target=${d}
            rel=${f()}
            aria-label=${t(`devices.pairing.helpNewTab`)}
          >
            <span>${t(`devices.pairing.help`)}</span>
            <span class="device-pair-setup__external-icon" aria-hidden="true"
              >${l.externalLink}</span
            >
          </a>
          <button class="btn btn--ghost" type="button" @click=${e.onManageDevices}>
            ${t(`devices.pairing.manageDevices`)}
          </button>
        </footer>
      </section>
    </openclaw-modal-dialog>
  `}var y,b,x;function S(){return(S=e((()=>{o(),g(),c(),u(),n(),p(),i(),y=`https://docs.openclaw.ai/channels/pairing#pair-from-the-control-ui-recommended`,b=`https://docs.openclaw.ai/gateway/pairing#one-paste-node-pairing`,x=[[`full`,`devices.pairing.fullAccess`,`devices.pairing.fullAccessHint`],[`limited`,`devices.pairing.limitedAccess`,`devices.pairing.limitedAccessHint`],[`node`,`devices.pairing.nodeAccess`,`devices.pairing.nodeAccessHint`]]})))()}S();export{v as renderDevicePairSetup};
//# sourceMappingURL=view-pairing.runtime-Q9ejuRNM.js.map