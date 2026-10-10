import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Ot as n,kt as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Br as a,Ss as o,Tl as s,_c as c,bs as l,fc as u,nn as d,un as f,xs as p,zr as m}from"./control-ui-core-CndkyZ8m.js";import{$ as h,Q as g,nt as _}from"./lit-runtime-CIjzngcy.js";import{Di as v,Ei as y}from"./control-ui-core-C5mtYcym.js";import{ci as b,li as x,ui as S}from"./control-ui-boot-shared-DlJEsz5Q.js";import{_t as C,cr as w,fa as T,ht as E,lr as D,mt as O,nt as k,pa as A,pt as j,xt as M}from"./control-ui-boot-shared-DpHhsTHW.js";function N(e){return JSON.stringify(e??null)}function P(e){let n=t(e)?e:void 0,r=t(n?.gitAuthor)?n.gitAuthor:void 0;return{token:``,name:typeof r?.name==`string`?r.name:``,email:typeof r?.email==`string`?r.email:``}}function F(e){return JSON.stringify(e?.kind===`shared`?{kind:e.kind,agentId:e.agentId}:e)}function I(e,t){return`${e.target.kind===`personal`?`users`:`tools`}.github.authorize.${t}`}function L(e){e.requestId&&e.owner.client.request(I(e.owner,`cancel`),{requestId:e.requestId}).catch(()=>void 0)}function R(){return(R=e((()=>{})))()}var z;function B(){return(B=e((()=>{n(),o(),R(),z=class{constructor(e){this.host=e,this.state={phase:`idle`},this.operation=null}get active(){return this.operation!==null}isCurrent(e){return this.operation===e&&this.host.isCurrent(e.owner)}retire(e){let t=this.operation;this.operation=null,this.state={phase:`idle`},t&&(t.timer!==void 0&&clearTimeout(t.timer),t.controller.abort(),e&&L(t))}restore(e,t){if(this.active||!this.host.isCurrent(e))return;let n={owner:e,controller:new AbortController,requestId:t.requestId,start:t,displayExpiresAtMs:Date.now()+t.expiresInMs};this.operation=n,this.present(n,`code`),this.schedule(n,t.pollAfterMs)}present(e,t,n){e.start&&(this.state={...e.start,displayExpiresAtMs:e.displayExpiresAtMs??Date.now(),phase:t,...e.cancelError?{message:e.cancelError}:{},...n?{slowedDown:!0}:{}},this.host.requestUpdate())}async start(e){let t={owner:e,controller:new AbortController};this.operation=t,this.state={phase:`starting`},this.host.requestUpdate();try{let n=e.target,r=await e.client.request(I(e,`start`),n.kind===`personal`?{}:{scope:n.scope,agentId:n.agentId},{signal:t.controller.signal});if(t.requestId=r.requestId,t.start=r,t.displayExpiresAtMs=Date.now()+r.expiresInMs,!this.isCurrent(t)){L(t);return}if(t.cancelRequested){await this.finishCancellation(t);return}this.present(t,`code`),this.schedule(t,r.pollAfterMs)}catch(e){if(!this.isCurrent(t))return;this.operation=null,this.state={phase:`failed`,message:l(e)},this.host.requestUpdate()}}async cancel(){let e=this.operation;!e||e.cancelRequested||e.cancelInFlight||(e.cancelRequested=!0,e.cancelError=void 0,e.start?this.present(e,`cancelling`):(this.state={phase:`cancelling`},this.host.requestUpdate()),e.requestId&&await this.finishCancellation(e))}async finishCancellation(e){if(e.requestId&&!e.cancelInFlight&&this.isCurrent(e)){e.cancelInFlight=!0;try{let t=await e.owner.client.request(I(e.owner,`cancel`),{requestId:e.requestId});if(!this.isCurrent(e))return;if(t.cancelled){this.retire(!1),this.host.finish(e.owner,!1),this.host.requestUpdate();return}e.cancelTooLate=!0,this.present(e,`finishing`)}catch(t){if(!this.isCurrent(e))return;e.cancelRequested=!1,e.cancelError=l(t),this.present(e,`cancel_error`)}finally{e.cancelInFlight=!1}e.timer===void 0&&!e.pollInFlight&&this.schedule(e,e.start.pollAfterMs)}}schedule(e,t){this.isCurrent(e)&&e.start&&(e.timer!==void 0&&clearTimeout(e.timer),e.timer=setTimeout(()=>{e.timer=void 0,this.isCurrent(e)&&this.poll(e)},r(t,{minMs:0})))}async requestPoll(e){let t=()=>e.owner.client.request(I(e.owner,`poll`),{requestId:e.requestId},{signal:e.controller.signal});if(e.owner.target.kind===`personal`)return{result:await t(),refreshError:null};if(!this.host.runExternalMutation)throw Error(`Shared GitHub configuration is unavailable.`);let n=await this.host.runExternalMutation(n=>{if(n!==e.owner.client)throw Error(`Connection changed before GitHub authorization was checked.`);return t()},{canDispatch:()=>this.isCurrent(e),dispatchError:`Access changed before GitHub authorization was checked.`,shouldRefresh:e=>e.status===`success`});if(!n.ok)throw Error(n.error);return{result:n.value,refreshError:n.refresh.ok?null:n.refresh.error}}async poll(e){if(!e.requestId||!e.start||!this.isCurrent(e))return;this.present(e,e.cancelTooLate?`finishing`:e.cancelError?`cancel_error`:`pending`),e.pollInFlight=!0,this.host.begin(e.owner);let t=!1;try{let{result:n,refreshError:r}=await this.requestPoll(e);if(!this.isCurrent(e))return;if(n.status===`pending`||n.status===`slow_down`||n.status===`network_error`){let t=e.cancelTooLate?`finishing`:e.cancelError?`cancel_error`:n.status===`network_error`?`network_error`:`pending`;this.present(e,t,n.status===`slow_down`),this.schedule(e,n.retryAfterMs);return}n.status===`success`?(this.host.applySuccess(e.owner,n,r),this.state={phase:`idle`},t=!0):this.state={phase:n.status},this.operation=null}catch(t){this.isCurrent(e)&&(this.operation=null,this.state={phase:`failed`,message:l(t)})}finally{e.pollInFlight=!1,this.host.finish(e.owner,t)}}}})))()}var V;function H(){return(H=e((()=>{T(),s(),u(),o(),a(),B(),R(),V=class{constructor(e){this.host=e,this.status=null,this.personal=null,this.system=null,this.loading=!1,this.busy=!1,this.error=null,this.statusReadable=!1,this.configurable=!1,this.authorizable=!1,this.tokenRevealed=!1,this.patVisible=!1,this.target=null,this.client=null,this.connected=!1,this.clientRevision=-1,this.requestRevision=0,this.displayedIdentityFingerprint=``,this.identityInitialized=!1,this.verificationQueued=!1,this.confirmationPending=!1,this.mutationOwner=null,this.mutationIdentityChanged=!1,this.selectedDraft=P(void 0),this.draftDirty=!1,this.configFingerprint=``,this.dispose=()=>{this.deviceAuthorization.retire(!0),this.requestRevision+=1,this.client=null,this.target=null,this.connected=!1,this.status=null,this.personal=null,this.system=null,this.loading=!1,this.busy=!1,this.mutationOwner=null,this.selectedDraft=P(void 0)},this.deviceAuthorization=new z({...e,isCurrent:e=>this.authorizable&&this.isCurrent(e),begin:e=>this.beginMutation(e),finish:(e,t)=>this.finishMutation(e,t),applySuccess:(e,t,n)=>{if(e.target.kind===`personal`&&`personal`in t)this.personal=t.personal;else if(e.target.kind===`shared`&&`githubStatus`in t)this.applyMutationStatus({...e,target:e.target},t.githubStatus,{...this.selectedDraft,token:``},n);else throw Error(`Gateway returned GitHub authorization for a different target.`)}})}get scope(){return this.target?.kind===`personal`?`personal`:this.target?.scope??`system`}get authorization(){return this.deviceAuthorization.state}get authorizationActive(){return this.deviceAuthorization.active}get connectionReady(){return this.connected&&this.client!==null}get draft(){return this.scope===`personal`?P(void 0):this.selectedDraft}queueVerification(){!this.verificationQueued&&!this.confirmationPending&&this.statusReadable&&this.connectionReady&&this.target&&!this.authorizationActive&&(this.verificationQueued=!0,queueMicrotask(()=>{this.verificationQueued=!1,this.verify()}))}sync(e){let t=this.client!==e.client||this.connected!==e.connected||this.clientRevision!==e.clientRevision,n=F(this.target)!==F(e.target),r=e.target?.kind===`personal`?`personal`:e.target?.scope??`system`,i=this.scope!==r,a=e.target?.kind===`shared`&&e.configurable,o=this.statusReadable!==e.statusReadable||this.configurable!==a||this.authorizable!==e.authorizable,s=t||n||i||o;s&&(this.deviceAuthorization.retire(!0),this.requestRevision+=1,this.mutationOwner=null,this.mutationIdentityChanged=!1),this.client=e.client,this.connected=e.connected,this.clientRevision=e.clientRevision,this.statusReadable=e.statusReadable,this.configurable=a,this.authorizable=e.authorizable,this.target=e.target?{...e.target}:null;let l=e.target?.kind===`shared`?c(e.target.config,e.target.agentId):null,u={system:l?.globalTools?.github,agent:l?.entry?.tools?.github},d=N(r===`personal`?null:{effective:u.agent??u.system,selectedScope:r,selected:u[r]}),f=this.identityInitialized&&this.displayedIdentityFingerprint!==d;this.displayedIdentityFingerprint=d,this.identityInitialized=!0;let p=this.mutationOwner,m=f&&p!==null&&this.busy&&this.isCurrent(p);m?this.mutationIdentityChanged=!0:f&&(this.requestRevision+=1,this.deviceAuthorization.retire(!0)),(s||f&&!m)&&(this.status=null,this.personal=null,this.system=null,this.error=null,this.loading=!1,this.busy=!1,this.tokenRevealed=!1,this.patVisible=!1,this.confirmationPending=!1);let h=r===`personal`?void 0:u[r],g=N(h);(t||n||i)&&(this.selectedDraft=P(h),this.draftDirty=!1,this.configFingerprint=g,t||n)||(!this.draftDirty&&this.configFingerprint!==g&&(this.selectedDraft=P(h),this.configFingerprint=g),f&&!m&&this.queueVerification())}showPatFallback(){this.configurable&&this.scope!==`personal`&&!this.authorizationActive&&(this.patVisible=!0,this.host.requestUpdate())}hidePatFallback(){this.busy||(this.patVisible=!1,this.tokenRevealed=!1,this.host.requestUpdate())}toggleTokenVisibility(){this.configurable&&this.scope!==`personal`&&(this.tokenRevealed=!this.tokenRevealed,this.host.requestUpdate())}setDraft(e,t){this.scope!==`personal`&&(this.selectedDraft={...this.selectedDraft,[e]:t},this.draftDirty=!0,this.host.requestUpdate())}captureRequest(){if(!this.client||!this.connected||!this.target)return null;let e=this.target;return{client:this.client,target:e.kind===`personal`?{...e}:{kind:`shared`,scope:e.scope,agentId:e.agentId},clientRevision:this.clientRevision,requestRevision:++this.requestRevision}}isCurrent(e){return this.client===e.client&&this.connected&&this.clientRevision===e.clientRevision&&this.requestRevision===e.requestRevision}async startAuthorization(){if(!this.authorizable||this.authorizationActive||this.busy||this.confirmationPending)return;let e=this.captureRequest();e&&(this.loading=!1,this.error=null,this.patVisible=!1,await this.deviceAuthorization.start(e))}cancelAuthorization(){return this.deviceAuthorization.cancel()}beginMutation(e){this.mutationOwner=e,this.mutationIdentityChanged=!1,this.loading=!1,this.busy=!0,this.error=null,this.host.requestUpdate()}finishMutation(e,t){if(this.mutationOwner!==e)return;let n=this.mutationIdentityChanged&&!t;this.mutationOwner=null,this.mutationIdentityChanged=!1,this.isCurrent(e)&&(this.busy=!1,this.host.requestUpdate(),n&&this.queueVerification())}async runMutation(e,t){this.beginMutation(e);let n=!1;try{n=await t()}catch(t){this.isCurrent(e)&&(this.error=l(t))}finally{this.finishMutation(e,n)}return n}acceptSharedStatus(e,t){if(t.agentId!==e.target.agentId||t.selectedScope!==e.target.scope||t.selected.scope!==e.target.scope)throw Error(`Gateway returned GitHub identity status for a different target.`);this.status=t,e.target.scope===`system`&&(this.system=t.selected.identity)}applyMutationStatus(e,t,n,r){this.isCurrent(e)&&(this.acceptSharedStatus(e,t),this.selectedDraft=n,this.draftDirty=!1,this.tokenRevealed=!1,this.patVisible=!1,this.error=r?`GitHub identity was updated, but its configuration refresh failed: ${r}`:null)}async verify(){if(!this.statusReadable||this.loading||this.busy||this.confirmationPending||this.authorizationActive)return;let e=this.captureRequest();if(e){this.loading=!0,this.error=null,this.host.requestUpdate();try{if(e.target.kind===`personal`){let t=await e.client.request(`users.github.status`,{});if(!this.isCurrent(e))return;this.personal=t.personal,this.system=t.system,t.personal.pending&&this.authorizable&&this.deviceAuthorization.restore(e,t.personal.pending)}else{let t=await e.client.request(`tools.github.status`,{agentId:e.target.agentId,selectedScope:e.target.scope});this.isCurrent(e)&&this.acceptSharedStatus({...e,target:e.target},t)}}catch(t){this.isCurrent(e)&&(this.error=l(t))}finally{this.isCurrent(e)&&(this.loading=!1,this.host.requestUpdate())}}}async disconnect(){if(this.target?.kind!==`personal`||!this.authorizable||this.busy||this.authorizationActive)return;let e=this.captureRequest();e&&await this.runMutation(e,async()=>(await e.client.request(`users.github.disconnect`,{}),this.isCurrent(e)?(this.personal=null,!0):!1))&&this.isCurrent(e)&&await this.verify()}async configure(){if(this.target?.kind!==`shared`||!this.configurable||this.busy||this.authorizationActive||this.confirmationPending)return;let e={...this.draft};if(!e.token.trim()){this.error=i(`agentTools.githubPasteToken`),this.host.requestUpdate();return}let t=this.captureRequest(),n=this.host.runExternalMutation;if(!t||t.target.kind!==`shared`||!n)return;let r={...t,target:t.target},a=e.name.trim(),o=e.email.trim();await this.runMutation(r,async()=>{let t=`github-setup-${m().replaceAll(`-`,``).toLowerCase()}`,i=!1;try{if(await r.client.request(`secrets.store.set`,{name:t,value:e.token,kind:`secret`,allowedHosts:[]}),i=!0,!this.isCurrent(r))return!1;let s=await this.runConfigureMutation(r,n,{scope:r.target.scope,agentId:r.target.agentId,mode:`managed`,secretName:t,...a||o?{gitAuthor:{...a?{name:a}:{},...o?{email:o}:{}}}:{}});if(!s.ok)throw Error(s.error);return i=!1,this.applyMutationStatus(r,s.value,{...e,token:``},s.refresh.ok?null:s.refresh.error),!0}finally{i&&await r.client.request(`secrets.store.delete`,{name:t}).catch(()=>void 0)}})}async inherit(){if(this.target?.kind!==`shared`||!this.configurable||this.busy||this.authorizationActive||this.confirmationPending)return;let e=this.captureRequest(),t=this.host.runExternalMutation;if(!e||e.target.kind!==`shared`||!t)return;let n={...e,target:e.target},r=n.target.scope;this.confirmationPending=!0;let a=!1;try{a=await A({title:i(r===`agent`?`agentTools.githubUseSystemConfirmTitle`:`agentTools.githubUseNativeConfirmTitle`),message:i(r===`agent`?`agentTools.githubUseSystemConfirmMessage`:`agentTools.githubUseNativeConfirmMessage`),confirmLabel:i(r===`agent`?`agentTools.githubUseSystemNewRuns`:`agentTools.githubUseNativeNewRuns`)})}finally{this.isCurrent(n)&&(this.confirmationPending=!1)}a&&this.isCurrent(n)&&this.configurable&&!this.busy&&!this.authorizationActive&&await this.runMutation(n,async()=>{let e=await this.runConfigureMutation(n,t,{scope:r,agentId:n.target.agentId,mode:`inherit`});if(!e.ok)throw Error(e.error);return this.isCurrent(n)?(this.applyMutationStatus(n,e.value,{token:``,name:``,email:``},e.refresh.ok?null:e.refresh.error),!0):!1})}runConfigureMutation(e,t,n){return t(t=>{if(t!==e.client)throw Error(`Connection changed before the GitHub identity update started.`);return t.request(`tools.github.configure`,n)},{canDispatch:()=>this.isCurrent(e)&&this.configurable,dispatchError:`Access changed before the GitHub identity update started.`})}}})))()}function U(e){return C({kind:e.error?`warn`:`muted`,label:e.loading?i(`githubConnections.checking`):e.error?i(`githubConnections.statusUnavailable`):i(`githubConnections.notLoaded`)})}function W(e,t){if(!e)return U(t);let n=Y[e.credentialState];return C({kind:n.kind,label:i(n.label)})}function G(e){if(!e)return h;let t=[e.gitAuthor.name,e.gitAuthor.email].filter(Boolean).join(` · `);return _`<details class="settings-row settings-row--stacked">
    <summary class="settings-row__title">${i(`githubConnections.details`)}</summary>
    <div class="settings-subrows">
      ${j({title:i(`agentTools.githubEffectiveAuthor`),control:M(t||i(`agentTools.githubAuthorUnset`))})}
      ${j({title:i(`agentTools.githubEffectiveCredential`),control:M(i(X[e.credentialKind]))})}
      ${e.credentialKind===`managed-oauth`?_`
              ${j({title:i(`agentTools.githubEffectiveAccessExpiry`),control:M(e.accessExpiresAtMs?d(e.accessExpiresAtMs):i(`common.na`))})}
              ${j({title:i(`agentTools.githubEffectiveRefresh`),control:M(i(Z[e.refreshState]))})}
              ${j({title:i(`agentTools.githubEffectiveScopes`),control:M(e.oauthScopes.join(`, `)||i(`common.none`))})}
            `:h}
    </div>
  </details>`}function K(e){let t=e.authorization;if(!e.connectionReady)return j({title:i(`agentTools.githubConnection`),control:C({kind:`muted`,label:i(`agentTools.githubDisconnected`)})});if(!e.statusReadable)return j({title:C({kind:`danger`,label:i(`agentTools.githubAccessRequired`)}),description:i(`agentTools.githubReadRequired`)});if(!e.authorizable)return j({title:C({kind:`warn`,label:i(`agentTools.githubAccessRequired`)}),description:i(`agentTools.githubAdminRequired`)});if(t.phase===`starting`||t.phase===`cancelling`&&!(`userCode`in t))return j({title:i(`agentTools.githubAuthorization`),control:_`
        ${C({kind:`accent`,label:t.phase===`cancelling`?i(`agentTools.githubCancelling`):i(`agentTools.githubStarting`)})}
        ${t.phase===`starting`?_`<button
                class="btn btn--sm"
                @click=${()=>void e.cancelAuthorization()}
              >
                ${i(`common.cancel`)}
              </button>`:h}
      `});if(`userCode`in t){let n=i(`agentTools.githubCopyCode`),r=i(t.phase===`pending`&&t.slowedDown?`agentTools.githubSlowDown`:Q[t.phase]);return _`
      ${j({title:i(`agentTools.githubAuthorization`),description:t.phase===`cancel_error`?t.message?`${i(`agentTools.githubCancelFailedHint`)} ${t.message}`:i(`agentTools.githubCancelFailedHint`):i(`agentTools.githubAuthorizationHint`),control:C({kind:t.phase===`network_error`||t.phase===`cancel_error`?`warn`:`accent`,label:r})})}
      ${j({title:i(`agentTools.githubDeviceCode`),description:i(`agentTools.githubDeviceCodeHint`),control:_`
          <code class="settings-row__value settings-row__value--mono github-device-code"
            >${t.userCode}</code
          >
          <button
            type="button"
            class="btn btn--sm"
            @click=${e=>void w(e,t.userCode,n)}
          >
            ${y.copy}
            <span data-copy-label>${n}</span>
          </button>
        `})}
      ${j({title:i(`agentTools.githubExpires`),control:M(d(t.displayExpiresAtMs,{dateStyle:`medium`,timeStyle:`short`}))})}
      <div class="settings-row settings-row--actions">
        <div class="settings-row__control">
          <a
            class="btn primary"
            href=${t.verificationUri}
            target=${b}
            rel=${x()}
          >
            ${i(`agentTools.githubOpen`)}
          </a>
          ${t.phase===`cancelling`||t.phase===`finishing`?h:_`<button
                  type="button"
                  class="btn"
                  @click=${()=>void e.cancelAuthorization()}
                >
                  ${t.phase===`cancel_error`?i(`agentTools.githubRetryCancel`):i(`common.cancel`)}
                </button>`}
        </div>
      </div>
    `}if(e.patVisible)return h;let n=_`<button
    class="btn primary"
    @click=${()=>void e.startAuthorization()}
  >
    ${i(`githubConnections.continue`)}
  </button>`,r=e.scope===`personal`?h:_`<button class="btn" @click=${()=>e.showPatFallback()}>
          ${i(`agentTools.githubUsePat`)}
        </button>`;if(t.phase===`access_denied`||t.phase===`expired`||t.phase===`incorrect_device_code`||t.phase===`failed`){let e=t.phase===`expired`?i(`agentTools.githubExpired`):t.phase===`access_denied`?i(`agentTools.githubDenied`):t.phase===`incorrect_device_code`?i(`agentTools.githubIncorrectCode`):t.message??i(`agentTools.githubAuthorizationFailed`);return j({title:C({kind:`danger`,label:i(`agentTools.githubAuthorizationFailed`)}),description:p(e),control:_`${n}${r}`})}return _`
    ${j({title:i(`agentTools.githubAuthorization`),description:i(`agentTools.githubConnectHint`),control:n})}
    ${e.scope===`personal`?h:j({title:i(`agentTools.githubPatFallback`),description:i(`agentTools.githubPatFallbackHint`),control:r})}
  `}function q(e,t){return e?j({title:i(`agentTools.githubErrorTitle`),description:_`<span role="alert">${p(e)}</span>`,control:t}):h}function J(e){let t=e.draft,n=e.busy||!e.configurable||e.authorizationActive,r=(r,i)=>j({title:i,control:_` <input
        class="settings-input"
        aria-label=${i}
        autocomplete="off"
        .value=${t[r]}
        ?disabled=${n}
        @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.setDraft(r,t.currentTarget.value)}}
      />`});return _`
    ${K(e)}
    ${e.patVisible?_`
            <div class="settings-subrows">
              ${j({title:i(`agentTools.githubToken`),description:i(`agentTools.githubTokenDesc`),control:O({ariaLabel:i(`agentTools.githubToken`),value:t.token,visible:e.tokenRevealed,disabled:n,showLabel:i(`configForm.revealValue`),hideLabel:i(`configForm.hideValue`),toggleLabel:i(`agentTools.githubTokenToggle`),onInput:t=>e.setDraft(`token`,t),onToggle:()=>e.toggleTokenVisibility()})})}
              ${r(`name`,i(`agentTools.githubAuthorName`))}
              ${r(`email`,i(`agentTools.githubAuthorEmail`))}
              <div class="settings-row settings-row--actions">
                <div class="settings-row__control">
                  <button
                    class="btn"
                    ?disabled=${e.busy}
                    @click=${()=>e.hidePatFallback()}
                  >
                    ${i(`common.cancel`)}
                  </button>
                  <button
                    class="btn primary"
                    ?disabled=${n}
                    @click=${()=>void e.configure()}
                  >
                    ${e.busy?i(`common.saving`):i(`agentTools.githubConfigure`)}
                  </button>
                </div>
              </div>
            </div>
          `:h}
  `}function ee(e,t){let n=e.status?.effective??null;return E({title:i(`githubConnections.agentTitle`),description:i(`githubConnections.agentDescription`),actions:e.statusReadable?_`<button
            class="btn btn--sm"
            ?disabled=${e.loading||e.busy||e.authorizationActive}
            @click=${()=>void e.verify()}
          >
            ${i(`agentTools.githubVerify`)}
          </button>`:void 0},_`
      ${j({title:n?.account?`@${n.account.login}`:i(`agentTools.githubNoAccount`),description:n?.source===`agent-override`?i(`githubConnections.agentOverride`):i(`githubConnections.system`),control:_`${W(n,e)}<button
            class="btn btn--sm"
            @click=${t}
          >
            ${i(`githubConnections.manageCommon`)}
          </button>`})}
      ${q(e.error)}
      ${e.configurable?_`<details class="settings-row settings-row--stacked">
              <summary class="settings-row__title">
                ${i(`githubConnections.advancedOverride`)}
              </summary>
              <div class="settings-subrows">
                ${j({title:i(`githubConnections.agentOverride`),description:e.status?.selected.configured?i(`agentTools.githubConfiguredHere`):i(`agentTools.githubInheritedHere`)})}
                ${J(e)}
                ${e.status?.selected.configured?j({title:i(`agentTools.githubUseSystemNewRuns`),description:i(`agentTools.githubAgentMutationHint`),control:_`<button
                          class="btn"
                          ?disabled=${e.busy||e.authorizationActive}
                          @click=${()=>void e.inherit()}
                        >
                          ${i(`agentTools.githubUseSystemNewRuns`)}
                        </button>`}):h}
              </div>
            </details>`:h}
      ${G(n)}
    `)}var Y,X,Z,Q;function $(){return($=e((()=>{g(),D(),v(),k(),s(),S(),o(),f(),Y={available:{kind:`ok`,label:`agentTools.githubStateVerified`},unverified:{kind:`warn`,label:`agentTools.githubStateUnverified`},rate_limited:{kind:`warn`,label:`agentTools.githubStateRateLimited`},unavailable:{kind:`danger`,label:`agentTools.githubStateUnavailable`},configured_unavailable:{kind:`danger`,label:`agentTools.githubStateConfiguredUnavailable`}},X={native:`agentTools.githubKindNative`,"managed-pat":`agentTools.githubKindPat`,"managed-oauth":`agentTools.githubKindOAuth`},Z={available:`agentTools.githubRefreshAvailable`,expired:`agentTools.githubRefreshExpired`,unavailable:`agentTools.githubRefreshUnavailable`,refreshing:`agentTools.githubRefreshRefreshing`,failed:`agentTools.githubRefreshFailed`,not_applicable:`common.na`},Q={code:`agentTools.githubCodeReady`,pending:`agentTools.githubWaiting`,cancelling:`agentTools.githubCancelling`,finishing:`agentTools.githubFinishing`,cancel_error:`agentTools.githubCancelFailed`,network_error:`agentTools.githubNetworkRetry`}})))()}export{W as a,V as c,G as i,H as l,q as n,ee as o,J as r,U as s,$ as t};
//# sourceMappingURL=github-identity-view-DXgavZgx.js.map