import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Fi as t,Kr as n,Nr as r,Pr as i,Rr as a,er as o,wa as s,zr as c}from"./control-ui-foundation-DaCuy7E_.js";import{$t as l,Al as u,Bo as d,Bs as f,Ec as p,Ln as m,Lo as h,Pc as g,Qi as _,Sl as v,Ss as y,Tc as ee,Tl as b,Vs as x,Zi as te,Zt as ne,ai as re,bs as S,ci as ie,fc as ae,li as C,mc as oe,oi as se,pc as ce,sn as le,un as ue,wl as de,xs as fe}from"./control-ui-core-CndkyZ8m.js";import{$ as w,Q as T,at as pe,c as me,dt as E,it as he,nt as D,pt as O,s as ge}from"./lit-runtime-CIjzngcy.js";import{$r as _e,Di as k,Ei as A,Oi as ve,Qr as ye,Zn as be,ki as xe,nr as Se,si as Ce,xi as we}from"./control-ui-core-C5mtYcym.js";import{c as Te,u as Ee}from"./gateway-runtime-BvWNTqPo.js";import{$ as De,An as Oe,Fa as ke,I as Ae,Ia as je,Ii as Me,L as Ne,Li as Pe,at as Fe,et as Ie,ia as Le,it as Re,jn as ze,l as Be,na as Ve,nt as He,ra as Ue,ta as We,tt as Ge,u as Ke}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as j,U as qe,V as M,z as N}from"./control-ui-boot-shared-DwSLfX8E.js";import{Bi as P,Hi as Je,_t as F,dt as Ye,fa as Xe,ft as Ze,gt as Qe,ht as I,it as $e,lt as et,nt as L,ot as tt,pa as nt,pt as R,st as z,xt as rt,zi as it}from"./control-ui-boot-shared-DpHhsTHW.js";import{_t as at,gt as ot}from"./control-ui-boot-shared-DPto3YH7.js";import{A as st,k as ct}from"./control-ui-boot-shared-DF3-KJRn.js";import{n as lt,t as ut}from"./en-settings-BjX72HeL.js";import{n as dt,t as ft}from"./settings-workspace-gGOfyDax.js";import{n as B,t as pt}from"./model-picker-5inXghL_.js";import{a as mt,i as ht,n as V,r as gt,t as _t}from"./load-BotmHCzE.js";import{a as vt,i as yt,n as bt,r as xt}from"./usage-0VKmc920.js";import{n as St,t as Ct}from"./login-controller-tIwBRZWL.js";function wt(e){let t=null,n=null,r=0,i={get generation(){return r},get discovering(){return t!==null},get error(){return n},retry(){a()},reset(){let r=t;t=null,n=null,r?.abort(),e.requestUpdate()}};async function a(){let i=e.getAgentId();if(!i||t)return;let a=e.getGateway(),o=a.client;if(!a.connected||!o)return;let s=e.getAgentEpoch(),c=a.epoch,l=new AbortController,d=()=>t===l&&a.isCurrent({client:o,epoch:c})&&e.getAgentId()===i&&e.getAgentEpoch()===s;t=l,r+=1,n=null,e.requestUpdate();try{let t=await Ie(o,{agentId:i,refresh:!0,signal:l.signal});if(d()){n=Ge(t,u(`modelProviders.defaults.discoverFailed`));let r=e.getData();r&&e.setData({...r,providerOutcomes:t.providerOutcomes??[],catalogError:null})}}catch(e){d()&&(n=S(e,`request failed`))}finally{t===l&&(t=null,e.requestUpdate(),e.onSettled())}}return i}function Tt(){return(Tt=e((()=>{b(),y(),De()})))()}function Et(e,t){return{onPrimaryChange:n=>{t({primary:n,fallbacks:e().fallbacks.filter(e=>e!==n)})},onFallbackChange:n=>{t({fallbacks:n?[n,...e().fallbacks.slice(1).filter(e=>e!==n)]:[]})},onUtilityChange:e=>t({utilityModel:e}),onThinkingChange:e=>t({thinkingLevel:e,thinkingOverridden:!0}),onThinkingReset:()=>t({thinkingLevel:void 0,thinkingOverridden:!1}),onFastModeChange:e=>t({fastMode:e,fastModeOverridden:!0}),onFastModeReset:()=>t({fastMode:void 0,fastModeOverridden:!1})}}function Dt(e){let t=e?.thinkingDefault,n=e?.fastModeDefault;return{thinkingLevel:typeof t==`string`?t:void 0,thinkingOverridden:e!==null&&Object.hasOwn(e,`thinkingDefault`),fastMode:n===`auto`||typeof n==`boolean`?n:void 0,fastModeOverridden:e!==null&&Object.hasOwn(e,`fastModeDefault`)}}function Ot(e){return{agents:{defaults:{...e.primary?{model:e.fallbacks.length>0?{primary:e.primary,fallbacks:[...e.fallbacks]}:e.primary}:{},utilityModel:e.utilityModel,thinkingDefault:e.thinkingOverridden&&e.thinkingLevel?e.thinkingLevel:null,fastModeDefault:e.fastModeOverridden&&e.fastMode!==void 0?e.fastMode:null}}}}function kt(e){return/method (?:not found|not supported)|unknown method/iu.test(U(e))}function At(e,t){if(t.length===1)return t[0];let n=t.some(e=>e.status===`ok`)?`ok`:Ft.find(e=>t.some(t=>t.status===e))??`unknown`,r=t.find(e=>e.status===n)?.error;return{provider:e,status:n,...r?{error:r}:{},results:t.flatMap(e=>e.results.map(t=>({...t,label:`${e.provider}: ${t.label}`})))}}function H(e){let t=e.gateway.snapshot;if(t.phase!==`connected`)return u(`modelProviders.readOnly.disconnected`);if(e.runtimeConfig.canPatch!==!0)return u(`modelProviders.readOnly.adminRequired`);let n=e.runtimeConfig.state;return!t.client||n.client!==t.client||!ee(n)?u(`modelProviders.configUnavailable`):null}function U(e){return S(e,u(`modelProviders.requestFailed`))}async function jt(e,t){let{agentEpoch:n,runtimeConfig:r}=e;e.setBusy(!0),e.setMessage(null);try{if(await r.ensureLoaded(),!e.isCurrentClient())return{ok:!1};let i=await r.patch({raw:t.raw,note:t.note,...t.replacePaths?{replacePaths:t.replacePaths}:{}});if(!e.isCurrentClient())return{ok:!1};if(!i)return e.isCurrentAgent()&&e.setMessage({kind:`error`,text:r.state.lastError??u(`modelProviders.configUnavailable`)}),{ok:!1};let a=null;try{await r.refresh(),a=r.state.lastError,!a&&e.isCurrentClient()&&await e.refreshProviders()}catch(e){a=U(e)}return e.isCurrentClient()?(e.isCurrentAgent()&&a&&e.setMessage({kind:`warning`,text:a}),{ok:!0,agentEpoch:n,warning:a}):{ok:!1}}catch(t){return e.isCurrentClient()&&e.isCurrentAgent()&&e.setMessage({kind:`error`,text:U(t)}),{ok:!1}}finally{e.isCurrentClient()&&e.isCurrentAgent()&&e.setBusy(!1)}}async function Mt(e,t){let n=()=>e.isCurrentClient()&&e.isCurrentAgent();e.setBusy(!0),e.setMessage(null);try{let r=await e.runtimeConfig.runExternalMutation(async e=>{if(e!==t.client)throw Error(u(`modelProviders.requestFailed`));let n={provider:t.provider,agentId:t.agentId},r=await(t.apiKey===null?e.request(`models.authLogout`,{...n,credentialType:`api_key`}):e.request(`models.authSetApiKey`,{...n,apiKey:t.apiKey}));return C(e),r},{canDispatch:()=>n()&&e.canMutate()});if(!n())return{ok:!1};if(!r.ok)return e.setMessage({kind:`error`,text:r.error}),{ok:!1};let i=r.value.warning?[r.value.warning]:[];if(!r.refresh.ok)i.push(r.refresh.error);else try{let t=await e.refreshProviders();t&&i.push(t)}catch(e){i.push(U(e))}if(!n())return{ok:!1};let a=i.length>0?i.join(` `):null;return e.setMessage({kind:`success`,text:t.success,...a?{warning:a}:{}}),{ok:!0,agentEpoch:e.agentEpoch,warning:a}}finally{n()&&e.setBusy(!1)}}function Nt(e,t,n){return u(e===`add`?`modelProviders.add.saved`:t===null?`modelProviders.apiKey.removed`:`modelProviders.apiKey.saved`,{provider:n})}var Pt,Ft;function W(){return(W=e((()=>{b(),p(),y(),ie(),Pt=[`agents.defaults.model.fallbacks`],Ft=[`auth`,`billing`,`rate_limit`,`timeout`,`format`,`no_model`,`unknown`]})))()}var It;function Lt(){return(Lt=e((()=>{N(),te(),V(),It=class{constructor(e,t){this.options=t,this.active=!1,this.publicationPending=!1,this.task=new j(e,{autoRun:!1,task:([e],{signal:t})=>e?mt(e.client,{agentId:e.agentId,...e.reason===`forced`?{refresh:!0}:{},signal:t}).then(t=>({...e,data:t})):M,onComplete:e=>{this.settle(),this.options.onComplete(e)},onError:()=>this.settle()})}get loading(){return this.active}refresh(e,t,n){return n===`publication`&&(this.active||this.options.isCatalogLoading())?(this.publicationPending=!0,Promise.resolve()):(n===`publication`&&(this.publicationPending&&_(e,{agentId:t}),this.publicationPending=!1),this.active=!0,this.options.onStart(n),this.task.run([{client:e,agentId:t,reason:n}]))}invalidate(){this.publicationPending=!1,this.active=!1,this.task.run([null])}settle(){this.active=!1,this.flushPublication()}flushPublication(){queueMicrotask(()=>{this.publicationPending&&!this.active&&!this.options.isCatalogLoading()&&this.options.refreshPublication()})}}})))()}function G(e){return We(e)}function Rt(e){switch(e.status){case`ok`:case`expiring`:case`expired`:case`missing`:return e.status;default:return`api-key`}}function K(e,t){return e.find(e=>t.some(t=>e.ids.has(t)))}function q(e,t,n){let r=K(e,[t]);if(r)return r;let i={ids:new Set([t]),card:{id:t,displayName:n,profiles:[],profileProviderIds:{},profileOrders:{},profileOrderExplicitProviders:[],profileOrderStoredProviders:[],profileOrderLocks:{},credentialProviderIds:[],logoutTargets:[],hasConfigApiKey:!1,modelCount:0,availableModelCount:0},hasModelAuth:!1};return e.push(i),i}function zt(e,t){let n=i(t);n&&!e.some(e=>i(e)===n)&&e.push(t)}function Bt(e,t,n){if(n.length===0)return;let r=i(t),a=e.find(e=>i(e.provider)===r);if(!a){e.push({provider:t,profileIds:[...new Set(n)]});return}a.profileIds=[...new Set([...a.profileIds,...n])]}function Vt(e){let t=[],n=new Map,r=new Map,i=new Set;for(let t of e.authStatus?.providerCapabilities??[]){let e=G(t.provider);e&&n.set(e,n.get(e)===!0||t.apiKeySupported)}for(let n of e.configProviderIds??[]){let e=G(n);e&&(q(t,e,P(e)).card.configKey??=n)}for(let n of e.configApiKeyProviderIds??[]){let e=G(n);if(e){let r=q(t,e,P(e)).card;r.configKey=n,r.hasConfigApiKey=!0,zt(r.credentialProviderIds,n)}}for(let[n,r]of Object.entries(e.configProviderAuthModes??{})){let e=G(n);e&&(q(t,e,P(e)).card.configAuthMode=r)}for(let n of e.providerOutcomes??[]){let e=G(n.provider);if(!e)continue;let r=q(t,e,P(e)),i=r.catalogOutcome,a=n.profileId===void 0,o=Gt[a?`provider`:`profile`];(!i||(a===(i.profileId===void 0)?o.indexOf(n.status)<o.indexOf(i.status):a))&&(r.catalogOutcome=n)}for(let n of e.models??[]){let e=G(n.provider);if(!e)continue;let r=q(t,e,P(e));r.card.modelCount+=1,n.available===!0&&(r.card.availableModelCount+=1)}for(let a of e.authStatus?.providers??[]){let e=G(a.provider);if(!e)continue;let o=a.usage?G(a.usage.providerId):e,s=[...new Set([e,o])],c=K(t,s)??q(t,o,P(o));for(let e of s)c.ids.add(e);if(c.card.displayName=a.displayName||c.card.displayName,c.card.profiles.push(...a.profiles),a.profiles.length>0){let e=a.authProvider||a.provider;for(let t of a.profiles)c.card.profileProviderIds[t.profileId]=e;a.profileOrder!==void 0&&i.add(e);let t=a.profileOrder??a.profiles.map(e=>e.profileId);r.set(e,[...new Set([...r.get(e)??[],...t])]),c.card.profileOrders[e]=t,a.profileOrderStored===!0&&!c.card.profileOrderStoredProviders.includes(e)&&c.card.profileOrderStoredProviders.push(e),a.profileOrderLocked!==void 0&&(c.card.profileOrderLocks[e]??=a.profileOrderLocked)}(a.apiKey||a.profiles.length>0)&&zt(c.card.credentialProviderIds,a.provider),Bt(c.card.logoutTargets,a.provider,a.profiles.filter(e=>e.logoutSupported===!0).map(e=>e.profileId)),c.card.apiKey??=a.apiKey,c.hasModelAuth||=Ue(a)||n.has(e);let l=a.usage;l&&!c.card.usage&&(c.card.usage={provider:l.providerId,displayName:a.displayName,windows:l.windows,...l.summary?{summary:l.summary}:{},...l.plan?{plan:l.plan}:{},...l.billing?.length?{billing:l.billing}:{}})}for(let e of t){e.card.profileOrderExplicitProviders=Object.keys(e.card.profileOrders).filter(e=>i.has(e));for(let t of Object.keys(e.card.profileOrders)){let n=r.get(t);n&&(e.card.profileOrders[t]=n)}}for(let n of Le(e.authStatus?.providers??[])){let e=K(t,[G(n.provider)]);e&&(e.card.auth={kind:Rt(n),profileCount:n.profiles.length,...n.expiry?.label?{expiryLabel:n.expiry.label}:{}})}for(let n of e.providerUsage?.providers??[]){let e=G(n.provider);if(!e)continue;let r=K(t,[e])??q(t,e,n.displayName||P(e));r.ids.add(e),r.card.usage=n}for(let n of e.costByProvider??[]){let e=G(n.provider??``);if(!e)continue;let r=K(t,[e])??q(t,e,P(e)),i={totalCost:n.totals.totalCost,totalTokens:n.totals.totalTokens,messageCount:n.count},a=r.card.localCost;r.card.localCost=a?{totalCost:a.totalCost+i.totalCost,totalTokens:a.totalTokens+i.totalTokens,messageCount:a.messageCount+i.messageCount}:i}return t.filter(t=>t.hasModelAuth||(e.configProviderIds??[]).some(e=>G(e)===t.card.id)||!!t.card.usage||t.card.modelCount>0||!!t.catalogOutcome||(t.card.localCost?.totalTokens??0)>0).map(t=>{let r=n.get(t.card.id);return Object.assign({},t.card,{checkingModels:e.pendingProviders?.some(e=>G(e)===t.card.id)},t.catalogOutcome?{catalogStatus:t.catalogOutcome.status}:{},r===void 0?{}:{apiKeySupported:r})}).toSorted((e,t)=>e.displayName.localeCompare(t.displayName))}function J(e){return e.selectionRef===void 0?e.id.startsWith(`${e.provider}/`)?e.id:`${e.provider}/${e.id}`:e.selectionRef}function Ht(e,t){let n=new Set([t.primary,...t.fallbacks,t.utilityModel].filter(e=>typeof e==`string`&&e.length>0)),r=(e??[]).filter(e=>e.available!==!1||n.has(J(e))),i=new Set(r.map(J)),a=e===null?{}:{available:!1};for(let t of n){if(i.has(t))continue;let{model:n,profile:s}=o(t);if(s){let i=(e??[]).find(e=>J(e)===n);if(i){r.push({...i,selectionRef:t});continue}}let c=t.indexOf(`/`);if(c<=0||c===t.length-1){let n=t.trim().toLowerCase(),i=(e??[]).find(e=>e.alias?.trim().toLowerCase()===n||e.id.trim()===t.trim());r.push({...i??{provider:``,id:t,name:t,...a},selectionRef:t});continue}r.push({provider:t.slice(0,c),id:t.slice(c+1),name:t,...a})}return r}function Ut(e){let n=t(e?.models),r=t(n?.providers),i=t(e?.agents),a=t(i?.defaults),o=a?.model,s=t(o),c=typeof o==`string`?o:typeof s?.primary==`string`?s.primary:``,l=Array.isArray(s?.fallbacks)?s.fallbacks.filter(e=>typeof e==`string`):[];return{providerIds:Object.keys(r??{}),apiKeyProviderIds:Object.entries(r??{}).filter(([,e])=>{let n=t(e);return n?Object.hasOwn(n,`apiKey`)&&n.apiKey!=null:!1}).map(([e])=>e),providerAuthModes:Object.fromEntries(Object.entries(r??{}).flatMap(([e,n])=>{let r=t(n)?.auth;return typeof r==`string`?[[e,r]]:[]})),defaults:{primary:c,fallbacks:l,utilityModel:typeof a?.utilityModel==`string`?a.utilityModel:null}}}function Wt(e,t){let n=new Set(Array.from(t,G)),r=new Map;for(let t of e??[]){let e=G(t.provider);t.quickApiKeySetup&&e&&!n.has(e)&&!r.has(e)&&r.set(e,{id:e,displayName:P(e)})}return[...r.values()].toSorted((e,t)=>e.displayName.localeCompare(t.displayName))}var Gt;function Kt(){return(Kt=e((()=>{r(),it(),Ve(),Gt={provider:[`auth-rejected`,`unavailable`,`ready`],profile:[`ready`,`auth-rejected`,`unavailable`]}})))()}var qt;function Jt(){return(Jt=e((()=>{ie(),W(),qt=class{constructor(e){this.options=e,this.pendingOrders=new Map,this.activeOrderProviders=new Set}resetOrders(){this.pendingOrders.clear(),this.options.setOrders({})}setOrder(e,t,n){let r=this.options.getData()?.authStatus?.providers.find(e=>e.provider===t),i=n??r?.profiles.map(e=>e.profileId)??[];this.options.setOrders({...this.options.getOrders(),[t]:i}),this.pendingOrders.set(t,{cardId:e,profileIds:n,optimisticOrder:i}),this.options.clearMessage(e),this.flushOrder(t)}flushPendingOrders(){if(this.options.canMutate())for(let e of this.pendingOrders.keys())this.flushOrder(e)}async logout(e,t){let n=this.options.getClient(),r=`logout:${e}`;if(!n||!this.options.canMutate()||this.options.isBusy(r))return;let i=this.options.getClientEpoch(),a=this.options.getAgentId(),o=this.options.getAgentEpoch(),s=()=>this.isCurrentScope(n,i,o,a);this.options.clearProbe(e),this.options.setBusy(r,!0),this.options.clearMessage(e);try{let n=await this.options.getConfig().runExternalMutation(async e=>{let n=await e.request(`models.authLogout`,{...t,agentId:a});return C(e),n},{canDispatch:()=>s()&&this.options.canMutate()});if(!s())return;if(!n.ok){await this.options.refresh(),s()&&this.options.setError(e,n.error);return}let r=n.value.warning?[n.value.warning]:[];if(!n.refresh.ok)r.push(n.refresh.error);else try{await this.options.refresh();let e=this.options.getData()?.error;e&&r.push(e)}catch(e){r.push(U(e))}s()&&this.options.setLogoutSuccess(r.join(` `)||void 0)}catch(t){s()&&this.options.setError(e,t)}finally{s()&&this.options.setBusy(r,!1)}}async flushOrder(e){if(!this.activeOrderProviders.has(e)){this.activeOrderProviders.add(e);try{for(;;){let t=this.pendingOrders.get(e);if(!t)return;let n=this.options.getClient();if(!n||!this.options.canMutate())return;this.pendingOrders.delete(e);let r=this.options.getClientEpoch(),i=this.options.getAgentEpoch(),a=this.options.getAgentId();try{let o=await n.request(`models.authOrderSet`,{provider:e,...t.profileIds?{profileIds:t.profileIds}:{},agentId:a});if(C(n),!this.isCurrentScope(n,r,i,a))return;if(t.profileIds&&!o.warning)this.options.cancelRefresh(),this.applyOrder(e,t.profileIds),this.options.refresh();else if(await this.options.refresh(),!this.isCurrentScope(n,r,i,a))return;this.clearOptimisticOrder(e,t.optimisticOrder)&&o.warning&&this.options.setError(t.cardId,o.warning)}catch(o){if(!this.isCurrentScope(n,r,i,a))return;this.clearOptimisticOrder(e,t.optimisticOrder)&&this.options.setError(t.cardId,o)}}}finally{this.activeOrderProviders.delete(e),this.pendingOrders.has(e)&&this.options.canMutate()&&this.flushOrder(e)}}}isCurrentScope(e,t,n,r){return this.options.isCurrentClient(e,t)&&this.options.getAgentEpoch()===n&&this.options.getAgentId()===r}clearOptimisticOrder(e,t){let n=this.options.getOrders();if(n[e]!==t)return!1;let r={...n};return delete r[e],this.options.setOrders(r),!0}applyOrder(e,t){let n=this.options.getData(),r=n?.authStatus;if(!n||!r)return;let i=[...r.providers];for(let[n,r]of i.entries()){if((r.authProvider??r.provider)!==e)continue;let{profileOrder:a,profileOrderStored:o,...s}=r;i[n]={...s,profileOrder:[...t],profileOrderStored:!0}}this.options.setData({...n,authStatus:{...r,providers:i}})}}})))()}var Y;function Yt(){return(Yt=e((()=>{N(),T(),pe(),k(),bt(),b(),y(),de(),Y=class extends v{constructor(...e){super(...e),this.client=null,this.agentId=``,this.profileId=``,this.refresh=0,this.usage=new j(this,{args:()=>[this.client,this.agentId,this.profileId,this.refresh],task:([e,t,n],{signal:r})=>e&&t&&n?e.request(`codex.accountUsage`,{agentId:t,profileId:n},{signal:r,timeoutMs:3e4}):M})}refreshUsage(){this.refresh+=1}render(){return this.client?D`
      <div class="model-providers__account-usage">
        <button
          class="model-providers__account-refresh"
          type="button"
          aria-label=${u(`common.refresh`)}
          title=${u(`common.refresh`)}
          ?disabled=${this.usage.status===qe.PENDING}
          @click=${()=>this.refreshUsage()}
        >
          ${A.refresh}
        </button>
        ${this.usage.render({pending:()=>D`<span>${u(`common.loading`)}</span>`,complete:e=>e.providers.length===0?D`<span>${u(`modelProviders.noStats`)}</span>`:e.providers.map(e=>D`
                    ${e.plan?D`<strong>${e.plan}</strong>`:w}
                    <div>
                      ${e.windows.length||e.billing?.length?xt(e,{groupWindows:!0}):u(`modelProviders.noStats`)}
                    </div>
                  `),error:e=>D`<span class="provider-usage-error">${S(e)}</span>`})}
      </div>
    `:w}},n([O({attribute:!1})],Y.prototype,`client`,void 0),n([O()],Y.prototype,`agentId`,void 0),n([O()],Y.prototype,`profileId`,void 0),n([E()],Y.prototype,`refresh`,void 0),customElements.get(`openclaw-model-account-usage`)||customElements.define(`openclaw-model-account-usage`,Y)})))()}function Xt(e){se({placement:`bottom`,message:U(e),icon:A.alertTriangle,durationMs:12e3})}function Zt(e){se({placement:`bottom`,message:[u(`modelProviders.logout.done`),e].filter(Boolean).join(` `),icon:A.check})}function Qt(e){switch(e.source){case`config`:return u(`modelProviders.profiles.sourceConfig`);case`external`:return e.displayName||u(`modelProviders.profiles.sourceExternal`);case`inherited`:return u(`modelProviders.profiles.sourceInherited`);case`saved`:return u(`modelProviders.profiles.sourceSaved`);default:return}}function $t(e){if(e.apiKey?.source===`config`)return u(`modelProviders.credentials.configKey`);if(e.apiKey?.source===`env`)return e.apiKey.envVar?u(`modelProviders.credentials.envKeyNamed`,{name:e.apiKey.envVar}):u(`modelProviders.credentials.envKey`)}function en(e){return u(e===`auth-config`?`modelProviders.profiles.priorityManagedByAuth`:`modelProviders.profiles.priorityManagedByProvider`)}function tn(e){let t=[],n=Qt(e);return n&&e.source!==`saved`&&t.push(n),e.email&&e.displayName&&e.displayName!==n&&t.push(e.displayName),e.lastUsedAt&&t.push(u(`modelProviders.profiles.lastUsed`,{time:Me(Date.now()-e.lastUsedAt)})),t.join(` · `)}function nn(e){let t=(e.split(`@`)[0]??``).split(/[^a-z0-9]+/iu).filter(Boolean);return(t.length>1?`${t[0]?.[0]??``}${t.at(-1)?.[0]??``}`:t[0]?.slice(0,2)??``).toLocaleUpperCase()||`?`}function rn(e,t){switch(e.externallyManaged&&(e.status===`expired`||e.status===`expiring`)?`ok`:e.status){case`ok`:return F({kind:t?`muted`:`ok`,label:u(t?`modelProviders.status.configured`:`modelProviders.status.ok`)});case`static`:return F({kind:`ok`,label:u(`modelProviders.status.configured`)});case`expiring`:return F({kind:`warn`,label:u(`modelProviders.status.expiring`)});case`expired`:return F({kind:`danger`,label:u(`modelProviders.status.expired`)});default:return F({kind:`muted`,label:u(`modelProviders.status.missing`)})}}function an(e,t){return e.profiles.filter(n=>(e.profileProviderIds[n.profileId]??e.id)===t)}function on(e,t){return e.logoutTargets.find(e=>e.profileIds.includes(t))?.provider}function sn(e,t){let n=new Set(e.map(e=>e.profileId));return[...t.filter(e=>n.delete(e)),...e.flatMap(e=>n.delete(e.profileId)?[e.profileId]:[])]}function cn(e,t){if(e.length!==t.length)return!1;let n=new Set(e.map(e=>e.profileId));return n.size===e.length&&t.every(e=>n.delete(e))}function ln(e,t){return[...new Set(e.profiles.map(t=>e.profileProviderIds[t.profileId]??e.id))].map(n=>{let r=an(e,n),i=t[n]??e.profileOrders[n]??[],a=e.profileOrderLocks[n],o=cn(r,i),s=e.profileOrderStoredProviders.includes(n),c=t[n]!==void 0||e.profileOrderExplicitProviders.includes(n),l=a?en(a):o?void 0:u(s?`modelProviders.profiles.partialStoredOrder`:`modelProviders.profiles.partialOrder`),d=new Map(r.map(e=>[e.profileId,e]));return{provider:n,order:i,lock:a,complete:o,stored:s,explicit:c,explanation:l,profiles:sn(r,i).flatMap(e=>{let t=d.get(e);return t?[t]:[]})}})}function un(e,t){return[...e.querySelectorAll(t)]}function dn(e){e.classList.remove(hn);for(let t of un(e,`.model-providers__profile`))t.classList.remove(mn),t.style.removeProperty(`translate`)}function fn(e){if(!e.canMove||e.event.button!==0)return;let t=e.event.currentTarget;if(!(t instanceof HTMLElement))return;let n=t.closest(`.model-providers__profile`),r=t.closest(`.model-providers__profiles`);if(!n||!r)return;let i=r.getBoundingClientRect().top,a=un(r,`.model-providers__profile`).filter(t=>t.dataset.profileProvider===e.provider).map(e=>({element:e,bounds:e.getBoundingClientRect()})),o=a.find(e=>e.element===n);if(!o)return;let s=a.filter(e=>e!==o),c,l=`before`;e.event.preventDefault(),r.classList.add(hn),n.classList.add(mn);try{t.setPointerCapture?.(e.event.pointerId)}catch{}let u=t=>{if(t.pointerId!==e.event.pointerId)return;let u=i-r.getBoundingClientRect().top,d=t.clientY-e.event.clientY+u;n.style.translate=`${t.clientX-e.event.clientX}px ${d}px`;let f=document.elementFromPoint(t.clientX,t.clientY),p=f?.closest(`.model-providers__profile`),h=t.clientY+u,g=f&&r.contains(f)&&(!p||p.dataset.profileProvider===e.provider)&&a.some(({bounds:e})=>t.clientX>=e.left&&t.clientX<=e.right&&h>=e.top&&h<=e.bottom),_=(d>0?o.bounds.bottom:o.bounds.top)+d;c=g?s.find(({bounds:e})=>_<e.top+e.height/2):void 0,l=c?`before`:`after`,g&&!c&&(c=s.at(-1));let v=c?m(a,o,c,l):a;v.indexOf(o)===a.indexOf(o)&&(c=void 0);let y=a[0]?.bounds.top??0;for(let e of v)e!==o&&(e.element.style.translate=`0px ${y-e.bounds.top}px`),y+=e.bounds.height},d=(n,i)=>{if(n.pointerId!==e.event.pointerId)return;u(n);let a=c?.element.dataset.profileId;dn(r),t.removeEventListener(`pointermove`,f),t.removeEventListener(`pointerup`,p),t.removeEventListener(`pointercancel`,h),t.removeEventListener(`lostpointercapture`,h),document.removeEventListener(`keydown`,g,!0);try{t.releasePointerCapture?.(e.event.pointerId)}catch{}i&&a&&e.move(a,l)},f=e=>u(e),p=e=>d(e,!0),h=e=>d(e,!1),g=t=>{t.key===`Escape`&&(t.preventDefault(),t.stopPropagation(),d(e.event,!1))};t.addEventListener(`pointermove`,f),t.addEventListener(`pointerup`,p),t.addEventListener(`pointercancel`,h),t.addEventListener(`lostpointercapture`,h),document.addEventListener(`keydown`,g,!0)}function pn(e,t){if(e.profiles.length===0)return w;let n=ln(e,t.profileOrders),r=new Map(e.profiles.map((e,t)=>[e.profileId,e.email||e.displayName||u(`modelProviders.profiles.account`,{number:String(t+1)})])),i=n.flatMap(e=>e.profiles.map(t=>({group:e,profile:t}))),a=n.some(e=>!e.lock&&e.complete&&e.order.length>1),o=[...new Set(n.flatMap(e=>e.explanation?[e.explanation]:[]))],s=$t(e);return D`
    <section class="model-providers__profiles" aria-label=${u(`modelProviders.profiles.title`)}>
      <div class="model-providers__profiles-heading">
        <div class="model-providers__profiles-heading-copy">
          <strong>${u(`modelProviders.profiles.title`)}</strong>
          <span
            >${u(i.length===1?`modelProviders.profiles.accountOne`:`modelProviders.profiles.accounts`,{count:String(i.length)})}${s?` · ${s}`:``}</span
          >
          ${a?D`<span>${u(`modelProviders.profiles.reorderHint`)}</span>`:w}
          ${o.map(e=>D`<span>${e}</span>`)}
        </div>
        <div class="model-providers__profiles-heading-actions">
          ${e.profileOrderStoredProviders.map(n=>D`<button
              type="button"
              class="btn btn--sm btn--ghost"
              ?disabled=${!t.canMutate}
              title=${t.canMutate?u(`modelProviders.profiles.resetOrderHint`):t.mutationBlockedReason??``}
              @click=${()=>t.onProfileOrderChange(e.id,n,null)}
            >
              ${u(`modelProviders.profiles.resetOrder`)}
            </button>`)}
          ${t.onAddAccount?D`<button
                  type="button"
                  class="btn btn--sm"
                  ?disabled=${t.addAccountDisabled}
                  @click=${t.onAddAccount}
                >
                  ${u(`modelProviders.profiles.addAccount`)}
                </button>`:w}
        </div>
      </div>
      <div class="model-providers__profile-list" role="list">
        ${me(i,({profile:e})=>e.profileId,({profile:n,group:i})=>{let{provider:a,order:o,complete:s,lock:c,stored:l,explicit:d}=i,f=o.indexOf(n.profileId),p=t.canMutate&&!c&&s&&o.length>1&&f>=0,h=!c&&(s||l)&&o.length>1,g=r.get(n.profileId),_=tn(n),v=on(e,n.profileId),y=u(`modelProviders.logout.actionFor`,{account:g}),ee=t.canMutate?y:t.mutationBlockedReason??``,b=t.canMutate?i.explanation??``:t.mutationBlockedReason??``,x=(r,i)=>{p&&t.onProfileOrderChange(e.id,a,m(o,n.profileId,r,i))},te=(e,t)=>{let n=o[f+t];if(!p||!n)return;let r=e.currentTarget,i=r instanceof HTMLButtonElement&&document.activeElement===r;x(n,t<0?`before`:`after`),i&&queueMicrotask(()=>{r.isConnected&&document.activeElement===document.body&&r.focus({preventScroll:!0})})};return D`
              <div
                class="model-providers__profile"
                role="listitem"
                data-profile-id=${n.profileId}
                data-profile-provider=${a}
              >
                <span class="model-providers__profile-order">
                  ${h?D`<button
                          type="button"
                          class="model-providers__profile-grip"
                          ?disabled=${!p}
                          aria-label=${u(`modelProviders.profiles.reorder`,{account:g,position:String(f+1)})}
                          aria-keyshortcuts=${p?`ArrowUp ArrowDown`:w}
                          title=${b||u(`modelProviders.profiles.reorderHint`)}
                          @pointerdown=${e=>fn({event:e,canMove:p,provider:a,move:x})}
                          @keydown=${e=>{(e.key===`ArrowUp`||e.key===`ArrowDown`)&&(e.preventDefault(),te(e,e.key===`ArrowUp`?-1:1))}}
                        >
                          ${A.gripVertical}
                        </button>`:D`<span aria-hidden="true"></span>`}
                  ${d&&s&&f>=0?D`<span
                          class="model-providers__profile-position"
                          aria-label=${u(`modelProviders.profiles.priority`,{position:String(f+1)})}
                          title=${u(`modelProviders.profiles.priority`,{position:String(f+1)})}
                          >${f+1}</span
                        >`:w}
                </span>
                <span class="model-providers__profile-avatar" aria-hidden="true"
                  >${nn(g)}</span
                >
                <div class="model-providers__profile-copy">
                  <strong>${g}</strong>
                  ${_?D`<span>${_}</span>`:w}
                  <details>
                    <summary>${u(`modelProviders.profiles.details`)}</summary>
                    <div>${n.profileId}</div>
                    ${n.expiry?D`<span>${u(`modelProviders.expiresIn`,{time:n.expiry.label})}</span>`:w}
                  </details>
                </div>
                ${a===`openai`&&n.type!==`api_key`?D`<openclaw-model-account-usage
                        .client=${t.usageClient??null}
                        .agentId=${t.usageAgentId??``}
                        .profileId=${n.profileId}
                      ></openclaw-model-account-usage>`:w}
                <span class="model-providers__profile-status"
                  >${rn(n,e.catalogStatus===`auth-rejected`)}</span
                >
                <span class="model-providers__profile-actions">
                  ${n.logoutSupported===!0&&v?D`<button
                          type="button"
                          class="model-providers__profile-logout"
                          aria-label=${y}
                          title=${ee}
                          ?disabled=${!t.canMutate||t.busy[`logout:${e.id}`]}
                          @click=${()=>t.onRequestLogout({cardId:e.id,label:g,target:{provider:v,profileIds:[n.profileId]}})}
                        >
                          ${gn}
                        </button>`:w}
                </span>
              </div>
            `})}
      </div>
    </section>
  `}var mn,hn,gn;function _n(){return(_n=e((()=>{T(),Yt(),ge(),ve(),k(),L(),b(),ut(),Pe(),re(),W(),lt(),mn=`model-providers__profile--dragging`,hn=`model-providers__profiles--sorting`,gn=xe(he` <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  <polyline points="16 17 21 12 16 7" />
  <line x1="21" x2="9" y1="12" y2="12" />`)})))()}function vn(e,t,n){let r={...e};return n===null?delete r[t]:r[t]=n,r}var yn;function bn(){return(bn=e((()=>{N(),V(),yn=class{constructor(e,t){this.options=t,this.pending=new Set,this.usageTask=this.createTask(e,`usage`,ht,e=>({providerUsage:e}),(e,t)=>this.options.refreshPolicy.markProviderUsage(e,Date.now(),t)),this.costTask=this.createTask(e,`cost`,gt,e=>({costByProvider:e}))}get loading(){return this.pending.size>0}get usageLoading(){return this.pending.has(`usage`)}adoptCoreData(e,t,n={}){let r=e===this.options.getDataClient()?this.options.getData():null;this.options.setData({...t,...n.preserveCatalogDiagnostics&&r?{providerOutcomes:r.providerOutcomes,catalogError:r.catalogError}:{},providerUsage:r?.providerUsage??t.providerUsage,costByProvider:r?.costByProvider??t.costByProvider}),this.options.setDataClient(e),t.providerUsage!==null&&this.options.refreshPolicy.markProviderUsage(t.providerUsage,t.updatedAt,this.options.getGateway().epoch),e&&!this.options.isCoreLoading()&&!this.loading&&t.providerUsage===null&&t.costByProvider===null&&this.load(e)}invalidate(){this.options.refreshPolicy.interrupt(),this.cancelGeneration()}beginCoreRefresh(e){this.cancelGeneration(),e&&this.options.refreshPolicy.resetPayload()}cancelGeneration(){this.pending.clear();let e=this.options.getGateway().epoch;this.usageTask.run([null,e]),this.costTask.run([null,e])}load(e){return this.loadRequests(e,!0)}loadUsage(){return this.loadRequests(void 0,!1)}async loadRequests(e,t){let n=this.options.getGateway(),r=e??n.client;if(!n.connected||!r){this.options.refreshPolicy.markLoadDeferred();return}this.options.refreshPolicy.beginLoad(),this.pending.add(`usage`);let i=this.usageTask.run([r,n.epoch]);if(!t){await i;return}this.pending.add(`cost`),await Promise.all([i,this.costTask.run([r,n.epoch])])}createTask(e,t,n,r,i){return new j(e,{autoRun:!1,task:([e,t],{signal:r})=>e?n(e,r).then(n=>({client:e,data:n,epoch:t})):M,onComplete:({client:e,data:n,epoch:a})=>{this.pending.delete(t);let o=this.options.getData();o&&e===this.options.getDataClient()&&this.options.getGateway().isCurrent({client:e,epoch:a})&&(this.options.setData({...o,...r(n)}),i?.(n,a)),this.options.refreshPolicy.flushPending()},onError:()=>{this.pending.delete(t),this.options.refreshPolicy.flushPending()}})}}})))()}function xn(e,t){let n=new Set,r=[];for(let i of e){let e=J(i);n.has(e)||(n.add(e),r.push(Sn(i,t)))}return r.toSorted((e,t)=>e.label.localeCompare(t.label))}function Sn(e,t){let n=J(e),r=t.get(We(e.provider)),i=r?Be(r,{authProfileId:o(n).profile,projection:`available-credentials`}):void 0;return{value:n,label:e.name||n,...i?{detail:[i.label,i.detail].filter(Boolean).join(` · `)}:{},...e.available===!1?{disabled:!0}:{},...e.provider?{provider:e.provider}:{}}}function Cn(e){return D`
    <span class="model-providers__label-with-help">
      <span>${e.title}</span>
      <span class="settings-section__docs">
        <openclaw-tooltip open-on-click>
          <button
            id=${e.triggerId}
            type="button"
            class="settings-section__help-button model-providers__help-button"
            aria-label=${e.label}
            @keydown=${e=>{e.key===`Escape`&&e.stopPropagation()}}
          >
            ${A.info}
          </button>
          <div slot="content" class="settings-section__help-panel">${e.body}</div>
        </openclaw-tooltip>
      </span>
    </span>
  `}function wn(e){return D`
    <span class="model-providers__segment-label">
      <span>${e.label}</span>
      <openclaw-tooltip open-on-click .content=${e.help}>
        <button
          type="button"
          class="model-providers__segment-info"
          aria-label=${e.help}
          @click=${e=>e.stopPropagation()}
          @keydown=${e=>{e.key===`Escape`&&e.stopPropagation()}}
        >
          ${A.info}
        </button>
      </openclaw-tooltip>
    </span>
  `}function Tn(e){return e===`auto`?`auto`:e===`on`}function En(e){return e.catalogDiscovering?D`
      <div class="model-providers__catalog-progress" role="status" aria-live="polite">
        <span class="btn__spinner" aria-hidden="true"></span>
        <span>${u(`modelProviders.defaults.discoveringMore`)}</span>
      </div>
    `:e.catalogDiscoveryError?D`
      <div class="model-providers__catalog-progress" role="alert" aria-live="polite">
        <span>${u(`modelProviders.defaults.discoverFailed`)}</span>
        <button class="btn btn--sm" type="button" @click=${e.onCatalogRetry}>
          ${u(`modelProviders.defaults.retryDiscover`)}
        </button>
      </div>
    `:w}function Dn(e){let t=!e.canMutate||e.models.length===0,n=!e.canMutate,r=!!e.busy.defaults,i=e.mutationBlockedReason??``,a=e.thinkingLevel&&!Mn.has(e.thinkingLevel)?[...Z,e.thinkingLevel]:Z,s=e.fastMode===void 0?``:ot(e.fastMode),c=e.selection.fallbacks[0]??``,l=new Map(Le(e.authStatus?.providers??[]).map(e=>[e.provider,e])),d=xn(e.models,l),f=e.automaticUtilityModel,p=f?o(f).model:``,m=e.models.find(e=>J(e)===p),h=f?Sn({...m??{id:p,name:p,provider:p.split(`/`,1)[0]??``},selectionRef:f},l):void 0,g=D`
    <div class="model-providers__defaults">
      ${!e.loading&&e.models.length===0?D`<div class="callout warning">${u(`modelProviders.defaults.noModels`)}</div>`:w}
      ${R({title:u(`modelProviders.defaults.primary`),control:B({label:u(`modelProviders.defaults.primary`),value:e.selection.primary,options:[{value:``,label:u(`modelProviders.defaults.selectModel`),disabled:!!e.selection.primary},...d],disabled:t||r,title:i,showSelectedDetail:!0,onChange:e.onPrimaryChange})})}
      ${R({title:Cn({title:u(`modelProviders.defaults.utility`),label:u(`modelProviders.defaults.utilityHelpLabel`),triggerId:kn,body:D`
            <p>${u(`modelProviders.defaults.utilityHelpPurpose`)}</p>
            <p>${u(`modelProviders.defaults.utilityHelpAutomatic`)}</p>
          `}),control:B({id:On,label:u(`modelProviders.defaults.utility`),value:e.selection.utilityModel??X,options:[{value:X,label:e.automaticUtilityModel?`${u(`quickSettings.model.fastModes.auto`)} · ${h?.label??e.automaticUtilityModel}`:u(`quickSettings.model.fastModes.auto`),provider:h?.provider,detail:f===null?u(`modelProviders.defaults.automaticUnavailable`):h?.detail},{value:``,label:u(`modelProviders.defaults.disabled`)},...d],disabled:t||r,title:i,showSelectedDetail:!0,onChange:t=>e.onUtilityChange(t===X?null:t)})})}
      ${R({title:u(`modelProviders.defaults.fallback`),control:B({label:u(`modelProviders.defaults.fallback`),value:c,options:[{value:``,label:u(`modelProviders.defaults.noFallback`)},...d.filter(t=>t.value!==e.selection.primary)],disabled:t||r||!e.selection.primary,title:i,showSelectedDetail:!0,onChange:t=>e.onFallbackChange(t||null)})})}
      ${R({title:Cn({title:u(`quickSettings.model.thinking`),label:u(`modelProviders.defaults.thinkingHelpLabel`),triggerId:An,body:D`<p>${u(`modelProviders.defaults.thinkingHelp`)}</p>`}),control:D`
          ${Qe({value:e.thinkingLevel??``,options:[{value:``,label:wn({label:u(`quickSettings.model.default`),help:u(`modelProviders.defaults.thinkingDefaultHelp`)})},...a.map(e=>({value:e,label:Mn.has(e)?u(`quickSettings.model.thinkingLevels.${e}`):Ae(e)}))],disabled:r||n,onChange:(t,n)=>t===``?e.onThinkingReset():e.onThinkingChange(t,n),onReselect:t=>{t===``&&e.thinkingOverridden&&e.onThinkingReset()}})}
        `})}
      ${R({title:Cn({title:u(`quickSettings.model.fastMode`),label:u(`modelProviders.defaults.fastModeHelpLabel`),triggerId:jn,body:D`<p>${u(`modelProviders.defaults.fastModeHelp`)}</p>`}),control:D`
          ${Qe({value:s,options:[{value:``,label:wn({label:u(`quickSettings.model.default`),help:u(`modelProviders.defaults.fastModeDefaultHelp`)})},{value:`auto`,label:u(`quickSettings.model.fastModes.auto`)},{value:`on`,label:u(`quickSettings.model.fastModes.on`)},{value:`off`,label:u(`quickSettings.model.fastModes.off`)}],disabled:r||n,onChange:t=>{t===``?e.onFastModeReset():t!==s&&e.onFastModeChange(Tn(t))},onReselect:t=>{t===``&&e.fastModeOverridden&&e.onFastModeReset()}})}
        `})}
      ${En(e)}
      ${e.canMutate&&e.message?D`<div
              class="callout ${e.message.kind}"
              role=${e.message.kind===`error`?`alert`:`status`}
            >
              ${e.message.text}
            </div>`:w}
      ${e.canMutate&&e.message?.warning?D`<div class="callout warning" role="status">${e.message.warning}</div>`:w}
    </div>
  `;return I({title:u(`modelProviders.defaults.title`),description:u(`modelProviders.defaults.subtitle`)},g)}var X,On,kn,An,jn,Z,Mn;function Nn(){return(Nn=e((()=>{T(),st(),at(),k(),pt(),L(),b(),Ne(),Ve(),Ke(),Kt(),X=`__openclaw_automatic_utility__`,On=`model-providers-utility-model`,kn=`model-providers-utility-help`,An=`model-providers-thinking-help`,jn=`model-providers-fast-mode-help`,Z=ct.filter(e=>e!==`minimal`),Mn=new Set(Z)})))()}function Pn(e){let t=e.auth;if(!t)return w;let n=u(Rn[t.kind]),r=t.expiryLabel?u(`modelProviders.expiresIn`,{time:t.expiryLabel}):void 0;return D`
    <span title=${r??n}>
      ${F({kind:zn[t.kind],label:n})}
    </span>
  `}function Fn(e){return e.hasConfigApiKey||!!e.apiKey||e.profiles.length>0}function In(e){return e.catalogStatus===`ready`&&e.auth?.kind!==`expired`&&e.auth?.kind!==`missing`&&e.auth?.kind!==`expiring`}function Ln(e){return e.checkingModels?F({kind:`muted`,label:u(`chat.modelControls.checkingProviderModels`,{providers:e.displayName})}):e.auth?.kind===`expired`||e.auth?.kind===`missing`||e.auth?.kind===`expiring`?Pn(e):e.catalogStatus===`auth-rejected`?F({kind:`danger`,label:u(`modelProviders.status.denied`)}):e.catalogStatus===`unavailable`?F({kind:`warn`,label:u(`modelProviders.status.modelsUnavailable`)}):Fn(e)?In(e)&&e.availableModelCount>0?F({kind:`ok`,label:u(`modelProviders.status.ready`)}):In(e)?F({kind:`muted`,label:u(`modelProviders.status.ok`)}):F({kind:`muted`,label:u(`modelProviders.status.configured`)}):Pn(e)}var Rn,zn;function Bn(){return(Bn=e((()=>{T(),L(),b(),Oe(),ze(),Rn={ok:`modelProviders.status.ok`,expiring:`modelProviders.status.expiring`,expired:`modelProviders.status.expired`,missing:`modelProviders.status.missing`,"api-key":`modelProviders.status.apiKey`},zn={ok:`ok`,expiring:`warn`,expired:`danger`,missing:`danger`,"api-key":`muted`}})))()}function Q(e){return!e.canMutate||e.configBusy}function Vn(e){return e?D`
    <div class="callout ${e.kind}" role=${e.kind===`error`?`alert`:`status`}>
      ${e.text}
    </div>
    ${e.warning?D`<div class="callout warning" role="status">${e.warning}</div>`:w}
  `:w}function Hn(e){return e.modelCount===0?null:e.availableModelCount<e.modelCount?u(`modelProviders.modelsAvailable`,{available:String(e.availableModelCount),count:String(e.modelCount)}):e.modelCount===1?u(`modelProviders.modelOne`):u(`modelProviders.models`,{count:String(e.modelCount)})}function Un(e,t){let n=e.localCost;return!n||n.totalTokens===0&&n.totalCost===0?w:D`
    <div class="model-providers__local-cost">
      <div class="provider-usage-billing-row">
        <span>${u(`modelProviders.localCost`,{days:String(t)})}</span>
        <strong>${l(n.totalCost)}</strong>
      </div>
      <div class="model-providers__local-cost-detail">
        ${u(`modelProviders.localCostDetail`,{tokens:ne(n.totalTokens),messages:String(n.messageCount)})}
      </div>
    </div>
  `}function Wn(e,t){let n=e.profiles.filter(e=>e.type===`oauth`).length,r=e.profiles.filter(e=>e.type===`token`).length,i=e.profiles.filter(e=>e.type===`api_key`).length,a=[];return n>0&&a.push(u(`modelProviders.credentials.oauth`,{count:String(n)})),r>0&&a.push(u(`modelProviders.credentials.tokenProfiles`,{count:String(r)})),e.apiKey?.source===`config`?a.push(u(`modelProviders.credentials.configKey`)):e.apiKey?.source===`env`?a.push(e.apiKey.envVar?u(`modelProviders.credentials.envKeyNamed`,{name:e.apiKey.envVar}):u(`modelProviders.credentials.envKey`)):i>0&&a.push(u(`modelProviders.credentials.profileKey`,{count:String(i)})),D`
    <div class="model-providers__credentials">
      <span>${u(`modelProviders.credentials.label`,{agent:t})}</span>
      <strong
        >${a.length>0?a.join(` · `):u(`modelProviders.credentials.none`)}</strong
      >
    </div>
  `}function Gn(e){if(!e)return w;let t=e.status===`ok`&&e.results.some(e=>e.status!==`ok`),n=t?`warning`:e.status===`ok`?`success`:`error`;return D`
    <div class="model-providers__probe model-providers__probe--${n}" role="status">
      <div class="model-providers__probe-summary">
        <strong
          >${u(t?`modelProviders.probe.status.partial`:`modelProviders.probe.status.${e.status}`)}</strong
        >
        ${e.latencyMs===void 0?w:D`<span
                >${u(`modelProviders.probe.latency`,{ms:String(e.latencyMs)})}</span
              >`}
      </div>
      ${e.error?D`<div>${fe(e.error)}</div>`:w}
      ${e.results.map(e=>D`
          <div class="model-providers__probe-target">
            <span>${e.label}</span>
            <span>
              ${u(`modelProviders.probe.status.${e.status}`)}${e.latencyMs===void 0?``:` · ${u(`modelProviders.probe.latency`,{ms:String(e.latencyMs)})}`}
            </span>
            ${e.error?D`<small>${fe(e.error)}</small>`:w}
          </div>
        `)}
    </div>
  `}function Kn(e,t){if(t.keyEditorProvider!==e.id)return w;let n=!!t.busy[`key:${e.id}`],r=e.apiKeySupported===!1||!!(e.configAuthMode&&e.configAuthMode!==`api-key`),i=Q(t);return D`
    <div class="model-providers__inline-form">
      <label class="field">
        <span>${u(`modelProviders.apiKey.label`)}</span>
        <input
          type="password"
          autocomplete="off"
          placeholder=${e.apiKey?.source===`config`?u(`modelProviders.apiKey.replacePlaceholder`):u(`modelProviders.apiKey.placeholder`)}
          .value=${t.keyDraft}
          ?disabled=${n||i||r}
          @input=${e=>t.onKeyDraftChange(e.target.value)}
        />
      </label>
      <div class="model-providers__form-actions">
        <button
          class="btn primary btn--sm"
          ?disabled=${n||i||r||!t.keyDraft.trim()}
          @click=${()=>t.onSaveKey(e.id,e.configKey??e.id)}
        >
          ${u(n?`modelProviders.saving`:`common.save`)}
        </button>
        <button class="btn btn--sm" ?disabled=${n} @click=${()=>t.onCloseKeyEditor()}>
          ${u(`common.cancel`)}
        </button>
      </div>
    </div>
  `}function qn(e,t){let n=e.credentialProviderIds.length?e.credentialProviderIds:[e.id],r=e.hasConfigApiKey||!!e.apiKey||e.profiles.length>0,i=!!t.busy[`probe:${e.id}`],a=!!t.busy[`key:${e.id}`],o=t.mutationBlockedReason??``,s=!!(e.configAuthMode&&e.configAuthMode!==`api-key`),c=e.apiKeySupported===!1,l=Q(t),d=s?u(`modelProviders.apiKey.authModeBlocked`,{mode:e.configAuthMode??``}):o;return D`
    <div class="model-providers__card-actions">
      ${t.canConnect(e)&&e.profiles.length===0?D`<button
              class="btn btn--sm"
              data-models-connect-provider=${e.id}
              ?disabled=${l||t.loginBusy}
              @click=${()=>t.onConnect(e)}
            >
              ${u(`modelProviders.login.action`)}
            </button>`:w}
      ${r?D`
              <button
                class="btn btn--sm"
                ?disabled=${i||!t.canMutate||!t.probeAvailable}
                title=${t.probeAvailable?o:u(`modelProviders.probe.unavailable`)}
                @click=${()=>t.onProbe(e.id,n)}
              >
                ${u(i?`modelProviders.probe.testing`:`modelProviders.probe.test`)}
              </button>
            `:w}
      ${c?w:D`
              <button
                class="btn btn--sm"
                ?disabled=${a||l||s}
                title=${d}
                @click=${()=>t.onOpenKeyEditor(e.id)}
              >
                ${u(`modelProviders.apiKey.set`)}
              </button>
            `}
      ${e.hasConfigApiKey||e.profiles.some(e=>e.type===`api_key`&&e.logoutSupported)?D`
              <button
                class="btn btn--sm danger"
                ?disabled=${a||l||s}
                title=${d}
                @click=${()=>t.onRemoveKey(e.id,e.configKey??e.id)}
              >
                ${u(`modelProviders.apiKey.remove`)}
              </button>
            `:w}
    </div>
  `}function Jn(e,t){let n=Hn(e),r=t.messages[`key:${e.id}`]??t.messages[e.id];return D`
    <div
      class="settings-row settings-row--stacked model-providers__row"
      data-provider-id=${e.id}
    >
      <div class="model-providers__head">
        <div class="model-providers__identity">
          ${Je(e.id,{className:`model-providers__icon`})}
          <div class="settings-row__text">
            <span class="settings-row__title">${e.displayName}</span>
            <span class="settings-row__desc"
              >${e.id}${n?D` · ${n}`:w}</span
            >
          </div>
        </div>
        <div class="settings-row__control">
          ${e.usage?.plan?rt(e.usage.plan):w}
          ${Ln(e)}
        </div>
      </div>
      ${e.profiles.length>0&&t.canViewProfiles?pn(e,{usageClient:t.usageClient,usageAgentId:t.usageAgentId,busy:t.busy,canMutate:t.canMutate&&!t.configBusy,mutationBlockedReason:t.mutationBlockedReason,profileOrders:t.profileOrders,onAddAccount:t.canConnect(e)?()=>t.onConnect(e):void 0,addAccountDisabled:t.loginBusy||Q(t),onProfileOrderChange:t.onProfileOrderChange,onRequestLogout:t.onRequestLogout}):Wn(e,t.credentialAgentLabel)}
      <div
        class="model-providers__global-metrics"
        aria-busy=${t.supplementalLoading?`true`:`false`}
      >
        <div class="model-providers__global-metrics-title">${u(`modelProviders.globalUsage`)}</div>
        ${e.usage?xt(e.usage):D`<div class="model-providers__no-stats">
                ${u(t.supplementalLoading?`common.loading`:`modelProviders.noStats`)}
              </div>`}
        ${Un(e,t.costDays)}
      </div>
      ${qn(e,t)} ${Kn(e,t)}
      ${Gn(t.probeResults[e.id])} ${Vn(r)}
    </div>
  `}function Yn(e){let t=!!e.busy.add,n=Q(e)||t,r=D`
    ${e.unconfiguredProviders.length===0?tt(u(`modelProviders.add.none`)):w}
    ${e.addProviderOpen?D`
            <div class="settings-row settings-row--stacked">
              <div class="model-providers__add-form">
                <label class="field">
                  <span>${u(`modelProviders.add.provider`)}</span>
                  <select
                    class="settings-select"
                    .value=${e.addProviderId}
                    ?disabled=${n}
                    @change=${t=>e.onAddProviderIdChange(t.target.value)}
                  >
                    <option value="">${u(`modelProviders.add.selectProvider`)}</option>
                    ${e.unconfiguredProviders.map(e=>D`<option value=${e.id}>${e.displayName}</option>`)}
                  </select>
                </label>
                <label class="field">
                  <span>${u(`modelProviders.apiKey.label`)}</span>
                  <input
                    type="password"
                    autocomplete="off"
                    placeholder=${u(`modelProviders.apiKey.placeholder`)}
                    .value=${e.addProviderKey}
                    ?disabled=${n}
                    @input=${t=>e.onAddProviderKeyChange(t.target.value)}
                  />
                </label>
                <button
                  class="btn primary"
                  ?disabled=${n||!e.addProviderId||!e.addProviderKey.trim()}
                  @click=${e.onAddProvider}
                >
                  ${e.busy.add?u(`modelProviders.saving`):u(`modelProviders.add.save`)}
                </button>
              </div>
              ${Vn(e.messages.add)}
            </div>
          `:w}
  `;return I({title:u(`modelProviders.add.title`),description:u(`modelProviders.add.subtitle`),actions:D`
        <button
          class="btn btn--sm"
          ?disabled=${t||!e.addProviderOpen&&(Q(e)||e.unconfiguredProviders.length===0)}
          title=${e.mutationBlockedReason??``}
          @click=${e.onAddProviderToggle}
        >
          ${e.addProviderOpen?u(`common.cancel`):u(`modelProviders.add.action`)}
        </button>
      `},r)}function Xn(e){let t=e.cards.some(In);return D`
    <div class="model-providers__setup" data-model-readiness="model-required">
      ${I({title:u(`modelProviders.readiness.title`)},R({title:u(`modelProviders.readiness.heading`),description:u(t?`modelProviders.readiness.signedInNoModels`:`modelProviders.readiness.notConfigured`),control:D`
            ${F({kind:`warn`,label:u(t?`modelProviders.readiness.noModels`:`modelProviders.readiness.modelRequired`)})}
            <button class="btn primary" @click=${e.onOpenModelSetup}>
              ${u(t?`modelProviders.readiness.chooseProvider`:`modelSetup.heading`)}
            </button>
          `}))}
    </div>
  `}function Zn(e){return D`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__desc provider-usage-error">${e}</span>
      </div>
    </div>
  `}function Qn(e){if(!e.connected)return Ye(z(tt(u(`modelProviders.disconnected`))));let t=D`
    <div class="model-providers__provider-list">
      ${e.error?z(Zn(e.error)):w}
      ${e.providerUsageFailed?z(Zn(u(`usage.providerUsage.unavailable`))):w}
      ${e.cards.length===0?z(tt(D`<strong>${u(`modelProviders.emptyTitle`)}</strong><br />${u(`modelProviders.emptySubtitle`)}`)):e.cards.map(t=>z(Jn(t,e)))}
    </div>
  `,n=!e.loading&&!e.configuredModels.some(e=>e.available!==!1);return Ye(D`
    ${n?Xn(e):w}
    <div id=${h.behavior}>
      ${Dn({models:e.configuredModels,selection:e.defaultModels,authStatus:e.authStatus,automaticUtilityModel:e.automaticUtilityModel,thinkingLevel:e.thinkingLevel,thinkingOverridden:e.thinkingOverridden,fastMode:e.fastMode,fastModeOverridden:e.fastModeOverridden,loading:e.loading,catalogDiscovering:e.catalogDiscovering,catalogDiscoveryError:e.catalogDiscoveryError,canMutate:e.defaultsMutationBlockedReason===null&&!e.configBusy,mutationBlockedReason:e.defaultsMutationBlockedReason,busy:e.busy,message:e.messages.defaults,onPrimaryChange:e.onPrimaryChange,onFallbackChange:e.onFallbackChange,onUtilityChange:e.onUtilityChange,onThinkingChange:e.onThinkingChange,onThinkingReset:e.onThinkingReset,onFastModeChange:e.onFastModeChange,onFastModeReset:e.onFastModeReset,onCatalogRetry:e.onCatalogRetry})}
    </div>
    ${e.loading?z(et()):I({title:u(`modelProviders.title`),count:e.cards.length,actions:D`
                ${e.updatedAt?D`<span class="model-providers__updated"
                        >${u(`modelProviders.updated`,{time:le(e.updatedAt,{hour:`numeric`,minute:`2-digit`})})}</span
                      >`:w}
                <openclaw-tooltip
                  .content=${e.refreshing?u(`modelProviders.refreshing`):u(`common.refresh`)}
                >
                  <button
                    type="button"
                    class="btn btn--icon btn--ghost btn--xs model-providers__refresh-button"
                    aria-label=${e.refreshing?u(`modelProviders.refreshing`):u(`common.refresh`)}
                    ?disabled=${e.refreshing}
                    @click=${()=>e.onRefresh()}
                  >
                    ${A.refresh}
                  </button>
                </openclaw-tooltip>
              `},t)}
    ${e.quickAddSupported?Yn(e):w}
    ${e.providerUsageStalled?D`<div class="callout warning" role="status">${u(`usage.providerUsage.stalled`)}</div>`:w}
  `)}function $n(e){return D`
    ${Ze({title:we(`model-providers`),subtitle:D`${u(`modelProviders.subtitle`)}
      ${$e(`https://docs.openclaw.ai/concepts/model-providers`)}`,actions:D`
        <button
          class="btn"
          data-models-connect
          ?disabled=${e.connectDisabled}
          @click=${e.onConnect}
        >
          ${u(`modelProviders.login.action`)}
        </button>
        <button class="btn btn--ghost" @click=${e.onOpenModelSetup}>
          ${A.settings}<span>${u(`modelProviders.configureModels`)}</span>
        </button>
      `})}
    ${dt(D`${Vn(e.loginMessage)}${e.body}`)}
    ${e.login}
  `}function er(){return(er=e((()=>{T(),Ce(),k(),it(),bt(),L(),ft(),b(),ut(),y(),ue(),d(),Nn(),_n(),Bn(),lt()})))()}var $;function tr(){return(tr=e((()=>{c(),pe(),_e(),Se(),Xe(),b(),ae(),p(),Te(),De(),g(),je(),de(),x(),vt(),Tt(),W(),Lt(),Kt(),V(),St(),Jt(),_n(),bn(),er(),$=class extends v{constructor(...e){super(...e),this.loaderPending=!1,this.data=null,this.busy={},this.messages={},this.probeResults={},this.probeUnsupported=!1,this.keyEditorProvider=null,this.keyDraft=``,this.logoutConfirmation=null,this.profileOrders={},this.addProviderOpen=!1,this.addProviderId=``,this.addProviderKey=``,this.defaultsDraft=null,this.selectedAgentId=``,this.dataClient=null,this.routeDataObserved=!1,this.agentEpoch=0,this.probeEpochs=new Map,this.coreCatalogGeneration=0,this.core=new It(this,{onStart:e=>{e!==`publication`&&this.catalogDiscovery.reset(),this.coreCatalogGeneration=this.catalogDiscovery.generation,this.supplemental.beginCoreRefresh(e===`forced`),e===`forced`&&this.querySelectorAll(`openclaw-model-account-usage`).forEach(e=>e.refreshUsage())},onComplete:({client:e,data:t})=>{let n=this.data!==null&&this.catalogDiscovery.generation!==this.coreCatalogGeneration;n||this.catalogDiscovery.reset(),this.supplemental.adoptCoreData(e,t,{preserveCatalogDiagnostics:n})},isCatalogLoading:()=>this.catalogDiscovery.discovering,refreshPublication:()=>void this.refresh(`publication`)}),this.refreshPolicy=new yt({isLoading:()=>this.loaderPending||!this.routeDataObserved||this.core.loading||this.supplemental.usageLoading,reload:()=>this.supplemental.loadUsage(),onIncompleteUsageExhausted:()=>this.requestUpdate()}),this.supplemental=new yn(this,{isCoreLoading:()=>this.loaderPending,getGateway:()=>this.gateway,getData:()=>this.data,getDataClient:()=>this.dataClient,setData:e=>this.data=e,setDataClient:e=>this.dataClient=e,refreshPolicy:this.refreshPolicy}),this.catalogDiscovery=wt({getGateway:()=>this.gateway,getAgentId:()=>this.selectedAgentId,getAgentEpoch:()=>this.agentEpoch,getData:()=>this.data,setData:e=>this.data=e,requestUpdate:()=>this.requestUpdate(),onSettled:()=>this.core.flushPublication()}),this.gateway=new ke(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.resetConnectionState(),invalidateRequests:()=>this.invalidateRequests(),ensureInitialData:()=>this.ensureInitialData(),onSnapshot:e=>{e.initial?this.resetConnectionState():e.connectionChanged&&!e.identityChanged&&this.resetConnectionState({preserveVisibleData:!0}),e.becameConnected&&!e.initial&&this.routeDataObserved&&!this.loaderPending&&this.refresh(`replacement`)},onPageActivation:()=>this.refreshPolicy.request(`focus`)}),this.profileActions=new qt({getAgentEpoch:()=>this.agentEpoch,getAgentId:()=>this.selectedAgentId,getClient:()=>this.context.gateway.snapshot.client,getClientEpoch:()=>this.gateway.epoch,getData:()=>this.data,getOrders:()=>this.profileOrders,setData:e=>this.data=e,setError:(e,t)=>Xt(t),setOrders:e=>this.profileOrders=e,clearMessage:e=>this.setMessage(e,null),canMutate:()=>this.canMutate(),cancelRefresh:()=>this.cancelCoreRefresh(),refresh:()=>this.refresh(`forced`),isCurrentClient:(e,t)=>this.gateway.isCurrent({client:e,epoch:t}),isBusy:e=>!!this.busy[e],setBusy:(e,t)=>this.setBusy(e,t),clearProbe:e=>this.clearProbe(e),setLogoutSuccess:Zt,getConfig:()=>this.context.runtimeConfig}),this.login=new Ct(this,{getScope:()=>({context:this.context,agentId:this.selectedAgentId,authStatus:this.data?.authStatus??null}),canStart:()=>this.canMutate(),canContinue:()=>this.mutationBlockedReason()===null,refresh:()=>this.refresh(`replacement`)}),this.subscriptions=new f(this).effect(()=>this.context?.gateway,e=>Fe(e,()=>void this.refresh(`publication`))).watch(()=>this.context?.gateway.snapshot.client,Re).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t),e=>{!e.state.configSnapshot&&!e.state.configLoading&&e.ensureLoaded().catch(()=>void 0),this.profileActions.flushPendingOrders()}).watch(()=>this.context?.overlays,(e,t)=>e.subscribe(t),()=>this.profileActions.flushPendingOrders()).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t),()=>this.syncSelectedAgent()).effect(()=>this.context?.settingsAgentSelection,e=>e.subscribe(()=>this.syncSelectedAgent())),this.setBusy=(e,t)=>this.busy=vn(this.busy,e,t?!0:null),this.setMessage=(e,t)=>this.messages=vn(this.messages,e,t)}disconnectedCallback(){this.profileActions.resetOrders(),this.subscriptions.clear(),this.refreshPolicy.dispose(),super.disconnectedCallback()}willUpdate(e){(e.has(`routeData`)||e.has(`loaderPending`))&&this.routeData!==void 0&&(this.cancelCoreRefresh(),this.routeDataObserved=!0,this.setSelectedAgent(this.resolveSelectedAgentId()),(this.routeData.agentId??``)===this.selectedAgentId&&this.routeData.selectionIntentRevision===this.context.settingsAgentSelection.intentRevision&&this.gateway.isRouteDataCurrent(this.routeData)?this.supplemental.adoptCoreData(this.routeData.client,this.routeData.data):(this.data=null,this.dataClient=null,this.refreshPolicy.resetPayload()),this.ensureInitialData())}ensureInitialData(){!this.context.agents.state.agentsList&&!this.context.agents.state.agentsLoading&&!this.context.agents.state.agentsError&&this.context.agents.ensureList();let e=this.gateway.client;this.routeDataObserved&&!this.loaderPending&&this.gateway.connected&&e&&this.selectedAgentId&&!this.core.loading&&(this.data===null||this.data.updatedAt===null||e!==this.dataClient)&&this.refresh(`replacement`)}cancelCoreRefresh(){this.catalogDiscovery.reset(),this.core.invalidate()}invalidateRequests(){this.logoutConfirmation?.abort(),this.cancelCoreRefresh(),this.supplemental.invalidate()}resetConnectionState(e={}){e.preserveVisibleData||(this.data=null,this.dataClient=null),this.refreshPolicy.resetPayload(),this.resetAgentScopeState(),this.probeEpochs=new Map,this.probeUnsupported=!1,this.defaultsDraft=null}resetAgentScopeState(){this.login.reset(),this.busy={},this.messages={},this.probeResults={},this.closeKeyEditor(),this.logoutConfirmation?.abort(),this.profileActions.resetOrders(),this.addProviderOpen=!1,this.addProviderId=``,this.addProviderKey=``}resolveSelectedAgentId(){let e=this.context.settingsAgentSelection.state.selectedId;return e?s(e):``}setSelectedAgent(e){return e!==this.selectedAgentId&&(this.selectedAgentId=e,this.agentEpoch+=1,this.resetAgentScopeState(),!0)}syncSelectedAgent(){this.setSelectedAgent(this.resolveSelectedAgentId())&&(this.invalidateRequests(),this.data=null,this.dataClient=null,this.refreshPolicy.resetPayload(),this.requestUpdate(),this.ensureInitialData())}refresh(e){if(!this.selectedAgentId)return Promise.resolve();let t=this.gateway.client;return!this.gateway.connected||!t?(this.refreshPolicy.markLoadDeferred(),Promise.resolve()):this.core.refresh(t,this.selectedAgentId,e)}mutationBlockedReason(){return H(this.context)??(this.selectedAgentId?null:u(`agents.noAgents`))}canMutate(){return this.mutationBlockedReason()===null&&!this.configBusy()}configBusy(){let e=this.context.runtimeConfig.state,t=this.context.overlays.snapshot;return e.configLoading||e.configSaving||e.configApplying||t.updateRunning||t.updateReconciliationPending}clearProbe(e){this.probeEpochs.set(e,(this.probeEpochs.get(e)??0)+1),this.setBusy(`probe:${e}`,!1),this.probeResults=vn(this.probeResults,e,null)}async patchConfig(e){let t=this.context.gateway.snapshot.client;if(!t||H(this.context)||this.configBusy()||this.busy[e.key])return{ok:!1};let n=this.gateway.epoch,r=this.agentEpoch;return jt({runtimeConfig:this.context.runtimeConfig,agentEpoch:r,isCurrentClient:()=>this.gateway.isCurrent({client:t,epoch:n}),isCurrentAgent:()=>this.agentEpoch===r,refreshProviders:()=>this.refresh(`forced`),setBusy:t=>this.setBusy(e.key,t),setMessage:t=>this.setMessage(e.key,t)},e)}openKeyEditor(e){this.keyEditorProvider=e,this.keyDraft=``,this.setMessage(e,null)}closeKeyEditor(){this.keyEditorProvider=null,this.keyDraft=``}async mutateApiKey(e,t,n,r=`edit`){let i=this.gateway.client,a=r===`add`?`add`:`key:${e}`;if(!i||!this.canMutate()||this.busy[a]||n===``)return;let o=this.gateway.epoch,s=this.agentEpoch,c=()=>this.gateway.isCurrent({client:i,epoch:o})&&this.agentEpoch===s;this.clearProbe(e);let l=await Mt({runtimeConfig:this.context.runtimeConfig,agentEpoch:s,isCurrentClient:c,isCurrentAgent:c,canMutate:()=>this.canMutate(),refreshProviders:async()=>{let e=this.data;if(await this.refresh(`replacement`),c()&&this.data?.error){let t=this.data.error;return this.data=e,t}return this.data?.error??this.data?.catalogError??null},setBusy:e=>this.setBusy(a,e),setMessage:t=>{this.setMessage(e,t),r===`add`&&this.setMessage(`add`,t)}},{client:i,agentId:this.selectedAgentId,provider:t,apiKey:n,success:Nt(r,n,e)});l.ok&&c()&&(r===`add`?this.addProviderId===e&&this.addProviderKey.trim()===n&&(this.addProviderOpen=!!l.warning,l.warning||(this.addProviderId=``),this.addProviderKey=``):this.keyEditorProvider===e&&this.keyDraft.trim()===n&&this.closeKeyEditor())}async probe(e,t){let n=this.context.gateway.snapshot.client,r=`probe:${e}`;if(!n||!this.canMutate()||this.busy[r]||this.probeUnsupported)return;let i=this.gateway.epoch,a=this.selectedAgentId,o=this.agentEpoch,s=(this.probeEpochs.get(e)??0)+1;this.probeEpochs.set(e,s);let c=()=>this.gateway.isCurrent({client:n,epoch:i})&&this.agentEpoch===o&&this.selectedAgentId===a&&this.probeEpochs.get(e)===s;this.setBusy(r,!0),this.setMessage(e,null);try{let r=[];for(let e of t){if(!c())return;r.push(await n.request(`models.probe`,{provider:e,agentId:a}))}c()&&(this.probeResults={...this.probeResults,[e]:At(e,r)})}catch(t){if(!c())return;kt(t)?(this.probeUnsupported=!0,this.setMessage(e,{kind:`error`,text:u(`modelProviders.probe.unavailable`)})):this.setMessage(e,{kind:`error`,text:U(t)})}finally{c()&&this.setBusy(r,!1)}}async requestLogout(e){if(this.logoutConfirmation||!this.canMutate()||this.busy[`logout:${e.cardId}`])return;let t=new AbortController;this.logoutConfirmation=t,await nt({title:u(`modelProviders.logout.actionFor`,{account:e.label}),message:u(`modelProviders.logout.confirm`,{provider:e.label}),confirmLabel:u(`modelProviders.logout.action`),danger:!0,signal:t.signal}).finally(()=>{this.logoutConfirmation=null})&&!t.signal.aborted&&this.canMutate()&&await this.profileActions.logout(e.cardId,e.target)}async addProvider(){let e=this.addProviderId;e&&await this.mutateApiKey(e,e,this.addProviderKey.trim(),`add`)}async saveDefaults(e=this.defaultsDraft){if(!e)return;let t=await this.patchConfig({key:`defaults`,raw:Ot(e),note:u(`modelProviders.notes.defaultModel`),replacePaths:Pt});this.defaultsDraft===e&&(!t.ok||!t.warning)&&(this.defaultsDraft=null)}render(){let e=this.context.gateway.snapshot,n=e.hello?.auth,r=this.context.agents.state,i=r.agentsList?.agents??[],a=r.agentsList!==null&&ce(i).length===0,o=r.agentsList?null:r.agentsError,c=i.find(e=>s(e.id)===this.selectedAgentId),l=this.data??_t,d=ee(this.context.runtimeConfig.state),f=Ut(d),p=e.client&&this.selectedAgentId?He(e.client,{agentId:this.selectedAgentId},{allowStale:!0}):void 0,m={...f.defaults,...Dt(t(t(d?.agents)?.defaults))},h=this.defaultsDraft??m,g=e=>{this.defaultsDraft={...this.defaultsDraft??m,...e},this.setMessage(`defaults`,null),this.saveDefaults(this.defaultsDraft)},_=Vt({...l,models:p?.models??null,providerUsage:l.providerUsage?.ok?l.providerUsage.value:null,configProviderIds:f.providerIds,configApiKeyProviderIds:f.apiKeyProviderIds,configProviderAuthModes:f.providerAuthModes}),v=new Set([...f.providerIds,...l.authStatus?.providers.filter(e=>!!e.apiKey||e.profiles.length>0).map(e=>e.provider)??[]]),y=Ee(e,`models.probe`),b=Ee(e,`codex.accountUsage`),x=Qn({usageClient:!this.mutationBlockedReason()&&b?e.client:null,usageAgentId:this.selectedAgentId,connected:e.phase===`connected`,loading:e.phase===`connected`&&this.data===null&&!o&&!a,refreshing:this.core.loading,error:o??(a?u(`agents.noAgents`):l.error),providerUsageFailed:l.providerUsage?.ok===!1,supplementalLoading:this.loaderPending||this.supplemental.loading,updatedAt:l.updatedAt,costDays:30,credentialAgentLabel:c?oe(c):this.selectedAgentId,cards:a?[]:_,configuredModels:Ht(p?.models??null,h),defaultModels:h,authStatus:l.authStatus,automaticUtilityModel:p?.defaultModels?.automaticUtilityModel,thinkingLevel:h.thinkingLevel,thinkingOverridden:h.thinkingOverridden,fastMode:h.fastMode,fastModeOverridden:h.fastModeOverridden,catalogDiscovering:this.catalogDiscovery.discovering||!!p?.pendingProviders?.length,catalogDiscoveryError:this.catalogDiscovery.error??l.catalogError,configBusy:this.configBusy(),quickAddSupported:l.authStatus?.providerCapabilities!==void 0,unconfiguredProviders:Wt(l.authStatus?.providerCapabilities,v),canViewProfiles:e.phase===`connected`&&n?.scopes!==void 0&&be(n),mutationBlockedReason:this.mutationBlockedReason(),defaultsMutationBlockedReason:H(this.context),providerUsageStalled:this.refreshPolicy.incompleteUsageExhausted,probeAvailable:!this.probeUnsupported&&y!==!1,busy:this.busy,messages:this.messages,probeResults:this.probeResults,keyEditorProvider:this.keyEditorProvider,keyDraft:this.keyDraft,profileOrders:this.profileOrders,addProviderOpen:this.addProviderOpen,addProviderId:this.addProviderId,addProviderKey:this.addProviderKey,onRefresh:()=>void(o?this.context.agents.refreshList():Promise.all([this.context.runtimeConfig.refresh({background:!0}),this.refresh(`forced`)])),onOpenKeyEditor:e=>this.openKeyEditor(e),onCloseKeyEditor:()=>this.closeKeyEditor(),onKeyDraftChange:e=>this.keyDraft=e,onSaveKey:(e,t)=>void this.mutateApiKey(e,t,this.keyDraft.trim()),onRemoveKey:(e,t)=>void this.mutateApiKey(e,t,null),onProbe:(e,t)=>void this.probe(e,t),onRequestLogout:e=>void this.requestLogout(e),onProfileOrderChange:(e,t,n)=>this.profileActions.setOrder(e,t,n),onAddProviderToggle:()=>{this.addProviderOpen=!this.addProviderOpen,this.addProviderKey=``,this.setMessage(`add`,null)},onAddProviderIdChange:e=>this.addProviderId=e,onAddProviderKeyChange:e=>this.addProviderKey=e,onAddProvider:()=>void this.addProvider(),...Et(()=>this.defaultsDraft??m,g),onCatalogRetry:()=>this.catalogDiscovery.retry(),onOpenModelSetup:()=>this.context.navigate(`model-setup`),...this.login.providerActions});return $n({onOpenModelSetup:()=>this.context.navigate(`model-setup`),...this.login.pageActions,body:x})}},n([a({context:ye,subscribe:!0})],$.prototype,`context`,void 0),n([O({attribute:!1})],$.prototype,`routeData`,void 0),n([O({attribute:!1})],$.prototype,`loaderPending`,void 0),n([E()],$.prototype,`data`,void 0),n([E()],$.prototype,`busy`,void 0),n([E()],$.prototype,`messages`,void 0),n([E()],$.prototype,`probeResults`,void 0),n([E()],$.prototype,`probeUnsupported`,void 0),n([E()],$.prototype,`keyEditorProvider`,void 0),n([E()],$.prototype,`keyDraft`,void 0),n([E()],$.prototype,`profileOrders`,void 0),n([E()],$.prototype,`addProviderOpen`,void 0),n([E()],$.prototype,`addProviderId`,void 0),n([E()],$.prototype,`addProviderKey`,void 0),n([E()],$.prototype,`defaultsDraft`,void 0),n([E()],$.prototype,`selectedAgentId`,void 0),customElements.get(`openclaw-model-providers-page`)||customElements.define(`openclaw-model-providers-page`,$)})))()}tr();
//# sourceMappingURL=model-providers-page-CFwBkQKH.js.map