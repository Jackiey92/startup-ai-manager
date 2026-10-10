import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,tr as ee,wr as r,zr as te}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Bs as ne,Gn as re,Kn as a,Ol as o,Sl as s,Tl as c,Vs as l,an as u,un as d,wl as f}from"./control-ui-core-CndkyZ8m.js";import{$ as p,Q as m,at as ie,dt as h,nt as g}from"./lit-runtime-CIjzngcy.js";import{$r as ae,Di as oe,Ei as _,Qr as v,Yr as y,Zr as b,si as x,wi as S,xi as C}from"./control-ui-core-C5mtYcym.js";import{ci as w,li as T,oi as E,si as D,ui as O}from"./control-ui-boot-shared-DlJEsz5Q.js";import{dt as k,ht as A,nt as j,pt as M,xt as N}from"./control-ui-boot-shared-DpHhsTHW.js";import{G as P,J as F,X as I,Y as se,Z as L,q as R}from"./control-ui-boot-new-CQMzhCGu.js";import{n as z,t as B}from"./settings-workspace-gGOfyDax.js";import{n as V,t as H}from"./brand-icons-88_dE3yG.js";function U(e,t){if(!e)return null;let n=new Date(e);return Number.isNaN(n.getTime())?null:new Intl.DateTimeFormat(t,{dateStyle:`medium`,timeZone:`UTC`}).format(n)}function W(e){return i(e===`copying`?`aboutPage.copyingCommit`:e===`copied`?`aboutPage.copiedCommit`:e===`error`?`aboutPage.copyCommitFailed`:`aboutPage.copyCommit`)}function G(e){return e===`copied`?i(`aboutPage.copiedCommit`):e===`error`?i(`aboutPage.copyCommitFailed`):``}function K(){return g`<span class="muted">${i(`aboutPage.unavailable`)}</span>`}function ce(e){if(!e)return p;let t=Date.parse(e);if(!Number.isFinite(t))return p;let n=new Intl.DateTimeFormat(o.getLocale(),{dateStyle:`medium`,timeStyle:`short`}).format(new Date(t));return g`
    <time class="about-commit__age" dir="auto" datetime=${e} title=${n}
      >${u(t,{fallback:``})}</time
    >
  `}function le(e){let t=e.buildInfo.commit;if(!t)return K();let n=W(e.copyState);return g`
    <span class="about-commit">
      <code dir="ltr" title=${t}>${t.slice(0,q)}</code>
      ${ce(e.buildInfo.commitAt)}
      <openclaw-tooltip .content=${n}>
        <button
          type="button"
          class="about-commit__copy"
          aria-label=${n}
          aria-busy=${e.copyState===`copying`?`true`:p}
          ?disabled=${e.copyState===`copying`}
          @click=${e.onCopyCommit}
        >
          <span aria-hidden="true">${e.copyState===`copied`?_.check:_.copy}</span>
        </button>
      </openclaw-tooltip>
      <span class="sr-only" role="status" aria-live="polite">${G(e.copyState)}</span>
    </span>
  `}function ue(e){let t=I.find(e=>e.id===`crimson`)??r(I[0],`about lobster palette`),n=P(t);return g`
    <section class="about-hero">
      <button
        type="button"
        class="about-hero__clawd ${e.clawdWaving?`about-hero__clawd--wave`:``}"
        style=${F(n)}
        aria-label=${i(`aboutPage.waveHello`)}
        @click=${e.onPokeClawd}
      >
        ${se(n)}
      </button>
      <h2 class="about-hero__name">${i(`aboutPage.productName`)}</h2>
      <p class="about-hero__tagline">${i(`aboutPage.tagline`)}</p>
      ${e.buildInfo.version?g`<code class="about-hero__version" dir="ltr">v${e.buildInfo.version}</code>`:p}
      <nav class="about-hero__links" aria-label=${i(`aboutPage.linksLabel`)}>
        ${J.map(e=>g`
            <a
              class="about-hero__link"
              href=${e.href}
              target=${w}
              rel=${T()}
            >
              <span class="about-hero__link-icon" aria-hidden="true">${e.icon}</span>
              <span>${e.label()}</span>
            </a>
          `)}
      </nav>
    </section>
  `}function de(e){let t=U(e.buildInfo.builtAt,o.getLocale()),n=g`
    <dl
      class="settings-kv about-build-grid"
      role="group"
      aria-label=${i(`aboutPage.artifactDetails`)}
    >
      <dt>${i(`aboutPage.version`)}</dt>
      <dd>
        ${e.buildInfo.version?g`<code dir="ltr" title=${e.buildInfo.version}
                >${e.buildInfo.version}</code
              >`:K()}
      </dd>
      <dt>${i(`aboutPage.commit`)}</dt>
      <dd>${le(e)}</dd>
      ${e.buildInfo.branch?g`
              <dt>${i(`aboutPage.branch`)}</dt>
              <dd>
                <code dir="ltr" title=${e.buildInfo.branch}
                  >${e.buildInfo.branch}${e.buildInfo.dirty===!0?`*`:``}</code
                >
              </dd>
            `:p}
      <dt>${i(`aboutPage.built`)}</dt>
      <dd>
        ${t&&e.buildInfo.builtAt?g`<time
                dir="auto"
                datetime=${e.buildInfo.builtAt}
                title=${e.buildInfo.builtAt}
                >${t}</time
              >`:K()}
      </dd>
    </dl>
  `;return k([ue(e),A({title:i(`aboutPage.artifactTitle`),description:i(`aboutPage.artifactSubtitle`)},n),A({},M({title:i(`aboutPage.gatewayVersion`),description:i(`aboutPage.gatewayVersionHint`),control:e.gatewayVersion?N(g`<code dir="ltr" title=${e.gatewayVersion}>${e.gatewayVersion}</code>`,{mono:!0}):N(i(`aboutPage.unavailable`))})),g`<p class="about-footer">${i(`aboutPage.license`)}</p>`])}var q,J;function Y(){return(Y=e((()=>{ee(),m(),oe(),R(),L(),j(),S(),c(),O(),d(),D(),V(),q=12,J=[{href:`https://openclaw.ai`,icon:_.globe,label:()=>i(`aboutPage.linkWebsite`)},{href:`https://docs.openclaw.ai`,icon:_.book,label:()=>i(`aboutPage.linkDocs`)},{href:`https://github.com/openclaw/openclaw`,icon:H.github,label:()=>i(`aboutPage.linkGitHub`)},{href:E,icon:H.discord,label:()=>i(`aboutPage.linkDiscord`)},{href:`https://x.com/openclaw`,icon:H.x,label:()=>i(`aboutPage.linkX`)},{href:`https://docs.openclaw.ai/releases`,icon:_.scrollText,label:()=>i(`aboutPage.linkChangelog`)}]})))()}var X,Z,Q;function $(){return($=e((()=>{te(),m(),ie(),x(),ae(),b(),B(),a(),f(),l(),Y(),X=1800,Z=1400,Q=class extends s{constructor(...e){super(...e),this.copyState=`idle`,this.clawdWaving=!1,this.copyResetTimer=null,this.waveResetTimer=null,this.subscriptions=new ne(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.subscriptions.clear(),this.copyResetTimer!==null&&(globalThis.clearTimeout(this.copyResetTimer),this.copyResetTimer=null),this.waveResetTimer!==null&&(globalThis.clearTimeout(this.waveResetTimer),this.waveResetTimer=null),super.disconnectedCallback()}pokeClawd(){this.clawdWaving||(this.clawdWaving=!0,this.waveResetTimer=globalThis.setTimeout(()=>{this.waveResetTimer=null,this.clawdWaving=!1},Z))}async copyCommit(){let e=y.commit;if(!e||this.copyState===`copying`)return;globalThis.clearTimeout(this.copyResetTimer??void 0),this.copyResetTimer=null,this.copyState=`copying`;let t=await re(e);this.isConnected&&(this.copyState=t?`copied`:`error`,this.copyResetTimer=globalThis.setTimeout(()=>{this.copyResetTimer=null,this.copyState=`idle`},X))}render(){let e=this.context.gateway.snapshot,t=e.phase===`connected`&&e.hello?.server?.version?.trim()||null,n=de({buildInfo:y,gatewayVersion:t,copyState:this.copyState,onCopyCommit:()=>void this.copyCommit(),clawdWaving:this.clawdWaving,onPokeClawd:()=>this.pokeClawd()});return g`
      <section class="content-header">
        <div>
          <div class="page-title">${C(`about`)}</div>
        </div>
      </section>
      ${z(n)}
    `}},t([n({context:v,subscribe:!0})],Q.prototype,`context`,void 0),t([h()],Q.prototype,`copyState`,void 0),t([h()],Q.prototype,`clawdWaving`,void 0),customElements.get(`openclaw-about-page`)||customElements.define(`openclaw-about-page`,Q)})))()}$();
//# sourceMappingURL=about-page-DrlOORtU.js.map