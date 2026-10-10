import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Kr as t,Rr as n,zr as r}from"./control-ui-foundation-DaCuy7E_.js";import{$s as i,Al as a,Bi as o,F as s,Hi as c,Js as l,Qs as u,Sl as d,Ss as f,Tl as p,an as m,bs as h,un as g,wl as _}from"./control-ui-core-CndkyZ8m.js";import{$ as v,Q as y,at as b,dt as x,nt as S}from"./lit-runtime-CIjzngcy.js";import{$r as C,Qr as w,bi as T,nr as E,rr as D,si as O,xi as k}from"./control-ui-core-C5mtYcym.js";import{Fa as A,Ia as j}from"./control-ui-boot-shared-DlJEsz5Q.js";import{B as M,U as N,V as P,z as F}from"./control-ui-boot-shared-DwSLfX8E.js";import{_t as I,dt as L,fa as R,ht as z,it as B,nt as V,ot as H,pa as U,pt as W}from"./control-ui-boot-shared-DpHhsTHW.js";import{a as G}from"./control-ui-boot-new-CQMzhCGu.js";import{n as K,t as q}from"./settings-workspace-gGOfyDax.js";import{n as J,t as Y}from"./sessions-hub-header-DjgGbme9.js";var X,Z;function Q(){return(Q=e((()=>{r(),F(),y(),b(),O(),C(),E(),R(),Y(),V(),q(),p(),f(),g(),o(),l(),j(),_(),X=`https://docs.openclaw.ai/concepts/managed-worktrees`,Z=class extends d{constructor(...e){super(...e),this.records=[],this.error=null,this.busyId=null,this.createOpen=!1,this.createRepoRoot=``,this.createName=``,this.createBaseRef=``,this.createBranches=[],this.creating=!1,this.gcLoading=!1,this.listClient=null,this.gateway=new A(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.records=[],this.error=null},invalidateRequests:e=>{(e.snapshot.phase!==`connected`||!e.snapshot.client)&&(this.listClient=null,this.listTask.run([null])),this.branchesTask.run([null,``]),this.invalidateOperations()},ensureInitialData:()=>void this.load(),onSnapshot:e=>{D(e.snapshot).canAdmin||(this.createOpen=!1)}}),this.listTask=new M(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null],task:([e],{signal:t})=>e?e.request(`worktrees.list`,{},{signal:t}):P,onComplete:e=>{this.records=e.worktrees.toSorted((e,t)=>t.lastActiveAt-e.lastActiveAt)},onError:e=>{this.error=h(e)}}),this.branchesTask=new M(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.createRepoRoot.trim()],task:([e,t],{signal:n})=>e&&t?e.request(`worktrees.branches`,{repoRoot:t},{signal:n}):P,onComplete:e=>{this.createBranches=e.branches.map(e=>e.name),this.createBaseRef||=e.defaultBranch??e.headBranch??``},onError:()=>{this.createBranches=[]}})}disconnectedCallback(){this.listClient=null,this.listTask.run([null]),this.branchesTask.run([null,``]),super.disconnectedCallback()}invalidateOperations(){this.busyId=null,this.creating=!1,this.gcLoading=!1}get operationPending(){return this.loading||this.busyId!==null||this.creating}get loading(){return this.gcLoading||this.listTask.status===N.PENDING}get canAdmin(){return D(this.context.gateway.snapshot).canAdmin}get canWrite(){return D(this.context.gateway.snapshot).canWrite}async load(e={}){let t=this.gateway.client;!t||!this.gateway.connected||this.busyId!==null||this.creating||this.gcLoading||this.listTask.status===N.PENDING&&this.listClient===t||(this.listClient=t,e.preserveError||(this.error=null),await this.listTask.run([t]))}async runOperation(e,t){this.error=null;try{await t()}catch(t){this.gateway.isCurrent(e)&&(this.error=h(t))}finally{this.gateway.isCurrent(e)&&(this.invalidateOperations(),await this.load({preserveError:!0}))}}async removeWorktree(e){let t=this.gateway.capture();t&&this.canAdmin&&!this.operationPending&&await U({message:a(`worktrees.confirmDelete`,{name:e.name}),confirmLabel:a(`common.delete`),danger:!0})&&this.gateway.isCurrent(t)&&this.canAdmin&&!this.operationPending&&(this.busyId=e.id,await this.runOperation(t,async()=>{let n=await t.client.request(`worktrees.remove`,{id:e.id});if(!this.gateway.isCurrent(t)||n.removed)return;let r=n.snapshotError??``,i=await U({message:a(`worktrees.confirmForceDelete`,{error:r}),confirmLabel:a(`common.delete`),danger:!0});if(!this.gateway.isCurrent(t)||!this.canAdmin)return;if(!i){this.error=r||null;return}let o=await t.client.request(`worktrees.remove`,{id:e.id,force:!0});this.gateway.isCurrent(t)&&(this.error=o.snapshotError??null)}))}async restore(e){let t=this.gateway.capture();t&&this.canAdmin&&!this.operationPending&&(this.busyId=e.id,await this.runOperation(t,()=>t.client.request(`worktrees.restore`,{id:e.id})))}async gc(){let e=this.gateway.capture();e&&this.canAdmin&&!this.operationPending&&(this.gcLoading=!0,await this.runOperation(e,()=>e.client.request(`worktrees.gc`,{})))}toggleCreate(){if(this.canAdmin&&!this.creating&&(this.createOpen=!this.createOpen,this.createOpen&&!this.createRepoRoot)){let e=this.context.agents.state.agentsList,t=e?.agents.find(t=>t.id===e.defaultId);this.createRepoRoot=t?.workspace??``,this.loadCreateBranches()}}loadCreateBranches(){let e=this.gateway.connected?this.gateway.client:null,t=this.createRepoRoot.trim();if(!e||!t||!this.canWrite){this.createBranches=[],this.branchesTask.run([null,``]);return}this.branchesTask.run([e,t])}async createWorktree(){let e=this.gateway.capture(),t=this.createRepoRoot.trim();e&&this.canAdmin&&t&&!this.operationPending&&(this.creating=!0,await this.runOperation(e,async()=>{await G(e.client,{repoRoot:t,name:this.createName,baseRef:this.createBaseRef}),this.gateway.isCurrent(e)&&(this.createOpen=!1,this.createName=``)}))}renderOwner(e){if(e.ownerKind===`session`&&e.ownerId){let t=u(this.context,e.ownerId),n=i({context:this.context,face:t,sessionKey:e.ownerId,preferenceDerivedFace:!0});return S`<a
        href=${n.href}
        title=${e.ownerId}
        @click=${e=>{s(e)&&(e.preventDefault(),this.context.navigate(t,n.options))}}
        >${a(`worktrees.ownerSession`)}</a
      >`}return e.ownerKind===`workboard`?S`<span title=${e.ownerId??``}>${a(`worktrees.ownerWorkboard`)}</span>`:S`<span>${a(`worktrees.ownerManual`)}</span>`}renderCreateRows(){return this.createOpen?S`
      ${W({title:a(`worktrees.repo`),control:S`
          <input
            class="settings-input"
            type="text"
            aria-label=${a(`worktrees.repo`)}
            ?disabled=${this.creating}
            .value=${this.createRepoRoot}
            @change=${e=>{this.createRepoRoot=e.target.value,this.createBaseRef=``,this.loadCreateBranches()}}
          />
        `})}
      ${W({title:a(`worktrees.name`),control:S`
          <input
            class="settings-input"
            type="text"
            aria-label=${a(`worktrees.name`)}
            ?disabled=${this.creating}
            placeholder=${a(`worktrees.namePlaceholder`)}
            .value=${this.createName}
            @input=${e=>{this.createName=e.target.value}}
          />
        `})}
      ${W({title:a(`worktrees.baseBranch`),control:S`
          <input
            class="settings-input"
            type="text"
            aria-label=${a(`worktrees.baseBranch`)}
            ?disabled=${this.creating}
            list="worktrees-create-branches"
            .value=${this.createBaseRef}
            @input=${e=>{this.createBaseRef=e.target.value}}
          />
          <datalist id="worktrees-create-branches">
            ${this.createBranches.map(e=>S`<option value=${e}></option>`)}
          </datalist>
        `})}
      ${W({title:a(`worktrees.newWorktree`),control:S`
          <button
            class="btn btn--sm"
            ?disabled=${this.operationPending||!this.createRepoRoot.trim()}
            @click=${()=>void this.createWorktree()}
          >
            ${this.creating?a(`common.loading`):a(`common.create`)}
          </button>
        `})}
    `:v}renderRecordRow(e){return W({title:e.name,description:S`
        <span title=${e.repoRoot}>${c(e.repoRoot)}</span> · ${e.branch} ·
        ${this.renderOwner(e)} · ${m(e.lastActiveAt)}
      `,control:S`
        ${e.removedAt?I({kind:`muted`,label:a(`worktrees.restorable`)}):I({kind:`ok`,label:a(`common.active`)})}
        <button
          class=${e.removedAt?`btn btn--sm`:`btn btn--sm danger`}
          title=${this.canAdmin?``:a(`worktrees.adminRequired`)}
          ?disabled=${!this.canAdmin||this.operationPending}
          @click=${()=>void(e.removedAt?this.restore(e):this.removeWorktree(e))}
        >
          ${e.removedAt?a(`worktrees.restore`):a(`common.delete`)}
        </button>
      `})}render(){let e=S`
      <button
        class="btn"
        title=${this.canAdmin?``:a(`worktrees.adminRequired`)}
        ?disabled=${!this.canAdmin||this.creating}
        @click=${()=>this.toggleCreate()}
      >
        ${a(`worktrees.newWorktree`)}
      </button>
      <button
        class="btn"
        title=${this.canAdmin?``:a(`worktrees.adminRequired`)}
        ?disabled=${!this.canAdmin||this.operationPending}
        @click=${()=>void this.gc()}
      >
        ${this.loading?a(`common.loading`):a(`worktrees.cleanNow`)}
      </button>
    `,t=S`
      ${this.renderCreateRows()}
      ${this.records.length===0?H(a(`worktrees.empty`)):this.records.map(e=>this.renderRecordRow(e))}
    `,n=L(S`
        ${this.canAdmin?v:S`<div class="callout info" role="note">${a(`worktrees.adminRequired`)}</div>`}
        ${this.error?S`<div class="callout danger" role="alert">${this.error}</div>`:v}
        ${z({title:a(`worktrees.title`),description:a(`worktrees.subtitle`),actions:e},t)}
      `,{wide:!0});return S`
      ${J({active:`worktrees`,title:k(`sessions`),subtitle:S`${T(`worktrees`)} ${B(X)}`,onSelect:e=>{e!==`worktrees`&&this.context?.navigate(e)}})}
      ${K(n,{id:`sessions-hub-panel`})}
    `}},t([n({context:w,subscribe:!0})],Z.prototype,`context`,void 0),t([x()],Z.prototype,`records`,void 0),t([x()],Z.prototype,`error`,void 0),t([x()],Z.prototype,`busyId`,void 0),t([x()],Z.prototype,`createOpen`,void 0),t([x()],Z.prototype,`createRepoRoot`,void 0),t([x()],Z.prototype,`createName`,void 0),t([x()],Z.prototype,`createBaseRef`,void 0),t([x()],Z.prototype,`createBranches`,void 0),t([x()],Z.prototype,`creating`,void 0),t([x()],Z.prototype,`gcLoading`,void 0),customElements.get(`openclaw-worktrees-page`)||customElements.define(`openclaw-worktrees-page`,Z)})))()}Q();
//# sourceMappingURL=worktrees-page-CFweWuMw.js.map