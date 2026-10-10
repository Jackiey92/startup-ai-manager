import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{Al as i,Fl as a,Il as o,Sl as s,Tl as c,wl as l}from"./control-ui-core-CndkyZ8m.js";import{$ as u,Q as d,at as f,nt as p,pt as m}from"./lit-runtime-CIjzngcy.js";import{$r as h,Di as g,Ei as _,Qr as v}from"./control-ui-core-C5mtYcym.js";import{D as y,M as b,O as x,g as S}from"./config-runtime-B4vvJ76O.js";import{Yt as C}from"./control-ui-boot-shared-DpHhsTHW.js";import{o as w,r as T}from"./board-widget-cell-render-C-h1I45M.js";import{n as E,r as D}from"./board-layout-BmeSfx17.js";function O(e){let t=k.safeParse(e);if(!t.success)throw new E(`invalid_operation`,`Website props must contain only a valid HTTPS url of at most 2048 characters`);let n=new URL(t.data.url);if(n.username||n.password)throw new E(`invalid_operation`,`Website URLs must not contain embedded credentials`);return t.data}var k;function A(){return(A=e((()=>{S(),D(),k=y({url:x().max(2048).pipe(b({protocol:/^https$/,normalize:!0}).max(2048))})})))()}var j,M;function N(){return(N=e((()=>{o(),j={board:{widget:{websiteOpen:`Open website`,websiteEmbedHint:`If this site does not load here, open it in a new tab.`,websiteSameOrigin:`Open this website in a new tab. Gateway and Control UI pages cannot be embedded in a website widget.`}}},M=Object.assign(()=>Object.assign(a.board.widget,j.board.widget),{catalog:j})})))()}var P;function F(){return(F=e((()=>{r(),d(),f(),A(),h(),T(),g(),c(),N(),l(),M(),P=class extends s{constructor(...e){super(...e),this.active=!0,this.activated=!1}willUpdate(){this.activated||=this.active}render(){if(!this.activated)return u;let e;try{e=new URL(O(this.widget?.props).url)}catch(e){return w(e)}let t=C(this.context?.gateway.connection.gatewayUrl??``,window.location.origin),n=new URL(t).hostname,r=e.hostname===window.location.hostname||e.hostname===n;return p`<div class="board-website">
      ${r?p`<p class="board-website__notice" role="alert">
              ${i(`board.widget.websiteSameOrigin`)}
            </p>`:p`<iframe
              class="board-website__frame"
              title=${this.widget?.title||i(`board.widget.kindWebsite`)}
              src=${e.href}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              referrerpolicy="no-referrer"
            ></iframe>`}
      <div class="board-website__footer">
        <span class="board-website__origin">${e.host}</span>
        <a
          href=${e.href}
          target="_blank"
          rel="noopener noreferrer"
          title=${i(`board.widget.websiteEmbedHint`)}
        >
          ${i(`board.widget.websiteOpen`)}${_.externalLink}
        </a>
      </div>
    </div>`}},t([n({context:v,subscribe:!0})],P.prototype,`context`,void 0),t([m({attribute:!1})],P.prototype,`widget`,void 0),t([m({type:Boolean})],P.prototype,`active`,void 0),customElements.get(`openclaw-website-widget`)||customElements.define(`openclaw-website-widget`,P)})))()}F();
//# sourceMappingURL=website-BTX4PJub.js.map