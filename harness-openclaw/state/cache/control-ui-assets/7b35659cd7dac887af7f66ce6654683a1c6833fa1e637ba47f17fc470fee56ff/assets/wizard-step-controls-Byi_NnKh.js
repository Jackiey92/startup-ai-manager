import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Ss as n,Tl as r,xs as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,nt as s}from"./lit-runtime-CIjzngcy.js";import{Di as c,Ei as l,wi as u}from"./control-ui-core-C5mtYcym.js";import{cr as d,lr as f,mr as p,pr as m}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as h,t as g}from"./channel-picker-Dp-6-XIl.js";function _(e){return`*`.repeat(Array.from(b.segment(e)).length)}function v(e){let t=e.closest(`[data-sensitive-input]`)?.querySelector(`[data-sensitive-mask-text]`);t&&(t.textContent=_(e.value),t.style.transform=`translateX(${-e.scrollLeft}px)`)}function y(e){let t=e.revealed?e.hideLabel:e.revealLabel,n=e.className?`oc-sensitive-input ${e.className}`:`oc-sensitive-input`,r=t=>{let n=t.currentTarget;v(n),e.onInput(n.value)},i=e=>{v(e.currentTarget)};return s`
    <span
      class=${n}
      data-sensitive-input
      data-sensitive-mask-ready="true"
      data-revealed=${String(e.revealed)}
    >
      <span
        class="oc-sensitive-mask"
        aria-hidden="true"
        data-sensitive-mask
        ?hidden=${e.revealed}
      >
        <span
          data-sensitive-mask-text
          .textContent=${e.revealed?``:_(e.value)}
        ></span>
      </span>
      <input
        id=${e.id}
        class=${e.inputClassName??a}
        name=${e.name??a}
        type=${e.revealed?`text`:`password`}
        autocomplete="off"
        spellcheck="false"
        placeholder=${e.placeholder??``}
        .value=${e.value}
        ?disabled=${e.disabled}
        data-sensitive-value
        @input=${r}
        @change=${i}
        @focus=${i}
        @scroll=${i}
      />
      <openclaw-tooltip .content=${t}>
        <button
          type="button"
          class="oc-sensitive-toggle"
          aria-label=${t}
          aria-controls=${e.id}
          aria-pressed=${String(e.revealed)}
          data-sensitive-icon=${e.revealed?`eye-off`:`eye`}
          ?disabled=${e.disabled}
          @click=${e.onToggle}
        >
          ${e.revealed?l.eyeOff:l.eye}
        </button>
      </openclaw-tooltip>
    </span>
  `}var b;function x(){return(x=e((()=>{o(),c(),u(),b=new Intl.Segmenter(void 0,{granularity:`grapheme`})})))()}function S(e,n=t(`modelSetup.wizard.continue`)){return s`
    <button type="button" class="btn primary" disabled aria-busy="true" aria-label=${n}>
      <span class="btn__label">${n}</span>
      <span class="btn__spinner" aria-hidden="true"></span>
      <span class="sr-only" role="status" aria-live="polite">${e}</span>
    </button>
  `}function C(e,t){return`${e.presentation===`channels`?`channels-wizard`:`wizard-step`}__${t}`}function w(e){return e.step.message?s`<div class=${C(e,`message`)}>
        ${i(e.step.message)}
      </div>`:a}function T(e,t,n){return t===`channels`?s`
      <span class="channels-wizard__option-label">
        ${n===void 0?a:n?`☑ `:`☐ `}${e.label}
      </span>
      ${e.hint?s`<span class="channels-wizard__option-hint">${e.hint}</span>`:a}
    `:s`
    <span>
      <strong>${e.label}</strong>
      ${e.hint?s`<small>${e.hint}</small>`:a}
    </span>
  `}function E(e){let n=e.deviceCode,r=t(n?`modelSetup.wizard.copyCode`:`modelSetup.wizard.copyLink`),i=n?.code??e.externalUrl;return s`
    <div class="wizard-step__sign-in">
      <p class="muted">${n?.message??t(`modelSetup.wizard.browserInstructions`)}</p>
      ${n?s`<code class="wizard-step__sign-in-code">${n.code}</code>`:a}
      <div class="wizard-step__actions">
        ${e.externalUrl?s`<a class="btn primary wizard-step__external-link" href=${e.externalUrl} target="_blank" rel="noreferrer">${t(`modelSetup.wizard.openSignIn`)}</a>`:a}
        ${i?s`<button type="button" class="btn" @click=${e=>void d(e,i,r)}><span data-copy-label>${r}</span></button>`:a}
      </div>
      <div class="muted" role="status" aria-live="polite">${t(`modelSetup.wizard.waiting`)}</div>
      ${n?.expiresInMinutes?s`<div class="muted">${t(`modelSetup.wizard.expires`,{count:String(n.expiresInMinutes)})}</div>`:a}
      ${n?s`<p class="muted">${t(`modelSetup.wizard.deviceCodeWarning`)}</p>`:a}
    </div>
  `}function D(e){if(e.options.length<=2)return s`<div class="wizard-step__actions">
      ${e.options.map((t,n)=>s`<button type="button" class=${n===0?`btn primary`:`btn`} ?disabled=${e.busy} @click=${()=>e.onAnswer(t.value)}>${T(t)}</button>`)}
    </div>`;let t=e.options.findIndex(t=>Object.is(t.value,e.value));return p({label:e.label,value:t<0?null:String(t),options:e.options.map((e,t)=>({value:String(t),label:e.label,description:e.hint,kind:`neutral`})),disabled:e.busy,onChange:t=>e.onAnswer(e.options[Number(t)]?.value)})}function O(e,t,n,r=e.busy){let i=e.answerLabel??t;if(e.presentation===`channels`&&e.busy)return s`<div class="channels-wizard__footer">
      ${S(e.busyLabel??i)}
    </div>`;let a=s`
    <button
      type=${n?`button`:`submit`}
      class="btn primary"
      ?disabled=${r}
      @click=${n}
    >
      ${i}
    </button>
  `;return e.presentation===`channels`?s`<div class="channels-wizard__footer">${a}</div>`:e.leadingAction?s`<div class="wizard-step__actions wizard-step__actions--split">
        ${e.leadingAction}${a}
      </div>`:a}function k(e,t,n){let r=n.some(e=>Object.is(e,t.value));return e.presentation===`channels`?s`<button
      type="button"
      class="channels-wizard__option"
      aria-pressed=${r?`true`:`false`}
      ?disabled=${e.busy}
      @click=${()=>e.onValueChange(t.value)}
    >
      ${T(t,e.presentation,r)}
    </button>`:s`<label class="wizard-step__option">
    <input
      type="checkbox"
      .checked=${r}
      ?disabled=${e.busy}
      @change=${r=>{let i=r.currentTarget.checked?[...n,t.value]:n.filter(e=>!Object.is(e,t.value));e.onValueChange(i)}}
    />
    ${T(t)}
  </label>`}function A(e){return e.externalUrl||e.deviceCode?E(e):a}function j(e){return s`
    ${w(e)} ${A(e.step)}
    ${O(e,t(`modelSetup.wizard.continue`),()=>e.onAnswer(void 0))}
  `}function M(e){return s`
    ${e.step.externalUrl||e.step.deviceCode?a:s`<div class="wizard-step__progress" role="status" aria-live="polite">
            <span class="wizard-step__spinner" aria-hidden="true"></span>
            ${w(e)}
          </div>`}
    ${A(e.step)}
    ${e.leadingAction?s`<div class="wizard-step__actions wizard-step__actions--split">
            ${e.leadingAction}
          </div>`:a}
  `}function N(e){let n=e.step,r=typeof e.value==`string`?e.value:``,o=n.sensitive&&e.onToggleSensitiveVisibility?y({id:e.inputId,name:`wizard-text`,value:r,revealed:e.sensitiveRevealed===!0,revealLabel:t(`configForm.revealValue`),hideLabel:t(`configForm.hideValue`),inputClassName:`input`,placeholder:n.placeholder,disabled:e.busy,onInput:e.onValueChange,onToggle:e.onToggleSensitiveVisibility}):s`<input
          id=${e.inputId}
          class="input"
          name="wizard-text"
          type=${n.sensitive?`password`:`text`}
          autocomplete=${n.sensitive?`off`:`on`}
          placeholder=${n.placeholder??``}
          .value=${r}
          ?disabled=${e.busy}
          @input=${t=>e.presentation!==`channels`&&e.onValueChange(t.currentTarget.value)}
        />`,c=s`
    <form
      class="wizard-step__form"
      @submit=${t=>{t.preventDefault();let n=t.currentTarget.elements.namedItem(`wizard-text`);e.onAnswer(e.presentation===`channels`?n?.value??``:r)}}
    >
      ${n.message?s`<div class=${C(e,`message`)}>
              <label for=${e.inputId}>${i(n.message)}</label>
            </div>`:a}
      ${e.externalAuthInput?a:A(n)} ${o}
      ${O(e.externalAuthInput?{...e,leadingAction:void 0}:e,t(`modelSetup.wizard.submit`))}
    </form>
  `;return e.externalAuthInput?s`
        ${A(n)}
        <details class="wizard-step__manual-entry">
          <summary class="muted">${t(`modelSetup.wizard.manualEntry`)}</summary>
          ${c}
        </details>
        <div class="wizard-step__actions wizard-step__actions--split">
          ${e.leadingAction??a}
        </div>
      `:c}function P(e){let n=e.step.options??[],r=e.step.type===`multiselect`,i=r?Array.isArray(e.value)?e.value:[]:[e.value];if(!r&&e.presentation!==`channels`)return s`
      ${w(e)}
      ${D({options:n,busy:e.busy,label:e.step.message??``,value:e.value,onAnswer:e.onAnswer})}
      ${e.leadingAction??a}
    `;if(e.presentation===`channels`&&!r){let r=n.findIndex(t=>Object.is(t.value,e.value)),i=e.channelSelect&&n.every(e=>typeof e.value==`string`),o=i?h:p;return s`
      ${w(e)}
      ${o({label:e.step.message??``,value:r<0?null:String(i?n[r]?.value:r),options:n.map((e,t)=>({value:String(i?e.value:t),label:e.label,description:e.hint,kind:i?`channel`:`neutral`})),disabled:e.busy,onChange:t=>e.onAnswer(i?t:n[Number(t)]?.value)})}
      ${e.busy?O(e,t(`modelSetup.wizard.continue`),void 0,!0):a}
    `}let o=r?e.presentation===`channels`?[...i]:i:e.value;return s`
    ${w(e)}
    <div class=${C(e,`options`)} role=${r?a:`radiogroup`}>
      ${n.map(t=>k(e,t,i))}
    </div>
    ${O(e,t(`modelSetup.wizard.continue`),()=>e.onAnswer(o),e.busy||!r&&e.value===void 0)}
  `}function F(e){let n=C(e,e.presentation===`channels`?`footer`:`actions`);return s`
    ${w(e)}
    <div
      class=${e.presentation!==`channels`&&e.leadingAction?`${n} wizard-step__actions--split`:n}
    >
      ${e.presentation===`channels`?a:e.leadingAction??a}
      ${e.presentation===`channels`&&e.busy?S(e.busyLabel??t(`common.loading`)):[!1,!0].map(n=>s`<button
                type="button"
                class=${n?`btn primary`:`btn`}
                ?disabled=${e.busy}
                @click=${()=>e.onAnswer(n)}
              >
                ${n?e.confirmAffirmativeLabel??t(`common.yes`):t(`common.no`)}
              </button>`)}
    </div>
  `}function I(e){switch(e.step.type){case`text`:return N(e);case`select`:case`multiselect`:return P(e);case`confirm`:return F(e);case`progress`:return e.step.executor===`gateway`?M(e):j(e);case`note`:case`action`:return j(e)}return a}function L(){return(L=e((()=>{o(),r(),n(),g(),f(),m(),x()})))()}export{I as i,S as n,D as r,L as t};
//# sourceMappingURL=wizard-step-controls-Byi_NnKh.js.map