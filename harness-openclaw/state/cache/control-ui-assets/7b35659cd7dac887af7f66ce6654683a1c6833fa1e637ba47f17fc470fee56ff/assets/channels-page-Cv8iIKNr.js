import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Bi as t,Fi as n,Kr as r,Rr as i,Vi as a,zr as o}from"./control-ui-foundation-DaCuy7E_.js";import{Al as s,Bs as c,Ol as l,Pr as u,Rr as d,Sl as f,Ss as p,Tl as m,Vs as h,_r as g,an as _,bs as v,cr as ee,gr as te,pr as ne,un as y,vr as b,wl as re,xr as ie,xs as x,yr as ae}from"./control-ui-core-CndkyZ8m.js";import{$ as S,Q as C,at as oe,c as w,dt as T,nt as E,s as se}from"./lit-runtime-CIjzngcy.js";import{$n as D,$r as ce,Di as le,Ei as O,Nt as ue,Qr as de,Vt as fe,Zn as pe,bi as me,gt as he,ht as ge,jt as _e,lr as k,mt as ve,nr as ye,pt as be,si as xe,xi as Se}from"./control-ui-core-C5mtYcym.js";import{Fa as Ce,Ia as we,Ii as Te,Li as Ee,Ni as De,Pi as Oe,Vn as ke}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Lt as Ae,_t as A,dt as je,fa as Me,ht as j,it as Ne,lt as M,mr as Pe,nt as N,ot as P,pa as Fe,pr as Ie}from"./control-ui-boot-shared-DpHhsTHW.js";import{H as Le,U as Re}from"./control-ui-boot-shared-CoE663Cg.js";import{i as F,n as ze,r as I,t as Be}from"./channel-picker-Dp-6-XIl.js";import{i as Ve,n as L,t as He}from"./wizard-step-controls-Byi_NnKh.js";import{n as Ue,t as We}from"./settings-workspace-gGOfyDax.js";import{c as Ge,l as Ke,n as qe,o as Je,t as Ye,u as Xe}from"./config-form-DNnRghV9.js";async function Ze(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(new DOMException(`Nostr profile request timed out after 30 seconds`,`TimeoutError`)),rt);try{let i=await be(e,{...t,signal:r.signal},n.authCandidates,n.isCurrent);return await ge(i,r.signal)}finally{clearTimeout(i)}}function Qe(e){if(!Array.isArray(e))return{};let t={};for(let n of e){if(typeof n!=`string`)continue;let[e,...r]=n.split(`:`);if(!e||r.length===0)continue;let i=e.trim(),a=r.join(`:`).trim();i&&a&&(t[i]=x(a))}return t}function $e(e,t=``){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}async function et(e){return await Ze($e(e.accountId),{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e.values)},e)}function tt(e){return t(e)&&[`name`,`displayName`,`about`,`picture`,`banner`,`website`,`nip05`,`lud16`].every(t=>e[t]===void 0||e[t]===null||typeof e[t]==`string`)}async function nt(e){let t=await Ze($e(e.accountId,`/import`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({autoMerge:!0})},e);return{...t,data:t.data&&{...t.data,ok:t.data.ok,saved:t.data.saved,imported:tt(t.data.imported)?t.data.imported:void 0,merged:tt(t.data.merged)?t.data.merged:void 0}}}var rt;function it(){return(it=e((()=>{ve(),p(),rt=3e4})))()}function at(e,t){return e.find(e=>e.hasIcon&&e.id===t)??e.find(e=>e.hasIcon&&e.channelIds?.includes(t))}var ot,st;function ct(){return(ct=e((()=>{Re(),ot=1e4,st=class{constructor(e){this.hooks=e,this.catalog=null,this.iconUrls=new Map,this.request=null,this.pendingEnsureClient=null}get pluginCatalog(){return this.catalog}get pluginIconUrls(){if(!this.catalog)return{};let e=this.catalog.plugins;return Object.fromEntries(this.hooks.getChannelIds().flatMap(t=>{let n=at(e,t),r=n?this.iconUrls.get(n.id):void 0;return r===void 0?[]:[[t,r]]}))}ensure(e){if(!e)return;if(this.request?.client===e){this.catalog&&(this.pendingEnsureClient=e);return}if(this.catalog){this.startIconLoad(e,this.catalog);return}this.request?.controller.abort();let t=new AbortController,n={client:e,controller:t};this.request=n,e.request(`plugins.list`,{},{signal:t.signal}).then(async t=>{this.request===n&&this.hooks.getContext().gateway.snapshot.client===e&&(this.catalog=t,this.hooks.requestUpdate(),await this.loadIcons(t,n))}).catch(()=>{}).finally(()=>this.finishRequest(n))}startIconLoad(e,t){this.request?.controller.abort();let n={client:e,controller:new AbortController};this.request=n,this.loadIcons(t,n).finally(()=>this.finishRequest(n))}async loadIcons(e,t){t.iconTimeout=setTimeout(()=>t.controller.abort(new DOMException(`plugin icon fetch timed out`,`TimeoutError`)),ot);let n=new Set;for(let t of this.hooks.getChannelIds()){let r=at(e.plugins,t);r&&!this.iconUrls.has(r.id)&&n.add(r.id)}let r=(await Promise.all([...n].map(async e=>{let n=this.hooks.getContext();return[e,await Le({pluginId:e,resourceBasePath:n.resourceBasePath,gatewayUrl:n.gateway.connection.gatewayUrl,auth:{hello:n.gateway.snapshot.hello,settings:{token:n.gateway.connection.token},password:n.gateway.connection.password},signal:t.controller.signal}).catch(()=>null)]}))).filter(e=>e[1]!==null);if(this.request!==t||!this.hooks.isConnected()){for(let[,e]of r)URL.revokeObjectURL(e);return}for(let[e,t]of r)this.iconUrls.set(e,t);this.hooks.requestUpdate()}finishRequest(e){if(e.iconTimeout&&clearTimeout(e.iconTimeout),this.request!==e)return;this.request=null;let t=this.pendingEnsureClient;this.pendingEnsureClient=null,t&&this.hooks.isConnected()&&this.ensure(t)}reset(){this.request?.controller.abort(),this.request?.iconTimeout&&clearTimeout(this.request.iconTimeout),this.request=null,this.pendingEnsureClient=null;for(let e of this.iconUrls.values())URL.revokeObjectURL(e);this.catalog=null,this.iconUrls.clear(),this.hooks.requestUpdate()}}})))()}function lt(e){let{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function ut(e){let{state:t,callbacks:n,accountId:r}=e,i=lt(t),a=(e,r,i={})=>{let{type:a=`text`,placeholder:o,maxLength:s,help:c}=i,l=t.values[e]??``,u=t.fieldErrors[e],d=`nostr-profile-${e}`,f=a===`textarea`?E`
            <textarea
              id="${d}"
              class="settings-input"
              .value=${l}
              placeholder=${o??``}
              maxlength=${s??2e3}
              rows="3"
              @input=${t=>{let r=t.target;n.onFieldChange(e,r.value)}}
              ?disabled=${t.saving}
            ></textarea>
          `:E`
            <input
              id="${d}"
              class="settings-input"
              type=${a}
              .value=${l}
              placeholder=${o??``}
              maxlength=${s??256}
              @input=${t=>{let r=t.target;n.onFieldChange(e,r.value)}}
              ?disabled=${t.saving}
            />
          `;return E`
      <div class="settings-row settings-row--stacked">
        <div class="settings-row__text">
          <label class="settings-row__title" for="${d}">${r}</label>
          ${c?E`<span class="settings-row__desc">${c}</span>`:S}
          ${u?E`<span class="settings-row__desc" style="color: var(--danger);">${u}</span>`:S}
        </div>
        <div class="settings-row__control">${f}</div>
      </div>
    `};return E`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title">${s(`channels.nostr.editProfile`)}</span>
        <span class="settings-row__desc">${s(`channels.nostr.account`)}: ${r}</span>
      </div>
    </div>

    ${t.error?E`
            <div class="settings-row">
              <div class="settings-row__text">
                <span class="settings-row__title"
                  >${A({kind:`danger`,label:s(`channels.lastError`)})}</span
                >
                <span class="settings-row__desc">${t.error}</span>
              </div>
            </div>
          `:S}
    ${t.success?E`
            <div class="settings-row">
              <div class="settings-row__text">
                <span class="settings-row__desc">${t.success}</span>
              </div>
            </div>
          `:S}
    ${(()=>{let e=t.values.picture;return e?E`
      <div class="settings-row">
        <div class="settings-row__text">
          <span class="settings-row__title">${s(`channels.nostr.profilePicturePreview`)}</span>
        </div>
        <div class="settings-row__control">
          <img
            src=${e}
            alt=${s(`channels.nostr.profilePicturePreview`)}
            style="max-width: 80px; max-height: 80px; border-radius: 50%; object-fit: cover;"
            @error=${e=>{let t=e.target;t.style.display=`none`}}
            @load=${e=>{let t=e.target;t.style.display=`block`}}
          />
        </div>
      </div>
    `:S})()}
    ${a(`name`,s(`channels.nostr.username`),{placeholder:s(`channels.nostr.placeholders.username`),maxLength:256,help:s(`channels.nostr.usernameHelp`)})}
    ${a(`displayName`,s(`channels.nostr.displayName`),{placeholder:s(`channels.nostr.placeholders.displayName`),maxLength:256,help:s(`channels.nostr.displayNameHelp`)})}
    ${a(`about`,s(`channels.nostr.bio`),{type:`textarea`,placeholder:s(`channels.nostr.bioPlaceholder`),maxLength:2e3,help:s(`channels.nostr.bioHelp`)})}
    ${a(`picture`,s(`channels.nostr.avatarUrl`),{type:`url`,placeholder:s(`channels.nostr.placeholders.avatarUrl`),help:s(`channels.nostr.avatarHelp`)})}
    ${t.showAdvanced?E`
            <div class="settings-row">
              <div class="settings-row__text">
                <span class="settings-row__title">${s(`channels.nostr.advanced`)}</span>
              </div>
            </div>

            ${a(`banner`,s(`channels.nostr.bannerUrl`),{type:`url`,placeholder:s(`channels.nostr.placeholders.bannerUrl`),help:s(`channels.nostr.bannerHelp`)})}
            ${a(`website`,s(`channels.nostr.website`),{type:`url`,placeholder:s(`channels.nostr.placeholders.website`),help:s(`channels.nostr.websiteHelp`)})}
            ${a(`nip05`,s(`channels.nostr.nip05Identifier`),{placeholder:s(`channels.nostr.placeholders.nip05`),help:s(`channels.nostr.nip05Help`)})}
            ${a(`lud16`,s(`channels.nostr.lightningAddress`),{placeholder:s(`channels.nostr.placeholders.lightningAddress`),help:s(`channels.nostr.lightningHelp`)})}
          `:S}

    <div class="settings-row">
      <div class="settings-row__text">
        ${i?E`<span class="settings-row__desc">${s(`common.unsavedChanges`)}</span>`:S}
      </div>
      <div class="settings-row__control">
        <button
          class="btn primary"
          @click=${n.onSave}
          ?disabled=${t.saving||!i}
        >
          ${t.saving?s(`common.saving`):s(`common.saveAndPublish`)}
        </button>

        <button
          class="btn"
          @click=${n.onImport}
          ?disabled=${t.importing||t.saving}
        >
          ${t.importing?s(`common.importing`):s(`common.importFromRelays`)}
        </button>

        <button class="btn" @click=${n.onToggleAdvanced}>
          ${t.showAdvanced?s(`common.hideAdvanced`):s(`common.showAdvanced`)}
        </button>

        <button class="btn" @click=${n.onCancel} ?disabled=${t.saving}>
          ${s(`common.cancel`)}
        </button>
      </div>
    </div>
  `}function dt(e){let t={name:e?.name??``,displayName:e?.displayName??``,about:e?.about??``,picture:e?.picture??``,banner:e?.banner??``,website:e?.website??``,nip05:e?.nip05??``,lud16:e?.lud16??``};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}function R(){return(R=e((()=>{C(),N(),m()})))()}function ft(e){return`https://docs.openclaw.ai/channels/${encodeURIComponent(e)}`}function pt(e,t){let n=e;for(let e of t){if(!n)return null;let t=ee(n);if(t===`object`){let t=n.properties??{};if(typeof e==`string`&&t[e]){n=t[e];continue}let r=n.additionalProperties;if(typeof e==`string`&&r&&typeof r==`object`){n=r;continue}return null}if(t===`array`){if(typeof e!=`number`)return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function mt(e,t){return ae(e,t)??{}}function ht(e){let t=_t.flatMap(t=>t in e?[[t,e[t]]]:[]);return t.length===0?null:E`
    <div>
      ${t.map(([e,t])=>E`
          <div class="settings-row__desc">${e}: ${te(t)}</div>
        `)}
    </div>
  `}function gt(e){let t=qe(e.schema),n=t.schema;if(!n)return E`<div class="settings-row__desc">${s(`channels.config.schemaUnavailable`)}</div>`;let r=pt(n,[`channels`,e.channelId]);if(!r)return E`
      <div class="settings-row__desc">${s(`channels.config.channelSchemaUnavailable`)}</div>
    `;let i=mt(e.configValue??{},e.channelId),a=[`channels`,e.channelId],o=new Set(t.unsupportedPaths);return E`
    <div class="config-form">
      ${Je({schema:r,path:a,hints:e.uiHints,revealAdvanced:e.showAdvanced,onShowAdvanced:()=>e.onShowAdvanced(!0),onHideAdvanced:()=>e.onShowAdvanced(!1),renderTier:t=>Ge({schema:t,value:i,path:a,hints:e.uiHints,unsupported:o,disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})})}
    </div>
    ${ht(i)}
  `}function z(e){let{channelId:t,props:n}=e,r=n.configSaving||n.configSchemaLoading;return n.configSchemaLoading?M({label:s(`channels.config.loadingSchema`),rows:2}):E`
    <div class="settings-row settings-row--stacked">
      ${gt({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:r,showAdvanced:n.showAdvancedSettings,onShowAdvanced:n.onShowAdvancedSettings,onPatch:n.onConfigPatch})}
      ${n.configError?E`<div class="callout danger" role="alert">${n.configError}</div>`:null}
      <div class="settings-row__control">
        <button
          class="btn primary"
          ?disabled=${r||!n.configFormDirty}
          @click=${()=>n.onConfigSave()}
        >
          ${n.configSaving?s(`common.saving`):s(`common.save`)}
        </button>
        <button class="btn" ?disabled=${r} @click=${()=>n.onConfigReload()}>
          ${s(`common.reload`)}
        </button>
      </div>
    </div>
  `}var _t;function B(){return(B=e((()=>{C(),Ye(),N(),m(),g(),_t=[`groupPolicy`,`streamMode`,`dmPolicy`]})))()}function vt(e,t){let r=t.snapshot?.channels;return r&&Object.hasOwn(r,e)?n(r[e])??void 0:void 0}function yt(e,t){let n=b(t.snapshot?.channelAccounts,e),r=t.snapshot?.channelDefaultAccountId,i=r&&Object.hasOwn(r,e)?r[e]:void 0;return(i?n.find(e=>e.accountId===i):void 0)??n[0]??null}function V(e,t){let n=vt(e,t),r=yt(e,t);return{configured:typeof n?.configured==`boolean`?n.configured:typeof r?.configured==`boolean`?r.configured:null,running:typeof n?.running==`boolean`?n.running:null,connected:typeof n?.connected==`boolean`?n.connected:null,defaultAccount:r,status:n}}function bt(e,t){return ne(t.snapshot,e)}function xt(e,t){return V(e,t).configured}function H(e){return s(e==null?`common.na`:e?`common.yes`:`common.no`)}function U(e){return e===!0?`ok`:`muted`}function W(e){return E`
    <dl class="settings-kv">
      ${e.map(e=>E`
          <dt>${e.label}</dt>
          <dd>
            ${e.kind===void 0?e.value:A({kind:e.kind,label:e.value})}
          </dd>
        `)}
    </dl>
  `}function G(e){return E`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title"
          >${A({kind:`danger`,label:s(`channels.lastError`)})}</span
        >
        <span class="settings-row__desc">${v(e)}</span>
      </div>
    </div>
  `}function St(e){let t=x([e.status??``,e.error??``].filter(Boolean).join(` `));return E`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title"
          >${A({kind:e.ok?`ok`:`danger`,label:e.ok?s(`common.probeOk`):s(`common.probeFailed`)})}</span
        >
        ${t?E`<span class="settings-row__desc">${t}</span>`:S}
      </div>
    </div>
  `}function K(e){return E`
    <div class="settings-row settings-row--actions">
      <div class="settings-row__control">${e}</div>
    </div>
  `}function Ct(e){let t=e.updatedAt?s(`channels.hub.updatedAgo`,{ago:_(e.updatedAt)}):s(`common.na`);return E`<openclaw-tooltip .content=${t}>
    <button
      type="button"
      class="btn btn--xs btn--icon"
      aria-label=${s(`common.refresh`)}
      ?disabled=${e.disabled}
      @click=${e.onRefresh}
    >
      ${O.refresh}
    </button>
  </openclaw-tooltip>`}function wt(e){let t=[e.accountId,...e.facts??[]].join(` · `);return E`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title">${e.title}</span>
        <span class="settings-row__desc">${t}</span>
        ${e.lastError?E`<span class="settings-row__desc"
                >${x(e.lastError)}</span
              >`:S}
      </div>
      <div class="settings-row__control">
        ${A(e.status)}
        <span class="settings-row__value"
          >${e.lastInboundAt?_(e.lastInboundAt):s(`common.na`)}</span
        >
      </div>
    </div>
  `}function Tt(e){return j({title:e.title,description:e.subtitle,...e.accountCount===void 0?{}:{count:e.accountCount}},E`
      ${W(e.statusRows)}
      ${e.lastError?G(e.lastError):S}
      ${e.secondaryCallout??S} ${e.configSection}
      ${e.extraContent??S}
      ${e.footer?K(e.footer):S}
    `)}function Et(e,t){let n=b(t,e).length;return n>=2?n:void 0}function q(){return(q=e((()=>{C(),le(),N(),m(),g(),p(),y()})))()}function Dt(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:s(`common.na`)}function Ot(e){let{props:t,nostr:n,nostrAccounts:r,accountCount:i,profileFormState:a,profileFormCallbacks:o,onEditProfile:c}=e,l=r[0],u=n?.configured??l?.configured??!1,d=n?.running??l?.running??!1,f=n?.publicKey??l?.publicKey,p=n?.lastStartAt??l?.lastStartAt??null,m=n?.lastError??l?.lastError??null,h=r.length>1,g=a!=null,v=e=>{let t=e.publicKey,n=e.profile;return wt({title:n?.displayName??n?.name??e.name??e.accountId,accountId:e.accountId,facts:[`${s(`common.configured`)}: ${e.configured?s(`common.yes`):s(`common.no`)}`,`${s(`common.publicKey`)}: ${Dt(t)}`],status:{kind:U(e.running),label:e.running?s(`common.running`):s(`common.no`)},lastInboundAt:e.lastInboundAt,lastError:e.lastError})},ee=()=>{if(g&&o)return ut({state:a,callbacks:o,accountId:r[0]?.accountId??`default`});let{name:e,displayName:t,about:i,picture:d,nip05:f}=l?.profile??n?.profile??{},p=e||t||i||d||f;return E`
      <div class="settings-row">
        <div class="settings-row__text">
          <span class="settings-row__title">${s(`channels.nostr.profile`)}</span>
          ${p?S:E`<span class="settings-row__desc"
                  >${s(`channels.nostr.noProfile`)} ${s(`channels.nostr.noProfileHint`)}</span
                >`}
        </div>
        ${u?E`
                <div class="settings-row__control">
                  <button class="btn btn--sm" @click=${c}>
                    ${s(`channels.nostr.editProfile`)}
                  </button>
                </div>
              `:S}
      </div>
      ${p?E`
              <dl class="settings-kv">
                ${d?E`
                        <dt>${s(`channels.nostr.profilePicture`)}</dt>
                        <dd>
                          <img
                            style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;"
                            src=${d}
                            alt=${s(`channels.nostr.profilePicture`)}
                            @error=${e=>{e.target.style.display=`none`}}
                          />
                        </dd>
                      `:S}
                ${e?E`<dt>${s(`channels.nostr.name`)}</dt>
                        <dd>${e}</dd>`:S}
                ${t?E`<dt>${s(`channels.nostr.displayName`)}</dt>
                        <dd>${t}</dd>`:S}
                ${i?E`<dt>${s(`channels.nostr.about`)}</dt>
                        <dd>${i}</dd>`:S}
                ${f?E`<dt>NIP-05</dt>
                        <dd>${f}</dd>`:S}
              </dl>
            `:S}
    `};return j({title:s(`channels.nostr.title`),description:s(`channels.nostr.subtitle`),...i===void 0?{}:{count:i}},E`
      ${h?r.map(e=>v(e)):W([{label:s(`common.configured`),value:s(u?`common.yes`:`common.no`),kind:U(u)},{label:s(`common.running`),value:s(d?`common.yes`:`common.no`),kind:U(d)},{label:s(`common.publicKey`),value:E`<code title="${f??``}"
                  >${Dt(f)}</code
                >`},{label:s(`common.lastStart`),value:p?_(p):s(`common.na`)}])}
      ${m?G(m):S}
      ${ee()} ${z({channelId:`nostr`,props:t})}
      ${K(E`<button class="btn" @click=${()=>t.onRefresh(!1)}>
          ${s(`common.refresh`)}
        </button>`)}
    `)}function kt(){return(kt=e((()=>{C(),N(),m(),y(),B(),R(),q()})))()}function At(e){return e.accountLabel||e.accountId}function J(e){return e.accountLabel||e.accountId}function jt(e){let t=Date.parse(e);return Number.isFinite(t)?_(t):e}function Mt(e){let t=e.pairingSnapshot?.accounts??[];return e.pairingChannelFilter?t.filter(t=>t.channel===e.pairingChannelFilter):t}function Nt(e){return(e.pairingSnapshot?.requests??[]).filter(t=>!(e.pairingChannelFilter&&t.channel!==e.pairingChannelFilter||e.pairingAccountFilter&&t.accountId!==e.pairingAccountFilter))}function Pt(e){let t=e.pairingSnapshot?.accounts??[],n=Array.from(new Map(t.map(e=>[e.channel,e.channelLabel])).entries()).toSorted((e,t)=>e[1].localeCompare(t[1])),r=Mt(e);return E`
    <div class="channels-pairing-filters">
      <label>
        <span>${s(`channels.pairing.channelFilter`)}</span>
        ${ze({label:s(`channels.pairing.channelFilter`),value:e.pairingChannelFilter??``,options:[{value:``,label:s(`channels.pairing.allChannels`),kind:`neutral`},...n.map(([e,t])=>({value:e,label:t}))],onChange:t=>e.onPairingFilterChange(t||null,null)})}
      </label>
      <label>
        <span>${s(`channels.pairing.accountFilter`)}</span>
        ${Pe({label:s(`channels.pairing.accountFilter`),value:e.pairingAccountFilter??``,options:[{value:``,label:s(`channels.pairing.allAccounts`)},...r.map(e=>({value:e.accountId,label:At(e)}))],disabled:!e.pairingChannelFilter,onChange:t=>e.onPairingFilterChange(e.pairingChannelFilter,t||null)})}
      </label>
    </div>
  `}function Ft(e,t){let n=!!t.pairingBusyRequestId,r=t.pairingBusyRequestId===e.requestId,i=Object.entries(e.metadata??{});return E`
    <div class="settings-row settings-row--stacked channels-pairing-request">
      <div class="channels-pairing-request__main">
        <div class="settings-row__text">
          <span class="settings-row__title">${e.senderId}</span>
          <span class="settings-row__desc">
            ${e.senderLabel} · ${e.channelLabel} · ${J(e)}
            (${e.accountId})
          </span>
          <span class="settings-row__desc">
            ${s(`channels.pairing.requested`,{ago:jt(e.createdAt)})} ·
            ${s(`channels.pairing.expires`,{ago:jt(e.expiresAt)})}
          </span>
        </div>
        <div class="settings-row__control channels-pairing-request__actions">
          <button
            type="button"
            class="btn btn--sm primary"
            ?disabled=${n||!t.canManagePairing}
            aria-label=${s(`channels.pairing.approveAria`,{sender:e.senderId,channel:e.channelLabel,account:J(e)})}
            @click=${()=>t.onPairingApprove(e)}
          >
            ${s(r?`common.loading`:`channels.pairing.approve`)}
          </button>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${n||!t.canManagePairing}
            aria-label=${s(`channels.pairing.dismissAria`,{sender:e.senderId,channel:e.channelLabel,account:J(e)})}
            @click=${()=>t.onPairingDismiss(e)}
          >
            ${s(`channels.pairing.dismiss`)}
          </button>
        </div>
      </div>
      ${i.length>0?E`
              <details class="channels-pairing-request__details">
                <summary>${s(`channels.pairing.senderDetails`)}</summary>
                <dl class="settings-kv">
                  ${i.map(([e,t])=>E`<dt>${e}</dt>
                        <dd>${t}</dd>`)}
                </dl>
              </details>
            `:S}
    </div>
  `}function It(e){let t=e.canManagePairing?e.pairingSnapshot:null,n=t?.accounts??[],r=e.canManagePairing?Nt(e):[],i=!!(e.pairingChannelFilter||e.pairingAccountFilter),a=t?.requests.length??0;return E`
    <div id="channels-pairing-requests">
      ${j({title:s(`channels.pairing.title`),description:s(`channels.pairing.subtitle`),...a>0?{count:a}:{},actions:Ct({updatedAt:e.canManagePairing?e.pairingLastSuccessAt:null,disabled:e.pairingLoading||!e.canManagePairing,onRefresh:e.onPairingRefresh})},e.canManagePairing?E`
              ${e.pairingError?E`
                      <div class="settings-row channels-pairing-feedback" role="alert">
                        ${A({kind:`danger`,label:e.pairingError})}
                      </div>
                    `:S}
              ${e.pairingNotice?E`
                      <div class="settings-row channels-pairing-feedback" role="status">
                        ${A({kind:`ok`,label:e.pairingNotice})}
                      </div>
                    `:S}
              ${t?Pt(e):S}
              ${e.pairingLoading&&!t?M({rows:2}):n.length===0?P(s(`channels.pairing.noAccounts`)):r.length===0?P(s(i?`channels.pairing.noFilteredRequests`:`channels.pairing.noRequests`)):r.map(t=>Ft(t,e))}
              ${t?E`
                      <div class="channels-pairing-help">
                        ${s(`channels.pairing.limits`,{count:String(t.limits.pendingPerAccount),minutes:String(Math.round(t.limits.ttlMs/6e4))})}
                      </div>
                    `:S}
            `:E`
              <div class="settings-row channels-pairing-feedback">
                ${A({kind:`warn`,label:s(`channels.pairing.missingPermission`)})}
              </div>
            `)}
    </div>
  `}function Lt(e,t){if(!t.canManagePairing)return S;let n=(t.pairingSnapshot?.accounts??[]).filter(t=>t.channel===e);if(n.length===0)return S;let r=t.pairingSnapshot?.requests??[];return j({title:s(`channels.pairing.detailTitle`),description:s(`channels.pairing.detailSubtitle`)},n.map(e=>{let n=r.filter(t=>t.channel===e.channel&&t.accountId===e.accountId).length;return E`
        <div class="settings-row">
          <div class="settings-row__text">
            <span class="settings-row__title">${At(e)}</span>
            <span class="settings-row__desc">${e.accountId}</span>
          </div>
          <div class="settings-row__control">
            ${A({kind:n>0?`warn`:`muted`,label:n>0?s(`channels.pairing.pendingCount`,{count:String(n)}):s(`channels.pairing.noPending`)})}
            <button
              type="button"
              class="btn btn--sm"
              @click=${()=>t.onPairingReviewAccount(e.channel,e.accountId)}
            >
              ${s(`channels.pairing.review`)}
            </button>
          </div>
        </div>
      `}))}function Rt(e){let t=e.pairingPrompt;if(!t||!e.canManagePairing)return S;let n=t.request,r=e.pairingBusyRequestId===n.requestId,i=t.kind===`approve`,a=e.pairingSnapshot?.commandOwnerConfigured===!1,o=s(i?`channels.pairing.approveDialogTitle`:`channels.pairing.dismissDialogTitle`);return E`
    <openclaw-modal-dialog label=${o} @modal-cancel=${e.onPairingPromptCancel}>
      <div class="channels-pairing-dialog">
        <div class="settings-row__title">${o}</div>
        <div class="settings-row__desc">
          ${n.senderId} · ${n.channelLabel} · ${J(n)}
          (${n.accountId})
        </div>
        <div class="callout ${i?`info`:`warn`}">
          ${s(i?`channels.pairing.approveExplanation`:`channels.pairing.dismissExplanation`)}
        </div>
        ${e.pairingError?E`<div class="callout danger" role="alert">${e.pairingError}</div>`:S}
        ${i&&n.notifySupported?E`
                <label class="channels-pairing-dialog__option">
                  <input
                    type="checkbox"
                    .checked=${t.notify}
                    @change=${t=>e.onPairingPromptChange({notify:t.currentTarget instanceof HTMLInputElement&&t.currentTarget.checked})}
                  />
                  <span>${s(`channels.pairing.notifyRequester`)}</span>
                </label>
              `:S}
        ${i&&a&&e.canAdmin?E`
                <label class="channels-pairing-dialog__option">
                  <input
                    type="checkbox"
                    .checked=${t.bootstrapCommandOwner}
                    @change=${t=>e.onPairingPromptChange({bootstrapCommandOwner:t.currentTarget instanceof HTMLInputElement&&t.currentTarget.checked})}
                  />
                  <span>${s(`channels.pairing.makeCommandOwner`)}</span>
                </label>
                <div class="settings-row__desc">${s(`channels.pairing.commandOwnerHelp`)}</div>
              `:S}
        ${i&&a&&!e.canAdmin?E`<div class="callout warn">${s(`channels.pairing.commandOwnerNeedsAdmin`)}</div>`:S}
        <div class="channels-pairing-dialog__actions">
          <button
            type="button"
            class=${i?`btn primary`:`btn danger`}
            ?disabled=${r}
            @click=${e.onPairingPromptConfirm}
          >
            ${s(i?`channels.pairing.approve`:`channels.pairing.dismiss`)}
          </button>
          <button type="button" class="btn" ?disabled=${r} @click=${e.onPairingPromptCancel}>
            ${s(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function Y(){return(Y=e((()=>{C(),Be(),k(),Ie(),N(),m(),y(),q()})))()}function zt(e){let{props:t,whatsapp:n,accountCount:r}=e,i=xt(`whatsapp`,t),a=n?.linked===!0,o=t.whatsappQrDataUrl!=null,c=n?.self?.e164,u=c?Ke(c,l.getLocale())??c:void 0;return Tt({title:s(`channels.whatsapp.title`),subtitle:s(`channels.whatsapp.subtitle`),accountCount:r,statusRows:[{label:s(`common.configured`),value:H(i),kind:U(i)},{label:s(`common.linked`),value:n?.linked?s(`common.yes`):s(`common.no`),kind:U(n?.linked)},...u?[{label:s(`channels.whatsapp.phoneNumber`),value:u}]:[],{label:s(`common.running`),value:n?.running?s(`common.yes`):s(`common.no`),kind:U(n?.running)},{label:s(`common.connected`),value:n?.connected?s(`common.yes`):s(`common.no`),kind:U(n?.connected)},{label:s(`common.lastConnect`),value:n?.lastConnectedAt?_(n.lastConnectedAt):s(`common.na`)},{label:s(`common.lastMessage`),value:n?.lastMessageAt?_(n.lastMessageAt):s(`common.na`)},{label:s(`common.authAge`),value:n?.authAgeMs==null?s(`common.na`):Te(n.authAgeMs)}],lastError:n?.lastError,extraContent:E`
      ${t.whatsappMessage?E`
              <div class="settings-row">
                <div class="settings-row__text">
                  <span class="settings-row__desc">${t.whatsappMessage}</span>
                </div>
              </div>
            `:S}
      ${t.whatsappQrDataUrl?E`
              <div class="settings-row settings-row--stacked">
                <div class="qr-wrap">
                  <img src=${t.whatsappQrDataUrl} alt=${s(`channels.setup.whatsappQrAlt`)} />
                </div>
              </div>
            `:S}
    `,configSection:z({channelId:`whatsapp`,props:t}),footer:E`
      ${a?E`<button
              class="btn"
              ?disabled=${t.whatsappBusy}
              @click=${()=>t.onWhatsAppStart(!0)}
            >
              ${s(`common.relink`)}
            </button>`:E`<button
              class="btn primary"
              ?disabled=${t.whatsappBusy}
              @click=${()=>t.onWhatsAppStart(!1)}
            >
              ${t.whatsappBusy?s(`common.working`):s(`common.showQr`)}
            </button>`}
      ${o?E`<button
              class="btn"
              ?disabled=${t.whatsappBusy}
              @click=${()=>t.onWhatsAppWait()}
            >
              ${s(`common.waitForScan`)}
            </button>`:S}
      <button
        class="btn danger"
        ?disabled=${t.whatsappBusy}
        @click=${()=>t.onWhatsAppLogout()}
      >
        ${s(`common.logout`)}
      </button>
      <button class="btn" @click=${()=>t.onRefresh(!0)}>${s(`common.refresh`)}</button>
    `})}function Bt(){return(Bt=e((()=>{Xe(),C(),m(),Ee(),y(),B(),q()})))()}function Vt(e){return Object.hasOwn(X,e)}function Ht(e,t,r,i){let o=Vt(e)?e:null,c=o?X[o]:null,l=o?r[o]:void 0,u=V(e,t),d=u.configured,f=b(r.channelAccounts,e),p=o===`telegram`?f.length>1:!o&&f.length>0,m=o===`googlechat`?[{label:s(`common.credential`),value:r.googlechat?.credentialSource??s(`common.na`)},{label:s(`common.audience`),value:r.googlechat?.audienceType?`${r.googlechat.audienceType}${r.googlechat.audience?` · ${r.googlechat.audience}`:``}`:s(`common.na`)}]:o===`signal`?[{label:s(`common.baseUrl`),value:r.signal?.baseUrl??s(`common.na`)}]:o===`telegram`?[{label:s(`common.mode`),value:r.telegram?.mode??s(`common.na`)}]:[],h=[{label:s(`common.configured`),value:H(d),kind:U(d)},{label:s(`common.running`),value:o?o===`googlechat`&&!l?s(`common.na`):H(l?.running??!1):H(u.running),kind:U(o?l?.running:u.running)},...o?[...m,...[`lastStartAt`,`lastProbeAt`].map(e=>({label:s(e===`lastStartAt`?`common.lastStart`:`common.lastProbe`),value:l?.[e]?_(l[e]):s(`common.na`)}))]:[{label:s(`common.connected`),value:H(u.connected),kind:U(u.connected)}]],g=a(n(o?l:u.status),`lastError`);return j({title:c?s(`channels.${c}.title`):a(t.snapshot?.channelLabels,e)??e,description:s(c?`channels.${c}.subtitle`:`channels.generic.subtitle`),...i===void 0?{}:{count:i}},E`
      ${p?f.map(e=>{let t=o===`telegram`?a(n(n(e.probe)?.bot),`username`):void 0;return wt({title:t?`@${t}`:e.name||e.accountId,accountId:e.accountId,...o===`telegram`?{facts:[`${s(`common.configured`)}: ${e.configured?s(`common.yes`):s(`common.no`)}`]}:{},status:{kind:U(o===`telegram`?e.running:e.running??e.configured),label:e.running?s(`common.running`):!o&&e.configured?s(`common.configured`):s(`common.no`)},lastInboundAt:e.lastInboundAt,lastError:e.lastError})}):W(h)}
      ${g?G(g):S}
      ${o&&l?.probe?St(l.probe):S}
      ${z({channelId:e,props:t})}
      ${o?K(E`
              <button
                class="btn"
                ?disabled=${t.loading}
                aria-busy=${String(t.loading)}
                @click=${()=>t.onRefresh(!0)}
              >
                ${s(t.loading?`common.refreshing`:`common.probe`)}
              </button>
            `):S}
    `)}function Ut(e,t,n){let r=Et(e,n.channelAccounts);switch(e){case`whatsapp`:return zt({props:t,whatsapp:n.whatsapp,accountCount:r});case`nostr`:{let e=b(n.channelAccounts,`nostr`),i=e[0],a=i?.accountId??`default`,o=i?.profile??null,s=t.nostrProfileAccountId===a?t.nostrProfileFormState:null,c=s?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return Ot({props:t,nostr:n.nostr,nostrAccounts:e,accountCount:r,profileFormState:s,profileFormCallbacks:c,onEditProfile:()=>t.onNostrProfileEdit(a,o)})}default:return Ht(e,t,n,r)}}function Wt(e){let t=Ut(e.channelId,e.props,e.data),n=e.props.snapshot?.statusIssues?.filter(t=>t.channel===e.channelId);return E`
    <openclaw-modal-dialog label=${e.label} @modal-cancel=${()=>e.onClose()}>
      <div class="channels-detail">
        <div class="channels-detail__header">
          ${F(e.channelId,e.label,`cover`,{pluginIconUrl:e.pluginIconUrl})}
          <div class="channels-detail__header-actions">
            <a
              class="btn btn--sm"
              href=${ft(e.channelId)}
              target="_blank"
              rel="noreferrer"
            >
              ${s(`common.docs`)}
            </a>
            <button
              type="button"
              class="btn btn--sm"
              title=${e.props.canAdmin?``:s(`channels.hub.adminRequired`)}
              ?disabled=${!e.props.canAdmin}
              @click=${()=>e.onSetup()}
            >
              ${s(`channels.hub.runSetup`)}
            </button>
            <button
              type="button"
              class="btn channels-detail__close"
              aria-label=${s(`common.close`)}
              @click=${()=>e.onClose()}
            >
              ✕
            </button>
          </div>
        </div>
        <div class="channels-detail__body">
          ${e.props.setupBlockedByDirtyConfig&&e.props.configFormDirty?E`<div class="callout warn">${s(`channels.hub.saveBeforeSetup`)}</div>`:S}
          ${n?.map(e=>E`
              <div class="callout warn" role="note">
                <strong>
                  ${s(`channels.hub.stateAttention`)} · ${x(e.accountId)}
                </strong>
                <div>${x(e.message)}</div>
                ${e.fix?E`<div>${x(e.fix)}</div>`:S}
              </div>
            `)}
          ${Lt(e.channelId,e.props)} ${t}
        </div>
      </div>
    </openclaw-modal-dialog>
  `}var X;function Gt(){return(Gt=e((()=>{C(),I(),N(),m(),k(),g(),p(),y(),B(),kt(),Y(),q(),Bt(),X={discord:`discord`,googlechat:`googleChat`,imessage:`imessage`,signal:`signal`,slack:`slack`,telegram:`telegram`}})))()}function Kt(e){return e.wizard.phase===`step`&&e.wizard.busy}function qt(e,t){let n=e.message?.trim()??``;if(e.executor===`gateway`)return E`
      ${e.title?E`<div class="channels-wizard__message">${e.title}</div>`:S}
      ${n?E`<div class="channels-wizard__message">${n}</div>`:S}
      <div class="channels-wizard__footer">
        <button type="button" class="btn" @click=${()=>t.onClose()}>
          ${s(`common.cancel`)}
        </button>
        ${L(n||s(`channels.setup.working`))}
      </div>
    `;let r=`channels-wizard__output${n.includes(`{`)||n.includes(`  `)?` channels-wizard__output--code`:``}`;return E`
    ${e.title?E`<div class="channels-wizard__message">${e.title}</div>`:S}
    ${n?E`<div class=${r}>${n}</div>`:S}
    <div class="channels-wizard__footer">
      ${Kt(t)?L(s(`channels.setup.working`)):E`<button type="button" class="btn primary" @click=${()=>t.onAnswer(null)}>
              ${s(`channels.setup.continue`)}
            </button>`}
    </div>
  `}function Jt(e,t){return e.type===`note`||e.type===`progress`||e.type===`action`?qt(e,t):Ve({step:e,value:e.type===`multiselect`?t.multiselectValues:e.type===`text`?t.textValue:e.initialValue,busy:Kt(t),inputId:`channel-wizard-text-input`,presentation:`channels`,channelSelect:t.wizard.phase===`step`&&t.wizard.channel===null,answerLabel:s(`channels.setup.continue`),busyLabel:s(`channels.setup.working`),sensitiveRevealed:t.secretVisible,onValueChange:e.type===`text`?e=>t.onTextInput(typeof e==`string`?e:``):t.onToggleMultiselect,onAnswer:t.onAnswer,onToggleSensitiveVisibility:t.onToggleSecretVisibility})}function Yt(e){let t=e.whatsappConnected===!0;return E`
    <div class="channels-wizard__message">
      ${s(t?`channels.setup.whatsappLinked`:`channels.setup.whatsappScanTitle`)}
    </div>
    ${e.whatsappMessage?E`<div class="channels-wizard__note">${e.whatsappMessage}</div>`:S}
    ${t?S:E`
            <div class="channels-wizard__qr">
              ${e.whatsappQrDataUrl?E`<img
                      src=${e.whatsappQrDataUrl}
                      alt=${s(`channels.setup.whatsappQrAlt`)}
                    />`:e.whatsappBusy?S:E`<div class="channels-wizard__spinner">
                        ${s(`channels.setup.whatsappQrHint`)}
                      </div>`}
            </div>
            <div class="channels-wizard__note">${s(`channels.setup.whatsappScanHelp`)}</div>
          `}
    <div class="channels-wizard__footer">
      ${t?E`
              <button type="button" class="btn primary" @click=${()=>e.onClose()}>
                ${s(`channels.setup.finish`)}
              </button>
            `:E`
              ${e.whatsappBusy?L(s(`channels.setup.whatsappQrLoading`)):E`
                      <button type="button" class="btn" @click=${()=>e.onWhatsAppStart(!0)}>
                        ${e.whatsappQrDataUrl?s(`channels.setup.regenerateQr`):s(`common.showQr`)}
                      </button>
                      ${e.whatsappQrDataUrl?E`
                              <button
                                type="button"
                                class="btn primary"
                                @click=${()=>e.onWhatsAppWait()}
                              >
                                ${s(`common.waitForScan`)}
                              </button>
                            `:S}
                    `}
              <button type="button" class="btn" @click=${()=>e.onClose()}>
                ${s(`channels.setup.linkLater`)}
              </button>
            `}
    </div>
  `}function Xt(e,t){if(e.includes(`whatsapp`))return Yt(t);let n=e.length>0;return E`
    <div class="channels-wizard__message">
      ${s(n?`channels.setup.doneTitle`:`channels.setup.doneNoChangesTitle`)}
    </div>
    <div class="channels-wizard__note">
      ${s(n?`channels.setup.doneBody`:`channels.setup.doneNoChangesBody`)}
    </div>
    <div class="channels-wizard__footer">
      <button type="button" class="btn primary" @click=${()=>t.onClose()}>
        ${s(n?`channels.setup.finish`:`common.close`)}
      </button>
    </div>
  `}function Zt(e){return e?.externalUrl?E`
    <div class="channels-wizard__links">
      <a
        class="channels-wizard__link"
        href=${e.externalUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        ${s(`channels.setup.openLink`)}
      </a>
    </div>
  `:S}function Qt(e){let t=e.wizard;if(t.phase===`idle`)return S;let n=t.channel,r=n?e.channelLabel(n):s(`channels.setup.genericTitle`),i=t.phase===`step`?t.step:null,a;return t.phase===`starting`?a=E`<div class="channels-wizard__footer">
      ${L(s(`channels.setup.starting`))}
    </div>`:t.phase===`error`?a=E`
      <div class="channels-wizard__error">${t.message}</div>
      <div class="channels-wizard__footer">
        <button type="button" class="btn" @click=${()=>e.onClose()}>
          ${s(`common.close`)}
        </button>
      </div>
    `:t.phase===`done`?a=Xt(t.channels,e):i&&(a=E`
      ${t.phase===`step`&&t.validationError?E`<div class="channels-wizard__error">${t.validationError}</div>`:S}
      ${Jt(i,e)}
    `),E`
    <openclaw-modal-dialog
      label=${s(`channels.setup.dialogLabel`,{channel:r})}
      @modal-cancel=${()=>e.onClose()}
    >
      <div class="channels-wizard">
        <div class="channels-wizard__header">
          ${n?F(n,r,`tile`,{pluginIconUrl:e.channelIconUrl?.(n)}):S}
          <div class="channels-wizard__heading">
            <h2>${s(`channels.setup.title`,{channel:r})}</h2>
            <div class="muted channels-wizard__subtitle">
              <span>${s(`channels.setup.subtitle`)}</span>
              ${n?E`<a
                      class="channels-wizard__link"
                      href=${ft(n)}
                      target="_blank"
                      rel="noreferrer noopener"
                      >${s(`channels.setup.viewDocs`)}</a
                    >`:S}
            </div>
          </div>
        </div>
        <div class="channels-wizard__body">${Zt(i)} ${a}</div>
      </div>
    </openclaw-modal-dialog>
  `}function $t(){return($t=e((()=>{C(),I(),He(),m(),k()})))()}function en(e){let t=Z(e.snapshot),n=t.filter(t=>bt(t,e)),r=t.filter(t=>!bt(t,e)),i=!!(e.loading&&e.snapshot&&e.lastSuccessAt),a=e.snapshot?.warnings?.filter(e=>e.trim()).map(e=>x(e))??[],o=tn(e),c=e.selectedChannel;return E`
    ${je(E`
      ${i?E`<div class="callout info">${s(`channels.refreshingStaleSnapshot`)}</div>`:S}
      ${e.snapshot?.partial?E`
              <div class="callout warn">
                ${s(`channels.hub.partialSnapshot`)}
                ${a.length>0?a.slice(0,3).join(`; `):``}
              </div>
            `:S}
      ${e.lastError?E`<div class="callout danger">${e.lastError}</div>`:S}
      ${e.setupBlockedByDirtyConfig&&e.configFormDirty?E`<div class="callout warn">${s(`channels.hub.saveBeforeSetup`)}</div>`:S}
      ${j({title:s(`channels.hub.connectedTitle`),...n.length>0?{count:n.length}:{},actions:Ct({updatedAt:e.lastSuccessAt,disabled:e.loading,onRefresh:()=>e.onRefresh(!0)})},n.length===0?E`
              <div class="channels-empty">
                <!-- No configured transports is a true empty state, so Clawd rests here. -->
                <openclaw-mascot mood="sleepy" .size=${80}></openclaw-mascot>
                ${P(s(`channels.hub.noneConnected`))}
              </div>
            `:w(n,e=>e,t=>cn(t,e)))}
      ${j({title:s(`channels.hub.addTitle`),description:s(`channels.hub.addSubtitle`)},E`
          ${e.canAdmin?E`${w(r,e=>e,t=>ln(t,e))}
                ${un(e)}`:E`<div class="callout info" role="note">${s(`channels.hub.adminRequired`)}</div>`}
        `)}
      ${It(e)}
    `)}
    ${c?Wt({channelId:c,label:Q(e,c),pluginIconUrl:e.pluginIconUrls[c],props:e,data:o,onClose:()=>e.onCloseDetail(),onSetup:()=>e.onStartSetup(c)}):S}
    ${e.canAdmin?Qt({wizard:e.wizard,channelLabel:t=>Q(e,t),channelIconUrl:t=>e.pluginIconUrls[t],multiselectValues:e.wizardMultiselect,onToggleMultiselect:e.onWizardToggleMultiselect,textValue:e.wizardTextValue,secretVisible:e.wizardSecretVisible,onTextInput:e.onWizardTextInput,onToggleSecretVisibility:e.onWizardToggleSecretVisibility,onAnswer:e.onWizardAnswer,onClose:e.onWizardClose,whatsappQrDataUrl:e.whatsappQrDataUrl,whatsappMessage:e.whatsappMessage,whatsappConnected:e.whatsappConnected,whatsappBusy:e.whatsappBusy,onWhatsAppStart:e.onWhatsAppStart,onWhatsAppWait:e.onWhatsAppWait}):S}
    ${Rt(e)}
  `}function tn(e){let t=e.snapshot?.channels;return{whatsapp:t?.whatsapp??void 0,telegram:t?.telegram??void 0,discord:t?.discord??null,googlechat:t?.googlechat??null,slack:t?.slack??null,signal:t?.signal??null,imessage:t?.imessage??null,nostr:t?.nostr??null,channelAccounts:e.snapshot?.channelAccounts??null}}function Z(e){let t=e?.channelMeta?.length?e.channelMeta.map(e=>e.id):e?.channelOrder??[];return[...new Set([...t,...dn])]}function nn(e,t){return e.pluginCatalog?.plugins.find(e=>e.id===t)}function Q(e,t){let n=e.snapshot,r=n?.channelLabels;return nn(e,t)?.name??n?.channelMeta?.find(e=>e.id===t)?.label??(r&&Object.hasOwn(r,t)?r[t]:void 0)??t}function rn(e,t){let n=e.snapshot,r=n?.channelDetailLabels,i=n?.channelMeta?.find(e=>e.id===t)?.detailLabel??(r&&Object.hasOwn(r,t)?r[t]:null);return i&&i!==Q(e,t)?i:null}function an(e,t){let n=V(e,t);return(typeof n.status?.lastError==`string`&&n.status.lastError.trim()?n.status.lastError:b(t.snapshot?.channelAccounts,e).find(e=>e.lastError)?.lastError)?`attention`:n.running===!0||n.connected===!0?`running`:`configured`}function on(e){switch(e){case`running`:return A({kind:`ok`,label:s(`channels.hub.stateRunning`)});case`configured`:return A({kind:`muted`,label:s(`channels.hub.stateConfigured`)});case`attention`:return A({kind:`danger`,label:s(`channels.hub.stateAttention`)});default:return e}}function sn(e,t){let n=b(t.snapshot?.channelAccounts,e).reduce((e,t)=>Math.max(e,t.lastInboundAt??0),0);return n?s(`channels.hub.lastMessageAgo`,{ago:_(n)}):null}function cn(e,t){let n=Q(t,e),r=t.snapshot?.statusIssues?.find(t=>t.channel===e),i=r?x(r.message):sn(e,t)??rn(t,e)??s(`channels.hub.openDetails`);return E`
    <button
      type="button"
      class="settings-row settings-row--nav channels-item"
      @click=${()=>t.onShowDetail(e)}
    >
      ${F(e,n,`tile`,{pluginIconUrl:t.pluginIconUrls[e]})}
      <div class="settings-row__text">
        <span class="settings-row__title">${n}</span>
        <span class="settings-row__desc">${i}</span>
      </div>
      <div class="settings-row__control">
        ${on(r?`attention`:an(e,t))}
        <span class="settings-row__chevron">${O.chevronRight}</span>
      </div>
    </button>
  `}function ln(e,t){let n=nn(t,e),r=Q(t,e),i=n?.description??rn(t,e)??s(`channels.hub.guidedSetup`);return E`
    <div class="settings-row channels-item">
      <button
        type="button"
        class="channels-item__detail"
        title=${s(`channels.hub.openDetails`)}
        @click=${()=>t.onShowDetail(e)}
      >
        ${F(e,r,`tile`,{pluginIconUrl:t.pluginIconUrls[e]})}
        <span class="settings-row__text">
          <span class="settings-row__title">${r}</span>
          <span class="settings-row__desc">${i}</span>
        </span>
      </button>
      <div class="settings-row__control">
        <button type="button" class="btn btn--sm" @click=${()=>t.onStartSetup(e)}>
          ${s(`channels.hub.setUp`)}
        </button>
      </div>
    </div>
  `}function un(e){return E`
    <button
      type="button"
      class="settings-row settings-row--nav channels-item"
      @click=${()=>e.onStartSetup(null)}
    >
      <span
        class="channels-tile channels-tile--fallback"
        style="--channels-art-a:#64748b;--channels-art-b:#1e293b"
        aria-hidden="true"
      >
        <span>+</span>
      </span>
      <div class="settings-row__text">
        <span class="settings-row__title">${s(`channels.hub.browseAllTitle`)}</span>
        <span class="settings-row__desc">${s(`channels.hub.browseAllSubtitle`)}</span>
      </div>
      <div class="settings-row__control">
        <span class="settings-row__chevron">${O.chevronRight}</span>
      </div>
    </button>
  `}var dn;function fn(){return(fn=e((()=>{C(),se(),I(),le(),Ae(),N(),m(),g(),p(),y(),Gt(),Y(),q(),$t(),dn=[`whatsapp`,`telegram`,`discord`,`googlechat`,`slack`,`signal`,`imessage`,`nostr`]})))()}function pn(e,t){let r=e.state.channelsSnapshot,i=t??r?.channelDefaultAccountId.whatsapp??`default`,a=b(r?.channelAccounts,`whatsapp`).find(e=>e.accountId===i);return!a&&t!==void 0?null:{accountId:i,linked:a?.linked??(t===void 0?n(r?.channels.whatsapp)?.linked:void 0)}}async function mn(e){let t=pn(e.channels,e.getWizardAccountId());if(!t||!e.isCurrent()||!await Fe({title:s(`channels.whatsapp.logoutConfirmTitle`,{accountId:t.accountId}),message:s(`channels.whatsapp.logoutConfirmMessage`,{accountId:t.accountId}),confirmLabel:s(`common.logout`),danger:!0})||!e.isCurrent())return;let n=pn(e.channels,e.getWizardAccountId());n&&n.accountId===t.accountId&&n.linked===t.linked&&await e.channels.logoutWhatsApp(t.accountId)}function hn(){return(hn=e((()=>{Me(),m(),g()})))()}async function gn(e,t,n,r){let i,a=!1,o=e.request(t,n).then(e=>(a&&r?.(e),e));try{return await Promise.race([o,new Promise((e,n)=>{i=setTimeout(()=>{a=!0,n(Error(`wizard request timed out: ${t}`))},vn)})])}finally{clearTimeout(i)}}function _n(e,t){t.sessionId&&!t.done&&e.request(`wizard.cancel`,{sessionId:t.sessionId}).catch(()=>{})}var vn,yn;function bn(){return(bn=e((()=>{p(),u(),vn=12e4,yn=class{constructor(e,t,n,r){this.getClient=e,this.onChange=t,this.isKnownChannel=n,this.sessionExpiredMessage=r,this.currentState={phase:`idle`},this.sessionId=null,this.channel=null,this.stepIndex=0,this.generation=0,this.abortController=null}get state(){return this.currentState}async start(e){let t=this.getClient();if(!t)return;let n=++this.generation;this.abortController?.abort(),this.abortController=new AbortController,this.sessionId=null,this.channel=e,this.stepIndex=0,this.setState({phase:`starting`,channel:e});try{let r=await gn(t,`wizard.start`,{flow:`channels`,...e?{channel:e}:{}},e=>_n(t,e));if(this.generation!==n){_n(t,r);return}this.sessionId=r.sessionId??null,this.applyResult(r)}catch(t){if(this.generation!==n)return;this.setState({phase:`error`,channel:e,message:v(t)})}}async answer(e){let t=this.currentState;if(!this.getClient()||!this.sessionId||t.phase!==`step`||t.busy)return;let n=this.generation;t.step.type===`select`&&typeof e==`string`&&this.isKnownChannel(e)&&(this.channel??=e),this.setState({...t,busy:!0,validationError:null}),await this.advance(n,{stepId:t.step.id,value:e})}async advance(e,t){let n=this.getClient(),r=this.sessionId;if(!n||!r||this.generation!==e)return;let i=this.abortController?.signal;if(t||i)try{let a={sessionId:r,...t?{answer:t}:{}},o=t?await gn(n,`wizard.next`,a):await n.request(`wizard.next`,a,{timeoutMs:null,...i?{signal:i}:{}});if(this.generation!==e)return;this.applyResult(o)}catch(t){if(this.generation!==e)return;if(d(t)){this.sessionId=null,this.abortController?.abort(),this.abortController=null,this.setState({phase:`error`,channel:this.channel,message:this.sessionExpiredMessage()});return}this.setState({phase:`error`,channel:this.channel,message:v(t)})}}async cancel(){let e=this.getClient(),t=this.sessionId;if(this.generation+=1,this.sessionId=null,this.abortController?.abort(),this.abortController=null,this.channel=null,this.setState({phase:`idle`}),e&&t)try{await e.request(`wizard.cancel`,{sessionId:t})}catch{}}applyResult(e){if(!e.done&&e.step){this.stepIndex+=1;let t=e.step.executor===`gateway`;this.setState({phase:`step`,channel:this.channel,step:e.step,stepIndex:this.stepIndex,busy:t,validationError:e.error?x(e.error):null}),t&&this.advance(this.generation);return}if(e.status===`done`){this.sessionId=null,this.abortController=null;let t=e.channels??[];this.setState({phase:`done`,channel:this.channel??t[0]??null,channels:t,accounts:e.accounts??[]});return}if(e.status===`cancelled`){this.sessionId=null,this.abortController=null,this.channel=null,this.setState({phase:`idle`});return}this.sessionId=null,this.abortController=null,this.setState({phase:`error`,channel:this.channel,message:x(e.error,`Wizard failed.`)})}setState(e){this.currentState=e,this.onChange()}}})))()}var xn;function Sn(){return(Sn=e((()=>{m(),bn(),xn=class{constructor(e){this.deps=e,this.multiselect=[],this.textValue=``,this.secretVisible=!1,this.blockedByDirtyConfig=!1,this.multiselectStepId=null,this.textStepId=null,this.lastPhase=`idle`,this.controller=new yn(()=>e.getContext()?.gateway.snapshot.client??null,()=>this.handleControllerChange(),t=>e.getContext()?.channels.state.channelsSnapshot?.channelMeta?.some(e=>e.id===t)??!1,()=>s(`channels.setup.sessionExpired`))}get state(){return this.controller.state}startSetup(e){if(this.deps.getContext()?.runtimeConfig.state.configFormDirty){this.blockedByDirtyConfig=!0,this.deps.requestUpdate();return}this.blockedByDirtyConfig=!1,this.whatsappAccountId=void 0,this.deps.clearSelection(),this.controller.start(e)}close(){let e=this.controller.state.phase!==`idle`;this.controller.cancel(),e&&this.deps.getContext()?.channels.refresh(!0)}cancelOnDisconnect(){this.controller.cancel()}answer(e){this.controller.answer(e)}toggleMultiselect(e){this.multiselect=this.multiselect.includes(e)?this.multiselect.filter(t=>t!==e):[...this.multiselect,e],this.deps.requestUpdate()}setTextValue(e){this.textValue=e}toggleSecretVisibility(){this.secretVisible=!this.secretVisible,this.deps.requestUpdate()}handleControllerChange(){let e=this.controller.state,t=e.phase===`step`?e.step.id:null;t!==this.multiselectStepId&&(this.multiselectStepId=t,this.multiselect=e.phase===`step`&&Array.isArray(e.step.initialValue)?[...e.step.initialValue]:[]),t!==this.textStepId&&(this.textStepId=t,this.textValue=e.phase===`step`&&e.step.type===`text`&&typeof e.step.initialValue==`string`?e.step.initialValue:``,this.secretVisible=!1),e.phase===`done`&&this.lastPhase!==`done`&&this.handleCompleted(e.accounts),this.lastPhase=e.phase,this.deps.requestUpdate()}async handleCompleted(e){let t=this.deps.getContext();if(!t)return;await t.runtimeConfig.discardDraft({reloadOnly:!0}),await t.channels.refresh(!0);let n=e.find(e=>e.channel===`whatsapp`);n&&(this.whatsappAccountId=n.accountId,await t.channels.startWhatsApp(!1,n.accountId))}}})))()}function Cn(e,t){return e instanceof DOMException&&e.name===`TimeoutError`?s(`channels.nostr.notices.timeout`):s(`channels.nostr.notices.operationFailed`,{prefix:t,error:v(e)})}var wn,Tn,$;function En(){return(En=e((()=>{o(),C(),oe(),xe(),ce(),ve(),ye(),_e(),N(),We(),m(),g(),p(),we(),re(),Oe(),h(),it(),ct(),R(),fn(),hn(),Sn(),wn=3e4,Tn=`https://docs.openclaw.ai/channels`,$=class extends f{constructor(...e){super(...e),this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.selectedChannel=null,this.pairingChannelFilter=null,this.pairingAccountFilter=null,this.pairingPrompt=null,this.pairingNotice=null,this.pluginPresentation=new st({getContext:()=>this.context,getChannelIds:()=>Z(this.context.channels.state.channelsSnapshot),isConnected:()=>this.isConnected,requestUpdate:()=>this.requestUpdate()}),this.wizardHost=new xn({getContext:()=>this.context,requestUpdate:()=>this.requestUpdate(),clearSelection:()=>this.selectedChannel=null}),this.schemaLoadStarted=!1,this.gatewayPairingAuthSignature=null,this.gateway=new Ce(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.clearNostrForm(),onSnapshot:e=>this.handleGatewaySnapshot(e)}),this.pairingPolling=new De(this,wn,()=>{let e=this.context?.gateway.snapshot;e?.phase===`connected`&&D(e.hello?.auth??null)&&this.context.channels.refreshPairing()},!1),this.subscriptions=new c(this).effect(()=>this.context?.channels,e=>{let t=this.channelsSource!==void 0&&this.channelsSource!==e;this.channelsSource=e,t&&this.invalidateNostrForm();let n=()=>{this.channelsSource===e&&(this.reconcilePairingFilter(e.state.pairingSnapshot),this.pluginPresentation.ensure(this.context.gateway.snapshot.client),this.requestUpdate())};return n(),e.subscribe(n)}).effect(()=>this.context?.runtimeConfig,e=>{this.schemaLoadStarted=!1;let t=()=>{this.context.runtimeConfig===e&&(this.requestUpdate(),this.ensureInitialData())};t();let n=e.subscribe(t);return()=>{n(),this.schemaLoadStarted=!1}}).watch(()=>this.context?.theme,(e,t)=>e.subscribe(t),()=>{this.requestUpdate()})}handleGatewaySnapshot(e){let t=e.snapshot,n=D(t.hello?.auth??null),r=ie(t),i=!e.initial&&this.gatewayPairingAuthSignature!==r;(e.identityChanged||t.phase!==`connected`)&&this.clearNostrForm(),(e.identityChanged||e.connectionChanged||t.phase!==`connected`)&&this.pluginPresentation.reset(),(e.identityChanged||i||t.phase!==`connected`||!n)&&(this.pairingPrompt=null,this.pairingChannelFilter=null,this.pairingAccountFilter=null,this.pairingNotice=null),this.gatewayPairingAuthSignature=r,this.syncPairingPolling(t),t.phase===`connected`&&t.client?(e.initial||this.ensureInitialData(),!e.initial&&(e.identityChanged||e.connectionChanged||i)&&n&&this.context.channels.refreshPairing()):this.schemaLoadStarted=!1}syncPairingPolling(e){if(e.phase===`connected`&&e.client&&D(e.hello?.auth??null)){this.pairingPolling.start();return}this.pairingPolling.stop()}ensureInitialData(){let e=this.context,t=e.gateway.snapshot,n=t.client;if(t.phase!==`connected`||!n)return;this.pluginPresentation.ensure(n);let r=e.channels.state,i=e.runtimeConfig.state;!r.channelsSnapshot&&!r.channelsLoading&&e.channels.refresh(!1),D(t.hello?.auth??null)&&!r.pairingSnapshot&&!r.pairingLoading&&e.channels.refreshPairing(),!i.configSnapshot&&!i.configLoading&&e.runtimeConfig.ensureLoaded(),!i.configSchema&&!i.configSchemaLoading&&!this.schemaLoadStarted&&(this.schemaLoadStarted=!0,e.runtimeConfig.ensureSchemaLoaded())}disconnectedCallback(){this.wizardHost.cancelOnDisconnect(),this.selectedChannel=null,this.channelsSource=void 0,this.gatewayPairingAuthSignature=null,this.pairingPrompt=null,this.pairingChannelFilter=null,this.pairingAccountFilter=null,this.pairingNotice=null,this.pairingPolling.stop(),this.pluginPresentation.reset(),this.invalidateNostrForm(),this.subscriptions.clear(),this.schemaLoadStarted=!1,super.disconnectedCallback()}setShowAdvancedSettings(e){fe({showAdvancedSettings:e}),this.context.theme.refresh()}async saveChannelConfig(){this.context&&await this.context.runtimeConfig.save()&&await this.context.channels.refresh(!0)}async reloadChannelConfig(){let e=this.context;e&&(await e.runtimeConfig.discardDraft({reloadOnly:!0}),await e.channels.refresh(!0))}async confirmWhatsAppLogout(){let e=this.context,t=e.channels,n=this.gateway.capture();n&&this.channelsSource===t&&await mn({channels:t,getWizardAccountId:()=>this.wizardHost.whatsappAccountId,isCurrent:()=>this.gateway.isCurrent(n)&&this.context===e&&this.channelsSource===t})}resolveNostrAccountId(){let e=this.context?.channels.state.channelsSnapshot?.channelAccounts?.nostr??[];return this.nostrProfileAccountId??e[0]?.accountId??`default`}resolveGatewayHttpCredentials(e){return he({hello:e.snapshot.hello,settings:{token:e.connection.token},password:e.connection.password})}clearNostrForm(){this.nostrProfileFormState=null,this.nostrProfileAccountId=null}invalidateNostrForm(){this.gateway.invalidate(),this.clearNostrForm()}beginNostrOperation(){let e=this.gateway.gateway,t=this.context.channels,n=this.gateway.capture();return!e||!n||this.channelsSource!==t||this.context.gateway!==e||(this.gateway.invalidate(),n=this.gateway.capture(),!n)?null:{scope:n,gateway:e,channels:t,formAccountId:this.nostrProfileAccountId,accountId:this.resolveNostrAccountId(),authCandidates:this.resolveGatewayHttpCredentials(e)}}currentNostrForm(e){let t=this.nostrProfileFormState;return!t||!this.gateway.isCurrent(e.scope)||this.nostrProfileAccountId!==e.formAccountId||this.context.gateway!==e.gateway||this.context.channels!==e.channels||e.gateway.snapshot.client!==e.scope.client?null:t}editNostrProfile(e,t){this.gateway.invalidate(),this.nostrProfileAccountId=e,this.nostrProfileFormState=dt(t??void 0)}cancelNostrProfile(){this.invalidateNostrForm()}changeNostrProfileField(e,t){let n=this.nostrProfileFormState;n&&(this.nostrProfileFormState={...n,values:{...n.values,[e]:t},fieldErrors:{...n.fieldErrors,[e]:``}})}toggleNostrProfileAdvanced(){let e=this.nostrProfileFormState;e&&(this.nostrProfileFormState={...e,showAdvanced:!e.showAdvanced})}async saveNostrProfile(){let e=this.nostrProfileFormState;if(!e||e.saving||e.importing)return;let t=this.beginNostrOperation();if(!t)return;let n={...e,saving:!0,error:null,success:null,fieldErrors:{}};this.nostrProfileFormState=n;try{let{data:n,response:r,errorMessage:i}=await et({accountId:t.accountId,authCandidates:t.authCandidates,isCurrent:()=>this.currentNostrForm(t)!==null,values:e.values}),a=this.currentNostrForm(t);if(!a)return;if(!r.ok||n?.ok===!1||!n){this.nostrProfileFormState={...a,saving:!1,error:i,success:null,fieldErrors:Qe(n?.details)};return}if(!n.persisted){this.nostrProfileFormState={...a,saving:!1,error:s(`channels.nostr.notices.publishFailed`),success:null};return}this.nostrProfileFormState={...a,saving:!1,error:null,success:s(`channels.nostr.notices.published`),fieldErrors:{},original:{...e.values}},await t.channels.refresh(!0)}catch(e){let n=this.currentNostrForm(t);if(!n)return;this.nostrProfileFormState={...n,saving:!1,error:Cn(e,s(`channels.nostr.notices.updateFailed`)),success:null}}}async importNostrProfile(){let e=this.nostrProfileFormState;if(!e||e.importing||e.saving)return;let t=this.beginNostrOperation();if(t){this.nostrProfileFormState={...e,importing:!0,error:null,success:null};try{let{data:e,response:n,errorMessage:r}=await nt({accountId:t.accountId,authCandidates:t.authCandidates,isCurrent:()=>this.currentNostrForm(t)!==null}),i=this.currentNostrForm(t);if(!i)return;if(!n.ok||e?.ok===!1||!e){this.nostrProfileFormState={...i,importing:!1,error:r,success:null};return}let a=e.merged??e.imported??null,o=a?{...i.values,...a}:i.values;this.nostrProfileFormState={...i,importing:!1,values:o,error:null,success:e.saved?s(`channels.nostr.notices.importedFromRelays`):s(`channels.nostr.notices.imported`),showAdvanced:!!(o.banner||o.website||o.nip05||o.lud16)},e.saved&&await t.channels.refresh(!0)}catch(e){let n=this.currentNostrForm(t);if(!n)return;this.nostrProfileFormState={...n,importing:!1,error:Cn(e,s(`channels.nostr.notices.importFailed`)),success:null}}}}reconcilePairingFilter(e){if(!e||!this.pairingChannelFilter)return;let t=e.accounts.filter(e=>e.channel===this.pairingChannelFilter);if(t.length===0){this.pairingChannelFilter=null,this.pairingAccountFilter=null;return}this.pairingAccountFilter&&!t.some(e=>e.accountId===this.pairingAccountFilter)&&(this.pairingAccountFilter=null)}setPairingFilter(e,t){this.pairingChannelFilter=e,this.pairingAccountFilter=e?t:null}reviewPairingAccount(e,t){this.selectedChannel=null,this.setPairingFilter(e,t),this.updateComplete.then(()=>{this.renderRoot.querySelector(`#channels-pairing-requests`)?.scrollIntoView({behavior:ke(),block:`start`})})}openPairingPrompt(e,t){this.context.channels.state.pairingBusyRequestId||(this.pairingNotice=null,this.pairingPrompt={kind:e,request:t,notify:!1,bootstrapCommandOwner:!1})}patchPairingPrompt(e){this.pairingPrompt&&={...this.pairingPrompt,...e}}async confirmPairingPrompt(){let e=this.pairingPrompt;if(!e)return;if(e.kind===`dismiss`){await this.context.channels.dismissPairing({channel:e.request.channel,accountId:e.request.accountId,requestId:e.request.requestId})&&this.pairingPrompt===e&&(this.pairingPrompt=null,this.pairingNotice=s(`channels.pairing.dismissedNotice`));return}let t=await this.context.channels.approvePairing({channel:e.request.channel,accountId:e.request.accountId,requestId:e.request.requestId,notify:e.notify,bootstrapCommandOwner:e.bootstrapCommandOwner});t&&this.pairingPrompt===e&&(this.pairingPrompt=null,this.pairingNotice=t.notification===`failed`&&t.commandOwnerBootstrap===`unavailable`?s(`channels.pairing.approvedFollowupsFailedNotice`):t.commandOwnerBootstrap===`unavailable`?s(`channels.pairing.approvedOwnerFailedNotice`):t.notification===`failed`?s(`channels.pairing.approvedNotificationFailedNotice`):t.commandOwnerBootstrap===`configured`?s(`channels.pairing.approvedOwnerNotice`):s(`channels.pairing.approvedNotice`))}render(){let e=this.context,t=e.channels.state,n=e.runtimeConfig.state,r=e.gateway.snapshot.hello?.auth??null,i=D(r),a=pe(r);return E`
      <section class="content-header">
        <div>
          <div class="page-title">${Se(`channels`)}</div>
          <div class="page-subtitle">
            ${me(`channels`)} ${Ne(Tn)}
          </div>
        </div>
      </section>
      ${Ue(en({connected:t.connected,loading:t.channelsLoading,snapshot:t.channelsSnapshot,pluginCatalog:this.pluginPresentation.pluginCatalog,pluginIconUrls:this.pluginPresentation.pluginIconUrls,lastError:t.channelsError,lastSuccessAt:t.channelsLastSuccess,pairingLoading:t.pairingLoading,pairingSnapshot:t.pairingSnapshot,pairingError:t.pairingError,pairingLastSuccessAt:t.pairingLastSuccess,pairingBusyRequestId:t.pairingBusyRequestId,pairingChannelFilter:this.pairingChannelFilter,pairingAccountFilter:this.pairingAccountFilter,pairingPrompt:this.pairingPrompt,pairingNotice:this.pairingNotice,canManagePairing:i,canAdmin:a,whatsappMessage:t.whatsappLoginMessage,whatsappQrDataUrl:t.whatsappLoginQrDataUrl,whatsappConnected:t.whatsappLoginConnected,whatsappBusy:t.whatsappBusy,configSchema:n.configSchema,configSchemaLoading:n.configSchemaLoading,configForm:n.configForm,configUiHints:n.configUiHints,configSaving:n.configSaving,configError:n.lastError,configFormDirty:n.configFormDirty,showAdvancedSettings:ue().showAdvancedSettings===!0,nostrProfileFormState:this.nostrProfileFormState,nostrProfileAccountId:this.nostrProfileAccountId,selectedChannel:this.selectedChannel,wizard:this.wizardHost.state,wizardMultiselect:this.wizardHost.multiselect,wizardTextValue:this.wizardHost.textValue,wizardSecretVisible:this.wizardHost.secretVisible,setupBlockedByDirtyConfig:this.wizardHost.blockedByDirtyConfig,onShowDetail:e=>{this.selectedChannel=e},onCloseDetail:()=>{this.selectedChannel=null},onStartSetup:e=>{a&&this.wizardHost.startSetup(e)},onWizardAnswer:e=>this.wizardHost.answer(e),onWizardToggleMultiselect:e=>this.wizardHost.toggleMultiselect(e),onWizardTextInput:e=>this.wizardHost.setTextValue(e),onWizardToggleSecretVisibility:()=>this.wizardHost.toggleSecretVisibility(),onWizardClose:()=>this.wizardHost.close(),onRefresh:t=>void e.channels.refresh(t),onPairingRefresh:()=>void e.channels.refreshPairing(),onPairingFilterChange:(e,t)=>this.setPairingFilter(e,t),onPairingReviewAccount:(e,t)=>this.reviewPairingAccount(e,t),onPairingApprove:e=>this.openPairingPrompt(`approve`,e),onPairingDismiss:e=>this.openPairingPrompt(`dismiss`,e),onPairingPromptChange:e=>this.patchPairingPrompt(e),onPairingPromptCancel:()=>{this.pairingPrompt=null},onPairingPromptConfirm:()=>void this.confirmPairingPrompt(),onWhatsAppStart:t=>void e.channels.startWhatsApp(t,this.wizardHost.whatsappAccountId),onWhatsAppWait:()=>void e.channels.waitWhatsApp(this.wizardHost.whatsappAccountId),onWhatsAppLogout:()=>void this.confirmWhatsAppLogout(),onShowAdvancedSettings:e=>this.setShowAdvancedSettings(e),onConfigPatch:(t,n)=>e.runtimeConfig.patchForm(t,n),onConfigSave:()=>void this.saveChannelConfig(),onConfigReload:()=>void this.reloadChannelConfig(),onNostrProfileEdit:(e,t)=>this.editNostrProfile(e,t),onNostrProfileCancel:()=>this.cancelNostrProfile(),onNostrProfileFieldChange:(e,t)=>this.changeNostrProfileField(e,t),onNostrProfileSave:()=>void this.saveNostrProfile(),onNostrProfileImport:()=>void this.importNostrProfile(),onNostrProfileToggleAdvanced:()=>this.toggleNostrProfileAdvanced()}))}
    `}},r([i({context:de,subscribe:!0})],$.prototype,`context`,void 0),r([T()],$.prototype,`nostrProfileFormState`,void 0),r([T()],$.prototype,`nostrProfileAccountId`,void 0),r([T()],$.prototype,`selectedChannel`,void 0),r([T()],$.prototype,`pairingChannelFilter`,void 0),r([T()],$.prototype,`pairingAccountFilter`,void 0),r([T()],$.prototype,`pairingPrompt`,void 0),r([T()],$.prototype,`pairingNotice`,void 0),customElements.get(`openclaw-channels-page`)||customElements.define(`openclaw-channels-page`,$)})))()}En();
//# sourceMappingURL=channels-page-Cv8iIKNr.js.map