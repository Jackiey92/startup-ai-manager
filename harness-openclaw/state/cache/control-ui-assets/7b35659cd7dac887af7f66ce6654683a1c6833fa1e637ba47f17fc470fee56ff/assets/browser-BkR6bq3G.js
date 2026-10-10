import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Fi as t,Kr as n,Rr as r,zr as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,Bs as o,Sl as s,Ss as c,Tl as l,Vs as u,bs as d,wl as f}from"./control-ui-core-CndkyZ8m.js";import{$ as p,Q as m,at as h,dt as g,nt as _,pt as v}from"./lit-runtime-CIjzngcy.js";import{$r as y,H as b,Qr as x,V as S,_t as C,mt as w}from"./control-ui-core-C5mtYcym.js";import{cr as T,sr as E}from"./control-ui-boot-shared-DlJEsz5Q.js";import{sn as D,yn as O}from"./control-ui-boot-shared-DpHhsTHW.js";import{o as k,r as A}from"./board-widget-cell-render-C-h1I45M.js";import{t as j}from"./browser-panel-C79pVRyV.js";var M;function N(){return(N=e((()=>{i(),m(),h(),y(),w(),S(),A(),D(),j(),l(),E(),f(),u(),c(),T(),M=class extends s{constructor(){super(),this.session={sessionKey:``},this.active=!0,this.pending=!1,this.generation=0,this.refreshNeeded=!1,new o(this).watch(()=>this.context?.gateway,(e,n)=>{let r=e.subscribe(n),i=e.subscribeEvents(e=>{let n=t(e.payload);e.event===`plugin.browser.dashboard_changed`&&n?.instanceId===this.widget?.instanceId&&n?.name===this.widget?.name&&(this.refreshNeeded=!0,this.active&&this.request(`inspect`))});return()=>{r(),i()}})}willUpdate(){let e=this.context?.gateway.snapshot.client??null,t=JSON.stringify([this.session,this.widget?.instanceId,this.widget?.name,this.widget?.props]);(this.scope?.key!==t||this.scope.client!==e)&&(this.scope={key:t,client:e},this.generation+=1,this.dashboard=void 0,this.error=void 0,this.pending=!1,this.refreshNeeded=!1),this.active&&this.available&&!this.pending&&!this.error&&(this.refreshNeeded?this.request(`inspect`):(!this.dashboard||!this.dashboard.paused&&!this.dashboard.browserTab)&&this.request(`open`))}disconnectedCallback(){this.generation+=1,this.scope=void 0,super.disconnectedCallback()}get available(){return!!(this.context&&b(this.context.gateway.snapshot))}async request(e){let t=this.context?.gateway.snapshot.client,n=this.widget?.instanceId;if(!t||!this.available||!this.widget||this.pending)return;if(!n){this.error=Error(a(`browser.dashboardMissingIdentity`));return}let r=++this.generation;e===`inspect`&&(this.refreshNeeded=!1),this.pending=!0,this.error=void 0;try{let i=await O(t,{...this.session,name:this.widget.name,instanceId:n},e);this.isConnected&&r===this.generation&&t===this.scope?.client&&(this.dashboard=i)}catch(e){this.isConnected&&r===this.generation&&(this.error=e)}finally{this.isConnected&&r===this.generation&&(this.pending=!1,this.refreshNeeded&&this.active&&this.request(`inspect`))}}render(){let e=this.context?.gateway,t=this.dashboard;return!this.active&&!t?p:!e||!this.available?_`<p class="board-browser__notice">${a(`browser.dashboardUnavailable`)}</p>`:_`<div class="board-browser" data-chat-autotype-exempt>
      <div class="board-browser__content">
        ${t?.browserTab&&!t.paused?_`<openclaw-browser-panel
                embedded
                .client=${e.snapshot.client}
                .available=${this.available}
                .remoteAvailable=${this.available}
                .presented=${this.active}
                .sessionKey=${t.sessionKey}
                .fixedTab=${t.browserTab}
                .dashboardTarget=${{...this.session,name:t.name,instanceId:t.instanceId}}
                .resourceBasePath=${this.context?.resourceBasePath??``}
                .authToken=${C({hello:e.snapshot.hello,password:e.connection.password,settings:{token:e.connection.token}})}
              ></openclaw-browser-panel>`:this.error?k(this.error,()=>void this.request(`open`)):_` <p class="board-browser__notice" role="status">
                  ${a(t?.stopping?`browser.dashboardStopping`:t?.paused?`browser.dashboardStopped`:`browser.loading`)}
                </p>`}
      </div>
      <div class="board-browser__footer">
        <span>${a(`browser.dashboardShared`)}</span>
        <div>
          <button
            type="button"
            class="btn btn--small"
            ?disabled=${this.pending}
            @click=${()=>void this.request(t?.stopping?`stop`:t?.paused?`resume`:`open`)}
          >
            ${a(t?.stopping?`browser.dashboardRetryStop`:t?.paused?`browser.dashboardResume`:`browser.dashboardReconnect`)}
          </button>
          ${t?.browserTab&&!t.paused?_`<button
                  type="button"
                  class="btn btn--small"
                  ?disabled=${this.pending}
                  @click=${()=>void this.request(`stop`)}
                >
                  ${a(`browser.dashboardStop`)}
                </button>`:p}
        </div>
      </div>
      ${this.error&&t?.browserTab?_`<p role="alert" class="board-browser__error">${d(this.error)}</p>`:p}
    </div>`}},n([r({context:x,subscribe:!0})],M.prototype,`context`,void 0),n([v({attribute:!1})],M.prototype,`widget`,void 0),n([v({attribute:!1})],M.prototype,`session`,void 0),n([v({type:Boolean})],M.prototype,`active`,void 0),n([g()],M.prototype,`dashboard`,void 0),n([g()],M.prototype,`error`,void 0),n([g()],M.prototype,`pending`,void 0),customElements.get(`openclaw-browser-dashboard-widget`)||customElements.define(`openclaw-browser-dashboard-widget`,M)})))()}N();
//# sourceMappingURL=browser-BkR6bq3G.js.map