import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Sl as r,Tl as i,wl as a}from"./control-ui-core-CndkyZ8m.js";import{$ as o,Q as s,at as c,nt as l,pt as u}from"./lit-runtime-CIjzngcy.js";import{ha as d,ma as f}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as p,t as m}from"./stream-auto-follow-controller-BZ0UzGsg.js";var h,g,_;function v(){return(v=e((()=>{s(),c(),f(),i(),a(),p(),h={completed:`✓`,in_progress:`◌`,pending:`○`,failed:`×`,skipped:`−`},g={pass:`✓`,warn:`!`,fail:`×`,pending:`○`},_=class extends r{constructor(...e){super(...e),this.run=null,this.connected=!0,this.streamFollow=new m(this,{selector:`.update-run-view__details`,isEnabled:()=>!0,captureCurrent:()=>{let e=this.run?.runId;return()=>this.isConnected&&this.run?.runId===e}})}updated(e){if(super.updated(e),e.has(`run`)){let t=e.get(`run`);this.streamFollow.schedule(t?.runId!==this.run?.runId)}}renderStep(e,t=e.step){let r=n(`updates.run.step.${e.status}`);return l`<li
      class="update-run-view__step update-run-view__step--${e.status}"
      data-step=${e.step}
      data-status=${e.status}
      aria-label=${`${t}: ${r}`}
    >
      <span class="update-run-view__mark" aria-hidden="true">${h[e.status]}</span>
      <span>${t}</span><span class="update-run-view__step-status">${r}</span>
    </li>`}render(){if(!this.run)return o;let e=d(this.run,this.connected);return l`<section
      class="update-run-view"
      data-run-id=${this.run.runId}
      data-run-status=${this.run.status}
      aria-label=${n(`updates.run.title`)}
    >
      <header class="update-run-view__heading">
        <h3 role="status" aria-live="polite">${e.headline}</h3>
        <span class="update-run-view__progress">${e.compactLabel}</span>
      </header>
      ${!this.connected&&!e.terminal?l`<p class="update-run-view__connection">${n(`updates.run.reconnecting`)}</p>`:o}
      <ol class="update-run-view__phases" aria-label=${n(`updates.run.phases`)}>
        ${e.phases.map(e=>this.renderStep(e,e.label))}
      </ol>
      ${e.steps.length?l`<details class="update-run-view__step-list">
              <summary>${n(`updates.run.steps`)}</summary>
              <ol>
                ${e.steps.map(e=>this.renderStep(e))}
              </ol>
            </details>`:o}
      <div class="update-run-view__detail-heading">
        ${n(`updates.run.details`)}${e.detailStep?l`<span>${e.detailStep}</span>`:o}
      </div>
      <pre
        class="update-run-view__details"
        tabindex="0"
        aria-label=${n(`updates.run.details`)}
        @scroll=${e=>this.streamFollow.handleScroll(e)}
      >
${e.details||n(`updates.run.noDetails`)}</pre>
      <ul class="update-run-view__oracles" aria-label=${n(`updates.run.verification`)}>
        ${e.oracles.map(e=>l`<li data-oracle=${e.name} data-state=${e.state} class="update-run-view__oracle update-run-view__oracle--${e.state}"><span aria-hidden="true">${g[e.state]}</span><span>${n(`updates.run.oracle.${e.name}`)}</span><small>${n(`updates.run.oracleState.${e.state}`)}</small></li>`)}
      </ul>
      ${e.terminal?l`<section
              class="update-run-view__report ${e.reconciled?``:`update-run-view__report--${this.run.status}`}"
              aria-label=${n(`updates.run.report`)}
            >
              <h4>${e.report.headline}</h4>
              ${e.report.lines.map(e=>l`<p>${e}</p>`)}
            </section>`:o}
    </section>`}},t([u({attribute:!1})],_.prototype,`run`,void 0),t([u({type:Boolean})],_.prototype,`connected`,void 0),customElements.get(`openclaw-update-run-view`)||customElements.define(`openclaw-update-run-view`,_)})))()}export{v as t};
//# sourceMappingURL=update-run-view-D2Vq-TmL.js.map