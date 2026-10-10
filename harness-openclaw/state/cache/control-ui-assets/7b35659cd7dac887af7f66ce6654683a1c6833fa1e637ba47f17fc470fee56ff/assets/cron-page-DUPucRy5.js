import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ia as t,Kr as n,Na as r,Pa as i,Ra as a,Rr as o,ka as s,zr as c}from"./control-ui-foundation-DaCuy7E_.js";import{Al as l,Bs as u,Cr as d,Ec as f,F as p,Js as ee,Ol as te,Sl as ne,Ss as m,Tc as re,Tl as h,Vs as ie,Xs as ae,Xt as oe,Zt as g,an as _,bs as v,fc as se,in as ce,pc as le,un as ue,wl as de,xs as y}from"./control-ui-core-CndkyZ8m.js";import{$ as b,G as x,Q as S,U as fe,at as pe,c as me,dt as C,nt as w,pt as he,r as ge,s as _e,t as ve}from"./lit-runtime-CIjzngcy.js";import{$r as ye,Di as be,Ei as xe,Qr as Se,Ti as T,bi as Ce,fa as we,ia as Te,nr as Ee,rr as De,si as Oe,wi as ke,xi as Ae}from"./control-ui-core-C5mtYcym.js";import{h as je,m as Me}from"./control-ui-boot-shared-ChkOvQif.js";import{$ as Ne,$i as Pe,Aa as E,Ca as Fe,Ea as Ie,Fa as Le,Fi as Re,Ht as ze,Ia as Be,Ii as Ve,Jt as He,Kt as Ue,Li as We,Ma as D,Na as Ge,Pa as Ke,Qi as qe,Sa as Je,Ta as Ye,Vn as Xe,Yc as Ze,Yt as Qe,_a as $e,ba as et,da as tt,ea as nt,et as rt,fa as it,ga as O,ha as at,ja as ot,ka as st,la as ct,ma as lt,on as ut,pa as dt,tt as ft,ua as pt,va as mt,wa as ht,xa as gt,ya as _t}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Mn as vt,Nn as yt,Vi as bt,bt as xt,dt as St,er as Ct,fa as wt,ft as Tt,gt as Et,ht as k,m as Dt,mr as Ot,nr as kt,nt as A,p as At,pa as jt,pr as Mt,pt as Nt,qi as Pt,yt as Ft,zi as It}from"./control-ui-boot-shared-DpHhsTHW.js";import{dn as Lt,fn as Rt,mn as zt,pn as Bt,un as Vt}from"./control-ui-boot-shared-6jDbGebE.js";import"./control-ui-boot-shared-CoE663Cg.js";import{C as Ht}from"./control-ui-boot-new-CQMzhCGu.js";import{n as Ut,t as Wt}from"./channel-picker-Dp-6-XIl.js";import{n as Gt,t as Kt}from"./settings-workspace-gGOfyDax.js";import{n as qt,t as Jt}from"./agent-row-chip-m2O7L9Wr.js";import{n as Yt,t as Xt}from"./model-picker-5inXghL_.js";import{i as j,n as Zt,r as M,t as Qt}from"./cron-jobs-pagination-86dgTmrC.js";import{n as $t,s as en}from"./presenter-DTSxSRZD.js";import{n as tn,t as nn}from"./agent-scope-control-CS9bqwlc.js";function rn(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{return``}}function an(){try{return Intl.supportedValuesOf?.(`timeZone`)??[]}catch{return[]}}function on(e,n=rn(),i=an()){let a=e.map(e=>e.schedule.kind===`cron`&&typeof e.schedule.tz==`string`?e.schedule.tz:``);return t([n,`UTC`,...a,...r(i)])}function sn(){return(sn=e((()=>{s()})))()}function cn(e){let t=re(e.runtimeConfig),n=e.cron.cronForm.deliveryChannel.trim()||`last`,i=new Set((e.agentsList?.agents??[]).filter(e=>e.kind===`system`).map(e=>e.id.trim())),a=r([...le(e.agentsList?.agents??[]).map(e=>e.id.trim()),...e.cron.cronJobs.map(e=>typeof e.agentId==`string`&&!i.has(e.agentId.trim())?e.agentId.trim():``)]),o=r([...e.modelSuggestions,...et(t),...e.cron.cronJobs.map(e=>{let t=it(e);return t?.kind===`agentTurn`&&typeof t.model==`string`?t.model.trim():``})]),s=r(e.cron.cronJobs.map(e=>e.delivery?.to)),c=(n===`last`?Object.values(e.channels.channelsSnapshot?.channelAccounts??{}).flat():e.channels.channelsSnapshot?.channelAccounts?.[n]??[]).flatMap(e=>[e.accountId,e.name]).filter(e=>typeof e==`string`).map(e=>e.trim()).filter(Boolean);return{agentSuggestions:a,modelSuggestions:o,timezoneSuggestions:on(e.cron.cronJobs),accountTargets:c,deliveryToSuggestions:e.cron.cronForm.deliveryMode===`webhook`?s.filter(e=>/^https?:\/\//i.test(e)):s}}var ln;function un(){return(un=e((()=>{s(),se(),f(),lt(),sn(),ln=[`off`,`minimal`,`low`,`medium`,`high`]})))()}function dn(e){let t=new URLSearchParams(e),n=t.get(`job`)?.trim()||null,r=t.get(`session`)?.trim(),i=t.get(`agent`)?.trim();return{jobId:n,runId:n&&t.get(`run`)?.trim()||null,...!n&&r&&i?{session:{sessionKey:r,sessionAgentId:i}}:{}}}function fn(e,t){if(t.runId===e)return!0;let n=pn.exec(e);return n!==null&&n[1]===t.jobId&&t.runAtMs===Number(n[2])}var pn;function N(){return(N=e((()=>{pn=/^cron:(.+):(\d+)$/u})))()}var mn;function hn(){return(hn=e((()=>{S(),h(),m(),ze(),Rt(),Vt(),mn=class{constructor(e,t){this.host=e,this.capture=t,this.attempt=0,this.entry=null,this.task=null,this.candidateId=null,this.error=null,this.transcript={client:null,connected:!1,requestUpdate:()=>this.host.requestUpdate()},e.addController(this)}hostDisconnected(){this.close()}close(){this.attempt++,zt(this.transcript),this.entry=null,this.task=null,this.candidateId=null,this.error=null,this.host.requestUpdate()}observe(e){let t=Ue(e);if(t){if(t.action===`deleted`&&(t.taskId===this.task?.id||t.taskId===this.candidateId)){this.close();return}Bt(this.transcript,t)}}async open(e){this.close();let t=this.capture();if(!t)return;this.entry=e;let n=this.attempt,r=()=>n===this.attempt&&this.host.isConnected&&t.isCurrent(),i=t=>t.runtime===`cron`&&t.sourceId===e.jobId&&t.childSessionKey===e.sessionKey&&t.startedAt===e.runAtMs;try{if(!e.jobId||!e.sessionKey?.trim()||typeof e.runAtMs!=`number`||!Number.isFinite(e.runAtMs))throw Error(l(`cron.runEntry.transcriptMissingMetadata`));let n=new Map,a=new Set,o;do{let s=Qe(await t.client.request(`tasks.list`,{sessionKey:e.sessionKey,limit:500,...o?{cursor:o}:{}}));if(!r())return;if(!s)throw Error(l(`tasksPage.invalidResponse`));for(let e of s.tasks)i(e)&&n.set(e.id,e);if(o=s.nextCursor,o){if(a.has(o))throw Error(l(`tasksPage.invalidResponse`));a.add(o)}}while(o);let[s]=n.values();if(n.size!==1||!s)throw Error(l(`cron.runEntry.transcriptUnavailable`));this.candidateId=s.id;let c=He(await t.client.request(`tasks.get`,{taskId:s.id}));if(!r())return;if(!c||c.id!==s.id||!i(c)||!c.hasTranscript)throw Error(l(`cron.runEntry.transcriptUnavailable`));this.task=c,Object.assign(this.transcript,{client:t.client,connected:!0,connectionEpoch:t.epoch})}catch(e){if(!r())return;this.error=v(e,l(`tasksPage.loadFailed`))}if(!r()||(this.host.requestUpdate(),await this.host.updateComplete,!r()))return;let a=this.host.querySelector(`[data-cron-run-transcript]`);a?.focus({preventScroll:!0}),a?.scrollIntoView({block:`start`,behavior:`instant`})}render(){return this.entry?w`<section
      class="card"
      role="region"
      tabindex="-1"
      aria-label=${l(`tasksPage.transcript`)}
      data-cron-run-transcript
    >
      <div class="row">
        <h2>${this.task?ut(this.task):l(`tasksPage.transcript`)}</h2>
        <button class="btn btn--sm" @click=${()=>this.close()}>${l(`common.close`)}</button>
      </div>
      ${this.error?w`<p role="alert">${this.error}</p>
              <button class="btn btn--sm" @click=${()=>this.entry&&void this.open(this.entry)}>
                ${l(`common.retry`)}
              </button>`:this.task?Lt({host:this.transcript,task:this.task}):w`<p role="status">${l(`tasksPage.loading`)}</p>`}
    </section>`:b}}})))()}function gn(e){let t=e.tabs;return t?Dt({id:t.id,active:e.value,tabs:e.options.map(e=>({value:e.value,label:e.label,testId:e.testId})),ariaLabel:e.ariaLabel??``,panelId:t.panelId,className:`cron-tabs`,variant:t.variant,onSelect:e.onChange}):Et({value:e.value,options:e.options,ariaLabel:e.ariaLabel,onChange:t=>e.onChange(t)})}function _n(){return(_n=e((()=>{At(),A()})))()}function P(e,t,n,r){return{id:e,emoji:t,nameKey:`cron.suggestions.ideas.${e}.name`,taglineKey:`cron.suggestions.ideas.${e}.tagline`,promptKey:`cron.suggestions.ideas.${e}.prompt`,scheduleKey:n,schedule:r}}function vn(e){return{name:l(e.nameKey),payloadText:l(e.promptKey),payloadKind:`agentTurn`,sessionTarget:`isolated`,wakeMode:`now`,deleteAfterRun:!1,enabled:!0,...e.schedule}}var F,I,yn,bn,xn;function Sn(){return(Sn=e((()=>{h(),F={scheduleKind:`cron`,cronExpr:`0 9 * * 1-5`},I={scheduleKind:`cron`,cronExpr:`0 8 * * *`},yn={scheduleKind:`cron`,cronExpr:`0 9 * * 1`},bn={scheduleKind:`every`,everyAmount:`1`,everyUnit:`hours`},xn=[P(`repoPulse`,`🐙`,`cron.suggestions.schedules.weekdayMornings`,F),P(`standupGhostwriter`,`👻`,`cron.suggestions.schedules.weekdayMornings`,F),P(`hackerNewsScout`,`🔭`,`cron.suggestions.schedules.everyMorning`,I),P(`dependencyRadar`,`🛰️`,`cron.suggestions.schedules.weekly`,yn),P(`watchdog`,`🦉`,`cron.suggestions.schedules.hourly`,bn),P(`polyglotMinute`,`🗣️`,`cron.suggestions.schedules.everyMorning`,I)]})))()}function L(e,t){return w`
    <div class="cron-condition-activity__metric">
      <dt>${e}</dt>
      <dd>${t}</dd>
    </div>
  `}function Cn(e){let t=_(e.lastCheckedAtMs,{fallback:l(`cron.runs.notChecked`)}),n=_(e.lastFiredAtMs,{fallback:l(`cron.runs.neverFired`)});return w`
    <div class="cron-condition-activity" data-test-id="cron-condition-activity">
      <div class="cron-condition-activity__intro">
        <div class="settings-row__title">
          <span class="cron-condition-activity__icon" aria-hidden="true">${T(`gitBranch`)}</span>
          ${l(`cron.runs.conditionActivity`)}
        </div>
        <div class="settings-row__desc">${l(`cron.runs.conditionActivityHint`)}</div>
      </div>
      <dl class="cron-condition-activity__metrics">
        ${L(l(`cron.runs.checks`),String(e.checkCount))}
        ${L(l(`cron.runs.lastChecked`),t)}
        ${L(l(`cron.runs.lastFired`),n)}
      </dl>
    </div>
  `}function wn(e){if(e.checkCount===0)return l(`cron.runs.emptyConditionUnchecked`);let t=e.checkCount===1?`cron.runs.emptyConditionHintOne`:`cron.runs.emptyConditionHint`;return l(t,{count:String(e.checkCount)})}function Tn(){return[{value:`ok`,label:l(`cron.runs.runStatusOk`)},{value:`error`,label:l(`cron.runs.runStatusError`)},{value:`skipped`,label:l(`cron.runs.runStatusSkipped`)}]}function En(){return[{value:`delivered`,label:l(`cron.runs.deliveryDelivered`)},{value:`not-delivered`,label:l(`cron.runs.deliveryNotDelivered`)},{value:`unknown`,label:l(`cron.runs.deliveryUnknown`)},{value:`not-requested`,label:l(`cron.runs.deliveryNotRequested`)}]}function Dn(e,t,n){let r=new Set(e);return n?r.add(t):r.delete(t),Array.from(r)}function On(e,t){return e.length===0?t:e.length<=2?e.join(`, `):`${e[0]} +${e.length-1}`}function kn(e){let t=e.options.filter(t=>e.selected.includes(t.value)).map(e=>e.label),n=t.length>2?`${e.summary} (${new Intl.ListFormat(te.getLocale(),{style:`long`,type:`conjunction`}).format(t)})`:e.summary;return w`
    <div class="cron-filter-dropdown" data-filter=${e.id}>
      <wa-dropdown
        class="cron-filter-dropdown__details"
        placement="bottom-start"
        @wa-select=${t=>{let n=t.detail.item.value;if(n===`${z}clear`){e.onClear();return}if(n?.startsWith(R)){t.preventDefault();let r=n.slice(7);e.onToggle(r,!e.selected.includes(r))}}}
      >
        <button
          slot="trigger"
          type="button"
          class="btn btn--sm cron-filter-dropdown__trigger ${e.selected.length>0?`active`:``}"
          title=${e.title}
          aria-label=${`${e.title} ${n}`}
        >
          <span>${e.summary}</span>
          ${T(`chevronDown`)}
        </button>
        ${e.options.map(t=>w`
            <wa-dropdown-item
              class="cron-filter-dropdown__option"
              type="checkbox"
              value=${`${R}${t.value}`}
              .checked=${e.selected.includes(t.value)}
            >
              ${t.label}
            </wa-dropdown-item>
          `)}
        <div class="session-menu__separator" role="separator"></div>
        <wa-dropdown-item value=${`${z}clear`}>
          ${l(`cron.runs.clear`)}
        </wa-dropdown-item>
      </wa-dropdown>
    </div>
  `}function An(e){let t=oe(),n=e.runs.toSorted((t,n)=>e.runsSortDir===`asc`?t.ts-n.ts:n.ts-t.ts),r=e.runsQuery.trim().length>0||e.runsStatuses.length>0||e.runsDeliveryStatuses.length>0,i=Tn(),a=En(),o=i.filter(t=>e.runsStatuses.includes(t.value)).map(e=>e.label),s=a.filter(t=>e.runsDeliveryStatuses.includes(t.value)).map(e=>e.label),c=On(o,l(`cron.runs.allStatuses`)),u=On(s,l(`cron.runs.allDelivery`)),d=e.runsSortDir===`asc`?l(`cron.runs.oldestFirst`):l(`cron.runs.newestFirst`);return w`
    <div class="cron-runs">
      ${e.conditionActivity?Cn(e.conditionActivity):b}
      <div class="cron-run-filters">
        <div class="cron-search-box cron-run-filter-search">
          <span class="cron-search-box__icon" aria-hidden="true">${T(`search`)}</span>
          <input
            type="search"
            class="settings-input"
            .value=${e.runsQuery}
            aria-label=${l(`cron.runs.searchRuns`)}
            placeholder=${l(`cron.runs.searchPlaceholder`)}
            @input=${t=>e.onRunsFiltersChange({cronRunsQuery:t.target.value})}
          />
        </div>
        ${kn({id:`status`,title:l(`cron.runs.status`),summary:c,options:i,selected:e.runsStatuses,onToggle:(t,n)=>{let r=Dn(e.runsStatuses,t,n);e.onRunsFiltersChange({cronRunsStatuses:r})},onClear:()=>{e.onRunsFiltersChange({cronRunsStatuses:[]})}})}
        ${kn({id:`delivery`,title:l(`cron.runs.delivery`),summary:u,options:a,selected:e.runsDeliveryStatuses,onToggle:(t,n)=>{let r=Dn(e.runsDeliveryStatuses,t,n);e.onRunsFiltersChange({cronRunsDeliveryStatuses:r})},onClear:()=>{e.onRunsFiltersChange({cronRunsDeliveryStatuses:[]})}})}
        <div class="cron-filter-dropdown">
          <wa-dropdown
            class="cron-filter-dropdown__details"
            placement="bottom-start"
            @wa-select=${t=>{let n=t.detail.item.value;(n===`asc`||n===`desc`)&&e.onRunsFiltersChange({cronRunsSortDir:n})}}
          >
            <button
              slot="trigger"
              type="button"
              class="btn btn--sm cron-filter-dropdown__trigger cron-run-sort"
              aria-label=${`${l(`cron.jobs.sort`)} ${d}`}
            >
              <span>${d}</span>
              ${T(`chevronDown`)}
            </button>
            <wa-dropdown-item value="desc" aria-current=${String(e.runsSortDir===`desc`)}>
              ${l(`cron.runs.newestFirst`)}
              <span slot="details" aria-hidden="true">
                ${e.runsSortDir===`desc`?T(`check`):b}
              </span>
            </wa-dropdown-item>
            <wa-dropdown-item value="asc" aria-current=${String(e.runsSortDir===`asc`)}>
              ${l(`cron.runs.oldestFirst`)}
              <span slot="details" aria-hidden="true">
                ${e.runsSortDir===`asc`?T(`check`):b}
              </span>
            </wa-dropdown-item>
          </wa-dropdown>
        </div>
      </div>
      ${n.length===0?r?w`<div class="muted cron-runs__empty">${l(`cron.runs.noMatching`)}</div>`:w`
                <div class="cron-empty-state">
                  <div class="cron-empty-state__title">
                    ${e.conditionActivity?l(`cron.runs.emptyConditionTitle`):l(`cron.runs.emptyTitle`)}
                  </div>
                  <div class="cron-empty-state__copy">
                    ${e.conditionActivity?wn(e.conditionActivity):l(`cron.runs.emptyHint`)}
                  </div>
                </div>
              `:w`
              <div class="cron-runs__list">
                ${n.map(n=>Pn(n,t,e.highlightedRunId,e.onViewRunTranscript))}
              </div>
            `}
      ${e.runsHasMore?w`
              <button
                class="btn btn--sm cron-load-more"
                ?disabled=${e.runsLoadingMore}
                @click=${e.onLoadMoreRuns}
              >
                ${e.runsLoadingMore?l(`cron.list.loading`):l(`cron.runs.loadMore`)}
              </button>
            `:b}
    </div>
  `}function jn(e,t=Date.now()){let n=_(e);return l(e>t?`cron.runEntry.next`:`cron.runEntry.due`,{rel:n})}function Mn(e){switch(e){case`ok`:return l(`cron.runs.runStatusOk`);case`error`:return l(`cron.runs.runStatusError`);case`skipped`:return l(`cron.runs.runStatusSkipped`);default:return l(`cron.runs.runStatusUnknown`)}}function Nn(e){switch(e){case`delivered`:return l(`cron.runs.deliveryDelivered`);case`not-delivered`:return l(`cron.runs.deliveryNotDelivered`);case`not-requested`:return l(`cron.runs.deliveryNotRequested`);default:return l(`cron.runs.deliveryUnknown`)}}function Pn(e,t,n,r){let i=Mn(e.status??`unknown`),a=Nn(e.deliveryStatus??`not-requested`),o=e.usage,s=o&&typeof o.total_tokens==`number`?`${g(o.total_tokens)} ${l(`usage.metrics.tokens`)}`:o&&typeof o.input_tokens==`number`&&typeof o.output_tokens==`number`?`${g(o.input_tokens)} in / ${g(o.output_tokens)} out`:null,c=e.summary||y(e.error)||l(`cron.runEntry.noSummary`),u=!!e.error&&!!e.summary,d=y(e.deliverySuppressionReason),f=[a,d?l(`cron.runEntry.deliverySuppression`,{reason:d}):null,e.model,e.provider,s].filter(Boolean),p=!!(n&&fn(n,e));return w`
    <div class="cron-run-entry ${p?`cron-run-entry--highlighted`:``}">
      <div class="cron-run-entry__header">
        <div class="cron-run-entry__main">
          <div class="cron-run-entry__title">
            ${e.jobName??e.jobId}
            <span class="muted"> · ${i}</span>
          </div>
          <div class="cron-run-entry__facts muted">${f.join(` · `)}</div>
        </div>
        <div class="cron-run-entry__meta">
          <div>${t(e.ts)}</div>
          ${typeof e.runAtMs==`number`?w`<div class="muted">
                  ${l(`cron.runEntry.runAt`)} ${t(e.runAtMs)}
                </div>`:b}
          <div class="muted">
            ${typeof e.durationMs==`number`&&Number.isFinite(e.durationMs)?Re(e.durationMs)??Ve(e.durationMs,l(`common.na`)):l(`common.na`)}
          </div>
          ${typeof e.nextRunAtMs==`number`?w`<div class="muted">${jn(e.nextRunAtMs)}</div>`:b}
          ${e.sessionKey?w`<div>
                  <button class="btn btn--sm" @click=${()=>r?.(e)}>
                    ${l(`tasksPage.viewTranscript`)}
                  </button>
                </div>`:b}
          ${u?w`<div class="muted">${y(e.error)}</div>`:b}
          ${e.deliveryError?w`<div class="muted">${y(e.deliveryError)}</div>`:b}
        </div>
      </div>
      <div class="cron-run-entry__body chat-text">
        ${ge(yt(c))}
      </div>
    </div>
  `}var R,z;function Fn(){return(Fn=e((()=>{S(),ve(),be(),Pt(),vt(),h(),M(),We(),m(),ue(),N(),j(),R=`option:`,z=`command:`})))()}function In(e){return[{value:`last`,label:`last`,kind:`neutral`},...a(e.channels.filter(Boolean)).map(t=>({value:t,label:e.channelMeta?.find(e=>e.id===t)?.label||e.channelLabels?.[t]||t}))]}function B(e,t){let n=a(i(t));return n.length===0?b:w`<datalist id=${e}>
        ${n.map(e=>w`<option value=${e}></option> `)}
      </datalist>`}function V(e){return`cron-error-${e}`}function H(e){return`cron-${e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}`}function Ln(e,t,n){return e===`payloadText`&&t.payloadKind===`systemEvent`?l(`cron.form.mainTimelineMessage`):l(e===`deliveryTo`&&n===`webhook`?`cron.form.webhookUrl`:gr[e])}function Rn(e,t,n){return Object.keys(gr).flatMap(r=>{let i=e[r];return i?[{key:r,label:Ln(r,t,n),message:i,inputId:H(r)}]:[]})}function zn(e){let t=document.getElementById(e);t instanceof HTMLElement&&(typeof t.scrollIntoView==`function`&&t.scrollIntoView({block:`center`,behavior:Xe()}),t.focus())}function Bn(e,t){return e?w`<div id=${x(t)} class="cron-help cron-error">${l(e)}</div>`:b}function Vn(e){return w`
    ${e}
    <span class="cron-required-marker" aria-hidden="true">*</span>
    <span class="cron-required-sr">${l(`cron.form.requiredSr`)}</span>
  `}function U(e){let t=e.wide?`cron-control cron-control--wide`:`cron-control`,n=w`<div class=${t}>
    ${e.control}${Bn(e.error,e.errorId)}
  </div>`;return w`
    <div class=${e.stacked?`settings-row settings-row--stacked`:`settings-row`}>
      <label class="settings-row__text" for=${x(e.controlId||void 0)}>
        <span class="settings-row__title">
          ${e.required?Vn(e.label):e.label}
        </span>
        ${e.help?w`<span class="settings-row__desc">${e.help}</span>`:b}
      </label>
      <div class="settings-row__control">${n}</div>
    </div>
  `}function W(e,t,n){let r=n.errorKey?e.fieldErrors[n.errorKey]:void 0,i=r&&n.errorKey&&n.describeError!==!1?V(n.errorKey):void 0;return w`
    <input
      id=${H(t)}
      class=${n.mono?`settings-input mono`:`settings-input`}
      type=${x(n.type)}
      aria-required=${x(n.required?`true`:void 0)}
      .value=${e.form[t]}
      list=${x(n.list)}
      ?disabled=${n.disabled??!1}
      aria-invalid=${x(n.errorKey?r?`true`:`false`:void 0)}
      aria-describedby=${x(i)}
      placeholder=${x(n.placeholder)}
      @input=${n=>e.onFormChange({[t]:n.currentTarget.value})}
    />
  `}function G(e,t,n){let r=n.errorKey;return U({label:n.label,controlId:H(t),required:n.required,help:n.help,error:r?e.fieldErrors[r]:void 0,errorId:r?V(r):void 0,control:W(e,t,n)})}function K(e,t,n){let r=n.value??e.form[t];return(n.channel?Ut:Ot)({id:n.standalone?void 0:H(t),label:n.label,value:n.channel?r||`last`:r,options:n.options,disabled:n.disabled,onChange:n=>e.onFormChange({[t]:n})})}function q(e,t,n){return U({label:n.label,controlId:H(t),help:n.help,control:K(e,t,n)})}function J(e,t,n){return xt({title:n.label,description:n.help,checked:e.form[t],onChange:n=>e.onFormChange({[t]:n})})}function Hn(e){let t=e.editingJob?`job`:e.createOpen?`create`:`overview`;return w`
    ${t===`overview`?Wn(e):rr(e,t)}
    ${B(`cron-agent-suggestions`,e.agentSuggestions)}
    ${B(`cron-thinking-suggestions`,e.thinkingSuggestions)}
    ${B(`cron-tz-suggestions`,e.timezoneSuggestions)}
    ${B(`cron-delivery-to-suggestions`,e.deliveryToSuggestions)}
    ${B(`cron-delivery-account-suggestions`,e.accountSuggestions)}
  `}function Un(e){return e.canManage?b:w`<div class="cron-admin-note" role="note">
        <span aria-hidden="true">${T(`lock`)}</span>
        <span>${l(`cron.adminRequired`)}</span>
      </div>`}function Wn(e){let t=e.jobsScheduleKindFilter!==`all`||e.jobsLastStatusFilter!==`all`||e.jobsTriggerFilter!==`all`||e.jobsSortBy!==`nextRunAtMs`||e.jobsSortDir!==`asc`,n=t||e.jobsQuery.trim().length>0||e.jobsEnabledFilter!==`all`,r=!e.loading&&e.hasLoaded&&!e.listError&&!e.error&&e.jobsTotal===0&&!n&&e.canManage,i=[w`
      <div class="cron-overview-header">
        ${Un(e)}
        ${e.status&&!e.status.enabled?w`
                <div class="cron-error-banner" data-test-id="cron-scheduler-banner">
                  <strong>${l(`cron.list.schedulerOff`)}</strong>
                  ${l(`cron.runNotStarted.stopped`)}
                </div>
              `:b}
        ${e.listError?w`<div class="cron-error-banner" role="alert">${e.listError}</div>`:b}
        ${e.error?w`<div class="cron-error-banner" role="alert">${e.error}</div>`:b}
        ${Kn(e,t)}
      </div>
    `,w`
      <div
        id="cron-list-panel"
        class="cron-tab-panel"
        role="tabpanel"
        aria-labelledby=${`cron-list-tab-${e.listTab===`activity`?`activity`:e.jobsEnabledFilter}`}
      >
        ${e.listTab===`activity`?k({},w`<div class="cron-activity">${An(e)}</div>`):[k({},Jn(e,n)),r?nr(e):b]}
      </div>
    `];return w`
    <section class="cron-page" data-panel-mode="overview">
      ${St(i,{wide:!0})}
    </section>
  `}function Gn(e){return gn({value:e.listTab===`activity`?`activity`:e.jobsEnabledFilter,options:[..._r.map(e=>({value:e.value,label:l(e.labelKey),testId:`cron-tab-${e.value}`})),{value:`activity`,label:l(`cron.list.activityTab`),testId:`cron-list-tab-activity`}],ariaLabel:l(`cron.list.viewLabel`),tabs:{id:`cron-list`,panelId:`cron-list-panel`},onChange:t=>{if(t===`activity`){e.onListTabChange(`activity`);return}e.onListTabChange(`tasks`),t!==e.jobsEnabledFilter&&e.onJobsFiltersChange({cronJobsEnabledFilter:t})}})}function Kn(e,t){return w`
    <div class="cron-toolbar">
      ${e.listTab===`tasks`?w`
              <div class="cron-toolbar__filters">
                <div class="cron-search-box">
                  <span class="cron-search-box__icon" aria-hidden="true">${T(`search`)}</span>
                  <input
                    type="search"
                    class="settings-input"
                    .value=${e.jobsQuery}
                    aria-label=${l(`cron.list.searchPlaceholder`)}
                    placeholder=${l(`cron.list.searchPlaceholder`)}
                    @input=${t=>e.onJobsFiltersChange({cronJobsQuery:t.target.value})}
                  />
                </div>
                ${qn(e,t)}
              </div>
            `:b}
      <div class="cron-toolbar__primary">
        ${Gn(e)}
        <div class="cron-toolbar__actions">
          <button
            type="button"
            class="btn btn--sm btn--ghost cron-refresh ${e.loading?`cron-refresh--loading`:``}"
            ?disabled=${e.loading}
            title=${e.loading?l(`cron.list.refreshing`):l(`cron.list.refresh`)}
            aria-label=${l(`cron.list.refresh`)}
            @click=${e.onRefresh}
          >
            ${T(`refresh`)}
          </button>
          ${e.canManage?w`
                  <button
                    type="button"
                    class="btn primary btn--sm cron-new-task"
                    data-test-id="cron-new-task"
                    @click=${()=>e.onOpenCreate()}
                  >
                    ${T(`plus`)} ${l(`cron.list.newTask`)}
                  </button>
                `:b}
        </div>
      </div>
    </div>
  `}function Y(e,t,n){return w`
    <label class="field">
      <span>${n.label}</span>
      <select
        class="settings-select"
        data-test-id=${x(n.testId)}
        .value=${n.value}
        @change=${n=>e.onJobsFiltersChange({[t]:n.currentTarget.value})}
      >
        ${n.options.map(({value:e,label:t})=>w`<option value=${e} ?selected=${e===n.value}>${t}</option>`)}
      </select>
    </label>
  `}function qn(e,t){return w`
    <button
      id="cron-jobs-filter-trigger"
      type="button"
      class="btn btn--sm cron-filter-popover__trigger ${t?`active`:``}"
      title=${l(`cron.list.filters`)}
      aria-label=${l(`cron.list.filters`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${T(`listFilter`)}
    </button>
    <wa-popover
      class="cron-filter-popover"
      for="cron-jobs-filter-trigger"
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>{e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,`true`)}}
      @wa-hide=${e=>{e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,`false`)}}
    >
      <div class="cron-filter-popover__panel">
        ${Y(e,`cronJobsScheduleKindFilter`,{label:l(`cron.jobs.schedule`),value:e.jobsScheduleKindFilter,testId:`cron-jobs-schedule-filter`,options:Object.entries(vr).map(([e,t])=>({value:e,label:l(t)}))})}
        ${Y(e,`cronJobsLastStatusFilter`,{label:l(`cron.jobs.lastRun`),value:e.jobsLastStatusFilter,testId:`cron-jobs-last-status-filter`,options:[{value:`all`,label:l(`cron.jobs.all`)},{value:`ok`,label:l(`cron.runs.runStatusOk`)},{value:`error`,label:l(`cron.runs.runStatusError`)},{value:`skipped`,label:l(`cron.runs.runStatusSkipped`)},{value:`unknown`,label:l(`cron.runs.runStatusUnknown`)}]})}
        ${Y(e,`cronJobsTriggerFilter`,{label:l(`cron.jobs.condition`),value:e.jobsTriggerFilter,testId:`cron-jobs-trigger-filter`,options:[{value:`all`,label:l(`cron.jobs.all`)},{value:`conditional`,label:l(`cron.jobs.conditional`)},{value:`unconditional`,label:l(`cron.jobs.unconditional`)}]})}
        ${Y(e,`cronJobsSortBy`,{label:l(`cron.jobs.sort`),value:e.jobsSortBy,options:[{value:`nextRunAtMs`,label:l(`cron.jobs.nextRun`)},{value:`updatedAtMs`,label:l(`cron.jobs.recentlyUpdated`)},{value:`name`,label:l(`cron.jobs.name`)}]})}
        ${Y(e,`cronJobsSortDir`,{label:l(`cron.jobs.direction`),value:e.jobsSortDir,options:[{value:`asc`,label:l(`cron.jobs.ascending`)},{value:`desc`,label:l(`cron.jobs.descending`)}]})}
        <button
          class="btn btn--sm"
          data-test-id="cron-jobs-filters-reset"
          ?disabled=${!t}
          @click=${e.onJobsFiltersReset}
        >
          ${l(`cron.jobs.reset`)}
        </button>
      </div>
    </wa-popover>
  `}function Jn(e,t){let n=e.loading&&!e.hasLoaded,r=e.loading||e.jobsLoadingMore,i=e.jobs.toSorted((e,t)=>Number(qe(t))-Number(qe(e)));return w`
    <div
      class="cron-table ${e.canManage?``:`cron-table--read-only`}"
      aria-busy=${r?`true`:b}
    >
      <div class="cron-table__head">
        <span>${l(`cron.jobs.name`)}</span>
        <span>${l(`cron.jobs.schedule`)}</span>
        <span>${l(`cron.jobs.nextRun`)}</span>
        <span>${l(`cron.jobs.lastRun`)}</span>
        ${e.canManage?w`<span aria-hidden="true"></span>`:b}
      </div>
      ${i.length===0?n?w`
                <div
                  class="cron-empty-state"
                  role="status"
                  aria-live="polite"
                  data-test-id="cron-jobs-loading"
                >
                  <div class="cron-empty-state__title">${l(`cron.list.loading`)}</div>
                </div>
              `:e.hasLoaded?w`
                  <div class="cron-empty-state">
                    <div class="cron-empty-state__title">
                      ${l(t?`cron.list.noMatching`:`cron.list.emptyTitle`)}
                    </div>
                    ${t?b:w`<div class="cron-empty-state__copy">
                            ${l(`cron.list.emptyHint`)}
                          </div>`}
                  </div>
                `:b:me(i,e=>e.id,t=>Yn(t,e))}
      ${Zt({jobsShown:e.jobs.length,jobsTotal:e.jobsTotal,hasMore:e.jobsHasMore,loading:e.loading,loadingMore:e.jobsLoadingMore,onLoadMore:e.onLoadMoreJobs})}
    </div>
  `}function X(e){return je(e?.declarationKey)}function Yn(e,t){let n=e.displayName??e.name,r=e.description?.trim(),i=X(e),a=e.state?.nextRunAtMs,o=typeof a==`number`&&Number.isFinite(a),s=Pe(e)?w`<span class="cron-table__running">${l(`cron.runs.runStatusRunning`)}</span>`:o?_(a):l(`common.na`);return w`
    <div
      class="cron-table__row ${e.enabled?``:`cron-table__row--paused`}"
      data-test-id=${`cron-row-${e.id}`}
      @click=${()=>t.onSelectJob(e)}
    >
      <button type="button" class="cron-table__name">
        ${Xn(e)}
        <span class="cron-table__name-copy">
          <span class="cron-table__name-line">
            <span class="cron-table__name-text">${n}</span>
            ${e.trigger?Zn():b}
          </span>
          ${i?b:qt(e.agentId)}
          ${r||!e.enabled?w`
                  <span class="cron-table__name-meta">
                    ${r?w`
                            <span
                              class="cron-table__description"
                              data-test-id=${`cron-row-description-${e.id}`}
                              title=${`${l(`cron.form.description`)}: ${r}`}
                              >${r}</span
                            >
                          `:b}
                    ${r&&!e.enabled?w`<span class="cron-table__meta-separator" aria-hidden="true">·</span>`:b}
                    ${e.enabled?b:Qn(e)}
                  </span>
                `:b}
        </span>
      </button>
      ${Z(`cron-table__schedule`,l(`cron.jobs.schedule`),$t(e))}
      ${Z(`cron-table__next`,l(`cron.jobs.nextRun`),s)}
      ${Z(`cron-table__last`,l(`cron.jobs.lastRun`),er(e))}
      ${t.canManage?w`
              <span class="cron-table__actions" @click=${e=>e.stopPropagation()}>
                <button
                  type="button"
                  class="btn btn--sm btn--ghost cron-row-run"
                  data-test-id=${`cron-row-run-${e.id}`}
                  title=${l(`cron.actions.runNowJob`,{name:n})}
                  aria-label=${l(`cron.actions.runNowJob`,{name:n})}
                  ?disabled=${t.busy}
                  @click=${()=>t.onRun(e,`force`)}
                >
                  ${T(`play`)}
                </button>
                ${i?b:ar(t,e,{compact:!0,testId:`cron-row-toggle-${e.id}`})}
                ${tr(t,e)}
              </span>
            `:b}
    </div>
  `}function Z(e,t,n){return w`<span class="cron-table__cell ${e}">
    <span class="cron-table__cell-label">${t}</span>
    <span class="cron-table__cell-value">${n}</span>
  </span>`}function Xn(e){let t=e.state?.autoDisabled,n=Pe(e)?{className:`cron-table__state--running`,iconName:`loader`,label:l(`cron.runs.runStatusRunning`)}:t?{className:`cron-table__state--error`,iconName:`lock`,label:$n(e)}:qe(e)?{className:`cron-table__state--error`,iconName:`alertTriangle`,label:l(`cron.runs.runStatusError`)}:e.enabled?{className:`cron-table__state--active`,iconName:null,label:l(`cron.detail.active`)}:{className:`cron-table__state--paused`,iconName:`pause`,label:l(`cron.list.paused`)};return w`<span
    class="cron-table__state ${n.className}"
    role="img"
    aria-label=${n.label}
    title=${n.label}
    >${n.iconName?T(n.iconName):w`<span class="cron-table__state-dot"></span>`}</span
  >`}function Zn(){let e=l(`cron.form.triggerConfigured`);return w`<span class="cron-trigger-icon" role="img" aria-label=${e} title=${e}
    >${T(`gitBranch`)}</span
  >`}function Qn(e){if(!e.state?.autoDisabled)return w`<span class="muted cron-table__paused-note">${l(`cron.list.paused`)}</span>`;let t=$n(e),n=e.state?.lastError?.trim();return w`<span
    class="cron-table__paused-note cron-table__auto-disabled"
    data-test-id=${`cron-row-auto-disabled-${e.id}`}
    title=${n?y(n):t}
    >${t}</span
  >`}function $n(e){let t=e.state?.autoDisabled;return t?l(t.reason===`schedule-errors`?`cron.list.autoDisabledScheduleErrors`:`cron.list.autoDisabledRunFailures`,{count:String(t.consecutiveErrors)}):l(`cron.list.paused`)}function er(e){let t=nt(e),n=e.state?.lastRunAtMs,r=typeof n==`number`&&Number.isFinite(n)?_(n):null;if(t===`unknown`||!r)return w`<span class="muted">${l(`common.na`)}</span>`;let i=t===`ok`?w`<span class="cron-last-glyph cron-last-glyph--ok">${T(`check`)}</span>`:t===`error`?w`<span class="cron-last-glyph cron-last-glyph--error">${T(`x`)}</span>`:w`<span class="cron-last-glyph">${T(`cornerDownRight`)}</span>`,a=Mn(t);return w`
    <span class="cron-table__last-run" role="img" aria-label=${a} title=${a}>
      ${i}
      <span class="cron-table__last-time">${r}</span>
    </span>
  `}function tr(e,t){if(!e.canManage)return b;let n=X(t),r=t.displayName??t.name;return w`
    <wa-dropdown
      class="cron-job-menu"
      placement="bottom-end"
      @wa-select=${r=>{if(e.canManage)switch(r.detail.item.value){case`run-if-due`:e.onRun(t,`due`);break;case`clone`:n||e.onClone(t);break;case`remove`:n||e.onRemove(t);break;case void 0:}}}
    >
      <button
        slot="trigger"
        type="button"
        class="btn btn--sm btn--ghost cron-job-menu__trigger"
        aria-label=${l(`cron.actions.moreJob`,{name:r})}
        title=${l(`cron.actions.moreJob`,{name:r})}
      >
        ${T(`moreHorizontal`)}
      </button>
      ${Q(e,`run-if-due`,l(`cron.actions.runIfDue`))}
      ${n?b:Q(e,`clone`,l(`cron.actions.clone`))}
      ${n?b:Q(e,`remove`,l(`cron.actions.remove`),{danger:!0})}
    </wa-dropdown>
  `}function nr(e){return k({title:l(`cron.suggestions.title`)},xn.map(t=>w`
        <button
          type="button"
          class="settings-row settings-row--nav cron-suggestion"
          data-suggestion=${t.id}
          @click=${()=>e.onOpenCreate(vn(t))}
        >
          <div class="settings-row__text">
            <span class="settings-row__title">
              <span aria-hidden="true">${t.emoji}</span> ${l(t.nameKey)}
            </span>
            <span class="settings-row__desc">${l(t.taglineKey)}</span>
          </div>
          <div class="settings-row__control">
            <span class="settings-row__value">${l(t.scheduleKey)}</span>
            <span class="settings-row__chevron">${xe.chevronRight}</span>
          </div>
        </button>
      `))}function rr(e,t){let n=t===`job`?e.editingJob??void 0:void 0,r=t===`job`&&!!n,i=t===`job`&&e.detailTab===`history`,a=n?.trigger?{checkCount:n.state?.triggerEvalCount??0,lastCheckedAtMs:n.state?.lastTriggerEvalAtMs,lastFiredAtMs:n.state?.lastTriggerFireAtMs}:void 0,o=[w`
      <div class="cron-back-row">
        <button
          type="button"
          class="cron-back"
          data-test-id="cron-back"
          ?disabled=${e.busy}
          @click=${e.onClosePanel}
        >
          ${T(`arrowLeft`)} ${l(`cron.detail.back`)}
        </button>
      </div>
    `,ir(e,t,n),Un(e),r?or(e):b,e.error?w`<div class="cron-error-banner">${e.error}</div>`:b,w`
      <div
        id="cron-detail-panel"
        class="cron-tab-panel"
        role=${r?`tabpanel`:b}
        aria-labelledby=${r?`cron-detail-tab-${e.detailTab}`:b}
      >
        ${i?k({title:l(`cron.detail.historyTitle`)},w`<div class="cron-history">
                  ${An({...e,conditionActivity:a})}
                </div>`):sr(e,t)}
      </div>
    `];return w`
    <section class="cron-page cron-page--detail" data-panel-mode=${t}>
      ${St(o,{wide:!0})}
    </section>
  `}function ir(e,t,n){let r=t===`job`?n?.displayName??n?.name??e.form.name:l(`cron.detail.newTitle`),i=t===`job`?n?.description?.trim():void 0,a=X(n),o=n?.state?.nextRunAtMs,s=typeof o==`number`&&Number.isFinite(o)?` · ${l(`cron.jobState.next`)} ${_(o)}`:``,c=t===`job`&&n?`${$t(n)}${s}`:l(`cron.detail.newSubtitle`);return w`
    <div class="cron-detail-header">
      <div class="cron-detail-header__copy">
        <div class="cron-detail-title">${r}</div>
        ${i?w`<div class="cron-detail-description" data-test-id="cron-detail-description">
                <span class="cron-detail-description__label">${l(`cron.form.description`)}:</span>
                ${i}
              </div>`:b}
        <div class="cron-detail-meta">
          ${t===`job`&&n&&e.canManage&&!a?ar(e,n):b}
          <span class="cron-detail-sub">${c}</span>
          ${n?.trigger?Zn():b}
        </div>
      </div>
      <div class="cron-detail-actions">
        ${t===`job`&&n&&e.canManage?w`
                <button
                  type="button"
                  class="btn btn--sm"
                  data-test-id="cron-run-now"
                  ?disabled=${e.busy}
                  @click=${()=>e.onRun(n,`force`)}
                >
                  ${T(`play`)} ${l(`cron.actions.runNow`)}
                </button>
                ${tr(e,n)}
              `:b}
      </div>
    </div>
  `}function ar(e,t,n){let r=t.enabled?l(`cron.detail.active`):l(`cron.detail.paused`),i=l(t.enabled?`cron.actions.pauseJob`:`cron.actions.resumeJob`,{name:t.displayName??t.name});return w`
    <span
      class="cron-enabled-toggle"
      data-test-id=${n?.testId??`cron-toggle-enabled`}
      title=${n?.compact?i:b}
    >
      ${Ft({checked:t.enabled,disabled:e.busy||!e.canManage,ariaLabel:n?.compact?i:r,onChange:n=>{e.canManage&&e.onToggle(t,n)}})}
      ${n?.compact?b:w`<span class="cron-detail-sub">${r}</span>`}
    </span>
  `}function or(e){return gn({value:e.detailTab,options:[{value:`settings`,label:l(`cron.detail.settingsTab`),testId:`cron-detail-tab-settings`},{value:`history`,label:l(`cron.detail.historyTitle`),testId:`cron-detail-tab-history`}],ariaLabel:l(`cron.detail.tabsLabel`),tabs:{id:`cron-detail`,panelId:`cron-detail-panel`,variant:`sub`},onChange:e.onDetailTabChange})}function sr(e,t){let n=e.form.payloadLocked,r=t===`job`&&X(e.editingJob),i=!n&&e.form.payloadKind===`agentTurn`,a=e.form.sessionTarget!==`main`&&(e.form.payloadKind===`agentTurn`||n),o=e.form.deliveryMode===`announce`&&!a?`none`:e.form.deliveryMode,s=Rn(e.fieldErrors,e.form,o),c=e.canManage&&!e.busy&&s.length>0,u=c&&!e.canSubmit?s.length===1?l(`cron.form.fixFields`,{count:String(s.length)}):l(`cron.form.fixFieldsPlural`,{count:String(s.length)}):``;return w`
    <fieldset
      class="cron-editor"
      ?disabled=${e.busy||!e.canManage||r}
      aria-busy=${String(e.busy)}
    >
      ${cr(e,{payloadLocked:n,isAgentTurn:i})} ${lr(e)}
      ${dr(e)}
      ${fr(e,{supportsAnnounce:a,selectedDeliveryMode:o})}
      ${pr(e,{mode:t,isAgentTurn:i,selectedDeliveryMode:o})}
      ${c?w`
              <div class="cron-form-status" role="status" aria-live="polite">
                <div class="cron-form-status__title">${l(`cron.form.cantAddYet`)}</div>
                <div class="cron-help">${l(`cron.form.fillRequired`)}</div>
                <ul class="cron-form-status__list">
                  ${s.map(e=>w`
                      <li>
                        <button
                          type="button"
                          class="cron-form-status__link"
                          @click=${()=>zn(e.inputId)}
                        >
                          ${e.label}: ${l(e.message)}
                        </button>
                      </li>
                    `)}
                </ul>
              </div>
            `:b}
      ${e.canManage&&!r?w`
              <div class="cron-editor-actions">
                <button
                  class="btn primary"
                  data-test-id="cron-submit"
                  ?disabled=${e.busy||!e.canSubmit}
                  @click=${e.onSubmit}
                >
                  ${e.busy?l(`cron.form.saving`):l(t===`job`?`cron.form.saveChanges`:`cron.form.createTask`)}
                </button>
                ${t===`create`?w`
                        <button
                          class="btn"
                          data-test-id="cron-submit-run"
                          ?disabled=${e.busy||!e.canSubmit}
                          @click=${e.onSubmitRunNow}
                        >
                          ${l(`cron.form.createAndRun`)}
                        </button>
                      `:b}
                <button class="btn" ?disabled=${e.busy} @click=${e.onClosePanel}>
                  ${l(`cron.form.cancel`)}
                </button>
                ${u?w`<div class="cron-submit-reason" aria-live="polite">
                        ${u}
                      </div>`:b}
              </div>
            `:b}
    </fieldset>
  `}function Q(e,t,n,r){return w`
    <wa-dropdown-item
      class=${r?.danger?`cron-job-menu__item danger`:`cron-job-menu__item`}
      value=${t}
      variant=${r?.danger?`danger`:`default`}
      ?disabled=${e.busy||!e.canManage}
    >
      ${n}
    </wa-dropdown-item>
  `}function cr(e,t){let n=e.form.payloadKind===`script`?l(`cron.form.script`):e.form.payloadKind===`heartbeat`?`Heartbeat monitor`:e.form.payloadKind===`agentTurn`?l(`cron.form.assistantTaskPrompt`):l(`cron.form.command`),r=t.payloadLocked?n:e.form.payloadKind===`systemEvent`?l(`cron.form.mainTimelineMessage`):l(`cron.form.assistantTaskPrompt`),i=t.payloadLocked?l(`cron.form.readOnlyPayloadHelp`):e.form.payloadKind===`systemEvent`?l(`cron.form.systemEventHelp`):l(`cron.form.agentTurnHelp`),o=t.payloadLocked?yr[e.form.payloadKind]:``,s=e.form.payloadKind===`heartbeat`?e.heartbeatScratch:e.form.payloadText,c=U({label:r,controlId:o?``:`cron-payload-text`,required:!0,help:i,stacked:!0,wide:!0,error:e.fieldErrors.payloadText,errorId:V(`payloadText`),control:o?w`
          <pre
            id="cron-payload-text"
            class="code-block cron-payload-code"
            data-test-id="cron-payload-code"
            tabindex="0"
            aria-label=${r}
          ><code class="hljs">${ge(Ct(s,o))}</code></pre>
        `:w`
          <textarea
            id="cron-payload-text"
            class="settings-input"
            rows="6"
            .value=${s}
            ?readonly=${t.payloadLocked}
            aria-required="true"
            placeholder=${l(`cron.form.promptPlaceholder`)}
            aria-invalid=${e.fieldErrors.payloadText?`true`:`false`}
            aria-describedby=${x(e.fieldErrors.payloadText?V(`payloadText`):void 0)}
            @input=${t=>e.onFormChange({payloadText:t.target.value})}
          ></textarea>
        `}),u=l(`cron.form.action`),d=t.payloadLocked?U({label:u,controlId:H(`payloadKind`),control:w`
          <input
            id=${H(`payloadKind`)}
            class="settings-input"
            .value=${n}
            readonly
          />
        `}):q(e,`payloadKind`,{label:u,options:[{value:`systemEvent`,label:l(`cron.form.systemEvent`)},{value:`agentTurn`,label:l(`cron.form.agentTurn`)}]}),f=l(`cron.form.model`),p=e.fieldErrors.payloadModel,ee=a(e.modelSuggestions).map(e=>({value:e,label:e,provider:bt(e)??void 0})),te=t.isAgentTurn?w`
        ${U({label:f,controlId:``,help:l(`cron.form.modelHelp`),error:p,errorId:V(`payloadModel`),control:Yt({id:`cron-payload-model-picker`,label:f,value:e.form.payloadModel,options:[{value:``,label:l(`quickSettings.model.default`)},...ee],custom:{id:H(`payloadModel`),label:l(`cron.form.customModel`),placeholder:l(`cron.form.modelPlaceholder`),invalid:!!p,describedBy:p?V(`payloadModel`):void 0},onChange:t=>e.onFormChange({payloadModel:t})})})}
        ${G(e,`payloadThinking`,{label:l(`cron.form.thinking`),help:l(`cron.form.thinkingHelp`),errorKey:`payloadThinking`,describeError:!1,list:`cron-thinking-suggestions`,placeholder:l(`cron.form.thinkingPlaceholder`)})}
      `:b;return k({},w`${c}${d}${te}`)}function lr(e){let t=e.form.sessionTarget,n=t===`main`||t===`isolated`;return k({title:l(`cron.detail.generalSection`)},w`
      ${G(e,`name`,{label:l(`cron.form.fieldName`),required:!0,errorKey:`name`,placeholder:l(`cron.form.namePlaceholder`)})}
      ${G(e,`agentId`,{label:l(`cron.form.agentId`),help:l(`cron.form.agentHelp`),list:`cron-agent-suggestions`,disabled:e.form.clearAgent,placeholder:l(`cron.form.agentPlaceholder`)})}
      ${q(e,`sessionTarget`,{label:l(`cron.form.runsIn`),help:l(`cron.form.sessionHelp`),options:[{value:`main`,label:l(`cron.form.mainSession`)},{value:`isolated`,label:l(`cron.form.isolatedSession`)},...n?[]:[{value:t,label:t}]]})}
    `)}function ur(e){if(e.scheduleKind===`every`){let t=e.everyAmount.trim();if(Ke(t,e.everyUnit)===void 0)return null;if(Number(t)===1){let t=e.everyUnit===`seconds`?`cron.form.summaryEverySecondOne`:e.everyUnit===`minutes`?`cron.form.summaryEveryMinuteOne`:e.everyUnit===`hours`?`cron.form.summaryEveryHourOne`:`cron.form.summaryEveryDayOne`;return l(t)}let n=e.everyUnit===`seconds`?`cron.form.summaryEverySeconds`:e.everyUnit===`minutes`?`cron.form.summaryEveryMinutes`:e.everyUnit===`hours`?`cron.form.summaryEveryHours`:`cron.form.summaryEveryDays`;return l(n,{amount:t})}if(e.scheduleKind===`at`){let t=Date.parse(e.scheduleAt);return Number.isFinite(t)?l(`cron.form.summaryOnce`,{at:ce(t)}):null}if(e.scheduleKind===`cron`){let t=e.cronExpr.trim();if(!t)return null;let n=e.cronTz.trim();return n?l(`cron.form.summaryCronTz`,{expr:t,tz:n}):l(`cron.form.summaryCron`,{expr:t})}return e.scheduleKind===`on-exit`?l(`cron.form.repeatOnExit`):e.scheduleKind===`stream`?l(`cron.form.repeatStream`):null}function dr(e){let t=e.form,n=t.scheduleKind===`on-exit`,r=t.scheduleKind===`stream`,i=n?{value:`on-exit`,label:l(`cron.form.repeatOnExit`)}:r?{value:`stream`,label:l(`cron.form.repeatStream`)}:null,a=[...i?[{...i,testId:`cron-schedule-kind-${i.value}`}]:[],{value:`every`,label:l(`cron.form.repeatInterval`),testId:`cron-schedule-kind-every`},{value:`at`,label:l(`cron.form.repeatOnce`),testId:`cron-schedule-kind-at`},{value:`cron`,label:l(`cron.form.cronOption`),testId:`cron-schedule-kind-cron`}],o=ur(t);return k({title:l(`cron.detail.scheduleSection`)},w`
      ${Nt({title:l(`cron.form.repeat`),description:n?l(`cron.form.onExitHelp`):void 0,stacked:!0,control:gn({value:t.scheduleKind,options:a,ariaLabel:l(`cron.form.repeat`),onChange:n=>e.onFormChange({scheduleKind:n,...n===`at`&&(t.scheduleKind===`every`||t.scheduleKind===`cron`)?{deleteAfterRun:!0}:n===`every`||n===`cron`?{deleteAfterRun:!1}:{}})})})}
      ${t.scheduleKind===`at`?G(e,`scheduleAt`,{label:l(`cron.form.runAt`),required:!0,errorKey:`scheduleAt`,type:`datetime-local`}):b}
      ${t.scheduleKind===`every`?U({label:l(`cron.form.every`),controlId:`cron-every-amount`,required:!0,error:e.fieldErrors.everyAmount,errorId:V(`everyAmount`),control:w`
                <div class="cron-inline-controls">
                  ${W(e,`everyAmount`,{label:l(`cron.form.every`),required:!0,errorKey:`everyAmount`,placeholder:l(`cron.form.everyAmountPlaceholder`)})}
                  ${K(e,`everyUnit`,{label:l(`cron.form.unit`),standalone:!0,options:[{value:`seconds`,label:l(`cron.form.seconds`)},{value:`minutes`,label:l(`cron.form.minutes`)},{value:`hours`,label:l(`cron.form.hours`)},{value:`days`,label:l(`cron.form.days`)}]})}
                </div>
              `}):b}
      ${t.scheduleKind===`cron`?w`
              ${G(e,`cronExpr`,{label:l(`cron.form.expression`),required:!0,errorKey:`cronExpr`,mono:!0,placeholder:l(`cron.form.expressionPlaceholder`)})}
              ${G(e,`cronTz`,{label:l(`cron.form.timezoneOptional`),help:l(`cron.form.timezoneHelp`),list:`cron-tz-suggestions`,placeholder:l(`cron.form.timezonePlaceholder`)})}
            `:b}
      ${o?w` <div class="cron-schedule-summary">${T(`clock`)}<span>${o}</span></div> `:b}
    `)}function fr(e,t){let n=In(e);return k({title:l(`cron.detail.deliverySection`)},w`
      ${q(e,`deliveryMode`,{label:l(`cron.form.deliveryModeLabel`),help:l(`cron.form.deliveryHelp`),value:t.selectedDeliveryMode,options:[...t.supportsAnnounce?[{value:`announce`,label:l(`cron.form.announceDefault`)}]:[],{value:`webhook`,label:l(`cron.form.webhookPost`)},{value:`none`,label:l(`cron.form.noneInternal`)}]})}
      ${t.selectedDeliveryMode===`announce`?w`
              ${q(e,`deliveryChannel`,{label:l(`cron.form.channel`),help:l(`cron.form.channelHelp`),value:e.form.deliveryChannel||`last`,options:n,channel:!0})}
              ${G(e,`deliveryTo`,{label:l(`cron.form.to`),help:l(`cron.form.toHelp`),list:`cron-delivery-to-suggestions`,placeholder:l(`cron.form.toPlaceholder`)})}
            `:b}
      ${t.selectedDeliveryMode===`webhook`?G(e,`deliveryTo`,{label:l(`cron.form.webhookUrl`),required:!0,help:l(`cron.form.webhookHelp`),errorKey:`deliveryTo`,list:`cron-delivery-to-suggestions`,placeholder:l(`cron.form.webhookPlaceholder`)}):b}
    `)}function pr(e,t){let n=e.form.scheduleKind===`cron`,r=In(e);return w`
    <section class="settings-section">
      <details class="cron-advanced">
        <summary class="settings-section__heading cron-advanced__summary">
          ${l(`cron.form.advanced`)}
          ${e.form.triggerEnabled?w`<span class="cron-trigger-summary">
                  ${T(`gitBranch`)} ${l(`cron.form.triggerConfigured`)}
                </span>`:b}
        </summary>
        <p class="settings-section__desc">${l(`cron.form.advancedHelp`)}</p>
        <div class="settings-group">
          ${mr(e)}
          ${G(e,`description`,{label:l(`cron.form.description`),placeholder:l(`cron.form.descriptionPlaceholder`)})}
          ${t.mode===`create`?J(e,`enabled`,{label:l(`cron.form.startEnabled`)}):b}
          ${q(e,`wakeMode`,{label:l(`cron.form.wakeMode`),help:l(`cron.form.wakeModeHelp`),options:[{value:`now`,label:l(`cron.form.now`)},{value:`next-heartbeat`,label:l(`cron.form.nextHeartbeat`)}]})}
          ${t.isAgentTurn?G(e,`timeoutSeconds`,{label:l(`cron.form.timeoutSeconds`),help:l(`cron.form.timeoutHelp`),errorKey:`timeoutSeconds`,placeholder:l(`cron.form.timeoutPlaceholder`)}):b}
          ${e.form.scheduleKind===`at`||e.form.scheduleKind===`on-exit`?J(e,`deleteAfterRun`,{label:l(`cron.form.deleteAfterRun`),help:l(`cron.form.deleteAfterRunHelp`)}):b}
          ${J(e,`clearAgent`,{label:l(`cron.form.clearAgentOverride`),help:l(`cron.form.clearAgentHelp`)})}
          ${U({label:l(`cron.form.sessionKey`),controlId:`cron-session-key`,help:l(`cron.form.sessionKeyHelp`),control:w`
              <input
                id="cron-session-key"
                class="settings-input"
                .value=${e.form.sessionKey}
                placeholder="agent:main:main"
                @input=${t=>e.onFormChange({sessionKey:t.target.value})}
              />
            `})}
          ${n?w`
                  ${J(e,`scheduleExact`,{label:l(`cron.form.exactTiming`),help:l(`cron.form.exactTimingHelp`)})}
                  ${U({label:l(`cron.form.staggerWindow`),controlId:`cron-stagger-amount`,error:e.fieldErrors.staggerAmount,errorId:V(`staggerAmount`),control:w`
                      <div class="cron-inline-controls">
                        ${W(e,`staggerAmount`,{label:l(`cron.form.staggerWindow`),disabled:e.form.scheduleExact,errorKey:`staggerAmount`,placeholder:l(`cron.form.staggerPlaceholder`)})}
                        ${K(e,`staggerUnit`,{label:l(`cron.form.staggerUnit`),standalone:!0,disabled:e.form.scheduleExact,options:[{value:`seconds`,label:l(`cron.form.seconds`)},{value:`minutes`,label:l(`cron.form.minutes`)}]})}
                      </div>
                    `})}
                `:b}
          ${t.isAgentTurn?w`
                  ${U({label:l(`cron.form.accountId`),controlId:`cron-delivery-account-id`,help:l(`cron.form.accountIdHelp`),control:w`
                      <input
                        id="cron-delivery-account-id"
                        class="settings-input"
                        .value=${e.form.deliveryAccountId}
                        list="cron-delivery-account-suggestions"
                        ?disabled=${t.selectedDeliveryMode!==`announce`}
                        placeholder="default"
                        @input=${t=>e.onFormChange({deliveryAccountId:t.target.value})}
                      />
                    `})}
                  ${J(e,`payloadLightContext`,{label:l(`cron.form.lightContext`),help:l(`cron.form.lightContextHelp`)})}
                  ${hr(e,r)}
                `:b}
          ${t.selectedDeliveryMode===`none`?b:J(e,`deliveryBestEffort`,{label:l(`cron.form.bestEffortDelivery`),help:l(`cron.form.bestEffortHelp`)})}
        </div>
      </details>
    </section>
  `}function mr(e){let t=e.form.payloadKind===`script`;return!t&&e.status===null?b:e.status?.triggersEnabled!==!0||t?Nt({title:l(`cron.form.conditionTrigger`),description:t?l(`cron.errors.triggerScriptPayloadUnsupported`):e.form.triggerEnabled?l(`cron.form.triggerDisabledConfigured`):l(`cron.form.triggerDisabled`),control:e.form.triggerEnabled?w`<button
            type="button"
            class="btn btn--sm"
            @click=${()=>e.onFormChange({triggerEnabled:!1})}
          >
            ${l(`cron.form.clearTrigger`)}
          </button>`:b}):w`
    ${J(e,`triggerEnabled`,{label:l(`cron.form.conditionTrigger`),help:l(`cron.form.conditionTriggerHelp`)})}
    ${e.form.triggerEnabled?w`
            ${U({label:l(`cron.form.triggerScript`),controlId:`cron-trigger-script`,required:!0,help:l(`cron.form.triggerScriptHelp`),error:e.fieldErrors.triggerScript,errorId:V(`triggerScript`),stacked:!0,wide:!0,control:w`<textarea
                id="cron-trigger-script"
                class="settings-input cron-trigger-script mono"
                rows="8"
                spellcheck="false"
                aria-invalid=${e.fieldErrors.triggerScript?`true`:`false`}
                aria-describedby=${x(e.fieldErrors.triggerScript?V(`triggerScript`):void 0)}
                .value=${e.form.triggerScript}
                @input=${t=>{let n=t.currentTarget;n instanceof HTMLTextAreaElement&&e.onFormChange({triggerScript:n.value})}}
              ></textarea>`})}
            ${J(e,`triggerOnce`,{label:l(`cron.form.triggerOnce`),help:l(`cron.form.triggerOnceHelp`)})}
          `:b}
  `}function hr(e,t){return w`
    ${q(e,`failureAlertMode`,{label:l(`cron.form.failureAlerts`),help:l(`cron.form.failureAlertsHelp`),options:[{value:`inherit`,label:l(`cron.form.failureAlertInherit`)},{value:`disabled`,label:l(`cron.form.failureAlertDisabled`)},{value:`custom`,label:l(`cron.form.failureAlertCustom`)}]})}
    ${e.form.failureAlertMode===`custom`?w`
            ${G(e,`failureAlertAfter`,{label:l(`cron.form.failureAlertAfter`),help:l(`cron.form.failureAlertAfterHelp`),errorKey:`failureAlertAfter`,placeholder:l(`cron.form.failureAlertInherit`)})}
            ${G(e,`failureAlertCooldownSeconds`,{label:l(`cron.form.failureAlertCooldown`),help:l(`cron.form.failureAlertCooldownHelp`),errorKey:`failureAlertCooldownSeconds`,placeholder:l(`cron.form.failureAlertInherit`)})}
            ${q(e,`failureAlertChannel`,{label:l(`cron.form.failureAlertChannel`),value:e.form.failureAlertChannel||`last`,options:t,channel:!0})}
            ${G(e,`failureAlertTo`,{label:l(`cron.form.failureAlertTo`),help:l(`cron.form.failureAlertToHelp`),list:`cron-delivery-to-suggestions`,placeholder:l(`cron.form.failureAlertToPlaceholder`)})}
            ${q(e,`failureAlertDeliveryMode`,{label:l(`cron.form.failureAlertMode`),options:[{value:``,label:l(`cron.form.failureAlertInherit`)},{value:`announce`,label:l(`cron.form.failureAlertAnnounce`)},{value:`webhook`,label:l(`cron.form.failureAlertWebhook`)}]})}
            ${G(e,`failureAlertAccountId`,{label:l(`cron.form.failureAlertAccountId`),placeholder:l(`cron.form.failureAlertAccountPlaceholder`)})}
          `:b}
  `}var gr,_r,vr,yr;function br(){return(br=e((()=>{s(),S(),fe(),_e(),ve(),Me(),Jt(),Wt(),Qt(),be(),kt(),Xt(),It(),Mt(),ke(),Pt(),Ht(),A(),h(),M(),Ge(),m(),ue(),en(),_n(),Sn(),Fn(),j(),gr={name:`cron.form.fieldName`,scheduleAt:`cron.form.runAt`,everyAmount:`cron.form.every`,cronExpr:`cron.form.expression`,staggerAmount:`cron.form.staggerWindow`,triggerScript:`cron.form.triggerScript`,payloadText:`cron.form.assistantTaskPrompt`,payloadModel:`cron.form.model`,payloadThinking:`cron.form.thinking`,timeoutSeconds:`cron.form.timeoutSeconds`,deliveryTo:`cron.form.to`,failureAlertAfter:`cron.form.failureAlertAfter`,failureAlertCooldownSeconds:`cron.form.failureAlertCooldown`},_r=[{value:`all`,labelKey:`cron.tabs.all`},{value:`enabled`,labelKey:`cron.tabs.active`},{value:`disabled`,labelKey:`cron.tabs.paused`}],vr={all:`cron.jobs.all`,at:`cron.form.at`,every:`cron.form.every`,cron:`cron.form.cronOption`,"on-exit":`cron.form.repeatOnExit`,stream:`cron.form.repeatStream`},yr={script:`javascript`,command:`bash`,heartbeat:``,systemEvent:``,agentTurn:``}})))()}var $,xr;function Sr(){return(Sr=e((()=>{c(),S(),pe(),Oe(),Te(),ye(),Ee(),nn(),wt(),A(),Kt(),h(),M(),d(),lt(),st(),m(),Ne(),ee(),Be(),de(),ie(),un(),N(),hn(),br(),j(),$=class extends ne{constructor(...e){super(...e),this.routeSearch=``,this.cron=tt(),this.agentsList=null,this.cronModelSuggestions=[],this.modelSuggestionsError=null,this.listTab=`tasks`,this.detailTab=`settings`,this.heartbeatScratch=``,this.runTranscript=new mn(this,()=>{let e=this.gateway.capture(),t=this.cron;return e?{client:e.client,epoch:this.gateway.epoch,isCurrent:()=>this.gateway.isCurrent(e)&&this.cron===t}:null}),this.pendingRouteData=null,this.routeJobRequested=!1,this.highlightedRunId=null,this.pendingRunScroll=!1,this.modelSuggestionsRequest=null,this.heartbeatScratchRequest=0,this.pageHidden=document.visibilityState===`hidden`,this.gateway=new Le(this,{getGateway:()=>this.context?.gateway,invalidateRequests:e=>this.resetGatewayState(e.snapshot),onSnapshot:e=>{e.initial?this.resetGatewayState(e.snapshot):De(e.snapshot).canAdmin||this.clearHeartbeatScratch()},ensureInitialData:()=>this.ensureInitialData(),onPageActivation:()=>{let e=document.visibilityState===`hidden`,t=this.pageHidden&&!e;this.pageHidden=e,t&&this.ensureInitialData(!0)}}),this.observeAgentScope=Ze(e=>{this.pendingRouteData=null,this.resetGatewayState(this.context.gateway.snapshot),this.cron.cronAgentId=e,this.listTab=`tasks`,this.detailTab=`settings`,this.ensureInitialData(),this.requestUpdate()}),this.subscriptions=new u(this).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t),()=>this.syncAgentsState()).watch(()=>this.context?.channels,(e,t)=>e.subscribe(t)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{this.gateway.gateway===e&&this.context.gateway===e&&this.gateway.connected&&this.gateway.client&&(t.event===`task`&&this.runTranscript.observe(t.payload),t.event===`cron`?this.refreshCron({tableFilters:!0,coalesce:!0}):(t.event===`config.changed`||t.event===`chat.metadata.changed`)&&this.loadModelSuggestions(this.cron))})),this.lastPanelKey=null}get canManageCron(){return De(this.context.gateway.snapshot).canAdmin}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}resetGatewayState(e){this.runTranscript.close(),this.clearHeartbeatScratch(),at(this.cron);let t=e?.phase===`connected`,n=tt({client:e?.client??null,connected:t});n.canRefresh=()=>this.canRefreshCron(n),this.cron=n,n.cronSessionFilter=dn(this.routeSearch).session,this.routeJobRequested=!1,this.pageHidden=document.visibilityState===`hidden`,this.cron.cronAgentId=this.context.agentSelection.state.scopeId,this.agentsList=t?this.context.agents.state.agentsList:null,this.cronModelSuggestions=[],this.modelSuggestionsError=null,this.modelSuggestionsRequest=null}syncAgentsState(){this.agentsList=this.context.agents.state.agentsList}canRefreshCron(e=this.cron){return this.isConnected&&this.cron===e&&document.visibilityState!==`hidden`}ensureInitialData(e=!1){this.canRefreshCron()&&this.cron.connected&&this.cron.client&&(!this.agentsList&&!this.context.agents.state.agentsLoading&&this.context.agents.ensureList(),e||!this.cron.cronStatus&&!this.cron.cronLoading?this.refreshCron({tableFilters:!0,coalesce:!0}):!this.cron.cronRuns.length&&!this.cron.cronRunsLoadingMore&&this.loadRuns(),this.modelSuggestionsRequest?.state!==this.cron&&this.loadModelSuggestions(this.cron))}requestCronUpdate(e=this.cron){this.cron===e&&this.requestUpdate()}willUpdate(e){if(e.has(`routeSearch`)){this.runTranscript.close(),this.cron.cronError=null;let e=dn(this.routeSearch);JSON.stringify(this.cron.cronSessionFilter)!==JSON.stringify(e.session)&&(this.resetGatewayState(this.context.gateway.snapshot),this.ensureInitialData()),this.listTab=`tasks`,this.detailTab=`settings`,this.pendingRouteData=e.jobId||e.session?e:null,this.routeJobRequested=!1,this.highlightedRunId=null,this.pendingRunScroll=!1}}updated(){let e=this.cron.cronEditingJob?.id??null,t=`${e?`job`:this.cron.cronCreateOpen?`create`:`overview`}:${e??``}`;if(t!==this.lastPanelKey){this.lastPanelKey=t,this.detailTab=e&&this.highlightedRunId?`history`:`settings`;let n=this.closest(`.content`);n instanceof HTMLElement&&typeof n.scrollTo==`function`&&n.scrollTo({top:0})}let n=this.pendingRouteData,r=this.cron.client;if(n?.session&&this.cron.cronJobsSnapshotRevision&&!this.cron.cronLoading){this.pendingRouteData=null;let[e]=this.cron.cronJobs;this.cron.cronJobsTotal===1&&e&&this.selectJob(e)}if(n?.jobId&&r&&this.cron.connected&&!this.routeJobRequested&&(this.routeJobRequested=!0,this.runCronTask(async e=>{let t=()=>this.isConnected&&this.cron===e&&this.pendingRouteData===n;try{let e=await r.request(`cron.get`,{id:n.jobId});t()&&this.selectJob(e,n.runId)}catch(n){t()&&(this.pendingRouteData=null,e.cronError=v(n))}})),this.pendingRunScroll){let e=this.querySelector(`.cron-run-entry--highlighted`);e&&(e.scrollIntoView?.({block:`nearest`}),this.pendingRunScroll=!1)}}async refreshCron(e){let t=this.cron;this.canRefreshCron(t)&&t.connected&&t.client&&(this.loadRuns(e.coalesce),this.context.channels.refresh(!1),await Promise.all([this.runCronTask(t=>$e(t,e)),this.runCronTask(t=>O(t,{tableFilters:e.tableFilters}))]))}loadRuns(e=!1){return this.runCronTask(t=>E(t,{coalesce:e}))}async loadModelSuggestions(e){let t=e.client,n=this.context.agentSelection.state.selectedId;if(!t||!e.connected||!n)return;let r={state:e,agentId:n};this.modelSuggestionsRequest=r;let i=()=>this.cron===e&&this.modelSuggestionsRequest===r&&this.context.agentSelection.state.selectedId===n;try{let e=await rt(t,{agentId:n});i()&&(this.cronModelSuggestions=e.models.filter(e=>e.manualSelectionAllowed!==!1).map(e=>e.id),this.modelSuggestionsError=ft(e))}catch(e){i()&&(this.modelSuggestionsError=v(e))}}async runCronTask(e){let t=this.cron;try{let n=e(t);return this.requestCronUpdate(t),await n}finally{this.requestCronUpdate(t)}}runCronAdminTask(e){this.canManageCron&&this.runCronTask(e)}patchForm(e){this.canManageCron&&(this.cron.cronForm=mt({...this.cron.cronForm,...e},e),this.cron.cronFieldErrors=Ie(this.cron.cronForm),this.requestCronUpdate())}selectJob(e,t=null){this.clearHeartbeatScratch(),this.pendingRouteData=null,this.highlightedRunId=t,this.pendingRunScroll=!!t,t&&(this.detailTab=`history`),this.cron.cronCreateOpen=!1,Fe(this.cron,e),this.requestCronUpdate(),e.payload?.kind===`heartbeat`&&this.loadHeartbeatScratch(this.cron,e.id,this.heartbeatScratchRequest),this.runCronTask(async t=>{D(t,{cronRunsScope:`job`}),t.cronRunsJobId=e.id,await E(t)})}clearHeartbeatScratch(){this.heartbeatScratchRequest+=1,this.heartbeatScratch=``}async loadHeartbeatScratch(e,t,n){let r=e.client;if(!this.canManageCron||!r||!e.connected)return;let i=this.gateway.capture();if(!i)return;let a=()=>this.cron===e&&this.heartbeatScratchRequest===n&&this.gateway.isCurrent(i)&&this.canManageCron&&e.cronEditingJob?.id===t&&e.cronForm.payloadKind===`heartbeat`;try{let e=await r.request(`cron.scratch.get`,{id:t});a()&&(this.heartbeatScratch=e.scratch?.content??``)}catch(t){a()&&(e.cronError=v(t),this.requestCronUpdate(e))}}openCreate(e){if(this.canManageCron){if(this.clearHeartbeatScratch(),this.pendingRouteData=null,pt(this.cron,this.context.agentSelection.state.selectedId),this.cron.cronCreateOpen=!0,e){this.patchForm(e);return}this.requestCronUpdate()}}cloneJob(e){this.canManageCron&&(this.clearHeartbeatScratch(),this.pendingRouteData=null,Je(this.cron,e),this.cron.cronCreateOpen=!0,this.requestCronUpdate())}async removeJob(e){let t=this.context,n=this.cron,r=this.gateway.capture(),i=this.canManageCron,a=n.cronEditingJob?.id===e.id?n.cronEditingJob:n.cronJobs.find(t=>t.id===e.id&&t.updatedAtMs===e.updatedAtMs);if(!r||!i||!a)return;let o=a.id,s=a.updatedAtMs,c=a.name,u=await jt({title:l(`cron.actions.removeConfirmTitle`,{name:c}),message:l(`cron.actions.removeConfirmMessage`),confirmLabel:l(`cron.actions.remove`),danger:!0}),d=n.cronEditingJob?.id===o?n.cronEditingJob:n.cronJobs.find(e=>e.id===o);u&&this.context===t&&this.cron===n&&this.gateway.isCurrent(r)&&this.canManageCron&&d&&d.updatedAtMs===s&&await this.runCronTask(async e=>{await _t(e,d),e.cronRunsScope===`job`&&e.cronRunsJobId===null&&(D(e,{cronRunsScope:`all`}),await E(e))})}closePanel(){this.clearHeartbeatScratch(),this.pendingRouteData=null,pt(this.cron,this.context.agentSelection.state.selectedId),this.cron.cronCreateOpen=!1,this.requestCronUpdate(),this.runCronTask(async e=>{D(e,{cronRunsScope:`all`}),e.cronRunsJobId=null,await E(e)})}submitForm(e={}){this.runCronAdminTask(async t=>{let n=!!t.cronEditingJob,r=await ct(t);r.saved&&(n||t.cronEditingJob||(e.runNow&&r.jobId&&await gt(t,r.jobId,`force`),t.cronCreateOpen=!1,t.cronRunsScope===`job`&&(D(t,{cronRunsScope:`all`}),t.cronRunsJobId=null,await E(t))))})}render(){let e=this.context.channels.state,t=ae(this.context),n=cn({channels:e,runtimeConfig:this.context.runtimeConfig.state,cron:this.cron,agentsList:this.agentsList,modelSuggestions:this.cronModelSuggestions}),r=this.canManageCron;return w`
      ${Tt({title:Ae(`cron`),subtitle:this.cron.cronSessionFilter?l(`cron.list.sessionFilter`):Ce(`cron`),actions:this.cron.cronSessionFilter?w`<a
              class="btn"
              href=${we(`cron`,this.context.basePath)}
              @click=${e=>{p(e)&&(e.preventDefault(),this.context.navigate(`cron`,{search:``}))}}
              >${l(`cron.list.showAll`)}</a
            >`:tn({agents:this.agentsList?.agents??[],selection:this.context.agentSelection})})}
      ${this.runTranscript.render()}
      ${Gt(Hn({basePath:this.context.basePath,agentId:t,loading:this.cron.cronLoading,hasLoaded:this.cron.cronJobsSnapshotRevision!==null,listError:this.cron.cronJobsError,canManage:r,status:this.cron.cronStatus,jobs:this.cron.cronJobs,jobsLoadingMore:this.cron.cronJobsLoadingMore,jobsTotal:this.cron.cronJobsTotal,jobsHasMore:this.cron.cronJobsHasMore,jobsQuery:this.cron.cronJobsQuery,jobsEnabledFilter:this.cron.cronJobsEnabledFilter,jobsScheduleKindFilter:this.cron.cronJobsScheduleKindFilter,jobsLastStatusFilter:this.cron.cronJobsLastStatusFilter,jobsTriggerFilter:this.cron.cronJobsTriggerFilter,jobsSortBy:this.cron.cronJobsSortBy,jobsSortDir:this.cron.cronJobsSortDir,editingJob:this.cron.cronEditingJob,createOpen:this.cron.cronCreateOpen,listTab:this.listTab,detailTab:this.detailTab,error:this.cron.cronError??this.cron.cronRunsError??this.modelSuggestionsError,busy:this.cron.cronBusy,form:this.cron.cronForm,heartbeatScratch:r?this.heartbeatScratch:``,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(e=>e.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runs:this.cron.cronRuns,highlightedRunId:this.highlightedRunId,runsTotal:this.cron.cronRunsTotal,runsHasMore:this.cron.cronRunsHasMore,runsLoadingMore:this.cron.cronRunsLoadingMore,runsStatuses:this.cron.cronRunsStatuses,runsDeliveryStatuses:this.cron.cronRunsDeliveryStatuses,runsQuery:this.cron.cronRunsQuery,runsSortDir:this.cron.cronRunsSortDir,fieldErrors:this.cron.cronFieldErrors,canSubmit:!dt(this.cron.cronFieldErrors),agentSuggestions:n.agentSuggestions,modelSuggestions:n.modelSuggestions,thinkingSuggestions:ln,timezoneSuggestions:n.timezoneSuggestions,deliveryToSuggestions:n.deliveryToSuggestions,accountSuggestions:n.accountTargets,onListTabChange:e=>{this.listTab=e},onDetailTabChange:e=>{this.detailTab=e},onFormChange:e=>this.patchForm(e),onRefresh:()=>void this.refreshCron({tableFilters:!0}),onSubmit:()=>this.submitForm(),onSubmitRunNow:()=>this.submitForm({runNow:!0}),onSelectJob:e=>this.selectJob(e),onOpenCreate:e=>this.openCreate(e),onClosePanel:()=>this.closePanel(),onClone:e=>this.cloneJob(e),onToggle:(e,t)=>this.runCronAdminTask(n=>ht(n,e,t)),onRun:(e,t)=>this.runCronAdminTask(n=>gt(n,e.id,t??`force`)),onRemove:e=>void this.removeJob(e),onLoadMoreJobs:()=>void this.runCronTask(e=>O(e,{append:!0,tableFilters:!0})),onJobsFiltersChange:e=>void this.runCronTask(async t=>{Ye(t,e),await O(t,{append:!1,tableFilters:!0})}),onJobsFiltersReset:()=>void this.runCronTask(async e=>{Ye(e,{cronJobsScheduleKindFilter:`all`,cronJobsLastStatusFilter:`all`,cronJobsTriggerFilter:`all`,cronJobsSortBy:`nextRunAtMs`,cronJobsSortDir:`asc`}),await O(e,{append:!1,tableFilters:!0})}),onLoadMoreRuns:()=>void this.runCronTask(e=>ot(e)),onRunsFiltersChange:e=>void this.runCronTask(async t=>{D(t,e),await E(t)}),onViewRunTranscript:e=>void this.runTranscript.open(e)}))}
    `}},n([o({context:Se,subscribe:!0})],$.prototype,`context`,void 0),n([he({attribute:!1})],$.prototype,`routeSearch`,void 0),n([C()],$.prototype,`cron`,void 0),n([C()],$.prototype,`agentsList`,void 0),n([C()],$.prototype,`cronModelSuggestions`,void 0),n([C()],$.prototype,`modelSuggestionsError`,void 0),n([C()],$.prototype,`listTab`,void 0),n([C()],$.prototype,`detailTab`,void 0),n([C()],$.prototype,`heartbeatScratch`,void 0),xr={header:!0,render:e=>w`<openclaw-cron-page
    .routeSearch=${typeof e==`string`?e:``}
  ></openclaw-cron-page>`},customElements.get(`openclaw-cron-page`)||customElements.define(`openclaw-cron-page`,$)})))()}Sr();export{xr as cronPageComponent};
//# sourceMappingURL=cron-page-DUPucRy5.js.map