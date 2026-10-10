import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Br as r,Bs as i,Sl as a,Ss as o,Tl as s,Vs as c,bs as l,wl as u,xs as d,zr as f}from"./control-ui-core-CndkyZ8m.js";import{$ as p,Q as m,at as h,dt as g,nt as _,pt as v}from"./lit-runtime-CIjzngcy.js";import{Zn as y,lr as b,nr as x}from"./control-ui-core-C5mtYcym.js";import{B as S,U as C,V as w,z as T}from"./control-ui-boot-shared-DwSLfX8E.js";function E(e){return l(e,n(`onboarding.memoryImport.unknownError`))}function D(e){return e.items.filter(e=>e.status===`planned`)}function O(e){return e?.providers.filter(e=>e.found&&e.planFingerprint&&D(e).length>0)??[]}function k(){try{return globalThis.sessionStorage?.getItem(j)===`done`}catch{return!1}}function A(){try{globalThis.sessionStorage?.setItem(j,`done`)}catch{}}var j,M;function N(){return(N=e((()=>{T(),m(),h(),x(),s(),o(),r(),u(),c(),b(),j=`openclaw.onboarding.memory-import`,M=class extends a{constructor(...e){super(...e),this.active=!1,this.selectedByProvider={},this.applyingProviderId=null,this.results={},this.done=!1,this.closed=!1,this.subscriptions=new i(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentSelection,(e,t)=>e.subscribe(t)),this.planTask=new S(this,{args:()=>{let e=this.context?.gateway.snapshot;return[this.active,this.closed,k(),this.isConnected&&e?.phase===`connected`?e.client??null:null,e?y(e.hello?.auth??null):!1,this.currentAgentId()]},task:async([e,t,n,r,i,a],{signal:o})=>{if(!e||t||n||!r||!i||!a||this.applyingProviderId!==null||this.done)return w;let s=await r.request(`migrations.memory.plan`,{agentId:a,overwrite:!1},{signal:o});return s.agentId!==a||O(s).length===0&&s.providers.some(e=>e.error)?w:{client:r,agentId:a,plan:s}},onComplete:({plan:e})=>{let t=O(e);if(t.length===0){e.providers.some(e=>e.error)||(A(),this.closed=!0);return}this.results={},this.done=!1,this.selectedByProvider=Object.fromEntries(t.map(e=>[e.providerId,!0]))}})}disconnectedCallback(){this.planTask.run([!1,!0,!0,null,!1,null]),this.subscriptions.clear(),super.disconnectedCallback()}updated(){if(this.context?.agents.state.agentsList)this.agentsListRequest=void 0;else if(this.context&&this.agentsListRequest!==this.context.agents){let e=this.context.agents;this.agentsListRequest=e,e.ensureList().catch(()=>null).then(()=>{this.context?.agents===e&&!e.state.agentsList&&(this.agentsListRequest=void 0)})}}currentAgentId(){let e=this.context?.agents.state.agentsList;if(!e)return null;let t=this.context?.agentSelection.state.selectedId;return t&&e.agents.some(e=>e.id===t)?t:e.defaultId??e.agents[0]?.id??null}get planBinding(){let e=this.planTask.value,t=this.context?.gateway.snapshot,n=this.currentAgentId();return this.planTask.status!==C.COMPLETE||!e?null:e.client===t?.client&&e.agentId===n?e:null}get plan(){return this.planBinding?.plan??null}toggleProvider(e,t){this.selectedByProvider={...this.selectedByProvider,[e]:t}}async importSelected(){let e=this.context,t=this.planBinding,r=t?.plan,i=t?.client,a=t?.agentId;if(!e||!i||!r||!a||this.applyingProviderId!==null||this.done)return;let o=O(r).filter(e=>this.selectedByProvider[e.providerId]);if(o.length!==0){for(let e of o){if(!this.isConnected||this.closed||this.context?.gateway.snapshot.client!==i||this.currentAgentId()!==a){this.results={...this.results,[e.providerId]:{kind:`error`,message:n(`onboarding.memoryImport.connectionChanged`)}};continue}let t=D(e).map(e=>e.id),r=e.planFingerprint;if(r&&t.length!==0){this.applyingProviderId=e.providerId;try{let n=await i.request(`migrations.memory.apply`,{idempotencyKey:f(),agentId:a,providerId:e.providerId,planFingerprint:r,itemIds:t,overwrite:!1});this.results={...this.results,[e.providerId]:{kind:n.summary.errors>0||n.summary.conflicts>0?`partial`:`success`,result:n}}}catch(t){this.results={...this.results,[e.providerId]:{kind:`error`,message:E(t)}}}}}this.applyingProviderId=null,this.done=this.context?.gateway.snapshot.client===i&&this.currentAgentId()===a,this.done||this.planTask.run()}}finish(){A(),this.closed=!0}reviewDetails(){this.finish(),this.context?.navigate(`memory-import`)}handleModalCancel(e){if(this.applyingProviderId!==null){e.preventDefault();return}this.finish()}renderProvider(e){let t=D(e).length,r=e.items.filter(e=>e.status===`conflict`).length,i=this.results[e.providerId],a=this.applyingProviderId===e.providerId;return _`
      <li class="onboarding-memory-import__provider" data-provider-id=${e.providerId}>
        <label>
          <input
            type="checkbox"
            .checked=${this.selectedByProvider[e.providerId]??!1}
            ?disabled=${this.applyingProviderId!==null||this.done}
            @change=${t=>this.toggleProvider(e.providerId,t.currentTarget.checked)}
          />
          <span class="onboarding-memory-import__provider-copy">
            <strong>${e.label}</strong>
            <code title=${e.source??``}
              >${e.source??n(`onboarding.memoryImport.sourceUnavailable`)}</code
            >
            <small>
              ${n(`onboarding.memoryImport.plannedCount`,{count:String(t)})}
              ${r>0?_`<span>
                      ${n(`onboarding.memoryImport.alreadyImported`,{count:String(r)})}
                    </span>`:p}
            </small>
          </span>
        </label>
        <div class="onboarding-memory-import__provider-status" aria-live="polite">
          ${a?n(`onboarding.memoryImport.importingProvider`):i?.kind===`success`?n(`onboarding.memoryImport.providerResult`,{migrated:String(i.result.summary.migrated),skipped:String(i.result.summary.skipped)}):i?.kind===`partial`?_`<span role="alert">
                      ${n(`onboarding.memoryImport.providerIncomplete`,{conflicts:String(i.result.summary.conflicts),errors:String(i.result.summary.errors),migrated:String(i.result.summary.migrated),skipped:String(i.result.summary.skipped)})}
                    </span>`:i?.kind===`error`?_`<span role="alert">
                        ${n(`onboarding.memoryImport.providerError`,{error:d(i.message)})}
                      </span>`:p}
        </div>
      </li>
    `}render(){let e=this.context,t=e?.gateway.snapshot,r=O(this.plan);if(!this.active||this.closed||k()||!e||t?.phase!==`connected`||!t.client||!y(t.hello?.auth??null)||r.length===0)return p;let i=r.filter(e=>this.selectedByProvider[e.providerId]).length,a=Object.values(this.results).filter(e=>e.kind!==`error`),o=a.reduce((e,t)=>e+t.result.summary.migrated,0),s=a.reduce((e,t)=>e+t.result.summary.skipped,0),c=n(`onboarding.memoryImport.title`),l=n(`onboarding.memoryImport.body`);return _`
      <openclaw-modal-dialog
        class="onboarding-memory-import-dialog"
        label=${c}
        description=${l}
        @modal-cancel=${e=>this.handleModalCancel(e)}
      >
        <section class="onboarding-memory-import">
          <header>
            <h2>${this.done?n(`onboarding.memoryImport.doneTitle`):c}</h2>
            <p>
              ${this.done?n(`onboarding.memoryImport.doneBody`,{migrated:String(o),skipped:String(s)}):l}
            </p>
          </header>
          <ul>
            ${r.map(e=>this.renderProvider(e))}
          </ul>
          <footer>
            ${this.done?_`<button
                    class="btn primary"
                    type="button"
                    data-test-id="onboarding-memory-import-continue"
                    @click=${()=>this.finish()}
                  >
                    ${n(`common.continue`)}
                  </button>`:_`
                    <button
                      class="btn primary"
                      type="button"
                      data-test-id="onboarding-memory-import-import"
                      ?disabled=${i===0||this.applyingProviderId!==null}
                      @click=${()=>void this.importSelected()}
                    >
                      ${this.applyingProviderId?n(`common.importing`):n(`onboarding.memoryImport.import`)}
                    </button>
                    <button
                      class="btn"
                      type="button"
                      data-test-id="onboarding-memory-import-skip"
                      ?disabled=${this.applyingProviderId!==null}
                      @click=${()=>this.finish()}
                    >
                      ${n(`onboarding.memoryImport.skip`)}
                    </button>
                    <button
                      class="btn btn--ghost onboarding-memory-import__review"
                      type="button"
                      ?disabled=${this.applyingProviderId!==null}
                      @click=${()=>this.reviewDetails()}
                    >
                      ${n(`onboarding.memoryImport.reviewDetails`)}
                    </button>
                  `}
          </footer>
        </section>
      </openclaw-modal-dialog>
    `}},t([v({attribute:!1})],M.prototype,`context`,void 0),t([v({type:Boolean})],M.prototype,`active`,void 0),t([g()],M.prototype,`selectedByProvider`,void 0),t([g()],M.prototype,`applyingProviderId`,void 0),t([g()],M.prototype,`results`,void 0),t([g()],M.prototype,`done`,void 0),t([g()],M.prototype,`closed`,void 0),customElements.get(`openclaw-onboarding-memory-import`)||customElements.define(`openclaw-onboarding-memory-import`,M)})))()}N();
//# sourceMappingURL=onboarding-memory-import-C8ToeqBS.js.map