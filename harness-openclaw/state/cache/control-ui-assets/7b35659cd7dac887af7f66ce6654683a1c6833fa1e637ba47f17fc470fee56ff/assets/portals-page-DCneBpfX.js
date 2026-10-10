import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as a,Fl as o,Il as s,Sl as c,Ss as l,Tl as u,Vs as d,bs as f,wl as p}from"./control-ui-core-CndkyZ8m.js";import{$ as m,Q as h,T as g,at as _,dt as v,nt as y,v as b,w as x,x as S}from"./lit-runtime-CIjzngcy.js";import{$r as C,Di as w,Qr as T,Ti as E,si as D,xi as O}from"./control-ui-core-C5mtYcym.js";import{c as k,s as A,u as j}from"./gateway-runtime-BvWNTqPo.js";import{Fa as M,Ia as N}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Yt as P}from"./control-ui-boot-shared-DpHhsTHW.js";var F,I;function L(){return(L=e((()=>{s(),F={portalsPage:{listLabel:`Active portals`,portLabel:`Port {port}`,openNewTab:`Open in new tab`,closePortal:`Close {title}`,previewTitle:`{title} portal preview`,loading:`Loading portals…`,emptyHint:`Ask the agent to start a portal:`,promptShow:`Show me in a portal.`,promptStart:`Start the application in a portal.`,promptMakeAvailable:`Make the server available in a portal.`,unsupported:`This gateway does not support portals.`,loadFailed:`Could not load portals: {error}`,closeFailed:`Could not close the portal: {error}`,unreachableTitle:`Portal not reachable from this browser`,unreachableBody:`The Gateway is likely being accessed through a proxy or tunnel that exposes only its main port. Open this URL from a browser on the Gateway host.`,writeAccessRequiredTitle:`Write access required`,writeAccessRequiredBody:`This portal requires an operator with write access.`,retry:`Retry`}},I=Object.assign(()=>{o.portalsPage=F.portalsPage},{catalog:F})})))()}function R(e,t){try{return new URL(e.blockedURI).origin===t.origin}catch{return!1}}async function z(e){let t;try{t=new URL(e)}catch{return`unreachable`}let n=!1,r=e=>{R(e,t)&&(n=!0)},i=typeof document>`u`?void 0:document;i?.addEventListener(`securitypolicyviolation`,r);try{return await fetch(e,{mode:`no-cors`,signal:AbortSignal.timeout(B)}),`reachable`}catch{return await new Promise(e=>{setTimeout(e,0)}),n?`blocked`:`unreachable`}finally{i?.removeEventListener(`securitypolicyviolation`,r)}}var B;function V(){return(V=e((()=>{B=4e3})))()}function H(e,t,n){let r=new URL(P(t,n));return r.port=String(e.listenPort),r.pathname=e.path??`/`,r.search=e.tokenQuery,r.href}function U(){return(U=e((()=>{})))()}var W,G;function K(){return(K=e((()=>{r(),h(),_(),x(),b(),D(),C(),w(),u(),L(),l(),k(),N(),p(),d(),V(),U(),I(),W=`allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts`,G=class extends c{constructor(...e){super(...e),this.portals=[],this.selectedPortalId=null,this.loading=!1,this.loaded=!1,this.error=null,this.closingPortalId=null,this.portalProbeState=null,this.requestGeneration=0,this.portalSetRevision=0,this.portalProbeGeneration=0,this.portalProbeCache=new Map,this.gateway=new M(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetGatewayState(),ensureInitialData:()=>void this.loadPortals()}),this.subscriptions=new a(this).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{this.gateway.gateway===e&&this.context.gateway===e&&this.gateway.connected&&t.event===`portal.changed`&&this.loadPortals()}))}disconnectedCallback(){this.portalProbeGeneration+=1,this.subscriptions.clear(),super.disconnectedCallback()}get portalListSupported(){return j(this.gateway.snapshot??{},`portal.list`)!==!1}get canClosePortal(){return A(this.gateway.snapshot,`portal.close`,`operator.write`)}resetGatewayState(){this.requestGeneration+=1,this.portalSetRevision+=1,this.portals=[],this.selectedPortalId=null,this.loading=!1,this.loaded=!1,this.error=null,this.closingPortalId=null,this.portalProbeGeneration+=1,this.portalProbeCache.clear(),this.portalProbeState=null}applyPortalSet(e){this.portalSetRevision+=1,this.portals=[...e];let t=this.selectedPortalId,n=e.some(e=>e.id===t)?this.selectedPortalId:e[0]?.id??null;this.selectedPortalId=n,this.loaded=!0,this.error=null;let r=e.find(e=>e.id===n);r?this.ensurePortalProbe(r,n!==t):(this.portalProbeGeneration+=1,this.portalProbeState=null)}portalUrl(e,t){return H({...e,tokenQuery:t},this.context.gateway.connection.gatewayUrl,window.location.origin)}ensurePortalProbe(e,t=!1){let n=e.tokenQuery;if(!n){this.portalProbeGeneration+=1,this.portalProbeState=null;return}let r=this.portalUrl(e,n),i=`${e.id}\u0000${r}`;if(!t&&this.portalProbeState?.key===i)return;let a=t?void 0:this.portalProbeCache.get(i);if(a!==void 0){this.portalProbeState={key:i,status:a};return}let o=++this.portalProbeGeneration;this.portalProbeState={key:i,status:`probing`},z(r).then(e=>{this.portalProbeCache.set(i,e),o===this.portalProbeGeneration&&this.portalProbeState?.key===i&&(this.portalProbeState={key:i,status:e})})}selectPortal(e){e.id!==this.selectedPortalId&&(this.selectedPortalId=e.id,this.ensurePortalProbe(e,!0))}async loadPortals(){if(!this.gateway.connected||!this.portalListSupported||this.loading)return;let e=this.gateway.client,t=this.gateway.capture();if(!e||!t)return;let n=++this.requestGeneration,r=this.portalSetRevision;this.loading=!0,this.error=null;try{let i=await e.request(`portal.list`,{});n===this.requestGeneration&&r===this.portalSetRevision&&this.gateway.isCurrent(t)&&this.applyPortalSet(i.portals)}catch(e){n===this.requestGeneration&&this.gateway.isCurrent(t)&&this.portalListSupported&&(this.error=i(`portalsPage.loadFailed`,{error:f(e)}),this.loaded=!0)}finally{n===this.requestGeneration&&this.gateway.isCurrent(t)&&(this.loading=!1)}}async closePortal(e){if(!this.canClosePortal||this.closingPortalId)return;let t=this.gateway.client,n=this.gateway.capture();if(t&&n){this.closingPortalId=e.id,this.error=null;try{await t.request(`portal.close`,{id:e.id}),this.gateway.isCurrent(n)&&this.loadPortals()}catch(e){this.gateway.isCurrent(n)&&(this.error=i(`portalsPage.closeFailed`,{error:f(e)}))}finally{this.gateway.isCurrent(n)&&this.closingPortalId===e.id&&(this.closingPortalId=null)}}}renderEmptyState(){let e=!this.portalListSupported;return y`
      <section class="portals-empty" role="status" aria-live="polite">
        ${this.loading&&!this.loaded?y`<div class="portals-empty__title">${i(`portalsPage.loading`)}</div>`:y`
                <div class="portals-empty__title">${i(`portalsPage.emptyHint`)}</div>
                <div class="portals-empty__prompts">
                  <span>${i(`portalsPage.promptShow`)}</span>
                  <span>${i(`portalsPage.promptStart`)}</span>
                  <span>${i(`portalsPage.promptMakeAvailable`)}</span>
                </div>
              `}
        ${e?y`<div class="portals-empty__note">${i(`portalsPage.unsupported`)}</div>`:m}
        ${this.error?y`<div class="callout danger">${this.error}</div>`:m}
      </section>
    `}renderPortal(e){if(!e.tokenQuery)return y`
        <section class="portals-preview">
          <div class="portals-preview__notice" role="status">
            <div class="portals-preview__notice-title">
              ${i(`portalsPage.writeAccessRequiredTitle`)}
            </div>
            <p>${i(`portalsPage.writeAccessRequiredBody`)}</p>
          </div>
        </section>
      `;let t=this.portalUrl(e,e.tokenQuery),n=`${e.id}\u0000${t}`,r=this.portalProbeState?.key===n?this.portalProbeState.status:`probing`;return y`
      <section class="portals-preview">
        <header class="portals-preview__header">
          <a
            class="portals-preview__url"
            href=${t}
            target="_blank"
            rel="noopener noreferrer"
            title=${t}
          >
            <span>${t}</span>
            ${E(`externalLink`)}
            <span class="sr-only">${i(`portalsPage.openNewTab`)}</span>
          </a>
          <button
            class="btn btn--icon btn--ghost portals-preview__close"
            type="button"
            title=${i(`portalsPage.closePortal`,{title:e.title})}
            aria-label=${i(`portalsPage.closePortal`,{title:e.title})}
            ?disabled=${!this.canClosePortal||this.closingPortalId===e.id}
            @click=${()=>void this.closePortal(e)}
          >
            ${E(`x`)}
          </button>
        </header>
        ${this.error?y`<div class="callout danger portals-preview__error">${this.error}</div>`:m}
        ${r===`probing`?y`
                <div class="portals-empty portals-preview__state" role="status" aria-live="polite">
                  <div class="portals-empty__title">${i(`portalsPage.loading`)}</div>
                </div>
              `:r===`unreachable`?y`
                  <div class="portals-preview__notice" role="status">
                    <div class="portals-preview__notice-title">
                      ${i(`portalsPage.unreachableTitle`)}
                    </div>
                    <p>${i(`portalsPage.unreachableBody`)}</p>
                    <a
                      class="portals-preview__notice-url"
                      href=${t}
                      target="_blank"
                      rel="noopener noreferrer"
                      >${t}</a
                    >
                    <button
                      class="btn"
                      type="button"
                      @click=${()=>this.ensurePortalProbe(e,!0)}
                    >
                      ${i(`portalsPage.retry`)}
                    </button>
                  </div>
                `:g(n,y`<iframe
                    ${S(e=>{e instanceof HTMLIFrameElement&&!e.hasAttribute(`src`)&&e.setAttribute(`src`,t)})}
                    class="portals-preview__frame"
                    title=${i(`portalsPage.previewTitle`,{title:e.title})}
                    referrerpolicy="no-referrer"
                    sandbox=${W}
                  ></iframe>`)}
      </section>
    `}render(){let e=this.portals.find(e=>e.id===this.selectedPortalId)??this.portals[0];return y`
      <section class="content-header content-header--page">
        <div>
          <div class="page-title">${O(`portals`)}</div>
        </div>
      </section>
      ${e?y`
              <section class="portals-layout">
                <aside class="portals-rail" aria-label=${i(`portalsPage.listLabel`)}>
                  ${this.portals.map(t=>y`
                      <button
                        class="portals-rail__item ${t.id===e.id?`active`:``}"
                        type="button"
                        aria-current=${t.id===e.id?`true`:m}
                        @click=${()=>this.selectPortal(t)}
                      >
                        <span class="portals-rail__title">${t.title}</span>
                        <span class="portals-rail__port"
                          >${i(`portalsPage.portLabel`,{port:String(t.port)})}</span
                        >
                        ${t.description?y`<span class="portals-rail__description"
                                >${t.description}</span
                              >`:m}
                      </button>
                    `)}
                </aside>
                ${this.renderPortal(e)}
              </section>
            `:this.renderEmptyState()}
    `}},t([n({context:T,subscribe:!0})],G.prototype,`context`,void 0),t([v()],G.prototype,`portals`,void 0),t([v()],G.prototype,`selectedPortalId`,void 0),t([v()],G.prototype,`loading`,void 0),t([v()],G.prototype,`loaded`,void 0),t([v()],G.prototype,`error`,void 0),t([v()],G.prototype,`closingPortalId`,void 0),t([v()],G.prototype,`portalProbeState`,void 0),customElements.get(`openclaw-portals-page`)||customElements.define(`openclaw-portals-page`,G)})))()}K();
//# sourceMappingURL=portals-page-DCneBpfX.js.map