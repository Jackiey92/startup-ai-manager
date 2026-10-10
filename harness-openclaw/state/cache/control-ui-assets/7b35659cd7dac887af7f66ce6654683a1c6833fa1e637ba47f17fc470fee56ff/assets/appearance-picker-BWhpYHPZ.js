import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Cl as n,Sl as r,wl as i}from"./control-ui-core-CndkyZ8m.js";import{Q as a,_t as o,at as s,dt as c,nt as l,pt as u}from"./lit-runtime-CIjzngcy.js";import{Q as d,et as f}from"./control-ui-boot-shared-C018SffO.js";import{Si as p,bi as m,vi as h,xi as g,yi as _}from"./control-ui-boot-shared-DpHhsTHW.js";import"./control-ui-boot-shared-CoE663Cg.js";var v,y;function b(){return(b=e((()=>{a(),s(),d(),i(),g(),_(),v=class extends r{constructor(...e){super(...e),this.mode=`grid`,this.customIcon=``}select(e,t){this.props.disabled||this.props.onChange({icon:e,color:t})}showGrid(){this.mode=`grid`,this.customIcon=``,this.updateComplete.then(()=>{this.isConnected&&this.querySelector(`.session-menu__icon-choice--custom`)?.focus()})}render(){return m({inline:!0,clearable:this.props.clearable,mode:this.mode,currentIcon:this.props.icon,currentColor:this.props.color,disabled:this.props.disabled??!1,colorDisabled:this.props.disabled??!1,customIconValue:this.customIcon,onSelectColor:(e,t)=>this.select(this.props.icon,t),onSelect:(e,t)=>this.select(t,this.props.color),onReset:()=>this.select(null,null),onShowCustom:()=>{this.mode=`custom`,this.customIcon=``,this.updateComplete.then(()=>{this.isConnected&&this.querySelector(`.session-menu__icon-custom-input`)?.focus()})},onBack:()=>this.showGrid(),onInput:e=>{e.currentTarget instanceof HTMLTextAreaElement&&(this.customIcon=e.currentTarget.value)},onApply:()=>{let e=f(this.customIcon);e&&!this.props.disabled&&(this.select(e,this.props.color),this.showGrid())},onGridKeydown:h})}},t([u({attribute:!1})],v.prototype,`props`,void 0),t([c()],v.prototype,`mode`,void 0),t([c()],v.prototype,`customIcon`,void 0),y=class extends n{static{this.styles=o`
    :host {
      color: var(--appearance-color, inherit);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
    }
    svg,
    img {
      width: 100%;
      height: 100%;
    }
    img {
      object-fit: contain;
    }
  `}render(){let e=this.props.icon?.trim();return l`${e?p(e)??e:this.props.fallback}`}},t([u({attribute:!1})],y.prototype,`props`,void 0),customElements.get(`openclaw-appearance-picker`)||customElements.define(`openclaw-appearance-picker`,v),customElements.get(`openclaw-appearance-glyph`)||customElements.define(`openclaw-appearance-glyph`,y)})))()}b();export{y as AppearanceGlyph,v as AppearancePicker};
//# sourceMappingURL=appearance-picker-BWhpYHPZ.js.map