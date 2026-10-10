import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{Al as n,Sl as r,Tl as i,wl as a}from"./control-ui-core-CndkyZ8m.js";import{$ as o,Q as s,at as c,it as l,nt as u,pt as d}from"./lit-runtime-CIjzngcy.js";import{D as f,M as p,O as m,S as h,c as g,f as _,g as v,m as y,y as b}from"./config-runtime-B4vvJ76O.js";import{o as x,r as S}from"./board-widget-cell-render-C-h1I45M.js";import{n as C,r as w}from"./board-layout-BmeSfx17.js";function T(e){if(new TextEncoder().encode(JSON.stringify(e)).byteLength>8192)throw new C(`invalid_operation`,`Report exceeds 8KB JSON budget`);let t=j.safeParse(e);if(!t.success){let e=t.error.issues[0];throw new C(`invalid_operation`,`Invalid report at ${e?.path.join(`.`)||`root`}: ${e?.message}`)}return t.data}var E,D,O,k,A,j;function M(){return(M=e((()=>{v(),w(),E=m().min(1).max(120).optional(),D=m().min(1).max(160),O=m().max(240).optional(),k=m().max(500),A=f({type:b(`table`),title:E,columns:_(D).min(1).max(8),rows:_(_(k).max(8)).max(40)}).refine(e=>e.rows.every(t=>t.length===e.columns.length),{message:`Every table row must match the columns`}),j=f({blocks:_(y(`type`,[f({type:b(`text`),title:E,text:m().min(1).max(4e3)}),f({type:b(`metrics`),items:_(f({label:D,value:m().min(1).max(80),detail:O})).min(1).max(8)}),A,f({type:b(`chart`),title:E,style:g([`bar`,`line`]).optional(),points:_(f({label:D,value:h().min(-(2**53-1)).max(2**53-1)})).min(1).max(40)}),f({type:b(`links`),title:E,items:_(f({label:D,url:p({protocol:/^https?$/,normalize:!0}).max(2048),detail:O})).min(1).max(20)})])).min(1).max(24)})})))()}function N(e){let t=e.points.map(e=>e.value),n=Math.min(0,...t),r=Math.max(0,...t)-n||1,i=e=>164-(e-n)/r*148,a=i(0),s=e.style===`line`,c=608/e.points.length,d=t.map((e,n)=>({x:s?t.length===1?320:16+n/(t.length-1)*608:16+(n+.5)*c,y:i(e)}));return u`<figure class="board-report__chart">
    ${e.title?u`<figcaption>${e.title}</figcaption>`:o}
    ${l`<svg viewBox="0 0 640 180" aria-hidden="true" focusable="false">
      <line class="board-report__axis" x1="16" x2="624" y1=${a} y2=${a}></line>
      ${s?l`<polyline class="board-report__line" points=${d.map(e=>`${e.x},${e.y}`).join(` `)}></polyline>
            ${d.map(e=>l`<circle class="board-report__point" cx=${e.x} cy=${e.y} r="3"></circle>`)}`:d.map(e=>l`<rect class="board-report__bar" x=${e.x-c*.35} y=${Math.min(e.y,a)} width=${c*.7} height=${Math.max(1,Math.abs(e.y-a))} rx="2"></rect>`)}
    </svg>`}
    <dl class="board-report__values">
      ${e.points.map(e=>u`<div>
            <dt>${e.label}</dt>
            <dd>${e.value}</dd>
          </div>`)}
    </dl>
  </figure>`}function P(e){switch(e.type){case`text`:return u`<section>
        ${e.title?u`<h3>${e.title}</h3>`:o}
        <p class="board-report__text">${e.text}</p>
      </section>`;case`metrics`:return u`<dl class="board-report__metrics">
        ${e.items.map(e=>u`<div>
              <dt>${e.label}</dt>
              <dd>${e.value}</dd>
              ${e.detail?u`<dd class="board-report__metric-detail">${e.detail}</dd>`:o}
            </div>`)}
      </dl>`;case`table`:return u`<div class="board-report__table">
        <table>
          ${e.title?u`<caption>
                  ${e.title}
                </caption>`:o}
          <thead>
            <tr>
              ${e.columns.map(e=>u`<th scope="col">${e}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${e.rows.map(e=>u`<tr>
                  ${e.map(e=>u`<td>${e}</td>`)}
                </tr>`)}
          </tbody>
        </table>
      </div>`;case`chart`:return N(e);case`links`:return u`<section>
        ${e.title?u`<h3>${e.title}</h3>`:o}
        <ul class="board-report__links">
          ${e.items.map(e=>u`<li>
              <a href=${e.url} target="_blank" rel="noopener noreferrer">${e.label}</a>
              ${e.detail?u`<span>${e.detail}</span>`:o}
            </li>`)}
        </ul>
      </section>`}return e}var F;function I(){return(I=e((()=>{s(),c(),M(),S(),i(),a(),F=class extends r{willUpdate(e){if(e.has(`widget`))try{this.content={report:T(this.widget?.props)}}catch(e){this.content={error:e}}}render(){let e=this.content;return e?`error`in e?x(e.error):u`<article
          class="board-report"
          aria-label=${this.widget?.title??n(`board.widget.kindReport`)}
        >
          ${e.report.blocks.map(P)}
        </article>`:o}},t([d({attribute:!1})],F.prototype,`widget`,void 0),customElements.get(`openclaw-report-widget`)||customElements.define(`openclaw-report-widget`,F)})))()}I();
//# sourceMappingURL=report-CAQ7i_r0.js.map