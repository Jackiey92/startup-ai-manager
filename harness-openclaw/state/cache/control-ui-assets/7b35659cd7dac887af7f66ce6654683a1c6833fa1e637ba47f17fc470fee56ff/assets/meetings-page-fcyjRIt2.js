import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,Ua as r,zr as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,F as o,Fl as s,Fr as c,Il as l,Pr as u,Sl as ee,Ss as d,Tl as te,bs as f,wl as ne}from"./control-ui-core-CndkyZ8m.js";import{$ as p,Q as m,at as re,c as h,dt as g,i as ie,nt as _,o as v,pt as ae,r as y,s as b,t as x}from"./lit-runtime-CIjzngcy.js";import{$r as oe,Di as se,Ei as S,Qr as ce,er as C,fa as w,ia as le,nr as ue}from"./control-ui-core-C5mtYcym.js";import{Fa as de,Fi as fe,Ia as pe,Li as me}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as T,U as E,V as D,z as he}from"./control-ui-boot-shared-DwSLfX8E.js";import{Mn as O,Nn as k,m as A,p as j}from"./control-ui-boot-shared-DpHhsTHW.js";import{a as M,o as N}from"./settings-targets-Bmbk6FUn.js";import{n as P,t as F}from"./en-transcripts-BztoUBPF.js";function I(e){let t=new URLSearchParams(e);return{limit:50,query:t.get(`query`)?.slice(0,256)||void 0,providerId:t.get(`providerId`)||void 0,accountId:t.get(`accountId`)||void 0,agentId:t.get(`agentId`)||void 0,startedAfter:L(t.get(`startedAfter`)),startedBefore:L(t.get(`startedBefore`)),cursor:t.get(`cursor`)||void 0}}function L(e){if(e)return/^\d{4}-\d{2}-\d{2}$/u.test(e)?`${e}T00:00:00.000Z`:e}function R(e,t){let n=new URLSearchParams(e);for(let[e,r]of Object.entries(t))r?n.set(e,r):n.delete(e);let r=n.toString();return r?`?${r}`:``}var z,B;function V(){return(V=e((()=>{z=[`providerId`,`accountId`,`agentId`,`startedAfter`,`startedBefore`],B=[`query`,...z]})))()}var H,U;function W(){return(W=e((()=>{l(),H={meetings:{emptyTitle:`Your meeting notes, together`,docs:`Set up meeting transcripts`,inProgress:`In progress`,activeNotes:`Capture is in progress. Refresh to check for notes.`,noSpeech:`No speech captured`,listLabel:`Meetings by day`,newestFirst:`Newest first · grouped by meeting date`,loadingMeetings:`Loading meetings…`,loadingSummary:`Loading summary…`,loadingTranscript:`Loading transcript…`,summaryAfterMeeting:`A summary is saved automatically when the meeting ends.`,summaryUnavailable:`No saved summary preview is available.`,noResults:`No meetings match your search`}},U=Object.assign(()=>{Object.assign(s,H)},{catalog:H})})))()}function G(e){return e?new Date(e).toLocaleString():a(`transcripts.unknown`)}function ge(e){let t=a(`transcripts.sourceTime`,{time:G(e)});return _`<time datetime=${e??p} title=${t} aria-label=${t}
    >${e?new Date(e).toLocaleTimeString():a(`transcripts.unknown`)}</time
  >`}function _e(e){return[e.providerId,e.accountId,e.guildId,e.channelId,e.meetingUrl,e.threadTs,e.fileId].filter(Boolean).join(` · `)}function K(e,t){let n=c(e);return _`<div class="transcripts-notice" role="alert" tabindex="-1">
    <h2>${a(n?`transcripts.forbidden`:`transcripts.loadError`)}</h2>
    <p>${n?a(`transcripts.forbiddenHint`):f(e)}</p>
    <button class="btn" @click=${t}>${a(`common.retry`)}</button>
  </div>`}function q(e){return _`<div class="meetings-loading" role="status" aria-live="polite">
    <span class="btn__spinner" aria-hidden="true"></span>
    <span>${e}</span>
  </div>`}function ve(e){let t=new URLSearchParams(e.search),n=z.some(e=>t.get(e)),i=(t,n,r=`search`)=>_`<label class="field">
    <span>${n}</span
    ><input
      name=${t}
      type=${r}
      aria-label=${n}
      maxlength=${256}
      .value=${v(e.drafts[t]??``)}
      @input=${n=>e.onDraft(t,n.target.value)}
    />
  </label>`;return _`<form
    class="transcripts-filters"
    aria-label=${a(`transcripts.filters`)}
    @submit=${t=>{t.preventDefault();let n=new FormData(t.currentTarget),i={cursor:null};for(let e of B)i[e]=r(n.get(e));e.onNavigate(i)}}
  >
    ${i(`query`,a(`transcripts.titleFilter`))}
    <details ?open=${n}>
      <summary>${a(`transcripts.advancedFilters`)}</summary>
      <div class="transcripts-filters__advanced">
        ${i(`providerId`,a(`transcripts.sourceFilter`))}
        ${i(`accountId`,a(`transcripts.accountFilter`))}
        ${i(`agentId`,a(`transcripts.agentFilter`))}
        ${i(`startedAfter`,a(`transcripts.afterFilter`),`date`)}
        ${i(`startedBefore`,a(`transcripts.beforeFilter`),`date`)}
      </div>
      <p class="transcripts-caption">${a(`transcripts.filterHint`)}</p>
    </details>
    <div class="transcripts-actions">
      <button type="submit" class="btn">${S.search}${a(`transcripts.filter`)}</button>
      <button
        type="button"
        class="btn"
        @click=${()=>e.onNavigate(Object.fromEntries([...B,`cursor`].map(e=>[e,null])))}
      >
        ${a(`transcripts.clearFilters`)}
      </button>
    </div>
  </form>`}function J(e,t){let n=new URLSearchParams(t.search).get(`selector`),r=e.utteranceCount===0,i=e.participants.slice(0,3).join(`, `),s=e.participants.length-3,c=e.stoppedAt?fe(Math.max(0,Date.parse(e.stoppedAt)-Date.parse(e.startedAt))):null,l={selector:e.selector,find:null,tab:null};return _`<li>
    <a
      class="transcripts-list__entry meetings-row ${r?`meetings-row--silent`:``}"
      aria-current=${e.selector===n?`page`:p}
      href=${w(`meetings`,t.basePath)+R(t.search,l)}
      @click=${e=>{o(e)&&(e.preventDefault(),t.onNavigate(l))}}
    >
      <span class="meetings-row__title"
        >${e.title||e.providerName||e.providerId}</span
      >
      <span class="meetings-row__meta">
        ${e.providerName||e.providerId} ·
        <time datetime=${e.startedAt}
          >${new Date(e.startedAt).toLocaleTimeString(void 0,{hour:`2-digit`,minute:`2-digit`})}</time
        >
        ${e.active?_`<span class="meetings-live">${a(`meetings.inProgress`)}</span>`:c?_` · ${c}`:p}
      </span>
      ${i?_`<span class="meetings-row__meta meetings-row__participants">${i}${s>0?` +${s}`:``}</span>`:p}
      <span class="meetings-row__meta"
        >${a(`transcripts.savedCount`,{count:String(e.utteranceCount)})}</span
      >
      <span class="meetings-row__overview"
        >${r?a(`meetings.noSpeech`):e.overview||a(e.active?`meetings.summaryAfterMeeting`:`meetings.summaryUnavailable`)}</span
      >
    </a>
  </li>`}function ye(e){if(e.listError)return K(e.listError,e.onRefresh);if(e.listLoading||!e.list)return q(a(`meetings.loadingMeetings`));let t=new Map;for(let n of e.list.sessions){let e=new Date(n.startedAt).toLocaleDateString(void 0,{year:`numeric`,month:`long`,day:`numeric`}),r=t.get(e)??[];r.push(n),t.set(e,r)}return _` ${t.size?_`<div class="meetings-timeline" aria-label=${a(`meetings.listLabel`)}>
            <p class="transcripts-caption">${a(`meetings.newestFirst`)}</p>
            ${h(t,([e])=>e,([t,n])=>_`<section class="meetings-day">
                <h2>${t}</h2>
                <ol class="transcripts-list">
                  ${h(n,e=>e.selector,t=>J(t,e))}
                </ol>
              </section>`)}
          </div>`:_`<div class="transcripts-notice" role="status">
            <h2>
              ${a(B.some(t=>new URLSearchParams(e.search).has(t))?`meetings.noResults`:`meetings.emptyTitle`)}
            </h2>
            <p>${a(`transcripts.emptyHint`)}</p>
            <a
              href="https://docs.openclaw.ai/cli/transcripts"
              target="_blank"
              rel="noopener noreferrer"
              >${a(`meetings.docs`)}</a
            >
          </div>`}
    <nav class="transcripts-actions" aria-label=${a(`transcripts.pagination`)}>
      ${new URLSearchParams(e.search).has(`cursor`)?_`<button class="btn" @click=${()=>e.onNavigate({cursor:null})}>
              ${a(`transcripts.firstPage`)}
            </button>`:p}
      ${e.list.nextCursor?_`<button
              class="btn"
              @click=${()=>e.onNavigate({cursor:e.list?.nextCursor??null})}
            >
              ${a(`transcripts.nextPage`)}${S.chevronRight}
            </button>`:p}
    </nav>`}function be(e){let t=e.summary,n=`# ${e.session.title||e.session.sessionId}\n`,r=t?t.markdown.startsWith(n)?t.markdown.slice(n.length):t.markdown:``;return _`<section class="transcripts-summary">
    ${t?_`<p class="transcripts-caption">
              ${t.source?_`${a(t.source===`model`?`transcripts.modelNotes`:`transcripts.heuristicNotes`)}${t.model?` · ${t.model}`:p} · `:p}
              ${a(`transcripts.generatedAt`,{time:G(t.generatedAt)})}
            </p>
            <div class="meetings-notes markdown">
              ${y(k(r,{mode:`document`,remoteImages:!1}))}
            </div>
            <p class="transcripts-caption">${a(`transcripts.summaryHint`)}</p>`:_`<p role="status">${a(`transcripts.noSummary`)}</p>
            ${e.session.active?_`<p>${a(`meetings.activeNotes`)}</p>`:p}`}
  </section>`}function xe(e){let t=new URLSearchParams(e.search),n=e.reader.pages.at(-1),i=n??e.reader.summary;return _`<article
    class="transcripts-reader"
    aria-label=${a(`transcripts.reader`)}
    aria-busy=${e.reader.loading}
  >
    <a
      class="transcripts-back"
      href=${w(`meetings`,e.basePath)+R(e.search,{selector:null,find:null,tab:null})}
      @click=${t=>{o(t)&&(t.preventDefault(),e.onNavigate({selector:null,find:null,tab:null}))}}
      >${S.arrowLeft}${a(`transcripts.back`)}</a
    >
    ${e.reader.error?K(e.reader.error,e.onReaderRetry):p}
    ${e.reader.loading?q(a(e.readerTab===`summary`?`meetings.loadingSummary`:`meetings.loadingTranscript`)):p}
    ${i?_`
            <header class="transcripts-reader__header">
              <h1 tabindex="-1">${i.session.title||i.session.sessionId}</h1>
              <p class="transcripts-caption">
                ${i.session.providerName||i.session.providerId} ·
                <time datetime=${i.session.startedAt}
                  >${G(i.session.startedAt)}</time
                >
                · ${a(`transcripts.savedCount`,{count:String(i.session.utteranceCount)})}
                ${i.session.active?_`<span class="meetings-live">${a(`meetings.inProgress`)}</span>`:p}
              </p>
              <details class="transcripts-source-details">
                <summary>${a(`transcripts.sourceDetails`)}</summary>
                <p class="transcripts-caption">${_e(i.session.source)}</p>
                <p class="transcripts-caption">
                  ${i.session.agentId??a(`transcripts.unattributed`)}
                </p>
                <p class="transcripts-caption">
                  ${a(`transcripts.lastUtterance`,{time:G(i.session.lastUtteranceAt)})}
                </p>
                <p class="transcripts-caption">
                  ${a(i.session.activeSubscription?`transcripts.armedHint`:`transcripts.inactiveHint`)}
                </p>
              </details>
              <div class="transcripts-actions">
                ${[`markdown`,`jsonl`].map(t=>_`<button
                      class="btn"
                      ?disabled=${e.exportState.kind===`loading`}
                      @click=${()=>e.onDownload(t)}
                    >
                      ${S.download}${a(`transcripts.download.${t}`)}
                    </button>`)}
              </div>
              ${e.exportState.kind===`error`?_`<p role="alert">
                      ${a(`transcripts.exportError`)} ${e.exportState.message}
                    </p>`:p}
              ${e.exportState.kind===`loading`||e.exportState.kind===`done`?_`<p role="status">
                      ${a(e.exportState.kind===`loading`?`transcripts.exporting`:`transcripts.downloadStarted`)}
                    </p>`:p}
            </header>
            ${A({id:`transcript-reader`,active:e.readerTab,tabs:[{value:`summary`,label:a(`transcripts.summary`)},{value:`text`,label:a(`transcripts.text`)}],ariaLabel:a(`transcripts.reader`),panelId:`transcript-reader-panel`,variant:`sub`,onSelect:e.onReaderTab})}
            <div
              id="transcript-reader-panel"
              role="tabpanel"
              aria-labelledby=${`transcript-reader-tab-${e.readerTab}`}
            >
              ${e.readerTab===`summary`?e.reader.summary?be(e.reader.summary):p:_`
                      <form
                        class="transcripts-search"
                        role="search"
                        @submit=${t=>{t.preventDefault();let n=r(new FormData(t.currentTarget).get(`find`));e.onNavigate({find:n,tab:`transcript`})}}
                      >
                        <label class="field">
                          <input
                            type="search"
                            name="find"
                            aria-label=${a(`transcripts.searchWithin`)}
                            placeholder=${a(`transcripts.searchWithin`)}
                            maxlength=${256}
                            .value=${v(e.drafts.find??``)}
                            @input=${t=>e.onDraft(`find`,t.target.value)}
                          />
                        </label>
                        <button class="btn" type="submit">
                          ${S.search}${a(`transcripts.search`)}
                        </button>
                        ${t.get(`find`)?_`<button
                                class="btn"
                                type="button"
                                @click=${()=>e.onNavigate({find:null})}
                              >
                                ${a(`transcripts.clearSearch`)}
                              </button>`:p}
                      </form>
                      ${t.get(`find`)?_`<p class="transcripts-caption" role="status">
                              ${a(`transcripts.searchResults`,{query:t.get(`find`)??``})}
                            </p>`:p}
                      ${e.reader.trimmed?_`<p class="transcripts-caption">
                              ${a(`transcripts.windowHint`)}
                              <button class="btn btn--xs" @click=${e.onReaderStart}>
                                ${a(`transcripts.readerStart`)}
                              </button>
                            </p>`:p}
                      <ol class="transcripts-utterances">
                        ${e.reader.pages.flatMap(e=>e.utterances??[]).map(e=>_`<li>
                              <div class="transcripts-utterance__byline">
                                <strong
                                  >${e.speakerLabel??e.speakerId??a(`transcripts.unknownSpeaker`)}</strong
                                >
                                ${ge(e.startedAt??e.endedAt)}
                              </div>
                              <p>${e.text}</p>
                            </li>`)}
                      </ol>
                      ${n&&!e.reader.loading&&!e.reader.error&&!e.reader.pages.some(e=>e.utterances?.length)?_`<p role="status">
                              ${a(t.get(`find`)?`transcripts.noMatches`:`transcripts.noUtterances`)}
                            </p>`:p}
                      ${n?.nextCursor?_`<button
                              class="btn"
                              ?disabled=${e.reader.loading}
                              @click=${e.onLoadMore}
                            >
                              ${a(`transcripts.loadMore`)}
                            </button>`:p}
                    `}
            </div>
          `:p}
  </article>`}function Se(e){let t=!!new URLSearchParams(e.search).get(`selector`),n=M.meetingCapture;return _`<section class="transcripts-workspace">
    <header class="content-header content-header--page">
      <div>
        <h1 class="page-title">${a(`tabs.meetings`)}</h1>
        <p class="page-sub">${a(`subtitles.meetings`)}</p>
      </div>
      <div class="transcripts-actions">
        <a
          class="btn"
          href=${w(n.routeId,e.basePath)+n.search+n.hash}
          >${S.settings}${a(`meetingCapture.title`)}</a
        >
        <button
          class="btn"
          ?disabled=${!e.connected||!e.allowed||e.listLoading}
          @click=${e.onRefresh}
        >
          ${S.refresh}${a(`common.refresh`)}
        </button>
      </div>
    </header>
    ${e.connected?e.allowed?_`<div class="transcripts-layout ${t?`transcripts-layout--selected`:``}">
              <section
                class="transcripts-library"
                aria-label=${a(`transcripts.library`)}
                aria-busy=${e.listLoading}
              >
                ${ve(e)}${ye(e)}
              </section>
              ${t?xe(e):p}
            </div>`:_`<div class="transcripts-notice" role="alert">
              <h2>${a(`transcripts.forbidden`)}</h2>
              <p>${a(`transcripts.forbiddenHint`)}</p>
            </div>`:_`<div class="transcripts-notice" role="status">${a(`transcripts.disconnected`)}</div>`}
  </section>`}function Y(){return(Y=e((()=>{m(),ie(),b(),x(),le(),j(),se(),O(),te(),W(),F(),me(),d(),u(),N(),V(),P(),U()})))()}var X,Z,Q;function $(){return($=e((()=>{i(),he(),m(),re(),oe(),ue(),d(),u(),pe(),ne(),V(),Y(),X=5,Z=class extends ee{constructor(...e){super(...e),this.routeSearch=``,this.drafts={},this.list=null,this.listDenial=null,this.readerDenial=null,this.accessGeneration=0,this.readerCursor=null,this.summary=null,this.readerPages=[],this.trimmed=!1,this.exportState={kind:`idle`},this.exportAbort=null,this.focusSelection=!1,this.gateway=new de(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetConnection(),onSnapshot:({snapshot:{hello:e}})=>{(e!==this.connectionHello||e?.auth!==this.connectionAuth)&&(this.gateway.invalidate(),this.resetConnection()),this.connectionHello=e,this.connectionAuth=e?.auth}}),this.listTask=new T(this,{args:()=>[this.requestClient(),this.gateway.epoch,JSON.stringify(I(this.routeSearch)),this.selection.selector],task:async([e,,t,n],{signal:r})=>e?this.readArchive({client:e,method:`transcripts.list`,params:I(this.routeSearch),signal:r,current:()=>this.selection.selector===n&&JSON.stringify(I(this.routeSearch))===t,accept:e=>{this.listDenial=null,this.list=e}}):D}),this.summaryTask=new T(this,{args:()=>[this.requestClient(),this.gateway.epoch,this.selection.selector],task:async([e,,t],{signal:n})=>!e||!t?D:this.readArchive({client:e,method:`transcripts.get`,params:{selector:t},signal:n,current:()=>this.selection.selector===t,accept:e=>{this.readerDenial=null,this.summary=e}})}),this.readerTask=new T(this,{args:()=>[this.requestClient(),this.gateway.epoch,this.selection.selector,this.selection.query,this.readerCursor],task:async([e,,t,n,r],{signal:i})=>!e||!t?D:this.readArchive({client:e,method:`transcripts.get`,params:{selector:t,includeUtterances:!0,query:n||void 0,cursor:r??void 0,limit:50},signal:i,current:()=>this.selection.selector===t&&this.selection.query===n&&this.readerCursor===r,accept:e=>{this.readerDenial=null;let t=r?[...this.readerPages,e]:[e];this.trimmed||=t.length>X,this.readerPages=t.slice(-5)}})})}requestClient(){let e=this.context?.gateway.snapshot;return this.isConnected&&e?.phase===`connected`&&C(e.hello?.auth??null)?e.client:null}get selection(){let e=new URLSearchParams(this.routeSearch);return{selector:e.get(`selector`)??``,query:(e.get(`find`)??``).slice(0,256)}}get readerTab(){let e=new URLSearchParams(this.routeSearch);return e.get(`tab`)===`transcript`||!e.has(`tab`)&&this.selection.query?`text`:`summary`}async readArchive(e){let t=this.gateway.capture(),n=this.context.gateway,r=n.snapshot.hello,i=n.snapshot.hello?.auth,a=this.accessGeneration,o=()=>!e.signal.aborted&&this.requestClient()===e.client&&this.context.gateway===n&&n.snapshot.hello===r&&n.snapshot.hello?.auth===i&&t!==null&&this.gateway.isCurrent(t)&&this.accessGeneration===a&&e.current();try{let t=await e.client.request(e.method,e.params,{signal:e.signal});return o()?e.accept(t):D}catch(e){if(!o())return D;throw c(e)&&(this.accessGeneration++,this.listDenial=e,this.readerDenial=e,this.list=null,this.summary=null,this.readerPages=[],this.trimmed=!1,this.cancelExport()),e}}willUpdate(e){if(e.has(`routeSearch`)){let t=new URLSearchParams(String(e.get(`routeSearch`)??``)),n=new URLSearchParams(this.routeSearch);t.get(`selector`)!==n.get(`selector`)&&(this.summary=null);for(let r of[...B,`find`])(t.get(r)!==n.get(r)||e.get(`routeSearch`)===void 0||r===`find`&&t.get(`selector`)!==n.get(`selector`))&&(this.drafts[r]=n.get(r)??``);(t.get(`selector`)!==(this.selection.selector||null)||t.get(`find`)!==(this.selection.query||null))&&(this.resetReader(),this.cancelExport(),this.focusSelection=e.get(`routeSearch`)!==void 0)}}updated(){if(!this.focusSelection)return;let e=this.selection.selector?this.querySelector(`.transcripts-reader h1, .transcripts-reader [role=alert]`):this.querySelector(`.transcripts-library input[name="query"]`);e&&(e.focus(),this.focusSelection=!1)}resetConnection(){this.list=null,this.listDenial=null,this.readerDenial=null,this.summary=null,this.listTask.abort(),this.summaryTask.abort(),this.readerTask.abort(),this.cancelExport(),this.resetReader()}resetReader(){this.readerCursor=null,this.readerPages=[],this.trimmed=!1}cancelExport(){this.exportAbort?.abort(),this.exportAbort=null,this.exportState={kind:`idle`}}navigate(e){for(let[t,n]of Object.entries(e))this.drafts[t]=n??``;this.requestUpdate(),this.context.navigate(`meetings`,{search:R(this.routeSearch,e)})}refresh(){this.cancelExport(),this.summary=null,this.resetReader(),new URLSearchParams(this.routeSearch).has(`cursor`)?this.navigate({cursor:null}):this.listTask.run(),this.summaryTask.run(),this.readerTask.run()}async download(e){let t=this.requestClient(),{selector:n}=this.selection;if(!t||!n||this.exportState.kind===`loading`)return;let r=new AbortController;this.exportAbort=r,this.exportState={kind:`loading`};try{await this.readArchive({client:t,method:`transcripts.export`,params:{selector:n,format:e},signal:r.signal,current:()=>this.selection.selector===n,accept:e=>{let t=Uint8Array.from(atob(e.data),e=>e.charCodeAt(0)),n=URL.createObjectURL(new Blob([t],{type:e.mimeType})),r=document.createElement(`a`);try{r.href=n,r.download=e.filename,document.body.append(r),r.click(),this.exportState={kind:`done`}}finally{r.remove(),window.setTimeout(()=>URL.revokeObjectURL(n),1e3)}}})}catch(e){this.exportAbort===r&&!r.signal.aborted&&(this.exportState={kind:`error`,message:f(e)})}finally{this.exportAbort===r&&(this.exportAbort=null)}}render(){let e=this.context.gateway.snapshot,t=this.requestClient(),n=this.readerTab===`summary`?this.summaryTask:this.readerTask,r={summary:this.summary,pages:this.readerPages,loading:n.status===E.PENDING,error:this.readerDenial??(n.status===E.ERROR?n.error:null),trimmed:this.trimmed};return Se({basePath:this.context.basePath,search:this.routeSearch,drafts:this.drafts,onDraft:(e,t)=>{this.drafts[e]=t},connected:e.phase===`connected`,allowed:C(e.hello?.auth??null),list:t&&this.listTask.status===E.COMPLETE?this.list:null,listLoading:!this.listDenial&&this.listTask.status===E.PENDING,listError:this.listDenial??(this.listTask.status===E.ERROR?this.listTask.error:null),reader:r,readerTab:this.readerTab,exportState:this.exportState,onNavigate:e=>this.navigate(e),onRefresh:()=>this.refresh(),onReaderRetry:()=>{if(this.readerTab===`summary`){this.summaryTask.run();return}this.readerPages.length||this.resetReader(),this.summary||this.summaryTask.run(),this.readerTask.run()},onReaderTab:e=>{this.navigate({tab:e===`text`?`transcript`:`summary`})},onLoadMore:()=>{this.readerCursor=this.readerPages.at(-1)?.nextCursor??null},onReaderStart:()=>{this.resetReader(),this.readerTask.run()},onDownload:e=>void this.download(e)})}},t([n({context:ce,subscribe:!0})],Z.prototype,`context`,void 0),t([ae({attribute:!1})],Z.prototype,`routeSearch`,void 0),t([g()],Z.prototype,`list`,void 0),t([g()],Z.prototype,`listDenial`,void 0),t([g()],Z.prototype,`readerDenial`,void 0),t([g()],Z.prototype,`readerCursor`,void 0),t([g()],Z.prototype,`summary`,void 0),t([g()],Z.prototype,`readerPages`,void 0),t([g()],Z.prototype,`trimmed`,void 0),t([g()],Z.prototype,`exportState`,void 0),Q={header:!0,render:e=>_`<openclaw-meetings-page
      .routeSearch=${typeof e==`string`?e:``}
    ></openclaw-meetings-page>`},customElements.get(`openclaw-meetings-page`)||customElements.define(`openclaw-meetings-page`,Z)})))()}$();export{Q as meetingsPageComponent};
//# sourceMappingURL=meetings-page-fcyjRIt2.js.map