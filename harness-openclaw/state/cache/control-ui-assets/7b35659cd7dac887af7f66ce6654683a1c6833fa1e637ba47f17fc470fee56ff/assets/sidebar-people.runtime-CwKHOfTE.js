import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{wa as t}from"./control-ui-foundation-DaCuy7E_.js";import{$s as n,Al as r,Bi as i,F as a,Gi as o,Js as s,Mc as c,Ol as l,Pc as u,Rc as d,Tl as f,Uc as p,Yc as m,Zs as h,qc as g}from"./control-ui-core-CndkyZ8m.js";import{$ as _,Q as v,T as ee,c as te,et as y,nt as b,s as x,w as S}from"./lit-runtime-CIjzngcy.js";import{Di as C,Ei as w,Ln as ne,Rn as re,ct as ie,ln as ae,lt as oe,un as se,zn as ce}from"./control-ui-core-C5mtYcym.js";import{Ai as T,Lr as E,Mi as D,Rr as O,_o as k,bo as A,fo as j,ho as M,mo as N,xo as P}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Br as F,ci as I,di as L,li as R,ui as z}from"./control-ui-boot-shared-DpHhsTHW.js";import{K as B}from"./control-ui-boot-shared-DPto3YH7.js";import{v as V,y as H}from"./control-ui-boot-new-CQMzhCGu.js";import{n as U,r as W,t as le}from"./portaled-hovercard-DgysjroY.js";function G(e){let t=[{agentId:e.sessionsAgentId,result:e.sessionsResult},...Object.entries(e.sessionResultsByAgent).map(([e,t])=>({agentId:e,result:t}))].flatMap(({agentId:e,result:t})=>e?(t?.sessions??[]).map(t=>({row:t,agentId:p(t.key)?.agentId??t.agentId??e})):[]),n=Object.entries(e.childSessionRowsByParent).flatMap(([t,n])=>{let r=p(t)?.agentId??e.sessionsAgentId;return r&&e.loadedChildSessionKeys.has(t)?n.map(e=>({row:e,agentId:p(e.key)?.agentId??e.agentId??r})):[]});return[...t,...n]}function K(e,n,r){let i=p(e)?.agentId??t(n);return`${i}\u0000${c({agentsList:{defaultId:i,mainKey:r.mainKey,scope:r.globalScope?`global`:`agent`}},p(e)||e.toLowerCase()===`global`?e:`agent:${i}:${e}`)}`}function q(e,t){let n=e.filter(e=>e!==void 0);return n.length?t===`first`?Math.min(...n):Math.max(...n):void 0}function J(e,t=`compact`){let n=new Date(e);return b`<time
    datetime=${n.toISOString()}
    title=${n.toLocaleString(l.getLocale())}
    aria-label=${t===`minute-compact`?_:n.toLocaleString(l.getLocale())}
    ><openclaw-elapsed-time
      .startMs=${e}
      .minimumUnit=${t===`minute-compact`?`minute`:`second`}
      .singleUnit=${t===`single-unit`}
    ></openclaw-elapsed-time
  ></time>`}function ue(e){return[...new Set((e.entries??[]).map(e=>{let t=e.deviceFamily?.trim(),n=V(e.platform??``,t),i=t===`Mac`?`macOS`:t===`iPad`?`iPadOS`:t,a=E({id:e.clientId,mode:e.mode}),o=a?r(`presence.card.${a}`):void 0;return[...new Set([t,n.label===i?void 0:n.label,n.architecture,o].map(e=>e?.trim()).filter(Boolean))].join(` · `)}).filter(Boolean))].toSorted()}function Y(e,t,i){if(!i&&e.length===0)return _;let s=r(i?`presence.card.recentSessions`:`presence.card.viewingNow`);return b`<section class="person-activity-card__section">
    <h3>${s}</h3>
    ${e.length?b`<div class="person-activity-card__sessions">
            ${te(e.slice(0,3),({row:e,agentId:n})=>K(e.key,n,t),({row:e,agentId:r})=>{let s=o(e.key,e),c=i?P(s,`person-activity-card__session-name`,{delay:250,speed:80}):b`<span
                      class="person-activity-card__session-name person-activity-card__session-name--multiline"
                      >${s}</span
                    >`,l=n({face:h(e),sessionKey:e.key,fallbackAgentId:r,basePath:t.routing.basePath,row:e,mainKey:t.mainKey});return b`<a
                  class="person-activity-card__session session-row-host"
                  href=${l.href}
                  @click=${n=>{a(n)&&(n.preventDefault(),t.openSession(e,r))}}
                  ><span class="person-activity-card__session-icon" aria-hidden="true"
                    >${w.messageSquare}</span
                  >
                  <span class="person-activity-card__session-copy"
                    >${i?ee(s,c):c}
                    ${e.updatedAt==null?_:b`<span class="person-activity-card__session-age"
                            >${J(e.updatedAt,`single-unit`)}</span
                          >`}</span
                  >
                </a>`})}
          </div>`:b`<p class="person-activity-card__muted">
            ${r(i?`presence.card.noRecentSessions`:`presence.card.noVisibleSessions`)}
          </p>`}
  </section>`}function de(e){let{user:t}=e,n=M(t,r(`presence.card.person`)),i=(t.entries?.length??0)===0,a=t.entries??[],o=q(a.map(e=>e.onlineSince),`first`),s=q(a.map(e=>e.lastActivityAt),`last`),c=ue(t),l=[...new Set(a.flatMap(e=>e.timeZone?.trim()?[e.timeZone.trim()]:[]))].toSorted(),u=new Set(t.watchedSessions.map(t=>K(t,e.watchAgentId,e))),d=new Map;for(let t of G(e.sessionData)){let n=K(t.row.key,t.agentId,e);d.has(n)||d.set(n,t)}let f=[...d.values()].toSorted((t,n)=>(n.row.updatedAt??0)-(t.row.updatedAt??0)||K(t.row.key,t.agentId,e).localeCompare(K(n.row.key,n.agentId,e))),p=f.filter(({row:t,agentId:n})=>u.has(K(t.key,n,e))),m=f.filter(({row:n,agentId:r})=>!u.has(K(n.key,r,e))&&[n.owner?.actor,n.createdActor].some(e=>N(t,e?.identity))),h=z(t.identity?.id,e.routing,n.name);return b`<div class="person-activity-card">
    <header class="person-activity-card__header">
      <openclaw-viewer-avatar
        .user=${t}
        .markAsViewer=${!1}
        variant="footer"
        aria-hidden="true"
      ></openclaw-viewer-avatar>
      <div>
        <h2>${n.name}</h2>
        <span
          class="person-activity-card__status ${i?`person-activity-card__status--offline`:``}"
          ><span aria-hidden="true"></span>${i?r(`presence.offline`):o===void 0?r(`presence.rosterTitle`):b`${r(`presence.card.onlineFor`)} ${J(o,`minute-compact`)}`}</span
        >
      </div>
    </header>
    ${n.isSharedOwner?b`<p class="person-activity-card__hint person-activity-card__muted">${r(`presence.sharedOwner.hint`)}</p>`:_}
    ${i?_:b`<dl class="person-activity-card__facts">
            ${c.length||l.length?b`<div>
                    <dt>${r(`presence.card.where`)}</dt>
                    <dd>
                      ${c.map(e=>b`<span>${e}</span>`)}${l.map(e=>b`<small>${r(`presence.card.reportedTimeZone`,{zone:e})}</small>`)}
                    </dd>
                  </div>`:_}
            <div>
              <dt>${r(`presence.card.lastActivity`)}</dt>
              <dd>
                ${s===void 0?r(`presence.card.notObserved`):b`<span>${J(s)} ${r(`presence.card.ago`)}</span>`}
              </dd>
            </div>
          </dl>`}
    ${Y(p,e,!1)}${Y(m,e,!0)}
    ${h?b`<footer>
            <a href=${h.href} @click=${h.open}
              >${r(`presence.card.viewActivity`)}<span aria-hidden="true"
                >${w.chevronRight}</span
              ></a
            >
          </footer>`:_}
  </div>`}function X(){return(X=e((()=>{v(),S(),x(),f(),O(),A(),H(),j(),i(),s(),u(),C(),R(),F(),I()})))()}var Z,Q;function $(){return($=e((()=>{v(),ae(),f(),j(),T(),s(),u(),re(),X(),R(),W(),Z=0,Q=class{constructor(e){this.host=e,this.active=null,this.portal=new le(()=>this.close(),100),this.observer=new MutationObserver(()=>this.sync()),this.lastOpenAt=-1/0,this.outsideInteraction=e=>{e.target instanceof Node&&!this.active?.row.contains(e.target)&&!this.portal.card?.contains(e.target)&&this.close()},this.outsideKey=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),this.portal.card?.contains(document.activeElement)&&this.returnFocus(),this.close())},this.stopLocale=l.subscribe(()=>this.sync())}scope(){return JSON.stringify([this.host.activeRouteId,this.host.sessionKey,this.host.sessionDataContext?.gateway.connectionRevision])}handleEvent(e,t){let n=e.target instanceof Element?e.target.closest(`[data-person-card]`):null;if(e.type===`keydown`&&e instanceof KeyboardEvent){e.key===`Tab`&&this.portal.handleTriggerKeyDown(e);return}if(n&&(t===void 0||e.type===`click`||ne(n,e.type===`focusin`?`focus`:`pointer`,!0))){if(e.type===`click`){if(this.active?.row===n&&this.portal.explicitHold){this.close();return}this.activate(n,0),this.portal.explicitHold=!0,this.show()}else if(e.type===`pointerover`&&e instanceof PointerEvent){if(e.pointerType===`touch`||!globalThis.matchMedia?.(`(hover: hover)`).matches||this.portal.explicitHold&&this.active?.row!==n)return;let r=this.portal.card||performance.now()-this.lastOpenAt<300?80:450;this.activate(n,ce(t??performance.now(),r)),this.portal.pointerInside=!0,this.portal.clearClose()}else if(e.type===`pointerout`&&e instanceof PointerEvent&&this.active?.row===n){if(e.relatedTarget instanceof Node&&n.contains(e.relatedTarget))return;this.portal.schedulePointerExit()}else if(e.type===`focusin`&&!this.portal.restoringFocus)this.activate(n,0),this.portal.focusInside=!0,this.portal.clearClose(),this.show();else if(e.type===`focusout`&&e instanceof FocusEvent&&this.active?.row===n){if(e.relatedTarget instanceof Node&&n.contains(e.relatedTarget))return;this.portal.focusInside=!1,this.portal.scheduleClose()}}}activate(e,t){let n=e.querySelector(`[data-person-card-trigger]`)??e,r=n.dataset.personCardKey;if(!r||!this.host.connected||this.active?.id===r&&this.active.row===e)return;this.close();let i=this.host.sessionDataContext?.gateway;i&&i.snapshot.phase===`connected`&&(this.active={id:r,row:e,trigger:n,scope:this.scope(),gateway:i,client:i.snapshot.client},this.portal.markTrigger(n),this.observer.observe(this.host,{childList:!0,subtree:!0}),document.addEventListener(`pointerdown`,this.outsideInteraction,!0),document.addEventListener(`focusin`,this.outsideInteraction,!0),document.addEventListener(`keydown`,this.outsideKey,!0),this.portal.scheduleOpen(t,()=>{this.portal.held&&this.show()}))}isCurrent(){let e=this.active,t=this.host.sessionDataContext?.gateway;return!!(e&&this.host.isConnected&&this.host.connected&&t?.snapshot.phase===`connected`&&e.gateway===t&&e.client===t.snapshot.client&&e.scope===this.scope()&&this.host.contains(e.row)&&(e.row.dataset.personCardSection===void 0||!this.host.collapsedSessionSections.has(e.row.dataset.personCardSection)))}sync(){this.isCurrent()?this.portal.card&&this.show():this.close()}show(){let e=this.active,t=this.host.sessionDataContext;if(!e||!t||!this.isCurrent()){this.close();return}let i=this.host.sessionData,a=oe({snapshotUser:t.gateway.snapshot.selfUser,presenceEntries:ie(i.presencePayload),presenceInstanceId:i.presenceInstanceId}),o=k(i.presencePayload,a,i.presenceInstanceId).find(t=>B(t)===e.id);if(!o&&e.id.startsWith(`profile:`)){let t=e.id.slice(8),n=[i.sessionsResult,...Object.values(i.sessionResultsByAgent)].flatMap(e=>e?.sessions??[]).flatMap(e=>[e.owner?.actor,e.createdActor]).find(e=>e?.identity?.type===`profile`&&e.identity.id===t);n&&(o={id:t,identity:{type:`profile`,id:t},name:n.label,avatarUrl:n.avatarUrl,watchedSessions:[],entries:[]})}if(!o){this.close();return}let s={agentsList:t.agents.state.agentsList,hello:t.gateway.snapshot.hello},c=this.portal.card,l=c??U(`openclaw-person-activity-${++Z}`,`session-progress-hovercard person-activity-hovercard`),u=l.contains(document.activeElement)?document.activeElement:null,f=M(o,r(`presence.card.person`));if(l.setAttribute(`aria-label`,r(`presence.card.ariaLabel`,{name:f.name})),y(de({user:o,sessionData:i,watchAgentId:m(s),mainKey:g(s),globalScope:d(s),routing:L({basePath:this.host.basePath,navigate:(e,t)=>this.host.onNavigate?.(e,t)},()=>this.close()),openSession:(r,i)=>{let a=h(r),o=n({face:a,sessionKey:r.key,row:r,fallbackAgentId:i,basePath:this.host.basePath,mainKey:g(s)});this.close(),D(this.host,{face:a,sessionKey:r.key,commit:()=>this.host.sessionDataContext?.gateway!==e.gateway||t.gateway.snapshot.client!==e.client||t.gateway.snapshot.phase!==`connected`||e.scope!==this.scope()?!1:(this.host.prepareSessionNavigation(r.key,o.options.pathname),this.host.onNavigate?.(a,o.options),se({selection:t.agentSelection,gateway:t.gateway,sessionKey:r.key,agentId:i}),!0)})}}),l),c){if(u&&!l.contains(document.activeElement)){let e=u instanceof HTMLAnchorElement?this.portal.focusables().find(e=>e instanceof HTMLAnchorElement&&e.href===u.href):void 0;e?e.focus({preventScroll:!0}):this.returnFocus()}this.portal.position();return}this.lastOpenAt=performance.now(),l.addEventListener(`pointerleave`,()=>{this.portal.pointerOverCard=!1,this.portal.scheduleClose()}),l.addEventListener(`keydown`,e=>{let t=this.portal.focusables();e.key===`Tab`&&document.activeElement===(e.shiftKey?t[0]:t.at(-1))&&(e.preventDefault(),this.returnFocus(),this.close())}),this.portal.mount(e.row,l,`horizontal`,!0,()=>y(_,l))}returnFocus(){this.portal.returnFocus(this.active?.trigger??null),this.portal.focusInside=document.activeElement===this.active?.trigger}close(){this.portal.card&&(this.lastOpenAt=performance.now()),this.observer.disconnect(),document.removeEventListener(`pointerdown`,this.outsideInteraction,!0),document.removeEventListener(`focusin`,this.outsideInteraction,!0),document.removeEventListener(`keydown`,this.outsideKey,!0),this.portal.reset(),this.active?.trigger.setAttribute(`aria-haspopup`,`dialog`),this.active?.trigger.setAttribute(`aria-expanded`,`false`),this.active=null}dismiss(){let e=this.active!==null;return this.close(),e}dispose(){this.close(),this.stopLocale()}}})))()}$();export{Q as SidebarPeopleRuntime};
//# sourceMappingURL=sidebar-people.runtime-CwKHOfTE.js.map