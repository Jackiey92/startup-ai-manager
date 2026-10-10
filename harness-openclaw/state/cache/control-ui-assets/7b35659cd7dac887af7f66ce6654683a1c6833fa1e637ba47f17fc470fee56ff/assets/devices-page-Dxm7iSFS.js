const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./input-dialog-Bm-7hRaz.js","./input-dialog-JxebFWoS.js","./rolldown-runtime-8BhlS34s.js","./control-ui-core-CndkyZ8m.js","./control-ui-foundation-DaCuy7E_.js","./lit-runtime-CIjzngcy.js","./control-ui-core-C5mtYcym.js","./gateway-runtime-BvWNTqPo.js","./control-ui-core-DvoiO6cr.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Fa as n,Ga as r,Ha as i,Kr as a,Mi as o,Q as s,Ri as c,Rr as l,Wa as u,at as d,fr as f,it as p,ji as ee,ka as te,or as m,st as ne,w as re,xr as ie,zr as ae}from"./control-ui-foundation-DaCuy7E_.js";import{Al as h,Bs as oe,Ec as se,Fl as ce,Gn as le,Il as ue,Ir as de,Kn as fe,Pr as pe,Sl as me,Ss as he,Tc as ge,Tl as g,Vs as _e,Yt as _,ai as ve,an as v,bs as ye,oi as be,on as xe,rn as y,un as b,wl as Se}from"./control-ui-core-CndkyZ8m.js";import{$ as x,Q as S,at as Ce,c as we,dt as C,i as Te,nt as w,o as T,pt as Ee,s as De}from"./lit-runtime-CIjzngcy.js";import{$n as Oe,$r as ke,Di as E,Ei as D,Qr as Ae,St as je,V as Me,W as Ne,Zn as Pe,bi as Fe,ct as O,nr as Ie,si as Le,xi as Re,xt as ze}from"./control-ui-core-C5mtYcym.js";import{c as Be,u as Ve}from"./gateway-runtime-BvWNTqPo.js";import{Fa as He,Fi as Ue,Ia as We,Li as Ge,Ni as Ke,Pi as qe}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as k,U as Je,V as A,z as Ye}from"./control-ui-boot-shared-DwSLfX8E.js";import{C as Xe,S as j,g as Ze,k as Qe}from"./config-runtime-B4vvJ76O.js";import{_t as M,dr as $e,dt as et,fa as tt,ht as N,it as nt,lr as rt,lt as it,nt as P,ot as at,pa as ot,pt as F,qi as st,xt as ct,yt as lt}from"./control-ui-boot-shared-DpHhsTHW.js";import{b as ut,ct as dt,d as ft,f as I,l as pt,p as mt,u as ht,y as gt}from"./control-ui-boot-new-CQMzhCGu.js";import{n as _t,t as vt}from"./desktop-focus-window-Ddec30ZV.js";import{_ as yt,a as bt,c as xt,d as St,f as Ct,g as wt,h as Tt,i as L,l as Et,m as Dt,n as Ot,o as R,p as kt,r as At,s as jt,t as Mt,u as Nt,v as Pt}from"./page-operations-Bm3mLgFr.js";import{n as Ft,t as It}from"./settings-workspace-gGOfyDax.js";import{n as Lt,t as Rt}from"./capacity-meter-BcnfCdUw.js";function zt(e){return je(void 0,({render:t,finish:n})=>{let r=!1,i=()=>n(),a=t=>{if(!e.secret){i();return}t.preventDefault(),!r&&(r=!0,s())},o=e.secret?`btn primary`:`btn secret-reveal__dismiss`,s=()=>{t(()=>w`
          <openclaw-modal-dialog
            label=${e.title}
            description=${e.message}
            @modal-cancel=${a}
          >
            <div class="exec-approval-card">
              <div class="secret-reveal__header">
                ${e.status===`success`?w`<span class="secret-reveal__status" aria-hidden="true"
                        >${D.check}</span
                      >`:x}
                <div class="exec-approval-title">${e.title}</div>
              </div>
              <div class="secret-reveal__body"><p>${e.message}</p></div>
              ${e.callout?w`<div class="callout info secret-reveal__callout">${e.callout}</div>`:x}
              ${e.secret?w`
                      <div class="secret-reveal__value">
                        <code class="secret-reveal__code">${e.secret}</code>
                        ${$e(e.secret,h(`common.copy`))}
                      </div>
                    `:x}
              ${r?w`<p class="secret-reveal__hint" role="status">${e.dismissHint}</p>`:x}
              ${e.note?w`<p class="secret-reveal__note">${e.note}</p>`:x}
              <div class="exec-approval-actions">
                <button type="button" class=${o} autofocus @click=${i}>
                  ${e.acknowledgeLabel}
                </button>
              </div>
            </div>
          </openclaw-modal-dialog>
        `)};s()})}function Bt(){return(Bt=e((()=>{S(),g(),rt(),E(),ze()})))()}function z(e){return Array.isArray(e)?e.map(e=>r(e)).filter(e=>e!==void 0):[]}function Vt(e){if(!t(e))return;let n=Object.keys(e),r=e.total,i=e.available;return n.length===2&&n.includes(`total`)&&n.includes(`available`)&&typeof r==`number`&&typeof i==`number`&&Number.isSafeInteger(r)&&Number.isSafeInteger(i)&&r>=1&&r<=1024&&i>=0&&i<=r?{total:r,available:i}:void 0}function Ht(e){if(!t(e))return;let n=e;if(n.status===`missing`&&Object.keys(n).length===1)return{status:`missing`};let i=r(n.version);return n.status===`installed`&&i&&Object.keys(n).length===2?{status:`installed`,version:i}:void 0}function Ut(e){let t=r(e.nodeId);if(!t)return null;let n=r(e.approvalState);return{nodeId:t,displayName:r(e.displayName),platform:r(e.platform),deviceFamily:r(e.deviceFamily),version:r(e.version),coreVersion:r(e.coreVersion),uiVersion:r(e.uiVersion),modelIdentifier:r(e.modelIdentifier),clientId:r(e.clientId),clientMode:r(e.clientMode),remoteIp:r(e.remoteIp),caps:z(e.caps),commands:z(e.commands),approvalState:n&&an.has(n)?n:void 0,pendingRequestId:r(e.pendingRequestId),workerSlots:Vt(e.workerSlots),workerBundle:Ht(e.workerBundle),hostStats:rn.safeParse(e.hostStats).data,connected:e.connected===!0,paired:e.paired===!0,connectedAtMs:m(e.connectedAtMs),lastSeenAtMs:m(e.lastSeenAtMs),approvedAtMs:m(e.approvedAtMs)}}function Wt(e){let t=new Set;for(let n of[...e.roles??[],e.role]){let e=r(n);e&&t.add(e)}return[...t]}function Gt(...e){let t;for(let n of e)n!==void 0&&(t===void 0||n>t)&&(t=n);return t}function Kt(e,t,n,i){let a=t?Wt(t):[];n?.paired&&!a.includes(`node`)&&a.push(`node`);let o=r(t?.operatorLabel),s=r(t?.displayName)??r(n?.displayName),c=r(t?.clientId)??n?.clientId;return{id:e,name:o??s??c??e,displayName:s,clientId:c,clientMode:r(t?.clientMode)??n?.clientMode,platform:r(i?.platform)??r(t?.platform)??n?.platform,deviceFamily:r(i?.deviceFamily)??r(t?.deviceFamily)??n?.deviceFamily,version:r(i?.version)??n?.version,modelIdentifier:r(i?.modelIdentifier)??n?.modelIdentifier,remoteIp:r(t?.remoteIp)??n?.remoteIp,roles:a,scopes:z(t?.scopes),connected:n?.connected===!0||t?.connected===!0,autoApproved:t?.approvedVia===`silent`||t?.approvedVia===`trusted-cidr`||t?.approvedVia===`ssh-verified`,lastSeenAtMs:Gt(t?.lastSeenAtMs,n?.lastSeenAtMs,n?.connectedAtMs,m(i?.ts)),approvedAtMs:Gt(t?.approvedAtMs,n?.approvedAtMs),presence:i,device:t,node:n}}function qt(e){let t=e.displayName?.trim().toLowerCase();if(t)return`name:${t}`;let n=e.clientId?.trim().toLowerCase(),r=e.clientMode?.trim().toLowerCase();return n||r?`client:${n??``}:${r??``}`:`id:${e.id}`}function Jt(e){return e.lastSeenAtMs??e.approvedAtMs??0}function Yt(e,t){if(e.connected!==t.connected)return e.connected?-1:1;let n=Jt(t)-Jt(e);return n===0?e.id.localeCompare(t.id):n}function Xt(e,t){let n=Yt(e.primary,t.primary);return n===0?e.name.localeCompare(t.name):n}function Zt(e){let t=new Map;for(let n of e.nodes){let e=Ut(n);e&&t.set(e.nodeId,e)}let n=new Map;for(let t of e.presence??[])for(let e of[t.deviceId,t.instanceId]){let i=r(e)?.toLowerCase();i&&n.set(i,t)}let i=[],a=new Set;for(let o of e.paired){let e=r(o.deviceId);e&&!a.has(e)&&(a.add(e),i.push(Kt(e,o,t.get(e),n.get(e.toLowerCase()))))}for(let[e,r]of t)a.has(e)||i.push(Kt(e,void 0,r,n.get(e.toLowerCase())));let o=new Map;for(let e of i){let t=qt(e),n=o.get(t);n?n.push(e):o.set(t,[e])}let s=[];for(let[e,t]of o){let n=t.toSorted(Yt),r=n[0];r&&s.push({key:e,name:r.name,primary:r,duplicates:n.slice(1)})}return s.toSorted(Xt)}function Qt(e){return e.flatMap(e=>e.duplicates.filter(e=>!e.connected&&(e.autoApproved||e.device!==void 0&&e.device.approvedVia===void 0)))}function $t(e){return e.find(e=>r(e.mode)?.toLowerCase()===`gateway`)}function en(e,t){let n=new Set;for(let e of t)for(let t of[e.primary,...e.duplicates])n.add(t.id.toLowerCase());return e.filter(e=>{if(r(e.mode)?.toLowerCase()===`gateway`||r(e.reason)?.toLowerCase()===`disconnect`)return!1;let t=[e.deviceId,e.instanceId].map(e=>r(e)?.toLowerCase()).filter(e=>e!==void 0);return t.length===0&&!r(e.host)&&!r(e.mode)?!1:!t.some(e=>n.has(e))})}function tn(e){let t=e.roles.includes(`node`),n=e.roles.filter(e=>e!==`node`);return{removeNode:t||e.node?.paired===!0,removeDevice:!!e.device&&(n.length>0||e.roles.length===0)}}function nn(e){let t=new Map;for(let n of e){let e=(n.deviceId??n.instanceId)?.trim().toLowerCase();if(!e||n.mode?.trim().toLowerCase()===`gateway`)continue;let r=n.roles?.includes(`node`)?`${e}:node`:e;t.set(r,n.reason?.trim().toLowerCase()===`disconnect`?`offline`:`connected`)}return JSON.stringify([...t].toSorted(([e],[t])=>e.localeCompare(t)))}var rn,an;function B(){return(B=e((()=>{f(),Ze(),rn=Xe({cpuCount:j().int().positive(),loadAverage:Qe([j().nonnegative(),j().nonnegative(),j().nonnegative()]).optional(),memoryTotalBytes:j().positive(),memoryFreeBytes:j().nonnegative(),diskTotalBytes:j().positive().optional(),diskAvailableBytes:j().nonnegative().optional(),updatedAtMs:j().nonnegative()}).refine(e=>e.memoryFreeBytes<=e.memoryTotalBytes&&(e.diskAvailableBytes===void 0||e.diskTotalBytes===void 0||e.diskAvailableBytes<=e.diskTotalBytes)),an=new Set([`approved`,`pending-approval`,`pending-reapproval`,`unapproved`])})))()}var on;function sn(){return(sn=e((()=>{tt(),g(),he(),L(),o(),on=class{constructor(e){this.host=e}async editAlias(e){if(!this.host.canManagePairing()||this.host.pendingDialog())return;let t=new AbortController;this.host.setPendingDialog(t);try{let{showInputDialog:n}=await ee(async()=>{let{showInputDialog:e}=await import(`./input-dialog-Bm-7hRaz.js`);return{showInputDialog:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url);await n({signal:t.signal,title:h(`devices.inventory.renameTitle`,{name:e.name}),label:h(`devices.inventory.renamePrompt`),defaultValue:e.operatorLabel??``,requireValue:!0,requireChange:!0,submit:t=>this.host.canManagePairing()?this.host.runPageTask(n=>Dt(n,{deviceId:e.id,label:t})):Promise.resolve(h(`devices.readOnly.pairingRequired`))})}catch(e){this.host.setDevicesError(ye(e))}finally{this.host.pendingDialog()===t&&this.host.setPendingDialog(null)}}confirmInventoryRemoval(e){if(!this.host.canManagePairing())return Promise.resolve();if(e.kind===`entry`){let t=e.entry;return this.confirmDestructiveAction({title:h(`devices.inventory.removePromptTitle`,{name:t.name}),message:h(`devices.inventory.removePromptBody`),details:h(`devices.inventory.deviceId`,{id:t.id}),confirmLabel:h(`devices.inventory.remove`)},e=>Ct(e,t))}let t=e.entries;return this.confirmDestructiveAction({title:h(t.length===1?`devices.inventory.removeStalePromptTitleOne`:`devices.inventory.removeStalePromptTitle`,{count:String(t.length)}),message:h(`devices.inventory.removeStalePromptBody`),confirmLabel:h(`devices.inventory.remove`)},e=>kt(e,t))}confirmPairingReject(e,t){return this.host.canManagePairing()?this.confirmDestructiveAction({title:h(e===`device`?`devices.inventory.rejectDevicePromptTitle`:`devices.inventory.rejectNodePromptTitle`),message:h(`devices.inventory.rejectPromptBody`),confirmLabel:h(`devices.inventory.reject`)},n=>e===`device`?Et(n,t):Nt(n,t)):Promise.resolve()}confirmTokenRevoke(e,t){return this.host.canManagePairing()?this.confirmDestructiveAction({title:h(`devices.inventory.revokePromptTitle`,{role:t}),message:h(`devices.inventory.revokePromptBody`),details:h(`devices.inventory.deviceId`,{id:e}),confirmLabel:h(`devices.inventory.revoke`)},n=>Tt(n,{deviceId:e,gatewayUrl:this.host.gatewayUrl(),role:t})):Promise.resolve()}async confirmDestructiveAction(e,t){if(this.host.pendingDialog())return;let n=new AbortController;this.host.setPendingDialog(n);let r=this.host.requestGeneration(),i=this.host.gatewayClient(),a=await ot({...e,danger:!0,signal:n.signal});this.host.pendingDialog()===n&&this.host.setPendingDialog(null),a&&!n.signal.aborted&&r===this.host.requestGeneration()&&i===this.host.gatewayClient()&&this.host.gatewayConnected()&&this.host.canManagePairing()&&await this.host.runPageTask(t)}}})))()}function cn(e){let t=c(e);return Array.isArray(t.nodes)?t.nodes:[]}function ln(){return(ln=e((()=>{})))()}function un(e){return i(e.normalize(`NFC`)).replace(/(?=\p{M})\p{Emoji_Component}/gu,``).replace(/(?<![\p{L}\p{M}\p{N}])\p{M}+/gu,``).replace(/[^\p{L}\p{M}\p{N}]+/gu,`-`).replace(/^-+/,``).replace(/-+$/,``)}function dn(e){return e.map(e=>e.displayName||e.remoteIp||e.nodeId).filter(Boolean).join(`, `)}function fn(e){let t=e.displayName||e.remoteIp||e.nodeId,n=[`node=${e.nodeId}`],i=r(e.clientId);return i&&n.push(`client=${i}`),`${t} [${n.join(`, `)}]`}function pn(e){return(u(e)??``).startsWith(`openclaw-`)}function mn(e){let t=u(e)??``;return t.startsWith(`clawdbot-`)||t.startsWith(`moldbot-`)}function hn(e){let t=e.filter(e=>pn(e.clientId));if(t.length!==1)return;let n=e.filter(e=>mn(e.clientId)).length;if(n!==0&&t.length+n===e.length)return t[0]}function gn(e,t,n,r){if(e.nodeId===t)return 4e3;if(typeof e.remoteIp==`string`&&e.remoteIp===t)return 3e3;let i=typeof e.displayName==`string`?e.displayName:``,a=i?un(i):``;return a&&a===n?2e3:r!==void 0&&a&&a.replace(/-/g,``)===r?1900:t.length>=6&&e.nodeId.startsWith(t)?1e3:0}function _n(e,t,n=!1){let r=t.trim();if(!r)throw Error(`node required`);let i=un(r),a=n?i.replace(/-/g,``):void 0,o=0,s=[];if(e.forEach(e=>{let t=gn(e,r,i,a);t>o&&(o=t,s.length=0),t>0&&t===o&&s.push(e)}),s.length===0){let t=dn(e);throw Error(`unknown node: ${r}${t?` (known: ${t})`:``}`)}let c=s.filter(e=>e.connected===!0),l=c.length>0?c:s;if(l.length===1)return l[0]?.nodeId??``;let u=hn(l);if(u)return u.nodeId;throw Error(`ambiguous node: ${r} (matches: ${l.map(fn).join(`, `)})`)}function vn(){return(vn=e((()=>{})))()}function yn(e){let n=t(e?.agents)?e.agents:null,i=t(n?.entries)?n.entries:{},a=[];for(let[e,n]of Object.entries(i)){if(!t(n))continue;let i=r(n.name),o=n.default===!0;a.push({id:e,name:i,isDefault:o,record:n})}return a}function bn(e,t){let n=[];for(let i of e){let e=Array.isArray(i.commands)?i.commands:[],a=new Set(e.map(String));if(!t.every(e=>a.has(e)))continue;let o=r(i.nodeId)??``;if(!o)continue;let s=r(i.displayName)??o;n.push({id:o,label:s===o?o:`${s} · ${o}`})}return n.sort((e,t)=>e.label.localeCompare(t.label)),n}function xn(e){let t=e.platform?.trim().toLowerCase()??``,n=e.modelIdentifier?.trim()??``,r=e.clientId?.trim().toLowerCase()??``,i=e.clientMode?.trim().toLowerCase()??``;if(n.startsWith(`Watch`)||Cn.test(t)||r===p.WATCHOS_APP)return I.watch;if(n.startsWith(`iPad`)||wn.test(t))return I.tablet;if(n.startsWith(`iPhone`)||Tn.test(t)||En.has(r))return I.smartphone;if(Dn.has(r)||i===d.WEBCHAT)return I.browser;if(On.has(i)||kn.has(r))return I.terminal;if(i===`gateway`)return I.server;switch(ft(n)){case`laptop`:return I.laptop;case`mini`:return I.macMini;case`studio`:case`pro`:return I.pcCase;case`imac`:return I.allInOne;default:return D.monitor}}function Sn(e){return w`
    <div class="device-entry__tile" aria-hidden="true">
      <span class="device-entry__tile-icon">${e}</span>
    </div>
  `}var Cn,wn,Tn,En,Dn,On,kn;function V(){return(V=e((()=>{S(),ne(),mt(),E(),pt(),Cn=/\bwatchos\b/,wn=/\b(ipados|ipad)\b/,Tn=/\b(ios|android|iphone)\b/,En=new Set([p.IOS_APP,p.ANDROID_APP]),Dn=new Set([p.CONTROL_UI,p.WEBCHAT_UI,p.WEBCHAT]),On=new Set([d.CLI,d.BACKEND,d.PROBE,d.TEST]),kn=new Set([p.CLI,p.TUI])})))()}function An(e){return e===`allowlist`||e===`full`||e===`deny`?e:`deny`}function jn(e){return e===`always`||e===`off`||e===`on-miss`?e:`on-miss`}function Mn(e,t,n){let r=e?.defaults??{},i=n?e?.agents?.[`*`]??{}:{};return{security:An(i.security??r.security??t?.security),ask:jn(i.ask??r.ask??t?.ask),askFallback:An(i.askFallback??r.askFallback??t?.askFallback??`deny`),autoAllowSkills:i.autoAllowSkills??r.autoAllowSkills??t?.autoAllowSkills??!1}}function Nn(e){return yn(e).map(e=>({id:e.id,name:e.name,isDefault:e.isDefault}))}function Pn(e,t){let n=Nn(e),r=Object.keys(t?.agents??{}),i=new Map;n.forEach(e=>i.set(e.id,e)),r.forEach(e=>{i.has(e)||i.set(e,{id:e})});let a=Array.from(i.values());return a.length===0&&a.push({id:`main`,isDefault:!0}),a.sort((e,t)=>{if(e.isDefault&&!t.isDefault)return-1;if(!e.isDefault&&t.isDefault)return 1;let n=e.name?.trim()?e.name:e.id,r=t.name?.trim()?t.name:t.id;return n.localeCompare(r)}),a}function Fn(e,t){return e===U?U:e&&t.some(t=>t.id===e)?e:U}function In(e){let t=e.execApprovalsSnapshot,n=bt(t)?t:null,r=t&&!bt(t)?t:null,i=n?null:e.execApprovalsForm??r?.file??null,a=!!(i||n),o=Pn(e.configForm,i),s=Wn(e.nodes),c=e.execApprovalsTarget,l=c===`node`&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;c===`node`&&l&&!s.some(e=>e.id===l)&&(l=null);let u=Fn(e.execApprovalsSelectedAgent,o),d=Mn(i,r?.resolvedDefaults,u!==U),f=u===U?null:(i?.agents??{})[u]??null,p=Array.isArray(f?.allowlist)?f.allowlist??[]:[];return{ready:a,disabled:!e.canAdmin||e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:i,nativePolicy:n,defaults:d,selectedScope:u,selectedAgent:f,agents:o,allowlist:p,target:c,targetNodeId:l,targetNodes:s,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals,canAdmin:e.canAdmin}}function Ln(e){let t=e.ready,n=e.target!==`node`||!!e.targetNodeId,r=w`
    <button
      class="btn"
      ?disabled=${e.disabled||!e.dirty||!n||!!e.nativePolicy}
      @click=${e.onSave}
    >
      ${e.saving?h(`common.saving`):h(`common.save`)}
    </button>
  `,i=w`
    ${e.canAdmin?w`
            ${zn(e)}
            ${t?e.nativePolicy?Rn(e.nativePolicy):w`${Bn(e)} ${Vn(e)}`:F({title:h(`devices.execApprovals.loadHint`),control:w`
                      <button
                        class="btn"
                        ?disabled=${e.loading||!n}
                        @click=${e.onLoad}
                      >
                        ${e.loading?h(`common.loading`):h(`common.loadApprovals`)}
                      </button>
                    `})}
          `:F({title:h(`devices.readOnly.adminRequired`)})}
  `;return w`
    ${N({title:h(`devices.execApprovals.title`),description:w`
          ${h(`devices.execApprovals.subtitlePrefix`)}
          <span class="mono">exec host=gateway/node</span>.
        `,actions:r},i)}
    ${e.canAdmin&&t&&!e.nativePolicy&&e.selectedScope!==U?Hn(e):x}
  `}function Rn(e){let t=e.enabled&&Array.isArray(e.rules)?e.rules:[],n=e.enabled?e.defaultAction:e.message??`unavailable`;return w`
    ${F({title:h(`devices.execApprovals.hostNativePolicy`),description:h(`devices.execApprovals.hostNativeHint`),control:ct(h(`devices.execApprovals.native`))})}
    ${F({title:h(`devices.execApprovals.defaultAction`),description:n,control:ct(h(t.length===1?`devices.execApprovals.rule`:`devices.execApprovals.rules`,{count:String(t.length)}))})}
    ${t.map(e=>F({title:e.pattern,description:w`
          ${e.action} · ${e.shells?.join(`, `)||h(`devices.execApprovals.allShells`)} ·
          ${e.enabled===!1?h(`devices.execApprovals.off`):h(`devices.execApprovals.on`)}
          ${e.description?w`<br />${_(e.description,120)}`:x}
        `}))}
  `}function zn(e){let t=e.targetNodes.length>0,n=e.targetNodeId??``;return w`
    ${F({title:h(`devices.execApprovals.target`),description:h(`devices.execApprovals.targetHint`),control:w`
        <select
          class="settings-select"
          aria-label=${h(`devices.execApprovals.host`)}
          .value=${T(e.target)}
          ?disabled=${e.disabled}
          @change=${t=>{if(t.target.value===`node`){let t=e.targetNodes[0]?.id??null;e.onSelectTarget(`node`,n||t)}else e.onSelectTarget(`gateway`,null)}}
        >
          <option value="gateway" ?selected=${e.target===`gateway`}>
            ${h(`devices.execApprovals.gateway`)}
          </option>
          <option value="node" ?selected=${e.target===`node`}>
            ${h(`devices.execApprovals.node`)}
          </option>
        </select>
      `})}
    ${e.target===`node`?F({title:h(`devices.execApprovals.node`),description:t?void 0:h(`devices.execApprovals.noNodes`),control:w`
              <select
                class="settings-select"
                aria-label=${h(`devices.execApprovals.node`)}
                .value=${T(n)}
                ?disabled=${e.disabled||!t}
                @change=${t=>{let n=t.target.value.trim();e.onSelectTarget(`node`,n||null)}}
              >
                <option value="" ?selected=${n===``}>
                  ${h(`devices.execApprovals.selectNode`)}
                </option>
                ${e.targetNodes.map(e=>w`<option value=${e.id} ?selected=${n===e.id}>
                      ${e.label}
                    </option>`)}
              </select>
            `}):x}
  `}function Bn(e){let t=[{value:U,label:h(`devices.execApprovals.defaults`),icon:D.settings},...e.agents.map(e=>({value:e.id,label:e.name?.trim()?`${e.name} (${e.id})`:e.id,agent:{id:e.id,...e.name?{name:e.name}:{}},badge:e.isDefault?h(`agents.default`):void 0}))];return F({title:h(`devices.execApprovals.scope`),stacked:!0,control:w`
      <openclaw-agent-select
        class="agent-select--settings"
        .options=${t}
        .value=${e.selectedScope}
        .accessibleLabel=${h(`devices.execApprovals.scope`)}
        .disabled=${e.disabled}
        .onSelect=${e.onSelectScope}
      ></openclaw-agent-select>
    `})}function H(e,t){return w`
    <select
      class="settings-select"
      aria-label=${t.ariaLabel}
      .value=${T(t.currentValue)}
      ?disabled=${e.disabled}
      @change=${n=>{let r=n.target.value;!t.isDefaults&&r===`__default__`?e.onRemove([...t.basePath,t.key]):e.onPatch([...t.basePath,t.key],r)}}
    >
      ${t.isDefaults?x:w`<option value="__default__" ?selected=${t.currentValue===`__default__`}>
              ${h(`devices.execApprovals.useDefaultValue`,{value:t.defaultValue})}
            </option>`}
      ${t.values.map(e=>w`<option value=${e.value} ?selected=${t.currentValue===e.value}>
            ${h(e.labelKey)}
          </option>`)}
    </select>
  `}function Vn(e){let t=e.selectedScope===U,n=e.defaults,r=e.selectedAgent??{},i=t?[`defaults`]:[`agents`,e.selectedScope],a=typeof r.security==`string`?r.security:void 0,o=typeof r.ask==`string`?r.ask:void 0,s=typeof r.askFallback==`string`?r.askFallback:void 0,c=t?n.security:a??`__default__`,l=t?n.ask:o??`__default__`,u=t?n.askFallback:s??`__default__`,d=typeof r.autoAllowSkills==`boolean`?r.autoAllowSkills:void 0,f=d??n.autoAllowSkills,p=d==null;return w`
    ${F({title:h(`devices.execApprovals.security`),description:t?h(`devices.execApprovals.defaultSecurity`):h(`devices.execApprovals.defaultValue`,{value:n.security}),control:H(e,{key:`security`,ariaLabel:h(`devices.execApprovals.mode`),values:W,currentValue:c,defaultValue:n.security,isDefaults:t,basePath:i})})}
    ${F({title:h(`devices.execApprovals.ask`),description:t?h(`devices.execApprovals.defaultPrompt`):h(`devices.execApprovals.defaultValue`,{value:n.ask}),control:H(e,{key:`ask`,ariaLabel:h(`devices.execApprovals.mode`),values:Gn,currentValue:l,defaultValue:n.ask,isDefaults:t,basePath:i})})}
    ${F({title:h(`devices.execApprovals.askFallback`),description:t?h(`devices.execApprovals.promptUnavailable`):h(`devices.execApprovals.defaultValue`,{value:n.askFallback}),control:H(e,{key:`askFallback`,ariaLabel:h(`devices.execApprovals.fallback`),values:W,currentValue:u,defaultValue:n.askFallback,isDefaults:t,basePath:i})})}
    ${F({title:h(`devices.execApprovals.autoAllowSkills`),description:t?h(`devices.execApprovals.autoAllowSkillsHint`):p?h(`devices.execApprovals.usingDefault`,{value:n.autoAllowSkills?h(`devices.execApprovals.on`):h(`devices.execApprovals.off`)}):h(`devices.execApprovals.override`,{value:h(f?`devices.execApprovals.on`:`devices.execApprovals.off`)}),control:w`
        ${!t&&!p?w`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,`autoAllowSkills`])}
              >
                ${h(`devices.execApprovals.useDefault`)}
              </button>`:x}
        ${lt({checked:f,disabled:e.disabled,ariaLabel:h(`devices.execApprovals.autoAllowSkills`),onChange:t=>e.onPatch([...i,`autoAllowSkills`],t)})}
      `})}
  `}function Hn(e){let t=[`agents`,e.selectedScope,`allowlist`],n=e.allowlist;return N({title:h(`devices.execApprovals.allowlist`),description:h(`devices.execApprovals.allowlistHint`),actions:w`
        <button
          class="btn btn--sm"
          ?disabled=${e.disabled}
          @click=${()=>{let r=[...n,{pattern:``}];e.onPatch(t,r)}}
        >
          ${h(`devices.execApprovals.addPattern`)}
        </button>
      `},n.length===0?at(h(`devices.execApprovals.emptyAllowlist`)):n.map((t,n)=>Un(e,t,n)))}function Un(e,t,n){let r=t.lastUsedAt?v(t.lastUsedAt):h(`common.never`),i=t.lastUsedCommand?_(t.lastUsedCommand,120):null,a=t.lastResolvedPath?_(t.lastResolvedPath,120):null;return F({title:t.pattern?.trim()?t.pattern:h(`devices.execApprovals.newPattern`),description:w`
      ${h(`devices.execApprovals.lastUsed`,{time:r})}
      ${i?w`<br /><span class="mono">${i}</span>`:x}
      ${a?w`<br /><span class="mono">${a}</span>`:x}
    `,control:w`
      <input
        class="settings-input"
        type="text"
        aria-label=${h(`devices.execApprovals.pattern`)}
        .value=${t.pattern??``}
        ?disabled=${e.disabled}
        @input=${t=>{let r=t.target;e.onPatch([`agents`,e.selectedScope,`allowlist`,n,`pattern`],r.value)}}
      />
      <button
        class="btn btn--sm danger"
        ?disabled=${e.disabled}
        @click=${()=>{if(e.allowlist.length<=1){e.onRemove([`agents`,e.selectedScope,`allowlist`]);return}e.onRemove([`agents`,e.selectedScope,`allowlist`,n])}}
      >
        ${h(`devices.execApprovals.remove`)}
      </button>
    `})}function Wn(e){return bn(e,[`system.execApprovals.get`,`system.execApprovals.set`])}var U,W,Gn;function Kn(){return(Kn=e((()=>{S(),Te(),dt(),E(),P(),g(),b(),L(),V(),U=`__defaults__`,W=[{value:`deny`,labelKey:`devices.execApprovals.options.deny`},{value:`allowlist`,labelKey:`devices.execApprovals.options.allowlist`},{value:`full`,labelKey:`devices.execApprovals.options.full`}],Gn=[{value:`off`,labelKey:`devices.execApprovals.options.off`},{value:`on-miss`,labelKey:`devices.execApprovals.options.onMiss`},{value:`always`,labelKey:`devices.execApprovals.options.always`}]})))()}function qn(e){let t=e.workerSlots;if(t){let n=e.unavailable?null:t.total-t.available,r=n===null?h(`capacityMeter.unavailable`):h(`capacityMeter.workerSlots`,{used:String(n),total:String(t.total)}),i=e.unavailable?`stale`:t.available===0?`warn`:`accent`;return{label:r,title:n===null?void 0:r,meter:Lt({mode:`discrete`,total:t.total,used:n,tone:i,label:r})}}if(!(e.capabilities?.some(e=>e===`codex.exec-server`||e===`codex.exec-server.stdio.v1`)||e.commands?.includes(`codex.exec-server.stdio.v1`)))return;let n=h(`capacityMeter.execHost`);return{label:n,title:n,meter:w`<span class="capacity-meter-exec" role="img" aria-label=${n}>
      <span aria-hidden="true">${D.terminal}</span>${n}
    </span>`}}function Jn(){return(Jn=e((()=>{S(),g(),Rt(),E()})))()}var G,Yn;function Xn(){return(Xn=e((()=>{ue(),G={devices:{capabilities:{browser:{label:`Browser`,description:`Browse and interact with web pages.`},canvas:{label:`Canvas`,description:`Present and interact with visual content.`},screen:{label:`Screen`,description:`Capture or record the screen.`},computer:{label:`Computer`,description:`Control desktop applications with the mouse and keyboard.`},file:{label:`Files`,description:`Read and manage files on this device.`},system:{label:`System`,description:`Run commands and inspect this device.`},mcp:{label:`MCP`,description:`Use tools provided by MCP servers on this device.`},localInference:{label:`Local inference`,description:`Run models locally on this device.`},camera:{label:`Camera`,description:`Capture photos and video with the device camera.`},talk:{label:`Talk`,description:`Have voice conversations through this device.`},location:{label:`Location`,description:`Read the device location.`},notifications:{label:`Notifications`,description:`Read and manage device notifications.`},contacts:{label:`Contacts`,description:`Find and manage contacts.`},calendar:{label:`Calendar`,description:`Read and manage calendar events.`},reminders:{label:`Reminders`,description:`Read and manage reminders.`},device:{label:`Device`,description:`Read device information and status.`},photos:{label:`Photos`,description:`Browse the device photo library.`},sms:{label:`SMS`,description:`Read and send text messages.`},health:{label:`Health`,description:`Read health and fitness data.`},motion:{label:`Motion`,description:`Read movement and activity data.`},runtime:`1 runtime`,runtimes:`{count} runtimes`,overflow:`{count} more capabilities`}}},Yn=Object.assign(()=>{ce.devices.capabilities=G.devices.capabilities},{catalog:G})})))()}function Zn(e,t,n){return w`
    <span class="device-capability" role="listitem" title=${n}>
      <span class="device-capability__icon" aria-hidden="true">${e}</span>
      <span>${t}</span>
    </span>
  `}function Qn(e){if(e.length===0)return x;let t=[...new Set(e)],n=t.filter(e=>K.has(e)),r=t.filter(e=>!K.has(e)),i=r.slice(0,er-+(n.length>0)),a=r.length-i.length,o=h(n.length===1?`devices.capabilities.runtime`:`devices.capabilities.runtimes`,{count:String(n.length)}),s=n.join(`, `);return w`
    <div class="device-capabilities" role="list" aria-label=${h(`devices.inventory.capabilities`)}>
      ${n.length>0?Zn(D.squareTerminal,o,s):x}
      ${i.map(e=>{let t=$n.get(e);return Zn(t?.icon??D.puzzle,t?h(`devices.capabilities.${t.key}.label`):e,t?h(`devices.capabilities.${t.key}.description`):e)})}
      ${a>0?w`<span
              class="device-capability device-capability--overflow"
              role="listitem"
              title=${h(`devices.capabilities.overflow`,{count:String(a)})}
              >+${a}</span
            >`:x}
    </div>
  `}var $n,K,er;function tr(){return(tr=e((()=>{S(),E(),g(),Xn(),Yn(),$n=new Map(Object.entries({browser:{icon:D.globe,key:`browser`},canvas:{icon:D.panelsTopLeft,key:`canvas`},screen:{icon:D.monitor,key:`screen`},computer:{icon:D.monitorSmartphone,key:`computer`},file:{icon:D.folder,key:`file`},system:{icon:D.terminal,key:`system`},mcp:{icon:D.plug,key:`mcp`},"local-inference":{icon:D.cpu,key:`localInference`},camera:{icon:D.camera,key:`camera`},talk:{icon:D.mic,key:`talk`},location:{icon:D.target,key:`location`},notifications:{icon:D.bell,key:`notifications`},contacts:{icon:D.users,key:`contacts`},calendar:{icon:D.calendarClock,key:`calendar`},reminders:{icon:D.listChecks,key:`reminders`},device:{icon:D.smartphone,key:`device`},photos:{icon:D.image,key:`photos`},sms:{icon:D.messageSquare,key:`sms`},health:{icon:D.activity,key:`health`},motion:{icon:D.radio,key:`motion`}})),K=new Set([`claude-sessions`,`codex-cli-sessions`,`codex-app-server-threads`,`opencode-sessions`,`pi-sessions`]),er=16})))()}function nr(e,t){return e.desktopEnvironments?.find(e=>e.id===t&&e.desktop===!0)?.id}async function rr(e){let t=await le(e);be({message:h(t?`devices.inventory.deviceIdCopied`:`common.copyFailed`)})}function q(e,t){if(!t.deviceId&&!t.desktopEnvironment)return x;let n=e.canManagePairing?x:h(`devices.readOnly.pairingRequired`);return w`
    <wa-dropdown
      placement="bottom-end"
      @wa-select=${n=>{switch(n.detail.item.value){case`desktop`:t.desktopEnvironment&&_t(e.basePath,t.desktopEnvironment);break;case`copy`:t.deviceId&&rr(t.deviceId);break;case`editAlias`:e.canManagePairing&&t.onEditAlias?.();break;case`approve`:e.canManagePairing&&t.pendingRequestId&&e.onNodeApprove(t.pendingRequestId);break;case`reject`:e.canManagePairing&&t.pendingRequestId&&e.onNodeReject(t.pendingRequestId);break;case`remove`:e.canManagePairing&&t.onRemove?.()}}}
    >
      <button
        slot="trigger"
        type="button"
        class="btn btn--sm btn--ghost device-entry__menu-trigger"
        aria-label=${h(`devices.inventory.actionsName`,{name:t.name})}
        title=${h(`devices.inventory.actions`)}
      >
        ${D.moreHorizontal}
      </button>
      ${t.desktopEnvironment?w`<wa-dropdown-item value="desktop"
              >${h(`devices.inventory.openDesktop`)}</wa-dropdown-item
            >`:x}
      ${t.pendingRequestId?w`
              <wa-dropdown-item
                value="approve"
                ?disabled=${!e.canManagePairing}
                title=${n}
                >${h(`devices.inventory.approve`)}</wa-dropdown-item
              >
              <wa-dropdown-item
                value="reject"
                ?disabled=${!e.canManagePairing}
                title=${n}
                >${h(`devices.inventory.reject`)}</wa-dropdown-item
              >
            `:x}
      ${t.deviceId?w`<wa-dropdown-item value="copy"
              >${h(`devices.inventory.copyDeviceId`)}</wa-dropdown-item
            >`:x}
      ${t.onEditAlias?w`<wa-dropdown-item
              value="editAlias"
              ?disabled=${!e.canManagePairing}
              title=${n}
              >${h(`devices.inventory.editAlias`)}</wa-dropdown-item
            >`:x}
      ${t.onRemove?w`<wa-dropdown-item
              value="remove"
              variant="danger"
              ?disabled=${!e.canManagePairing}
              title=${n}
              >${h(`devices.inventory.removeAction`)}</wa-dropdown-item
            >`:x}
    </wa-dropdown>
  `}function J(){return(J=e((()=>{S(),vt(),E(),st(),g(),fe(),ve()})))()}function Y(e){return ie(e,{style:`legacy-binary`,maxUnit:`tera`,separator:` `,fractionDigits:(e,t)=>+(t===`tera`||e<10)})}function X(e,t,n,r,i,a=80,o=90){let s=i===void 0?t<a?`ok`:t<o?`warn`:`danger`:`stale`,c=i===void 0?n:`${n} · ${i}`,l=i===void 0?r:`${r} · ${h(`devices.inventory.lastKnown`,{time:i})}`;return w`<span class="device-resource device-resource--${e}" title=${l}>
    <span class="device-resource__label">${c}</span>
    ${Lt({mode:`continuous`,percent:Math.min(100,Math.max(0,t)),tone:s,label:l})}
  </span>`}function ir(e,t){if(!e)return x;let n=t===void 0?void 0:xe(Math.max(0,Date.now()-t)),r=[];if(e.loadAverage&&e.cpuCount>0){let t=h(`devices.inventory.loadTitle`,{averages:e.loadAverage.map(e=>e.toFixed(2)).join(` / `),cores:String(e.cpuCount)});r.push(X(`load`,e.loadAverage[0]/e.cpuCount*100,h(`devices.inventory.loadLabel`,{load:e.loadAverage[0].toFixed(1)}),t,n,70,100))}if(e.memoryTotalBytes>0&&e.memoryFreeBytes>=0){let t=e.memoryTotalBytes-e.memoryFreeBytes,i=Y(t),a=Y(e.memoryTotalBytes),o=a.slice(a.lastIndexOf(` `)),s=i.endsWith(o)?i.slice(0,-o.length):i;r.push(X(`memory`,t/e.memoryTotalBytes*100,`${s} / ${a}`,h(`devices.inventory.memoryTitle`,{used:i,total:a}),n))}if(e.diskTotalBytes!=null&&e.diskTotalBytes>0&&e.diskAvailableBytes!=null){let t=Y(e.diskAvailableBytes),i=Y(e.diskTotalBytes);r.push(X(`disk`,(1-e.diskAvailableBytes/e.diskTotalBytes)*100,h(`devices.inventory.diskLabel`,{available:t}),h(`devices.inventory.diskTitle`,{available:t,total:i}),n))}return r.length?w`<div class="device-resources">${r}</div>`:x}function ar(){return(ar=e((()=>{S(),Rt(),g(),b()})))()}function Z(...e){let t=new Set;for(let r of e)for(let e of n(r))t.add(e);return[...t].toSorted()}function or(e,t){let n=new Set(e);return t.every(e=>n.has(e))}function sr(e){return{roles:Z(e.roles,e.role),scopes:s(e.scopes)}}function cr(e){let t=Z(e.roles,e.role),n=Array.isArray(e.tokens)?e.tokens:e.tokens?Object.values(e.tokens):void 0;return{roles:n===void 0?t:Z(n.filter(e=>!e.revokedAtMs).flatMap(e=>e.role??[])).filter(e=>t.includes(e)),scopes:s(e.scopes)}}function lr(e,t){let n=sr(e),r=t?cr(t):null;return r?or(r.roles,n.roles)?or(r.scopes,n.scopes)?{kind:`re-approval`,requested:n,approved:r}:{kind:`scope-upgrade`,requested:n,approved:r}:{kind:`role-upgrade`,requested:n,approved:r}:{kind:`new-pairing`,requested:n,approved:null}}function ur(){return(ur=e((()=>{te()})))()}function dr(e,t,n){let i=new Map(t.map(e=>[r(e.deviceId),e]).filter(e=>!!e[0]));return e.map(e=>hr(e,n,fr(i,e)))}function fr(e,t){let n=r(t.deviceId);if(!n)return;let i=e.get(n);if(!i)return;let a=r(t.publicKey),o=r(i.publicKey);if(!(a&&o&&a!==o))return i}function pr(e){return e?h(`devices.inventory.rolesAndScopes`,{roles:y(e.roles),scopes:y(e.scopes)}):h(`devices.inventory.none`)}function mr(e){switch(e){case`scope-upgrade`:return h(`devices.inventory.scopeUpgrade`);case`role-upgrade`:return h(`devices.inventory.roleUpgrade`);case`re-approval`:return h(`devices.inventory.reapproval`);case`new-pairing`:return h(`devices.inventory.newPairing`)}throw Error(`unsupported pending approval kind`)}function hr(e,t,n){let i=r(e.displayName)||e.deviceId,a=typeof e.ts==`number`?v(e.ts):h(`common.na`),o=lr(e,n),s=e.isRepair?` · ${h(`devices.inventory.repair`)}`:``;return w`
    <div class="settings-row device-entry">
      ${Sn(D.monitorSmartphone)}
      <div class="device-entry__body">
        <div class="device-entry__heading">
          <span class="settings-row__title">${i}</span>
          <span class="device-entry__status"
            >${M({kind:`warn`,label:h(`devices.inventory.pendingApproval`)})}</span
          >
        </div>
        <span class="settings-row__desc">
          ${h(`devices.inventory.requestedAt`,{note:mr(o.kind),time:a})}${s}
        </span>
      </div>
      <div class="settings-row__control">
        <button
          class="btn btn--sm"
          ?disabled=${!t.canManagePairing}
          @click=${()=>t.onDeviceApprove(e.requestId)}
        >
          ${h(`devices.inventory.approve`)}
        </button>
        <button
          class="btn btn--sm"
          ?disabled=${!t.canManagePairing}
          @click=${()=>t.onDeviceReject(e.requestId)}
        >
          ${h(`devices.inventory.reject`)}
        </button>
        ${q(t,{name:i,deviceId:e.deviceId})}
      </div>
      <details class="device-entry__details">
        <summary>${h(`devices.inventory.details`)}</summary>
        <dl class="device-entry__facts">
          <dt class="settings-row__desc">${h(`devices.inventory.deviceIdLabel`)}</dt>
          <dd class="settings-row__value settings-row__value--mono" title=${e.deviceId}>
            ${e.deviceId}
          </dd>
          ${e.remoteIp?w`<dt class="settings-row__desc">${h(`devices.inventory.remoteIpLabel`)}</dt>
                  <dd class="settings-row__value settings-row__value--mono">${e.remoteIp}</dd>`:x}
          <dt class="settings-row__desc">${h(`devices.inventory.requestedAccessLabel`)}</dt>
          <dd class="settings-row__value">${pr(o.requested)}</dd>
          ${o.approved?w`<dt class="settings-row__desc">
                    ${h(`devices.inventory.approvedAccessLabel`)}
                  </dt>
                  <dd class="settings-row__value">${pr(o.approved)}</dd>`:x}
        </dl>
      </details>
    </div>
  `}function gr(){return(gr=e((()=>{S(),ur(),E(),P(),g(),b(),J(),V()})))()}function _r(e){let t=tn(e);return{id:e.id,name:e.name,...t}}function vr(e,t,n){if(n&&e.length===0)return``;let r=e.filter(e=>e.primary.connected).length,i=[h(`devices.inventory.summaryConnected`,{connected:String(r),total:String(e.length)})];return t>0&&i.push(h(`devices.inventory.summaryPending`,{count:String(t)})),i.join(` · `)}function yr(e){let t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],r=Array.isArray(t.paired)?t.paired:[],i=Zt({paired:r,nodes:e.nodes,presence:e.presence}),a=$t(e.presence),o=en(e.presence,i),s=Qt(i),c=e.loading||e.devicesLoading,l=w`
    ${s.length>0?w`
            <button
              class="btn btn--sm danger"
              title=${e.canManagePairing?``:h(`devices.readOnly.pairingRequired`)}
              ?disabled=${!e.canManagePairing}
              @click=${()=>e.onInventoryCleanup(s.map(_r))}
            >
              ${D.trash} ${h(`devices.inventory.cleanupStale`,{count:String(s.length)})}
            </button>
          `:x}
    <button
      class="btn"
      title=${e.canPairDevice?``:h(`devices.pairing.adminRequired`)}
      ?disabled=${!e.canPairDevice}
      @click=${e.onDevicePairSetupOpen}
    >
      ${D.plus} ${h(`devices.pairing.button`)}
    </button>
  `,u=i.length===0&&!a,d=w`
    ${a?Ar({kind:`gateway`,entry:a},e):x}
    ${c&&i.length===0?it():u?at(h(`devices.inventory.empty`)):i.map(t=>br(t,e))}
  `;return w`
    ${e.devicesError?w`<div class="callout danger">${e.devicesError}</div>`:x}
    ${e.lastError?w`<div class="callout danger">${e.lastError}</div>`:x}
    ${n.length>0?N({title:h(`devices.inventory.pendingApproval`),count:n.length},dr(n,r,e)):x}
    ${N({title:h(`devices.inventory.title`),description:vr(i,n.length,c),actions:l},d)}
    ${o.length>0?N({title:h(`devices.inventory.connectedWithoutPairing`)},o.map(t=>Ar({kind:`unpaired`,entry:t},e))):x}
  `}function br(e,t){return e.duplicates.length===0?Q(e.primary,t):w`
    ${Q(e.primary,t)}
    <details class="device-group__dups">
      <summary>
        ${h(e.duplicates.length===1?`devices.inventory.olderPairing`:`devices.inventory.olderPairings`,{count:String(e.duplicates.length),name:e.name})}
      </summary>
      ${e.duplicates.map(e=>Q(e,t))}
    </details>
  `}function xr(e){let t=r(e)?.toLowerCase();return t===`win32`||t===`windows`||t?.startsWith(`windows `)===!0}function Sr(e){let t=e.node;return t?.paired?t.approvalState===void 0||t.approvalState===`approved`:!1}function Cr(e){let t=r(e.node?.coreVersion);if(t)return t;if(r(e.node?.uiVersion))return;let n=r(e.node?.platform)?.toLowerCase();return n===`darwin`||n===`linux`||n===`win32`||n===`windows`?r(e.node?.version):void 0}function wr(e,t){let n=[],i=Sr(e),a=Cr(e),o=r(t);if(i&&a&&o&&a!==o){let e=h(`devices.inventory.versionDriftTitle`,{nodeVersion:a,gatewayVersion:o});n.push(w`<span title=${e}>
        ${M({kind:`warn`,label:h(`devices.inventory.versionDrift`)})}
      </span>`)}e.node?.workerBundle?.status===`missing`&&n.push(w`<span title=${h(`devices.inventory.workerMissingTitle`)}>
        ${M({kind:`warn`,label:h(`devices.inventory.workerMissing`)})}
      </span>`),i&&e.node?.connected===!1&&xr(e.platform)&&n.push(w`<span title=${h(`devices.inventory.manualWakeTitle`)}>
        ${M({kind:`warn`,label:h(`devices.inventory.manualWake`)})}
      </span>`);let s=e.node?.approvalState;return(s===`pending-approval`||s===`pending-reapproval`)&&n.push(M({kind:`warn`,label:h(`devices.inventory.approvalNeeded`)})),n}function Tr(e){return h(`devices.inventory.inputAgo`,{time:xe(e*1e3,{suffix:!1})})}function Er(e){let t=[];if(e.platform&&t.push(ut(e.platform,e.deviceFamily)),e.modelIdentifier){let n=ht(e.modelIdentifier);n&&t.push(n),t.push(e.modelIdentifier)}e.version&&t.push(e.version),e.node?.workerBundle?.status===`installed`&&t.push(h(`devices.inventory.workerVersion`,{version:e.node.workerBundle.version})),e.connected&&e.presence?.lastInputSeconds!=null?t.push(Tr(e.presence.lastInputSeconds)):!e.connected&&e.lastSeenAtMs?t.push(h(`devices.inventory.seen`,{time:v(e.lastSeenAtMs)})):!e.connected&&e.approvedAtMs&&t.push(h(`devices.inventory.approved`,{time:v(e.approvedAtMs)}));for(let n of e.roles)t.push(n);return e.autoApproved&&t.push(h(`devices.inventory.autoPaired`)),t.join(` · `)}function Dr(e){if(e.length===0)return x;let t=e.slice(0,Nr),n=e.length-t.length,r=n>0?` +${n}`:``;return w`<dt class="settings-row__desc">${h(`devices.inventory.commands`)}</dt>
    <dd class="settings-row__value settings-row__value--mono">${y(t)}${r}</dd>`}function Or(e,t){let n=e.device?.tokens??[],r=e.node?.commands??[],i=e.scopes;return w`
    <details class="device-entry__details">
      <summary>${h(`devices.inventory.details`)}</summary>
      <dl class="device-entry__facts">
        <dt class="settings-row__desc">${h(`devices.inventory.deviceIdLabel`)}</dt>
        <dd class="settings-row__value settings-row__value--mono" title=${e.id}>${e.id}</dd>
        ${e.remoteIp?w`<dt class="settings-row__desc">${h(`devices.inventory.remoteIpLabel`)}</dt>
                <dd class="settings-row__value settings-row__value--mono">${e.remoteIp}</dd>`:x}
        ${i.length>0?w`<dt class="settings-row__desc">${h(`devices.inventory.scopesLabel`)}</dt>
                <dd class="device-entry__scopes">
                  ${i.map(e=>w`<span class="device-capability device-capability--scope"
                        >${e}</span
                      >`)}
                </dd>`:x}
        ${n.length>0?w`<dt class="settings-row__desc">${h(`devices.inventory.tokens`)}</dt>
                <dd class="device-entry__tokens">
                  <table
                    class="device-token-table settings-table--stacked"
                    role="table"
                    aria-label=${h(`devices.inventory.tokens`)}
                  >
                    <thead>
                      <tr>
                        <th scope="col">${h(`devices.inventory.tokenRole`)}</th>
                        <th scope="col">${h(`devices.inventory.tokenStatus`)}</th>
                        <th scope="col">${h(`devices.inventory.scopesLabel`)}</th>
                        <th scope="col">${h(`devices.inventory.tokenAge`)}</th>
                        <th scope="col">${h(`devices.inventory.actions`)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${n.map(n=>Mr({id:e.id,name:e.name},n,t))}
                    </tbody>
                  </table>
                </dd>`:x}
        ${Dr(r)}
      </dl>
    </details>
  `}function Q(e,t){let n=qn({workerSlots:e.node?.workerSlots,capabilities:e.node?.caps,commands:e.node?.commands,unavailable:e.node?.connected!==!0||!Sr(e)}),r=e.node?.approvalState===`pending-approval`||e.node?.approvalState===`pending-reapproval`?e.node.pendingRequestId:void 0,i=nr(t,`node:${e.id}`),a=e.node?.connected??e.connected,o=M(a?{kind:`ok`,label:h(`devices.inventory.connected`)}:{kind:`muted`,label:h(`devices.inventory.offline`)});return w`
    <div class="settings-row device-entry" title=${n?.title??x}>
      ${Sn(xn(e))}
      <div class="device-entry__body">
        <div class="device-entry__heading">
          <span class="settings-row__title">${e.name}</span>
          <span class="device-entry__status">${o}</span>
        </div>
        <span class="settings-row__desc">${Er(e)}</span>
        ${ir(e.node?.hostStats,a?void 0:e.node?.hostStats?.updatedAtMs)}
        ${Qn(e.node?.caps??[])}
      </div>
      <div class="settings-row__control">
        ${n?.meter??x} ${wr(e,t.gatewayVersion)}
        ${jr(t,i,e.node?.commands)}
        ${q(t,{name:e.name,deviceId:e.id,desktopEnvironment:i,pendingRequestId:r,onEditAlias:e.device?()=>t.onDeviceRename({id:e.id,name:e.name,operatorLabel:e.device?.operatorLabel}):void 0,onRemove:()=>t.onInventoryRemove(_r(e))})}
      </div>
      ${Or(e,t)}
    </div>
  `}function kr(e){let t=[];if(e.platform&&t.push(ut(e.platform,e.deviceFamily)),e.modelIdentifier){let n=ht(e.modelIdentifier);n&&t.push(n),t.push(e.modelIdentifier)}return e.version&&t.push(e.version),e.lastInputSeconds!=null&&t.push(Tr(e.lastInputSeconds)),t}function Ar(e,t){let{entry:n}=e,r=e.kind===`gateway`,i=kr(n);r&&t.gatewaySystemInfo&&i.push(h(`devices.inventory.uptime`,{time:Ue(t.gatewaySystemInfo.uptimeMs)??``})),!r&&Array.isArray(n.roles)&&i.push(...n.roles.filter(Boolean));let a=r?D.server:xn({clientMode:n.mode??void 0,platform:n.platform??void 0,modelIdentifier:n.modelIdentifier??void 0}),o=r?n.host??h(`devices.execApprovals.gateway`):n.host??n.mode??h(`devices.inventory.unknownClient`),s=r?nr(t,`gateway`):void 0;return w`
    <div class="settings-row device-entry">
      ${Sn(a)}
      <div class="device-entry__body">
        <div class="device-entry__heading">
          <span class="settings-row__title">${o}</span>
          <span class="device-entry__status">
            ${M(r?{kind:`accent`,label:h(`devices.inventory.gateway`)}:{kind:`muted`,label:h(`devices.inventory.unpaired`)})}
          </span>
        </div>
        ${i.length>0?w`<span class="settings-row__desc">${i.join(` · `)}</span>`:x}
        ${r?ir(t.gatewaySystemInfo):x}
      </div>
      <div class="settings-row__control">
        ${jr(t,s)}
        ${q(t,{name:o,deviceId:n.deviceId,desktopEnvironment:s})}
      </div>
    </div>
  `}function jr(e,t,n){return t?w`<button
      class="btn btn--sm device-entry__desktop"
      title=${h(`devices.inventory.desktopOpenWindow`)}
      @click=${()=>_t(e.basePath,t)}
    >
      ${D.monitor} ${h(`devices.inventory.desktop`)}
    </button>`:n?.includes(`desktop.stream`)?w`<span
        class="device-capability device-capability--disabled"
        aria-disabled="true"
        title=${h(`devices.inventory.desktopEnableHint`)}
        >${D.monitor} ${h(`devices.inventory.desktop`)}</span
      >`:x}function Mr(e,t,n){let r=t.revokedAtMs?h(`devices.inventory.revoked`):h(`devices.inventory.active`),i=y(t.scopes),a=v(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return w`
    <tr>
      <td data-label=${h(`devices.inventory.tokenRole`)}>${t.role}</td>
      <td data-label=${h(`devices.inventory.tokenStatus`)}>${r}</td>
      <td data-label=${h(`devices.inventory.scopesLabel`)}>${i}</td>
      <td data-label=${h(`devices.inventory.tokenAge`)}>${a}</td>
      <td data-label=${h(`devices.inventory.actions`)}>
        <div class="device-entry__token-actions">
          <button
            class="btn btn--sm"
            ?disabled=${!n.canManagePairing}
            @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
          >
            ${h(`devices.inventory.rotate`)}
          </button>
          ${t.revokedAtMs?x:w`
                  <button
                    class="btn btn--sm danger"
                    ?disabled=${!n.canManagePairing}
                    @click=${()=>n.onDeviceRevoke(e.id,t.role)}
                  >
                    ${h(`devices.inventory.revoke`)}
                  </button>
                `}
        </div>
      </td>
    </tr>
  `}var Nr;function Pr(){return(Pr=e((()=>{S(),vt(),E(),P(),Jn(),g(),Ge(),b(),pt(),B(),gt(),tr(),J(),ar(),gr(),V(),Nr=16})))()}function Fr(e){let t=Ir(e),n=In(e);return et(w`
      ${!e.canManagePairing||!e.canAdmin?w`<div class="callout info" role="note">
              ${h(!e.canManagePairing&&!e.canAdmin?`devices.readOnly.pairingAndAdminRequired`:e.canManagePairing?`devices.readOnly.adminRequired`:`devices.readOnly.pairingRequired`)}
            </div>`:x}
      ${yr(e)} ${Ln(n)}
      ${Lr(t)}
    `,{wide:!0})}function Ir(e){return{...e,...Br(e.configForm),ready:!!e.configForm,disabled:!e.canAdmin||e.configLoading||e.configSaving||e.configFormMode===`raw`,nodes:bn(e.nodes,[`system.run`]),inventory:cn({nodes:e.nodes})}}function Lr(e){let t=e.nodes.length>0,n=w`
    <button
      class="btn"
      ?disabled=${e.disabled||!e.configDirty}
      @click=${e.onSaveBindings}
    >
      ${e.configSaving?h(`common.saving`):h(`common.save`)}
    </button>
  `,r=w`
    ${e.canAdmin?x:F({title:h(`devices.readOnly.adminRequired`)})}
    ${e.configFormMode===`raw`?F({title:h(`devices.binding.formModeHint`)}):x}
    ${e.ready?w`
            ${F({title:h(`devices.binding.defaultBinding`),description:t?h(`devices.binding.defaultBindingHint`):w`${h(`devices.binding.defaultBindingHint`)} ${h(`devices.binding.noNodes`)}`,control:zr(null,e)})}
            ${e.agents.length===0?F({title:h(`devices.binding.noAgents`)}):e.agents.map(t=>Rr(t,e))}
          `:F({title:h(`devices.binding.loadConfigHint`),control:w`
              <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
                ${e.configLoading?h(`common.loading`):h(`common.loadConfig`)}
              </button>
            `})}
  `;return N({title:h(`devices.binding.execNodeBinding`),description:h(`devices.binding.execNodeBindingSubtitle`),actions:n},r)}function Rr(e,t){let n=e.binding??`__default__`,r=e.name?.trim()?`${e.name} (${e.id})`:e.id;return F({title:r,description:w`
      ${e.isDefault?h(`devices.binding.defaultAgent`):h(`devices.binding.agent`)} ·
      ${n===`__default__`?h(`devices.binding.usesDefault`,{node:t.defaultBinding??h(`devices.binding.any`)}):h(`devices.binding.override`,{node:e.binding??``})}
    `,control:zr(e,t)})}function zr(e,t){let n=e===null,r=n?``:`__default__`,i=n?t.defaultBinding??``:e.binding??`__default__`,a;if(i!==r)try{a=_n(t.inventory,i)}catch{}let o=t.nodes.map(e=>({...e,id:e.id===a?i:e.id,disabled:!1}));return i!==r&&!o.some(e=>e.id===i)&&o.push({id:i,label:`${i} (${h(`devices.binding.unavailable`)})`,disabled:!0}),w`
    <select
      class="settings-select"
      aria-label=${h(n?`devices.binding.node`:`devices.binding.binding`)}
      .value=${T(i)}
      ?disabled=${t.disabled||t.nodes.length===0&&i===r}
      @change=${n=>{let r=n.target.value.trim();e===null?t.onBindDefault(r||null):t.onBindAgent(e.id,r===`__default__`?null:r)}}
    >
      <option value=${r} ?selected=${i===r}>
        ${h(n?`devices.binding.anyNode`:`devices.binding.useDefault`)}
      </option>
      ${we(o,e=>e.id,e=>w`<option
            value=${e.id}
            ?selected=${i===e.id}
            ?disabled=${e.disabled}
          >
            ${e.label}
          </option>`)}
    </select>
  `}function Br(e){let t={id:`main`,name:void 0,isDefault:!0,binding:null};if(!e||typeof e!=`object`)return{defaultBinding:null,agents:[t]};let n=(e.tools??{}).exec??{},r=typeof n.node==`string`&&n.node.trim()?n.node.trim():null,i=yn(e).map(e=>{let t=(e.record.tools??{}).exec??{},n=typeof t.node==`string`&&t.node.trim()?t.node.trim():null;return{id:e.id,name:e.name,isDefault:e.isDefault,binding:n}});return i.length===0?{defaultBinding:r,agents:[t]}:{defaultBinding:r,agents:i}}function Vr(){return(Vr=e((()=>{S(),Te(),De(),ln(),vn(),P(),g(),Kn(),Pr(),V()})))()}var Hr,Ur,Wr,$;function Gr(){return(Gr=e((()=>{ae(),Ye(),S(),Ce(),re(),Le(),ke(),Ie(),Me(),Bt(),P(),It(),g(),se(),pe(),Be(),B(),L(),We(),Se(),qe(),_e(),sn(),Vr(),Hr=`https://docs.openclaw.ai/nodes`,Ur=3e4,Wr=6e4,$=class extends me{constructor(...e){super(...e),this.presence=[],this.gatewaySystemInfo=null,this.desktopEnvironments=[],this.systemInfoUnavailable=!1,this.pageState=At(),this.canPairDevice=!1,this.canManagePairing=!1,this.canAdmin=!1,this.execApprovalsTarget=`gateway`,this.execApprovalsTargetNodeId=null,this.pendingConfirmation=null,this.dialogs=new on({canManagePairing:()=>this.canManagePairing,gatewayConnected:()=>this.gateway.connected,requestGeneration:()=>this.requestGeneration,gatewayClient:()=>this.gateway.client,gatewayUrl:()=>this.context.gateway.connection.gatewayUrl,runPageTask:e=>this.runPageTask(e),pendingDialog:()=>this.pendingConfirmation,setPendingDialog:e=>{this.pendingConfirmation=e},setDevicesError:e=>{this.pageState.devicesError=e,this.requestUpdate()}}),this.routeDataInitialized=!1,this.gateway=new He(this,{getGateway:()=>this.context?.gateway,onIdentityChange:e=>this.resetServerState(e.snapshot),invalidateRequests:e=>{this.pageState.requestGeneration=this.gateway.epoch,!e.identityChanged&&e.snapshot.phase!==`connected`&&this.resetServerState(e.snapshot),this.presenceTask.run([null,null])},onSnapshot:e=>this.handleGatewaySnapshot(e),ensureInitialData:()=>this.ensureInitialData()}),this.presenceTask=new k(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.gateway:null,this.gateway.connected?this.gateway.client:null],task:([e,t],{signal:n})=>e&&t?t.request(`system-presence`,{},{signal:n}):A,onComplete:e=>{Array.isArray(e)&&(this.presence=e)},onError:e=>{de(e)&&(this.presence=[])}}),this.systemInfoTask=new k(this,{args:()=>[this.gateway.gateway,this.canLoadSystemInfo?this.gateway.client:null],task:([e,t],{signal:n})=>e&&t?t.request(`system.info`,{},{signal:n}):A,onComplete:e=>{this.gatewaySystemInfo=e,this.systemInfoPolling.stop(),this.systemInfoPolling.start()},onError:e=>{de(e)&&(this.gatewaySystemInfo=null,this.systemInfoUnavailable=!0,this.systemInfoPolling.stop())}}),this.environmentsTask=new k(this,{args:()=>[this.gateway.gateway,this.canLoadDesktopEnvironments?this.gateway.client:null],task:([e,t],{signal:n})=>e&&t?t.request(`environments.list`,{},{signal:n}):A,onComplete:e=>{this.desktopEnvironments=e.environments},onError:()=>{this.desktopEnvironments=[]}}),this.systemInfoPolling=new Ke(this,Wr,()=>this.refreshSystemInfo(),!1),this.polling=new Ke(this,Ur,()=>{this.refreshNodeInventory(!0),this.canManagePairing&&this.runPageTask(e=>R(e,{quiet:!0}))},!1),this.subscriptions=new oe(this).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{if(this.gateway.gateway!==e||this.context.gateway!==e)return;let n=t.event===`presence`?O(t.payload):null;if(n){let e=nn(n)!==nn(this.presence);this.presenceTask.run([null,null]),this.presence=n,e&&(this.canManagePairing&&this.runPageTask(e=>R(e,{quiet:!0})),this.refreshNodeInventory(!0))}(t.event===`device.pair.changed`||t.event===`device.pair.requested`||t.event===`device.pair.resolved`)&&this.canManagePairing&&this.runPageTask(e=>R(e,{quiet:!0})),(t.event===`node.pair.requested`||t.event===`node.pair.resolved`||t.event===`node.runnerInventory.changed`||t.event===`node.hostStats`)&&this.refreshNodeInventory(!0)}))}willUpdate(e){e.has(`routeData`)&&this.applyRouteData()}updated(e){e.has(`routeData`)&&this.ensureInitialData()}disconnectedCallback(){this.cancelPendingConfirmation(),this.subscriptions.clear(),this.presenceTask.run([null,null]),this.resetInventoryDetails(),this.presence=[],this.canPairDevice=!1,this.canManagePairing=!1,this.canAdmin=!1,super.disconnectedCallback()}get requestGeneration(){return this.pageState.requestGeneration}handleGatewaySnapshot(e){let t=e.snapshot;if(this.pageState.client=t.client,this.pageState.connected=t.phase===`connected`,this.pageState.requestGeneration=this.gateway.epoch,this.syncGatewayState(t),this.canLoadSystemInfo||(this.systemInfoTask.run([null,null]),this.gatewaySystemInfo=null),this.canLoadDesktopEnvironments||(this.environmentsTask.run([null,null]),this.desktopEnvironments=[]),this.routeDataInitialized&&t.phase===`connected`&&t.client&&(e.identityChanged||e.connectionChanged)){let e=O(t.hello?.snapshot);this.presence=e??[],this.loadPresence()}this.syncPolling()}syncGatewayState(e){let t=e.phase===`connected`,n=e.hello?.auth??null;this.canAdmin=t&&Pe(n),this.canManagePairing=t&&(!n||Oe(n)),this.canPairDevice=this.canAdmin}applyRouteData(){let e=this.routeData;if(!e)return;this.routeDataInitialized=!0;let t=this.context.gateway.snapshot;if(!this.gateway.isRouteDataCurrent(e)){this.resetServerState(t),this.presence=O(t.hello?.snapshot)??[],this.loadPresence(),this.ensureInitialData();return}this.pageState={...e.devices,client:t.client,connected:t.phase===`connected`,requestGeneration:this.gateway.epoch};let n=O(t.hello?.snapshot);n&&(this.presence=n),this.loadPresence()}resetServerState(e){this.cancelPendingConfirmation(),this.pageState.requestGeneration+=1;let t=At({client:e.client,connected:e.phase===`connected`});t.requestGeneration=this.gateway.epoch,this.pageState=t,this.presenceTask.run([null,null]),this.presence=[],this.resetInventoryDetails()}async runPageTask(e){let t=this.pageState;try{let n=e(t);return this.pageState===t&&this.requestUpdate(),await n}finally{this.pageState===t&&this.requestUpdate()}}ensureInitialData(){let e=this.pageState;if(!e.connected||!e.client||!this.routeDataInitialized)return;!e.nodes.length&&!e.nodesLoading&&this.refreshNodeInventory(),this.canManagePairing&&!e.devicesList&&!e.devicesLoading&&this.runPageTask(e=>R(e));let t=this.context.runtimeConfig.state;!t.configSnapshot&&!t.configLoading&&this.context.runtimeConfig.refresh(),this.canAdmin&&!e.execApprovalsSnapshot&&!e.execApprovalsLoading&&this.runPageTask(e=>jt(e,this.resolveExecApprovalsTarget()))}syncPolling(){if(this.canLoadSystemInfo?this.systemInfoPolling.start():this.systemInfoPolling.stop(),this.gateway.connected&&this.gateway.client){this.polling.start();return}this.polling.stop()}get canLoadSystemInfo(){let e=this.gateway.snapshot;return this.isConnected&&e?.phase===`connected`&&!this.systemInfoUnavailable&&Ve(e,`system.info`)===!0}get canLoadDesktopEnvironments(){let e=this.gateway.snapshot;return this.isConnected&&!!(e&&Ne(e))}refreshSystemInfo(){this.canLoadSystemInfo&&this.systemInfoTask.status!==Je.PENDING&&this.systemInfoTask.run()}refreshNodeInventory(e=!1){this.refreshSystemInfo(),this.canLoadDesktopEnvironments&&this.environmentsTask.status!==Je.PENDING&&this.environmentsTask.run(),this.runPageTask(t=>xt(t,{quiet:e}))}resetInventoryDetails(){this.systemInfoTask.run([null,null]),this.environmentsTask.run([null,null]),this.systemInfoPolling.stop(),this.gatewaySystemInfo=null,this.desktopEnvironments=[],this.systemInfoUnavailable=!1}loadPresence(){let e=this.gateway.gateway,t=this.gateway.client;return!e||!this.gateway.connected||!t?Promise.resolve():this.presenceTask.run([e,t])}cancelPendingConfirmation(){this.pendingConfirmation?.abort(),this.pendingConfirmation=null}async reportRotationOutcome(e,t,n){if(!this.canManagePairing)return;let r=await this.runPageTask(r=>wt(r,{deviceId:e.id,gatewayUrl:this.context.gateway.connection.gatewayUrl,role:t,scopes:n}));r&&await(r.delivery===`in-band`?zt({title:h(`devices.inventory.rotatePromptTitle`,{role:t}),message:h(`devices.inventory.rotatePromptBody`),secret:r.token,acknowledgeLabel:h(`devices.inventory.rotateAcknowledge`),dismissHint:h(`devices.inventory.rotateDismissHint`)}):zt({title:h(`devices.inventory.rotateWithheldTitle`,{device:e.name}),status:`success`,message:h(`devices.inventory.rotateWithheldNext`),callout:h(`devices.inventory.rotateWithheldException`),acknowledgeLabel:h(`common.close`),note:h(`devices.inventory.rotateWithheldNote`)}))}resolveExecApprovalsTarget(){return this.execApprovalsTarget===`node`&&this.execApprovalsTargetNodeId?{kind:`node`,nodeId:this.execApprovalsTargetNodeId}:{kind:`gateway`}}render(){let e=this.pageState,t=this.context.runtimeConfig.state,n=this.context.gateway.snapshot,r=n.phase===`connected`&&n.hello?.server?.version?.trim()||null;return w`
      <section class="content-header">
        <div>
          <div class="page-title">${Re(`devices`)}</div>
          <div class="page-subtitle">
            ${Fe(`devices`)} ${nt(Hr)}
          </div>
        </div>
      </section>
      ${Ft(Fr({loading:e.nodesLoading,nodes:e.nodes,presence:this.presence,gatewayVersion:r,basePath:this.context.basePath,gatewaySystemInfo:this.gatewaySystemInfo,desktopEnvironments:this.desktopEnvironments,lastError:e.lastError,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,canPairDevice:this.canPairDevice,canManagePairing:this.canManagePairing,canAdmin:this.canAdmin,configForm:ge(t),configLoading:t.configLoading,configSaving:t.configSaving,configDirty:t.configFormDirty,configFormMode:t.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:this.execApprovalsTarget,execApprovalsTargetNodeId:this.execApprovalsTargetNodeId,onDevicePairSetupOpen:()=>{this.canAdmin&&this.context.overlays.openDevicePairSetup()},onDeviceApprove:e=>{this.canManagePairing&&this.runPageTask(t=>Mt(t,e))},onDeviceReject:e=>void this.dialogs.confirmPairingReject(`device`,e),onNodeApprove:e=>{this.canManagePairing&&this.runPageTask(t=>Ot(t,e))},onNodeReject:e=>void this.dialogs.confirmPairingReject(`node`,e),onInventoryRemove:e=>void this.dialogs.confirmInventoryRemoval({kind:`entry`,entry:e}),onInventoryCleanup:e=>{e.length>0&&this.dialogs.confirmInventoryRemoval({kind:`stale`,entries:e})},onDeviceRotate:(e,t,n)=>void this.reportRotationOutcome(e,t,n),onDeviceRevoke:(e,t)=>void this.dialogs.confirmTokenRevoke(e,t),onDeviceRename:e=>void this.dialogs.editAlias(e),onLoadConfig:()=>void this.context.runtimeConfig.discardDraft({reloadOnly:!0}),onLoadExecApprovals:()=>this.canAdmin?void this.runPageTask(e=>jt(e,this.resolveExecApprovalsTarget())):void 0,onBindDefault:e=>{this.canAdmin&&(e?this.context.runtimeConfig.patchForm([`tools`,`exec`,`node`],e):this.context.runtimeConfig.removeFormValue([`tools`,`exec`,`node`]))},onBindAgent:(e,t)=>{if(!this.canAdmin)return;let n=this.context.runtimeConfig.agentEntry(e,{ensure:!!t});if(!n)return;let r=[...n.path,`tools`,`exec`,`node`];t?this.context.runtimeConfig.patchForm(r,t):this.context.runtimeConfig.removeFormValue(r)},onSaveBindings:()=>{this.canAdmin&&this.context.runtimeConfig.save()},onExecApprovalsTargetChange:(t,n)=>{this.execApprovalsTarget=t,this.execApprovalsTargetNodeId=n,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null,this.requestUpdate()},onExecApprovalsSelectAgent:t=>{e.execApprovalsSelectedAgent=t,this.requestUpdate()},onExecApprovalsPatch:(e,t)=>this.canAdmin?void this.runPageTask(n=>Pt(n,e,t)):void 0,onExecApprovalsRemove:e=>this.canAdmin?void this.runPageTask(t=>St(t,e)):void 0,onSaveExecApprovals:()=>this.canAdmin?void this.runPageTask(e=>yt(e,this.resolveExecApprovalsTarget())):void 0}))}
    `}},a([l({context:Ae,subscribe:!0})],$.prototype,`context`,void 0),a([Ee({attribute:!1})],$.prototype,`routeData`,void 0),a([C()],$.prototype,`presence`,void 0),a([C()],$.prototype,`gatewaySystemInfo`,void 0),a([C()],$.prototype,`desktopEnvironments`,void 0),a([C()],$.prototype,`pageState`,void 0),a([C()],$.prototype,`canPairDevice`,void 0),a([C()],$.prototype,`canManagePairing`,void 0),a([C()],$.prototype,`canAdmin`,void 0),a([C()],$.prototype,`execApprovalsTarget`,void 0),a([C()],$.prototype,`execApprovalsTargetNodeId`,void 0),customElements.get(`openclaw-devices-page`)||customElements.define(`openclaw-devices-page`,$)})))()}Gr();
//# sourceMappingURL=devices-page-Dxm7iSFS.js.map