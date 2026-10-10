const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./browser-0zBSz2BU.js","./rolldown-runtime-8BhlS34s.js","./control-ui-foundation-DaCuy7E_.js","./control-ui-core-CndkyZ8m.js","./lit-runtime-CIjzngcy.js","./control-ui-core-C5mtYcym.js","./gateway-runtime-BvWNTqPo.js","./control-ui-core-DvoiO6cr.css","./sw-refresh.runtime-BiVyx37h.js","./control-ui-boot-shared-DpHhsTHW.js","./control-ui-boot-shared-ChkOvQif.js","./control-ui-boot-shared-DNpYeKSN.js","./control-ui-boot-shared-DwSLfX8E.js","./control-ui-boot-shared-DPto3YH7.js","./control-ui-boot-shared-C018SffO.js","./markdown-runtime-vPNULjtl.js","./config-runtime-B4vvJ76O.js","./control-ui-boot-shared-DF3-KJRn.js","./control-ui-boot-shared-DlJEsz5Q.js","./control-ui-boot-shared-hN7_nGsj.js","./control-ui-boot-shared-6jDbGebE.js","./control-ui-boot-shared-DwO55ELU.js","./control-ui-boot-shared-CoE663Cg.js","./control-ui-boot-shared-Bt2ZINpX.js","./control-ui-boot-shared-BahwINek.css","./ghostty-web-BO1g3HFo.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Li as n,Mi as r,Oa as i,da as a,ji as o,ka as s,sa as c}from"./control-ui-foundation-DaCuy7E_.js";import{Al as l,Cl as u,Ss as d,Tl as f,ac as p,bs as m,nt as ee,rt as te,sc as ne,wl as re,xs as ie}from"./control-ui-core-CndkyZ8m.js";import{$ as h,Q as g,_t as ae,at as oe,dt as _,it as se,nt as v,pt as y,v as ce,x as le,y as ue}from"./lit-runtime-CIjzngcy.js";import{Ar as de,Di as b,Ei as x,Or as fe,_r as S,br as pe,jr as me,kr as he,vr as C,wi as ge}from"./control-ui-core-C5mtYcym.js";import{B as _e,U as ve,V as ye,z as be}from"./control-ui-boot-shared-DwSLfX8E.js";import{B as xe,F as Se,Ft as w,I as Ce,It as T,O as we,P as Te,R as Ee,k as De,z as Oe}from"./control-ui-boot-shared-DpHhsTHW.js";import{i as ke,n as Ae,r as je,t as Me}from"./dock-panel-styles-BPO0AWJL.js";import{a as Ne,i as Pe,n as Fe,r as Ie,t as E}from"./panel-tab-strip-BIRzRpfc.js";import{n as Le,t as Re}from"./dock-destination-controls-DIWMQYZZ.js";import{n as D}from"./theme-color-DAo4KRoc.js";import{a as O,c as ze,i as Be,l as Ve,o as k,r as He,s as A,t as Ue}from"./catalog-terminal-start-DCiYWCmM.js";var j,M;function N(){return(N=e((()=>{j=16777216,M=864e5,Math.ceil(j/3)*4})))()}function We(e){return e.shellName??l(`terminal.tabLabel`,{n:String(e.sequence)})}function Ge(e){return e.agentId===null||e.cwd===null?null:l(`terminal.tabHint`,{agent:e.agentId,cwd:e.cwd})}function Ke(e){return e.status===`connecting`?l(`terminal.connecting`):e.status===`exited`?e.exitReason===`detached`?l(`terminal.detached`):typeof e.exitSignal==`number`&&e.exitSignal>0?l(`terminal.exitedSignal`,{signal:String(e.exitSignal)}):e.exitReason===`process_exit`&&typeof e.exitCode==`number`?l(`terminal.exitedCode`,{code:String(e.exitCode)}):l(`terminal.exited`):null}function P(e){return e.map(e=>({id:e.id,label:We(e),title:Ge(e),icon:F,statusLabel:Ke(e),badge:e.agentOwned?l(`terminal.agentOwnedBadge`):null,className:`is-${e.status}`}))}function qe(e){let t=P(e.tabs).map(e=>Object.assign(e,{domId:`terminal-tab-${e.id}`,closeLabel:`${l(`terminal.closeSession`)}: ${e.label}`}));return Ie({tabs:t,activeId:e.activeId,ariaControls:`terminal-tab-panel`,onSelect:e.onSelect,onClose:e.onClose,onNew:e.onNew,newLabel:l(`terminal.newSession`),newDisabled:e.booting})}var F;function I(){return(I=e((()=>{g(),f(),E(),F=se`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4l3 3-3 3M8 11h5" /></svg>`})))()}async function Je(e,t,n,r){let i={sessionId:t,...n};return await(r?e.request(`terminal.upload`,i,{signal:r}):e.request(`terminal.upload`,i))}async function Ye(e){if(e.size>L)throw Error(l(`terminal.uploadTooLarge`,{file:e.name}));let t=new Uint8Array(await e.arrayBuffer()),n=[],r=32768;for(let e=0;e<t.length;e+=r)n.push(String.fromCharCode(...t.subarray(e,e+r)));return btoa(n.join(``))}function Xe(e){return/^[A-Za-z0-9_@%+=:,./-]+$/u.test(e)?e:`'${e.replaceAll(`'`,`'\\''`)}'`}function Ze(e,t,n){if(n===`native`){if(i(e))throw Error(l(`terminal.uploadInvalidNativePath`));if(/^(?:[a-z]:[\\/]|\\\\)/iu.test(e)){if(e.includes(`"`))throw Error(l(`terminal.uploadInvalidNativePath`));return`"${e}"`}if(!e.startsWith(`/`))throw Error(l(`terminal.uploadInvalidNativePath`));return`"${e.replace(/[\\"$`]/gu,`\\$&`)}"`}let r=t.split(/[\\/]/u).pop()?.toLowerCase()??``;if(/^(?:pwsh|powershell)(?:\.exe)?$/u.test(r))return`'${e.replaceAll(`'`,`''`)}'`;if(/^cmd(?:\.exe)?$/u.test(r)){if(/[%!]/u.test(e))throw Error(l(`terminal.uploadUnsafeCmdPath`));return`"${e.replaceAll(`"`,`""`)}"`}if(!/^(?:(?:ba|da|a|k|z)?sh|fish)(?:\.exe)?$/u.test(r))throw Error(l(`terminal.uploadUnsupportedShell`,{shell:r||t}));return Xe(e)}var L;function R(){return(R=e((()=>{s(),f(),L=16777216})))()}function Qe(e){if(typeof e==`object`&&e&&`retryable`in e){let t=e;return t.gatewayCode===`UNAVAILABLE`||t.code===`UNAVAILABLE`||t.retryable===!0}return!0}function $e(e){return v`<div class="rail-header__actions tp-actions">
    <button
      class="rail-header__action tp-icon tp-upload"
      type="button"
      title=${l(`terminal.addFiles`)}
      aria-label=${l(`terminal.addFiles`)}
      ?disabled=${e.upload.hasPendingBatch()||!e.upload.hasActiveTab()}
      @click=${e.upload.chooseFiles}
    >
      ${x.paperclip}
    </button>
    ${e.fullscreen?h:v`${e.sessionPicker}${e.embedded?v`<button
                  class="rail-header__action tp-icon"
                  type="button"
                  title=${l(`terminal.dockBottom`)}
                  aria-label=${l(`terminal.dockBottom`)}
                  @click=${()=>e.onDock(`bottom`)}
                >
                  ${x.panelBottomOpen}
                </button>`:v`${Le({current:e.dock,groupClass:`tp-dock-modes`,groupLabel:l(`terminal.dockMode`),destinations:[{dock:`bottom`,label:l(`terminal.dockBottom`),icon:x.panelBottomOpen,className:`tp-icon`},{dock:`right`,label:l(`terminal.dockRight`),icon:x.panelRightOpen,className:`tp-icon`},{dock:`main`,label:l(`terminal.dockMain`),icon:x.columns2,className:`tp-icon`}],onSelect:e.onDock})}
                  <button
                    class="rail-header__action tp-icon tp-open-fullscreen"
                    type="button"
                    data-new-tab-action
                    title=${l(`terminal.openWindow`)}
                    aria-label=${l(`terminal.openWindow`)}
                    @click=${e.onOpenFullscreen}
                  >
                    ${x.maximize}
                  </button>
                  <button
                    class="rail-header__action tp-icon"
                    type="button"
                    title=${l(`terminal.hide`)}
                    aria-label=${l(`terminal.hide`)}
                    @click=${e.onHide}
                  >
                    ${x.x}
                  </button>`}`}
  </div>`}function et(e){let t=e.progress;return v`${e.dragActive?v`<div class="tp-drop-overlay">${l(`terminal.dropFiles`)}</div>`:h}
  ${t?v`<div
          class="tp-upload-card ${t.state===`failed`?`tp-upload-card--failed`:``}"
          role=${t.state===`failed`?`alert`:`status`}
          aria-live=${t.state===`failed`?`assertive`:`polite`}
        >
          <div class="tp-upload-card__header">
            <div class="tp-upload-card__copy">
              <div class="tp-upload-card__title">
                ${t.state===`failed`?l(`terminal.uploadFailed`):l(`terminal.uploadProgress`,{current:String(t.current),total:String(t.total)})}
              </div>
              <div class="tp-upload-card__file">${t.fileName}</div>
            </div>
            <div class="tp-upload-card__actions">
              ${t.state===`failed`&&t.retryable?v`<button
                      class="tp-upload-card__action tp-upload-retry"
                      type="button"
                      @click=${e.retry}
                    >
                      ${l(`terminal.retryUpload`)}
                    </button>`:h}
              <button
                class="tp-upload-card__action tp-upload-cancel"
                type="button"
                @click=${e.cancel}
              >
                ${l(`common.cancel`)}
              </button>
            </div>
          </div>
          <div
            class="tp-upload-progress"
            role="progressbar"
            aria-label=${t.state===`failed`?l(`terminal.uploadFailed`):l(`terminal.uploadProgress`,{current:String(t.current),total:String(t.total)})}
            aria-valuemin="0"
            aria-valuemax=${String(t.total)}
            aria-valuenow=${String(t.completed)}
          >
            <span
              class="tp-upload-progress__fill"
              style=${`width:${t.completed/t.total*100}%`}
            ></span>
            ${t.state===`uploading`?v`<span class="tp-upload-progress__activity"></span>`:h}
          </div>
          ${t.error?v`<div class="tp-upload-card__error">${t.error}</div>`:h}
          ${t.state===`failed`&&t.canInsert?v`<div class="tp-upload-card__recovery">
                  <button
                    class="tp-upload-card__action tp-upload-insert"
                    type="button"
                    @click=${e.insertCompleted}
                  >
                    ${l(`terminal.insertUploadedPaths`)}
                  </button>
                </div>`:h}
        </div>`:h}`}var z;function B(){return(B=e((()=>{g(),N(),f(),d(),Re(),b(),R(),z=class{constructor(e){this.host=e,this.dragActive=!1,this.batch=null,this.dragDepth=0,this.chooseFiles=()=>{this.host.fileInput()?.click()},this.handleFileSelection=e=>{let t=e.currentTarget,n=Array.from(t.files??[]);t.value=``,this.uploadFiles(n)},this.handleDragEnter=e=>{this.hasDraggedFiles(e)&&this.hasActiveTab()&&!this.hasPendingBatch()&&(e.preventDefault(),this.dragDepth+=1,this.dragActive=!0,this.host.requestUpdate())},this.handleDragOver=e=>{this.hasDraggedFiles(e)&&this.hasActiveTab()&&!this.hasPendingBatch()&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`copy`))},this.handleDragLeave=e=>{this.hasDraggedFiles(e)&&(this.dragDepth=Math.max(0,this.dragDepth-1),this.dragDepth===0&&(this.dragActive=!1,this.host.requestUpdate()))},this.handleDrop=e=>{this.hasDraggedFiles(e)&&(e.preventDefault(),this.dragDepth=0,this.dragActive=!1,this.host.requestUpdate(),!this.hasPendingBatch()&&this.uploadFiles(Array.from(e.dataTransfer?.files??[])))},this.insertCompleted=()=>{let e=this.batch;e?.state===`failed`&&e.paths.length>0&&this.insertPaths(e)},this.retry=()=>{let e=this.batch;if(e&&e.state===`failed`&&e.retryable){if(!this.host.isCurrent(e.tab)||!this.host.client()){this.cancelBatch(e);return}this.ensureUploadsRetained(e)&&(e.state=`uploading`,e.error=null,e.retryable=!1,e.abortController=new AbortController,this.host.requestUpdate(),this.runBatch(e))}},this.cancel=()=>{let e=this.batch;e&&this.cancelBatch(e)}}hasActiveTab(){return!!this.host.activeTab()}hasPendingBatch(){return this.batch!==null}get progress(){let e=this.batch;if(!e)return null;let t=e.files.length,n=Math.min(e.nextIndex,t-1);return{completed:e.nextIndex,canInsert:e.paths.length>0&&(e.expiresAtMs===null||Date.now()<e.expiresAtMs),current:n+1,error:e.error,fileName:e.files[n]?.name??``,retryable:e.retryable,state:e.state,total:t}}hasDraggedFiles(e){return Array.from(e.dataTransfer?.types??[]).includes(`Files`)}uploadFiles(e){let t=this.host.activeTab();if(e.length===0||!t||!this.host.client()||this.hasPendingBatch())return;this.host.setError(null);let n={tab:t,files:e,paths:[],expiresAtMs:null,nextIndex:0,state:`uploading`,error:null,retryable:!1,abortController:new AbortController};this.batch=n,this.host.requestUpdate(),this.runBatch(n)}isActive(e){return this.batch===e&&!e.abortController.signal.aborted}ensureCurrent(e){return this.isActive(e)?this.host.isCurrent(e.tab)?!0:(this.cancelBatch(e),!1):!1}failBatch(e,t,n){this.ensureCurrent(e)&&(e.state=`failed`,e.error=m(t),e.retryable=n,this.host.requestUpdate())}ensureUploadsRetained(e){return e.expiresAtMs!==null&&Date.now()>=e.expiresAtMs?(this.failBatch(e,Error(l(`terminal.uploadExpired`)),!1),!1):!0}async runBatch(e){let t=this.host.client();if(!t||!this.ensureCurrent(e)){this.cancelBatch(e);return}for(;e.nextIndex<e.files.length;){let n=e.files[e.nextIndex];if(!n||!this.ensureCurrent(e)||!this.ensureUploadsRetained(e))return;this.host.requestUpdate();let r;try{r=await Ye(n)}catch(t){this.failBatch(e,t,!1);return}if(!this.ensureCurrent(e))return;let i,a=Date.now();try{if(i=await Je(t,e.tab.gatewaySessionId,{name:n.name,contentBase64:r},e.abortController.signal),!this.ensureCurrent(e))return}catch(t){this.failBatch(e,t,Qe(t));return}let o;try{o=Ze(i.path,e.tab.shell,i.uploadPathStyle)}catch(t){this.failBatch(e,t,!1);return}e.paths.push(o),e.expiresAtMs??=a+M,e.nextIndex+=1,this.host.requestUpdate()}this.insertPaths(e)}insertPaths(e){this.ensureCurrent(e)&&this.ensureUploadsRetained(e)&&(e.tab.controller.terminal.paste(e.paths.join(` `)),e.tab.controller.terminal.focus(),this.batch=null,this.host.requestUpdate())}cancelForTab(e){let t=this.batch;t?.tab===e&&this.cancelBatch(t)}cancelBatch(e){this.batch===e&&(e.abortController.abort(),this.batch=null,this.dragActive=!1,this.dragDepth=0,this.host.requestUpdate())}dispose(){this.batch?.abortController.abort(),this.batch=null,this.dragActive=!1,this.dragDepth=0}}})))()}function tt(e,t,n,r,i,a,o,s){return $e({fullscreen:e,embedded:t,dock:n,upload:r,sessionPicker:i,onDock:a,onOpenFullscreen:o,onHide:s})}function nt(e,t,n,r,i,a,o){return v`<header class="rail-header tp-header">
    ${qe({tabs:e,activeId:t,booting:n,onSelect:i,onClose:a,onNew:o})}
    ${r}
  </header>`}function rt({activeId:e,tabsInHeader:t=!1,connecting:n,error:r,uploadController:i}){return v`
    ${r?v`<div class="tp-error" role="alert">
            <span>${r.text}</span>
            ${r.retry?v`<button class="btn btn--sm" type="button" @click=${r.retry}>
                    ${l(`common.retry`)}
                  </button>`:h}
          </div>`:h}
    <wa-tab-panel
      id="terminal-tab-panel"
      class="tp-viewport"
      name=${e??`terminal`}
      active
      aria-labelledby=${e&&!t?`terminal-tab-${e}`:h}
      aria-label=${t?l(`terminal.title`):h}
      @dragenter=${i.handleDragEnter}
      @dragover=${i.handleDragOver}
      @dragleave=${i.handleDragLeave}
      @drop=${i.handleDrop}
    >
      ${n?T(`terminal`,l(`terminal.connecting`),!1,!0):h}
      ${!e&&!n&&!r?De({icon:x.terminal,heading:l(`chat.sidePanel.terminal`),description:l(`chat.sidePanel.terminalEmpty`)}):h}
      <input
        class="tp-file-input"
        type="file"
        multiple
        aria-hidden="true"
        tabindex="-1"
        @change=${i.handleFileSelection}
      />
      ${et(i)}
    </wa-tab-panel>
  `}function it(e){return e instanceof O?l(`terminal.connectionTimedOut`):e instanceof k?l(`terminal.unusableSession`,{field:e.field}):m(e)}function V(){return(V=e((()=>{g(),f(),d(),b(),we(),w(),A(),I(),B()})))()}function H(e){let t=e.getRootNode();return t instanceof ShadowRoot?t.activeElement??document.activeElement:document.activeElement}function U(e,t){return t===e||e.contains(t)}function at(e){e instanceof HTMLElement&&e.isConnected&&e.focus()}function W(e,t){try{e.dispose()}catch{}finally{t.remove()}}async function ot(e,t,n,r){if(r.aborted)return!1;let i=e.controller,a=e.host,o=H(a),s=U(a,o),c=a.cloneNode();c.style.display=`block`,c.style.visibility=`hidden`,c.inert=!0,a.before(c);let l,u=()=>{U(c,H(c))&&at(o),l?W(l,c):c.remove()};try{if(l=await t(c,{readOnly:!0}),r.aborted||(n&&l.write(st.encode(n)),await new Promise(e=>{setTimeout(e,0)}),r.aborted))return u(),!1}catch(e){throw u(),e}let d=H(a),f=null;return U(a,d)?f=c:U(c,d)&&(f=s?c:o),c.inert=!1,l.setReadOnly(i.readOnly),c.style.display=a.style.display,c.style.visibility=a.style.visibility,e.controller=l,e.host=c,W(i,a),at(f),!0}var st;function G(){return(G=e((()=>{st=new TextEncoder})))()}function ct(e,t){let n=e?.trim();return!t&&n&&!ne(n)?n:void 0}function lt(e){let t=e.split(/[\\/]/).pop()?.trim();return t&&t.length>0?t:`shell`}function K(e){let t=e.terminal;t.renderer&&t.wasmTerm&&t.renderer.render(t.wasmTerm,!0,t.viewportY,t,0)}var ut,q;function J(){return(J=e((()=>{p(),ut=`ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Symbols Nerd Font Mono", "MesloLGLDZ Nerd Font Mono", "JetBrainsMono Nerd Font Mono", "Liberation Mono", monospace`,q=new TextEncoder})))()}function dt(e,t){let n=new ze(ft,{mode:`latch`},e=>e.length);return{buffer:n,onData:r=>{let i=pt.decode(r),a=t();a?e.input(a,i):n.push(i)},onResize:({columns:n,rows:r})=>{let i=t();i&&e.resize(i,n,r)}}}var ft,pt;function mt(){return(mt=e((()=>{Ve(),ft=8192,pt=new TextDecoder})))()}function ht(){let e=getComputedStyle(document.documentElement);return{background:D(e,`--bg`),cursor:D(e,`--accent`),foreground:D(e,`--text`)}}function gt(e){let t=ht();return{...e===`light`?vt:_t,...t,cursorAccent:t.background,selectionBackground:`${t.cursor}${e===`light`?`4d`:`52`}`}}var _t,vt;function Y(){return(Y=e((()=>{_t={black:`#1b1e26`,red:`#ff6b6b`,green:`#4ec9a8`,yellow:`#e5c07b`,blue:`#5aa2ff`,magenta:`#c586c0`,cyan:`#56b6c2`,white:`#d7dae0`,brightBlack:`#5c6370`,brightRed:`#ff8787`,brightGreen:`#6fd7bd`,brightYellow:`#f0d197`,brightBlue:`#7cb7ff`,brightMagenta:`#d7a3d4`,brightCyan:`#7bd3dd`,brightWhite:`#ffffff`},vt={black:`#3a3f4b`,red:`#c62f3d`,green:`#177a5e`,yellow:`#8f6400`,blue:`#1e66d0`,magenta:`#94439c`,cyan:`#0f7487`,white:`#1b1e26`,brightBlack:`#5c6370`,brightRed:`#a3242f`,brightGreen:`#0f664e`,brightYellow:`#755200`,brightBlue:`#1a55ab`,brightMagenta:`#7c3382`,brightCyan:`#0c6070`,brightWhite:`#0a0c10`}})))()}async function yt(e){let{panel:t,connection:n}=e,r=document.createElement(`div`);if(r.className=`tp-host`,await t.updateComplete,!e.isCurrent())throw Error(`terminal operation cancelled`);let i=t.findTerminalPanelViewport();if(!i)throw Error(`terminal viewport unavailable`);i.append(r);let a={},s=dt(n,()=>a.current?.gatewaySessionId),{createTerminalDefaultColorQueryResponder:c}=await o(async()=>{let{createTerminalDefaultColorQueryResponder:e}=await import(`./browser-0zBSz2BU.js`);return{createTerminalDefaultColorQueryResponder:e}},__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url),l=c({getColors:ht,reply:e=>s.onData(q.encode(e))}),u=(n,r)=>t.createTerminalController({parent:n,readOnly:r?.readOnly??!1,terminalOptions:{fontSize:11,fontFamily:ut,cursorBlink:!0,theme:gt(t.themeMode),scrollback:5e3},signal:e.signal,onData:s.onData,onResize:s.onResize}),d;try{d=await u(r)}catch(e){throw r.remove(),e}if(!e.isCurrent())throw W(d,r),Error(`terminal operation cancelled`);let f={id:`tab-${e.sequence}`,sequence:e.sequence,gatewaySessionId:``,pendingInput:s.buffer,defaultColorQueries:l,shellName:null,shell:``,agentId:null,cwd:null,agentOwned:!1,controller:d,host:r,status:`connecting`,awaitFirstOutput:e.awaitFirstOutput,readyTimer:null};return a.current=f,{tab:f,connection:n,cols:d.terminal.cols||80,rows:d.terminal.rows||24,sink:{onData:t=>{f.cancelled||(f.defaultColorQueries.observe(t),f.controller.write(q.encode(t)),t.length>0&&e.onReady(f))},onReplay:({data:t,newlyObservedFrom:n,mode:r,signal:i})=>{if(!(f.cancelled||i.aborted)){if(f.defaultColorQueries.primeFromReplay(t.slice(0,n)),f.defaultColorQueries.observe(t.slice(n)),r===`recovery`)return ot(f,u,t,i).then(n=>{n&&t&&e.onReady(f)});t&&(f.controller.write(q.encode(t)),e.onReady(f))}},onExit:t=>e.onExit(f,t)}}}function bt(){return(bt=e((()=>{G(),J(),mt(),Y(),r()})))()}async function xt(e,t){await t,e&&(e.controller.fit(),K(e.controller),e.controller.terminal.focus())}function St(e,t){let n;for(let r of e){let e=r.controller.terminal;e.renderer&&e.wasmTerm&&(e.renderer.setTheme(n??=gt(t)),K(r.controller))}}function Ct(e,t,n){if(!n)return;for(let t of e)t.host.parentElement!==n&&n.append(t.host);let r=e.find(e=>e.id===t);r&&(r.controller.fit(),K(r.controller))}function wt(e,t){e.find(e=>e.id===t)?.controller.fit()}function Tt(e){for(let t of e)t.controller.fit()}function Et(e,t){for(let n of e)n.host.style.display=n.id===t?`block`:`none`}function X(){return(X=e((()=>{J(),Y()})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=class{constructor(e){this.options=e}markReady(e){this.stop(e),e.status===`connecting`&&(e.status=`live`,this.options.onReady(e))}arm(e){!e.readyTimer&&e.status===`connecting`&&e.awaitFirstOutput&&(e.readyTimer=setTimeout(()=>{e.readyTimer=null,this.options.isCurrent(e)&&e.status===`connecting`&&e.awaitFirstOutput&&(e.awaitFirstOutput=!1,this.options.onTimeout(e))},this.options.timeoutMs()))}stop(e){e.readyTimer&&=(clearTimeout(e.readyTimer),null),e.awaitFirstOutput=!1}}})))()}async function kt(e,t){for(let n of t)if(await n(),!e())return}var At;function jt(){return(jt=e((()=>{At=class{constructor(){this.tail=Promise.resolve(),this.generation=0}enqueue(e){let t=this.generation,n=()=>t===this.generation,r=()=>n()?e(n):Promise.resolve(),i=this.tail.then(r,r);return this.tail=i.catch(()=>{}),i}enqueueSteps(...e){return this.enqueue(t=>kt(t,e))}reset(){this.generation+=1}}})))()}var Mt;function Nt(){return(Nt=e((()=>{f(),d(),Ue(),A(),G(),V(),bt(),X(),J(),Se(),Ee(),Ot(),jt(),r(),Mt=class{constructor(e){this.host=e,this.tabs=[],this.activeId=null,this.booting=!1,this.error=null,this.connection=null,this.activeClient=null,this.activeAvailable=!1,this.hadClient=!1,this.hadAvailable=!1,this.lifecycleGeneration=0,this.lifecycleAbortController=new AbortController,this.lifecycleSyncToken=0,this.tabSequence=0,this.pendingRestore=null,this.intentQueue=Ce,this.bootQueue=new At;let t=null;this.intentHost={bootQueue:this.bootQueue,currentGeneration:()=>this.lifecycleGeneration,canRun:()=>this.terminalActionsCanRun(),attach:(e,t,n)=>this.attachSessionNow(e,t,n),open:(e,t,n)=>this.openSessionNow(e,t,n),reattach:e=>this.reattachPersistedSessions(e),cancelledRestoreCompleted:()=>{this.error||this.closeEmptyPanel()},ensureInitial:async(e,t)=>{if(this.tabs.length===0){let n=this.host.page?this.host.routeTarget:null;return n&&`sessionId`in n?this.attachSessionNow(n.sessionId,!1,t):this.openSessionNow(n?.catalog,e,t)}return this.terminalActionsCanRun()},hasTabs:()=>this.tabs.length>0,requestUpdate:()=>this.host.requestUpdate(),setBooting:e=>this.updateControllerState({booting:e}),timeoutMs:()=>this.host.catalogReadyTimeoutMs,showTimeout:()=>{t=this.setError(l(`terminal.refreshRequired`))},clearTimeout:()=>{t&&this.error===t&&this.setError(null),t=null}},this.readiness=new Dt({timeoutMs:()=>this.host.catalogReadyTimeoutMs,isCurrent:e=>this.tabs.includes(e),onReady:e=>{delete e.pendingOpen,this.updateControllerState({tabs:[...this.tabs]}),this.persistSessions()},onTimeout:e=>{this.setError(l(`terminal.connectionTimedOut`),e.pendingOpen),this.connection?.close(e.gatewaySessionId),this.removeTab(e),this.persistSessions()}})}updateControllerState(e){Object.assign(this,e),this.host.requestUpdate()}setError(e,t){return this.updateControllerState({error:e?{text:e,retryAction:t}:null}),this.error}retryOpen(){let e=this.error?.retryAction;e&&(this.setError(null),this.intentQueue.queue(e))}connectHost(){this.host.page&&(this.intentQueue=new Te(!1)),this.activeClient=this.host.client,this.activeAvailable=this.host.available,this.hadClient=this.host.client!==null,this.hadAvailable=this.host.available,this.intentQueue.bindHost(this.intentHost),this.updateControllerState({booting:this.intentQueue.hasActions})}disconnectHost(){this.intentQueue.releaseHost(this.intentHost),this.disposeAllTabs(),this.activeClient=null,this.activeAvailable=!1}scheduleLifecycleSync(){let e=++this.lifecycleSyncToken,t=this.lifecycleGeneration;queueMicrotask(()=>{e===this.lifecycleSyncToken&&t===this.lifecycleGeneration&&this.host.isConnected&&this.synchronizeLifecycle()})}synchronizeLifecycle(){let e=this.host.client!==this.activeClient,t=this.host.available!==this.activeAvailable;if(!e&&!t)return;let n=t&&this.host.available&&this.hadAvailable,r=e&&this.hadClient||n,i=this.host.client!==null&&r;e&&(this.activeClient=this.host.client,this.hadClient||=this.host.client!==null),this.activeAvailable=this.host.available,this.hadAvailable||=this.host.available;let a=t&&!this.host.available;(e||a)&&this.disposeAllTabs();let o=e&&this.host.available&&this.host.terminalPanelOpen;t&&(this.host.available?this.host.restoreTerminalPanelOpenState()&&(o=!0):this.host.hideTerminalPanelForUnavailableSurface()),i?this.refreshBeforeReconnectRestore(o):o?this.restoreSessions():this.intentQueue.drain()}refreshBeforeReconnectRestore(e){let t=this.lifecycleGeneration;this.intentQueue.beginRefreshFence(this.intentHost,t),e&&this.restoreSessions();let n=()=>{t===this.lifecycleGeneration&&this.host.isConnected&&this.intentQueue.releaseRefreshFence(this.intentHost)};o(async()=>{let{refreshControlUiServiceWorker:e}=await import(`./sw-refresh.runtime-BiVyx37h.js`);return{refreshControlUiServiceWorker:e}},__vite__mapDeps([8,9,1,2,3,4,5,6,10,11,12,13,14,15,16,17,18,19,20,21,22,23,7,24]),import.meta.url).then(({refreshControlUiServiceWorker:e})=>e()).then(e=>{e||n()},n)}restoreSessions(){return this.intentQueue.queue({kind:`restore`,agentId:this.host.agentId?.trim()||null})}terminalActionsCanRun(){return this.host.client!==null&&this.host.client===this.activeClient&&this.host.available&&this.host.terminalPanelOpen&&this.host.isConnected}cancelPendingActions(){this.intentQueue.cancel(this.intentHost)}get waitingForRefresh(){return this.intentQueue.waitingForRefresh}async reattachPersistedSessions(e){let t=this.captureTerminalOperation();if(!t||this.tabs.length>0)return!1;let n=Oe(this.storageScope);if(n.length===0)return!1;let r={operation:t,pending:new Map(n.map(e=>[e,void 0])),userClosedTab:!1,cancelIntent:e};this.pendingRestore=r,this.updateControllerState({booting:!0});try{let e=await this.connectionFor(t).list();if(!this.isTerminalOperationCurrent(t,r))return!1;let n=new Map(e.map(e=>[e.sessionId,e]));for(let e of r.pending.keys()){let i=n.get(e);if(i?await this.attachSession(e,t,i.owner?.startsWith(`agent:`)===!0,r):await this.restoreExitedSession(e,r),!this.isTerminalOperationCurrent(t,r))return!1;r.pending.delete(e),this.persistSessions()}}catch{}finally{this.isTerminalOperationCurrent(t,r)&&(this.pendingRestore=null,this.updateControllerState({booting:!1}),this.persistSessions())}return this.isTerminalOperationCurrent(t)&&r.userClosedTab}get storageScope(){return this.host.page?`:page:${JSON.stringify(this.host.routeTarget)}`:``}async listSessions(){let e=this.captureTerminalOperation();if(!e)return null;let t=await this.connectionFor(e).list().catch(()=>[]);return this.isTerminalOperationCurrent(e)?t:null}async attachSessionById(e,t=!1){await this.intentQueue.queue({kind:`attach`,sessionId:e,agentOwned:t})}async attachSessionNow(e,t,n){let r=this.tabs.find(t=>t.gatewaySessionId===e);if(r)return this.switchTo(r.id),!0;let i=this.captureTerminalOperation(n);if(!i)return!1;this.updateControllerState({booting:!0,error:null});try{let n=await this.attachSession(e,i,t);return n&&this.activeId&&this.switchTo(this.activeId),n||this.isTerminalOperationCurrent(i)}finally{this.isTerminalOperationCurrent(i)&&this.updateControllerState({booting:!1})}}async bootTab(e,t={}){let n=await yt({panel:this.host,connection:this.connectionFor(e),sequence:++this.tabSequence,signal:e.signal,awaitFirstOutput:t.awaitFirstOutput===!0,isCurrent:()=>this.isTerminalOperationCurrent(e,t.restore?.batch),onReady:e=>this.readiness.markReady(e),onExit:(e,t)=>this.handleExit(e.id,t)});if(!this.isTerminalOperationCurrent(e,t.restore?.batch))throw W(n.tab.controller,n.tab.host),Error(`terminal operation cancelled`);return t.restore?.batch.pending.set(t.restore.sessionId,n.tab),n.tab.cancelPendingIntent=e.cancelIntent,this.updateControllerState({tabs:[...this.tabs,n.tab],activeId:n.tab.id}),n}adoptSession(e,t,n=!1){this.retireRestoredTab(e),delete e.cancelPendingIntent,e.gatewaySessionId=t.sessionId,e.shellName=t.title??lt(t.shell),e.shell=t.shell,e.agentId=t.agentId,e.cwd=t.cwd,e.agentOwned=t.owner===void 0?n:t.owner.startsWith(`agent:`);let r=e.pendingInput.drain();if(e.status!==`exited`){let{cols:n,rows:i}=e.controller.terminal;this.connection?.resize(t.sessionId,n||80,i||24);for(let e of r)this.connection?.input(t.sessionId,e)}e.status===`connecting`&&(e.awaitFirstOutput?this.readiness.arm(e):this.readiness.markReady(e)),this.updateControllerState({tabs:[...this.tabs]}),this.persistSessions()}removeTab(e){this.disposeTab(e);let t=this.tabs.filter(t=>t.id!==e.id);this.updateControllerState({tabs:t,activeId:this.activeId===e.id?t.at(-1)?.id??null:this.activeId})}openSession(){return this.intentQueue.queue({kind:`open`,agentId:this.host.agentId?.trim()||null})}async openSessionNow(e,t,n){let r=this.captureTerminalOperation(n);if(!r)return!1;this.updateControllerState({booting:!0,error:null});let i=e?{kind:`catalog`,agentId:t,catalog:e}:{kind:`open`,agentId:t},a=ct(this.host.sessionKey,e),o;try{let n=await this.bootTab(r,{awaitFirstOutput:!!e});o=n.tab,n.tab.pendingOpen=i;let s=await n.connection.open({agentId:t??void 0,...a?{sessionKey:a}:{},cols:n.cols,rows:n.rows,...e?{catalog:e}:{}},n.sink);if(!this.isTerminalOperationCurrent(r)||n.tab.cancelled){let e=n.tab.cancelled===`close`;return n.connection.close(s.sessionId),this.tabs.includes(n.tab)&&(n.tab.cancelled=`lifecycle`,this.removeTab(n.tab)),e}return this.adoptSession(n.tab,s,a!==void 0),n.tab.controller.terminal.focus(),!0}catch(e){return o&&!o.gatewaySessionId&&this.tabs.includes(o)&&this.removeTab(o),this.isTerminalOperationCurrent(r)?(o?.cancelled!==`close`&&this.setError(it(e),e instanceof O||e instanceof k?i:void 0),!0):!1}finally{this.isTerminalOperationCurrent(r)&&this.updateControllerState({booting:!1})}}async attachSession(e,t,n=!1,r){let i,a,o=this.host.page?He(e,t.client):null;try{o&&(this.connection?.dispose(),this.connection=o.connection);let s=await this.bootTab(t,{awaitFirstOutput:o!==null,restore:r&&{batch:r,sessionId:e}});i=s.tab,a=s.connection,o&&o.bind(s.sink);let c=o?.result??await s.connection.attach(e,s.sink);return!this.isTerminalOperationCurrent(t,r)||s.tab.cancelled?(s.tab.cancelled===`close`&&s.connection.close(c.sessionId),this.tabs.includes(s.tab)&&(s.tab.cancelled=`lifecycle`,this.removeTab(s.tab)),!1):(this.adoptSession(s.tab,c,n),!0)}catch(n){if(o&&o.connection.close(o.result.sessionId),!this.isTerminalOperationCurrent(t,r,i))return!1;let s=r&&a?await this.confirmRestoredSessionGone(a,e,r):!1;return this.isTerminalOperationCurrent(t,r,i)?(i&&!i.gatewaySessionId&&this.tabs.includes(i)&&(s?this.markRestoredSessionExited(i,e):this.removeTab(i)),r||this.setError(`${l(`terminal.attachFailed`)}: ${m(n)}`),!1):!1}}async confirmRestoredSessionGone(e,t,n){let r=await e.list().catch(()=>null);return r!==null&&this.isTerminalOperationCurrent(n.operation,n)&&!r.some(e=>e.sessionId===t)}async restoreExitedSession(e,t){let n=await this.bootTab(t.operation,{restore:{batch:t,sessionId:e}});if(!this.isTerminalOperationCurrent(t.operation,t)||n.tab.cancelled){this.tabs.includes(n.tab)&&(n.tab.cancelled=`lifecycle`,this.removeTab(n.tab));return}this.markRestoredSessionExited(n.tab,e)}markRestoredSessionExited(e,t){e.gatewaySessionId=t,this.handleExit(e.id,{reason:`disconnected`,exitCode:null})}handleExit(e,t){let n=this.tabs.find(t=>t.id===e);n&&(this.retireRestoredTab(n),this.readiness.stop(n),delete n.pendingOpen,n.status=`exited`,n.exitReason=t.reason,n.exitCode=t.exitCode,n.exitSignal=t.signal,t.error?.trim()&&this.setError(ie(t.error)),this.updateControllerState({tabs:[...this.tabs]}),this.persistSessions())}closeTab(e){let t=this.tabs.find(t=>t.id===e);t&&(t.cancelled=`close`,t.cancelPendingIntent?.(),this.retireRestoredTab(t),this.host.terminalPanelUploadController.cancelForTab(t),t.gatewaySessionId&&t.status!==`exited`&&this.connection?.close(t.gatewaySessionId),this.removeTab(t),this.persistSessions(),this.closeEmptyPanel())}closeEmptyPanel(){this.tabs.length===0&&!this.host.fullscreen&&!this.intentQueue.hasActions&&this.host.closeTerminalPanel()}switchTo(e){this.updateControllerState({activeId:e}),xt(this.tabs.find(t=>t.id===e),this.host.updateComplete)}retireRestoredTab(e){let t=this.pendingRestore;if(t&&this.isTerminalOperationCurrent(t.operation,t)){for(let[n,r]of t.pending)if(r===e){t.userClosedTab||=e.cancelled===`close`,t.pending.delete(n),e.cancelled===`close`&&t.pending.size===0&&t.cancelIntent?.();break}}}persistSessions(){let e=this.pendingRestore;if(e&&!this.isTerminalOperationCurrent(e.operation,e))return;let t=new Set(this.tabs.filter(e=>e.status===`live`&&e.gatewaySessionId).map(e=>e.gatewaySessionId));for(let n of e?.pending.keys()??[])t.add(n);xe([...t],this.storageScope)}captureTerminalOperation(e){let t=this.host.client;return this.intentQueue.fenced||!t||t!==this.activeClient||!this.host.available||!this.host.isConnected?null:{generation:this.lifecycleGeneration,client:t,signal:this.lifecycleAbortController.signal,cancelIntent:e}}isTerminalOperationCurrent(e,t,n){return this.host.isConnected&&this.host.available&&this.host.client===e.client&&this.activeClient===e.client&&this.lifecycleGeneration===e.generation&&(!t||this.pendingRestore===t)&&n?.cancelled!==`close`&&!e.signal.aborted}connectionFor(e){if(!this.isTerminalOperationCurrent(e))throw Error(`terminal operation cancelled`);return this.connection??=new Be(e.client),this.connection}disposeTab(e){this.readiness.stop(e),W(e.controller,e.host)}disposeAllTabs(){this.lifecycleGeneration+=1,this.pendingRestore=null,this.intentQueue.resetLifecycle(this.intentHost),this.lifecycleAbortController.abort(),this.lifecycleAbortController=new AbortController,this.bootQueue.reset(),this.error?.retryAction&&this.setError(this.error.text),this.updateControllerState({booting:!1}),this.host.terminalPanelUploadController.dispose();for(let e of this.tabs)e.cancelled=`lifecycle`,this.disposeTab(e);this.updateControllerState({tabs:[],activeId:null}),this.host.resetTerminalSessionPicker(),this.connection?.dispose(),this.connection=null}}})))()}var Pt;function Ft(){return(Ft=e((()=>{g(),Pt=ae`
  .tp--bottom {
    left: var(--shell-nav-width, 0);
    right: 0;
    bottom: 0;
    --tp-session-menu-max-height: calc(var(--tp-panel-height) - 44px);
  }
  .tp--right {
    top: var(--shell-topbar-height, 0);
    right: 0;
    bottom: 0;
    --tp-session-menu-max-height: calc(100dvh - var(--shell-topbar-height, 0px) - 44px);
  }
  .tp--main {
    /* Main mode owns the content region; later sibling docks may overlay it. */
    top: var(--shell-topbar-height, 0);
    left: var(--shell-nav-width, 0);
    right: 0;
    bottom: 0;
    --tp-session-menu-max-height: calc(100dvh - var(--shell-topbar-height, 0px) - 44px);
  }
  .tp--fullscreen {
    inset: 0;
  }
  .tp--embedded {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .tp-header .tabstrip-tab__icon {
    color: var(--muted, #8a919e);
  }
  /* Same glyph system as the side panel rail. Positioned so the session
     menu anchors to the header, not its mid-toolbar trigger: a
     trigger-anchored menu wider than the icons spills past the panel's
     left edge, and header anchoring makes 100% mean "panel width". */
  .tp-header {
    --rail-header-action-glyph-size: 15px;

    position: relative;
  }
  .tp-header .tabstrip-tab__icon svg,
  .tp-header .tp-icon svg {
    width: 15px;
    height: 15px;
    stroke-width: 1.6px;
  }
  .tp-dock-modes {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .tp-session-picker {
    position: static;
  }
  .tp-session-menu {
    position: absolute;
    z-index: 4;
    top: calc(100% + 3px);
    left: 8px;
    right: 8px;
    width: auto;
    max-width: 360px;
    /* Both edges are pinned, so the menu can never reach past the panel; the
       auto margin keeps it right-aligned under its trigger while it fits. */
    margin-left: auto;
    max-height: min(420px, var(--tp-session-menu-max-height));
    overflow-y: auto;
    padding: var(--menu-padding);
    border: 1px solid var(--overlay-border);
    border-radius: var(--menu-radius);
    background: var(--bg-elevated);
    box-shadow: var(--overlay-shadow);
  }
  .tp-session-menu--hosted {
    --tp-session-menu-max-height: calc(100% - 8px);

    top: 4px;
  }
  .tp-session-menu__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px 7px;
    color: var(--text, #d7dae0);
    font-size: 12px;
    font-weight: 600;
  }
  /* Refreshing the list is not destructive, so it reads as a plain action. */
  .tp-session-refresh {
    border: 0;
    background: transparent;
    color: var(--muted, #8a919e);
    font: inherit;
    font-weight: 500;
    padding: 2px 4px;
  }
  .tp-session-refresh:hover,
  .tp-session-refresh:focus-visible {
    color: var(--text, #d7dae0);
  }
  .tp-session {
    display: grid;
    grid-template-columns: minmax(70px, auto) minmax(100px, 1fr) auto;
    align-items: center;
    gap: 8px;
    width: 100%;
    border: 0;
    min-height: var(--menu-item-height);
    border-radius: var(--menu-item-radius);
    background: transparent;
    color: var(--text, #d7dae0);
    padding: 7px 8px;
    text-align: left;
  }
  .tp-session:not(:disabled):hover,
  .tp-session:not(:disabled):focus-visible {
    background: var(--bg-hover);
  }
  .tp-session:disabled {
    opacity: 0.55;
  }
  .tp-session__agent {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 600;
  }
  .tp-session__cwd {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--muted, #8a919e);
    font:
      11px ui-monospace,
      SFMono-Regular,
      "SF Mono",
      Menlo,
      Consolas,
      "Liberation Mono",
      monospace;
  }
  .tp-session__state {
    color: var(--muted, #8a919e);
    font-size: 11px;
    white-space: nowrap;
  }
  .tp-session-empty {
    padding: 10px 8px;
    color: var(--muted, #8a919e);
    font-size: 12px;
  }
  .tp-viewport {
    position: relative;
    flex: 1;
    min-height: 0;
    background: var(--bg, #0e1015);
  }
  .tp-host {
    position: absolute;
    inset: 0;
    z-index: 0;
    padding: 6px 8px;
    caret-color: transparent;
  }
  .tp-error {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    font-size: 12px;
    color: var(--danger, #ff6b6b);
  }
  .tp-error .btn {
    flex: 0 0 auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-elevated);
    color: var(--text);
    padding: 6px 10px;
    font: inherit;
  }
`})))()}var Z;function It(){return(It=e((()=>{g(),Z=ae`
  .rail-header__action:disabled {
    opacity: var(--rail-header-action-disabled-opacity, 0.4);
    pointer-events: none;
  }
  .tp-file-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .tp-drop-overlay {
    position: absolute;
    z-index: 4;
    inset: 8px;
    display: grid;
    place-items: center;
    border: 1px dashed var(--accent, #ff5c5c);
    background: color-mix(in srgb, var(--bg, #0e1015) 88%, var(--accent, #ff5c5c));
    color: var(--text, #d7dae0);
    font-size: 13px;
    pointer-events: none;
  }
  .tp-upload-card {
    position: absolute;
    z-index: 5;
    right: 10px;
    bottom: 10px;
    width: min(300px, calc(100% - 20px));
    box-sizing: border-box;
    padding: 9px 10px 10px;
    border: 1px solid var(--border, #262b34);
    border-radius: 7px;
    background: color-mix(in srgb, var(--bg, #0e1015) 94%, var(--text, #d7dae0));
    box-shadow: 0 8px 24px rgb(0 0 0 / 28%);
    color: var(--text, #d7dae0);
    font-size: 11px;
  }
  .tp-upload-card--failed {
    border-color: color-mix(in srgb, var(--danger, #ff6b6b) 55%, var(--border, #262b34));
  }
  .tp-upload-card__header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .tp-upload-card__copy {
    flex: 1;
    min-width: 0;
  }
  .tp-upload-card__title {
    color: var(--text, #d7dae0);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .tp-upload-card--failed .tp-upload-card__title,
  .tp-upload-card__error {
    color: var(--danger, #ff6b6b);
  }
  .tp-upload-card__file {
    margin-top: 2px;
    overflow: hidden;
    color: var(--muted, #8a919e);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tp-upload-card__error {
    margin-top: 6px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
  .tp-upload-card__actions {
    display: flex;
    gap: 4px;
  }
  .tp-upload-card__recovery {
    margin-top: 8px;
  }
  .tp-upload-card__action {
    margin: -3px 0;
    padding: 3px 5px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: var(--muted, #8a919e);
    font: inherit;
    cursor: var(--cursor-action);
  }
  .tp-upload-card__action:hover {
    background: color-mix(in srgb, var(--text, #d7dae0) 10%, transparent);
    color: var(--text, #d7dae0);
  }
  .tp-upload-card__action:focus-visible {
    outline: 1px solid var(--accent, #ff5c5c);
    outline-offset: 1px;
  }
  .tp-upload-retry {
    color: var(--accent, #ff5c5c);
  }
  .tp-upload-progress {
    position: relative;
    height: 3px;
    margin-top: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border, #262b34) 72%, transparent);
  }
  .tp-upload-progress__fill,
  .tp-upload-progress__activity {
    position: absolute;
    inset-block: 0;
    left: 0;
    border-radius: inherit;
    background: var(--accent, #ff5c5c);
  }
  .tp-upload-progress__fill {
    transition: width 180ms ease-out;
  }
  .tp-upload-progress__activity {
    width: 26%;
    opacity: 0.7;
    animation: tp-upload-progress 1.15s ease-in-out infinite;
  }
  .tp-upload-card--failed .tp-upload-progress__fill {
    background: var(--danger, #ff6b6b);
  }
  @keyframes tp-upload-progress {
    from {
      transform: translateX(-110%);
    }
    to {
      transform: translateX(385%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tp-upload-progress__activity {
      animation: none;
      transform: none;
    }
  }
`})))()}function Lt(e){return typeof e==`function`}async function Rt(e){let[{createGhosttyTerminal:t,loadGhosttyRuntime:r},i]=await Promise.all([o(()=>import(`./browser-0zBSz2BU.js`),__vite__mapDeps([0,1,2,3,4,5,6,7]),import.meta.url),o(()=>import(`./ghostty-web-BO1g3HFo.js`),__vite__mapDeps([25,1,2,3,4,5,6,7]),import.meta.url)]),a=await r({module:i}),s=await t({...e,runtime:a,autoFit:!1}),c=s.dispose.bind(s),l=s.terminal,u=new a.FitAddon;u.activate(l);let d;l.attachCustomKeyEventHandler(e=>e.defaultPrevented);let f=n(l)?.handleMouseUp,p=Lt(f)?f:void 0,m=!1;return s.fit=()=>{if(m)return;let e=u.proposeDimensions();e&&(e.cols!==l.cols||e.rows!==l.rows)&&s.resize({columns:e.cols,rows:e.rows})},s.dispose=()=>{m||(m=!0,d?.disconnect(),u.dispose(),p&&=(document.removeEventListener(`mouseup`,p),void 0),c())},e.signal?.aborted?s.dispose():e.autoFit!==!1&&(d=new ResizeObserver(()=>s.fit()),d.observe(e.parent),e.size||s.fit()),s}function zt(){return(zt=e((()=>{r()})))()}function Bt(e){return v`<button
    ${le(e.triggerRef)}
    class=${e.hosted?`rail-header__action`:`rail-header__action tp-icon`}
    type="button"
    title=${e.hosted?h:l(`terminal.sessions`)}
    aria-label=${l(`terminal.sessions`)}
    aria-expanded=${e.open?`true`:`false`}
    aria-haspopup="dialog"
    aria-controls=${e.hosted?h:Q}
    @click=${e.onToggle}
    @focusout=${e.onFocusOut}
  >
    ${x.server}
  </button>`}function Vt(e){return v`
    ${e.open?v`<div
            id=${Q}
            class="tp-session-menu ${e.hosted?`tp-session-menu--hosted`:``}"
            @focusout=${e.onFocusOut}
            role="dialog"
            aria-label=${l(`terminal.sessions`)}
            @keydown=${t=>{t.key===`Escape`&&(t.preventDefault(),t.stopPropagation(),e.onDismiss(!0))}}
          >
            <div class="tp-session-menu__header">
              <span>${l(`terminal.sessions`)}</span>
              <button class="tp-session-refresh" type="button" @click=${e.onRefresh}>
                ${l(`terminal.refreshSessions`)}
              </button>
            </div>
            ${e.loading?T(`terminal`,l(`terminal.loadingSessions`),!0):e.sessions.length===0?v`<div class="tp-session-empty">${l(`terminal.noSessions`)}</div>`:e.sessions.map(t=>{let n=e.currentSessionIds.has(t.sessionId),r=`${t.owner?.startsWith(`agent:`)===!0?`${l(`terminal.agentOwnedBadge`)} · `:``}${n?l(`terminal.currentSession`):t.attached?l(`terminal.sessionAttached`):l(`terminal.detached`)}`;return v`<button
                        class="tp-session"
                        type="button"
                        ?disabled=${n}
                        title=${n?r:l(`terminal.attachSession`)}
                        @click=${()=>e.onAttach(t.sessionId,t.owner)}
                      >
                        <span class="tp-session__agent">${t.agentId}</span>
                        <span class="tp-session__cwd">${t.cwd}</span>
                        <span class="tp-session__state">${r}</span>
                      </button>`})}
          </div>`:h}
  `}var Q;function Ht(){return(Ht=e((()=>{g(),ce(),f(),b(),w(),Q=`terminal-session-picker-dialog`})))()}var Ut,$;function Wt(){return(Wt=e((()=>{be(),c(),g(),oe(),ce(),f(),ee(),re(),je(),me(),fe(),Ae(),b(),Ne(),ge(),E(),pe(),V(),Nt(),X(),Ft(),I(),It(),B(),zt(),Ht(),Ut=3e4,$=class extends u{constructor(...e){super(...e),this.client=null,this.agentId=null,this.sessionKey=null,this.available=!1,this.suppressed=!1,this.themeMode=`dark`,this.basePath=``,this.fullscreen=!1,this.embedded=!1,this.tabsInHeader=!1,this.page=!1,this.routeTarget=null,this.sessionPickerOpen=!1,this.pickerSessions=[],this.sessionPickerTrigger=ue(),this.sessionPickerTask=new _e(this,{autoRun:!1,args:()=>[this.available?this.client:null],task:([e])=>e?this.terminalSessions.listSessions():ye,onComplete:e=>{e!==null&&(this.pickerSessions=e)}}),this.terminalPanelUploadController=new z({activeTab:()=>this.terminalSessions.tabs.find(e=>e.id===this.terminalSessions.activeId&&e.status===`live`&&e.gatewaySessionId),client:()=>this.client,isCurrent:e=>this.terminalSessions.tabs.includes(e)&&e.status===`live`,fileInput:()=>this.renderRoot.querySelector(`.tp-file-input`),setError:e=>this.terminalSessions.setError(e),requestUpdate:()=>this.requestUpdate()}),this.createTerminalController=Rt,this.catalogReadyTimeoutMs=Ut,this.terminalSessions=new Mt(this),this.dockLayout=new de(this,{layout:he,reservationPrefix:`terminal`,isAvailable:()=>this.isDockLayoutAvailable(),isFullscreen:()=>this.fullscreen,onResize:()=>wt(this.terminalSessions.tabs,this.terminalSessions.activeId)}),this.onToggleRequest=e=>this.handleToggleRequest(e),this.onDockBottomRequest=e=>this.handleToggleRequest(e),this.onDocumentPointerDown=e=>this.handleDocumentPointerDown(e),this.themeObserver=null}get sessionBottomOnly(){return!this.embedded&&this.sessionKey!==null}connectedCallback(){super.connectedCallback(),this.terminalSessions.connectHost(),this.dockLayout.setSuppressed(this.suppressed),!this.fullscreen&&!this.embedded&&!this.sessionBottomOnly&&window.addEventListener(C,this.onToggleRequest),!this.fullscreen&&!this.embedded&&window.addEventListener(S,this.onDockBottomRequest),document.addEventListener(`pointerdown`,this.onDocumentPointerDown,!0),typeof MutationObserver<`u`&&(this.themeObserver=new MutationObserver(()=>St(this.terminalSessions.tabs,this.themeMode)),this.themeObserver.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`,`data-theme-mode`,`style`]})),this.dockLayout.open&&this.terminalSessions.restoreSessions()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(C,this.onToggleRequest),window.removeEventListener(S,this.onDockBottomRequest),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!0),this.themeObserver?.disconnect(),this.themeObserver=null,this.terminalSessions.disconnectHost()}updated(e){(e.has(`embedded`)||e.has(`sessionKey`))&&!this.fullscreen&&(this.embedded||this.sessionBottomOnly?window.removeEventListener(C,this.onToggleRequest):window.addEventListener(C,this.onToggleRequest),this.embedded?window.removeEventListener(S,this.onDockBottomRequest):window.addEventListener(S,this.onDockBottomRequest)),e.has(`suppressed`)&&this.dockLayout.setSuppressed(this.suppressed)&&this.terminalSessions.restoreSessions(),(e.has(`client`)||e.has(`available`))&&this.terminalSessions.scheduleLifecycleSync(),e.has(`themeMode`)&&St(this.terminalSessions.tabs,this.themeMode),e.has(`embedded`)&&this.embedded&&this.terminalSessions.restoreSessions(),(this.embedded||this.dockLayout.open)&&Ct(this.terminalSessions.tabs,this.terminalSessions.activeId,this.findTerminalPanelViewport()),this.dockLayout.syncReservation();let t=JSON.stringify([this.embedded&&this.tabsInHeader,this.terminalSessions.activeId,this.hostedTabs.map(({id:e,label:t,statusLabel:n,badge:r,className:i})=>[e,t,n,r,i]),this.terminalSessions.booting,this.sessionPickerOpen,this.sessionPickerTask.status,this.pickerSessions.map(e=>e.sessionId),this.terminalPanelUploadController.hasPendingBatch(),this.terminalPanelUploadController.hasActiveTab()]);t!==this.lastHostedTabsChangeKey&&(this.lastHostedTabsChangeKey=t,this.dispatchEvent(new CustomEvent(Pe,{bubbles:!0,composed:!0})))}get hostedTabs(){return P(this.terminalSessions.tabs)}get activeHostedTabId(){return this.terminalSessions.activeId}selectHostedTab(e){this.terminalSessions.switchTo(e)}async closeHostedTab(e){this.terminalSessions.closeTab(e),await this.updateComplete}get hostedActions(){if(!this.embedded||!this.tabsInHeader)return h;let e=this.terminalPanelUploadController;return v`
      <openclaw-tooltip .content=${l(`terminal.sessions`)}>
        ${Bt(this.sessionPickerProps)}
      </openclaw-tooltip>
      <openclaw-tooltip .content=${l(`terminal.addFiles`)}>
        <button
          class="rail-header__action"
          type="button"
          aria-label=${l(`terminal.addFiles`)}
          ?disabled=${!e.hasActiveTab()||e.hasPendingBatch()}
          @click=${e.chooseFiles}
        >
          ${x.paperclip}
        </button>
      </openclaw-tooltip>
      <openclaw-tooltip .content=${l(`terminal.dockBottom`)}>
        <button
          class="rail-header__action"
          type="button"
          aria-label=${l(`terminal.dockBottom`)}
          @click=${()=>this.setDock(`bottom`)}
        >
          ${x.panelBottomOpen}
        </button>
      </openclaw-tooltip>
    `}toggle(){this.available&&(this.dockLayout.open?this.closeTerminalPanel():(this.dockLayout.setOpen(!0),this.terminalSessions.restoreSessions()))}handleToggleRequest(e){let t=e instanceof CustomEvent&&typeof e.detail==`object`&&e.detail!==null?e.detail:null,n=t?.dock===`right`||t?.dock===`bottom`?t.dock:null;if(t?.agentId!==void 0&&(this.agentId=t.agentId),n&&this.dockLayout.setDock(n,!1),t?.open===!1){this.closeTerminalPanel();return}if(t?.terminalSessionId||t?.open===!0||t?.newSession===!0){if(!this.available)return;this.dockLayout.setOpen(!0),t.newSession===!0?this.terminalSessions.openSession():t.terminalSessionId?this.terminalSessions.attachSessionById(t.terminalSessionId,!0):this.terminalSessions.restoreSessions();return}this.toggle()}closeTerminalPanel(){this.closeSessionPicker(!1),this.terminalSessions.cancelPendingActions(),this.dockLayout.setOpen(!1)}get terminalPanelOpen(){return this.embedded?this.available:this.dockLayout.open&&this.isDockLayoutAvailable()}hideTerminalPanelForUnavailableSurface(){this.dockLayout.hideWithoutPersisting()}restoreTerminalPanelOpenState(){return this.dockLayout.restoreOpenState()}isDockLayoutAvailable(){return this.available&&(!this.sessionBottomOnly||this.dockLayout.dock===`bottom`)}toggleSessionPicker(){if(this.sessionPickerOpen){this.closeSessionPicker(!0);return}this.sessionPickerOpen=!0,this.refreshSessionPicker(),this.updateComplete.then(()=>{this.sessionPickerOpen&&this.renderRoot.querySelector(`.tp-session-refresh`)?.focus()})}closeSessionPicker(e){this.sessionPickerOpen&&(this.sessionPickerOpen=!1,e&&this.updateComplete.then(()=>{this.sessionPickerTrigger.value?.focus()}))}handleDocumentPointerDown(e){if(!this.sessionPickerOpen)return;let t=this.renderRoot.querySelector(`.tp-session-menu`),n=e.composedPath(),r=this.sessionPickerTrigger.value;!(r&&n.includes(r))&&!(t&&n.includes(t))&&this.closeSessionPicker(!1)}handleSessionPickerFocusOut(e){let t=e=>e instanceof Node&&(e===this.sessionPickerTrigger.value||this.renderRoot.querySelector(`.tp-session-menu`)?.contains(e));t(e.relatedTarget)||queueMicrotask(()=>{!t(this.shadowRoot?.activeElement??document.activeElement)&&this.sessionPickerOpen&&this.closeSessionPicker(!1)})}refreshSessionPicker(){return this.sessionPickerTask.run()}async attachPickedSession(e,t){this.sessionPickerOpen=!1,await this.terminalSessions.attachSessionById(e,t?.startsWith(`agent:`)===!0)}setDock(e){if(this.embedded&&e===`bottom`){window.dispatchEvent(new CustomEvent(S,{detail:{agentId:this.agentId,dock:`bottom`,open:!0}}));return}this.dockLayout.setDock(e),this.updateComplete.then(()=>Tt(this.terminalSessions.tabs))}openFullscreen(){let e=a({kind:`terminal`},this.basePath);e&&te(e)}resetTerminalSessionPicker(){this.closeSessionPicker(!1),this.sessionPickerTask.run([null]),this.pickerSessions=[]}findTerminalPanelViewport(){return this.renderRoot.querySelector(`.tp-viewport`)}get sessionPickerProps(){return{hosted:this.embedded&&this.tabsInHeader,triggerRef:this.sessionPickerTrigger,open:this.sessionPickerOpen,loading:this.sessionPickerTask.status===ve.PENDING,sessions:this.pickerSessions,currentSessionIds:new Set(this.terminalSessions.tabs.map(e=>e.gatewaySessionId).filter(e=>typeof e==`string`&&e.length>0)),onToggle:()=>this.toggleSessionPicker(),onDismiss:e=>this.closeSessionPicker(e),onFocusOut:e=>this.handleSessionPickerFocusOut(e),onRefresh:()=>void this.refreshSessionPicker(),onAttach:(e,t)=>void this.attachPickedSession(e,t)}}render(){if(!this.terminalPanelOpen)return h;let e=this.embedded?`embedded`:this.fullscreen?`fullscreen`:this.dockLayout.dock,t=this.embedded||this.fullscreen||this.dockLayout.dock===`main`?h:this.dockLayout.dock===`bottom`?`height:${this.dockLayout.height}px;--tp-panel-height:${this.dockLayout.height}px`:`width:${this.dockLayout.width}px`,n=this.terminalSessions.tabs.find(e=>e.id===this.terminalSessions.activeId),r=this.terminalSessions.waitingForRefresh||this.terminalSessions.booting&&this.terminalSessions.tabs.length===0||n?.status===`connecting`,i=this.terminalSessions.error?{text:this.terminalSessions.error.text,retry:this.terminalSessions.error.retryAction?()=>this.terminalSessions.retryOpen():void 0}:null,a=this.embedded&&this.tabsInHeader,o=this.sessionPickerProps,s=v`<div class="tp-session-picker">
      ${Bt(o)} ${Vt(o)}
    </div>`,c=tt(this.fullscreen,this.embedded,this.dockLayout.dock,this.terminalPanelUploadController,s,e=>this.setDock(e),()=>this.openFullscreen(),()=>this.closeTerminalPanel());return v`
      <section class="tp tp--${e}" style=${t} aria-label=${l(`terminal.title`)}>
        ${this.embedded?h:this.dockLayout.renderResizer(`tp`,l(`terminal.resize`))}
        ${a?Vt(o):nt(this.terminalSessions.tabs,this.terminalSessions.activeId,this.terminalSessions.booting,c,e=>this.terminalSessions.switchTo(e),e=>this.closeHostedTab(e),()=>void this.terminalSessions.openSession())}
        ${rt({activeId:this.terminalSessions.activeId,tabsInHeader:a,connecting:r,error:i,uploadController:this.terminalPanelUploadController})}
      </section>
    `}willUpdate(){Et(this.terminalSessions.tabs,this.terminalSessions.activeId)}static{this.styles=[Fe,Me,Pt,Z,ke]}},t([y({attribute:!1})],$.prototype,`client`,void 0),t([y({attribute:!1})],$.prototype,`agentId`,void 0),t([y({attribute:!1})],$.prototype,`sessionKey`,void 0),t([y({type:Boolean})],$.prototype,`available`,void 0),t([y({type:Boolean})],$.prototype,`suppressed`,void 0),t([y({attribute:!1})],$.prototype,`themeMode`,void 0),t([y({attribute:!1})],$.prototype,`basePath`,void 0),t([y({type:Boolean})],$.prototype,`fullscreen`,void 0),t([y({type:Boolean})],$.prototype,`embedded`,void 0),t([y({type:Boolean})],$.prototype,`tabsInHeader`,void 0),t([y({type:Boolean})],$.prototype,`page`,void 0),t([y({attribute:!1})],$.prototype,`routeTarget`,void 0),t([_()],$.prototype,`sessionPickerOpen`,void 0),t([_()],$.prototype,`pickerSessions`,void 0)})))()}function Gt(){return(Gt=e((()=>{Wt(),customElements.get(`openclaw-terminal-panel`)||customElements.define(`openclaw-terminal-panel`,$)})))()}export{Gt as t};
//# sourceMappingURL=terminal-panel-registration-lvsOF_CE.js.map