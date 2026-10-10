import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Fi as t,Ga as n,Kr as r,Li as i,Rr as a,nn as o,zr as s}from"./control-ui-foundation-DaCuy7E_.js";import{Al as c,Bs as l,Dc as u,Ec as d,F as f,Fl as p,Ga as m,Ha as h,Il as ee,Qn as g,Sl as _,Ss as v,Tl as y,Ua as te,Va as ne,Vs as re,Wa as ie,ar as ae,bs as b,cr as oe,er as se,lr as ce,nr as le,or as ue,tn as de,un as fe,ur as pe,wl as me,xs as x,za as he}from"./control-ui-core-CndkyZ8m.js";import{$ as S,G as ge,Q as C,U as _e,at as ve,c as w,dt as T,it as E,nt as D,pt as O,r as ye,s as be,t as xe,v as Se,x as Ce}from"./lit-runtime-CIjzngcy.js";import{$r as we,Di as k,Dn as Te,Ei as A,Oi as Ee,On as De,Qr as Oe,St as ke,Zn as Ae,da as je,fa as j,ga as Me,gt as Ne,ha as Pe,ia as Fe,ki as M,lr as Ie,mt as Le,nr as Re,or as ze,sr as Be,ua as Ve,wi as He,xt as Ue}from"./control-ui-core-C5mtYcym.js";import{c as We,s as Ge,u as Ke}from"./gateway-runtime-BvWNTqPo.js";import{Fa as qe,Ia as Je,ei as N,ti as P}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as Ye,U as Xe,V as Ze,z as Qe}from"./control-ui-boot-shared-DwSLfX8E.js";import{$n as $e,Mn as et,Nn as tt,_t as F,dt as I,fa as nt,ft as rt,ht as it,lt as L,m as at,nr as ot,nt as R,ot as z,p as st,pa as ct,pt as lt,qi as ut}from"./control-ui-boot-shared-DpHhsTHW.js";import{o as dt,r as ft,t as pt}from"./plugin-help-C4WP2eL0.js";import{$ as mt,G as ht,J as gt,K as _t,L as vt,Q as yt,R as bt,W as xt,Y as St,et as Ct,q as wt,tt as Tt}from"./control-ui-boot-shared-CoE663Cg.js";import{n as Et,t as Dt}from"./image-with-fallback-DE6ZLOFG.js";import{i as Ot,l as kt,o as At}from"./config-form.tiers-B9iwCG2R.js";import{n as jt,t as Mt}from"./settings-workspace-gGOfyDax.js";import{_ as Nt,c as B,d as Pt,f as Ft,g as It,h as Lt,m as Rt,n as zt,p as Bt,t as Vt}from"./config-form-DNnRghV9.js";import{F as Ht,M as Ut,P as Wt,i as Gt,o as Kt}from"./config-form.node.shared-hdpfuIcD.js";import{a as qt,i as Jt,n as Yt,r as Xt,t as Zt}from"./settings-model-D3OGZ-Hs.js";import{i as Qt,n as $t,r as en,t as tn}from"./plugins-hub-header-Dd8TqjUf.js";import{i as nn,n as rn,r as an}from"./ref-contract-DSuPGxDm.js";import{n as on,r as sn,t as cn}from"./file-preview-modal-registration-DhIQtJNk.js";var ln;function un(){return(un=e((()=>{ln=[`channels`,`providers`,`tools`,`contracts`,`hooks`,`mcpServers`,`cliCommands`,`cliBackends`,`skills`,`dangerousConfigFlags`]})))()}function dn(e,t){return Object.keys(e).every(e=>t.includes(e))}function fn(e){let n=t(e);if(!n||!dn(n,ln))return;let r={};for(let e of ln){let t=n[e];if(t!==void 0){if(!Array.isArray(t)||!t.every(o))return;r[e]=t}}return r}function pn(e){let n=t(e);if(!n||n.capabilityConsentCode!==`PLUGIN_CAPABILITY_CONSENT_REQUIRED`||!dn(n,[`capabilityConsentCode`,`pluginId`,`reviewToken`,`widened`,`acceptedAt`])||!o(n.pluginId)||!o(n.reviewToken)||n.acceptedAt!==void 0&&!o(n.acceptedAt))return;let r=n.widened===void 0?void 0:fn(n.widened);if(n.widened===void 0||r)return{capabilityConsentCode:mn,pluginId:n.pluginId,reviewToken:n.reviewToken,...r?{widened:r}:{},...n.acceptedAt===void 0?{}:{acceptedAt:n.acceptedAt}}}var mn;function hn(){return(hn=e((()=>{un(),mn=`PLUGIN_CAPABILITY_CONSENT_REQUIRED`})))()}function gn(e){let r=t(e);if(!r)return;let i=n(r.ruleId),a=n(r.message),o=r.severity;if(!i||!a||o!==`info`&&o!==`warn`&&o!==`critical`)return;let s=n(r.file),c=n(r.evidence),l=r.line;if(!(r.file!==void 0&&!s||r.evidence!==void 0&&!c||l!==void 0&&(typeof l!=`number`||!Number.isSafeInteger(l)||l<=0)))return{ruleId:i,severity:o,message:a,...s?{file:s}:{},...l===void 0?{}:{line:l},...c?{evidence:c}:{}}}function _n(e){let r=t(e);if(!r)return;let i=n(r.targetName),a=n(r.reason),o=r.targetType,s=r.requestMode;if(r.installPolicyCode!==`install_policy_warning_acknowledgement_required`||!i||!a||o!==`skill`&&o!==`plugin`||s!==`install`&&s!==`update`)return;let c;if(r.findings!==void 0){if(!Array.isArray(r.findings))return;c=[];for(let e of r.findings){let t=gn(e);if(!t)return;c.push(t)}}return{installPolicyCode:vn,targetName:i,targetType:o,requestMode:s,reason:a,...c?{findings:c}:{}}}var vn;function yn(){return(yn=e((()=>{vn=`install_policy_warning_acknowledgement_required`})))()}function bn(e){return e===`#configuration`?`configuration`:`readme`}function xn(e,t){let n=new URLSearchParams(e?.search);return t?n.set(`view`,`settings`):n.delete(`view`),{pathname:e?.pathname,search:n.size?`?${n}`:``,hash:``}}function Sn(e,n){return t(Jt(e,n).config)??{}}function Cn(e,t){let n=g(Sn(e,t));return{pluginId:t,baseline:n,value:g(n)}}function wn(e,t){let n=[`plugins`,`entries`,e.pluginId,`config`];return n.every((e,n)=>t[n]===e)?t.slice(n.length):null}function Tn(e,n,r){let i=wn(e,n);if(!i)return e;let a=g(e.value);if(i.length===0){let n=t(r);return n?{...e,value:g(n)}:e}return pe(a,i,r),{...e,value:a}}function En(e,t){let n=wn(e,t);if(!n)return e;if(n.length===0)return{...e,value:{}};let r=g(e.value);return ue(r,n),{...e,value:r}}function Dn(e){return JSON.stringify(e.baseline)!==JSON.stringify(e.value)}function On(e,n,r){let i=g(e);for(let a of new Set([...Object.keys(n),...Object.keys(r)])){if(!Object.hasOwn(r,a)){delete i[a];continue}if(!Object.hasOwn(n,a)){i[a]=g(r[a]);continue}if(JSON.stringify(n[a])===JSON.stringify(r[a]))continue;let o=t(n[a]),s=t(r[a]);i[a]=o&&s?On(t(e[a])??{},o,s):g(r[a])}return i}function kn(e,t){let n=g(e),r=Sn(e,t.pluginId);return pe(n,[`plugins`,`entries`,t.pluginId,`config`],On(r,t.baseline,t.value)),n}function An(e){if(e.plugin.local.installed||e.plugin.local.action!==`install`)return null;if(e.plugin.local.install)return e.plugin.local.install;let t=e.detail.packageName?.trim();return t?{source:`clawhub`,packageName:t}:null}function jn(e){return e.enabled&&e.state===`enabled`?`success`:e.state===`needs-setup`?`configuring`:`enabling`}function Mn(e,t){if(!t)return null;let n=t.request.source===`clawhub`?t.request.packageName:void 0,r=t.request.source===`official`?t.request.pluginId:void 0;return e?.plugins.find(e=>e.installed&&(e.id===t.pluginId||e.id===r||n!==void 0&&e.packageName===n))??null}function Nn(){return(Nn=e((()=>{le(),Zt()})))()}function V(e){return`plugin:${e}`}function Pn(e){return e?D`<div
    class="plugins-row-message plugins-row-message--${e.kind} oc-banner ${e.kind===`error`?`oc-banner-error`:e.kind===`warning`?`oc-banner-warning`:`oc-banner-success`}"
    role=${e.kind===`error`?`alert`:`status`}
  >
    ${e.text}
  </div>`:S}function H(){return(H=e((()=>{C()})))()}var Fn,In;function Ln(){return(Ln=e((()=>{y(),N(),le(),d(),Nn(),H(),P(),Fn=3e4,In=class{constructor(e){this.host=e,this.reconnectTimer=null,this.attempt=0,this.owner=null}get busy(){let e=this.host.getState();return!!(e&&[`installing`,`reconnecting`,`enabling`].includes(e.stage))}disconnect(){this.clearReconnectTimeout(),this.retireAttempt()}invalidate(){let e=this.host.getState();if(!e){this.retireAttempt();return}if(!this.ownerIsCurrent()){this.retireAttempt(),this.host.setState({...e,stage:`error`,error:c(`pluginsPage.installWizard.destinationChanged`)});return}this.busy&&(this.host.setState({...e,stage:`reconnecting`,error:void 0}),this.armReconnectTimeout(this.attempt,e.catalogId))}open(e){An(e)&&this.prepareOpen()?.open(e)}prepareOpen(){if(this.busy)return null;this.close(),this.owner=this.host.getOwner();let e=this.attempt,t=()=>e===this.attempt&&this.ownerIsCurrent();return{isCurrent:t,open:e=>{let n=An(e);t()&&n&&(this.host.setState({catalogId:e.plugin.id,detail:e,request:n,stage:`review`}),this.host.getRuntimeConfig().ensureLoaded(),this.host.getRuntimeConfig().ensureSchemaLoaded())}}}close(){this.clearReconnectTimeout();let e=this.key();e&&this.host.getConsentController().cancelMutationObserver(e),this.retireAttempt(),this.host.setState(null)}cancelConsent(){this.host.getConsentController().close();let e=this.host.getState();e&&(this.clearReconnectTimeout(),this.host.setState({...e,stage:`error`,error:c(`pluginsPage.installWizard.consentCancelled`)}))}begin(){let e=this.host.getState(),t=this.key(e),n=this.attempt;e&&t&&this.host.canMutate()&&this.isCurrent(n,e.catalogId)&&(this.host.setState({...e,stage:`installing`,error:void 0}),this.host.getConsentController().install(e.request,t,{reviewConfirmed:!0,onCommitted:async t=>{let r=this.host.getState();r&&this.isCurrent(n,e.catalogId)&&(this.host.setState({...r,pluginId:t.plugin.id,stage:`reconnecting`,policyWarning:void 0,error:void 0}),await this.resume())},onFailure:(t,r)=>{let i=this.host.getState();r&&i&&this.isCurrent(n,e.catalogId)&&this.host.setState({...i,pluginId:r,savedInstall:!0}),this.fail(n,e.catalogId,t)},onInstallPolicyWarning:(t,r)=>{let i=this.host.getState();i&&this.isCurrent(n,e.catalogId)&&this.host.setState({...i,stage:`policy-warning`,policyWarning:r})}}))}continuePolicyWarning(){let e=this.host.getState(),t=this.key(e);e&&t&&this.isCurrent(this.attempt,e.catalogId)&&(this.host.setState({...e,stage:`installing`,error:void 0}),this.host.getConsentController().install({...e.request,acknowledgeInstallPolicyWarning:!0},t))}async resume(){let e=this.host.getState(),t=this.attempt;if(!e||e.stage!==`reconnecting`||!this.host.isConnected()||!this.isCurrent(t,e.catalogId))return;this.clearReconnectTimeout();let n=Mn(this.host.getCatalog(),e);if(!n){this.fail(t,e.catalogId,c(`pluginsPage.installWizard.installedStateMissing`));return}if(n.state===`error`){this.fail(t,e.catalogId,n.error??c(`pluginsPage.installWizard.pluginUnhealthy`));return}let r=jn(n);if(this.host.setState({...e,pluginId:n.id,savedInstall:void 0,stage:r}),r===`configuring`){let r=this.host.getRuntimeConfig();if(r.state.connected&&await Promise.all([r.ensureLoaded(),r.ensureSchemaLoaded()]),!this.isCurrent(t,e.catalogId))return;let i=this.host.getState();if(!i||!this.isCurrent(t,e.catalogId))return;this.host.setState({...i,configDraft:Cn(r.state.configForm,n.id)})}else r===`enabling`&&this.enable(n.id)}async saveConfiguration(){let e=this.host.getState();if(!e?.pluginId||!e.configDraft||e.stage!==`configuring`||!this.host.canEditConfig())return;let t=this.attempt;if(!this.isCurrent(t,e.catalogId))return;let n=this.host.getRuntimeConfig(),{pluginId:r,configDraft:i}=e,a=Dn(i)?await n.runExternalMutation(e=>{let t=n.state.configSnapshot,r=u(t);if(!r||!t?.hash)throw Error(c(`pluginsPage.installWizard.configSaveFailed`));return e.request(`config.set`,{raw:ce(kn(r,i)),baseHash:t.hash})},{canDispatch:()=>this.isCurrent(t,e.catalogId),configWriteAck:e=>e}):null;if(!(a===null||a.ok)){this.fail(t,e.catalogId,a?.error??c(`pluginsPage.installWizard.configSaveFailed`));return}this.isCurrent(t,e.catalogId)&&(await this.host.refreshCatalog(),this.isCurrent(t,e.catalogId)&&this.enable(r))}patchConfiguration(e,t){let n=this.host.getState();n?.configDraft&&this.isCurrent(this.attempt,n.catalogId)&&this.host.setState({...n,configDraft:Tn(n.configDraft,e,t)})}removeConfiguration(e){let t=this.host.getState();t?.configDraft&&this.isCurrent(this.attempt,t.catalogId)&&this.host.setState({...t,configDraft:En(t.configDraft,e)})}retry(){let e=this.host.getState();if(!(!e||e.savedInstall&&!this.host.canMutate())){if(!this.ownerIsCurrent()){this.attempt+=1,this.owner=this.host.getOwner(),this.host.setState({...e,pluginId:void 0,configDraft:void 0,savedInstall:void 0,stage:`review`,error:void 0});return}if(e.pluginId&&e.configDraft){this.host.setState({...e,stage:`configuring`,error:void 0});return}if(e.pluginId){if(this.host.setState({...e,stage:`reconnecting`,error:void 0}),e.savedInstall){let t=this.attempt;this.host.getConsentController().mutateInstalledPlugin(e.pluginId,`reload`,V(e.pluginId),{},{onReloaded:()=>this.resume(),onFailure:n=>this.fail(t,e.catalogId,n)});return}this.armReconnectTimeout(this.attempt,e.catalogId),this.host.refreshCatalog().then(()=>this.resume());return}this.host.setState({...e,stage:`review`,error:void 0})}}manage(){let e=this.host.getState()?.pluginId;e&&(this.close(),this.host.onManage(e))}key(e=this.host.getState()){return e?`install:${e.catalogId}`:null}clearReconnectTimeout(){this.reconnectTimer!==null&&(globalThis.clearTimeout(this.reconnectTimer),this.reconnectTimer=null)}armReconnectTimeout(e,t){this.clearReconnectTimeout(),this.reconnectTimer=globalThis.setTimeout(()=>{this.reconnectTimer=null;let n=this.host.getState();n?.catalogId===t&&n.stage===`reconnecting`&&this.isCurrent(e,t)&&this.fail(e,t,c(`pluginsPage.installWizard.reconnectTimedOut`))},Fn)}fail(e,t,n){let r=this.host.getState();r?.catalogId===t&&this.isCurrent(e,t)&&(this.clearReconnectTimeout(),this.host.setState({...r,stage:`error`,error:n}))}enable(e){let t=this.host.getState(),n=this.attempt;if(!t||!this.isCurrent(n,t.catalogId))return;let r=V(e);this.host.setState({...t,pluginId:e,configDraft:void 0,stage:`enabling`,error:void 0}),this.host.getConsentController().mutateInstalledPlugin(e,`enable`,r,{},{onCommitted:e=>{let r=this.host.getState();if(r&&this.isCurrent(n,t.catalogId)){if(e.plugin.state===`error`){this.fail(n,t.catalogId,e.plugin.error??c(`pluginsPage.installWizard.pluginUnhealthy`));return}this.host.setState({...r,pluginId:e.plugin.id,stage:`success`}),this.clearReconnectTimeout()}},onFailure:e=>this.fail(n,t.catalogId,e)})}ownerIsCurrent(){return this.owner!==null&&this.owner===this.host.getOwner()}isCurrent(e,t){return e===this.attempt&&this.ownerIsCurrent()&&this.host.getState()?.catalogId===t}retireAttempt(){this.attempt+=1,this.owner=null}}})))()}function Rn(e,t){return e.catalog.official===t.catalog.official?(t.catalog.downloads??0)-(e.catalog.downloads??0)||e.catalog.name.localeCompare(t.catalog.name):e.catalog.official?-1:1}function zn(e,t,n){return e.filter(e=>e.catalog[t]).toSorted((e,t)=>(e.catalog[n]??2**53-1)-(t.catalog[n]??2**53-1))}function Bn(e,t){let n=new Map(e.map(e=>[e.id,e]));for(let e of t)n.set(e.id,e);return[...n.values()]}var Vn,Hn,Un,Wn,Gn;function Kn(){return(Kn=e((()=>{Qe(),v(),Vn=100,Hn=8,Un=null,Wn=null,Gn=class{constructor(e,t){this.host=e,this.gateway=t,this.result=null,this.error=null,this.remoteError=null,this.categories=[],this.featured=[],this.trending=[],this.loadMoreError=null,this.intent=`all`,this.category=null,this.query=``,this.committedQuery=``,this.searchTimer=null,this.browseTask=new Ye(e,{autoRun:!1,args:()=>[this.gateway.isConnected()?this.gateway.getClient():null,this.intent,this.category,this.committedQuery,!1],task:([e,t,n,r,i],{signal:a})=>e?this.fetchAvailablePage({client:e,intent:t,category:n,query:r,manual:i,signal:a}):Ze,onComplete:e=>{this.result={items:e.items,...e.nextCursor?{nextCursor:e.nextCursor}:{}},this.remoteError=e.remoteError??null,e.overview&&(this.categories=e.categories??[],this.featured=zn(e.items,`featured`,`featuredRank`).slice(0,Hn),this.trending=zn(e.items,`trending`,`trendingRank`).slice(0,Hn)),this.gateway.onEntriesChanged?.()},onError:e=>{this.error=b(e)}}),this.loadMoreTask=new Ye(e,{autoRun:!1,args:()=>[Un,this.intent,this.category,this.committedQuery,Wn],task:([e,t,n,r,i],{signal:a})=>e&&i?this.fetchAvailablePage({client:e,intent:t,category:n,query:r,cursor:i,signal:a}):Ze,onComplete:e=>{if(!this.result||this.result.nextCursor!==e.requestedCursor)return;let t=Bn(this.result.items,e.items);this.result={items:this.intent===`all`&&!this.committedQuery?t.toSorted(Rn):t,...e.nextCursor?{nextCursor:e.nextCursor}:{}},this.loadMoreError=e.remoteError??null,this.gateway.onEntriesChanged?.()},onError:e=>{this.loadMoreError=b(e)}})}get loading(){return this.gateway.isConnected()&&this.browseTask.status===Xe.PENDING}get featuredLoading(){return this.isGroupedOverview()&&this.loading}get trendingLoading(){return this.isGroupedOverview()&&this.loading}get loadingMore(){return this.gateway.isConnected()&&this.loadMoreTask.status===Xe.PENDING}async fetchAvailablePage(e){let t=!e.cursor&&this.isGroupedOverview(e.intent,e.category,e.query),n=await e.client.request(`plugins.catalog.browse`,{intent:e.intent,...e.category?{category:e.category}:{},...e.query?{query:e.query}:{},...e.manual?{searchSource:`openclaw-control-ui`}:{},...e.cursor?{cursor:e.cursor}:{},pageSize:Vn},e.signal?{signal:e.signal}:void 0);return{items:e.intent===`all`&&!e.query?n.items.toSorted(Rn):n.items,overview:t,...n.categories?{categories:n.categories}:{},...n.nextCursor&&!e.query?{nextCursor:n.nextCursor}:{},...n.remoteError?{remoteError:n.remoteError}:{},...e.cursor?{requestedCursor:e.cursor}:{}}}isGroupedOverview(e=this.intent,t=this.category,n=this.committedQuery){return e===`all`&&t===null&&!n}invalidate(){this.disconnect(),this.committedQuery=this.query.trim(),this.browseTask.run([null,this.intent,this.category,this.committedQuery,!1]),this.result=null,this.error=null,this.remoteError=null,this.featured=[],this.trending=[],this.loadMoreError=null}disconnect(){this.searchTimer&&=(clearTimeout(this.searchTimer),null),this.loadMoreTask.run([null,this.intent,this.category,this.committedQuery,null])}async refresh(e=!1){let t=this.gateway.getClient();t&&this.gateway.isConnected()&&(this.error=null,this.remoteError=null,this.loadMoreError=null,this.loadMoreTask.run([null,this.intent,this.category,this.committedQuery,null]),await this.browseTask.run([t,this.intent,this.category,this.committedQuery,e]))}async loadMore(){let e=this.gateway.getClient(),t=this.result?.nextCursor;e&&this.gateway.isConnected()&&t&&!this.committedQuery&&!this.isGroupedOverview()&&(this.loadMoreError=null,await this.loadMoreTask.run([e,this.intent,this.category,this.committedQuery,t]))}selectIntent(e){this.intent=e,this.category=null,this.refresh()}selectCategory(e){this.intent=`all`,this.category=e,this.refresh()}updateQuery(e){this.query=e,e.trim()&&(this.intent=`all`,this.category=null),this.host.requestUpdate(),this.searchTimer&&clearTimeout(this.searchTimer),this.searchTimer=setTimeout(()=>{this.searchTimer=null;let t=e.trim(),n=t!==this.committedQuery&&t.length>=2;this.committedQuery=t,this.refresh(n)},250)}}})))()}var qn;function Jn(){return(Jn=e((()=>{Ht(),We(),ft(),qn=class{constructor(e){e.addController(this)}get available(){return this.plugin!==void 0}update(e){let t=e.context;t!==this.context&&(this.release?.(),this.context=t);let n=e.result?.plugins.find(t=>t.installed&&t.id===e.detail?.pluginId),r=e.catalogDetail?.result,i=r?.plugin.local.pluginId??r?.detail.packageName;if(this.plugin=e.connected&&Ge(t.gateway.snapshot,`openclaw.chat`,`operator.admin`)?n?{id:n.id,name:n.name}:r&&i?{id:i,name:r.plugin.catalog.name}:void 0:void 0,!this.plugin){this.release?.(),this.release=void 0;return}this.release=dt(t,this,this.plugin,{installed:!!n,overview:!n||e.installedDetailTab!==`configuration`})}get ask(){if(!this.context||!this.plugin)return async()=>{};let e=pt(this.context,this.plugin);return t=>{let n=t?.value===void 0?t?.schema.default:t.value;return e(t?{path:t.path,label:t.label,value:n,sensitive:Wt(n,t.path,t.hints)}:void 0)}}hostDisconnected(){this.release?.(),this.release=void 0,this.plugin=void 0}}})))()}function Yn(e){let t=h(e);return ct({title:c(`pluginsPage.installConfirmTitle`,{name:t}),message:c(`pluginsPage.installConfirmMessage`),confirmLabel:c(`pluginsPage.install`)})}function Xn(e){return ct({title:c(`pluginsPage.removeConfirmTitle`,{name:e}),message:c(`pluginsPage.removeConfirmMessage`),confirmLabel:c(`pluginsPage.remove`),danger:!0})}function Zn(){return(Zn=e((()=>{nt(),y(),N(),P()})))()}function Qn(e,t,n){return D`<openclaw-plugin-credential-editor
    .field=${e}
    .descriptor=${t}
    .context=${n}
  ></openclaw-plugin-credential-editor>`}var $n,U;function er(){return(er=e((()=>{C(),ve(),_e(),rn(),k(),Ie(),y(),N(),le(),v(),me(),P(),$n=[`env`,`file`,`exec`,`store`],U=class extends _{constructor(...e){super(...e),this.inspection=null,this.loading=!1,this.error=``,this.dialogOpen=!1,this.reference={source:`env`,provider:`default`,id:``},this.literal=``,this.revealed=!1,this.saving=!1,this.cancelling=!1,this.referenceSubmitted=!1,this.generation=0,this.identity=``,this.fieldIdentity=``,this.connection=null}willUpdate(e){if(!this.context||!this.field||!this.descriptor)return;let t=JSON.stringify([this.context.pluginId,this.field.path,this.context.baseHash,this.context.gateway.epoch,this.context.canInspect]);if(t===this.identity&&this.binding===this.context.gateway)return;let n=JSON.stringify([this.context.pluginId,this.field.path]),r=this.binding!==this.context.gateway||this.fieldIdentity!==n||!this.context.canInspect||this.connection&&!this.context.gateway.isCurrent(this.connection),i=this.dialogOpen;if(this.identity=t,this.fieldIdentity=n,this.binding=this.context.gateway,this.revealed=!1,r&&(this.literal=``,this.dialogOpen=!1,this.saving=!1,this.cancelling=!1,this.referenceSubmitted=!1,this.reference={source:`env`,provider:`default`,id:``}),this.inspection=null,this.generation++,i&&!this.saving&&!r){this.error=c(`pluginsPage.credentials.stale`),this.loading=!1;return}this.inspect()}disconnectedCallback(){this.generation++,this.inspection=null,this.literal=``,this.reference={source:`env`,provider:`default`,id:``},this.referenceSubmitted=!1,super.disconnectedCallback()}async inspect(){let{gateway:e,pluginId:t,baseHash:n,canInspect:r}=this.context,i=e.capture(),a=++this.generation;if(this.connection=i,this.error=``,this.loading=!1,r&&i&&n){this.loading=!0;try{let r=await i.client.request(`plugins.credentials.inspect`,{pluginId:t,path:this.field.path,baseHash:n});if(a!==this.generation||!e.isCurrent(i))return;if(r.baseHash!==this.context.baseHash){this.error=c(`pluginsPage.credentials.stale`);return}this.inspection=r.credential,this.dialogOpen&&r.credential.kind===`reference`&&(this.reference={...r.credential.ref})}catch(t){a===this.generation&&e.isCurrent(i)&&(this.error=b(t))}finally{a===this.generation&&e.isCurrent(i)&&(this.loading=!1)}}}openReference(){this.referenceSubmitted=!1;let e=this.inspection;this.reference=e?.kind===`reference`?{...e.ref}:{source:`env`,provider:`default`,id:``},this.dialogOpen=!0}async patch(e){if(this.field.disabled||this.saving||!this.context.canInspect||!this.connection||!this.context.gateway.isCurrent(this.connection))return;let t=this.context.gateway,n=this.connection,r=JSON.stringify([this.context.pluginId,this.field.path]),i=()=>this.isConnected&&this.context.gateway===t&&t.isCurrent(n)&&JSON.stringify([this.context.pluginId,this.field.path])===r;this.saving=!0,this.referenceSubmitted||=this.dialogOpen,this.error=``;try{let t=await this.context.onCommit(this.field.path,e);if(!i())return;t?(this.referenceSubmitted=!1,this.dialogOpen=!1,this.literal=``,await this.inspect()):this.error=this.context.saveError||c(`pluginsPage.credentials.saveFailed`)}catch(e){i()&&(this.error=b(e))}finally{i()&&(this.saving=!1)}}async cancelReference(){if(this.saving||this.cancelling)return;if(!this.referenceSubmitted){this.dialogOpen=!1;return}let e=this.context.gateway,t=this.connection,n=this.fieldIdentity,r=()=>this.isConnected&&this.context.gateway===e&&t!==null&&e.isCurrent(t)&&this.fieldIdentity===n;this.cancelling=!0;try{let e=await this.context.onDiscard();if(!r())return;e?(this.referenceSubmitted=!1,this.dialogOpen=!1,await this.inspect()):this.error=this.context.saveError||c(`configView.discardUnconfirmed`)}catch(e){r()&&(this.error=b(e))}finally{r()&&(this.cancelling=!1)}}renderDialog(){if(!this.dialogOpen)return S;let e=this.inspection?.kind===`environment`?this.inspection.envVar:null,t=this.field.disabled||this.loading||this.saving||this.cancelling||!this.inspection,n=this.error||this.context.saveError;return D`<openclaw-modal-dialog
      .label=${c(`pluginsPage.credentials.referenceTitle`)}
      @modal-cancel=${e=>{e.preventDefault(),this.cancelReference()}}
    >
      <section class="plugin-credential__dialog">
        <h2>${c(`pluginsPage.credentials.referenceTitle`)}</h2>
        ${e?D`<p>${c(`pluginsPage.credentials.environmentHelp`,{name:e})}</p>`:D`
                <p>${c(`pluginsPage.credentials.referenceHelp`)}</p>
                <label
                  >${c(`pluginsPage.credentials.source`)}<select
                    autofocus
                    class="settings-input"
                    aria-label=${c(`pluginsPage.credentials.source`)}
                    .value=${this.reference.source}
                    ?disabled=${t}
                    @change=${e=>{if(e.currentTarget instanceof HTMLSelectElement){let t=e.currentTarget.value,n=$n.find(e=>e===t);n&&(this.reference={...this.reference,source:n})}}}
                  >
                    ${$n.map(e=>D`<option value=${e} ?selected=${e===this.reference.source}>${c(`pluginsPage.credentials.sources.${e}`)}</option>`)}
                  </select></label
                >
                <label
                  >${c(`pluginsPage.credentials.provider`)}<input
                    class="settings-input"
                    .value=${this.reference.provider}
                    ?disabled=${t}
                    @input=${e=>{e.currentTarget instanceof HTMLInputElement&&(this.reference={...this.reference,provider:e.currentTarget.value})}}
                /></label>
                <label
                  >${c(`pluginsPage.credentials.identifier`)}<input
                    class="settings-input"
                    .value=${this.reference.id}
                    ?disabled=${t}
                    @input=${e=>{e.currentTarget instanceof HTMLInputElement&&(this.reference={...this.reference,id:e.currentTarget.value})}}
                /></label>
                <p class="muted">${c(`pluginsPage.credentials.help.${this.reference.source}`)}</p>
                ${this.inspection?.kind===`reference`&&this.inspection.unresolved?D`<p class="callout warn">${c(`pluginsPage.credentials.unresolved`)}</p>`:S}
              `}
        ${n?D`<p role="alert" class="callout danger">${n}</p>`:S}
        <footer>
          <button
            class="btn"
            ?disabled=${this.saving||this.cancelling}
            @click=${()=>this.cancelReference()}
          >
            ${c(`common.cancel`)}
          </button>
          ${!this.inspection&&!this.loading?D`<button class="btn" @click=${()=>this.inspect()}>${c(`common.retry`)}</button>`:S}
          ${e?S:D`<button class="btn primary" ?disabled=${t||!nn(this.reference)} @click=${()=>this.patch({...this.reference})}>${this.saving?c(`common.saving`):c(`common.save`)}</button>`}
        </footer>
      </section>
    </openclaw-modal-dialog>`}render(){if(!this.field||!this.descriptor||!this.context)return S;let e=this.inspection,t=this.field.value===`__OPENCLAW_REDACTED__`||e?.kind===`literal`,n=e?.kind===`reference`||an(this.field.value),r=e?.kind===`environment`,i=this.field.disabled||this.saving||!this.context.canInspect||!this.context.gateway.connected||!this.context.baseHash;return D`<div class="plugin-credential">
      ${n||r?D`<div class="plugin-credential__reference">
              <span
                >${r?c(`pluginsPage.credentials.environment`,{name:e.envVar}):c(`pluginsPage.credentials.fromSource`,{source:e?.kind===`reference`?e.ref.source:an(this.field.value)?this.field.value.source:``})}</span
              >
              ${e?.kind===`reference`?D`<code>${e.ref.id}</code>`:S}
              <button
                class="btn btn--sm"
                aria-describedby=${ge(this.field.descriptionId)}
                ?disabled=${this.loading||!e||!this.context.canInspect}
                @click=${()=>this.openReference()}
              >
                ${c(r?`pluginsPage.credentials.viewSource`:`pluginsPage.credentials.editReference`)}
              </button>
            </div>`:D`
              <div
                class="plugin-credential__input"
                @focusout=${e=>{e.relatedTarget instanceof Element&&e.relatedTarget.closest(`.plugin-credential__input`)===e.currentTarget||this.literal&&this.patch(this.literal)}}
              >
                <input
                  class="settings-input"
                  aria-label=${this.descriptor.label}
                  aria-describedby=${ge(this.field.descriptionId)}
                  autocomplete="off"
                  spellcheck="false"
                  type=${this.revealed?`text`:`password`}
                  .value=${this.literal}
                  placeholder=${t?c(`pluginsPage.credentials.stored`):this.descriptor.placeholder??``}
                  ?disabled=${i}
                  @input=${e=>{e.currentTarget instanceof HTMLInputElement&&(this.literal=e.currentTarget.value)}}
                  @keydown=${e=>{e.key===`Enter`&&this.literal&&(e.preventDefault(),this.patch(this.literal))}}
                />
                <button
                  class="btn btn--icon btn--ghost"
                  type="button"
                  aria-label=${c(this.revealed?`pluginsPage.credentials.hide`:`pluginsPage.credentials.reveal`)}
                  aria-pressed=${this.revealed}
                  ?disabled=${i||!this.literal}
                  @click=${()=>{this.revealed=!this.revealed}}
                >
                  ${this.revealed?A.eyeOff:A.eye}
                </button>
              </div>
              <div class="plugin-credential__links">
                ${this.descriptor.signupUrl?D`<a href=${this.descriptor.signupUrl} target="_blank" rel="noopener noreferrer">${c(`pluginsPage.credentials.signup`)}${A.externalLink}</a>`:S}<button
                  class="btn btn--ghost btn--sm"
                  aria-describedby=${ge(this.field.descriptionId)}
                  ?disabled=${i||this.loading||!e||!this.context.canInspect}
                  @click=${()=>this.openReference()}
                >
                  ${c(`pluginsPage.credentials.useReference`)}
                </button>
              </div>
              ${t?D`<small>${c(`pluginsPage.credentials.replace`)}</small>`:S}
            `}
      ${this.loading?D`<span role="status" class="muted">${c(`common.loading`)}</span>`:S}
      ${e?.kind===`invalid`?D`<span role="alert">${c(`pluginsPage.credentials.invalidStored`)}</span>`:S}
      ${!this.dialogOpen&&(this.error||this.context.saveError)?D`<div role="alert">${this.error||this.context.saveError}<button class="btn btn--sm" @click=${()=>this.literal?this.patch(this.literal):this.inspect()}>${c(`common.retry`)}</button></div>`:S}
      ${this.renderDialog()}
    </div>`}},r([O({attribute:!1})],U.prototype,`field`,void 0),r([O({attribute:!1})],U.prototype,`descriptor`,void 0),r([O({attribute:!1})],U.prototype,`context`,void 0),r([T()],U.prototype,`inspection`,void 0),r([T()],U.prototype,`loading`,void 0),r([T()],U.prototype,`error`,void 0),r([T()],U.prototype,`dialogOpen`,void 0),r([T()],U.prototype,`reference`,void 0),r([T()],U.prototype,`literal`,void 0),r([T()],U.prototype,`revealed`,void 0),r([T()],U.prototype,`saving`,void 0),r([T()],U.prototype,`cancelling`,void 0),customElements.define(`openclaw-plugin-credential-editor`,U)})))()}var tr;function nr(){return(nr=e((()=>{er(),tr=class{constructor(e){this.options=e,this.patch=(e,t)=>{if(!this.options.canEdit())return!1;this.options.onEdit();let n=this.options.getContext().runtimeConfig;return t===void 0?n.removeFormValue(e):n.patchForm(e,t),this.options.getDetail()&&this.options.isSettings()&&(this.write=n.flushFormChanges()),!0},this.render=e=>{let t=this.options.getDetail(),n=t?.inspection?.credentials?.find(t=>t.path.length===e.path.length&&t.path.every((t,n)=>t===e.path[n]));if(!t||!n)return;let r=this.options.getContext().runtimeConfig;return Qn(e,n,{pluginId:t.pluginId,baseHash:r.state.configSnapshot?.hash??null,gateway:this.options.gateway,canInspect:this.options.canInspect(),saveError:r.state.lastError,onDiscard:()=>r.discardFormValue(e.path),onCommit:async(t,n)=>{let r=this.write;return e.onPatch(t,n)!==!1&&this.write&&this.write!==r?this.write:!1}})}}}})))()}function rr(e,t){return e.request(`plugins.inspect`,{pluginId:t})}function ir(e){if(e instanceof Te)return pn(e.details)}function ar(){return(ar=e((()=>{hn(),De()})))()}function or(e){if(e instanceof Te)return _n(e.details)}function sr(){return(sr=e((()=>{yn(),De()})))()}function cr(e,t){let n=[...(e.warnings??[]).map(e=>x(e)),t?c(`pluginsPage.configRefreshFailed`,{error:t}):null].filter(Boolean);return n.length?{kind:`warning`,text:n.join(`
`)}:null}function lr(e,t,n,r){return{kind:`success`,text:[c(`pluginsPage.${e}Success`,{name:t,...n.runtime?{generation:String(n.runtime.generation)}:{}}),cr(n,r)?.text].filter(Boolean).join(`
`)}}var ur;function dr(){return(dr=e((()=>{De(),y(),v(),We(),ar(),sr(),Zn(),H(),ur=class{constructor(e){this.host=e,this.consent=null,this.inspection=null,this.inspectionLoading=!1,this.inspectionError=null,this.mutationToken=0,this.mutationTokens=new Map,this.mutationObservers=new Map,this.confirmedInstallScopes=new Map}reset(){this.close(),this.mutationTokens.clear(),this.mutationObservers.clear(),this.confirmedInstallScopes.clear()}reconcileInstallMessages(e){let t={...this.host.getMessages()},n=this.host.getResult();for(let[r,i]of Object.entries(t)){let a=i.savedInstall;if(!a)continue;let o=e?.plugins.some(e=>e.id===a&&e.installed);(o&&r!==V(a)||e&&!o&&n?.plugins.some(e=>e.id===a&&e.installed))&&delete t[r]}return t}async runMutation(e,t,n,r={},i=t=>{this.host.setMessage(e,{kind:`error`,text:b(t)})}){let a=this.host.gateway.capture(),o=r.canDispatch??this.host.canMutate;if(!a||!o()||this.host.isBusy(e)||r.confirm&&(!await r.confirm()||!this.host.gateway.isCurrent(a)||!o()||this.host.isBusy(e)))return;this.host.clearPageNotice();let s=++this.mutationToken;this.mutationTokens.set(e,s);let c=()=>this.host.gateway.isCurrent(a)&&this.mutationTokens.get(e)===s,l=()=>c()&&this.mutationToken===s;this.host.setBusy(e,!0),r.preserveMessageWhilePending||this.host.setMessage(e,null);try{let e=await te(this.host.getContext().runtimeConfig,a.client,t,{canDispatch:()=>c()&&o()});c()&&await n(e.value,e.refreshError,a.client,c,l)}catch(e){c()&&await i(e,a,c)}finally{this.mutationTokens.get(e)===s&&(this.mutationTokens.delete(e),this.host.setBusy(e,!1))}}open(e,t,n){if(!this.host.canMutate())return;let r=this.host.getResult()?.plugins.find(e=>e.id===t);this.host.closeDetails(),this.inspection=null,this.inspectionError=null,this.inspectionLoading=!0,this.consent={intent:e,pluginId:t,fallback:{name:r?.name??t,...r?.version?{version:r.version}:{},...r?.origin===`official`?{official:!0}:{}},...n?{details:n}:{}},this.host.requestUpdate(),this.inspect()}close(){this.consent=null,this.inspection=null,this.inspectionLoading=!1,this.inspectionError=null,this.host.requestUpdate()}cancelMutationObserver(e){this.mutationObservers.delete(e),this.confirmedInstallScopes.delete(e)}async inspect(){let e=this.consent,t=this.host.gateway.capture();if(e?.pluginId&&t){this.inspectionLoading=!0,this.inspectionError=null,this.host.requestUpdate();try{let n=await rr(t.client,e.pluginId);this.host.gateway.isCurrent(t)&&this.consent===e&&(this.inspection=n)}catch(n){this.host.gateway.isCurrent(t)&&this.consent===e&&(this.inspectionError=b(n))}finally{this.host.gateway.isCurrent(t)&&this.consent===e&&(this.inspectionLoading=!1,this.host.requestUpdate())}}}confirm(){let e=this.consent?.intent,t=this.inspection?.reviewToken;e&&!this.inspectionLoading&&!this.inspectionError&&t&&(this.close(),e.kind===`install`?this.install({...e.request,acknowledgeCapabilities:{reviewToken:t}},e.installIdentity):this.mutateInstalledPlugin(e.pluginId,e.kind,e.rowKey,{acknowledgeCapabilities:{reviewToken:t}}))}async install(e,t,n){let r=this.host.getResult()?.plugins.find(t=>t.installed&&(e.source===`official`||e.source===`bundled`?t.id===e.pluginId:e.source===`clawhub`?t.packageName===e.packageName:`expectedPluginId`in e&&t.id===e.expectedPluginId)),a=this.host.getMessages(),o=a[t]??(r?a[V(r.id)]:void 0);if(o?.savedInstall){n?.onFailure?.(o.text,o.savedInstall);return}n&&this.mutationObservers.set(t,n);let s=this.mutationObservers.get(t),l=this.confirmedInstallScopes.get(t);this.confirmedInstallScopes.delete(t);let u=(e.acknowledgeInstallPolicyWarning===!0||e.acknowledgeCapabilities!==void 0)&&l&&this.host.gateway.isCurrent(l);await this.runMutation(t,t=>he(t,e),async(e,n,r,i)=>{let a=V(e.plugin.id);if(this.host.applyMutationResult(e),a!==t&&this.host.setMessage(t,null),this.host.setMessage(a,lr(`installed`,e.plugin.name,e,n)),await this.host.refreshCatalogAfterMutation(r),i()){let r=this.mutationObservers.get(t);this.mutationObservers.delete(t),await r?.onCommitted?.(e,n)}},{confirm:u||s?.reviewConfirmed?void 0:()=>Yn(e),preserveMessageWhilePending:e.acknowledgeInstallPolicyWarning===!0},async(n,r,a)=>{let o=n instanceof Te?i(n.details):void 0,s=i(o?.persistence);if(s?.operation===`install`&&typeof s.pluginId==`string`&&s.pluginId.trim()){let e=s.pluginId,l=V(e),u=i(o?.runtime),d=i(o?.runtimeAttempt)?.phase??u?.phase,f={kind:`error`,savedInstall:e,text:[c(u?.committed===!1?`pluginsPage.installSavedNotApplied`:`pluginsPage.installSaved`,{name:e,error:b(n)}),typeof d==`string`?c(`pluginsPage.runtimeFailurePhase`,{phase:x(d)}):null].filter(Boolean).join(`
`)};if(await this.reconcileCommittedFailure([t,l],f,r.client,a),a()){let n=this.mutationObservers.get(t);this.mutationObservers.delete(t),n?.onFailure?.(f.text,e)}return}let l=ir(n);if(l){this.confirmedInstallScopes.set(t,r),this.open({kind:`install`,request:e,installIdentity:t},l.pluginId,l);return}let u=or(n);if(u){this.confirmedInstallScopes.set(t,r),this.host.setMessage(t,{kind:`warning`,text:u.reason,installPolicyWarning:{details:u,request:e}}),this.mutationObservers.get(t)?.onInstallPolicyWarning?.(e,u);return}let d=b(n);this.host.setMessage(t,{kind:`error`,text:d});let f=this.mutationObservers.get(t);this.mutationObservers.delete(t),f?.onFailure?.(d)})}async reconcileCommittedFailure(e,t,n,r){for(let n of e)this.host.setMessage(n,t);let i=this.host.getContext().runtimeConfig.refresh(),[a]=await Promise.allSettled([i,r()?this.host.refreshCatalogAfterMutation(n):Promise.resolve()]);if(r()&&a.status===`rejected`)for(let n of new Set(e))this.host.getMessages()[n]===t&&this.host.setMessage(n,{...t,text:`${t.text}\n${c(`pluginsPage.configRefreshFailed`,{error:b(a.reason)})}`})}async mutateInstalledPlugin(e,t,n=V(e),r={},a){let o=t===`reload`?V(e):n;a&&this.mutationObservers.set(o,a);let s=this.host.getResult()?.plugins.find(t=>t.id===e)?.name??e,l;await this.runMutation(o,i=>{if(t!==`reload`)return ie(i,e,t===`enable`,r);if(Ke(this.host.getContext().gateway.snapshot,`plugins.reload`)!==!0)throw Error(c(`pluginsPage.reloadUnavailable`));return n!==o&&this.host.setMessage(n,null),i.request(`plugins.reload`,{plugins:[{pluginId:e}],...r})},async(e,n,r,i)=>{if(`plugin`in e&&this.host.applyMutationResult(e),this.host.setMessage(o,lr(t===`reload`?`reloaded`:t===`enable`?`enabled`:`disabled`,`plugin`in e?e.plugin.name:s,e,n)),await this.host.refreshCatalogAfterMutation(r),i()){let t=this.mutationObservers.get(o);this.mutationObservers.delete(o),l=`plugin`in e?()=>t?.onCommitted?.(e,n):t?.onReloaded}},{canDispatch:t===`reload`&&!r.acknowledgeCapabilities?this.host.canReload:void 0,preserveMessageWhilePending:t===`reload`},async(r,a,s)=>{let l=r instanceof Te?i(r.details):void 0,u=i(l?.runtime),d=ir(r);if(t!==`disable`&&u?.committed!==!0&&d&&this.host.canMutate()){this.open({kind:t,pluginId:e,rowKey:n},d.pluginId,d);return}let f=i(l?.runtimeAttempt)?.phase??u?.phase,p=this.host.getMessages()[o]?.savedInstall,m={kind:`error`,...p?{savedInstall:p}:{},text:[b(r),typeof f==`string`?c(`pluginsPage.runtimeFailurePhase`,{phase:x(f)}):null].filter(Boolean).join(`
`)};if(u?.committed===!0?await this.reconcileCommittedFailure([o],m,a.client,s):this.host.setMessage(o,m),s()){let e=this.mutationObservers.get(o);this.mutationObservers.delete(o),e?.onFailure?.(m.text,p)}}),await l?.()}}})))()}async function fr(e){let{plugin:t,client:n}=e,r=e.detail,i=t=>{e.isCurrent()&&(r=t,e.onChange(t))},a=e.includeTools?n.request(`tools.catalog`,{includePlugins:!0}).catch(()=>void 0):Promise.resolve(void 0);try{let o=await rr(n,t.id);if(!e.isCurrent())return;if(i({pluginId:t.id,inspection:o,error:null}),a.then(e=>{if(!e)return;let n=new Map(o.declared.tools.map(e=>[e,{name:e}]));for(let r of e.groups.filter(e=>e.pluginId===t.id))for(let e of r.tools)n.set(e.id,{name:e.id,description:e.fullDescription??e.description});i({...r,tools:[...n.values()]})}),e.catalog?.plugin.local.pluginId===t.id){i({...r,inspection:{...o,catalog:e.catalog}});return}if(!t.catalogId)return;try{let e=await ne(n,t.catalogId,void 0,t.version);i({...r,inspection:{...o,catalog:e}})}catch{}}catch(e){i({...r,error:b(e)})}}function pr(){return(pr=e((()=>{v(),ar()})))()}var mr;function hr(){return(hr=e((()=>{Le(),bt(),mr=class{constructor(e){this.authCandidates=[];let t={getFetchContext:()=>{let t=e.getContext();return{resourceBasePath:t.resourceBasePath,gatewayUrl:t.gateway.connection.gatewayUrl,auth:{hello:t.gateway.snapshot.hello,settings:{token:t.gateway.connection.token},password:t.gateway.connection.password}}},isConnected:e.isConnected};this.installed=new vt({...t,onUrlsChange:e.onInstalledUrlsChange}),this.catalog=new vt({kind:`catalog`,...t,onUrlsChange:e.onCatalogUrlsChange})}updateAuth(e){let t=Ne(e),n=t.length!==this.authCandidates.length||t.some((e,t)=>e!==this.authCandidates[t]);return this.authCandidates=t,n}syncInstalled(e,t){let n=new Set;for(let e of t.querySelectorAll(`[data-plugin-icon-id]`)){let t=e.dataset.pluginIconId;t&&n.add(t)}this.installed.sync(e,n)}reconcileInstalled(e){this.installed.reconcile(e)}invalidateInstalled(e){this.installed.invalidate(e)}handleInstalledError(e){this.installed.handleError(e)}syncCatalog(e,t){this.catalog.syncCatalog([...e.result?.items??[],...e.featured,...e.trending,...t?[t.plugin]:[]],t?.detail.author?.imageUrl?[t.detail.author.imageUrl]:[])}resetInstalled(){this.installed.reset()}reset(){this.installed.reset(),this.catalog.reset()}}})))()}function gr(e,t){if(!e)return e;let n=e.plugins.findIndex(e=>e.id===t.id),r=[...e.plugins];return n>=0?r[n]=t:r.push(t),{...e,plugins:r}}function _r(e){return e.connected?e.hasAdminAccess?e.mutationAllowed===!1?c(`pluginsPage.changesDisabled`):null:c(`pluginsPage.adminRequired`):c(`pluginsPage.connectToChange`)}function vr(){return(vr=e((()=>{y(),N(),P()})))()}function W(e,t){return e?D`<openclaw-tooltip open-on-click .content=${e}>${t}</openclaw-tooltip>`:t}function G(){return(G=e((()=>{C(),He()})))()}function yr(e){return D`<nav class="plugins-settings-breadcrumb" aria-label=${c(`pluginsPage.breadcrumb`)}>
    <a
      class="plugins-settings-breadcrumb__parent"
      href=${e.backHref}
      @click=${t=>{f(t)&&(t.preventDefault(),e.onBack())}}
      >${e.backLabel}</a
    >
    <span class="plugins-settings-breadcrumb__chevron" aria-hidden="true"
      >${A.chevronRight}</span
    >
    <span class="plugins-settings-breadcrumb__current" aria-current="page">${e.name}</span>
  </nav>`}function br(e){let t=`${e.id}-title`;return D`<section
    class="plugin-catalog-detail ${e.sidebar?``:`plugin-catalog-detail--no-sidebar`}"
    aria-labelledby=${t}
  >
    ${yr(e)}
    <div class="plugin-catalog-detail__hero">
      ${e.icon?D`<div class="plugin-catalog-detail__icon" aria-hidden="true">${e.icon}</div>`:S}
      <main>
        <div class="plugin-catalog-detail__title-row">
          <h1 id=${t}>${e.name}</h1>
        </div>
        ${e.identity}
        ${e.summary?D`<p class="plugin-catalog-detail__summary">${e.summary}</p>`:S}
        <div class="plugin-catalog-detail__actions">${e.titleAction??S}</div>
      </main>
    </div>
    <div class="plugin-catalog-detail__content">
      <section class="plugin-catalog-detail__panel">${e.panel}</section>
      ${e.sidebar?D`<aside class="plugin-catalog-detail__sidebar">${e.sidebar}</aside>`:S}
      ${e.readme?D`<section class="plugin-catalog-detail__readme-section">
              <h2>${c(`pluginsPage.detailTabs.readme`)}</h2>
              ${e.readme}
            </section>`:S}
    </div>
  </section>`}function xr(){return(xr=e((()=>{C(),k(),y(),N(),P()})))()}function Sr(e){return e&&Mr[e]||A.box}function Cr(e,t){let n=Tt({pluginId:e.local.pluginId,imageUrl:e.catalog.imageUrl},t);return D`${Dt(n,(t,n)=>t?D`<img
          class="plugins-icon"
          src=${t}
          alt=""
          loading="lazy"
          decoding="async"
          @error=${n}
        />`:Sr(e.catalog.icon))}`}function wr(e){if(e<1e3)return new Intl.NumberFormat().format(e);if(e<1e6){let t=e/1e3;return`${t>=100?Math.round(t):Number(t.toFixed(1))}k`}let t=e/1e6;return`${t>=100?Math.round(t):Number(t.toFixed(1))}m`}function Tr(e,t){let n=e.local.state===`not-installed`?null:e.local.state,r=e.local.installed&&n!==null,i=t.canInstall&&e.local.action===`install`;return D`<article
    class="plugin-catalog-card oc-card oc-card-interactive"
    data-plugin-id=${e.id}
  >
    <a
      class="plugin-catalog-card__primary-link"
      href=${t.entryHref(e.id)}
      aria-label=${e.catalog.name}
      @click=${n=>{f(n)&&(n.preventDefault(),t.onOpenEntry(e.id))}}
    ></a>
    <div class="plugin-catalog-card__head">
      <div class="installed-plugins-card__head">
        <span
          class="installed-plugins-card__art plugin-catalog-card__art"
          aria-hidden="true"
          data-plugin-icon-id=${e.local.pluginId??S}
        >
          ${Cr(e,t)}
        </span>
        ${_t({name:e.catalog.name,attribution:{...e.catalog.author?{author:e.catalog.author}:{},official:e.catalog.official},linkedAuthor:!0})}
      </div>
      <div class="plugin-catalog-card__action">
        ${r?St(n,`plugin-catalog-card__status`):D`<button
                type="button"
                class="btn btn--sm plugin-catalog-card__install oc-action oc-action-secondary"
                aria-label=${c(`pluginsPage.installNamed`,{name:e.catalog.name})}
                ?disabled=${!i}
                @click=${n=>{n.preventDefault(),n.stopPropagation(),i&&t.onInstall(e.id)}}
              >
                ${c(`pluginsPage.install`)}
              </button>`}
      </div>
    </div>
    ${wt(e.catalog.summary||c(`pluginsPage.optionalCapability`))}
  </article>`}function Er(e){return D`<div
    class="plugin-catalog-grid plugin-catalog-grid--skeleton"
    role="status"
    aria-busy="true"
    aria-label=${e.label??c(`common.loading`)}
  >
    ${Array.from({length:e.cards},()=>D`<div
        class="plugin-catalog-card oc-card plugin-catalog-card--skeleton"
        aria-hidden="true"
      >
        <div class="plugin-catalog-card__head">
          <div class="installed-plugins-card__head">
            <span class="skeleton plugin-catalog-card__skeleton-art"></span>
            <div class="installed-plugins-card__identity">
              <span class="skeleton plugin-catalog-card__skeleton-title"></span>
            </div>
          </div>
          <div class="plugin-catalog-card__action">
            <span class="skeleton plugin-catalog-card__skeleton-action"></span>
          </div>
        </div>
        <span class="plugin-catalog-card__skeleton-summary">
          <span class="skeleton plugin-catalog-card__skeleton-line"></span>
          <span class="skeleton plugin-catalog-card__skeleton-line"></span>
        </span>
      </div>`)}
  </div>`}function Dr(e,t){return D`<div class="callout danger oc-banner oc-banner-error" role="alert">
    <span>${x(e)}</span>
    <button
      type="button"
      class="btn btn--sm oc-action oc-action-secondary oc-banner-action"
      @click=${t}
    >
      ${c(`pluginsPage.tryAgain`)}
    </button>
  </div>`}function K(e){return!e.loading&&!e.error&&e.items.length===0?S:D`<section
    class="plugin-catalog-section ${e.onViewAll?`plugin-catalog-section--expandable`:``}"
    data-catalog-section=${e.id}
  >
    <header class="plugin-catalog-section__header">
      <h2>${e.title}</h2>
      ${e.onViewAll?D`<button
              type="button"
              class="btn btn--sm plugin-catalog-section__view-all oc-action oc-action-ghost"
              @click=${e.onViewAll}
            >
              ${c(`pluginsPage.viewAllInstalledPlugins`)}
            </button>`:S}
    </header>
    ${e.loading?Er({cards:q}):e.error&&e.onRetry?Dr(e.error,e.onRetry):D`<div class="plugin-catalog-grid">
              ${w(e.onViewAll?e.items.slice(0,q):e.items,e=>e.id,t=>Tr(t,e.props))}
            </div>`}
  </section>`}function Or(e){let t=e.intent===`all`&&e.category===null;return D`<div class="plugin-catalog-chips" aria-label=${c(`pluginsPage.categoriesLabel`)}>
    <button
      type="button"
      class="plugin-catalog-chip ${t?`is-active`:``}"
      aria-pressed=${t}
      @click=${()=>e.onIntentChange(`all`)}
    >
      <span aria-hidden="true">${A.layoutGrid}</span>${c(`pluginsPage.intentAll`)}
    </button>
    <button
      type="button"
      class="plugin-catalog-chip ${e.intent===`featured`?`is-active`:``}"
      aria-pressed=${e.intent===`featured`}
      @click=${()=>e.onIntentChange(`featured`)}
    >
      <span aria-hidden="true">${A.star}</span>${c(`pluginsPage.featuredTitle`)}
    </button>
    <button
      type="button"
      class="plugin-catalog-chip ${e.intent===`trending`?`is-active`:``}"
      aria-pressed=${e.intent===`trending`}
      @click=${()=>e.onIntentChange(`trending`)}
    >
      <span aria-hidden="true">${A.barChart}</span>${c(`pluginsPage.intentTrending`)}
    </button>
    ${w(e.categories.toSorted((e,t)=>e.order-t.order),e=>e.slug,t=>D`<button
        type="button"
        class="plugin-catalog-chip ${e.category===t.slug?`is-active`:``}"
        aria-pressed=${e.category===t.slug}
        @click=${()=>e.onCategoryChange(t.slug)}
      >
        <span aria-hidden="true">${Sr(t.icon)}</span>${t.label}
      </button>`)}
  </div>`}function kr(e){let t=e.result?.items??[];if(e.loading)return Er({label:c(`pluginsPage.loadingDiscovery`),cards:q});if(e.error)return Dr(e.error,e.onRetry);if(!e.connected)return D`<p class="plugin-catalog-results__empty">${c(`pluginsPage.discoveryOffline`)}</p>`;if(t.length===0)return D`<p class="plugin-catalog-results__empty">
      ${c(`pluginsPage.noDiscoveryResults`)}
    </p>`;let n=t.filter(e=>e.catalog.official),r=t.filter(e=>!e.catalog.official);return D`
    ${e.query.trim()&&n.length>0&&r.length>0?D`
            ${K({id:`official`,title:c(`pluginsPage.official`),items:n,props:e})}
            ${K({id:`community`,title:c(`pluginsPage.community`),items:r,props:e})}
          `:D`<div class="plugin-catalog-grid plugin-catalog-grid--results">
            ${w(t,e=>e.id,t=>Tr(t,e))}
          </div>`}
    ${e.loadMoreError?Dr(e.loadMoreError,e.onLoadMore):S}
    ${e.result?.nextCursor?D`<div class="plugin-catalog-load-more">
            <button
              type="button"
              class="btn btn--sm oc-action oc-action-secondary"
              ?disabled=${e.loadingMore}
              @click=${e.onLoadMore}
            >
              ${e.loadingMore?c(`pluginsPage.loadingMore`):c(`pluginsPage.loadMore`)}
            </button>
          </div>`:S}
  `}function Ar(e){let t=e.result?.items??[],n=e.categories.toSorted((e,t)=>e.order-t.order),r=new Set(n.map(e=>e.slug)),i=t.filter(e=>!e.catalog.categories.some(e=>r.has(e)));return!(e.featured.length>0||e.trending.length>0||t.length>0)&&!e.loading&&!e.featuredLoading&&!e.trendingLoading&&!e.error&&!e.remoteError?D`<p class="plugin-catalog-results__empty">
      ${c(`pluginsPage.noDiscoveryResults`)}
    </p>`:D`
    ${e.error?Dr(e.error,e.onRetry):S}
    ${K({id:`featured`,title:c(`pluginsPage.featuredTitle`),items:e.featured,loading:e.featuredLoading,onViewAll:()=>e.onIntentChange(`featured`),props:e})}
    ${K({id:`trending`,title:c(`pluginsPage.intentTrending`),items:e.trending,loading:e.trendingLoading,onViewAll:()=>e.onIntentChange(`trending`),props:e})}
    ${w(n,e=>e.slug,n=>K({id:n.slug,title:n.label,items:t.filter(e=>e.catalog.categories.includes(n.slug)),onViewAll:()=>e.onCategoryChange(n.slug),props:e}))}
    ${K({id:`uncategorized`,title:c(`pluginsPage.categoryUncategorized`),items:i,props:e})}
  `}function jr(e){let t=!e.query.trim()&&e.intent===`all`&&e.category===null;return D`<section class="plugin-catalog-results" aria-label=${c(`pluginsPage.exploreTitle`)}>
    <label class="plugin-catalog-search">
      <span aria-hidden="true">${A.search}</span>
      <input
        type="search"
        class="oc-input"
        autofocus
        aria-label=${c(`pluginsPage.searchPlugins`)}
        placeholder=${c(`pluginsPage.searchPlugins`)}
        .value=${e.query}
        ${Ce(e=>{e instanceof HTMLInputElement&&!e.dataset.autofocused&&(e.dataset.autofocused=`true`,e.focus(),requestAnimationFrame(()=>requestAnimationFrame(()=>{e.isConnected&&e.focus()})))})}
        @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onQueryChange(t.currentTarget.value)}}
      />
    </label>
    ${Or(e)}
    ${e.remoteError?D`<div class="callout warning oc-banner" role="status">
            <span>${x(e.remoteError)}</span>
            <button
              type="button"
              class="btn btn--sm oc-action oc-action-secondary oc-banner-action"
              @click=${e.onRetry}
            >
              ${c(`pluginsPage.tryAgain`)}
            </button>
          </div>`:S}
    <div class="plugin-catalog-results__body">
      ${t?Ar(e):kr(e)}
    </div>
  </section>`}var q,Mr;function Nr(){return(Nr=e((()=>{C(),Se(),be(),Ee(),k(),Et(),y(),v(),xt(),yt(),q=8,Mr={activity:A.activity,"book-open":A.book,brain:A.brain,bot:A.bot,database:M(E` <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />`),"git-branch":A.gitPullRequest,globe:A.globe,"message-circle":A.messageSquare,"message-square":A.messageSquare,package:A.box,palette:A.palette,shield:A.shield,wrench:A.settings,plug:A.plug,"code-xml":M(E` <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />`),server:A.server,files:M(E` <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
    <path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" />
    <path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" />`),inbox:A.inbox,"list-todo":M(E` <path d="M13 5h8" />
    <path d="M13 12h8" />
    <path d="M13 19h8" />
    <path d="m3 17 2 2 4-4" />
    <rect x="3" y="4" width="6" height="6" rx="1" />`),"calendar-days":M(E` <path d="M8 2v3" />
    <path d="M16 2v3" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 13h.01" />
    <path d="M12 13h.01" />
    <path d="M16 13h.01" />
    <path d="M8 17h.01" />
    <path d="M12 17h.01" />
    <path d="M16 17h.01" />`),"wallet-cards":M(E` <path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21" />
    <path d="M3 7h18" />
    <rect x="3" y="3" width="18" height="18" rx="2" />`),megaphone:M(E` <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
    <path d="M8 6v8" />`),"chart-no-axes-combined":M(E` <path d="M12 16v5" />
    <path d="M16 14.639V21" />
    <path d="M20 10.656V21" />
    <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
    <path d="M4 18.463V21" />
    <path d="M8 14.656V21" />`),workflow:M(E` <rect width="8" height="8" x="3" y="3" rx="2" />
    <path d="M7 11v4a2 2 0 0 0 2 2h4" />
    <rect width="8" height="8" x="13" y="13" rx="2" />`),search:A.search}})))()}function Pr(e){return/^(?:clean|pass|safe|benign|cleared)$/iu.test(e)?`Clean`:/^(?:suspicious|warning|review)$/iu.test(e)?`Review`:e}function Fr(e){return/^(?:clean|pass|safe|benign|cleared)$/iu.test(e)?`pass`:/^(?:suspicious|warning|review)$/iu.test(e)?`warning`:/^(?:blocked|danger|fail|malicious)$/iu.test(e)?`danger`:`unknown`}function Ir(e,t){let n=Fr(e),r={pass:3,warning:2,danger:1,unknown:0}[n];return D`<a
    class="plugin-catalog-detail__security plugin-catalog-detail__security--${n}"
    href=${t??S}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h2>
      ${c(`pluginsPage.detailSecurity`)}
      <span title=${c(`pluginsPage.detailSecurityAudit`)}>${A.info}</span>
    </h2>
    <div class="plugin-catalog-detail__security-score">
      <strong>${Pr(e)}</strong>
      ${[0,1,2].map(e=>D`<span class=${e<r?`is-filled`:``} aria-hidden="true"></span>`)}
    </div>
  </a>`}function Lr(){return(Lr=e((()=>{C(),k(),y(),N(),P()})))()}function Rr(e){if(!e)return null;try{let t=new URL(e);return/^https?:$/u.test(t.protocol)&&!t.username&&!t.password?t:null}catch{return null}}function zr(e){if(!e)return null;let t=Rr(/^[\w.-]+\/[\w.-]+$/u.test(e)?`https://github.com/${e}`:e.replace(/^git\+/u,``));if(!t)return null;let n=t.hostname===`github.com`,[r,i]=t.pathname.split(`/`).filter(Boolean);if(n&&r&&i){let e=`${r}/${i.replace(/\.git$/u,``)}`;return{href:`https://github.com/${e}`,name:e,github:n}}return{href:t.href,name:t.hostname+t.pathname.replace(/\/$/u,``),github:n}}function Br(e,t){let n=e?.detail.author,r=n?.handle??e?.plugin.catalog.author;return D`<div class="plugin-catalog-detail__publisher">
    ${n?.displayName||t?D`<strong>${n?.displayName??t}</strong>`:S}
    ${n?.official===!0?gt():S}
    ${r?ht(r,{linked:!0}):S}
  </div>`}function Vr(e,t,n){let r=e?.detail,i=e?.plugin.catalog,a=zr(n?.repositoryUrl??r?.repositoryUrl??r?.verification?.sourceRepo),o=Rr(n?.documentationUrl??r?.documentationUrl),s=[[c(`pluginsPage.catalogDownloadsColumn`),i?.downloads===void 0?void 0:wr(i.downloads)],[c(`pluginsPage.detailPublished`),r?.createdAt===void 0?void 0:de(r.createdAt,{dateStyle:`medium`})],[c(t?`pluginsPage.detailInstalledVersion`:`pluginsPage.version`),t??i?.latestVersion],[c(`pluginsPage.detailUpdated`),r?.updatedAt===void 0?void 0:de(r.updatedAt,{dateStyle:`medium`})]],l=i?.categories??[];return D`
    ${r?.security?Ir(r.security.verdict??`unknown`,r.security.auditUrl):S}
    ${s.some(([,e])=>e!==void 0)?D`<dl class="plugin-metadata__facts">
            ${s.filter(([,e])=>e!==void 0).map(([e,t])=>D`<div>
                    <dt>${e}</dt>
                    <dd>${t}</dd>
                  </div>`)}
          </dl>`:S}
    ${l.length?D`<section class="plugin-metadata__section">
            <h2>${c(`pluginsPage.detailCategories`)}</h2>
            <div class="plugin-metadata__categories">
              ${l.map(e=>D`<span class="plugin-catalog-detail__tag">${e}</span>`)}
            </div>
          </section>`:S}
    ${a?D`<section class="plugin-metadata__section">
            <h2>${c(`pluginsPage.detailRepository`)}</h2>
            <a
              class="plugin-metadata__repository"
              href=${a.href}
              target="_blank"
              rel="noopener noreferrer"
              >${a.github?A.github:A.externalLink}<span
                >${a.name}</span
              ></a
            >
          </section>`:S}
    ${o?D`<section class="plugin-metadata__section">
            <h2>${c(`pluginsPage.detailDocumentation`)}</h2>
            <a href=${o.href} target="_blank" rel="noopener noreferrer"
              >${c(`pluginsPage.detailDocumentation`)} ${A.arrowUpRight}</a
            >
          </section>`:S}
  `}function J(e,t,n,r){return D`${t.length?D`<section class="plugin-capabilities">
          <h2>${e}<span>${t.length}</span></h2>
          <div>
            ${t.map(e=>{let t=D`<span class="plugin-capability__icon" aria-hidden="true"
                  >${n}</span
                ><span class="plugin-capability__copy"
                  ><strong>${e.name}</strong
                  >${e.description?D`<span>${e.description}</span>`:S}</span
                >${r?A.chevronRight:S}`;return D`<div class="plugin-capability">
                ${r?D`<button type="button" @click=${()=>r(e.name)}>${t}</button>`:D`<div class="plugin-capability__static">${t}</div>`}
              </div>`})}
          </div>
        </section>`:S}`}function Hr(e){return e?D`<button type="button" class="btn oc-action oc-action-secondary" @click=${e}>
        ${c(`nav.askOpenClaw`)}
      </button>`:S}function Y(){return(Y=e((()=>{C(),k(),y(),fe(),Nr(),xt(),Lr()})))()}function Ur(e){let t=e?tt(e,{mode:`document`}).replaceAll(`<h1`,`<h2`).replaceAll(`</h1>`,`</h2>`):null;return e?D`<article
        class="plugin-catalog-detail__readme sidebar-markdown"
        @click=${$e}
      >
        ${ye(t)}
      </article>`:D`<p class="plugin-catalog-detail__empty">${c(`pluginsPage.detailNoReadme`)}</p>`}function Wr(e,t){let{plugin:n,detail:r}=e,i=n.catalog.imageUrl?t.iconUrls[n.catalog.imageUrl]:void 0;return br({id:`plugin-catalog-detail`,name:n.catalog.name,summary:n.catalog.summary,backHref:t.backHref,backLabel:c(`tabs.plugins`),onBack:t.onBack,icon:D`${Dt(i,(e,t)=>e?D`<img src=${e} alt="" @error=${t} />`:A.box)}`,titleAction:D`${n.local.action===`install`?W(t.installBlockedReason,D`<button
              type="button"
              class="btn primary oc-action oc-action-primary plugin-catalog-detail__install"
              ?disabled=${!t.installBlockedReason&&!t.canInstall}
              aria-disabled=${t.canInstall?S:`true`}
              @click=${()=>{t.canInstall&&t.onInstall()}}
            >
              ${c(`pluginsPage.install`)}
            </button>`):S}${Hr(t.onAskPlugin)}`,identity:Br(e),sidebar:Vr(e),panel:D`${t.skillsSection??J(c(`pluginsPage.detailTabs.skills`),r.skills,A.book)}
    ${J(c(`pluginsPage.detailMcpServers`),r.mcpServers.map(e=>({name:e})),A.plug)}`,readme:r.readme?Ur(r.readme):void 0})}function Gr(e){return I(e.error?D`<div class="callout danger oc-banner oc-banner-error" role="alert">
          <span>${x(e.error)}</span>
          <button type="button" class="btn btn--sm" @click=${e.onRetry}>
            ${c(`pluginsPage.tryAgain`)}
          </button>
        </div>`:e.connected?e.result?Wr(e.result,e):D`<section
              class="plugin-catalog-detail plugin-catalog-detail--loading"
              aria-label=${c(`pluginsPage.detailLoading`)}
            >
              <div class="plugin-catalog-detail__back skeleton"></div>
              <div class="plugin-catalog-detail__hero">
                <div class="plugin-catalog-detail__icon skeleton"></div>
                <div>
                  <div class="plugin-catalog-detail__loading-title skeleton"></div>
                  <div class="plugin-catalog-detail__loading-publisher skeleton"></div>
                  <div class="plugin-catalog-detail__loading-summary skeleton"></div>
                </div>
              </div>
              <div class="plugin-catalog-detail__content">
                <div class="plugin-catalog-detail__panel" aria-hidden="true">
                  <div class="plugin-catalog-detail__loading-card skeleton"></div>
                  <div class="plugin-catalog-detail__loading-card skeleton"></div>
                </div>
              </div>
            </section>`:D`<p class="plugin-catalog-detail__empty">${c(`pluginsPage.discoveryOffline`)}</p>`,{wide:!0,carapace:!0})}function Kr(){return(Kr=e((()=>{C(),xe(),k(),Et(),ot(),et(),G(),R(),y(),v(),xr(),Y()})))()}var qr,Jr;function Yr(){return(Yr=e((()=>{ee(),qr={pluginConsent:{widenedTitle:`What changed`,widenedDescription:`New since your last acceptance.`,previouslyAccepted:`Previously accepted {date}.`,declaredTitle:`Declared capabilities`,declaredDescription:`From the plugin manifest. OpenClaw validates the plugin against these declarations when it loads.`,declaredEmpty:`No channels, providers, or tools declared in the manifest.`,contracts:`Contracts`,hooks:`Hooks`,runtimeHooks:`Code plugins may register hooks at runtime; their hook names are not declared in the manifest.`,mcpServers:`MCP servers`,cliCommands:`CLI commands`,cliBackends:`CLI backends`,skills:`Skills`,dangerousFlags:`Dangerous config flags`,grantsTitle:`Your grants`,grantsDescription:`Set per plugin in plugins.entries.{id}. Hooks outside these grants are blocked at load.`,promptInjection:`Prompt injection`,conversationAccess:`Conversation access`,allowed:`Allowed`,blocked:`Blocked`,on:`On`,off:`Off`,grantDefault:`(default)`,grantConfigured:`(set in config)`,externalAccessHint:`Off by default for external plugins.`,modelOverrides:`Model overrides`,subagentModelOverrides:`Subagent model overrides`,modelOverride:`Model override: {value}`,allowedModels:`Allowed models: {models}`,allowedCompletionModels:`Completion models: {models}`,authProfileOverride:`Auth profile override: {value}`,agentIdOverride:`Agent ID override: {value}`,noOverrides:`No overrides configured`,loading:`Loading capability details…`,fallback:`Capability details must be available before you can approve this plugin.`,verifiedClean:`Verified clean`,reviewRecommended:`Review recommended`,reviewRequired:`Review required`,trustBlocked:`Blocked`,scanDate:`Scanned {date}`,integrity:`Integrity`,sha256:`SHA-256`,commit:`Commit`,pinnedArtifact:`Pinned to the exact installed artifact.`,sourceClawHub:`ClawHub`,sourceNpm:`npm`,sourceGit:`Git`,sourcePath:`Local path`,sourceArchive:`Archive`,sourceMarketplace:`Marketplace`,community:`Community`,enableNamed:`Enable {name}`,installPolicy:{technicalDetails:`Technical details`,severity:{info:`Info`,warn:`Warning`,critical:`Critical`},policyScope:`Continuing approves every install-policy warning encountered during this install. Each warning is checked again before installation continues.`}}},Jr=Object.assign(()=>{p.pluginConsent=qr.pluginConsent},{catalog:qr})})))()}function Xr(e,t,n,r,i=`plugins-tile`){return D`${Dt(n,(n,a)=>{if(n)return D`<span class=${i} data-plugin-icon-id=${e}>
        <img
          class="plugins-icon"
          src=${n}
          alt=""
          loading="lazy"
          decoding="async"
          @error=${()=>{a(),r?.()}}
        />
      </span>`;let[o,s]=mt(e),c=Ct(t);return D`<span
      class=${`${i} ${i}--fallback`}
      data-plugin-icon-id=${e}
      style=${`--plugins-art-a:${o};--plugins-art-b:${s}`}
      aria-hidden="true"
    >
      ${c?D`<span>${c}</span>`:A.plug}
    </span>`})}`}function X(e,t,n=!1){return D`
    <div class="plugins-detail__meta-row ${n?`plugins-consent__row--warning`:``}">
      <span class="plugins-detail__meta-label">${e}</span>
      <span class="plugins-detail__meta-value">${t}</span>
    </div>
  `}function Zr(e){return D`<span class="plugins-consent__items">${e.join(`, `)}</span>`}function Qr(e,t=!1){return ln.flatMap(n=>{let r=e[n];return r?.length&&(t||n!==`dangerousConfigFlags`)?[X(c(li[n]),Zr(r),t)]:[]})}function $r(e){let t=Qr(e);return D`
    <section class="plugins-consent__section oc-section">
      <h3>${c(`pluginConsent.declaredTitle`)}</h3>
      <p class="plugins-consent__description">${c(`pluginConsent.declaredDescription`)}</p>
      ${t.length>0?D`<div class="plugins-consent__rows">${t}</div>`:D`<p class="plugins-consent__hint">${c(`pluginConsent.declaredEmpty`)}</p>`}
      ${e.hooks.length===0?X(c(`pluginConsent.hooks`),c(`pluginConsent.runtimeHooks`)):S}
      ${e.dangerousConfigFlags.length>0?X(c(`pluginConsent.dangerousFlags`),Zr(e.dangerousConfigFlags),!0):S}
    </section>
  `}function ei(e){if(!e.widened)return S;let t=Qr(e.widened,!0);return t.length===0?S:D`
    <section class="plugins-consent__section oc-section">
      <h3>${c(`pluginConsent.widenedTitle`)}</h3>
      <p class="plugins-consent__description">
        ${c(`pluginConsent.widenedDescription`)}
        ${e.acceptedAt?c(`pluginConsent.previouslyAccepted`,{date:e.acceptedAt}):S}
      </p>
      <div class="plugins-consent__rows">${t}</div>
    </section>
  `}function ti(e,t,n){return`${c(e.effective?t:n)} ${c(e.configured===void 0?`pluginConsent.grantDefault`:`pluginConsent.grantConfigured`)}`}function ni(e,t){return t===void 0?void 0:c(e,{value:c(t?`pluginConsent.allowed`:`pluginConsent.blocked`)})}function ri(e){return[ni(`pluginConsent.modelOverride`,e.allowModelOverride),e.allowedModels?.length?c(`pluginConsent.allowedModels`,{models:e.allowedModels.join(`, `)}):void 0,`allowedCompletionModels`in e&&e.allowedCompletionModels?.length?c(`pluginConsent.allowedCompletionModels`,{models:e.allowedCompletionModels.join(`, `)}):void 0,`allowAuthProfileOverride`in e?ni(`pluginConsent.authProfileOverride`,e.allowAuthProfileOverride):void 0,`allowAgentIdOverride`in e?ni(`pluginConsent.agentIdOverride`,e.allowAgentIdOverride):void 0].filter(Boolean).join(` · `)||c(`pluginConsent.noOverrides`)}function ii(e,t){let n=e.hooks.allowConversationAccess;return D`
    <section class="plugins-consent__section oc-section">
      <h3>${c(`pluginConsent.grantsTitle`)}</h3>
      <p class="plugins-consent__description">${c(`pluginConsent.grantsDescription`)}</p>
      <div class="plugins-consent__rows">
        ${X(c(`pluginConsent.promptInjection`),ti(e.hooks.allowPromptInjection,`pluginConsent.allowed`,`pluginConsent.blocked`))}
        ${X(c(`pluginConsent.conversationAccess`),D`
            ${ti(n,`pluginConsent.on`,`pluginConsent.off`)}
            ${!n.effective&&n.configured===void 0&&t!==`bundled`?D`<span class="plugins-consent__hint">
                    ${c(`pluginConsent.externalAccessHint`)}
                  </span>`:S}
          `)}
        ${e.llm?X(c(`pluginConsent.modelOverrides`),ri(e.llm)):S}
        ${e.subagent?X(c(`pluginConsent.subagentModelOverrides`),ri(e.subagent)):S}
      </div>
    </section>
  `}function ai(e,t){if(t)return c(`pluginsPage.official`);let n=e&&Object.hasOwn(di,e)?di[e]:void 0;return n?c(n):e??(t===!1?c(`pluginConsent.community`):null)}function oi(e){if(!e)return S;let t=e.integrityKind===`sha256`?c(`pluginConsent.sha256`):e.integrityKind===`git-commit`?c(`pluginConsent.commit`):c(`pluginConsent.integrity`);return D`
    <div class="plugins-consent__provenance">
      <span
        >${[c(ui[e.kind]),e.spec??e.packageName].filter(Boolean).join(` · `)}</span
      >
      ${e.integrity?D`<span title=${e.integrity}>
              ${t}: <code>${e.integrity.slice(0,20)}…</code>
            </span>`:S}
    </div>
    ${e.integrity?D`<p class="plugins-consent__hint">${c(`pluginConsent.pinnedArtifact`)}</p>`:S}
  `}function si(e){if(!e)return S;let t=c(e.disposition===`clean`?`pluginConsent.verifiedClean`:e.disposition===`review-recommended`?`pluginConsent.reviewRecommended`:e.disposition===`review-required`?`pluginConsent.reviewRequired`:`pluginConsent.trustBlocked`),n=e.disposition===`clean`?`ok`:e.disposition===`blocked`?`danger`:`warn`;return D`
    <section class="plugins-consent__trust">
      ${F({kind:n,label:t,carapace:!0})}
      ${e.reasons?.length?D`<ul>
              ${e.reasons.map(e=>D`<li>${e}</li>`)}
            </ul>`:S}
      ${e.checkedAt?D`<p class="plugins-consent__hint">
              ${c(`pluginConsent.scanDate`,{date:e.checkedAt})}
            </p>`:S}
    </section>
  `}function ci(e){let{consent:t,inspection:n}=e,r=t.details,i=n?.plugin,a=t.fallback,o=n?.source?.packageName??(t.intent.kind===`install`&&t.intent.request.source===`clawhub`?t.intent.request.packageName:null),s=t.pluginId??o??a?.name??`plugin`,l=i?.name??a?.name??s,u=i?.version??a?.version,d=[ai(i?.origin,a?.official),o].filter(Boolean).join(` · `),f=t.intent.kind===`install`?e.busy?c(`pluginsPage.installing`):c(`pluginsPage.installNamed`,{name:l}):e.busy?c(`pluginsPage.working`):t.intent.kind===`reload`?c(`pluginsPage.reloadNamed`,{name:l}):c(`pluginConsent.enableNamed`,{name:l}),p=!e.canMutate||e.busy||e.loading||!!e.error||!n,m=D`
    <button
      type="button"
      class="btn primary oc-action oc-action-primary"
      ?disabled=${p&&!e.mutationBlockedReason}
      aria-disabled=${e.canMutate?S:`true`}
      @click=${()=>{p||e.onConfirm()}}
    >
      ${f}
    </button>
  `;return D`
    <openclaw-modal-dialog
      label=${l}
      style="--openclaw-modal-width: min(560px, calc(100vw - 32px));"
      @modal-cancel=${e.onCancel}
    >
      <section class="plugins-consent oc-card" data-plugin-consent=${t.intent.kind}>
        <header class="plugins-consent__header">
          ${Xr(s,l,e.iconUrl)}
          <div>
            <div class="plugins-detail__title">
              <h2>${l}</h2>
              ${u?D`<span class="plugins-version">${`v${u}`}</span>`:S}
            </div>
            ${d?D`<p class="plugins-consent__description">${d}</p>`:S}
          </div>
        </header>
        ${e.loading?D`<p class="plugins-consent__hint" role="status">${c(`pluginConsent.loading`)}</p>`:e.error?D`<div class="plugins-consent__error" role="alert">
                  <span>${e.error}</span>
                  <button
                    type="button"
                    class="btn btn--sm oc-action oc-action-secondary"
                    @click=${e.onRetry}
                  >
                    ${c(`pluginsPage.tryAgain`)}
                  </button>
                </div>`:n?D`
                    ${oi(n.source)} ${si(n.trust)}
                    ${r?ei(r):S}
                    ${$r(n.declared)}
                    ${ii(n.grants,i?.origin)}
                  `:D`<p class="plugins-consent__description">${c(`pluginConsent.fallback`)}</p>`}
        <footer class="plugins-consent__actions">
          <button type="button" class="btn oc-action oc-action-secondary" @click=${e.onCancel}>
            ${c(`pluginsPage.cancel`)}
          </button>
          ${W(e.mutationBlockedReason,m)}
        </footer>
      </section>
    </openclaw-modal-dialog>
  `}var li,ui,di;function fi(){return(fi=e((()=>{C(),un(),k(),Et(),Ie(),G(),R(),y(),Yr(),N(),yt(),P(),Jr(),li={channels:`pluginsPage.categoryChannels`,providers:`pluginsPage.categoryProviders`,tools:`pluginsPage.categoryTools`,contracts:`pluginConsent.contracts`,hooks:`pluginConsent.hooks`,mcpServers:`pluginConsent.mcpServers`,cliCommands:`pluginConsent.cliCommands`,cliBackends:`pluginConsent.cliBackends`,skills:`pluginConsent.skills`,dangerousConfigFlags:`pluginConsent.dangerousFlags`},ui={bundled:`pluginsPage.included`,"official-catalog":`pluginsPage.official`,clawhub:`pluginConsent.sourceClawHub`,npm:`pluginConsent.sourceNpm`,git:`pluginConsent.sourceGit`,path:`pluginConsent.sourcePath`,archive:`pluginConsent.sourceArchive`,marketplace:`pluginConsent.sourceMarketplace`},di={bundled:`pluginsPage.included`,global:`pluginsPage.global`,workspace:`pluginsPage.workspace`,config:`pluginsPage.config`,official:`pluginsPage.official`}})))()}function pi(e){return e===`policy-warning`||e===`error`?1:Si.indexOf(e)}function mi(e){let t=pi(e),n=[[`review`,c(`pluginsPage.installWizard.reviewStep`)],[`installing`,c(`pluginsPage.installWizard.installStep`)],[`configuring`,c(`pluginsPage.installWizard.configureStep`)],[`enabling`,c(`pluginsPage.installWizard.enableStep`)]];return D`<ol
    class="plugin-install-wizard__progress"
    aria-label=${c(`pluginsPage.installWizard.progressLabel`)}
  >
    ${n.map(([e,n])=>{let r=Si.indexOf(e),i=t>r;return D`<li class=${i?`is-complete`:t===r?`is-active`:``}>
        <span aria-hidden="true">${i?A.check:r+1}</span>
        ${n}
      </li>`})}
  </ol>`}function hi(e){let t=e.request;return`${t.source===`clawhub`?`ClawHub`:t.source===`official`?c(`pluginsPage.official`):t.source} · ${h(t)}`}function gi(e){let{plugin:t,detail:n}=e.detail,r=[...n.skills.map(e=>e.name),...n.mcpServers.map(e=>`MCP: ${e}`)];return D`
    <div class="plugin-install-wizard__review">
      <dl>
        <div>
          <dt>${c(`pluginsPage.installedSource`)}</dt>
          <dd>${hi(e)}</dd>
        </div>
        ${n.security?D`<div>
                <dt>${c(`pluginsPage.detailSecurity`)}</dt>
                <dd>
                  ${n.security.status}${n.security.summary?` · ${n.security.summary}`:``}
                </dd>
              </div>`:S}
        <div>
          <dt>${c(`pluginsPage.installWizard.capabilities`)}</dt>
          <dd>
            ${r.length?r.join(`, `):c(`pluginsPage.installWizard.noDeclaredCapabilities`)}
          </dd>
        </div>
        <div>
          <dt>${c(`pluginsPage.installWizard.runtimeImpact`)}</dt>
          <dd>${c(`pluginsPage.installWizard.runtimeDescription`)}</dd>
        </div>
      </dl>
      ${t.catalog.summary?D`<p>${t.catalog.summary}</p>`:S}
    </div>
  `}function _i(e){let t=e.state.pluginId;return!t||!e.configValue||!e.configSchema?e.configError?D`<div class="plugin-install-wizard__alert" role="alert">
        ${e.configError}
      </div>`:D`<p class="plugin-install-wizard__status" role="status">
      ${e.configSchemaLoading?c(`pluginsPage.installWizard.loadingConfiguration`):c(`pluginsPage.schemaUnavailable`)}
    </p>`:D`
    <p class="plugin-install-wizard__status">${c(`pluginsPage.installWizard.configureBody`)}</p>
    <div class="plugin-install-wizard__config">
      ${B({rawAvailable:!1,maskSensitive:!0,schema:e.configSchema,value:e.configValue,path:[`plugins`,`entries`,t,`config`],hints:e.configHints,unsupported:new Set(e.configUnsupportedPaths),disabled:!e.canEditConfig||e.configBusy,showLabel:!1,onPatch:e.onConfigPatch,onRemove:e.onConfigRemove})}
    </div>
    ${e.configError?D`<div class="plugin-install-wizard__alert" role="alert">${e.configError}</div>`:S}
  `}function vi(e){return D`<div
    class="plugin-install-wizard__alert plugin-install-wizard__alert--warning"
    role="alert"
  >
    <strong>${c(`pluginsPage.installWizard.policyWarningTitle`)}</strong>
    <p>${c(`pluginConsent.installPolicy.policyScope`)}</p>
    <p>${x(e.policyWarning?.reason??``)}</p>
    ${e.policyWarning?.findings?.map(e=>D`<div class="plugins-policy-review__finding">
        <strong>${c(`pluginConsent.installPolicy.severity.${e.severity}`)}</strong>
        <p>${x(e.message)}</p>
        <details>
          <summary>${c(`pluginConsent.installPolicy.technicalDetails`)}</summary>
          <code>${e.ruleId}</code>
          ${e.file?D`<code>${e.file}${e.line?`:${e.line}`:``}</code>`:S}
          ${e.evidence?D`<p>${x(e.evidence)}</p>`:S}
        </details>
      </div>`)}
  </div>`}function yi(e){let t=e.state.stage;if(t===`review`)return gi(e.state);if(t===`policy-warning`)return vi(e.state);if(t===`configuring`)return _i(e);if(t===`error`)return D`<div class="plugin-install-wizard__alert" role="alert">
      <strong>${c(`pluginsPage.installWizard.failedTitle`)}</strong>
      <p>${e.state.error}</p>
    </div>`;if(t===`success`)return D`<div class="plugin-install-wizard__success" role="status">
      <span aria-hidden="true">${A.check}</span>
      <div>
        <strong>${c(`pluginsPage.installWizard.successTitle`)}</strong>
        <p>
          ${c(`pluginsPage.installWizard.successBody`,{name:e.state.detail.plugin.catalog.name})}
        </p>
      </div>
    </div>`;let n=c(t===`installing`?`pluginsPage.installWizard.installingBody`:t===`reconnecting`?`pluginsPage.installWizard.reconnectingBody`:`pluginsPage.installWizard.enablingBody`);return D`<div class="plugin-install-wizard__working" role="status">
      <span class="plugin-install-wizard__spinner" aria-hidden="true"></span>
      <p>${n}</p>
    </div>
    ${t===`installing`&&e.state.policyWarning?vi(e.state):S}`}function bi(e){let t=e.state.stage,n=!e.canMutate||e.busy;if(t===`success`)return D`<button
      type="button"
      class="btn primary oc-action oc-action-primary"
      @click=${e.onManage}
    >
      ${c(`pluginsPage.installWizard.managePlugin`)}
    </button>`;if(t===`error`){let t=e.state.savedInstall,r=D`<button
      type="button"
      class="btn primary oc-action oc-action-primary"
      ?disabled=${t&&!e.mutationBlockedReason&&n}
      aria-disabled=${t&&!e.canMutate?`true`:S}
      @click=${()=>{(!t||!n)&&e.onRetry()}}
    >
      ${c(t?`pluginsPage.reload`:`pluginsPage.tryAgain`)}
    </button>`;return t?W(e.mutationBlockedReason,r):r}if(t===`policy-warning`)return D`<button
      type="button"
      class="btn primary oc-action oc-action-primary"
      @click=${e.onContinuePolicyWarning}
    >
      ${c(`pluginsPage.installWizard.continueInstall`)}
    </button>`;if(t===`configuring`){let t=D`<button
      type="button"
      class="btn primary oc-action oc-action-primary"
      ?disabled=${!e.mutationBlockedReason&&(n||e.configBusy||!e.configSchema)}
      @click=${e.onSaveConfiguration}
    >
      ${e.configBusy?c(`pluginsPage.working`):c(`pluginsPage.installWizard.saveAndEnable`)}
    </button>`;return W(e.mutationBlockedReason??(e.canEditConfig?null:c(`pluginsPage.changesDisabled`)),t)}if(t!==`review`)return S;let r=D`<button
    type="button"
    class="btn primary oc-action oc-action-primary"
    ?disabled=${!e.mutationBlockedReason&&n}
    @click=${()=>{n||e.onInstall()}}
  >
    ${c(`pluginsPage.installNamed`,{name:e.state.detail.plugin.catalog.name})}
  </button>`;return W(e.mutationBlockedReason,r)}function xi(e){let t=e.state.detail.plugin.catalog,{official:n,author:r}=t,i=[`installing`,`reconnecting`,`enabling`].includes(e.state.stage);return D`<openclaw-modal-dialog
    label=${c(`pluginsPage.installWizard.title`,{name:t.name})}
    style="--openclaw-modal-width: min(720px, calc(100vw - 32px));"
    @modal-cancel=${t=>{if(i){t.preventDefault();return}e.onClose()}}
  >
    <section class="plugin-install-wizard oc-card" data-stage=${e.state.stage}>
      <header class="plugin-install-wizard__header">
        <div>
          <div class="plugin-install-wizard__title-row">
            <h2>${t.name}</h2>
            ${n?gt():S}
          </div>
          ${ht(r,{linked:!0})}
        </div>
        ${i?S:D`<button
                type="button"
                class="btn btn--icon oc-action oc-action-icon oc-action-secondary"
                aria-label=${c(`pluginsPage.cancel`)}
                @click=${e.onClose}
              >
                ${A.x}
              </button>`}
      </header>
      ${mi(e.state.stage)}
      <div class="plugin-install-wizard__body">${yi(e)}</div>
      <footer class="plugin-install-wizard__actions">
        ${e.state.stage===`review`||e.state.stage===`configuring`||e.state.stage===`policy-warning`?D`<button
                type="button"
                class="btn oc-action oc-action-secondary"
                @click=${e.onClose}
              >
                ${c(`pluginsPage.cancel`)}
              </button>`:S}
        ${bi(e)}
      </footer>
    </section>
  </openclaw-modal-dialog>`}var Si;function Ci(){return(Ci=e((()=>{C(),Vt(),k(),Ie(),G(),y(),Yr(),v(),xt(),Jr(),Si=[`review`,`installing`,`reconnecting`,`configuring`,`enabling`,`success`]})))()}function wi(e,t){let n=t.trim().toLocaleLowerCase();return!n||[e.name,e.id,e.description,e.packageName].some(e=>e?.toLocaleLowerCase().includes(n))}function Ti(e,t){let n=V(t.id),r=!!e.busy[n],i=e.reloadBlockedReason===null,a=(e,n,i,a,o)=>W(i,D`<button
        type="button"
        class=${`btn oc-action ${n}`}
        ?disabled=${!i&&(!a||r)}
        aria-disabled=${!a||r?`true`:S}
        aria-label=${n.includes(`plugins-reload`)?c(`pluginsPage.reloadNamed`,{name:t.name}):`${e} ${t.name}`}
        title=${n.includes(`plugins-reload`)?c(`pluginsPage.reloadHint`):S}
        @click=${()=>{a&&!r&&o()}}
      >
        ${e}
      </button>`);return D`
    <a
      class="btn primary oc-action oc-action-primary"
      href=${e.settingsHref}
      @click=${t=>{f(t)&&(t.preventDefault(),e.onSettings())}}
      >${A.settings} ${c(`pluginsPage.detailSettings`)}</a
    >
    ${a(c(t.enabled?`pluginsPage.detailDisable`:`pluginsPage.detailEnable`),`oc-action-secondary`,e.mutationBlockedReason??(t.state===`needs-setup`?c(`pluginsPage.setupRequiredNotice`):null),e.canMutate&&t.state!==`needs-setup`,()=>e.onSetEnabled(t.id,!t.enabled,n))}
    ${a(c(`pluginsPage.detailReload`),`plugins-reload oc-action-secondary`,e.reloadBlockedReason,i,()=>e.onReload(t.id,n))}
    ${t.removable?a(c(`pluginsPage.uninstall`),`oc-action-secondary`,e.mutationBlockedReason,e.canMutate,()=>e.onUninstall(t.id,n)):S}
  `}function Ei(){return(Ei=e((()=>{C(),k(),G(),y(),H()})))()}function Di(e,t,n=[]){let{label:r,help:i}=kt(e.path,e.schema,e.hints),a=[...n,r],o=Nt(e);return oe(e.schema)===`object`&&e.schema.properties&&Object.keys(e.schema.properties).length>0&&e.schema.additionalProperties===!1&&!e.schema.anyOf&&!e.schema.oneOf&&!e.schema.enum&&!Kt(e.value)&&!e.unsupported.has(ae(e.path))&&!It(e,o)?Ft(e).fields.flatMap(e=>Di(e,t,a)):[{...e,property:t,label:a.join(`: `),help:i}]}var Z;function Oi(){return(Oi=e((()=>{C(),ve(),be(),Lt(),Bt(),Pt(),Gt(),Ot(),Ht(),Vt(),k(),R(),ut(),y(),N(),me(),xr(),Zt(),P(),Z=class extends _{constructor(...e){super(...e),this.query=``}willUpdate(e){e.has(`model`)&&e.get(`model`)?.pluginId!==this.model?.pluginId&&(this.query=``)}renderField(e){let{label:t,help:n,path:r,disabled:i}=e,a=this.onAskSetting,o=e.value===void 0?e.schema.default:e.value,s=!se(r,e.hints)?.placeholder&&oe(e.schema)===`boolean`&&!e.schema.enum&&!e.schema.anyOf&&!e.schema.oneOf,l=Ut(r,`plugin-help`),u={...e,descriptionId:n?l:void 0},d=this.renderCredential?.(u)??B({...u,showLabel:!1,hints:{...e.hints,[ae(r)]:{...se(r,e.hints),label:t}}});return D`<div
      class="plugin-editor__row"
      data-setting=${r.slice(4).join(`.`)}
      @click=${t=>{if(!s||i||getSelection()?.toString())return;let n=t.target;n instanceof Element&&!n.closest(`button,a,input,select,textarea,label,wa-switch,wa-checkbox,wa-dropdown,summary,[contenteditable]`)&&e.onPatch(r,!o)}}
    >
      <div class="plugin-editor__menu">
        <wa-dropdown
          placement="bottom-start"
          @wa-select=${t=>{t.detail.item.value===`reset`&&!i&&e.onPatch(r,e.isRequired?structuredClone(e.schema.default):void 0),t.detail.item.value===`ask`&&a?.(e)}}
        >
          <button
            slot="trigger"
            type="button"
            class="btn btn--icon btn--ghost"
            aria-label=${c(`pluginsPage.editor.actions`,{name:t})}
          >
            ${A.moreHorizontal}
          </button>
          <wa-dropdown-item
            value="reset"
            ?disabled=${i||e.value===void 0||e.isRequired&&e.schema.default===void 0}
            >${c(`pluginsPage.editor.reset`)}</wa-dropdown-item
          >
          ${a?D`<wa-dropdown-item value="ask">${c(`pluginsPage.editor.ask`)}</wa-dropdown-item>`:S}
        </wa-dropdown>
      </div>
      <div class="plugin-editor__copy">
        <span class="plugin-editor__title">${t}</span
        >${n?D`<p id=${l}>${n}</p>`:S}
      </div>
      <div class="plugin-editor__control">${d}</div>
    </div>`}renderGroups(e,t){let n=oe(e.schema)!==`object`||e.schema.anyOf||e.schema.oneOf||e.schema.enum||e.unsupported.has(ae(e.path))?{fields:[e],additional:void 0}:Ft(e),r=(se(e.path,e.hints)?.groups??[]).toSorted((e,t)=>(e.order??0)-(t.order??0)),i=this.query.trim().toLocaleLowerCase(),a=n.fields.flatMap(e=>Di(e,String(e.path.at(-1)))).filter(e=>!i||At({...e,criteria:{text:i,tags:[]}})||[e.path.slice(4).join(`.`),e.label,e.help,r.find(t=>t.properties.includes(e.property))?.title].join(` `).toLocaleLowerCase().includes(i)),o=r.map(e=>({id:e.id,title:e.title,fields:e.properties.flatMap(e=>a.filter(t=>t.property===e))})),s=a.filter(e=>!r.some(t=>t.properties.includes(e.property)));o.push({id:`__ungrouped`,title:r.length?c(`pluginsPage.editor.other`):``,fields:s});let l=n.additional?Rt({...n.additional,searchCriteria:i?{text:i,tags:[]}:void 0},B):S;return D`${o.map(e=>e.fields.length?D`<section class="plugin-editor__section">
            ${e.title?D`<h2>${e.title}</h2>`:S}
            <div class="plugin-editor__group">
              ${w(e.fields,e=>JSON.stringify(e.path),e=>this.renderField(e))}
            </div>
          </section>`:S)}
    ${l===S?S:D`<section class="plugin-editor__section"><div class="plugin-editor__group">${l}</div></section>`}
    ${!a.length&&l===S&&!t?D`<p class="plugin-editor__empty">${c(i?`pluginsPage.editor.noMatches`:`pluginsPage.editor.empty`)}</p>`:S}`}render(){let e=this.model;if(!e)return S;let t=e.result?.plugins.find(t=>t.id===e.pluginId)?.name??e.pluginId,n=this.renderPermissions?.(this.query.trim().toLocaleLowerCase())??S,r=n!==S,i=e.configSchema?{schema:e.configSchema,value:Jt(e.configValue,e.pluginId).config,path:[`plugins`,`entries`,e.pluginId,`config`],hints:e.configHints,unsupported:new Set(e.configUnsupportedPaths),disabled:!e.connected||!e.canEditConfig||e.configBusy,compact:!0,commitOnBlur:!0,showLabel:!1,maskSensitive:!0,rawAvailable:!1,onPatch:e.onConfigPatch,onRemove:e.onConfigRemove}:null,a=i?Nt(i):void 0,o=i&&It(i,a)?D`<openclaw-config-form-structured-draft
            .props=${{identity:JSON.stringify(i.path),sourceIdentity:i.value,initialValue:a,params:i,renderNode:e=>this.renderGroups(e,r)}}
          ></openclaw-config-form-structured-draft>`:i?this.renderGroups(i,r):S;return D`<section class="plugin-editor">
      <header class="plugin-editor__header">
        ${yr({name:c(`pluginsPage.detailSettings`),backHref:e.backHref,backLabel:t,onBack:e.onBack})}
        <h1>${c(`pluginsPage.editor.title`,{name:t})}</h1>
      </header>
      <label class="plugin-editor__search"
        >${A.search}<input
          type="search"
          class="settings-input"
          aria-label=${c(`pluginsPage.editor.search`)}
          placeholder=${c(`pluginsPage.editor.search`)}
          .value=${this.query}
          @input=${e=>{this.query=e.currentTarget.value}}
      /></label>
      ${e.configError?D`<div class="callout danger" role="alert">${e.configError}<button class="btn btn--sm" @click=${e.configValue&&e.configSchema?e.onConfigWriteRetry:e.onConfigReadRetry}>${c(`common.retry`)}</button></div>`:S}
      ${e.configSchemaLoading||!e.configValue?L({rows:2,carapace:!0}):o}
      ${r?D`<section class="plugin-editor__section">
              <h2>${c(`pluginsPage.editor.permissions`)}</h2>
              <div class="plugin-editor__group">${n}</div>
            </section>`:S}
    </section>`}},r([O({attribute:!1})],Z.prototype,`model`,void 0),r([O({attribute:!1})],Z.prototype,`renderPermissions`,void 0),r([O({attribute:!1})],Z.prototype,`onAskSetting`,void 0),r([O({attribute:!1})],Z.prototype,`renderCredential`,void 0),r([T()],Z.prototype,`query`,void 0),customElements.define(`openclaw-plugin-settings-editor`,Z)})))()}function Q(e,t){return D`<div
    class="callout danger plugins-settings-error oc-banner oc-banner-error"
    role="alert"
  >
    <span>${e}</span>
    <button type="button" class="btn btn--sm oc-action oc-action-secondary" @click=${t}>
      ${c(`pluginsPage.tryAgain`)}
    </button>
  </div>`}function ki(e){return D`<button
    type="button"
    class="btn btn--xs btn--icon oc-action oc-action-icon oc-action-secondary"
    aria-label=${c(`common.reload`)}
    ?disabled=${e.configBusy||e.configSchemaLoading}
    @click=${e.onConfigReload}
  >
    ${A.refresh}
  </button>`}function Ai(e){return at({id:`plugin-settings`,active:e.tab,tabs:[{value:`installed`,label:c(`pluginsPage.settingsInstalled`)},{value:`advanced`,label:c(`pluginsPage.advanced`)}],ariaLabel:c(`pluginsPage.settingsTabs`),panelId:`plugin-settings-panel`,variant:`sub`,className:`plugins-settings-tabs`,carapace:!0,onSelect:e.onTabChange})}function ji(e){if(!e.connected)return z(c(`pluginsPage.connectToManage`),{carapace:!0});if(e.loading)return L({rows:4,carapace:!0});if(e.error&&!e.result)return Q(e.error,e.onRefresh);let t=e.error?Q(e.error,e.onRefresh):S,n=(e.result?.plugins??[]).filter(t=>t.installed&&wi(t,e.query)).toSorted((e,t)=>e.name.localeCompare(t.name));return n.length===0?D`${t}${z(e.query?c(`pluginsPage.noSettingsMatches`):c(`pluginsPage.noInstalled`),{carapace:!0})}`:D`${t}${w(n,e=>e.id,t=>{let n=V(t.id);return D`
        <article
          class="settings-row settings-row--nav plugins-settings-row oc-settings-row"
          data-plugin-id=${t.id}
          @click=${n=>{let r=n.target;(!(r instanceof Element)||!r.closest(`button, a`))&&e.onOpenPlugin(t.id)}}
        >
          ${Xr(t.id,t.name,e.iconUrls[t.id],()=>e.onIconError(t.id))}
          <a
            class="settings-row__text plugins-settings-row__link oc-settings-row-content"
            href=${e.pluginHref(t.id)}
            @click=${n=>{f(n)&&(n.preventDefault(),e.onOpenPlugin(t.id))}}
          >
            <span class="settings-row__title oc-settings-row-title">${t.name}</span>
            <span class="settings-row__desc oc-settings-row-description"
              >${t.description||c(`pluginsPage.optionalCapability`)}</span
            >
          </a>
          <div class="settings-row__control oc-settings-row-control">
            ${t.state===`not-installed`?S:St(t.state,`plugins-settings-row__status`)}
            <span class="settings-row__chevron" aria-hidden="true">${A.chevronRight}</span>
          </div>
          ${Pn(e.messages[n])}
        </article>
      `})}`}function Mi(e){return e.connected?!e.advancedSchema||!e.configValue?e.configError?Q(e.configError,e.onConfigReadRetry):e.configSchemaLoading||!e.configValue?L({rows:4,carapace:!0}):z(c(`pluginsPage.schemaUnavailable`),{carapace:!0}):D`
    ${B({rawAvailable:!1,maskSensitive:!0,schema:e.advancedSchema,value:e.configValue.plugins??{},path:[`plugins`],hints:e.configHints,unsupported:new Set(e.configUnsupportedPaths),disabled:!e.canEditConfig||e.configBusy,showLabel:!1,onPatch:e.onConfigPatch,onRemove:e.onConfigRemove})}
    ${e.configError?Q(e.configError,e.onConfigWriteRetry):S}
  `:z(c(`pluginsPage.connectToManage`),{carapace:!0})}function Ni(e){let t=e.tab===`installed`?D`
          <label class="plugins-settings-search">
            <span class="settings-control__sr-label">${c(`pluginsPage.searchInstalled`)}</span>
            <span aria-hidden="true">${A.search}</span>
            <input
              class="settings-input oc-input"
              type="search"
              aria-label=${c(`pluginsPage.searchInstalled`)}
              placeholder=${c(`pluginsPage.searchInstalled`)}
              .value=${e.query}
              @input=${t=>{e.onQueryChange(t.currentTarget.value)}}
            />
          </label>
          ${it({title:c(`pluginsPage.settingsInstalled`),description:c(`pluginsPage.settingsInstalledDescription`),count:(e.result?.plugins??[]).filter(e=>e.installed).length,carapace:!0},ji(e))}
        `:D`<div id="plugin-settings-advanced">
          ${it({title:c(`pluginsPage.advanced`),description:c(`pluginsPage.advancedDescription`),actions:ki(e),carapace:!0},Mi(e))}
        </div>`;return I(D`
      ${rt({title:D`<h1 class="plugins-settings-title">${c(`tabs.plugins`)}</h1>`,subtitle:c(`pluginsPage.settingsDescription`)})}
      <div class="plugins-settings-content">
        ${Ai(e)}
        <wa-tab-panel
          id="plugin-settings-panel"
          name=${e.tab}
          active
          aria-labelledby=${`plugin-settings-tab-${e.tab}`}
        >
          ${t}
        </wa-tab-panel>
      </div>
    `,{carapace:!0})}function Pi(e){if(!e.inspection)return L({rows:3,carapace:!0});let t=e.inspection.grants,n=!!(t.llm?.allowModelOverride||t.llm?.allowAuthProfileOverride||t.llm?.allowAgentIdOverride||t.subagent?.allowModelOverride);return D`
    ${lt({title:c(`pluginsPage.promptContextAccess`),description:c(`pluginsPage.promptContextAccessDescription`),control:F({kind:t.hooks.allowPromptInjection.effective?`warn`:`muted`,label:t.hooks.allowPromptInjection.effective?c(`pluginsPage.accessAllowed`):c(`pluginsPage.accessBlocked`),carapace:!0}),carapace:!0})}
    ${lt({title:c(`pluginsPage.conversationAccess`),description:c(`pluginsPage.conversationAccessDescription`),control:F({kind:t.hooks.allowConversationAccess.effective?`warn`:`muted`,label:t.hooks.allowConversationAccess.effective?c(`pluginsPage.accessAllowed`):c(`pluginsPage.accessBlocked`),carapace:!0}),carapace:!0})}
    ${lt({title:c(`pluginsPage.modelOverrideAccess`),description:c(`pluginsPage.modelOverrideAccessDescription`),control:F({kind:n?`warn`:`muted`,label:c(n?`pluginsPage.accessAllowed`:`pluginsPage.accessBlocked`),carapace:!0}),carapace:!0})}
  `}function Fi(e,t){if(!e.inspection)return t?S:L({rows:3,carapace:!0});let n=Jt(e.configValue,e.pluginId),r=e.hostControlsSchema&&e.configValue?B({rawAvailable:!1,maskSensitive:!0,schema:e.hostControlsSchema,value:n,path:[`plugins`,`entries`,e.pluginId],hints:e.configHints,unsupported:new Set(e.configUnsupportedPaths),disabled:!e.canEditConfig||e.configBusy,showLabel:!1,compact:!0,commitOnBlur:!0,searchCriteria:t&&!c(`pluginsPage.editor.permissions`).toLocaleLowerCase().includes(t)?{text:t,tags:[]}:void 0,onPatch:e.onConfigPatch,onRemove:e.onConfigRemove}):S;return t&&r===S?S:D`${r}
  ${t?S:D`${Pi(e)}
          <div class="plugin-editor__permission-details">
            ${$r(e.inspection.declared)}
            ${ii(e.inspection.grants,e.inspection.plugin.origin)}
          </div>`}`}function Ii(e){let t=e.result?.plugins.find(t=>t.id===e.pluginId);if(!e.connected)return I(z(c(`pluginsPage.connectToManage`),{carapace:!0}),{carapace:!0});if(e.error&&!e.result)return I(Q(e.error,e.onRefresh),{carapace:!0});if(!e.result)return I(L({rows:5,carapace:!0}),{carapace:!0});if(!t?.installed)return I(D`
        <a
          class="btn btn--sm oc-action oc-action-secondary"
          href=${e.backHref}
          @click=${t=>{t.preventDefault(),e.onBack()}}
        >
          ${A.chevronLeft} ${e.backLabel}
        </a>
        ${z(c(`pluginsPage.pluginNotFound`),{carapace:!0})}
      `,{carapace:!0});let n=V(t.id),r=e.inspection?.catalog,i=e.inspection?.components,a=e.tab===`configuration`,o=D`${e.error?Q(e.error,e.onRefresh):S}
  ${e.inspectionError?Q(e.inspectionError,e.onRetryInspection):S}
  ${t.error?D`<div class="callout danger oc-banner oc-banner-error" role="alert">${x(t.error)}</div>`:S}
  ${Pn(e.messages[n])}`;if(a)return I(D`
        ${o}
        <openclaw-plugin-settings-editor
          .model=${e}
          .renderCredential=${e.renderCredential}
          .onAskSetting=${e.onAskSetting}
          .renderPermissions=${t=>Fi(e,t)}
        ></openclaw-plugin-settings-editor>
      `,{wide:!0,carapace:!0});let s=e=>(e??[]).map(e=>({name:e})),l=(i?.skills??[]).map(e=>({name:e,description:r?.detail.skills.find(t=>t.name===e)?.description})),u=e.tools??s(e.inspection?.declared.tools);return I(br({id:`plugin-installed-detail`,name:t.name,summary:t.description||r?.plugin.catalog.summary,backHref:e.backHref,backLabel:e.backLabel,onBack:e.onBack,icon:D`<span data-plugin-icon-id=${t.id}
        >${e.iconUrls[t.id]?D`<img src=${e.iconUrls[t.id]} alt="" @error=${()=>e.onIconError(t.id)} />`:A.box}</span
      >`,identity:Br(r,e.inspection?.overview?.publisherName),titleAction:D`${Ti({...e,settingsHref:e.settingsHref??`#configuration`,onSettings:()=>e.onTabChange(`configuration`)},t)}${Hr(e.onAskPlugin)}`,sidebar:r||t.version||e.inspection?.overview?Vr(r,t.version,e.inspection?.overview):void 0,panel:D`${o}
      ${!e.inspection&&!e.inspectionError?L({rows:2,carapace:!0}):S}
      ${e.skillsSection??J(c(`pluginsPage.detailTabs.skills`),l,A.book)}
      ${J(c(`pluginsPage.detailMcpServers`),s(i?.mcpServers),A.plug)}
      ${J(c(`pluginsPage.detailTools`),u,A.wrench,e.onOpenTool)}
      ${J(c(`pluginsPage.detailTabs.commands`),s(i?.commands),A.terminal)}
      ${J(c(`pluginsPage.detailTabs.hooks`),s(i?.hooks),A.plug)}
      ${J(c(`pluginsPage.detailTabs.lspServers`),s(i?.lspServers),A.fileText)} `,readme:e.inspection?.overview?.readme||r?.detail.readme?Ur(e.inspection?.overview?.readme??r?.detail.readme):void 0}),{wide:!0,carapace:!0})}function Li(){return(Li=e((()=>{C(),be(),Vt(),st(),k(),R(),y(),v(),Kr(),fi(),xr(),Y(),xt(),H(),Ei(),Zt(),Oi()})))()}function Ri(e,t){return ke({signal:t,value:void 0},({render:t,finish:n})=>{t(()=>D`<openclaw-modal-dialog
        class="plugin-tool-dialog"
        label=${e.name}
        @modal-cancel=${()=>n(void 0)}
      >
        <article class="plugin-tool-preview">
          <header>
            <h2>${e.name}</h2>
            <button
              class="btn btn--icon"
              type="button"
              aria-label=${c(`common.close`)}
              @click=${()=>n(void 0)}
            >
              ${A.x}
            </button>
          </header>
          <p>${e.description??c(`pluginsPage.detailNoToolDescription`)}</p>
        </article>
      </openclaw-modal-dialog>`)})}function zi(){return(zi=e((()=>{C(),k(),Ue(),y()})))()}function Bi(e){let t=e.state;if(!t)return S;let n=t.result?.files.map(e=>({path:e.path,size:`${e.sizeBytes.toLocaleString()} B`,contents:e.content??``,...e.status===`ready`?{}:{message:c(`filePreview.bundle.${e.status}`)}}))??[],r=t.result&&(!t.result.inventoryComplete||t.result.files.some(e=>e.status===`unavailable`||e.status===`too-large`));return D`<openclaw-file-preview-modal
    .label=${t.request.skillName}
    .listLabel=${c(`pluginsPage.detailTabs.skills`)}
    .files=${n}
    .directories=${t.result?.directories??[]}
    .activePath=${t.activePath}
    .showSearch=${!1}
    .showCopy=${!1}
    .folderTree=${!0}
    .renderMarkdown=${!0}
    .loading=${t.loading}
    .error=${t.error??``}
    .notice=${r?c(`filePreview.bundle.incomplete`):``}
    .emptyTitle=${t.loading?c(`common.loading`):c(`filePreview.emptyTitle`)}
    .emptySubtitle=${t.loading?``:c(`filePreview.emptySubtitle`)}
    @file-preview-select=${t=>e.select(t.detail)}
    @file-preview-retry=${()=>e.retry()}
    @file-preview-close=${()=>e.close()}
  ></openclaw-file-preview-modal>`}function Vi(e,t){return D`<div class="plugin-skills-section">
    ${J(c(`pluginsPage.detailTabs.skills`),[...e],A.book,t)}
  </div>`}var Hi;function Ui(){return(Ui=e((()=>{C(),k(),cn(),y(),on(),N(),v(),Y(),zi(),sn(),P(),Hi=class{constructor(e,t){this.host=e,this.gateway=t,this.state=null,this.sequence=0,this.toolAbort=new AbortController}async open(e){this.close();let t=this.sequence,n=this.gateway.capture();if(this.state={request:{...e},loading:!!n,error:n?null:c(`pluginsPage.connectToManage`),result:null,activePath:`SKILL.md`},this.host.requestUpdate(),!n)return;let r=()=>this.sequence===t&&this.gateway.isCurrent(n);try{let t=await n.client.request(`plugins.skills.read`,e);r()&&this.state&&(this.state.result=t,this.state.activePath=t.entryPath)}catch(e){r()&&this.state&&(this.state.error=b(e))}finally{r()&&this.state&&(this.state.loading=!1,this.host.requestUpdate())}}openTool(e){this.close(),Ri(e,this.toolAbort.signal)}retry(){this.state&&this.open(this.state.request)}select(e){this.state?.result?.files.some(t=>t.path===e)&&(this.state.activePath=e,this.host.requestUpdate())}close(){this.sequence++,this.toolAbort.abort(),this.toolAbort=new AbortController,this.state=null,this.host.requestUpdate()}}})))()}function Wi(e){e.help?.update(e);let t=e.help?.available?e.help.ask:void 0,n=t?()=>void t():void 0,{actions:r,catalogDetail:i,consentController:a,context:o,detail:s,discovery:l,installWizard:u,installWizardController:d}=e,f=o.runtimeConfig.state,p=zt(f.configSchema),m=u?.pluginId?Xt(p.schema,u.pluginId):null,h=i?.result,ee=h?.plugin.catalog.latestVersion,g=h&&ee&&h.detail.skills.length?Vi(h.detail.skills,e=>r.openSkill({source:`catalog`,catalogId:h.plugin.id,version:ee,skillName:e})):void 0,_=s?.pluginId??null,v=new URLSearchParams(e.routeData?.location.search??``).get(`from`)===`plugins`?`plugins`:`plugin-settings`,y={connected:e.connected,loading:e.loading,result:e.result,error:e.error,busy:e.busy,messages:e.messages,iconUrls:e.iconUrls,canMutate:e.canMutate,reloadBlockedReason:e.reloadBlockedReason,mutationBlockedReason:e.mutationBlockedReason,configBusy:f.configLoading,configError:f.lastError,canEditConfig:e.canEditConfig,configValue:f.configForm,configHints:f.configUiHints,configSchemaLoading:f.configSchemaLoading,configUnsupportedPaths:p.unsupportedPaths,onIconError:r.handlePluginIconError,onSetEnabled:r.updateEnabled,onUninstall:r.uninstall,onReload:r.reload,onConfigPatch:r.patchConfig,onConfigRemove:r.removeConfig,onConfigReload:r.reloadConfig,onConfigReadRetry:r.retryConfigRead,onConfigWriteRetry:r.retryConfigWrite,onRefresh:r.refreshCatalog,onAskPlugin:n,onAskSetting:t},te=t=>{let n=s?.inspection?.components,i=n?.skillDetails??n?.skills.map(e=>({name:e}))??[],a=e.routeData?.location,l=new URLSearchParams(a?.search);l.set(`view`,`settings`);let u=e.installedDetailTab===`configuration`,d=new URLSearchParams(a?.search);d.delete(`view`);let f=`${a?.pathname??``}${d.size?`?${d}`:``}`;return Ii({...y,pluginId:t,inspection:s?.inspection??null,inspectionError:s?.error??null,renderCredential:e.renderCredential,tools:s?.tools,onOpenTool:r.openTool,skillsSection:i.length?Vi(i,e=>r.openSkill({source:`installed`,pluginId:t,skillName:e})):void 0,settingsHref:`${a?.pathname??``}?${l}`,configSchema:Xt(p.schema,t),hostControlsSchema:qt(p.schema,t),backHref:u?f:j(e.surface===`discovery`?`plugins`:v,o.basePath),backLabel:e.surface===`discovery`||v===`plugins`?c(`tabs.plugins`):c(`nav.settings`),tab:e.installedDetailTab,onBack:u?()=>r.selectInstalledDetailTab(`readme`):e.surface===`discovery`?r.closeCatalogDetail:()=>r.closeSettingsDetail(v),onRetryInspection:()=>r.retrySettingsDetail(t),onTabChange:r.selectInstalledDetailTab})};return D`
    ${e.surface===`discovery`&&!i?$t({active:`plugins`,onSelect:r.selectHubTab,secondaryAction:{label:c(`pluginsPage.pluginSettings`),icon:A.settings,onClick:()=>r.openPluginSettings(null,!1)}}):S}
    ${jt(D`
      <openclaw-plugin-manager></openclaw-plugin-manager>
      ${Pn(e.pageNotice??void 0)}
      ${e.surface===`discovery`?D`<wa-tab-panel
              id=${en}
              name="plugins"
              active
              aria-labelledby="plugins-tab-plugins"
              >${i?_?te(_):Gr({onAskPlugin:n,connected:e.connected,skillsSection:g,result:i.result,error:i.error,backHref:j(`plugins`,o.basePath),onBack:r.closeCatalogDetail,onRetry:r.retryCatalogDetail,canInstall:e.canMutate&&!!(i.result&&An(i.result)),installBlockedReason:e.mutationBlockedReason,onInstall:()=>{i.result&&d.open(i.result)},iconUrls:e.catalogIconUrls}):I(jr({connected:e.connected,loading:l.loading,result:l.result,error:l.error??e.error,remoteError:l.remoteError,categories:l.categories,featured:l.featured,featuredLoading:l.featuredLoading,trending:l.trending,trendingLoading:l.trendingLoading,loadingMore:l.loadingMore,loadMoreError:l.loadMoreError,intent:l.intent,category:l.category,query:l.query,iconUrls:e.catalogIconUrls,pluginIconUrls:e.iconUrls,canInstall:e.canMutate,entryHref:e=>Ve(e,o.basePath),onIntentChange:e=>l.selectIntent(e),onCategoryChange:e=>l.selectCategory(e),onQueryChange:e=>l.updateQuery(e),onOpenEntry:e=>o.navigate(`plugins`,{pathname:Ve(e,o.basePath)}),onInstall:r.installCatalogEntry,onLoadMore:()=>void l.loadMore(),onRetry:()=>void l.refresh()}),{wide:!0,carapace:!0})}</wa-tab-panel
            >`:_?te(_):Ni({...y,tab:e.settingsTab,query:e.query,advancedSchema:Yt(p.schema),onTabChange:r.selectSettingsTab,onQueryChange:r.setQuery,pluginHref:e=>je(e,o.basePath),onOpenPlugin:e=>r.openPluginSettings(e,!1)})}
    `)}
    ${u?xi({state:u,mutationBlockedReason:e.mutationBlockedReason,canMutate:e.canMutate,busy:Object.values(e.busy).some(Boolean),configSchema:m,configSchemaLoading:f.configSchemaLoading,configValue:u.configDraft?.value??null,configHints:f.configUiHints,configUnsupportedPaths:p.unsupportedPaths,configBusy:f.configLoading||f.configSaving,configError:f.lastError,canEditConfig:e.canEditConfig,onClose:()=>d.close(),onInstall:()=>d.begin(),onContinuePolicyWarning:()=>d.continuePolicyWarning(),onRetry:()=>d.retry(),onConfigPatch:(e,t)=>d.patchConfiguration(e,t),onConfigRemove:e=>d.removeConfiguration(e),onSaveConfiguration:()=>void d.saveConfiguration(),onManage:()=>d.manage()}):S}
    ${Bi(e.skillPreview)}
    ${a.consent?ci({consent:a.consent,inspection:a.inspection,loading:a.inspectionLoading,error:a.inspectionError,iconUrl:a.consent.pluginId?e.iconUrls[a.consent.pluginId]:void 0,canMutate:e.canMutate,mutationBlockedReason:e.mutationBlockedReason,busy:Object.values(e.busy).some(Boolean),onCancel:()=>d.cancelConsent(),onConfirm:()=>a.confirm(),onRetry:()=>void a.inspect()}):S}
  `}function Gi(){return(Gi=e((()=>{C(),Fe(),Vt(),k(),R(),Mt(),y(),Kr(),Nr(),fi(),Nn(),Ci(),H(),tn(),Qt(),Zt(),Li(),Ui()})))()}var $;function Ki(){return(Ki=e((()=>{s(),Qe(),ve(),Fe(),we(),Be(),Re(),y(),v(),We(),Je(),me(),re(),Ln(),Kn(),Jn(),Zn(),nr(),dr(),pr(),hr(),vr(),Gi(),Ui(),$=class extends _{constructor(...e){super(...e),this.surface=`settings`,this.result=null,this.error=null,this.query=``,this.settingsTab=`installed`,this.busy={},this.messages={},this.detail=null,this.iconUrls={},this.catalogIconUrls={},this.pageNotice=null,this.catalogDetail=null,this.installedDetailTab=`readme`,this.installWizard=null,this.help=new qn(this),this.configAutoSaveStatus=this.context?.runtimeConfig.state.configAutoSaveStatus??`idle`,this.pluginConfigEditPending=!1,this.routeDataConsumed=!1,this.icons=new mr({getContext:()=>this.context,isConnected:()=>this.isConnected,onInstalledUrlsChange:e=>{this.iconUrls=e},onCatalogUrlsChange:e=>{this.catalogIconUrls=e}}),this.gateway=new qe(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.result=null,this.error=null,this.messages={},this.pageNotice=null},invalidateRequests:e=>this.invalidateRequests(e.identityChanged||e.snapshot.phase!==`connected`||!e.snapshot.client),onSnapshot:e=>this.handleGatewaySnapshot(e)}),this.skillPreview=new Hi(this,this.gateway),this.discovery=new Gn(this,{getClient:()=>this.gateway.client,isConnected:()=>this.gateway.connected,onEntriesChanged:()=>this.icons.syncCatalog(this.discovery,this.catalogDetail?.result)}),this.settings=new tr({gateway:this.gateway,getContext:()=>this.context,getDetail:()=>this.detail,canInspect:()=>Ae(this.context.gateway.snapshot.hello?.auth??null),canEdit:()=>this.canEditConfig(),onEdit:()=>{this.pluginConfigEditPending=!0},isSettings:()=>this.installedDetailTab===`configuration`}),this.consentController=new ur({gateway:this.gateway,getContext:()=>this.context,getResult:()=>this.result,canMutate:()=>this.canMutate(),canReload:()=>this.accessBlockedReason()===null,isBusy:e=>!!this.busy[e],setBusy:(e,t)=>this.setBusy(e,t),setMessage:(e,t)=>this.setMessage(e,t),getMessages:()=>this.messages,clearPageNotice:()=>{this.pageNotice=null},closeDetails:()=>this.skillPreview.close(),applyMutationResult:e=>this.applyMutationResult(e),refreshCatalogAfterMutation:e=>this.refreshCatalog(e),requestUpdate:()=>this.requestUpdate()}),this.installWizardController=new In({getState:()=>this.installWizard,setState:e=>{this.installWizard=e},getCatalog:()=>this.result,getRuntimeConfig:()=>this.context.runtimeConfig,getConsentController:()=>this.consentController,getOwner:()=>ze(this.context.gateway),isConnected:()=>this.gateway.connected,canMutate:()=>this.canMutate(),canEditConfig:()=>this.canEditConfig(),refreshCatalog:()=>this.refreshCatalog(),onManage:e=>{if(this.surface===`discovery`&&this.catalogDetail){this.showCatalogDetail(this.catalogDetail.id);return}this.context.navigate(`plugin-settings`,{pathname:je(e,this.context.basePath),search:`?from=plugins`})}}),this.catalogTask=new Ye(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null],task:([e],{signal:t})=>e?e.request(`plugins.list`,{},{signal:t}):Ze,onComplete:e=>{this.replaceResult(e),this.surface===`settings`&&this.showDetails(this.activeRoutePluginId)},onError:e=>{this.error=b(e)}}),this.subscriptions=new l(this).effect(()=>this.context?.runtimeConfig,e=>((this.surface===`settings`||this.installWizard?.stage===`configuring`)&&(e.ensureLoaded(),e.ensureSchemaLoaded()),this.configAutoSaveStatus=e.state.configAutoSaveStatus,e.subscribe(()=>{let t=e.state.configAutoSaveStatus,n=this.configAutoSaveStatus===`saving`&&t===`saved`;this.configAutoSaveStatus=t,this.requestUpdate(),n&&this.pluginConfigEditPending&&(this.pluginConfigEditPending=!1,this.refreshCatalog())}))),this.handleDocumentKeydown=e=>{if(!(e.key!==`Escape`||document.querySelector(`.shell-nav[aria-modal='true']`)||e.target instanceof Element&&e.target.closest(`wa-dropdown[open]`))){if(this.consentController.consent){this.installWizardController.cancelConsent(),e.stopPropagation();return}if(this.installWizard&&!this.installWizardController.busy){this.installWizardController.close(),e.stopPropagation();return}if(!(this.skillPreview.state||document.querySelector(`openclaw-modal-dialog`))){if(this.querySelector(`:focus`)?.blur(),this.catalogDetail){this.closeCatalogDetail(),e.stopPropagation();return}this.detail&&(this.detail=null,this.surface===`settings`&&this.context.replace(`plugin-settings`,{pathname:j(`plugin-settings`,this.context.basePath)}),e.stopPropagation())}}}}willUpdate(e){e.has(`routeData`)&&(this.skillPreview.close(),!this.installWizard&&e.get(`routeData`)?.location.pathname!==this.routeData?.location.pathname&&this.installWizardController.close(),this.applyRouteData())}updated(){this.icons.syncInstalled(this.result,this)}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleDocumentKeydown,!0)}disconnectedCallback(){document.removeEventListener(`keydown`,this.handleDocumentKeydown,!0),this.skillPreview.close(),this.installWizardController.disconnect(),this.discovery.disconnect(),this.subscriptions.clear(),this.icons.reset(),super.disconnectedCallback()}handleGatewaySnapshot(e){let t=e.snapshot,n=t.pluginCapabilities?.generation,r=n!==void 0&&n!==this.pluginGeneration;this.pluginGeneration=n,!e.initial&&r&&this.skillPreview.close();let i=this.icons.updateAuth({hello:t.hello,settings:{token:this.context.gateway.connection.token},password:this.context.gateway.connection.password}),a=!e.initial&&(e.identityChanged||e.connectionChanged||i||r)&&t.phase===`connected`&&this.routeDataConsumed;!e.initial&&i&&!e.identityChanged&&!e.connectionChanged&&(this.gateway.invalidate(),this.invalidateRequests(t.phase!==`connected`||!t.client)),!e.initial&&(e.identityChanged||e.connectionChanged||i)&&(this.icons.reset(),this.busy={}),a?this.refreshCatalog().then(()=>this.installWizardController.resume()):this.ensureInitialData()}applyRouteData(){let e=this.routeData;if(!e)return;this.routeDataConsumed=!0;let t=this.surface===`settings`?this.activeRoutePluginId:null,n=this.surface===`discovery`?this.activeRoutePluginId:null;this.surface===`settings`&&!t&&(this.settingsTab=new URLSearchParams(e.location.search).get(`tab`)===`advanced`?`advanced`:`installed`),(t||n)&&(this.installedDetailTab=new URLSearchParams(e.location.search).get(`view`)===`settings`?`configuration`:bn(e.location.hash)),this.gateway.isRouteDataCurrent(e)&&(this.pluginGeneration!==void 0&&(e.result?.generation??-1)<this.pluginGeneration?this.refreshCatalog():(this.replaceResult(e.result),this.error=e.error)),this.surface===`settings`&&t!==this.detail?.pluginId&&this.showDetails(t),n!==this.catalogDetail?.id&&this.showCatalogDetail(n),this.ensureInitialData()}invalidateRequests(e=!0){e&&(this.catalogTask.run([null]),this.discovery.invalidate()),this.skillPreview.close(),this.detail=null,this.catalogDetail=null,this.installWizardController.invalidate(),this.consentController.reset()}replaceResult(e,t=!1){t?this.icons.reconcileInstalled(e):this.icons.resetInstalled(),this.messages=this.consentController.reconcileInstallMessages(e),this.result=e,e&&this.surface===`discovery`&&this.refreshDiscovery()}get loading(){return this.gateway.connected&&(!this.routeDataConsumed||this.catalogTask.status===Xe.PENDING)}get activeRoutePluginId(){let e=this.routeData?.location.pathname??``;return this.surface===`settings`?Me(e,this.context.basePath):Pe(e,this.context.basePath)}ensureInitialData(){this.routeDataConsumed&&this.gateway.connected&&this.gateway.client&&(this.activeRoutePluginId&&this.installedDetailTab===`configuration`&&(this.context.runtimeConfig.ensureLoaded(),this.context.runtimeConfig.ensureSchemaLoaded()),!this.loading&&!this.result&&!this.error&&this.refreshCatalog())}async refreshCatalog(e=this.gateway.connected?this.gateway.client:null){e&&(this.error=null,await this.catalogTask.run([e]))}async refreshDiscovery(){if(this.surface!==`discovery`)return;let e=this.activeRoutePluginId;e?await this.showCatalogDetail(e):await this.discovery.refresh()}selectHubTab(e){(e!==`plugins`||this.surface!==`discovery`)&&this.context.navigate(e)}accessBlockedReason(e,t=this.gateway.connected){return _r({connected:t,hasAdminAccess:Ae(this.context.gateway.snapshot.hello?.auth??null),mutationAllowed:e})}canMutate(){return this.result?.mutationAllowed===!0&&this.accessBlockedReason()===null}canEditConfig(){let e=this.context.runtimeConfig;return this.accessBlockedReason(e.canSet,e.state.connected)===null}setBusy(e,t){let n={...this.busy};t?n[e]=!0:delete n[e],this.busy=n}setMessage(e,t){let n={...this.messages};t?n[e]=t:delete n[e],this.messages=n}applyMutationResult(e){this.icons.invalidateInstalled(e.plugin.id),this.replaceResult(gr(this.result,e.plugin),!0)}async showDetails(e){let t=e?this.detail?.pluginId===e?{...this.detail,error:null}:{pluginId:e,inspection:null,error:null}:null;this.detail=t;let n=this.result?.plugins.find(t=>t.id===e),r=this.gateway.capture();n?.installed&&t&&r&&await fr({plugin:n,detail:t,client:r.client,catalog:this.catalogDetail?.result??void 0,includeTools:Ke(this.context.gateway.snapshot,`tools.catalog`)===!0,isCurrent:()=>this.gateway.isCurrent(r)&&this.detail===t,onChange:e=>{t=e,this.detail=e}})}async showCatalogDetail(e){let t=e?{id:e,result:null,error:null}:null;this.surface===`discovery`&&this.catalogDetail?.id!==e&&(this.detail=null),this.catalogDetail=t;let n=this.gateway.capture();if(!t||!n)return;let r=this.result?.plugins.find(t=>t.installed&&t.catalogId===e);if(r){new URLSearchParams(this.routeData?.location.search).get(`action`)===`install`&&this.context.replace(`plugins`,{pathname:this.routeData?.location.pathname,search:``}),await this.showDetails(r.id);return}try{let e=await ne(n.client,t.id);if(this.gateway.isCurrent(n)&&this.catalogDetail===t){this.catalogDetail={...t,result:e},this.icons.syncCatalog(this.discovery,this.catalogDetail?.result);let n=e.plugin.local.installed?e.plugin.local.pluginId:void 0;this.showDetails(n??null),new URLSearchParams(this.routeData?.location.search).get(`action`)===`install`&&(this.context.replace(`plugins`,{pathname:this.routeData?.location.pathname,search:``}),this.installWizardController.open(e))}}catch(e){this.gateway.isCurrent(n)&&this.catalogDetail===t&&(this.catalogDetail={...t,error:b(e)})}}async installCatalogEntry(e){let t=this.gateway.capture();if(!t||!this.canMutate())return;let n=this.installWizardController.prepareOpen();if(n)try{let r=await ne(t.client,e);if(!this.gateway.isCurrent(t)||!n.isCurrent())return;this.icons.syncCatalog(this.discovery,r),n.open(r)}catch(e){this.gateway.isCurrent(t)&&n.isCurrent()&&(this.discovery.error=b(e),this.requestUpdate())}}closeCatalogDetail(){this.catalogDetail=null,this.detail=null,this.context.navigate(`plugins`,{pathname:j(`plugins`,this.context.basePath)})}async uninstall(e,t){let n=this.result?.plugins.find(t=>t.id===e)?.name??e;await this.consentController.runMutation(t,t=>m(t,e),async(t,n,r,i,a)=>{a()&&(this.pageNotice=cr(t,n),this.activeRoutePluginId===e&&(this.detail=null,this.context.replace(`plugin-settings`,{pathname:j(`plugin-settings`,this.context.basePath)}))),await this.refreshCatalog(r)},{confirm:()=>Xn(n)})}render(){let e=this.accessBlockedReason(this.result?.mutationAllowed);return Wi({help:this.help,context:this.context,routeData:this.routeData,surface:this.surface,connected:this.gateway.connected,loading:this.loading,result:this.result,error:this.error,query:this.query,settingsTab:this.settingsTab,busy:this.busy,messages:this.messages,detail:this.detail,pageNotice:this.pageNotice,iconUrls:this.iconUrls,catalogIconUrls:this.catalogIconUrls,catalogDetail:this.catalogDetail,installedDetailTab:this.installedDetailTab,installWizard:this.installWizard,canMutate:this.canMutate(),reloadBlockedReason:this.accessBlockedReason()??(Ke(this.context.gateway.snapshot,`plugins.reload`)===!0?null:c(`pluginsPage.reloadUnavailable`)),mutationBlockedReason:e,canEditConfig:this.canEditConfig(),discovery:this.discovery,consentController:this.consentController,installWizardController:this.installWizardController,renderCredential:this.settings.render,skillPreview:this.skillPreview,actions:{selectHubTab:e=>this.selectHubTab(e),closeCatalogDetail:()=>this.closeCatalogDetail(),retryCatalogDetail:()=>void this.showCatalogDetail(this.catalogDetail?.id??null),installCatalogEntry:e=>void this.installCatalogEntry(e),openSkill:e=>void this.skillPreview.open(e),openTool:e=>this.skillPreview.openTool(this.detail?.tools?.find(t=>t.name===e)??{name:e}),setQuery:e=>{this.query=e},refreshCatalog:()=>void this.refreshCatalog(),openPluginSettings:(e,t)=>{this.context.navigate(`plugin-settings`,{pathname:e?je(e,this.context.basePath):j(`plugin-settings`,this.context.basePath),search:t&&e?`?from=plugins`:``})},handlePluginIconError:e=>this.icons.handleInstalledError(e),updateEnabled:(e,t,n)=>void this.consentController.mutateInstalledPlugin(e,t?`enable`:`disable`,n),reload:(e,t)=>void this.consentController.mutateInstalledPlugin(e,`reload`,t),uninstall:(e,t)=>void this.uninstall(e,t),patchConfig:(e,t)=>this.settings.patch(e,t),removeConfig:e=>this.settings.patch(e,void 0),reloadConfig:()=>{this.pluginConfigEditPending=!1,this.context.runtimeConfig.discardDraft({reloadOnly:!0})},retryConfigRead:()=>{this.context.runtimeConfig.refresh(),this.context.runtimeConfig.refreshSchema()},retryConfigWrite:()=>{this.context.runtimeConfig.retry()},closeSettingsDetail:e=>{this.detail=null,this.installedDetailTab=`readme`,this.context.navigate(e,{pathname:j(e,this.context.basePath)})},retrySettingsDetail:e=>void this.showDetails(e),selectInstalledDetailTab:e=>{this.installedDetailTab=e,this.context.navigate(this.surface===`discovery`?`plugins`:`plugin-settings`,xn(this.routeData?.location,e===`configuration`))},selectSettingsTab:e=>{this.settingsTab=e,this.context.replace(`plugin-settings`,{pathname:j(`plugin-settings`,this.context.basePath),search:e===`advanced`?`?tab=advanced`:``})}}})}},r([a({context:Oe,subscribe:!0})],$.prototype,`context`,void 0),r([O({attribute:!1})],$.prototype,`routeData`,void 0),r([O({attribute:!1})],$.prototype,`surface`,void 0),r([T()],$.prototype,`result`,void 0),r([T()],$.prototype,`error`,void 0),r([T()],$.prototype,`query`,void 0),r([T()],$.prototype,`settingsTab`,void 0),r([T()],$.prototype,`busy`,void 0),r([T()],$.prototype,`messages`,void 0),r([T()],$.prototype,`detail`,void 0),r([T()],$.prototype,`iconUrls`,void 0),r([T()],$.prototype,`catalogIconUrls`,void 0),r([T()],$.prototype,`pageNotice`,void 0),r([T()],$.prototype,`catalogDetail`,void 0),r([T()],$.prototype,`installedDetailTab`,void 0),r([T()],$.prototype,`installWizard`,void 0),customElements.get(`openclaw-plugins-page`)||customElements.define(`openclaw-plugins-page`,$)})))()}Ki();
//# sourceMappingURL=plugins-page-BLsrLlDP.js.map