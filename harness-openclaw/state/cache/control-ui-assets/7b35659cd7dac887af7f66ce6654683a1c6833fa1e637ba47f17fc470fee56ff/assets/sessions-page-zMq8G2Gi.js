const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./input-dialog-Bm-7hRaz.js","./input-dialog-JxebFWoS.js","./rolldown-runtime-8BhlS34s.js","./control-ui-core-CndkyZ8m.js","./control-ui-foundation-DaCuy7E_.js","./lit-runtime-CIjzngcy.js","./control-ui-core-C5mtYcym.js","./gateway-runtime-BvWNTqPo.js","./control-ui-core-DvoiO6cr.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ga as t,Ha as n,Kr as r,Mi as i,Rr as a,fr as o,hr as s,ji as c,on as l,qn as u,ya as d,zr as f}from"./control-ui-foundation-DaCuy7E_.js";import{$s as p,Ac as m,Al as h,Bi as g,Bs as _,Cr as v,Ei as y,F as b,Ic as x,Ii as S,Js as C,Ll as w,Pc as T,Qs as ee,Rn as te,Sl as E,Ss as D,Tl as O,To as ne,Uc as k,Vs as re,Wc as ie,Wi as A,Xs as ae,Zs as oe,Zt as se,_s as ce,ai as le,an as j,bs as M,fc as ue,in as de,jc as fe,kc as pe,mn as me,nl as he,nt as ge,oi as N,qc as P,rt as _e,un as ve,vs as ye,wl as be,zn as xe}from"./control-ui-core-CndkyZ8m.js";import{$ as F,Q as Se,at as Ce,dt as I,nt as L,pt as we}from"./lit-runtime-CIjzngcy.js";import{$r as Te,Di as Ee,Ei as R,Qr as De,bi as Oe,ln as ke,si as Ae,un as je,wi as Me,xi as Ne}from"./control-ui-core-C5mtYcym.js";import{c as Pe,u as z}from"./gateway-runtime-BvWNTqPo.js";import{B as Fe,Ba as Ie,Di as Le,Ei as Re,Fa as ze,Fi as Be,I as Ve,Ia as He,Ki as Ue,L as We,Li as Ge,Mt as Ke,P as qe,Si as Je,Ti as Ye,Ur as Xe,Vi as Ze,Wi as Qe,Wr as $e,Xa as et,Ya as B,Yc as tt,Yi as nt,fi as rt,fo as it,go as at,jt as ot,kt as st,mi as ct,xi as lt,z as ut,za as dt}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as ft,U as pt,V as mt,z as ht}from"./control-ui-boot-shared-DwSLfX8E.js";import{Fr as gt,Ir as _t,Mt as vt,Nt as yt,_t as V,br as bt,dt as xt,fa as St,gt as Ct,ht as H,it as wt,nt as U,pa as W,qi as Tt,ti as Et,yr as Dt}from"./control-ui-boot-shared-DpHhsTHW.js";import{a as Ot,n as kt,o as At,r as jt,t as Mt}from"./session-workspace-recovery.runtime-CbUrbi4u.js";import{s as Nt,u as Pt}from"./control-ui-boot-shared-DPto3YH7.js";import{n as Ft,r as It,t as Lt}from"./control-ui-boot-shared-CoE663Cg.js";import{C as Rt}from"./control-ui-boot-new-CQMzhCGu.js";import{n as zt,t as Bt}from"./transcript-search-CH2D-lkV.js";import{n as Vt,t as Ht}from"./cloud-worker-stop.runtime-Cm8BV6z1.js";import{n as Ut,t as Wt}from"./settings-workspace-gGOfyDax.js";import{n as Gt,t as Kt}from"./agent-row-chip-m2O7L9Wr.js";import{o as qt,s as Jt}from"./presenter-DTSxSRZD.js";import{n as Yt,t as Xt}from"./agent-scope-control-CS9bqwlc.js";import{n as Zt,t as Qt}from"./capacity-meter-BcnfCdUw.js";import{n as $t,t as en}from"./sessions-hub-header-DjgGbme9.js";function tn(e){return[...new Set((e?.sessions??[]).map(e=>k(e.key)?.agentId).filter(e=>!!e))]}function nn(e,t){return Object.fromEntries(tn(e).map(e=>[e,t(e)]).filter(e=>!!e[1]))}function rn(){return(rn=e((()=>{T()})))()}function an(e,{key:t,sessionId:n,pinned:r},i){let a=e.captureConnectionScope();return a?o=>{e.isConnectionScopeCurrent(a)&&o.entry.sessionId===n&&N({message:h(`sessionsView.sessionArchived`),actionLabel:h(`common.undo`),onAction:()=>{e.isConnectionScopeCurrent(a)&&e.patch(t,{archived:!1,...r===!0?{pinned:!0}:{}},{agentId:i,expectedSessionId:n}).catch(t=>{e.isConnectionScopeCurrent(a)&&N({message:M(t)})})}})}:null}function on(){return(on=e((()=>{O(),D(),le()})))()}function sn(e,t){let n=(e?.sessions??[]).map(e=>e.category?.trim()).filter(e=>!!e);return[...new Set([...t,...n.toSorted((e,t)=>e.localeCompare(t))])]}async function cn(e){if(!e.sessions||e.knownCategories.includes(e.name))return`completed`;try{return await e.sessions.groupsPut([...e.sessions.state.groups??[],e.name])===`completed`&&e.isCurrent()?`completed`:`stale`}catch(t){return e.isCurrent()?(e.onError(M(t)),`failed`):`stale`}}function ln(){return(ln=e((()=>{D()})))()}function un(e,t){let n=t.deepLinkSessionKey?.trim()||null,r=k(n)?.agentId??e.agentSelection.state.scopeId?.trim(),i=!n&&t.statusFilter===`active`?t.activeMinutes:void 0;return{limit:n?50:t.limit,...i?{activeMinutes:i}:{},...n||t.search?.trim()?{search:n??t.search.trim()}:{},includeGlobal:n?!0:t.includeGlobal,includeUnknown:n?!0:t.includeUnknown,includeDerivedTitles:!1,includeLastMessage:!1,archivedFilter:t.statusFilter,...r?{agentId:r}:{}}}function dn(){return(dn=e((()=>{me(),T()})))()}function fn(){return nt(w()?.getItem(G))}function pn(e){try{w()?.setItem(G,e)}catch{}}var G;function mn(){return(mn=e((()=>{Ue(),G=`openclaw:sessions:group-by`})))()}function hn(e,t){return Object.hasOwn(e,t)?e[t]??null:null}function gn(e,t){let n=Fe({catalog:[],session:e,defaults:t,sessionKey:e.key,sessionsResult:null});return[{value:``,label:n.inherited.displayLabel},...n.options]}function K(e,t){return!t||e.some(e=>e.value===t)?[...e]:[...e,{value:t,label:Ve(t)}]}function q(e,t=!1){return e.map(e=>({value:e,label:h(e===``?`sessionsView.inherit`:t&&e===`off`?`sessionsView.offExplicit`:`sessionsView.${e}`)}))}function _n(e){return h(Xn[e]??`sessionsView.statusUnknown`)}function vn(e){let t=l(e),n=e.hasActiveRun===!1&&(!e.status||e.status===`running`),r=e.status===`queued`?h(`sessionsView.statusQueued`):t?h(`sessionsView.statusLive`):n?h(`sessionsView.statusIdle`):e.status?_n(e.status):h(`sessionsView.statusUnknown`),i=e.status===`queued`?`warn`:t||e.status===`done`?`ok`:n||!e.status?`muted`:`danger`,a=`${h(`sessionsView.status`)}: ${r}`;return L`
    <openclaw-tooltip .content=${a}>
      ${V({kind:i,label:r})}
    </openclaw-tooltip>
  `}function yn(e){let t=A(e);return L`
    <span class="session-avatar session-avatar--${t}" aria-hidden="true">
      ${Zn[t]??R.circle}
      ${l(e)?L`<span class="session-avatar__status"></span>`:F}
    </span>
  `}function bn(e){let t=e.totalTokens;if(typeof t!=`number`||!Number.isFinite(t))return L`<span class="muted">${h(`common.na`)}</span>`;let n=e.totalTokensFresh!==!1,r=`${n?``:`~`}${se(t)}`,i=qe(e),a=i.tokens>0?i.tokens:null;if(!a)return L`<span class="session-tokens__value">${r}</span>`;let o=Math.min(100,Math.round(t/a*100)),s=n?o>=$n?`danger`:o>=Qn?`warn`:`ok`:`stale`,c=h(i.fromLastPrompt?n?`sessionsView.promptBudgetUsage`:`sessionsView.promptBudgetUsageApprox`:n?`sessionsView.contextUsage`:`sessionsView.contextUsageApprox`,{percent:String(o),used:t.toLocaleString(),context:a.toLocaleString()});return L`
    <openclaw-tooltip .content=${c}>
      <div class="session-tokens">
        <span class="session-tokens__value"
          >${r} / ${se(a)}</span
        >
        ${Zt({mode:`continuous`,percent:o,tone:s,label:c})}
      </div>
    </openclaw-tooltip>
  `}function xn(e,t,n){let r=e.filter(e=>e.unread===!0&&e.archived!==!0).length,i=e.filter(e=>e.archived===!0).length,a=[[String(t),h(`sessionsView.statusLive`),t>0],[String(r),h(`sessionsView.unread`),r>0]];return n!==`active`&&a.push([String(i),h(`sessionsView.archived`),!1]),L`
    <span class="sessions-heading-facts">
      ${a.map(([e,t,n],r)=>L`
          ${r>0?L`<span class="sessions-heading-fact__separator" aria-hidden="true">·</span>`:F}
          <span
            class=${n?`sessions-heading-fact sessions-heading-fact--active`:`sessions-heading-fact`}
          >
            <strong>${e}</strong> ${t}
          </span>
        `)}
    </span>
  `}function Sn(e,n){let r=n.find(t=>t.key===e.sessionKey);return t(r?.label)??t(r?.displayName)??e.sessionKey}function Cn(e){let t=e.transcriptSearchQuery.trim().length>0,n=e.transcriptSearch,r=n.status===`results`?n.results:[],i=n.status===`results`?n.sessions:[],a=n.status===`loading`;return L`
    <section
      class="sessions-transcript-search"
      aria-label=${h(`sessionsView.transcriptSearchTitle`)}
    >
      <form
        class="sessions-transcript-search__form"
        role="search"
        aria-label=${h(`sessionsView.transcriptSearchTitle`)}
        @submit=${n=>{n.preventDefault(),e.transcriptSearchAvailable&&t&&!a&&e.onTranscriptSearch()}}
      >
        <div class="data-table-search sessions-transcript-search__input">
          <input
            type="search"
            maxlength="4096"
            aria-label=${h(`sessionsView.transcriptSearchInputLabel`)}
            placeholder=${h(`sessionsView.transcriptSearchPlaceholder`)}
            .value=${e.transcriptSearchQuery}
            ?disabled=${!e.transcriptSearchAvailable}
            @input=${t=>e.onTranscriptSearchChange(t.target.value)}
          />
        </div>
        <button
          class="btn primary"
          type="submit"
          ?disabled=${!e.transcriptSearchAvailable||!t||a}
        >
          ${h(a?`sessionsView.transcriptSearchSearching`:`sessionsView.transcriptSearchAction`)}
        </button>
        ${t?L`
                <button class="btn" type="button" @click=${e.onClearTranscriptSearch}>
                  ${h(`sessionsView.transcriptSearchClear`)}
                </button>
              `:F}
      </form>
      ${e.transcriptSearchAvailable?F:L`
              <div class="muted" role="status">
                ${h(`sessionsView.transcriptSearchUnavailable`)}
              </div>
            `}
      <div
        class="sessions-transcript-search__status"
        aria-live="polite"
        aria-busy=${a?`true`:`false`}
      >
        ${a?L`<span class="muted">${h(`sessionsView.transcriptSearchSearching`)}</span>`:F}
        ${n.status===`error`?L`
                <div
                  class="sessions-transcript-search__notice sessions-transcript-search__notice--danger"
                >
                  <span>${h(`sessionsView.transcriptSearchError`)}: ${n.message}</span>
                  <button class="btn btn--sm" type="button" @click=${e.onTranscriptSearch}>
                    ${h(`sessionsView.transcriptSearchRetry`)}
                  </button>
                </div>
              `:F}
        ${n.status===`results`&&n.indexing?L`
                <div class="sessions-transcript-search__notice">
                  <span>${h(`sessionsView.transcriptSearchIndexing`)}</span>
                  <button
                    class="btn btn--sm"
                    type="button"
                    ?disabled=${a}
                    @click=${e.onTranscriptSearch}
                  >
                    ${h(`sessionsView.transcriptSearchRetry`)}
                  </button>
                </div>
              `:F}
        ${n.status===`results`&&n.archivedTranscriptsExcluded>0?L`<div class="sessions-transcript-search__notice">
                ${h(`sessionsView.transcriptSearchArchivedExcluded`,{count:String(n.archivedTranscriptsExcluded)})}
              </div>`:F}
        ${n.status===`results`&&r.length===0&&!n.indexing?L`
                <div class="sessions-transcript-search__empty" role="status">
                  ${h(`sessionsView.transcriptSearchEmpty`)}
                </div>
              `:F}
        ${r.length>0?L`
                <div class="sessions-transcript-search__results">
                  <div class="sessions-transcript-search__summary">
                    <strong
                      >${h(`sessionsView.transcriptSearchMatches`,{count:String(r.length)})}</strong
                    >
                    ${n.status===`results`&&n.truncated?L`<span class="muted"
                            >${h(`sessionsView.transcriptSearchTruncated`)}</span
                          >`:F}
                  </div>
                  <div class="sessions-transcript-search__list">
                    ${r.map(t=>{let n=t.timestamp>0?j(t.timestamp):h(`common.na`),r=t.timestamp>0?de(t.timestamp):n;return L`
                        <button
                          class="sessions-transcript-search__result"
                          type="button"
                          @click=${()=>e.onNavigateToChat?.(t.sessionKey)}
                        >
                          <span class="sessions-transcript-search__result-header">
                            <strong>${Sn(t,i)}</strong>
                            <span class="muted" title=${r}>
                              ${h(`sessionsView.${t.role}`)} · ${n}
                            </span>
                          </span>
                          <span class="sessions-transcript-search__snippet">${t.snippet}</span>
                          <span class="sessions-transcript-search__key">${t.sessionKey}</span>
                        </button>
                      `})}
                  </div>
                </div>
              `:F}
      </div>
    </section>
  `}function wn(e){return Array.from({length:er},(t,n)=>L`
      <tr class="session-skeleton-row" aria-hidden="true">
        ${Array.from({length:e},(e,t)=>t===0?L`<td class="data-table-checkbox-col"></td>`:L`<td>
                <span
                  class="session-skeleton ${t===1?`session-skeleton--key`:``}"
                  style=${`animation-delay: ${n*120}ms`}
                ></span>
              </td>`)}
      </tr>
    `)}function Tn(e,t,n){let r=t*n;return e.slice(r,r+n)}function En(e){return n(e.searchQuery).length>0||s(e.activeMinutes)!==void 0||!e.includeGlobal}function Dn(e){let t=tr[e];return t?h(t):e}function On(e){return h(e===1?`sessionsView.checkpoint`:`sessionsView.checkpoints`,{count:String(e)})}function kn(e){return typeof e.tokensBefore==`number`&&typeof e.tokensAfter==`number`&&Number.isFinite(e.tokensBefore)&&Number.isFinite(e.tokensAfter)?h(`sessionsView.tokenRange`,{before:e.tokensBefore.toLocaleString(),after:e.tokensAfter.toLocaleString()}):typeof e.tokensBefore==`number`&&Number.isFinite(e.tokensBefore)?h(`sessionsView.tokensBefore`,{count:e.tokensBefore.toLocaleString()}):h(`sessionsView.tokenDeltaUnavailable`)}function An(e){return typeof e!=`number`||!Number.isFinite(e)||e<0?null:Be(e)??`0ms`}function jn(e){if(!e)return F;let t=e.status===`active`?`accent`:e.status===`complete`?`ok`:e.status===`blocked`||e.status===`budget_limited`||e.status===`usage_limited`?`warn`:`muted`,n=Nt(e);return L`
    <openclaw-tooltip .content=${n}>
      <span tabindex="0" aria-label=${n}>
        ${V({kind:t,label:Pt(e)})}
      </span>
    </openclaw-tooltip>
  `}function Mn(e){let{row:n,updated:r,checkpointCount:i}=e,a=[{label:h(`sessionsView.key`),value:n.key},{label:h(`sessionsView.kind`),value:A(n)},{label:h(`sessionsView.updated`),value:r},{label:h(`sessionsView.tokens`),value:qt(n)},{label:h(`sessionsView.compaction`),value:On(i)}],o=(e,n)=>{let r=t(n);r&&a.push({label:e,value:r})};o(h(`sessionsView.group`),n.category),o(h(`sessionsView.status`),n.status),n.goal&&a.push({label:h(`sessionsView.goal`),value:Nt(n.goal)}),o(h(`sessionsView.goalNote`),n.goal?.lastStatusNote),o(h(`sessionsView.model`),n.model),o(h(`sessionsView.provider`),n.modelProvider),o(h(`sessionsView.runtime`),u(n.agentRuntime)),o(h(`sessionsView.runDuration`),An(n.runtimeMs)),o(h(`sessionsView.surface`),n.surface),o(h(`sessionsView.subject`),n.subject),o(h(`sessionsView.room`),n.room),o(h(`sessionsView.space`),n.space),o(h(`sessionsView.sessionId`),n.sessionId),n.archiveReason&&a.push({label:h(`sessionsView.archiveReason`),value:Xe(n.archiveReason)});for(let[e,t]of[[h(`sessionsView.activeRun`),n.hasActiveRun],[h(`sessionsView.archived`),n.archived],[h(`sessionsView.pinned`),n.pinned]])typeof t==`boolean`&&a.push({label:e,value:h(t?`common.yes`:`common.no`)});return a}function J(e){return e.groupBy===`category`?8:7}function Nn(e){return h(Q[e]??Q.none)}function Pn(e,n){let{id:r}=e;if(n.groupBy===`date`)return h({today:`sessionsView.dateToday`,yesterday:`sessionsView.dateYesterday`,week:`sessionsView.dateThisWeek`,older:`sessionsView.dateOlder`}[r]??`sessionsView.dateNoActivity`);if(r===``)return h(`sessionsView.ungrouped`);if(n.groupBy===`agent`){let e=hn(n.agentIdentityById,r),i=t(e?.name);if(i){let n=t(e?.emoji);return n?`${n} ${i}`:i}}if(n.groupBy===`person`){let t=e.rows[0]?.owner?.actor;return t?.identity?.type===`profile`?at({id:t.identity.id,name:t.label?.trim()||r}):t?.label?.trim()||r}return r}function Y(e,t){e.currentTarget?.classList.toggle(`session-drop-target--active`,t)}function Fn(e,t){if(e.groupBy!==`category`||e.groupWriteDisabledReason)return{dragover:F,dragleave:F,drop:F};let n=e=>e.dataTransfer?.types.includes(B)===!0;return{dragover:e=>{n(e)&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`move`),Y(e,!0))},dragleave:e=>Y(e,!1),drop:r=>{if(!n(r))return;r.preventDefault(),Y(r,!1);let i=r.dataTransfer?.getData(B);i&&e.onAssignCategory(i,t)}}}function In(e,t){let n=Pn(e,t),r=e.rows.length===1?h(`sessionsView.groupRowCountOne`,{count:`1`}):h(`sessionsView.groupRowCount`,{count:String(e.rows.length)}),i=Fn(t,e.id===``?null:e.id);return L`
    <tr
      class="session-group-row"
      @dragover=${i.dragover}
      @dragleave=${i.dragleave}
      @drop=${i.drop}
    >
      <td colspan=${J(t)}>
        <div class="session-group-row__header">
          <span class="session-group-row__icon" aria-hidden="true">${R.folder}</span>
          <span class="session-group-row__label">${n}</span>
          <span class="session-group-row__count">${r}</span>
        </div>
      </td>
    </tr>
  `}function Ln(e,n){let r=t(e.category)??``,i=[...n.knownCategories];return r&&!i.includes(r)&&i.push(r),L`
    <td>
      <select
        ?disabled=${n.loading||!!n.groupWriteDisabledReason}
        title=${n.groupWriteDisabledReason??F}
        aria-label=${h(`sessionsView.moveToGroup`)}
        class="session-group-select"
        @change=${t=>{if(n.groupWriteDisabledReason)return;let i=t.target;if(i.value===Z){i.value=r,n.onRequestNewCategory(e.key);return}n.onAssignCategory(e.key,i.value||null)}}
      >
        <option value="" ?selected=${!r}>${h(`sessionsView.ungrouped`)}</option>
        ${i.map(e=>L`<option value=${e} ?selected=${r===e}>${e}</option>`)}
        <option value=${Z}>${h(`sessionsView.newGroup`)}</option>
      </select>
    </td>
  `}function Rn(e){return e instanceof Element&&!!e.closest(`a, button, input, label, select, textarea`)}function zn(e){let t=[`session-filter-check`,`session-filter-toggle`,e.extraClass??``,e.checked?`session-filter-check--active`:``].filter(Boolean).join(` `);return L`
    <openclaw-tooltip .content=${e.title}>
      <label class=${t}>
        <input
          name=${e.name}
          class="session-filter-check__input"
          type="checkbox"
          .checked=${e.checked}
          @change=${t=>e.onChange(t.target.checked)}
        />
        <span class="session-filter-check__mark" aria-hidden="true">${R.check}</span>
        <span class="session-filter-check__label">${e.label}</span>
      </label>
    </openclaw-tooltip>
  `}function X(e){return L`
    <label class="session-override-field">
      <span class="session-override-field__label">${e.label}</span>
      <select
        class="settings-select"
        ?disabled=${e.disabled}
        title=${e.disabledReason??F}
        @change=${t=>e.onChange(t.target.value)}
      >
        ${e.options.map(t=>L`<option value=${t.value} ?selected=${e.current===t.value}>
              ${t.label}
            </option>`)}
      </select>
    </label>
  `}function Bn(e){let t=e.result?.sessions??[],n=e.sortDir===`asc`?1:-1,r=t.toSorted((t,r)=>{let i=(r.pinnedAt??0)-(t.pinnedAt??0);return i===0?(e.sortColumn===`kind`?A(t).localeCompare(A(r)):e.sortColumn===`key`?t.key.localeCompare(r.key):e.sortColumn===`updated`?(t.updatedAt??0)-(r.updatedAt??0):(t.totalTokens??t.inputTokens??t.outputTokens??0)-(r.totalTokens??r.inputTokens??r.outputTokens??0))*n:i}),i=r.length,a=Math.max(1,Math.ceil(i/e.pageSize)),o=Math.min(e.page,a-1),s=e.groupBy===`none`?null:Qe({rows:r,mode:e.groupBy,knownCategories:e.knownCategories}),c=Tn(s?s.flatMap(e=>e.rows):r,o,e.pageSize),u=t.length===0&&En(e),d=t.filter(e=>l(e)).length,f=t.filter(e=>e.archived===!0).length,p=e.statusFilter===`archived`?h(`sessionsView.noArchivedSessions`):e.statusFilter===`active`?h(`sessionsView.noActiveSessions`):h(`sessionsView.noSessions`),m=(t,n,r=``)=>{let i=e.sortColumn===t,a=i&&e.sortDir===`asc`?`desc`:`asc`;return L`
      <th
        class=${r}
        data-sortable
        data-sort-dir=${i?e.sortDir:``}
        aria-sort=${i?e.sortDir===`asc`?`ascending`:`descending`:F}
        @click=${()=>e.onSortChange(t,i?a:`desc`)}
      >
        <button class="data-table-sort-button" type="button">
          ${n}
          <span class="data-table-sort-icon" aria-hidden="true">${R.arrowUpDown}</span>
        </button>
      </th>
    `},g=L`
    ${h(`sessionsView.title`)}
    ${e.result?L`
            <openclaw-tooltip .content=${h(`sessionsView.store`,{path:e.result.path})}>
              <span class="settings-count">${t.length}</span>
            </openclaw-tooltip>
          `:F}
    ${e.result?xn(t,d,e.statusFilter):F}
  `,_=L`
    ${e.statusFilter===`archived`?L`
            <button
              class="btn danger"
              ?disabled=${e.loading||f===0||!!e.deleteArchivedDisabledReason}
              title=${e.deleteArchivedDisabledReason??F}
              @click=${e.onDeleteAllArchived}
            >
              ${R.trash} ${h(`sessionsView.deleteAllArchived`)}
            </button>
          `:F}
    <button class="btn" ?disabled=${e.refreshing} @click=${e.onRefresh}>
      ${e.refreshing?h(`common.loading`):h(`common.refresh`)}
    </button>
  `,v=[e.error?L`<div class="sessions-error" role="alert">${e.error}</div>`:F,H({title:h(`sessionsView.transcriptSearchTitle`)},Cn(e)),H({title:g,actions:_},Un(e,{paginated:c,groups:s,emptyBecauseFiltered:u,emptyMessage:p,totalRows:i,totalPages:a,page:o,sortHeader:m}))];return xt(v,{wide:!0})}function Vn(e,t){e.currentTarget instanceof Element&&e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,String(t))}function Hn(e){let t=[[`activeMinutes`,`minutes`,h(`sessionsView.active`),h(`sessionsView.activeTooltip`,{count:e.activeMinutes.trim()}),h(`sessionsView.minutesPlaceholder`),e.statusFilter!==`active`],[`limit`,`limit`,h(`sessionsView.limit`),h(`sessionsView.limitTooltip`),F,!1]],n=[[`includeGlobal`,h(`sessionsView.global`),h(`sessionsView.globalTooltip`)],[`includeUnknown`,h(`sessionsView.unknown`),h(`sessionsView.unknownTooltip`)]],{activeMinutes:r,limit:i,includeGlobal:a,includeUnknown:o}=e,s=(t,n)=>e.onFiltersChange({activeMinutes:r,limit:i,includeGlobal:a,includeUnknown:o,[t]:n}),c=r.trim()!==``||i.trim()!==`50`||!a||o||e.groupBy!==`none`;return L`
    <button
      id="sessions-filter-popover-trigger"
      type="button"
      class="btn btn--sm sessions-filter-popover__trigger ${c?`active`:``}"
      title=${h(`sessionsView.filters`)}
      aria-label=${h(`sessionsView.filters`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${R.listFilter}
    </button>
    <wa-popover
      class="sessions-filter-popover"
      for="sessions-filter-popover-trigger"
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>Vn(e,!0)}
      @wa-hide=${e=>Vn(e,!1)}
    >
      <div class="sessions-filter-popover__panel">
        <div class="sessions-filter-popover__fields">
          ${t.map(([t,n,r,i,a,o])=>L`
              <openclaw-tooltip .content=${i}>
                <label class="session-filter-field">
                  <span class="session-filter-label">${r}</span>
                  <input
                    class="session-filter-input session-filter-input--${n}"
                    placeholder=${a}
                    .value=${e[t]}
                    ?disabled=${o}
                    @input=${e=>s(t,e.target.value)}
                  />
                </label>
              </openclaw-tooltip>
            `)}
        </div>
        <div
          class="session-filter-toggle-group"
          role="group"
          aria-label=${h(`sessionsView.sourceFilters`)}
        >
          ${n.map(([t,n,r])=>zn({name:t,checked:e[t],label:n,title:r,onChange:e=>s(t,e)}))}
        </div>
        <label class="session-groupby">
          <span class="session-groupby__label">${h(`sessionsView.groupBy`)}</span>
          <select
            class="session-groupby__select"
            @change=${t=>e.onGroupByChange(t.target.value)}
          >
            ${Ze.filter(t=>t!==`person`||e.personGroupingAvailable).map(t=>L`
                <option value=${t} ?selected=${e.groupBy===t}>
                  ${Nn(t)}
                </option>
              `)}
          </select>
        </label>
        ${e.groupBy===`category`?L`
                <button
                  class="btn btn--sm"
                  ?disabled=${!!e.groupWriteDisabledReason}
                  title=${e.groupWriteDisabledReason??F}
                  @click=${()=>e.onRequestNewCategory()}
                >
                  ${R.plus} ${h(`sessionsView.newGroup`)}
                </button>
              `:F}
      </div>
    </wa-popover>
  `}function Un(e,t){let{paginated:n,groups:r,emptyBecauseFiltered:i,emptyMessage:a,totalRows:o,totalPages:s,page:c}=t,l=t.sortHeader,u=i?h(`sessionsView.noSessionsMatchFilters`):a,d=r?new Set(n.map(e=>e.key)):null;return L`
    <div
      class="sessions-toolbar sessions-filter-bar"
      aria-label=${h(`sessionsView.filterControls`)}
    >
      <div class="data-table-search sessions-toolbar__search">
        ${R.search}
        <input
          type="text"
          placeholder=${h(`sessionsView.searchPlaceholder`)}
          .value=${e.searchQuery}
          @input=${t=>e.onSearchChange(t.target.value)}
        />
      </div>
      ${Ct({value:e.statusFilter,ariaLabel:h(`sessionsView.sessionState`),className:`sessions-view-segment`,options:[{value:`active`,label:h(`common.active`)},{value:`archived`,label:h(`sessionsView.archived`),title:h(`sessionsView.archivedOnlyTooltip`)},{value:`all`,label:h(`sessionsView.all`)}],onChange:t=>e.onStatusFilterChange(t)})}
      ${Hn(e)}
    </div>

    ${e.selectedKeys.size>0?L`
            <div class="data-table-bulk-bar">
              <span>${h(`sessionsView.selected`,{count:String(e.selectedKeys.size)})}</span>
              <button class="btn btn--sm" @click=${e.onDeselectAll}>
                ${h(`common.unselect`)}
              </button>
              <button
                class="btn btn--sm danger"
                ?disabled=${e.loading||!!e.deleteSelectedDisabledReason}
                title=${e.deleteSelectedDisabledReason??F}
                @click=${e.onDeleteSelected}
              >
                ${R.trash} ${h(`sessionsView.deleteSelected`)}
              </button>
            </div>
          `:F}

    <div class="data-table-container">
      <table class="data-table sessions-table">
        <thead>
          <tr>
            <th class="data-table-checkbox-col">
              ${n.length>0?L`<input
                      type="checkbox"
                      .checked=${n.length>0&&n.every(t=>e.selectedKeys.has(t.key))}
                      .indeterminate=${n.some(t=>e.selectedKeys.has(t.key))&&!n.every(t=>e.selectedKeys.has(t.key))}
                      @change=${()=>{n.every(t=>e.selectedKeys.has(t.key))?e.onDeselectPage(n.map(e=>e.key)):e.onSelectPage(n.map(e=>e.key))}}
                      aria-label=${h(`sessionsView.selectAllOnPage`)}
                    />`:F}
            </th>
            ${l(`key`,h(`sessionsView.key`),`data-table-key-col`)}
            ${e.groupBy===`category`?L`<th>${h(`sessionsView.group`)}</th>`:F}
            ${l(`kind`,h(`sessionsView.kind`))}
            <th class="session-status-col">${h(`sessionsView.status`)}</th>
            ${l(`updated`,h(`sessionsView.updated`))}
            ${l(`tokens`,h(`sessionsView.tokens`))}
            <th class="session-actions-col">
              <span class="sr-only">${h(`sessionsView.actions`)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${e.loading&&!e.result?wn(J(e)):n.length===0&&(e.loading||e.error||!e.result)?F:n.length===0?L`
                      <tr>
                        <td
                          colspan=${J(e)}
                          class="data-table-empty-cell"
                        >
                          <div class="data-table-empty-state" role="status" aria-live="polite">
                            <div class="data-table-empty-state__message">
                              ${i?R.search:R.messageSquare}
                              <span>${u}</span>
                            </div>
                            ${i?L`
                                    <button class="btn btn--sm" @click=${e.onClearFilters}>
                                      ${h(`sessionsView.showAll`)}
                                    </button>
                                  `:F}
                          </div>
                        </td>
                      </tr>
                    `:r?r.flatMap(t=>{let n=t.rows.filter(e=>d?.has(e.key));if(n.length===0&&t.rows.length>0)return[];let r=n.flatMap(t=>Wn(t,e));return r.unshift(In(t,e)),r}):n.flatMap(t=>Wn(t,e))}
        </tbody>
      </table>
    </div>

    ${o>0?L`
            <div class="data-table-pagination">
              <div class="data-table-pagination__info">
                ${h(`sessionsView.pagination`,{start:String(c*e.pageSize+1),end:String(Math.min((c+1)*e.pageSize,o)),total:String(o)})}
              </div>
              <div class="data-table-pagination__controls">
                <select
                  class="data-table-pagination__size"
                  aria-label=${h(`sessionsView.pageSize`)}
                  .value=${String(e.pageSize)}
                  @change=${t=>e.onPageSizeChange(Number(t.target.value))}
                >
                  ${Yn.map(t=>L`<option value=${t} ?selected=${t===e.pageSize}>
                        ${h(`sessionsView.rowsPerPage`,{count:String(t)})}
                      </option>`)}
                </select>
                ${e.result?.hasMore&&e.result.nextOffset!=null?L` <button ?disabled=${e.loading} @click=${e.onLoadMore}>
                        ${h(`chat.selectors.loadMoreRosterSessions`)}
                      </button>`:F}
                <button ?disabled=${c<=0} @click=${()=>e.onPageChange(c-1)}>
                  ${h(`common.previous`)}
                </button>
                <button
                  ?disabled=${c>=s-1}
                  @click=${()=>e.onPageChange(c+1)}
                >
                  ${h(`common.next`)}
                </button>
              </div>
            </div>
          `:F}
  `}function Wn(e,n){let r=e.updatedAt?j(e.updatedAt):h(`common.na`),i=e.latestCompactionCheckpoint,a=e.compactionCheckpointCount??0,o=Math.max(a,+!!i),s=a>0||!!i,c=n.expandedSessionKey===e.key,l=`session-details-${encodeURIComponent(e.key)}`,u=t(e.displayName)??null,d=t(e.label)??``,f=!!(u&&u!==e.key&&u!==d),m=ie(e.key),g=m?hn(n.agentIdentityById,m.agentId):null,_=t(g?.emoji)??``,v=t(g?.name)??``,y=v&&m?`${_?`${_} `:``}${v} (${m.channel})`:null,x=y??e.key,S=e.kind!==`global`,C=S?p({face:oe(e),sessionKey:e.key,fallbackAgentId:n.agentId,basePath:n.basePath,row:e,mainKey:n.mainKey,preferenceDerivedFace:!0}).href:null,w=A(e),T=`session-kind session-kind--${w}`,ee=[`session-data-row`,`session-data-row--expandable`,n.statusFilter===`all`&&e.archived===!0?`session-data-row--archived`:``,c?`session-data-row--expanded`:``,n.sessionMenu?.key===e.key?`session-data-row--menu-open`:``].filter(Boolean).join(` `),te=h(c?`sessionsView.hideSessionDetails`:`sessionsView.showSessionDetails`,{count:x}),E=n.groupBy===`category`,D=Fn(n,t(e.category)??null),O=t=>ce(t,t instanceof KeyboardEvent?t.currentTarget.querySelector(`button[aria-haspopup="menu"]`):null,(t,r,i)=>n.onOpenSessionMenu(e,{x:r,y:i},t));return[L`<tr
      class=${ee}
      tabindex="0"
      aria-expanded=${String(c)}
      aria-controls=${l}
      draggable=${E?`true`:F}
      aria-description=${E?h(`sessionsView.dragSessionHint`):F}
      @dragstart=${E?t=>{t.dataTransfer?.setData(B,e.key),t.dataTransfer&&(t.dataTransfer.effectAllowed=`move`)}:F}
      @dragover=${D.dragover}
      @dragleave=${D.dragleave}
      @drop=${D.drop}
      @contextmenu=${O}
      @click=${t=>{Rn(t.target)||n.onToggleDetails(e.key)}}
      @keydown=${t=>{O(t),!t.defaultPrevented&&(Rn(t.target)||(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),n.onToggleDetails(e.key)))}}
    >
      <td class="data-table-checkbox-col">
        <input
          type="checkbox"
          .checked=${n.selectedKeys.has(e.key)}
          @change=${()=>n.onToggleSelect(e.key)}
          aria-label=${`${h(`sessionsView.selectSession`)}: ${e.key}`}
        />
      </td>
      <td class="data-table-key-col">
        <openclaw-tooltip .content=${x}>
          <div class=${y?`session-key-cell`:`mono session-key-cell`}>
            ${yn(e)}
            <div class="session-key-cell__text">
              <span class="session-key-cell__primary">
                ${e.unread===!0?L`<span
                        class="session-unread-dot"
                        role="img"
                        aria-label=${h(`sessionsView.unread`)}
                      ></span>`:F}
                ${S?L`<a
                        href=${C}
                        class="session-link"
                        @click=${t=>{b(t)&&n.onNavigateToChat&&(t.preventDefault(),n.onNavigateToChat(e.key))}}
                        >${y??e.key}</a
                      >`:L`<span>${y??e.key}</span>`}
                ${d?L`<span class="session-label-chip" title=${d}
                        >${d}</span
                      >`:F}
              </span>
              ${e.kind===`global`&&!e.agentId?F:Gt(k(e.key)?.agentId??e.agentId)}
              ${f?L`<span class="muted session-key-display-name">${u}</span>`:F}
            </div>
          </div>
        </openclaw-tooltip>
      </td>
      ${E?Ln(e,n):F}
      <td>
        <span class=${T}>${w}</span>
      </td>
      <td class="session-status-col">
        <div class="session-status-stack">
          ${vn(e)} ${jn(e.goal)}
          ${n.statusFilter===`all`&&e.archived===!0?V({kind:`muted`,label:h(`sessionsView.archived`)}):F}
        </div>
      </td>
      <td>${r}</td>
      <td class="session-token-cell">${bn(e)}</td>
      <td class="session-actions-cell">
        <div class="session-actions">
          <button
            class="session-details-toggle"
            type="button"
            aria-expanded=${String(c)}
            aria-controls=${l}
            aria-label=${te}
            @click=${t=>{t.stopPropagation(),n.onToggleDetails(e.key)}}
          >
            ${o>0?L`<span class="settings-count session-compaction-count"
                    >${o}</span
                  >`:F}
            ${R.chevronDown}
          </button>
          <button
            class="icon-btn"
            type="button"
            title=${h(`chat.sidebar.openSessionMenu`)}
            aria-label=${h(`chat.sidebar.openSessionMenu`)}
            aria-haspopup="menu"
            aria-expanded=${String(n.sessionMenu?.key===e.key)}
            @click=${t=>{t.stopPropagation();let r=t.currentTarget,i=r.getBoundingClientRect();n.onOpenSessionMenu(e,{x:i.right,y:i.bottom+4},r)}}
          >
            ${R.moreHorizontal}
          </button>
        </div>
      </td>
    </tr>`,...c?[Gn({row:e,props:n,detailsId:l,friendlyKeyLabel:y,displayName:u,showDisplayName:f,kindClass:T,updated:r,visibleCheckpointCount:o,hasCheckpoints:s})]:[]]}function Gn(e){let{row:n,props:r,detailsId:i,friendlyKeyLabel:a,displayName:o,showDisplayName:s,kindClass:c,updated:l,visibleCheckpointCount:u,hasCheckpoints:d}=e,f=n.thinkingLevel??``,p=f?ut(f):``,m=K(gn(n,r.result?.defaults),p),g=n.fastMode===`auto`?`auto`:n.fastMode===!0?`on`:n.fastMode===!1?`off`:``,_=K(q(qn),g),v=n.verboseLevel??``,y=K(q(Kn,!0),v),b=n.reasoningLevel??``,x=K(q(Jn),b),S=r.checkpointItemsByKey[n.key]??[],C=r.checkpointErrorByKey[n.key],w=On(u),T=Mn({row:n,updated:l,checkpointCount:u});return L`<tr id=${i} class="session-details-row">
    <td colspan=${J(r)}>
      <div class="session-details-panel">
        <div class="session-details-panel__hero">
          <div>
            <div class="session-details-panel__eyebrow">${h(`sessionsView.sessionDetails`)}</div>
            <div class="session-details-panel__title">${a??n.key}</div>
            ${s?L`<div class="muted session-details-panel__subtitle">${o}</div>`:F}
          </div>
          <div class="session-details-panel__badges">
            ${vn(n)} ${jn(n.goal)}
            <span class=${c}>${A(n)}</span>
          </div>
        </div>

        <div class="session-details-section">
          <div class="session-details-panel__eyebrow">${h(`sessionsView.overrides`)}</div>
          <div class="session-overrides-grid">
            <label class="session-override-field">
              <span class="session-override-field__label">${h(`sessionsView.label`)}</span>
              <input
                class="settings-input"
                .value=${n.label??``}
                ?disabled=${r.loading||!!r.patchWriteDisabledReason}
                title=${r.patchWriteDisabledReason??F}
                placeholder=${h(`sessionsView.optionalPlaceholder`)}
                @change=${e=>{let i=t(e.target.value)??null;r.onPatch(n.key,{label:i})}}
              />
            </label>
            ${X({label:h(`sessionsView.thinking`),disabled:r.loading||!!r.patchAdminDisabledReason,disabledReason:r.patchAdminDisabledReason,options:m,current:p,onChange:e=>r.onPatch(n.key,{thinkingLevel:e||null})})}
            ${X({label:h(`sessionsView.fast`),disabled:r.loading||!!r.patchAdminDisabledReason,disabledReason:r.patchAdminDisabledReason,options:_,current:g,onChange:e=>r.onPatch(n.key,{fastMode:e===``?null:e===`auto`?`auto`:e===`on`})})}
            ${X({label:h(`sessionsView.verbose`),disabled:r.loading||!!r.patchAdminDisabledReason,disabledReason:r.patchAdminDisabledReason,options:y,current:v,onChange:e=>r.onPatch(n.key,{verboseLevel:e||null})})}
            ${X({label:h(`sessionsView.reasoning`),disabled:r.loading||!!r.patchAdminDisabledReason,disabledReason:r.patchAdminDisabledReason,options:x,current:b,onChange:e=>r.onPatch(n.key,{reasoningLevel:e||null})})}
          </div>
        </div>

        <div class="session-details-grid">
          ${T.map(e=>L`
              <div class="session-detail-stat">
                <div class="session-detail-stat__label">${e.label}</div>
                <openclaw-tooltip .content=${e.value}>
                  <div class="session-detail-stat__value">${e.value}</div>
                </openclaw-tooltip>
              </div>
            `)}
        </div>

        <div class="session-details-section">
          <div class="session-details-section__header">
            <div>
              <div class="session-details-panel__eyebrow">
                ${h(`sessionsView.compactionHistory`)}
              </div>
              <div class="session-details-section__title">${w}</div>
            </div>
          </div>
          ${r.checkpointLoadingKey===n.key?L`<div class="muted session-details-empty">
                  ${h(`sessionsView.loadingCheckpoints`)}
                </div>`:C?L`<div class="callout danger" role="alert">${C}</div>`:!d||S.length===0?L`<div class="muted session-details-empty">
                      ${h(`sessionsView.noCheckpoints`)}
                    </div>`:L`
                      <div class="session-checkpoint-list">
                        ${S.map(e=>L`
                            <div class="session-checkpoint-card">
                              <div class="session-checkpoint-card__header">
                                <strong>
                                  ${Dn(e.reason)} ·
                                  ${j(e.createdAt)}
                                </strong>
                                <span class="muted session-checkpoint-card__delta">
                                  ${kn(e)}
                                </span>
                              </div>
                              ${e.summary?L`<div class="session-checkpoint-card__summary">
                                      ${e.summary}
                                    </div>`:L`<div class="muted">${h(`sessionsView.noSummary`)}</div>`}
                              <div class="session-checkpoint-card__actions">
                                <button
                                  class="btn btn--sm"
                                  ?disabled=${r.checkpointBusyKey===e.checkpointId||!!r.checkpointBranchDisabledReason}
                                  title=${r.checkpointBranchDisabledReason??F}
                                  @click=${()=>r.onBranchFromCheckpoint(n.key,e.checkpointId)}
                                >
                                  ${h(`sessionsView.branchFromCheckpoint`)}
                                </button>
                                <button
                                  class="btn btn--sm"
                                  ?disabled=${r.checkpointBusyKey===e.checkpointId||!!r.checkpointRestoreDisabledReason}
                                  title=${r.checkpointRestoreDisabledReason??F}
                                  @click=${()=>r.onRestoreCheckpoint(n.key,e.checkpointId)}
                                >
                                  ${h(`sessionsView.restoreCheckpoint`)}
                                </button>
                              </div>
                            </div>
                          `)}
                      </div>
                    `}
        </div>
      </div>
    </td>
  </tr>`}var Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,tr,Z,Q;function nr(){return(nr=e((()=>{o(),Se(),Kt(),Qt(),Ee(),U(),Me(),Tt(),Rt(),O(),ue(),We(),Ge(),ve(),ye(),it(),Jt(),g(),et(),Ue(),C(),$e(),T(),ne(),Kn=[``,`off`,`on`,`full`],qn=[``,`auto`,`on`,`off`],Jn=[``,`off`,`on`,`stream`],Yn=[10,25,50,100],Xn={queued:`sessionsView.statusQueued`,running:`sessionsView.statusRunning`,done:`sessionsView.statusDone`,failed:`sessionsView.statusFailed`,killed:`sessionsView.statusKilled`,timeout:`sessionsView.statusTimeout`},Zn={cron:R.clock,direct:R.messageSquare,group:R.users,global:R.globe,unknown:R.circle},Qn=65,$n=85,er=4,tr={manual:`sessionsView.manual`,"auto-threshold":`sessionsView.autoThreshold`,"overflow-retry":`sessionsView.overflowRetry`,"timeout-retry":`sessionsView.timeoutRetry`},Z=`__new-group__`,Q={none:`sessionsView.groupByNone`,category:`sessionsView.groupByCategory`,person:`sessionsView.groupByPerson`,channel:`sessionsView.groupByChannel`,kind:`sessionsView.groupByKind`,agent:`sessionsView.groupByAgent`,date:`sessionsView.groupByDate`}})))()}var rr,ir,$;function ar(){return(ar=e((()=>{f(),ht(),o(),Se(),Ce(),Ae(),ke(),Te(),Xt(),Ht(),gt(),St(),vt(),bt(),Et(),kt(),en(),U(),Wt(),O(),v(),dt(),D(),Pe(),ge(),te(),rt(),Ye(),me(),Je(),C(),T(),ot(),Bt(),At(),He(),be(),re(),Lt(),rn(),on(),ln(),dn(),mn(),nr(),i(),rr=`https://docs.openclaw.ai/concepts/session`,ir=200,$=class extends E{constructor(...e){super(...e),this.result=null,this.loading=!1,this.refreshing=!1,this.error=null,this.activeMinutes=``,this.limit=`50`,this.includeGlobal=!0,this.includeUnknown=!1,this.statusFilter=`active`,this.searchQuery=``,this.transcriptSearchQuery=``,this.submittedTranscriptSearchQuery=``,this.sortColumn=`updated`,this.sortDir=`desc`,this.groupBy=fn(),this.page=0,this.pageSize=25,this.selectedKeys=new Set,this.sessionMenu=null,this.sessionMenuWork=null,this.expandedSessionKey=null,this.deepLinkSessionKey=null,this.checkpointItemsByKey={},this.checkpointTaskKey=null,this.checkpointBusyKey=null,this.checkpointErrorByKey={},this.pageEpoch=0,this.pluginActionLifetime=new AbortController,this.routeDataEnabled=!0,this.sessionMutationPending=!1,this.sessionMenuTrigger=null,this.sessionMenuWorkVersion=0,this.observeAgentScope=tt(()=>{this.retirePageOperations(),this.resetTranscriptSearchState(this.transcriptSearchQuery),this.deepLinkSessionKey||(this.page=0,this.selectedKeys=new Set,this.routeDataEnabled=!1,this.clearSearchTimer(),this.bindSessionList()),this.requestUpdate()}),this.subscriptions=new _(this).watch(()=>this.context?.agentIdentity,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).watch(()=>this.context?.plugins,(e,t)=>e.subscribe(t)),this.gatewayLifecycle=new ze(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{let e=this.listBinding?.sessions.listSnapshot(this.listBinding.query).result;this.resetProviderState(),this.appliedListResult=e},invalidateRequests:()=>this.invalidatePageWork()}),this.transcriptSearchTask=new ft(this,{args:()=>{let e=this.context,t=e?.gateway.snapshot;return[t?.phase===`connected`?t.client??null:null,this.submittedTranscriptSearchQuery,e??null,e?.agentSelection.state.scopeId??null,t?z(t,`sessions.search`)===!0:!1]},task:async([e,t,n,r,i],{signal:a})=>{if(!e||!t||!n||!i)return mt;let{sessions:o,results:s,indexing:c=!1,truncated:l=!1,archivedTranscriptsExcluded:u=0}=await zt({client:e,query:t,listSessions:n.sessions.list,listOptions:this.sessionListOptions(n,``),isCurrent:()=>!a.aborted,resolveAgentId:e=>k(e)?.agentId??this.sessionAgentId(e,n)});return{sessions:o,results:s,indexing:c,truncated:l,archivedTranscriptsExcluded:u}}}),this.checkpointTask=new ft(this,{autoRun:!1,args:()=>[null,``],task:async([e,t])=>!e||!t?mt:{sessionKey:t,checkpoints:await e.sessions.listCheckpoints(t,{agentId:this.sessionAgentId(t,e.context)})},onComplete:({sessionKey:e,checkpoints:t})=>{this.checkpointItemsByKey={...this.checkpointItemsByKey,[e]:t}},onError:e=>{let t=this.checkpointTaskKey;t&&(this.checkpointErrorByKey={...this.checkpointErrorByKey,[t]:M(e)})}}),this.dialogLifecycle=null}willUpdate(e){let t=this.context?.sessions;t&&this.listBinding&&this.listBinding.sessions!==t&&(this.unsubscribeList?.(),this.unsubscribeList=void 0,this.listBinding=void 0,this.invalidatePageWork(),this.resetProviderState()),(e.has(`routeData`)||e.has(`context`))&&this.applyRouteData(),this.bindSessionList()}disconnectedCallback(){this.unsubscribeList?.(),this.unsubscribeList=void 0,this.listBinding=void 0,this.subscriptions.clear(),this.invalidatePageWork(),this.dialogLifecycle?.abort(),super.disconnectedCallback()}retirePageOperations(){this.pluginActionLifetime.abort(),this.pluginActionLifetime=new AbortController,this.pageEpoch+=1,this.checkpointBusyKey=null,this.sessionMutationPending=!1,this.closeSessionMenu()}invalidatePageWork(){this.retirePageOperations(),this.clearSearchTimer(),this.listRequest=void 0,this.resetTranscriptSearchState(this.transcriptSearchQuery),this.resetCheckpointTask(),this.loading=!1,this.refreshing=!1}resetProviderState(){this.result=null,this.error=null,this.loading=!1,this.refreshing=!1,this.resetTranscriptSearchState(``),this.selectedKeys=new Set,this.expandedSessionKey=null,this.deepLinkSessionKey=null,this.checkpointItemsByKey={},this.checkpointTaskKey=null,this.checkpointBusyKey=null,this.checkpointErrorByKey={},this.appliedListResult=void 0}captureRequestScope(){let e=this.context;if(!this.isConnected||!e)return null;let t=e.gateway,n=this.gatewayLifecycle.gateway===t?this.gatewayLifecycle.client:null;return!this.gatewayLifecycle.connected||!n?null:{epoch:this.pageEpoch,context:e,gateway:t,sessions:e.sessions,client:n}}isRequestScopeCurrent(e){let t=this.context,n=t?.gateway;return this.isConnected&&this.pageEpoch===e.epoch&&t===e.context&&n===e.gateway&&t.sessions===e.sessions&&n.snapshot.phase===`connected`&&n.snapshot.client===e.client}mutationDisabledReason(e){let t=xe(this.context?.gateway.snapshot,e);return t.allowed?void 0:t.reason}requireMutationAccess(e,t){let n=xe(e.gateway.snapshot,t);return n.allowed?!0:(this.error=n.reason,!1)}selectedDeleteDisabledReason(){let e=new Map(this.result?.sessions.map(e=>[e.key,e])??[]);for(let t of this.selectedKeys){let n=e.get(t),r=this.mutationDisabledReason({method:`sessions.delete`,params:{key:t,...n?.archived===!0?{archivedOnly:!0}:{}}});if(r)return r}}applyRouteData(){let e=this.routeData,t=this.context;e&&t&&(e!==this.appliedRouteData&&(this.appliedRouteData=e,this.routeDataEnabled=!0),this.routeDataEnabled&&(this.statusFilter=e.statusFilter,e.expandedSessionKey?(this.activeMinutes=``,this.limit=`50`,this.includeGlobal=!0,this.includeUnknown=!0,this.searchQuery=``,this.page=0,this.selectedKeys=new Set):(this.activeMinutes=``,this.limit=`50`,this.includeGlobal=!0,this.includeUnknown=!1),this.expandedSessionKey=e.expandedSessionKey,this.deepLinkSessionKey=e.expandedSessionKey,e.expandedSessionKey&&this.loadCheckpoint(e.expandedSessionKey)))}sessionAgentId(e,t=this.context){if(!t)return;let{agentId:n}=S({assistantAgentId:t.agentSelection.state.selectedId,hello:t.gateway.snapshot.hello},e);return n}sessionPathAgentId(e,t){return this.sessionAgentId(e,t)??ae(t)}sessionListOptions(e,t=this.searchQuery){return un(e,{activeMinutes:s(this.activeMinutes),limit:s(this.limit)??50,includeGlobal:this.includeGlobal,includeUnknown:this.includeUnknown,statusFilter:this.statusFilter,deepLinkSessionKey:this.deepLinkSessionKey,search:t})}bindSessionList(e=!0){let t=this.context;if(!t||!this.isConnected)return;let n=t.sessions,r=this.sessionListOptions(t),i=JSON.stringify(r),a=this.listBinding,o=JSON.stringify(this.sessionListOptions(t,``));(a?.sessions!==n||a.key!==i)&&(a?.sessions===n&&n.listSnapshot(a.query).loading&&this.loadSessionList(a),this.unsubscribeList?.(),this.unsubscribeList=void 0,(a?.sessions!==n||a.transcriptKey!==o)&&this.resetTranscriptSearchState(this.transcriptSearchQuery),this.result=null,this.error=null,this.selectedKeys=new Set,this.page=0,this.listBinding={sessions:n,query:r,key:i,transcriptKey:o},this.appliedListResult=void 0);let s=this.listBinding;if(this.unsubscribeList||(this.loading=t.gateway.snapshot.phase===`connected`,!this.captureRequestScope()||this.searchTimer!==void 0||this.listRequest))return s;let c=e=>{this.applyListSnapshot(s,e)};this.unsubscribeList=n.subscribeList(r,c);let l=n.listSnapshot(r);return c(l),e&&(!l.result||l.loading)&&this.loadSessionList(s),s}applyListSnapshot(e,t){if(this.listBinding!==e||this.context?.sessions!==e.sessions)return;this.loading=t.loading,this.error=t.error;let n=t.result;if(!n||n===this.appliedListResult)return;let r=this.result;this.appliedListResult=n,this.result=y(n,{archivedFilter:this.statusFilter}),this.ensureAgentIdentities(this.result);let i=this.reconcileCheckpointCache(r,this.result);i&&this.loadCheckpoint(i)}async refreshSessionList(e=this.captureRequestScope()){if(!e)return;this.routeDataEnabled=!1,this.clearSearchTimer();let t=this.bindSessionList(!1);t&&t.sessions===e.sessions&&this.isRequestScopeCurrent(e)&&(await this.loadSessionList(t,{force:!0}),this.isRequestScopeCurrent(e)&&this.listBinding===t&&this.applyListSnapshot(t,t.sessions.listSnapshot(t.query)))}loadSessionList(e,t={}){if(this.listRequest)return t.force&&this.unsubscribeList&&e.sessions.refreshList({...e.query,...t}),this.listRequest;if(!this.captureRequestScope())return Promise.resolve();let n,r=new Promise(e=>{n=e}).finally(()=>{this.listRequest===r&&(this.listRequest=void 0,this.refreshing=!1,this.bindSessionList())});return this.listRequest=r,this.refreshing=!0,n(e.sessions.refreshList({...e.query,...t})),r}clearSearchTimer(){clearTimeout(this.searchTimer),this.searchTimer=void 0}adoptCurrentListSnapshot(){let e=this.listBinding;e&&this.applyListSnapshot(e,e.sessions.listSnapshot(e.query))}resetTranscriptSearchState(e){this.transcriptSearchQuery=e,this.submittedTranscriptSearchQuery=``,this.transcriptSearchTask.run()}updateTranscriptSearchQuery(e){e!==this.transcriptSearchQuery&&this.resetTranscriptSearchState(e)}async runTranscriptSearch(){let e=this.transcriptSearchQuery.trim();if(!e){this.resetTranscriptSearchState(``);return}let t=this.captureRequestScope();t&&z(t.gateway.snapshot,`sessions.search`)===!0&&(this.transcriptSearchQuery=e,this.submittedTranscriptSearchQuery=e,await this.transcriptSearchTask.run())}ensureAgentIdentities(e){let t=this.context;if(!t||!e)return;let n=tn(e).filter(e=>!t.agentIdentity.get(e));n.length!==0&&t.agentIdentity.ensure(n)}reconcileCheckpointCache(e,t){let n=new Map((t?.sessions??[]).map(e=>[e.key,e])),r=new Map((e?.sessions??[]).map(e=>[e.key,e])),i={...this.checkpointItemsByKey},a={...this.checkpointErrorByKey},o=null;for(let e of Object.keys(i)){let t=n.get(e),s=r.get(e);(!t||!s||s.compactionCheckpointCount!==t.compactionCheckpointCount||s.latestCompactionCheckpoint?.checkpointId!==t.latestCompactionCheckpoint?.checkpointId)&&(delete i[e],delete a[e],this.expandedSessionKey===e&&(o=e))}return this.checkpointItemsByKey=i,this.checkpointErrorByKey=a,o}updateFilters(e){this.activeMinutes=e.activeMinutes,this.limit=e.limit,this.includeGlobal=e.includeGlobal,this.includeUnknown=e.includeUnknown,this.page=0,this.selectedKeys=new Set,this.deepLinkSessionKey=null,this.refreshSessionList()}updateStatusFilter(e){let t=this.context;e!==this.statusFilter&&t&&(this.statusFilter=e,this.clearSearchTimer(),this.page=0,this.selectedKeys=new Set,this.deepLinkSessionKey=null,this.loading=!0,this.error=null,t.navigate(`sessions`,e===`active`?void 0:{search:`?status=${e}`}))}async deleteSelected(){let e=[...this.selectedKeys];if(e.length===0||this.loading||this.sessionMutationPending)return;let t=this.captureRequestScope();if(!t)return;let n=new Map(this.result?.sessions.map(e=>[e.key,e])??[]),r=e.map(e=>n.get(e)??{key:e}),i=h(e.length===1?`sessionsView.deleteSelectedConfirmOne`:`sessionsView.deleteSelectedConfirm`,{count:String(e.length)});await W({message:i,confirmLabel:h(`common.delete`),danger:!0,signal:this.pluginActionLifetime.signal})&&this.isRequestScopeCurrent(t)&&await this.deleteSessions(r)}async deleteSessions(e,t={}){if(e.length===0||this.loading||this.sessionMutationPending)return;let n=this.captureRequestScope();if(!n)return;let r=e.map(e=>({key:e.key,agentId:this.sessionAgentId(e.key,n.context),...t,...e.sessionId?{expectedSessionId:e.sessionId}:{},...e.archived===!0?{archivedOnly:!0}:{}}));for(let e of r)if(!this.requireMutationAccess(n,{method:`sessions.delete`,params:e}))return;this.sessionMutationPending=!0;let i=null;try{let t=async()=>{let t=await n.sessions.deleteMany(r);if(e.length===1&&t.errors.length>0)throw t.errors[0].error;return t},a=e[0],o=e.length===1?await jt({action:`delete`,session:{...a,label:a.label||a.displayName||a.key,agentId:r[0].agentId},scope:{...n,signal:this.pluginActionLifetime.signal},isCurrent:()=>this.isRequestScopeCurrent(n),request:t}):await t();if(!this.isRequestScopeCurrent(n)||!o)return;if(o.preservedWorktrees.length>0&&window.alert(Ot(o.preservedWorktrees)),o.deleted.length>0){let e=new Set(o.deleted),t=new Set(this.selectedKeys);for(let e of o.deleted)t.delete(e);this.selectedKeys=t,this.expandedSessionKey&&e.has(this.expandedSessionKey)&&(this.expandedSessionKey=null),this.deepLinkSessionKey&&e.has(this.deepLinkSessionKey)&&(this.deepLinkSessionKey=null);let r=o.deleted.find(e=>pe(e,n.gateway.snapshot.sessionKey));if(r){let e=k(r)?.agentId??n.context.agentSelection.state.selectedId??`main`;je({selection:n.context.agentSelection,gateway:n.gateway,agentId:e,sessionKey:d({agentId:e,mainKey:P({agentsList:n.context.agents.state.agentsList,hello:n.gateway.snapshot.hello})})})}}await this.refreshSessionList(n),o.errors.length>0&&(i=o.errors.map(({error:e})=>Mt(e)).join(`; `))}catch(e){this.isRequestScopeCurrent(n)&&(i=M(e))}finally{this.isRequestScopeCurrent(n)&&(this.sessionMutationPending=!1,this.adoptCurrentListSnapshot(),i&&(this.error=i))}}async deleteAllArchived(){let e=this.captureRequestScope(),t=this.pluginActionLifetime.signal;if(!e||this.loading||this.sessionMutationPending)return;let n;try{let{search:t,agentId:r,...i}=this.sessionListOptions(e.context),a=e.context.agentSelection.state.scopeId?.trim(),o={...i,...a?{agentId:a}:{}},s=await lt({list:t=>e.sessions.list({...o,limit:1e3,offset:t}),isCurrent:()=>this.isRequestScopeCurrent(e),missingResultError:e.sessions.state.error??`archived session enumeration returned no result`,stalledPaginationError:`archived session enumeration did not advance`,incompletePaginationError:`archived session enumeration was incomplete`});if(!s)return;n=s}catch(t){this.isRequestScopeCurrent(e)&&(this.error=M(t));return}let r=n.filter(e=>e.archived===!0);r.length!==0&&await W({message:h(`sessionsView.deleteAllArchivedConfirm`,{count:String(r.length)}),confirmLabel:h(`common.delete`),danger:!0,signal:t})&&this.isRequestScopeCurrent(e)&&await this.deleteSessions(r,{deleteTranscript:!0})}async deleteSessionFromMenu(e){let n=t(e.label)??e.key,r=this.captureRequestScope();r&&await W({message:h(`sessionsView.deleteSessionConfirm`,{session:n}),confirmLabel:h(`common.delete`),danger:!0,signal:this.pluginActionLifetime.signal})&&this.isRequestScopeCurrent(r)&&await this.deleteSessions([e])}async stopCloudWorker(e){let n=t(e.label)??e.key,r=_t(e.placement);if(!r||r.blocksActiveRun&&e.hasActiveRun===!0)return;let i=this.captureRequestScope();if(!i||!await W({message:h(`sessionsView.stopCloudWorkerConfirm`,{session:n}),confirmLabel:h(`sessionsView.stopCloudWorkerConfirmAction`),danger:!0,signal:this.pluginActionLifetime.signal})||!this.isRequestScopeCurrent(i)||!this.requireMutationAccess(i,r))return;this.sessionMutationPending=!0;let a=null;try{let t=k(e.key)?.agentId;await Vt(i.client,{key:e.key,...t?{agentId:t}:{}},i.context.placementStartup),this.isRequestScopeCurrent(i)&&await this.refreshSessionList(i)}catch(e){this.isRequestScopeCurrent(i)&&(a=M(e))}finally{this.isRequestScopeCurrent(i)&&(this.sessionMutationPending=!1,this.adoptCurrentListSnapshot(),a&&(this.error=a))}}knownCategories(){return sn(this.result,this.context?.sessions.state.groups??[])}setGroupBy(e){this.groupBy=e,this.page=0,pn(e)}async rememberCustomGroup(e,t=this.captureRequestScope()){return t?this.requireMutationAccess(t,{method:`sessions.groups.put`,requiredScope:`operator.write`})?cn({name:e,knownCategories:this.knownCategories(),sessions:t.sessions,isCurrent:()=>this.isRequestScopeCurrent(t),onError:e=>{this.error=e}}):`failed`:`stale`}assignCategory(e,t){let n=this.result?.sessions.find(t=>t.key===e);n&&(n.category?.trim()||null)!==t&&(t&&this.rememberCustomGroup(t),this.patchSession(e,{category:t}))}async withDialogLifecycle(e){let t=this.dialogLifecycle;if(t)return e(t.signal);let n=new AbortController;this.dialogLifecycle=n;try{return await e(n.signal)}finally{this.dialogLifecycle===n&&(this.dialogLifecycle=null)}}async loadInputDialog(){try{return(await c(async()=>{let{showInputDialog:e}=await import(`./input-dialog-Bm-7hRaz.js`);return{showInputDialog:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url)).showInputDialog}catch(e){return this.error=M(e),null}}async requestNewCategory(e){let t=this.result?.sessions.find(t=>t.key===e);if(e&&!t?.sessionId){this.error=h(`common.refresh`);return}await this.withDialogLifecycle(async e=>{await(await this.loadInputDialog())?.({signal:e,title:h(`sessionsView.newGroupTitle`),label:h(`sessionsView.newGroupPrompt`),submitLabel:h(`sessionsView.newGroupCreate`),requireValue:!0,submit:e=>this.writeNewCategory(e,t)})})}async writeNewCategory(e,t){this.error=null;let n=this.captureRequestScope();if(!n)return h(`sessionsView.newGroupFailed`);let r=await this.rememberCustomGroup(e,n);if(r!==`completed`)return r===`failed`?this.error??h(`sessionsView.newGroupFailed`):h(`sessionsView.newGroupStale`);if(!t)return null;let i=await this.patchSession(t.key,{category:e},n,t.sessionId);return i===`failed`?this.error??h(`sessionsView.newGroupFailed`):i===`stale`?h(`sessionsView.newGroupStale`):null}async renameSession(e){let t=this.captureRequestScope();if(!t){this.error=h(`sessionsView.actionRequiresConnection`);return}let n=Le(e),r=this.pluginActionLifetime.signal,i=await this.withDialogLifecycle(async e=>await(await this.loadInputDialog())?.({signal:AbortSignal.any([e,r]),title:h(`sessionsView.renameSessionPrompt`),defaultValue:n})??null);if(i===null||!this.isRequestScopeCurrent(t))return;let a=Re(i,n,e.label);a&&await this.patchSession(e.key,a,t,e.sessionId)}async patchSession(e,t,n=this.captureRequestScope(),r,i){if(!n)return this.error=h(`sessionsView.actionRequiresConnection`),`failed`;if(typeof t.archived==`boolean`&&!r?.trim())return this.error=`Session lifecycle action requires a durable session identity.`,`failed`;let a=this.sessionAgentId(e,n.context);if(!this.requireMutationAccess(n,{method:`sessions.patch`,params:{key:e,...t,...a?{agentId:a}:{}}}))return`failed`;try{let o=()=>n.sessions.patch(e,t,{agentId:a,...r?{expectedSessionId:r}:{}}),s=this.result?.sessions.find(t=>t.key===e),c=t.archived===!0?await jt({action:`archive`,session:{key:e,sessionId:r,label:s?.label||s?.displayName||e,agentId:a},scope:{...n,signal:this.pluginActionLifetime.signal},isCurrent:()=>this.isRequestScopeCurrent(n),request:o}):await o();if(c&&i?.(c),!this.isRequestScopeCurrent(n))return`stale`;if(!c)return this.error=n.sessions.state.error,`failed`;if(await this.refreshSessionList(n),!this.isRequestScopeCurrent(n))return`stale`;let l=new Set(this.selectedKeys);return l.delete(e),this.selectedKeys=l,`completed`}catch(e){return this.isRequestScopeCurrent(n)?(this.error=M(e),`failed`):`stale`}}async archiveSessionWithUndo(e){let t=this.captureRequestScope();if(!t)return;let n=an(t.sessions,e,this.sessionAgentId(e.key,t.context));if(!n)return;let r=t.sessions.beginArchive(e.key,e.sessionId);if(r)try{await this.patchSession(e.key,{archived:!0},t,e.sessionId,n)}finally{r()}}async forkSession(e,t=!1){let n=this.captureRequestScope();if(!n)return;let r=this.sessionAgentId(e,n.context),i={parentSessionKey:e,fork:!0,...t?{forkFrom:`last-completed`}:{},...r?{agentId:r}:{}};if(this.requireMutationAccess(n,{method:`sessions.create`,params:i}))try{let e=await n.sessions.create(i);if(!this.isRequestScopeCurrent(n))return;e?n.context.navigate(`chat`,{...p({context:n.context,face:`chat`,sessionKey:e,agentId:r??this.sessionPathAgentId(e,n.context)}).options,hash:``}):n.sessions.state.error&&(this.error=n.sessions.state.error)}catch(e){this.isRequestScopeCurrent(n)&&(this.error=M(e))}}async toggleSessionDetails(e){if(!this.context)return;let t=this.deepLinkSessionKey!==null;if(this.deepLinkSessionKey=null,t&&this.refreshSessionList(),this.expandedSessionKey===e){this.resetCheckpointTask(),this.expandedSessionKey=null;return}this.expandedSessionKey=e;let n=this.result?.sessions.find(t=>t.key===e);if(!((n?.compactionCheckpointCount??0)>0||n?.latestCompactionCheckpoint)){this.checkpointItemsByKey[e]||(this.checkpointItemsByKey={...this.checkpointItemsByKey,[e]:[]});return}this.checkpointItemsByKey[e]||await this.loadCheckpoint(e)}async loadCheckpoint(e){let t=this.captureRequestScope();if(!t){this.checkpointErrorByKey={...this.checkpointErrorByKey,[e]:h(`sessionsView.actionRequiresConnection`)};return}this.checkpointTaskKey=e,this.checkpointErrorByKey={...this.checkpointErrorByKey,[e]:``},await this.checkpointTask.run([t,e])}resetCheckpointTask(){this.checkpointTaskKey=null,this.checkpointTask.run([null,``])}get checkpointLoadingKey(){return this.checkpointTask.status===pt.PENDING?this.checkpointTaskKey:null}async branchCheckpoint(e,t){let n=this.captureRequestScope();if(n&&await W({message:h(`sessionsView.branchCheckpointConfirm`),confirmLabel:h(`common.create`),signal:this.pluginActionLifetime.signal})&&this.isRequestScopeCurrent(n)&&this.requireMutationAccess(n,{method:`sessions.compaction.branch`,requiredScope:`operator.write`})){this.checkpointBusyKey=t;try{let r=await n.sessions.branchCheckpoint(e,t,{agentId:this.sessionAgentId(e,n.context)});this.isRequestScopeCurrent(n)&&n.context.navigate(`chat`,{...p({context:n.context,face:`chat`,sessionKey:r.key,agentId:this.sessionPathAgentId(r.key,n.context)}).options,hash:``})}catch(e){this.isRequestScopeCurrent(n)&&(this.error=M(e))}finally{this.isRequestScopeCurrent(n)&&this.checkpointBusyKey===t&&(this.checkpointBusyKey=null)}}}async restoreCheckpoint(e,t){let n=this.captureRequestScope();if(n&&await W({message:h(`sessionsView.restoreCheckpointConfirm`),confirmLabel:h(`common.restore`),danger:!0,signal:this.pluginActionLifetime.signal})&&this.isRequestScopeCurrent(n)&&this.requireMutationAccess(n,{method:`sessions.compaction.restore`,requiredScope:`operator.admin`})){this.checkpointBusyKey=t;try{await n.sessions.restoreCheckpoint(e,t,{agentId:this.sessionAgentId(e,n.context)})}catch(e){this.isRequestScopeCurrent(n)&&(this.error=M(e))}finally{this.isRequestScopeCurrent(n)&&this.checkpointBusyKey===t&&(this.checkpointBusyKey=null)}}}openSessionMenu(e,t,n){if(this.sessionMenu?.key===e.key&&this.sessionMenu.sessionId===e.sessionId&&n){this.closeSessionMenu();return}this.sessionMenu={key:e.key,sessionId:e.sessionId,...t},this.sessionMenuTrigger=n,this.loadSessionMenuWork(e)}closeSessionMenu(){this.context&&ct(this.context.gateway).unwatch(this),this.sessionMenu=null,this.sessionMenuTrigger=null,this.sessionMenuWorkVersion+=1,this.sessionMenuWork=null}loadSessionMenuWork(e){let t=++this.sessionMenuWorkVersion;if(!e.worktree){this.sessionMenuWork=null;return}this.sessionMenuWork={loading:!0,pullRequestUrl:null,worktreePath:null};let n=this.captureRequestScope();if(!n){this.sessionMenuWork={loading:!1,pullRequestUrl:null,worktreePath:null};return}let r=ct(n.context.gateway),i=he(e.key,this.sessionAgentId(e.key,n.context));Dt({client:n.client,loadPullRequests:z(n.context.gateway.snapshot,`controlUi.sessionPullRequests.subscribe`)===!0?()=>r.load(this,i):void 0,worktreeId:e.worktree.id,execNode:e.execNode}).then(e=>{t===this.sessionMenuWorkVersion&&(this.sessionMenuWork={loading:!1,...e})})}renderSessionMenu(){let e=this.sessionMenu,n=this.context,r=e?this.result?.sessions.find(t=>t.key===e.key&&t.sessionId===e.sessionId):null;if(!e||!n||!r)return F;let i=n.gateway.snapshot,a=P({agentsList:n.agents.state.agentsList,hello:i.hello}),o=m(r,a),s=fe([r],a),c=_t(r.placement),l=!(!c||c.blocksActiveRun&&r.hasActiveRun===!0||z(i,c.method)!==!0),u=x(r);return L`
      <openclaw-session-menu
        .session=${{label:t(r.label)??r.key,sessionId:t(r.sessionId)??null,pinned:r.pinned===!0,pinnable:u,unread:r.unread===!0,archived:r.archived===!0,archiving:n.sessions.archiveVisibility(r.key)===`pending`,category:t(r.category)??null,icon:t(r.icon)??null,color:t(r.color)??null,categoryClearReturnsToGroups:!1}}
        .anchor=${e}
        .trigger=${this.sessionMenuTrigger}
        .disabled=${this.loading}
        .navigationAllowed=${!0}
        .copyMarkdownAllowed=${st(i)}
        .splitAllowed=${!1}
        .actionDisabledReasons=${yt({snapshot:i,session:{...r,pinnable:u},cloudWorkerStopAction:c})}
        .forkDisabled=${r.modelSelectionLocked===!0}
        .forkFromLastCompleted=${r.hasActiveRun===!0}
        .archiveAllowed=${o}
        .deleteAllowed=${s}
        .cloudWorkerStopAllowed=${l}
        .groups=${this.knownCategories()}
        .work=${this.sessionMenuWork}
        .pluginActions=${Ft(n.plugins,r)}
        .onClose=${()=>this.closeSessionMenu()}
        .onAction=${t=>{switch(t.kind){case`open-pr`:_e(t.url);break;case`open-in`:Ie(t.editor,t.path);break;case`copy-session-id`:case`copy-session-link`:case`copy-session-preview-link`:case`copy-markdown`:case`open-new-tab`:case`open-new-window`:case`split-right`:case`split-below`:Ke(t.kind,{context:n,session:r,agentId:r.agentId,isCurrent:()=>this.isConnected&&this.context===n});break;case`toggle-pin`:this.patchSession(r.key,{pinned:r.pinned!==!0});break;case`toggle-unread`:this.patchSession(r.key,{unread:r.unread!==!0});break;case`rename`:this.renameSession(r);break;case`set-color`:this.patchSession(r.key,{color:t.color});break;case`set-icon`:this.patchSession(r.key,{icon:t.icon});break;case`reset-appearance`:this.patchSession(r.key,{icon:null,color:null});break;case`fork`:this.forkSession(r.key,r.hasActiveRun===!0);break;case`plugin`:this.runPluginAction(t.id,e);break;case`move-to-group`:this.assignCategory(r.key,t.category);break;case`new-group`:this.requestNewCategory(r.key);break;case`toggle-archived`:r.archived===!0?this.patchSession(r.key,{archived:!1},void 0,r.sessionId):this.archiveSessionWithUndo(r);break;case`assign-owner`:this.context?.sessions.assignOwner(r.key,t.owner);break;case`stop-cloud-worker`:this.stopCloudWorker(r);break;case`delete`:this.deleteSessionFromMenu(r)}}}
      ></openclaw-session-menu>
    `}render(){let e=this.context,t=(this.result?.owners?.length??0)>1;return e?L`
      ${$t({active:`sessions`,title:Ne(`sessions`),subtitle:L`${Oe(`sessions`)} ${wt(rr)}`,actions:Yt({agents:e.agents.state.agentsList?.agents??[],selection:e.agentSelection}),onSelect:t=>{t!==`sessions`&&e.navigate(t)}})}
      ${Ut(Bn({loading:this.loading,refreshing:this.refreshing,result:this.result,error:this.error,activeMinutes:this.activeMinutes,limit:this.limit,includeGlobal:this.includeGlobal,includeUnknown:this.includeUnknown,statusFilter:this.statusFilter,basePath:e.basePath,agentId:ae(e),mainKey:P({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello}),searchQuery:this.searchQuery,transcriptSearchAvailable:z(e.gateway.snapshot,`sessions.search`)===!0,transcriptSearchQuery:this.transcriptSearchQuery,transcriptSearch:this.transcriptSearchTask.render({initial:()=>({status:`idle`}),pending:()=>({status:`loading`}),complete:e=>({status:`results`,...e}),error:e=>({status:`error`,message:M(e)})}),agentIdentityById:nn(this.result,t=>e.agentIdentity.get(t)??void 0),sortColumn:this.sortColumn,sortDir:this.sortDir,groupBy:t||this.groupBy!==`person`?this.groupBy:`none`,personGroupingAvailable:t,knownCategories:this.knownCategories(),page:this.page,pageSize:this.pageSize,selectedKeys:this.selectedKeys,sessionMenu:this.sessionMenu,expandedSessionKey:this.expandedSessionKey,checkpointItemsByKey:this.checkpointItemsByKey,checkpointLoadingKey:this.checkpointLoadingKey,checkpointBusyKey:this.checkpointBusyKey,checkpointErrorByKey:this.checkpointErrorByKey,patchWriteDisabledReason:this.mutationDisabledReason({method:`sessions.patch`,params:{key:``,label:null}}),patchAdminDisabledReason:this.mutationDisabledReason({method:`sessions.patch`,params:{key:``,thinkingLevel:null}}),groupWriteDisabledReason:this.mutationDisabledReason({method:`sessions.groups.put`,requiredScope:`operator.write`}),deleteArchivedDisabledReason:this.mutationDisabledReason({method:`sessions.delete`,params:{key:``,archivedOnly:!0,deleteTranscript:!0}}),checkpointBranchDisabledReason:this.mutationDisabledReason({method:`sessions.compaction.branch`,requiredScope:`operator.write`}),checkpointRestoreDisabledReason:this.mutationDisabledReason({method:`sessions.compaction.restore`,requiredScope:`operator.admin`}),deleteSelectedDisabledReason:this.selectedDeleteDisabledReason(),onFiltersChange:e=>this.updateFilters(e),onClearFilters:()=>{this.activeMinutes=``,this.limit=`50`,this.includeGlobal=!0,this.includeUnknown=!1,this.searchQuery=``,this.page=0,this.selectedKeys=new Set,this.deepLinkSessionKey=null,this.refreshSessionList()},onSearchChange:e=>{this.routeDataEnabled=!1,this.deepLinkSessionKey=null,this.searchQuery=e,this.page=0,this.selectedKeys=new Set,this.clearSearchTimer(),this.captureRequestScope()&&(this.searchTimer=setTimeout(()=>{this.searchTimer=void 0,this.bindSessionList()},ir)),this.bindSessionList()},onTranscriptSearchChange:e=>this.updateTranscriptSearchQuery(e),onTranscriptSearch:()=>void this.runTranscriptSearch(),onClearTranscriptSearch:()=>this.resetTranscriptSearchState(``),onSortChange:(e,t)=>{this.sortColumn=e,this.sortDir=t,this.page=0},onGroupByChange:e=>this.setGroupBy(e),onAssignCategory:(e,t)=>this.assignCategory(e,t),onRequestNewCategory:e=>void this.requestNewCategory(e),onLoadMore:()=>{let e=this.listBinding,t=this.result?.nextOffset;e&&this.result?.hasMore&&t!=null&&!this.loading&&this.loadSessionList(e,{offset:t,append:!0})},onPageChange:e=>{this.page=e},onPageSizeChange:e=>{this.pageSize=e,this.page=0},onRefresh:()=>void this.refreshSessionList(),onStatusFilterChange:e=>this.updateStatusFilter(e),onDeleteAllArchived:()=>void this.deleteAllArchived(),onPatch:(e,t)=>void this.patchSession(e,t),onToggleSelect:e=>{let t=new Set(this.selectedKeys);t.has(e)?t.delete(e):t.add(e),this.selectedKeys=t},onSelectPage:e=>{this.selectedKeys=new Set([...this.selectedKeys,...e])},onDeselectPage:e=>{let t=new Set(this.selectedKeys);for(let n of e)t.delete(n);this.selectedKeys=t},onDeselectAll:()=>{this.selectedKeys=new Set},onDeleteSelected:()=>void this.deleteSelected(),onNavigateToChat:t=>{let n=ee(e,t);e.navigate(n,{...p({context:e,face:n,sessionKey:t,agentId:this.sessionPathAgentId(t,e),preferenceDerivedFace:!0}).options,hash:``})},onOpenSessionMenu:(e,t,n)=>this.openSessionMenu(e,t,n),onToggleDetails:e=>void this.toggleSessionDetails(e),onBranchFromCheckpoint:(e,t)=>void this.branchCheckpoint(e,t),onRestoreCheckpoint:(e,t)=>void this.restoreCheckpoint(e,t)}),{id:`sessions-hub-panel`})}
      ${this.renderSessionMenu()}
    `:L``}async runPluginAction(e,t){let n=this.captureRequestScope();if(n)try{await It({runtime:n.context.plugins,id:e,placement:`session`,sessionKey:t.key,session:this.result?.sessions.find(e=>e.key===t.key&&e.sessionId===t.sessionId),signal:this.pluginActionLifetime.signal})}catch(e){this.isRequestScopeCurrent(n)&&(this.error=M(e))}}},r([a({context:De,subscribe:!0})],$.prototype,`context`,void 0),r([we({attribute:!1})],$.prototype,`routeData`,void 0),r([I()],$.prototype,`result`,void 0),r([I()],$.prototype,`loading`,void 0),r([I()],$.prototype,`refreshing`,void 0),r([I()],$.prototype,`error`,void 0),r([I()],$.prototype,`activeMinutes`,void 0),r([I()],$.prototype,`limit`,void 0),r([I()],$.prototype,`includeGlobal`,void 0),r([I()],$.prototype,`includeUnknown`,void 0),r([I()],$.prototype,`statusFilter`,void 0),r([I()],$.prototype,`searchQuery`,void 0),r([I()],$.prototype,`transcriptSearchQuery`,void 0),r([I()],$.prototype,`submittedTranscriptSearchQuery`,void 0),r([I()],$.prototype,`sortColumn`,void 0),r([I()],$.prototype,`sortDir`,void 0),r([I()],$.prototype,`groupBy`,void 0),r([I()],$.prototype,`page`,void 0),r([I()],$.prototype,`pageSize`,void 0),r([I()],$.prototype,`selectedKeys`,void 0),r([I()],$.prototype,`sessionMenu`,void 0),r([I()],$.prototype,`sessionMenuWork`,void 0),r([I()],$.prototype,`expandedSessionKey`,void 0),r([I()],$.prototype,`checkpointItemsByKey`,void 0),r([I()],$.prototype,`checkpointTaskKey`,void 0),r([I()],$.prototype,`checkpointBusyKey`,void 0),r([I()],$.prototype,`checkpointErrorByKey`,void 0),customElements.get(`openclaw-sessions-page`)||customElements.define(`openclaw-sessions-page`,$)})))()}ar();
//# sourceMappingURL=sessions-page-zMq8G2Gi.js.map