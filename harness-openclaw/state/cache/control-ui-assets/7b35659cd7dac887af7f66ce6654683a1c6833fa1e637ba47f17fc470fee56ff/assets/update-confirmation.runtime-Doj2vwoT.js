import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Ss as n,Tl as r,bs as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,et as s,nt as c}from"./lit-runtime-CIjzngcy.js";import{J as l,it as u,lr as d,nt as f,q as p}from"./control-ui-core-C5mtYcym.js";import{n as m,t as h}from"./en-update-actions-9XzECbdy.js";import{t as g}from"./update-run-view-D2Vq-TmL.js";function _(e,n){let r=e?.currentVersion?.trim(),i=r?t(`updates.target.version`,{version:r}):null,a=p(n,e);if(i&&a){let r=n?.install?.git,o=r?.status===`behind`||r?.status===`diverged`||n?.target?.kind===`git`||e?.commitsBehind!==void 0;return t(o?`updates.confirm.versionsBehind`:`updates.confirm.versions`,{available:a,installed:i})}return i??a??void 0}function v(e){return t(e?`updates.dialog.installing`:`updates.dialog.disconnected`)}async function y(e){if(S)return;let n=document.createElement(`div`);document.body.append(n),document.body.classList.add(x);let r=e.viaNativeApp?{confirmLabel:t(`updates.confirm.macAction`),message:t(`updates.confirm.macMessage`),title:t(`chat.sidebar.updateMacAndGateway`)}:{confirmLabel:t(`updates.confirm.action`),message:t(`updates.confirm.message`),title:t(`chat.sidebar.updateGateway`)},o=_(e.updateAvailable,e.updateSchedule);await new Promise(l=>{let d=e.existingRun?{kind:`run`,run:e.existingRun}:{kind:`confirm`},f=!1,p,m,h=!1,g,_=`idle`,y=()=>{f||(f=!0,p?.(),m!==void 0&&globalThis.clearTimeout(m),s(a,n),n.remove(),document.body.classList.remove(x),S=!1,l())},C=()=>{!f&&d.kind===`run`&&d.run.status!==`running`&&e.onAcknowledge?.(),y()},w=(e,t)=>{let n=e(e=>{if(!f){if(g=e,d.kind===`run`&&!e.run){y();return}t(e)}});f?n():p=n};S=!0;let T=()=>{if(f)return;let i=d,l=i.kind===`run`?i.run:null,u=i.kind===`run`?g?.readError:null,m=i.kind===`working`||l?.status===`running`,h=l!==null&&l.status!==`running`,y=i.kind===`failed`||h&&l.status!==`succeeded`,b=_===`pending`,x=typeof _==`object`?_.error:null,S=y||!!u||_!==`idle`,w=g?.connected===!1,O=i.kind===`run`?u??``:i.kind===`failed`?i.message:i.kind===`working`?v(!w):`${r.message} ${t(`updates.confirm.impact`)}`;s(c`
          <openclaw-modal-dialog label=${r.title} description=${O} @modal-cancel=${C}>
            <div class="exec-approval-card update-run-dialog">
              <div class="exec-approval-header">
                <div>
                  <div class="exec-approval-title">${r.title}</div>
                  <div class="exec-approval-sub" style="white-space: pre-line">${O}</div>
                </div>
              </div>
              <div role="status" aria-live="polite" class="exec-approval-sub">
                ${w&&S?t(`updates.dialog.checkStatusDisconnected`):_===`success`&&!u?t(`updates.dialog.statusRefreshed`):a}
              </div>
              ${x?c`<div role="alert" class="exec-approval-sub">${x}</div>`:a}
              ${o&&i.kind===`confirm`?c`<div class="exec-approval-command mono">${o}</div>`:a}
              ${i.kind===`run`?c`<openclaw-update-run-view
                      .run=${i.run}
                      .connected=${!w}
                    ></openclaw-update-run-view>`:a}
              <div class="exec-approval-actions">
                ${h||S?c` ${S&&e.onCheckStatus?c`<button
                                type="button"
                                class="btn ${b?`btn--busy`:``}"
                                ?disabled=${b||w}
                                @click=${E}
                              >
                                ${b?c`<span class="btn__spinner" aria-hidden="true"></span>${t(`updates.dialog.checkingStatus`)}`:t(`updates.dialog.checkStatus`)}
                              </button>`:a}
                        ${y?c`<button
                                type="button"
                                class="btn primary"
                                ?disabled=${b||w}
                                @click=${()=>{d={kind:`confirm`},_=`idle`,p?.(),T()}}
                              >
                                ${t(`updates.dialog.retryUpdate`)}
                              </button>`:a}
                        ${y&&e.onReviewUpdate?c`<button
                                type="button"
                                class="btn"
                                @click=${()=>{C(),e.onReviewUpdate?.()}}
                              >
                                ${t(`updates.reviewUpdate`)}
                              </button>`:a}
                        <button type="button" class="btn" autofocus @click=${C}>
                          ${t(`common.close`)}
                        </button>`:c`
                        <button
                          type="button"
                          class="btn danger ${m?`btn--busy`:``}"
                          ?disabled=${m}
                          @click=${D}
                        >
                          ${m?c`<span class="btn__spinner" aria-hidden="true"></span>${t(`chat.updating`)}`:r.confirmLabel}
                        </button>
                        <button type="button" class="btn" autofocus @click=${C}>
                          ${t(m?`common.close`:`common.cancel`)}
                        </button>
                      `}
              </div>
            </div>
          </openclaw-modal-dialog>
        `,n)};async function E(){if(_!==`pending`&&g?.connected!==!1&&e.onCheckStatus){_=`pending`,T();try{_=await e.onCheckStatus()?`success`:g?.readError?`idle`:{error:t(`updates.dialog.statusNotRefreshed`)}}catch(e){_={error:i(e)}}finally{T()}}}function D(){if(d.kind!==`confirm`)return;if(e.viaNativeApp&&u()){C();return}let n=e.watchUpdateProgress;if(!n){e.startGatewayUpdate(),C();return}h=!1,m!==void 0&&globalThis.clearTimeout(m),d={kind:`working`},T(),e.startGatewayUpdate();let r=!0;w(n,e=>{let t=r;if(r=!1,d.kind===`confirm`)return;if(e.run&&(!t||e.run.status===`running`)){h=!0,d={kind:`run`,run:e.run},T();return}let n=e.failure&&e.readError?`${e.failure}\n${e.readError}`:e.failure??e.readError;if(n&&!t){d={kind:`failed`,message:n},T();return}h||=e.busy,d={kind:`working`},T()}),!f&&(m=globalThis.setTimeout(()=>{f||h||d.kind!==`working`||(d={kind:`failed`,message:t(`updates.dialog.notStarted`)},T())},b))}e.existingRun&&e.watchUpdateProgress&&w(e.watchUpdateProgress,e=>{e.run&&(d={kind:`run`,run:e.run},T())}),T()})}var b,x,S;function C(){return(C=e((()=>{o(),r(),h(),n(),d(),g(),f(),l(),m(),b=4e3,x=`update-dialog-open`,S=!1})))()}C();export{y as confirmAndStartUpdateRuntime};
//# sourceMappingURL=update-confirmation.runtime-Doj2vwoT.js.map