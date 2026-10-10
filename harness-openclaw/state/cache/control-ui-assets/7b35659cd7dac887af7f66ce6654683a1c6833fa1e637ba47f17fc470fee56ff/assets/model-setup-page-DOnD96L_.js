import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,Rt as r,zr as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,Bs as o,Fl as s,Gc as c,Il as l,Ll as u,Pc as ee,Sl as te,Ss as d,Tl as f,Vs as ne,bs as re,nn as ie,un as ae,wl as oe,xs as p}from"./control-ui-core-CndkyZ8m.js";import{$ as m,Q as h,at as se,dt as g,nt as _,pt as ce,v as le,x as ue}from"./lit-runtime-CIjzngcy.js";import{$r as de,Di as v,Ei as y,Qr as fe,Zn as b,bi as pe,lr as me,nr as he,si as ge,xi as _e}from"./control-ui-core-C5mtYcym.js";import{c as ve,u as x}from"./gateway-runtime-BvWNTqPo.js";import{Vn as ye}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as be,V as S,cn as xe,dn as Se,ln as Ce,mn as we,pn as Te,rn as Ee,tn as De,un as Oe,z as ke}from"./control-ui-boot-shared-DwSLfX8E.js";import{Bi as Ae,Hi as C,Ji as je,Ri as w,Ui as Me,Vi as T,it as Ne,nt as Pe,qi as Fe,zi as E}from"./control-ui-boot-shared-DpHhsTHW.js";import{L as Ie,R as Le,U as Re,z as ze}from"./control-ui-boot-shared-CoE663Cg.js";import{n as Be,t as Ve}from"./settings-workspace-gGOfyDax.js";import{a as He,c as Ue,d as D,f as We,i as Ge,l as O,m as Ke,n as qe,o as Je,p as Ye,r as Xe,s as Ze,t as Qe,u as $e}from"./login-controller-tIwBRZWL.js";var k,et;function tt(){return(tt=e((()=>{we(),k=class{oHash;iHash;blockLen;outputLen;canXOF=!1;finished=!1;destroyed=!1;constructor(e,t){if(Oe(e),xe(t,void 0,`key`),this.iHash=e.create(),typeof this.iHash.update!=`function`)throw Error(`expected Hash instance`);this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let n=this.blockLen,r=new Uint8Array(n);r.set(t.length>n?e.create().update(t).digest():t);for(let e=0;e<r.length;e++)r[e]^=54;this.iHash.update(r),this.oHash=e.create();for(let e=0;e<r.length;e++)r[e]^=106;this.oHash.update(r),Te(r)}update(e){return Ce(this),this.iHash.update(e),this}digestInto(e){Ce(this),Se(e,this),this.finished=!0;let t=e.subarray(0,this.outputLen);this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){let e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||=Object.create(Object.getPrototypeOf(this),{});let{oHash:t,iHash:n,finished:r,destroyed:i,blockLen:a,outputLen:o,canXOF:s}=this;return e=e,e.finished=r,e.destroyed=i,e.blockLen=a,e.outputLen=o,e.canXOF=s,e.oHash=t._cloneInto(e.oHash),e.iHash=n._cloneInto(e.iHash),e}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}},et=(()=>{let e=((e,t,n)=>new k(e,t).update(n).digest());return e.create=(e,t)=>new k(e,t),e})()})))()}function nt(e){let t=t=>{t.key===N&&t.newValue===null&&t.oldValue&&e(t.oldValue)};return I.add(e),window.addEventListener(`storage`,t),()=>{I.delete(e),window.removeEventListener(`storage`,t)}}function rt(e,t,n){try{let r=JSON.parse(n.getItem(P)??`null`);if(r?.version!==1||typeof r.privateKey!=`string`||!r.privateKey)return null;let i=e.gateway.connection,a=i.token||i.password||i.bootstrapToken,o=a?``:e.gateway.snapshot.hello?.auth?.deviceToken;if(!a&&!o)return null;let s=[t.gatewayUrl,t.agentId,t.modelRef??``,t.kind,String(t.deadlineMs),i.token,i.password,i.bootstrapToken,i.bootstrapProfile??``,o??``,...t.modelTarget?[t.modelTarget]:[]],c=new TextEncoder,l=s.map(e=>`${c.encode(e).length}:${e}`).join(`|`);return Array.from(et(Ee,c.encode(r.privateKey),c.encode(l))).map(e=>e.toString(16).padStart(2,`0`)).join(``)}catch{return null}}function A(e,t){try{let n=e.getItem(N);if((t===void 0||t&&n===JSON.stringify(t))&&(e.removeItem(N),n))for(let e of I)e(n)}catch{}}function j(e,t){let n=u();if(!n||e.gateway.snapshot.phase!==`connected`)return null;try{let i=n.getItem(N);if(!i||t&&i!==JSON.stringify(t))return null;let a=JSON.parse(i);if(a?.version!==1||typeof a.gatewayUrl!=`string`||typeof a.agentId!=`string`||a.modelRef!==null&&typeof a.modelRef!=`string`||a.modelTarget!==void 0&&a.modelTarget!==`utility`||typeof a.kind!=`string`||typeof a.deadlineMs!=`number`||!Number.isFinite(a.deadlineMs)||a.deadlineMs<=Date.now()||typeof a.owner!=`string`||a.gatewayUrl!==r(e.gateway.connection.gatewayUrl)||a.agentId!==(e.agentSelection.state.selectedId??``))return A(n),null;let{owner:o,...s}=a;return rt(e,s,n)===o?a:(A(n),null)}catch{return A(n),null}}function it(e){return Date.now()+$e(e)+F}function at(e,t){let n=u();if(!n||e.gateway.snapshot.phase!==`connected`)return null;try{let i={version:1,gatewayUrl:r(e.gateway.connection.gatewayUrl),agentId:e.agentSelection.state.selectedId??``,modelRef:t.modelRef??null,...t.modelTarget?{modelTarget:t.modelTarget}:{},kind:t.kind,deadlineMs:t.deadlineMs??it(t.kind)},a=rt(e,i,n);if(!a)return null;let o={...i,owner:a};return n.setItem(N,JSON.stringify(o)),o}catch{return null}}function M(e){let t=u();t&&A(t,e)}function ot(e,t,n,r,i,a){let{context:o}=e,s=o.gateway.snapshot;!i()&&s.phase===`connected`&&s.client===t.client&&s.hello===t.hello&&o.gateway.connectionRevision===n&&(o.agentSelection.state.selectedId?.trim()||null)===r&&e.isStillDefaultLanding()&&j(o)!==null&&e.redirect(),a()}var N,P,F,I;function L(){return(L=e((()=>{tt(),De(),D(),N=`openclaw.modelSetup.pendingActivation.v1`,P=`openclaw-device-identity-v1`,F=5e3,I=new Set})))()}function R(e){return re(e,a(`modelSetup.errors.requestFailed`))}async function z(e,t){try{return{client:e,value:await t()}}catch(t){return{client:e,error:t}}}function B(){return(B=e((()=>{f(),d()})))()}function V(e,t){return t?e.agentSelection:e.settingsAgentSelection}function st(e,t,n=null){let r=e.gateway.snapshot;return{client:r.client,hello:r.hello,agentId:V(e,t).state.selectedId,connected:r.phase===`connected`,firstRun:t,connectionRevision:e.gateway.connectionRevision,recoveryScope:r.phase===`connected`?r.hello?.auth?.recoveryScope??null:n}}var ct;function lt(){return(lt=e((()=>{f(),ae(),L(),B(),D(),ct=class{constructor(e){this.host=e,this.generation=0,this.started=!1,this.readyConnection=null,this.pending=null}subscribe(e){return nt(t=>{let n=this.pending;n?.receipt&&JSON.stringify(n.receipt)===t&&(this.pending=null,n.outcome===`verified`&&this.host.setActivationState({phase:`idle`}),this.host.setVerifyState({phase:`idle`}),e())})}setReadyConnection(e){this.readyConnection=e}routeChanged(){let e=this.pending?.receipt??null;this.reset(),this.readyConnection=null,this.pending=null,this.host.routeData()?.firstRun===!1&&M(e)}connectionChanged(e){if(this.reset(),this.readyConnection=null,this.pending&&(!this.pending.owner.recoveryScope||e.agentId!==this.pending.owner.connection.agentId||this.host.context().gateway.connectionRevision!==this.pending.owner.connectionRevision||this.host.context().gateway.snapshot.phase===`connected`&&(e.hello?.auth?.recoveryScope??null)!==this.pending.owner.recoveryScope)){let e=this.pending.receipt;this.pending=null,M(e)}}reconnectActivation(e){let t=this.pending;if(!t)return;let n=this.host.context();t.owner.recoveryScope&&t.owner.connectionRevision===n.gateway.connectionRevision&&t.owner.recoveryScope===(e.hello?.auth?.recoveryScope??null)&&t.owner.connection.agentId===e.agentId&&t.owner.firstRun===this.host.routeData()?.firstRun&&(t.owner=this.owner(t.owner.firstRun))}retryDetection(){if(this.host.actionsDisabled())return!1;if(this.pending&&Date.now()<this.pending.deadlineMs)return this.host.setRefreshWarning(a(`modelSetup.recovery.wait`,{time:ie(this.pending.deadlineMs)})),!0;if(this.host.routeData()?.firstRun){let e=this.host.pageState(),t=this.pending&&e.phase===`ready`&&this.configuredActivationModel(e.result);this.pending=null,M(),this.host.setRefreshWarning(null),this.reset(),this.started=!!t}return!0}dispose(){this.reset(),this.readyConnection=null,this.pending=null}visiblePageState(e){let t=this.host.pageState();return this.host.routeData()?.firstRun&&t.phase===`ready`&&t.result.setupComplete&&t.result.configuredModel&&!e?{...t,result:{...t.result,setupComplete:!1}}:t}start(){let e=this.host.routeData(),t=this.host.context(),n=t.gateway.snapshot,r=this.host.pageState(),i=this.readyConnection;if(!e?.firstRun||this.started||r.phase!==`ready`||!i||i.client!==n.client||i.hello!==n.hello||i.agentId!==t.agentSelection.state.selectedId||this.host.actionsDisabled()||!this.host.canUseSetup(n.client))return;let o=j(t);this.pending?.receipt&&o?.owner!==this.pending.receipt.owner&&(this.pending=null);let s=o??this.pending;if(s&&(this.pending={owner:this.owner(e.firstRun),modelRef:s.modelRef,...s.modelTarget?{modelTarget:s.modelTarget}:{},kind:s.kind,deadlineMs:s.deadlineMs,receipt:o,outcome:`pending`}),!this.pending){this.started=!0;return}let c=this.configuredActivationModel(r.result);if(this.pending&&(!c||!this.pending.modelRef)){this.started=!0,this.showUnresolved();return}if(c&&!this.host.canVerify(n.client)){this.started=!0,this.host.setVerifyState({phase:`failed`,status:`unknown`,error:`${a(`modelSetup.access.gatewayTooOld`)}. ${a(`updates.confirm.action`)}. ${a(`desktop.reconnect`)}.`});return}this.started=!0,this.run(this.owner(e.firstRun),r.result)}beginActivation(e){let t=this.host.routeData();if(!t?.firstRun)return null;let n=this.owner(t.firstRun),r=at(this.host.context(),e);return this.pending={owner:n,kind:e.kind,modelRef:e.modelRef??null,...e.modelTarget?{modelTarget:e.modelTarget}:{},receipt:r,outcome:`pending`,deadlineMs:r?.deadlineMs??it(e.kind)},this.started=!0,this.pending}recordActivation(e,t){if(!e)return;if(t.status===`cancelled`||t.status===`not-admitted`||t.status===`error`&&t.activationRejection?.disposition===`rejected-before-promotion`){this.ownsActivation(e)&&(e.outcome=`rejected`),M(e.receipt),this.pending===e&&(this.pending=null);return}let n=t.status===`done`?t.modelActivation?.modelRef:void 0;n&&this.pending===e&&this.ownsActivation(e)&&(e.modelRef=n,e.modelTarget=t.status===`done`?t.modelActivation?.modelTarget:void 0,e.outcome=`verified`,e.receipt=at(this.host.context(),e))}finishActivation(e,t,n){this.pending&&this.ownsActivation()&&e.ok&&e.modelRef&&(e.gatewayRestartRequired?(this.host.setActivationState({phase:`testing`,targetId:t}),this.host.setRefreshWarning(n??a(`updates.dialog.restarting`))):n||this.completeNavigation())}get unresolved(){return this.pending!==null}get canUseCurrentModel(){let e=this.host.pageState();return this.pending!==null&&e.phase===`ready`&&!!this.configuredActivationModel(e.result)}async useCurrentModel(){let e=this.host.pageState(),t=this.pending;if(!t||e.phase!==`ready`||!this.configuredActivationModel(e.result)||this.host.actionsDisabled())return;let n=this.configuredActivationModel(e.result),r=this.owner(t.owner.firstRun),i=await this.verify();!this.owns(r)||this.pending!==t||!i||`error`in i||(i.value.ok&&i.value.modelRef===n&&i.value.modelTarget===t.modelTarget?this.completeNavigation():i.value.ok&&this.showUnresolved())}owner(e){let t=st(this.host.context(),e);return{generation:this.generation,firstRun:e,connectionRevision:t.connectionRevision,recoveryScope:t.recoveryScope,connection:t}}clearPending(){this.pending=null,M()}ownsActivation(e=this.pending){return e?this.owns(e.owner)?e.outcome===`rejected`?this.pending===null:this.pending===e&&(!e.receipt||j(this.host.context(),e.receipt)!==null)&&Date.now()<e.deadlineMs:!1:!this.host.routeData()?.firstRun}async verify(){let e=this.host.routeData();if(!e)return;let t=this.owner(e.firstRun),n=this.pending,r=await this.host.verify(n?.modelTarget);if(this.owns(t)&&r){if(this.pending!==n||n&&!this.ownsActivation(n)){this.host.setVerifyState({phase:`idle`});return}return this.host.setVerifyState(`error`in r?{phase:`failed`,status:`unknown`,error:R(r.error)}:Ke(r.value)),r}}continueSetup(e){if(this.pending)this.pending.outcome===`verified`&&this.ownsActivation()&&this.completeNavigation();else{let t=this.host.pageState(),n=this.host.activationState();e===`utility`||n.phase===`success`&&n.modelTarget===`utility`||t.phase===`ready`&&t.result.setupModel?this.host.context().navigate(`custodian`,t.phase===`ready`&&!t.result.configuredModel?{search:`?onboarding=1`}:{}):this.host.context().navigate(`chat`)}}completeNavigation(){this.clearPending(),this.host.setRefreshWarning(null),this.host.context().navigate(`custodian`,{search:`?onboarding=1`})}showUnresolved(){this.host.setRefreshWarning(null),this.host.setVerifyState({phase:`failed`,status:`unknown`,error:`${a(`modelSetup.errors.activationFailed`)} ${this.pending?.modelRef??``}`.trim()})}reset(){this.generation+=1,this.started=!1}owns(e){let t=this.host.context(),n=t.gateway.snapshot;return e.generation===this.generation&&e.connectionRevision===t.gateway.connectionRevision&&e.recoveryScope===(n.hello?.auth?.recoveryScope??null)&&e.firstRun===this.host.routeData()?.firstRun&&n.phase===`connected`&&n.client===e.connection.client&&n.hello===e.connection.hello&&V(t,e.firstRun).state.selectedId===e.connection.agentId}async run(e,t){let n=this.configuredActivationModel(t);if(n){if(this.pending&&n!==this.pending.modelRef){this.showUnresolved();return}let t=await this.verify();if(!this.owns(e)||!t||`error`in t)return;t.value.ok&&this.finishVerified(t.value.modelRef,t.value.modelTarget)}}configuredActivationModel(e){return this.pending?.modelTarget===`utility`?e.utilityModel??e.setupModel:e.setupComplete?e.configuredModel:void 0}finishVerified(e,t){this.pending?this.pending.modelRef===e&&this.pending.modelTarget===t?this.completeNavigation():this.showUnresolved():this.host.context().navigate(`chat`)}}})))()}function ut(e){return e.brandId&&w(e.brandId)?e.brandId:null}function H(e,t,n=``){let r=ut(t);if(r)return C(r,{className:`model-setup__icon ${n}`.trim()});let i=t.icon?e.iconUrls[t.icon]:void 0;return!t.icon||!i?Me(t.label,{className:`model-setup__icon ${n}`.trim()}):_`<img
    class=${`model-setup__icon ${n}`.trim()}
    src=${i}
    alt=${t.label}
    width="24"
    height="24"
    @error=${()=>e.onIconError(t.icon)}
  />`}var dt;function U(){return(U=e((()=>{h(),E(),Re(),Le(),dt=class{constructor(e,t,n){this.getContext=e,this.getPageState=t,this.onChange=n,this.loader=new Ie({getFetchContext:()=>{let e=this.getContext();return{resourceBasePath:e.resourceBasePath,gatewayUrl:e.gateway.connection.gatewayUrl,auth:{hello:e.gateway.snapshot.hello,settings:{token:e.gateway.connection.token},password:e.gateway.connection.password}}},isConnected:e=>this.getContext().gateway.snapshot.phase===`connected`&&this.currentIconUrls().has(e),fetchIcon:(e,t,n)=>ze({iconUrl:e,...t,signal:n}),timeoutError:()=>new DOMException(`catalog icon fetch timed out`,`TimeoutError`),onUrlsChange:e=>this.onChange(e)})}reconcile(){let e=this.currentIconUrls();this.loader.reconcileKeys(e);for(let t of e)this.loader.load(t)}invalidate(e){this.loader.handleError(e)}reset(){this.loader.reset()}currentIconUrls(){let e=this.getPageState();if(e.phase!==`ready`)return new Set;let t=e.result;return new Set([...t.candidates,...t.unavailableCandidates??[],...t.manualProviders,...t.authOptions??[],...t.prepareOptions??[],...t.recommendedInstalls??[]].flatMap(e=>e.icon&&!ut(e)?[e.icon]:[]))}}})))()}function W(e){return`provider-auto:${encodeURIComponent(e)}`}function ft(e,t){return{kind:W(e.id),modelRef:t,...e.modelTarget?{modelTarget:e.modelTarget}:{}}}function pt(e){let t=[{id:`ollama`,brandId:`ollama`,label:a(`modelSetup.prepare.ollamaLabel`),hint:a(`modelSetup.prepare.ollamaHint`)},{id:`llama-cpp`,brandId:`llama-cpp`,label:a(`modelSetup.prepare.llamaCppLabel`)}];return(e.prepareOptions??t).filter(t=>!e.candidates.some(e=>e.credentials!==!1&&(e.kind===W(t.id)||e.modelRef.startsWith(`${t.brandId??t.id}/`))))}function mt(e,t){return e.candidates.find(e=>e.kind===W(t)&&e.credentials!==!1)}function G(){return(G=e((()=>{f()})))()}function ht(e,t,n){let r=e.find(e=>e.id===t),i=n.trim();return r&&i?{kind:`api-key`,authChoice:r.id,apiKey:i,...r.modelTarget?{modelTarget:r.modelTarget}:{}}:null}function gt(e){let t=e.currentTarget,n=Array.from(t.querySelectorAll(`wa-dropdown-item[data-manual-provider]:not([disabled])`)),r=n.find(e=>e.hasAttribute(`data-selected`))??n[0];if(r){for(let e of n)e.active=e===r;r.focus({preventScroll:!0}),r.scrollIntoView?.({block:`nearest`})}}function _t(e){let t=e.currentTarget;if(t.open){if(e.key===`Tab`){e.preventDefault(),e.stopPropagation();let n=e.shiftKey?t.querySelector(`[slot="trigger"]`):t.closest(`.model-setup__manual`)?.querySelector(`input[type="password"]`);t.addEventListener(`wa-after-hide`,()=>n?.focus({preventScroll:!0}),{once:!0}),t.open=!1;return}e.key===`Escape`&&(e.preventDefault(),t.addEventListener(`wa-after-hide`,()=>t.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),{once:!0}))}}function vt(e,t,n){let r=e.detail.item,i=e.currentTarget,a=r.value??r.getAttribute(`value`);if(a){if(a!==t){i.addEventListener(`wa-after-hide`,()=>i.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),{once:!0}),n(a);return}e.preventDefault(),r.checked=!0,i.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),i.open=!1}}function K(e){return e.groupLabel?.trim()||e.label}function yt(e){let t=e.label.trim();return t===K(e)?void 0:t}function bt(e,t,n){let r=n?yt(n):void 0,i=n?[K(n),r].filter(Boolean).join(`, `):a(`modelSetup.manual.selectProvider`);return _`
    <wa-dropdown
      class="model-setup-provider-select"
      placement="bottom-start"
      aria-label=${a(`modelSetup.manual.provider`)}
      @wa-select=${t=>vt(t,e.manualProviderId,e.onManualProviderChange)}
      @wa-after-show=${gt}
      @keydown=${_t}
    >
      <button
        slot="trigger"
        type="button"
        class="model-setup-provider-select__trigger"
        aria-label=${`${a(`modelSetup.manual.provider`)}: ${i}`}
        ?disabled=${e.actionsDisabled||t.manualProviders.length===0}
      >
        ${n?H(e,n,`model-setup__icon--picker`):_`<span class="model-setup-provider-select__placeholder-icon" aria-hidden="true">
                ${y.key}
              </span>`}
        <span class="model-setup-provider-select__copy">
          <strong>
            ${n?K(n):a(`modelSetup.manual.selectProvider`)}
          </strong>
          ${n?r?_`<span>${r}</span>`:m:_`<span>${a(`modelSetup.manual.selectProviderHint`)}</span>`}
        </span>
        <span class="model-setup-provider-select__chevron" aria-hidden="true">
          ${y.chevronDown}
        </span>
      </button>
      ${t.manualProviders.toSorted((e,t)=>K(e).localeCompare(K(t))).map(t=>{let n=t.id===e.manualProviderId,r=yt(t),i=[K(t),r,t.hint].filter(Boolean).join(`, `);return _`
            <wa-dropdown-item
              class="model-setup-provider-select__option"
              data-manual-provider=${t.id}
              ?data-selected=${n}
              aria-label=${i}
              .value=${t.id}
              type="checkbox"
              .checked=${n}
              ?disabled=${e.actionsDisabled}
              ${ue(e=>je(e,n))}
            >
              <span slot="icon">
                ${H(e,t,`model-setup__icon--picker`)}
              </span>
              <span class="model-setup-provider-select__copy">
                <strong>${K(t)}</strong>
                ${r?_`<span>${r}</span>`:m}
                ${t.hint?_`<small>${t.hint}</small>`:m}
              </span>
            </wa-dropdown-item>
          `})}
    </wa-dropdown>
  `}function q(){return(q=e((()=>{h(),le(),v(),Fe(),f(),U()})))()}function xt(e,t,n){return e.request(`openclaw.setup.detect`,t?{agentId:t}:{},{timeoutMs:Ze,...n?{signal:n}:{}})}function St(e,t,n,r){return e.request(`openclaw.setup.verify`,{...t?{agentId:t}:{},...r?{modelTarget:r}:{}},{timeoutMs:Ue,...n?{signal:n}:{}})}function Ct(e){return new be(e,{autoRun:!1,args:()=>[null,null,void 0],task:async([e,t,n],{signal:r})=>e?z(e,()=>St(e,t??void 0,r,n)):S})}function wt(){return(wt=e((()=>{ke(),B(),D()})))()}var J,Y;function X(){return(X=e((()=>{l(),J={modelSetup:{verify:{title:`Selected model`,button:`Check model`,retry:`Try again`,checkAgain:`Check again`,checkingButton:`Checking…`,checking:`Checking — asking {modelRef} for a quick reply…`,ready:`Ready`,readyIn:`Ready · {latencyMs} ms`,providerUnavailable:`{provider} isn’t responding.`},nativeDiscovery:{title:`Discover existing conversations`,body:`Show native assistant conversations from this Gateway host in OpenClaw. This is discovery, not an import or copy.`,enable:`Show existing native conversations`,decline:`Leave unchecked to keep native session catalogs off when you connect your AI provider. Existing installations are not changed.`},success:{title:`Connection verified`,body:`OpenClaw received a real reply from {modelRef}. You can start chatting now.`,activeModel:`Active model`,latency:`Verified in {latencyMs} ms`,openChat:`Start chatting`,continueSetup:`Continue setup`,stayHere:`Stay in settings`,configuredModel:`Configured model`},utility:{role:`Setup & utility`,hint:`Helps set up OpenClaw and handles lightweight tasks. Regular chats need a primary model.`,useSetup:`Use for setup`,useUtility:`Use as utility`,ready:`Setup & utility model ready`,configured:`Setup & utility model`,verified:`OpenClaw received a real reply from {modelRef}. This model is ready for setup and lightweight tasks.`,model:`Utility model`,choosePrimary:`Choose a primary model below for regular chats. Your setup assistant remains available.`,primaryReady:`This model handles setup and lightweight tasks. Regular chats use your primary model.`,openAssistant:`Open setup assistant`,repair:`Recheck & repair`}}},Y=Object.assign(()=>{Object.assign(s.modelSetup,J.modelSetup)},{catalog:J})})))()}function Tt(e){if(e.modelTarget===`utility`)return a(`modelSetup.utility.role`);let t=e.kind.startsWith(`saved-auth:`)?`detected`:e.recommended?`recommended`:e.credentials===void 0?`detected`:e.credentials?`credentialsReady`:`signInNeeded`;return a(`modelSetup.candidates.${t}`)}function Et(e,t){let n=t.candidates.filter(e=>!(e.modelTarget===`utility`&&!e.kind.startsWith(`saved-auth:`)&&e.modelRef===(t.utilityModel??t.setupModel))&&(!t.configuredModel||e.kind!==`existing-model`&&(e.kind.startsWith(`saved-auth:`)||e.modelRef!==t.configuredModel)));return n.length===0?m:_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${a(`modelSetup.candidates.title`)}</h2>
      </div>
      <div class="model-setup__rows">
        ${n.toSorted((e,t)=>e.label.localeCompare(t.label)).map(n=>{let r=e.activation.phase===`testing`&&e.activation.targetId===O(n.kind,n.modelRef),i=e.activation.phase===`failure`&&e.activation.targetId===O(n.kind,n.modelRef)?e.activation:null;return _`
              <div class="model-setup__row" data-candidate-kind=${n.kind}>
                <div class="model-setup__row-main">
                  <div class="model-setup__row-title">
                    ${H(e,n)}
                    <strong>${n.label}</strong>
                    <span class="model-setup__chip">${Tt(n)}</span>
                  </div>
                  <div class="muted">
                    ${n.modelRef} · ${p(n.detail)}
                  </div>
                  ${n.modelTarget===`utility`?_`<div class="muted">${a(`modelSetup.utility.hint`)}</div>`:m}
                </div>
                <div class="model-setup__row-actions">
                  <button
                    type="button"
                    class=${`btn ${i?``:`primary`}`}
                    ?disabled=${e.actionsDisabled}
                    @click=${()=>e.onActivateCandidate(n)}
                  >
                    <span>
                      ${r?a(`modelSetup.candidates.testingButton`):i?a(`modelSetup.candidates.retry`):n.modelTarget===`utility`?a(t.configuredModel?`modelSetup.utility.useUtility`:`modelSetup.utility.useSetup`):a(`modelSetup.candidates.testAndUse`)}
                    </span>
                  </button>
                </div>
              </div>
            `})}
      </div>
    </section>
  `}function Dt(){return(Dt=e((()=>{h(),f(),X(),d(),U(),D(),Y()})))()}function Ot(e){let t=e.result.utilityModel??e.result.setupModel;if(!t)return m;let n=e.canRepair?e.result.candidates.find(e=>e.modelTarget===`utility`&&e.modelRef===t&&e.kind.startsWith(`provider-auto:`)):void 0,r=n&&e.activation.phase===`testing`&&e.activation.targetId===O(n.kind,n.modelRef);return _`<section class="settings-section model-setup__utility">
    <div class="settings-section__header"><h2>${a(`modelSetup.utility.configured`)}</h2></div>
    <div class="model-setup__row">
      <div class="model-setup__row-main">
        <strong>${t}</strong>
        <div class="muted">
          ${a(e.result.configuredModel?`modelSetup.utility.primaryReady`:`modelSetup.utility.choosePrimary`)}
        </div>
      </div>
      <div class="model-setup__row-actions">
        ${n?_`<button
                type="button"
                class="btn"
                ?disabled=${e.actionsDisabled}
                @click=${()=>e.onActivateCandidate(n)}
              >
                ${a(r?`modelSetup.candidates.testingButton`:`modelSetup.utility.repair`)}
              </button>`:m}
        <button
          type="button"
          class="btn primary"
          ?disabled=${e.actionsDisabled}
          @click=${e.onOpenAssistant}
        >
          ${a(`modelSetup.utility.openAssistant`)}
        </button>
      </div>
    </div>
  </section>`}function kt(e){let t={auth:a(`modelSetup.failure.auth`),rate_limit:a(`modelSetup.failure.rateLimit`),billing:a(`modelSetup.failure.billing`),timeout:a(`modelSetup.failure.timeout`),format:a(`modelSetup.failure.format`),unavailable:a(`modelSetup.failure.unavailable`),unknown:a(`modelSetup.failure.unknown`)};return t[e]??t.unknown}function At(e){let t={auth:a(`modelSetup.failureGuidance.auth`),rate_limit:a(`modelSetup.failureGuidance.rateLimit`),billing:a(`modelSetup.failureGuidance.billing`),timeout:a(`modelSetup.failureGuidance.timeout`),format:a(`modelSetup.failureGuidance.format`),unavailable:m,unknown:a(`modelSetup.failureGuidance.unknown`)};return t[e]??t.unknown}function Z(e,t){return _`
    <div class="model-setup__failure" role="alert">
      <span class="model-setup__failure-icon" aria-hidden="true">${y.alertTriangle}</span>
      <span><strong>${kt(e)}.</strong> ${t} ${At(e)}</span>
    </div>
  `}function jt(e){let t=e.indexOf(`/`);return t<0?e:e.slice(t+1)}function Mt(e,t){return e.candidates.find(e=>e.modelRef===t&&!e.kind.startsWith(`saved-auth:`))}function Nt(e,t){let n=jt(t),r=e?.detail.trim();return!r||e?.kind===`existing-model`?n:r.toLowerCase().includes(n.toLowerCase())?r:`${n} · ${r}`}function Pt(e){switch(e.phase){case`checking`:return a(`modelSetup.verify.checkingButton`);case`failed`:return a(`modelSetup.verify.retry`);case`ok`:return a(`modelSetup.verify.checkAgain`);default:return a(`modelSetup.verify.button`)}}function Ft(e){let t=e.result.configuredModel,n=e.verify.phase===`ok`?e.verify.modelRef:t,r=T(n),i=n===t?Mt(e.result,t):void 0,o=r?Ae(r):n,s=Nt(i,n);return _`
    <section class="settings-section model-setup__current" data-verify-phase=${e.verify.phase}>
      <div class="settings-section__header">
        <h2>${a(`modelSetup.verify.title`)}</h2>
      </div>
      <div class="model-setup__row">
        <div class="model-setup__provider-copy">
          ${r?C(r,{className:`model-setup__icon`}):m}
          <div class="model-setup__current-copy">
            <strong>${o}</strong>
            <div class="muted">${s}</div>
            ${e.verify.phase===`checking`?_`<div class="model-setup__testing" role="status">
                    ${a(`modelSetup.verify.checking`,{modelRef:t})}
                  </div>`:e.verify.phase===`ok`?_`<div class="model-setup__verified" role="status">
                      ${e.verify.latencyMs===void 0?a(`modelSetup.verify.ready`):a(`modelSetup.verify.readyIn`,{latencyMs:String(e.verify.latencyMs)})}
                    </div>`:e.verify.phase===`failed`?Z(e.verify.status,e.verify.error):m}
          </div>
        </div>
        <div class="model-setup__row-actions">
          ${e.canVerify?_`<button
                  type="button"
                  class="btn"
                  ?disabled=${e.actionsDisabled}
                  @click=${e.onVerify}
                >
                  ${Pt(e.verify)}
                </button>`:m}
          ${e.onContinue?_`<button type="button" class="btn primary" @click=${e.onContinue}>
                  ${y.messageSquare} ${a(`modelSetup.success.continueSetup`)}
                </button>`:m}
        </div>
      </div>
    </section>
  `}function It(){return(It=e((()=>{h(),v(),E(),f(),X(),D(),Y()})))()}function Lt(e,t,n,r){let i=T(e.modelRef),o=i&&w(i)?i:null,s=e.modelTarget===`utility`,c=a(s?`modelSetup.utility.ready`:`modelSetup.success.title`),l=e.warning??a(s?`modelSetup.utility.verified`:`modelSetup.success.body`,{modelRef:e.modelRef}),u=s?a(`modelSetup.utility.openAssistant`):r?a(`modelSetup.success.continueSetup`):e.warning?a(`tabs.chat`):a(`modelSetup.success.openChat`);return _`
    <openclaw-modal-dialog label=${c} description=${l} @modal-cancel=${n}>
      <section class="model-setup-success" role="status">
        <div
          class=${`model-setup-success__icon${o?` model-setup-success__icon--provider`:``}`}
          aria-hidden="true"
        >
          ${o?_`
                  ${C(o,{className:`model-setup-success__provider-icon`})}
                  <span class="model-setup-success__status-badge">${y.check}</span>
                `:y.shieldCheck}
        </div>
        <div class="model-setup-success__copy">
          <h2>${c}</h2>
          ${e.warning?m:_`<p>${l}</p>`}
        </div>
        ${e.warning?_`<div class="model-setup-success__warning">${e.warning}</div>`:m}
        <div class="model-setup-success__summary">
          <span>${a(s?`modelSetup.utility.model`:`modelSetup.success.activeModel`)}</span>
          <strong>${e.modelRef}</strong>
          ${e.latencyMs===void 0?m:_`<span>
                  ${a(`modelSetup.success.latency`,{latencyMs:String(e.latencyMs)})}
                </span>`}
        </div>
        <footer class="model-setup-success__actions">
          <button type="button" class="btn" @click=${n}>
            ${a(`modelSetup.success.stayHere`)}
          </button>
          <button type="button" class="btn primary" autofocus @click=${t}>
            ${y.messageSquare} ${u}
          </button>
        </footer>
      </section>
    </openclaw-modal-dialog>
  `}function Rt(){return(Rt=e((()=>{h(),v(),me(),E(),f(),X(),Y()})))()}function zt(e,t){let n=t.recommendedInstalls??[];return t.candidates.length>0||(t.authOptions?.length??0)>0||n.length===0?m:_`
    <section class="settings-section model-setup__empty">
      <div class="settings-section__header">
        <h2>${a(`modelSetup.empty.title`)}</h2>
      </div>
      <p class="muted">${a(`modelSetup.empty.intro`)}</p>
      <div class="model-setup__recommendations">
        ${n.map(t=>_`
            <div class="model-setup__recommendation" data-recommended-install=${t.id}>
              ${H(e,t,`model-setup__icon--recommendation`)}
              <div class="model-setup__row-main">
                <strong>${t.label}</strong>
                <div class="muted">${t.hint}</div>
                <a href=${t.website} target="_blank" rel="noopener">${t.website}</a>
              </div>
            </div>
          `)}
      </div>
    </section>
  `}function Bt(e,t){return t.unavailableCandidates?.length?_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${a(`modelSetup.unavailable.title`)}</h2>
      </div>
      <div class="model-setup__rows">
        ${t.unavailableCandidates.map(n=>{let r=(t.authOptions??[]).find(e=>e.id===n.authOptionId),i=t.manualProviders.find(e=>e.id===n.manualProviderId);return _`
            <div
              class="model-setup__row model-setup__row--info"
              data-unavailable-candidate=${n.id}
            >
              <div class="model-setup__provider-copy">
                ${H(e,n)}
                <div>
                  <div>
                    <strong>${n.label}</strong> — ${p(n.detail)}
                  </div>
                  <div class="muted">${p(n.reason)}</div>
                </div>
              </div>
              <div class="model-setup__row-actions">
                ${r?_`<button
                        type="button"
                        class="btn primary"
                        ?disabled=${e.actionsDisabled}
                        @click=${()=>e.onStartAuth(r)}
                      >
                        ${a(`modelSetup.unavailable.signIn`,{provider:r.groupLabel??r.label})}
                      </button>`:m}
                ${i?_`<button
                        type="button"
                        class="btn"
                        ?disabled=${e.actionsDisabled}
                        @click=${()=>e.onUseManualProvider(i.id)}
                      >
                        ${a(`modelSetup.unavailable.useApiKey`)}
                      </button>`:m}
                <button
                  type="button"
                  class="btn"
                  ?disabled=${e.actionsDisabled}
                  @click=${e.onDetect}
                >
                  ${a(`modelSetup.checkAgain`)}
                </button>
              </div>
            </div>
          `})}
      </div>
    </section>
  `:m}function Vt(e,t){return _`
    <div class="model-setup__row" data-auth-choice=${t.id}>
      <div class="model-setup__provider-copy">
        ${H(e,t)}
        <div>
          <strong>${t.label}</strong>
          ${t.groupLabel?_`<div class="muted">${t.groupLabel}</div>`:m}
          ${t.hint?_`<div class="muted">${t.hint}</div>`:m}
        </div>
      </div>
      <button
        type="button"
        class="btn"
        ?disabled=${e.actionsDisabled}
        @click=${()=>e.onStartAuth(t)}
      >
        ${t.kind===`install`?a(`modelSetup.signIn.install`):t.kind===`custom`?a(`modelSetup.signIn.custom`):a(`modelSetup.signIn.verify`)}
      </button>
    </div>
  `}function Ht(e,t){let n=(t.authOptions??[]).toSorted((e,t)=>e.label.localeCompare(t.label));if(n.length===0)return m;let r=n.filter(e=>e.featured||e.kind===`install`||e.kind===`custom`),i=n.filter(e=>!r.includes(e));return _`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${a(`modelSetup.signIn.title`)}</h2>
        <p>${a(`modelSetup.signIn.description`)}</p>
      </div>
      <div class="model-setup__rows">${r.map(t=>Vt(e,t))}</div>
      ${i.length?_`<details
              class="model-setup__more"
              .open=${e.moreSignInOpen}
              @toggle=${t=>e.onMoreSignInToggle(t.currentTarget.open)}
            >
              <summary>${a(`modelSetup.signIn.more`)}</summary>
              <div class="model-setup__rows">
                ${i.map(t=>Vt(e,t))}
              </div>
            </details>`:m}
    </section>
  `}function Ut(e,t){if(!e.canPrepare)return m;let n=pt(t);return n.length===0?m:_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${a(`modelSetup.prepare.title`)}</h2>
      </div>
      <p class="muted">${a(`modelSetup.prepare.intro`)}</p>
      <div class="model-setup__rows">
        ${n.map(t=>_`
            <div class="model-setup__row" data-prepare-choice=${t.id}>
              <div class="model-setup__provider-copy">
                ${H(e,t)}
                <div>
                  <strong>${t.label}</strong>
                  ${t.hint?_`<div class="muted">${t.hint}</div>`:m}
                </div>
              </div>
              <button
                type="button"
                class="btn"
                ?disabled=${e.actionsDisabled}
                @click=${()=>e.onStartPrepare(t)}
              >
                ${t.actionLabel??a(`modelSetup.prepare.ollamaButton`)}
              </button>
            </div>
          `)}
      </div>
    </section>
  `}function Wt(e,t){let n=t.manualProviders.find(t=>t.id===e.manualProviderId),r=`manual:${e.manualProviderId}`,i=e.activation.phase===`testing`&&e.activation.targetId===r;return _`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${a(`modelSetup.manual.title`)}</h2>
      </div>
      <div class="model-setup__manual">
        <div class="field">
          <span>${a(`modelSetup.manual.provider`)}</span>
          ${bt(e,t,n)}
        </div>
        <label class="field">
          <span>
            ${n?a(`modelSetup.manual.accessValueFor`,{provider:K(n)}):a(`modelSetup.manual.accessValue`)}
          </span>
          <input
            class="input"
            type="password"
            autocomplete="off"
            .value=${e.manualApiKey}
            ?disabled=${e.actionsDisabled}
            placeholder=${a(`modelSetup.manual.accessValuePlaceholder`)}
            @input=${t=>e.onManualApiKeyChange(t.currentTarget.value)}
          />
        </label>
        <div class="model-setup__manual-help">
          ${y.shieldCheck}
          <span>${a(`modelSetup.manual.verifyHint`)}</span>
        </div>
        ${e.manualError?_`<div class="callout danger" role="alert">${e.manualError}</div>`:m}
        <button
          type="button"
          class="btn primary"
          ?disabled=${e.actionsDisabled||!e.manualProviderId}
          @click=${e.onManualConnect}
        >
          ${a(i?`modelSetup.candidates.testingButton`:`modelSetup.manual.connectAndVerify`)}
        </button>
      </div>
    </section>
  `}function Gt(e){e.querySelector(`.model-setup > .model-setup__testing, .model-setup > .model-setup__failure`)?.scrollIntoView?.({block:`nearest`,behavior:`auto`})}function Kt(e){return e.phase===`testing`?_`<div class="model-setup__testing" role="status">${a(`modelSetup.testing`)}</div>`:e.phase===`failure`?Z(e.status,e.error):m}function qt(e,t){return t.nativeSessionCatalogPreferenceRequired!==!0||!t.nativeSessionCatalogs?.length?m:_`
    <section class="settings-section model-setup__native-discovery">
      <div class="settings-section__header"><h2>${a(`modelSetup.nativeDiscovery.title`)}</h2></div>
      <p class="muted">${a(`modelSetup.nativeDiscovery.body`)}</p>
      <p>${t.nativeSessionCatalogs.map(e=>e.label).join(`, `)}</p>
      <label>
        <input
          type="checkbox"
          .checked=${e.nativeSessionCatalogsEnabled===!0}
          ?disabled=${e.actionsDisabled}
          @change=${t=>{let n=t.currentTarget;e.onNativeSessionCatalogsChange?.(n.checked)}}
        />
        ${a(`modelSetup.nativeDiscovery.enable`)}
      </label>
      <p class="muted">${a(`modelSetup.nativeDiscovery.decline`)}</p>
    </section>
  `}function Jt(e,t){let n=e.firstRun&&t.setupComplete&&e.activation.phase!==`success`?e.onOpenChat:void 0,r=t.configuredModel?Ft({result:t,verify:e.verify.phase===`ok`&&e.verify.modelTarget===`utility`?{phase:`idle`}:e.verify,canVerify:e.canVerify,actionsDisabled:e.actionsDisabled,onVerify:e.onVerify,onContinue:n}):m,i=_`${r}${Ot({result:t,activation:e.activation,canRepair:e.canAdmin&&!e.gatewayTooOld,actionsDisabled:e.actionsDisabled||e.activationUnresolved===!0,onOpenAssistant:e.onOpenSetupAssistant??e.onOpenChat,onActivateCandidate:e.onActivateCandidate})}`;return e.canAdmin?e.gatewayTooOld?_`${i}
      <div class="callout warning" role="note">${a(`modelSetup.access.gatewayTooOld`)}</div>`:_`
    ${i} ${qt(e,t)} ${zt(e,t)}
    ${Et(e,t)} ${Bt(e,t)}
    ${Ut(e,t)} ${Ht(e,t)} ${Wt(e,t)}
  `:_`${i}
      <div class="callout warning" role="note">${a(`modelSetup.access.adminRequired`)}</div>`}function Q(e){return _`
    <section class=${`settings-section ${e.className??``}`.trim()}>
      <div class="settings-section__header"><h2>${e.title}</h2></div>
      ${e.intro?_`<p class="muted">${e.intro}</p>`:m}
      <div class="model-setup__rows">
        ${Array.from({length:e.rows??1},(t,n)=>_`
            <div class="model-setup__row model-setup__loading-row">
              <span class="model-setup__loading-icon skeleton"></span>
              <span class="model-setup__loading-copy">
                ${n===0&&e.status?_`<span class="model-setup__loading-status">${e.status}</span>`:_`<span class="skeleton skeleton-line skeleton-line--medium"></span>`}
                <span class="skeleton skeleton-line skeleton-line--long"></span>
              </span>
              <span class="model-setup__loading-action skeleton"></span>
            </div>
          `)}
      </div>
    </section>
  `}function Yt(e){return _`
    <div
      class="model-setup__loading"
      role="status"
      aria-busy="true"
      aria-label=${a(`modelSetup.loading`)}
    >
      <div class="model-setup__loading-sections" aria-hidden="true">
        ${e?Q({title:a(`modelSetup.verify.title`),className:`model-setup__loading-section--selected`,status:a(`modelSetup.loading`)}):m}
        ${Q({title:a(`modelSetup.candidates.title`),className:`model-setup__loading-section--candidates`,status:e?void 0:a(`modelSetup.loading`)})}
        ${Q({title:a(`modelSetup.prepare.title`),intro:a(`modelSetup.prepare.intro`),rows:2})}
        ${Q({title:a(`modelSetup.signIn.title`),className:`model-setup__loading-section--sign-in`})}
        ${Q({title:a(`modelSetup.manual.title`)})}
      </div>
    </div>
  `}function Xt(e){let t;e.page.phase===`ready`?t=Jt({...e,actionsDisabled:e.actionsDisabled||e.activationUnresolved===!0},e.page.result):e.canAdmin?e.gatewayTooOld?t=_`<div class="callout warning" role="note">
      ${a(`modelSetup.access.gatewayTooOld`)}
    </div>`:e.page.phase===`loading`?t=Yt(e.modelConfigured===!0):e.page.phase===`detect-error`&&(t=_`
      <div class="callout danger" role="alert">${e.page.message}</div>
      <button type="button" class="btn" @click=${e.onDetect}>${a(`modelSetup.retry`)}</button>
    `):t=_`<div class="callout warning" role="note">
      ${a(`modelSetup.access.adminRequired`)}
    </div>`;let n=_`
    <div class="model-setup">
      <div class="model-setup__intro">
        <div>
          <h1>${a(`modelSetup.heading`)}</h1>
          <p>${a(`modelSetup.intro`)}</p>
        </div>
        ${e.connection?_`<button
                class="btn primary"
                data-models-connect
                ?disabled=${e.connection.connectDisabled}
                @click=${e.connection.onConnect}
              >
                ${a(`modelProviders.login.action`)}
              </button>`:m}
        ${e.page.phase===`ready`&&!e.page.result.configuredModel&&e.activation.phase!==`success`&&e.canAdmin&&!e.gatewayTooOld?_`<button
                type="button"
                class="btn"
                ?disabled=${e.actionsDisabled}
                @click=${e.onDetect}
              >
                ${a(`modelSetup.checkAgain`)}
              </button>`:m}
      </div>
      ${e.canAdmin&&!e.gatewayTooOld?Kt(e.activation):m}
      ${e.refreshWarning?_`<div class="callout warning" role="alert">${e.refreshWarning}</div>`:m}
      ${e.activationUnresolved&&!e.actionsDisabled&&e.activation.phase!==`success`?_`<div class="model-setup__recovery">
              <p>${a(`modelSetup.recovery.unknown`)}</p>
              ${e.page.phase===`ready`&&(e.page.result.configuredModel||e.page.result.setupModel)&&e.canVerify&&e.onUseCurrentModel?_`<button
                      type="button"
                      class="btn primary"
                      @click=${e.onUseCurrentModel}
                    >
                      ${a(`modelSetup.recovery.useCurrent`)}
                    </button>`:m}
              <button type="button" class="btn" @click=${e.onDetect}>
                ${a(`modelSetup.checkAgain`)}
              </button>
            </div>`:m}
      ${e.connection?.loginMessage?_`<div class="callout success" role="status">
                ${e.connection.loginMessage.text}
              </div>
              ${e.connection.loginMessage.warning?_`<div class="callout warning" role="status">
                      ${e.connection.loginMessage.warning}
                    </div>`:m}`:m}
      ${t}
    </div>
    ${e.connection?.login}
    ${Ge({mode:e.wizardMode,state:e.wizard,refreshWarning:e.refreshWarning,cancellationNotice:e.cancellationNotice,value:e.wizardValue,onValueChange:e.onWizardValueChange,onAnswer:e.onWizardAnswer,onCancel:e.onWizardCancel,onClose:e.onWizardClose})}
    ${e.activation.phase===`success`?Lt(e.activation,e.onOpenChat,e.onSuccessClose,e.firstRun):m}
  `;return _`
    <section class="content-header">
      <div>
        <div class="page-title">${_e(`model-setup`)}</div>
        <div class="page-subtitle">
          ${pe(`model-setup`)} ${Ne(Zt)}
        </div>
      </div>
    </section>
    ${Be(n)}
  `}var Zt;function Qt(){return(Qt=e((()=>{h(),ge(),v(),Pe(),Ve(),f(),X(),d(),Dt(),It(),U(),G(),q(),Rt(),Xe(),Y(),Zt=`https://docs.openclaw.ai/concepts/model-providers`})))()}var $;function $t(){return($t=e((()=>{i(),ke(),se(),de(),he(),f(),ve(),ee(),oe(),ne(),qe(),lt(),U(),B(),G(),q(),wt(),D(),Qt(),Je(),L(),$=class extends te{constructor(...e){super(...e),this.pageState={phase:`loading`},this.activationState={phase:`idle`},this.verifyState={phase:`idle`},this.wizardState={phase:`idle`},this.wizardMode=`auth`,this.manualProviderId=``,this.manualApiKey=``,this.manualError=null,this.moreSignInOpen=!1,this.nativeSessionCatalogsEnabled=!1,this.iconUrls={},this.setupRefreshWarning=null,this.cancellationNotice=null,this.observedConnection=null,this.pendingPrepareOption=null,this.wizardMutationGeneration=0,this.wizardMutationActive=!1,this.wizardReturnFocus=null,this.firstRun=new ct({context:()=>this.context,routeData:()=>this.routeData,pageState:()=>this.pageState,activationState:()=>this.activationState,actionsDisabled:()=>this.actionsDisabled(),canUseSetup:e=>this.canUseSetup(e),canVerify:e=>this.canVerify(e),verify:e=>this.verifyConnection(e).then(()=>this.verifyTask.value),setVerifyState:e=>this.verifyState=e,setActivationState:e=>this.activationState=e,setRefreshWarning:e=>this.setupRefreshWarning=e}),this.iconLoader=new dt(()=>this.context,()=>this.pageState,e=>this.iconUrls=e),this.login=new Qe(this,{getScope:()=>({context:this.context,agentId:this.agentSelection.state.selectedId}),canStart:()=>this.canUseSetup(this.context.gateway.snapshot.client)&&!this.firstRun.unresolved&&!this.actionsDisabled(),canContinue:()=>this.canUseSetup(this.context.gateway.snapshot.client)&&!this.firstRun.unresolved,refresh:()=>this.detect()}),this.subscriptions=new o(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t),e=>this.synchronizeGateway(e.snapshot)).watch(()=>this.context&&this.agentSelection,(e,t)=>e.subscribe(t),()=>this.synchronizeGateway(this.context.gateway.snapshot)).watch(()=>this.firstRun,(e,t)=>e.subscribe(t)),this.wizard=new He({getClient:()=>this.context?.gateway.snapshot.client??null,getAgentId:()=>this.agentSelection.state.selectedId??null,onChange:e=>{e.phase!==`starting`&&e.phase!==`done`&&(this.activationState={phase:`idle`});let t=this.wizardState.phase===`step`?this.wizardState.step.id:null;this.wizardState=e.phase===`step`&&this.wizardMutationActive?{...e,busy:!0}:e,e.phase===`step`&&e.step.id!==t?this.wizardValue=We(e.step):e.phase===`idle`&&(this.wizardValue=void 0,this.cancellationNotice=null)},onStart:(e,t)=>{if(e===`openclaw.setup.prepare.start`)return;let n=this.firstRun.beginActivation(t??{kind:`provider-auth`});return e=>(this.firstRun.recordActivation(n,e),this.requestUpdate(),()=>this.firstRun.ownsActivation(n))},onBackgroundCompletion:e=>this.runWizardMutation(()=>Promise.resolve(e),!0),requestFailedMessage:()=>a(`modelSetup.errors.requestFailed`),cancelledMessage:()=>a(`modelSetup.wizard.cancelled`),sessionExpiredMessage:()=>a(`modelSetup.wizard.sessionExpired`)}),this.detectTask=new be(this,{autoRun:!1,args:()=>[null,null,null],task:async([e,t,n],{signal:r})=>{if(!e||!n)return S;let i=this.context.gateway.snapshot.hello;return{...await z(e,()=>xt(e,t??void 0,r)),agentId:t,hello:i,token:n}},onComplete:e=>{if(this.context.gateway.snapshot.client===e.client&&this.context.gateway.snapshot.hello===e.hello&&this.agentSelection.state.selectedId===e.agentId){if(`error`in e){this.firstRun.setReadyConnection(null),this.pageState={phase:`detect-error`,message:R(e.error)};return}this.firstRun.setReadyConnection({client:e.client,hello:e.hello,agentId:e.agentId}),this.pageState={phase:`ready`,result:e.value},e.value.manualProviders.some(e=>e.id===this.manualProviderId)||(this.manualProviderId=``)}}}),this.verifyTask=Ct(this)}get agentSelection(){return V(this.context,this.routeData?.firstRun===!0)}disconnectedCallback(){this.firstRun.dispose(),this.resetActivity(),this.observedConnection=null,this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(){this.synchronizeGateway(this.context.gateway.snapshot)}updated(e){this.isConnected&&(e.has(`activationState`)&&this.activationState.phase!==`idle`&&Gt(this.renderRoot),this.wizardState.phase!==`idle`&&this.querySelector(`openclaw-modal-dialog`)?.setReturnFocusTarget(this.wizardReturnFocus),this.iconLoader.reconcile(),this.firstRun.start())}synchronizeGateway(e){let t=this.routeData;if(!this.isConnected||!t)return;let n=this.observedConnection,r=st(this.context,t.firstRun,n?.recoveryScope);if(n&&r.client===n.client&&r.hello===n.hello&&r.agentId===n.agentId&&r.connected===n.connected&&r.firstRun===n.firstRun&&r.connectionRevision===n.connectionRevision&&r.recoveryScope===n.recoveryScope)return;this.observedConnection=r;let i=n&&(!r.recoveryScope||r.recoveryScope!==n.recoveryScope),a=n&&(r.agentId!==n.agentId||r.firstRun!==n.firstRun||r.connectionRevision!==n.connectionRevision||i),o=r.connected&&!b(e.hello?.auth??null);if((i||o)&&this.wizard.close({retireOwner:!0}),a&&(this.nativeSessionCatalogsEnabled=!1,this.manualProviderId=``,this.manualApiKey=``,this.manualError=null),n&&r.recoveryScope&&!a&&this.wizard.hasAdmittedSession){this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.wizard.suspend(),this.canUseSetup(r.client)&&(this.firstRun.reconnectActivation(r),this.runWizardMutation(()=>this.wizard.resume()));return}r.firstRun===n?.firstRun?this.firstRun.connectionChanged(r):this.firstRun.routeChanged(),this.resetActivity(),this.pageState={phase:`loading`},this.canUseSetup(r.client)&&this.detect()}resetActivity(){this.login.reset(),this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.detectTask.run([null,null,null]),this.activationState={phase:`idle`},this.resetVerify(),this.iconLoader.reset(),this.pendingPrepareOption=null,this.wizard.cancel()}canUseSetup(e){let t=this.context.gateway.snapshot;return!(!e||this.routeData?.firstRun!==!0&&this.agentSelection.state.selectedId===null||t.phase!==`connected`||!b(t.hello?.auth??null)||x(t,`openclaw.setup.detect`)!==!0)}async detect(){let e=this.context.gateway.snapshot.client;if(!this.canUseSetup(e))return null;this.resetVerify(),this.pageState={phase:`loading`};let t={};await this.detectTask.run([e,this.agentSelection.state.selectedId,t]);let n=this.detectTask.value;return n?.token===t&&`value`in n?n.value:null}canVerify(e){let t=this.context.gateway.snapshot;return this.canUseSetup(e)&&x(t,`openclaw.setup.verify`)===!0}resetVerify(){this.verifyState={phase:`idle`},this.verifyTask.run([null,null,void 0])}async verifyConnection(e){let t=this.context.gateway.snapshot.client;this.canVerify(t)&&!this.actionsDisabled()&&(this.verifyState={phase:`checking`},await this.verifyTask.run([t,this.agentSelection.state.selectedId,e]))}async activate(e,t){let n=this.context.gateway.snapshot.client;!this.canUseSetup(n)||this.actionsDisabled()||this.firstRun.unresolved||(this.manualError=null,this.activationState={phase:`testing`,targetId:t},this.pendingPrepareOption=null,this.wizardMode=`activate`,await this.runWizardMutation(()=>this.wizard.activate({...e,...this.nativeSessionCatalogPreference()},t)))}nativeSessionCatalogPreference(){return this.pageState.phase===`ready`&&this.pageState.result.nativeSessionCatalogPreferenceRequired===!0?{nativeSessionCatalogsEnabled:this.nativeSessionCatalogsEnabled}:{}}finishActivation(e,t,n){this.activationState=Ye({result:e,targetId:t,fallbackError:a(`modelSetup.errors.activationFailed`),restartWarning:a(`labsPage.restartRequired`),refreshWarning:n}),this.activationState.phase===`success`&&(this.manualApiKey=``),this.firstRun.finishActivation(e,t,n)}connectManual(){let e=ht(this.pageState.phase===`ready`?this.pageState.result.manualProviders:[],this.manualProviderId,this.manualApiKey);if(!e){this.manualError=a(`modelSetup.manual.required`);return}this.activate(e,`manual:${this.manualProviderId}`)}selectManualProvider(e){e!==this.manualProviderId&&(this.manualApiKey=``),this.manualProviderId=e,this.manualError=null}async useManualProvider(e){this.selectManualProvider(e),await this.updateComplete;let t=this.renderRoot.querySelector(`.model-setup__manual input[type="password"]`);t?.scrollIntoView?.({block:`center`,behavior:ye()}),t?.focus()}async handleWizardDone({startMethod:e,preparedModelRef:t,activationTargetId:n,modelActivation:r,isCurrent:i}){let o=e===`openclaw.setup.prepare.start`?this.pendingPrepareOption:null,s=this.nativeSessionCatalogPreference();if(this.pendingPrepareOption=null,o&&t){let e=ft(o,t);this.wizard.close(),this.activate({...e,...s},O(e.kind,t));return}if(e!==`openclaw.setup.prepare.start`){if(i?.()===!1){this.wizard.close();return}if(!r){this.wizard.fail(a(e===`openclaw.setup.activate.start`?`modelSetup.errors.activationFailed`:`modelSetup.wizard.notComplete`));return}this.wizard.close(),this.finishActivation({ok:!0,...r},n??`provider-auth`,this.setupRefreshWarning);return}let c=await this.detect();if(!c){this.wizard.fail(a(`modelSetup.errors.requestFailed`));return}if(o){this.pageState={phase:`ready`,result:{...c,configuredModel:void 0,setupComplete:!1}};let e=mt(c,o.id);if(!e){this.wizard.fail(a(`modelSetup.prepare.providerNotReady`,{provider:o.label}));return}this.wizard.close(),this.activate({kind:e.kind,modelRef:e.modelRef,...e.modelTarget?{modelTarget:e.modelTarget}:{},...s},O(e.kind,e.modelRef));return}this.wizard.close()}closeWizard(){this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.pendingPrepareOption=null,this.wizard.close()}async runWizardMutation(e,t=!1){let n=this.context.gateway.snapshot.client;if(this.wizardMutationActive&&!t||!this.canUseSetup(n)||this.wizard.state.phase===`idle`&&this.firstRun.unresolved)return;if(this.wizard.state.phase===`idle`){let e=this.ownerDocument.activeElement;this.wizardReturnFocus=e instanceof HTMLElement&&this.contains(e)?e:null}let r=++this.wizardMutationGeneration;this.wizardMutationActive=!0,this.requestUpdate();try{let t=await this.context.runtimeConfig.runExternalMutation(async t=>{if(t!==n)throw Error(`Connection changed before model setup continued.`);return await e()},{canDispatch:()=>r===this.wizardMutationGeneration&&this.context.gateway.snapshot.client===n&&this.canUseSetup(n),dispatchError:a(`modelSetup.errors.requestFailed`)});if(r!==this.wizardMutationGeneration){t.ok&&!t.refresh.ok&&this.isConnected&&(this.setupRefreshWarning=t.refresh.error),this.isConnected&&this.canUseSetup(this.context.gateway.snapshot.client)&&this.detect();return}if(!t.ok){this.wizard.fail(t.error);return}this.setupRefreshWarning=t.refresh.ok?null:t.refresh.error;let i=t.value;i?(this.wizardMutationActive=!1,await this.handleWizardDone(i)):this.wizardState.phase===`step`&&this.wizardState.busy&&(this.wizardState={...this.wizardState,busy:!1})}catch(e){r===this.wizardMutationGeneration&&this.wizard.fail(R(e))}finally{r===this.wizardMutationGeneration&&(this.wizardMutationActive=!1,this.requestUpdate())}}async cancelWizard(){let e=this.wizardMutationGeneration;this.cancellationNotice=null;try{let t=await this.wizard.requestCancellation();if(e!==this.wizardMutationGeneration)return;if(t===`running`){this.cancellationNotice=a(`modelSetup.wizard.finishingStep`);return}if(t!==`cancelled`)return;this.wizardMutationGeneration+=1,this.wizardMutationActive=!1,this.pendingPrepareOption=null,this.activationState={phase:`idle`}}catch(t){e===this.wizardMutationGeneration&&(this.wizardState.phase===`starting`||this.wizardState.phase===`step`)&&(this.cancellationNotice=a(`modelSetup.wizard.cancelFailed`,{error:R(t)}))}}actionsDisabled(){return this.login.busy||this.activationState.phase===`testing`||this.verifyState.phase===`checking`||this.wizardMutationActive||this.wizardState.phase!==`idle`&&this.wizardState.phase!==`error`&&this.wizardState.phase!==`cancelled`}render(){let e=this.context.gateway.snapshot,t=b(e.hello?.auth??null),n=e.phase===`connected`&&x(e,`openclaw.setup.detect`)!==!0,r=t&&!n&&x(e,`openclaw.setup.verify`)===!0;return Xt({page:this.firstRun.visiblePageState(this.verifyState.phase===`ok`&&this.verifyState.modelTarget!==`utility`),activation:this.activationState,verify:this.verifyState,connection:this.login.pageActions,wizard:this.wizardState,wizardMode:this.wizardMode,wizardValue:this.wizardValue,canAdmin:t,canVerify:r,canPrepare:t&&!n&&x(e,`openclaw.setup.prepare.start`)===!0,modelConfigured:c(e)?.modelConfigured===!0,gatewayTooOld:n,refreshWarning:this.setupRefreshWarning,cancellationNotice:this.cancellationNotice,activationUnresolved:this.firstRun.unresolved,onUseCurrentModel:this.firstRun.canUseCurrentModel?()=>void this.firstRun.useCurrentModel():void 0,actionsDisabled:this.actionsDisabled(),manualProviderId:this.manualProviderId,manualApiKey:this.manualApiKey,manualError:this.manualError,moreSignInOpen:this.moreSignInOpen,nativeSessionCatalogsEnabled:this.nativeSessionCatalogsEnabled,onNativeSessionCatalogsChange:e=>this.nativeSessionCatalogsEnabled=e,firstRun:this.routeData?.firstRun===!0,iconUrls:this.iconUrls,onDetect:()=>{this.firstRun.retryDetection()&&this.detect()},onVerify:()=>void this.firstRun.verify(),onActivateCandidate:({kind:e,modelRef:t,modelTarget:n})=>void this.activate({kind:e,modelRef:t,...n?{modelTarget:n}:{}},O(e,t)),onStartAuth:e=>{this.wizard.prepareSignIn(e.kind,e.label),this.pendingPrepareOption=null,this.wizardMode=`auth`,this.runWizardMutation(()=>this.wizard.start(e.id,`openclaw.setup.auth.start`,this.nativeSessionCatalogPreference(),e.modelTarget))},onStartPrepare:e=>{this.pendingPrepareOption=e,this.wizardMode=`prepare`,this.runWizardMutation(()=>this.wizard.start(e.id,`openclaw.setup.prepare.start`))},onManualProviderChange:e=>this.selectManualProvider(e),onUseManualProvider:e=>void this.useManualProvider(e),onManualApiKeyChange:e=>{this.manualApiKey=e,this.manualError=null},onManualConnect:()=>this.connectManual(),onMoreSignInToggle:e=>this.moreSignInOpen=e,onIconError:e=>this.iconLoader.invalidate(e),onOpenChat:()=>this.firstRun.continueSetup(),onOpenSetupAssistant:()=>this.firstRun.continueSetup(`utility`),onSuccessClose:()=>{this.activationState={phase:`idle`},this.detect()},onWizardValueChange:e=>this.wizardValue=e,onWizardAnswer:(e,t)=>void this.runWizardMutation(()=>this.wizard.answer(e,t)),onWizardCancel:()=>void this.cancelWizard(),onWizardClose:()=>this.closeWizard()})}},t([n({context:fe,subscribe:!0})],$.prototype,`context`,void 0),t([ce({attribute:!1})],$.prototype,`routeData`,void 0),t([g()],$.prototype,`pageState`,void 0),t([g()],$.prototype,`activationState`,void 0),t([g()],$.prototype,`verifyState`,void 0),t([g()],$.prototype,`wizardState`,void 0),t([g()],$.prototype,`wizardMode`,void 0),t([g()],$.prototype,`wizardValue`,void 0),t([g()],$.prototype,`manualProviderId`,void 0),t([g()],$.prototype,`manualApiKey`,void 0),t([g()],$.prototype,`manualError`,void 0),t([g()],$.prototype,`moreSignInOpen`,void 0),t([g()],$.prototype,`nativeSessionCatalogsEnabled`,void 0),t([g()],$.prototype,`iconUrls`,void 0),t([g()],$.prototype,`setupRefreshWarning`,void 0),t([g()],$.prototype,`cancellationNotice`,void 0),customElements.get(`openclaw-model-setup-page`)||customElements.define(`openclaw-model-setup-page`,$)})))()}$t();export{ot as resumeFirstRunActivation};
//# sourceMappingURL=model-setup-page-DOnD96L_.js.map