import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Fi as t,Ha as n,Hn as r,Kr as i,La as a,Li as o,Rr as s,Vi as c,Vn as l,fr as u,ka as d,lr as f,wa as p,zr as ee}from"./control-ui-foundation-DaCuy7E_.js";import{$s as te,Al as m,Bi as h,Bs as ne,F as re,Fl as ie,Gi as ae,I as oe,Il as se,Ir as ce,Jc as le,Js as ue,L as de,Pc as g,Pr as fe,R as pe,Rc as me,Sl as he,Tl as _,Uc as ge,Vs as _e,Xs as ve,Yc as ye,Ys as be,Zs as xe,an as Se,bn as Ce,nl as we,on as Te,qc as Ee,sn as De,un as Oe,vi as ke,wi as Ae,wl as v,xl as je,yn as Me,z as Ne}from"./control-ui-core-CndkyZ8m.js";import{$ as y,H as Pe,Q as b,R as Fe,at as x,c as Ie,dt as S,nt as C,pt as w,s as Le,z as Re}from"./lit-runtime-CIjzngcy.js";import{$r as ze,Di as T,Dn as Be,Ei as E,Er as Ve,On as He,Pn as Ue,Qr as We,Tr as Ge,Wi as Ke,_t as qe,ct as Je,ea as D,fa as Ye,ia as O,mt as Xe,si as Ze,ta as Qe,xi as $e}from"./control-ui-core-C5mtYcym.js";import{T as et,w as tt}from"./control-ui-boot-shared-ChkOvQif.js";import{c as nt,s as rt,u as it}from"./gateway-runtime-BvWNTqPo.js";import{Fi as at,Li as ot,fi as st,fo as ct,go as k,mi as lt,po as ut,vo as dt}from"./control-ui-boot-shared-DlJEsz5Q.js";import{_t as ft,ci as pt,gt as mt,m as ht,nt as gt,p as _t,yt as vt}from"./control-ui-boot-shared-DpHhsTHW.js";import{Cr as yt,Dr as bt,Pn as xt,Tr as St,cr as Ct,jn as wt,lr as Tt}from"./control-ui-boot-shared-6jDbGebE.js";import{n as Et,t as Dt}from"./stream-auto-follow-controller-BZ0UzGsg.js";import{C as Ot}from"./control-ui-boot-new-CQMzhCGu.js";import{n as kt,t as At}from"./settings-workspace-gGOfyDax.js";import{n as jt,t as Mt}from"./agent-row-chip-m2O7L9Wr.js";var Nt,A;function j(){return(j=e((()=>{se(),Nt={activity:{images:{failed:`Image previews are unavailable. Open the session or retry.`,older:`Search older images`,incomplete:`Some images are too large to preview here. Open the session to see them.`},git:{pullRequest:`{repository} pull request #{number}: {title} ({state})`,branchDiff:`{branch}: changes against the default branch, including uncommitted work`,stale:`Git status may be out of date`,open:`Open`,draft:`Draft`,merged:`Merged`,closed:`Closed`},title:`Activity`,visibleCount:`{visible} of {total}`,search:`Search`,searchPlaceholder:`Filter by activity, summary, run, session`,filters:`Filters`,toolFilter:`Tool`,allTools:`All tools`,statusFilters:`Status filters`,autoFollow:`Auto-follow`,expandAll:`Expand all`,collapseAll:`Collapse all`,clear:`Clear`,empty:`No activity yet.`,emptyFiltered:`No activity matches these filters.`,argumentHiddenOne:`1 argument hidden`,argumentsHidden:`{count} arguments hidden`,streamLabel:`Agent activity entries`,toolCallId:`Tool call`,runId:`Run`,session:`Session`,outputTruncated:`Preview redacted and truncated.`,noOutputPreview:`No output preview.`,currentWork:{title:`Active sessions`,loading:`Loading active sessions…`,empty:`No active sessions.`,disconnected:`Connect to the Gateway to load active sessions.`,loadFailed:`Could not load active sessions.`,queued:`Queued`,limit:`Showing {count} of {total} active sessions.`},answerCandidate:{title:`Answer candidate`,itemId:`Item`,candidate:`Candidate answer`,superseded:`Superseded answer`,selected:`Selected answer`},status:{running:`Running`,done:`Done`,error:`Error`},runInspector:{activityView:`Activity view`,liveMode:`Live activity`,mode:`Run inspector`,intro:`Durable Gateway-backed identity evidence for one run. Reloading this page queries the Gateway again.`,bestEffortWarning:`Best-effort audit warning: this view is for operational diagnostics, not a lossless compliance record. Absence of evidence does not prove that an action or run did not occur.`,evidenceStateLabel:`Evidence state: {state}`,evidenceState:{present:`Present`,absent:`Absent`,unknown:`Unknown`,unsupported:`Unsupported`},coverageStatusLabel:`Inspection coverage: {state}`,coverage:{enforced:{label:`Enforced`,description:`A decision receipt proves identity-aware evaluation; it does not by itself mean the action was allowed.`},attributionOnly:{label:`Attribution only`,description:`Identity facts were recorded, but no identity-aware policy or grant evaluation is proven.`},unattributed:{label:`Unattributed`,description:`The supported path was observed without a usable invoker principal.`},unknown:{label:`Unknown`,description:`Expected evidence is missing, corrupt, expired unexpectedly, or unreadable.`},unsupported:{label:`Unsupported`,description:`This path has no Phase 0 identity evidence contract.`}},facts:{trustDomain:`Trust domain`,ingress:`Ingress`,invoker:`Invoker`,representedSubject:`Represented subject`,sponsor:`Sponsor`,agentPrincipal:`Agent principal`,agentDefinition:`Agent definition`,runtimeInstance:`Runtime instance`,applicableGrants:`Applicable grants`,applicableGrant:`Applicable grant {index}`,assuranceEvidence:`Assurance evidence`,assuranceEvidenceItem:`Assurance evidence {index}`,lineage:`Lineage`},values:{label:`Label`,kind:`Kind`,operation:`Operation`,principalReference:`Principal reference`,domainReference:`Domain reference`,owningBoundary:`Owning boundary`,sourceReference:`Source reference`,relationshipReference:`Relationship reference`,definitionReference:`Definition reference`,revisionReference:`Revision reference`,runtimeReference:`Runtime reference`,grantReference:`Grant reference`,strength:`Strength`,evidenceReference:`Evidence reference`,depth:`Depth`,parentRunReference:`Parent run reference`,parentExecutionReference:`Parent execution reference`,parentContextReference:`Parent context reference`,delegationReference:`Delegation reference`},reasons:{absent:`No {label} was recorded at the owning boundary.`,unknown:`The {label} was expected, but its evidence is unavailable or unreadable.`,unsupported:`This execution path does not provide {label} evidence.`,invokerAbsent:`The supported ingress boundary recorded no usable invoker principal.`,noGrants:`No applicable grants were recorded for this run.`,noAssurance:`No assurance evidence was recorded for this run.`,noLineage:`No parent or subagent lineage was recorded for this run.`},identityHeading:`Identity and authority`,missingEvidenceHeading:`Missing evidence`,noMissingEvidence:`No missing evidence was reported for this projection.`,nextStepsHeading:`Next steps`,decisions:{heading:`Decision receipts`,none:`No decision receipts were returned for this bounded page.`,returned:`Showing {count} retained decision receipts.`,listLabel:`Decision receipt list`,inspectLabel:`{summary}. Outcome: {outcome}. Evidence classification: {classification}.`,detailHeading:`Receipt detail`,requestedHeading:`What was requested`,outcomeHeading:`What happened`,outcomeLabel:`Outcome`,classificationLabel:`Evidence classification`,reasonLabel:`Recorded reason`,occurredAtLabel:`Recorded at`,ownerHeading:`Display provenance`,durableOwnerLabel:`Verified producer`,boundaryLabel:`Decision boundary`,ownerNote:`The Gateway exposes explanations only from a verified owning call path. Receipt-controlled explanations and next steps are hidden; the Control UI does not infer trust from receipt metadata.`,evidenceHeading:`Evidence limits`,contextFieldsLabel:`Context fields used`,noContextFields:`No context fields were recorded as used.`,policyCountLabel:`Policy references used`,grantCountLabel:`Grant references used`,notFoundTitle:`Receipt not found on this page`,notFoundDescription:`The selected receipt is not present in this retained page. Return to the first page or use a current receipt link.`,readOnly:`Decision receipts are read-only. This view cannot approve, edit, or repeat an action.`,more:`Additional decision receipts are available.`,loadMore:`Load more receipts`,loadingMore:`Loading receipts…`,loadMoreError:`More receipts could not be loaded. The receipts already shown remain unchanged.`,bounded:`Decision inspection is bounded to at most 50 records per request.`,outcomes:{allowed:`Allowed`,denied:`Denied`,notApplicable:`Not applicable`,unknown:`Unknown`}},diagnosticReason:`Diagnostic reason:`,diagnostic:{notFound:{title:`Run not found`,description:`No retained run or identity record matched this reference. Missing best-effort evidence does not prove that the run never occurred.`},expired:{title:`Identity evidence expired`,description:`The Gateway found the run, but its identity context is outside the 30-day retention window.`},corrupt:{title:`Identity evidence is corrupt`,description:`The Gateway found evidence for this run but could not validate the stored identity context.`},ambiguous:{title:`Multiple executions match this run`,description:`A run reference can correlate more than one execution. The inspector will not guess which execution you meant.`},unsupported:{title:`Identity evidence unsupported`,description:`The run is known, but this execution path did not retain a supported identity context.`},unknown:{title:`Identity evidence unknown`,description:`The path promises evidence, but the expected record is missing, unreadable, or otherwise unavailable.`}},candidates:{listLabel:`Matching executions`,recorded:`Recorded {date}`,executionReference:`Inspect execution`,more:`More matching executions exist beyond this bounded page.`,loadMore:`Load more executions`,loadingMore:`Loading executions…`,loadMoreError:`More executions could not be loaded. Try again.`},panels:{empty:{title:`No run selected`,description:`Open a link shaped like /activity?view=run&run=<run-id> to inspect durable identity evidence.`},waiting:{title:`Waiting for the Gateway`,description:`The durable projection will load when this browser reconnects.`},loading:{title:`Loading run inspection`,description:`Reading the Gateway's retained identity projection…`},disconnected:{title:`Gateway disconnected`,description:`Run identity is durable on the Gateway, but it cannot be read while this browser is disconnected.`},unauthorized:{title:`Operator read access required`,description:`This connection does not have operator.read, so retained run identity cannot be loaded.`},unsupported:{title:`Run inspection unsupported`,description:`This Gateway does not offer audit.run.inspect. Upgrade the Gateway, enable execution identity collection, and record a new run.`},error:{title:`Run inspection failed`,description:`The Gateway could not return this diagnostic projection. No identity facts were inferred from Live activity.`}},restart:`Restart inspection`,retry:`Retry inspection`}}},A=Object.assign(()=>{ie.activity=Nt.activity},{catalog:Nt})})))()}function M(e){let t=le({},e.key,e.agentId??void 0),n=e.agentId??t.agentId;return JSON.stringify([n?p(n):null,t.sessionKey,e.sessionId??null])}function Pt(e){let t=Ae(e);return!t?.sessionId||t.hasActiveRun===null&&t.activeRunIds===void 0&&t.status===null&&t.reason!==`delete`?null:{key:t.key,agentId:t.agentId,sessionId:t.sessionId,runId:t.runId,reason:t.reason,updatedAt:t.updatedAt,hasActiveRun:t.hasActiveRun,activeRunIds:t.activeRunIds,status:t.status}}function Ft(e,t){let n=new Map(e.sessions.map(e=>[M(e),{row:e,requiresRefresh:!1}])),r=new Set;for(let e of t){let t=M(e),i=n.get(t),a=e.status===`running`||e.status===`queued`?e.status:void 0,o=e.hasActiveRun===!0||e.hasActiveRun!==!1&&a!==void 0;if(!i){o?r.add(t):(e.hasActiveRun===!1||e.reason===`delete`)&&r.delete(t);continue}let{row:s}=i;if(e.updatedAt!==null&&(s.updatedAt??0)>e.updatedAt)continue;let c={...s,updatedAt:e.updatedAt??s.updatedAt};if(e.reason===`delete`)c.hasActiveRun=!1,c.activeRunIds=[];else if(o)c.hasActiveRun=!0,c.status=a??(s.status===`queued`?`queued`:`running`),e.activeRunIds===void 0?e.runId&&!s.activeRunIds?.includes(e.runId)&&(c.activeRunIds=void 0):c.activeRunIds=e.activeRunIds??void 0;else{let t=e.hasActiveRun===!1||e.status!==null;if(t&&s.hasActiveRun===!0&&e.runId&&!s.activeRunIds?.includes(e.runId)){i.requiresRefresh=!0;continue}if(e.hasActiveRun===!1&&(e.activeRunIds!==void 0||!e.runId)||e.activeRunIds?.length===0)c.hasActiveRun=!1,c.activeRunIds=[];else if(t){let t=e.activeRunIds??s.activeRunIds;if(!e.runId||!t?.includes(e.runId)){i.requiresRefresh=s.hasActiveRun===!0;continue}c.activeRunIds=t.filter(t=>t!==e.runId),c.hasActiveRun=c.activeRunIds.length>0}else e.activeRunIds!==void 0&&(c.activeRunIds=e.activeRunIds??void 0)}i.row=c,i.requiresRefresh=!1}let i=[...n.values()].filter(({row:e})=>e.hasActiveRun===!0),a=i.map(({row:e})=>e),o=!i.some(e=>e.requiresRefresh),s=!o||!e.hasMore&&r.size>0;return{result:{...e,count:a.length,sessions:a},requiresRefresh:s,canPublish:o}}function It(){return(It=e((()=>{ke(),g()})))()}function Lt(e,t){let n=C`<span class="activity-current-work__copy">
      <span class="activity-current-work__title">${ae(t.key,t)}</span>
      <span class="activity-current-work__agent"
        >${t.agentId?m(`activityFeed.agentLabel`,{value:t.agentId}):t.key}</span
      >
    </span>
    ${ft({kind:`warn`,label:t.status===`queued`?m(`activity.currentWork.queued`):m(`activity.status.running`)})}`;if(!be(t.key,e.globalScope))return C`<div
      class="activity-current-work__row"
      data-session-key=${t.key}
      data-agent-id=${t.agentId??y}
    >
      ${n}
    </div>`;let r=xe(t),i=te({face:r,sessionKey:t.key,basePath:e.basePath,fallbackAgentId:t.agentId??e.fallbackAgentId,mainKey:e.mainKey,row:t});return C`<a
    class="activity-current-work__row"
    data-session-key=${t.key}
    data-agent-id=${t.agentId??y}
    href=${i.href}
    @click=${t=>{re(t)&&(t.preventDefault(),e.navigate(r,i.options))}}
  >
    ${n}
  </a>`}function Rt(e){let t=e.connected&&!e.error?e.result?.sessions??[]:[],n=e.connected?e.error?m(`activity.currentWork.loadFailed`):!e.result||t.length===0&&e.incomplete?m(`activity.currentWork.loading`):t.length===0?m(`activity.currentWork.empty`):null:m(`activity.currentWork.disconnected`);return C`<section
    class="activity-current-work"
    aria-label=${m(`activity.currentWork.title`)}
    aria-busy=${e.loading}
  >
    <div class="settings-section__header">
      <h2 class="settings-section__heading">${m(`activity.currentWork.title`)}</h2>
    </div>
    <div class="settings-group activity-current-work__rows">
      ${n?C`<div class="activity-current-work__feedback" role="status">
              <span>${n}</span>
              ${e.error?C`<button type="button" class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRetry}>${m(`common.retry`)}</button>`:y}
            </div>`:Ie(t,M,t=>Lt(e,t))}
      ${e.result?.hasMore&&!n?C`<div class="activity-current-work__feedback">${m(`activity.currentWork.limit`,{count:String(t.length),total:String(e.result.totalCount??t.length)})}</div>`:y}
    </div>
  </section>`}function zt(){return(zt=e((()=>{b(),Le(),gt(),_(),j(),h(),ue(),It(),A()})))()}function N(e){let t=f(e.lastActivityAt),n=f(e.lastInteractionAt);return t!==void 0||n!==void 0?Math.max(t??0,n??0):f(e.updatedAt)??f(e.createdAt)??0}function Bt(){return(Bt=e((()=>{u()})))()}function Vt(e){return e===`24h`||e===`7d`||e===`30d`||e===`all`}function P(e){return e?.trim()||void 0}function Ht(e,t){let n=new URLSearchParams(e),r=n.get(`time`);return{personId:t??P(n.get(`person`))??null,query:n.get(`q`)?.trim()??``,time:Vt(r)?r:Qt}}function Ut(e,t=``,n){let r=new URLSearchParams;e.time!==Qt&&r.set(`time`,e.time),e.query&&r.set(`q`,e.query);let i=r.toString(),a=i?`?${i}`:``;return{pathname:e.personId?Qe(e.personId,t,n).pathname:Ye(`activity`,t),search:a}}function Wt(e,t,n,r){let i=new URLSearchParams(e.search),a=D(e.pathname,r),o=(a??i.get(`person`))?.replaceAll(`-`,``),s=o&&/^[0-9a-f]{8,32}$/.test(o)&&t.replaceAll(`-`,``).startsWith(o)?o.length:32,c=a&&!n?e.pathname:Qe(t,r,n,s).pathname;i.delete(Ke);let l=i.toString(),u=l?`?${l}`:``;return c===e.pathname&&u===e.search?null:{pathname:c,search:u,hash:e.hash}}function Gt(e,t){return N(t)-N(e)||(e.key<t.key?-1:+(e.key>t.key))}function Kt(e){let t=e.owner?.actor??e.createdActor,n=P(e.agentId),{resourceBasePath:r}=pe();return{id:P(t?.id)??n??`system`,name:P(t?.label)??n,avatarUrl:t?P(t.avatarUrl):n?tt(`agentAvatar`,r,n):void 0,watchedSessions:[]}}function qt(e){let t=new Date(e),n=String(t.getMonth()+1).padStart(2,`0`),r=String(t.getDate()).padStart(2,`0`);return`${t.getFullYear()}-${n}-${r}`}function Jt(e){let t=new Date(e);return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()}function Yt(e){let t=e?.sessions??[],n=(e?.people??[]).map(e=>({id:e.identity.id,name:e.label,avatarUrl:e.avatarUrl,watchedSessions:[],count:e.sessionCount})),r=new Map;for(let e of t){let t=N(e),n=t>0?qt(t):`unknown`,i=r.get(n);i?i.push(e):r.set(n,[e])}return{days:[...r.entries()].map(([e,t])=>({key:e,timestamp:e===`unknown`?null:Jt(N(t[0])),sessions:t})),matchedCount:e?.totalCount??t.length,people:n,sessions:t,timeCount:e?.peopleSessionCount??t.length}}function Xt(e,t){let n=new Set(e.watchedSessions);return t.filter(e=>n.has(e.key)).toSorted(Gt)}var Zt,Qt;function F(){return(F=e((()=>{et(),Bt(),O(),de(),Zt=[`24h`,`7d`,`30d`,`all`],Qt=`7d`})))()}function $t(e,t){let n=`?view=run&${e.kind}=${encodeURIComponent(e.id)}`;return t&&(n+=`&receipt=${encodeURIComponent(t.id)}`,t.decisionCursor&&(n+=`&decision=${encodeURIComponent(t.decisionCursor)}`)),n}function I(e,t,n){return`${Ye(`activity`,t)}${$t(e,n)}`}function en(e,t){return I({kind:`run`,id:e},t)}function tn(e,t){let n=new URLSearchParams(e);if(n.get(`view`)===`live`)return{mode:`live`,selector:null};if(n.get(`view`)!==`run`)return{mode:`sessions`,filters:Ht(e,t),selector:null};let r=n.get(`execution`),i=n.get(`receipt`)?.trim()||null,a=i&&n.get(`decision`)?.trim()||null;if(r?.trim())return{mode:`run`,selector:{kind:`execution`,id:r},selectorId:i,decisionCursor:a};let o=n.get(`run`);return{mode:`run`,selector:o?.trim()?{kind:`run`,id:o}:null,selectorId:i,decisionCursor:a}}function nn(e,t){return new Map(e.map(e=>[e.selectorId,t]))}function rn(e,t){if(e.identity.state!==`present`||t.identity.state!==`present`||e.run.executionId!==t.run.executionId||e.identity.context.contextId!==t.identity.context.contextId)return null;let n=new Map(e.decisionDisplays.map(e=>[e.selectorId,e]));for(let e of t.decisionDisplays)n.set(e.selectorId,e);return{...t,decisionDisplays:[...n.values()]}}function an(e){let t=e.identity;return t.state===`present`?`present`:t.state===`ambiguous`?`ambiguous`:t.reasonCode===`run_not_found`||t.reasonCode===`execution_not_found`?`not-found`:t.reasonCode===`identity_context_corrupt`?`corrupt`:t.state===`unsupported`&&t.remediation.some(e=>e.code===`run_again_after_expiry`)?`expired`:t.state}function L(){return(L=e((()=>{O(),F()})))()}function on(e){return e===`attribution-only`?`attributionOnly`:e}function R(e){return m(`activity.runInspector.coverage.${on(e)}.label`)}function z(e,t=!1,n){let r=C`<bdi
    class=${t?`run-inspector__ref mono`:`run-inspector__ref`}
    dir="ltr"
    >${e}</bdi
  >`;return n?C`<a href=${n}>${r}</a>`:r}function sn(e,t,n){return n===6?C`<h6 id=${t}>${e}</h6>`:C`<h3 id=${t}>${e}</h3>`}function cn(e,t={}){let n=t.headingId??`run-inspector-missing-heading`;return C`
    <section class="run-inspector__section" aria-labelledby=${n}>
      ${sn(m(`activity.runInspector.missingEvidenceHeading`),n,t.headingLevel??3)}
      ${e.length===0?C`<p>${m(`activity.runInspector.noMissingEvidence`)}</p>`:C`<ul class="run-inspector__code-list">
              ${e.map(e=>C`<li>${z(e,!0)}</li>`)}
            </ul>`}
    </section>
  `}function ln(e,t={}){if(e.length===0)return y;let n=t.headingId??`run-inspector-remediation-heading`;return C`
    <section class="run-inspector__section" aria-labelledby=${n}>
      ${sn(m(`activity.runInspector.nextStepsHeading`),n,t.headingLevel??3)}
      <ul class="run-inspector__remediation-list">
        ${e.map(e=>C`<li>
            <span>${e.text}</span> ${z(e.code,!0)}
          </li>`)}
      </ul>
    </section>
  `}function un(e,t,n,r){return I(e,r,{id:t,decisionCursor:n})}function B(e){return m(`activity.runInspector.decisions.outcomes.${e===`not-applicable`?`notApplicable`:e}`)}function dn(e,t){return e.length===0?C`<p class="run-inspector__reason">${t}</p>`:C`<ul class="run-inspector__code-list">
        ${e.map(e=>C`<li>${z(e,!0)}</li>`)}
      </ul>`}function fn(e){let t=e.enforcement.coverageState;return C`
    <article class="run-inspector__receipt-detail" aria-labelledby="run-inspector-receipt-detail">
      <h4 id="run-inspector-receipt-detail">
        ${m(`activity.runInspector.decisions.detailHeading`)}
      </h4>
      <section aria-labelledby="run-inspector-receipt-requested">
        <h5 id="run-inspector-receipt-requested">
          ${m(`activity.runInspector.decisions.requestedHeading`)}
        </h5>
        ${e.action.summary?C`<p>${e.action.summary}</p>`:y}
        <dl class="run-inspector__values">
          <div>
            <dt>${m(`activity.runInspector.values.kind`)}</dt>
            <dd>${z(e.action.family)}</dd>
          </div>
          <div>
            <dt>${m(`activity.runInspector.values.operation`)}</dt>
            <dd>${z(e.action.operation)}</dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby="run-inspector-receipt-outcome">
        <h5 id="run-inspector-receipt-outcome">
          ${m(`activity.runInspector.decisions.outcomeHeading`)}
        </h5>
        <div class="run-inspector__receipt-badges">
          <span
            class="run-inspector__receipt-badge run-inspector__receipt-badge--${e.decision.outcome}"
            aria-label=${`${m(`activity.runInspector.decisions.outcomeLabel`)}: ${B(e.decision.outcome)}`}
          >
            ${B(e.decision.outcome)}
          </span>
          <span
            class="run-inspector__receipt-badge run-inspector__receipt-badge--${t}"
            aria-label=${`${m(`activity.runInspector.decisions.classificationLabel`)}: ${R(t)}`}
          >
            ${R(t)}
          </span>
        </div>
        <p class="run-inspector__reason">
          ${m(`activity.runInspector.coverage.${on(t)}.description`)}
        </p>
        <dl class="run-inspector__values">
          <div>
            <dt>${m(`activity.runInspector.decisions.reasonLabel`)}</dt>
            <dd>${z(e.decision.reasonCode,!0)}</dd>
          </div>
          <div>
            <dt>${m(`activity.runInspector.decisions.occurredAtLabel`)}</dt>
            <dd>${new Date(e.occurredAt).toLocaleString()}</dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby="run-inspector-receipt-owner">
        <h5 id="run-inspector-receipt-owner">
          ${m(`activity.runInspector.decisions.ownerHeading`)}
        </h5>
        ${e.provenance.state===`verified`?C`<dl class="run-inspector__values">
                  <div>
                    <dt>${m(`activity.runInspector.decisions.durableOwnerLabel`)}</dt>
                    <dd>${z(e.provenance.producer)}</dd>
                  </div>
                </dl>
                <p class="run-inspector__reason">
                  ${m(`activity.runInspector.decisions.ownerNote`)}
                </p>`:C`<p class="run-inspector__reason">
                ${m(`activity.runInspector.decisions.ownerNote`)}
              </p>`}
      </section>
      <section aria-labelledby="run-inspector-receipt-evidence">
        <h5 id="run-inspector-receipt-evidence">
          ${m(`activity.runInspector.decisions.evidenceHeading`)}
        </h5>
        <dl class="run-inspector__values">
          <div>
            <dt>${m(`activity.runInspector.decisions.policyCountLabel`)}</dt>
            <dd>${e.enforcement.policyCount}</dd>
          </div>
          <div>
            <dt>${m(`activity.runInspector.decisions.grantCountLabel`)}</dt>
            <dd>${e.enforcement.grantCount}</dd>
          </div>
        </dl>
        <h6>${m(`activity.runInspector.decisions.contextFieldsLabel`)}</h6>
        ${dn(e.enforcement.contextFieldsUsed,m(`activity.runInspector.decisions.noContextFields`))}
        ${cn(e.missingEvidence,{headingId:`run-inspector-receipt-missing-heading`,headingLevel:6})}
      </section>
      ${ln(e.remediation,{headingId:`run-inspector-receipt-remediation-heading`,headingLevel:6})}
    </article>
  `}function pn(e,t,n,r,i){let a=e.result,o=n?a.decisionDisplays.find(e=>e.selectorId===n):a.decisionDisplays[0];return C`
    <section class="run-inspector__section" aria-labelledby="run-inspector-decisions-heading">
      <h3 id="run-inspector-decisions-heading">${m(`activity.runInspector.decisions.heading`)}</h3>
      ${a.decisionDisplays.length===0?C`<p>${m(`activity.runInspector.decisions.none`)}</p>`:C`<p>
              ${m(`activity.runInspector.decisions.returned`,{count:String(a.decisionDisplays.length)})}
            </p>`}
      <div class="run-inspector__warning" role="note">
        ${m(`activity.runInspector.decisions.readOnly`)}
      </div>
      ${a.decisionDisplays.length>0&&t?C`<ol
              class="run-inspector__receipt-list"
              aria-label=${m(`activity.runInspector.decisions.listLabel`)}
            >
              ${a.decisionDisplays.map(n=>{let i=o?.selectorId===n.selectorId;return C`<li>
                  <a
                    href=${un(t,n.selectorId,e.receiptPageCursors.get(n.selectorId),r)}
                    aria-current=${i?`true`:y}
                    aria-label=${m(`activity.runInspector.decisions.inspectLabel`,{summary:n.action.summary??`${n.action.family} · ${n.action.operation}`,outcome:B(n.decision.outcome),classification:R(n.enforcement.coverageState)})}
                  >
                    <span
                      >${n.action.summary??`${n.action.family} · ${n.action.operation}`}</span
                    >
                    <span class="run-inspector__receipt-badges" aria-hidden="true">
                      <span
                        class="run-inspector__receipt-badge run-inspector__receipt-badge--${n.decision.outcome}"
                        >${B(n.decision.outcome)}</span
                      >
                      <span
                        class="run-inspector__receipt-badge run-inspector__receipt-badge--${n.enforcement.coverageState}"
                        >${R(n.enforcement.coverageState)}</span
                      >
                    </span>
                  </a>
                </li>`})}
            </ol>`:y}
      ${a.nextDecisionCursor?C`<div class="run-inspector__pagination">
              <span>${m(`activity.runInspector.decisions.more`)}</span>
              <button
                type="button"
                class="btn"
                ?disabled=${e.decisionPageStatus===`loading`}
                @click=${i}
              >
                ${e.decisionPageStatus===`loading`?m(`activity.runInspector.decisions.loadingMore`):m(`activity.runInspector.decisions.loadMore`)}
              </button>
              ${e.decisionPageStatus===`error`?C`<span role="alert">
                      ${m(`activity.runInspector.decisions.loadMoreError`)}
                    </span>`:y}
            </div>`:C`<div class="run-inspector__pagination" role="note">
              ${m(`activity.runInspector.decisions.bounded`)}
            </div>`}
      ${n&&!o?C`<div class="run-inspector__result-state" role="status">
              <h4>${m(`activity.runInspector.decisions.notFoundTitle`)}</h4>
              <p>${m(`activity.runInspector.decisions.notFoundDescription`)}</p>
              ${t?C`<a href=${I(t,r)}>
                      ${m(`activity.runInspector.decisions.heading`)}
                    </a>`:y}
            </div>`:o?fn(o):y}
    </section>
  `}function mn(){return(mn=e((()=>{b(),_(),L()})))()}function hn(e){return m(`activity.runInspector.evidenceState.${e}`)}function gn(e,t){switch(t){case`absent`:return m(`activity.runInspector.reasons.absent`,{label:e.toLowerCase()});case`unknown`:return m(`activity.runInspector.reasons.unknown`,{label:e.toLowerCase()});case`unsupported`:return m(`activity.runInspector.reasons.unsupported`,{label:e.toLowerCase()});case`present`:return}return t}function V(e){return e?[...e.displayLabel?[{label:m(`activity.runInspector.values.label`),value:e.displayLabel}]:[],{label:m(`activity.runInspector.values.kind`),value:e.kind},{label:m(`activity.runInspector.values.principalReference`),value:e.principalRef,mono:!0},{label:m(`activity.runInspector.values.domainReference`),value:e.domainRef,mono:!0}]:[]}function _n(e){let t=e.values??[],n=e.reason??gn(e.label,e.state);return C`
    <div class="run-inspector__fact" data-state=${e.state}>
      <dt>
        <span>${e.label}</span>
        <span
          class="run-inspector__state run-inspector__state--${e.state}"
          aria-label=${m(`activity.runInspector.evidenceStateLabel`,{state:hn(e.state)})}
        >
          ${hn(e.state)}
        </span>
      </dt>
      <dd>
        ${t.length>0?C`<dl class="run-inspector__values">
                ${t.map(e=>C`
                    <div>
                      <dt>${e.label}</dt>
                      <dd>${z(e.value,e.mono,e.href)}</dd>
                    </div>
                  `)}
              </dl>`:y}
        ${n?C`<p class="run-inspector__reason">${n}</p>`:y}
      </dd>
    </div>
  `}function vn(e,t){let n=e.representedSubject,r=e.sponsor,i=e.lineage;return[{label:m(`activity.runInspector.facts.trustDomain`),state:e.trustDomain.state,values:[{label:m(`activity.runInspector.values.kind`),value:e.trustDomain.kind},{label:m(`activity.runInspector.values.domainReference`),value:e.trustDomain.domainRef,mono:!0}]},{label:m(`activity.runInspector.facts.ingress`),state:e.ingress.state,values:[{label:m(`activity.runInspector.values.kind`),value:e.ingress.kind},{label:m(`activity.runInspector.values.owningBoundary`),value:e.ingress.boundary,mono:!0},...e.ingress.sourceRef?[{label:m(`activity.runInspector.values.sourceReference`),value:e.ingress.sourceRef,mono:!0}]:[]]},{label:m(`activity.runInspector.facts.invoker`),state:e.invoker.state,values:V(e.invoker.principal),reason:e.invoker.state===`absent`?m(`activity.runInspector.reasons.invokerAbsent`):void 0},{label:m(`activity.runInspector.facts.representedSubject`),state:n?.state??`absent`,values:V(n?.principal)},{label:m(`activity.runInspector.facts.sponsor`),state:r?.state??`absent`,values:[...V(r?.principal),...r?.relationshipRef?[{label:m(`activity.runInspector.values.relationshipReference`),value:r.relationshipRef,mono:!0}]:[]]},{label:m(`activity.runInspector.facts.agentDefinition`),state:e.agentDefinition.state,values:[{label:m(`activity.runInspector.values.definitionReference`),value:e.agentDefinition.definitionRef,mono:!0},...e.agentDefinition.revisionRef?[{label:m(`activity.runInspector.values.revisionReference`),value:e.agentDefinition.revisionRef,mono:!0}]:[]]},{label:m(`activity.runInspector.facts.agentPrincipal`),state:`present`,values:V(e.agentPrincipal)},{label:m(`activity.runInspector.facts.runtimeInstance`),state:e.runtimeInstance.state,values:[{label:m(`activity.runInspector.values.kind`),value:e.runtimeInstance.kind},{label:m(`activity.runInspector.values.runtimeReference`),value:e.runtimeInstance.runtimeRef,mono:!0}]},...e.applicableGrants.length===0?[{label:m(`activity.runInspector.facts.applicableGrants`),state:`absent`,reason:m(`activity.runInspector.reasons.noGrants`)}]:e.applicableGrants.map((e,t)=>({label:m(`activity.runInspector.facts.applicableGrant`,{index:String(t+1)}),state:e.state,values:[{label:m(`activity.runInspector.values.grantReference`),value:e.grantRef,mono:!0}]})),...e.assurance.length===0?[{label:m(`activity.runInspector.facts.assuranceEvidence`),state:`absent`,reason:m(`activity.runInspector.reasons.noAssurance`)}]:e.assurance.map((e,t)=>({label:m(`activity.runInspector.facts.assuranceEvidenceItem`,{index:String(t+1)}),state:`present`,values:[{label:m(`activity.runInspector.values.kind`),value:e.kind},{label:m(`activity.runInspector.values.strength`),value:e.strength},{label:m(`activity.runInspector.values.evidenceReference`),value:e.evidenceRef,mono:!0}]})),{label:m(`activity.runInspector.facts.lineage`),state:i?`present`:`absent`,values:i?[{label:m(`activity.runInspector.values.depth`),value:i.depth},...i.parentRunId?[{label:m(`activity.runInspector.values.parentRunReference`),value:i.parentRunId,mono:!0,href:I({kind:`run`,id:i.parentRunId},t)}]:[],...i.parentExecutionId?[{label:m(`activity.runInspector.values.parentExecutionReference`),value:i.parentExecutionId,mono:!0}]:[],...i.parentContextId?[{label:m(`activity.runInspector.values.parentContextReference`),value:i.parentContextId,mono:!0}]:[],...i.delegationRef?[{label:m(`activity.runInspector.values.delegationReference`),value:i.delegationRef,mono:!0}]:[],...V(i.parentAgentPrincipal)]:[],reason:i?void 0:m(`activity.runInspector.reasons.noLineage`)}]}function yn(e){let t=an(e);switch(t){case`not-found`:return{title:m(`activity.runInspector.diagnostic.notFound.title`),description:m(`activity.runInspector.diagnostic.notFound.description`)};case`expired`:return{title:m(`activity.runInspector.diagnostic.expired.title`),description:m(`activity.runInspector.diagnostic.expired.description`)};case`corrupt`:return{title:m(`activity.runInspector.diagnostic.corrupt.title`),description:m(`activity.runInspector.diagnostic.corrupt.description`)};case`ambiguous`:return{title:m(`activity.runInspector.diagnostic.ambiguous.title`),description:m(`activity.runInspector.diagnostic.ambiguous.description`)};case`unsupported`:return{title:m(`activity.runInspector.diagnostic.unsupported.title`),description:m(`activity.runInspector.diagnostic.unsupported.description`)};case`unknown`:return{title:m(`activity.runInspector.diagnostic.unknown.title`),description:m(`activity.runInspector.diagnostic.unknown.description`)};case`present`:return null}return t}function bn(e,t,n,r){let i=yn(e);if(!i||e.identity.state===`present`)return y;let a=e.identity;return C`
    <div class="run-inspector__result-state" role="status" aria-label=${i.title}>
      <h3>${i.title}</h3>
      <p>${i.description}</p>
      <p>
        ${m(`activity.runInspector.diagnosticReason`)}
        ${z(a.reasonCode,!0)}
      </p>
    </div>
    ${a.state===`ambiguous`?C`
            <ol
              class="run-inspector__candidate-list"
              aria-label=${m(`activity.runInspector.candidates.listLabel`)}
            >
              ${a.candidates.map(e=>C`
                  <li>
                    <span
                      >${m(`activity.runInspector.candidates.recorded`,{date:new Date(e.createdAt).toLocaleString()})}</span
                    >
                    <a
                      href=${I({kind:`execution`,id:e.executionId},t)}
                    >
                      ${m(`activity.runInspector.candidates.executionReference`)}
                      ${z(e.executionId,!0)}
                    </a>
                  </li>
                `)}
            </ol>
            ${e.nextExecutionCursor?C`<div class="run-inspector__pagination">
                    <span>${m(`activity.runInspector.candidates.more`)}</span>
                    <button
                      type="button"
                      class="btn"
                      ?disabled=${n===`loading`}
                      @click=${r}
                    >
                      ${m(n===`loading`?`activity.runInspector.candidates.loadingMore`:`activity.runInspector.candidates.loadMore`)}
                    </button>
                    ${n===`error`?C`<span role="alert">
                            ${m(`activity.runInspector.candidates.loadMoreError`)}
                          </span>`:y}
                  </div>`:y}
          `:y}
    ${cn(a.missingEvidence)}
    ${ln(a.remediation)}
  `}function xn(e,t,n,r,i,a){let o=e.result,s=R(o.coverage.state);return C`
    <div
      class="run-inspector__coverage run-inspector__coverage--${o.coverage.state}"
      role="status"
      aria-label=${m(`activity.runInspector.coverageStatusLabel`,{state:s})}
    >
      <strong>${s}</strong>
      <span>
        ${m(`activity.runInspector.coverage.${on(o.coverage.state)}.description`)}
      </span>
    </div>
    ${o.identity.state===`present`?C`
            <section
              class="run-inspector__section"
              aria-labelledby="run-inspector-identity-heading"
            >
              <h3 id="run-inspector-identity-heading">
                ${m(`activity.runInspector.identityHeading`)}
              </h3>
              <dl class="run-inspector__facts">
                ${vn(o.identity.context,t).map(_n)}
              </dl>
            </section>
            ${cn(o.coverage.missingEvidence)}
            ${pn(e,n,r,t,i)}
          `:bn(o,t,e.executionPageStatus,a)}
  `}function H(e,t,n={}){return C`
    <div class="run-inspector__panel" role=${n.role??`status`}>
      <h3>${e}</h3>
      <p>${t}</p>
      ${n.action?C`<button type="button" class="btn" @click=${n.action.onClick}>
              ${n.action.label}
            </button>`:y}
    </div>
  `}function Sn(e){let t=e.state,n;switch(t.status){case`empty`:n=H(m(`activity.runInspector.panels.empty.title`),m(`activity.runInspector.panels.empty.description`));break;case`loading`:n=H(t.waitingForGateway?m(`activity.runInspector.panels.waiting.title`):m(`activity.runInspector.panels.loading.title`),t.waitingForGateway?m(`activity.runInspector.panels.waiting.description`):m(`activity.runInspector.panels.loading.description`));break;case`disconnected`:n=H(m(`activity.runInspector.panels.disconnected.title`),m(`activity.runInspector.panels.disconnected.description`));break;case`unauthorized`:n=H(m(`activity.runInspector.panels.unauthorized.title`),m(`activity.runInspector.panels.unauthorized.description`),{role:`alert`});break;case`unsupported`:n=H(m(`activity.runInspector.panels.unsupported.title`),m(`activity.runInspector.panels.unsupported.description`));break;case`error`:n=H(m(`activity.runInspector.panels.error.title`),m(`activity.runInspector.panels.error.description`),{action:t.recovery===`restart`?{label:m(`activity.runInspector.restart`),onClick:e.onRestart}:{label:m(`activity.runInspector.retry`),onClick:e.onRetry},role:`alert`});break;case`ready`:n=xn(t,e.basePath,e.selector,e.selectorId,e.onLoadMoreDecisions,e.onLoadMoreExecutions)}return C`
    <section
      id="activity-run-panel"
      class="run-inspector"
      aria-label=${m(`activity.runInspector.mode`)}
    >
      <div class="settings-section__header">
        <div>
          <h2 class="settings-section__heading">${m(`activity.runInspector.mode`)}</h2>
          <p class="run-inspector__intro">${m(`activity.runInspector.intro`)}</p>
        </div>
      </div>
      <div class="run-inspector__warning" role="note">
        ${m(`activity.runInspector.bestEffortWarning`)}
      </div>
      ${n}
    </section>
  `}function Cn(){return(Cn=e((()=>{b(),_(),j(),mn(),L(),A()})))()}function U(e){return JSON.stringify([e.agentId??ge(e.key)?.agentId,e.key])}function wn(e){return JSON.stringify([e.sessionId,e.updatedAt,e.lastActivityAt,e.activitySummary?.updatedAt])}var Tn,En,Dn,On;function kn(){return(kn=e((()=>{r(),O(),Ce(),g(),It(),F(),Tn=1e3,En=`sessions.activitySummary.ensure`,Dn=20,On=class{get loading(){return this.requestState!==`idle`||this.incomplete}get retrying(){return this.requestState===`retrying`}constructor(e){this.host=e,this.incomplete=!1,this.requestState=`idle`,this.client=null,this.summaryAttempts=new Map,this.summaryRetries=new Set,this.canEnsureSummaries=!1,this.filters=null,this.pendingChanges=[],this.changesOverflowed=!1,this.normalizedLocation=``,this.observesPageLifecycle=typeof document<`u`&&typeof globalThis.addEventListener==`function`,this.pageActive=!this.observesPageLifecycle||document.visibilityState!==`hidden`,this.eventRefresh=Me({active:this.pageActive,refresh:()=>this.load(this.client,this.filters,`refresh`)}),this.handlePageLifecycle=e=>{let t=e.type===`pagehide`,n=this.pending!==void 0||this.summaryPending!==void 0;this.pageActive=!t&&document.visibilityState!==`hidden`,this.pageActive||(this.summaryPending?.abort(),this.summaryPending=void 0,this.summaryAttempts.clear(),this.summaryRetries.clear()),this.eventRefresh.setActive(this.pageActive,t||n)},e.addController(this)}hostConnected(){this.updatePageLifecycleListeners(!0),this.observesPageLifecycle&&this.handlePageLifecycle(new Event(`pageshow`))}hostDisconnected(){this.updatePageLifecycleListeners(!1),this.resetQuery()}resetQuery(){this.eventRefresh.reset(),this.pending?.controller.abort(),this.pending=void 0,this.summaryPending?.abort(),this.summaryPending=void 0,this.summaryAttempts.clear(),this.summaryRetries.clear(),this.requestState=`idle`,this.incomplete=!1,this.error=void 0,this.client=null,this.queryKey=void 0,this.result=void 0,this.filters=null,this.pendingChanges.length=0,this.changesOverflowed=!1,this.normalizedLocation=``}retrySummary(e){this.canEnsureSummaries&&e.activitySummary?.canEnsure===!0&&this.result?.sessions.includes(e)&&(this.summaryAttempts.delete(U(e)),this.summaryRetries.add(U(e)),this.ensureSummaries())}needsSummary(e){let t=U(e);return e.activitySummary?.canEnsure===!0&&(this.summaryRetries.has(t)||e.activitySummary.state===`stale`)&&this.summaryAttempts.get(t)!==wn(e)}async ensureSummaries(){let e=this.client,t=this.queryKey;if(!e||!this.result||!this.canEnsureSummaries||this.filters===`current`||this.summaryPending)return;if(!this.pageActive){this.eventRefresh.schedule();return}let n=new Set(this.result.sessions.filter(e=>e.activitySummary?.canEnsure===!0).map(U));for(let e of new Set([...this.summaryAttempts.keys(),...this.summaryRetries]))n.has(e)||(this.summaryAttempts.delete(e),this.summaryRetries.delete(e));let r=this.result.sessions.filter(e=>this.needsSummary(e));if(r.length===0)return;let i=new AbortController;this.summaryPending=i;let a=()=>this.summaryPending===i&&this.client===e&&this.queryKey===t&&this.canEnsureSummaries&&!i.signal.aborted;try{for(let t=0;t<r.length&&a();t+=Dn){let n=new Map(this.result.sessions.map(e=>[U(e),e])),o=r.slice(t,t+Dn).flatMap(e=>{let t=n.get(U(e));return t&&t.sessionId===e.sessionId&&this.needsSummary(t)?[t]:[]});if(o.length!==0){for(let e of o){let t=U(e);this.summaryAttempts.set(t,wn(e)),this.summaryRetries.delete(t)}try{let t=await e.request(En,{sessions:o.map(e=>({key:e.key,...e.agentId?{agentId:e.agentId}:{}}))},{signal:i.signal});if(!a()||!this.result)return;let n=new Map(t.sessions.map(e=>[U(e),e.activitySummary]));this.result={...this.result,sessions:this.result.sessions.map(e=>o.includes(e)&&n.has(U(e))?{...e,activitySummary:n.get(U(e))}:e)}}catch{if(!a()||!this.result)return;this.result={...this.result,sessions:this.result.sessions.map(e=>o.includes(e)?{...e,activitySummary:{...e.activitySummary,state:`unavailable`}}:e)}}this.host.requestUpdate()}}}finally{this.summaryPending===i&&(this.summaryPending=void 0,this.host.requestUpdate(),this.ensureSummaries())}}personLabel(e,t){return this.result?.people?.find(t=>t.identity.id===e)?.label??t.find(t=>t.identity?.id===e)?.name}canonicalLocation(e,t,n){if(!this.filters||this.filters===`current`||!this.filters.personId||!this.result?.involvingProfileId||this.loading)return null;let r=this.result.involvingProfileId,i=Wt(e,r,this.personLabel(r,n),t);if(!i)return this.normalizedLocation=``,null;let a=`${e.pathname}${e.search}${e.hash}`;return this.normalizedLocation===a?null:(this.normalizedLocation=a,i)}locationForFilters(e,t,n,r){let i=Ut(e,n,e.personId?this.personLabel(e.personId,r):void 0),a=this.result?.involvingProfileId??(this.filters===`current`?void 0:this.filters?.personId);return e.personId&&e.personId===a&&(i.pathname=D(t.pathname,n)?t.pathname:Qe(e.personId,n,this.personLabel(e.personId,r),32).pathname),i}updatePageLifecycleListeners(e){if(!this.observesPageLifecycle)return;let t=e?`addEventListener`:`removeEventListener`;document[t](`visibilitychange`,this.handlePageLifecycle),globalThis[t](`pagehide`,this.handlePageLifecycle),globalThis[t](`pageshow`,this.handlePageLifecycle)}invalidate(e){if(this.client&&this.filters){if(this.filters===`current`){let t=Pt(e);if(t){if(this.result){let e=Ft(this.result,[t]);this.result=e.result,this.incomplete||=e.requiresRefresh,this.host.requestUpdate()}this.pending&&(this.pendingChanges.length<Tn?this.pendingChanges.push(t):this.changesOverflowed=!0)}}this.eventRefresh.schedule()}}load(e,t,n=`query`,r=this.canEnsureSummaries){if(this.canEnsureSummaries=r,r||(this.summaryPending?.abort(),this.summaryPending=void 0,this.summaryAttempts.clear(),this.summaryRetries.clear()),!e||!t)return this.resetQuery(),this.host.requestUpdate(),Promise.resolve();let i=t===`current`?{activeOnly:!0,archived:`all`,includeGlobal:!0,includeUnknown:!0,includeDerivedTitles:!0,limit:100}:{archived:`all`,includeGlobal:!0,includeUnknown:!0,includePeople:!0,excludeSubagents:!0,includeActivitySummary:!0,includeDerivedTitles:!0,sortBy:`activity`,limit:100,...t.personId?{involvingProfileId:t.personId}:{},...t.query?{search:t.query}:{},...t.time===`all`?{}:{activeMinutes:t.time===`24h`?1440:t.time===`7d`?10080:43200}},a=JSON.stringify(i),o=this.client===e&&this.queryKey===a;if(o&&this.pending&&n!==`retry`)return n===`refresh`&&this.eventRefresh.schedule(),this.pending.completion.promise;if(n===`query`&&o)return this.ensureSummaries(),Promise.resolve();this.pending?.controller.abort(),this.eventRefresh.absorb();let s={controller:new AbortController,completion:l()};return this.pending=s,this.client=e,this.queryKey=a,this.filters=t,this.pendingChanges.length=0,this.changesOverflowed=!1,this.requestState=n===`retry`?`retrying`:`loading`,this.error=void 0,o||(this.summaryPending?.abort(),this.summaryPending=void 0,this.summaryAttempts.clear(),this.summaryRetries.clear(),this.result=void 0,this.incomplete=!1),this.host.requestUpdate(),e.request(`sessions.list`,i,{signal:s.controller.signal}).then(e=>{if(this.pending===s){if(t===`current`){let t=Ft(e,this.pendingChanges);this.incomplete=this.changesOverflowed||t.requiresRefresh,this.incomplete&&this.eventRefresh.schedule(),!this.changesOverflowed&&t.canPublish&&(this.result=t.result)}else this.result=e,this.ensureSummaries()}}).catch(e=>{this.pending===s&&!s.controller.signal.aborted&&(t===`current`&&(this.result=void 0,this.incomplete=!1),this.error=e instanceof Error?e.message:String(e))}).finally(()=>{this.pending===s&&(this.pending=void 0,this.pendingChanges.length=0,this.requestState=`idle`,this.host.requestUpdate()),s.completion.resolve()}),s.completion.promise}}})))()}function An(e){let t=o(e);if(t?.found!==!0)return{status:`absent`};let n=e=>e?.trim()?e:void 0,r=o(t.attribution),i=n(c(r,`text`)),a=n(c(r,`url`)),s=n(c(t,`city`)),l=n(c(t,`region`)),u=n(c(t,`country`)),d={...s?{city:s}:{},...l?{region:l}:{},...u?{country:u}:{},...i&&a?{attribution:{text:i,url:a}}:{}};return Object.keys(d).length>0?{status:`located`,location:d}:{status:`absent`}}async function jn(e){let{origin:t}=pe();try{let n=await oe(`${t??``}/plugins/geolocation/lookup?ip=${encodeURIComponent(e)}`,Nn);return n.ok?An(await n.json()):{status:`unavailable`}}catch{return{status:`unavailable`}}}function Mn(e){let t=W.get(e);if(t)return t;let n=jn(e).then(t=>(t.status===`unavailable`&&W.get(e)===n&&W.delete(e),t));if(W.size>=Pn){let e=W.keys().next();e.done||W.delete(e.value)}return W.set(e,n),n}var Nn,Pn,W;function Fn(){return(Fn=e((()=>{de(),Nn=15e3,Pn=256,W=new Map,Ne(()=>W.clear())})))()}var In,G;function Ln(){return(Ln=e((()=>{b(),x(),Fn(),v(),T(),In=[5e3,15e3,45e3],G=class extends je{constructor(...e){super(...e),this.location=null,this.retryAttempt=0}disconnectedCallback(){super.disconnectedCallback(),this.clearRetry()}willUpdate(){let e=this.ip?.trim();e&&e!==this.requestedIp&&(this.clearRetry(),this.requestedIp=e,this.retryAttempt=0,this.location=null,this.resolve(e))}clearRetry(){this.retryTimer!==void 0&&(clearTimeout(this.retryTimer),this.retryTimer=void 0)}resolve(e){Mn(e).then(t=>{if(this.requestedIp!==e)return;if(t.status===`located`){this.location=t.location;return}if(t.status===`absent`)return;let n=In[this.retryAttempt];n!==void 0&&(this.retryAttempt+=1,this.retryTimer=setTimeout(()=>{this.retryTimer=void 0,this.requestedIp===e&&this.isConnected&&this.resolve(e)},n))})}render(){let e=[this.location?.city,this.location?.region??this.location?.country].filter(Boolean).join(`, `);if(!e)return y;let t=this.location?.attribution;return C`<span class="activity-feed__device-location"
      >${e}${t?C`<a
              class="activity-feed__device-attribution"
              href=${t.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label=${t.text}
              title=${t.text}
              >${E.info}</a
            >`:y}</span
    >`}},i([w({attribute:!1})],G.prototype,`ip`,void 0),i([S()],G.prototype,`location`,void 0),globalThis.customElements&&(customElements.get(`openclaw-ip-location`)||customElements.define(`openclaw-ip-location`,G))})))()}function Rn(e){return C`${e.additions===void 0?y:C`<span class="activity-feed__additions">+${e.additions.toLocaleString()}</span>`}${e.deletions===void 0?y:C`<span class="activity-feed__deletions">−${e.deletions.toLocaleString()}</span>`}`}function zn(e){let t={open:E.gitPullRequest,draft:E.gitPullRequestDraft,merged:E.gitMerge,closed:E.gitPullRequestClosed}[e.state];return C`<a
    class="activity-feed__pr"
    data-state=${e.state}
    href=${e.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label=${m(`activity.git.pullRequest`,{repository:`${e.owner}/${e.repo}`,number:String(e.number),title:e.title,state:m(`activity.git.${e.state}`)})}
  >
    <span class="activity-feed__git-icon" aria-hidden="true">${t}</span>
    <span class="activity-feed__git-label">${e.repo}#${e.number}</span>
    ${Rn(e)}
  </a>`}var K;function Bn(){return(Bn=e((()=>{b(),x(),Ue(),T(),_(),j(),st(),v(),_e(),A(),K=class extends he{constructor(...e){super(...e),this.sessionKey=``,this.agentId=``,this.subscriptions=new ne(this).effect(()=>this.context?.gateway,e=>{let t=lt(e),n=t.subscribe(()=>this.requestUpdate()),r=e.subscribe(()=>this.requestUpdate());return()=>{t.unwatch(this),n(),r()}})}willUpdate(){this.isConnected&&lt(this.context.gateway).watch(this,[this.sessionKey],{foreground:!0})}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}render(){let e=this.context.gateway,t=lt(e).get(this.sessionKey);if(!t)return y;let n=t.pullRequests.some(e=>e.state===`open`||e.state===`draft`)?void 0:t.branch;if(!n&&t.pullRequests.length===0)return y;let r=t.status!==`ready`||e.snapshot.phase!==`connected`;return C`<openclaw-github-link-hovercard-provider
      .client=${e.snapshot.client}
      .agentId=${this.agentId}
      .previewSeeds=${t.pullRequests.map(e=>({kind:`pull`,owner:e.owner,repo:e.repo,number:e.number,href:e.url,title:e.title,state:e.state===`draft`?`open`:e.state,draft:e.state===`draft`,login:e.author?.login,additions:e.additions,deletions:e.deletions}))}
    >
      <div class="activity-feed__git">
        ${n?C`<span
                class="activity-feed__branch"
                title=${m(`activity.git.branchDiff`,{branch:n.branch})}
              >
                <span class="activity-feed__git-icon" aria-hidden="true">${E.gitBranch}</span>
                <span class="activity-feed__git-label">${n.branch}</span>
                ${Rn(n)}
              </span>`:y}
        ${t.pullRequests.map(zn)}
        ${r?C`<span
                class="activity-feed__git-stale"
                role="img"
                aria-label=${m(`activity.git.stale`)}
                title=${m(`activity.git.stale`)}
                >${E.alertTriangle}</span
              >`:y}
      </div>
    </openclaw-github-link-hovercard-provider>`}},i([w({attribute:!1})],K.prototype,`context`,void 0),i([w()],K.prototype,`sessionKey`,void 0),i([w()],K.prototype,`agentId`,void 0),customElements.get(`openclaw-activity-session-git`)||customElements.define(`openclaw-activity-session-git`,K)})))()}function Vn(e,t){let n=Un.get(e);return(!n||n.hello!==t)&&(n={hello:t,epoch:++Wn,entries:new Map,running:0,queue:[]},Un.set(e,n)),n}async function Hn(e,t,n){if(e.running>=2){let n=await new Promise(n=>{let r=e.queue.findIndex(e=>e.key===t),i=e.queue[r];i?(e.queue[r]={key:t,admit:n},i.admit(`superseded`)):e.queue.length<128?e.queue.push({key:t,admit:n}):n(`full`)});if(n!==`run`)return n}else e.running++;try{return await n(),`run`}finally{let t=e.queue.shift();t?t.admit(`run`):e.running--}}var Un,Wn,q;function Gn(){return(Gn=e((()=>{b(),x(),Xe(),_(),j(),v(),_e(),wt(),Ct(),St(),A(),Un=new WeakMap,Wn=0,q=class extends he{constructor(...e){super(...e),this.sessionKey=``,this.agentId=``,this.revision=0,this.visible=!1,this.displayedImages=[],this.key=``,this.boundImageIdentity=``,this.lightbox=null,this.imageRequest=0,this.refresh=()=>this.requestUpdate(),this.subscriptions=new ne(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)),this.closeImage=()=>{this.imageRequest++,this.lightbox?.release?.(),this.lightbox=null,this.requestUpdate()},this.load=()=>{let e=this.context.gateway,{client:t,hello:n}=e.snapshot,r=this.owner,i=this.entry,a=this.key,o=this.sessionKey,s=this.agentId;if(!t||!r||!i||i.pending)return;let c=()=>this.isConnected&&this.visible&&this.owner===r&&this.key===a&&e.snapshot.client===t&&e.snapshot.hello===n&&e.snapshot.phase===`connected`;i.error&&(i.cursor=void 0,i.images=[]),i.error=!1,i.pending=Hn(r,JSON.stringify([s,o]),async()=>{try{for(let e=0;e<3&&i.images.length<4&&c();e++){let e=await t.request(`artifacts.list`,{sessionKey:o,agentId:s,type:`image`,limit:4-i.images.length,...i.cursor?{cursor:i.cursor}:{}});if(!c())return;i.loaded=!0,i.cursor=e.nextCursor,i.omitted||=e.omittedOversized;for(let t of e.artifacts)t.image&&!i.images.some(e=>e.url===t.image?.url)&&i.images.push({url:t.image.url,artifactId:t.source===`session-transcript-preview`?void 0:t.id,alt:t.title});if(!i.cursor)break}}catch{c()&&(i.loaded=!0,i.error=!0)}}).then(e=>{e!==`run`&&c()&&(i.loaded=!0,i.error=e===`full`)}).finally(()=>{i.pending=void 0,this.requestUpdate()}),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),!(typeof IntersectionObserver>`u`)&&(this.observer=new IntersectionObserver(e=>{this.visible=e.some(e=>e.isIntersecting),this.requestUpdate()},{rootMargin:`200px`}),this.observer.observe(this))}disconnectedCallback(){this.observer?.disconnect(),this.visible=!1,this.subscriptions.clear(),this.closeImage(),bt(this.refresh),super.disconnectedCallback()}get imageIdentity(){return JSON.stringify([this.agentId,this.sessionKey,this.session?.sessionId,yt(this.session)])}willUpdate(){let{client:e,hello:t,phase:n}=this.context.gateway.snapshot,r=e&&n===`connected`?Vn(e,t):void 0,i=JSON.stringify([this.agentId,this.sessionKey,this.session?.sessionId,this.revision]),a=this.imageIdentity;if((r!==this.owner||a!==this.boundImageIdentity)&&(this.displayedImages=[],this.closeImage(),bt(this.refresh),this.boundImageIdentity=a),(r!==this.owner||i!==this.key)&&(this.owner=r,this.key=i,this.entry=void 0,r&&(this.entry=r.entries.get(i),!this.entry&&(this.entry={images:[],loaded:!1},r.entries.set(i,this.entry),r.entries.size>128)))){let e=r.entries.keys().next().value;e&&r.entries.delete(e)}this.visible&&this.entry&&!this.entry.loaded&&!this.entry.pending&&this.load(),this.entry?.pending&&this.observedPending!==this.entry.pending&&(this.observedPending=this.entry.pending,this.observedPending.then(this.refresh)),this.entry?.loaded&&!this.entry.pending&&(!this.entry.error||this.displayedImages.length===0)&&(this.displayedImages=this.entry.images.slice(0,4))}render(){let e=this.entry,t=this.owner,n=this.context.gateway,{client:r,hello:i}=n.snapshot;if(!e||!t||!r)return y;let a=this.displayedImages.length>0||e.error||e.cursor||e.omitted,o=this.imageIdentity,s=this.agentId;return C`
      ${a?C`<div class="activity-feed__media">
              ${Tt(this.displayedImages,{sessionKey:this.sessionKey,agentId:this.agentId,connectionEpoch:t.epoch,policyKey:yt(this.session),resourceBasePath:this.context.resourceBasePath,authToken:qe({hello:i,settings:{token:n.connection.token},password:n.connection.password}),onRequestUpdate:this.refresh,onRequestOpenImage:()=>++this.imageRequest,onOpenImage:(e,a)=>{if(!this.isConnected||this.owner!==t||this.imageIdentity!==o||n.snapshot.client!==r||n.snapshot.hello!==i||n.snapshot.phase!==`connected`||a!==this.imageRequest){e.release?.();return}this.lightbox?.release?.(),this.lightbox=e,this.requestUpdate()},resolveArtifactDownload:async e=>{let t=await r.request(`artifacts.download`,{...e,agentId:s});return n.snapshot.client===r&&n.snapshot.hello===i&&n.snapshot.phase===`connected`&&t.url?{url:t.url,expiresAt:t.expiresAt}:null}})}
              ${e.error?C`<span role="status">${m(`activity.images.failed`)}</span><button class="btn btn--sm" @click=${this.load}>${m(`common.retry`)}</button>`:y}
              ${e.cursor&&e.images.length<4&&!e.error?C`<button class="btn btn--sm" ?disabled=${!!e.pending} @click=${this.load}>${e.pending?m(`common.loading`):m(`activity.images.older`)}</button>`:y}
              ${e.omitted?C`<span class="activity-feed__media-note">${m(`activity.images.incomplete`)}</span>`:y}
            </div>`:y}
      ${xt(this.lightbox,this.closeImage)}
    `}},i([w({attribute:!1})],q.prototype,`context`,void 0),i([w()],q.prototype,`sessionKey`,void 0),i([w()],q.prototype,`agentId`,void 0),i([w({type:Number})],q.prototype,`revision`,void 0),i([w({attribute:!1})],q.prototype,`session`,void 0),customElements.get(`openclaw-activity-session-media`)||customElements.define(`openclaw-activity-session-media`,q)})))()}function Kn(e,t){let n=e.activitySummary,r=n?.state===`current`&&!n.text?`missing`:n?.state??`missing`,i=r===`updating`,a=i?``:r===`stale`?m(n?.text?`activityFeed.recapStale`:`activityFeed.recapMissing`):r===`unavailable`?m(n?.text?`activityFeed.recapRefreshFailed`:`activityFeed.recapUnavailable`):r===`missing`?m(`activityFeed.recapMissing`):``;return C`<div
    class="activity-feed__recap"
    data-activity-recap=${e.key}
    data-state=${r}
    aria-busy=${String(i)}
    aria-label=${m(`activityFeed.recap`)}
    title=${n?.updatedAt?m(`activityFeed.recapUpdated`,{time:Se(n.updatedAt,{fallback:``})}):y}
  >
    ${n?.text?C`<p class="activity-feed__recap-text">${n.text}</p>`:i?C`<div class="activity-feed__recap-skeleton" aria-hidden="true">
              <div class="skeleton skeleton-line skeleton-line--long"></div>
              <div class="skeleton skeleton-line skeleton-line--medium"></div>
            </div>`:y}
    ${i?C`<span class="sr-only" role="status">${m(`activityFeed.recapUpdating`)}</span>`:y}
    ${a?C`<div class="activity-feed__recap-feedback">
            <span>${a}</span>
            ${t&&n?.canEnsure===!0&&(r===`unavailable`||r===`stale`)?C`<button class="activity-feed__recap-retry" @click=${()=>t(e)}>
                    ${m(`activityFeed.recapRetry`)}
                  </button>`:y}
          </div>`:y}
  </div>`}function qn(){return(qn=e((()=>{b(),_(),Oe()})))()}function J(e){return!e.name&&!e.email&&k(e)===e.id}function Jn(e){return J(e)&&e.id.length>8?`${e.id.slice(0,8)}…`:k(e)}function Yn(e,t=!1){return J(e)?C`<span
      class="viewer-avatar viewer-avatar--overflow activity-feed__unknown-avatar"
      aria-hidden="true"
      >${E.users}</span
    >`:C`<span class="activity-feed__person-avatar">
    <openclaw-viewer-avatar
      .identity=${{type:`profile`,id:e.id}}
      .user=${e}
      .markAsViewer=${!1}
      variant="footer"
    ></openclaw-viewer-avatar>
    ${t&&(e.entries?.length??0)>0?C`<span
            class="activity-feed__presence-dot"
            aria-label=${m(`activityFeed.online`)}
          ></span>`:y}
  </span>`}function Xn(e,t,n){e.currentTarget instanceof Element&&e.currentTarget.closest(`wa-popover`)?.removeAttribute(`open`),t.onFiltersChange({...t.filters,personId:n})}function Zn(e,t){e.currentTarget instanceof Element&&e.currentTarget.parentElement?.querySelector(`.activity-feed__people-trigger`)?.setAttribute(`aria-expanded`,String(t))}function Qn(e,t){return C`<button
    type="button"
    class="session-menu__item activity-feed__people-row"
    data-activity-person=${e.id}
    aria-pressed=${String(t.filters.personId===e.id)}
    @click=${n=>Xn(n,t,e.id)}
  >
    ${Yn(e,!0)}
    <span class="activity-feed__people-copy">
      <span class="activity-feed__people-name">${Jn(e)}</span>
    </span>
    <span class="activity-feed__people-count">${e.count}</span>
  </button>`}function $n(e,t,n,r){let i=t.slice(0,3),a=t.length-i.length,o=t.filter(e=>!J(e)),s=t.filter(J);return C`<div class="activity-feed__people-control">
    <button
      id="activity-feed-people-trigger"
      type="button"
      class="btn btn--sm activity-feed__people-trigger"
      aria-label=${m(`activityFeed.peopleButtonLabel`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${n?C`${Yn(n)}<span class="activity-feed__selected-person"
                >${Jn(n)}</span
              >`:C`<span class="activity-feed__facepile" aria-hidden="true">
              ${i.length>0?i.map(e=>Yn(e)):C`<span
                      class="viewer-avatar viewer-avatar--overflow activity-feed__unknown-avatar"
                      >${E.users}</span
                    >`}
              ${a>0?C`<span class="viewer-avatar viewer-avatar--overflow">+${a}</span>`:y}
            </span>`}
    </button>
    ${n?C`<button
            type="button"
            class="btn btn--sm activity-feed__people-clear"
            aria-label=${m(`activityFeed.clearPersonFilter`)}
            @click=${()=>e.onFiltersChange({...e.filters,personId:null})}
          >
            ×
          </button>`:y}
    <wa-popover
      class="activity-feed__people-popover"
      for="activity-feed-people-trigger"
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>Zn(e,!0)}
      @wa-hide=${e=>Zn(e,!1)}
    >
      <div class="activity-feed__people-panel" aria-label=${m(`activityFeed.peopleButtonLabel`)}>
        <button
          type="button"
          class="session-menu__item activity-feed__people-row"
          data-activity-person=""
          aria-pressed=${String(e.filters.personId===null)}
          @click=${t=>Xn(t,e,null)}
        >
          <span
            class="viewer-avatar viewer-avatar--overflow activity-feed__unknown-avatar"
            aria-hidden="true"
            >${E.users}</span
          >
          <span class="activity-feed__people-copy">
            <span class="activity-feed__people-name">${m(`activityFeed.everyone`)}</span>
          </span>
          <span class="activity-feed__people-count">${r}</span>
        </button>
        ${o.map(t=>Qn(t,e))}
        ${s.length>0?C`<div class="session-menu__separator" role="separator"></div>
                <div class="activity-feed__people-group-label">
                  ${m(`activityFeed.unresolvedIdentities`)}
                </div>
                <div data-activity-unresolved>
                  ${s.map(t=>Qn(t,e))}
                </div>`:y}
      </div>
    </wa-popover>
  </div>`}function er(e,t=Date.now()){if(e===null)return m(`activityFeed.unknownDate`);let n=new Date(t),r=new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime(),i=new Date(r);return i.setDate(i.getDate()-1),e===r?m(`activityFeed.today`):e===i.getTime()?m(`activityFeed.yesterday`):new Intl.DateTimeFormat(void 0,{day:`numeric`,month:`long`,year:`numeric`}).format(e)}function Y(e,t,n){let r=ge(t.key)?.agentId??t.agentId??ve(e),i=xe(t),a=be(t.key,me({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello}))?te({face:i,sessionKey:t.key,fallbackAgentId:t.key===`global`?r:ve(e),basePath:e.basePath,row:t,mainKey:Ee({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello})}):null,o=a?Re`a`:Re`div`,s=Kt(t),c=k(s),l=N(t),u=t.observerDigest?.runId,d=t.hasActiveRun===!0&&u&&t.activeRunIds?.includes(u)?u:void 0,f=d?t.observerDigest?.headline.trim():``,p=t.channel?m(`activityFeed.channelLabel`,{value:t.channel}):null,ee=t.kind!==`global`||!!t.agentId,h=t.createdVia===`cron`?m(`activityFeed.automation`):null;return Pe`<div class="activity-feed__session-row">
    <${o}
      class="activity-feed__session"
      data-activity-session=${t.key}
      href=${a?.href??y}
      @click=${t=>{a&&re(t)&&(t.preventDefault(),e.navigate(i,a.options))}}
    >
      <span class="activity-feed__session-avatar">
        ${t.hasActiveRun===!0?C`<span
                class="activity-feed__presence-dot activity-feed__run-dot"
                aria-hidden="true"
              ></span>`:y}
        <openclaw-viewer-avatar
          .identity=${t.owner?.actor.identity??t.createdActor?.identity}
          .user=${s}
          .markAsViewer=${!1}
          variant="footer"
        ></openclaw-viewer-avatar>
      </span>
      <span class="activity-feed__session-main">
        <span class="activity-feed__session-title">${ae(t.key,t)}</span>
        <span class="activity-feed__session-meta">
          ${f?C`<span
                  class="activity-feed__session-headline"
                  data-health=${t.observerDigest?.health??y}
                  >${f}</span
                >`:C`<span>${c}</span>`}${h?C`<span class="activity-feed__session-source" data-activity-created-via="cron"
                  >· ${h}${p||ee?` ·`:``}</span
                >`:y}${ee?C`<span class="activity-feed__session-scope"
                  >${jt(r)}</span
                >`:y}${p?C`<span class="activity-feed__session-scope">${p}</span>`:y}
        </span>
      </span>
      <span class="activity-feed__session-time">
        ${f?C`<span class="activity-feed__session-owner">${c}</span>`:y}
        ${l>0?C`<span>${Se(l,{fallback:``})}</span>`:y}
      </span>
    </${o}>
    ${Kn(t,n)}
    <openclaw-activity-session-git
      .context=${e}
      .sessionKey=${we(t.key,r)}
      .agentId=${r}
    ></openclaw-activity-session-git>
    <openclaw-activity-session-media
      .context=${e}
      .sessionKey=${we(t.key,r)}
      .agentId=${r}
      .revision=${t.updatedAt??0}
      .session=${t}
    ></openclaw-activity-session-media>
    ${d?C`<a
            class="activity-feed__inspect-run"
            href=${en(d,e.basePath)}
            >${m(`activityFeed.inspectRun`)}</a
          >`:y}
  </div>`}function tr(e,t){if(e.filters.query||e.filters.personId)return t.sessions.map(t=>Y(e.context,t,e.onSummaryRetry));let n=t.sessions.filter(e=>e.hasAutomation===!0);if(n.length<2)return t.sessions.map(t=>Y(e.context,t,e.onSummaryRetry));let r=e.expandedAutomationDays.has(t.key);return C`
    ${t.sessions.filter(e=>e.hasAutomation!==!0).map(t=>Y(e.context,t,e.onSummaryRetry))}
    <button
      type="button"
      class="activity-feed__session activity-feed__automation-group"
      data-activity-automation-group=${t.key}
      aria-expanded=${String(r)}
      @click=${()=>e.onAutomationDayToggle(t.key)}
    >
      <span class="activity-feed__automation-group-icon" aria-hidden="true">${E.clock}</span>
      <span>${m(`activityFeed.automationGroup`,{count:String(n.length)})}</span>
      <span class="activity-feed__automation-group-chevron" aria-hidden="true"
        >${E.chevronRight}</span
      >
    </button>
    ${r?n.map(t=>Y(e.context,t,e.onSummaryRetry)):y}
  `}function nr(e,t,n){let r=(t.entries?.length??0)>0,i=r&&ut(t),a=m(r?i?`activityFeed.idle`:`activityFeed.online`:`activityFeed.offline`),o=t.entries??[],s=Xt(t,n);return C`
    <section class="activity-feed__identity" data-activity-identity=${t.id}>
      <div class="activity-feed__identity-main">
        <openclaw-viewer-avatar
          .identity=${{type:`profile`,id:t.id}}
          .user=${t}
          .markAsViewer=${!1}
          variant="profile"
        ></openclaw-viewer-avatar>
        <div class="activity-feed__identity-copy">
          <h2>${k(t)}</h2>
          ${t.email?C`<p>${t.email}</p>`:y}
        </div>
        ${ft({kind:r?i?`warn`:`ok`:`muted`,label:a})}
      </div>
      ${o.length>0?C`<div class="activity-feed__devices">
              ${o.map(e=>{let t=[e.deviceFamily,e.platform,e.ip,e.timeZone].filter(Boolean).join(` · `);return C`<div class="activity-feed__device">
                  <span class="activity-feed__device-name"
                    >${e.host??m(`activityFeed.unknownDevice`)}</span
                  >
                  ${t?C`<span>${t}</span>`:y}
                  ${e.ip?C`<openclaw-ip-location .ip=${e.ip}></openclaw-ip-location>`:y}
                  ${e.lastInputSeconds===void 0?y:C`<span
                          >${m(`activityFeed.lastInput`,{time:Te(e.lastInputSeconds*1e3,{suffix:!1})})}</span
                        >`}
                </div>`})}
            </div>`:y}
      <div class="activity-feed__viewing">
        <h3>${m(`activityFeed.viewingNow`)}</h3>
        ${s.length>0?C`<div class="activity-feed__viewing-list">
                ${s.map(t=>Y(e,t))}
              </div>`:C`<p class="activity-feed__empty-note">${m(`activityFeed.notViewing`)}</p>`}
      </div>
    </section>
  `}function rr(){return C`<section class="activity-feed__loading" aria-busy="true">
    <span class="sr-only" role="status">${m(`common.loading`)}</span>
    <div class="activity-feed__sessions" aria-hidden="true">
      ${Array.from({length:4},()=>C`
          <div class="activity-feed__session-row">
            <div class="activity-feed__session">
              <span class="skeleton activity-feed__loading-avatar"></span>
              <div class="activity-feed__session-main">
                <div class="skeleton skeleton-line skeleton-line--medium"></div>
                <div class="skeleton skeleton-line activity-feed__loading-meta"></div>
              </div>
            </div>
            <div class="activity-feed__recap activity-feed__recap-skeleton">
              <div class="skeleton skeleton-line skeleton-line--long"></div>
              <div class="skeleton skeleton-line skeleton-line--medium"></div>
            </div>
          </div>
        `)}
    </div>
  </section>`}function ir(e){let t=Yt(e.result),n=new Map(e.presenceViewers.flatMap(e=>e.identity?[[e.identity.id,e]]:[])),r=e.filters.personId?n.get(e.filters.personId)??t.people.find(t=>t.id===e.filters.personId)??null:null,i=t.people.map(e=>{let t=n.get(e.id);return t?{...e,...t,count:e.count}:e}),a=e.filters.personId?i.find(t=>t.id===e.filters.personId)??r:null;return C`
    <div class="activity-feed">
      <div class="activity-feed__toolbar">
        <label class="data-table-search activity-feed__search">
          ${E.search}
          <input
            type="search"
            .value=${e.filters.query}
            placeholder=${m(`activityFeed.searchPlaceholder`)}
            @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onFiltersChange({...e.filters,query:t.currentTarget.value})}}
          />
        </label>
        ${mt({mode:`buttons`,className:`activity-feed__time-filter`,value:e.filters.time,ariaLabel:m(`activityFeed.time`),options:Zt.map(e=>({value:e,label:m(X[e]),ariaLabel:m(X[e]),compactLabel:e===`all`?m(X[e]):e})),onChange:t=>e.onFiltersChange({...e.filters,time:t}),onReselect:t=>e.onFiltersChange({...e.filters,time:t})})}
        ${$n(e,i,a,t.timeCount)}
      </div>
      <div class="activity-feed__feedback">
        <span role=${e.error?`alert`:`status`} title=${e.error??y}>
          ${e.error??(e.retrying?m(`common.refreshing`):y)}
        </span>
        ${e.error||e.retrying?C`<button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRetry}>
                ${m(`common.retry`)}
              </button>`:y}
      </div>
      <div class="activity-feed__main">
        ${e.loading&&!e.result?rr():y}
        ${e.result?.peopleIncomplete?C`<p role="status">${m(`activityFeed.partialHistory`)}</p>`:y}
        ${e.result&&e.filters.personId?r?nr(e.context,r,t.sessions):C`<section class="activity-feed__not-found" role="status">
                  <h2>${m(`activityFeed.notFoundTitle`)}</h2>
                  <p>${m(`activityFeed.notFoundDescription`)}</p>
                </section>`:y}
        ${e.result&&(!e.filters.personId||r)?C`
                <div class="activity-feed__summary">
                  <h2>${m(`activityFeed.sessions`)}</h2>
                  <span
                    >${m(`activityFeed.showing`,{shown:String(t.sessions.length),total:String(t.matchedCount)})}</span
                  >
                </div>
                ${t.days.length>0?t.days.map(t=>C`<section class="activity-feed__day">
                          <h3>${er(t.timestamp)}</h3>
                          <div class="activity-feed__sessions">
                            ${tr(e,t)}
                          </div>
                        </section>`):C`<section class="activity-feed__empty" role="status">
                        ${m(`activityFeed.noSessions`)}
                      </section>`}
              `:y}
      </div>
    </div>
  `}var X;function ar(){return(ar=e((()=>{b(),Fe(),Mt(),T(),Ln(),pt(),Ot(),gt(),_(),Oe(),ct(),h(),ue(),g(),Bn(),Gn(),L(),qn(),F(),X={"24h":`activityFeed.time24h`,"7d":`activityFeed.time7d`,"30d":`activityFeed.time30d`,all:`activityFeed.timeAll`}})))()}function or(e){return De(e,{hour:`numeric`,minute:`2-digit`,second:`2-digit`},``)}function sr(e){return!Number.isFinite(e)||e<0?m(`common.na`):at(e)??`0ms`}function cr(e){return m(`activity.status.${e}`)}function lr(e){return e===1?m(`activity.argumentHiddenOne`):m(`activity.argumentsHidden`,{count:String(e)})}function ur(e){return e.entryKind===`answer_candidate`?m(`activity.answerCandidate.${e.candidateStatus??`candidate`}`):lr(e.hiddenArgumentCount)}function dr(e){return e.entryKind===`answer_candidate`?m(`activity.answerCandidate.title`):e.toolName}function fr(e,t){return!t||n([e.toolName,dr(e),e.candidateStatus,e.status,e.summary,ur(e),e.outputPreview,e.runId,e.toolCallId,e.sessionKey].filter(Boolean).join(` `)).includes(t)}function pr(e){return a(e.map(e=>e.toolName))}function mr(e){let t=n(e.filterText);return e.entries.filter(n=>!e.statusFilters[n.status]||e.toolFilter&&n.toolName!==e.toolFilter?!1:fr(n,t))}function hr(e,t){return C`
    <label class="activity-status-filter">
      <input
        type="checkbox"
        .checked=${e.statusFilters[t]}
        @change=${n=>e.onStatusToggle(t,n.target.checked)}
      />
      <span>${cr(t)}</span>
    </label>
  `}function gr(e,t){e.currentTarget instanceof Element&&e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,String(t))}function _r(e,t){let n=!!e.toolFilter;return C`
    <button
      id="activity-live-filter-trigger"
      type="button"
      class="btn btn--sm activity-live-filter-trigger ${n?`active`:``}"
      title=${m(`activity.filters`)}
      aria-label=${m(`activity.filters`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${E.listFilter}
    </button>
    <wa-popover
      class="activity-live-filter-popover"
      for="activity-live-filter-trigger"
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>gr(e,!0)}
      @wa-hide=${e=>gr(e,!1)}
    >
      <div class="activity-live-filter-popover__panel">
        <label class="field">
          <span>${m(`activity.toolFilter`)}</span>
          <select
            class="settings-select"
            aria-label=${m(`activity.toolFilter`)}
            .value=${e.toolFilter}
            @change=${t=>{t.currentTarget instanceof HTMLSelectElement&&e.onToolFilterChange(t.currentTarget.value)}}
          >
            <option value="">${m(`activity.allTools`)}</option>
            ${t.map(e=>C`<option value=${e}>${e}</option>`)}
          </select>
        </label>
      </div>
    </wa-popover>
  `}function vr(e,t){return C`
    <div class="activity-live-toolbar">
      <div class="activity-feed__search activity-live-search">
        <span aria-hidden="true">${E.search}</span>
        <input
          class="settings-input"
          type="search"
          aria-label=${m(`activity.search`)}
          .value=${e.filterText}
          placeholder=${m(`activity.searchPlaceholder`)}
          @input=${t=>{t.currentTarget instanceof HTMLInputElement&&e.onFilterTextChange(t.currentTarget.value)}}
        />
      </div>
      <span role="group" aria-label=${m(`activity.statusFilters`)} class="activity-status-filters">
        ${Z.map(t=>hr(e,t))}
      </span>
      <span class="activity-live-autofollow">
        <span>${m(`activity.autoFollow`)}</span>
        ${vt({checked:e.autoFollow,ariaLabel:m(`activity.autoFollow`),onChange:t=>e.onToggleAutoFollow(t)})}
      </span>
      ${_r(e,t)}
    </div>
  `}function yr(e){return Sr[e]}function br(e,t){let n=e.expandedIds.has(t.id);return C`
    <details
      class="activity-entry activity-entry--${t.status}"
      role="listitem"
      .open=${n}
      @toggle=${n=>e.onEntryToggle(t.id,n.currentTarget.open)}
    >
      <summary class="activity-entry__summary">
        <span class="activity-entry__chevron" aria-hidden="true">${E.chevronRight}</span>
        <span class="activity-entry__main">
          <span class="activity-entry__title">
            ${ft({kind:yr(t.status),label:cr(t.status)})}
            <span class="activity-entry__tool mono">${dr(t)}</span>
          </span>
          <span class="activity-entry__text">${ur(t)}</span>
        </span>
        <span class="activity-entry__meta">
          <span>${or(t.updatedAt)}</span>
          <span>${sr(t.durationMs)}</span>
        </span>
      </summary>
      <div class="activity-entry__body">
        <div class="activity-entry__facts">
          ${t.entryKind===`answer_candidate`?C`<span class="mono"
                  >${m(`activity.answerCandidate.itemId`)}: ${t.itemId}</span
                >`:C`
                  <span>${lr(t.hiddenArgumentCount)}</span>
                  <span class="mono">${m(`activity.toolCallId`)}: ${t.toolCallId}</span>
                `}
          <a
            class="activity-entry__run-link mono"
            href=${en(t.runId,e.basePath)}
            >${m(`activity.runId`)}: ${t.runId}</a
          >
          ${t.sessionKey?C`<span class="mono">${m(`activity.session`)}: ${t.sessionKey}</span>`:y}
        </div>
        ${t.outputPreview?C`
                <pre class="activity-entry__preview">${t.outputPreview}</pre>
                ${t.outputTruncated?C`<div class="activity-entry__note">${m(`activity.outputTruncated`)}</div>`:y}
              `:C`<div class="activity-entry__note">${m(`activity.noOutputPreview`)}</div>`}
      </div>
    </details>
  `}function xr(e){let t=pr(e.entries),n=mr(e),r=e.filterText.trim()||e.toolFilter||Z.some(t=>!e.statusFilters[t]);return C`
    <section class="activity-page" aria-label=${m(`activity.title`)}>
      <div class="settings-section__header">
        <h2 class="settings-section__heading">${m(`activity.title`)}</h2>
        <div class="settings-section__actions">
          <span class="activity-count" aria-live="polite">
            ${m(`activity.visibleCount`,{visible:String(n.length),total:String(e.entries.length)})}
          </span>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${n.length===0}
            @click=${e.onExpandAll}
          >
            ${m(`activity.expandAll`)}
          </button>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${e.expandedIds.size===0}
            @click=${e.onCollapseAll}
          >
            ${m(`activity.collapseAll`)}
          </button>
          <button
            type="button"
            class="btn btn--sm danger"
            ?disabled=${e.entries.length===0}
            @click=${e.onClear}
          >
            ${m(`activity.clear`)}
          </button>
        </div>
      </div>
      <div class="settings-group activity-group">
        ${vr(e,t)}
        <div
          class="activity-stream"
          role="list"
          aria-label=${m(`activity.streamLabel`)}
          @scroll=${e.onScroll}
        >
          ${n.length===0?C`
                  <div class="activity-empty">
                    ${e.entries.length===0||!r?m(`activity.empty`):m(`activity.emptyFiltered`)}
                  </div>
                `:n.map(t=>br(e,t))}
        </div>
      </div>
    </section>
  `}var Z,Sr;function Cr(){return(Cr=e((()=>{d(),b(),T(),gt(),_(),j(),ot(),Oe(),L(),A(),Z=[`running`,`done`,`error`],Sr={running:`warn`,done:`ok`,error:`danger`}})))()}function wr(e){return e?`${e.kind}:${e.id}`:null}function Q(e){return e?.mode!==`run`||!e.selector?null:`${wr(e.selector)}:${e.decisionCursor??``}`}function Tr(e){let n=t(e);return(n?.gatewayCode===`INVALID_REQUEST`||n?.code===`INVALID_REQUEST`)&&n.retryable!==!0}var $,Er;function Dr(){return(Dr=e((()=>{ee(),b(),x(),He(),Ze(),O(),ze(),_t(),T(),Ge(),At(),_(),fe(),nt(),ct(),ke(),g(),v(),Et(),_e(),zt(),L(),Cn(),kn(),ar(),Cr(),$=class extends he{constructor(...e){super(...e),this.entries=[],this.filterText=``,this.statusFilters={running:!0,done:!0,error:!0},this.toolFilter=``,this.expandedIds=new Set,this.expandedAutomationDays=new Set,this.autoFollow=!0,this.runInspector={status:`empty`},this.liveActivitySource=null,this.liveActivityRevision=-1,this.sessionActivity=new On(this),this.sessionActivityRevision=-1,this.inspectorAbort=null,this.inspectorClient=null,this.inspectorEpoch=0,this.inspectorSelectorKey=null,this.presenceClient=null,this.streamFollow=new Dt(this,{selector:`.activity-stream`,isEnabled:()=>this.autoFollow}),this.subscriptions=new ne(this).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.liveActivity,(e,t)=>e.subscribe(t),e=>{let t=e.snapshot,n=e!==this.liveActivitySource||t.revision!==this.liveActivityRevision;this.liveActivitySource=e,this.liveActivityRevision=t.revision,this.entries=t.entries,n&&(this.expandedIds=new Set,this.streamFollow.atBottom=!0)}).effect(()=>this.context?.gateway,e=>{this.applyGatewaySnapshot(e,e.snapshot,!0);let t=e.subscribeEvents(t=>{this.applyGatewayEvent(e,t)}),n=e.subscribe(t=>this.applyGatewaySnapshot(e,t,!1));return()=>{n(),t()}})}willUpdate(e){e.has(`routeLocation`)&&(this.routeData=this.routeLocation?tn(this.routeLocation.search,D(this.routeLocation.pathname,this.context?.basePath)):void 0,this.routeLocation&&this.routeData&&(this.presentedRoute={location:this.routeLocation,data:this.routeData}),this.syncSessionActivity())}updated(e){e.has(`routeLocation`)&&this.bindInspectorRoute();let t=this.routeLocation?this.sessionActivity.canonicalLocation(this.routeLocation,this.context.basePath,dt(this.presencePayload).users):null;t&&this.context.replace(`activity`,t);let n=this.autoFollow&&e.has(`autoFollow`);(n||this.autoFollow&&this.streamFollow.atBottom&&e.has(`entries`))&&this.streamFollow.schedule(n)}disconnectedCallback(){this.subscriptions.clear(),this.cancelInspectorRequest(),this.presentedRoute=void 0,super.disconnectedCallback()}applyGatewaySnapshot(e,t,n){if((n||e.eventLogRevision!==this.sessionActivityRevision)&&(this.sessionActivityRevision=e.eventLogRevision,this.presentedRoute=void 0,this.sessionActivity.load(null,null)),n||t.client!==this.presenceClient){this.presenceClient=t.client;let e=t.phase===`connected`?Je(t.hello?.snapshot):void 0;this.presencePayload=e?{presence:e}:void 0}else t.phase!==`connected`&&this.presencePayload&&(this.presencePayload=void 0);this.syncRunInspector(e,t,n),this.syncSessionActivity()}syncSessionActivity(e=`query`){let t=this.context?.gateway.snapshot;this.sessionActivity.load(t?.phase===`connected`?t.client:null,this.routeData?.mode===`sessions`?this.routeData.filters:this.routeData?.mode===`live`?`current`:null,e,rt(t,En,`operator.write`,{requireAdvertisement:!1}))}bindInspectorRoute(){let e=this.routeData,t=e?.mode===`run`?e.selector:null,n=Q(e);(n!==this.inspectorSelectorKey||e?.mode!==`run`)&&(this.inspectorSelectorKey=n,this.cancelInspectorRequest(),this.inspectorClient=null,this.runInspector=t?{status:`loading`,waitingForGateway:!0}:{status:`empty`},e?.mode===`run`&&this.syncRunInspector(this.context.gateway,this.context.gateway.snapshot,!0))}cancelInspectorRequest(){this.inspectorEpoch+=1,this.inspectorAbort?.abort(),this.inspectorAbort=null}syncRunInspector(e,t,n=!1){let r=this.routeData;if(r?.mode!==`run`)return;let i=r.selector;if(!i){this.runInspector={status:`empty`};return}if(this.inspectorSelectorKey=Q(r),t.phase!==`connected`||!t.client){this.cancelInspectorRequest(),this.inspectorClient=null,this.runInspector={status:`disconnected`};return}if(it(t,`audit.run.inspect`)===!1){this.cancelInspectorRequest(),this.inspectorClient=t.client,this.runInspector={status:`unsupported`};return}if(!rt(t,`audit.run.inspect`,`operator.read`)){this.cancelInspectorRequest(),this.inspectorClient=t.client,this.runInspector={status:`unauthorized`};return}(n||this.inspectorClient!==t.client||this.runInspector.status!==`loading`&&this.runInspector.status!==`ready`)&&this.loadRunInspector(e,t.client,i)}isUnknownInspectMethod(e){return e instanceof Be&&e.gatewayCode===`INVALID_REQUEST`&&(e.message===`unknown method: audit.run.inspect`||e.message===`missing scope: operator.admin`)}async loadRunInspector(e,t,n,r){this.cancelInspectorRequest();let i=this.inspectorEpoch,a=new AbortController;this.inspectorAbort=a,this.inspectorClient=t,this.runInspector=r?{...r,executionPageStatus:`loading`}:{status:`loading`,waitingForGateway:!1};let o=Q(this.routeData),s=()=>this.inspectorEpoch===i&&this.context.gateway===e&&e.snapshot.client===t&&e.snapshot.phase===`connected`&&this.routeData?.mode===`run`&&Q(this.routeData)===o,c=this.routeData?.mode===`run`?this.routeData.decisionCursor:null;try{let e=n.kind===`run`?{runId:n.id,decisionLimit:50,executionLimit:50,...c?{decisionCursor:c}:{},...r?.result.nextExecutionCursor?{executionCursor:r.result.nextExecutionCursor}:{}}:{executionId:n.id,decisionLimit:50,...c?{decisionCursor:c}:{}},i=await t.request(`audit.run.inspect`,e,{signal:a.signal});if(s()){if(r?.result.identity.state===`ambiguous`&&i.identity.state===`ambiguous`){let e=new Map(r.result.identity.candidates.map(e=>[e.executionId,e]));for(let t of i.identity.candidates)e.set(t.executionId,t);this.runInspector={status:`ready`,result:{...i,identity:{...i.identity,candidates:[...e.values()]}},receiptPageCursors:r.receiptPageCursors}}else this.runInspector={status:`ready`,result:i,receiptPageCursors:nn(i.decisionDisplays,c??void 0)}}}catch(e){if(!s()||a.signal.aborted)return;this.runInspector=ce(e)?{status:`unauthorized`}:this.isUnknownInspectMethod(e)?{status:`unsupported`}:r?{...r,executionPageStatus:`error`}:{status:`error`,recovery:c&&Tr(e)?`restart`:`retry`}}finally{this.inspectorAbort===a&&(this.inspectorAbort=null)}}loadMoreExecutions(){let e=this.routeData,t=this.context.gateway.snapshot,n=this.runInspector;e?.mode===`run`&&e.selector?.kind===`run`&&t.phase===`connected`&&t.client&&n.status===`ready`&&n.executionPageStatus!==`loading`&&n.result.identity.state===`ambiguous`&&n.result.nextExecutionCursor&&this.loadRunInspector(this.context.gateway,t.client,e.selector,n)}loadMoreDecisions(){let e=this.routeData,t=this.context.gateway,n=t.snapshot,r=this.runInspector;if(e?.mode!==`run`||!e.selector||n.phase!==`connected`||!n.client||r.status!==`ready`||r.decisionPageStatus===`loading`||r.result.identity.state!==`present`||!r.result.nextDecisionCursor)return;let i=r.result.nextDecisionCursor,a=e.selector,o=n.client,s=Q(e);this.cancelInspectorRequest();let c=this.inspectorEpoch,l=new AbortController;this.inspectorAbort=l,this.runInspector={...r,decisionPageStatus:`loading`};let u=()=>this.inspectorEpoch===c&&this.context.gateway===t&&t.snapshot.client===o&&t.snapshot.phase===`connected`&&Q(this.routeData)===s,d=a.kind===`run`?{runId:a.id,decisionCursor:i,decisionLimit:50,executionLimit:50}:{executionId:a.id,decisionCursor:i,decisionLimit:50};o.request(`audit.run.inspect`,d,{signal:l.signal}).then(e=>{if(!u())return;let t=rn(r.result,e);if(!t){this.runInspector={...r,decisionPageStatus:`error`};return}let n=new Map(r.receiptPageCursors);for(let t of e.decisionDisplays)n.set(t.selectorId,i);this.runInspector={status:`ready`,result:t,receiptPageCursors:n}}).catch(e=>{u()&&!l.signal.aborted&&(this.runInspector=ce(e)?{status:`unauthorized`}:this.isUnknownInspectMethod(e)?{status:`unsupported`}:{...r,decisionPageStatus:`error`})}).finally(()=>{this.inspectorAbort===l&&(this.inspectorAbort=null)})}restartRunInspector(){let e=this.routeData;e?.mode===`run`&&e.selector&&this.context.navigate(`activity`,{search:$t(e.selector)})}selectMode(e){this.context.navigate(`activity`,{search:e===`live`?`?view=live`:``})}applyGatewayEvent(e,t){if(this.context.gateway!==e)return;let n=t.event===`session.message`?Ae(t.payload):null,r=n&&(n.hasActiveRun===!1||n.status!==null&&n.status!==`running`&&n.status!==`queued`);if((t.event===`sessions.changed`||this.routeData?.mode===`live`&&r)&&this.sessionActivity.invalidate(t.payload),t.event===`presence`){let e=Je(t.payload);this.presencePayload=e?{presence:e}:void 0}}clearEntries(){this.context.liveActivity.clear()}renderMode(e,t,n){if(n&&e.mode===`run`)return Ve();if(e.mode===`sessions`){let r=dt(this.presencePayload).users;return ir({context:this.context,expandedAutomationDays:this.expandedAutomationDays,filters:{...e.filters,personId:this.sessionActivity.result?.involvingProfileId??e.filters.personId},presenceViewers:r,result:this.sessionActivity.result,loading:n||this.sessionActivity.loading,retrying:this.sessionActivity.retrying,error:this.sessionActivity.error,onRetry:()=>this.syncSessionActivity(`retry`),onSummaryRetry:rt(this.context.gateway.snapshot,`sessions.activitySummary.ensure`,`operator.write`,{requireAdvertisement:!1})?e=>this.sessionActivity.retrySummary(e):void 0,onAutomationDayToggle:e=>{let t=new Set(this.expandedAutomationDays);t.has(e)?t.delete(e):t.add(e),this.expandedAutomationDays=t},onFiltersChange:e=>this.context.navigate(`activity`,this.sessionActivity.locationForFilters(e,t,this.context.basePath,r))})}if(e.mode===`run`)return C`<a
          class="activity-run-inspector-back"
          href=${Ye(`activity`,this.context.basePath)}
          >${E.arrowLeft}${m(`activityFeed.backToSessions`)}</a
        >
        ${Sn({basePath:this.context.basePath,state:this.runInspector,onLoadMoreExecutions:()=>this.loadMoreExecutions(),onLoadMoreDecisions:()=>this.loadMoreDecisions(),selectorId:e.selectorId,selector:e.selector,onRestart:()=>this.restartRunInspector(),onRetry:()=>this.syncRunInspector(this.context.gateway,this.context.gateway.snapshot,!0)})}`;let r={agentsList:this.context.agents.state.agentsList,hello:this.context.gateway.snapshot.hello};return C`<div id="activity-live-panel">
      ${Rt({basePath:this.context.basePath,fallbackAgentId:ye(r),mainKey:Ee(r),globalScope:me(r),navigate:this.context.navigate,connected:this.context.gateway.snapshot.phase===`connected`,result:this.sessionActivity.result,loading:n||this.sessionActivity.loading,incomplete:this.sessionActivity.incomplete,error:this.sessionActivity.error,onRetry:()=>this.syncSessionActivity(`retry`)})}
      ${xr({basePath:this.context.basePath,entries:this.entries,filterText:this.filterText,statusFilters:this.statusFilters,toolFilter:this.toolFilter,expandedIds:this.expandedIds,autoFollow:this.autoFollow,onFilterTextChange:e=>this.filterText=e,onToolFilterChange:e=>this.toolFilter=e,onStatusToggle:(e,t)=>{this.statusFilters={...this.statusFilters,[e]:t}},onToggleAutoFollow:e=>this.autoFollow=e,onClear:()=>this.clearEntries(),onExpandAll:()=>{this.expandedIds=new Set(this.entries.map(e=>e.id))},onCollapseAll:()=>{this.expandedIds=new Set},onEntryToggle:(e,t)=>{let n=new Set(this.expandedIds);t?n.add(e):n.delete(e),this.expandedIds=n},onScroll:e=>this.streamFollow.handleScroll(e)})}
    </div>`}render(){let e=!this.routeData||!this.routeLocation,t=this.routeData??this.presentedRoute?.data,n=this.routeLocation??this.presentedRoute?.location;if(!t||!n)return Ve();let r=t.mode,i=C`
      ${r===`run`?y:ht({id:`activity-mode`,active:r,tabs:[{value:`sessions`,label:m(`activityFeed.sessionsMode`)},{value:`live`,label:m(`activity.runInspector.liveMode`)}],ariaLabel:m(`activity.runInspector.activityView`),panelId:`activity-mode-panel`,className:`activity-mode-tabs`,variant:`sub`,onSelect:e=>this.selectMode(e)})}
      <div
        id="activity-mode-panel"
        role=${r===`run`?y:`tabpanel`}
        aria-labelledby=${r===`run`?y:`activity-mode-tab-${r}`}
      >
        ${this.renderMode(t,n,e)}
      </div>
    `;return C`
      <section class="content-header">
        <div>
          <div class="page-title">${$e(`activity`)}</div>
          ${r===`live`?y:C`<div class="page-sub">${m(`subtitles.activity`)}</div>`}
        </div>
      </section>
      ${kt(i,{fillHeight:!0})}
    `}},i([s({context:We,subscribe:!0})],$.prototype,`context`,void 0),i([w({attribute:!1})],$.prototype,`routeLocation`,void 0),i([S()],$.prototype,`entries`,void 0),i([S()],$.prototype,`filterText`,void 0),i([S()],$.prototype,`statusFilters`,void 0),i([S()],$.prototype,`toolFilter`,void 0),i([S()],$.prototype,`expandedIds`,void 0),i([S()],$.prototype,`expandedAutomationDays`,void 0),i([S()],$.prototype,`autoFollow`,void 0),i([S()],$.prototype,`runInspector`,void 0),i([S()],$.prototype,`presencePayload`,void 0),Er={header:!0,render:e=>C`<openclaw-activity-page .routeLocation=${e}></openclaw-activity-page>`},customElements.get(`openclaw-activity-page`)||customElements.define(`openclaw-activity-page`,$)})))()}Dr();export{Er as activityPageComponent};
//# sourceMappingURL=activity-page-QHoiM8hs.js.map