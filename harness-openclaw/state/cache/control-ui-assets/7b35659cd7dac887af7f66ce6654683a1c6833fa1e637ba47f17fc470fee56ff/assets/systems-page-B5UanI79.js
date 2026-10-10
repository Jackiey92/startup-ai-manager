import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Kr as n,xr as r}from"./control-ui-foundation-DaCuy7E_.js";import{$s as i,Al as a,Bs as o,F as s,Fl as ee,Il as c,Js as l,Sl as u,Ss as d,Tl as f,Vs as p,Xr as m,Zs as h,bs as g,on as _,un as v,wl as y}from"./control-ui-core-CndkyZ8m.js";import{$ as b,Q as x,at as S,nt as C,pt as w}from"./lit-runtime-CIjzngcy.js";import{Di as T,Ei as E,V as D,W as O,br as k,er as A,hr as j,nr as M,or as N,sr as P}from"./control-ui-core-C5mtYcym.js";import{Ni as F,Pi as te}from"./control-ui-boot-shared-DlJEsz5Q.js";import{t as ne}from"./desktop-panel-DZFk5F17.js";var I,L;function R(){return(R=e((()=>{c(),I={systems:{title:`Systems`,inventory:`Machines`,search:`Find a machine…`,select:`Select a machine`,selectHint:`Choose a host, worker, or paired node to see its status and desktop.`,refresh:`Refresh machines`,loading:`Loading machines…`,empty:`No machines are available to this account.`,noMatches:`No machines match your search.`,offlineGateway:`Gateway disconnected. Reconnect to refresh machines or open a desktop.`,offlineTitle:`This machine is offline`,offlineHint:`Its last reported information is shown. Reconnect the machine to open its desktop.`,noDesktopTitle:`No desktop available`,noDesktopHint:`This machine has not reported a desktop. Its other capabilities remain available.`,accessTitle:`Desktop access unavailable`,accessHint:`Desktop viewing requires an advertised desktop service and administrator access.`,missingTitle:`This machine is no longer listed`,missingHint:`Refresh the inventory or choose another machine. Your selection has not been changed.`,details:`Machine details`,closeDetails:`Close details`,stats:`Show statistics`,hideStats:`Hide statistics`,online:`Online`,offline:`Offline`,unknown:`Unknown`,unavailable:`Unavailable`,desktop:`Desktop`,headless:`No desktop`,host:`Gateway host`,worker:`Worker`,node:`Paired node`,hosts:`Hosts`,workers:`Workers`,nodes:`Paired nodes`,status:`Status`,platform:`Platform`,identifier:`Identifier`,capabilities:`Capabilities`,telemetry:`Reported statistics`,load:`Load (1 min)`,cpuCount:`{count} cores`,memory:`Memory used`,disk:`Disk available`,sampled:`Sampled {time}`,lastKnown:`Last reported {time}`,noTelemetry:`This machine has not reported resource statistics.`,attachedSessions:`Attached sessions`,attachedHint:`Attachment does not mean a session is currently executing on this machine.`,relatedSessions:`Related sessions`,relatedHint:`Bindings from the loaded session list. A binding is not proof that a turn executed here.`,noRelatedSessions:`No related sessions in the loaded list.`,relations:{placement:`Placed here`,"retained-placement":`Retained placement`,runner:`Runner`,"exec-binding":`Configured exec target`,gateway:`Local session context`},statuses:{starting:`Starting`,stopping:`Stopping`,error:`Error`},errors:`Some machine information could not be refreshed.`}},L=Object.assign(()=>Object.assign(ee,I),{catalog:I})})))()}async function z(e,t){if(!t.isCurrent()||t.signal?.aborted)return;let n={signal:t.signal},[r,i,a]=await Promise.allSettled([e.request(`environments.list`,{},n),e.request(`node.list`,{},n),e.request(`system.info`,{},n)]);if(t.isCurrent()&&!t.signal?.aborted){if(r.status===`rejected`)throw r.reason;return{environments:r.value.environments,nodes:i.status===`fulfilled`?i.value.nodes:[],gatewaySystemInfo:a.status===`fulfilled`?a.value:null,errors:{...i.status===`rejected`?{nodes:g(i.reason)}:{},...a.status===`rejected`?{systemInfo:g(a.reason)}:{}}}}}function B(e,t){let n=new Map(e.nodes.map(e=>[`node:${e.nodeId}`,e])),r=new Map,i=(e,t,n)=>{let i=r.get(e),a={kind:t,session:n};i?i.push(a):r.set(e,[a])};for(let e of t){let t=e.placement;if(t&&t.state!==`local`){if(t.state===`requested`)continue;t.environmentId&&i(t.environmentId,t.state===`reclaimed`||t.state===`failed`?`retained-placement`:`placement`,e),t.state===`active`&&t.runner?.deviceId&&i(`node:${t.runner.deviceId}`,`runner`,e);continue}let n=e.execNode?.trim();i(n?`node:${n}`:`gateway`,n?`exec-binding`:`gateway`,e)}return e.environments.filter(e=>e.type!==`worker`||e.worker?.state!==`destroyed`&&e.worker?.state!==`failed`).map(t=>({environment:t,node:t.type===`node`?n.get(t.id):void 0,gatewaySystemInfo:t.id===`gateway`?e.gatewaySystemInfo??void 0:void 0,sessions:r.get(t.id)??[]}))}function V(){return(V=e((()=>{d()})))()}var H;function U(){return(U=e((()=>{P(),M(),D(),d(),V(),H=class{constructor(e){this.context=e,this.inventory=null,this.rows=[],this.selectedId=null,this.query=``,this.showStats=!0,this.showDetails=!1,this.loading=!1,this.error=null,this.sampledAtMs=null,this.listeners=new Set,this.subscriptions=[],this.generation=0,this.presented=!1,this.refreshQueued=!1,this.scope=N(e.gateway),this.lifecycle=m(e.gateway.snapshot)}get current(){return this.scope===N(this.context.gateway)}get connected(){return this.current&&this.context.gateway.snapshot.phase===`connected`}get desktopAvailable(){return this.current&&O(this.context.gateway.snapshot)}get selected(){return this.current?this.rows.find(e=>e.environment.id===this.selectedId):void 0}subscribe(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}notify(){for(let e of this.listeners)e()}projectRows(){this.rows=this.inventory&&this.current?B(this.inventory,this.context.sessions.state.result?.sessions??[]):[]}select(e){this.current&&e.trim()&&(this.telemetryRequest?.abort(),this.telemetryRequest=void 0,this.selectedId=e,this.notify())}search(e){this.query=e,this.notify()}toggleStats(){this.showStats=!this.showStats,this.notify()}toggleDetails(){this.showDetails=!this.showDetails,this.notify()}setPresented(e){if(this.presented!==e){if(this.presented=e,!e){for(let e of this.subscriptions)e();this.subscriptions=[],this.cancelRefresh();return}this.subscriptions=[this.context.gateway.subscribe(e=>{let t=this.lifecycle.transition(e);this.current?t&&(this.cancelRefresh(),e.phase===`connected`&&this.refresh()):this.clear(),this.notify()}),this.context.gateway.subscribeEvents(e=>{e.event===`presence`||e.event===`node.pair.resolved`||e.event===`node.runnerInventory.changed`?this.refresh():e.event===`node.hostStats`&&t(e.payload)&&typeof e.payload.nodeId==`string`&&this.selectedId===`node:${e.payload.nodeId}`&&this.refreshTelemetry()}),this.context.sessions.subscribe(()=>{this.projectRows(),this.notify()})],this.lifecycle.transition(this.context.gateway.snapshot),this.current?this.refresh():this.clear()}}cancelRefresh(){this.generation+=1,this.request?.abort(),this.telemetryRequest?.abort(),this.request=void 0,this.telemetryRequest=void 0,this.loading=!1,this.refreshQueued=!1}clear(){this.cancelRefresh(),this.inventory=null,this.rows=[],this.selectedId=null,this.error=null,this.sampledAtMs=null,this.query=``}async refresh(){let e=this.context.gateway.snapshot;this.lifecycle.transition(e);let t=this.lifecycle.capture();if(!this.presented||!this.current||!t||!A(e.hello?.auth??null))return;if(this.loading){this.refreshQueued=!0;return}this.cancelRefresh();let n=this.generation,r=new AbortController;this.request=r;let i=()=>this.presented&&this.current&&n===this.generation&&this.lifecycle.isCurrent(t);this.loading=!0,this.error=null,this.notify();try{let e=await z(t.client,{signal:r.signal,isCurrent:i});if(!e||!i())return;let n=this.inventory===null;if(this.inventory=e,this.projectRows(),this.sampledAtMs=Date.now(),n&&this.selectedId===null){let e=this.context.gateway.snapshot.sessionKey;this.selectedId=this.rows.find(t=>t.sessions.some(t=>t.session.key===e))?.environment.id??this.rows.find(e=>e.environment.id===`gateway`)?.environment.id??this.rows[0]?.environment.id??null}}catch(e){i()&&(this.error=g(e))}finally{if(i()){this.loading=!1,this.request=void 0;let e=this.refreshQueued;this.refreshQueued=!1,this.notify(),e&&this.refresh()}}}async refreshTelemetry(){let e=this.selected,t=this.inventory,n=this.lifecycle.capture();if(!this.presented||!this.current||!n||!e||!t||this.loading||this.telemetryRequest)return;let r=e.environment.id===`gateway`;if(!r&&e.environment.type!==`node`)return;let i=new AbortController;this.telemetryRequest=i;let a=this.generation,o=this.selectedId,s=()=>this.presented&&this.current&&this.lifecycle.isCurrent(n)&&this.telemetryRequest===i&&a===this.generation&&this.selectedId===o;try{if(r){let e=await n.client.request(`system.info`,{},{signal:i.signal});if(!s()||!this.inventory)return;let{systemInfo:t,...r}=this.inventory.errors;this.inventory={...this.inventory,gatewaySystemInfo:e,errors:r},this.sampledAtMs=Date.now()}else{let e=await n.client.request(`node.list`,{},{signal:i.signal});if(!s()||!this.inventory)return;let{nodes:t,...r}=this.inventory.errors;this.inventory={...this.inventory,nodes:e.nodes,errors:r}}this.projectRows()}catch(e){s()&&this.inventory&&(this.inventory={...this.inventory,errors:{...this.inventory.errors,[r?`systemInfo`:`nodes`]:g(e)}})}finally{s()&&(this.telemetryRequest=void 0,this.notify())}}}})))()}function W(e){return e.gatewaySystemInfo?.machineName??e.environment.label??e.node?.displayName??(e.environment.id===`gateway`?a(`systems.host`):e.environment.id)}function G(e){return e.environment.id===`gateway`?`host`:e.environment.type===`node`?`node`:`worker`}function K(e){return a(e.environment.status===`available`?`systems.online`:e.environment.status===`unavailable`?`systems.offline`:`systems.statuses.`+e.environment.status)}var q;function J(){return(J=e((()=>{x(),S(),T(),f(),R(),y(),p(),L(),q=class extends u{constructor(){super(),new o(this).watch(()=>this.controller,(e,t)=>e.subscribe(t))}render(){let e=this.controller;if(!e?.current)return b;let t=e.query.trim().toLocaleLowerCase(),n=e.rows.filter(e=>[W(e),e.environment.id,e.environment.platform??e.node?.platform??``].some(e=>e.toLocaleLowerCase().includes(t)));return C`<section class="systems-sidebar" aria-label=${a(`systems.inventory`)}>
      <header class="systems-sidebar__header">
        <h2>${a(`systems.inventory`)}</h2>
        <span>${e.rows.length}</span>
        <button
          type="button"
          class="systems-icon-button"
          aria-label=${a(`systems.refresh`)}
          title=${a(`systems.refresh`)}
          ?disabled=${e.loading||!e.connected}
          @click=${()=>void e.refresh()}
        >
          ${E.refresh}
        </button>
      </header>
      <label class="systems-search">
        <span aria-hidden="true">${E.search}</span>
        <input
          type="search"
          aria-label=${a(`systems.search`)}
          placeholder=${a(`systems.search`)}
          .value=${e.query}
          @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.search(t.currentTarget.value)}}
        />
      </label>
      <div class="systems-sidebar__list" aria-busy=${e.loading}>
        ${e.loading&&!e.inventory?C`<p class="systems-sidebar__empty" role="status">${a(`systems.loading`)}</p>`:b}
        ${[`host`,`worker`,`node`].map(t=>{let r=n.filter(e=>G(e)===t);return r.length?C`<section class="systems-group">
                <h3>
                  ${a(t===`host`?`systems.hosts`:t===`worker`?`systems.workers`:`systems.nodes`)}
                </h3>
                ${r.map(t=>C`<button
                    class="systems-machine"
                    type="button"
                    aria-pressed=${t.environment.id===e.selectedId}
                    @click=${()=>e.select(t.environment.id)}
                  >
                    <span class="systems-machine__icon" aria-hidden="true"
                      >${t.environment.desktop?E.monitor:E.server}</span
                    >
                    <span class="systems-machine__copy"
                      ><strong>${W(t)}</strong>
                      <span
                        ><i
                          class="systems-status-dot"
                          data-online=${t.environment.status===`available`}
                        ></i
                        >${K(t)}</span
                      >
                      <small
                        >${t.environment.platform??t.node?.platform??a(`systems.unknown`)} ·
                        ${a(t.environment.desktop?`systems.desktop`:`systems.headless`)}</small
                      >
                    </span>
                  </button>`)}
              </section>`:b})}
        ${!e.loading&&n.length===0?C`<p class="systems-sidebar__empty">${a(t?`systems.noMatches`:`systems.empty`)}</p>`:b}
      </div>
    </section>`}},n([w({attribute:!1})],q.prototype,`controller`,void 0),customElements.get(`openclaw-systems-sidebar`)||customElements.define(`openclaw-systems-sidebar`,q)})))()}function Y(e){return e.gatewaySystemInfo??e.node?.hostStats}function X(e){return r(e,{style:`legacy-binary`,separator:` `,maxUnit:`tera`,fractionDigits:(e,t)=>+(t===`tera`||e<10)})}function Z(e,t,n){let r=Y(e);if(!r)return C`<p class="systems-no-telemetry">${a(`systems.noTelemetry`)}</p>`;let i=e.node?.hostStats?.updatedAtMs??t,o=!n||e.environment.status!==`available`||i!==null&&Date.now()-i>3e4;return C`<div class="systems-metrics" data-stale=${o}>
    <div>
      <span>${a(`systems.load`)}</span
      ><strong
        >${r.loadAverage?r.loadAverage[0].toFixed(2):a(`systems.unavailable`)}</strong
      ><small>${a(`systems.cpuCount`,{count:String(r.cpuCount)})}</small>
    </div>
    <div>
      <span>${a(`systems.memory`)}</span
      ><strong
        >${X(r.memoryTotalBytes-r.memoryFreeBytes)}
        <small>/ ${X(r.memoryTotalBytes)}</small></strong
      >
    </div>
    <div>
      <span>${a(`systems.disk`)}</span
      ><strong
        >${r.diskAvailableBytes===void 0?a(`systems.unavailable`):X(r.diskAvailableBytes)}</strong
      >
    </div>
    ${i===null?b:C`<span class="systems-sample-time">${a(o?`systems.lastKnown`:`systems.sampled`,{time:_(Math.max(0,Date.now()-i))})}</span>`}
  </div>`}function re(e,t,n=!0){return e?C`<openclaw-systems-page
        .routeData=${e}
        .presented=${n}
      ></openclaw-systems-page>`:b}function ie(e){return e?C`<openclaw-systems-sidebar .controller=${e.controller}></openclaw-systems-sidebar>`:b}function ae(e){return{controller:new H(e)}}var Q;function $(){return($=e((()=>{x(),S(),T(),ne(),k(),f(),R(),v(),l(),y(),te(),p(),U(),J(),L(),Q=class extends u{constructor(){super(),this.presented=!0,this.poll=new F(this,15e3,()=>{this.presented&&document.visibilityState!==`hidden`&&(this.routeData?.controller.showStats||this.routeData?.controller.showDetails)&&this.routeData?.controller.refreshTelemetry()}),this.handleDesktopToggle=e=>{let n=this.routeData?.controller;if(!this.presented||!n?.current||!(e instanceof CustomEvent))return;let r=t(e.detail)?e.detail:{},i=typeof r.environmentId==`string`?r.environmentId:void 0;if(e.preventDefault(),e.stopImmediatePropagation(),r?.open===!1){this.querySelector(`openclaw-desktop-panel`)?.handleToggleRequest(e);return}if(i&&i!==n.selectedId){n.select(i),n.rows.some(e=>e.environment.id===i)||n.refresh();return}i&&this.querySelector(`openclaw-desktop-panel`)?.handleToggleRequest(e)},this.poll,new o(this).watch(()=>this.routeData?.controller,(e,t)=>e.subscribe(t))}connectedCallback(){super.connectedCallback(),window.addEventListener(j,this.handleDesktopToggle)}disconnectedCallback(){window.removeEventListener(j,this.handleDesktopToggle),this.activeController?.setPresented(!1),this.activeController=void 0,super.disconnectedCallback()}updated(e){(e.has(`routeData`)||e.has(`presented`))&&(this.activeController!==this.routeData?.controller&&this.activeController?.setPresented(!1),this.activeController=this.routeData?.controller,this.activeController?.setPresented(this.presented))}renderDetails(e,t){let n=t.environment;return C`<aside class="systems-details" aria-label=${a(`systems.details`)}>
      <header>
        <h2>${a(`systems.details`)}</h2>
        <button
          class="systems-icon-button"
          aria-label=${a(`systems.closeDetails`)}
          @click=${()=>e.toggleDetails()}
        >
          ${E.x}
        </button>
      </header>
      <dl>
        <dt>${a(`systems.identifier`)}</dt>
        <dd>${n.id}</dd>
        <dt>${a(`systems.status`)}</dt>
        <dd>${e.connected?K(t):a(`systems.offline`)}</dd>
        <dt>${a(`systems.platform`)}</dt>
        <dd>${n.platform??t.node?.platform??a(`systems.unknown`)}</dd>
      </dl>
      <h3>${a(`systems.telemetry`)}</h3>
      ${Z(t,e.sampledAtMs,e.connected)}
      <h3>${a(`systems.relatedSessions`)}</h3>
      <p class="systems-detail-hint">${a(`systems.relatedHint`)}</p>
      ${t.sessions.length?t.sessions.map(t=>{let n=t.session,r=h(n),o=i({context:e.context,face:r,sessionKey:n.key,preferenceDerivedFace:!0});return C`<a
                class="systems-session-link"
                href=${o.href}
                @click=${t=>{s(t)&&(t.preventDefault(),e.context.navigate(r,o.options))}}
                ><strong>${n.displayName??n.label??n.key}</strong
                ><span>${a(`systems.relations.`+t.kind)}</span></a
              >`}):C`<p class="systems-detail-hint">${a(`systems.noRelatedSessions`)}</p>`}
      ${n.worker?.attachedSessionIds.length?C`<h3>${a(`systems.attachedSessions`)}</h3>
              <p class="systems-detail-hint">${a(`systems.attachedHint`)}</p>
              <ul>
                ${n.worker.attachedSessionIds.map(e=>C`<li>${e}</li>`)}
              </ul>`:b}
      <h3>${a(`systems.capabilities`)}</h3>
      <div class="systems-capabilities">
        ${(n.capabilities??[]).map(e=>C`<span>${e}</span>`)}
      </div>
    </aside>`}render(){let e=this.routeData?.controller;if(!e?.current)return C`<p class="systems-state" role="status">${a(`systems.loading`)}</p>`;let t=e.selected,n=!!(t?.environment.desktop&&t.environment.status===`available`&&e.desktopAvailable&&this.presented),r=t?W(t):a(`systems.title`),i=Object.values(e.inventory?.errors??{}),o=e.connected?e.loading&&!e.inventory?a(`systems.loading`):e.selectedId&&!t?a(`systems.missingTitle`):t?t.environment.status===`available`?t.environment.desktop?a(`systems.accessTitle`):a(`systems.noDesktopTitle`):t.environment.status===`unavailable`?a(`systems.offlineTitle`):K(t):a(`systems.select`):a(`systems.offlineGateway`),s=e.selectedId&&!t?a(`systems.missingHint`):t?t.environment.status===`available`?t.environment.desktop?a(`systems.accessHint`):a(`systems.noDesktopHint`):a(`systems.offlineHint`):a(`systems.selectHint`);return C`<section class="systems-workspace" aria-label=${a(`systems.title`)}>
      <header class="systems-toolbar">
        <div class="systems-heading">
          <h1>${r}</h1>
          <span>${a(t?`systems.`+G(t):`systems.selectHint`)}</span>
        </div>
        <select
          class="systems-mobile-picker"
          aria-label=${a(`systems.select`)}
          @change=${t=>{t.currentTarget instanceof HTMLSelectElement&&e.select(t.currentTarget.value)}}
        >
          <option value="" disabled .selected=${!t}>${a(`systems.select`)}</option>
          ${e.rows.map(t=>C`<option value=${t.environment.id} .selected=${t.environment.id===e.selectedId}>${W(t)}</option>`)}
        </select>
        <button
          class="systems-icon-button"
          title=${a(e.showStats?`systems.hideStats`:`systems.stats`)}
          aria-label=${a(e.showStats?`systems.hideStats`:`systems.stats`)}
          aria-pressed=${e.showStats}
          @click=${()=>e.toggleStats()}
        >
          ${E.activity}
        </button>
        <button
          class="systems-icon-button"
          title=${a(`systems.details`)}
          aria-label=${a(`systems.details`)}
          aria-pressed=${e.showDetails}
          ?disabled=${!t}
          @click=${()=>e.toggleDetails()}
        >
          ${E.panelRightOpen}
        </button>
      </header>
      ${e.error?C`<div class="systems-callout systems-callout--error" role="alert">${e.error}<button @click=${()=>void e.refresh()} ?disabled=${e.loading}>${a(`common.retry`)}</button></div>`:b}
      ${e.connected?b:C`<div class="systems-callout" role="status">${a(`systems.offlineGateway`)}</div>`}
      ${i.length?C`<details class="systems-callout">
              <summary>${a(`systems.errors`)}</summary>
              ${i.map(e=>C`<p>${e}</p>`)}
            </details>`:b}
      ${e.showStats&&t?Z(t,e.sampledAtMs,e.connected):b}
      <div class="systems-body">
        <div class="systems-desktop">
          ${n&&t?C`<openclaw-desktop-panel
                  embedded
                  data-chat-autotype-exempt
                  .client=${e.context.gateway.snapshot.client}
                  .available=${e.desktopAvailable}
                  .presented=${this.presented}
                  .workspaceControls=${!0}
                  .suppliedEnvironments=${e.inventory?.environments??[]}
                  .requestedSource=${t.environment.id}
                  .basePath=${e.context.basePath}
                ></openclaw-desktop-panel>`:C`<div class="systems-state" role="status">
                  <span class="systems-state__icon" aria-hidden="true">${E.monitor}</span>
                  <h2>${o}</h2>
                  <p>${s}</p>
                  ${t?C`<button class="systems-text-button" @click=${()=>e.toggleDetails()}>${a(`systems.details`)}</button>`:b}
                </div>`}
        </div>
        ${e.showDetails&&t?this.renderDetails(e,t):b}
      </div>
    </section>`}},n([w({attribute:!1})],Q.prototype,`routeData`,void 0),n([w({type:Boolean})],Q.prototype,`presented`,void 0),customElements.get(`openclaw-systems-page`)||customElements.define(`openclaw-systems-page`,Q)})))()}$();export{ae as load,re as render,ie as renderSidebar};
//# sourceMappingURL=systems-page-B5UanI79.js.map