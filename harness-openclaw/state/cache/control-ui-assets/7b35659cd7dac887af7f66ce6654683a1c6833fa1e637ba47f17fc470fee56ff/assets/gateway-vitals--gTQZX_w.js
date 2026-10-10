import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Sl as r,Tl as i,wl as a}from"./control-ui-core-CndkyZ8m.js";import{$ as o,Q as s,at as c,dt as l,it as u,nt as d,pt as f}from"./lit-runtime-CIjzngcy.js";import{Fi as p,Li as m}from"./control-ui-boot-shared-DlJEsz5Q.js";import{n as h,t as g}from"./en-debug--1GCYAvx.js";function _(){return b+=1,`sparkline-tile-gradient-${b}`}var v,y,b,x;function S(){return(S=e((()=>{s(),c(),m(),a(),v=100,y=40,b=0,x=class extends r{constructor(...e){super(...e),this.label=``,this.sub=``,this.samples=[],this.format=String,this.floorMax=0,this.autorange=!1,this.hoverIndex=null,this.gradientId=_(),this.handlePointerMove=e=>{if(this.samples.length<2)return;let t=e.currentTarget;if(!(t instanceof HTMLElement))return;let n=e.offsetX/Math.max(t.clientWidth,1),r=Math.round(n*(this.samples.length-1));this.hoverIndex=Math.min(Math.max(r,0),this.samples.length-1)},this.handlePointerLeave=()=>{this.hoverIndex=null}}get yRange(){let e=this.floorMax,t=1/0;for(let n of this.samples)n.value>e&&(e=n.value),n.value<t&&(t=n.value);if(Number.isFinite(t)||(t=0),!this.autorange)return{min:0,span:e>0?e:1};let n=Math.max(e-t,e*.02,1e-9),r=Math.max(t-n*.5,0);return{min:r,span:Math.max(e-r,1e-9)}}toY(e){let{min:t,span:n}=this.yRange,r=Math.min(Math.max((e-t)/n,0),1);return y-r*36}renderChart(){let e=this.samples;if(e.length<2)return o;let t=v/(e.length-1),n=e.map((e,n)=>`${n*t},${this.toY(e.value)}`).join(` `),r=e.at(-1);if(!r)return o;let i=this.toY(r.value),a=this.hoverIndex===null?void 0:e[this.hoverIndex],s=this.hoverIndex===null?0:this.hoverIndex/(e.length-1)*100;return d`
      <div
        class="sparkline-tile__chart"
        @pointermove=${this.handlePointerMove}
        @pointerleave=${this.handlePointerLeave}
      >
        <svg
          viewBox="0 0 ${v} ${y}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${u`
            <defs>
              <linearGradient id=${this.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="currentColor" stop-opacity="0.28"></stop>
                <stop offset="1" stop-color="currentColor" stop-opacity="0.02"></stop>
              </linearGradient>
            </defs>
            <polygon
              points="0,${y} ${n} ${v},${y}"
              fill="url(#${this.gradientId})"
            ></polygon>
            <polyline points=${n}></polyline>
          `}
        </svg>
        ${a?d`
                <div class="sparkline-tile__hairline" style="left: ${s}%"></div>
                <div
                  class="sparkline-tile__dot sparkline-tile__dot--hover"
                  style="left: ${s}%; top: ${this.toY(a.value)/y*100}%"
                ></div>
              `:d`
                <div
                  class="sparkline-tile__dot sparkline-tile__dot--now"
                  style="left: calc(100% - 3px); top: ${i/y*100}%"
                ></div>
              `}
      </div>
    `}render(){let e=this.samples,t=e.at(-1),n=this.hoverIndex===null?null:e[this.hoverIndex],r=n??t,i=n&&t&&t.at>n.at?p(t.at-n.at):null;return d`
      <div class="sparkline-tile__head">
        <span class="sparkline-tile__label">${this.label}</span>
        ${this.sub?d`<span class="sparkline-tile__sub mono">${this.sub}</span>`:o}
      </div>
      <div class="sparkline-tile__value mono">
        ${r?this.format(r.value):`–`}
        ${i?d`<span class="sparkline-tile__age">−${i}</span>`:o}
      </div>
      ${this.renderChart()}
    `}},t([f()],x.prototype,`label`,void 0),t([f()],x.prototype,`sub`,void 0),t([f({attribute:!1})],x.prototype,`samples`,void 0),t([f({attribute:!1})],x.prototype,`format`,void 0),t([f({attribute:!1})],x.prototype,`floorMax`,void 0),t([f({type:Boolean})],x.prototype,`autorange`,void 0),t([l()],x.prototype,`hoverIndex`,void 0),customElements.get(`openclaw-sparkline`)||customElements.define(`openclaw-sparkline`,x)})))()}function C(e,t){let n=[];for(let r of e){let e=t(r.status);typeof e==`number`&&Number.isFinite(e)?n.push({value:e,at:r.at}):n.length=0}return n}function w(e){return`${Math.round(e*100)}%`}function T(e){return n(`debug.overlay.memoryMb`,{value:String(Math.round(e/1048576))})}function E(e){return p(e)??n(`common.na`)}function D(e,t){let r=e.eventLoop,i=r?.reasons??[],a=i.includes(`cpu`)||i.includes(`event_loop_utilization`),s=typeof r?.utilization==`number`?n(`debug.overlay.loopShort`,{value:w(r.utilization)}):``;return d`<openclaw-sparkline
    class="gateway-vital gateway-vital--cpu"
    data-degraded=${a?``:o}
    .label=${n(`debug.overlay.cpu`)}
    .sub=${s}
    .samples=${C(t,e=>e.eventLoop?.cpuCoreRatio)}
    .format=${w}
    .floorMax=${1}
  ></openclaw-sparkline>`}function O(e,t){let r=typeof e.processMemory?.heapUsedBytes==`number`?n(`debug.overlay.heapShort`,{value:T(e.processMemory.heapUsedBytes)}):``;return d`<openclaw-sparkline
    class="gateway-vital gateway-vital--memory"
    .label=${n(`debug.overlay.memory`)}
    .sub=${r}
    .samples=${C(t,e=>e.processMemory?.rssBytes)}
    .format=${T}
    autorange
  ></openclaw-sparkline>`}function k(e,t){let r=e.eventLoop,i=r?.reasons?.includes(`event_loop_delay`),a=typeof r?.delayMaxMs==`number`?n(`debug.overlay.maxShort`,{value:E(r.delayMaxMs)}):``;return d`
    <div class="gateway-vitals">
      ${D(e,t)} ${O(e,t)}
      <openclaw-sparkline
        class="gateway-vital gateway-vital--delay"
        data-degraded=${i?``:o}
        .label=${n(`debug.overlay.delayP99`)}
        .sub=${a}
        .samples=${C(t,e=>e.eventLoop?.delayP99Ms)}
        .format=${E}
        .floorMax=${20}
      ></openclaw-sparkline>
    </div>
  `}function A(){return(A=e((()=>{s(),i(),g(),m(),S(),h()})))()}export{k as a,O as i,A as n,D as r,C as t};
//# sourceMappingURL=gateway-vitals--gTQZX_w.js.map