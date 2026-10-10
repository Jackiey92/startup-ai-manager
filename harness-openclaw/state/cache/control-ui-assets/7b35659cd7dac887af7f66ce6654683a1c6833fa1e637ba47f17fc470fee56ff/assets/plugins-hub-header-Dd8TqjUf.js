import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Tl as n}from"./control-ui-core-CndkyZ8m.js";import{$ as r,Q as i,nt as a}from"./lit-runtime-CIjzngcy.js";import{bi as o,si as s,xi as c}from"./control-ui-core-C5mtYcym.js";import{ei as l,ti as u}from"./control-ui-boot-shared-DlJEsz5Q.js";import{it as d,m as f,nt as p,p as m}from"./control-ui-boot-shared-DpHhsTHW.js";function h(){return(h=e((()=>{})))()}function g(){return[{value:`plugins`,label:t(`tabs.plugins`)},{value:`skills`,label:t(`tabs.skills`)},{value:`skill-workshop`,label:t(`tabs.skillWorkshop`)}]}function _(e){return f({id:`plugins`,active:e.active,tabs:g(),ariaLabel:t(`pluginsPage.hubTablistLabel`),panelId:v,className:`plugins-tabs`,onSelect:e.onSelect})}var v;function y(){return(y=e((()=>{m(),n(),l(),u(),v=`plugins-hub-panel`})))()}function b(e){let t=x[e.active];return a`
    <section
      class="content-header content-header--settings content-header--page hub-page-header plugins-hub-header"
    >
      <div class="hub-page-header__title">
        <h1 class="page-title">${c(t.route)}</h1>
        <div class="page-subtitle">
          ${o(t.route)} ${d(t.docsUrl)}
        </div>
      </div>
      <div class="hub-page-header__tabs">
        ${_({active:e.active,onSelect:e.onSelect})}
      </div>
      <div class="hub-page-header__actions">
        ${e.secondaryAction?a`<button
                type="button"
                class="btn btn--sm ${e.secondaryAction.icon?`btn--icon`:``} plugins-hub-header__secondary oc-action oc-action-secondary"
                aria-label=${e.secondaryAction.label}
                title=${e.secondaryAction.icon?e.secondaryAction.label:r}
                @click=${e.secondaryAction.onClick}
              >
                ${e.secondaryAction.icon??e.secondaryAction.label}
              </button>`:r}
      </div>
    </section>
  `}var x;function S(){return(S=e((()=>{i(),s(),p(),y(),x={plugins:{route:`plugins`,docsUrl:`https://docs.openclaw.ai/plugins/manage-plugins`},skills:{route:`skills`,docsUrl:`https://docs.openclaw.ai/tools/skills`},"skill-workshop":{route:`skill-workshop`,docsUrl:`https://docs.openclaw.ai/tools/skill-workshop`}}})))()}export{h as a,y as i,b as n,v as r,S as t};
//# sourceMappingURL=plugins-hub-header-Dd8TqjUf.js.map