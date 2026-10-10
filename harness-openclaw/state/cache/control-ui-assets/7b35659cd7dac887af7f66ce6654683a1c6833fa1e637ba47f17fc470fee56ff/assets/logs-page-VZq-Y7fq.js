import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Ha as n,Kr as r,Rr as i,Wa as a,zr as o}from"./control-ui-foundation-DaCuy7E_.js";import{Al as s,Ir as c,Nr as l,Pr as u,Sl as ee,Tl as te,sn as ne,un as d,wl as f}from"./control-ui-core-CndkyZ8m.js";import{$ as p,Q as m,at as h,dt as g,nt as _}from"./lit-runtime-CIjzngcy.js";import{$r as re,Er as ie,Qr as ae,Tr as oe,si as se,xi as ce}from"./control-ui-core-C5mtYcym.js";import{o as le,s as v}from"./control-ui-boot-shared-DNpYeKSN.js";import{Fa as y,Ia as b,Ni as x,Pi as S,Pt as C}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as w,U as T,V as E,z as D}from"./control-ui-boot-shared-DwSLfX8E.js";import{Ar as O,Mr as k,Nr as A,Pr as j,_t as M,jr as N,kr as P,nt as F,ot as I,pt as L,yt as R}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as ue,t as z}from"./stream-auto-follow-controller-BZ0UzGsg.js";import{n as B,t as V}from"./settings-workspace-gGOfyDax.js";function H(e){let t=[];for(let n of Object.keys(e)){if(!/^\d+$/.test(n))continue;let r=e[n];typeof r==`string`?t.push(r):r!=null&&t.push(JSON.stringify(r))}return t.join(` `)}function U(e){if(typeof e!=`string`||!e.trimStart().startsWith(`{`))return{};try{let t=JSON.parse(e);return{subsystem:typeof t.subsystem==`string`?t.subsystem:void 0,module:typeof t.module==`string`?t.module:void 0,plugin:typeof t.plugin==`string`?t.plugin:void 0}}catch{return{}}}function de(e,t){let n=U(t?.name);if(t?.name===e[0])return n;let r=U(e[0]);return{subsystem:n.subsystem??r.subsystem,module:n.module??r.module,plugin:n.plugin??r.plugin}}function fe(e){try{let n=JSON.parse(e);if(!t(n))return null;let r=t(n._meta)?n._meta:void 0,i=de(n,r),o=typeof r?.logLevelName==`string`?r.logLevelName:void 0;return{time:typeof n.time==`string`?n.time:typeof r?.date==`string`?r.date:void 0,level:a(o),subsystem:i.subsystem,module:i.module,plugin:i.plugin,message:typeof n.message==`string`?n.message:H(n),raw:e}}catch{return null}}function W(){return(W=e((()=>{})))()}function pe(e){if(typeof e!=`string`)return null;let t=n(e);return K.has(t)?t:null}function me(e){let t=fe(e);if(!t)return{raw:e,message:v(e)};let n=t.subsystem??t.module;return{raw:t.raw,time:t.time??null,level:pe(t.level),subsystem:n?v(n):null,message:v(t.message)}}var G,K;function q(){return(q=e((()=>{le(),W(),G={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},K=new Set([`trace`,`debug`,`info`,`warn`,`error`,`fatal`])})))()}function J(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?e:ne(t.getTime(),void 0,e)}function he(e,t){return!t||n([e.message,e.subsystem,e.raw].filter(Boolean).join(` `)).includes(t)}function ge(e){let t=n(e.filterText),r=Y.some(t=>!e.levelFilters[t]),i=e.entries.filter(n=>n.level&&!e.levelFilters[n.level]?!1:he(n,t)),a=t||r?`filtered`:`visible`,o=s(`gatewayLogs.exportLabels.${a}`),c=e.status.hasLoaded?i.length===0?I(s(`gatewayLogs.empty`)):i.map(e=>_`
            <div class="log-row">
              <div class="log-time mono">${J(e.time)}</div>
              <div class="log-level ${e.level??``}">${e.level??``}</div>
              <div class="log-subsystem mono">${e.subsystem??``}</div>
              <div class="log-message mono">${e.message??e.raw}</div>
            </div>
          `):e.loading?ie():p;return _`
    <div class="settings-section__header">
      <h2 class="settings-section__heading">${s(`gatewayLogs.title`)}</h2>
      <div class="settings-section__actions">
        <button class="btn" ?disabled=${e.refreshDisabled} @click=${e.onRefresh}>
          ${e.loading?s(`common.loading`):s(`common.refresh`)}
        </button>
        <button
          class="btn"
          ?disabled=${i.length===0}
          @click=${()=>e.onExport(i.map(e=>e.raw),a)}
        >
          ${s(`gatewayLogs.exportButton`,{label:o})}
        </button>
      </div>
    </div>
    <p class="settings-section__desc">${s(`gatewayLogs.subtitle`)}</p>
    ${j({status:e.status,className:`logs-refresh-status`})}
    <div class="settings-group logs-card">
      ${L({title:s(`gatewayLogs.filter`),description:e.file?s(`gatewayLogs.file`,{file:e.file}):void 0,control:_`
          <input
            class="settings-input"
            aria-label=${s(`gatewayLogs.filter`)}
            .value=${e.filterText}
            @input=${t=>e.onFilterTextChange(t.target.value)}
            placeholder=${s(`gatewayLogs.searchPlaceholder`)}
          />
        `})}
      <div class="settings-row">
        <div class="chip-row">
          ${Y.map(t=>_`
              <label class="chip log-chip ${t}">
                <input
                  type="checkbox"
                  .checked=${e.levelFilters[t]}
                  @change=${n=>e.onLevelToggle(t,n.target.checked)}
                />
                <span>${t}</span>
              </label>
            `)}
        </div>
        <div class="settings-row__control">
          ${R({checked:e.autoFollow,ariaLabel:s(`gatewayLogs.autoFollow`),onChange:t=>e.onToggleAutoFollow(t)})}
          <span class="settings-row__value">${s(`gatewayLogs.autoFollow`)}</span>
        </div>
      </div>
      ${e.truncated?_`
              <div class="settings-row">
                ${M({kind:`warn`,label:s(`gatewayLogs.truncated`)})}
              </div>
            `:p}
      <div class="log-stream" @scroll=${e.onScroll}>${c}</div>
    </div>
  `}var Y;function X(){return(X=e((()=>{m(),oe(),A(),F(),te(),d(),Y=[`trace`,`debug`,`info`,`warn`,`error`,`fatal`]})))()}var Z,Q;function $(){return($=e((()=>{o(),D(),m(),h(),se(),re(),A(),V(),u(),b(),f(),S(),ue(),q(),X(),Z=2e3,Q=class extends ee{constructor(...e){super(...e),this.logsStatus=N(),this.logsFile=null,this.logsEntries=[],this.logsFilterText=``,this.logsLevelFilters={...G},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.polling=new x(this,Z,()=>{this.loadLogs({quiet:!0})},!1),this.contentScrollFrame=null,this.logsTaskQuiet=!1,this.logsTask=new w(this,{autoRun:!1,args:()=>this.logsTaskArgs(),task:async([e,t,n,r,i],{signal:a})=>{if(!e||!t)return E;try{let e=e=>t.request(`logs.tail`,{cursor:e,limit:this.logsLimit,maxBytes:this.logsMaxBytes},{signal:a}),o=await e(i?void 0:n??void 0),s=!i&&r!==null&&o.file!==void 0&&o.file!==r;return s&&(o=await e()),{ok:!0,payload:o,cursor:n,reset:i||s}}catch(e){return{ok:!1,error:e}}},onComplete:e=>{if(!e.ok){c(e.error)?(this.logsEntries=[],this.logsStatus=k(N(),e.error,this.gateway.snapshot),this.logsStatus.error&&(this.logsStatus={...this.logsStatus,error:l(`logs`)})):this.logsStatus=k(this.logsStatus,e.error,this.gateway.snapshot);return}let t=(Array.isArray(e.payload.lines)?e.payload.lines.filter(e=>typeof e==`string`):[]).map(me),n=e.reset||e.payload.reset||e.cursor==null;this.logsEntries=n?t:[...this.logsEntries,...t].slice(-2e3),this.logsCursor=typeof e.payload.cursor==`number`?e.payload.cursor:this.logsCursor,this.logsFile=typeof e.payload.file==`string`?e.payload.file:this.logsFile,this.logsTruncated=!!e.payload.truncated,this.logsStatus=O()}}),this.gateway=new y(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.logsStatus=N(),this.logsFile=null,this.logsEntries=[],this.logsTruncated=!1,this.logsCursor=null,this.streamFollow.atBottom=!0},invalidateRequests:()=>{this.logsTaskQuiet=!1,this.logsTask.run([null,null,null,null,!1])},onSnapshot:()=>this.syncPolling(),ensureInitialData:()=>{let e=this.logsStatus.hasLoaded;this.loadLogs({reset:!0,quiet:e}).then(t=>{t&&!e&&this.streamFollow.schedule(!0)})}}),this.streamFollow=new z(this,{selector:`.log-stream`,isEnabled:()=>this.logsAutoFollow,captureCurrent:()=>{let e=this.gateway.gateway,t=this.gateway.epoch;return()=>this.isConnected&&this.gateway.connected&&e!==null&&this.gateway.gateway===e&&this.context.gateway===e&&this.gateway.epoch===t}})}logsTaskArgs(e){return[this.gateway.connected?this.gateway.gateway:null,this.gateway.connected?this.gateway.client:null,e?.reset?null:this.logsCursor,this.logsFile,e?.reset===!0]}firstUpdated(){this.resetContentScroll(),this.contentScrollFrame=requestAnimationFrame(()=>{this.contentScrollFrame=null,this.resetContentScroll()})}updated(e){let t=this.logsAutoFollow&&e.has(`logsAutoFollow`);(t||this.logsAutoFollow&&this.streamFollow.atBottom&&e.has(`logsEntries`))&&this.streamFollow.schedule(t)}disconnectedCallback(){this.logsTaskQuiet=!1,this.logsTask.run([null,null,null,null,!1]),this.contentScrollFrame!==null&&(cancelAnimationFrame(this.contentScrollFrame),this.contentScrollFrame=null),super.disconnectedCallback()}resetContentScroll(){let e=this.closest(`.content`);e&&(e.scrollTop=0,e.scrollLeft=0)}syncPolling(){if(!this.gateway.connected||!this.gateway.client){this.polling.stop();return}this.polling.start()}async loadLogs(e){let t=e?.quiet===!0,n=this.gateway.gateway;if(!n||!this.gateway.client||!this.gateway.connected||this.context.gateway!==n||this.logsTask.status===T.PENDING&&e?.reset!==!0)return!1;this.logsTaskQuiet=t,this.logsStatus=P(this.logsStatus,{clearError:!t});let r=this.gateway.epoch;return await this.logsTask.run(this.logsTaskArgs(e)),this.gateway.epoch===r&&this.logsTask.status===T.COMPLETE}render(){let e=ge({loading:this.logsTask.status===T.PENDING&&!this.logsTaskQuiet,refreshDisabled:!this.gateway.connected||this.logsTask.status===T.PENDING,status:this.logsStatus,file:this.logsFile,entries:this.logsEntries,filterText:this.logsFilterText,levelFilters:this.logsLevelFilters,autoFollow:this.logsAutoFollow,truncated:this.logsTruncated,onFilterTextChange:e=>this.logsFilterText=e,onLevelToggle:(e,t)=>{this.logsLevelFilters={...this.logsLevelFilters,[e]:t}},onToggleAutoFollow:e=>this.logsAutoFollow=e,onRefresh:()=>void this.loadLogs({reset:!0}).then(e=>{e&&this.streamFollow.schedule(!0)}),onExport:(e,t)=>{let n=new Date().toISOString().slice(0,19).replace(/[:T]/g,`-`);C(`openclaw-logs-${t}-${n}.log`,`${e.join(`
`)}\n`)},onScroll:e=>this.streamFollow.handleScroll(e)});return _`
      <section class="content-header">
        <div>
          <div class="page-title">${ce(`logs`)}</div>
        </div>
      </section>
      ${B(e,{fillHeight:!0})}
    `}},r([i({context:ae,subscribe:!0})],Q.prototype,`context`,void 0),r([g()],Q.prototype,`logsStatus`,void 0),r([g()],Q.prototype,`logsFile`,void 0),r([g()],Q.prototype,`logsEntries`,void 0),r([g()],Q.prototype,`logsFilterText`,void 0),r([g()],Q.prototype,`logsLevelFilters`,void 0),r([g()],Q.prototype,`logsAutoFollow`,void 0),r([g()],Q.prototype,`logsTruncated`,void 0),customElements.get(`openclaw-logs-page`)||customElements.define(`openclaw-logs-page`,Q)})))()}$();
//# sourceMappingURL=logs-page-VZq-Y7fq.js.map