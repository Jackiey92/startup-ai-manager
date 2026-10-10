const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./user-prefs-request-5DYeJyN7.js","./rolldown-runtime-8BhlS34s.js","./control-ui-core-C5mtYcym.js","./control-ui-foundation-DaCuy7E_.js","./control-ui-core-CndkyZ8m.js","./lit-runtime-CIjzngcy.js","./gateway-runtime-BvWNTqPo.js","./control-ui-core-DvoiO6cr.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$i as t,Kr as n,Mi as r,Rr as i,d as a,ea as o,f as s,ji as c,p as l,u,zr as d}from"./control-ui-foundation-DaCuy7E_.js";import{Al as f,Ec as ee,Sl as te,Ss as ne,Tc as re,Tl as p,bs as m,fc as ie,gl as ae,ml as oe,wl as h,xl as se,yc as ce}from"./control-ui-core-CndkyZ8m.js";import{$ as g,Q as _,at as v,dt as y,nt as b,pt as x}from"./lit-runtime-CIjzngcy.js";import{$r as S,Qr as C,Zn as w,bi as le,ca as ue,er as de,hn as fe,ia as pe,lt as me,mn as he,nr as T,pn as ge,si as _e,tr as E,xi as ve}from"./control-ui-core-C5mtYcym.js";import{D as ye,k as be}from"./control-ui-boot-shared-ChkOvQif.js";import{Co as xe,So as Se,ci as Ce,d as D,f as O,li as we,ui as Te}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Bi as k,Hi as Ee,Xi as De,Zi as Oe,_t as A,bt as ke,ci as j,dt as Ae,gt as je,ht as M,it as N,lt as Me,mr as P,nt as F,ot as I,pr as Ne,pt as L,st as R,ut as Pe,xt as z,zi as Fe}from"./control-ui-boot-shared-DpHhsTHW.js";import{i as Ie,t as Le}from"./wizard-step-controls-Byi_NnKh.js";import{o as B,r as V}from"./settings-targets-Bmbk6FUn.js";import{n as Re,t as ze}from"./settings-workspace-gGOfyDax.js";import{a as H,c as U,i as Be,l as Ve,n as He,r as Ue,s as We,t as Ge}from"./github-identity-view-DXgavZgx.js";var W;function G(){return(G=e((()=>{d(),_(),v(),pe(),S(),T(),F(),p(),ee(),h(),B(),Ve(),Ge(),W=class extends te{constructor(...e){super(...e),this.purpose=`personal`,this.setupOpen=!1,this.snapshot=null,this.revision=0,this.canRead=!1,this.canAdmin=!1,this.profileId=null,this.subscriptions=[],this.personal=new U({requestUpdate:()=>this.requestUpdate()}),this.system=new U({requestUpdate:()=>this.requestUpdate(),runExternalMutation:(e,t)=>this.context.runtimeConfig.runExternalMutation(e,t)})}connectedCallback(){super.connectedCallback(),this.subscriptions=[this.context.gateway.subscribe(e=>this.applySnapshot(e)),this.context.agents.subscribe(()=>this.syncControllers()),this.context.settingsAgentSelection.subscribe(()=>this.syncControllers()),this.context.runtimeConfig.subscribe(()=>this.syncControllers())],this.applySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){for(let e of this.subscriptions)e();this.subscriptions=[],this.personal.dispose(),this.system.dispose(),this.snapshot=null,this.revision+=1,super.disconnectedCallback()}applySnapshot(e){let t=this.snapshot,n=!t||t.client!==e.client||t.phase!==e.phase||t.hello!==e.hello||this.profileId!==(e.selfUser?.id??null);this.snapshot=e,this.profileId=e.phase===`connected`?e.selfUser?.id??null:null,this.canRead=e.phase===`connected`&&!!e.hello?.auth&&de(e.hello?.auth??null),this.canAdmin=this.canRead&&w(e.hello?.auth??null),n&&(this.revision+=1,this.setupOpen=!1,this.purpose=this.profileId?`personal`:`system`),this.syncControllers(),this.canAdmin&&this.context.runtimeConfig.ensureLoaded()}syncControllers(){let e=this.snapshot;if(!e)return;let t={client:e.client,connected:e.phase===`connected`,clientRevision:this.revision};this.personal.sync({...t,target:this.profileId?{kind:`personal`,profileId:this.profileId}:null,statusReadable:this.canRead&&this.profileId!==null,authorizable:this.canRead&&this.profileId!==null,configurable:!1});let n=this.context.settingsAgentSelection.state.selectedId;this.system.sync({...t,target:n?{kind:`shared`,scope:`system`,agentId:n,config:re(this.context.runtimeConfig.state)}:null,statusReadable:this.canAdmin,authorizable:this.canAdmin,configurable:this.canAdmin}),this.personal.statusReadable&&!this.personal.personal&&!this.personal.loading&&!this.personal.error&&this.personal.verify(),n&&this.canAdmin&&!this.system.status&&!this.system.loading&&!this.system.error&&this.system.verify(),this.requestUpdate()}get locked(){return this.personal.loading||this.system.loading||this.personal.authorizationActive||this.system.authorizationActive||this.personal.busy||this.system.busy}openSetup(e){this.locked||(e===`personal`?!this.profileId||!this.canRead:!this.canAdmin)||(this.purpose=e,this.setupOpen=!0)}render(){let e=this.personal.personal,t=this.system.status?.selected.identity??this.personal.system,n=this.context.settingsAgentSelection.state.selectedId,r=this.context.agents.state.agentsList?.agents?.find(e=>e.id===n),i=this.system.status?.effective??null,a=this.purpose===`personal`?this.personal:this.system,o=this.setupOpen||this.personal.authorizationActive||this.system.authorizationActive,s=e?.state===`connected`,c=e?.state===`unavailable`||e?.refreshState===`expired`||e?.refreshState===`failed`,l=this.profileId?f(c?`githubConnections.reconnectRequired`:s?`githubConnections.connected`:`githubConnections.disconnected`):f(`githubConnections.signInRequired`);return b`<div id=${V.githubConnections}>
      ${M({title:f(`githubConnections.title`),description:f(`githubConnections.description`),actions:this.canRead&&(this.profileId||this.canAdmin)?b`<button
                    class="btn btn--sm"
                    ?disabled=${this.locked||!this.profileId&&!this.system.status}
                    @click=${()=>this.openSetup(this.profileId?`personal`:`system`)}
                  >
                    ${f(`githubConnections.manage`)}
                  </button>
                  <button
                    class="btn btn--sm"
                    ?disabled=${this.locked}
                    @click=${()=>{this.personal.verify(),this.system.verify()}}
                  >
                    ${f(`agentTools.githubVerify`)}
                  </button>`:void 0},b`
          <div data-github-connection="personal">
            ${L({title:f(`githubConnections.mine`),description:this.profileId?b`${e?.account?`@${e.account.login} · `:``}${f(`githubConnections.personalDescription`)}`:f(`githubConnections.unboundDescription`),control:b`${this.profileId&&!e?We(this.personal):A({kind:c?`warn`:s?`ok`:`muted`,label:l})}
              ${this.profileId&&this.canRead&&e?b`<button
                      class="btn btn--sm"
                      ?disabled=${this.locked}
                      @click=${()=>this.openSetup(`personal`)}
                    >
                      ${f(s?`githubConnections.changeMine`:`githubConnections.connectMine`)}
                    </button>`:g}`})}
          </div>
          <div data-github-connection="system">
            ${L({title:f(`githubConnections.system`),description:b`${t?.account?`@${t.account.login} · `:``}${f(`githubConnections.systemDescription`)}`,control:b`${H(t,{loading:this.system.loading||this.personal.loading,error:this.system.error??this.personal.error})}${this.canAdmin?b`<button
                      class="btn btn--sm"
                      ?disabled=${this.locked||!this.system.status}
                      @click=${()=>this.openSetup(`system`)}
                    >
                      ${f(`githubConnections.changeSystem`)}
                    </button>`:z(f(`githubConnections.adminManaged`))}`})}
          </div>
          ${this.canAdmin&&n?b`<div data-github-connection="agent">
                  ${L({title:f(`githubConnections.agentFor`,{agent:r?.identity?.name??r?.name??n}),description:b`${i?.account?`@${i.account.login} · `:``}${i?f(i.source===`agent-override`?`githubConnections.agentOverride`:`githubConnections.system`):``}<br />${f(`githubConnections.agentDescription`)}`,control:b`${H(i,this.system)}<button
                        class="btn btn--sm"
                        @click=${()=>this.context.navigate(`agents`,{pathname:ue(n,`tools`,this.context.basePath)})}
                      >
                        ${f(`githubConnections.viewAgent`)}
                      </button>`})}
                </div>`:g}
          ${He(this.personal.error??this.system.error,b`<button
              class="btn btn--sm"
              ?disabled=${this.locked}
              @click=${()=>{this.personal.verify(),this.system.verify()}}
            >
              ${f(`common.retry`)}
            </button>`)}
          ${o?b`<div class="settings-subrows" data-github-setup>
                  ${L({title:f(`githubConnections.purpose`),control:this.profileId&&this.canAdmin&&this.system.status?je({value:this.purpose,options:[{value:`personal`,label:f(`githubConnections.forMe`)},{value:`system`,label:f(`githubConnections.forSystem`)}],disabled:this.locked,ariaLabel:f(`githubConnections.purpose`),onChange:e=>this.openSetup(e)}):z(this.purpose===`personal`?f(`githubConnections.forMe`):f(`githubConnections.forSystem`))})}
                  ${Ue(a)}
                  ${this.locked?g:L({title:f(`githubConnections.purposeHint`),control:b`<button
                            class="btn btn--sm"
                            @click=${()=>{this.setupOpen=!1,a.hidePatFallback()}}
                          >
                            ${f(`common.close`)}
                          </button>`})}
                </div>`:g}
          <details class="settings-row settings-row--stacked">
            <summary class="settings-row__title">${f(`githubConnections.usage`)}</summary>
            <div class="settings-row__desc">${f(`githubConnections.usageDescription`)}</div>
            ${Be(t)}
          </details>
          ${this.canAdmin&&this.system.status?.selected.configured?L({title:f(`agentTools.githubUseNativeNewRuns`),description:f(`agentTools.githubSystemMutationHint`),control:b`<button
                    class="btn btn--sm"
                    ?disabled=${this.locked}
                    @click=${()=>void this.system.inherit()}
                  >
                    ${f(`agentTools.githubUseNativeNewRuns`)}
                  </button>`}):g}
        `)}
      ${this.profileId&&this.canRead&&e&&e.state!==`disconnected`?M({danger:!0},L({title:f(`githubConnections.disconnectMine`),description:f(`githubConnections.disconnectDescription`),control:b`<button
                  class="btn btn--sm"
                  ?disabled=${this.locked}
                  @click=${()=>void this.personal.disconnect()}
                >
                  ${f(`githubConnections.disconnectMine`)}
                </button>`})):g}
    </div>`}},n([i({context:C,subscribe:!1})],W.prototype,`context`,void 0),n([y()],W.prototype,`purpose`,void 0),n([y()],W.prototype,`setupOpen`,void 0),customElements.get(`openclaw-github-connections`)||customElements.define(`openclaw-github-connections`,W)})))()}function Ke(e,t){if(!Number.isFinite(e)||!Number.isFinite(t)||e<=0||t<=0)throw new Z(`invalid-image`);let n=Math.min(e,t),r=Math.min(1,q/n);return{sourceEdge:n,sourceX:Math.max(0,Math.round((e-n)/2)),sourceY:Math.max(0,Math.round((t-n)/2)),edge:Math.max(1,Math.round(n*r))}}async function qe(e){let t=URL.createObjectURL(e);try{let e=new Image;return e.decoding=`async`,e.src=t,await e.decode(),e}catch{throw new Z(`invalid-image`)}finally{URL.revokeObjectURL(t)}}function K(e,t,n){return new Promise(r=>{e.toBlob(r,t,n)})}function Je(e){let t=[];for(let n=0;n<e.length;n+=32768)t.push(String.fromCharCode(...e.subarray(n,n+32768)));return btoa(t.join(``))}async function Ye(e,t){if(e.size>J)throw new Z(`too-large`);let n=new Uint8Array(await e.arrayBuffer()),r=Je(n);if(r.length>Y)throw new Z(`too-large`);return{mime:t,avatarBase64:r,byteLength:n.byteLength}}async function Xe(e){if(![`image/png`,`image/jpeg`,`image/webp`].includes(e.type))throw new Z(`invalid-image`);if(e.size>X)throw new Z(`source-too-large`);let t=await qe(e),n=Ke(t.naturalWidth,t.naturalHeight),r=document.createElement(`canvas`);r.width=n.edge,r.height=n.edge;let i=r.getContext(`2d`);if(!i)throw new Z(`invalid-image`);i.drawImage(t,n.sourceX,n.sourceY,n.sourceEdge,n.sourceEdge,0,0,n.edge,n.edge);let a=e.type===`image/webp`?`image/webp`:`image/png`,o=await K(r,a,a===`image/webp`?.9:void 0);if((!o||o.type!==a||o.size>J)&&(a=`image/webp`,o=await K(r,a,.82)),!o||o.type!==a)throw new Z(`invalid-image`);return Ye(o,a)}var q,J,Y,X,Z;function Ze(){return(Ze=e((()=>{q=512,J=524288,Y=7e5,X=10485760,Z=class extends Error{constructor(e){super(e),this.code=e,this.name=`ProfileAvatarError`}}})))()}function Qe(e){return e.target.value}function $e(e){try{let t=new URL(e);return`${t.origin}${t.pathname}`}catch{return f(`profilePage.modelAccounts.gatewayUnavailable`)}}function et(e,t){return e.some(e=>e.authProfileId!==t.authProfileId&&e.provider===t.provider&&e.label===t.label)?b` <code>${t.authProfileId}</code>`:``}function tt(e,t){let n=e.accounts.find(e=>e.authProfileId===t.authProfileId);return L({title:b`
      <span class="model-accounts__id"
        >${n?.label??f(`profilePage.modelAccounts.gatewayAccount`)}</span
      >
      <span class="model-accounts__provider">${k(t.provider)}</span>
    `,description:b`${f(`profilePage.modelAccounts.linkedDescription`)}${n?et(e.accounts,n):``}`,control:b`
      ${A({kind:`ok`,label:f(`profilePage.modelAccounts.linkedStatus`)})}
      <button
        type="button"
        class="btn btn--sm profile-auth-link-unlink"
        ?disabled=${e.busy}
        @click=${()=>e.onUnlink(t.provider)}
      >
        ${f(`profilePage.modelAccounts.unlinkAction`)}
      </button>
    `})}function nt(e,t){return L({title:b`
      <span class="model-accounts__id">${t.label}</span>
      <span class="model-accounts__provider">${k(t.provider)}</span>
    `,description:b`${f(`profilePage.modelAccounts.authTypes.${t.authType}`)}${et(e.accounts,t)}`,control:b`
      <button
        type="button"
        class="btn btn--sm profile-auth-account-select"
        data-auth-profile-id=${t.authProfileId}
        ?disabled=${e.busy}
        @click=${()=>e.onSelectAccount(t.authProfileId)}
      >
        ${f(`profilePage.modelAccounts.selectAction`)}
      </button>
    `})}function rt(e){let t=e.signIn;if(!t)return``;let n=t.providers.find(e=>e.id===t.provider),r=e.connectFlow,i=r?.step,a=b`<button
    type="button"
    class="btn btn--sm profile-auth-connect-cancel"
    ?disabled=${e.cancelBusy}
    @click=${r?e.onConnectCancel:e.onCloseSignIn}
  >
    ${f(`profilePage.modelAccounts.cancelAction`)}
  </button>`;return L({title:r?r.step?.title??n?.label??f(`profilePage.modelAccounts.connectAction`):f(`profilePage.modelAccounts.addAccount`),stacked:!0,control:r?b`<div class="model-accounts-flow">
          ${i?Ie({step:i,value:e.stepValue,busy:e.busy,inputId:`profile-account-auth-answer`,leadingAction:a,onValueChange:t=>e.onStepValueChange(i.id,t),onAnswer:t=>e.onStepAnswer(i.id,t)}):b`<span role="status">${f(`common.loading`)}</span>${a}`}
          ${e.statusUnavailable?b`<button
                  type="button"
                  class="btn btn--sm profile-auth-connect-check"
                  ?disabled=${e.cancelBusy}
                  @click=${e.onConnectCheck}
                >
                  ${f(`profilePage.modelAccounts.checkStatusAction`)}
                </button>`:``}
        </div>`:b`<div class="model-accounts-choice">
          ${P({label:f(`profilePage.modelAccounts.provider`),className:`profile-auth-provider`,value:t.provider||null,options:t.providers.map(e=>({value:e.id,label:e.label})),disabled:e.busy,renderLeading:e=>Ee(e.value),onChange:e.onProviderChange})}
          ${n?P({label:f(`profilePage.modelAccounts.method`),className:`profile-auth-method`,value:t.method||null,options:n.methods.map(e=>({value:e.id,label:e.label,description:e.hint})),disabled:e.busy,onChange:e.onMethodChange}):``}
          ${!e.busy&&!e.error&&t.providers.length===0?b`<span>${f(`profilePage.modelAccounts.noMethods`)}</span>`:``}
          <div class="wizard-step__actions">
            ${a}
            <button
              type="button"
              class="btn btn--sm primary profile-auth-connect-start"
              ?disabled=${e.busy||!t.method}
              @click=${e.onConnectStart}
            >
              ${f(`profilePage.modelAccounts.connectAction`)}
            </button>
          </div>
        </div>`})}function it(e){return L({title:f(`profilePage.modelAccounts.inputLabel`),description:f(`profilePage.modelAccounts.inputDescription`),stackedOnNarrow:!0,control:b`
      <form
        class="model-accounts-form"
        @submit=${t=>{t.preventDefault(),e.onLink()}}
      >
        <input
          class="settings-input profile-auth-link-input"
          type="text"
          aria-label=${f(`profilePage.modelAccounts.inputLabel`)}
          .value=${e.linkDraft}
          placeholder=${f(`profilePage.modelAccounts.inputPlaceholder`)}
          ?disabled=${e.busy}
          @input=${t=>e.onLinkDraftInput(Qe(t))}
        />
        <button
          type="submit"
          class="btn btn--sm profile-auth-link-submit"
          ?disabled=${e.busy||!e.linkDraft.trim()}
        >
          ${f(`profilePage.modelAccounts.linkAction`)}
        </button>
      </form>
    `})}function at(e){return b`
    ${e.links.length===0?I(f(`profilePage.modelAccounts.empty`)):e.links.map(t=>tt(e,t))}
    ${e.accounts.filter(e=>!e.selected).map(t=>nt(e,t))}
    ${e.hasMore?L({title:f(`profilePage.modelAccounts.savedAccounts`),control:b`<button
              type="button"
              class="btn btn--sm profile-auth-accounts-more"
              ?disabled=${e.busy}
              @click=${e.onLoadMore}
            >
              ${f(`profilePage.modelAccounts.loadMore`)}
            </button>`}):``}
    ${rt(e)} ${e.showManualLink?it(e):``}
    ${e.notice?b`<div class="settings-row model-accounts-notice" role="status">
            <span class="settings-row__desc">${e.notice}</span>
          </div>`:``}
    ${e.error?b`<div class="settings-row model-accounts-error" role="alert">
            <span class="settings-row__desc">${e.error}</span>
          </div>`:``}
    ${e.inventoryError?b`<div class="settings-row model-accounts-error" role="alert">
            ${f(`profilePage.modelAccounts.inventoryFailed`)} ${e.inventoryError}
          </div>`:``}
  `}function ot(e,t){let n=b`
    ${L({title:f(`profilePage.modelAccounts.gateway`),stackedOnNarrow:!0,control:z($e(e.gatewayUrl),{mono:!0})})}
    ${L({title:f(`profilePage.modelAccounts.person`),stackedOnNarrow:!0,control:z(e.personLabel??f(`profilePage.modelAccounts.noPerson`))})}
    ${L({title:f(`profilePage.modelAccounts.scope`),description:f(`profilePage.modelAccounts.personalDescription`),control:z(f(`profilePage.modelAccounts.personal`))})}
    ${t?at(t):L({title:f(`profilePage.modelAccounts.signInUnavailable`),description:f(`profilePage.modelAccounts.unavailable.${e.unavailableReason}`),stacked:!0,control:b`
              <button type="button" class="btn btn--sm" @click=${e.onConnectionSettings}>
                ${f(`profilePage.modelAccounts.connectionSettings`)}
              </button>
              ${N(`https://docs.openclaw.ai/concepts/multi-user#per-person-model-accounts`)}
            `})}
  `;return M({title:f(`profilePage.modelAccounts.title`),description:f(`profilePage.modelAccounts.description`),actions:t?b`${t.signIn?``:b`<button
                    type="button"
                    class="btn btn--sm primary profile-auth-add-account"
                    ?disabled=${t.busy}
                    @click=${t.onAddAccount}
                  >
                    ${f(`profilePage.modelAccounts.addAccount`)}
                  </button>`}<button
              type="button"
              class="btn btn--sm profile-auth-accounts-refresh"
              ?disabled=${t.inventoryLoading}
              @click=${t.onRefresh}
            >
              ${f(`common.refresh`)}
            </button>`:void 0},n)}function st(){return(st=e((()=>{_(),Fe(),Ne(),F(),Le(),p(),D(),O()})))()}var Q;function ct(){return(ct=e((()=>{d(),_(),v(),S(),T(),p(),D(),ne(),h(),st(),O(),Q=class extends se{constructor(...e){super(...e),this.identityId=null,this.profileId=null,this.personLabel=null,this.links=[],this.accounts=[],this.inventoryLoading=!1,this.inventoryError=null,this.action=null,this.error=null,this.notice=null,this.linkDraft=``,this.signIn=null,this.connectFlow=null,this.statusUnavailable=!1,this.target=null,this.generation=0,this.inventoryRequest=0,this.unsubscribe=null,this.pollTimer=null}connectedCallback(){super.connectedCallback(),this.unsubscribe=this.context.gateway.subscribe(e=>{this.applySnapshot(e),this.requestUpdate()}),this.applySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){this.unsubscribe?.(),this.unsubscribe=null,this.generation+=1,this.target=null,this.stopPoll(),super.disconnectedCallback()}willUpdate(e){(e.has(`profileId`)||e.has(`identityId`))&&this.isConnected&&this.applySnapshot(this.context.gateway.snapshot)}applySnapshot(e){let t=e.phase===`connected`&&E(e.hello?.auth??null),n=t?e.client:null,r=e.selfUser?.id??null,i=n&&r===this.identityId?this.profileId:null,a=t&&w(e.hello?.auth??null);(this.target?.client!==n||this.target?.identityId!==r||this.target?.profileId!==i||this.target?.canAdmin!==a)&&(this.generation+=1,this.stopPoll(),this.target=n&&r&&i?{client:n,identityId:r,profileId:i,canAdmin:a}:null,this.links=[],this.accounts=[],this.nextCursor=void 0,this.inventoryRequest+=1,this.inventoryLoading=!1,this.inventoryError=null,this.action=null,this.error=null,this.notice=null,this.linkDraft=``,this.signIn=null,this.connectFlow=null,this.stepValue=void 0,this.statusUnavailable=!1,this.target&&this.loadAccounts())}applyLinks(e){this.links=e,this.accounts=this.accounts.map(t=>({...t,selected:e.some(e=>e.authProfileId===t.authProfileId)}))}async loadAccounts(e){let t=this.target;if(!t)return;let n=++this.inventoryRequest,r=()=>this.isConnected&&this.target===t&&n===this.inventoryRequest;this.inventoryLoading=!0,this.inventoryError=null;try{let n=await t.client.request(`users.listModelAccounts`,{profileId:t.profileId,...e?{cursor:e}:{}});r()&&(this.accounts=e?[...this.accounts,...n.accounts]:n.accounts,this.nextCursor=n.nextCursor,this.applyLinks(n.links))}catch(e){r()&&(this.inventoryError=m(e))}finally{r()&&(this.inventoryLoading=!1)}}isCurrent(e,t){return this.isConnected&&this.target===e&&this.generation===t}async runAction(e,t,n){let r=this.target;if(!r||this.action&&(e!==`cancel`||this.action!==`answer`))return;let i=++this.generation;this.stopPoll(),this.action=e,this.error=null,this.notice=null,this.statusUnavailable=!1;try{let e=await t(r);this.isCurrent(r,i)&&n(e)}catch(e){this.isCurrent(r,i)&&(this.error=m(e,f(`profilePage.modelAccounts.actionFailed`)))}finally{this.isCurrent(r,i)&&(this.action=null,this.schedulePoll(this.connectFlow?.step?2e3:0))}}updateLink(e){let t=`authProfileId`in e;(!t||e.authProfileId&&this.target?.canAdmin)&&this.runAction(`request`,n=>n.client.request(t?`users.linkAuthProfile`:`users.unlinkAuthProfile`,{profileId:n.profileId,...e}),e=>{this.applyLinks(e.links),this.linkDraft=``,this.notice=t?`selected`:`cleared`,this.loadAccounts()})}selectAccount(e){this.runAction(`request`,t=>t.client.request(`users.selectModelAccount`,{profileId:t.profileId,authProfileId:e}),e=>{this.applyLinks(e.links),this.notice=`selected`,this.loadAccounts()})}openSignIn(){this.signIn={providers:[],provider:``,method:``},this.runAction(`request`,e=>e.client.request(`users.authConnect.catalog`,{profileId:e.profileId}),e=>{this.signIn={providers:e.providers,provider:``,method:``}})}selectProvider(e){let t=this.signIn,n=t?.providers.find(t=>t.id===e);t&&n&&!this.action&&!this.connectFlow&&(this.signIn={...t,provider:e,method:n.methods.length===1?n.methods[0]?.id??``:``})}startConnect(){let e=this.signIn;e?.providers.some(t=>t.id===e.provider&&t.methods.some(t=>t.id===e.method))&&this.runAction(`request`,t=>t.client.request(`users.authConnect.start`,{profileId:t.profileId,provider:e.provider,method:e.method}),e=>{this.connectFlow=e,this.stepValue=void 0})}applyConnectStatus(e){if(e.status===`pending`){e.error&&(this.error=m(e.error)),this.connectFlow&&=(this.connectFlow.step?.id!==e.step?.id&&(this.stepValue=e.step?.sensitive?void 0:e.step?.initialValue),{...this.connectFlow,step:e.step});return}if(this.error=null,this.statusUnavailable=!1,this.stopPoll(),this.signIn=null,this.connectFlow=null,this.stepValue=void 0,e.status===`failed`){this.error=f(`profilePage.modelAccounts.connectErrors.${e.reason}`);return}e.status===`connected`&&(this.applyLinks(e.links),this.loadAccounts()),this.notice=e.status}connectStatus(e){let t=this.connectFlow;t&&this.runAction(e===`status`?`request`:e,n=>n.client.request(`users.authConnect.${e}`,{profileId:n.profileId,connectId:t.connectId}),e=>this.applyConnectStatus(e))}answerStep(e,t){let n=this.connectFlow,r=n?.step;n&&r&&r.id===e&&r.type!==`progress`&&(r.sensitive&&(this.stepValue=void 0),this.runAction(`answer`,e=>e.client.request(`users.authConnect.answer`,{profileId:e.profileId,connectId:n.connectId,stepId:r.id,...t===void 0?{}:{value:t}}),e=>this.applyConnectStatus(e)))}stopPoll(){this.pollTimer!==null&&(clearTimeout(this.pollTimer),this.pollTimer=null)}schedulePoll(e=2e3){this.stopPoll();let t=this.connectFlow;if(!t||!this.target||this.action)return;let n=Math.max(0,Math.min(e,t.expiresAtMs-Date.now()));this.pollTimer=setTimeout(()=>{this.pollTimer=null,this.pollStatus()},n)}async pollStatus(){let e=this.target,t=this.connectFlow,n=this.generation;if(e&&t&&!this.action)try{let r=await e.client.request(`users.authConnect.status`,{profileId:e.profileId,connectId:t.connectId});if(!this.isCurrent(e,n)||this.connectFlow?.connectId!==t.connectId)return;this.applyConnectStatus(r),this.connectFlow&&(Date.now()>=t.expiresAtMs?(this.statusUnavailable=!0,this.error=f(`profilePage.modelAccounts.statusTimedOut`)):this.schedulePoll())}catch(t){this.isCurrent(e,n)&&(this.statusUnavailable=!0,this.error=m(t,f(`profilePage.modelAccounts.statusFailed`)))}}render(){let e=this.context.gateway.snapshot;if(e.phase!==`connected`||!e.client)return g;let t=e.selfUser?.id===this.identityId?e.selfUser:null;return ot({gatewayUrl:(this.target?.client??e.client).gatewayUrl,personLabel:t?this.personLabel||t.name||t.email||f(`profilePage.modelAccounts.currentPerson`):null,unavailableReason:t?E(e.hello?.auth??null)?`profile`:`write`:`identity`,onConnectionSettings:()=>this.context.navigate(`connection`)},this.target?{links:this.links,accounts:this.accounts,hasMore:!!this.nextCursor,inventoryLoading:this.inventoryLoading,inventoryError:this.inventoryError,showManualLink:this.target.canAdmin,busy:this.inventoryLoading||this.action!==null,cancelBusy:this.action!==null&&this.action!==`answer`,error:this.error,notice:this.notice?f(`profilePage.modelAccounts.notices.${this.notice}`):null,statusUnavailable:this.statusUnavailable,linkDraft:this.linkDraft,signIn:this.signIn,connectFlow:this.connectFlow,stepValue:this.stepValue,onLinkDraftInput:e=>{this.linkDraft=e},onLink:()=>this.updateLink({authProfileId:this.linkDraft.trim()}),onUnlink:e=>this.updateLink({provider:e}),onSelectAccount:e=>this.selectAccount(e),onLoadMore:()=>void this.loadAccounts(this.nextCursor),onRefresh:()=>void this.loadAccounts(),onAddAccount:()=>this.openSignIn(),onProviderChange:e=>this.selectProvider(e),onMethodChange:e=>{this.signIn&&!this.action&&!this.connectFlow&&(this.signIn={...this.signIn,method:e})},onCloseSignIn:()=>{!this.action&&!this.connectFlow&&(this.signIn=null,this.error=null)},onConnectStart:()=>this.startConnect(),onStepValueChange:(e,t)=>{this.connectFlow?.step?.id===e&&(this.stepValue=t)},onStepAnswer:(e,t)=>this.answerStep(e,t),onConnectCancel:()=>this.connectStatus(`cancel`),onConnectCheck:()=>this.connectStatus(`status`)}:null)}},n([i({context:C,subscribe:!1})],Q.prototype,`context`,void 0),n([x({attribute:!1})],Q.prototype,`identityId`,void 0),n([x({attribute:!1})],Q.prototype,`profileId`,void 0),n([x({attribute:!1})],Q.prototype,`personLabel`,void 0),n([y()],Q.prototype,`links`,void 0),n([y()],Q.prototype,`accounts`,void 0),n([y()],Q.prototype,`nextCursor`,void 0),n([y()],Q.prototype,`inventoryLoading`,void 0),n([y()],Q.prototype,`inventoryError`,void 0),n([y()],Q.prototype,`action`,void 0),n([y()],Q.prototype,`error`,void 0),n([y()],Q.prototype,`notice`,void 0),n([y()],Q.prototype,`linkDraft`,void 0),n([y()],Q.prototype,`signIn`,void 0),n([y()],Q.prototype,`connectFlow`,void 0),n([y()],Q.prototype,`stepValue`,void 0),n([y()],Q.prototype,`statusUnavailable`,void 0),customElements.get(`openclaw-model-accounts`)||customElements.define(`openclaw-model-accounts`,Q)})))()}function lt(e,t){return{id:e.id,name:e.displayName??void 0,email:e.emails[0],avatarUrl:t??void 0,watchedSessions:[]}}function ut(e){let t=e.profile.displayName??``,n=e.displayName.trim()!==t,r=e.profile.emails.join(`, `),i=e.profile.githubIdentity,a=e.profile.id===u;return b`<div id=${V.identity}>
    ${M({title:f(`profilePage.identity.title`),description:f(`profilePage.identity.description`)},b`
        ${L({title:f(`profilePage.identity.avatar`),description:f(`profilePage.identity.avatarDescription`),control:b`
            <span class="identity-avatar-control">
              <openclaw-viewer-avatar
                .user=${lt(e.profile,e.avatarUrl)}
                variant="profile"
              ></openclaw-viewer-avatar>
              <button
                type="button"
                class="btn btn--sm"
                ?disabled=${e.busy!==null}
                @click=${e=>{let t=e.currentTarget,n=t instanceof HTMLButtonElement?t.nextElementSibling:null;n instanceof HTMLInputElement&&n.click()}}
              >
                ${e.busy===`avatar`?f(`profilePage.identity.processingAvatar`):f(`profilePage.identity.chooseAvatar`)}
              </button>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                ?disabled=${e.busy!==null}
                @change=${t=>{let n=t.currentTarget,r=n.files?.[0];n.value=``,r&&e.onAvatarSelect(r)}}
              />
            </span>
          `})}
        ${L({title:f(`profilePage.identity.displayName`),description:f(`profilePage.identity.displayNameDescription`),control:b`
            <form
              class="identity-name-control"
              @submit=${t=>{t.preventDefault(),e.onSaveDisplayName()}}
            >
              <input
                class="settings-input"
                type="text"
                maxlength="256"
                aria-label=${f(`profilePage.identity.displayName`)}
                .value=${e.displayName}
                ?disabled=${e.busy!==null}
                @input=${t=>e.onDisplayNameInput(t.currentTarget.value)}
              />
              <button
                type="submit"
                class="btn btn--sm"
                ?disabled=${e.busy!==null||!n}
              >
                ${e.busy===`display-name`?f(`common.saving`):f(`common.save`)}
              </button>
            </form>
          `})}
        ${a?g:L({title:f(`profilePage.identity.linkedEmails`),description:f(`profilePage.identity.linkedEmailsDescription`),control:r?z(r):g})}
        ${L({title:f(`profilePage.identity.githubAccount`),description:f(a?`profilePage.identity.ownerGithubDescription`:i?`profilePage.identity.githubAccountDescription`:`profilePage.identity.githubUnavailableDescription`),control:i?b`
                <a
                  class="settings-account"
                  href=${i.profileUrl}
                  target=${Ce}
                  rel=${we()}
                >
                  <img class="settings-account__avatar" src=${i.avatarUrl} alt="" />
                  <span class="settings-row__value settings-row__value--mono"
                    >@${i.login}</span
                  >
                </a>
                ${A({kind:`ok`,label:f(`profilePage.identity.githubVerified`)})}
              `:A({kind:`muted`,label:f(`profilePage.identity.githubUnavailable`)})})}
        ${ke({title:f(`profilePage.identity.gitCoauthor`),description:f(a?`profilePage.identity.ownerGitCoauthorDescription`:i?`profilePage.identity.gitCoauthorDescription`:`profilePage.identity.gitCoauthorUnavailable`),checked:!!(i&&e.gitCoauthorEnabled),disabled:e.busy!==null||!i,onChange:e.onGitCoauthorChange})}
        ${e.error?b`<div class="settings-row identity-error" role="alert">
                <span class="settings-row__desc">${e.error}</span>
              </div>`:g}
      `)}
  </div>`}function dt(){return(dt=e((()=>{_(),s(),F(),p(),j(),Te(),B()})))()}function ft(e,t,n,r=``,i){let a=i??globalThis.location?.href;if(!a)return null;try{let i=new URL(a),s=new URL(e,i);if(s.protocol===`ws:`?s.protocol=`http:`:s.protocol===`wss:`&&(s.protocol=`https:`),![`http:`,`https:`].includes(s.protocol))return null;s.username=``,s.password=``;let c=s.origin===i.origin?o(r):``;return new URL(ye(t,n,c),s.origin).href}catch{return null}}function pt(){return(pt=e((()=>{t(),be()})))()}function mt(e,t){if(e.user)return b`<openclaw-viewer-avatar
      .user=${{...e.user,name:t,watchedSessions:[]}}
      variant="profile"
    ></openclaw-viewer-avatar>`;let n=ae(e.row,e.identity);return Oe({id:e.row.id,name:t,avatar:n?e.avatarLoader.resolve(n):null,textAvatar:ce(e.row,e.identity)},``,n?e.avatarLoader.imageErrorHandler(n):void 0)}function ht(e){let t=e.user?e.user.name?.trim()||e.user.email||f(`nav.owner`):e.identity?.name?.trim()||e.row.identity?.name?.trim()||e.row.name?.trim()||e.row.id,n=e.user?e.user.email:`@${e.row.id}`;return R(b`
    <section class="profile-hero">
      <div class="profile-hero__avatar">${mt(e,t)}</div>
      <div class="profile-hero__name">${t}</div>
      <div class="profile-hero__handle">
        ${n?b`<span class="profile-hero__email">${n}</span>`:g}
        <span class="profile-hero__badge">OpenClaw</span>
      </div>
    </section>
  `)}function gt(){return(gt=e((()=>{_(),De(),F(),p(),ie(),oe(),j()})))()}function _t(e){return m(e,f(`profilePage.identity.profileUnavailable`))}var vt,$;function yt(){return(yt=e((()=>{d(),_(),v(),s(),_e(),S(),T(),ge(),F(),ze(),p(),D(),ne(),xe(),h(),B(),G(),Ze(),ct(),dt(),pt(),gt(),r(),O(),vt=`https://docs.openclaw.ai/concepts/user-model`,$=class extends te{constructor(...e){super(...e),this.selfUser=null,this.ownProfile=null,this.displayName=``,this.gitCoauthorEnabled=!0,this.identityLoading=!1,this.identityBusy=null,this.identityError=null,this.client=null,this.connected=!1,this.canWrite=!1,this.heroAvatarLoader=new Se(this),this.identityRequestId=0,this.subscriptions=[]}connectedCallback(){super.connectedCallback(),this.subscriptions=[this.context.gateway.subscribe(e=>this.applyGatewaySnapshot(e)),this.context.agents.subscribe(()=>this.requestUpdate()),this.context.agentIdentity.subscribe(()=>this.requestUpdate())],this.applyGatewaySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){for(let e of this.subscriptions)e();this.subscriptions=[],this.identityRequestId+=1,this.client=null,this.connected=!1,this.canWrite=!1,super.disconnectedCallback()}applyGatewaySnapshot(e){let t=e.client!==this.client,n=e.phase===`connected`,r=n&&E(e.hello?.auth??null),i=r!==this.canWrite,a=n!==this.connected,o=n?me({snapshotUser:e.selfUser}):null,s=o?.id!==this.selfUser?.id,c=t||a||s||i;this.client=e.client,this.connected=n,this.canWrite=r,this.selfUser=o,this.requestUpdate(),c&&(this.identityRequestId+=1,this.ownProfile=null,this.displayName=``,this.gitCoauthorEnabled=!0,this.identityLoading=!1,this.identityBusy=null,this.identityError=null),n&&e.client&&(o&&r&&c&&this.loadIdentity(),this.context.agents.ensureList().then(e=>{e&&this.context.agentIdentity.ensure([e.defaultId])}))}async loadIdentity(){let e=this.client;if(!e||!this.connected||!this.canWrite||this.identityLoading)return;let t=++this.identityRequestId,n=this.ownProfile,r=this.displayName,i=n!==null&&r.trim()!==(n.displayName??``);this.identityLoading=!0,this.identityError=null;try{let n=await e.request(`users.self`,{});if(t!==this.identityRequestId)return;let o=n.profile;if(this.ownProfile=o,this.displayName=i?r:o.displayName??``,this.gitCoauthorEnabled=!0,o.githubIdentity){let{loadUserPreferences:n}=await c(async()=>{let{loadUserPreferences:e}=await import(`./user-prefs-request-5DYeJyN7.js`);return{loadUserPreferences:e}},__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url);if(t!==this.identityRequestId)return;let r=await n(e,o.id,{keys:[a]});if(t!==this.identityRequestId)return;this.gitCoauthorEnabled=r.status===`ok`&&l(r.entries[`git.coauthor.enabled`])}}catch(e){t===this.identityRequestId&&(this.identityError=_t(e))}finally{t===this.identityRequestId&&(this.identityLoading=!1)}}async saveIdentity(e){let t=this.client,n=this.ownProfile;if(!t||!n||!this.canWrite||this.identityBusy||this.identityLoading||e.kind===`git-coauthor`&&!n.githubIdentity)return;this.identityBusy=e.kind,this.identityError=null;let r=this.identityRequestId,i=()=>t===this.client&&r===this.identityRequestId;try{switch(e.kind){case`display-name`:{let e=await t.request(`users.setDisplayName`,{profileId:n.id,displayName:this.displayName.trim()||null});if(!i())return;this.ownProfile=e.profile,this.displayName=e.profile.displayName??``,this.context.gateway.updateSelfUser?.({name:e.profile.displayName??void 0});break}case`avatar`:{let r=this.displayName,a=r.trim()!==(n.displayName??``),o=this.selfUser?.id===n.id?this.selfUser.avatarUrl:void 0,s=await Xe(e.file);if(!i())return;let c=await t.request(`users.setAvatar`,{profileId:n.id,mime:s.mime,avatarBase64:s.avatarBase64});if(!i())return;this.ownProfile=c.profile,this.displayName=a?r:c.profile.displayName??``;let l=ft(this.context.gateway.connection.gatewayUrl,c.profile.id,c.avatarRevision,this.context.resourceBasePath),u=this.selfUser?.id===c.profile.id&&this.selfUser.avatarUrl!==o;l&&!u&&this.context.gateway.updateSelfUser?.({avatarUrl:l});break}case`git-coauthor`:{let n=await fe(t,{entries:{[a]:e.enabled}});if(!i())return;if(n.status!==`ok`)throw Error(f(`profilePage.identity.profileUnavailable`));this.gitCoauthorEnabled=e.enabled;return}}}catch(t){i()&&(this.identityError=e.kind===`avatar`&&t instanceof Z?f(t.code===`too-large`?`profilePage.identity.avatarErrors.tooLarge`:t.code===`source-too-large`?`profilePage.identity.avatarErrors.sourceTooLarge`:`profilePage.identity.avatarErrors.invalid`):_t(t));return}finally{i()&&this.identityBusy===e.kind&&(this.identityBusy=null)}i()&&this.loadIdentity()}renderIdentity(){if(!this.selfUser)return b`<div id=${V.identity}>
        ${M({title:f(`profilePage.identity.title`)},I(f(`profilePage.identity.unidentified`)))}
      </div>`;if(!this.canWrite)return b`<div id=${V.identity}>
        ${M({title:f(`profilePage.identity.title`)},I(f(`profilePage.identity.writeRequired`)))}
      </div>`;if(!this.ownProfile)return b`<div id=${V.identity}>
        ${M({title:f(`profilePage.identity.title`)},this.identityLoading?Me({label:f(`profilePage.identity.loading`),rows:2}):I(this.identityError??f(`profilePage.identity.profileUnavailable`)))}
      </div>`;let e=this.selfUser?.id===this.ownProfile.id&&this.selfUser.avatarUrl?this.selfUser.avatarUrl:ft(this.context.gateway.connection.gatewayUrl,this.ownProfile.id,this.ownProfile.updatedAt,this.context.resourceBasePath);return ut({profile:this.ownProfile,avatarUrl:e,displayName:this.displayName,gitCoauthorEnabled:this.gitCoauthorEnabled,busy:this.identityLoading?`loading`:this.identityBusy,error:this.identityError,onDisplayNameInput:e=>{this.displayName=e},onSaveDisplayName:()=>void this.saveIdentity({kind:`display-name`}),onAvatarSelect:e=>void this.saveIdentity({kind:`avatar`,file:e}),onGitCoauthorChange:e=>void this.saveIdentity({kind:`git-coauthor`,enabled:e})})}renderModelAccounts(){return b`<openclaw-model-accounts
      .identityId=${this.selfUser?.id??null}
      .profileId=${this.ownProfile?.id??null}
      .personLabel=${this.ownProfile?this.ownProfile.displayName?.trim()||this.ownProfile.emails[0]||f(`profilePage.modelAccounts.currentPerson`):null}
    ></openclaw-model-accounts>`}refreshManually(){this.selfUser&&this.canWrite&&!this.identityBusy&&!this.identityLoading&&(this.client&&he(this.client),this.loadIdentity())}renderHero(){let e=this.context.agents.state.agentsList,t=e?.defaultId??`main`;return ht({row:e?.agents.find(e=>e.id===t)??{id:t},user:this.selfUser,identity:this.context.agentIdentity.get(t),avatarLoader:this.heroAvatarLoader})}renderBody(){return!this.connected||!this.client?Ae(R(I(f(`profilePage.offline`)))):Ae(b`
      ${this.renderHero()} ${this.renderIdentity()} ${this.renderModelAccounts()}
      <openclaw-github-connections></openclaw-github-connections>
      ${R(Pe({title:f(`profilePage.usageStatistics`),description:f(`profilePage.usageStatisticsDescription`),onClick:()=>this.context.navigate(`usage`)}))}
    `)}render(){return this.heroAvatarLoader.withActiveRoutes(()=>this.renderContent())}renderContent(){return b`
      <section class="content-header">
        <div>
          <div class="page-title">${ve(`profile`)}</div>
          <div class="page-subtitle">
            ${le(`profile`)} ${N(vt)}
          </div>
        </div>
        ${this.selfUser?b`<button
                class="btn profile-refresh"
                ?disabled=${this.identityLoading||this.identityBusy!==null}
                @click=${()=>this.refreshManually()}
              >
                ${this.identityLoading?f(`common.refreshing`):f(`common.refresh`)}
              </button>`:g}
      </section>
      ${Re(this.renderBody())}
    `}},n([i({context:C,subscribe:!1})],$.prototype,`context`,void 0),n([y()],$.prototype,`selfUser`,void 0),n([y()],$.prototype,`ownProfile`,void 0),n([y()],$.prototype,`displayName`,void 0),n([y()],$.prototype,`gitCoauthorEnabled`,void 0),n([y()],$.prototype,`identityLoading`,void 0),n([y()],$.prototype,`identityBusy`,void 0),n([y()],$.prototype,`identityError`,void 0),customElements.get(`openclaw-profile-page`)||customElements.define(`openclaw-profile-page`,$)})))()}yt();
//# sourceMappingURL=profile-page-Czx_LgwB.js.map