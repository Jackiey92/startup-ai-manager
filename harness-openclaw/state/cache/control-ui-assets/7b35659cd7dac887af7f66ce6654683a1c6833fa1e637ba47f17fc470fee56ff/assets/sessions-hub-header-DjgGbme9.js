import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Tl as n}from"./control-ui-core-CndkyZ8m.js";import{$ as r,Q as i,nt as a}from"./lit-runtime-CIjzngcy.js";import{m as o,p as s}from"./control-ui-boot-shared-DpHhsTHW.js";function c(){return[{value:`sessions`,label:t(`tabs.sessions`)},{value:`worktrees`,label:t(`tabs.worktrees`)}]}function l(e){return o({id:`sessions`,active:e.active,tabs:c(),ariaLabel:t(`sessionsPage.hubTablistLabel`),panelId:`sessions-hub-panel`,onSelect:e.onSelect})}function u(){return(u=e((()=>{n(),s()})))()}function d(e){return a`
    <section
      class="content-header content-header--settings content-header--page hub-page-header sessions-hub-header"
    >
      <div class="hub-page-header__title">
        <div class="page-title">${e.title}</div>
        ${e.subtitle?a`<div class="page-subtitle">${e.subtitle}</div>`:r}
      </div>
      <div class="hub-page-header__tabs">
        ${l({active:e.active,onSelect:e.onSelect})}
      </div>
      <div class="hub-page-header__actions">${e.actions??r}</div>
    </section>
  `}function f(){return(f=e((()=>{i(),u()})))()}export{d as n,f as t};
//# sourceMappingURL=sessions-hub-header-DjgGbme9.js.map