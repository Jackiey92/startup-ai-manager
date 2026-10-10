import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Cl as r,Fl as i,Il as a,Tl as o,wl as s}from"./control-ui-core-CndkyZ8m.js";import{Q as c,_t as l,at as u,ct as d,nt as f,pt as p,r as m,t as h}from"./lit-runtime-CIjzngcy.js";import{Di as g,Ei as _,lr as v}from"./control-ui-core-C5mtYcym.js";import{Jn as y,Mn as b,Nn as x,dr as S,lr as C,qn as w}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as T,t as E}from"./frontmatter-DV9Rn9SK.js";var D,O;function k(){return(k=e((()=>{a(),D={filePreview:{bundle:{binary:`This binary file is included in the bundle but cannot be displayed as text.`,"too-large":`This file exceeds the preview limit. Its contents have not been truncated or loaded.`,unavailable:`This file could not be read safely or is unavailable. Close and reopen the skill to try again.`,incomplete:`Some bundle content is unavailable. Select a file to see its status.`},listLabel:`Files`,searchPlaceholder:`Search files…`,readOnly:`read-only`,emptyTitle:`No files match`,emptySubtitle:`Try another file name or content search.`,copyFile:`Copy file`,fileCount:`{count} files`,filteredFileCount:`{count}/{total} files`,noMatches:`No files match.`,navigate:`navigate`,kind:{text:`Text`,shell:`Shell`,file:`File`}}},O=Object.assign(()=>{Object.assign(i.filePreview,D.filePreview)},{catalog:D})})))()}var A;function j(){return(j=e((()=>{c(),A=l`
  :host {
    display: contents;
  }

  .modal {
    width: 100%;
    height: min(780px, 86vh);
    background: var(--bg);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
  }

  .heading {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: 16px;
    overflow-wrap: anywhere;
  }
  .body.tree {
    grid-template-columns: minmax(180px, 260px) minmax(0, 1fr);
  }
  .folder > summary {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 9px 10px;
    color: var(--muted);
    font-size: 12px;
  }
  .folder > summary svg {
    width: 16px;
    height: 16px;
  }
  .folder > div {
    padding-left: 12px;
  }
  .folder .item {
    width: 100%;
    padding: 9px 10px;
    gap: 8px;
  }
  .notice {
    margin: 0;
    padding: 12px 20px;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
  }
  .markdown {
    font-size: 14px;
    line-height: 1.65;
    overflow-wrap: anywhere;
  }
  .markdown > :first-child {
    margin-top: 0;
  }
  .markdown h1 {
    font-size: 24px;
  }
  .markdown h2 {
    font-size: 20px;
  }
  .markdown h3 {
    font-size: 16px;
  }
  .markdown pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    background: var(--bg-elevated);
    padding: 12px;
    border-radius: var(--radius-md);
  }
  .markdown code {
    font-family: var(--mono);
  }
  .markdown a {
    color: var(--accent);
  }
  .markdown table {
    display: block;
    overflow: auto;
    max-width: 100%;
  }
  .markdown th,
  .markdown td {
    padding: 8px;
    border: 1px solid var(--border);
  }
  .search-icon {
    color: var(--muted);
    font-size: 18px;
  }

  .search {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-strong);
    font: inherit;
    font-size: 18px;
    font-weight: 400;
    padding: 4px 0;
  }

  .search:focus,
  .search:focus-visible {
    outline: none;
    border: none;
    box-shadow: none;
  }

  .search::placeholder {
    color: var(--muted);
  }

  .state {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--muted);
    padding: 5px 10px;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-elevated);
  }

  .body {
    flex: 1;
    display: grid;
    grid-template-columns: 360px minmax(0, 1fr);
    min-height: 0;
  }

  .list {
    border-right: 1px solid var(--border);
    padding: 14px 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .list-section {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    padding: 4px 12px 8px;
  }

  .item {
    display: grid;
    grid-template-columns: 16px 1fr auto;
    gap: 12px;
    align-items: center;
    padding: 12px 14px;
    border-radius: var(--radius-md);
    border: none;
    background: transparent;
    color: var(--text);
    font: inherit;
    outline: none;
    text-align: left;
  }

  .item:focus-visible {
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
  }

  .item:hover {
    background: var(--bg-elevated);
  }

  .item.is-active {
    background: var(--accent-subtle);
  }

  .item.is-active .item-name {
    color: var(--text-strong);
  }

  .item-icon {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    opacity: 0.85;
  }

  .item.is-active .item-icon {
    color: var(--accent);
    opacity: 1;
  }

  .item-icon svg,
  .chat-copy-btn svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.5px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .item-name {
    font-family: var(--mono);
    font-size: 14px;
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-meta {
    color: var(--muted);
    font-size: 12px;
  }

  .empty-list {
    color: var(--muted);
    font-size: 13px;
    padding: 12px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
  }

  .detail.empty {
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
  }

  .detail-head {
    padding: 20px 24px 14px;
    border-bottom: 1px solid var(--border);
  }

  .detail-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .title {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-family: var(--mono);
    font-size: 22px;
    color: var(--text-strong);
    font-weight: 700;
    letter-spacing: -0.01em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chat-copy-btn {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-elevated);
    color: var(--muted);
  }

  .chat-copy-btn:hover {
    border-color: var(--border-strong);
    color: var(--text-strong);
  }

  .chat-copy-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .chat-copy-btn__icon {
    display: inline-flex;
    width: 16px;
    height: 16px;
    position: relative;
  }

  .chat-copy-btn__icon-copy,
  .chat-copy-btn__icon-check {
    position: absolute;
    inset: 0;
    transition: opacity 150ms ease;
  }

  .chat-copy-btn__icon-check,
  .chat-copy-btn[data-copy-state="copied"] .chat-copy-btn__icon-copy {
    opacity: 0;
  }

  .chat-copy-btn[data-copy-state="copied"] .chat-copy-btn__icon-check {
    opacity: 1;
  }

  .chat-copy-btn[data-copy-state="copying"] {
    opacity: 0;
    pointer-events: none;
  }

  .chat-copy-btn[data-copy-state="error"] {
    border-color: var(--danger-subtle);
    background: var(--danger-subtle);
    color: var(--danger);
  }

  .chat-copy-btn[data-copy-state="copied"] {
    border-color: var(--ok-subtle);
    background: var(--ok-subtle);
    color: var(--ok);
  }

  .chips {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11.5px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    color: var(--muted);
  }

  .chip.accent {
    background: var(--accent-subtle);
    border-color: color-mix(in srgb, var(--accent) 30%, transparent);
    color: var(--accent);
  }

  .chip.ok {
    background: color-mix(in srgb, var(--ok) 12%, transparent);
    border-color: color-mix(in srgb, var(--ok) 30%, transparent);
    color: var(--ok);
  }

  .detail-body {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px 24px 24px;
  }

  .code-content {
    min-width: 0;
  }

  .code-chunk {
    margin: 0;
    min-width: 0;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.7;
    color: var(--text);
    white-space: pre-wrap;
    word-break: break-word;
    content-visibility: auto;
    contain-intrinsic-block-size: auto 1414px;
  }

  .foot {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 12px 20px;
    border-top: 1px solid var(--border);
    background: var(--bg);
    font-size: 12px;
    color: var(--muted);
  }

  .foot-group {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .kbd {
    font-family: var(--mono);
    font-size: 10.5px;
    padding: 2px 6px;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--bg-elevated);
    color: var(--text);
  }

  .spacer {
    flex: 1;
  }

  .button {
    height: 36px;
    padding: 0 14px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--bg-elevated);
    color: var(--text);
    font-weight: 600;
  }

  .button:hover {
    border-color: var(--border-strong);
    color: var(--text-strong);
  }

  .empty-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
    margin: 0 0 8px;
  }

  .empty-subtitle {
    margin: 0;
    font-size: 13px;
    color: var(--muted);
    max-width: 380px;
  }

  @media (max-width: 640px) {
    .head {
      padding: 12px;
    }

    .body,
    .body.tree {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, min(180px, 30dvh)) minmax(0, 1fr);
    }

    .list {
      min-width: 0;
      border-right: 0;
      border-bottom: 1px solid var(--border);
      padding: 10px 8px;
    }

    .item {
      min-width: 0;
    }

    .foot {
      gap: 8px;
      padding: 10px 12px;
    }
  }
`})))()}function M(e){let t=e.split(`
`),n=[];for(let e=0;e<t.length;e+=I)n.push(t.slice(e,e+I).join(`
`));return n}function N(e){let t=e.split(`.`).pop()?.toLowerCase()??``;return{md:`Markdown`,txt:n(`filePreview.kind.text`),json:`JSON`,yaml:`YAML`,yml:`YAML`,ts:`TypeScript`,js:`JavaScript`,py:`Python`,sh:n(`filePreview.kind.shell`)}[t]??(t?t.toUpperCase():n(`filePreview.kind.file`))}function P(e){return L[w(e)]}var F,I,L;function R(){return(R=e((()=>{c(),u(),h(),E(),o(),k(),s(),C(),y(),j(),g(),b(),v(),O(),F=class extends r{constructor(...e){super(...e),this.files=[],this.activePath=``,this.query=``,this.label=``,this.listLabel=``,this.searchPlaceholder=``,this.contextLabel=``,this.readOnlyLabel=``,this.emptyTitle=``,this.emptySubtitle=``,this.copyLabel=``,this.showSearch=!0,this.showCopy=!0,this.folderTree=!1,this.renderMarkdown=!1,this.directories=[],this.loading=!1,this.error=``,this.notice=``,this.filteredFiles=[],this.derivedInputsReady=!1,this.codeChunks=[],this.resetScrollAfterUpdate=!0,this.focusAfterUpdate=!1,this.handleDocumentLink=e=>{let t=e.target.closest(`a[href]`)?.getAttribute(`href`);if(!t||/^[a-z][a-z0-9+.-]*:|^\/\//iu.test(t))return;e.preventDefault();let n=new URL(this.activeFile?.path??`SKILL.md`,`https://skill.invalid/`),r=new URL(t,n),i;try{i=decodeURIComponent(r.pathname.slice(1))}catch{return}let a=this.files.find(e=>e.path===i);a&&this.emitSelect(a.path)},this.handleQueryInput=e=>{let t=e.target.value??``;this.dispatchEvent(new CustomEvent(`file-preview-query-change`,{bubbles:!0,composed:!0,detail:t}))},this.preventItemPointerFocus=e=>{e.preventDefault()},this.handleKeydown=e=>{switch(e.key){case`Escape`:e.preventDefault(),e.stopPropagation(),this.emitClose();return;case`ArrowDown`:this.moveSelection(1,e);return;case`ArrowUp`:this.moveSelection(-1,e)}},this.emitClose=()=>{this.dispatchEvent(new CustomEvent(`file-preview-close`,{bubbles:!0,composed:!0}))}}static{this.styles=A}willUpdate(e){if(!(!this.derivedInputsReady||e.has(`activePath`)||e.has(`query`)||e.has(`files`)||e.has(`showSearch`)))return;this.derivedInputsReady=!0,this.filteredFiles=this.filterFiles();let t=this.resolveActiveFile(this.filteredFiles);this.activeFile=t;let n=t?.contents;n!==this.codeSource&&(this.codeSource=n,this.codeChunks=n===void 0?[]:M(n)),this.resetScrollAfterUpdate=!0}render(){let e=this.filteredFiles,t=this.activeFile,r=e.length===this.files.length?n(`filePreview.fileCount`,{count:String(this.files.length)}):n(`filePreview.filteredFileCount`,{count:String(e.length),total:String(this.files.length)}),i=this.label||n(`filePreview.label`),a=this.listLabel||n(`filePreview.listLabel`),o=this.searchPlaceholder||n(`filePreview.searchPlaceholder`);return f`
      <openclaw-modal-dialog
        label=${i}
        style="--openclaw-modal-width: min(1100px, 92vw); --openclaw-modal-max-height: 86vh;"
        @modal-cancel=${this.emitClose}
        @keydown=${this.handleKeydown}
      >
        <div class="modal">
          <header class="head">
            ${this.showSearch?f`<span class="search-icon">⌕</span><input class="search" placeholder=${o} .value=${this.query} @input=${this.handleQueryInput} />`:f`<h1 class="heading">${i}</h1>`}
            <span class="state">${r}</span>
          </header>
          ${this.notice?f`<p class="notice" role="status">${this.notice}</p>`:``}
          <div class="body ${this.folderTree?`tree`:``}" aria-busy=${this.loading}>
            <aside class="list">
              <div class="list-section">${a} · ${e.length}</div>
              ${e.length===0?f`<div class="empty-list">${this.loading?n(`common.loading`):n(`filePreview.noMatches`)}</div>`:this.folderTree?this.renderFolder(``):e.map(e=>this.renderItem(e))}
            </aside>
            ${this.error?f`<section class="detail empty">
                    <p role="alert">${this.error}</p>
                    <button
                      class="button"
                      @click=${()=>this.dispatchEvent(new CustomEvent(`file-preview-retry`,{bubbles:!0,composed:!0}))}
                    >
                      ${n(`common.retry`)}
                    </button>
                  </section>`:t?this.renderFile(t):this.renderEmpty()}
          </div>
          <footer class="foot">
            <span class="foot-group"><span class="kbd">↑↓</span> ${n(`filePreview.navigate`)}</span>
            <span class="spacer"></span>
            <button class="button" @click=${this.emitClose}>
              ${n(`common.close`)} <span class="kbd">esc</span>
            </button>
          </footer>
        </div>
      </openclaw-modal-dialog>
    `}renderItem(e){return f`<button
      class="item ${e.path===this.activeFile?.path?`is-active`:``}"
      data-path=${e.path}
      aria-current=${e.path===this.activeFile?.path?`true`:`false`}
      @pointerdown=${e=>{this.showSearch&&this.preventItemPointerFocus(e)}}
      @mousedown=${e=>{this.showSearch&&this.preventItemPointerFocus(e)}}
      @click=${()=>this.emitSelect(e.path)}
    >
      <span class="item-icon">${P(e.path)}</span
      ><span class="item-name" title=${e.path}
        >${this.folderTree?e.path.split(`/`).pop():e.path}</span
      ><span class="item-meta">${e.size}</span>
    </button>`}renderFolder(e){let t=this.filteredFiles.filter(t=>t.path.startsWith(e)),n=t.filter(t=>!t.path.slice(e.length).includes(`/`)),r=new Set([...t.map(e=>e.path),...this.directories.map(e=>`${e}/`)].filter(t=>t.startsWith(e)&&t.slice(e.length).includes(`/`)).map(t=>t.slice(e.length).split(`/`)[0]));return f`${n.map(e=>this.renderItem(e))}${[...r].toSorted().map(t=>f`<details class="folder" open>
          <summary>${_.folder}<span>${t}</span></summary>
          <div>${this.renderFolder(`${e}${t}/`)}</div>
        </details>`)}`}renderFile(e){return f`
      <section class="detail">
        <div class="detail-head">
          <div class="detail-title-row">
            <h2 class="title">${e.path}</h2>
            ${this.showCopy&&e.contents?S(e.contents,this.copyLabel||n(`filePreview.copyFile`)):``}
          </div>
          <div class="chips">
            <span class="chip accent">${N(e.path)}</span>
            <span class="chip">${e.size}</span>
            <span class="chip">${this.readOnlyLabel||n(`filePreview.readOnly`)}</span>
            ${this.contextLabel?f`<span class="chip ok">${this.contextLabel}</span>`:``}
          </div>
        </div>
        <div class="detail-body">
          ${e.message?f`<p role="status">${e.message}</p>`:this.renderMarkdown&&/\.md$/iu.test(e.path)?f`<article class="markdown" @click=${this.handleDocumentLink}>${m(x(T(e.contents),{mode:`document`,remoteImages:!1,codeBlockChrome:this.showCopy?`copy`:`none`,fileLinks:!1}))}</article>`:f`<div class="code-content">${this.codeChunks.map((e,t)=>f`<pre class="code-chunk" data-chunk=${t}>${e}</pre>`)}</div>`}
        </div>
      </section>
    `}renderEmpty(){return f`
      <section class="detail empty">
        <p class="empty-title">${this.emptyTitle||n(`filePreview.emptyTitle`)}</p>
        <p class="empty-subtitle">${this.emptySubtitle||n(`filePreview.emptySubtitle`)}</p>
      </section>
    `}filterFiles(){let e=this.showSearch?this.query.trim().toLowerCase():``;return e?this.files.filter(t=>`${t.path}\n${t.contents}`.toLowerCase().includes(e)):this.files}resolveActiveFile(e){return e.find(e=>e.path===this.activePath)??e[0]}connectedCallback(){super.connectedCallback(),this.resetScrollAfterUpdate=!0,this.focusAfterUpdate=!0,this.requestUpdate()}updated(e){if(this.resetScrollAfterUpdate){this.resetScrollAfterUpdate=!1;let e=this.detailBody;e&&(e.scrollTop=0,e.scrollLeft=0)}(e.has(`activePath`)||e.has(`query`)||e.has(`files`))&&(this.scrollActiveFileIntoView(),!this.showSearch&&e.has(`activePath`)&&this.focusModal()),this.focusAfterUpdate&&this.isConnected&&(this.focusAfterUpdate=!1,this.focusModal())}focusModal(){(this.searchInput??this.shadowRoot?.querySelector(`.item.is-active, .button`))?.focus({preventScroll:!0})}moveSelection(e,t){t.preventDefault(),t.stopPropagation();let n=this.folderTree?[...this.shadowRoot?.querySelectorAll(`.item`)??[]].filter(e=>!e.closest(`details:not([open])`)).flatMap(e=>this.filteredFiles.filter(t=>t.path===e.dataset.path)):this.filterFiles();if(n.length===0)return;let r=this.resolveActiveFile(n),i=r?n.findIndex(e=>e.path===r.path):-1,a=n[Math.max(0,Math.min(n.length-1,i+e))];a&&a.path!==r?.path&&this.emitSelect(a.path)}scrollActiveFileIntoView(){this.updateComplete.then(()=>{this.isConnected&&this.shadowRoot?.querySelector(`.item.is-active`)?.scrollIntoView({block:`nearest`})}).catch(()=>{})}emitSelect(e){this.dispatchEvent(new CustomEvent(`file-preview-select`,{bubbles:!0,composed:!0,detail:e})),this.showSearch&&this.focusModal()}},t([p({attribute:!1})],F.prototype,`files`,void 0),t([p()],F.prototype,`activePath`,void 0),t([p()],F.prototype,`query`,void 0),t([p()],F.prototype,`label`,void 0),t([p()],F.prototype,`listLabel`,void 0),t([p()],F.prototype,`searchPlaceholder`,void 0),t([p()],F.prototype,`contextLabel`,void 0),t([p()],F.prototype,`readOnlyLabel`,void 0),t([p()],F.prototype,`emptyTitle`,void 0),t([p()],F.prototype,`emptySubtitle`,void 0),t([p()],F.prototype,`copyLabel`,void 0),t([p({type:Boolean})],F.prototype,`showSearch`,void 0),t([p({type:Boolean})],F.prototype,`showCopy`,void 0),t([p({type:Boolean})],F.prototype,`folderTree`,void 0),t([p({type:Boolean})],F.prototype,`renderMarkdown`,void 0),t([p({attribute:!1})],F.prototype,`directories`,void 0),t([p({type:Boolean})],F.prototype,`loading`,void 0),t([p()],F.prototype,`error`,void 0),t([p()],F.prototype,`notice`,void 0),t([d(`.search`)],F.prototype,`searchInput`,void 0),t([d(`.detail-body`)],F.prototype,`detailBody`,void 0),I=64,L={code:_.fileCode,component:_.layoutGrid,data:_.braces,file:_.fileText,image:_.image,markdown:_.book,package:_.box,shell:_.terminal}})))()}function z(){return(z=e((()=>{R(),customElements.get(`openclaw-file-preview-modal`)||customElements.define(`openclaw-file-preview-modal`,F)})))()}export{k as n,O as r,z as t};
//# sourceMappingURL=file-preview-modal-registration-DhIQtJNk.js.map