import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t}from"./control-ui-foundation-DaCuy7E_.js";import{$n as n,Al as r,Ol as i,Sl as a,Tl as o,ar as s,cr as c,er as l,ir as u,nr as d,or as f,sr as p,tr as m,ur as h,wl as g}from"./control-ui-core-CndkyZ8m.js";import{$ as _,Q as v,X as y,Y as b,Z as x,at as S,c as C,dt as w,nt as T,pt as E,s as D,v as O,x as ee}from"./lit-runtime-CIjzngcy.js";import{Cn as k,Di as A,Ei as te,Tn as j,bn as M,wn as N}from"./control-ui-core-C5mtYcym.js";import{bt as P,ct as F,dt as I,it as L,nt as R,ot as ne,yt as re}from"./control-ui-boot-shared-DpHhsTHW.js";import{C as ie}from"./control-ui-boot-new-CQMzhCGu.js";import{a as ae,c as oe,d as se,i as ce,l as z,n as le,o as ue,r as de,s as fe,t as pe,u as me}from"./config-form.tiers-B9iwCG2R.js";import{a as he,n as ge,r as _e,t as ve}from"./config-form.array-items-0MD-jf91.js";import{A as ye,C as B,D as be,E as xe,F as V,I as Se,M as H,O as Ce,S as we,T as U,_ as Te,a as Ee,b as De,c as Oe,d as W,f as ke,g as Ae,h as je,i as Me,j as Ne,k as Pe,l as G,m as Fe,n as K,o as Ie,p as Le,r as Re,s as ze,t as Be,u as Ve,v as He,w as Ue,x as q,y as We}from"./config-form.node.shared-hdpfuIcD.js";import{i as Ge,n as Ke,r as qe,t as Je}from"./phone-runtime-CeiKb8k6.js";function Ye(e,t,n,r){let i=t[n];if(i===void 0)return{ok:!1,value:Ze};let a=n===t.length-1;if(typeof i==`number`){if(e!=null&&!Array.isArray(e))return{ok:!1,value:Ze};let o=Array.isArray(e)?[...e]:[];if(a)return r===void 0?o.splice(i,1):o[i]=r,{ok:!0,value:o};let s=Ye(o[i],t,n+1,r);return s.ok?(o[i]=s.value,{ok:!0,value:o}):s}if(e!=null&&(typeof e!=`object`||Array.isArray(e)))return{ok:!1,value:Ze};let o=e?{...e}:{};if(a)return r===void 0?delete o[i]:Object.defineProperty(o,i,{value:r,enumerable:!0,configurable:!0,writable:!0}),{ok:!0,value:o};let s=Ye(Object.hasOwn(o,i)?o[i]:void 0,t,n+1,r);return s.ok?(Object.defineProperty(o,i,{value:s.value,enumerable:!0,configurable:!0,writable:!0}),{ok:!0,value:o}):s}function Xe(e,t,n){return t.length===0?{ok:!0,value:n}:Ye(e,t,0,n)}var Ze;function Qe(){return(Qe=e((()=>{Ze=Symbol(`invalid-path-patch`)})))()}function $e(e){return structuredClone(e)}function et(e){let t=c(e.schema);if(t!==`object`&&t!==`array`)return;let n=e.schema.default;return t===`object`&&n&&typeof n==`object`&&!Array.isArray(n)||t===`array`&&Array.isArray(n)?$e(n):t===`object`?{}:[]}function tt(e,t){return t!==void 0&&e.value===void 0&&e.isRequired!==!0&&e.structuredDraftOwner!==!0&&!U(e.schema,t)}var nt;function rt(){return(rt=e((()=>{v(),S(),o(),g(),Qe(),B(),V(),nt=class extends a{constructor(...e){super(...e),this.error=``}willUpdate(e){if(!e.has(`props`))return;let t=e.get(`props`),n=this.props;n&&(!t||t.identity!==n.identity||!Object.is(t.sourceIdentity,n.sourceIdentity))&&(this.draftValue=$e(n.initialValue),this.error=``)}patchDraft(e,t){let n=this.props,i=this.draftValue;if(!n||!i)return!1;let a=n.params.path;if(e.length<a.length||!a.every((t,n)=>t===e[n]))return!1;let o=e.slice(a.length),s=o.length===0?{ok:!0,value:t}:Xe(i,o,t);if(!s.ok)return!1;let l=s.value,u=c(n.params.schema);return u===`object`&&(!l||typeof l!=`object`||Array.isArray(l))||u===`array`&&!Array.isArray(l)?!1:(this.draftValue=l,this.error=``,!U(n.params.schema,l)||n.params.onPatch(a,l)!==!1||(this.error=r(`configForm.draftRejected`),!1))}render(){let e=this.props,t=this.draftValue;if(!e||!t)return _;let n=H(e.params.path,`structured-draft-error`);return T`
      ${e.renderNode({...e.params,value:t,sourceIdentity:t,controlIdentity:t,structuredDraftOwner:!0,onPatch:(e,t)=>this.patchDraft(e,t),onRemove:e=>this.patchDraft(e,void 0)})}
      ${this.error?T`
              <div class="settings-row settings-row--stacked cfg-structured-draft__error">
                <div class="settings-row__control">
                  <span id=${n} class="cfg-field__error" role="alert">${this.error}</span>
                </div>
              </div>
            `:_}
    `}},t([E({attribute:!1})],nt.prototype,`props`,void 0),t([w()],nt.prototype,`draftValue`,void 0),t([w()],nt.prototype,`error`,void 0),customElements.get(`openclaw-config-form-structured-draft`)||customElements.define(`openclaw-config-form-structured-draft`,nt)})))()}function it(e,t){return t.length>e.length&&e.every((e,n)=>q(e,t[n]))}function at(e){let{schema:t,value:n,minimumItems:r,maximumItems:i,uniqueItems:a,isUnset:o,isRequired:s,itemSchemaAt:c}=e,l=Math.max(1,r-n.length),u=l>100?1:l,d=[];for(let e=0;e<u;e+=1){let t=we(c(n.length+e));if(t===Ae){d.length=0;break}d.push(t)}let f=d.length===u?[...n,...d]:void 0,p=f!==void 0&&!a&&(i===void 0||f.length<=i)&&(f.length<r||U(t,f))?f:void 0,m=U(t,n),h=Te(t).find(e=>U(t,e)&&(o||!m||it(n,e)))??(o&&s&&i===0&&U(t,[])?[]:void 0);return{atomicCandidate:Array.isArray(h)?structuredClone(h):void 0,autoCandidate:p}}function ot(){return(ot=e((()=>{B()})))()}var st;function ct(){return(ct=e((()=>{B(),st=class{constructor(){this.identities=new WeakMap,this.previous=[]}read(e){let t=this.identities.get(e);if(t?.length===e.length)return this.previous=e,t;let n=this.identities.get(this.previous)??[],r=new Set(this.previous.flatMap((t,n)=>q(t,e[n])?[]:[n])),i=e.map((e,t)=>{let i=q(e,this.previous[t])?t:[...r].find(t=>q(e,this.previous[t]));return i===void 0?Symbol(`array-row`):(r.delete(i),n[i])});return this.identities.set(e,i),this.previous=e,i}patch(e,t,n){let r=this.previous;this.identities.set(e,t);let i=n(e)!==!1;return i||(this.identities.delete(e),this.previous=r),i}}})))()}function lt(e,t){let n=e.currentTarget;if(!(n instanceof HTMLElement))return;let r=n.closest(`.cfg-block`);Array.from(r?.getElementsByTagName(`openclaw-config-form-collection-draft`)??[]).find(e=>e.parentElement===r&&e.id===t)?.openDraft?.()}var J;function ut(){return(ut=e((()=>{v(),S(),o(),g(),B(),k(),V(),J=class extends a{constructor(...e){super(...e),this.draftOpen=!1,this.draftKey=``,this.draftValue=``,this.draftIsNull=!1,this.error=``,this.invalidTarget=null}willUpdate(e){let t=e.get(`props`),n=this.props;t&&(!n||t.identity!==n.identity||!Object.is(t.sourceIdentity,n.sourceIdentity)&&!q(t.sourceIdentity,n.sourceIdentity))&&this.closeDraft()}openDraft(){this.props?.disabled||(this.draftOpen=!0,this.updateComplete.then(()=>{this.querySelector(`[data-collection-draft-value]`)?.focus()}))}clearError(){this.error=``,this.invalidTarget=null}closeDraft(){this.draftOpen=!1,this.draftKey=``,this.draftValue=``,this.draftIsNull=!1,this.clearError()}fail(e,t){this.invalidTarget=e,this.error=t,this.updateComplete.then(()=>{this.querySelector(e===`key`?`[data-collection-draft-key]`:`[data-collection-draft-value]`)?.focus()})}parseValue(e){if(this.draftIsNull)return{ok:!0,value:null};let t=c(e),n=e.anyOf??e.oneOf??[],i=n.some(p)&&n.some(e=>[`number`,`integer`].includes(c(e)??``));if(t===`string`)return{ok:!0,value:this.draftValue};if(t===`number`||t===`integer`){let e=M(this.draftValue,t===`integer`);return typeof e==`number`?{ok:!0,value:e}:{ok:!1,message:r(`configForm.invalidNumber`)}}try{let t=JSON.parse(this.draftValue);if(typeof t==`number`){let t=M(this.draftValue,!1);return typeof t==`number`?{ok:!0,value:t}:i&&U(e,this.draftValue)?{ok:!0,value:this.draftValue}:{ok:!1,message:r(`configForm.invalidNumber`)}}return{ok:!0,value:t}}catch{return i&&U(e,this.draftValue)?{ok:!0,value:this.draftValue}:{ok:!1,message:r(`configForm.invalidJson`)}}}commit(){let e=this.props;if(!e||e.disabled)return;let t=this.parseValue(e.schema);if(!t.ok){this.fail(`value`,t.message);return}if(!U(e.schema,t.value)){this.fail(`value`,[`number`,`integer`].includes(c(e.schema)??``)?r(`configForm.invalidNumber`):r(`configForm.invalidString`));return}if(e.existingValues?.some(e=>q(e,t.value))){this.fail(`value`,r(`configForm.invalidString`));return}if(e.validateValue&&!e.validateValue(t.value)){this.fail(`value`,r(`configForm.invalidString`));return}let n=this.draftKey.trim();if(e.existingKeys&&(!n||e.existingKeys.includes(n)||e.validateKey?.(n)===!1)){this.fail(`key`,r(`configForm.invalidString`));return}this.dispatchEvent(new CustomEvent(`config-collection-draft-commit`,{bubbles:!0,composed:!0,cancelable:!0,detail:{...e.existingKeys?{key:n}:{},value:t.value}}))?this.closeDraft():this.fail(`value`,r(`configForm.invalidString`))}updated(){let e=this.querySelector(`[data-collection-draft-key]`),t=this.querySelector(`[data-collection-draft-value]`);e?.setCustomValidity(this.invalidTarget===`key`?this.error:``),t?.setCustomValidity(this.invalidTarget===`value`?this.error:``)}render(){let e=this.props;if(!e||!this.draftOpen||e.disabled)return _;let t=c(e.schema),n=U(e.schema,null),i=t===`string`||t===`number`||t===`integer`,a=`${this.id}-error`,o=`${r(`configForm.add`)}: ${e.label}`,s=i?T`
          <input
            data-collection-draft-value
            type=${t===`string`?`text`:`number`}
            class="settings-input"
            aria-label=${o}
            aria-describedby=${a}
            aria-invalid=${this.invalidTarget===`value`?`true`:`false`}
            .value=${this.draftValue}
            ?disabled=${this.draftIsNull}
            @input=${e=>{this.draftValue=e.currentTarget.value,this.clearError()}}
          />
        `:T`
          <textarea
            data-collection-draft-value
            class="settings-input"
            aria-label=${o}
            aria-describedby=${a}
            aria-invalid=${this.invalidTarget===`value`?`true`:`false`}
            placeholder=${r(`configForm.jsonValue`)}
            rows="2"
            .value=${this.draftValue}
            ?disabled=${this.draftIsNull}
            @input=${e=>{this.draftValue=e.currentTarget.value,this.clearError()}}
          ></textarea>
        `;return T`
      <div class="settings-row settings-row--stacked cfg-collection-draft">
        <div class="settings-row__control">
          <div class="cfg-collection-draft__controls">
            ${e.existingKeys?T`
                    <input
                      data-collection-draft-key
                      type="text"
                      class="settings-input"
                      aria-label=${r(`configForm.key`)}
                      aria-describedby=${a}
                      aria-invalid=${this.invalidTarget===`key`?`true`:`false`}
                      placeholder=${r(`configForm.key`)}
                      .value=${this.draftKey}
                      @input=${e=>{this.draftKey=e.currentTarget.value,this.clearError()}}
                    />
                  `:_}
            ${n?T`
                    <label class="field checkbox">
                      <input
                        data-collection-draft-null
                        type="checkbox"
                        .checked=${this.draftIsNull}
                        @change=${e=>{this.draftIsNull=e.currentTarget.checked,this.clearError()}}
                      />
                      <span>${r(`configForm.nullValue`)}</span>
                    </label>
                  `:_}
            ${s}
            <span id=${a} class="cfg-field__error" role="alert" ?hidden=${!this.error}
              >${this.error}</span
            >
            <div class="cfg-collection-draft__actions">
              <button type="button" class="btn btn--sm" @click=${()=>this.commit()}>
                ${e.existingKeys?r(`configForm.addEntry`):r(`configForm.add`)}
              </button>
              <button type="button" class="btn btn--sm" @click=${()=>this.closeDraft()}>
                ${r(`common.cancel`)}
              </button>
            </div>
          </div>
        </div>
      </div>
    `}},t([E({attribute:!1})],J.prototype,`props`,void 0),t([w()],J.prototype,`draftOpen`,void 0),t([w()],J.prototype,`draftKey`,void 0),t([w()],J.prototype,`draftValue`,void 0),t([w()],J.prototype,`draftIsNull`,void 0),t([w()],J.prototype,`error`,void 0),t([w()],J.prototype,`invalidTarget`,void 0),customElements.get(`openclaw-config-form-collection-draft`)||customElements.define(`openclaw-config-form-collection-draft`,J)})))()}function dt(e,t){let{schema:i,value:a,path:o,hints:s,rawAvailable:c,maskSensitive:l,unsupported:u,disabled:d,reservedKeys:f,validateKey:p,onPatch:m,searchCriteria:h,revealSensitive:g,isSensitivePathRevealed:v,onToggleSensitivePath:y}=e,b=Ee(i),x=b?{}:we(i),S=H(o,`map-draft`),C={schema:i,label:r(`configForm.customEntries`),disabled:d,identity:JSON.stringify(o.filter(e=>typeof e==`string`)),sourceIdentity:e.sourceIdentity??a,existingKeys:[...new Set([...Object.keys(a),...f])],validateKey:p},w=Object.entries(a??{}).filter(([e])=>!f.has(e)),E=h&&de(h)?w.filter(([e,t])=>ue({schema:i,value:t,path:[...o,e],hints:s,criteria:h})):w;return h&&de(h)&&E.length===0?_:T`
    <div class="cfg-block cfg-map">
      <div class="settings-row">
        <div class="settings-row__text">
          <span class="settings-row__title">${r(`configForm.customEntries`)}</span>
        </div>
        <div class="settings-row__control">
          <button
            type="button"
            class="btn btn--sm"
            aria-controls=${S}
            ?disabled=${d}
            @click=${e=>{if(x===Ae){lt(e,S);return}let t={...a},n=1,r=`custom-${n}`;for(;r in t;)n+=1,r=`custom-${n}`;t[r]=x,m(o,t)===!1&&lt(e,S)}}
          >
            ${r(`configForm.addEntry`)}
          </button>
        </div>
      </div>

      <openclaw-config-form-collection-draft
        id=${S}
        .props=${C}
        @config-collection-draft-commit=${e=>{let t=e.detail.key;(!t||Object.hasOwn(a,t)||f.has(t)||m(o,{...a,[t]:e.detail.value})===!1)&&e.preventDefault()}}
      ></openclaw-config-form-collection-draft>
      ${E.length===0?ne(r(`configForm.noCustomEntries`)):T`
              <div class="settings-subrows">
                ${E.map(([f,_])=>{let x=[...o,f],S=Re({path:x,value:_,hints:s,revealSensitive:g??!1,isSensitivePathRevealed:v});return T`
                    <div class="settings-row">
                      <div class="settings-row__text">
                        <input
                          type="text"
                          class="settings-input"
                          placeholder=${r(`configForm.key`)}
                          aria-label=${`${r(`configForm.key`)}: ${f}`}
                          .value=${f}
                          ?disabled=${d}
                          @change=${e=>{let t=e.currentTarget;if(!(t instanceof HTMLInputElement))return;let i=t.value.trim();if(!i||i===f){t.value=f;return}let s=p(i)?n(a[f])?r(`configForm.renameRedactedBlocked`):``:r(`configForm.invalidString`);if(i in a||s){t.value=f,s&&(t.setCustomValidity(s),t.reportValidity(),t.setCustomValidity(``));return}let c={...a,[i]:a[f]};delete c[f],m(o,c)===!1&&(t.value=f)}}
                        />
                      </div>
                      <div class="settings-row__control">
                        <openclaw-tooltip .content=${r(`configForm.removeEntry`)}>
                          <button
                            type="button"
                            class="btn btn--icon"
                            style="width:28px;height:28px;padding:0;"
                            aria-label=${r(`configForm.removeEntry`)}
                            ?disabled=${d}
                            @click=${()=>{let e={...a};delete e[f],m(o,e)}}
                          >
                            ${te.trash}
                          </button>
                        </openclaw-tooltip>
                      </div>
                    </div>
                    ${b?G({label:f,showLabel:!1,stacked:!0,control:Ve({schema:i,path:x,ariaLabel:`${f}: ${r(`configForm.jsonValue`)}`,sourceValue:_,fallback:ze(_),rows:2,sensitiveState:S,disabled:d,isRequired:!0,onToggleSensitivePath:y,onPatch:m})}):t({schema:i,value:_,path:x,hints:s,rawAvailable:c,maskSensitive:l,unsupported:u,disabled:d,compact:e.compact,commitOnBlur:e.commitOnBlur,isRequired:!0,sourceIdentity:_,controlIdentity:a,searchCriteria:h,showLabel:!1,revealSensitive:g,isSensitivePathRevealed:v,onToggleSensitivePath:y,onPatch:m})}
                  `})}
              </div>
            `}
    </div>
  `}function ft(){return(ft=e((()=>{v(),A(),o(),d(),ut(),B(),Me(),ce(),V(),R()})))()}function pt(e){let{schema:t,value:n,path:r,hints:i,unsupported:a,disabled:o,onPatch:s,onRemove:c,rawAvailable:u,maskSensitive:d,revealSensitive:p,isSensitivePathRevealed:m,onToggleSensitivePath:g,searchCriteria:_}=e,v=_&&de(_)&&fe({schema:t,path:r,hints:i,criteria:_})?void 0:_,y=n===void 0&&t.default!==void 0,b=y?t.default:n,x=b===void 0?vt:b,S=b&&typeof b==`object`&&!Array.isArray(b)?b:{},C=Pe(t).map(e=>[e,ye(t,e)]).filter(e=>!!e[1]),w=Ne(t),T=C.toSorted((e,t)=>{let n=l([...r,e[0]],i)?.order??0,a=l([...r,t[0]],i)?.order??0;return n===a?e[0].localeCompare(t[0]):n-a}),E=new Set(C.map(([e])=>e)),D=Ce(t),O=!!D&&typeof D==`object`,ee=(e,n)=>{if(e.length<r.length||!r.every((t,n)=>t===e[n]))return!1;let i,a=e.slice(r.length);if(a.length===0){if(!n||typeof n!=`object`||Array.isArray(n))return!1;i=n}else{try{i=structuredClone(S)}catch{return!1}n===void 0?f(i,a):h(i,a,n)}return De(t,S,i)?y?s(r,i)!==!1:(n===void 0&&c?c(e):s(e,n))!==!1:!1};return{fields:T.map(([t,n])=>({schema:y&&Object.hasOwn(S,t)?Fe(n,S[t]):n,value:y?void 0:S[t],path:[...r,t],hints:i,rawAvailable:u,maskSensitive:d,unsupported:a,disabled:o,compact:e.compact,commitOnBlur:e.commitOnBlur,isRequired:w.has(t),sourceIdentity:y?void 0:S[t],controlIdentity:e.controlIdentity??S,searchCriteria:v,revealSensitive:p,isSensitivePathRevealed:m,onToggleSensitivePath:g,onPatch:ee})),additional:O?{...e,schema:D,value:S,sourceIdentity:x,reservedKeys:E,validateKey:e=>Ue(t,e),searchCriteria:v,onPatch:ee}:null}}function mt(e,t){let{schema:n,path:r,hints:i}=e,{label:a,help:o}=z(r,n,i),s=pt(e),c=T`
    ${s.fields.map(e=>t(e))}
    ${s.additional?dt(s.additional,t):_}
  `;return r.length===1||e.showLabel===!1?c:T`
    <details class="cfg-object cfg-block" ?open=${r.length<=2}>
      <summary class="settings-row cfg-object__summary">
        <div class="settings-row__text">
          <span class="settings-row__title">${a}</span>
          ${o?T`<span class="settings-row__desc">${o}</span>`:_}
        </div>
        <div class="settings-row__control">
          <span class="settings-row__chevron cfg-object__chevron">${te.chevronRight}</span>
        </div>
      </summary>
      <div class="settings-subrows">${c}</div>
    </details>
  `}function ht(e,t){return T`${bt(e,t)}`}function gt(e,t,n){let{schema:i,value:a,path:o,hints:s,unsupported:c,disabled:l,onPatch:u,searchCriteria:d,rawAvailable:f,maskSensitive:p,revealSensitive:m,isSensitivePathRevealed:h,onToggleSensitivePath:g}=e,v=e.showLabel??!0,y=e.showHeaderMeta??v,{label:b,help:x}=z(o,i,s),S=d&&de(d)&&fe({schema:i,path:o,hints:s,criteria:d})?void 0:d,w=Array.isArray(i.items)?i.items:void 0,E=Array.isArray(i.items)?i.items[0]??{}:i.items;if(!E)return G({label:b,showLabel:!0,control:_,error:r(`configForm.unsupportedArray`)});let D=a===void 0&&Array.isArray(i.default),O=Array.isArray(a)?a:Array.isArray(i.default)?i.default:[],ee=Array.isArray(a)?a:Array.isArray(i.default)?i.default:_t,k=Oe(e,O),A=n.read(O),j=(e,t)=>n.patch(e,t,e=>u(o,e)),{minItems:M,maxItems:N,uniqueItems:P}=He(i),F=e=>ve(i,e)??(w?{}:E),{atomicCandidate:I,autoCandidate:L}=at({schema:i,value:O,minimumItems:M,maximumItems:N,uniqueItems:P,isUnset:a===void 0,isRequired:e.isRequired??!1,itemSchemaAt:F}),R=N===void 0||O.length<N,re=I===void 0&&L===void 0,ie=F(O.length),ae=H(o,`array-draft`),oe={schema:ie,label:b,disabled:l||!R,identity:JSON.stringify(o.filter(e=>typeof e==`string`)),sourceIdentity:ee,existingValues:P?O:void 0,validateValue:e=>{let t=[...O,e];return(N===void 0||t.length<=N)&&(t.length<M||U(i,t))}},se=(e,t)=>{if(e.length<=o.length||!o.every((t,n)=>t===e[n]))return!1;let n=e.slice(o.length),r=n[0];if(typeof r!=`number`||r<0||r>=O.length)return!1;let a=[...O],s=n.slice(1);if(s.length===0){if(t===void 0)return!1;a[r]=t}else{let e=Xe(O[r],s,t);if(!e.ok)return!1;a[r]=e.value}return We(i,O,a,P,!0)?j(a,A):!1};return T`
    <div class="cfg-block cfg-array">
      <div class="settings-row">
        <div class="settings-row__text">
          ${v?T`<span class="settings-row__title">${b}</span>`:_}
          ${y&&x?T`<span class="settings-row__desc">${x}</span>`:_}
          ${y&&i.default!==void 0?T`<span class="settings-row__desc">${k}</span>`:_}
        </div>
        <div class="settings-row__control">
          ${e.compact?_:T`
                  <span class="settings-row__value"
                    >${r(O.length===1?`configForm.itemCountOne`:`configForm.itemCount`,{count:String(O.length)})}</span
                  >
                `}
          <button
            type="button"
            class="btn btn--sm"
            aria-controls=${ae}
            ?disabled=${l||!R&&I===void 0}
            @click=${e=>{if(I)u(o,I)===!1&&lt(e,ae);else if(re)lt(e,ae);else if(L){let t=Array.from({length:L.length-O.length},()=>Symbol(`array-row`));j(L,[...A,...t])||lt(e,ae)}}}
          >
            ${r(`configForm.add`)}
          </button>
        </div>
      </div>
      <openclaw-config-form-collection-draft
        id=${ae}
        .props=${oe}
        @config-collection-draft-commit=${e=>{let t=[...O,e.detail.value],n=!(P&&O.some(t=>q(t,e.detail.value)))&&(N===void 0||O.length<N)&&U(ie,e.detail.value)&&(t.length<M||U(i,t)),r=!1;n&&(r=j(t,[...A,Symbol(`array-row`)])),r||e.preventDefault()}}
      ></openclaw-config-form-collection-draft>
      ${O.length===0?e.compact?_:ne(r(`configForm.noItems`)):T`
              <div class="settings-subrows">
                ${C(O,(e,t)=>A[t],(n,a)=>{let u=F(a),d=O.toSpliced(a,1),_=We(i,O,d,P,!1),v=T` <openclaw-tooltip
                      .content=${r(`configForm.removeItem`)}
                    >
                      <button
                        type="button"
                        class="btn btn--icon"
                        style="width:28px;height:28px;padding:0;"
                        aria-label=${r(`configForm.removeItem`)}
                        ?disabled=${l||O.length<=M||!_}
                        @click=${e=>{let t=e.currentTarget===document.activeElement,n=document.activeElement?.closest(`.cfg-array`)?.querySelector(`button[aria-controls]`);_&&j(d,A.toSpliced(a,1))&&t&&queueMicrotask(()=>{document.activeElement===document.body&&n?.focus()})}}
                      >
                        ${te.trash}
                      </button>
                    </openclaw-tooltip>`,y=t({schema:D?Fe(u,n):u,value:D?void 0:n,path:[...o,a],hints:s,rawAvailable:f,maskSensitive:p,unsupported:c,disabled:l,compact:e.compact,commitOnBlur:e.commitOnBlur,isRequired:!0,sourceIdentity:D?void 0:n,controlIdentity:O,searchCriteria:S,showLabel:!1,revealSensitive:m,isSensitivePathRevealed:h,onToggleSensitivePath:g,onPatch:se});return e.compact?T`<div class="cfg-array__item">
                        <div class="cfg-array__value">${y}</div>
                        ${v}
                      </div>`:T`
                      <div class="settings-row">
                        <div class="settings-row__text">
                          <span class="settings-row__title">#${a+1}</span>
                        </div>
                        <div class="settings-row__control">${v}</div>
                      </div>
                      ${y}
                    `})}
              </div>
            `}
    </div>
  `}var _t,vt,yt,bt;function xt(){return(xt=e((()=>{v(),x(),D(),A(),o(),d(),ot(),ct(),ut(),Qe(),he(),B(),ft(),Me(),ce(),V(),R(),_t=Symbol(`unset-array-source`),vt=Symbol(`unset-map-source`),yt=class extends y{constructor(...e){super(...e),this.rows=new st,this.field=``}render(e,t){let n=JSON.stringify(e.path.filter(e=>typeof e==`string`));return n!==this.field&&(this.rows=new st,this.field=n),gt(e,t,this.rows)}},bt=b(yt)})))()}function St(e){let{schema:t,value:n,path:r,hints:i,disabled:a,onPatch:o}=e,s=e.showLabel??!0,{label:c,help:l}=z(r,t,i),u=e.descriptionId??(s&&l?H(r,`description`):void 0),d=ze(n===void 0?t.default:n),f=Re({path:r,value:n,hints:i,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed}),p=Ve({schema:t,path:r,ariaLabel:c,descriptionId:u,sourceValue:e.sourceIdentity??n,fallback:d,rows:3,sensitiveState:f,disabled:a,isRequired:e.isRequired,onToggleSensitivePath:e.onToggleSensitivePath,onPatch:o});return G({label:c,help:l,helpId:u,defaultDescription:f.isRedacted?_:W(t,n),showLabel:s,stacked:!0,control:p})}function Ct(){return(Ct=e((()=>{v(),Me(),ce(),V()})))()}function wt(e,t){let n=e.trim();if(n.startsWith(`+`))try{let e=Ke(n,{extract:!1});if(!e?.isPossible())return;let r=e.formatInternational();return!e.country||Tt.has(e.countryCallingCode)?r:`${new Intl.DisplayNames(t?[t]:void 0,{type:`region`}).of(e.country)||e.country} · ${r}`}catch{return}}var Tt;function Et(){return(Et=e((()=>{Je(),qe(),Tt=new Set(Object.entries(Ge.country_calling_codes).filter(([,e])=>e.length>1).map(([e])=>e))})))()}function Dt(e){if(typeof e==`string`)return`string`;if(typeof e==`number`)return`number`;if(typeof e==`boolean`)return`boolean`}function Ot(e,t,n){if(!(e instanceof HTMLInputElement))return;let r=X.get(e),i=r?.edit!==void 0&&e.ownerDocument.activeElement===e&&r.pathKey===t&&r.presentationIdentity===n;X.set(e,{edit:i?r.edit:void 0,pathKey:t,presentationIdentity:n})}function kt(e,t){let n=X.get(e);return n?(n.edit??={branch:t},n.edit):{branch:t}}function At(e,t){return X.get(e)?.edit??{branch:t}}function jt(e){let t=X.get(e);t&&(t.edit=void 0)}function Mt(e){e.currentTarget instanceof HTMLInputElement&&jt(e.currentTarget)}function Y(e,t){return e.setCustomValidity(t),e.setAttribute(`aria-invalid`,String(!!t)),!t}function Nt(e,t,n,r,i,a,o){if(!(e instanceof HTMLInputElement))return;let s=Pt.get(e);s&&(!Object.is(s.sourceIdentity,n)||s.pathKey!==r||s.presentationIdentity!==i||s.renderedValue!==a?e.matches(`:focus`)&&e.value!==s.renderedValue?o(e):(e.value=a,Y(e,``)):Object.is(s.controlIdentity,t)||o(e)),Pt.set(e,{controlIdentity:t,sourceIdentity:n,pathKey:r,presentationIdentity:i,renderedValue:a})}var X,Pt;function Ft(){return(Ft=e((()=>{X=new WeakMap,Pt=new WeakMap})))()}function It(e,t,n,r){let i=e.trim(),a=t.anyOf??t.oneOf??[],o=U(t,e),s=r?r.branch:Dt(n),l=i===`true`||i!==`false`&&void 0;if(l!==void 0&&U(t,l)){let e=!1,t=!1;for(let n of a)(c(n)===`boolean`||typeof n.const==`boolean`||n.enum?.some(e=>typeof e==`boolean`))&&U(n,l)&&(e=!0,t||=Object.is(n.const,l)||!!n.enum?.some(e=>Object.is(e,l)));if(e&&(s!==`string`||t||!o))return l}let u;for(let n of a){let r=c(n);if(r!==`number`&&r!==`integer`)continue;let i=M(e,r===`integer`);if(typeof i==`number`&&U(t,i)){u=i;break}}if(s===`number`){if(u!==void 0)return u;if(N(e))return o&&j(i)?e:void 0}return s===`string`&&o||u===void 0?e:u}function Lt(e,t,n,i){return U(t,It(e,t,n,i))?``:r(`configForm.invalidString`)}function Rt(e,t,n,r,i){return e===``&&!n&&!!Lt(e,t,r,i)}function zt(e,t){return U(t,e)?``:r(`configForm.invalidNumber`)}function Z(e,t){let n=e.value;if(n.trim()===``)return e.validity.badInput?{kind:`invalid`}:{kind:`empty`};let r=M(n,c(t)===`integer`);return typeof r==`number`?{kind:`value`,parsed:r,message:zt(r,t)}:{kind:`invalid`}}function Bt(e,t){return e.kind===`value`?e.message:e.kind===`invalid`||t?r(`configForm.invalidNumber`):``}function Vt(e,t,n,r){Y(e,Bt(t,n.isRequired===!0))&&(t.kind===`empty`?r(void 0):t.kind===`value`&&r(t.parsed))}function Ht(e,t,n){return Bt(Z(e,t),n)}function Ut(e){let{schema:t,value:n,path:a,hints:o,disabled:s,onPatch:c,inputType:u}=e,d=e.showLabel??!0,f=l(a,o),{label:p,help:m}=z(a,t,o),h=e.descriptionId??(d&&m?H(a,`description`):void 0),g=Re(e),v=typeof n==`object`&&!!n&&!Array.isArray(n),y=Ie(n),b=e.rawAvailable??!0,x=g.isMasked,S=g.isRedacted&&!x||g.sentinelRedacted||y,C=S?y?r(b?`configForm.structuredSecretRaw`:`configForm.structuredSecretFile`):Se():f?.placeholder??(!x&&t.default!==void 0?r(`configForm.defaultValue`,{value:K(t.default)}):``),w=S?``:v?ze(n):n??(e.compact?t.default:void 0)??``,E=n===void 0?t.default:n,D=Dt(E),O=x?`password`:g.isSensitive&&!S?`text`:u,k=f?.presentation===`phone-number`,A=k&&!S&&!x&&typeof n==`string`?wt(n,i.getLocale()):void 0,te=e.controlIdentity??e.sourceIdentity??n,j=e.sourceIdentity??n,M=H(a.filter(e=>typeof e==`string`),`scalar-identity`),N=K(w),P=[S?`redacted`:`visible`,O,k?`phone`:`plain`,y?b?`secret-raw`:`secret-file`:`scalar`].join(`:`),F=n=>{if(S){Y(n,``);return}if(u===`number`){Y(n,Ht(n,t,e.isRequired===!0));return}let r=n.value,i=At(n,D);Y(n,Rt(r,t,e.isRequired===!0,E,i)?``:Lt(r,t,E,i))},I=(e,t)=>c(a,t)!==!1||(e.value=N,F(e),!1),L=n=>{if(S)return;if(u===`number`){Vt(n,Z(n,t),e,e=>I(n,e));return}let r=kt(n,D),i=n.value,a=Lt(i,t,E,r);if(!a&&!k){Y(n,``),I(n,It(i,t,E,r)),jt(n);return}let o=i.trim();if(Rt(o,t,e.isRequired===!0,E,r)){n.value=o,Y(n,``),I(n,void 0),jt(n);return}if(Lt(o,t,E,r)){Y(n,a),jt(n);return}n.value=o,Y(n,``),I(n,It(o,t,E,r)),jt(n)},R=T`
    <input
      ${ee(e=>{Ot(e,M,P),Nt(e,te,j,M,P,N,F)})}
      type=${O}
      class="settings-input${S?` cfg-redacted`:``}"
      aria-label=${p}
      aria-describedby=${h??_}
      aria-invalid="false"
      placeholder=${C}
      .value=${N}
      ?disabled=${s}
      ?readonly=${S}
      @click=${()=>{g.isRedacted&&!y&&e.onToggleSensitivePath&&e.onToggleSensitivePath(a)}}
      @input=${n=>{if(S)return;let r=n.target;if(e.commitOnBlur){kt(r,D),F(r);return}let i=r.value;if(u===`number`){Vt(r,Z(r,t),e,e=>I(r,e));return}let a=kt(r,D);Rt(i,t,e.isRequired===!0,E,a)?(Y(r,``),I(r,void 0)):Y(r,Lt(i,t,E,a))&&I(r,It(i,t,E,a))}}
      @change=${t=>{!e.commitOnBlur&&u!==`number`&&L(t.target)}}
      @blur=${t=>{let n=t.target;e.commitOnBlur&&n.value!==N&&L(n),Mt(t)}}
    />
  `,ne=y?_:Le({path:a,state:g,disabled:s,onToggleSensitivePath:e.onToggleSensitivePath}),re=je(R,ne),ie=k?T`
        <span class="settings-phone-presentation">
          ${re}
          ${A?T`<span class="settings-phone-presentation__value">${A}</span>`:_}
        </span>
      `:re;return G({label:p,help:m,helpId:h,defaultDescription:S||x?_:W(t,n),showLabel:d,control:ie})}function Wt(e){let{schema:t,value:n,path:i,hints:a,disabled:o,onPatch:s}=e,c=e.showLabel??!0,{label:l,help:u}=z(i,t,a),d=e.descriptionId??(c&&u?H(i,`description`):void 0),f=n??(e.compact?t.default:void 0)??``,p=n===void 0?t.default:n,m=be(t),h=typeof m.step==`number`?m.step:1,g=e.controlIdentity??e.sourceIdentity??n,v=e.sourceIdentity??n,y=H(i.filter(e=>typeof e==`string`),`scalar-identity`),b=K(f),x=n=>{Y(n,Ht(n,t,e.isRequired===!0))},S=(e,t)=>s(i,t)!==!1||(e.value=b,x(e),!1),C=e=>{if(o)return;let n=Number(p),r=xe((Number.isFinite(n)?n:0)+e*h,t);U(t,r)&&s(i,r)},w=T`
    ${e.compact?_:T` <button
            type="button"
            class="btn btn--sm btn--icon"
            aria-label=${`${l}: -${h}`}
            ?disabled=${o}
            @click=${()=>C(-1)}
          >
            −
          </button>`}
    <input
      ${ee(e=>Nt(e,g,v,y,`number`,b,x))}
      type="number"
      class="settings-input"
      aria-label=${l}
      aria-describedby=${d??_}
      aria-invalid="false"
      placeholder=${t.default===void 0?_:r(`configForm.defaultValue`,{value:K(t.default)})}
      min=${m.min??_}
      max=${m.max??_}
      step=${m.step}
      .value=${b}
      ?disabled=${o}
      @keydown=${t=>{!e.compact&&n===void 0&&p!==void 0&&(t.key===`ArrowUp`||t.key===`ArrowDown`)&&(t.preventDefault(),C(t.key===`ArrowUp`?1:-1))}}
      @input=${n=>{let r=n.target;if(e.commitOnBlur){x(r);return}Vt(r,Z(r,t),e,e=>S(r,e))}}
      @change=${n=>{if(e.commitOnBlur)return;let r=n.target,i=Z(r,t);if(i.kind!==`value`){Y(r,Bt(i,e.isRequired===!0));return}let a=xe(i.parsed,t);r.value=K(a),Y(r,zt(a,t))&&S(r,a)}}
      @blur=${n=>{let r=n.target;if(!e.commitOnBlur||r.value===b)return;let i=Z(r,t);i.kind===`value`&&(i.parsed=xe(i.parsed,t),i.message=zt(i.parsed,t),r.value=K(i.parsed)),Vt(r,i,e,e=>S(r,e))}}
    />
    ${e.compact?_:T` <button
            type="button"
            class="btn btn--sm btn--icon"
            aria-label=${`${l}: +${h}`}
            ?disabled=${o}
            @click=${()=>C(1)}
          >
            +
          </button>`}
  `;return G({label:l,help:u,helpId:d,defaultDescription:W(t,n),showLabel:c,control:w})}function Gt(e){let{schema:t,value:n,path:i,hints:a,disabled:o,options:s,onPatch:c}=e,u=e.showLabel??!0,{label:d,help:f}=z(i,t,a),p=e.descriptionId??(u&&f?H(i,`description`):void 0),m=n===void 0&&t.default!==void 0,h=m?t.default:n,g=s.findIndex(e=>q(e,h)),v=`__unset__`,y=`__null__`,b=t.nullable&&t.enumIncludesNull,x=m?v:h===null&&b?y:g>=0?String(g):v,S=T`
    <select
      class="settings-select"
      aria-label=${d}
      aria-describedby=${p??_}
      ?disabled=${o}
      .value=${x}
      @change=${n=>{let r=n.target,a=r.value;if(a===v&&e.isRequired&&t.default===void 0){r.value=x;return}if(a===v){(e.isRequired&&t.default!==void 0?c(i,structuredClone(t.default)):e.onRemove?e.onRemove(i):c(i,void 0))===!1&&(r.value=x);return}let o=a===y?null:s[Number(a)];c(i,o)===!1&&(r.value=x)}}
    >
      <option
        value=${v}
        ?selected=${x===v}
        ?disabled=${e.isRequired&&t.default===void 0}
      >
        ${t.default===void 0?l(i,a)?.placeholder??r(`configForm.select`):r(`configForm.defaultValue`,{value:K(t.default)})}
      </option>
      ${b?T`
              <option value=${y} ?selected=${x===y}>
                ${r(`configForm.nullValue`)}
              </option>
            `:_}
      ${s.map((e,t)=>T`
          <option value=${String(t)} ?selected=${x===String(t)}>
            ${Be(e,s)}
          </option>
        `)}
    </select>
  `;return G({label:d,help:f,helpId:p,defaultDescription:W(t,n),showLabel:u,control:S})}function Kt(){return(Kt=e((()=>{Et(),v(),O(),o(),B(),Me(),k(),Ft(),ce(),V()})))()}function Q(e){let{schema:t,value:n,path:i,hints:a,unsupported:o,disabled:u,onPatch:d}=e,f=e.showLabel??!0,p=c(t),{label:m,help:h}=z(i,t,a),g=s(i),v=e.searchCriteria;if(o.has(g)||[...o].some(e=>{if(!e.includes(`*`))return!1;let t=e.split(`.`);return t.length===i.length&&t.every((e,t)=>e===`*`||e===String(i[t]))}))return G({label:m,showLabel:!0,control:_,error:r(`configForm.unsupportedNode`)});if(v&&de(v)&&!ue({schema:t,value:n,path:i,hints:a,criteria:v}))return _;let y=et(e);if(tt(e,y)){let t={identity:JSON.stringify(i.filter(e=>typeof e==`string`)),sourceIdentity:e.sourceIdentity??n,initialValue:y,params:e,renderNode:Q};return T`
      <openclaw-config-form-structured-draft
        class="cfg-structured-draft"
        .props=${t}
      ></openclaw-config-form-structured-draft>
    `}if(t.anyOf||t.oneOf){let r=(t.anyOf??t.oneOf??[]).filter(e=>!(e.type===`null`||Array.isArray(e.type)&&e.type.includes(`null`)));if(r.length===1){let t=r[0];return t?Q({...e,schema:t}):_}let a=r.map(e=>{if(e.const!==void 0)return e.const;if(e.enum&&e.enum.length===1)return e.enum[0]}),o=a.every(e=>e!==void 0);if(o&&a.length>0&&a.length<=5){let r=n===void 0?t.default:n;return G({label:m,help:h,defaultDescription:W(t,n),showLabel:f,control:ke({options:a,resolvedValue:r,disabled:u,ariaLabel:m,descriptionId:e.descriptionId,onSelect:e=>d(i,e)})})}if(o&&a.length>5)return Gt({...e,options:a});let s=new Set(r.map(e=>c(e)).filter(Boolean)),l=new Set([...s].map(e=>e===`integer`?`number`:e));if(e.maskSensitive===!0&&Array.isArray(t.type)&&l.size===2&&l.has(`string`)&&l.has(`object`)&&(n===void 0||typeof n==`string`||Ie(n)))return Ut({...e,inputType:`text`});if([...l].every(e=>[`string`,`number`,`boolean`].includes(e))){let n=l.has(`string`),r=l.has(`number`);if(l.has(`boolean`)&&l.size===1)return Q({...e,schema:{...t,type:`boolean`,anyOf:void 0,oneOf:void 0}});if(n||r)return Ut({...e,inputType:r&&!n?`number`:`text`})}return St(e)}if(t.enum){let r=t.enum;if(r.length<=5&&!(t.nullable&&t.enumIncludesNull)){let a=n===void 0?t.default:n;return G({label:m,help:h,defaultDescription:W(t,n),showLabel:f,control:ke({options:r,resolvedValue:a,disabled:u,ariaLabel:m,descriptionId:e.descriptionId,onSelect:e=>d(i,e)})})}return Gt({...e,options:r})}if(p===`object`)return mt(e,Q);if(p===`array`)return ht(e,Q);if(p===`boolean`){if(!e.isRequired&&l(i,a)?.placeholder)return Gt({...e,options:[!0,!1]});let r=typeof n==`boolean`?n:typeof t.default==`boolean`&&t.default,o=e=>d(i,e);if(e.compact)return G({label:m,help:h,showLabel:f,control:T`<input
          type="checkbox"
          aria-label=${m}
          aria-describedby=${e.descriptionId??_}
          .checked=${r}
          ?disabled=${u}
          @change=${e=>{let t=e.currentTarget;o(t.checked)===!1&&(t.checked=r)}}
        />`});if(!f)return G({label:m,help:h,showLabel:f,control:re({checked:r,disabled:u,ariaLabel:m,onChange:o})});let s=h||t.default!==void 0?T`
            ${h??_} ${h&&t.default!==void 0?T`<br />`:_}
            ${W(t,n)}
          `:void 0;return P({title:m,description:s,checked:r,disabled:u,onChange:o})}return p===`number`||p===`integer`?Wt(e):p===`string`?Ut({...e,inputType:`text`}):Ee(t)?St(e):G({label:m,showLabel:!0,control:_,error:r(`configForm.unsupportedType`,{type:String(p)})})}function qt(){return(qt=e((()=>{v(),o(),rt(),xt(),Ct(),Kt(),Me(),ce(),V(),R()})))()}function Jt(e){let t=le({schema:e.schema,path:e.path.map(String),hints:e.hints});return T`
    <div class="config-tier-groups">
      ${t.common||e.commonPrelude?T`<div class="settings-group">
              ${e.commonPrelude??_}${t.common?e.renderTier(t.common):_}
            </div>`:_}
      ${t.advanced&&t.advancedLeafCount>0?T`<details
              class="config-advanced-disclosure"
              ?open=${e.revealAdvanced}
              @toggle=${t=>{let n=t.currentTarget;n instanceof HTMLDetailsElement&&n.open!==e.revealAdvanced&&(n.open?e.onShowAdvanced():e.onHideAdvanced?e.onHideAdvanced():n.open=!0)}}
            >
              <summary class="settings-section__heading config-advanced-disclosure__summary">
                ${r(`configForm.advancedSettings`)}
              </summary>
              ${e.revealAdvanced?T`<div class="settings-group">${e.renderTier(t.advanced)}</div>`:_}
            </details>`:_}
    </div>
  `}function Yt(e){let t=me[e.key];return ae({key:e.key,schema:e.schema,value:e.sectionValue,hints:e.uiHints,query:e.query,label:t?.label,description:t?.description})}function Xt(e){if(!e.schema)return T` <div class="muted">${r(`configForm.schemaUnavailable`)}</div> `;let t=e.schema,n=e.value??{};if(c(t)!==`object`||!t.properties)return T` <div class="callout danger">${r(`configForm.unsupportedSchema`)}</div> `;let i=new Set(e.unsupportedPaths??[]),a=t.properties,o=e.searchQuery??``,s=oe(o),d=e.activeSection,f=e.activeSubsection??null,p=Object.entries(a).toSorted((t,n)=>{let r=l([t[0]],e.uiHints)?.order??50,i=l([n[0]],e.uiHints)?.order??50;return r===i?t[0].localeCompare(n[0]):r-i}).filter(([t,r])=>!(d&&t!==d||o&&!Yt({key:t,schema:r,sectionValue:n[t],uiHints:e.uiHints,query:o}))),h=null;if(d&&f&&p.length===1){let e=p[0]?.[1];e&&c(e)===`object`&&e.properties&&e.properties[f]&&(h={sectionKey:d,subsectionKey:f,schema:e.properties[f]})}if(p.length===0)return e.embedded&&!o?_:I(ne(o?r(`configForm.noSettingsMatch`,{query:o}):r(`configForm.noSettingsInSection`)));let g=t=>{let n=l(t.path.slice(0,1),e.uiHints),a=e.showSectionDocs===!1?void 0:n?.docsUrl,c=`settings-section-help-${t.id}`,u=e.showAdvanced===!0||e.forceAdvancedSection===t.path[0]||!!o;return T`
      <section class="settings-section" id=${t.id}>
        <div class="settings-section__header">
          <h2 class="settings-section__heading">${t.label}</h2>
          ${e.sectionActions||a?T`<div class="settings-section__actions">
                  ${e.sectionActions??_}
                  ${a?T`
                          <span class="settings-section__docs">
                            ${F({id:c,label:r(`configForm.sectionHelp`,{section:t.label}),tooltip:r(`configForm.sectionHelp`,{section:t.label}),icon:`question`,popoverId:`settings-section-help-popover-${t.id}`})}
                            <wa-popover
                              id=${`settings-section-help-popover-${t.id}`}
                              class="settings-section__help-popover"
                              for=${c}
                              placement="bottom-end"
                            >
                              <div class="settings-section__help-panel">
                                ${t.description?T`<p>${t.description}</p>`:_}
                                ${L(a)}
                              </div>
                            </wa-popover>
                          </span>
                        `:_}
                </div>`:_}
        </div>
        ${t.description?T`<p class="settings-section__desc">${t.description}</p>`:_}
        ${Jt({schema:t.node,path:t.path,hints:e.uiHints,revealAdvanced:u,onShowAdvanced:e.onShowAdvanced,onHideAdvanced:e.showAdvanced===!0&&e.forceAdvancedSection!==t.path[0]&&!o?e.onHideAdvanced:void 0,renderTier:n=>Q({schema:n,value:t.nodeValue,path:t.path,hints:e.uiHints,rawAvailable:e.rawAvailable??!0,unsupported:i,disabled:e.disabled??!1,showLabel:!1,showHeaderMeta:!0,searchCriteria:s,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed,onToggleSensitivePath:e.onToggleSensitivePath,onPatch:e.onPatch,onRemove:e.onRemove}),commonPrelude:e.sectionPrelude})}
      </section>
    `};return I(h?(()=>{let{sectionKey:t,subsectionKey:r,schema:i}=h,a=u([t,r],e.uiHints),o=a?.label??i.title??m(r),s=a?.help??i.description??``,c=n[t],l=c&&typeof c==`object`?c[r]:void 0;return g({id:`config-section-${t}-${r}`,label:o,description:s,node:i,nodeValue:l,path:[t,r]})})():p.map(([e,t])=>{let r=me[e]??{label:e.charAt(0).toUpperCase()+e.slice(1),description:t.description??``};return g({id:`config-section-${e}`,label:r.label,description:r.description,node:t,nodeValue:n[e],path:[e]})}))}function Zt(){return(Zt=e((()=>{v(),o(),ie(),se(),qt(),ce(),V(),pe(),R()})))()}function Qt(e){return Object.keys(e??{}).filter(e=>!_n.has(e)).length===0}function $t(e){let t=e.filter(e=>e!=null),n=t.length!==e.length;return{enumValues:en(t),nullable:n}}function en(e){let t=[];for(let n of e)t.some(e=>Object.is(e,n))||t.push(n);return t}function tn(e,t=new Set){if(t.has(e))return new Set;t.add(e);let n=new Set,r=Array.isArray(e.type)?e.type:e.type?[e.type]:[];for(let e of r)e!==`null`&&n.add(e);n.size===0&&(e.properties||e.additionalProperties)&&n.add(`object`);for(let r of e.allOf??[])for(let e of tn(r,t))n.add(e);return t.delete(e),n}function nn(e){if(e.size===1)return e.values().next().value;if(e.size>1&&[...e].every(e=>e===`number`||e===`integer`))return e.has(`integer`)?`integer`:`number`}function rn(e){return e.size>1&&nn(e)===void 0}function an(e){return nn(tn(e))}function on(e){return!!(an(e)||e.items||e.enum||e.anyOf||e.oneOf||e.allOf)}function sn(e){return ln(e,vn)}function cn(e){if(!ln(e,yn))return!1;if(e.not===void 0)return!0;if(an(e)!==`object`||!e.not||typeof e.not!=`object`||Array.isArray(e.not))return!1;let t=e.not.required;return Array.isArray(t)&&t.length>0&&t.every(e=>typeof e==`string`)&&Object.keys(e.not).every(e=>e===`required`||_n.has(e))}function ln(e,t){return Object.keys(e).every(n=>t.has(n)||n===`propertyNames`&&typeof e.propertyNames==`object`&&e.propertyNames!==null&&!Array.isArray(e.propertyNames)&&p(e.propertyNames)&&$({type:`string`,...e.propertyNames},[]).unsupportedPaths.length===0)}function un(e,t=new Set){if(t.has(e))return!1;t.add(e);let n=Array.isArray(e.type)?e.type:e.type?[e.type]:[],r=e.nullable===!0||n.length===0||n.includes(`null`);return e.const!==void 0&&(r&&=e.const===null),e.enum&&(r&&=e.enum.some(e=>e===null)),e.allOf&&(r&&=e.allOf.every(e=>un(e,t))),e.anyOf&&(r&&=e.anyOf.some(e=>un(e,t))),e.oneOf&&(r&&=e.oneOf.filter(e=>un(e,t)).length===1),t.delete(e),r}function dn(e){let t=_e(e);if(t.length<=1)return!1;let n=new Set(t.flatMap(e=>Object.keys(e.properties??{})));return t.some(e=>{let t=e.additionalProperties;return!!t&&typeof t==`object`&&Object.keys(t).length>0&&[...n].some(t=>!Object.hasOwn(e.properties??{},t))})}function fn(e){return!e||typeof e!=`object`?{schema:null,unsupportedPaths:[`<root>`]}:$(e,[])}function $(e,t,n=!1,r,i){let a=e;if(!n&&!e.anyOf&&!e.oneOf&&!e.allOf&&Array.isArray(e.type)&&new Set(e.type.filter(e=>e!==`null`)).size>1&&(e.type.every(e=>e===`null`||bn.has(e))||e.type.every(e=>[`string`,`object`,`null`].includes(e)))){let t=e.type.includes(`object`)?[`string`,...e.type.filter(e=>e!==`string`)]:e.type;a={...e,type:t.includes(`object`)?t:void 0,anyOf:t.map(e=>({type:e}))}}let o=new Set,c={...a},l=s(t)||`<root>`;if(cn(a)||o.add(l),a.anyOf||a.oneOf){let e=gn(a,t);return e?{schema:e.schema,unsupportedPaths:Array.from(new Set([...o,...e.unsupportedPaths]))}:{schema:a,unsupportedPaths:[l]}}let u=Array.isArray(a.type)?a.type.filter(e=>e!==`null`):[],d=tn(a),f=n&&!!r&&a.type===void 0&&d.size===0;f&&r&&d.add(r),n&&r&&d.size>0&&rn(new Set([...d,r]))&&o.add(l),(new Set(u).size>1||rn(d))&&o.add(l);let p=nn(d),m=un(a)&&(i===void 0||i);if(a.allOf){let e=[];for(let n of a.allOf){if(!n||typeof n!=`object`){o.add(l);continue}if(!on(n)){e.push(n),sn(n)||o.add(l);continue}let r=$(n,t,!0,p,m);e.push(r.schema??n);for(let e of r.unsupportedPaths)o.add(e)}c.allOf=e}c.type=p??a.type,c.nullable=m;let h=a.properties!==void 0||a.additionalProperties!==void 0,g=a.items!==void 0||a.additionalItems!==void 0;if(c.enum){let{enumValues:e,nullable:t}=$t(c.enum);c.enum=e,c.enumIncludesNull=t&&m,e.length===0&&o.add(l)}if(a.allOf&&m&&!c.enumIncludesNull&&o.add(l),p===`object`&&(!f||h)){let e=a.properties??{},r=new Set(Pe(a)),i=Ce(a);[...Ne(a)].some(e=>!r.has(e))&&!i&&o.add(l),dn(a)&&o.add(l);let u={};for(let[r,i]of Object.entries(e)){if(n&&!on(i)){u[r]=i,sn(i)||o.add(s([...t,r])||`<root>`);continue}let e=$(i,[...t,r],n);e.schema&&(u[r]=e.schema);for(let t of e.unsupportedPaths)o.add(t)}if(c.properties=u,a.allOf)for(let e of Pe(a)){let n=ye(a,e);if(!n)continue;let r=$(n,[...t,e]);for(let e of r.unsupportedPaths)o.add(e)}if(a.additionalProperties===!0)c.additionalProperties={};else if(a.additionalProperties===!1)c.additionalProperties=!1;else if(a.additionalProperties&&typeof a.additionalProperties==`object`&&!Qt(a.additionalProperties)){let e=$(a.additionalProperties,[...t,`*`],n);c.additionalProperties=e.schema??a.additionalProperties;for(let t of e.unsupportedPaths)o.add(t)}}else if(p===`array`&&(!f||g)){if(Array.isArray(a.items)){let e=[];for(let r=0;r<a.items.length;r+=1){let i=a.items[r];if(!i){o.add(l);continue}if(n&&!on(i)){e.push(i),sn(i)||o.add(l);continue}let s=$(i,[...t,r],n);e.push(s.schema??i);for(let e of s.unsupportedPaths)o.add(e)}if(c.items=e,a.additionalItems&&typeof a.additionalItems==`object`){if(n&&!on(a.additionalItems))c.additionalItems=a.additionalItems,sn(a.additionalItems)||o.add(l);else{let e=$(a.additionalItems,[...t,`*`],n);c.additionalItems=e.schema??a.additionalItems;for(let t of e.unsupportedPaths)o.add(t)}}else c.additionalItems=a.additionalItems}else if(!a.items)o.add(l);else if(n&&!on(a.items))c.items=a.items,sn(a.items)||o.add(l);else{let e=$(a.items,[...t,`*`],n);c.items=e.schema??a.items;for(let t of e.unsupportedPaths)o.add(t)}if(a.allOf)for(let e of ge(a)){let n=ve(a,e);if(!n)continue;let r=$(n,[...t,e]);for(let e of r.unsupportedPaths)o.add(e)}}else(!f||p!==`object`&&p!==`array`)&&p!==`string`&&p!==`number`&&p!==`integer`&&p!==`boolean`&&!c.enum&&!(n&&a.allOf)&&o.add(l);return{schema:c,unsupportedPaths:Array.from(o)}}function pn(e){if(c(e)!==`object`)return!1;let t=e.properties?.source,n=e.properties?.provider,r=e.properties?.id;return!t||!n||!r?!1:typeof t.const==`string`&&c(n)===`string`&&c(r)===`string`}function mn(e){let t=e.oneOf??e.anyOf;return!t||t.length===0?!1:t.every(e=>pn(e))}function hn(e,t,n,r){let i=n.findIndex(e=>c(e)===`string`);if(i<0)return null;let a=n.filter((e,t)=>t!==i),o=a[0],s=n[i];return a.length!==1||!o||!s||!mn(o)?null:$({...e,...s,nullable:r||s.nullable,anyOf:void 0,oneOf:void 0,allOf:void 0},t)}function gn(e,t){if(e.allOf)return null;let n=e.anyOf??e.oneOf;if(!n)return null;let r=[],i=[],a=!1;for(let e of n){if(!e||typeof e!=`object`)return null;if(Array.isArray(e.enum)){let{enumValues:t,nullable:n}=$t(e.enum);r.push(...t),n&&(a=!0);continue}if(`const`in e){if(e.const==null){a=!0;continue}r.push(e.const);continue}if(c(e)===`null`){a=!0;continue}i.push(e)}a&&=un(e);let o=hn(e,t,i,a);if(o)return o;if(r.length>0&&i.length>0){let t=i.length===1?i[0]:void 0;if(t?.type!==`boolean`||Object.keys(t).length!==1||r.includes(`true`)||r.includes(`false`)||e.anyOf===void 0&&r.some(e=>typeof e==`boolean`))return i.every(e=>e.type===`string`)&&r.every(e=>typeof e==`string`||typeof e==`boolean`)&&!un(e)?{schema:{...e,nullable:a},unsupportedPaths:[]}:null;i.pop(),r.unshift(!0,!1)}if(r.length>0&&i.length===0)return{schema:{...e,enum:en(r),nullable:a,enumIncludesNull:a,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]};if(i.length===1){let n=i[0];return n?$({...e,...n,nullable:a||n.nullable,anyOf:void 0,oneOf:void 0,allOf:void 0},t):null}return i.length>0&&r.length===0&&i.every(e=>{let t=c(e);return!!t&&xn.has(String(t))})?{schema:{...e,nullable:a},unsupportedPaths:[]}:null}var _n,vn,yn,bn,xn;function Sn(){return(Sn=e((()=>{he(),B(),V(),_n=new Set([`$id`,`$schema`,`title`,`description`,`default`,`deprecated`,`nullable`,`enumIncludesNull`,`examples`,`readOnly`,`tags`,`writeOnly`,`x-tags`]),vn=new Set([..._n,`const`,`required`,`additionalProperties`,`minimum`,`maximum`,`exclusiveMinimum`,`exclusiveMaximum`,`multipleOf`,`minLength`,`maxLength`,`pattern`,`format`,`minItems`,`maxItems`,`uniqueItems`]),yn=new Set([...vn,`type`,`properties`,`items`,`additionalItems`,`enum`,`anyOf`,`oneOf`,`allOf`,`not`]),bn=new Set([`string`,`number`,`integer`,`boolean`]),xn=new Set([...bn,`object`,`array`])})))()}function Cn(){return(Cn=e((()=>{Zt(),Sn(),qt(),V()})))()}export{et as _,Xt as a,Q as c,xt as d,pt as f,tt as g,rt as h,Zt as i,wt as l,dt as m,fn as n,Jt as o,ft as p,Sn as r,qt as s,Cn as t,Et as u};
//# sourceMappingURL=config-form-DNnRghV9.js.map