import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Lr as n,tr as r,xr as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,Bs as o,Sl as s,Tl as c,Vs as l,an as u,f as d,m as f,p,un as m,wl as h}from"./control-ui-core-CndkyZ8m.js";import{$ as g,Q as _,at as v,c as y,dt as b,nt as x,pt as S,s as C}from"./lit-runtime-CIjzngcy.js";import{Fa as w,Ia as T,Ii as E,Li as D,Ni as O,Pi as k}from"./control-ui-boot-shared-DlJEsz5Q.js";import{a as A,i as j,n as M,r as N,t as P}from"./gateway-vitals--gTQZX_w.js";import{i as F,n as I,t as L}from"./lane-table-rRVUGW78.js";function R(e){return{...e,render:(t,n)=>e.render(t,n)}}function z(e){return a(`debug.overlay.pingMs`,{value:String(Math.round(e))})}function B(e,t){return x`<div class="debug-overlay__widget">
    ${N(e,t)}
    <openclaw-sparkline
      class="gateway-vital gateway-vital--ping"
      title=${a(`debug.overlay.pingDescription`)}
      .label=${a(`debug.overlay.ping`)}
      .samples=${P(t,e=>e.pingMs)}
      .format=${z}
      .floorMax=${20}
    ></openclaw-sparkline>
    ${j(e,t)}
  </div>`}function V(e){return x`
    <div class="debug-overlay__table-wrap">
      <table class="data-table command-lanes-table command-lanes-table--compact">
        <thead>
          <tr>
            <th>${a(`debug.lanes.lane`)}</th>
            <th>${a(`debug.lanes.active`)}</th>
            <th>${a(`debug.lanes.queued`)}</th>
            <th>${a(`debug.lanes.blocked`)}</th>
          </tr>
        </thead>
        <tbody>
          ${I(e,{compact:!0})}
        </tbody>
      </table>
    </div>
  `}function H(e){return a(`debug.overlay.freeShort`,{value:U(e)})}function U(e){return i(e,{style:`legacy-binary`,maxUnit:`tera`,separator:` `,fractionDigits:(e,t)=>t===`byte`?null:+(e<10)})}function W(e,t){return x`
    ${A(e,t)}
    ${e.disks?.length?x`<div class="gateway-vitals debug-overlay__disks">
            ${y(e.disks??[],e=>e.path,e=>x`<openclaw-sparkline
                class="gateway-vital gateway-vital--disk"
                title=${e.path}
                .label=${`${a(`debug.overlay.disk`)} ${e.path}`}
                .sub=${a(`debug.overlay.totalShort`,{value:U(e.totalBytes)})}
                .samples=${P(t,t=>t.disks?.find(t=>t.path===e.path)?.availableBytes)}
                .format=${H}
                autorange
              ></openclaw-sparkline>`)}
          </div>`:g}
    ${typeof e.uptimeMs==`number`?x`<div class="debug-overlay__vitals-footer mono">
            ${a(`debug.overlay.uptime`)} ${E(e.uptimeMs)}
          </div>`:g}
  `}function G({sessions:e,totalCount:t,hasMore:r}){return x`
    <div class="debug-overlay__count">
      ${a(`debug.overlay.activeRunsCount`,{count:String(t??e.length)})}
    </div>
    ${r?x`<div class="debug-overlay__count">${a(`activityFeed.showing`,{shown:String(e.length),total:String(t??e.length)})}</div>`:g}
    ${e.length>0?x`<ul class="debug-overlay__list">
            ${e.map(e=>{let t=e.sessionId??e.key;return x`<li class="mono" title=${t}>${n(t,32)}</li>`})}
          </ul>`:x`<div class="debug-overlay__empty">${a(`debug.overlay.noActiveRuns`)}</div>`}
  `}function K(e){let t=e.eventLog.slice(0,8);return t.length>0?x`<ul class="debug-overlay__list debug-overlay__events">
        ${t.map(e=>x`<li>
            <span class="mono">${e.event}</span>
            <time>${u(e.ts)}</time>
          </li>`)}
      </ul>`:x`<div class="debug-overlay__empty">${a(`debug.noEvents`)}</div>`}var q;function J(){return(J=e((()=>{r(),_(),C(),M(),c(),D(),m(),p(),L(),q=[R({...d.lanes,load:(e,t)=>F(e.client,t),render:V}),R({...d.status,load:async(e,t)=>{let n=performance.now();return{...await e.client.request(`system.info`,{},{signal:t}),pingMs:performance.now()-n}},render:W}),R({...d[`active-runs`],load:(e,t)=>e.client.request(`sessions.list`,{activeOnly:!0,archived:`all`,includeGlobal:!0,includeUnknown:!0},{signal:t}),render:G}),R({...d.events,load:async e=>e.gateway,render:K})]})))()}var Y,X;function Z(){return(Z=e((()=>{_(),v(),c(),T(),h(),k(),l(),p(),J(),Y=2e3,X=class extends s{constructor(...e){super(...e),this.minimized=!1,this.sections=new Map,this.requestController=null,this.requestActive=!1,this.requestGeneration=0,this.statusHistory=[],this.polling=new O(this,Y,()=>void this.refreshSections()),this.gateway=new w(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetSections(),ensureInitialData:()=>void this.refreshSections()}),this.subscriptions=new o(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribeEventLog(t))}disconnectedCallback(){this.polling.stop(),this.subscriptions.clear(),this.resetSections(),super.disconnectedCallback()}resetSections(){this.requestGeneration+=1,this.requestController?.abort(),this.requestController=null,this.requestActive=!1,this.statusHistory=[],this.sections=new Map(q.map(e=>[e.id,{status:this.gateway.connected?`loading`:`unavailable`}]))}async refreshSections(){let e=this.gateway.gateway,t=this.gateway.connected?this.gateway.client:null;if(!this.isConnected||this.requestActive)return;if(!e||!t){this.sections=new Map(q.map(e=>[e.id,{status:`unavailable`}]));return}this.requestActive=!0;let n=++this.requestGeneration,r=new AbortController;this.requestController?.abort(),this.requestController=r;let i=(this.minimized?q.filter(e=>e.id===`status`):q).map(async i=>{try{let a=await i.load({client:t,gateway:e},r.signal);this.updateSection(n,i.id,{status:`ready`,value:a})}catch{this.updateSection(n,i.id,{status:`unavailable`})}});await Promise.allSettled(i),this.isConnected&&n===this.requestGeneration&&(this.requestController=null,this.requestActive=!1)}updateSection(e,t,n){if(!this.isConnected||e!==this.requestGeneration)return;if(t===`status`&&n.status===`ready`){let e=n.value;this.statusHistory=[...this.statusHistory.slice(-89),{at:Date.now(),status:e}]}let r=new Map(this.sections);r.set(t,n),this.sections=r}renderSection(e){let t=this.sections.get(e.id)??{status:`loading`};return x`
      <section class="debug-overlay__section" aria-busy=${t.status===`loading`}>
        <h3>${a(e.titleKey)}</h3>
        ${t.status===`loading`?f(e.id):t.status===`unavailable`?x`<div class="debug-overlay__empty">${a(`debug.overlay.unavailable`)}</div>`:e.render(t.value,this.statusHistory)}
      </section>
    `}render(){if(this.minimized){let e=this.sections.get(`status`)??{status:`loading`};if(e.status!==`ready`)return x`<div class="debug-overlay__compact-loading" role="status">
          ${a(e.status===`loading`?`common.loading`:`debug.overlay.unavailable`)}
        </div>`;let t=e.value;return B(t,this.statusHistory)}return x`${q.map(e=>this.renderSection(e))}`}},t([S({attribute:!1})],X.prototype,`context`,void 0),t([S({type:Boolean})],X.prototype,`minimized`,void 0),t([b()],X.prototype,`sections`,void 0),customElements.get(`openclaw-debug-overlay-content`)||customElements.define(`openclaw-debug-overlay-content`,X)})))()}Z();
//# sourceMappingURL=debug-overlay-content-glAT-xKO.js.map