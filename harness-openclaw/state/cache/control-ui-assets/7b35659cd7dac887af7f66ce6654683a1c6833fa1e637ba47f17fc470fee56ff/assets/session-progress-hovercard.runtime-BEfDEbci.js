const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./channel-avatar-Dj5S9hhc.js","./rolldown-runtime-8BhlS34s.js","./control-ui-foundation-DaCuy7E_.js","./control-ui-core-CndkyZ8m.js","./lit-runtime-CIjzngcy.js","./control-ui-core-C5mtYcym.js","./gateway-runtime-BvWNTqPo.js","./control-ui-boot-shared-DlJEsz5Q.js","./control-ui-boot-shared-ChkOvQif.js","./control-ui-boot-shared-DNpYeKSN.js","./control-ui-boot-shared-DwSLfX8E.js","./control-ui-boot-shared-DPto3YH7.js","./control-ui-boot-shared-C018SffO.js","./markdown-runtime-vPNULjtl.js","./config-runtime-B4vvJ76O.js","./control-ui-boot-shared-DF3-KJRn.js","./control-ui-boot-shared-DpHhsTHW.js","./control-ui-boot-shared-hN7_nGsj.js","./control-ui-boot-shared-6jDbGebE.js","./control-ui-boot-shared-DwO55ELU.js","./control-ui-boot-shared-CoE663Cg.js","./control-ui-boot-shared-Bt2ZINpX.js","./control-ui-core-DvoiO6cr.css","./control-ui-boot-shared-BahwINek.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Ka as n,Mi as r,br as i,ji as a,tr as o}from"./control-ui-foundation-DaCuy7E_.js";import{Al as s,F as c,Ol as l,Pc as u,Tl as d,Uc as f,kc as p,nl as m,qc as h}from"./control-ui-core-CndkyZ8m.js";import{$ as g,Q as _,et as v,gt as y,nt as b}from"./lit-runtime-CIjzngcy.js";import{Di as ee,Ei as x,Nr as te,Pr as ne,fa as re,gt as ie,ia as ae,mt as oe,wi as se}from"./control-ui-core-C5mtYcym.js";import{Et as ce,Ot as S,fi as C,mi as le}from"./control-ui-boot-shared-DlJEsz5Q.js";import{A as ue,Dr as de,Er as fe,Fi as pe,H as me,Ii as he,Kn as ge,M as _e,Or as w,Tr as T,U as ve,Vn as ye,Wn as be,ai as xe,ci as Se,di as E,fi as D,j as O,li as k,pi as A,si as j,ui as M}from"./control-ui-boot-shared-DpHhsTHW.js";import{F as Ce,P as we}from"./control-ui-boot-chat-CLUFzlXZ.js";import{n as Te,r as Ee,t as De}from"./portaled-hovercard-DgysjroY.js";function N(e){return e.label?.trim()||e.identity.id}function Oe(e,t,n){return e.identity.type===`profile`&&e.identity.id===n||JSON.stringify(e.identity)===JSON.stringify(t?.identity)}function ke(){Ue??=a(()=>import(`./channel-avatar-Dj5S9hhc.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]),import.meta.url)}function P(e){return s(`sessionHovercard.states.${e}`)}function Ae(e){switch(e.state){case`passing`:return s(`sessionHovercard.checks.passing`);case`failing`:return s(`sessionHovercard.checks.failing`);case`pending`:return s(`sessionHovercard.checks.pending`);default:return e.state}}function je(e){switch(e){case`open`:return x.gitPullRequest;case`draft`:return x.gitPullRequestDraft;case`merged`:return x.gitMerge;case`closed`:return x.gitPullRequestClosed;default:return e}}function F(e){return e.additions===void 0&&e.deletions===void 0?g:b`<span class="session-hovercard__diff">
    ${e.additions===void 0?g:b`<span class="session-hovercard__additions"
            >+${e.additions.toLocaleString()}</span
          >`}
    ${e.deletions===void 0?g:b`<span class="session-hovercard__deletions"
            >−${e.deletions.toLocaleString()}</span
          >`}
  </span>`}function Me(e){let t=Math.abs(e)/864e5;return t>=365?{value:Math.max(1,Math.round(t/365)),unit:`year`}:t>=28?{value:Math.max(1,Math.round(t/30)),unit:`month`}:t>=7?{value:Math.max(1,Math.round(t/7)),unit:`week`}:t>=1?{value:Math.max(1,Math.round(t)),unit:`day`}:i(Math.abs(e))}function I(e,t){if(typeof e!=`number`||!Number.isFinite(e))return``;let n=e-Date.now(),{value:r,unit:i}=Me(n);if(t)return i===`second`&&n<=0?s(`common.justNow`):new Intl.RelativeTimeFormat(l.getLocale(),{numeric:`always`,style:`narrow`}).format(n<=0?-r:r,i);if(l.getLocale().toLowerCase().startsWith(`en`)){let e={second:`s`,minute:`m`,hour:`h`,day:`d`,week:`w`,month:`mo`,year:`y`}[i];if(e)return`${r}${e}`}return new Intl.NumberFormat(l.getLocale(),{style:`unit`,unit:i,unitDisplay:`short`,maximumFractionDigits:0}).format(r)}function Ne(e,t){let n=e.createdActor,r=n?.label?.trim()||n?.id?.trim(),i=new Set,a=0,o=(e.expandedParticipants??e.participants??[]).filter(e=>{let r=JSON.stringify(e.identity);return!i.has(r)&&(i.add(r),!Oe(e,n,t)||(a+=1,!1))}),s=Math.max(o.length,(e.participantCount??0)-a);if(n&&r)return{creator:n,primaryIdentity:n.identity,primaryLabel:r,participants:o,otherCount:s};let c=o[0];if(c)return{primaryIdentity:c.identity,primaryLabel:N(c),participants:o,otherCount:Math.max(0,s-1)}}function Pe(e,t,n){let r=Math.max(0,t-e.length);return b`<div
    slot="content"
    class="session-hovercard__participant-menu"
    role="list"
    style="min-width: 150px; max-height: min(280px, 60vh); overflow-y: auto;"
    aria-label=${s(`sessionHovercard.moreParticipantsLabel`,{count:String(t)})}
  >
    ${e.map(e=>{let t=N(e),r=e.identity.type===`profile`?M(e.identity.id,n,t):null;return b`<div role="listitem">
        ${A(t,r,`session-menu__item learn-more-link session-hovercard__participant-link`)}
      </div>`})}
    ${r>0?b`<div class="session-hovercard__more" role="listitem">
            ${s(`sessionHovercard.moreParticipantsLabel`,{count:String(r)})}
          </div>`:g}
  </div>`}function Fe({row:e,selfUserId:t,avatarAuth:n,personActivity:r}){if(!e)return g;let i=Ne(e,t);if(!i)return g;let{creator:a,primaryIdentity:o,primaryLabel:c,participants:l,otherCount:u}=i,d=a?void 0:l[0],f=o?.type===`profile`?M(o.id,r,c):null,p=a?j(a):``,m=p?b`<span class="session-hovercard__creator-avatar-fallback" aria-hidden="true"
        >${p}</span
      >`:g;a&&e.channelAvatarUrl&&ke();let h=a?e.channelAvatarUrl?b`<openclaw-channel-avatar
          class="session-hovercard__creator-avatar"
          .routeUrl=${e.channelAvatarUrl}
          .authTokens=${n?.authTokens??[]}
          .authReady=${n?.authReady??!1}
          .fallback=${m}
          aria-hidden="true"
        ></openclaw-channel-avatar>`:b`<openclaw-viewer-avatar
          class="session-hovercard__creator-avatar"
          .user=${{id:a.id,name:a.label,avatarUrl:a.avatarUrl,watchedSessions:[]}}
          .markAsViewer=${!1}
          .identity=${a.identity}
          variant="session"
          aria-hidden="true"
        ></openclaw-viewer-avatar>`:d?b`<openclaw-viewer-avatar
          class="session-hovercard__creator-avatar"
          .user=${{id:d.identity.id,name:d.label,avatarUrl:d.avatarUrl,watchedSessions:[]}}
          .markAsViewer=${!1}
          .identity=${d.identity}
          variant="session"
          aria-hidden="true"
        ></openclaw-viewer-avatar>`:g,_=a?l:l.slice(1),v=[c,u>0?s(`sessionHovercard.moreParticipantsLabel`,{count:String(u)}):``].filter(Boolean).join(`, `),y=u>0?s(u===1?`sessionHovercard.attributionOther`:`sessionHovercard.attributionOthers`,{count:String(u)}):``;return b`<div class="session-hovercard__attribution" aria-label=${v}>
    <span class="session-hovercard__attribution-copy">
      ${A(c,f,`session-hovercard__attribution-name`)}
      ${u>0?_.length>0?b`<openclaw-tooltip
                class="session-hovercard__participants-tooltip"
                .describe=${!1}
                open-on-click
              >
                <button
                  type="button"
                  class="session-hovercard__attribution-others"
                  style="padding: 1px 3px; border: 0; border-radius: var(--radius-sm); background: transparent; font: inherit;"
                  aria-label=${s(`sessionHovercard.moreParticipantsLabel`,{count:String(u)})}
                >
                  ${y}
                </button>
                ${Pe(_,u,r)}
              </openclaw-tooltip>`:b`<span class="session-hovercard__attribution-others">${y}</span>`:g}
    </span>
    <span class="session-hovercard__attribution-avatars">
      ${D(h,f)}
      ${_.length>0?b`<openclaw-viewer-facepile
              .staticParticipants=${_}
              .totalCount=${u}
              .maxVisible=${Math.min(_.length,L)}
              .personActivity=${r}
            ></openclaw-viewer-facepile>`:g}
    </span>
  </div>`}function Ie(e){let t=e.row,n=typeof t.createdAt==`number`&&Number.isFinite(t.createdAt),r=n?I(t.createdAt,!0):``,i=n?I(t.createdAt,!1):``;return b`<header class="session-hovercard__header">
    <span class="session-hovercard__heading">
      <span class="session-hovercard__title">${ve(t.color)}${t.label}</span>
      ${Fe(e)}
    </span>
    ${i?b`<span class="session-hovercard__created-age" title=${r}>${i}</span>`:g}
  </header>`}function Le(e){if(!e)return g;let t=s(e.status===`in_progress`?`sessionProgressCard.status.inProgress`:e.status===`paused`?`sessionProgressCard.status.paused`:`sessionProgressCard.status.pending`);return b`<div
    class="session-hovercard__context-row session-hovercard__plan-row"
    aria-label=${s(`sessionProgressCard.stepLabel`,{status:t,step:e.step})}
    title=${e.step}
  >
    <span class="session-hovercard__context-icon" aria-hidden="true"
      >${e.status===`in_progress`?b`<span class="session-run-spinner"></span>`:x.clock}</span
    >
    <span class="session-hovercard__context-value session-hovercard__plan-step"
      >${e.step}</span
    >
    <span class="session-hovercard__plan-count">${e.completed}/${e.total}</span>
  </div>`}function Re({row:e,automationLink:t},n){let r=e?.workContext,i=e?.placementProviderId&&e.placementProfileId?{label:`${e.placementProviderId} · ${e.placementProfileId}`,title:s(`sessionHovercard.runsOn`,{providerId:e.placementProviderId,profileId:e.placementProfileId})}:void 0,a=he(e?.placementMachine),o=a.filter(Boolean).join(` · `);return b`<div class="session-hovercard__context">
    ${r?b`<div
            class="session-hovercard__context-row"
            aria-label=${`${s(r.kind===`project`?`sessionHovercard.projectLabel`:`sessionHovercard.workspaceLabel`)}: ${r.name}`}
            title=${`${s(r.kind===`project`?`sessionHovercard.projectLabel`:`sessionHovercard.workspaceLabel`)}: ${r.path}`}
          >
            <span class="session-hovercard__context-icon" aria-hidden="true">${x.folder}</span>
            <span
              class="session-hovercard__context-value session-hovercard__context-text"
              title=${r.path}
              >${r.name}</span
            >
          </div>`:g}
    ${i?b`<div
            class="session-hovercard__context-row"
            aria-label=${i.title}
            title=${i.title}
          >
            <span class="session-hovercard__context-icon" aria-hidden="true">${x.server}</span>
            <span class="session-hovercard__context-value session-hovercard__context-text"
              >${i.label}</span
            >
          </div>`:g}
    ${i&&o?b`<div
            class="session-hovercard__machine"
            aria-label=${`${s(`sessionHovercard.machineLabel`)}: ${o}`}
          >
            ${a.map((e,t)=>e?b`<span class=${t===1?`session-hovercard__machine-class`:g}
                    >${e}</span
                  >`:g)}
          </div>`:g}
    ${e?.boardFace===`dashboard`?b`<div
            class="session-hovercard__context-row"
            aria-label=${s(`sessionsView.opensAsDashboard`)}
          >
            <span class="session-hovercard__context-icon" aria-hidden="true"
              >${x.layoutDashboard}</span
            >
            <span class="session-hovercard__context-value session-hovercard__context-text"
              >${s(`sessionsView.opensAsDashboard`)}</span
            >
          </div>`:g}
    ${e?.hasAutomation&&t?b`<a
            class="session-hovercard__context-row session-hovercard__automation-link"
            href=${t.href}
            @click=${e=>{c(e)&&(e.preventDefault(),t.navigate())}}
          >
            <span class="session-hovercard__context-icon" aria-hidden="true">${x.clock}</span>
            <span class="session-hovercard__context-value session-hovercard__context-text"
              >${s(`sessionsView.automationAttached`)}</span
            >
            <span class="session-hovercard__context-icon" aria-hidden="true"
              >${x.chevronRight}</span
            >
          </a>`:g}
    ${Le(n)}
  </div>`}function ze(e){return e?.markdown?.trim()?b`<section
    class="session-hovercard__section session-hovercard__notepad"
    aria-label=${s(`sessionHovercard.agentNotepad`)}
  >
    <div class="session-hovercard__notepad-title">${s(`sessionHovercard.agentNotepad`)}</div>
    ${_e(e.markdown,{promoteProgress:!0})}
  </section>`:g}function Be(e){let t=P(e.state),n=e.checks?Ae(e.checks):null,r=[e.title,n,e.additions===void 0?null:`+${e.additions.toLocaleString()}`,e.deletions===void 0?null:`−${e.deletions.toLocaleString()}`].filter(e=>!!e);return b`<a
    class="session-hovercard__pr-row"
    data-state=${e.state}
    href=${e.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label=${`${s(`sessionHovercard.pullRequestLabel`,{number:String(e.number),state:t})}${r.length>0?`, ${r.join(`, `)}`:``}`}
  >
    <span
      class="session-hovercard__pr-state-icon"
      role="img"
      data-checks=${e.checks?.state??g}
      aria-label=${n?`${t} · ${n}`:t}
      title=${n?`${t} · ${n}`:t}
      >${je(e.state)}</span
    >
    <span class="session-hovercard__pr-title">${e.title}</span>
    ${F(e)}
  </a>`}function Ve(e){if(!e)return g;if(e.pullRequests.length>0){let t=e.pullRequests.slice(0,1),n=e.pullRequests.length-t.length;return b`<div class="session-hovercard__pr-list">
      ${t.map(Be)}
      ${n>0?b`<span class="session-hovercard__more"
              >${s(`sessionHovercard.more`,{count:String(n)})}</span
            >`:g}
    </div>`}let t=e.branch;if(!t)return g;let n=s(`chat.pullRequests.createPr`),r=s(`chat.pullRequests.createPrLabel`,{branch:t.branch});return b`<div class="session-hovercard__branch-row">
    <span class="session-hovercard__branch-icon" aria-hidden="true">${x.gitBranch}</span>
    ${t.createUrl?b`<a
            class="session-hovercard__branch-action"
            href=${t.createUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label=${r}
            title=${r}
            >${n}</a
          >`:b`<span class="session-hovercard__branch-label">${s(`chat.sessionDiff.title`)}</span>`}
    ${F(t)}
  </div>`}function He(e){let t=O(e.progressCard,e.row?.status,e.row?.startedAt,e.row?.hasActiveRun??!1),n=!!(e.pullRequests&&(e.pullRequests.pullRequests.length>0||e.pullRequests.branch)),r=!!(e.row?.workContext||e.row?.placementProviderId&&e.row.placementProfileId||e.row?.boardFace===`dashboard`||e.row?.hasAutomation&&e.automationLink||t),i=e.progressCard?void 0:e.row?.lastMessagePreview?.trim()||void 0;return!e.row&&!n&&!e.progressCard?g:b`<div class="session-hovercard">
    ${e.row?b`<section class="session-hovercard__section session-hovercard__section--header">
            ${Ie(e)}
          </section>`:g}
    ${r?b`<section class="session-hovercard__section session-hovercard__section--metadata">
            ${Re(e,t)}
          </section>`:g}
    ${n?b`<section class="session-hovercard__section session-hovercard__section--prs">
            ${Ve(e.pullRequests)}
          </section>`:g}
    ${i?b`<section class="session-hovercard__section session-hovercard__section--optional">
            <div class="session-hovercard__excerpt">${i}</div>
          </section>`:g}
    ${ze(e.progressCard)}
  </div>`}var L,Ue;function R(){return(R=e((()=>{o(),_(),d(),ee(),k(),me(),pe(),xe(),ue(),se(),Se(),r(),L=4})))()}function We(e){if(!t(e)||e.status!==`ok`)throw Error(`Session title unavailable`);let r=n(e.sessionKey),i=n(e.agentId);if(!r||!i)throw Error(`Session title response was incomplete`);return{sessionKey:r,agentId:i,namespace:`chat`,title:n(e.title)??n(e.derivedTitle)}}var z,B,V,H,U;function W(){return(W=e((()=>{te(),u(),Ce(),ye(),z=`a.markdown-session-link, [data-session-href]`,B=3e5,V=3e4,H=100,U=class{constructor(e){this.host=e,this.client=null,this.context=null,this.cache=new Map,this.observer=new MutationObserver(e=>{for(let t of e.flatMap(e=>[...e.addedNodes]))t instanceof HTMLElement&&this.refresh(t)})}connect(){this.observer.observe(this.host,{childList:!0,subtree:!0}),this.refresh()}refresh(e=this.host){e.matches(z)&&this.decorate(e);for(let t of e.querySelectorAll(z))this.decorate(t)}disconnect(){this.observer.disconnect()}async decorate(e,t=!1){let n=this.targetForAnchor(e),r=e instanceof HTMLAnchorElement?e:document.createElement(`a`);if(e!==r&&e.classList.contains(`markdown-session-link`)&&(r.dataset.sessionHref=e.dataset.sessionHref,r.setAttribute(`href`,e.getAttribute(`href`)??``),r.className=`markdown-session-link`,e.classList.remove(`markdown-session-link`),e.removeAttribute(`href`),e.removeAttribute(`data-session-href`),e.replaceWith(r),r.append(e)),!n)return;let i=this.cachedOrSeededEntry(n);if(this.stampAnchor(r,n,i?.value),t&&!i?.value)try{this.stampAnchor(r,n,await this.loadTitle(n))}catch{}}mainKey(){return h({agentsList:this.context?.agents.state.agentsList,hello:this.context?.gateway.snapshot.hello})}targetForAnchor(e){let t=e.dataset.sessionKey?.trim();if(t&&!e.dataset.sessionHref){let e=f(t);return e?{sessionKey:t,agentId:e.agentId,namespace:`chat`}:null}let n=ge(e.dataset.sessionHref??e.getAttribute(`href`)??``,{basePath:this.context?.basePath,mainKey:this.mainKey(),publicOrigin:be(this.context)});if(!n)return null;e.setAttribute(`href`,`${n.url.pathname}${n.url.search}${n.url.hash}`),e.classList.add(`markdown-session-link`),e.removeAttribute(`target`),e.removeAttribute(`rel`),e.removeAttribute(`data-session-key`);let r=we(this.context?.sessions.state.result?.sessions??[],n.target,this.mainKey());return r?{sessionKey:r.key,agentId:n.target.agentId,namespace:n.target.namespace}:null}setCacheEntry(e,t){this.cache.delete(e),this.cache.set(e,t);for(let e of this.cache.keys()){if(this.cache.size<=H)break;this.cache.delete(e)}}cachedOrSeededEntry(e){let t=Date.now(),n=this.cache.get(e.sessionKey);if(n&&n.expiresAt>t)return this.setCacheEntry(e.sessionKey,n),n;this.cache.delete(e.sessionKey);let r=this.context?.sessions.state.result?.sessions.find(t=>p(t.key,e.sessionKey));if(!r)return;let i={...e,sessionKey:r.key,agentId:r.agentId??f(r.key)?.agentId??e.agentId,title:r.displayName??r.derivedTitle},a={expiresAt:t+B,promise:Promise.resolve(i),value:i};return this.setCacheEntry(e.sessionKey,a),a}loadTitle(e){let t=this.cachedOrSeededEntry(e);if(t)return t.promise;let n={expiresAt:Date.now()+B,promise:Promise.resolve().then(async()=>{if(!this.client)throw Error(`Session title requires a connected Gateway`);return{...We(await this.client.request(`controlUi.sessionPreview`,{sessionKey:e.sessionKey})),namespace:e.namespace}})};return n.promise=n.promise.then(e=>(n.value=e,e),e=>{throw n.expiresAt=Date.now()+V,e}),this.setCacheEntry(e.sessionKey,n),n.promise}stampAnchor(e,t,n){let r=n?.title,i=ne(t.namespace,t.agentId,t.sessionKey,this.context?.basePath,{displayName:r,exactKey:!0,mainKey:this.mainKey()});if(e.dataset.sessionKey=t.sessionKey,e.classList.add(`markdown-session-link`),!e.dataset.sessionHref&&i&&e.getAttribute(`href`)!==i&&e.setAttribute(`href`,i),!r||e.classList.contains(`markdown-session-link--titled`))return;e.classList.add(`markdown-session-link--titled`);let a=e.querySelector(`:scope > .session-label`)??document.createElement(`span`);a.className=`session-label`,a.textContent=r,e.replaceChildren(a),e.title=t.sessionKey}}})))()}function G(e){return e.querySelector(`[data-session-menu][aria-expanded="true"], [data-catalog-session-menu][aria-expanded="true"]`)!==null}var K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{_(),ae(),oe(),d(),ce(),C(),u(),k(),Ee(),R(),W(),fe(),K=450,q=80,J=300,Y=100,X=100,Z=0,Q=class extends y{constructor(...e){super(...e),this.applicationClient=null,this.applicationContext=null,this.applicationGateway=null,this.progressCards=null,this.stopProgressCardUpdates=null,this.stopContextUpdates=null,this.pullRequests=null,this.stopPullRequestUpdates=null,this.activeTarget=null,this.activeTrigger=null,this.activeSession=null,this.open=!1,this.delayed=!0,this.animateNextOpen=!0,this.skipDelayTimer=null,this.lastProgressCard=null,this.hovercard=new De(()=>this.close(!0),Y,()=>this.close()),this.sessionLinkTitler=new U(this),this.loadGeneration=0,this.activeTargetObserver=new MutationObserver(()=>{if(this.activeTarget&&(!this.contains(this.activeTarget)||G(this))){this.close();return}this.open&&this.showCurrent()}),this.handleProgressCardUpdate=()=>{let e=this.activeSession;if(!e||!this.open||!this.hovercard.held)return;let t=this.progressCards?.get(e);t!==void 0&&(this.lastProgressCard=t),this.showCurrent()},this.handleSessionUpdate=()=>{this.sessionLinkTitler.refresh(),this.open&&this.hovercard.held&&this.showCurrent()},this.handlePullRequestUpdate=()=>{this.open&&this.hovercard.held&&this.showCurrent()},this.handlePointerOver=e=>{if(e.pointerType===`touch`||!globalThis.matchMedia?.(`(hover: hover)`).matches)return;let t=w(e);if(!t||G(this))return;let n=this.delayed;this.activate(t,t,n?K:q,n),this.hovercard.pointerInside=!0},this.handlePointerOut=e=>{let t=w(e);t&&t===this.activeTarget&&(e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||this.hovercard.schedulePointerExit())},this.handleFocusIn=e=>{if(this.hovercard.restoringFocus)return;let t=w(e),n=e.target instanceof HTMLElement?e.target:null,r=t?.matches(`.sidebar-recent-session`)?n?.closest(`a.sidebar-recent-session__link`):n;t&&r&&!G(this)&&(this.activate(t,r,0,!1),this.hovercard.focusInside=!0)},this.handleFocusOut=e=>{this.activeTarget&&(e.relatedTarget instanceof Node&&this.activeTarget.contains(e.relatedTarget)||(this.hovercard.focusInside=!1,this.hovercard.scheduleClose()))},this.handleClick=e=>{w(e)&&this.close()},this.handleSessionMenuOpen=()=>{this.close()},this.handleCardPointerLeave=()=>{this.hovercard.pointerOverCard=!1,this.hovercard.scheduleClose()}}static{this.properties={client:{attribute:!1,noAccessor:!0},context:{attribute:!1,noAccessor:!0},gateway:{attribute:!1,noAccessor:!0}}}get activeArtifactKey(){return this.activeSession?m(this.activeSession.sessionKey,this.activeSession.agentId):null}get client(){return this.applicationClient}set client(e){this.applicationClient=e,this.sessionLinkTitler.client=e}get context(){return this.applicationContext}set context(e){this.stopContextUpdates?.(),this.stopContextUpdates=null,this.applicationContext=e,this.sessionLinkTitler.context=e,this.isConnected&&(this.sessionLinkTitler.refresh(),this.connectStore())}get gateway(){return this.applicationGateway}set gateway(e){e!==this.applicationGateway&&(this.disconnectStore(),this.applicationGateway=e,this.close(),this.isConnected&&this.connectStore())}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.style.display=`contents`,this.addEventListener(`pointerover`,this.handlePointerOver),this.addEventListener(`pointerout`,this.handlePointerOut),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut),this.addEventListener(`keydown`,this.hovercard.handleTriggerKeyDown),this.addEventListener(`click`,this.handleClick),this.addEventListener(T,this.handleSessionMenuOpen),this.sessionLinkTitler.connect(),this.connectStore()}disconnectedCallback(){this.removeEventListener(`pointerover`,this.handlePointerOver),this.removeEventListener(`pointerout`,this.handlePointerOut),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.removeEventListener(`keydown`,this.hovercard.handleTriggerKeyDown),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(T,this.handleSessionMenuOpen),this.sessionLinkTitler.disconnect(),this.disconnectStore(),this.close(),this.clearSkipDelayTimer(),super.disconnectedCallback()}connectStore(){if(this.applicationContext&&!this.stopContextUpdates){let e=this.applicationContext.sessions.subscribe(this.handleSessionUpdate),t=this.applicationContext.agentSelection.subscribe(()=>this.close());this.stopContextUpdates=()=>{e(),t()}}this.applicationGateway&&!this.progressCards&&(this.progressCards=S(this.applicationGateway),this.stopProgressCardUpdates=this.progressCards.subscribe(this.handleProgressCardUpdate))}disconnectStore(){this.progressCards?.unwatch(this),this.stopProgressCardUpdates?.(),this.stopProgressCardUpdates=null,this.stopContextUpdates?.(),this.stopContextUpdates=null,this.progressCards=null,this.releasePullRequestStore()}activate(e,t,n,r){let i=e.dataset.sessionKey;if(!i)return;let a=f(i)?.agentId??e.closest(`openclaw-app-sidebar`)?.expandedAgentId();if(!a)return;let o=m(i,a);if(e===this.activeTarget&&i===this.activeSession?.sessionKey&&o===this.activeArtifactKey){if(t!==this.activeTrigger){if(this.hovercard.reset(),this.activeTrigger=t,this.hovercard.markTrigger(t),this.open)this.showCurrent();else{this.animateNextOpen=r;let e=++this.loadGeneration;this.hovercard.scheduleOpen(n,()=>void this.loadAndShow(i,e))}}return}this.close(n>0),this.activeTarget=e,this.activeTrigger=t,this.activeSession={sessionKey:i,agentId:a},this.open=!1,this.animateNextOpen=r,this.lastProgressCard=null,this.progressCards?.watch(this,[this.activeSession]),this.hovercard.markTrigger(t),this.activeTargetObserver.observe(this,{attributes:!0,attributeFilter:[`aria-expanded`],childList:!0,subtree:!0});let s=++this.loadGeneration;this.hovercard.scheduleOpen(n,()=>void this.loadAndShow(i,s))}async loadAndShow(e,t){let n=this.activeTarget,r=this.activeArtifactKey,i=this.activeSession;if(n instanceof HTMLAnchorElement&&n.dataset.sessionKey===e&&this.sessionLinkTitler.decorate(n,!0),t===this.loadGeneration&&i?.sessionKey===e&&r&&i&&n&&!G(this)&&this.hovercard.held){this.open=!0,this.delayed=!1,this.clearSkipDelayTimer(),this.watchPullRequests(r),this.showCurrent();try{await this.progressCards?.load(i)}catch{}t===this.loadGeneration&&this.activeSession?.sessionKey===e&&this.hovercard.held&&this.showCurrent()}}watchPullRequests(e){let t=this.applicationGateway;t&&(this.releasePullRequestStore(),this.pullRequests=le(t),this.stopPullRequestUpdates=this.pullRequests.subscribe(this.handlePullRequestUpdate),this.pullRequests.watch(this,[e],{foreground:!0}))}releasePullRequestStore(){this.pullRequests?.unwatch(this),this.stopPullRequestUpdates?.(),this.stopPullRequestUpdates=null,this.pullRequests=null}showCurrent(){let e=this.activeTarget,t=this.activeSession,n=t?.sessionKey,r=this.activeArtifactKey;if(!e||!t||!n||!r||!this.open)return;let i=this.querySelector(`openclaw-app-sidebar`)?.findSidebarHovercardRowByKey(n),a=this.pullRequests?.get(r),o=this.progressCards?.get(t);o!==void 0&&(this.lastProgressCard=o);let c=this.applicationGateway,l={authTokens:c?ie({hello:c.snapshot.hello,settings:{token:c.connection.token},password:c.connection.password}):[],authReady:!!(c&&(c.snapshot.hello||c.connection.token.trim()||c.connection.password.trim()))},u=JSON.stringify({progress:this.lastProgressCard?.revision??null,pullRequests:a?{branch:a.branch,pullRequests:a.pullRequests}:null,row:i?{label:i.label,boardFace:i.boardFace,hasAutomation:i.hasAutomation,hasActiveRun:i.hasActiveRun,channelAvatarUrl:i.channelAvatarUrl,lastMessagePreview:i.lastMessagePreview,createdActor:i.createdActor,participants:i.participants,expandedParticipants:i.expandedParticipants,participantCount:i.participantCount,workContext:i.workContext,createdAt:i.createdAt,startedAt:i.startedAt,updatedAt:i.updatedAt,status:i.status,endedAt:i.endedAt}:null});if(this.hovercard.card?.dataset.revision===u)return;let d=this.hovercard.card,f=d?.contains(document.activeElement)&&document.activeElement instanceof HTMLElement?document.activeElement:null,p=f?this.hovercard.focusables().indexOf(f):-1,m=f instanceof HTMLAnchorElement?f.href:null,h=!d&&this.animateNextOpen,_=d;if(_||(Z+=1,_=Te(`openclaw-session-progress-hovercard-${Z}`,`session-progress-hovercard`),this.animateNextOpen=!1,h?_.dataset.open=`false`:_.dataset.instant=`true`),_.dataset.revision=u,_.setAttribute(`aria-label`,s(`sessionHovercard.ariaLabel`)),v(He({row:i,selfUserId:this.applicationContext?.gateway.snapshot.selfUser?.id,avatarAuth:l,personActivity:this.personActivity(),automationLink:this.applicationContext?{href:`${re(`cron`,this.applicationContext.basePath)}?${new URLSearchParams({session:n,agent:t.agentId})}`,navigate:()=>{let e=this.applicationContext;this.close(),e?.navigate(`cron`,{search:`?${new URLSearchParams({session:n,agent:t.agentId})}`})}}:void 0,pullRequests:a,progressCard:this.lastProgressCard}),_),!_.firstElementChild){this.hovercard.clearCard(),this.hovercard.pointerOverCard=!1,this.hovercard.cardFocusInside=!1;return}if(d){if(f&&!_.contains(document.activeElement)){let e=this.hovercard.focusables(),t=(m?e.find(e=>e instanceof HTMLAnchorElement&&e.href===m):void 0)??e[p];t?t.focus({preventScroll:!0}):(this.hovercard.cardFocusInside=!1,this.hovercard.returnFocus(this.activeTrigger),this.hovercard.focusInside=document.activeElement===this.activeTrigger)}this.hovercard.position();return}_.addEventListener(`pointerleave`,this.handleCardPointerLeave),_.addEventListener(`keydown`,this.hovercard.handleCardKeyDown),this.hovercard.mount(e,_,de(e),!1,()=>v(g,_)),h&&(_.offsetWidth,window.setTimeout(()=>{this.hovercard.card===_&&this.open&&(_.dataset.open=`true`)},0))}personActivity(){let e=this.applicationContext;return e?E(e,()=>this.close()):void 0}close(e=!1){let t=this.open;this.hovercard.reset(e?X:0),this.loadGeneration+=1,this.open=!1,this.animateNextOpen=!0,this.lastProgressCard=null,this.activeTargetObserver.disconnect(),this.progressCards?.unwatch(this),this.releasePullRequestStore(),this.activeTarget=null,this.activeTrigger=null,this.activeSession=null,t&&(this.clearSkipDelayTimer(),this.skipDelayTimer=window.setTimeout(()=>{this.skipDelayTimer=null,this.delayed=!0},J))}clearSkipDelayTimer(){this.skipDelayTimer!==null&&(window.clearTimeout(this.skipDelayTimer),this.skipDelayTimer=null)}}})))()}$();export{Q as SessionProgressHovercardProvider};
//# sourceMappingURL=session-progress-hovercard.runtime-BEfDEbci.js.map