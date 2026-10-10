import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{$s as i,Al as a,Bi as o,Bs as s,Gi as c,Js as l,Sl as u,Ss as d,Tl as f,Vs as p,Ys as m,an as ee,bo as h,bs as te,un as ne,wl as g,xo as _,yo as v}from"./control-ui-core-CndkyZ8m.js";import{$ as y,H as re,Q as b,R as x,at as S,c as C,dt as w,nt as T,pt as E,s as ie,z as D}from"./lit-runtime-CIjzngcy.js";import{$r as ae,Di as oe,Ei as O,Fr as k,Lr as A,Qr as j,Rr as M,si as N,xi as P}from"./control-ui-core-C5mtYcym.js";import{Fa as F,Ia as I,Si as L,xi as R}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Ar as z,Mr as B,Nr as V,Pr as H}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as U,t as se}from"./near-viewport-observer-BF_iROOc.js";import{n as W,t as G}from"./settings-workspace-gGOfyDax.js";var K;function q(){return(q=e((()=>{b(),S(),U(),f(),g(),K=class extends u{constructor(...e){super(...e),this.sessionKey=``,this.error=null,this.visibility=new se(200,()=>this.requestUpdate()),this.observationFrame=0}connectedCallback(){super.connectedCallback(),window.cancelAnimationFrame(this.observationFrame),this.observationFrame=window.requestAnimationFrame(()=>this.visibility.observe(this))}disconnectedCallback(){window.cancelAnimationFrame(this.observationFrame),this.visibility.disconnect(),super.disconnectedCallback()}render(){return this.visibility.nearVisible?this.error?T`<div class="dashboard-preview__error">
          ${a(`dashboardDocument.loadFailed`,{error:this.error})}
        </div>`:T`<openclaw-board-document
          .passive=${!0}
          .gatewaySnapshot=${this.gatewaySnapshot}
          .preparedSession=${{sessionKey:this.sessionKey,agentId:this.agentId}}
        ></openclaw-board-document>`:y}},t([E({attribute:!1})],K.prototype,`gatewaySnapshot`,void 0),t([E({attribute:!1})],K.prototype,`sessionKey`,void 0),t([E({attribute:!1})],K.prototype,`agentId`,void 0),t([E({attribute:!1})],K.prototype,`error`,void 0),customElements.get(`openclaw-dashboard-preview`)||customElements.define(`openclaw-dashboard-preview`,K)})))()}function J(e,t){let n=e.createdActor??e.owner?.actor,r=n?.id?.trim()||e.agentId?.trim()||t;return{id:r,label:n?.label?.trim()||r}}function ce(e,t,n){return T`<div class="dashboard-preview" aria-hidden="true" inert>
    <openclaw-dashboard-preview
      .gatewaySnapshot=${t}
      .sessionKey=${e.key}
      .agentId=${e.agentId}
      .error=${n}
    ></openclaw-dashboard-preview>
  </div>`}function le(e,t){let n=t.query.trim().toLocaleLowerCase();return(e.result?.sessions??[]).filter(r=>{let i=J(r,e.fallbackAgentId);return t.ownerId&&i.id!==t.ownerId?!1:!n||[c(r.key,r),i.label,r.lastMessagePreview,r.key].filter(e=>typeof e==`string`).some(e=>e.toLocaleLowerCase().includes(n))}).toSorted((e,n)=>t.sort===`title`?c(e.key,e).localeCompare(c(n.key,n)):(n.updatedAt??0)-(e.updatedAt??0))}function ue(e,t,n,r){let o=m(t.key,e.globalScope)?i({face:`dashboard`,sessionKey:t.key,fallbackAgentId:t.key===`global`&&t.agentId?.trim()||e.fallbackAgentId,basePath:e.basePath,row:t,mainKey:e.mainKey}):null,s=o?D`a`:D`div`,l=J(t,e.fallbackAgentId),u=c(t.key,t),d=l.label.trim().charAt(0).toLocaleUpperCase()||`?`;return re`<article class="dashboard-card" data-dashboard-session=${t.key}>
    <${s} class="dashboard-card__main" href=${o?.href??y} aria-label=${o?u:y}>
      ${ce(t,n,r)}
      <div class="dashboard-card__body">
        <div class="dashboard-card__heading">
          <h2>${u}</h2>
          ${t.status===`running`?T`<span class="dashboard-card__live"><i></i>${a(`dashboardsPage.live`)}</span>`:y}
        </div>
        <div class="dashboard-card__author">
          <span class="dashboard-card__avatar" aria-hidden="true">${d}</span>
          <span>${a(`dashboardsPage.byAuthor`,{author:l.label})}</span>
        </div>
      </div>
      <footer class="dashboard-card__footer">
        <span>
          ${t.updatedAt?a(`dashboardsPage.updated`,{time:ee(t.updatedAt)}):a(`dashboardsPage.updatedUnknown`)}
        </span>
        ${o?T`<span class="dashboard-card__open" aria-hidden="true">${O.arrowUpRight}</span>`:y}
      </footer>
    </${s}>
  </article>`}function de(e,t,n,r,i){let o=e.result?.sessions??[];if(e.error&&!e.result)return y;if(o.length===0)return T`<section class="card stack" data-dashboards-empty role="status">
      <div class="list-title">${a(`dashboardsPage.emptyTitle`)}</div>
      <div class="card-sub">${a(`dashboardsPage.emptyDescription`)}</div>
    </section>`;let s=Array.from(new Map(o.map(t=>{let n=J(t,e.fallbackAgentId);return[n.id,n]})).values()).toSorted((e,t)=>e.label.localeCompare(t.label)),c=le(e,t);return T`<section class="dashboards-gallery" aria-label=${P(`dashboards`)}>
    <div class="dashboards-toolbar">
      <label class="dashboards-search">
        <span aria-hidden="true">${O.search}</span>
        <span class="sr-only">${a(`dashboardsPage.searchLabel`)}</span>
        <input
          type="search"
          .value=${t.query}
          placeholder=${a(`dashboardsPage.searchPlaceholder`)}
          @input=${e=>{e.currentTarget instanceof HTMLInputElement&&n.onQueryChange(e.currentTarget.value)}}
        />
      </label>
      <label class="dashboards-select">
        <span>${a(`dashboardsPage.authorFilter`)}</span>
        <select
          .value=${t.ownerId}
          @change=${e=>{e.currentTarget instanceof HTMLSelectElement&&n.onOwnerChange(e.currentTarget.value)}}
        >
          <option value="">${a(`dashboardsPage.allAuthors`)}</option>
          ${s.map(e=>T`<option value=${e.id}>${e.label}</option>`)}
        </select>
      </label>
      <label class="dashboards-select">
        <span>${a(`dashboardsPage.sortLabel`)}</span>
        <select
          .value=${t.sort}
          @change=${e=>{e.currentTarget instanceof HTMLSelectElement&&(e.currentTarget.value===`updated`||e.currentTarget.value===`title`)&&n.onSortChange(e.currentTarget.value)}}
        >
          <option value="updated">${a(`dashboardsPage.sortUpdated`)}</option>
          <option value="title">${a(`dashboardsPage.sortTitle`)}</option>
        </select>
      </label>
    </div>
    <div class="dashboards-results" role="status">
      ${a(`dashboardsPage.resultCount`,{count:String(c.length)})}
    </div>
    ${c.length===0?T`<div class="dashboards-no-results" data-dashboards-no-results>
            <span aria-hidden="true">${O.search}</span>
            <strong>${a(`dashboardsPage.noResultsTitle`)}</strong>
            <span>${a(`dashboardsPage.noResultsDescription`)}</span>
          </div>`:T`<div class="dashboards-grid">
            ${C(c,e=>e.key,t=>ue(e,t,r,i))}
          </div>`}
  </section>`}function fe(){return T`<section class="dashboards-gallery" aria-busy="true">
    <span class="sr-only" role="status">${a(`common.loading`)}</span>
    <div class="dashboards-loading" aria-hidden="true" inert>
      <div class="dashboards-toolbar">
        <div class="dashboards-search skeleton dashboards-loading__control"></div>
        ${[0,1].map(()=>T`<div class="dashboards-select dashboards-loading__select">
            <div class="skeleton skeleton-line dashboards-loading__label"></div>
            <div class="skeleton dashboards-loading__control"></div>
          </div>`)}
      </div>
      <div class="dashboards-results">
        <div class="skeleton skeleton-line dashboards-loading__label"></div>
      </div>
      <div class="dashboards-grid">
        ${Array.from({length:6},()=>T`<div class="dashboard-card">
            <div class="dashboard-preview skeleton"></div>
            <div class="dashboard-card__body">
              <div
                class="skeleton skeleton-line skeleton-line--long dashboards-loading__title"
              ></div>
              <div class="dashboard-card__author">
                <div class="dashboard-card__avatar skeleton"></div>
                <div class="skeleton skeleton-line skeleton-line--medium"></div>
              </div>
            </div>
            <div class="dashboard-card__footer">
              <div class="skeleton skeleton-line skeleton-line--medium"></div>
            </div>
          </div>`)}
      </div>
    </div>
  </section>`}function pe(e,t=Y,n=X,r,i=null){let o=e&&(e.result||e.error)?T`
          ${H({status:{error:e.error,hasLoaded:e.result!==null,stale:e.result!==null&&e.error!==null,awaitingGateway:!1},errorMessage:e.error?a(`dashboardsPage.loadError`,{error:e.error}):void 0})}
          ${de(e,t,n,r,i)}
        `:fe();return T`
    <section class="content-header dashboards-header">
      <div>
        <div class="page-title">${P(`dashboards`)}</div>
        <div class="page-subtitle">${a(`subtitles.dashboards`)}</div>
      </div>
      ${e?.result?T`<div class="dashboards-header__count">
              <strong>${e.result.sessions.length}</strong>
              <span>${a(`dashboardsPage.totalLabel`)}</span>
            </div>`:y}
    </section>
    ${W(o)}
  `}var Y,X;function Z(){return(Z=e((()=>{b(),ie(),x(),N(),oe(),V(),G(),f(),ne(),o(),l(),q(),Y={query:``,ownerId:``,sort:`updated`},X={onQueryChange:()=>void 0,onOwnerChange:()=>void 0,onSortChange:()=>void 0}})))()}var Q;function $(){return($=e((()=>{r(),S(),ae(),M(),V(),d(),L(),I(),g(),p(),_(),Z(),Q=class extends u{constructor(...e){super(...e),this.filters={query:``,ownerId:``,sort:`updated`},this.previewError=null,this.listGeneration=0,this.gateway=new F(this,{getGateway:()=>this.context?.gateway}),this.subscriptions=new s(this).effect(()=>this.context?.agentSelection,e=>(this.bindList(),e.subscribe(()=>this.bindList())))}connectedCallback(){super.connectedCallback(),A(k.tagName,k.loadModule).then(()=>this.requestUpdate()).catch(e=>{this.previewError=te(e)})}disconnectedCallback(){this.listGeneration+=1,this.unsubscribeList?.(),this.unsubscribeList=void 0,this.observedSessions=void 0,this.observedScopeId=void 0,this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(e){e.has(`routeData`)&&(this.data=this.routeData),this.bindList()}bindList(){let e=this.context;if(!e)return;let t=e.sessions,n=e.agentSelection.state.scopeId?.trim()||null;if(t===this.observedSessions&&n===this.observedScopeId)return;this.unsubscribeList?.(),this.observedSessions=t,this.observedScopeId=n;let r=v(e),i=i=>{this.context!==e||this.observedSessions!==t||this.observedScopeId!==n||!i.result&&!i.error&&this.data?.result||(this.data=h(e,i),this.requestUpdate(),this.completeList(e,t,n,r,i))};this.unsubscribeList=t.subscribeList(r,i);let a=t.listSnapshot(r);i(a),!a.result&&!a.loading&&e.gateway.snapshot.phase===`connected`&&t.refreshList({...r,force:!0})}completeList(e,t,n,r,i){let a=i.result,o=++this.listGeneration,s=this.gateway.capture();if(!a?.hasMore||i.loading||i.error||!s)return;let c=()=>this.context===e&&this.observedSessions===t&&this.observedScopeId===n&&this.listGeneration===o&&this.gateway.isCurrent(s);R({initialResult:a,list:e=>t.list({...r,offset:e}),isCurrent:c,missingResultError:`dashboard enumeration returned no result`,stalledPaginationError:`dashboard enumeration did not advance`,incompletePaginationError:`dashboard enumeration was incomplete`}).then(t=>{t&&c()&&(this.data=h(e,{...i,result:{...a,count:t.length,hasMore:!1,nextOffset:null,sessions:t}}),this.requestUpdate())}).catch(t=>{if(!c())return;let n=B(z(),t,e.gateway.snapshot);this.data=h(e,{...i,error:n.error}),this.requestUpdate()})}render(){return pe(this.data,this.filters,{onQueryChange:e=>{this.filters={...this.filters,query:e}},onOwnerChange:e=>{this.filters={...this.filters,ownerId:e}},onSortChange:e=>{this.filters={...this.filters,sort:e}}},this.context?.gateway.snapshot,this.previewError)}},t([n({context:j,subscribe:!0})],Q.prototype,`context`,void 0),t([E({attribute:!1})],Q.prototype,`routeData`,void 0),t([w()],Q.prototype,`filters`,void 0),t([w()],Q.prototype,`previewError`,void 0),customElements.get(`openclaw-dashboards-page`)||customElements.define(`openclaw-dashboards-page`,Q)})))()}$();
//# sourceMappingURL=dashboards-page-XvhAzW4Y.js.map