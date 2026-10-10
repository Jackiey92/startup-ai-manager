import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as a,Tl as o,Vs as s,wl as c,xl as l}from"./control-ui-core-CndkyZ8m.js";import{$ as u,Q as d,at as f,dt as p,nt as m,pt as h}from"./lit-runtime-CIjzngcy.js";import{$r as g,Qr as _,lr as v}from"./control-ui-core-C5mtYcym.js";import{n as y,t as b}from"./control-ui-disabled-Bu0pNy8y.js";var x;function S(){return(S=e((()=>{r(),d(),f(),g(),o(),c(),s(),b(),v(),x=class extends l{constructor(){super(),this.open=!1,this.reloading=!1,this.reloadError=``,this.close=()=>this.dispatchEvent(new Event(`modal-cancel`,{bubbles:!0,composed:!0})),new a(this).watch(()=>this.runtime,(e,t)=>e.subscribe(t))}render(){let e=this.runtime;if(!this.open||!e)return u;let t=e.registrations(`replacements`),n=[...new Set(t.map(e=>e.value.surface))];return m`<openclaw-modal-dialog .label=${i(`pluginUi.customize`)}>
      <section class="card">
        <h2>${i(`pluginUi.customize`)}</h2>
        <p>${i(`pluginUi.selectionScope`)}</p>
        ${n.map(n=>m`<label class="field"
            ><span>${i(`pluginUi.surface.${n}`)}</span>
            <select
              @change=${t=>e.selectReplacement(n,t.target.value||null)}
            >
              <option value="" .selected=${!e.selectedReplacement(n)}>
                ${i(`pluginUi.builtin`)}
              </option>
              ${t.filter(e=>e.value.surface===n).map(t=>m`<option
                      value=${t.key}
                      .selected=${e.selectedReplacement(n)?.key===t.key}
                    >
                      ${t.value.label} (${t.pluginId})
                    </option>`)}
            </select></label
          >`)}
        ${e.errors.map(e=>{let t=y(this.context,e.pluginId,this.close);return t?m`<section role="status"><strong>${e.pluginId}</strong>${t}</section>`:m`<p role="alert"><strong>${e.pluginId}</strong>: ${e.message}</p>`})}
        ${this.reloadError?m`<p role="alert">${this.reloadError}</p>`:u}
        ${e.canReload?m`<button
                class="btn"
                ?disabled=${this.reloading}
                @click=${async()=>{this.reloading=!0,this.reloadError=``;try{await e.reload()}catch(e){this.reloadError=e instanceof Error?e.message:String(e)}finally{this.reloading=!1}}}
              >
                ${i(`pluginUi.reload`)}
              </button>`:u}
        <button class="btn" @click=${()=>void e.refresh()}>${i(`common.retry`)}</button>
        <button class="btn" @click=${this.close}>${i(`common.close`)}</button>
      </section>
    </openclaw-modal-dialog>`}},t([n({context:_,subscribe:!0})],x.prototype,`context`,void 0),t([h({attribute:!1})],x.prototype,`runtime`,void 0),t([h({type:Boolean})],x.prototype,`open`,void 0),t([p()],x.prototype,`reloading`,void 0),t([p()],x.prototype,`reloadError`,void 0),customElements.get(`openclaw-plugin-manager-dialog`)||customElements.define(`openclaw-plugin-manager-dialog`,x)})))()}S();
//# sourceMappingURL=control-ui-manager-dialog-DYjfoH_B.js.map