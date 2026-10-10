import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Gn as r,Kn as i,Ol as a,Sl as o,Tl as s,wl as c}from"./control-ui-core-CndkyZ8m.js";import{$ as l,Q as u,at as d,dt as f,nt as p}from"./lit-runtime-CIjzngcy.js";import{Di as m,Ei as h,si as g,xi as _}from"./control-ui-core-C5mtYcym.js";import{$ as v,G as y,J as b,Q as x,X as S,Y as C,Z as w,et as T,ot as E,q as D,st as O}from"./control-ui-boot-new-CQMzhCGu.js";import{n as k,t as A}from"./settings-workspace-gGOfyDax.js";function j(e){return new Date(e).toLocaleDateString(a.getLocale())}function M(e,t={}){let r=S.filter(t=>e.has(t.id)).length,i=r===S.length,a=n(`quickSettings.appearance.lobsterdexSeen`,{seen:String(r),total:String(S.length)});return p`
    <section class="lobsterdex-page">
      <header
        class="lobsterdex-page__header ${i?`lobsterdex-page__header--complete`:``}"
      >
        <div>
          <h2>${n(`tabs.lobsterdex`)}</h2>
          <p>${n(`subtitles.lobsterdex`)}</p>
        </div>
        <span class="lobsterdex-page__count">${a}</span>
      </header>
      ${t.copyFeedback?.status===`error`?p`<div class="callout danger" role="alert">${n(`common.copyFailed`)}</div>`:l}
      <div class="lobsterdex-page__grid" aria-label=${a}>
        ${S.map(r=>{let i=y(r),a=e.get(r.id),o=a!==void 0,s=o?a.name??T(r.id):`?`,c=x[r.id],u=o&&a.firstSeenAt!==null?n(`quickSettings.appearance.lobsterdexCardFirstVisited`,{date:j(a.firstSeenAt)}):null,d=a?.shinySeenAt==null?null:n(`quickSettings.appearance.lobsterdexCardShinySeen`,{date:j(a.shinySeenAt)});return p`
            <article
              id="lobsterdex-${r.id}"
              class="lobsterdex-page__card ${o?``:`lobsterdex-page__card--unseen`}"
            >
              <button
                type="button"
                class="lobsterdex-page__copy-link"
                aria-label=${n(`quickSettings.appearance.lobsterdexCardCopyLink`)}
                @click=${()=>t.onCopyLink?.(r.id)}
              >
                <span aria-hidden="true"
                  >${t.copyFeedback?.status===`copied`&&t.copyFeedback.paletteId===r.id?h.check:h.link}</span
                >
              </button>
              <div
                class="lobsterdex-page__sprite lobster-pet lobster-pet--palette-${r.id} ${o?``:`lobsterdex__mini--unseen`}"
                style=${b(i)}
              >
                ${C(i,{standalone:!0})}
                ${a?.shinySeenAt==null?l:p`<span
                        class="lobsterdex__mini-star lobsterdex-page__star"
                        aria-hidden="true"
                        >✦</span
                      >`}
              </div>
              <h3>${s}</h3>
              <p class="lobsterdex-page__lore">${o?c.flavor:c.hint}</p>
              <div class="lobsterdex-page__dates">
                ${u?p`<p class="lobsterdex-page__date"><time>${u}</time></p>`:l}
                ${d?p`<p class="lobsterdex-page__date"><time>${d}</time></p>`:l}
              </div>
            </article>
          `})}
      </div>
    </section>
  `}function N(){return(N=e((()=>{u(),m(),D(),v(),w(),s()})))()}var P;function F(){return(F=e((()=>{u(),d(),g(),O(),w(),A(),i(),c(),N(),P=class extends o{constructor(...e){super(...e),this.copyFeedback=null,this.copyAttempt=0,this.copyResetTimer=null,this.copyLink=async e=>{let t=++this.copyAttempt;this.copyFeedback=null,this.copyResetTimer!==null&&(window.clearTimeout(this.copyResetTimer),this.copyResetTimer=null);let n=`${location.origin}${location.pathname}#lobsterdex-${e}`,i=await r(n,()=>this.isConnected&&t===this.copyAttempt);this.isConnected&&t===this.copyAttempt&&(this.copyFeedback={paletteId:e,status:i?`copied`:`error`},this.copyResetTimer=window.setTimeout(()=>{this.copyFeedback=null,this.copyResetTimer=null},1500))}}disconnectedCallback(){this.copyAttempt+=1,this.copyFeedback=null,this.copyResetTimer!==null&&(window.clearTimeout(this.copyResetTimer),this.copyResetTimer=null),super.disconnectedCallback()}firstUpdated(){if(!location.hash.startsWith(`#lobsterdex-`))return;let e=S.find(e=>e.id===location.hash.slice(12));if(!e)return;let t=this.querySelector(`#lobsterdex-${e.id}`);if(!t)return;let n=e=>{e.target===t&&e.animationName===`lobsterdex-card-highlight`&&(t.classList.remove(`lobsterdex-page__card--highlight`),t.removeEventListener(`animationend`,n))};t.addEventListener(`animationend`,n),t.classList.add(`lobsterdex-page__card--highlight`),requestAnimationFrame(()=>{requestAnimationFrame(()=>t.scrollIntoView({block:`center`}))})}render(){return p`
      <section class="content-header">
        <div class="page-title">${_(`lobsterdex`)}</div>
      </section>
      ${k(M(E(),{copyFeedback:this.copyFeedback,onCopyLink:e=>void this.copyLink(e)}))}
    `}},t([f()],P.prototype,`copyFeedback`,void 0),customElements.get(`openclaw-lobsterdex-page`)||customElements.define(`openclaw-lobsterdex-page`,P)})))()}F();
//# sourceMappingURL=lobsterdex-page-CrClrSbt.js.map