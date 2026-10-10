import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Fi as t,Ga as n,Kr as r,Rr as i,fr as a,pr as o,tr as s,wr as c,zr as l}from"./control-ui-foundation-DaCuy7E_.js";import{Al as u,Bs as ee,Ec as te,Fl as ne,Gn as re,Il as ie,Kn as ae,Ol as d,Sl as oe,Ss as f,Tc as se,Tl as p,Vs as ce,bs as m,jl as le,sn as ue,un as de,wl as fe}from"./control-ui-core-CndkyZ8m.js";import{$ as h,Q as g,at as pe,dt as _,nt as v,pt as me,r as he,t as ge}from"./lit-runtime-CIjzngcy.js";import{$r as _e,Qr as ve,lr as ye}from"./control-ui-core-C5mtYcym.js";import{c as be,s as xe,u as Se}from"./gateway-runtime-BvWNTqPo.js";import{Fa as Ce,Ia as we}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Mn as Te,Nn as Ee,at as De,fa as Oe,m as y,nt as ke,p as Ae,pa as je}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as Me,t as Ne}from"./en-settings-BjX72HeL.js";import{K as Pe,Y as Fe,nt as Ie,q as Le,rt as Re}from"./control-ui-boot-new-CQMzhCGu.js";import{n as ze,r as Be,t as Ve}from"./slots-aGHCB50d.js";var b,x;function S(){return(S=e((()=>{ie(),b={dreaming:{tabs:{scene:`Scene`,diary:`Diary`,advanced:`Advanced`},header:{refresh:`Refresh`,refreshing:`Refreshing…`,on:`Dreaming On`,off:`Dreaming Off`,engineOff:`Memory engine is Off. Choose an engine in Settings to enable dreaming.`},toggleConfirmation:{subtitle:`Dreaming is a global setting; it is not scoped to this agent.`,enableTitle:`Turn On Dreaming for All Agents`,enableDetail:`The nightly dreaming sweep will run across every configured agent workspace, promoting short-term recalls into long-term memory. This applies right away.`,enableConfirm:`Turn On Dreaming`,disableTitle:`Turn Off Dreaming for All Agents`,disableDetail:`The nightly dreaming sweep will stop for every configured agent, not just this one. Memories already written stay; nothing new gets promoted. This applies right away.`,disableConfirm:`Turn Off Dreaming`,saving:`Saving…`,failed:`Could not apply change. Check your connection and try again.`},status:{active:`Dreaming Active`,idle:`Dreaming Idle`,promotedSuffix:`promoted`,nextSweepPrefix:`next sweep`},scene:{backfill:`Backfill`,dedupeDiary:`Dedupe Diary`,reset:`Reset`,clearGrounded:`Clear Replayed`,repairCache:`Repair Dream Cache`,working:`Working…`},phase:{light:`Light`,deep:`Deep`,rem:`Rem`,off:`off`},advanced:{eyebrow:`Review`,title:`Daily Log Review`,description:`Review what came from the daily log, what is waiting for promotion, and what was promoted recently.`,summaryFromDailyLog:`from daily log`,summaryWaiting:`waiting`,summaryPromotedToday:`promoted today`,stagedTitle:`From the Daily Log`,stagedDescription:`Replay candidates pulled from older daily log entries.`,shortTermTitle:`Waiting for Promotion`,shortTermDescription:`Current short-term candidates waiting to graduate into real memory.`,sortRecent:`Most recent`,sortSignals:`Strongest support`,originDailyLog:`replayed`,originLive:`live`,originMixed:`mixed`,promotedTitle:`Recent Promotions`,promotedDescription:`Items that already made it through promotion.`,emptyGrounded:`No staged grounded replay entries right now.`,emptyShortTerm:`No short-term entries to inspect.`,emptyPromoted:`No recent promotions to inspect.`,updatedPrefix:`updated`},stats:{grounded:`Grounded`,signals:`Signals`},diary:{title:`Dream Diary`,noDreamsYet:`No dreams yet`,noDreamsHint:`Dreams will appear here after the first dreaming cycle runs.`,waitingTitle:`The diary is waiting`,waitingHint:`Narrative entries will appear after the next dreaming cycle.`,reload:`Reload`,reloading:`Reloading…`},actions:{dedupeRemovedOneAndKept:`Removed {removed} duplicate dream entry and kept {kept}.`,dedupeRemovedManyAndKept:`Removed {removed} duplicate dream entries and kept {kept}.`,dedupeRemovedOne:`Removed {removed} duplicate dream entry.`,dedupeRemovedMany:`Removed {removed} duplicate dream entries.`,repairArchivedThreadCorpus:`archived session corpus`,repairArchivedIngestionState:`archived ingestion state`,repairArchivedDreamDiary:`archived dream diary`,repairNoChanges:`Dream cache repair finished with no changes.`,repairCompleteWithArchive:`Dream cache repair complete: {actions}. Archive: {archiveDir}`,repairComplete:`Dream cache repair complete: {actions}.`,backfillComplete:`Backfilled {count} dream diary entries.`,resetDiaryComplete:`Removed {count} backfilled dream diary entries.`,clearReplayedComplete:`Cleared {count} replayed short-term entries.`,complete:`Dream diary action complete.`,confirmRepairDescription:`This archives derived dream cache files and rebuilds them from clean inputs. Your dream diary stays untouched.`,confirmDedupeDescription:`This rewrites DREAMS.md and removes only exact duplicate diary entries.`,archivePathCopied:`Archive path copied.`,archivePathCopyFailed:`Could not copy archive path.`,updateFailed:`Could not update dreaming settings.`,unsupportedPlugin:`Selected memory plugin "{pluginId}" does not support dreaming settings.`,configHashMissing:`Config hash missing; refresh and retry.`},wiki:{previewFallbackTitle:`Wiki page`,close:`Close`,loadingPage:`Loading wiki page…`,dreamsTab:`Dreams`,insightsTab:`Imported Insights`,wikiTab:`Memory Wiki`,dreamsExplainer:`This is the raw dream diary the system writes while replaying and consolidating memory; use it to inspect what the memory system is noticing, and where it still looks noisy or thin.`,insightsExplainer:`These are imported insights clustered from external history; use them to review what imports surfaced before any of it graduates into durable memory.`,wikiExplainer:`This is the compiled memory wiki surface the system can search and reason over; use it to inspect actual memory pages, claims, open questions, and contradictions rather than raw imported source chats.`,copyArchivePath:`Copy archive path`,loadingInsights:`Loading imported insights…`,noInsights:`No imported insights yet`,noInsightsHint:`Run a ChatGPT import with apply to surface clustered imported insights here.`,candidateSignals:`Potentially useful signals`,corrections:`Corrections or revisions`,importDetails:`Import details`,startedWith:`Started with:`,endedOn:`Ended on:`,messages:`Messages:`,riskReasons:`Risk reasons:`,labels:`Labels:`,openSourcePage:`Open source page`,loadingWiki:`Loading memory wiki…`,emptyWiki:`Memory wiki is not populated yet`,emptyWikiHint:`Right now the wiki mostly has raw source imports and operational reports. This tab becomes useful once syntheses, entities, or concepts start getting written.`,claims:`Claims`,openQuestions:`Open questions`,contradictions:`Contradictions`,pageDetails:`Page details`,wikiPage:`Wiki page:`,id:`Id:`,openWikiPage:`Open wiki page`,unavailable:`Memory Wiki is not enabled`,unavailablePluginPrefix:`Imported Insights and Memory Wiki are provided by the bundled`,unavailablePluginSuffix:`plugin.`,enablePrefix:`Enable`,enableSuffix:`, then reload this tab.`,openConfig:`Open Config`,howToEnable:`How to enable`,pageTypes:{entity:`entity`,concept:`concept`,source:`source`,synthesis:`synthesis`,report:`report`},pageGroups:{sources:`Sources`,syntheses:`Syntheses`,reports:`Reports`,entities:`Entities`,concepts:`Concepts`},counts:{pageOne:`{count} page`,pages:`{count} pages`,claimRowOne:`{count} claim row`,claimRows:`{count} claim rows`,openQuestionOne:`{count} open question`,openQuestions:`{count} open questions`,contradictionOne:`{count} contradiction`,contradictions:`{count} contradictions`,chats:`{count} chats`,sensitive:`{count} sensitive`,signals:`{count} signals`,messages:`{count} messages`,userMessages:`{count} user`,assistantMessages:`{count} assistant`},pageGroupSummary:`{label} · {count}`,noPagesYet:`No pages yet`,sectionPageSummary:`{label}: {count}`,questionCountOnPages:`{questionCount} on {pageCount}`,risk:{needsReview:`needs review`,low:`low risk`,medium:`medium risk`,high:`high risk`,unknown:`unknown risk`},pageNotFound:`No wiki page found for {lookup}.`,previewTruncated:`Showing the first chunk of this page.`,previewTruncatedWithTotal:`Showing the first chunk of this page ({count} total lines).`,boundedResults:`Showing the newest {returned} of {total} items.`,importedClusterSummary:`Imported chats clustered around {label}.`,withheldDigestOne:`{count} digest was withheld pending review.`,withheldDigests:`{count} digests were withheld pending review.`,details:`Details`,hideDetails:`Hide details`,vault:`Vault`,fullVaultBreakdown:`Full vault breakdown: {breakdown}.`,selectedSection:`Selected section: {summary}.`,latestUpdate:`Latest update {date}.`,noContent:`No wiki content available.`},phrases:{consolidatingMemories:`consolidating memories…`,tidyingKnowledgeGraph:`tidying the knowledge graph…`,replayingConversations:`replaying today's conversations…`,weavingShortTerm:`weaving short-term into long-term…`,defragmentingMemoryLane:`defragmenting memory lane…`,filingLooseThoughts:`filing away loose thoughts…`,connectingDots:`connecting distant dots…`,compostingContext:`composting old context windows…`,alphabetizingSubconscious:`alphabetizing the subconscious…`,promotingHunches:`promoting promising hunches…`,forgettingNoise:`forgetting what doesn't matter…`,dreamingEmbeddings:`dreaming in embeddings…`,reorganizingAttic:`reorganizing the memory attic…`,indexingDay:`softly indexing the day…`,nurturingInsights:`nurturing fledgling insights…`,simmeringIdeas:`simmering half-formed ideas…`,whisperingVectorStore:`whispering to the vector store…`}}},x=Object.assign(()=>{ne.dreaming=b.dreaming},{catalog:b})})))()}function C(e,t,n){let r=n?.enabledByDefault??!0,i=e?.config;if(!i||typeof i!=`object`||Array.isArray(i))return r;let a=`plugins`in i&&i.plugins&&typeof i.plugins==`object`?i.plugins:null;if(a?.enabled===!1||(Array.isArray(a?.deny)&&a.deny.every(e=>typeof e==`string`)?a.deny:[]).includes(t))return!1;let o=Array.isArray(a?.allow)&&a.allow.every(e=>typeof e==`string`)?a.allow:[];if(o.length>0&&!o.includes(t))return!1;let s=(a&&`entries`in a&&a.entries&&typeof a.entries==`object`?a.entries:null)?.[t];if(!s||typeof s!=`object`||Array.isArray(s))return r;let c=s.enabled;return typeof c==`boolean`?c:r}function w(e={}){return{client:e.client??null,connected:e.connected??!1,hello:e.hello??null,configSnapshot:e.configSnapshot??null,applySessionKey:e.applySessionKey??`main`,selectedAgentId:e.selectedAgentId??null,resourceRequests:{},dreamingStatusLoading:!1,dreamingStatusError:null,dreamingStatus:null,dreamingModeSaving:!1,dreamDiaryLoading:!1,dreamDiaryActionLoading:!1,dreamDiaryActionMessage:null,dreamDiaryActionArchivePath:null,dreamDiaryError:null,dreamDiaryPath:null,dreamDiaryContent:null,wikiImportInsightsLoading:!1,wikiImportInsightsError:null,wikiImportInsights:null,wikiOverviewLoading:!1,wikiOverviewError:null,wikiOverview:null,lastError:null}}function He(e){return C(e.configSnapshot,F,{enabledByDefault:!1})}function Ue(e,t){let n=Se(e,t);return n===null?He(e):n}function T(e,t,n,r){return xe({client:e.client,hello:e.hello,phase:e.connected?`connected`:`offline`},t,n,r)}function We(e,t){switch(e){case`doctor.memory.dedupeDreamDiary`:{let e=typeof t?.dedupedEntries==`number`?t.dedupedEntries:typeof t?.removedEntries==`number`?t.removedEntries:0,n=typeof t?.keptEntries==`number`?t.keptEntries:void 0;return n===void 0?u(e===1?`dreaming.actions.dedupeRemovedOne`:`dreaming.actions.dedupeRemovedMany`,{removed:String(e)}):u(e===1?`dreaming.actions.dedupeRemovedOneAndKept`:`dreaming.actions.dedupeRemovedManyAndKept`,{removed:String(e),kept:String(n)})}case`doctor.memory.repairDreamingArtifacts`:{let e=[],r=n(t?.archiveDir);return t?.archivedSessionCorpus===!0&&e.push(u(`dreaming.actions.repairArchivedThreadCorpus`)),t?.archivedSessionIngestion===!0&&e.push(u(`dreaming.actions.repairArchivedIngestionState`)),t?.archivedDreamsDiary===!0&&e.push(u(`dreaming.actions.repairArchivedDreamDiary`)),e.length===0?u(`dreaming.actions.repairNoChanges`):r?u(`dreaming.actions.repairCompleteWithArchive`,{actions:e.join(`, `),archiveDir:r}):u(`dreaming.actions.repairComplete`,{actions:e.join(`, `)})}case`doctor.memory.backfillDreamDiary`:return u(`dreaming.actions.backfillComplete`,{count:String(typeof t?.written==`number`?t.written:0)});case`doctor.memory.resetDreamDiary`:return u(`dreaming.actions.resetDiaryComplete`,{count:String(typeof t?.removedEntries==`number`?t.removedEntries:0)});case`doctor.memory.resetGroundedShortTerm`:return u(`dreaming.actions.clearReplayedComplete`,{count:String(typeof t?.removedShortTermEntries==`number`?t.removedShortTermEntries:0)})}return u(`dreaming.actions.complete`)}function E(e){return n(e.selectedAgentId)??null}function D(e){let n=t(t(e?.plugins)?.slots),r=Be(`memory`,n?.memory),i=r.kind===`off`?Ve(`memory`):r.pluginId,a=t(e?.plugins),o=t(a?.entries),s=t(o?.[i]),c=t(s?.config),l=t(c?.dreaming),u=typeof l?.enabled==`boolean`;return{pluginId:i,enabled:r.kind!==`off`&&l?.enabled!==!1,overridden:u,engineOff:r.kind===`off`}}async function O(e,t,n=nt[t]){let r=E(e),i=`${t}Loading`,a=`${t}Error`,o=`${t}AgentId`;if(!r)return;let s=e.client;if(!s||!e.connected)return;if(e[o]!==r&&n.clear(e),(t===`wikiImportInsights`||t===`wikiOverview`)&&!Ue(e,n.method)){delete e.resourceRequests[t],e[i]=!1,e[a]=null,n.clear(e);return}if(e.resourceRequests[t]?.agentId===r&&e[i])return;let c={agentId:r};e.resourceRequests[t]=c,e[i]=!0,e[a]=null;try{let i=await s.request(n.method,{agentId:r});if(e.resourceRequests[t]!==c||E(e)!==r)return;n.apply(e,i),e[o]=r}catch(n){e.resourceRequests[t]===c&&E(e)===r&&(e[a]=m(n))}finally{e.resourceRequests[t]===c&&(delete e.resourceRequests[t],e[i]=!1)}}async function k(e){await O(e,`dreamingStatus`)}async function A(e){await O(e,`dreamDiary`)}async function j(e){await O(e,`wikiImportInsights`)}async function M(e){await O(e,`wikiOverview`)}async function N(e,t,r){let i=e.client,a=E(e);if(!i||!a||!T(e,t,`operator.write`)||e.dreamDiaryActionLoading)return!1;e.dreamDiaryActionLoading=!0,e.dreamingStatusError=null,e.dreamDiaryError=null,e.dreamDiaryActionMessage=null,e.dreamDiaryActionArchivePath=null;try{let o=await i.request(t,{agentId:a});return r?.reloadDiary!==!1&&await A(e),await k(e),e.dreamDiaryActionArchivePath=t===`doctor.memory.repairDreamingArtifacts`?n(o?.archiveDir)??null:null,e.dreamDiaryActionMessage={kind:`success`,text:We(t,o)},!0}catch(t){let n=m(t);return e.dreamingStatusError=n,e.lastError=n,e.dreamDiaryActionArchivePath=null,e.dreamDiaryActionMessage={kind:`error`,text:n},!1}finally{e.dreamDiaryActionLoading=!1}}async function Ge(e){return N(e,`doctor.memory.backfillDreamDiary`)}async function Ke(e){return N(e,`doctor.memory.resetDreamDiary`)}async function qe(e){return N(e,`doctor.memory.resetGroundedShortTerm`,{reloadDiary:!1})}async function Je(e){return N(e,`doctor.memory.repairDreamingArtifacts`,{reloadDiary:!1})}async function Ye(e){let t=e.dreamDiaryActionArchivePath;return t?await re(t)?(e.dreamDiaryActionMessage={kind:`success`,text:u(`dreaming.actions.archivePathCopied`)},!0):(e.dreamDiaryActionMessage={kind:`error`,text:u(`dreaming.actions.archivePathCopyFailed`)},!1):!1}async function Xe(e){return N(e,`doctor.memory.dedupeDreamDiary`)}async function Ze(e,t,n,r){if(e.dreamingModeSaving||!r()||!T(e,`config.patch`,`operator.admin`))return!1;e.dreamingModeSaving=!0,e.dreamingStatusError=null;try{let i=await t.patch({raw:n,note:`Dreaming settings updated from the Dreaming tab.`,canDispatch:r});return i||(e.dreamingStatusError=t.state.lastError??e.lastError??u(`dreaming.actions.updateFailed`)),i}finally{e.dreamingModeSaving=!1}}function Qe(e){let r=t(e),i=Array.isArray(r?.children)?r.children:[];for(let e of i){let r=t(e);if(n(r?.key)===`dreaming`)return!0}return!1}function $e(e){let n=t(e);return t(n?.schema)?.additionalProperties===!1}async function P(e,t){if(!e.state.client||!e.state.connected)return`unknown`;try{let n=await e.lookupSchemaPath(`plugins.entries.${t}.config`);return Qe(n)?`supported`:$e(n)?`unsupported`:`supported`}catch{return`unknown`}}async function et(e,t,n){if(await P(t,n)!==`unsupported`)return!0;let r=u(`dreaming.actions.unsupportedPlugin`,{pluginId:n});return e.dreamingStatusError=r,e.lastError=r,!1}async function tt(e,n,r,i=()=>!0){if(e.dreamingModeSaving||!i())return!1;if(!n.state.configSnapshot?.hash)return e.dreamingStatusError=u(`dreaming.actions.configHashMissing`),!1;let{pluginId:a}=D(t(n.state.configSnapshot?.config)??null);if(!await et(e,n,a)||!i())return!1;let o=await Ze(e,n,{plugins:{entries:{[a]:{config:{dreaming:{enabled:r}}}}}},i);return o&&e.dreamingStatus&&(e.dreamingStatus={...e.dreamingStatus,enabled:r}),o}var F,nt;function I(){return(I=e((()=>{ze(),p(),S(),ae(),f(),be(),x(),F=`memory-wiki`,nt={dreamingStatus:{method:`doctor.memory.status`,clear:e=>{e.dreamingStatus=null},apply:(e,t)=>{e.dreamingStatus=t.dreaming??null}},dreamDiary:{method:`doctor.memory.dreamDiary`,clear:e=>{e.dreamDiaryPath=null,e.dreamDiaryContent=null},apply:(e,t)=>{e.dreamDiaryPath=t.path,e.dreamDiaryContent=t.found?t.content??``:null}},wikiImportInsights:{method:`wiki.importInsights`,clear:e=>{e.wikiImportInsights=null},apply:(e,t)=>{e.wikiImportInsights=t}},wikiOverview:{method:`wiki.overview`,clear:e=>{e.wikiOverview=null},apply:(e,t)=>{e.wikiOverview=t}}}})))()}function rt(e){if(!e.open)return h;let t=e.enabling?u(`dreaming.toggleConfirmation.enableTitle`):u(`dreaming.toggleConfirmation.disableTitle`),n=u(`dreaming.toggleConfirmation.subtitle`),r=e.enabling?u(`dreaming.toggleConfirmation.enableDetail`):u(`dreaming.toggleConfirmation.disableDetail`),i=e.enabling?u(`dreaming.toggleConfirmation.enableConfirm`):u(`dreaming.toggleConfirmation.disableConfirm`);return v`
    <openclaw-modal-dialog label=${t} description=${n} @modal-cancel=${()=>{e.loading||e.onCancel()}}>
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div id=${`dreaming-toggle-confirmation-title`} class="exec-approval-title">${t}</div>
            <div id=${`dreaming-toggle-confirmation-description`} class="exec-approval-sub">${n}</div>
          </div>
        </div>
        <div class="callout ${e.enabling?`info`:`warn`}" style="margin-top: 12px;">
          ${r}
        </div>
        ${e.hasError?v`<div class="exec-approval-error">
                ${u(`dreaming.toggleConfirmation.failed`)}
              </div>`:h}
        <div class="exec-approval-actions">
          <button
            class="btn ${e.enabling?`primary`:`danger`}"
            ?disabled=${e.loading}
            @click=${e.onConfirm}
          >
            ${e.loading?u(`dreaming.toggleConfirmation.saving`):i}
          </button>
          <button class="btn" ?disabled=${e.loading} @click=${e.onCancel}>
            ${u(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function it(){return(it=e((()=>{g(),p(),ye(),S(),x()})))()}function at(e){let t=e,n=Wt.exec(e),r=Gt.exec(e);n&&r&&r.index>n.index&&(t=e.slice(n.index+n[0].length,r.index));let i=[],a=t.split(/\n---\n/).filter(e=>e.trim().length>0);for(let e of a){let t=e.trim().split(`
`),n=``,r=[];for(let e of t){let t=e.trim();if(!n&&t.startsWith(`*`)&&t.endsWith(`*`)&&t.length>2){n=t.slice(1,-1);continue}t.startsWith(`#`)||t.startsWith(`<!--`)||t.length>0&&r.push(t)}r.length>0&&i.push({date:n,body:r.join(`
`)})}return i}function ot(e){return o(e)??null}function st(e){let t=ot(e);if(t===null)return e;let n=new Date(t);return`${n.getMonth()+1}/${n.getDate()}`}function ct(){return{dreamIndex:Math.floor(Math.random()*U.length),dreamLastSwap:0,activeSubTab:`scene`,activeDiarySubTab:`dreams`,advancedWaitingSort:`recent`,expandedInsightCards:new Set,expandedWikiCards:new Set,diaryPage:0,wikiPreviewRequestId:0,wikiPreviewOpen:!1,wikiPreviewLoading:!1,wikiPreviewTitle:``,wikiPreviewPath:``,wikiPreviewUpdatedAt:null,wikiPreviewContent:``,wikiPreviewTotalLines:null,wikiPreviewTruncated:!1,wikiPreviewError:null}}function lt(e,t,n){e.diaryPage=Math.max(0,Math.min(t,Math.max(0,n-1)))}function ut(e){let t=Date.now();return t-e.dreamLastSwap>Kt&&(e.dreamLastSwap=t,e.dreamIndex=(e.dreamIndex+1)%U.length),u(U[e.dreamIndex]??U[0])}function dt(e){let t=Pe(Re(e)),n=`--lob-shell:${t.palette.shell};--lob-claw:${t.palette.claw}`;return v`
    <div class="dreams__lobster" style=${n}>${Fe(t,{sleeping:!0})}</div>
  `}function ft(e){let t=e.viewState,n=!e.active,r=e.dreamingOf??ut(t);return v`
    <div class="dreams-page">
      <!-- ── Sub-tab bar ── -->
      <div class="dreams__topbar">
        ${y({id:`dreams`,active:t.activeSubTab,tabs:[{value:`scene`,label:u(`dreaming.tabs.scene`)},{value:`diary`,label:u(`dreaming.tabs.diary`)},{value:`advanced`,label:u(`dreaming.tabs.advanced`)}],ariaLabel:u(`memoryPage.tabs.dreams`),panelId:`dreams-panel`,variant:`sub`,onSelect:n=>{t.activeSubTab=n,e.onViewStateChange()}})}
      </div>

      <div
        id="dreams-panel"
        class="dreams__panel"
        role="tabpanel"
        aria-labelledby=${`dreams-tab-${t.activeSubTab}`}
      >
        ${t.activeSubTab===`scene`?ht(e,n,r):t.activeSubTab===`diary`?Ut(e):Ft(e)}
      </div>
    </div>
  `}function pt(e){return e.split(`
`).map(e=>e.trim()).filter(e=>e.length>0&&e!==`What Happened`&&e!==`Reflections`&&e!==`Candidates`&&e!==`Possible Lasting Updates`).map(e=>e.replace(/\s*\[memory\/[^\]]+\]/g,``)).map(e=>e.replace(/^(?:\d+\.\s+|-\s+(?:\[[^\]]+\]\s+)?(?:[a-z_]+:\s+)?)/i,``).replace(/^(?:likely_durable|likely_situational|unclear):\s+/i,``).trim()).filter(e=>e.length>0)}function mt(e){return e?new Date(e).toLocaleTimeString([],{hour:`numeric`,minute:`2-digit`}):`—`}function ht(e,t,n){return v`
    <section class="dreams ${t?`dreams--idle`:``}">
      ${qt.map(e=>v`
          <div
            class="dreams__star"
            style="
              top: ${e.top}%;
              left: ${e.left}%;
              width: ${e.size}px;
              height: ${e.size}px;
              background: ${e.hue===`accent`?`var(--accent-muted)`:`var(--text)`};
              animation-delay: ${e.delay}s;
            "
          ></div>
        `)}

      <div class="dreams__moon"></div>

      ${e.active?v`
              <div class="dreams__bubble">
                <span class="dreams__bubble-text">${n}</span>
              </div>
              <div
                class="dreams__bubble-dot"
                style="top: calc(50% - 160px); left: calc(50% - 120px); width: 12px; height: 12px; animation-delay: 0.2s;"
              ></div>
              <div
                class="dreams__bubble-dot"
                style="top: calc(50% - 120px); left: calc(50% - 90px); width: 8px; height: 8px; animation-delay: 0.4s;"
              ></div>
            `:h}

      <div class="dreams__glow"></div>
      ${dt(e.selectedAgentId)}
      <span class="dreams__z">z</span>
      <span class="dreams__z">z</span>
      <span class="dreams__z">Z</span>

      <div class="dreams__status">
        <span class="dreams__status-label"
          >${e.active?u(`dreaming.status.active`):u(`dreaming.status.idle`)}</span
        >
        <div class="dreams__status-detail">
          <div class="dreams__status-dot"></div>
          <span>
            ${e.promotedCount} ${u(`dreaming.status.promotedSuffix`)}
            ${e.nextCycle?v`· ${u(`dreaming.status.nextSweepPrefix`)} ${e.nextCycle}`:h}
            ${e.timezone?v`· ${e.timezone}`:h}
          </span>
        </div>
      </div>

      <!-- Sleep phases -->
      <div class="dreams__phases">
        ${Object.keys(W).map(t=>{let n=e.phases?.[t],r=n!==void 0,i=n?.enabled===!0,a=mt(n?.nextRunAtMs),o=u(W[t]),s=r?i?a:u(`dreaming.phase.off`):`—`;return v`
              <div class="dreams__phase ${r&&!i?`dreams__phase--off`:``}">
                <div class="dreams__phase-dot ${i?`dreams__phase-dot--on`:``}"></div>
                <span class="dreams__phase-name">${o}</span>
                <span class="dreams__phase-next">${s}</span>
              </div>
            `})}
      </div>

      ${e.statusError?v`<div class="dreams__controls-error">${e.statusError}</div>`:h}
    </section>
  `}function gt(e,t,n){return t===n?`${e}:${t}`:`${e}:${t}-${n}`}function L(e){let t=o(e);return t===void 0?e:new Date(t).toLocaleString([],{month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`})}function _t(e){return e.replace(/\\/g,`/`).split(`/`).findLast(Boolean)??e}function vt(e){return u(`dreaming.wiki.pageTypes.${e}`)}function R(e){return u(e===1?`dreaming.wiki.counts.pageOne`:`dreaming.wiki.counts.pages`,{count:String(e)})}function yt(e){return u(e===1?`dreaming.wiki.counts.claimRowOne`:`dreaming.wiki.counts.claimRows`,{count:String(e)})}function bt(e){return u(e===1?`dreaming.wiki.counts.openQuestionOne`:`dreaming.wiki.counts.openQuestions`,{count:String(e)})}function xt(e){return u(e===1?`dreaming.wiki.counts.contradictionOne`:`dreaming.wiki.counts.contradictions`,{count:String(e)})}function St(e){let t=Jt.map(([t,n])=>{let r=e[t];return r>0?u(`dreaming.wiki.pageGroupSummary`,{label:u(`dreaming.wiki.pageGroups.${n}`),count:R(r)}):null}).filter(e=>e!==null);return t.length>0?t.join(`; `):u(`dreaming.wiki.noPagesYet`)}function Ct(e){let t=[u(`dreaming.wiki.sectionPageSummary`,{label:e.label,count:R(e.itemCount)})];if(e.claimCount>0&&t.push(yt(e.claimCount)),e.questionCount>0){let n=e.items.filter(e=>e.questionCount>0).length,r=bt(e.questionCount);t.push(n>0?u(`dreaming.wiki.questionCountOnPages`,{questionCount:r,pageCount:R(n)}):r)}return e.contradictionCount>0&&t.push(xt(e.contradictionCount)),t.join(` · `)}function wt(e){return u(e.digestStatus===`withheld`?`dreaming.wiki.risk.needsReview`:`dreaming.wiki.risk.${e.riskLevel}`)}function Tt(e,t,n){e.has(t)?e.delete(t):e.add(t),n()}async function Et(e,t){let n=t.viewState,r=++n.wikiPreviewRequestId;n.wikiPreviewOpen=!0,n.wikiPreviewLoading=!0,n.wikiPreviewTitle=_t(e),n.wikiPreviewPath=e,n.wikiPreviewUpdatedAt=null,n.wikiPreviewContent=``,n.wikiPreviewTotalLines=null,n.wikiPreviewTruncated=!1,n.wikiPreviewError=null,t.onViewStateChange();try{let i=await t.onOpenWikiPage(e);if(n.wikiPreviewRequestId!==r||!n.wikiPreviewOpen)return;if(!i){n.wikiPreviewError=u(`dreaming.wiki.pageNotFound`,{lookup:e});return}n.wikiPreviewTitle=i.title,n.wikiPreviewPath=i.path,n.wikiPreviewUpdatedAt=i.updatedAt??null,n.wikiPreviewContent=i.content,n.wikiPreviewTotalLines=typeof i.totalLines==`number`?i.totalLines:null,n.wikiPreviewTruncated=i.truncated===!0}catch(e){n.wikiPreviewRequestId===r&&n.wikiPreviewOpen&&(n.wikiPreviewError=m(e))}finally{n.wikiPreviewRequestId===r&&n.wikiPreviewOpen&&(n.wikiPreviewLoading=!1,t.onViewStateChange())}}function z(e){e.wikiPreviewRequestId+=1,e.wikiPreviewOpen=!1,e.wikiPreviewLoading=!1,e.wikiPreviewTitle=``,e.wikiPreviewPath=``,e.wikiPreviewUpdatedAt=null,e.wikiPreviewContent=``,e.wikiPreviewTotalLines=null,e.wikiPreviewTruncated=!1,e.wikiPreviewError=null}function Dt(e){z(e.viewState),e.onViewStateChange()}function Ot(e){let t=e.viewState;return t.wikiPreviewOpen?v`
    <openclaw-modal-dialog
      .label=${t.wikiPreviewTitle||u(`dreaming.wiki.previewFallbackTitle`)}
      style="--openclaw-modal-width: 1120px"
      @modal-cancel=${()=>Dt(e)}
    >
      <div class="dreams-diary__preview-panel">
        <div class="dreams-diary__preview-header">
          <div>
            <div class="dreams-diary__preview-title">
              ${t.wikiPreviewTitle||u(`dreaming.wiki.previewFallbackTitle`)}
            </div>
            <div class="dreams-diary__preview-meta">
              ${t.wikiPreviewPath}
              ${t.wikiPreviewUpdatedAt?` · ${L(t.wikiPreviewUpdatedAt)}`:``}
            </div>
          </div>
          <button
            type="button"
            class="btn btn--subtle btn--sm"
            @click=${()=>Dt(e)}
          >
            ${u(`dreaming.wiki.close`)}
          </button>
        </div>
        <div class="dreams-diary__preview-body">
          ${t.wikiPreviewLoading?v`<div class="dreams-diary__empty-text">${u(`dreaming.wiki.loadingPage`)}</div>`:t.wikiPreviewError?v`<div class="dreams-diary__error">${t.wikiPreviewError}</div>`:v`
                    ${t.wikiPreviewTruncated?v`
                            <div class="dreams-diary__preview-hint">
                              ${t.wikiPreviewTotalLines===null?u(`dreaming.wiki.previewTruncated`):u(`dreaming.wiki.previewTruncatedWithTotal`,{count:String(t.wikiPreviewTotalLines)})}
                            </div>
                          `:h}
                    <pre class="dreams-diary__preview-pre">${t.wikiPreviewContent}</pre>
                  `}
        </div>
      </div>
    </openclaw-modal-dialog>
  `:h}function kt(e){switch(e){case`dreams`:return v` <p class="dreams-diary__explainer">${u(`dreaming.wiki.dreamsExplainer`)}</p> `;case`insights`:return v` <p class="dreams-diary__explainer">${u(`dreaming.wiki.insightsExplainer`)}</p> `;case`wiki`:return v` <p class="dreams-diary__explainer">${u(`dreaming.wiki.wikiExplainer`)}</p> `}return h}function At(e){return o(e)??-1/0}function jt(e,t){let n=At(e.lastRecalledAt),r=At(t.lastRecalledAt);return r===n?t.totalSignalCount===e.totalSignalCount?e.path.localeCompare(t.path):t.totalSignalCount-e.totalSignalCount:r-n}function Mt(e,t){return t.totalSignalCount===e.totalSignalCount?t.phaseHitCount===e.phaseHitCount?jt(e,t):t.phaseHitCount-e.phaseHitCount:t.totalSignalCount-e.totalSignalCount}function Nt(e,t){return t===`signals`?e.toSorted(Mt):e.toSorted(jt)}function Pt(e){let t=e.groundedCount>0,n=e.recallCount>0||e.dailyCount>0;return u(t&&n?`dreaming.advanced.originMixed`:t?`dreaming.advanced.originDailyLog`:`dreaming.advanced.originLive`)}function B(e){return v`
    <section class="dreams-advanced__section">
      <div class="dreams-advanced__section-header">
        <div class="dreams-advanced__section-copy">
          <span class="dreams-advanced__section-title">${u(e.titleKey)}</span>
          <p class="dreams-advanced__section-description">${u(e.descriptionKey)}</p>
        </div>
        <div class="dreams-advanced__section-toolbar">
          ${e.controls??h}
          <span class="dreams-advanced__section-count">${e.entries.length}</span>
        </div>
      </div>
      ${e.entries.length===0?v`<div class="dreams-advanced__empty">${u(e.emptyKey)}</div>`:v`
              <div class="dreams-advanced__list">
                ${e.entries.map(t=>v`
                    <article class="dreams-advanced__item" data-entry-key=${t.key}>
                      ${e.badge?(()=>{let n=e.badge?.(t);return n?v`<span class="dreams-advanced__badge">${n}</span>`:h})():h}
                      <div class="dreams-advanced__snippet">${t.snippet}</div>
                      <div class="dreams-advanced__source">
                        ${gt(t.path,t.startLine,t.endLine)}
                      </div>
                      <div class="dreams-advanced__meta">
                        ${e.meta(t).filter(e=>e.length>0).join(` · `)}
                      </div>
                    </article>
                  `)}
              </div>
            `}
    </section>
  `}function Ft(e){let t=e.viewState,n=e.shortTermEntries.filter(e=>e.groundedCount>0),r=Nt(e.shortTermEntries,t.advancedWaitingSort),i=u(`dreaming.advanced.description`),a=[`${n.length} ${u(`dreaming.advanced.summaryFromDailyLog`)}`,`${e.shortTermCount} ${u(`dreaming.advanced.summaryWaiting`)}`,`${e.promotedCount} ${u(`dreaming.advanced.summaryPromotedToday`)}`].join(` · `);return v`
    <section class="dreams-advanced">
      <div class="dreams-advanced__header">
        <div class="dreams-advanced__intro">
          <span class="dreams-advanced__eyebrow">${u(`dreaming.advanced.eyebrow`)}</span>
          <h2 class="dreams-advanced__title">${u(`dreaming.advanced.title`)}</h2>
          ${i?v`<p class="dreams-advanced__description">${i}</p>`:h}
          <div class="dreams-advanced__summary">${a}</div>
        </div>
        <div class="dreams-advanced__actions">
          ${[{label:u(`dreaming.scene.dedupeDiary`),onClick:e.onDedupeDreamDiary,allowed:e.access.canDedupeDreamDiary},{label:u(`dreaming.scene.repairCache`),onClick:e.onRepairDreamingArtifacts,allowed:e.access.canRepairDreamingArtifacts},{label:u(e.dreamDiaryActionLoading?`dreaming.scene.working`:`dreaming.scene.backfill`),onClick:e.onBackfillDiary,allowed:e.access.canBackfillDiary},{label:u(`dreaming.scene.reset`),onClick:e.onResetDiary,allowed:e.access.canResetDiary},{label:u(`dreaming.scene.clearGrounded`),onClick:e.onResetGroundedShortTerm,allowed:e.access.canResetGroundedShortTerm}].map(({label:t,onClick:n,allowed:r})=>v`
              <button
                class="btn btn--subtle btn--sm"
                ?disabled=${!r||e.modeSaving||e.dreamDiaryActionLoading}
                @click=${()=>n()}
              >
                ${t}
              </button>
            `)}
        </div>
      </div>
      ${e.dreamDiaryActionMessage?v`
              <div
                class="callout ${e.dreamDiaryActionMessage.kind===`success`?`success`:`danger`}"
                role="status"
              >
                <div class="row wrap items-center gap-2">
                  <span>${e.dreamDiaryActionMessage.text}</span>
                  ${e.dreamDiaryActionArchivePath?v`
                          <button
                            class="btn btn--subtle btn--sm"
                            ?disabled=${e.dreamDiaryActionLoading}
                            @click=${()=>e.onCopyDreamingArchivePath()}
                          >
                            ${u(`dreaming.wiki.copyArchivePath`)}
                          </button>
                        `:h}
                </div>
              </div>
            `:h}

      <div class="dreams-advanced__sections">
        ${B({titleKey:`dreaming.advanced.stagedTitle`,descriptionKey:`dreaming.advanced.stagedDescription`,emptyKey:`dreaming.advanced.emptyGrounded`,entries:n,controls:v`
            <button
              class="btn btn--subtle btn--sm"
              ?disabled=${!e.access.canResetGroundedShortTerm||e.modeSaving||e.dreamDiaryActionLoading}
              @click=${()=>e.onResetGroundedShortTerm()}
            >
              ${u(`dreaming.scene.clearGrounded`)}
            </button>
          `,badge:()=>u(`dreaming.advanced.originDailyLog`),meta:e=>[e.groundedCount>0?`${e.groundedCount} ${u(`dreaming.stats.grounded`).toLowerCase()}`:``,e.recallCount>0?`${e.recallCount} recall`:``,e.dailyCount>0?`${e.dailyCount} daily`:``]})}
        ${B({titleKey:`dreaming.advanced.shortTermTitle`,descriptionKey:`dreaming.advanced.shortTermDescription`,emptyKey:`dreaming.advanced.emptyShortTerm`,entries:r,controls:v`
            <div class="dreams-advanced__sort">
              <button
                class="dreams-advanced__sort-btn ${t.advancedWaitingSort===`recent`?`dreams-advanced__sort-btn--active`:``}"
                @click=${()=>{t.advancedWaitingSort=`recent`,e.onViewStateChange()}}
              >
                ${u(`dreaming.advanced.sortRecent`)}
              </button>
              <button
                class="dreams-advanced__sort-btn ${t.advancedWaitingSort===`signals`?`dreams-advanced__sort-btn--active`:``}"
                @click=${()=>{t.advancedWaitingSort=`signals`,e.onViewStateChange()}}
              >
                ${u(`dreaming.advanced.sortSignals`)}
              </button>
            </div>
          `,badge:e=>Pt(e),meta:e=>[`${e.totalSignalCount} ${u(`dreaming.stats.signals`).toLowerCase()}`,e.recallCount>0?`${e.recallCount} recall`:``,e.dailyCount>0?`${e.dailyCount} daily`:``,e.groundedCount>0?`${e.groundedCount} ${u(`dreaming.stats.grounded`).toLowerCase()}`:``,e.phaseHitCount>0?`${e.phaseHitCount} phase hit`:``]})}
        ${B({titleKey:`dreaming.advanced.promotedTitle`,descriptionKey:`dreaming.advanced.promotedDescription`,emptyKey:`dreaming.advanced.emptyPromoted`,entries:e.promotedEntries,badge:e=>Pt(e),meta:e=>[e.promotedAt?`${u(`dreaming.advanced.updatedPrefix`)} ${L(e.promotedAt)}`:``,e.groundedCount>0?`${e.groundedCount} ${u(`dreaming.stats.grounded`).toLowerCase()}`:``,e.totalSignalCount>0?`${e.totalSignalCount} ${u(`dreaming.stats.signals`).toLowerCase()}`:``]})}
      </div>

      ${e.statusError?v`<div class="dreams__controls-error">${e.statusError}</div>`:h}
    </section>
  `}function V(e,t){return t.length>0?v`
        <div class="dreams-diary__insight-list">
          <strong>${u(e)}</strong>
          ${t.map(e=>v`<p class="dreams-diary__insight-line">• ${e}</p>`)}
        </div>
      `:h}function H(e,t){return t?v`
        <p class="dreams-diary__insight-line">
          <strong>${u(e)}</strong>
          ${t}
        </p>
      `:h}function It(e,t){if(e.kind===`import`){let n=e.item;return v`
      <p class="dreams-diary__insight-line">${n.summary}</p>
      ${V(`dreaming.wiki.candidateSignals`,n.candidateSignals)}
      ${V(`dreaming.wiki.corrections`,n.correctionSignals)}
      ${t?v`
              <div class="dreams-diary__insight-list">
                <strong>${u(`dreaming.wiki.importDetails`)}</strong>
                ${H(`dreaming.wiki.startedWith`,n.firstUserLine)}
                ${H(`dreaming.wiki.endedOn`,n.lastUserLine===n.firstUserLine?void 0:n.lastUserLine)}
                ${H(`dreaming.wiki.messages`,`${u(`dreaming.wiki.counts.userMessages`,{count:String(n.userMessageCount)})} · ${u(`dreaming.wiki.counts.assistantMessages`,{count:String(n.assistantMessageCount)})}`)}
                ${H(`dreaming.wiki.riskReasons`,n.riskReasons.join(`, `))}
                ${H(`dreaming.wiki.labels`,n.labels.join(`, `))}
              </div>
            `:h}
      ${n.preferenceSignals.length>0?v`
              <div class="dreams-diary__insight-signals">
                ${n.preferenceSignals.map(e=>v`<span class="dreams-diary__insight-signal">${e}</span>`)}
              </div>
            `:h}
    `}let n=e.item;return v`
    ${n.snippet?v`<p class="dreams-diary__insight-line">${n.snippet}</p>`:h}
    ${V(`dreaming.wiki.claims`,n.claims)}
    ${V(`dreaming.wiki.openQuestions`,n.questions)}
    ${V(`dreaming.wiki.contradictions`,n.contradictions)}
    ${t?v`
            <div class="dreams-diary__insight-list">
              <strong>${u(`dreaming.wiki.pageDetails`)}</strong>
              ${H(`dreaming.wiki.wikiPage`,n.pagePath)}
              ${H(`dreaming.wiki.id`,n.id)}
            </div>
          `:h}
  `}function Lt(e,t){let n=e.viewState,r=t.item,i=t.kind===`import`?n.expandedInsightCards:n.expandedWikiCards,a=i.has(r.pagePath),o=t.kind===`import`?t.item.riskLevel:`wiki`,s=t.kind===`import`?wt(t.item):vt(t.item.kind),c=t.kind===`import`?t.item.activeBranchMessages>0?` · ${u(`dreaming.wiki.counts.messages`,{count:String(t.item.activeBranchMessages)})}`:``:` · ${r.pagePath}`;return v`
    <article
      class="dreams-diary__insight-card dreams-diary__insight-card--clickable"
      data-import-page=${t.kind===`import`?r.pagePath:h}
      data-wiki-page=${t.kind===`wiki`?r.pagePath:h}
      @click=${()=>{if(t.kind===`wiki`&&t.item.kind===`report`){Et(r.pagePath,e);return}Tt(i,r.pagePath,e.onViewStateChange)}}
    >
      <div class="dreams-diary__insight-topline">
        <div class="dreams-diary__insight-title">${r.title}</div>
        <span class="dreams-diary__insight-badge dreams-diary__insight-badge--${o}">
          ${s}
        </span>
      </div>
      <div class="dreams-diary__insight-meta">
        ${r.updatedAt?L(r.updatedAt):_t(r.pagePath)}${c}
      </div>
      ${It(t,a)}
      <div class="dreams-diary__insight-actions">
        <button
          class="btn btn--subtle btn--sm"
          @click=${t=>{t.stopPropagation(),Tt(i,r.pagePath,e.onViewStateChange)}}
        >
          ${u(a?`dreaming.wiki.hideDetails`:`dreaming.wiki.details`)}
        </button>
        <button
          class="btn btn--subtle btn--sm"
          @click=${t=>{t.stopPropagation(),Et(r.pagePath,e)}}
        >
          ${u(t.kind===`import`?`dreaming.wiki.openSourcePage`:`dreaming.wiki.openWikiPage`)}
        </button>
      </div>
    </article>
  `}function Rt(e,t,n){let r=e.viewState;return v`
    <div class="dreams-diary__daychips">
      ${t.map((i,a)=>v`
          <button
            class="dreams-diary__day-chip ${a===n?`dreams-diary__day-chip--active`:``}"
            @click=${()=>{lt(r,a,t.length),e.onViewStateChange()}}
          >
            ${i}
          </button>
        `)}
    </div>
  `}function zt(e,t){let{clusters:n}=t;if(n.length===0)return v`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-text">
          ${u(t.loading?t.loadingKey:t.emptyKey)}
        </div>
        ${t.loading?h:v`<div class="dreams-diary__empty-hint">${u(t.emptyHintKey)}</div>`}
      </div>
    `;let r=e.viewState,i=Math.max(0,Math.min(r.diaryPage,n.length-1)),a=c(n[i],t.kind===`imports`?`selected imported insight cluster`:`selected memory overview cluster`),o=n.reduce((e,t)=>e+t.itemCount,0);return{navigation:Rt(e,n.map(e=>e.label),i),content:v`
      <article class="dreams-diary__entry" key="${t.kind}-${a.key}">
        <div class="dreams-diary__accent"></div>
        <div class="dreams-diary__date">${t.date(a)}</div>
        ${t.truncated?v`<p class="dreams-diary__para dreams-diary__bounded-result">
                ${u(`dreaming.wiki.boundedResults`,{returned:o.toLocaleString(d.getLocale()),total:t.totalItems.toLocaleString(d.getLocale())})}
              </p>`:h}
        <div class="dreams-diary__prose">${t.prose(a)}</div>
        <div class="dreams-diary__insights">${a.items.map(t.renderItem)}</div>
      </article>
    `}}function Bt(e){return zt(e,{kind:`imports`,clusters:e.wikiImportInsights?.clusters??[],totalItems:e.wikiImportInsights?.totalItems??0,truncated:e.wikiImportInsights?.truncated??!1,loading:e.wikiImportInsightsLoading,loadingKey:`dreaming.wiki.loadingInsights`,emptyKey:`dreaming.wiki.noInsights`,emptyHintKey:`dreaming.wiki.noInsightsHint`,date:e=>{let t=[u(`dreaming.wiki.counts.chats`,{count:String(e.itemCount)}),...e.highRiskCount>0?[u(`dreaming.wiki.counts.sensitive`,{count:String(e.highRiskCount)})]:[],...e.preferenceSignalCount>0?[u(`dreaming.wiki.counts.signals`,{count:String(e.preferenceSignalCount)})]:[]];return`${e.label} · ${t.join(` · `)}`},prose:e=>{let t=[u(`dreaming.wiki.importedClusterSummary`,{label:e.label.toLowerCase()}),...e.withheldCount>0?[u(e.withheldCount===1?`dreaming.wiki.withheldDigestOne`:`dreaming.wiki.withheldDigests`,{count:String(e.withheldCount)})]:[]];return v`<p class="dreams-diary__para">${t.join(` `)}</p>`},renderItem:t=>Lt(e,{kind:`import`,item:t})})}function Vt(e){let t=e.wikiOverview;return zt(e,{kind:`wiki`,clusters:t?.clusters??[],totalItems:t?.totalItems??0,truncated:t?.truncated??!1,loading:e.wikiOverviewLoading,loadingKey:`dreaming.wiki.loadingWiki`,emptyKey:`dreaming.wiki.emptyWiki`,emptyHintKey:`dreaming.wiki.emptyWikiHint`,date:()=>{let e=[R(t?.totalPages??0),...(t?.totalClaims??0)>0?[yt(t.totalClaims)]:[],...(t?.totalQuestions??0)>0?[bt(t.totalQuestions)]:[],...(t?.totalContradictions??0)>0?[xt(t.totalContradictions)]:[]];return`${u(`dreaming.wiki.vault`)} · ${e.join(` · `)}`},prose:e=>v`
      <p class="dreams-diary__para">
        ${u(`dreaming.wiki.fullVaultBreakdown`,{breakdown:t?St(t.pageCounts):u(`dreaming.wiki.noPagesYet`)})}
      </p>
      <p class="dreams-diary__para">
        ${u(`dreaming.wiki.selectedSection`,{summary:Ct(e)})}
        ${e.updatedAt?` ${u(`dreaming.wiki.latestUpdate`,{date:L(e.updatedAt)})}`:``}
      </p>
    `,renderItem:t=>Lt(e,{kind:`wiki`,item:t})})}function Ht(e){let t=e.viewState;if(typeof e.dreamDiaryContent!=`string`)return v`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-moon">
          <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
            <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="0.5" opacity="0.2" />
            <path d="M20 8a10 10 0 0 1 0 16 10 10 0 1 0 0-16z" fill="currentColor" opacity="0.08" />
          </svg>
        </div>
        <div class="dreams-diary__empty-text">${u(`dreaming.diary.noDreamsYet`)}</div>
        <div class="dreams-diary__empty-hint">${u(`dreaming.diary.noDreamsHint`)}</div>
      </div>
    `;let n=at(e.dreamDiaryContent);if(n.length===0)return v`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-text">${u(`dreaming.diary.waitingTitle`)}</div>
        <div class="dreams-diary__empty-hint">${u(`dreaming.diary.waitingHint`)}</div>
      </div>
    `;let r=n.toReversed(),i=Math.max(0,Math.min(t.diaryPage,r.length-1)),a=c(r[i],`selected dreaming diary entry`);return{navigation:Rt(e,r.map(e=>st(e.date)),i),content:v`
      <article class="dreams-diary__entry" key="${i}">
        <div class="dreams-diary__accent"></div>
        ${a.date?v`<time class="dreams-diary__date">${a.date}</time>`:h}
        <div class="dreams-diary__prose">
          ${pt(a.body).map((e,t)=>v`<p class="dreams-diary__para" style="animation-delay: ${.3+t*.15}s;">
                ${he(Ee(e))}
              </p>`)}
        </div>
      </article>
    `}}function Ut(e){let t=e.viewState,n=t.activeDiarySubTab,r=(n===`insights`||n===`wiki`)&&!e.memoryWikiEnabled,i=n===`dreams`?e.dreamDiaryError:n===`insights`?e.wikiImportInsightsError:e.wikiOverviewError;if(i&&!r)return v`
      <section class="dreams-diary">
        <div class="dreams-diary__error">${i}</div>
      </section>
    `;let a=n===`dreams`?Ht(e):n===`insights`?Bt(e):Vt(e),o=`navigation`in a?a.navigation:h,s=`content`in a?a.content:a;return v`
    <section class="dreams-diary">
      <div class="dreams-diary__chrome">
        <div class="dreams-diary__header">
          <span class="dreams-diary__title">${u(`dreaming.diary.title`)}</span>
          ${y({id:`dream-diary`,active:n,tabs:[{value:`dreams`,label:u(`dreaming.wiki.dreamsTab`)},{value:`insights`,label:u(`dreaming.wiki.insightsTab`)},{value:`wiki`,label:u(`dreaming.wiki.wikiTab`)}],ariaLabel:u(`dreaming.diary.title`),panelId:`dream-diary-panel`,variant:`sub`,onSelect:n=>{z(t),t.activeDiarySubTab=n,t.diaryPage=0,e.onViewStateChange()}})}
          <button
            class="btn btn--subtle btn--sm"
            ?disabled=${r?!e.access.canOpenConfig:e.modeSaving||(n===`dreams`?e.dreamDiaryLoading:n===`insights`?e.wikiImportInsightsLoading:e.wikiOverviewLoading)}
            @click=${()=>{t.diaryPage=0,r?e.onOpenConfig():n===`dreams`?e.onRefreshDiary():n===`insights`?e.onRefreshImports():e.onRefreshWikiOverview()}}
          >
            ${r?u(`dreaming.wiki.howToEnable`):n===`dreams`?e.dreamDiaryLoading?u(`dreaming.diary.reloading`):u(`dreaming.diary.reload`):n===`insights`?e.wikiImportInsightsLoading?`Reloading…`:`Reload`:e.wikiOverviewLoading?`Reloading…`:`Reload`}
          </button>
        </div>
        ${kt(n)}
        ${r?h:o}
      </div>

      <div
        id="dream-diary-panel"
        role="tabpanel"
        aria-labelledby=${`dream-diary-tab-${n}`}
      >
        ${r?v`
                <div class="dreams-diary__empty">
                  <div class="dreams-diary__empty-text">${u(`dreaming.wiki.unavailable`)}</div>
                  <div class="dreams-diary__empty-hint">
                    ${u(`dreaming.wiki.unavailablePluginPrefix`)}
                    <code>memory-wiki</code> ${u(`dreaming.wiki.unavailablePluginSuffix`)}
                  </div>
                  <div class="dreams-diary__empty-hint">
                    ${u(`dreaming.wiki.enablePrefix`)}
                    <code>plugins.entries.memory-wiki.enabled = true</code>${u(`dreaming.wiki.enableSuffix`)}
                  </div>
                  <div class="dreams-diary__empty-actions">
                    <button
                      class="btn btn--subtle btn--sm"
                      ?disabled=${!e.access.canOpenConfig}
                      @click=${()=>e.onOpenConfig()}
                    >
                      ${u(`dreaming.wiki.openConfig`)}
                    </button>
                  </div>
                </div>
              `:s}
      </div>
      ${Ot(e)}
    </section>
  `}var Wt,Gt,U,W,Kt,qt,Jt;function Yt(){return(Yt=e((()=>{s(),a(),g(),ge(),Ae(),Ie(),Le(),Te(),ye(),p(),S(),Ne(),f(),Me(),x(),Wt=/<!--\s*openclaw:dreaming:diary:start\s*-->/,Gt=/<!--\s*openclaw:dreaming:diary:end\s*-->/,U=[`dreaming.phrases.consolidatingMemories`,`dreaming.phrases.tidyingKnowledgeGraph`,`dreaming.phrases.replayingConversations`,`dreaming.phrases.weavingShortTerm`,`dreaming.phrases.defragmentingMemoryLane`,`dreaming.phrases.filingLooseThoughts`,`dreaming.phrases.connectingDots`,`dreaming.phrases.compostingContext`,`dreaming.phrases.alphabetizingSubconscious`,`dreaming.phrases.promotingHunches`,`dreaming.phrases.forgettingNoise`,`dreaming.phrases.dreamingEmbeddings`,`dreaming.phrases.reorganizingAttic`,`dreaming.phrases.indexingDay`,`dreaming.phrases.nurturingInsights`,`dreaming.phrases.simmeringIdeas`,`dreaming.phrases.whisperingVectorStore`],W={light:`dreaming.phase.light`,deep:`dreaming.phase.deep`,rem:`dreaming.phase.rem`},Kt=6e3,qt=[{top:8,left:15,size:3,delay:0,hue:`neutral`},{top:12,left:72,size:2,delay:1.4,hue:`neutral`},{top:22,left:35,size:3,delay:.6,hue:`accent`},{top:18,left:88,size:2,delay:2.1,hue:`neutral`},{top:35,left:8,size:2,delay:.9,hue:`neutral`},{top:45,left:92,size:2,delay:1.7,hue:`neutral`},{top:55,left:25,size:3,delay:2.5,hue:`accent`},{top:65,left:78,size:2,delay:.3,hue:`neutral`},{top:75,left:45,size:2,delay:1.1,hue:`neutral`},{top:82,left:60,size:3,delay:1.8,hue:`accent`},{top:30,left:55,size:2,delay:.4,hue:`neutral`},{top:88,left:18,size:2,delay:2.3,hue:`neutral`}],Jt=[[`source`,`sources`],[`synthesis`,`syntheses`],[`report`,`reports`],[`entity`,`entities`],[`concept`,`concepts`]]})))()}function Xt(e){return ue(e,{hour:`numeric`,minute:`2-digit`},``)||null}function Zt(e){let t=Object.values(e?.phases??{}).filter(e=>e.enabled&&typeof e.nextRunAtMs==`number`).map(e=>e.nextRunAtMs).toSorted((e,t)=>e-t)[0];return t===void 0?null:Xt(t)}function Qt(e,t){let n=e&&typeof e==`object`?e:null,r=typeof n?.title==`string`&&n.title.trim()?n.title.trim():t,i=typeof n?.path==`string`&&n.path.trim()?n.path.trim():t,a=typeof n?.content==`string`&&n.content.length>0?n.content:u(`dreaming.wiki.noContent`),o=typeof n?.updatedAt==`string`&&n.updatedAt.trim()?n.updatedAt.trim():void 0,s=typeof n?.totalLines==`number`&&Number.isFinite(n.totalLines)?Math.max(0,Math.floor(n.totalLines)):void 0;return{title:r,path:i,content:a,...s===void 0?{}:{totalLines:s},...n?.truncated===!0?{truncated:!0}:{},...o?{updatedAt:o}:{}}}var G;function $t(){return($t=e((()=>{l(),g(),pe(),_e(),Oe(),ke(),p(),S(),te(),de(),we(),fe(),ce(),I(),it(),Yt(),x(),G=class extends oe{constructor(...e){super(...e),this.agentId=``,this.dreaming=w(),this.toggleConfirmOpen=!1,this.toggleConfirmLoading=!1,this.pendingEnabled=null,this.viewState=ct(),this.gateway=new Ce(this,{getGateway:()=>this.context?.gateway,onSnapshot:({snapshot:e,initial:t,sourceChanged:n})=>this.applyGatewaySnapshot(e,t?`initial`:n?`replacement`:void 0)}),this.selectedAgentId=null,this.subscriptions=new ee(this).effect(()=>this.context?.runtimeConfig,e=>(this.syncConfigSnapshot(),e.subscribe(()=>{this.syncConfigSnapshot(),this.requestUpdate()})))}updated(e){e.has(`agentId`)&&this.applyAgentId()}disconnectedCallback(){this.subscriptions.clear(),this.resetTransientState(),this.dreaming=w(),super.disconnectedCallback()}captureTaskScope(){let e=this.gateway.gateway;return e?{gateway:e,epoch:this.gateway.epoch,state:this.dreaming}:null}isTaskScopeCurrent(e){return this.isConnected&&this.gateway.gateway===e.gateway&&this.gateway.epoch===e.epoch&&this.context.gateway===e.gateway&&this.dreaming===e.state}resetTransientState(){z(this.viewState),this.toggleConfirmOpen=!1,this.toggleConfirmLoading=!1,this.pendingEnabled=null}createGatewayState(e=this.context.gateway.snapshot){return w({client:e.client,connected:e.phase===`connected`,hello:e.hello,configSnapshot:this.context.runtimeConfig.state.configSnapshot,applySessionKey:e.sessionKey,selectedAgentId:this.selectedAgentId})}applyGatewaySnapshot(e,t){let n=this.dreaming.client!==e.client,r=this.dreaming.connected!==(e.phase===`connected`),i=e.phase===`connected`&&!this.dreaming.connected,a=t===`replacement`||n||r;a?(this.dreaming=this.createGatewayState(e),t!==`initial`&&this.resetTransientState()):(this.dreaming.connected=e.phase===`connected`,this.dreaming.hello=e.hello,this.dreaming.applySessionKey=e.sessionKey),e.phase===`connected`&&this.selectedAgentId&&(a||i)&&this.loadAll(),this.requestUpdate()}applyAgentId(){let e=this.agentId.trim()||null;this.selectedAgentId!==e&&(this.selectedAgentId=e,this.gateway.invalidate(),this.resetTransientState(),this.dreaming=this.createGatewayState(),e&&this.dreaming.connected&&this.loadAll())}syncConfigSnapshot(){this.dreaming.configSnapshot=this.context.runtimeConfig.state.configSnapshot}async runDreamingTask(e,t=this.captureTaskScope()){if(!t||!this.isTaskScopeCurrent(t))return;let n=e(t.state);this.requestUpdate();try{let e=await n;return this.isTaskScopeCurrent(t)?e:void 0}finally{this.isTaskScopeCurrent(t)&&this.requestUpdate()}}async confirmDreamingTask(e,t){let n=this.captureTaskScope();n&&await je(t)&&this.isTaskScopeCurrent(n)&&await this.runDreamingTask(e,n)}async loadAll(e=!1){let t=this.captureTaskScope();if(!t||!t.state.client||!t.state.connected||!t.state.selectedAgentId)return;let n=this.context.runtimeConfig;e?await n.refresh():await n.ensureLoaded(),this.isTaskScopeCurrent(t)&&this.context.runtimeConfig===n&&(this.syncConfigSnapshot(),await Promise.all([this.runDreamingTask(k,t),this.runDreamingTask(A,t),this.runDreamingTask(j,t),this.runDreamingTask(M,t)]))}setEnabled(e,t){!T(this.dreaming,`config.patch`,`operator.admin`)||this.dreaming.dreamingModeSaving||this.toggleConfirmLoading||this.toggleConfirmOpen||t===e||(this.pendingEnabled=e,this.toggleConfirmOpen=!0,this.dreaming.dreamingStatusError=null)}cancelToggle(){this.toggleConfirmLoading||(this.toggleConfirmOpen=!1,this.pendingEnabled=null,this.dreaming.dreamingStatusError=null)}async confirmToggle(){let e=this.pendingEnabled;if(e==null||this.toggleConfirmLoading||!T(this.dreaming,`config.patch`,`operator.admin`))return;this.toggleConfirmLoading=!0,this.dreaming.dreamingStatusError=null;let t=this.captureTaskScope(),n=this.context.runtimeConfig;if(!t){this.toggleConfirmLoading=!1;return}try{let r=()=>this.isTaskScopeCurrent(t)&&this.context.runtimeConfig===n&&T(t.state,`config.patch`,`operator.admin`),i=await this.runDreamingTask(t=>tt(t,n,e,r),t);if(!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n)return;if(!i){this.dreaming.dreamingStatusError??=u(`dreaming.toggleConfirmation.failed`);return}if(await n.refresh(),!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n||(this.syncConfigSnapshot(),await this.runDreamingTask(k,t),!this.isTaskScopeCurrent(t)))return;this.toggleConfirmOpen=!1,this.pendingEnabled=null}finally{this.isTaskScopeCurrent(t)&&(this.toggleConfirmLoading=!1)}}async openWikiPage(e){let t=this.captureTaskScope(),n=t?.state.client,r=t?.state.selectedAgentId;if(!t||!n||!t.state.connected||!r)return null;let i=await n.request(`wiki.get`,{lookup:e,fromLine:1,lineCount:5e3,agentId:r});return!this.isTaskScopeCurrent(t)||t.state.selectedAgentId!==r?null:Qt(i,e)}async refreshWikiData(e){let t=this.captureTaskScope();if(!t?.state.selectedAgentId)return;let n=this.context.runtimeConfig;await n.refresh(),this.isTaskScopeCurrent(t)&&this.context.runtimeConfig===n&&(this.syncConfigSnapshot(),await this.runDreamingTask(e,t))}render(){let e=this.dreaming,t=this.context.runtimeConfig.state,n=D(se(t)),r=n.engineOff?null:e.dreamingStatus,i=r?.enabled??n.enabled,a=e.dreamingStatusLoading||e.dreamingModeSaving,o=T(e,`config.patch`,`operator.admin`),s=e.dreamingStatusLoading||e.dreamDiaryLoading,c=e.selectedAgentId??``;return v`
      <section class="content-header content-header--page agent-memory-panel__header">
        <div class="page-meta">
          <div class="dreaming-header-controls">
            <button
              class="btn btn--subtle btn--sm"
              ?disabled=${a||e.dreamDiaryLoading}
              @click=${()=>void this.loadAll(!0)}
            >
              ${u(s?`dreaming.header.refreshing`:`dreaming.header.refresh`)}
            </button>
            <span class="muted">
              ${n.engineOff?u(`dreaming.header.engineOff`):De(u(`common.enabled`),n.overridden)}
            </span>
            <button
              class="dreams__phase-toggle ${i?`dreams__phase-toggle--on`:``}"
              ?disabled=${!o||a||n.engineOff}
              @click=${()=>this.setEnabled(!i,i)}
            >
              <span class="dreams__phase-toggle-dot"></span>
              <span class="dreams__phase-toggle-label">
                ${u(i?`dreaming.header.on`:`dreaming.header.off`)}
              </span>
            </button>
          </div>
        </div>
      </section>
      ${ft({access:{canOpenConfig:T(e,`config.openFile`,`operator.admin`,{requireAdvertisement:!1}),canBackfillDiary:T(e,`doctor.memory.backfillDreamDiary`,`operator.write`),canDedupeDreamDiary:T(e,`doctor.memory.dedupeDreamDiary`,`operator.write`),canResetDiary:T(e,`doctor.memory.resetDreamDiary`,`operator.write`),canResetGroundedShortTerm:T(e,`doctor.memory.resetGroundedShortTerm`,`operator.write`),canRepairDreamingArtifacts:T(e,`doctor.memory.repairDreamingArtifacts`,`operator.write`)},viewState:this.viewState,active:i,selectedAgentId:c,shortTermCount:r?.shortTermCount??0,promotedCount:r?.promotedToday??0,phases:r?.phases??void 0,shortTermEntries:r?.shortTermEntries??[],promotedEntries:r?.promotedEntries??[],dreamingOf:null,nextCycle:Zt(r),timezone:r?.timezone??null,statusError:e.dreamingStatusError,modeSaving:e.dreamingModeSaving,dreamDiaryLoading:e.dreamDiaryLoading,dreamDiaryActionLoading:e.dreamDiaryActionLoading,dreamDiaryActionMessage:e.dreamDiaryActionMessage,dreamDiaryActionArchivePath:e.dreamDiaryActionArchivePath,dreamDiaryError:e.dreamDiaryError,dreamDiaryContent:e.dreamDiaryContent,memoryWikiEnabled:C(t.configSnapshot,`memory-wiki`,{enabledByDefault:!1}),wikiImportInsightsLoading:e.wikiImportInsightsLoading,wikiImportInsightsError:e.wikiImportInsightsError,wikiImportInsights:e.wikiImportInsights,wikiOverviewLoading:e.wikiOverviewLoading,wikiOverviewError:e.wikiOverviewError,wikiOverview:e.wikiOverview,onRefreshDiary:()=>void this.runDreamingTask(A),onRefreshImports:()=>void this.refreshWikiData(j),onRefreshWikiOverview:()=>void this.refreshWikiData(M),onOpenConfig:()=>void this.context.runtimeConfig.openFile(),onOpenWikiPage:e=>this.openWikiPage(e),onBackfillDiary:()=>void this.runDreamingTask(Ge),onCopyDreamingArchivePath:()=>void this.runDreamingTask(Ye),onDedupeDreamDiary:()=>void this.confirmDreamingTask(Xe,{title:u(`dreaming.scene.dedupeDiary`),message:u(`dreaming.actions.confirmDedupeDescription`),confirmLabel:u(`dreaming.scene.dedupeDiary`),danger:!0}),onResetDiary:()=>void this.runDreamingTask(Ke),onResetGroundedShortTerm:()=>void this.runDreamingTask(qe),onRepairDreamingArtifacts:()=>void this.confirmDreamingTask(Je,{title:u(`dreaming.scene.repairCache`),message:u(`dreaming.actions.confirmRepairDescription`),confirmLabel:u(`dreaming.scene.repairCache`)}),onViewStateChange:()=>this.requestUpdate()})}
      ${rt({open:this.toggleConfirmOpen,enabling:this.pendingEnabled===!0,loading:this.toggleConfirmLoading,onConfirm:()=>void this.confirmToggle(),onCancel:()=>this.cancelToggle(),hasError:!!e.dreamingStatusError})}
    `}},r([i({context:ve,subscribe:!0})],G.prototype,`context`,void 0),r([me({attribute:!1})],G.prototype,`agentId`,void 0),r([_()],G.prototype,`dreaming`,void 0),r([_()],G.prototype,`toggleConfirmOpen`,void 0),r([_()],G.prototype,`toggleConfirmLoading`,void 0),r([_()],G.prototype,`pendingEnabled`,void 0),customElements.get(`openclaw-agent-memory-panel`)||customElements.define(`openclaw-agent-memory-panel`,G)})))()}var en,tn,nn,rn,an,on,sn,cn,ln,un,dn,fn,pn,mn;function hn(){return(hn=e((()=>{en=`Run shell now.`,tn=`Inspect/control exec sessions.`,nn=`Schedule reminders, automations, wake events.`,rn=`List visible sessions; filters/previews.`,an=`Read sanitized session history.`,on=`Search past session transcripts.`,sn=`Run same-Gateway session/agent.`,cn=`Spawn hidden subagent (ephemeral) or visible work session (durable).`,ln=`Wait for collector subagents.`,un=`Show session status/model/usage.`,dn=`Ask the user and wait for an answer.`,fn=`Suggest follow-up work for operator approval.`,pn=`Withdraw a pending task suggestion.`,mn=`Author reusable skills under the available tool's publication and review policy. Read one complete artifact when it fits the model budget.`})))()}var K;function q(){return(q=e((()=>{K=`automations`})))()}function J(e){return Y.filter(t=>t.profiles.includes(e)).map(e=>e.id)}function gn(){let e=new Map;for(let t of Y){let n=`group:${t.sectionId}`,r=e.get(n)??[];r.push(t.id),e.set(n,r)}return{"group:openclaw":Y.filter(e=>e.includeInOpenClawGroup).map(e=>e.id),...Object.fromEntries(e.entries())}}function _n(e){if(!e)return;let t=xn[e];if(t&&(t.allow||t.deny))return{allow:t.allow?[...t.allow]:void 0,deny:t.deny?[...t.deny]:void 0}}function vn(e){let t=e?.swarmEnabled===!0;return bn.map(n=>({id:n.id,label:n.label,tools:n.tools.filter(n=>(n.id!==`agents_wait`||t)&&(n.id!==`github_identity_status`||e?.githubPublicationAvailable!==void 0)&&(n.id!==`github_publish`||e?.githubPublicationAvailable===!0)).map(e=>({id:e.id,label:e.id,description:e.description}))})).filter(e=>e.tools.length>0)}var yn,Y,bn,xn,Sn;function X(){return(X=e((()=>{hn(),q(),yn=[{id:`fs`,label:`Files`},{id:`runtime`,label:`Runtime`},{id:`web`,label:`Web`},{id:`memory`,label:`Memory`},{id:`sessions`,label:`Sessions`},{id:`ui`,label:`UI`},{id:`messaging`,label:`Messaging`},{id:`automation`,label:`Automation`},{id:`nodes`,label:`Nodes`},{id:`agents`,label:`Agents`},{id:`media`,label:`Media`}],Y=[{id:`ls`,description:`List directory entries`,sectionId:`fs`,profiles:[`coding`]},{id:`read`,description:`Read file contents`,sectionId:`fs`,profiles:[`coding`]},{id:`write`,description:`Create or overwrite files`,sectionId:`fs`,profiles:[`coding`]},{id:`edit`,description:`Make precise edits`,sectionId:`fs`,profiles:[`coding`]},{id:`apply_patch`,description:`Patch files`,sectionId:`fs`,profiles:[`coding`]},{id:`exec`,description:en,sectionId:`runtime`,profiles:[`coding`]},{id:`process`,description:tn,sectionId:`runtime`,profiles:[`coding`]},{id:`code_execution`,description:`Run sandboxed remote analysis`,sectionId:`runtime`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`secrets`,description:`Request and manage write-only credentials`,sectionId:`runtime`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`web_search`,description:`Search the web`,sectionId:`web`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`web_fetch`,description:`Fetch web content`,sectionId:`web`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`x_search`,description:`Search X posts`,sectionId:`web`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`memory_search`,description:`Semantic search`,sectionId:`memory`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`memory_get`,description:`Read memory files`,sectionId:`memory`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`sessions`,description:`Session settings: label, pin, archive, groups`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_list`,description:rn,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_history`,description:an,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_search`,description:on,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`conversations_list`,description:`List exact external conversation addresses`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`conversations_send`,description:`Send to an exact external conversation`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`conversations_turn`,description:`Send and wait for a correlated external reply`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_send`,description:sn,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`sessions_spawn`,description:cn,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`github_identity_status`,description:`Inspect the effective GitHub identity and credential health`,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`github_publish`,description:`Publish the reconciled session worktree as a draft GitHub pull request`,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`agents_wait`,description:ln,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`sessions_yield`,description:`End turn to receive sub-agent results`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`subagents`,description:`Background work: subagents, media gen, automation runs. list/cancel.`,sectionId:`sessions`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`session_status`,description:un,sectionId:`sessions`,profiles:[`minimal`,`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`suggest_task`,description:fn,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`dismiss_task`,description:pn,sectionId:`sessions`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`browser`,description:`Control web browser`,sectionId:`ui`,profiles:[],includeInOpenClawGroup:!0},{id:`screen`,description:`Drive operator web UI`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`dashboard`,description:`Read and arrange the session dashboard`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`terminal`,description:`Use shared operator terminals with policy-governed input`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`portal`,description:`Expose local web apps through the gateway`,sectionId:`ui`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`canvas`,description:`Control node Canvas surfaces when the Canvas plugin is enabled`,sectionId:`ui`,profiles:[]},{id:`show_widget`,description:`Show an interactive widget on chat or an auto-fitting dashboard`,sectionId:`ui`,profiles:[],includeInOpenClawGroup:!0},{id:`message`,description:`Send messages`,sectionId:`messaging`,profiles:[`messaging`],includeInOpenClawGroup:!0},{id:`heartbeat_respond`,description:`Accept heartbeat outcomes for post-turn handling`,sectionId:`automation`,profiles:[],includeInOpenClawGroup:!0},{id:K,description:nn,sectionId:`automation`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`gateway`,description:`Update OpenClaw; read Gateway config/schema when permitted`,sectionId:`automation`,profiles:[`minimal`,`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`plugins`,description:`Manage and reload plugins`,sectionId:`automation`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`openclaw`,description:`Delegate OpenClaw setup and repair`,sectionId:`automation`,profiles:[],includeInOpenClawGroup:!0},{id:`nodes`,description:`Nodes + devices`,sectionId:`nodes`,profiles:[],includeInOpenClawGroup:!0},{id:`computer`,description:`Control the Gateway desktop or a paired computer`,sectionId:`nodes`,profiles:[],includeInOpenClawGroup:!0},{id:`mobile_ui`,description:`Observe and control a paired Android app`,sectionId:`nodes`,profiles:[],includeInOpenClawGroup:!0},{id:`agents_list`,description:`List agents`,sectionId:`agents`,profiles:[],includeInOpenClawGroup:!0},{id:`get_goal`,description:`Get current thread goal`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`create_goal`,description:`Create a thread goal`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`update_goal`,description:`Complete or block a thread goal`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`progress_card`,description:`Maintain the session progress card`,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`ask_user`,description:dn,sectionId:`agents`,profiles:[`coding`,`messaging`],includeInOpenClawGroup:!0},{id:`skill_workshop`,description:mn,sectionId:`agents`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`view_image`,description:`Image understanding`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`image_generate`,description:`Image generation`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`music_generate`,description:`Music generation`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`video_generate`,description:`Video generation`,sectionId:`media`,profiles:[`coding`],includeInOpenClawGroup:!0},{id:`tts`,description:`Text-to-speech conversion`,sectionId:`media`,profiles:[],includeInOpenClawGroup:!0},{id:`pdf`,description:`PDF reading and extraction`,sectionId:`media`,profiles:[],includeInOpenClawGroup:!0}],new Map(Y.map(e=>[e.id,e])),bn=yn.map(({id:e,label:t})=>({id:e,label:t,tools:Y.filter(t=>t.sectionId===e)})),xn={minimal:{allow:J(`minimal`)},coding:{allow:[...J(`coding`),`bundle-mcp`]},messaging:{allow:[...J(`messaging`),`bundle-mcp`]},full:{allow:[`*`]}},Sn=gn()})))()}function Cn(e){return e===`automations`?`cron`:e===`view_image`?`image`:e.replace(/_([a-z])/gu,(e,t)=>t.toUpperCase())}function wn(e){return e?.groups?.length?e.groups.map(e=>{let t=Q.get(e.id);return{id:e.id,label:t?u(`agents.toolCatalog.groups.${t}`):e.label,source:e.source,pluginId:e.pluginId,tools:e.tools.map(e=>({id:e.id,label:e.label,description:e.description,source:e.source,pluginId:e.pluginId,optional:e.optional,defaultProfiles:[...e.defaultProfiles]}))}}):vn().map(e=>({id:e.id,label:u(`agents.toolCatalog.groups.${Q.get(e.id)}`),tools:e.tools.map(e=>({...e,description:le(`agents.toolCatalog.descriptions.${Cn(e.id)}`)??e.description}))}))}function Tn(e){return e?.profiles?.length?e.profiles.map(e=>{let t=En.get(e.id);return t?{id:e.id,label:u(t)}:e}):Z.map(e=>({id:e.id,label:u(e.labelKey)}))}var Z,Q,En;function $(){return($=e((()=>{X(),q(),p(),Z=[{id:`minimal`,labelKey:`agents.toolCatalog.profiles.minimal`},{id:`coding`,labelKey:`agents.toolCatalog.profiles.coding`},{id:`messaging`,labelKey:`agents.toolCatalog.profiles.messaging`},{id:`full`,labelKey:`agents.toolCatalog.profiles.full`}],Q=new Map(vn().map(e=>[e.id,e.id===`fs`?`files`:e.id])),En=new Map(Z.map(e=>[e.id,e.labelKey]))})))()}export{Sn as a,$t as c,P as d,wn as i,I as l,$ as n,X as o,Tn as r,_n as s,Z as t,D as u};
//# sourceMappingURL=tool-catalog-Cf41tEdP.js.map