import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Cl as r,Tl as i,ps as a,wl as o}from"./control-ui-core-CndkyZ8m.js";import{$ as s,Q as c,_t as l,at as u,dt as d,nt as f,pt as p}from"./lit-runtime-CIjzngcy.js";import{lr as m}from"./control-ui-core-C5mtYcym.js";import{hn as h,mn as g}from"./control-ui-boot-shared-DlJEsz5Q.js";var _;function v(){return(v=e((()=>{c(),u(),i(),g(),o(),m(),_=class extends r{constructor(...e){super(...e),this.sendShortcut=`enter`,this.open=!1}static{this.styles=l`
    :host {
      display: contents;
      --openclaw-modal-width: 560px;
    }

    .dialog {
      display: flex;
      max-height: min(720px, calc(100dvh - 64px));
      flex-direction: column;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--card);
      color: var(--text);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 22px 16px;
      border-bottom: 1px solid var(--border);
    }

    h2 {
      margin: 0;
      color: var(--text-strong);
      font-size: 16px;
      font-weight: 600;
    }

    .close {
      display: grid;
      width: 28px;
      height: 28px;
      place-items: center;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: var(--muted);
      font-size: 20px;
    }

    .close:hover {
      background: var(--bg-hover);
      color: var(--text);
    }

    .body {
      overflow: auto;
      padding: 8px 22px 18px;
    }

    section + section {
      margin-top: 12px;
      border-top: 1px solid var(--border);
    }

    h3 {
      margin: 18px 0 8px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .shortcut-row {
      display: flex;
      min-height: 34px;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-size: 13px;
    }

    .combos {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .combo {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    kbd {
      min-width: 22px;
      padding: 3px 6px;
      border: 1px solid var(--border-strong);
      border-radius: 5px;
      background: var(--bg-muted);
      color: var(--text);
      font: inherit;
      font-size: 12px;
      text-align: center;
    }
  `}get isOpen(){return this.open}toggle(){this.open=!this.open}render(){if(!this.open)return s;let e=()=>{this.open=!1};return f`
      <openclaw-modal-dialog label=${n(`shortcutsOverlay.title`)} @modal-cancel=${e}>
        <div class="dialog">
          <header class="header">
            <h2>${n(`shortcutsOverlay.title`)}</h2>
            <button class="close" type="button" aria-label=${n(`common.close`)} @click=${e}>
              <span aria-hidden="true">×</span>
            </button>
          </header>
          <div class="body">
            ${h(this.sendShortcut).map(e=>f`
                <section>
                  <h3>${n(e.label)}</h3>
                  ${e.entries.map(e=>f`
                      <div class="shortcut-row">
                        <span>${n(e.label)}</span>
                        <span class="combos">
                          ${e.combos.map(e=>f`
                              <span class="combo">
                                ${a(e).map(e=>f`<kbd>${e}</kbd>`)}
                              </span>
                            `)}
                        </span>
                      </div>
                    `)}
                </section>
              `)}
          </div>
        </div>
      </openclaw-modal-dialog>
    `}},t([p({attribute:!1})],_.prototype,`sendShortcut`,void 0),t([d()],_.prototype,`open`,void 0),customElements.get(`openclaw-keyboard-shortcuts-dialog`)||customElements.define(`openclaw-keyboard-shortcuts-dialog`,_)})))()}v();
//# sourceMappingURL=keyboard-shortcuts-dialog-CkulAO_I.js.map