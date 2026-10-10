import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Ss as n,Tl as r,bs as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,nt as s}from"./lit-runtime-CIjzngcy.js";import{St as c,xt as l}from"./control-ui-core-C5mtYcym.js";function u(e){return c({signal:e.signal,value:null},n=>{let{host:r,finish:o,render:c}=n,l=!1,u=null,d=t=>e.requireValue===!0?t.trim():t,f=t=>{let n=d(t);return e.requireValue===!0&&n.length===0||e.requireChange===!0&&n===(e.defaultValue??``)},p=f(e.defaultValue??``),m=()=>r.querySelector(`input[name="value"]`),h=e=>{let t=f(e.target.value);t!==p&&(p=t,y())};async function g(t){if(t.preventDefault(),l)return;let r=m()?.value;if(r===void 0||f(r))return;let a=d(r);if(!e.submit){o(a);return}l=!0,u=null,y();let s;try{s=await e.submit(a)}catch(e){s=i(e)}if(!n.settled){if(l=!1,s===null){o(a);return}u=s,y(),m()?.focus()}}function _(e){if(l){e.preventDefault();return}o(null)}let v=e.label??e.title;function y(){c(()=>s`
          <openclaw-modal-dialog
            label=${e.title}
            description=${v}
            @modal-cancel=${_}
          >
            <form class="exec-approval-card" @submit=${g}>
              <div class="exec-approval-header">
                <div class="exec-approval-title">${e.title}</div>
              </div>
              <label class="field input-dialog__field">
                <span>${v}</span>
                <input
                  name="value"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  .value=${e.defaultValue??``}
                  ?disabled=${l}
                  aria-invalid=${u?`true`:a}
                  @input=${h}
                  autofocus
                />
              </label>
              ${u?s`<div class="exec-approval-error" role="alert">${u}</div>`:a}
              <div class="exec-approval-actions">
                <button type="submit" class="btn primary" ?disabled=${l||p}>
                  ${e.submitLabel??t(`common.save`)}
                </button>
                <button
                  type="button"
                  class="btn"
                  ?disabled=${l}
                  @click=${()=>o(null)}
                >
                  ${e.cancelLabel??t(`common.cancel`)}
                </button>
              </div>
            </form>
          </openclaw-modal-dialog>
        `)}y()})}function d(e){return f?Promise.resolve(null):(f=!0,u(e).finally(()=>{f=!1}))}var f;function p(){return(p=e((()=>{o(),r(),n(),l(),f=!1})))()}export{d as n,p as t};
//# sourceMappingURL=input-dialog-JxebFWoS.js.map