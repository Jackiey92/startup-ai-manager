import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Ss as n,Tl as r,Zt as i,un as a,xs as o}from"./control-ui-core-CndkyZ8m.js";import{$ as s,Q as c,nt as l}from"./lit-runtime-CIjzngcy.js";function u(e){return e?.refreshing===!0}var d,f,p;function m(){return(m=e((()=>{d=5e3,f=3,p=class{constructor(e){this.options=e,this.timer=null,this.retryInFlight=null,this.pendingIncomplete=!1,this.attempts=0,this.cycle=0,this.exhaustionReported=!1}get exhausted(){return this.exhaustionReported}observe(e,t){return this.useConnection(t),e?this.retryInFlight===null?this.timer===null?this.armRetry():`retrying`:(this.pendingIncomplete=!0,`retrying`):(this.resetCycle(),`complete`)}armRetry(){if(this.attempts>=(this.options.limit??f))return this.reportExhaustion(),`exhausted`;this.attempts+=1,this.pendingIncomplete=!1;let e=this.cycle;return this.timer=window.setTimeout(()=>{this.timer=null;let t;try{t=this.options.retry()}catch{return}if(!t)return;let n=Promise.resolve(t).then(()=>void 0,()=>void 0);this.retryInFlight=n,n.finally(()=>{this.cycle===e&&this.retryInFlight===n&&(this.retryInFlight=null,this.pendingIncomplete&&(this.pendingIncomplete=!1,this.armRetry()))})},this.options.retryMs??d),`retrying`}startCycle(){this.resetCycle()}useConnection(e){e!==this.connection&&(this.connection=e,this.startCycle())}dispose(){this.resetCycle()}resetCycle(){this.cycle+=1,this.attempts=0,this.pendingIncomplete=!1,this.retryInFlight=null,this.exhaustionReported=!1,this.clear()}reportExhaustion(){this.exhaustionReported||(this.exhaustionReported=!0,this.options.onExhausted?.())}clear(){this.timer!==null&&(window.clearTimeout(this.timer),this.timer=null)}}})))()}function h(e){if(e.reason===`manual`)return`fetch`;if(!e.visible)return`defer`;if(e.interrupted)return`fetch`;let t=e.ttlMs??g;return e.lastLoadedAtMs!==null&&e.nowMs-e.lastLoadedAtMs<t?`skip`:`fetch`}var g,_;function v(){return(v=e((()=>{m(),g=3e5,_=class{constructor(e){this.options=e,this.lastLoadedAtMs=null,this.pendingAutomaticRefresh=!1,this.reloadPending=!1,this.incompleteUsageRetry=new p({retry:()=>this.requestAndWait(`poll`),onExhausted:()=>this.options.onIncompleteUsageExhausted?.()})}get incompleteUsageExhausted(){return this.incompleteUsageRetry.exhausted}setLastLoadedAtMs(e,t){return this.applyLoadState(e,t?.incomplete===!0,t?.connection)}markProviderUsage(e,t,n){let r=e?.ok===!1||e?.ok===!0&&u(e.value);return this.applyLoadState(t,r,n)}resetPayload(){this.applyLoadState(null,!1),this.reloadPending=!1}dispose(){this.incompleteUsageRetry.dispose()}applyLoadState(e,t,n){let r=this.incompleteUsageRetry.observe(t,n);return this.lastLoadedAtMs=r===`complete`?e:null,r}interrupt(){this.reloadPending||=this.options.isLoading()}markLoadDeferred(){this.reloadPending=!0}beginLoad(){this.reloadPending=!1}request(e){this.requestAndWait(e)}async requestAndWait(e){if(this.options.isLoading()&&e!==`manual`){this.pendingAutomaticRefresh=!0;return}this.pendingAutomaticRefresh=!1,h({reason:e,visible:document.visibilityState===`visible`&&document.hasFocus(),interrupted:this.reloadPending,nowMs:Date.now(),lastLoadedAtMs:this.lastLoadedAtMs})===`fetch`&&(e!==`poll`&&this.incompleteUsageRetry.startCycle(),await this.options.reload(e))}flushPending(){this.pendingAutomaticRefresh&&(this.pendingAutomaticRefresh=!1,this.request(`focus`))}}})))()}function y(e){return/\b\d+(?:m|h)\b/iu.test(e)&&!/\b168h\b/iu.test(e)?0:/\b(?:week|168h)\b/iu.test(e)?1:2}function b(e){let t=new Map;for(let n of e){let e=n.groupLabel??``,r=t.get(e)??[];r.push(n),t.set(e,r)}for(let e of t.values())e.sort((e,t)=>y(e.label)-y(t.label));return t}function x(e){let t=e.trim().toUpperCase();if([`USD`,`EUR`,`GBP`,`CNY`,`JPY`].includes(t)){let e=new Intl.NumberFormat(void 0,{style:`currency`,currency:t,maximumFractionDigits:t===`JPY`?0:2});return t=>e.format(t)}let n=new Intl.NumberFormat(void 0,{maximumFractionDigits:2});return t=>`${n.format(t)} ${e}`}function S(e){return!e||!Number.isFinite(e)?null:new Intl.DateTimeFormat(void 0,{month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`}).format(new Date(e))}function C(e){return(e.billing??[]).map(e=>{let n=e.label??(e.type===`balance`?t(`usage.providerUsage.balance`):e.type===`spend`?t(`usage.providerUsage.spend`):t(`usage.providerUsage.budget`)),r=x(e.unit),i=e.type===`budget`?`${r(e.used)} / ${r(e.limit)}`:r(e.amount);return l`
      <div class="provider-usage-billing-row">
        <span>${n}</span>
        <strong>${i}</strong>
      </div>
    `})}function w(e,t){let n=e.costHistory;if(!n)return 0;let r=new Date,i=Date.UTC(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate()),a=i-(Math.max(1,t)-1)*864e5;return n.daily.reduce((e,t)=>{let n=Date.parse(`${t.date}T00:00:00Z`);return Number.isFinite(n)&&n>=a&&n<=i?e+t.amount:e},0)}function T(e){let n=e.costHistory;if(!n||n.daily.length===0)return s;let r=0,a=0,o={requests:0,input:0,cache:0,output:0};for(let e of n.daily)r=Math.max(r,e.amount),a+=e.amount,o.requests+=e.requests??0,o.input+=e.inputTokens,o.cache=o.cache+e.cacheReadTokens+e.cacheWriteTokens,o.output+=e.outputTokens;let c=i(o.input),u=i(o.cache),d=i(o.output),f=[[t(`usage.providerUsage.today`),w(e,1)],[t(`usage.providerUsage.last7Days`),w(e,7)],[t(`usage.providerUsage.lastDays`,{count:String(n.periodDays)}),a]],p=x(n.unit);return l`
    <div class="provider-cost-history">
      <div class="provider-cost-windows">
        ${f.map(([e,t])=>l`
            <div class="provider-cost-window">
              <span>${e}</span>
              <strong>${p(t)}</strong>
            </div>
          `)}
      </div>
      <div class="provider-cost-chart" aria-label=${t(`usage.providerUsage.dailyCost`)}>
        ${n.daily.map(e=>{let t=e.amount>0&&r>0?Math.max(3,e.amount/r*100):0,n=`${e.date}: ${p(e.amount)}`;return l`<span
            style=${`height: ${t}%`}
            title=${n}
            aria-label=${n}
          ></span>`})}
      </div>
      <div class="provider-cost-tokens">
        ${o.requests>0?l`<span
                >${t(`usage.providerUsage.requests`,{count:new Intl.NumberFormat().format(o.requests)})}</span
              >`:s}
        <span>${t(`usage.providerUsage.inputTokens`,{count:c})}</span>
        <span>${t(`usage.providerUsage.cacheTokens`,{count:u})}</span>
        <span>${t(`usage.providerUsage.outputTokens`,{count:d})}</span>
      </div>
      ${n.models.length>0||n.categories.length>0?l`
              <div class="provider-cost-breakdowns">
                ${n.models.length>0?l`
                        <div class="provider-cost-breakdown">
                          <span class="provider-cost-breakdown__title"
                            >${t(`usage.providerUsage.topModels`)}</span
                          >
                          ${n.models.slice(0,3).map(e=>l`
                                <div>
                                  <span>${e.name}</span
                                  ><strong>${i(e.totalTokens)}</strong>
                                </div>
                              `)}
                        </div>
                      `:s}
                ${n.categories.length>0?l`
                        <div class="provider-cost-breakdown">
                          <span class="provider-cost-breakdown__title"
                            >${t(`usage.providerUsage.costCategories`)}</span
                          >
                          ${n.categories.slice(0,3).map(e=>l`
                              <div>
                                <span>${e.name}</span>
                                <strong>${p(e.amount)}</strong>
                              </div>
                            `)}
                        </div>
                      `:s}
              </div>
            `:s}
    </div>
  `}function E(e){let n=Math.max(0,Math.min(100,e.usedPercent)),r=Math.max(0,100-n),i=r<=10?`danger`:r<=25?`warn`:`ok`,a=t(`usage.providerUsage.remaining`,{percent:r.toFixed(0)}),o=S(e.resetAt);return l`
    <div class="provider-usage-window">
      <div class="provider-usage-window__meta">
        <span>${e.label}</span>
        <strong>${a}</strong>
      </div>
      <div
        class=${`provider-usage-progress provider-usage-progress--${i}`}
        role="progressbar"
        aria-label=${e.label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${r.toFixed(0)}
        aria-valuetext=${a}
      >
        <span style=${`width: ${r}%`}></span>
      </div>
      ${o?l`<div class="provider-usage-reset">
              ${t(`usage.providerUsage.resets`,{date:o})}
            </div>`:s}
    </div>
  `}function D(e,t={}){return e.error?l`<div class="provider-usage-error">${o(e.error)}</div>`:l`
    ${e.windows.length>0?t.groupWindows?l`
              <div class="provider-usage-windows provider-usage-windows--grouped">
                ${Array.from(b(e.windows),([e,t])=>l`
                    <div
                      class="provider-usage-window-group"
                      role="group"
                      aria-label=${e||s}
                    >
                      ${e?l`<div class="provider-usage-window-group__title">${e}</div>`:s}
                      <div class="provider-usage-window-group__windows">
                        ${t.map(e=>E(e))}
                      </div>
                    </div>
                  `)}
              </div>
            `:l`
              <div class="provider-usage-windows">
                ${e.windows.map(e=>E(e))}
              </div>
            `:s}
    ${e.billing&&e.billing.length>0?l`<div class="provider-usage-billing">${C(e)}</div>`:s}
    ${T(e)}
    ${e.summary?l`<div class="provider-usage-summary">${e.summary}</div>`:s}
  `}function O(){return(O=e((()=>{c(),r(),n(),a()})))()}function k(){return(k=e((()=>{})))()}export{v as a,_ as i,O as n,m as o,D as r,u as s,k as t};
//# sourceMappingURL=usage-0VKmc920.js.map