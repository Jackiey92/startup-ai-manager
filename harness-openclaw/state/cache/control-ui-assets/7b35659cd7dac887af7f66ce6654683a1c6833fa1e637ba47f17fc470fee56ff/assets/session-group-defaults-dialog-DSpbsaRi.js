import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Ss as n,Tl as r,bs as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,nt as s,v as c,x as l}from"./lit-runtime-CIjzngcy.js";import{Di as u,Ei as d,St as f,xt as p}from"./control-ui-core-C5mtYcym.js";import{Ji as m,qi as h}from"./control-ui-boot-shared-DpHhsTHW.js";import{C as g,D as _,E as v,F as y,O as b,T as x,j as S,k as C}from"./control-ui-boot-new-CQMzhCGu.js";function w(e){return T?Promise.resolve():(T=!0,f(void 0,({host:n,render:r,finish:o})=>{let c=e.defaults.cwd,u=!1,f=`checking`,p=0,h=!1,g=null,b=!1,x=new _(e.listDirectory,F),S=()=>{x.reset(),p+=1,o(),T=!1},w=async t=>{if(t.preventDefault(),!(h||f===`checking`||f===`unavailable`)){h=!0,g=null,F();try{g=await e.submit({cwd:c.trim(),worktree:f===`git`&&u})}catch(e){g=i(e)}if(!g){S();return}h=!1,F()}},E=()=>{let e=n.querySelector(`wa-popover.session-group-defaults__folder-popover`);e&&(e.open=!1)},D=()=>{x.reset(),b=!1,F()},O=e=>{c=e.trim(),D(),E(),k(!1)},k=async t=>{let n=++p;f=`checking`,u=!1,g=null,F();try{let r=await e.inspectRepository(c.trim()||void 0);if(n!==p)return;f=r,u=r===`git`&&t&&e.defaults.worktree}catch{if(n!==p)return;f=`unavailable`,u=!1}F()},A=e=>{u=e,g=null,F()},j=e=>{let t=e.detail.item.getAttribute(`value`);(t===`local`||t===`worktree`)&&A(t===`worktree`)},M=e=>{if(!(e.currentTarget instanceof HTMLElement))return;let t=Array.from(e.currentTarget.querySelectorAll(`wa-dropdown-item[data-environment-mode]`)),n=t.find(e=>e.hasAttribute(`data-selected`))??t[0];if(n){for(let e of t)e.active=e===n;n.focus({preventScroll:!0})}},N=e=>{if(!(e.currentTarget instanceof HTMLElement))return;let t=e.currentTarget;e.key===`Escape`&&t.open&&(e.preventDefault(),e.stopPropagation(),t.open=!1,t.querySelector(`#session-group-defaults-mode-trigger`)?.focus({preventScroll:!0}))},P=()=>{b=!0,x.navigate(c||void 0)};function F(){let n=c.trim(),i=n?C(n):t(`sessionsView.groupDefaultsCwdPlaceholder`),o=f===`checking`?`checking`:f===`git`?`git`:`local`,p=[{value:`local`,label:t(`sessionsView.groupDefaultsLocal`),description:t(`newSession.checkoutCurrentNote`),icon:d.monitor},{value:`worktree`,label:t(`sessionsView.groupDefaultsWorktree`),description:t(`sessionsView.groupDefaultsWorktreeHint`),icon:d.gitBranch}],_=p[+!!u];r(()=>s`
          <openclaw-modal-dialog
            label=${t(`sessionsView.groupDefaultsTitle`,{group:e.group})}
            @modal-cancel=${e=>{if(h){e.preventDefault();return}S()}}
          >
            <form class="exec-approval-card session-group-defaults" @submit=${w}>
              <div class="exec-approval-header">
                <div>
                  <div class="exec-approval-title">
                    ${t(`sessionsView.groupDefaultsTitle`,{group:e.group})}
                  </div>
                  <div class="exec-approval-sub">${t(`sessionsView.groupDefaultsDescription`)}</div>
                </div>
              </div>
              <div class="session-group-defaults__fields">
                <div class="field">
                  <span>${t(`sessionsView.groupDefaultsCwd`)}</span>
                  <button
                    id="session-group-defaults-folder-trigger"
                    type="button"
                    class="new-session-page__trigger session-group-defaults__folder"
                    aria-label="${t(`sessionsView.groupDefaultsCwd`)}: ${i}"
                    aria-haspopup="dialog"
                    ?disabled=${h}
                  >
                    <span class="new-session-page__target-icon" aria-hidden="true"
                      >${d.folder}</span
                    >
                    <span class="session-group-defaults__folder-copy">
                      <strong>${i}</strong>
                      <small title=${n||a}
                        >${n||t(`sessionsView.groupDefaultsCwdHint`)}</small
                      >
                    </span>
                    <span class="new-session-page__trigger-chevron" aria-hidden="true"
                      >${d.chevronDown}</span
                    >
                  </button>
                  <wa-popover
                    class="new-session-page__select new-session-page__project-popover new-session-page__picker-popover session-group-defaults__folder-popover"
                    for="session-group-defaults-folder-trigger"
                    placement="bottom-start"
                    without-arrow
                    @wa-hide=${D}
                  >
                    ${b?v({browser:x,id:`session-group-defaults-browser`,label:t(`newSession.gateway`),registerProjectPath:null,registeringProject:!1,onBack:D,onRegisterProject:()=>void 0,onClose:D,onApplyFolder:O}):s`
                            <div class="new-session-page__picker-root">
                              ${y({value:`agent-workspace`,label:t(`sessionsView.groupDefaultsCwdPlaceholder`),icon:d.folder,checked:!n,onSelect:()=>O(``)},h)}
                              <button
                                type="button"
                                class="session-menu__item"
                                data-value="browse"
                                aria-pressed="false"
                                ?disabled=${h}
                                @click=${P}
                              >
                                <span class="session-menu__check" aria-hidden="true"></span>
                                <span class="session-menu__text">${t(`newSession.browse`)}</span>
                                <span class="new-session-page__menu-chevron" aria-hidden="true"
                                  >${d.chevronRight}</span
                                >
                              </button>
                            </div>
                          `}
                  </wa-popover>
                </div>
                <div class="field">
                  <span>${t(`sessionsView.groupDefaultsMode`)}</span>
                  <div
                    class="session-group-defaults__environment"
                    data-session-group-environment=${o}
                    aria-live="polite"
                  >
                    ${f===`git`?s`
                            <wa-dropdown
                              class="session-group-defaults__mode-dropdown"
                              placement="bottom-start"
                              aria-label=${t(`sessionsView.groupDefaultsMode`)}
                              @wa-select=${j}
                              @wa-after-show=${M}
                              @keydown=${N}
                            >
                              <button
                                id="session-group-defaults-mode-trigger"
                                slot="trigger"
                                type="button"
                                class="session-group-defaults__resolved-mode session-group-defaults__mode-trigger"
                                data-value=${_.value}
                                aria-label=${`${t(`sessionsView.groupDefaultsMode`)}: ${_.label}`}
                                ?disabled=${h}
                              >
                                <span class="new-session-page__target-icon" aria-hidden="true"
                                  >${_.icon}</span
                                >
                                <span class="session-group-defaults__resolved-copy">
                                  <strong>${_.label}</strong>
                                  <small>${_.description}</small>
                                </span>
                                <span class="new-session-page__trigger-chevron" aria-hidden="true"
                                  >${d.chevronDown}</span
                                >
                              </button>
                              ${p.map(e=>{let t=e===_;return s`
                                  <wa-dropdown-item
                                    class="session-group-defaults__mode-option"
                                    data-environment-mode=${e.value}
                                    ?data-selected=${t}
                                    aria-label=${`${e.label}, ${e.description}`}
                                    value=${e.value}
                                    type="checkbox"
                                    .checked=${t}
                                    ?disabled=${h}
                                    ${l(e=>m(e,t))}
                                  >
                                    <span
                                      slot="icon"
                                      class="new-session-page__target-icon session-group-defaults__mode-option-icon"
                                      aria-hidden="true"
                                      >${e.icon}</span
                                    >
                                    <span class="session-group-defaults__resolved-copy">
                                      <strong>${e.label}</strong>
                                      <small>${e.description}</small>
                                    </span>
                                  </wa-dropdown-item>
                                `})}
                            </wa-dropdown>
                          `:s`
                            <div
                              class="session-group-defaults__resolved-mode"
                              role=${f===`checking`?`status`:a}
                            >
                              <span class="new-session-page__target-icon" aria-hidden="true"
                                >${f===`checking`?d.gitBranch:d.monitor}</span
                              >
                              <span class="session-group-defaults__resolved-copy">
                                <strong
                                  >${t(f===`checking`?`newSession.checkingGit`:`sessionsView.groupDefaultsLocal`)}</strong
                                >
                                ${f===`checking`?a:s`<small
                                        >${t(f===`unavailable`?`newSession.gitCheckUnavailable`:`newSession.checkoutCurrentNote`)}</small
                                      >`}
                              </span>
                            </div>
                          `}
                  </div>
                </div>
              </div>
              ${g?s`<div class="exec-approval-error" role="alert">${g}</div>`:a}
              <div class="exec-approval-actions">
                <button
                  type="submit"
                  class="btn primary"
                  ?disabled=${h||f===`checking`||f===`unavailable`}
                >
                  ${t(`common.save`)}
                </button>
                ${f===`unavailable`?s`
                        <button
                          type="button"
                          class="btn"
                          ?disabled=${h}
                          @click=${()=>void k(c.trim()===e.defaults.cwd.trim())}
                        >
                          ${t(`common.retry`)}
                        </button>
                      `:a}
                <button type="button" class="btn" ?disabled=${h} @click=${S}>
                  ${t(`common.cancel`)}
                </button>
              </div>
            </form>
          </openclaw-modal-dialog>
        `)}k(!0)}))}var T;function E(){return(E=e((()=>{o(),c(),r(),n(),S(),b(),x(),u(),p(),h(),g(),T=!1})))()}E();export{w as showSessionGroupDefaultsDialog};
//# sourceMappingURL=session-group-defaults-dialog-DSpbsaRi.js.map