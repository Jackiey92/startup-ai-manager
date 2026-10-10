import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,wa as r,zr as i}from"./control-ui-foundation-DaCuy7E_.js";import{Al as a,Bs as o,Pc as s,Sl as c,Tl as l,Vs as u,ac as d,nc as f,ni as p,rc as m,ti as h,wl as g}from"./control-ui-core-CndkyZ8m.js";import{$ as _,Q as v,T as y,at as b,nt as x,pt as S,w as C}from"./lit-runtime-CIjzngcy.js";import{$r as w,Di as T,Ei as E,Qi as D,Qr as O,ba as k,ia as A,wa as j}from"./control-ui-core-C5mtYcym.js";import{O as M,k as N}from"./control-ui-boot-shared-DpHhsTHW.js";import{t as P}from"./terminal-panel-registration-lvsOF_CE.js";function F(e,t=``){let n=k(e,D),r=j(n.pathname,t);if(r)return{sessionId:r};let i=m(n.search);return i?{catalog:i}:null}function I(){return(I=e((()=>{A(),d()})))()}var L;function R(){return(R=e((()=>{i(),v(),b(),C(),w(),T(),M(),P(),l(),d(),s(),h(),g(),u(),I(),L=class extends c{constructor(){super(),this.location=null,new o(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.config,(e,t)=>e.subscribe(t)).watch(()=>this.context?.theme,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentSelection,(e,t)=>e.subscribe(t))}render(){let e=this.context,t=e.gateway.snapshot,n=p(t,e.config.current.terminalEnabled??!1),i=e.agentSelection.state.selectedId??t.assistantAgentId,o=this.location?F(this.location,e.basePath):null,s=o?`sessionId`in o?o.sessionId:f(o.catalog):``;return y(s,x`<openclaw-terminal-panel
          ?hidden=${!n}
          embedded
          fullscreen
          .page=${!0}
          .routeTarget=${o}
          .client=${t.phase===`connected`?t.client:null}
          .available=${n}
          .agentId=${i?r(i):null}
          .basePath=${e.basePath}
          .themeMode=${e.theme.resolvedMode}
        ></openclaw-terminal-panel>
        ${n?_:N({icon:E.terminal,heading:a(`terminal.title`),description:a(`terminal.unavailable`),action:x`<button class="btn" @click=${()=>e.navigate(`new-session`)}>
                  ${a(`newSession.title`)}
                </button>`})}`)}},t([n({context:O,subscribe:!0})],L.prototype,`context`,void 0),t([S({attribute:!1})],L.prototype,`location`,void 0),customElements.define(`openclaw-terminal-page`,L)})))()}R();
//# sourceMappingURL=terminal-page-CRmcTM50.js.map