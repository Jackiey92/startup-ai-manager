import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,Rt as r,zr as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,Ir as o,Pr as s,Sl as c,Tl as l,dc as u,fc as d,ii as f,ri as p,wl as m}from"./control-ui-core-CndkyZ8m.js";import{$ as h,Q as g,at as _,dt as v,nt as y}from"./lit-runtime-CIjzngcy.js";import{$r as ee,Ht as b,Nt as x,Qr as S,bi as te,jt as ne,si as re,xi as ie}from"./control-ui-core-C5mtYcym.js";import{Fa as ae,Ia as oe,Ii as se,Li as ce,Ni as le,Pi as ue}from"./control-ui-boot-shared-DlJEsz5Q.js";import{_t as C,dt as w,ht as T,it as E,mt as D,nt as O,pt as k}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as A,t as j}from"./en-settings-BjX72HeL.js";import{B as M}from"./control-ui-boot-new-CQMzhCGu.js";import{n as N,o as P}from"./settings-targets-Bmbk6FUn.js";import{n as F,t as I}from"./settings-workspace-gGOfyDax.js";import{n as L,r as R,t as z}from"./system-info-n2ZCuN0M.js";import{a as B,n as V}from"./gateway-vitals--gTQZX_w.js";function H(e){if(e.length===0)return null;let t=e.toSorted((e,t)=>e-t),n=e=>t[Math.ceil(t.length*e)-1];return{count:e.length,averageMs:e.reduce((e,t)=>e+t,0)/e.length,p50Ms:n(.5),p95Ms:n(.95),p99Ms:n(.99)}}function U(){return(U=e((()=>{})))()}function de(e){return e>=.92?`critical`:e>=.75?`warn`:`ok`}function fe(e,t){let n=Math.min(Math.max(t,0),1),r=Math.round(n*100);return y`
    <div
      class="config-host__meter"
      role="meter"
      aria-label=${a(`quickSettings.system.usage`,{label:e})}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${r}
    >
      <div
        class="config-host__meter-fill config-host__meter-fill--${de(n)}"
        style="--config-host-meter-fill: ${r}%"
      ></div>
    </div>
  `}function pe(e){let t=e.path?`${e.label} ${e.path}`:e.label;return y`
    <div class="config-host__stat" title=${e.title??h}>
      <div class="config-host__stat-label">
        ${e.label}${e.path?y` <span class="config-host__stat-path">${e.path}</span>`:h}
      </div>
      <div class="config-host__stat-value">
        ${e.value}${e.unit?y` <span class="config-host__stat-unit">${e.unit}</span>`:h}
      </div>
      ${e.usedFraction==null?h:fe(t,e.usedFraction)}
      ${e.detail?y`<div class="config-host__stat-detail">${e.detail}</div>`:h}
    </div>
  `}function W(e,t){if(!(e==null||t==null||e<=0))return(e-t)/e}function G(e){return`${Math.round(Math.min(Math.max(e,0),1)*100)}%`}function me(e){let t=e.loadAverage?.[0],n=e.loadAverage?a(`quickSettings.system.loadAverage`,{values:e.loadAverage.map(e=>e.toFixed(1)).join(` · `)}):void 0,r=[e.cpuModel,n].filter(Boolean).join(` · `)||void 0,i=a(e.cpuCount===1?`quickSettings.system.core`:`quickSettings.system.cores`,{count:String(e.cpuCount)}),o=t==null?{label:a(`quickSettings.system.cpu`),value:i,detail:e.cpuModel}:{label:a(`quickSettings.system.cpu`),value:t.toFixed(1),unit:a(`quickSettings.system.load`),detail:i,usedFraction:e.cpuCount>0?t/e.cpuCount:void 0,title:r},s=W(e.memoryTotalBytes,e.memoryFreeBytes),c=[o,{label:a(`quickSettings.system.memory`),value:s==null?`—`:G(s),unit:s==null?void 0:a(`quickSettings.system.used`),detail:a(`quickSettings.system.freeOf`,{free:u(e.memoryFreeBytes),total:u(e.memoryTotalBytes)}),usedFraction:s}];for(let t of e.disks??[]){let e=W(t.totalBytes,t.availableBytes);e!=null&&c.push({label:a(`quickSettings.system.disk`),value:G(e),unit:a(`quickSettings.system.used`),detail:a(`quickSettings.system.freeOf`,{free:u(t.availableBytes),total:u(t.totalBytes)}),usedFraction:e,path:t.path})}return c}function he(e){return[{label:a(`quickSettings.system.cpu`),value:e},{label:a(`quickSettings.system.memory`),value:e},{label:a(`quickSettings.system.disk`),value:e}]}function ge(e){if(e.systemInfoUnavailable)return h;let t=e.systemInfo,n=e.systemInfoLoading?y`<span class="skeleton config-host__placeholder" aria-hidden="true"></span>`:`—`,r=t&&t.hostname!==t.machineName?t.hostname:void 0,i=t?.lanAddress?`${t.lanAddress}${t.port==null?``:`:${t.port}`}`:void 0,o=t?me(t):he(n),s={title:a(`quickSettings.system.gatewayHost`),actions:t?C({kind:`ok`,label:a(`quickSettings.system.up`,{duration:se(t.uptimeMs)})}):void 0};return y`
    <div id=${N.host} aria-busy=${!!e.systemInfoLoading}>
      ${T(s,y`
          <div class="config-host">
            <div class="config-host__identity">
              <div class="config-host__name" title=${r??``}>
                ${t?.machineName??n}
              </div>
              <div class="config-host__meta">
                ${t?`${t.osLabel} · ${t.arch}`:n}
              </div>
              <div class="config-host__meta">
                ${t?a(`quickSettings.system.runtime`,{version:t.nodeVersion,pid:String(t.pid)}):n}
              </div>
              ${i?y`<code class="config-host__address">${i}</code>`:h}
            </div>
            <div class="config-host__stats">${o.map(pe)}</div>
          </div>
        `)}
    </div>
  `}function K(){return(K=e((()=>{g(),O(),l(),d(),ce(),P()})))()}function _e(e){return e?`${(e/1e3).toFixed(e%1e3==0?0:1)}s`:null}function q(e,t){let n=t===`password`?`connection.access.passwordHint`:t===`token`?`connection.access.tokenHint`:`connection.access.secretHint`;return k({title:a(`connection.access.secret`),description:a(n),control:y`<div class="settings-input-with-hint">
      ${D({ariaLabel:a(`connection.access.secret`),value:e.secret,placeholder:a(`connection.access.secretPlaceholder`),visible:e.showGatewaySecret,showLabel:a(`connection.access.showSecret`),hideLabel:a(`connection.access.hideSecret`),toggleLabel:a(`connection.access.toggleSecretVisibility`),onInput:e.onSecretChange,onToggle:e.onToggleGatewaySecretVisibility})}
      ${M(e.secret)===`setup-code`?y`<p class="settings-row__desc" role="status">
              ${a(`connection.access.setupCodeHint`)}
            </p>`:h}
    </div>`,stackedOnNarrow:!0})}function ve(e){return`${e.toFixed(1)} ${a(`connection.ping.unit`)}`}function ye(e){let t=[{key:`average`,value:e.ping?.averageMs},{key:`p50`,value:e.ping?.p50Ms},{key:`p95`,value:e.ping?.p95Ms},{key:`p99`,value:e.ping?.p99Ms}];return y`<div class="settings-row connection-ping">
    <dl class="connection-ping__stats" aria-label=${a(`connection.ping.title`)}>
      ${t.map(({key:e,value:t})=>y`<div title=${a(`connection.ping.${e}Hint`)}>
          <dt>${a(`connection.ping.${e}`)}</dt>
          <dd>
            ${t===void 0?`—`:y`${t.toFixed(1)} <span>${a(`connection.ping.unit`)}</span>`}
          </dd>
        </div>`)}
    </dl>
    <openclaw-sparkline
      class="gateway-vital connection-ping__trend"
      .label=${a(`connection.ping.latest`)}
      .samples=${e.pingSamples}
      .format=${ve}
      .floorMax=${100}
    ></openclaw-sparkline>
    <p class="settings-row__desc">
      ${e.ping?a(`connection.ping.samples`,{count:String(e.ping.count)}):e.pingFailed?h:a(`connection.ping.measuring`)}
      ${e.pingFailed?y`<span class="connection-ping__error" role="status">
              ${a(`connection.ping.failed`)}
            </span>`:h}
    </p>
  </div>`}function be(e){let t=e.hello?.snapshot,n=e.phase===`connected`,i=[`connecting`,`starting`,`reconnecting`].includes(e.phase),o=i&&!e.dirty,s=e.phase===`reload-required`,c=t?.authMode,l=r(e.settings.gatewayUrl)===r(e.liveGatewayUrl)?c:void 0,u=l===`trusted-proxy`,d=n?`connected`:e.phase===`stopped`?`offline`:e.phase,f=a(o?e.phase===`reconnecting`?`connection.access.status.reconnecting`:`connection.access.status.connecting`:n||i?`connection.access.applyReconnect`:e.lastError?`connection.access.retry`:`common.connect`),m=_e(e.hello?.policy?.tickIntervalMs),g=y`
    ${n?ye(e):h}
    ${k({title:a(`connection.access.gatewayUrl`),description:a(`connection.access.gatewayUrlHint`),control:y`
        <input
          class="settings-input"
          aria-label=${a(`connection.access.gatewayUrl`)}
          inputmode="url"
          autocapitalize="none"
          autocorrect="off"
          autocomplete="off"
          spellcheck="false"
          .value=${e.settings.gatewayUrl}
          @input=${t=>{e.onConnectionChange({gatewayUrl:t.target.value})}}
          placeholder="wss://gateway.example:443"
        />
      `})}
    ${u?k({title:a(`connection.access.secret`),description:a(`connection.access.trustedProxy`),control:C({kind:`ok`,label:a(`connection.access.trustedProxyStatus`)})}):q(e,l)}
    ${!n&&e.lastError?k({title:C({kind:`danger`,label:a(`connection.access.lastError`)}),description:e.lastError}):h}
    ${(!n||e.dirty)&&!s?y`<div class="settings-row connection-actions">
            <div class="settings-row__text">
              <span class="settings-row__desc" role="status">
                ${e.dirty?a(`connection.access.unsavedHint`):h}
              </span>
            </div>
            <div class="settings-row__control connection-actions__buttons">
              ${e.dirty?y`<button class="btn" @click=${e.onDiscardConnection}>
                      ${a(`connection.access.discard`)}
                    </button>`:h}
              <button class="btn primary" ?disabled=${o} @click=${e.onConnect}>
                ${o?y`<span class="btn__spinner" aria-hidden="true"></span>`:h}
                ${f}
              </button>
            </div>
          </div>`:h}
    <details class="connection-details">
      <summary>${a(`connection.access.details`)}</summary>
      <div class="connection-details__body">
        ${n&&(c||m)?y`<p class="settings-row__desc">
                ${[c?a(J[c]):null,m?a(`connection.access.tick`,{tick:m}):null].filter(Boolean).join(` · `)}
              </p>`:h}
        <p class="settings-row__desc">${a(`connection.access.reconnectHint`)}</p>
        <button class="btn" ?disabled=${!n||e.dirty} @click=${e.onReconnect}>
          ${a(`connection.access.reconnect`)}
        </button>
      </div>
    </details>
  `;return w([T({title:a(`connection.access.title`),description:n?a(`connection.access.connectedTo`,{host:p(e.liveGatewayUrl)}):a(i||s?`connection.access.status.${d}`:`connection.access.descriptionOffline`),actions:C({kind:n?`ok`:`warn`,label:a(`connection.access.status.${d}`)})},g),T({title:a(`connection.activity.title`),description:a(`connection.activity.description`)},y`<div class="settings-row connection-activity">
        ${B(e.statusHistory.at(-1)?.status??{},e.statusHistory)}
        ${e.statusFailed?y`<p class="settings-row__desc" role="status">
                ${a(`connection.activity.failed`)}
              </p>`:n?e.statusHistory.length===0?y`<p class="settings-row__desc" role="status">${a(`common.loading`)}</p>`:h:y`<p class="settings-row__desc">${a(`connection.activity.offline`)}</p>`}
      </div>`),T({title:a(`connection.access.sessionTitle`),description:a(`connection.access.sessionDescription`,{host:p(e.liveGatewayUrl)})},y`
        ${k({title:a(`connection.access.sessionKey`),description:a(`connection.access.sessionKeyHint`),control:y`
            <input
              class="settings-input"
              aria-label=${a(`connection.access.sessionKey`)}
              .value=${e.settings.sessionKey}
              @input=${t=>e.onSessionKeyChange(t.target.value)}
            />
          `})}
        ${e.sessionDirty?y`<div class="settings-row">
                <div class="settings-row__text"></div>
                <div class="settings-row__control connection-actions__buttons">
                  <button class="btn" @click=${e.onDiscardSession}>
                    ${a(`connection.access.discard`)}
                  </button>
                  <button
                    class="btn primary"
                    ?disabled=${!e.settings.sessionKey.trim()}
                    @click=${e.onSaveSession}
                  >
                    ${a(`common.save`)}
                  </button>
                </div>
              </div>`:e.sessionSaved?y`<div class="settings-row" role="status">${a(`connection.access.saved`)}</div>`:h}
      `),ge(e)])}var J;function Y(){return(Y=e((()=>{g(),V(),O(),l(),j(),f(),K(),A(),J={none:`connection.access.auth.none`,token:`connection.access.auth.token`,password:`connection.access.auth.password`,"trusted-proxy":`connection.access.auth.trustedProxy`}})))()}var X,Z,Q;function $(){return($=e((()=>{i(),g(),_(),re(),ee(),ne(),O(),I(),s(),oe(),m(),ue(),U(),z(),Y(),X=5e3,Z=`https://docs.openclaw.ai/gateway/remote`,Q=class extends c{constructor(...e){super(...e),this.settings=x(),this.password=``,this.gatewaySecretVisible=!1,this.systemInfo=null,this.systemInfoUnavailable=!1,this.systemInfoLoading=!1,this.ping=null,this.pingFailed=!1,this.pingSamples=[],this.pingRequest=null,this.statusHistory=[],this.statusFailed=!1,this.systemInfoRequest=null,this.sessionKeyBaseline=``,this.sessionGatewayUrl=``,this.sessionSaved=!1,this.diagnosticsPolling=new le(this,X,()=>this.refreshDiagnostics(),!1),this.gateway=new ae(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>{this.systemInfoLoading=!1,this.resetDiagnostics()},onSnapshot:e=>this.handleGatewaySnapshot(e),onPageActivation:()=>this.syncDiagnosticsPolling()})}disconnectedCallback(){this.resetDiagnostics(),this.resetSensitiveUi(),super.disconnectedCallback()}resetSensitiveUi(){this.gatewaySecretVisible=!1}handleGatewaySnapshot({snapshot:e,initial:t,sourceChanged:n,clientChanged:r}){let i=this.systemInfoUnavailable;t||n||r?(this.resetDiagnostics(),this.resetConnectionDraft(),(t||n||this.sessionGatewayUrl!==this.context.gateway.connection.gatewayUrl)&&this.resetSessionDraft(),this.systemInfo=null,this.systemInfoUnavailable=!1):e.phase!==`connected`&&(this.resetSensitiveUi(),this.systemInfo=null),e.phase===`connected`&&e.hello&&(this.systemInfoUnavailable=!R(e.hello),this.systemInfoUnavailable&&(this.gateway.invalidate(),this.systemInfoRequest?.abort(),this.systemInfoRequest=null,this.systemInfoLoading=!1,this.systemInfo=null,this.statusFailed=!0)),this.settings.sessionKey===this.sessionKeyBaseline&&(this.settings={...this.settings,sessionKey:e.sessionKey}),this.sessionKeyBaseline=e.sessionKey,this.syncDiagnosticsPolling(),i&&!this.systemInfoUnavailable&&this.loadSystemInfo()}stopDiagnosticsPolling(){this.diagnosticsPolling.stop(),this.pingRequest?.abort(),this.pingRequest=null,this.systemInfoRequest?.abort(),this.systemInfoRequest=null,this.systemInfoLoading=!1}resetDiagnostics(){this.stopDiagnosticsPolling(),this.pingSamples=[],this.ping=null,this.pingFailed=!1,this.statusHistory=[],this.statusFailed=!1}syncDiagnosticsPolling(){let e=this.context.gateway.snapshot;if(!this.isConnected||document.visibilityState===`hidden`||e.phase!==`connected`||!e.client){this.stopDiagnosticsPolling();return}this.diagnosticsPolling.start()&&this.refreshDiagnostics()}refreshDiagnostics(){this.measurePing(),this.loadSystemInfo()}async measurePing(){let e=this.gateway.gateway,t=this.gateway.capture();if(!e||e!==this.context.gateway||!t||this.pingRequest||document.visibilityState===`hidden`)return;let n=new AbortController;this.pingRequest=n;let r=()=>this.pingRequest===n&&this.isConnected&&document.visibilityState!==`hidden`&&this.context.gateway===e&&this.gateway.isCurrent(t),i=performance.now();try{if(await t.client.request(`last-heartbeat`,{},{timeoutMs:X,signal:n.signal}),!r())return;this.pingSamples=[...this.pingSamples.slice(-99),{at:Date.now(),value:performance.now()-i}],this.ping=H(this.pingSamples.map(e=>e.value)),this.pingFailed=!1}catch{r()&&(this.pingFailed=!0)}finally{this.pingRequest===n&&(this.pingRequest=null)}}async loadSystemInfo(){let e=this.gateway.gateway,t=this.gateway.capture();if(!e||e!==this.context.gateway||!t||this.systemInfoUnavailable||this.systemInfoRequest||document.visibilityState===`hidden`)return;let n=new AbortController;this.systemInfoRequest=n,this.systemInfoLoading=!0;let r=()=>this.systemInfoRequest===n&&this.isConnected&&document.visibilityState!==`hidden`&&this.context.gateway===e&&this.gateway.isCurrent(t);try{let e=await t.client.request(`system.info`,{},{timeoutMs:X,signal:n.signal});if(!r())return;this.systemInfo=e,this.statusHistory=[...this.statusHistory.slice(-99),{at:Date.now(),status:{eventLoop:e.eventLoop,processMemory:e.processMemory}}],this.statusFailed=!1}catch(e){if(!r())return;this.statusFailed=!0,(o(e)||L(e))&&(this.systemInfo=null,this.systemInfoUnavailable=!0)}finally{this.systemInfoRequest===n&&(this.systemInfoRequest=null,this.systemInfoLoading=!1)}}resetConnectionDraft(){let{gatewayUrl:e,token:t,password:n}=this.context.gateway.connection;this.settings={...this.settings,gatewayUrl:e,token:t},this.password=n,this.resetSensitiveUi()}resetSessionDraft(){this.sessionGatewayUrl=this.context.gateway.connection.gatewayUrl,this.sessionKeyBaseline=this.context.gateway.snapshot.sessionKey,this.settings={...this.settings,sessionKey:this.sessionKeyBaseline},this.sessionSaved=!1}saveSession(){this.context.gateway.setSessionKey(this.settings.sessionKey),this.resetSessionDraft(),this.sessionSaved=!0}connect(){this.context.gateway.connect({gatewayUrl:this.settings.gatewayUrl,token:this.settings.token,password:this.password})}updateConnection(e){if(e.gatewayUrl!==void 0){let t=b(this.settings.gatewayUrl,e.gatewayUrl,{token:this.settings.token,password:this.password});this.password=t.password,this.settings={...this.settings,...e,token:t.token};return}this.settings={...this.settings,...e}}render(){let e=this.context.gateway.snapshot,t=this.context.gateway.connection,n=this.settings.gatewayUrl!==t.gatewayUrl||this.settings.token!==t.token||this.password!==t.password,r=be({phase:e.phase,hello:e.hello,settings:this.settings,liveGatewayUrl:t.gatewayUrl,secret:this.settings.token||this.password,lastError:e.lastError,systemInfo:this.systemInfo,systemInfoLoading:this.systemInfoLoading,systemInfoUnavailable:this.systemInfoUnavailable,ping:this.ping,pingFailed:this.pingFailed,pingSamples:this.pingSamples,statusHistory:this.statusHistory,statusFailed:this.statusFailed,dirty:n,sessionDirty:this.settings.sessionKey.trim()!==e.sessionKey,sessionSaved:this.sessionSaved,showGatewaySecret:this.gatewaySecretVisible,onConnectionChange:e=>this.updateConnection(e),onSecretChange:e=>{this.password=``,this.updateConnection({token:e})},onSessionKeyChange:e=>{this.sessionSaved=!1,this.settings={...this.settings,sessionKey:e}},onToggleGatewaySecretVisibility:()=>{this.gatewaySecretVisible=!this.gatewaySecretVisible},onConnect:()=>this.connect(),onDiscardConnection:()=>this.resetConnectionDraft(),onReconnect:()=>this.context.gateway.connect(),onSaveSession:()=>this.saveSession(),onDiscardSession:()=>this.resetSessionDraft()});return y`
      <section class="content-header">
        <div>
          <div class="page-title">${ie(`connection`)}</div>
          <div class="page-subtitle">
            ${te(`connection`)} ${E(Z)}
          </div>
        </div>
      </section>
      ${F(r)}
    `}},t([n({context:S,subscribe:!0})],Q.prototype,`context`,void 0),t([v()],Q.prototype,`settings`,void 0),t([v()],Q.prototype,`password`,void 0),t([v()],Q.prototype,`gatewaySecretVisible`,void 0),t([v()],Q.prototype,`systemInfo`,void 0),t([v()],Q.prototype,`systemInfoUnavailable`,void 0),t([v()],Q.prototype,`systemInfoLoading`,void 0),t([v()],Q.prototype,`ping`,void 0),t([v()],Q.prototype,`pingFailed`,void 0),t([v()],Q.prototype,`statusHistory`,void 0),t([v()],Q.prototype,`statusFailed`,void 0),t([v()],Q.prototype,`sessionSaved`,void 0),customElements.get(`openclaw-connection-page`)||customElements.define(`openclaw-connection-page`,Q)})))()}$();
//# sourceMappingURL=connection-page-MpL-HC-w.js.map