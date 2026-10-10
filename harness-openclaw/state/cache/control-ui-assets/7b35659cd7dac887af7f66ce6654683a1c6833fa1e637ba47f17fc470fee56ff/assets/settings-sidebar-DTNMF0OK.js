import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$a as t,Ha as n,Kr as r,wa as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,F as o,Pc as s,Tl as c,U as l,V as u,cr as d,fc as f,mc as p,nr as m,pc as h}from"./control-ui-core-CndkyZ8m.js";import{$ as g,Q as _,at as ee,dt as te,nt as v,pt as ne}from"./lit-runtime-CIjzngcy.js";import{Da as re,Di as y,Ei as b,Oa as ie,Si as ae,_i as oe,ai as x,bi as se,di as S,fa as C,fi as ce,gi as w,ia as T,la as le,mi as E,ri as ue,si as D,vi as O,xi as k}from"./control-ui-core-C5mtYcym.js";import{Mi as de,Ni as A,Pi as j,_ as M}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as N,t as P}from"./en-settings-BjX72HeL.js";import{ct as F}from"./control-ui-boot-new-CQMzhCGu.js";import{a as I,o as L}from"./settings-targets-Bmbk6FUn.js";import{a as R,c as z,d as B,i as V,n as H,t as fe,u as pe}from"./config-form.tiers-B9iwCG2R.js";import{_ as me,h as he,i as ge,r as _e,s as ve,u as ye}from"./setup-schema-B74QMDZw.js";import"./settings-rVWcgEC0.js";function be(e,t){let n=a(e.labelKey),r=t?Object.entries(e.nativeSearchKeys??{}).filter(([,e])=>e(t)).map(([e])=>e):[];return{routeId:e.routeId,...e.search===void 0?{}:{search:e.search},hash:e.hash,label:n,searchText:[n,...[...e.searchKeys,...r].map(e=>a(e)),e.aliases??``].join(` `)}}function xe(e,t){let n=W[e],r=t.properties;if(!n||!r)return t;let i=new Set(n());return{...t,properties:Object.fromEntries(Object.entries(r).filter(([e])=>i.has(e)))}}function Se(e){if(!e.query.trim())return[];let t=z(e.query),n=t.tags.length===0&&t.text?U.filter(t=>(e.identityAvailable||!t.requiresIdentity)&&(e.nativeDeviceSettings||!t.requiresNativeDeviceSettings)&&S(t.routeId,e.canAdmin!==!1,e.nativeDeviceSettings)).map(t=>be(t,e.nativeDeviceSettings?.snapshot??null)).filter(e=>O(e.searchText,t.text)):[],r=e.schema&&typeof e.schema==`object`&&!Array.isArray(e.schema)?e.schema:null;if(!r||d(r)!==`object`||!r.properties)return n;let i=G.get(r);(!i||i.hints!==e.uiHints)&&(i={hints:e.uiHints,sections:new Map},G.set(r,i));let a=e.value??{};for(let[t,o]of Object.entries(r.properties)){let r=he(t);if(!S(r,e.canAdmin!==!1,e.nativeDeviceSettings))continue;let s=i.sections.get(t);if(!s){let n=t===`wizard`?ge(o):xe(r,o);s={schema:n,tiers:H({schema:n,path:[t],hints:e.uiHints})},i.sections.set(t,s)}let{schema:c,tiers:l}=s,u=pe[t],d=n=>!!(n&&R({key:t,schema:n,value:a[t],hints:e.uiHints,query:e.query,label:u?.label,description:u?.description,textMatcher:O})),f=d(l.common),p=d(l.advanced);if(!f&&!p)continue;let m=encodeURIComponent(t),h={search:``,hash:`#config-section-${m}`};n.push(r===`memory`?{routeId:r,label:u?.label??c.title??t,pathname:le(`settings`,e.basePath),hash:h.hash}:r===`plugin-settings`?{routeId:r,label:u?.label??c.title??t,search:`?tab=advanced`,hash:`#plugin-settings-advanced`}:{routeId:r,label:u?.label??c.title??t,search:`?section=${m}${p||t===`wizard`?`&advanced=1`:``}`,hash:h.hash})}return n}var U,W,G;function K(){return(K=e((()=>{D(),T(),B(),V(),fe(),c(),P(),m(),me(),ve(),L(),_e(),N(),U=Object.values(I),W={memory:ye,"plugin-settings":()=>[`enabled`,`allow`,`deny`,`load`,`slots`],updates:()=>[`channel`,`checkOnStart`,`auto`]},G=new WeakMap})))()}var q,J;function Y(){return(Y=e((()=>{_(),ee(),c(),y(),q=2e3,J=class extends t{constructor(...e){super(...e),this.savedVisible=!1}createRenderRoot(){return this}willUpdate(){let e=this.props?.status;this.previousStatus===`saving`&&e===`saved`?(this.clearSavedTimer(),this.savedVisible=!0,this.savedTimer=globalThis.setTimeout(()=>{this.savedTimer=void 0,this.savedVisible=!1},q)):e!==`saved`&&(this.clearSavedTimer(),this.savedVisible=!1),this.previousStatus=e}disconnectedCallback(){this.clearSavedTimer(),super.disconnectedCallback()}clearSavedTimer(){globalThis.clearTimeout(this.savedTimer),this.savedTimer=void 0}renderClaw(e){return v`<span class="settings-save-indicator__claw ${e}" aria-hidden="true"
      >${b.claw}</span
    >`}render(){let e=this.props;if(!e)return g;let t,n=``,r=``,i=``;if(e.applying)t=v` <span class="settings-save-indicator__spinner" aria-hidden="true"
          >${b.loader}</span
        >
        <span>${a(`configView.applying`)}</span>`;else if(e.status===`saving`)t=v` ${this.renderClaw(`settings-save-indicator__claw--saving`)}
        <span>${a(`configView.autoSaveSaving`)}</span>`;else if(e.status===`recovery`)n=` settings-save-indicator--danger settings-save-indicator--recovery`,t=v`<span>${e.lastError}</span>
        <button
          class="btn btn--xs settings-save-indicator__action"
          type="button"
          @click=${e.onReload}
        >
          ${a(`configView.recoveryReload`)}
        </button>`;else if(e.status===`error`)i=e.lastError?.trim()??``,r=i?`${a(`configView.autoSaveFailed`)}: ${i}`:``,n=` settings-save-indicator--danger`,t=v` <span>${a(`configView.autoSaveFailed`)}</span>
        <button
          class="btn btn--xs settings-save-indicator__action"
          type="button"
          @click=${e.onRetry}
        >
          ${a(`configView.retry`)}
        </button>`;else if(e.status===`paused`)t=v` <span>${a(`configView.autoSavePaused`)}</span>
        <button
          class="btn btn--xs settings-save-indicator__action"
          type="button"
          @click=${e.onSave}
        >
          ${a(`configView.saveNow`)}
        </button>`;else if(e.status===`conflict`)n=` settings-save-indicator--danger`,t=v` <span>${a(`configView.autoSaveConflict`)}</span>
        <button
          class="btn btn--xs settings-save-indicator__action"
          type="button"
          @click=${e.onReload}
        >
          ${a(`common.reload`)}
        </button>`;else if(this.savedVisible)n=` settings-save-indicator--saved`,t=v` ${this.renderClaw(`settings-save-indicator__claw--saved`)}
        <span class="settings-save-indicator__check" aria-hidden="true">${b.check}</span>
        <span>${a(`configView.autoSaveSaved`)}</span>`;else if(e.needsApply)t=v` <button
        class="btn btn--xs settings-save-indicator__apply"
        type="button"
        ?disabled=${e.applyDisabled}
        @click=${e.onApply}
      >
        ${a(`configView.applyChanges`)}
      </button>`;else return g;return v`<div
      class="settings-save-indicator${n}"
      role="status"
      aria-live="polite"
      aria-label=${r||g}
      title=${i||g}
    >
      ${t}
    </div>`}},r([ne({attribute:!1})],J.prototype,`props`,void 0),r([te()],J.prototype,`savedVisible`,void 0),customElements.get(`openclaw-settings-save-indicator`)||customElements.define(`openclaw-settings-save-indicator`,J)})))()}function Ce(e,t){if(t.pathname)return!1;let r=n(t.label);return[w(e),k(e)].some(e=>n(e)===r)}function we(e,t,r,i){let o=ae(r,i),s=t.filter(e=>S(e.routeId,r,i)),c=n(e);if(!c)return o.map(e=>({labelKey:e.labelKey,items:e.routes.map(e=>({routeId:e,blocks:[]}))}));let l=o.flatMap(e=>e.routes),u=[...new Set([...l,...ue.filter(e=>S(e,r,i)),...s.map(e=>e.routeId)])],d=u.filter(e=>[w(e),k(e),se(e)].some(e=>O(e,c))),f=new Set(d),p=o.flatMap(e=>e.labelKey&&O(a(e.labelKey),c)?e.routes.filter(e=>!f.has(e)&&(f.add(e),!0)):[]),m=new Map,h=new Set;for(let e of s){let t=`${e.routeId}\u0000${e.pathname??``}\u0000${e.search??``}\u0000${e.hash}`;if(h.has(t))continue;h.add(t);let n=m.get(e.routeId)??[];n.push(e),m.set(e.routeId,n)}let g=[...d,...p];return[...g.length>0?[{labelKey:null,items:g.map(e=>({routeId:e,blocks:(m.get(e)??[]).filter(t=>!Ce(e,t))}))}]:[],...u.filter(e=>!f.has(e)&&m.has(e)).map(e=>({labelKey:null,items:[{routeId:e,blocks:m.get(e)??[]}]}))]}function Te(e,t,n){let r=oe(e.activeRouteId)===t;return v`
    <a
      href=${C(t,e.basePath)}
      class="settings-sidebar__item ${r?`settings-sidebar__item--active`:``}"
      aria-current=${r?`page`:g}
      @focus=${n=>E(e.preloadTimers,t,n,e.onPreload,r)}
      @blur=${t=>x(e.preloadTimers,t)}
      @pointerenter=${n=>E(e.preloadTimers,t,n,e.onPreload,r)}
      @pointerleave=${t=>x(e.preloadTimers,t)}
      @touchstart=${n=>E(e.preloadTimers,t,n,e.onPreload,r,!0)}
      @click=${n=>{o(n)&&(n.preventDefault(),e.onNavigate(t))}}
    >
      <span class="settings-sidebar__item-icon" aria-hidden="true"
        >${b[ce(t)]}</span
      >
      <span class="settings-sidebar__item-label"
        >${n??w(t,e.nativeDeviceSettings?.snapshot)}</span
      >
      ${e.presentation===`embed-list`?v`<span class="settings-row__chevron" aria-hidden="true">${b.chevronRight}</span>`:g}
    </a>
  `}function Ee(e,t){let n=(t.pathname??C(t.routeId,e.basePath))+(t.search??``)+t.hash,r=e.activeRouteId===t.routeId&&(t.pathname===void 0||e.activePathname===t.pathname)&&e.activeHash===t.hash&&(t.search===void 0||e.activeSearch===t.search);return v`
    <a
      href=${n}
      class="settings-sidebar__subitem ${r?`settings-sidebar__subitem--active`:``}"
      aria-current=${r?`location`:g}
      @click=${n=>{o(n)&&(n.preventDefault(),e.onNavigate(t.routeId,{...t.pathname?{pathname:t.pathname}:{},...t.search?{search:t.search}:{},hash:t.hash}))}}
    >
      <span class="settings-sidebar__subitem-label">${t.label}</span>
    </a>
  `}function X(e){e.closest(`.settings-sidebar`)?.querySelector(`.settings-sidebar__search`)?.classList.toggle(`settings-sidebar__search--scrolled`,e.scrollTop>0)}function De(e){let t=new Map(e.map(e=>[e.id,e])),n=new Map,r=[];for(let i of e){let e=i.creatorAgentId;if(e&&e!==i.id&&t.has(e)){let t=n.get(e)??[];t.push(i),n.set(e,t)}else r.push(i)}let i=[],a=new Set,o=(e,t)=>{if(!a.has(e.id)){a.add(e.id),i.push({agent:e,...t>0&&e.creatorAgentId?{creatorAgentId:e.creatorAgentId}:{}});for(let r of n.get(e.id)??[])o(r,t+1)}};return r.forEach(e=>o(e,0)),e.forEach(e=>o(e,0)),i}function Z(e){let t=h(e.agents).map(e=>Object.assign({},e,{id:i(e.id),creatorAgentId:e.creatorAgentId?i(e.creatorAgentId):e.creatorAgentId})),n=De(t).map(({agent:e,creatorAgentId:t})=>({value:e.id,label:p(e),agent:e,description:t?a(`agents.createdBy`,{id:t}):void 0}));return v`<div class="settings-sidebar__agent">
    <openclaw-agent-select
      .options=${n}
      .identityById=${Object.fromEntries(e.agentIdentity.entries().map(e=>[e.agentId,e]))}
      .value=${e.settingsAgentSelection.state.selectedId??``}
      .accessibleLabel=${a(`agentScope.label`)}
      .menuLabel=${a(`agentScope.label`)}
      .disabled=${n.length<=1}
      .onSelect=${t=>e.settingsAgentSelection.set(t)}
      @wa-show=${()=>void e.agentIdentity.ensure(t.map(e=>e.id))}
    ></openclaw-agent-select>
  </div>`}function Q(e){let t=j(e);return v`<header class="native-embed-header">
    ${e.presentation===`embed-page`?v`<button
            class="native-embed-header__back btn btn--ghost"
            type="button"
            aria-label=${a(`common.back`)}
            @click=${e.onExit}
          >
            <span aria-hidden="true">${b.chevronLeft}</span>${a(`common.back`)}
          </button>`:g}
    <h1 class="page-title">
      ${e.presentation===`embed-list`?a(`nav.settings`):w(e.activeRouteId,e.nativeDeviceSettings?.snapshot)}
    </h1>
    ${t?A({kind:t,queuedOutboxCount:e.queuedOutboxCount??0,title:e.lastError?l(e.lastError):a(`connection.reconnecting`),onRetry:e.onRetryConnect}):v`<openclaw-settings-save-indicator
            .props=${e.saveIndicator}
          ></openclaw-settings-save-indicator>`}
  </header>`}function Oe(e){if(e.presentation===`embed-page`)return v`${Q(e)} ${Z(e)}`;let t=j(e),n=a(`connection.reconnecting`),r=e.searchBlockMatches??(e.searchParams?Se(e.searchParams):[]),i=we(e.searchQuery,r,e.canAdmin!==!1,e.nativeDeviceSettings??null),o=v` <nav
    class="settings-sidebar__nav"
    aria-label=${a(`common.settingsSections`)}
    @scroll=${e=>X(e.currentTarget)}
  >
    ${i.length===0?v`<p class="settings-sidebar__empty" role="status">
            ${a(`nav.settingsSearchNoResults`)}
          </p>`:i.map(t=>v`
              <div class="settings-sidebar__group">
                ${t.labelKey?v`<div class="settings-sidebar__group-label">${a(t.labelKey)}</div>`:g}
                ${t.items.map(t=>v`
                    ${Te(e,t.routeId)}
                    ${t.blocks.map(t=>Ee(e,t))}
                  `)}
              </div>
            `)}
  </nav>`;return e.presentation===`embed-list`?v`<section class="settings-embed-list">
      ${Q(e)} ${Z(e)} ${o}
    </section>`:v`
    <aside class="settings-sidebar">
      <header class="settings-sidebar__header" @mousedown=${re}>
        <button type="button" class="settings-sidebar__back" @click=${()=>e.onExit()}>
          <span class="settings-sidebar__back-icon" aria-hidden="true">${b.arrowLeft}</span>
          ${a(`nav.exitSettings`)}
          <kbd class="settings-sidebar__esc" aria-hidden="true">esc</kbd>
        </button>
        <h1 class="settings-sidebar__title">${a(`nav.settings`)}</h1>
      </header>
      ${Z(e)}
      <div class="settings-sidebar__search" role="search">
        <span class="settings-sidebar__search-icon" aria-hidden="true">${b.search}</span>
        <input
          class="settings-sidebar__search-input"
          type="search"
          autocomplete="off"
          spellcheck="false"
          aria-label=${a(`nav.settingsSearchLabel`)}
          placeholder=${a(`nav.settingsSearchPlaceholder`)}
          .value=${e.searchQuery}
          @input=${t=>e.onSearchQueryChange(t.currentTarget.value)}
          @keydown=${t=>{if(t.key===`Escape`){if(t.preventDefault(),e.searchQuery){e.onSearchQueryChange(``);return}e.onExit()}}}
        />
        ${e.searchQuery?v`
                <button
                  type="button"
                  class="settings-sidebar__search-clear"
                  aria-label=${a(`nav.settingsSearchClear`)}
                  @click=${t=>{let n=t.currentTarget.parentElement?.querySelector(`input`);e.onSearchQueryChange(``),n?.focus()}}
                >
                  ${b.x}
                </button>
              `:g}
      </div>
      ${o}
      <footer class="settings-sidebar__footer">
        ${t?A({kind:t,queuedOutboxCount:e.queuedOutboxCount??0,title:e.lastError?l(e.lastError):n,onRetry:e.onRetryConnect}):v`<openclaw-settings-save-indicator
                .props=${e.saveIndicator}
              ></openclaw-settings-save-indicator>`}
        <openclaw-sidebar-build-chip
          .basePath=${e.basePath}
          .gatewayVersion=${e.gatewayVersion||null}
          .variant=${`settings`}
          .onNavigate=${()=>e.onNavigate(`about`)}
        ></openclaw-sidebar-build-chip>
      </footer>
    </aside>
  `}function $(){return($=e((()=>{_(),D(),T(),ie(),c(),f(),u(),s(),K(),y(),de(),F(),Y(),M()})))()}$();export{Oe as renderSettingsSidebar};
//# sourceMappingURL=settings-sidebar-DTNMF0OK.js.map