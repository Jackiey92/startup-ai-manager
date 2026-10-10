import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Al as t,Fl as n,Il as r,Tl as i}from"./control-ui-core-CndkyZ8m.js";import{$ as a,Q as o,nt as s}from"./lit-runtime-CIjzngcy.js";var c,l;function u(){return(u=e((()=>{r(),c={cron:{list:{viewLabel:`Automation views`,sessionFilter:`Automations attached to this session.`,showAll:`Show all automations`,searchPlaceholder:`Search automations`,newTask:`New automation`,filters:`Filters`,shownOf:`{shown} of {total}`,emptyTitle:`No automations yet`,emptyHint:`Describe what OpenClaw should do and when — it runs on schedule.`,noMatching:`No automations match the current filters.`,loadMore:`Load more`,loading:`Loading...`,schedulerOff:`Scheduler disabled`,refresh:`Refresh`,refreshing:`Refreshing...`,paused:`Paused`,autoDisabledRunFailures:`Auto-disabled · {count} run failures`,autoDisabledScheduleErrors:`Auto-disabled · {count} schedule errors`,tasksTab:`Automations`,activityTab:`Run history`}}},l=Object.assign(()=>{Object.assign(n.cron,c.cron)},{catalog:c})})))()}function d(e){return s`
    <div class="cron-table__footer">
      <span class="muted">
        ${t(`cron.list.shownOf`,{shown:String(e.jobsShown),total:String(Math.max(e.jobsTotal,e.jobsShown))})}
      </span>
      ${e.hasMore?s`
              <button
                class="btn btn--sm cron-load-more"
                ?disabled=${e.loading||e.loadingMore}
                @click=${e.onLoadMore}
              >
                ${e.loadingMore?t(`cron.list.loading`):t(`cron.list.loadMore`)}
              </button>
            `:a}
    </div>
  `}function f(){return(f=e((()=>{o(),i(),u(),l()})))()}export{l as i,d as n,u as r,f as t};
//# sourceMappingURL=cron-jobs-pagination-86dgTmrC.js.map