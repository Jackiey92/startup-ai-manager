import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Ss as n,Tl as r,bs as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,nt as s}from"./lit-runtime-CIjzngcy.js";import{Di as c,Ei as l,St as u,xt as d}from"./control-ui-core-C5mtYcym.js";import{F as f,M as p,N as m,P as h,S as g,j as _,x as v}from"./control-ui-boot-new-CQMzhCGu.js";function y(e){if(!e)return``;switch(e.kind){case`gateway`:return`gateway`;case`profile`:return`profile:${e.profileId}`;case`device`:return`device:${e.deviceId}`}throw Error(`Unknown session placement move target`)}function b(e){return x?Promise.resolve(null):(x=!0,u(void 0,({render:n,finish:r})=>{let o=!0,c=null,u={profiles:[],devices:[]},d=e.mode===`move`?{kind:`gateway`}:null,g=new v,_=e=>{r(e),x=!1},b=e=>{d=e,C()},S=e=>{if(e.preventDefault(),!d)return;if(d.kind!==`profile`){_(d);return}let t=g.resolve(d.profileId),n=g.resolveOs(d.profileId);_({...d,...t?{machineClass:t}:{},...n?{os:n}:{}})};function C(){let r=y(d),i=e.mode===`restart`,v=e.mode===`dispatch`,x=t(`sessionsView.${e.mode}SessionTitle`),w=t(`sessionsView.${e.mode}SessionDescription`,{session:e.sessionLabel}),T=t(`sessionsView.${e.mode}SessionAction`);n(()=>s`
          <openclaw-modal-dialog label=${x} @modal-cancel=${()=>_(null)}>
            <form class="exec-approval-card" @submit=${S}>
              <div class="exec-approval-header">
                <div class="exec-approval-title">${x}</div>
                <div class="muted">${w}</div>
              </div>
              ${i?s`<div class="exec-approval-error" role="alert">
                      ${t(`sessionsView.restartSessionWarning`)}
                    </div>`:v?s`<div class="callout">${t(`sessionsView.dispatchSessionNotice`)}</div>`:e.activeRun?s`<div class="exec-approval-error" role="alert">
                          ${t(`sessionsView.moveSessionActiveRunWarning`)}
                        </div>`:s`<div class="callout">
                          ${t(`sessionsView.moveSessionNoReplayWarning`)}
                        </div>`}
              ${o?s`<div class="muted">${t(`common.loading`)}</div>`:c?s`<div class="exec-approval-error" role="alert">${c}</div>`:s`
                        <div class="new-session-page__picker-root">
                          ${v?a:f({value:`gateway`,label:t(`newSession.gateway`),icon:l.monitor,checked:r===`gateway`,disabled:!!e.gatewayDisabledReason,title:e.gatewayDisabledReason,onSelect:()=>b({kind:`gateway`})},!1)}
                          ${u.devices.length>0?s`
                                  <div class="new-session-page__menu-title">
                                    ${t(`newSession.yourDevices`)}
                                  </div>
                                  ${u.devices.map(t=>{let n=e.deviceDisabledReason??t.disabledReason;return f({value:`device:${t.deviceId}`,label:t.label,sub:t.subtitle,icon:l.monitor,facts:e.deviceDisabledReason?[e.deviceDisabledReason]:t.facts,checked:r===`device:${t.deviceId}`,disabled:!!e.deviceDisabledReason||!t.selectable,title:n,onSelect:()=>b({kind:`device`,deviceId:t.deviceId})},!1)})}
                                `:a}
                          ${u.profiles.length>0?s`
                                  <div class="new-session-page__menu-title">
                                    ${t(`newSession.cloud`)}
                                  </div>
                                  ${u.profiles.map(n=>{let r=d?.kind===`profile`&&d.profileId===n.id,i=g.machines(n),o=n.operatingSystems??[],c=g.resolve(n.id)||i.find(e=>e.default===!0)?.id||``;return s`
                                      ${h({profiles:[n],selectedId:r?n.id:``,submitting:!1,icon:l.server,profileDisabledReason:e.profileDisabledReason,onSelect:e=>b({kind:`profile`,profileId:e})})}
                                      ${r&&o.length>=2?s`
                                              <div class="new-session-page__menu-title">
                                                ${t(`newSession.operatingSystem`)}
                                              </div>
                                              ${m({operatingSystems:o,selectedId:g.selectedOs(n),submitting:!1,onSelect:e=>g.selectOs(n.id,e,u.profiles,!1,C)})}
                                            `:a}
                                      ${r&&i.length>0?s`
                                              <div class="new-session-page__menu-title">
                                                ${t(`newSession.machine`)}
                                              </div>
                                              ${p({machines:i,selectedId:c,submitting:!1,onSelect:e=>g.select(n.id,e,u.profiles,!1,C)})}
                                            `:a}
                                    `})}
                                `:a}
                        </div>
                      `}
              <div class="exec-approval-actions">
                <button
                  type="submit"
                  class="btn primary"
                  ?disabled=${o||!!c||!d}
                >
                  ${T}
                </button>
                <button type="button" class="btn" @click=${()=>_(null)}>
                  ${t(`common.cancel`)}
                </button>
              </div>
            </form>
          </openclaw-modal-dialog>
        `)}C(),e.loadCatalog().then(e=>{u=e}).catch(e=>{c=i(e,t(`sessionsView.moveSessionCatalogFailed`))}).finally(()=>{o=!1,C()})}))}var x;function S(){return(S=e((()=>{o(),r(),n(),_(),g(),c(),d(),x=!1})))()}S();export{b as showSessionPlacementTargetDialog};
//# sourceMappingURL=session-placement-move-dialog-lWUbHNgc.js.map