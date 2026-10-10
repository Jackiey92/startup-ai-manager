import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{$a as t,Bi as n,Fi as r,Kr as i,Rr as a,Ua as o,wa as s,ya as c,zr as l}from"./control-ui-foundation-DaCuy7E_.js";import{$s as u,Al as d,Br as f,Bs as p,Cn as m,Js as ee,Ll as te,Ms as ne,Ns as re,Os as ie,Pc as h,Ps as ae,Sl as oe,Ss as se,Tl as g,Vs as ce,Xs as le,bs as ue,qc as de,wl as fe,xn as pe,xs as me,zr as he}from"./control-ui-core-CndkyZ8m.js";import{$ as _,Q as v,at as ge,dt as _e,nt as y,pt as b}from"./lit-runtime-CIjzngcy.js";import{$r as ve,Di as ye,Dn as be,Ei as xe,On as Se,Qr as Ce,i as we,ia as Te,ln as Ee,n as De,nt as Oe,r as ke,ra as Ae,tt as je,un as Me,xa as Ne}from"./control-ui-core-C5mtYcym.js";import{St as Pe,xt as Fe}from"./control-ui-boot-shared-C018SffO.js";import{c as x,l as Ie,s as S,u as C}from"./gateway-runtime-BvWNTqPo.js";import{$r as Le,Gr as Re,Jo as ze,Qr as Be,Xo as Ve,Yr as He,ei as Ue,ti as We}from"./control-ui-boot-shared-DlJEsz5Q.js";import{$n as Ge,Ar as Ke,Ln as qe,Lt as Je,Mr as Ye,Nr as w,Pr as Xe,Rn as Ze,Rt as Qe,jr as T,kr as $e,nr as et,zt as tt}from"./control-ui-boot-shared-DpHhsTHW.js";import{a as nt,i as rt,n as E,r as D,s as it}from"./plugin-help-C4WP2eL0.js";import{J as at,q as ot}from"./control-ui-boot-shared-DPto3YH7.js";import{Bn as O,Gn as st,Hn as ct,Or as lt,Vn as ut,kr as dt,qn as ft,zn as pt}from"./control-ui-boot-shared-6jDbGebE.js";import{n as mt,t as k}from"./custodian-alert-store-D3-kKDhQ.js";import"./control-ui-boot-shared-CoE663Cg.js";import{i as ht,t as gt}from"./wizard-step-controls-Byi_NnKh.js";import"./control-ui-boot-chat-CLUFzlXZ.js";function _t(e){if(!n(e))return;let t=e.code;return t===A.INFERENCE_UNAVAILABLE?{code:t}:void 0}function vt(e){if(!n(e))return;let t=e.code;return t===A.SESSION_INVALIDATED?{code:t}:void 0}var A;function j(){return(j=e((()=>{A={INFERENCE_UNAVAILABLE:`system_agent_inference_unavailable`,SESSION_INVALIDATED:`system_agent_session_invalidated`}})))()}var M;function N(){return(N=e((()=>{ie(),D(),M=class{constructor(){this.ordinary={value:``},this.sensitive={value:``},this.context=null,this.cleanup=null}connect(e,t){this.cleanup?.(),this.context=e,this.cleanup=ne(e,t)}resetPrompt(e,t){this.sensitive={value:``},[e.wizardValue,e.wizardSecretVisible]=[void 0,!1],e.sensitive=t}get pluginReference(){return this.context?E(this.context):void 0}reconcile(e,t){if(!this.context||!e||t.sensitive||t.wizardInputPending||t.hasUnresolvedQuestion())return;let n=it(this.context);n&&(this.ordinary={value:[this.ordinary.value,n].filter(Boolean).join(`

`)})}}})))()}function yt(e,t,n){t===`chat`&&n===`utility`?e?.navigate(`model-setup`,{search:`?firstRun=1`}):e?.navigate(t)}async function bt(e){let{context:t}=e,n=t.gateway.snapshot.sessionKey?.trim();if(e.agentId){let r=await t.agents.refreshList();if(!e.isCurrent())return`stale`;n=c({agentId:e.agentId,mainKey:r?.mainKey}),Me({selection:t.agentSelection,gateway:t.gateway,sessionKey:n,agentId:e.agentId})}return e.hatchDraft&&n?(t.navigate(`chat`,{pathname:xt(t,n),search:`?draft=${encodeURIComponent(d(`custodian.hatchDraft`))}`}),`navigated`):`exit-setup`}function xt(e,t){return u({face:`chat`,sessionKey:t,fallbackAgentId:le(e),basePath:e.basePath,mainKey:de({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello})}).href}function P(){return(P=e((()=>{Ee(),g(),ee(),h()})))()}function St(e,t){return t===`received`?`sent`:e instanceof be||t===`unsent`?`rejected`:`unknown`}function Ct(e,t){return t===`sent`?!1:t===`unknown`||e}function wt(e,t,n){return n!==`rejected`&&e!==null&&e.severity===t.severity&&e.message===t.message}function Tt(e,t,n){if(n.event!==`health`)return[e,t];let r=Pt(n);return t?[r,t]:[r,null]}function Et(e){if(e.kind===`config-reload`)return d(`custodian.nudge.configReload`);let t=e.channelLabel??d(`custodian.nudge.channelFallback`);return e.kind===`channel-auth`?d(`custodian.nudge.channelAuth`,{channel:t}):e.kind===`channel-disconnected`?d(`custodian.nudge.channelDisconnected`,{channel:t}):d(`custodian.nudge.channelDegraded`,{channel:t})}function Dt(e){return y`<div class="custodian__nudge" role="status">
    <button
      class="custodian__nudge-action"
      type="button"
      ?disabled=${e.disabled}
      @click=${e.onSend}
    >
      ${Et(e.nudge)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${d(`custodian.nudge.dismiss`)}
      @click=${e.onDismiss}
    >
      ×
    </button>
  </div>`}function Ot(e){return y`<div class="custodian__nudge custodian__nudge--channel-onboarding" role="status">
    <div class="custodian__nudge-copy">
      <strong>${d(`custodian.nudge.channelSetupTitle`)}</strong>
      <span>${d(`custodian.nudge.channelSetupBody`)}</span>
    </div>
    <button
      class="btn btn--sm primary custodian__nudge-cta"
      type="button"
      @click=${e.onOpenChannels}
    >
      ${d(`custodian.nudge.channelSetupAction`)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${d(`custodian.nudge.channelSetupDismiss`)}
      @click=${e.onDismiss}
    >
      ×
    </button>
  </div>`}function kt(e){return y`<div class="custodian__nudge custodian__nudge--channel-onboarding" role="alert">
    <div class="custodian__nudge-copy">
      <strong>${d(`custodian.nudge.channelStatusErrorTitle`)}</strong>
      <span>${d(`custodian.nudge.channelStatusErrorBody`)}</span>
    </div>
    <button
      class="btn btn--sm primary custodian__nudge-cta"
      type="button"
      ?disabled=${e.retrying}
      @click=${e.onRetry}
    >
      ${e.retrying?d(`common.loading`):d(`common.retry`)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${d(`custodian.nudge.channelSetupDismiss`)}
      @click=${e.onDismiss}
    >
      ×
    </button>
  </div>`}function At(e){return I.some(t=>e[t]===`configured_unavailable`)}function jt(e){return r(e.probe)?.ok===!1}function Mt(e,t,n){if(n.configured===!1||n.enabled===!1)return null;let r=e.toLowerCase();if(At(n))return{severity:3,kind:`channel-auth`,channelLabel:t,message:`what happened with ${r} authentication?`};let i=typeof n.healthState==`string`?n.healthState.trim().toLowerCase():void 0;if(i===`terminal-disconnect`||jt(n))return{severity:3,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`};if(i===`not-running`&&n.running===!1){let e=typeof n.reconnectAttempts==`number`?n.reconnectAttempts:0,t=typeof n.lastStartAt==`number`?n.lastStartAt:void 0,r=typeof n.lastStopAt==`number`?n.lastStopAt:void 0;if(n.restartPending===!1&&r!==void 0&&(t===void 0||r>=t)&&e<10)return null}return n.connected!==!0&&i!==`healthy`&&typeof n.lastError==`string`&&n.lastError.trim()?{severity:3,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`}:n.connected===!1&&n.running===!0?{severity:2,kind:`channel-disconnected`,channelLabel:t,message:`what happened with ${r}?`}:i&&F.has(i)?{severity:1,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`}:null}function Nt(e){let t=r(e);if(!t)return null;if(r(t.configReload)?.hotReloadStatus===`disabled`)return{severity:3,kind:`config-reload`,message:`what happened with configuration reload?`};let n=r(t.channels);if(!n)return null;let i=r(t.channelLabels),a=null;for(let[e,t]of Object.entries(n)){let n=r(t);if(!n)continue;let o=typeof i?.[e]==`string`?i[e]:e,s=r(n.accounts),c=s?Object.values(s).map(r).filter(e=>e!==null):[],l=c.length>0?c:[n];for(let t of l){let n=Mt(e,o,t);n&&(!a||n.severity>a.severity)&&(a=n)}}return a}function Pt(e){return e.event===`health`?Nt(e.payload):null}var F,I;function L(){return(L=e((()=>{v(),Se(),g(),F=new Set([`disconnected`,`stale-socket`,`stuck`,`terminal-disconnect`]),I=[`tokenStatus`,`botTokenStatus`,`appTokenStatus`,`signingSecretStatus`,`userTokenStatus`]})))()}function Ft(e,t){e.activeVariant!==`caretaker`||e.eventNudgeClosed||([e.eventNudge,e.eventNudgePending]=Tt(e.eventNudge,e.eventNudgePending,t),e.requestNudgeUpdate())}async function It(e){let t=e.eventNudge;if(!t||e.sensitive||e.hasUnresolvedQuestion())return;e.eventNudgePending=t,e.requestNudgeUpdate();let n=await e.send(t.message);if(e.eventNudgePending===t){e.eventNudgePending=null;let r=wt(e.eventNudge,t,n);[e.eventNudgeClosed,e.eventNudge]=[r,r?null:e.eventNudge],e.requestNudgeUpdate()}}function Lt(e){[e.eventNudge,e.eventNudgeClosed]=[null,!0],e.requestNudgeUpdate()}function Rt(e,t){e.channelOnboardingNudgeClosed=!0,e.requestNudgeUpdate(),t()}function zt(e,t,n){e.channelOnboardingNudgeClosed=!0,t(),e.requestNudgeUpdate(),n()}function R(){return(R=e((()=>{L()})))()}function Bt(e){return e!==null&&e.length<=512&&e.trim().length>0}function z(){return`control-ui-onboarding-${he()}`}function Vt(e){try{te()?.setItem(B,e)}catch{}}function Ht(){let e=null;try{e=te()?.getItem(B)??null}catch{}if(Bt(e))return{sessionId:e,restored:!0};let t=z();return Vt(t),{sessionId:t,restored:!1}}var B;function V(){return(V=e((()=>{f(),B=`openclaw.custodian.session.v1`})))()}function Ut(e){if(!e||e.gateway.snapshot.phase!==`connected`)return`unresolved`;let t=e.agents.state.agentsList;if(!t)return`unresolved`;let n=s(e.gateway.snapshot.assistantAgentId??t.defaultId??``),r=t.agents.find(e=>s(e.id)===n);return r?r.model?.primary?.trim()?`ready`:r.utilityModel?.trim()?`utility`:`required`:`unresolved`}function H(){return(H=e((()=>{h()})))()}function Wt(e,t){return e.options?.find(e=>Object.is(e.value,t))}function Gt(e,t){if(e.type===`note`||e.type===`action`||e.type===`progress`)return{answer:{stepId:e.id},display:d(`common.continue`)};if(e.type===`text`)return typeof t==`string`?{answer:{stepId:e.id,value:t},display:t}:null;if(e.type===`confirm`)return typeof t==`boolean`?{answer:{stepId:e.id,value:t},display:d(t?`common.yes`:`common.no`)}:null;if(e.type===`select`){let n=Wt(e,t);return n?{answer:{stepId:e.id,value:t},display:n.label}:null}if(!Array.isArray(t))return null;if(t.length===0)return{answer:{stepId:e.id,value:[]},display:d(`common.none`)};let n=t.map(t=>Wt(e,t)?.label);return n.every(e=>e!==void 0)?{answer:{stepId:e.id,value:t},display:n.join(`, `)}:null}function Kt(e){return e.type===`multiselect`?Array.isArray(e.initialValue)?[...e.initialValue]:[]:e.initialValue}function qt(e){return Ie(e?.gateway.snapshot??{},Fe.SYSTEM_AGENT_WIZARD_CANCEL)??!1}function Jt(){return(Jt=e((()=>{Pe(),g(),x()})))()}function Yt(e,t){return e?`onboarding`:t?`new-agent`:`caretaker`}function U(e,t,n){let r=e===`caretaker`?{}:{welcomeVariant:e};if(t===void 0)return r;let i=window.location.pathname,a=Ne(i,Ae(i));return{...r,message:t,...a?{context:{page:a,...n?{plugin:n}:{}}}:{}}}function W(e){return e.message!==void 0||e.wizardAnswer!==void 0||e.wizardCancel!==void 0}function Xt(e){let t=e&&typeof e==`object`?e.details:void 0;return{inferenceUnavailable:_t(t)!==void 0,sessionInvalidated:vt(t)!==void 0}}function G(){return(G=e((()=>{j(),Te()})))()}var K;function Zt(){return(Zt=e((()=>{v(),ge(),g(),K=class extends t{constructor(...e){super(...e),this.selectedValue=``,this.requestKey=``,this.focusPreselection=!1}createRenderRoot(){return this}willUpdate(){let e=this.props,t=e?JSON.stringify([e.header??``,e.question,e.options.map(e=>[e.value,e.label,e.recommended===!0])]):``;t!==this.requestKey&&(this.requestKey=t,this.selectedValue=e?.options.slice(0,4).find(e=>e.recommended)?.value??``,this.focusPreselection=!!this.selectedValue)}updated(e){this.focusPreselection&&!this.props?.disabled&&(this.focusPreselection=!1,[...this.querySelectorAll(`.option-card__choice`)].find(e=>e.dataset.optionValue===this.selectedValue)?.focus({preventScroll:!0}))}select(e){this.props?.disabled||(this.selectedValue=e,this.props?.onSelect?.(e),this.dispatchEvent(new CustomEvent(`option-select`,{bubbles:!0,composed:!0,detail:{value:e}})))}skip(){this.props?.disabled||(this.props?.onSkip?.(),this.dispatchEvent(new CustomEvent(`option-skip`,{bubbles:!0,composed:!0})))}render(){let e=this.props;if(!e)return _;let t=e.options.slice(0,4),n=t.findIndex(e=>e.recommended===!0);return y`
      <section class="option-card" role="group" aria-label=${e.question}>
        ${e.header?y`<div class="option-card__chip">${e.header}</div>`:_}
        <div class="option-card__question">${e.question}</div>
        <div class="option-card__choices" role="radiogroup">
          ${t.map((t,r)=>{let i=r===n,a=t.value===this.selectedValue;return y`
              <button
                class=${`option-card__choice ${i?`option-card__choice--recommended`:``} ${a?`option-card__choice--selected`:``}`}
                type="button"
                role="radio"
                aria-checked=${a?`true`:`false`}
                data-option-value=${t.value}
                ?disabled=${e.disabled}
                @click=${()=>this.select(t.value)}
              >
                <span class="option-card__choice-copy">
                  <strong>${t.label}</strong>
                  ${t.description?y`<span class="option-card__description">${t.description}</span>`:_}
                </span>
                ${i?y`<span class="option-card__recommended">
                        ${d(`optionCard.recommended`)}
                      </span>`:_}
              </button>
            `})}
        </div>
        <button
          class="option-card__skip"
          type="button"
          ?disabled=${e.disabled}
          @click=${()=>this.skip()}
        >
          ${d(`optionCard.skip`)}
        </button>
      </section>
    `}},i([b({attribute:!1})],K.prototype,`props`,void 0),i([_e()],K.prototype,`selectedValue`,void 0),customElements.get(`openclaw-option-card`)||customElements.define(`openclaw-option-card`,K)})))()}function Qt(e){return y`<div class="custodian__option-card">
    <openclaw-option-card
      .props=${{header:e.question.header,question:e.question.question,options:e.question.options.map(e=>({value:e.label,label:e.label,description:e.description,recommended:e.recommended})),disabled:e.disabled,onSelect:e.onSelect,onSkip:e.onSkip}}
    ></openclaw-option-card>
  </div>`}function q(){return(q=e((()=>{v(),Zt()})))()}function $t(e){if(!e||typeof e!=`object`)return null;let t=o(e.id),n=o(e.header),r=o(e.question);if(!t||!n||!r||!Array.isArray(e.options)||e.options.length<2||e.options.length>4)return null;let i=[];for(let t of e.options){let e=o(t?.label);if(!e)return null;let n=o(t.description??null),r=o(t.reply??null);i.push({label:e,...n?{description:n}:{},...t.recommended===!0?{recommended:!0}:{},...r?{reply:r}:{}})}return new Set(i.map(e=>e.label.toLocaleLowerCase())).size!==i.length||i.filter(e=>e.recommended).length>1?null:{id:t,header:n,question:r,options:i,isOther:e.isOther===!0,...e.skipAction===`exit`?{skipAction:`exit`}:{}}}function en(){return(en=e((()=>{})))()}function tn(e,t,n,r=null,i=null){return{id:e,role:t,text:n,at:Date.now(),question:r,step:i}}function nn(e,t){let n=t.step??null,r=n?null:$t(t.question),i=fn.test(t.reply);return i&&!r&&!n?null:tn(e,`assistant`,i?``:t.reply,r,n)}function rn(e,t,n,r,i){return r||i||e.some(e=>e.question!==null&&e.question.id!==`system-agent-quick-actions`&&!t.has(`${e.id}:${e.question.id}`)&&!n.has(`${e.id}:${e.question.id}`))}function an(e,t){let n=new Set(t);for(let t of e)t.question&&n.add(`${t.id}:${t.question.id}`);return n}function J(e){return ue(e,d(`custodian.requestFailed`))}function on(e){let t=`msg-${e.id}`,n={role:e.role,content:e.text},r=Ve(n),i=He(n,r);return{kind:`group`,key:t,role:e.role,messages:[{message:n,key:t,hasVisibleContent:i===`non-text`||!!Le(n,r).trim()}],visibleContent:i,timestamp:e.at,isStreaming:!1}}async function sn(e){try{return{ok:!0,turns:(await e.request(`openclaw.chat.history`,{},{timeoutMs:dn})).turns}}catch(e){return{ok:!1,error:e}}}function cn(e,t){let n=t;return{messages:e.map(e=>({id:n++,role:e.role,text:e.role===`user`&&e.text===mn?d(`custodian.sensitiveReply`):e.text,at:e.at,question:null,step:null})),nextMessageId:n}}function ln(e,t){return e.id===t?dt({kind:`divider`,key:`custodian-earlier`,label:d(`custodian.earlier`),timestamp:e.at}):_}function un(e){let t=e.message.question,n=e.message.step;return y`
    ${e.message.text?ft(on(e.message),{showReasoning:!1,showToolCalls:!1,assistantName:d(`custodian.title`),agentId:ot}):_}
    ${ln(e.message,e.boundaryAfterId)}
    ${e.showQuestion&&t?Qt({question:t,disabled:e.questionDisabled,onSelect:e.onSelect,onSkip:e.onSkip}):_}
    ${e.showWizardStep&&n?y`<section
            class="custodian__wizard-step"
            aria-label=${me(n.title??n.message,`Setup`)}
          >
            ${n.title?y`<strong class="custodian__wizard-title"
                    >${me(n.title)}</strong
                  >`:_}
            ${ht({step:n,value:e.wizardValue,busy:e.wizardDisabled,inputId:`custodian-wizard-input-${e.message.id}`,sensitiveRevealed:e.wizardSecretVisible,onValueChange:e.onWizardValueChange,onAnswer:e.onWizardAnswer,leadingAction:e.showWizardCancel?y`<button
                    class="btn btn--ghost custodian__wizard-cancel"
                    type="button"
                    ?disabled=${e.wizardDisabled}
                    @click=${e.onWizardCancel}
                  >
                    ${d(`custodian.cancel`)}
                  </button>`:void 0,onToggleSensitiveVisibility:e.onToggleWizardSecretVisibility})}
          </section>`:_}
  `}var dn,fn,pn,mn;function Y(){return(Y=e((()=>{v(),at(),w(),gt(),g(),Be(),ze(),Re(),se(),pe(),lt(),st(),q(),en(),dn=15e3,fn=/^\s*NO_REPLY\s*$/,pn=class{constructor(e,t){this.onStatusChange=e,this.getGatewaySnapshot=t,this.status=T(),this.generation=0,this.recoveryPending=!1,this.inFlight=null}get refreshing(){return this.inFlight!==null}deferRecovery(){this.recoveryPending=!0}clearRecovery(){this.recoveryPending=!1}settleRecovery(e,t){this.recoveryPending&&!e&&(this.clearRecovery(),t())}watchAvailability(e){let t=this.getGatewaySnapshot();return()=>{let n=this.getGatewaySnapshot(),r=n&&m(n)&&(!t||!m(t));t=n,r&&this.recover(e)}}async recover(e){let t=this.generation;await this.inFlight?.promise;let n=this.getGatewaySnapshot();t===this.generation&&n&&m(n)&&(this.status.awaitingGateway||this.status.error!==null)&&e()}invalidate(){this.generation+=1,this.inFlight=null}reset(){this.clearRecovery(),this.invalidate(),this.status=T()}async read(e,t,n){let r=this.inFlight;if(r&&r.client===e&&r.epoch===t)return await r.promise,null;let i=++this.generation;this.status=$e(this.status,{clearError:!1});let a=sn(e);this.inFlight={client:e,epoch:t,promise:a},this.onStatusChange();try{let e=await a;return!n()||i!==this.generation?null:(this.status=e.ok?Ke():Ye(this.status,e.error,this.getGatewaySnapshot()),e)}finally{this.inFlight?.promise===a&&(this.inFlight=null,this.onStatusChange())}}async loadMessages(e,t,n,r){this.clearRecovery();let i=await this.read(e,t,r);return i?.ok&&r()?cn(i.turns,n):null}},mn=`<redacted secret>`})))()}var hn,gn,X;function Z(){return(Z=e((()=>{g(),x(),N(),P(),R(),V(),ae(),H(),Jt(),L(),G(),Y(),hn=19e4,gn=class{constructor(){this.messages=[],this.sending=!1,this.sensitive=!1,this.wizardInputPending=!1,this.wizardSecretVisible=!1,this.questionReplyUncertain=!1,this.error=null,this.transcript=new pn(()=>this.emit(),()=>this.context?.gateway.snapshot),this.dismissedQuestions=new Set,this.answeredQuestions=new Set,this.activeClient=null,this.chatAvailable=!1,this.eventNudge=null,this.eventNudgePending=null,this.eventNudgeClosed=!1,this.channelOnboardingNudgeClosed=!1,this.earlierBoundaryAfterId=null,this.abandonedTurnOutcomeUnknown=!1,this.inferenceState=`unverified`,this.inputDrafts=new M,this.context=null,this.variant=`caretaker`,this.sessionVariant=null,this.restoredIdentity=Ht(),this.sessionId=this.restoredIdentity.sessionId,this.rejoinBarrierPending=this.restoredIdentity.restored,this.requestEpoch=0,this.requestAbort=null,this.nextMessageId=1,this.retryParams=null,this.sessionClient=null,this.sessionOwnershipKey=null,this.sessionOwner=new re,this.sessionStarted=!1,this.configuredInferenceState=`unresolved`,this.gatewayCleanup=null,this.agentCleanup=null,this.eventCleanup=null,this.listeners=new Set}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}connect(e,t){let n=this.context!==e,r=this.variant!==t;if(n||r){if(n){this.gatewayCleanup?.(),this.agentCleanup?.(),this.eventCleanup?.(),this.context=e,this.inputDrafts.connect(e,()=>this.emit());let t=this.transcript.watchAvailability(()=>void this.refreshTranscriptIfIdle());this.gatewayCleanup=e.gateway.subscribe(()=>{t(),this.synchronizeClient(),this.emit()}),this.agentCleanup=e.agents.subscribe(()=>{this.synchronizeClient(),this.emit()}),this.eventCleanup=e.gateway.subscribeEvents(e=>Ft(this,e))}this.variant=t,this.synchronizeClient(),this.emit()}}get input(){return this.inputDrafts[this.sensitive?`sensitive`:`ordinary`].value}set input(e){this.inputDrafts[this.sensitive?`sensitive`:`ordinary`]={value:e}}setInput(e){this.input=e,this.emit()}setWizardValue(e){this.wizardValue=e,this.emit()}toggleWizardSecretVisibility(){this.wizardSecretVisible=!this.wizardSecretVisible,this.emit()}hasRealUserTurn(){return this.messages.some(e=>e.role===`user`)}get activeVariant(){return this.variant}hasUnresolvedQuestion(){return rn(this.messages,this.dismissedQuestions,this.answeredQuestions,this.wizardInputPending,this.questionReplyUncertain)}get transcriptBlocked(){return this.sending||this.hasUnresolvedQuestion()||this.transcript.refreshing}async refreshTranscriptIfIdle(){let e=this.activeClient;if(e&&this.sessionStarted&&this.chatAvailable){if(this.transcriptBlocked){(this.transcript.status.awaitingGateway||this.transcript.status.error!==null)&&this.transcript.deferRecovery();return}await this.refreshTranscriptHistory(e,this.requestEpoch)&&this.abandonedTurnOutcomeUnknown&&(this.abandonedTurnOutcomeUnknown=!1,this.emit())}}canRetry(){return this.retryParams!==null&&!W(this.retryParams)}get setupRequired(){return this.configuredInferenceState===`required`}get canSend(){return this.activeClient!==null&&this.chatAvailable&&!this.sending&&(this.configuredInferenceState===`ready`||this.configuredInferenceState===`utility`)&&this.inferenceState===`ready`}get wizardCancelAvailable(){return qt(this.context)}retry(){let e=this.activeClient,t=this.retryParams;e&&t&&!W(t)&&this.chatAvailable&&!this.sending&&this.initializeSession(e,t,!1)}async send(e,t,n=this.hasUnresolvedQuestion(),r){let i=e??this.input,a=this.sensitive?i:i.trim(),o=this.activeClient;if(!a.trim()||!o||!this.canSend)return this.emit(),`rejected`;let s=this.sensitive?d(`custodian.sensitiveReply`):t??a,c={sessionId:this.sessionId,...U(this.variant,a,this.inputDrafts.pluginReference)};return await this.sendUserTurn(o,c,s,n,()=>r&&(!r.isCurrent()||!r.admit())?!1:(e===void 0&&(this.input=``),!0))}async sendUserTurn(e,t,n,r,i){let a=[this.answeredQuestions,this.questionReplyUncertain],o,s=await this.requestReply(e,t,()=>{let e=this.inputDrafts.ordinary;if(i&&!i())return!1;let t=this.inputDrafts.ordinary;this.inputDrafts.resetPrompt(this,this.sensitive),o=this.requestEpoch,r&&(this.questionReplyUncertain=!0),this.abandonedTurnOutcomeUnknown=!1,this.answeredQuestions=an(this.messages,this.answeredQuestions);let s=tn(this.nextMessageId++,`user`,n);return this.messages=[...this.messages,s],()=>{this.messages=this.messages.filter(e=>e!==s),this.answeredQuestions=a[0],e!==t&&this.inputDrafts.ordinary===t&&(this.inputDrafts.ordinary=e)}});return r&&this.requestEpoch===o&&(this.questionReplyUncertain=Ct(a[1],s),s===`rejected`&&(this.answeredQuestions=a[0]),this.emit()),s}requestNudgeUpdate(){this.emit()}sendEventNudge(){return It(this)}dismissEventNudge(){Lt(this)}dismissChannelOnboardingNudge(){Rt(this,()=>this.context?.replace(`custodian`))}openChannelsFromOnboarding(){zt(this,()=>this.revokeNavigationAuthority(),()=>this.context?.navigate(`channels`))}async dismissQuestion(e){let t=e.question;if(t){if(t.skipAction===`exit`){this.exitSetup();return}await this.send(t.isOther?d(`optionCard.skip`):`cancel`,d(`optionCard.skip`),!0)!==`rejected`&&this.messages.includes(e)&&(this.dismissedQuestions=new Set(this.dismissedQuestions).add(`${e.id}:${t.id}`),this.emit())}}answerQuestion(e,t){let n=e.question;if(!n)return;let r=n.options.find(e=>e.label===t);this.send(r?.reply??t,t,!0)}answerWizardStep(e,t){if(!e.step||!this.wizardInputPending)return;let n=Gt(e.step,t),r=this.activeClient;if(!n||!r||!this.canSend){this.emit();return}let i=e.step.sensitive?d(`custodian.sensitiveReply`):n.display;this.sendUserTurn(r,{sessionId:this.sessionId,wizardAnswer:n.answer},i,!0)}cancelWizardStep(e){let t=e.step,n=this.activeClient;if(!t||!this.wizardInputPending||!n||!this.canSend||!this.wizardCancelAvailable){this.emit();return}this.sendUserTurn(n,{sessionId:this.sessionId,wizardCancel:{stepId:t.id}},d(`custodian.cancel`),!0)}exitSetup(e=`chat`){this.revokeNavigationAuthority(),yt(this.context,e,this.configuredInferenceState)}revokeNavigationAuthority(){this.requestAbort?.abort(),this.requestAbort=null,this.transcript.clearRecovery(),this.advanceRequestEpoch(),this.sending=!1,this.questionReplyUncertain=!1,this.retryParams=null,this.error=null}advanceRequestEpoch(){return this.transcript.invalidate(),++this.requestEpoch}emit(){this.inputDrafts.reconcile(this.inferenceState===`ready`,this),this.transcript.settleRecovery(this.transcriptBlocked,()=>void this.refreshTranscriptIfIdle());for(let e of this.listeners)e()}startSession(e,t){this.sessionVariant=this.variant,this.sessionClient=e,this.sessionOwnershipKey=this.sessionOwner.key(this.context?.gateway??null),this.sessionStarted=!0,this.initializeSession(e,{sessionId:this.sessionId,...U(this.variant)},t)}replaceSessionId(e){e===void 0&&(this.rejoinBarrierPending=!1),this.sessionId=e??z(),Vt(this.sessionId)}abandonPendingUserTurn(e){e&&W(e)&&(this.retryParams=null,this.abandonedTurnOutcomeUnknown=!0)}restartVolatileSession(e){this.replaceSessionId(),this.answeredQuestions=an(this.messages,this.answeredQuestions),this.inputDrafts.resetPrompt(this,!1),this.wizardInputPending=this.questionReplyUncertain=!1,this.earlierBoundaryAfterId=this.messages.at(-1)?.id??null,this.startSession(e,!1)}synchronizeClient(){let e=this.context;if(!e)return;let t=e.gateway.snapshot,n=t.phase===`connected`?t.client:null,r=n!==null&&S(t,`openclaw.chat`,`operator.admin`),i=C(t,`openclaw.chat`)===!1,a=Ut(this.context),o=a!==this.configuredInferenceState;this.configuredInferenceState=a;let s=this.sessionStarted&&this.sessionVariant!==this.variant,c=this.sessionOwner.key(e.gateway),l=this.sessionStarted&&n!==null&&this.activeClient===null,u=this.sessionStarted&&n!==null&&this.sessionClient!==null&&n!==this.sessionClient,f=this.sessionOwnershipKey!==null&&c!==this.sessionOwnershipKey;if(n===this.activeClient&&!s&&!u&&!f&&this.chatAvailable===(r&&a!==`unresolved`)&&!o)return;let p=this.sending&&this.retryParams!==null,m=p?this.retryParams:null;if((n!==this.activeClient||f)&&this.transcript.clearRecovery(),this.activeClient=n,this.advanceRequestEpoch(),this.sending=!1,this.chatAvailable=!1,s||f)f&&this.replaceSessionId(),[this.eventNudge,this.eventNudgePending]=[null,null],this.eventNudgeClosed=!1,this.abandonedTurnOutcomeUnknown=!1,this.sessionStarted=!1,this.clearConversation();else if(n&&(u||l)){if(!r){this.sessionStarted=!1,this.abandonPendingUserTurn(m),this.error=i?d(`custodian.unsupportedGateway`):null;return}this.chatAvailable=!0,this.abandonPendingUserTurn(m),this.requestAbort?.abort(),this.requestAbort=null,this.sessionClient=n,this.sessionOwnershipKey=c,this.questionReplyUncertain||this.abandonedTurnOutcomeUnknown?(this.questionReplyUncertain=!1,this.wizardInputPending=!1,this.abandonedTurnOutcomeUnknown=!1,this.rejoinBarrierPending=!0,this.initializeSession(n,{sessionId:this.sessionId,...U(this.variant)})):this.refreshTranscriptIfIdle();return}else p&&(m?.message===void 0&&(this.error=d(`custodian.connectionChanged`)),this.abandonPendingUserTurn(m));if(n){if(!r){this.error=i?d(`custodian.unsupportedGateway`):null;return}if(a!==`unresolved`){if(this.chatAvailable=!0,a===`required`){this.sessionStarted=!1,this.clearConversation();return}if(this.sessionStarted){this.retryParams||(this.error=p?this.error:null);return}this.clearConversation(),this.startSession(n,!0)}}}async initializeSession(e,t,n=!0){let r=this.advanceRequestEpoch();this.sending=!0,this.inferenceState=`unverified`,this.error=null,this.retryParams=t,this.emit(),n&&await this.refreshTranscriptHistory(e,r),r===this.requestEpoch&&e===this.activeClient&&await this.requestReply(e,t)}async refreshTranscriptHistory(e,t){let n=this.context;if(!n||C(n.gateway.snapshot,`openclaw.chat.history`)!==!0)return!1;let r=await this.transcript.loadMessages(e,t,this.nextMessageId,()=>t===this.requestEpoch&&e===this.activeClient);return r?([this.messages,this.nextMessageId]=[r.messages,r.nextMessageId],this.earlierBoundaryAfterId=this.messages.at(-1)?.id??null,this.emit(),!0):!1}clearConversation(){this.messages=[],this.dismissedQuestions=new Set,this.answeredQuestions=new Set,this.retryParams=null,this.error=null,this.transcript.reset(),this.inferenceState=`unverified`,this.inputDrafts.ordinary={value:``},this.inputDrafts.resetPrompt(this,!1),this.wizardInputPending=this.questionReplyUncertain=!1,this.earlierBoundaryAfterId=null}async requestReply(e,t,n){let r=this.context;if(!r)return`rejected`;let i=()=>e===this.activeClient&&r.gateway.snapshot.client===e&&S(r.gateway.snapshot,`openclaw.chat`,`operator.admin`);if(!i())return`rejected`;this.requestAbort?.abort();let a=new AbortController;this.requestAbort=a;let o=this.advanceRequestEpoch(),s=`unsent`,c;this.sending=!0,this.error=null,this.retryParams=t,this.emit();try{if(o!==this.requestEpoch||!i()||(c=n?.())===!1)return this.retryParams===t&&(this.retryParams=null),`rejected`;let l=e.request(`openclaw.chat`,t,{timeoutMs:hn,onSent:()=>{s=`sent`},signal:a.signal});this.emit();let u=await l;if(s=`received`,o!==this.requestEpoch||e!==this.activeClient||(this.replaceSessionId(u.sessionId),this.inputDrafts.resetPrompt(this,u.sensitive===!0),this.wizardInputPending=u.wizardInputPending===!0,this.retryParams=null,this.inferenceState=`ready`,this.rejoinBarrierPending&&!W(t)&&(this.rejoinBarrierPending=!1,await this.refreshTranscriptHistory(e,o),o!==this.requestEpoch||e!==this.activeClient)))return`sent`;this.wizardValue=u.step?Kt(u.step):void 0;let d=nn(this.nextMessageId,u);return d&&(this.nextMessageId+=1,this.messages=[...this.messages,d]),u.handoff?.kind===`model-accounts`?this.exitSetup(`profile`):u.action===`open-agent`?await bt({context:r,...u.agentId?{agentId:u.agentId}:{},hatchDraft:u.agentDraft===`hatch`,isCurrent:()=>o===this.requestEpoch&&e===this.activeClient})===`exit-setup`&&this.exitSetup():u.action===`exit`&&this.exitSetup(),`sent`}catch(n){if(o===this.requestEpoch&&e===this.activeClient){s===`unsent`&&c&&c(),this.error=J(n);let{inferenceUnavailable:r,sessionInvalidated:i}=Xt(n);r&&(this.inferenceState=`unverified`,this.retryParams={sessionId:this.sessionId,...U(this.variant)}),i&&W(t)?(this.restartVolatileSession(e),this.error=d(`custodian.sessionRestarted`,{error:J(n)})):i&&(this.replaceSessionId(),this.retryParams={...t,sessionId:this.sessionId},this.error=d(`custodian.sessionRestarted`,{error:J(n)}))}return W(t)&&this.retryParams===t&&(this.retryParams=null),St(n,s)}finally{this.requestAbort===a&&(this.requestAbort=null),o===this.requestEpoch&&(this.sending=!1),this.emit()}}},X=new gn})))()}function _n(){return(_n=e((()=>{})))()}function vn(e,t,n){e.kind===`navigate`?t.navigate(e.routeId):n&&De({startGatewayUpdate:()=>void t.overlays.runUpdate(),watchUpdateProgress:ke(t),onAcknowledge:()=>t.overlays.acknowledgeUpdateRun(),onCheckStatus:()=>t.overlays.refreshUpdateStatus(),onReviewUpdate:()=>t.navigate(`updates`),updateAvailable:t.overlays.snapshot.updateAvailable,updateSchedule:t.overlays.snapshot.updateSchedule,viaNativeApp:je()})}function yn(e){let{action:t}=e.alert,n=S(e.context.gateway.snapshot,`update.run`,`operator.admin`),r=t?.target.kind===`update`&&!n;return y`<article class="custodian__nudge custodian__alert-card" role="status">
    <div class="custodian__alert-heading">
      <strong>${e.alert.title}</strong>
      <button
        class="custodian__nudge-dismiss"
        type="button"
        aria-label=${d(`common.dismiss`)}
        @click=${e.onDismiss}
      >
        ×
      </button>
    </div>
    <ul class="custodian__alert-facts">
      ${e.alert.facts.map(e=>y`<li>${e}</li>`)}
    </ul>
    ${t?y`<button
            class="btn btn--sm primary custodian__alert-action"
            type="button"
            title=${r?d(`updates.adminRequired`):_}
            ?disabled=${r}
            @click=${()=>vn(t.target,e.context,n)}
          >
            ${t.label}
          </button>`:_}
  </article>`}function bn(){return(bn=e((()=>{v(),Oe(),we(),g(),x()})))()}var Q;function $(){return($=e((()=>{l(),v(),ge(),ve(),ye(),Qe(),et(),Ze(),w(),Je(),g(),Ue(),fe(),ce(),ut(),bn(),mt(),Z(),L(),D(),G(),Y(),We(),Q=class extends oe{constructor(){super(),this.store=X,this.onboarding=!1,this.newAgentIntent=!1,this.showChannelOnboardingNudge=!1,this.channelOnboardingError=null,this.channelOnboardingRetrying=!1,this.onRetryChannelOnboarding=()=>void 0,this.compact=!1,this.historyContent=_,this.composerTextarea=null,this.lastMessageId=null,this.lastPluginHelpFocus=0,new p(this).watch(()=>this.store,(e,t)=>e.subscribe(t)).watch(()=>k,(e,t)=>e.subscribe(t))}async getUpdateComplete(){let e=await super.getUpdateComplete();return await Promise.all(Array.from(this.querySelectorAll(`openclaw-option-card`)).map(e=>e.updateComplete)),e}willUpdate(){this.store.connect(this.context,Yt(this.onboarding,this.newAgentIntent))}disconnectedCallback(){this.composerTextarea&&=(O(this.composerTextarea),null),super.disconnectedCallback()}updated(){let e=this.store,t=this.querySelector(`textarea`);this.composerTextarea&&this.composerTextarea!==t&&O(this.composerTextarea),this.composerTextarea=t,t&&(ct(t),pt(t)),e.canSend&&!e.sensitive&&!e.hasUnresolvedQuestion()&&k.askIfReady((t,n,r)=>void e.send(t,r,!1,n));let n=nt(this.context);n>0&&n!==this.lastPluginHelpFocus&&!e.sensitive&&!e.wizardInputPending&&e.canSend&&(this.lastPluginHelpFocus=n,t?.focus());let r=this.querySelector(`.custodian__messages`),i=this.store.messages.at(-1)?.id??null;if(i!==this.lastMessageId){this.lastMessageId=i;let e=r?.lastElementChild;e instanceof HTMLElement&&e.scrollIntoView?.({block:`nearest`})}}handleComposerKeydown(e){e.key!==`Enter`||e.shiftKey||e.isComposing||(e.preventDefault(),this.store.send())}render(){let e=this.store,t=E(this.context),n=k.alert?yn({alert:k.alert,context:this.context,onDismiss:()=>k.dismiss()}):_;if(e.setupRequired)return y`
        <section
          class="custodian-surface custodian-surface--setup-required ${this.compact?`custodian-surface--panel`:``}"
        >
          ${n}
          <div class="custodian__setup-state" role="alert">
            <openclaw-mascot mood="idle" .size=${this.compact?72:96}></openclaw-mascot>
            <h2>${d(`modelSetup.required.title`)}</h2>
            <p>${d(`modelSetup.required.body`)}</p>
            <div class="custodian__setup-actions">
              <button
                class="btn primary"
                type="button"
                @click=${()=>e.exitSetup(`model-setup`)}
              >
                ${d(`modelSetup.required.action`)}
              </button>
            </div>
          </div>
        </section>
      `;let r=e.messages.length===0&&e.error!==null&&!e.sending,i=e.wizardInputPending?e.messages.findLast(e=>e.step!==null):void 0;return y`
      <section
        class="custodian-surface ${this.compact?`custodian-surface--panel`:``} ${r?`custodian-surface--empty-error`:``}"
      >
        <div>
          ${t?y`<div class="custodian__plugin-reference">${d(`custodian.viewingPlugin`,{plugin:t.name})}</div>`:_}
          ${rt(this.context)?y`<p class="custodian__plugin-reference" role="status">${d(`custodian.pluginHelpPending`)}</p>`:_}
        </div>
        <div
          class="custodian__messages"
          ${tt()}
          aria-live="polite"
          @click=${e=>{Ge(e),qe(e)}}
        >
          ${n}
          ${this.channelOnboardingError?kt({retrying:this.channelOnboardingRetrying,onRetry:this.onRetryChannelOnboarding,onDismiss:()=>e.dismissChannelOnboardingNudge()}):this.showChannelOnboardingNudge?Ot({onOpenChannels:()=>e.openChannelsFromOnboarding(),onDismiss:()=>e.dismissChannelOnboardingNudge()}):_}
          ${!this.onboarding&&e.eventNudge&&!e.eventNudgePending?Dt({nudge:e.eventNudge,disabled:!e.canSend||e.sensitive||e.hasUnresolvedQuestion(),onSend:()=>void e.sendEventNudge(),onDismiss:()=>e.dismissEventNudge()}):_}
          ${e.messages.map(t=>{let n=t.question?`${t.id}:${t.question.id}`:``,r=t.question!==null&&!e.dismissedQuestions.has(n);return un({message:t,boundaryAfterId:e.earlierBoundaryAfterId,showQuestion:r,questionDisabled:!e.canSend||e.answeredQuestions.has(n),onSelect:n=>e.answerQuestion(t,n),onSkip:()=>void e.dismissQuestion(t),showWizardStep:t===i,wizardValue:e.wizardValue,wizardDisabled:!e.canSend,wizardSecretVisible:e.wizardSecretVisible,onWizardValueChange:t=>e.setWizardValue(t),onWizardAnswer:n=>e.answerWizardStep(t,n),showWizardCancel:e.wizardCancelAvailable,onWizardCancel:()=>e.cancelWizardStep(t),onToggleWizardSecretVisibility:()=>e.toggleWizardSecretVisibility()})})}
          ${e.sending?y`<div class="chat-group assistant custodian__thinking-row" role="status">
                  <div class="chat-avatar assistant custodian__mascot-avatar" aria-hidden="true">
                    <openclaw-mascot mood="thinking" .size=${26}></openclaw-mascot>
                  </div>
                  <div class="chat-group-messages custodian__thinking">
                    <span></span><span></span><span></span>
                    <span class="sr-only">${d(`custodian.thinking`)}</span>
                  </div>
                </div>`:_}
          ${e.abandonedTurnOutcomeUnknown?y`<div class="custodian__error" role="alert">
                  <span>${d(`custodian.connectionChanged`)}</span>
                </div>`:_}
          ${Xe({status:e.transcript.status,className:`custodian__transcript-status`})}
          ${e.error&&!(e.abandonedTurnOutcomeUnknown&&e.error===d(`custodian.connectionChanged`))?y`<div class="custodian__error" role="alert">
                  <span>${e.error}</span>
                  ${e.activeClient&&e.chatAvailable&&e.canRetry()?y`<button
                          class="btn btn--sm"
                          type="button"
                          @click=${()=>e.retry()}
                        >
                          ${d(`common.retry`)}
                        </button>`:_}
                </div>`:_}
        </div>

        ${this.historyContent}
        ${i?_:y`<div class="agent-chat__composer-shell">
                <div class="agent-chat__input">
                  <div class="agent-chat__composer-input-row">
                    <div class="agent-chat__composer-combobox">
                      ${e.sensitive?y`<input
                              type="password"
                              .value=${e.input}
                              autocomplete="off"
                              placeholder=${d(`custodian.sensitivePlaceholder`)}
                              aria-label=${d(`custodian.sensitivePlaceholder`)}
                              ?disabled=${!e.canSend}
                              @input=${t=>e.setInput(t.target.value)}
                              @keydown=${e=>this.handleComposerKeydown(e)}
                            />`:y`<textarea
                              rows="1"
                              .value=${e.input}
                              autocomplete="on"
                              placeholder=${d(`custodian.placeholder`)}
                              aria-label=${d(`custodian.placeholder`)}
                              ?disabled=${!e.canSend}
                              @input=${t=>e.setInput(t.target.value)}
                              @keydown=${e=>this.handleComposerKeydown(e)}
                            ></textarea>`}
                    </div>
                    <div class="agent-chat__composer-actions">
                      <button
                        class="chat-send-btn"
                        type="button"
                        aria-label=${d(`custodian.send`)}
                        ?disabled=${!e.input.trim()||!e.canSend}
                        @click=${()=>void e.send()}
                      >
                        ${xe.arrowUp}
                        <span class="agent-chat__control-label">${d(`custodian.send`)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`}
      </section>
    `}},i([a({context:Ce,subscribe:!0})],Q.prototype,`context`,void 0),i([b({attribute:!1})],Q.prototype,`store`,void 0),i([b({attribute:!1})],Q.prototype,`onboarding`,void 0),i([b({attribute:!1})],Q.prototype,`newAgentIntent`,void 0),i([b({attribute:!1})],Q.prototype,`showChannelOnboardingNudge`,void 0),i([b({attribute:!1})],Q.prototype,`channelOnboardingError`,void 0),i([b({attribute:!1})],Q.prototype,`channelOnboardingRetrying`,void 0),i([b({attribute:!1})],Q.prototype,`onRetryChannelOnboarding`,void 0),i([b({attribute:!1})],Q.prototype,`compact`,void 0),i([b({attribute:!1})],Q.prototype,`historyContent`,void 0),customElements.get(`openclaw-custodian-surface`)||customElements.define(`openclaw-custodian-surface`,Q)})))()}export{Z as i,_n as n,X as r,$ as t};
//# sourceMappingURL=custodian-surface-D4gFPpgI.js.map