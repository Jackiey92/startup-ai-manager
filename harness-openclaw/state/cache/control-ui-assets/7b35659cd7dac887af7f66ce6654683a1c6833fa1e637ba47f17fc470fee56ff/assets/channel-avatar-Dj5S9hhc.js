import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{wl as n,xl as r}from"./control-ui-core-CndkyZ8m.js";import{$ as i,Q as a,at as o,dt as s,nt as c,pt as l}from"./lit-runtime-CIjzngcy.js";import{C as u,S as d}from"./control-ui-boot-shared-DlJEsz5Q.js";var f;function p(){return(p=e((()=>{a(),o(),u(),n(),f=class extends r{constructor(...e){super(...e),this.routeUrl=null,this.authTokens=[],this.authReady=!1,this.fallback=i,this.undecodableRouteUrl=null,this.loader=new d(this,{cacheNotFound:!0})}render(){return this.loader.withActiveRoutes(()=>this.renderContent())}renderContent(){let e=this.routeUrl,t=e&&this.authReady&&this.undecodableRouteUrl!==e?this.loader.resolve(e,this.authTokens):null;return t?c`<img
      class="channel-avatar"
      src=${t}
      alt=""
      aria-hidden="true"
      decoding="async"
      @error=${()=>{this.undecodableRouteUrl=e}}
    />`:this.fallback}},t([l({attribute:!1})],f.prototype,`routeUrl`,void 0),t([l({attribute:!1})],f.prototype,`authTokens`,void 0),t([l({attribute:!1})],f.prototype,`authReady`,void 0),t([l({attribute:!1})],f.prototype,`fallback`,void 0),t([s()],f.prototype,`undecodableRouteUrl`,void 0),customElements.get(`openclaw-channel-avatar`)||customElements.define(`openclaw-channel-avatar`,f)})))()}p();
//# sourceMappingURL=channel-avatar-Dj5S9hhc.js.map