import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Ha as t,Kr as n,Lr as r,Rr as i,Sa as a,fr as o,gr as s,sa as c,tr as l,wr as u,zr as d}from"./control-ui-foundation-DaCuy7E_.js";import{Al as f,Bs as p,Cn as m,Cr as h,Fl as g,Il as _,Ir as v,Nr as y,Pr as b,Sl as x,Ss as S,Tl as C,Vs as w,Xt as T,Zt as E,ai as D,bs as O,in as k,oi as A,sn as j,un as M,wl as N,xn as P}from"./control-ui-core-CndkyZ8m.js";import{$ as F,G as I,Q as L,U as R,at as z,dt as B,it as V,nt as H,pt as ee}from"./lit-runtime-CIjzngcy.js";import{$r as U,Qr as W,bi as G,si as te,wi as ne,xi as re}from"./control-ui-core-C5mtYcym.js";import{Fa as ie,Fi as ae,Ia as oe,Li as se,Pt as ce,Yc as le}from"./control-ui-boot-shared-DlJEsz5Q.js";import{Ar as ue,Mr as de,Nr as fe,Pr as pe,cr as me,dt as he,ft as ge,gt as _e,ht as ve,jr as ye,kr as be,lr as xe,nt as Se,qi as Ce}from"./control-ui-boot-shared-DpHhsTHW.js";import{n as we,t as Te}from"./settings-workspace-gGOfyDax.js";import{n as Ee,t as De}from"./agent-row-chip-m2O7L9Wr.js";import{n as Oe,t as ke}from"./agent-scope-control-CS9bqwlc.js";import{a as Ae,i as je,r as Me}from"./usage-CVt4DC0x.js";import{a as Ne,i as Pe,n as Fe,o as Ie,r as Le,s as Re}from"./usage-0VKmc920.js";import{n as ze,r as Be,t as Ve}from"./request-usage-snapshot-B31wkJ5Y.js";function He(e,t){return[e,t].some(e=>e&&e.status!==`fresh`)}function Ue(e,t,n){let r=v(t),i=de(r?ye():e,t,n);return{clearData:r,status:r&&i.error?{...i,error:y(`usage details`)}:i}}function We(){return(We=e((()=>{fe(),b()})))()}function Ge(e,t){let n=null,r=(t,r)=>{if(n===t){n=null;try{r()}catch{}finally{e.requestUpdate()}}};return{get pending(){return n!==null},cancel:()=>{let t=n;n=null,t?.abort(),e.requestUpdate()},async run(i){let a=n,o=new AbortController;n=o,a?.abort(),e.requestUpdate();let s;try{s=await t.task(i,{signal:o.signal})}catch(e){r(o,()=>t.onError(e));return}r(o,()=>t.onComplete(s))}}}function Ke(e,t){return e?.key===t.key&&e.agentId===t.agentId&&e.sessionId===t.sessionId}function qe(e,t,n,r,i,o){let s=null,c=ye(),l=null,u=0,d=Ge(e,{task:async([e,t],{signal:r})=>({target:t,data:await n(e,{key:t.key,...!a(t.key.trim())&&t.agentId?{agentId:t.agentId}:{}},r,t.sessionId)}),onComplete:e=>{l=null,s=e,c=ue()},onError:e=>{l=null;let n=Ue(c,e,t.snapshot);n.clearData&&s&&delete s.data,c=n.status}}),f=()=>{l&&t.snapshot&&!m(t.snapshot)&&(c=de(c,void 0,t.snapshot)),l=null,u+=1,d.cancel()},p=e=>{s=e?{target:e}:null,c=ye(),o?.()};return{get data(){return s?.data??null},get status(){return c},get loading(){return l!==null},async recover(e,n=!1){let i=u,a=r(e);await l,i===u&&Ke(a,r(e))&&t.snapshot&&m(t.snapshot)&&(c.awaitingGateway||c.error!==null||n&&!c.hasLoaded)&&this.load(e)},load(e,n=!0){let a=t.client;if(!a||!t.connected)return Promise.resolve();let o=!!e&&i?.(e)!==!1,m=r(e),h=Ke(s?.target,m);return(!h||!o)&&p(o?m:void 0),o?!n&&h?l??Promise.resolve():(c=be(c),u+=1,l=d.run([a,m])):(f(),Promise.resolve())},cancel:f,clear(){p(),f()}}}var Je;function Ye(){return(Ye=e((()=>{c(),fe(),C(),P(),We(),Je=class{constructor(e,t,n,r,i){let a=e=>{let t=r().find(t=>t.key===e),i=t?.agentId??n().agentId;return{key:e,...i?{agentId:i}:{},sessionId:t?.sessionId}};this.timeSeries=qe(e,t,Ae,a,void 0,i),this.sessionLogs=qe(e,t,async(e,t)=>{let n=await je(e,t);return Array.isArray(n.logs)?n.logs:null},a),this.contextWeight=qe(e,t,async(e,t,r,i)=>{let a=(await Me(e,{...n(),agentId:t.agentId},{key:t.key,includeContextWeight:!0,signal:r})).sessions[0];if(i!==void 0&&a?.sessionId!==void 0&&a.sessionId!==i)throw Error(f(`usage.details.contextOutOfDate`));return a?.contextWeight},a,e=>r().some(t=>t.key===e&&t.hasContextWeight))}load(e,t=!0){this.timeSeries.load(e,t),this.sessionLogs.load(e,t),this.contextWeight.load(e)}cancel(){this.timeSeries.cancel(),this.sessionLogs.cancel(),this.contextWeight.cancel()}clear(){this.timeSeries.clear(),this.sessionLogs.clear(),this.contextWeight.clear()}}})))()}function Xe(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function Ze(e){return O(e,`request failed`)}function Qe(e,t,n,r,i){if(r&&e.length>0)for(let r of e.slice(-1)){let i=n.indexOf(r),a=n.indexOf(t);if(i!==-1&&a!==-1){let[t,r]=i<a?[i,a]:[a,i];return[...new Set([...e,...n.slice(t,r+1)])]}}return e.includes(t)?e.filter(e=>e!==t):i?[...e,t]:[t]}function $e(e,t,n,r){if(r&&e.length>0){let r=n.indexOf(e.at(-1)??``),i=n.indexOf(t);if(r!==-1&&i!==-1){let[t,a]=r<i?[r,i]:[i,r];return[...new Set([...e,...n.slice(t,a+1)])]}}return e.length===1&&e[0]===t?[]:[t]}function et(e){let t=e.split(`
`),n=new Map,r=[];for(let e of t){let t=/^\[Tool:\s*([^\]]+)\]/.exec(e.trim())?.[1];if(t){n.set(t,(n.get(t)??0)+1);continue}e.trim().startsWith(`[Tool Result]`)||r.push(e)}let i=Array.from(n.entries()).toSorted((e,t)=>t[1]-e[1]),a=i.reduce((e,[,t])=>e+t,0);return{tools:i,summary:i.length>0?`Tools: ${i.map(([e,t])=>`${e}×${t}`).join(`, `)} (${a} calls)`:``,cleanContent:r.join(`
`).trim()}}var tt,nt,rt,K,it,at,ot,st,ct,lt,ut,dt,ft,pt,mt,ht,gt;function _t(){return(_t=e((()=>{S(),tt=e=>t(e),nt=e=>{let t=e.replace(/[.+^${}()|[\]\\]/g,`\\$&`).replace(/\*/g,`.*`).replace(/\?/g,`.`);return RegExp(`^${t}$`,`i`)},rt=e=>{let n=t(e);if(!n)return null;n.startsWith(`$`)&&(n=n.slice(1));let r=1;if(n.endsWith(`k`)?(r=1e3,n=n.slice(0,-1)):n.endsWith(`m`)&&(r=1e6,n=n.slice(0,-1)),!/^\d+(?:\.\d+)?$/.test(n))return null;let i=Number(n)*r;return!Number.isFinite(i)||!Number.isSafeInteger(Math.round(i))?null:i},K=e=>(e.match(/(?:[^\s"]|"[^"]*")+/g)??[]).map(e=>{let t=e.replace(/^"(.*)"$/u,`$1`),n=t.indexOf(`:`);return n>0?{key:t.slice(0,n),value:t.slice(n+1).replace(/^"(.*)"$/u,`$1`),raw:t}:{value:t,raw:e}}),it=e=>[e.label,e.key,e.sessionId].filter(e=>!!e).map(e=>t(e)),at=e=>{let n=new Set;e.modelProvider&&n.add(t(e.modelProvider)),e.providerOverride&&n.add(t(e.providerOverride)),e.origin?.provider&&n.add(t(e.origin.provider));for(let r of e.usage?.modelUsage??[])r.provider&&n.add(t(r.provider));return Array.from(n)},ot=e=>{let n=new Set;e.model&&n.add(t(e.model));for(let r of e.usage?.modelUsage??[])r.model&&n.add(t(r.model));return Array.from(n)},st=e=>(e.usage?.toolUsage?.tools??[]).map(e=>t(e.name)),ct={tools:e=>(e.usage?.toolUsage?.totalCalls??0)>0,errors:e=>(e.usage?.messageCounts?.errors??0)>0,context:e=>e.hasContextWeight===!0,usage:e=>!!e.usage,model:e=>ot(e).length>0,provider:e=>at(e).length>0},lt=(e,t)=>e>=t,ut=(e,t)=>e<=t,dt={mintokens:[e=>e.usage?.totalTokens??0,lt],maxtokens:[e=>e.usage?.totalTokens??0,ut],mincost:[e=>e.usage?.totalCost??0,lt],maxcost:[e=>e.usage?.totalCost??0,ut],minmessages:[e=>e.usage?.messageCounts?.total??0,lt],maxmessages:[e=>e.usage?.messageCounts?.total??0,ut]},ft=new Set([`agent`,`channel`,`chat`,`provider`,`model`,`tool`,`label`,`key`,`session`,`id`,`has`,...Object.keys(dt)]),pt=new Set([`channel`,`provider`,`model`,`tool`]),mt=()=>!0,ht=(e,n,r)=>{if(e.key&&!ft.has(n))return r.push(`Unknown filter: ${e.key}`),mt;e.key&&e.value===``&&r.push(`Missing value for ${e.key}`);let i=tt(e.value??``),a=Object.hasOwn(dt,n)?dt[n]:void 0,o=a&&e.value?rt(e.value):null;if(a&&e.value&&o===null&&r.push(`Invalid number for ${e.key}`),n===`has`){let t=Object.hasOwn(ct,i)?ct[i]:void 0;return e.value&&!t&&r.push(`Unknown has:${e.value}`),t??mt}if(!i)return mt;if(!e.key)return e=>it(e).some(e=>e.includes(i));switch(n){case`agent`:return e=>t(e.agentId).includes(i);case`channel`:return e=>t(e.channel).includes(i);case`chat`:return e=>t(e.chatType).includes(i);case`provider`:return e=>at(e).some(e=>e.includes(i));case`model`:return e=>ot(e).some(e=>e.includes(i));case`tool`:return e=>st(e).some(e=>e.includes(i));case`label`:return e=>t(e.label).includes(i);case`key`:case`session`:case`id`:if(i.includes(`*`)||i.includes(`?`)){let e;return t=>(e??=nt(i),e.test(t.key)||(t.sessionId?e.test(t.sessionId):!1))}return e=>t(e.key).includes(i)||t(e.sessionId).includes(i)}if(!a||o===null)return mt;let[s,c]=a;return e=>c(s(e),o)},gt=(e,t)=>{let n=K(t);if(n.length===0)return{sessions:e,warnings:[]};let r=[],i=new Map,a=n.map(e=>{let t=tt(e.key??``),n=ht(e,t,r);if(!pt.has(t))return n;let a=i.get(t)??[];return e.value&&a.push(n),i.set(t,a),e=>a.length===0||a.some(t=>t(e))});return{sessions:e.filter(e=>a.every(t=>t(e))),warnings:r}}})))()}function vt({agentId:e,key:t,sessionId:n}){return JSON.stringify([e,t,n])}function yt(e,t,n){return Ge(e,{task:async(e,{signal:r})=>{let i=t.capture();if(!i)throw Error(f(`common.offline`));let a=`openclaw-usage-${Xe()}.json`,o=new Map;if(e.sessions.some(e=>e.hasContextWeight)){let t=await Me(i.client,n(),{includeContextWeight:!0,signal:r});if(o=new Map(t.sessions.map(e=>[vt(e),e.contextWeight])),e.sessions.some(e=>e.hasContextWeight&&!o.get(vt(e))))throw Error(f(`usage.export.changed`))}return{connection:i,filename:a,data:{...e,sessions:e.sessions.map(e=>({...e,contextWeight:o.get(vt(e))??null}))}}},onComplete:({connection:e,filename:n,data:r})=>{t.isCurrent(e)&&ce(n,JSON.stringify(r,null,2),`application/json;charset=utf-8`)},onError:e=>{A({message:`${f(`usage.export.label`)}: ${Ze(e)}`})}})}function bt(){return(bt=e((()=>{C(),D(),_t()})))()}function xt(e,t,n){let r=t?.sessions.map(e=>e.agentId).filter(e=>!!e?.trim())??[];return H`
    ${ge({title:re(`usage`),subtitle:G(`usage`),actions:Oe({agents:e.agents.state.agentsList?.agents??[],additionalAgentIds:r,selection:e.agentSelection})})}
    ${we(n)}
  `}function St(){return(St=e((()=>{L(),te(),ke(),Se(),Te()})))()}var Ct;function wt(){return(wt=e((()=>{Ct=[`channel`,`agent`,`provider`,`model`,`messages`,`tools`,`errors`,`duration`]})))()}function Tt(){return{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}}function Et(e,t){if(e.input+=t.input,e.output+=t.output,e.cacheRead+=t.cacheRead,e.cacheWrite+=t.cacheWrite,e.totalTokens+=t.totalTokens,e.totalCost+=t.totalCost,e.inputCost+=t.inputCost,e.outputCost+=t.outputCost,e.cacheReadCost+=t.cacheReadCost,e.cacheWriteCost+=t.cacheWriteCost,e.missingCostEntries+=t.missingCostEntries,t.missingCostByModel){e.missingCostByModel??={};for(let[n,r]of Object.entries(t.missingCostByModel))e.missingCostByModel[n]=(e.missingCostByModel[n]??0)+r}}function Dt(e,t){return JSON.stringify([e??`unknown`,t??`unknown`])}function Ot(e,t,n){return JSON.stringify([e,t??`unknown`,n??`unknown`])}function kt(){return{count:0,sum:0,min:1/0,max:0,p95Max:0}}function At(e,t){e.count+=t.count,e.sum+=t.avgMs*t.count,e.min=Math.min(e.min,t.minMs),e.max=Math.max(e.max,t.maxMs),e.p95Max=Math.max(e.p95Max,t.p95Ms)}function jt(e){return{count:e.count,avgMs:e.count?e.sum/e.count:0,minMs:e.min===1/0?0:e.min,maxMs:e.max,p95Ms:e.p95Max}}function Mt(e,t,n){let r=e.get(t)??{provider:n.provider,model:n.model,count:0,totals:Tt()};r.count+=n.count,Et(r.totals,n.totals),e.set(t,r)}function Nt(e,t,n){if(!t)return;let r=e.get(t)??Tt();Et(r,n),e.set(t,r)}function Pt(e,t){return t.totals.totalCost-e.totals.totalCost||t.totals.totalTokens-e.totals.totalTokens}function Ft(){let e=Tt(),t={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},n=new Map,r=new Map,i=new Map,a=new Map,o=new Map,s=new Map,c=new Map,l=new Map,u=kt(),d=0,f=0;function p(e){let t=s.get(e);return t||(t={date:e,tokens:0,cost:0,messages:0,toolCalls:0,errors:0},s.set(e,t)),t}function m({usage:s,agentId:m,channel:h}){if(s){Et(e,s),f=Math.max(f,s.durationMs??0),(s.firstActivity!==void 0||(s.messageCounts?.total??0)>0)&&(d+=1),s.messageCounts&&(t.total+=s.messageCounts.total,t.user+=s.messageCounts.user,t.assistant+=s.messageCounts.assistant,t.toolCalls+=s.messageCounts.toolCalls,t.toolResults+=s.messageCounts.toolResults,t.errors+=s.messageCounts.errors);for(let e of s.toolUsage?.tools??[])n.set(e.name,(n.get(e.name)??0)+e.count);for(let e of s.modelUsage??[])Mt(r,Dt(e.provider,e.model),e),Mt(i,e.provider??`unknown`,{...e,model:void 0});Nt(a,m,s),Nt(o,h,s),s.latency&&s.latency.count>0&&At(u,s.latency);for(let e of s.dailyLatency??[]){let t=c.get(e.date)??kt();At(t,e),c.set(e.date,t)}for(let e of s.dailyBreakdown??[]){let t=p(e.date);t.tokens+=e.tokens,t.cost+=e.cost}for(let e of s.dailyMessageCounts??[]){let t=p(e.date);t.messages+=e.total,t.toolCalls+=e.toolCalls,t.errors+=e.errors}for(let e of s.dailyModelUsage??[]){let t=Ot(e.date,e.provider,e.model),n=l.get(t)??{date:e.date,provider:e.provider,model:e.model,tokens:0,cost:0,count:0};n.tokens+=e.tokens,n.cost+=e.cost,n.count+=e.count,l.set(t,n)}}}function h(){let e=Array.from(n,([e,t])=>({name:e,count:t})).toSorted((e,t)=>t.count-e.count);return{sessionCount:d,...f>0?{longestSessionDurationMs:f}:{},messages:t,tools:{totalCalls:e.reduce((e,{count:t})=>e+t,0),uniqueTools:n.size,tools:e},byModel:Array.from(r.values()).toSorted(Pt),byProvider:Array.from(i.values()).toSorted(Pt),byAgent:Array.from(a,([e,t])=>({agentId:e,totals:t})).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),byChannel:Array.from(o,([e,t])=>({channel:e,totals:t})).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),latency:u.count>0?jt(u):void 0,dailyLatency:Array.from(c,([e,t])=>({date:e,...jt(t)})).toSorted((e,t)=>e.date.localeCompare(t.date)),modelDaily:Array.from(l.values()).toSorted((e,t)=>e.date.localeCompare(t.date)||t.cost-e.cost),daily:Array.from(s.values()).toSorted((e,t)=>e.date.localeCompare(t.date))}}return{totals:e,add:m,finish:h}}function It(){return(It=e((()=>{})))()}var Lt,Rt;function zt(){return(zt=e((()=>{_(),Lt={usage:{filters:{title:`Filters`,to:`to`,startDate:`Start date`,endDate:`End date`,timeZone:`Time zone`,timeZoneLocal:`Local`,timeZoneUtc:`UTC`,pin:`Pin`,pinned:`Pinned`,selectAll:`Select All`,clear:`Clear`,clearAll:`Clear All`,remove:`Remove filter`,removeDays:`Remove days filter`,removeHours:`Remove hours filter`,removeSession:`Remove session filter`,all:`All`,days:`Days`,hours:`Hours`,session:`Session`,agent:`Agent`,channel:`Channel`,provider:`Provider`,model:`Model`,tool:`Tool`,daysCount:`{count} days`,hoursCount:`{count} hours`,sessionsCount:`{count} sessions`},query:{placeholder:`Filter sessions (e.g. key:agent:main:cron* model:gpt-4o has:errors minTokens:2000)`,apply:`Filter (client-side)`,matching:`{shown} of {total} sessions match`,inRange:`{total} sessions in range`,tip:`Tip: use filters or click bars to refine days.`},cacheStatus:{warning:`Usage data may be incomplete. Checking for updated totals automatically.`,paused:`Usage data may be incomplete. Automatic checks paused; select Refresh to check again.`},empty:{title:`Start with a date range`,subtitle:`Load usage data to compare costs, inspect sessions, and drill into timelines without leaving the dashboard.`,hint:`Select a date range and click Refresh to load usage.`,noData:`No data`,featureOverview:`Overview cards`,featureSessions:`Session ranking`,featureTimeline:`Timeline drilldown`},daily:{title:`Daily Usage`,total:`Total`,byType:`By Type`,tokensTitle:`Daily Token Usage`,costTitle:`Daily Cost`,compressedScaleHint:`Square-root scale keeps low-usage days visible.`},costWindows:{title:`Cost Windows`,subtitle:`Calendar windows ending {date}`,selectedRange:`Selected Range`,lastDays:`Last {count} days`,perDay:`/ day`},overview:{messages:`Messages`,messagesHint:`Total user and assistant messages in range.`,messagesAbbrev:`msgs`,user:`user`,assistant:`assistant`,toolCalls:`Tool Calls`,toolCallsHint:`Total tool call count across sessions.`,toolsUsed:`tools used`,errors:`Errors`,errorsHint:`Total message and tool errors in range.`,toolResults:`tool results`,avgTokens:`Avg Tokens / Msg`,avgTokensHint:`Average tokens per message in this range.`,avgCost:`Avg Cost / Msg`,avgCostHint:`Average cost per message when providers report costs.`,avgCostHintMissing:`Average cost per message when providers report costs. Cost data is missing for some or all sessions in this range.`,acrossMessages:`Across {count} messages`,sessions:`Sessions`,sessionsHint:`Distinct sessions in the range.`,sessionsInRange:`of {count} in range`,throughput:`Throughput`,throughputHint:`Throughput shows tokens per minute over active time. Higher is better.`,tokensPerMinute:`tok/min`,perMinute:`/ min`,errorRate:`Error Rate`,errorHint:`Error rate = errors / total messages. Lower is better.`,avgSession:`avg session`,cacheHitRate:`Cache Hit Rate`,cacheHint:`Cache hit rate = cache read / (input + cache read + cache write). Higher is better.`,cached:`cached`,prompt:`prompt`,calls:`calls`,costShare:`{percent}% of cost`,topModels:`Top Models`,topProviders:`Top Providers`,topTools:`Top Tools`,topAgents:`Top Agents`,topChannels:`Top Channels`,peakErrorDays:`Peak Error Days`,peakErrorHours:`Peak Error Hours`,noModelData:`No model data`,noProviderData:`No provider data`,noToolCalls:`No tool calls`,noAgentData:`No agent data`,noChannelData:`No channel data`,noErrorData:`No error data`},sessions:{title:`Sessions`,shown:`{count} shown`,total:`{count} total`,avg:`avg`,all:`All`,recent:`Recently viewed`,recentShort:`Recent`,sort:`Sort`,ascending:`Ascending`,descending:`Descending`,clearSelection:`Clear Selection`,noRecent:`No recent sessions`,noneInRange:`No sessions in range`,more:`+{count} more`,selected:`Selected ({count})`,copy:`Copy`,limitReached:`Showing first 1,000 sessions. Narrow date range for complete results.`},mosaic:{title:`Activity by Time`,subtitleEmpty:`Estimates require session timestamps.`,subtitle:`Estimated from session spans (first/last activity). Time zone: {zone}.`,noTimelineData:`No timeline data yet.`,dayOfWeek:`Day of Week`,midnight:`Midnight`,fourAm:`4am`,eightAm:`8am`,noon:`Noon`,fourPm:`4pm`,eightPm:`8pm`,legend:`Low → High token density`,sun:`Sun`,mon:`Mon`,tue:`Tue`,wed:`Wed`,thu:`Thu`,fri:`Fri`,sat:`Sat`}}},Rt=Object.assign(()=>{let{overview:e,...t}=Lt.usage;Object.assign(g.usage,t),Object.assign(g.usage.overview,e)},{catalog:Lt})})))()}function Bt(e){return Math.round(e/un)}function q(e){return E(e,{thousandsSuffix:`K`,trimTrailingZero:!1})}function Vt(e,t=2){return`$${e.toFixed(t)}`}function Ht(e){return new Date(Date.UTC(1970,0,1,e)).toLocaleTimeString(void 0,{hour:`numeric`,timeZone:`UTC`})}function Ut(e,t,n){let r=e.usage;if(!r)return!1;let i=r.firstActivity??e.updatedAt,a=r.lastActivity??e.updatedAt;if(!i||!a)return!1;let o=Math.min(i,a),s=Math.max(i,a);if(o===s){let e=new Date(o);return n({usage:r,hour:Gt(e,t),weekday:Kt(e,t),share:1}),!0}let c=s-o,l=o;for(;l<s;){let e=new Date(l),i=Math.min(Yt(e,t),s);n({usage:r,hour:Gt(e,t),weekday:Kt(e,t),share:(i-l)/c}),l=i}return!0}function Wt(e,n){let r=Array.from({length:24},()=>0),i=Array.from({length:24},()=>0);for(let t of e){let e=t.usage;if(!e?.messageCounts||e.messageCounts.total===0)continue;let a=e.messageCounts;if(e.utcQuarterHourMessageCounts&&e.utcQuarterHourMessageCounts.length>0){let t={utcDateKey:void 0,utcWeekday:null,utcStartMs:0};for(let a of e.utcQuarterHourMessageCounts){let e=Jt(a.date,a.quarterIndex,n,t);e&&(r[e.hour]=(r[e.hour]??0)+a.errors,i[e.hour]=(i[e.hour]??0)+a.total)}continue}Ut(t,n,({hour:e,share:t})=>{r[e]=(r[e]??0)+(a.errors??0)*t,i[e]=(i[e]??0)+a.total*t})}return i.map((e,t)=>{let n=r[t]??0;return{hour:t,rate:e>0?n/e:0,errors:n,msgs:e}}).filter(e=>e.msgs>0&&e.errors>0).toSorted((e,t)=>t.rate-e.rate).slice(0,5).map(e=>({label:Ht(e.hour),value:`${(e.rate*100).toFixed(2)}%`,sub:`${Math.round(e.errors)} ${t(f(`usage.overview.errors`))} · ${Math.round(e.msgs)} ${f(`usage.overview.messagesAbbrev`)}`}))}function Gt(e,t){return t===`utc`?e.getUTCHours():e.getHours()}function Kt(e,t){return t===`utc`?e.getUTCDay():e.getDay()}function qt(e,t){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!n||!Number.isInteger(t)||t<0||t>95)return null;let[,r,i,a]=n,o=Number(r),s=Number(i),c=Number(a),l=new Date(Date.UTC(o,s-1,c,0,t*15));return Number.isNaN(l.valueOf())||l.getUTCFullYear()!==o||l.getUTCMonth()!==s-1||l.getUTCDate()!==c?null:l}function Jt(e,t,n,r){if(!Number.isInteger(t)||t<0||t>95)return null;if(e!==r.utcDateKey){r.utcDateKey=e;let t=qt(e,0);r.utcWeekday=t?t.getUTCDay():null,r.utcStartMs=t?t.getTime():0}if(r.utcWeekday===null)return null;let i=n===`local`?new Date(r.utcStartMs+t*9e5):null;return{hour:i?Gt(i,n):Math.floor((t+0)/4),weekday:i?Kt(i,n):r.utcWeekday}}function Yt(e,t){let n=e.getTime(),r=t===`utc`?e.getUTCMinutes():e.getMinutes(),i=t===`utc`?e.getUTCSeconds():e.getSeconds(),a=n+(60-r)*6e4-i*1e3-e.getMilliseconds();if(t===`utc`||new Date(a-1).getTimezoneOffset()===e.getTimezoneOffset())return a;let o=e.getTimezoneOffset(),s=n+1,c=a-1;for(;s<c;){let e=s+Math.floor((c-s)/2);new Date(e).getTimezoneOffset()===o?s=e+1:c=e}return s}function Xt(e,t,n){let r=e.usage?.utcQuarterHourTokenUsage;if(!r||r.length===0)return!1;let i=!1,a={utcDateKey:void 0,utcWeekday:null,utcStartMs:0};for(let e of r){if(e.totalTokens<=0)continue;let r=Jt(e.date,e.quarterIndex,t,a);if(r&&(i=!0,n({hour:r.hour,weekday:r.weekday,tokens:e.totalTokens})===!1))break}return i}function Zt(e,t,n){let r=e.usage,i=r?.firstActivity??e.updatedAt,a=r?.lastActivity??e.updatedAt;if(!i||!a)return!1;let o=Math.min(i,a),s=Math.max(i,a),c=o;for(;c<=s;){let e=new Date(c),r=Gt(e,n);if(t.includes(r))return!0;if(c===s)break;c=Math.min(Yt(e,n),s)}return!1}function Qt(e,t,n){if(t.length===0)return!0;let r=!1;return Xt(e,n,({hour:e})=>(r=t.includes(e),!r))?r:Zt(e,t,n)}function $t(e,t){let n=Array.from({length:24},()=>0),r=Array.from({length:7},()=>0),i=0,a=!1;for(let o of e){let e=o.usage;if(!(!e||!e.totalTokens||e.totalTokens<=0)){if(i+=e.totalTokens,Xt(o,t,({hour:e,weekday:t,tokens:i})=>{n[e]=(n[e]??0)+i,r[t]=(r[t]??0)+i})){a=!0;continue}Ut(o,t,({usage:e,hour:t,weekday:i,share:a})=>{n[t]=(n[t]??0)+e.totalTokens*a,r[i]=(r[i]??0)+e.totalTokens*a})&&(a=!0)}}let o=[f(`usage.mosaic.sun`),f(`usage.mosaic.mon`),f(`usage.mosaic.tue`),f(`usage.mosaic.wed`),f(`usage.mosaic.thu`),f(`usage.mosaic.fri`),f(`usage.mosaic.sat`)].map((e,t)=>({label:e,tokens:r[t]??0}));return{hasData:a,totalTokens:i,hourTotals:n,weekdayTotals:o}}function en(e,n,r,i){let a=$t(e,n);if(!a.hasData)return ve({title:f(`usage.mosaic.title`),description:f(`usage.mosaic.subtitleEmpty`),actions:H`
          <div class="usage-mosaic-total">
            ${q(0)} ${t(f(`usage.metrics.tokens`))}
          </div>
        `},H`
        <div class="usage-panel usage-mosaic">
          <div class="usage-empty-block usage-empty-block--compact">
            ${f(`usage.mosaic.noTimelineData`)}
          </div>
        </div>
      `);let o=Math.max(...a.hourTotals,1),s=Math.max(...a.weekdayTotals.map(e=>e.tokens),1);return ve({title:f(`usage.mosaic.title`),description:f(`usage.mosaic.subtitle`,{zone:f(n===`utc`?`usage.filters.timeZoneUtc`:`usage.filters.timeZoneLocal`)}),actions:H`
        <div class="usage-mosaic-total">
          ${q(a.totalTokens)}
          ${t(f(`usage.metrics.tokens`))}
        </div>
      `},H`
      <div class="usage-panel usage-mosaic">
        <div class="usage-mosaic-grid">
          <div class="usage-mosaic-section">
            <div class="usage-mosaic-section-title">${f(`usage.mosaic.dayOfWeek`)}</div>
            <div class="usage-daypart-grid">
              ${a.weekdayTotals.map(e=>{let t=Math.min(e.tokens/s,1),n=e.tokens>0?`color-mix(in srgb, var(--accent) ${(12+t*60).toFixed(1)}%, transparent)`:`transparent`;return H`
                  <div class="usage-daypart-cell" style="background: ${n};">
                    <div class="usage-daypart-label">${e.label}</div>
                    <div class="usage-daypart-value">${q(e.tokens)}</div>
                  </div>
                `})}
            </div>
          </div>
          <div class="usage-mosaic-section">
            <div class="usage-mosaic-section-title">
              <span>${f(`usage.filters.hours`)}</span>
              <span class="usage-mosaic-sub">0 → 23</span>
            </div>
            <div class="usage-hour-grid">
              ${a.hourTotals.map((e,n)=>{let a=Math.min(e/o,1),s=e>0?`color-mix(in srgb, var(--accent) ${(8+a*70).toFixed(1)}%, transparent)`:`transparent`,c=`${n}:00 · ${q(e)} ${t(f(`usage.metrics.tokens`))}`,l=a>.7?`color-mix(in srgb, var(--accent) 60%, transparent)`:`color-mix(in srgb, var(--accent) 24%, transparent)`,u=r.includes(n);return H`
                  <button
                    type="button"
                    class="usage-hour-cell ${u?`selected`:``}"
                    style="background: ${s}; border-color: ${l};"
                    title="${c}"
                    aria-label=${c}
                    aria-pressed=${u?`true`:`false`}
                    @click=${e=>i(n,e.shiftKey)}
                  ></button>
                `})}
            </div>
            <div class="usage-hour-labels">
              <span>${f(`usage.mosaic.midnight`)}</span>
              <span>${f(`usage.mosaic.fourAm`)}</span>
              <span>${f(`usage.mosaic.eightAm`)}</span>
              <span>${f(`usage.mosaic.noon`)}</span>
              <span>${f(`usage.mosaic.fourPm`)}</span>
              <span>${f(`usage.mosaic.eightPm`)}</span>
            </div>
            <div class="usage-hour-legend">
              <span></span>
              ${f(`usage.mosaic.legend`)}
            </div>
          </div>
        </div>
      </div>
    `)}function tn(e,t=`local`){let n=t===`utc`?e.getUTCFullYear():e.getFullYear(),r=(t===`utc`?e.getUTCMonth():e.getMonth())+1,i=t===`utc`?e.getUTCDate():e.getDate();return`${n}-${String(r).padStart(2,`0`)}-${String(i).padStart(2,`0`)}`}function nn(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let[,n,r,i]=t,a=Number(n),o=Number(r)-1,s=Number(i),c=new Date(a,o,s);return Number.isNaN(c.valueOf())||c.getFullYear()!==a||c.getMonth()!==o||c.getDate()!==s?null:c}function rn(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let n=Number(t[1]),r=Number(t[2]),i=Number(t[3]),a=Date.UTC(n,r-1,i),o=new Date(a);return o.getUTCFullYear()!==n||o.getUTCMonth()!==r-1||o.getUTCDate()!==i?null:a/dn}function an(e){return new Date(e*dn).toISOString().slice(0,10)}function on(e){let t=nn(e);return t?t.toLocaleDateString(void 0,{month:`short`,day:`numeric`}):e}function sn(e){let t=nn(e);return t?t.toLocaleDateString(void 0,{month:`long`,day:`numeric`,year:`numeric`}):e}function cn(e,t,n){let r=rn(t),i=rn(n);if(r===null||i===null||r>i)return null;let a=Tt();for(let t of e){let e=rn(t.date);e!==null&&e>=r&&e<=i&&Et(a,t)}return{days:i-r+1,startDate:t,endDate:n,totals:a}}function ln(e,t,n,r=[1,7,30,90]){let i=rn(t),a=rn(n);if(i===null||a===null||i>a)return[];let o=a-i+1;return Array.from(new Set(r.map(e=>Math.max(1,Math.trunc(e))))).filter(e=>e<o).toSorted((e,t)=>e-t).map(t=>cn(e,an(a-t+1),n)).filter(e=>e!==null)}var un,dn,fn,pn;function mn(){return(mn=e((()=>{L(),It(),Se(),C(),zt(),M(),Rt(),un=4,dn=864e5,fn=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};let n=Ft();for(let t of e)n.add(t);return n.finish()},pn=(e,t,n)=>{let r=0,i=0;for(let t of e){let e=t.usage?.durationMs??0;e>0&&(r+=e,i+=1)}let a=i?r/i:0,o=t&&r>0?t.totalTokens/(r/6e4):void 0,s=t&&r>0?t.totalCost/(r/6e4):void 0,c=n.messages.total?n.messages.errors/n.messages.total:0,l;for(let e of n.daily){if(e.messages<=0||e.errors<=0)continue;let t={date:e.date,errors:e.errors,messages:e.messages,rate:e.errors/e.messages};(!l||t.rate>l.rate||t.rate===l.rate&&t.errors>l.errors)&&(l=t)}return{durationSumMs:r,durationCount:i,avgDurationMs:a,throughputTokensPerMin:o,throughputCostPerMin:s,errorRate:c,peakErrorDay:l}}})))()}function hn(e){return/^[ \t\r\n]*[=+\-@\uFF0B\uFF0D\uFF1D\uFF20]/u.test(e)?`'${e}`:e}function gn(e,t=!0){let n=t?hn(e):e;return/[",\r\n]/.test(n)?`"${n.replaceAll(`"`,`""`)}"`:n}function _n(e){return e.map(e=>e==null?``:gn(String(e),typeof e==`string`)).join(`,`)}function J(e,t,n,r=12){for(let i of t){if(e.length>=r)break;let t=n(i);t&&!e.includes(t)&&e.push(t)}}function vn(e,t){let n={agent:[],channel:[],provider:[],model:[],tool:[]};return J(n.agent,e,e=>e.agentId,6),J(n.channel,e,e=>e.channel),J(n.provider,e,e=>e.modelProvider),J(n.provider,e,e=>e.providerOverride),J(n.provider,t?.byProvider??[],e=>e.provider),J(n.model,e,e=>e.model),J(n.model,t?.byModel??[],e=>e.model),J(n.tool,t?.tools.tools??[],e=>e.name),n}var yn,bn,xn,Sn,Y,Cn,wn;function Tn(){return(Tn=e((()=>{o(),_t(),yn=e=>{let t=[_n([`key`,`label`,`agentId`,`channel`,`provider`,`model`,`updatedAt`,`durationMs`,`messages`,`errors`,`toolCalls`,`inputTokens`,`outputTokens`,`cacheReadTokens`,`cacheWriteTokens`,`totalTokens`,`totalCost`])];for(let n of e){let e=n.usage;t.push(_n([n.key,n.label??``,n.agentId??``,n.channel??``,n.modelProvider??n.providerOverride??``,n.model??n.modelOverride??``,s(n.updatedAt)??``,e?.durationMs??``,e?.messageCounts?.total??``,e?.messageCounts?.errors??``,e?.messageCounts?.toolCalls??``,e?.input??``,e?.output??``,e?.cacheRead??``,e?.cacheWrite??``,e?.totalTokens??``,e?.totalCost??``]))}return t.join(`
`)},bn=e=>{let t=[_n([`date`,`inputTokens`,`outputTokens`,`cacheReadTokens`,`cacheWriteTokens`,`totalTokens`,`inputCost`,`outputCost`,`cacheReadCost`,`cacheWriteCost`,`totalCost`])];for(let n of e)t.push(_n([n.date,n.input,n.output,n.cacheRead,n.cacheWrite,n.totalTokens,n.inputCost??``,n.outputCost??``,n.cacheReadCost??``,n.cacheWriteCost??``,n.totalCost]));return t.join(`
`)},xn=(e,n)=>{let r=e.trim();if(!r)return[];let i=K(r).map(e=>e.raw).at(-1)??``,[a,o]=i.includes(`:`)?[i.slice(0,i.indexOf(`:`)),i.slice(i.indexOf(`:`)+1)]:[``,``],s=t(a),c=t(o);if(!s)return[{label:`agent:`,value:`agent:`},{label:`channel:`,value:`channel:`},{label:`provider:`,value:`provider:`},{label:`model:`,value:`model:`},{label:`tool:`,value:`tool:`},{label:`has:errors`,value:`has:errors`},{label:`has:tools`,value:`has:tools`},{label:`minTokens:`,value:`minTokens:`},{label:`maxCost:`,value:`maxCost:`}];let l=[],u=(e,n)=>{for(let r of n.slice(0,6))(!c||t(r).includes(c))&&l.push({label:`${e}:${r}`,value:`${e}:${r}`})};switch(s){case`agent`:u(`agent`,n.agent);break;case`channel`:u(`channel`,n.channel);break;case`provider`:u(`provider`,n.provider);break;case`model`:u(`model`,n.model);break;case`tool`:u(`tool`,n.tool);break;case`has`:[`errors`,`tools`,`context`,`usage`,`model`,`provider`].forEach(e=>{(!c||e.includes(c))&&l.push({label:`has:${e}`,value:`has:${e}`})})}return l},Sn=(e,t)=>{let n=e.trim();if(!n)return`${t} `;let r=K(n).map(e=>e.raw);return r[r.length-1]=t,`${r.join(` `)} `},Y=e=>t(e),Cn=(e,t)=>{let n=K(e).map(e=>e.raw).filter(e=>e!==t);return n.length?`${n.join(` `)} `:``},wn=(e,t,n)=>{let r=Y(t),i=new Map(n.map(e=>[Y(e),e])),a=[];for(let t of K(e))(Y(t.key??``)!==r||i.delete(Y(t.value)))&&a.push(t.raw);let o=[...a,...Array.from(i.values(),e=>`${t}:${e}`)];return o.length?`${o.join(` `)} `:``}})))()}function En(e,t,n){return{key:e,className:e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),labelKey:`usage.breakdown.${e}`,hintKey:t,short:n}}function Dn(e,t){return t===0?0:e/t*100}function X(e){let t=Math.abs(e);return Vt(e,t===0||t>=.01?2:t>=1e-4?4:6)}function On(e,t,n){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),n(t,e.shiftKey))}function kn(e,t,n,i,a,o,s,c){if(!(e.length>0||t.length>0||n.length>0))return F;let l=n.at(0)??``,u=n.length===1?i.find(e=>e.key===l):null,d=u?r(u.label||u.key,20)+((u.label||u.key).length>20?`…`:``):n.length===1?r(l,8)+`…`:f(`usage.filters.sessionsCount`,{count:String(n.length)}),p=u?u.label||u.key:n.length===1?l:n.join(`, `),m=e.length===1?e[0]:f(`usage.filters.daysCount`,{count:String(e.length)}),h=t.length===1?`${t[0]}:00`:f(`usage.filters.hoursCount`,{count:String(t.length)}),g=[{active:e.length>0,labelKey:`usage.filters.days`,value:m,removeKey:`usage.filters.removeDays`,onClear:a},{active:t.length>0,labelKey:`usage.filters.hours`,value:h,removeKey:`usage.filters.removeHours`,onClear:o},{active:n.length>0,labelKey:`usage.filters.session`,value:d,removeKey:`usage.filters.removeSession`,onClear:s,title:p}];return H`
    <div class="active-filters">
      ${g.filter(({active:e})=>e).map(({labelKey:e,value:t,removeKey:n,onClear:r,title:i})=>H`
            <div class="filter-chip" title=${I(i)}>
              <span class="filter-chip-label">${f(e)}: ${t}</span>
              <openclaw-tooltip .content=${f(`usage.filters.remove`)}>
                <button class="filter-chip-remove" @click=${r} aria-label=${f(n)}>
                  ×
                </button>
              </openclaw-tooltip>
            </div>
          `)}
      ${(e.length>0||t.length>0)&&n.length>0?H`
              <button class="btn btn--sm" @click=${c}>
                ${f(`usage.filters.clearAll`)}
              </button>
            `:F}
    </div>
  `}function An(e,t,n,r){let i=cn(e,t,n);if(!i||e.length===0)return F;let a=ln(e,t,n),o=tn(new Date,r),s=(e,t)=>e===1?t===o?f(`usage.presets.today`):on(t):f(`usage.costWindows.lastDays`,{count:String(e)}),c=[{label:f(`usage.costWindows.selectedRange`),summary:i,range:!0},...a.map(e=>({label:s(e.days,e.endDate),summary:e,range:!1}))];return H`
    <section class="cost-window-analysis">
      <div class="cost-window-header">
        <div>
          <div class="card-title usage-section-title">${f(`usage.costWindows.title`)}</div>
          <div class="card-sub">
            ${f(`usage.costWindows.subtitle`,{date:sn(n)})}
          </div>
        </div>
        <div class="cost-window-range-label">
          ${on(t)} – ${on(n)}
        </div>
      </div>
      <div class="cost-window-grid">
        ${c.map(({label:e,summary:t,range:n})=>{let r=t.totals.totalCost/t.days;return H`
            <div class="cost-window-card ${n?`cost-window-card--range`:``}">
              <div class="cost-window-card__label">${e}</div>
              <div class="cost-window-card__value">
                ${X(t.totals.totalCost)}
              </div>
              <div class="cost-window-card__meta">
                ${q(t.totals.totalTokens)} ${f(`usage.metrics.tokens`)} ·
                ${X(r)} ${f(`usage.costWindows.perDay`)}
              </div>
            </div>
          `})}
      </div>
    </section>
  `}function jn(e,n,r,i,a,o){if(!e.length)return H`
      <div class="daily-chart-compact">
        <div class="card-title usage-section-title">${f(`usage.daily.title`)}</div>
        <div class="usage-empty-block">${f(`usage.empty.noData`)}</div>
      </div>
    `;let s=r===`tokens`,c=e.map(e=>s?e.totalTokens:e.totalCost),l=Math.max(...c,0),d=l>0?l:s?1:1e-4,p=c.filter(e=>e>0),m=d/(p.length>0?Math.min(...p):d)>50,h=c.map(e=>{if(e<=0)return 0;let t=m?Math.sqrt(e/d):e/d;return Math.max(6,t*200)}),g=e.length>30?12:e.length>20?18:e.length>14?24:32,_=e.length<=14,v=new Set(n);return H`
    <div class="daily-chart-compact">
      <div class="daily-chart-header">
        ${_e({mode:`buttons`,variant:`accent`,ariaPressed:!1,className:`small sessions-toggle`,value:i,onChange:a,onReselect:a,options:[{value:`total`,label:f(`usage.daily.total`)},{value:`by-type`,label:f(`usage.daily.byType`)}]})}
        <div class="card-title">
          ${f(s?`usage.daily.tokensTitle`:`usage.daily.costTitle`)}
          ${m?H`<span
                  class="daily-chart-scale-badge"
                  title=${f(`usage.daily.compressedScaleHint`)}
                  aria-label=${f(`usage.daily.compressedScaleHint`)}
                  >√</span
                >`:F}
        </div>
      </div>
      <div class="daily-chart">
        <div class="daily-chart-plot">
          <div class="daily-chart-scale" aria-hidden="true">
            ${(l>0?[l,l/(m?4:2),0]:[0]).map(e=>H`<span
                  >${s?q(e):e===0?Vt(0):X(e)}</span
                >`)}
          </div>
          <div class="daily-chart-bars" style="--bar-max-width: ${g}px">
            ${e.map((n,r)=>{let a=u(h[r],`daily usage bar height`),c=v.has(n.date),l=on(n.date),d=e.length>20?String(Number.parseInt(n.date.slice(8),10)):l,p=e.length>20?`daily-bar-label daily-bar-label--compact`:`daily-bar-label`,m=i===`by-type`?Q.map(({key:e,className:t,labelKey:r})=>({value:s?n[e]:n[`${e}Cost`]??0,className:t,labelKey:r})):[],g=m.map(({value:e,labelKey:t})=>`${f(t)} ${s?q(e):X(e)}`),y=s?q(n.totalTokens):X(n.totalCost),b=sn(n.date),x=`${q(n.totalTokens)} ${t(f(`usage.metrics.tokens`))}`.trim(),S=X(n.totalCost),C=m.reduce((e,t)=>e+t.value,0)||1;return H`
                <openclaw-tooltip
                  .content=${[b,x,S,...g].join(`
`)}
                >
                  <div
                    class="daily-bar-wrapper ${c?`selected`:``}"
                    role="button"
                    tabindex="0"
                    aria-pressed=${c?`true`:`false`}
                    aria-label=${`${b}: ${x}, ${S}`}
                    @keydown=${e=>On(e,n.date,o)}
                    @click=${e=>o(n.date,e.shiftKey)}
                  >
                    ${i===`by-type`?H`
                            <div
                              class="daily-bar daily-bar--stacked"
                              style="height: ${a.toFixed(0)}px;"
                            >
                              ${m.map(({className:e,value:t})=>H`
                                  <div
                                    class="cost-segment ${e}"
                                    style="height: ${t/C*100}%"
                                  ></div>
                                `)}
                            </div>
                          `:H`
                            <div class="daily-bar" style="height: ${a.toFixed(0)}px"></div>
                          `}
                    ${_?H`<div class="daily-bar-total">${y}</div>`:H`<div
                            class="daily-bar-total daily-bar-total--placeholder"
                            aria-hidden="true"
                          ></div>`}
                    <div class="${p}">${d}</div>
                  </div>
                </openclaw-tooltip>
              `})}
          </div>
        </div>
      </div>
    </div>
  `}function Mn(e,t){let n=t===`tokens`,r=n?e.totalTokens||1:e.totalCost||0,i=Q.map(({key:t,className:i,labelKey:a})=>{let o=n?e[t]:e[`${t}Cost`]||0;return{className:i,labelKey:a,percentage:Dn(o,r),formatted:n?q(o):X(o)}});return H`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">
        ${f(n?`usage.breakdown.tokensByType`:`usage.breakdown.costByType`)}
      </div>
      <div class="cost-breakdown-bar">
        ${i.map(({className:e,labelKey:t,percentage:n,formatted:r})=>H`
            <div
              class="cost-segment ${e}"
              style="width: ${n.toFixed(1)}%"
              title="${f(t)}: ${r}"
            ></div>
          `)}
      </div>
      <div class="cost-breakdown-legend">
        ${i.map(({className:e,labelKey:t,formatted:n})=>H`
            <span class="legend-item"
              ><span class="legend-dot ${e}"></span>${f(t)} ${n}</span
            >
          `)}
      </div>
      <div class="cost-breakdown-total">
        ${f(`usage.breakdown.total`)}:
        ${n?q(e.totalTokens):X(e.totalCost)}
      </div>
    </div>
  `}function Nn(e,t,n,r){let i=[`usage-insight-card`,r?.className].filter(Boolean).join(` `),a=[r?.error?`usage-error-list`:`usage-list`,r?.listClassName].filter(Boolean).join(` `);return H`
    <div class=${i}>
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?H`<div class="muted">${n}</div>`:H`
              <div class=${a}>
                ${t.map(e=>r?.error?H`
                        <div class="usage-error-row">
                          <div class="usage-error-date">${e.label}</div>
                          <div class="usage-error-rate">${e.value}</div>
                          ${e.sub?H`<div class="usage-error-sub">${e.sub}</div>`:F}
                        </div>
                      `:H`
                        <div class="usage-list-item">
                          <span
                            >${e.agentId?Ee(e.agentId):e.label}</span
                          >
                          <span class="usage-list-value">
                            <span>${e.value}</span>
                            ${e.sub?H`<span class="usage-list-sub">${e.sub}</span>`:F}
                          </span>
                        </div>
                      `)}
              </div>
            `}
    </div>
  `}function Pn(e){let t=e.currentTarget;t instanceof HTMLElement&&t.focus()}function Z(e){let t=`usage-summary-hint-${e.hintId}`,n=[`stat`,`usage-summary-card`,e.className,e.tone?`usage-summary-card--${e.tone}`:``].filter(Boolean).join(` `),r=[`stat-value`,`usage-summary-value`,e.tone??``,e.compactValue?`usage-summary-value--compact`:``].filter(Boolean).join(` `);return H`
    <div class=${n}>
      <div class="usage-summary-title">
        ${e.title}
        <openclaw-tooltip open-on-click>
          <button
            id=${t}
            type="button"
            class="usage-summary-hint"
            aria-label=${e.title}
            @click=${Pn}
          >
            ?
          </button>
          <!-- Shared tooltips dismiss pointer activation so action buttons never
               strand one open. This hint exists only to be read, so it opts in to
               click-to-open; the click handler still normalizes browsers that do
               not focus buttons on pointer activation. -->
          <span slot="content">${e.hint}</span>
        </openclaw-tooltip>
      </div>
      <div class=${r}>${e.value}</div>
      <div class="usage-summary-sub">${e.sub}</div>
    </div>
  `}function Fn(e,n,r,i,a,o,s,c){if(!e)return F;let l=n.messages.total?Math.round(e.totalTokens/n.messages.total):0,u=n.messages.total?e.totalCost/n.messages.total:0,d=e.input+e.cacheRead+e.cacheWrite,p=d>0?e.cacheRead/d:0,m=d>0?`${(p*100).toFixed(1)}%`:f(`usage.common.emptyValue`),h=r.errorRate*100,g=r.throughputTokensPerMin===void 0?f(`usage.common.emptyValue`):`${q(Math.round(r.throughputTokensPerMin))} ${f(`usage.overview.tokensPerMinute`)}`,_=r.throughputCostPerMin===void 0?f(`usage.common.emptyValue`):`${X(r.throughputCostPerMin)} ${f(`usage.overview.perMinute`)}`,v=r.durationCount>0?ae(r.avgDurationMs)??f(`usage.common.emptyValue`):f(`usage.common.emptyValue`),y=n.daily.filter(e=>e.messages>0&&e.errors>0).map(e=>{let n=e.errors/e.messages;return{label:on(e.date),value:`${(n*100).toFixed(2)}%`,sub:`${e.errors} ${t(f(`usage.overview.errors`))} · ${e.messages} ${f(`usage.overview.messagesAbbrev`)} · ${q(e.tokens)}`,rate:n}}).toSorted((e,t)=>t.rate-e.rate).slice(0,5).map(({rate:e,...t})=>t),b=t=>a&&e.totalCost>0?f(`usage.overview.costShare`,{percent:(t/e.totalCost*100).toFixed(1)}):null,x=(e,t,n)=>[b(e),q(t),n===void 0?null:`${n} ${f(`usage.overview.messagesAbbrev`)}`].filter(e=>e!==null).join(` · `),S=n.byModel.slice(0,5).map(e=>({label:e.model??f(`usage.common.unknown`),value:X(e.totals.totalCost),sub:x(e.totals.totalCost,e.totals.totalTokens,e.count)})),C=n.byProvider.slice(0,5).map(e=>({label:e.provider??f(`usage.common.unknown`),value:X(e.totals.totalCost),sub:x(e.totals.totalCost,e.totals.totalTokens,e.count)})),w=n.tools.tools.slice(0,6).map(e=>({label:e.name,value:`${e.count}`,sub:f(`usage.overview.calls`)})),T=n.byAgent.slice(0,5).map(e=>({label:e.agentId,agentId:e.agentId,value:X(e.totals.totalCost),sub:x(e.totals.totalCost,e.totals.totalTokens)})),E=n.byChannel.slice(0,5).map(e=>({label:e.channel,value:X(e.totals.totalCost),sub:x(e.totals.totalCost,e.totals.totalTokens)})),D=[[`usage.overview.topModels`,S,`usage.overview.noModelData`],[`usage.overview.topProviders`,C,`usage.overview.noProviderData`],[`usage.overview.topTools`,w,`usage.overview.noToolCalls`],[`usage.overview.topAgents`,T,`usage.overview.noAgentData`],[`usage.overview.topChannels`,E,`usage.overview.noChannelData`]];return ve({title:f(`usage.overview.title`)},H`
      <section class="usage-panel usage-overview-card">
        <div class="usage-overview-layout">
          <div class="usage-summary-grid">
            ${Z({hintId:`messages`,title:f(`usage.overview.messages`),hint:f(`usage.overview.messagesHint`),value:n.messages.total,sub:`${n.messages.user} ${t(f(`usage.overview.user`))} · ${n.messages.assistant} ${t(f(`usage.overview.assistant`))}`,className:`usage-summary-card--hero`})}
            ${Z({hintId:`throughput`,title:f(`usage.overview.throughput`),hint:f(`usage.overview.throughputHint`),value:g,sub:_,className:`usage-summary-card--hero usage-summary-card--throughput`,compactValue:!0})}
            ${Z({hintId:`tool-calls`,title:f(`usage.overview.toolCalls`),hint:f(`usage.overview.toolCallsHint`),value:n.tools.totalCalls,sub:`${n.tools.uniqueTools} ${f(`usage.overview.toolsUsed`)}`,className:`usage-summary-card--half`})}
            ${Z({hintId:`average-tokens`,title:f(`usage.overview.avgTokens`),hint:f(`usage.overview.avgTokensHint`),value:q(l),sub:f(`usage.overview.acrossMessages`,{count:String(n.messages.total||0)}),className:`usage-summary-card--half`})}
            ${Z({hintId:`cache-hit-rate`,title:f(`usage.overview.cacheHitRate`),hint:f(`usage.overview.cacheHint`),value:m,sub:`${q(e.cacheRead)} ${f(`usage.overview.cached`)} · ${q(d)} ${f(`usage.overview.prompt`)}`,tone:p>.6?`good`:p>.3?`warn`:`bad`,className:`usage-summary-card--medium`})}
            ${Z({hintId:`error-rate`,title:f(`usage.overview.errorRate`),hint:f(`usage.overview.errorHint`),value:`${h.toFixed(2)}%`,sub:`${n.messages.errors} ${t(f(`usage.overview.errors`))} · ${v} ${f(`usage.overview.avgSession`)}`,tone:h>5?`bad`:h>1?`warn`:`good`,className:`usage-summary-card--medium`})}
            ${Z({hintId:`average-cost`,title:f(`usage.overview.avgCost`),hint:f(i?`usage.overview.avgCostHintMissing`:`usage.overview.avgCostHint`),value:X(u),sub:`${X(e.totalCost)} ${t(f(`usage.breakdown.total`))}`,className:`usage-summary-card--compact`})}
            ${Z({hintId:`sessions`,title:f(`usage.overview.sessions`),hint:f(`usage.overview.sessionsHint`),value:s,sub:f(`usage.overview.sessionsInRange`,{count:String(c)}),className:`usage-summary-card--compact`})}
            ${Z({hintId:`errors`,title:f(`usage.overview.errors`),hint:f(`usage.overview.errorsHint`),value:n.messages.errors,sub:`${n.messages.toolResults} ${f(`usage.overview.toolResults`)}`,className:`usage-summary-card--compact`})}
          </div>
          <div class="usage-insights-grid">
            ${D.map(([e,t,n])=>Nn(f(e),t,f(n)))}
            ${Nn(f(`usage.overview.peakErrorDays`),y,f(`usage.overview.noErrorData`),{error:!0})}
            ${Nn(f(`usage.overview.peakErrorHours`),o,f(`usage.overview.noErrorData`),{error:!0,className:`usage-insight-card--wide`,listClassName:`usage-error-list--hours`})}
          </div>
        </div>
      </section>
    `)}function In(e,n,r,i,a,o,s,c,l,u,d,p,m,h,g){let _=e=>m.includes(e),v=_(`agent`)||new Set(e.map(e=>e.agentId)).size>1,y=e=>{let t=e.label||e.key;return t.startsWith(`agent:`)&&t.includes(`?token=`)?t.slice(0,t.indexOf(`?token=`)):t},b=e=>[_(`channel`)&&e.channel&&`channel:${e.channel}`,_(`provider`)&&(e.modelProvider||e.providerOverride)&&`provider:${e.modelProvider??e.providerOverride}`,_(`model`)&&e.model&&`model:${e.model}`,_(`messages`)&&e.usage?.messageCounts&&`msgs:${e.usage.messageCounts.total}`,_(`tools`)&&e.usage?.toolUsage&&`tools:${e.usage.toolUsage.totalCalls}`,_(`errors`)&&e.usage?.messageCounts&&`errors:${e.usage.messageCounts.errors}`,_(`duration`)&&e.usage?.durationMs&&`dur:${ae(e.usage.durationMs)??`—`}`].filter(e=>typeof e==`string`&&e.length>0),x=new Set(r),S=e.map(e=>{let t=e.usage,n=t?.totalTokens??0,r=t?.totalCost??0,o=x.size>0?t?.dailyBreakdown:void 0;if(o?.length){n=0,r=0;for(let e of o)x.has(e.date)&&(n+=e.tokens,r+=e.cost)}let s;switch(a){case`recent`:s=e.updatedAt??0;break;case`messages`:s=t?.messageCounts?.total??0;break;case`errors`:s=t?.messageCounts?.errors??0;break;case`cost`:s=r;break;case`tokens`:s=n}return{session:e,displayLabel:y(e),value:i?n:r,sortValue:s}}).toSorted((e,t)=>{let n=t.sortValue-e.sortValue;if(n!==0)return n;let r=(t.session.updatedAt??0)-(e.session.updatedAt??0);return r===0?e.displayLabel.localeCompare(t.displayLabel):r}),C=o===`asc`?S.toReversed():S,w=C.reduce((e,t)=>e+t.value,0),T=C.length?w/C.length:0,E=C.reduce((e,t)=>e+(t.session.usage?.messageCounts?.errors??0),0),D=(e,t,n)=>{let{session:r,value:a,displayLabel:o}=e,s=b(r);return H`
      <div
        class="session-bar-row ${t?`selected`:``}"
        @click=${e=>{e.target?.closest(`button`)||l(r.key,e.shiftKey,n)}}
        title="${r.key}"
      >
        <button
          type="button"
          class="session-bar-selection"
          aria-label=${o}
          aria-pressed=${t?`true`:`false`}
          @click=${e=>l(r.key,e.shiftKey,n)}
        >
          <span class="session-bar-label">
            <span class="session-bar-title">${o}</span>
            ${v&&r.agentId?Ee(r.agentId):F}
            ${s.length>0?H`<span class="session-bar-meta">${s.join(` · `)}</span>`:F}
          </span>
        </button>
        <div class="session-bar-actions">
          <button
            type="button"
            class="btn btn--sm btn--ghost"
            @click=${e=>{e.stopPropagation(),me(e,o,f(`usage.sessions.copy`))}}
          >
            <span data-copy-label>${f(`usage.sessions.copy`)}</span>
          </button>
          <div class="session-bar-value">
            ${i?q(a):X(a)}
          </div>
        </div>
      </div>
    `},O=new Set(n),k=C.filter(e=>O.has(e.session.key)),A=k.length,j=new Map(C.map(e=>[e.session.key,e])),M=s.map(e=>j.get(e)).filter(e=>e!==void 0),N=c===`recent`?M:C.slice(0,50),P=e=>{let t=e.map(e=>e.session.key);return e.map(e=>D(e,O.has(e.session.key),t))};return ve({title:f(`usage.sessions.title`)},H`
      <div class="usage-panel sessions-card">
        <div class="sessions-card-header">
          <div class="sessions-card-count">
            ${f(`usage.sessions.shown`,{count:String(N.length)})}
            ${h===N.length?``:` · ${f(`usage.sessions.total`,{count:String(h)})}`}
          </div>
        </div>
        <div class="sessions-card-meta">
          <div class="sessions-card-stats">
            <span>
              ${i?q(T):X(T)}
              ${f(`usage.sessions.avg`)}
            </span>
            <span
              >${E} ${t(f(`usage.overview.errors`))}</span
            >
          </div>
          ${_e({mode:`buttons`,variant:`accent`,ariaPressed:!1,className:`small`,value:c,onChange:p,onReselect:p,options:[{value:`all`,label:f(`usage.sessions.all`)},{value:`recent`,label:f(`usage.sessions.recent`)}]})}
          <label class="sessions-sort">
            <span>${f(`usage.sessions.sort`)}</span>
            <select
              class="settings-select"
              @change=${e=>u(e.target.value)}
            >
              ${Object.entries({cost:`usage.metrics.cost`,errors:`usage.overview.errors`,messages:`usage.overview.messages`,recent:`usage.sessions.recentShort`,tokens:`usage.metrics.tokens`}).map(([e,t])=>H`<option value=${e} ?selected=${a===e}>
                    ${f(t)}
                  </option>`)}
            </select>
          </label>
          <openclaw-tooltip
            .content=${f(o===`desc`?`usage.sessions.descending`:`usage.sessions.ascending`)}
          >
            <button
              class="btn btn--sm"
              aria-label=${f(o===`desc`?`usage.sessions.descending`:`usage.sessions.ascending`)}
              @click=${()=>d(o===`desc`?`asc`:`desc`)}
            >
              ${o===`desc`?`↓`:`↑`}
            </button>
          </openclaw-tooltip>
          ${A>0?H`
                  <button class="btn btn--sm" @click=${g}>
                    ${f(`usage.sessions.clearSelection`)}
                  </button>
                `:F}
        </div>
        ${c===`recent`?N.length===0?H` <div class="usage-empty-block">${f(`usage.sessions.noRecent`)}</div> `:H`
                  <div class="session-bars session-bars--recent">
                    ${P(N)}
                  </div>
                `:N.length===0?H` <div class="usage-empty-block">${f(`usage.sessions.noneInRange`)}</div> `:H`
                  <div class="session-bars">
                    ${P(N)}
                    ${e.length>N.length?H`
                            <div class="usage-more-sessions">
                              ${f(`usage.sessions.more`,{count:String(e.length-N.length)})}
                            </div>
                          `:F}
                  </div>
                `}
        ${A>1?H`
                <div class="sessions-selected-group">
                  <div class="sessions-card-count">
                    ${f(`usage.sessions.selected`,{count:String(A)})}
                  </div>
                  <div class="session-bars session-bars--selected">
                    ${P(k)}
                  </div>
                </div>
              `:F}
      </div>
    `)}var Q;function Ln(){return(Ln=e((()=>{l(),L(),R(),De(),xe(),Se(),C(),ne(),se(),mn(),Q=[En(`output`,`usage.details.assistantOutputTokens`,`Out`),En(`input`,`usage.details.userToolInputTokens`,`In`),En(`cacheWrite`,`usage.details.tokensWrittenToCache`,`CW`),En(`cacheRead`,`usage.details.tokensReadFromCache`,`CR`)]})))()}function Rn(e,t){return t>0?e/t*100:0}function zn(e){return e<0xe8d4a51000?e*1e3:e}function Bn(e,t,n){let r=Number(e.slice(0,4)),i=Number(e.slice(5,7))-1,a=Number(e.slice(8,10))+n;return t===`utc`?Date.UTC(r,i,a):new Date(r,i,a).getTime()}function Vn(e,t,n){if(!(e.timestamp>0))return!0;let r=zn(e.timestamp);return r>=Math.min(t,n)&&r<=Math.max(t,n)}function Hn(e,n,r){return pe({status:e,errorMessage:e.error?f(`usage.details.loadFailed`,{detail:t(f(n)),error:e.error}):void 0,className:`usage-callout usage-detail-error--${r}`})}function Un(e,n,r){let i=n||e.usage;if(!i)return H` <div class="usage-empty-block">${f(`usage.details.noUsageData`)}</div> `;let a=e=>e?k(e):f(`usage.common.emptyValue`),o=r!==void 0,s=r?.filter(e=>e.timestamp>0),c=o?s?.length?s.reduce((e,{role:t})=>((t===`user`||t===`assistant`)&&(e[t]+=1,e.total+=1),e),{total:0,user:0,assistant:0}):void 0:i.messageCounts,l=[e.channel&&`channel:${e.channel}`,e.agentId&&`agent:${e.agentId}`,(e.modelProvider||e.providerOverride)&&`provider:${e.modelProvider??e.providerOverride}`,e.model&&`model:${e.model}`].filter(Boolean),u=i.toolUsage?.tools.slice(0,6)??[],d;if(s?.length){d=new Map;for(let e of s.filter(({role:e})=>e===`assistant`))for(let[t,n]of et(e.content).tools)d.set(t,(d.get(t)??0)+n)}let p=u.map(e=>({label:e.name,value:`${d?d.get(e.name)??0:o?f(`usage.common.emptyValue`):e.count}`,sub:f(`usage.overview.calls`)})),m=d?[...d.values()].reduce((e,t)=>e+t,0):o?f(`usage.common.emptyValue`):i.toolUsage?.totalCalls??0,h=d?d.size:o?f(`usage.common.emptyValue`):i.toolUsage?.uniqueTools??0,g=i.modelUsage?.slice(0,6).map(e=>({label:e.model??f(`usage.common.unknown`),value:Vt(e.totals.totalCost),sub:q(e.totals.totalTokens)}))??[],_=[{labelKey:`usage.overview.messages`,value:c?.total??(o?f(`usage.common.emptyValue`):0),meta:H`${o&&!c?f(`usage.common.emptyValue`):H`${c?.user??0}
            ${t(f(`usage.overview.user`))} ·
            ${c?.assistant??0}
            ${t(f(`usage.overview.assistant`))}`}${o?H`<br />${f(`usage.details.loadedIntervalMessages`)}`:F}`},{labelKey:`usage.overview.toolCalls`,value:m,meta:H`${h} ${f(`usage.overview.toolsUsed`)}`},{labelKey:`usage.overview.errors`,value:o?f(`usage.common.emptyValue`):i.messageCounts?.errors??0,meta:H`${o?f(`usage.common.emptyValue`):i.messageCounts?.toolResults??0}
      ${f(`usage.overview.toolResults`)}`},{labelKey:`usage.details.duration`,value:ae(i.durationMs)??f(`usage.common.emptyValue`),meta:H`${a(i.firstActivity)} → ${a(i.lastActivity)}`}];return H`
    ${l.length>0?H`<div class="usage-badges">
            ${l.map(e=>H`<span class="settings-row__value">${e}</span>`)}
          </div>`:F}
    <div class="session-summary-grid">
      ${_.map(({labelKey:e,value:t,meta:n})=>H`
          <div class="stat session-summary-card">
            <div class="session-summary-title">${f(e)}</div>
            <div class="stat-value session-summary-value">${t}</div>
            <div class="session-summary-meta">${n}</div>
          </div>
        `)}
    </div>
    <div class="usage-insights-grid usage-insights-grid--tight">
      ${Nn(f(`usage.overview.topTools`),p,f(`usage.overview.noToolCalls`))}
      ${Nn(f(`usage.details.modelMix`),g,f(`usage.overview.noModelData`))}
    </div>
  `}function Wn(e,t,n,r){let i=Math.min(n,r),a=Math.max(n,r),o=t.filter(e=>e.timestamp>=i&&e.timestamp<=a);if(o.length===0)return;let s=0,c=0,l={output:0,input:0,cacheWrite:0,cacheRead:0};for(let e of o){s+=e.totalTokens||0,c+=e.cost||0;for(let{key:t}of Q)l[t]+=e[t]||0}let d=u(o[0],`filtered usage first point`),f=u(o.at(-1),`filtered usage last point`);return{...e,...l,totalTokens:s,totalCost:c,durationMs:f.timestamp-d.timestamp,firstActivity:d.timestamp,lastActivity:f.timestamp,messageCounts:void 0}}function Gn(e,n,i,a,o,s,c,l,u,d,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M){let N=e.label||e.key,P=N.length>50?r(N,50)+`…`:N,I=e.usage,L=u!==null&&d!==null,R=u!==null&&d!==null&&n?.points&&I?Wn(I,n.points,u,d):void 0,z=R?{totalTokens:R.totalTokens,totalCost:R.totalCost}:{totalTokens:I?.totalTokens??0,totalCost:I?.totalCost??0},B=R?f(`usage.details.filtered`):``;return H`
    <div class="settings-group usage-panel session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">
            ${P}
            ${B?H`<span class="session-detail-indicator">${B}</span>`:F}
          </div>
        </div>
        <div class="session-detail-stats">
          ${I?H`
                  <span
                    ><strong>${q(z.totalTokens)}</strong>
                    ${t(f(`usage.metrics.tokens`))}${B}</span
                  >
                  <span
                    ><strong>${Vt(z.totalCost)}</strong
                    >${B}</span
                  >
                `:F}
        </div>
        <openclaw-tooltip .content=${f(`usage.details.close`)}>
          <button
            class="btn btn--sm btn--ghost"
            @click=${M}
            aria-label=${f(`usage.details.close`)}
          >
            ×
          </button>
        </openclaw-tooltip>
      </div>
      ${e.scope===`family`&&e.includedSessionIds?.length?H`
              <div class="usage-lineage-note">
                ${f(`usage.scope.familyIncluded`,{count:String(e.includedSessionIds.length)})}
              </div>
            `:F}
      <div class="session-detail-content">
        ${Un(e,R,L?b.hasLoaded&&v?v.filter(e=>Vn(e,u,d)):null:void 0)}
        <div class="session-detail-row">
          ${Kn(n,i,a,o,s,c,l,m,h,g,_,u,d,p)}
        </div>
        <div class="session-detail-bottom">
          ${Jn(v,y,b,x,S,C,w,T,E,D,O,L?u:null,L?d:null)}
          ${qn(k,I,A,j)}
        </div>
      </div>
    </div>
  `}function Kn(e,n,r,i,a,o,s,c,l,d,p=`local`,m,h,g){if((n||r.awaitingGateway)&&!r.hasLoaded)return H`
      <div class="session-timeseries-compact">
        <div class="usage-empty-block">${f(`usage.loading.badge`)}</div>
      </div>
    `;let _=Hn(r,`usage.details.usageOverTime`,`timeline`);if(r.error&&!r.hasLoaded)return H`
      <div class="session-timeseries-compact">
        <div class="card-title usage-section-title">${f(`usage.details.usageOverTime`)}</div>
        ${_}
      </div>
    `;if(!e||e.points.length<2)return H`
      <div class="session-timeseries-compact">
        ${_}
        <div class="usage-empty-block">${f(`usage.details.noTimeline`)}</div>
      </div>
    `;let v=e.points;if(c||l||d&&d.length>0){let t=c?Bn(c,p,0):0,n=l?Bn(l,p,1):1/0,r=d?.length?new Set(d):void 0;v=e.points.filter(e=>e.timestamp<t||e.timestamp>=n?!1:!r||r.has(tn(new Date(e.timestamp),p)))}if(v.length<2)return H`
      <div class="session-timeseries-compact">
        ${_}
        <div class="usage-empty-block">${f(`usage.details.noDataInRange`)}</div>
      </div>
    `;let y=0,b=0;v=v.map(e=>(y+=e.totalTokens,b+=e.cost,{...e,cumulativeTokens:y,cumulativeCost:b}));let x=m!=null&&h!=null,S=x?Math.min(m,h):0,C=x?Math.max(m,h):1/0,w=0,E=v.length;if(x){w=v.findIndex(e=>e.timestamp>=S),w===-1&&(w=v.length);let e=v.findIndex(e=>e.timestamp>C);E=e===-1?v.length:e}let D=x?v.slice(w,E):v,O={output:0,input:0,cacheRead:0,cacheWrite:0};for(let e of D)for(let{key:t}of Q)O[t]+=e[t];let k={top:8,right:4,bottom:14,left:30},A=400-k.left-k.right,M=100-k.top-k.bottom,N=i===`cumulative`,P=i===`per-turn`&&o===`by-type`,I=p===`utc`?{timeZone:`UTC`}:{},L=T({month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,...I},``),R=Object.values(O).reduce((e,t)=>e+t,0),z=v.map(e=>N?e.cumulativeTokens:P?e.input+e.output+e.cacheRead+e.cacheWrite:e.totalTokens),B=Math.max(...z,1),ee=A/v.length,U=Math.min(Xn,Math.max(1,ee*Yn)),W=ee-U,G=k.left+w*(U+W),te=E>=v.length?k.left+(v.length-1)*(U+W)+U:k.left+(E-1)*(U+W)+U;return H`
    <div class="session-timeseries-compact">
      <div class="timeseries-header-row">
        <div class="card-title usage-section-title">${f(`usage.details.usageOverTime`)}</div>
        <div class="timeseries-controls">
          ${x?H`
                  <div class="settings-segmented settings-segmented--accent small">
                    <button
                      class="btn btn--sm settings-segmented__btn settings-segmented__btn--active"
                      @click=${()=>g?.(null,null)}
                    >
                      ${f(`usage.details.reset`)}
                    </button>
                  </div>
                `:F}
          ${_e({mode:`buttons`,variant:`accent`,ariaPressed:!1,className:`small`,value:i,onChange:a,onReselect:a,options:[{value:`per-turn`,label:f(`usage.details.perTurn`)},{value:`cumulative`,label:f(`usage.details.cumulative`)}]})}
          ${N?F:_e({mode:`buttons`,variant:`accent`,ariaPressed:!1,className:`small`,value:o,onChange:s,onReselect:s,options:[{value:`total`,label:f(`usage.daily.total`)},{value:`by-type`,label:f(`usage.daily.byType`)}]})}
        </div>
      </div>
      ${_}
      <div class="timeseries-chart-wrapper">
        <svg viewBox="0 0 ${400} ${118}" class="timeseries-svg">
          ${[{x1:k.left,y1:k.top,x2:k.left,y2:k.top+M},{x1:k.left,y1:k.top+M,x2:400-k.right,y2:k.top+M}].map(({x1:e,y1:t,x2:n,y2:r})=>V`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="var(--border)" />`)}
          ${[{y:k.top+5,text:q(B)},{y:k.top+M,text:`0`}].map(({y:e,text:t})=>V`<text x="${k.left-4}" y="${e}" text-anchor="end" class="ts-axis-label">${t}</text>`)}
          <!-- X axis labels (first and last) -->
          ${V`
            <text x="${k.left}" y="${k.top+M+10}" text-anchor="start" class="ts-axis-label">${j(u(v[0],`time series first point`).timestamp,{hour:`2-digit`,minute:`2-digit`,...I},``)}</text>
            <text x="${400-k.right}" y="${k.top+M+10}" text-anchor="end" class="ts-axis-label">${j(u(v.at(-1),`time series last point`).timestamp,{hour:`2-digit`,minute:`2-digit`,...I},``)}</text>
          `}
          <!-- Bars -->
          ${v.map((e,n)=>{let r=u(z[n],`time series bar total`),i=k.left+n*(U+W),a=r/B*M,o=k.top+M-a,s=[L(e.timestamp),`${q(r)} ${t(f(`usage.metrics.tokens`))}`];P&&s.push(...Q.map(({key:t,short:n})=>`${n} ${q(e[t])}`));let c=s.join(` · `),l=x&&(n<w||n>=E);if(!P)return V`<rect x="${i}" y="${o}" width="${U}" height="${a}" class="ts-bar${l?` dimmed`:``}" rx="1" data-tooltip=${c} aria-label=${c}></rect>`;let d=k.top+M,p=l?` dimmed`:``;return V`
              ${Q.map(({key:t,className:n})=>{let o=e[t];if(o<=0||r<=0)return F;let s=o/r*a;return d-=s,V`<rect x="${i}" y="${d}" width="${U}" height="${s}" class="ts-bar ${n}${p}" rx="1" data-tooltip=${c} aria-label=${c}></rect>`})}
            `})}
          <!-- Selection highlight overlay (always visible between handles) -->
          ${V`
            <rect 
              x="${G}" 
              y="${k.top}" 
              width="${Math.max(1,te-G)}" 
              height="${M}" 
              fill="var(--accent)" 
              opacity="${Zn}" 
              pointer-events="none"
            />
          `}
          ${[G,te].map(e=>V`
              <line x1="${e}" y1="${k.top}" x2="${e}" y2="${k.top+M}" stroke="var(--accent)" stroke-width="0.8" opacity="0.7" />
              <rect x="${e-Qn/2}" y="${k.top+M/2-$n/2}" width="${Qn}" height="${$n}" rx="1.5" fill="var(--accent)" class="cursor-handle" />
              ${[-.7,er].map(t=>V`<line x1="${e+t}" y1="${k.top+M/2-$n/5}" x2="${e+t}" y2="${k.top+M/2+$n/5}" stroke="var(--bg)" stroke-width="0.4" pointer-events="none" />`)}
            `)}
        </svg>
        <!-- Handle drag zones (only on handles, not full chart) -->
        ${(()=>{let e=e=>t=>{if(!g)return;t.preventDefault(),t.stopPropagation();let n=t.currentTarget.closest(`.timeseries-chart-wrapper`)?.querySelector(`svg`);if(!n)return;let r=n.getBoundingClientRect(),i=r.width,a=k.left/400*i,o=(400-k.right)/400*i-a,s=e=>{let t=Math.max(0,Math.min(1,(e-r.left-a)/o));return Math.min(Math.floor(t*v.length),v.length-1)},c=e===`left`?G:te,l=r.left+c/400*i,d=t.clientX-l;document.body.style.cursor=`col-resize`;let f=t=>{let n=t.clientX-d,r=s(n),i=v[r];if(!i)return;let a=e===`left`,o=a?h??u(v.at(-1),`time series right cursor point`).timestamp:m??u(v[0],`time series left cursor point`).timestamp;g(a?Math.min(i.timestamp,o):o,a?o:Math.max(i.timestamp,o))},p=()=>{document.body.style.cursor=``,document.removeEventListener(`mousemove`,f),document.removeEventListener(`mouseup`,p)};document.addEventListener(`mousemove`,f),document.addEventListener(`mouseup`,p)};return H`
            ${[`left`,`right`].map(t=>H`<div
                class="chart-handle-zone chart-handle-${t}"
                style="left: ${((t===`left`?G:te)/400*100).toFixed(1)}%;"
                @mousedown=${e(t)}
              ></div>`)}
          `})()}
      </div>
      <div class="timeseries-summary">
        ${x?H`
                <span class="timeseries-summary__range">
                  ${f(`usage.details.turnRange`,{start:String(w+1),end:String(E),total:String(v.length)})}
                </span>
                ·
                ${j(S,{hour:`2-digit`,minute:`2-digit`,...I},``)}–${j(C,{hour:`2-digit`,minute:`2-digit`,...I},``)}
                · ${q(R)} ·
                ${Vt(D.reduce((e,t)=>e+(t.cost||0),0))}
              `:H`${v.length} ${f(`usage.overview.messagesAbbrev`)} ·
              ${q(y)} · ${Vt(b)}`}
      </div>
      ${P?H`
              <div class="timeseries-breakdown">
                <div class="card-title usage-section-title">
                  ${f(`usage.breakdown.tokensByType`)}
                </div>
                <div class="cost-breakdown-bar cost-breakdown-bar--compact">
                  ${Q.map(({key:e,className:t})=>H`
                      <div
                        class="cost-segment ${t}"
                        style="width: ${Rn(O[e],R).toFixed(1)}%"
                      ></div>
                    `)}
                </div>
                <div class="cost-breakdown-legend">
                  ${Q.map(({key:e,className:t,labelKey:n,hintKey:r})=>H`
                      <div class="legend-item" title=${f(r)}>
                        <span class="legend-dot ${t}"></span>${f(n)}
                        ${q(O[e])}
                      </div>
                    `)}
                </div>
                <div class="cost-breakdown-total">
                  ${f(`usage.breakdown.total`)}: ${q(R)}
                </div>
              </div>
            `:F}
    </div>
  `}function qn({weight:e,loading:t,status:n},r,i,a){let o=Hn(n,`usage.details.systemPromptBreakdown`,`context`);if(!e)return H`
      <div class="context-details-panel">
        ${o}
        ${n.error?F:H`<div class="usage-empty-block">
                ${f(t||n.awaitingGateway?`usage.loading.badge`:`usage.details.noContextData`)}
              </div>`}
      </div>
    `;let s=[{className:`skills`,labelKey:`usage.details.skills`,tokens:Bt(e.skills.promptChars),entries:e.skills.entries.map(({name:e,blockChars:t})=>({name:e,chars:t}))},{className:`tools`,labelKey:`usage.details.tools`,tokens:Bt(e.tools.listChars+e.tools.schemaChars),entries:e.tools.entries.map(({name:e,summaryChars:t,schemaChars:n})=>({name:e,chars:t+n}))},{className:`files`,labelKey:`usage.details.files`,tokens:Bt(e.injectedWorkspaceFiles.reduce((e,t)=>t.injectionStatus===`native_unverified`?e:e+t.injectedChars,0)),entries:e.injectedWorkspaceFiles.map(({name:e,injectedChars:t})=>({name:e,chars:t}))}].map(({className:e,labelKey:t,tokens:n,entries:r})=>({className:e,labelKey:t,tokens:n,entries:r.toSorted((e,t)=>e.chars===null?t.chars===null?0:1:t.chars===null?-1:t.chars-e.chars)})),c=[{className:`system`,labelKey:`usage.details.system`,tokens:Bt(e.systemPrompt.chars)},...s],l=c.reduce((e,{tokens:t})=>e+t,0),u=r&&r.totalTokens>0?r.input+r.cacheRead:0,d=u>0?`~${Math.min(l/u*100,100).toFixed(0)}% ${f(`usage.details.ofInput`)}`:f(`usage.details.baseContextPerMessage`),p=s.some(({entries:e})=>e.length>4);return H`
    <div class="context-details-panel">
      ${o}
      <div class="context-breakdown-header">
        <div class="card-title usage-section-title">
          ${f(`usage.details.systemPromptBreakdown`)}
        </div>
        ${p?H`<button class="btn btn--sm" @click=${a}>
                ${f(i?`usage.details.collapse`:`usage.details.expandAll`)}
              </button>`:F}
      </div>
      <p class="context-weight-desc">${d}</p>
      <div class="context-stacked-bar">
        ${c.map(({className:e,labelKey:t,tokens:n})=>H`
            <div
              class="context-segment ${e}"
              style="width: ${Rn(n,l).toFixed(1)}%"
              title="${f(t)}: ~${q(n)}"
            ></div>
          `)}
      </div>
      <div class="context-legend">
        ${c.map(({className:e,labelKey:t,tokens:n})=>H`
            <span class="legend-item"
              ><span class="legend-dot ${e}"></span>${f(e===`system`?`usage.details.systemShort`:t)}
              ~${q(n)}</span
            >
          `)}
      </div>
      <div class="context-total">
        ${f(`usage.breakdown.total`)}: ~${q(l)}
      </div>
      <div class="context-breakdown-grid">
        ${s.filter(({entries:e})=>e.length>0).map(({labelKey:e,entries:t})=>{let n=i?t:t.slice(0,4),r=t.length-n.length;return H`
              <div class="context-breakdown-card">
                <div class="context-breakdown-title">${f(e)} (${t.length})</div>
                <div class="context-breakdown-list">
                  ${n.map(({name:e,chars:t})=>H`
                      <div class="context-breakdown-item">
                        <span class="mono" title=${e}>${e}</span>
                        <span class="muted"
                          >${t===null?f(`usage.common.unknown`):`~${q(Bt(t))}`}</span
                        >
                      </div>
                    `)}
                </div>
                ${r>0?H`
                        <div class="context-breakdown-more">
                          ${f(`usage.sessions.more`,{count:String(r)})}
                        </div>
                      `:F}
              </div>
            `})}
      </div>
    </div>
  `}function Jn(e,n,r,i,a,o,s,c,l,u,d,p,m){if((n||r.awaitingGateway)&&!r.hasLoaded)return H`
      <div class="session-logs-compact">
        <div class="session-logs-header">${f(`usage.details.conversation`)}</div>
        <div class="usage-empty-block">${f(`usage.loading.badge`)}</div>
      </div>
    `;let h=Hn(r,`usage.details.conversation`,`conversation`);if(r.error&&!r.hasLoaded)return H`
      <div class="session-logs-compact">
        <div class="session-logs-header">${f(`usage.details.conversation`)}</div>
        ${h}
      </div>
    `;if(!e||e.length===0)return H`
      <div class="session-logs-compact">
        <div class="session-logs-header">${f(`usage.details.conversation`)}</div>
        ${h}
        <div class="usage-empty-block">${f(`usage.details.noMessages`)}</div>
      </div>
    `;let g=T(),_=t(o.query),v=e.map(e=>{let t=et(e.content);return{log:e,toolInfo:t,cleanContent:t.cleanContent||e.content}}),y=Array.from(new Set(v.flatMap(e=>e.toolInfo.tools.map(([e])=>e)))).toSorted((e,t)=>e.localeCompare(t)),b=p!=null&&m!=null,x=v.filter(e=>(!b||Vn(e.log,p,m))&&(o.roles.length===0||o.roles.includes(e.log.role))&&(!o.hasTools||e.toolInfo.tools.length>0)&&(o.tools.length===0||e.toolInfo.tools.some(([e])=>o.tools.includes(e)))&&(!_||t(e.cleanContent).includes(_))),S=o.roles.length>0||o.tools.length>0||o.hasTools||_||b?`${x.length} ${f(`usage.details.of`)} ${e.length}${b?` (${f(`usage.details.timelineFiltered`)})`:``}`:`${e.length}`,C=new Set(o.roles),w=new Set(o.tools);return H`
    <div class="session-logs-compact">
      <div class="session-logs-header">
        <span>
          ${f(`usage.details.conversation`)}
          <span class="session-logs-header-count">
            (${S} ${t(f(`usage.overview.messages`))})
          </span>
        </span>
        <button class="btn btn--sm" @click=${a}>
          ${f(i?`usage.details.collapseAll`:`usage.details.expandAll`)}
        </button>
      </div>
      ${h}
      <div class="usage-filters-inline session-log-filters">
        <select
          multiple
          size="4"
          aria-label=${f(`usage.details.filterByRole`)}
          @change=${e=>s(Array.from(e.target.selectedOptions).map(e=>e.value))}
        >
          ${[[`user`,`usage.overview.user`],[`assistant`,`usage.overview.assistant`],[`tool`,`usage.details.tool`],[`toolResult`,`usage.details.toolResult`]].map(([e,t])=>H`<option value=${e} ?selected=${C.has(e)}>
                ${f(t)}
              </option>`)}
        </select>
        <select
          multiple
          size="4"
          aria-label=${f(`usage.details.filterByTool`)}
          @change=${e=>c(Array.from(e.target.selectedOptions).map(e=>e.value))}
        >
          ${y.map(e=>H`<option value=${e} ?selected=${w.has(e)}>${e}</option>`)}
        </select>
        <label class="usage-filters-inline session-log-has-tools">
          <input
            type="checkbox"
            .checked=${o.hasTools}
            @change=${e=>l(e.target.checked)}
          />
          ${f(`usage.details.hasTools`)}
        </label>
        <input
          type="text"
          placeholder=${f(`usage.details.searchConversation`)}
          aria-label=${f(`usage.details.searchConversation`)}
          .value=${o.query}
          @input=${e=>u(e.target.value)}
        />
        <button class="btn btn--sm" @click=${d}>${f(`usage.filters.clear`)}</button>
      </div>
      <div class="session-logs-list">
        ${x.map(e=>{let{log:t,toolInfo:n,cleanContent:r}=e,a=t.role===`user`?`user`:`assistant`,o=t.role===`user`?f(`usage.details.you`):t.role===`assistant`?f(`usage.overview.assistant`):f(`usage.details.tool`);return H`
            <div class="session-log-entry ${a}">
              <div class="session-log-meta">
                <span class="session-log-role">${o}</span>
                <span>${g(t.timestamp)}</span>
                ${t.tokens?H`<span>${q(t.tokens)}</span>`:F}
              </div>
              <div class="session-log-content">${r}</div>
              ${n.tools.length>0?H`
                      <details class="session-log-tools" ?open=${i}>
                        <summary>${n.summary}</summary>
                        <div class="session-log-tools-list">
                          ${n.tools.map(([e,t])=>H`
                              <span class="session-log-tools-pill">${e} × ${t}</span>
                            `)}
                        </div>
                      </details>
                    `:F}
            </div>
          `})}
        ${x.length===0?H`
                <div class="usage-empty-block usage-empty-block--compact">
                  ${f(`usage.details.noMessagesMatch`)}
                </div>
              `:F}
      </div>
    </div>
  `}var Yn,Xn,Zn,Qn,$n,er;function tr(){return(tr=e((()=>{l(),L(),fe(),Se(),C(),ne(),se(),M(),_t(),mn(),Ln(),Yn=.75,Xn=8,Zn=.06,Qn=5,$n=12,er=.7})))()}function nr(e){return new Date(`${e}T12:00:00Z`).getTime()}function rr(e){return new Date(e).toISOString().slice(0,10)}function ir(e){let t=e.toSorted((e,t)=>e-t),n=e=>t[Math.min(t.length-1,Math.floor(t.length*e))]??0;return[n(.25),n(.5),n(.75)]}function ar(e,t){return e<=0?0:e<t[0]?1:e<t[1]?2:e<t[2]?3:4}function or(e,t,n,r){let i=nr(n),a=Math.max(nr(t),i-363*sr),o=new Map(e.map(e=>[e.date,e.totalTokens])),s=e.filter(e=>{let t=nr(e.date);return e.totalTokens>0&&t>=a&&t<=i}).map(e=>e.totalTokens),c=s.length>0?ir(s):[0,0,0],l=a-new Date(a).getUTCDay()*sr,u=new Intl.DateTimeFormat(r,{month:`short`,timeZone:`UTC`}),d=[],f=[],p=-1;for(let e=l;e<=i;e+=7*sr){let t=[];for(let n=0;n<7;n+=1){let r=e+n*sr;if(r<a||r>i){t.push(null);continue}let s=rr(r),l=o.get(s)??0;t.push({date:s,tokens:l,level:ar(l,c)})}d.push({days:t});let r=nr(t.find(e=>e!==null)?.date??n),s=new Date(r).getUTCMonth();f.push(s===p?``:u.format(new Date(r))),p=s}return{weeks:d,monthLabels:f}}var sr;function cr(){return(cr=e((()=>{sr=864e5})))()}function lr(e){let t=pr+e.weeks.length*fr,n=new Intl.NumberFormat(void 0,{maximumFractionDigits:0}),r=new Intl.DateTimeFormat(void 0,{weekday:`short`,timeZone:`UTC`});return H`
    <svg
      class="usage-heatmap__svg"
      viewBox="0 0 ${t} ${116}"
      style="--usage-heatmap-width: ${t}px"
      role="img"
      aria-label=${f(`usage.heatmap.title`)}
    >
      ${e.monthLabels.map((e,t)=>e?V`<text class="usage-heatmap__month" x=${pr+t*fr} y="10">${e}</text>`:F)}
      ${hr.map(({row:e,utcDay:t})=>V`<text class="usage-heatmap__weekday" x=${24} y=${mr+e*fr+dr-2}>${r.format(new Date(t))}</text>`)}
      ${e.weeks.map((e,t)=>e.days.map((e,r)=>{if(!e)return F;let i=`${sn(e.date)} · ${f(`usage.heatmap.cellTokens`,{tokens:n.format(e.tokens)})}`;return V`
            <rect
              class="usage-heatmap__cell usage-heatmap__cell--l${e.level}"
              x=${pr+t*fr}
              y=${mr+r*fr}
              width=${dr}
              height=${dr}
              rx="2.5"
              data-tooltip=${i}
              aria-label=${i}
            ></rect>
          `}))}
    </svg>
  `}function ur(e,t,n){if(e.length===0)return F;let r=or(e,t,n),i=H`
    <div class="usage-heatmap__legend" aria-hidden="true">
      <span>${f(`usage.heatmap.less`)}</span>
      ${[0,1,2,3,4].map(e=>H`<span class="usage-heatmap__swatch usage-heatmap__cell--l${e}"></span>`)}
      <span>${f(`usage.heatmap.more`)}</span>
    </div>
  `;return ve({title:f(`usage.heatmap.title`),description:f(`usage.heatmap.subtitle`),actions:i},H`<div class="usage-panel usage-heatmap">${lr(r)}</div>`)}var dr,fr,pr,mr,hr;function gr(){return(gr=e((()=>{L(),Se(),C(),cr(),mn(),dr=11,fr=14,pr=30,mr=18,hr=[{row:1,utcDay:Date.UTC(2024,0,1)},{row:3,utcDay:Date.UTC(2024,0,3)},{row:5,utcDay:Date.UTC(2024,0,5)}]})))()}function _r(e){return H`
    <span class="settings-status settings-status--accent">
      <span class="usage-loading-spinner" aria-hidden="true"></span>
      ${e}
    </span>
  `}function vr(e){return H`
    <section class="settings-group usage-panel usage-empty-state">
      <div class="usage-empty-state__title">${f(`usage.empty.title`)}</div>
      <div class="card-sub usage-empty-state__subtitle">${f(`usage.empty.subtitle`)}</div>
      <div class="usage-empty-state__features">
        <span class="usage-empty-state__feature">${f(`usage.empty.featureOverview`)}</span>
        <span class="usage-empty-state__feature">${f(`usage.empty.featureSessions`)}</span>
        <span class="usage-empty-state__feature">${f(`usage.empty.featureTimeline`)}</span>
      </div>
      <div class="usage-empty-state__actions">
        <button class="btn primary" @click=${e}>${f(`common.refresh`)}</button>
      </div>
    </section>
  `}function yr(e,t,n){let r=n?H`<div class="callout warning usage-callout">${f(`usage.providerUsage.stalled`)}</div>`:t?H`<div class="callout warning usage-callout">
          ${f(`usage.providerUsage.unavailable`)}
        </div>`:F;return e.length===0?r:ve({title:f(`usage.providerUsage.title`),count:e.length,description:f(`usage.providerUsage.subtitle`)},H`
      ${r}
      <div class="usage-panel provider-usage-section">
        <div class="provider-usage-grid">
          ${e.map(e=>H`
              <article class="provider-usage-card">
                <div class="provider-usage-card__header">
                  <div>
                    <div class="provider-usage-card__name">${e.displayName}</div>
                    <div class="provider-usage-card__id">${e.provider}</div>
                  </div>
                  ${e.plan?H`<span class="provider-usage-plan">${e.plan}</span>`:F}
                </div>
                ${Le(e)}
              </article>
            `)}
        </div>
      </div>
    `)}function br(e){let{data:t,filters:n,display:r,detail:i,callbacks:a}=e,o=a.filters,s=a.display,c=a.details,l=!!(t.totals||t.sessions.length||t.costDaily.length),u=r.chartMode===`tokens`,d=n.query.trim().length>0,p=n.queryDraft.trim().length>0,m=new Set(n.selectedDays),h=new Set(n.selectedSessions),g=t.sessions.toSorted((e,t)=>{let n=u?e.usage?.totalTokens??0:e.usage?.totalCost??0;return(u?t.usage?.totalTokens??0:t.usage?.totalCost??0)-n}),_=n.agentId?g.filter(e=>Y(e.agentId??``)===Y(n.agentId??``)):g,v=n.selectedHours.length>0?_.filter(e=>Qt(e,n.selectedHours,n.timeZone)):_,y=gt(v,n.query),b=e=>m.size===0?!0:e.usage?.activityDates?.length?e.usage.activityDates.some(e=>m.has(e)):!!(e.updatedAt&&m.has(tn(new Date(e.updatedAt),n.timeZone))),x=y.sessions.filter(b),S=y.warnings,C=vn(_,t.aggregates),w=xn(n.queryDraft,C),T=K(n.queryDraft),E=e=>{let t=Y(e);return T.filter(e=>Y(e.key??``)===t).map(e=>e.value).filter(Boolean)},D=n.selectedSessions.length===1?t.sessions.find(e=>e.key===n.selectedSessions[0])??x.find(e=>e.key===n.selectedSessions[0]):null,O=h.size?y.sessions.filter(e=>h.has(e.key)):y.sessions,k=O.filter(b),A=h.size>0||d||n.selectedHours.length>0||!!n.agentId,j=A||m.size>0,M=e=>{let t=Tt();for(let n of e)n&&Et(t,n);return t},N=A?(()=>{let e=new Map;for(let t of O)for(let n of t.usage?.dailyBreakdown??[]){let t=e.get(n.date)??Tt();Et(t,n),e.set(n.date,t)}return Array.from(e,([e,t])=>({date:e,...t})).toSorted((e,t)=>e.date.localeCompare(t.date))})():t.costDaily,P=l?m.size?M(N.filter(e=>m.has(e.date))):A?M(k.map(e=>e.usage)):t.totals:null,I=k.length,L=_.length,R=j?fn(k):fn([],t.aggregates),z=t.sessionsLimitReached&&!j,B=z?M(k.map(e=>e.usage)):P,V=z?fn(k):R,ee=j?F:An(t.costDaily,n.startDate,n.endDate,n.timeZone),U=pn(k,B,V),W=t.totals!==null&&!t.loading&&!t.error&&t.sessions.length===0&&(t.totals?.totalTokens??0)===0,G=(B?.missingCostEntries??0)>0||(B?B.totalTokens>0&&B.totalCost===0&&B.input+B.output+B.cacheRead+B.cacheWrite>0:!1),te=[{label:f(`usage.presets.today`),days:1},{label:f(`usage.presets.last7d`),days:7},{label:f(`usage.presets.last30d`),days:30},{label:f(`usage.presets.last90d`),days:90},{label:f(`usage.presets.last1y`),days:365}],ne=e=>{let t=new Date,r=new Date(t);n.timeZone===`utc`?r.setUTCDate(r.getUTCDate()-(e-1)):r.setDate(r.getDate()-(e-1)),o.onStartDateChange(tn(r,n.timeZone)),o.onEndDateChange(tn(t,n.timeZone))},re=()=>{o.onStartDateChange(`1970-01-01`),o.onEndDateChange(tn(new Date,n.timeZone))},ie=(e,t,r)=>{if(r.length===0)return F;let i=E(e),a=new Set(i.map(e=>Y(e))),s=r.length>0&&r.every(e=>a.has(Y(e))),c=i.length;return H`
      <wa-dropdown
        class="usage-filter-select"
        placement="bottom-start"
        @wa-select=${t=>{t.preventDefault();let a=t.detail.item.value;if(a===`command:select-all`){o.onQueryDraftChange(wn(n.queryDraft,e,r));return}if(a===`command:clear`){o.onQueryDraftChange(wn(n.queryDraft,e,[]));return}if(a?.startsWith(`option:`)){let r=decodeURIComponent(a.slice(7));o.onQueryDraftChange(wn(n.queryDraft,e,t.detail.item.checked?[...i,r]:i.filter(e=>Y(e)!==Y(r))))}}}
      >
        <button slot="trigger" type="button" class="usage-filter-trigger">
          <span>${t}</span>
          ${c>0?H`<span class="settings-count">${c}</span>`:H` <span class="settings-count">${f(`usage.filters.all`)}</span> `}
        </button>
        <wa-dropdown-item value="command:select-all" ?disabled=${s}>
          ${f(`usage.filters.selectAll`)}
        </wa-dropdown-item>
        <wa-dropdown-item value="command:clear" ?disabled=${c===0}>
          ${f(`usage.filters.clear`)}
        </wa-dropdown-item>
        <div class="session-menu__separator" role="separator"></div>
        ${r.map(e=>{let t=a.has(Y(e));return H`
            <wa-dropdown-item
              class="usage-filter-option"
              type="checkbox"
              value=${`option:${encodeURIComponent(e)}`}
              .checked=${t}
            >
              ${e}
            </wa-dropdown-item>
          `})}
      </wa-dropdown>
    `},ae=tn(new Date);return he(H`
      <div class="usage-page">
        <section class="settings-section">
          <div class="settings-section__header">
            <h2 class="settings-section__heading">${f(`usage.filters.title`)}</h2>
            <div class="settings-section__actions">
              ${t.loading?_r(f(`usage.loading.badge`)):F}
              ${W?H`<span class="usage-query-hint">${f(`usage.empty.hint`)}</span>`:F}
            </div>
          </div>
          <div
            class="settings-group usage-panel usage-header ${r.headerPinned?`pinned`:``}"
          >
            <div class="usage-header-row">
              <div class="usage-header-metrics">
                ${P?H`
                        <span class="usage-metric-badge">
                          <strong>${q(P.totalTokens)}</strong>
                          ${f(`usage.metrics.tokens`)}
                        </span>
                        <span class="usage-metric-badge">
                          <strong>${Vt(P.totalCost)}</strong>
                          ${f(`usage.metrics.cost`)}
                        </span>
                        <span class="usage-metric-badge">
                          <strong>${I}</strong>
                          ${f(I===1?`usage.metrics.session`:`usage.metrics.sessions`)}
                        </span>
                      `:F}
                <button
                  class="btn btn--sm usage-pin-btn ${r.headerPinned?`active`:``}"
                  @click=${o.onToggleHeaderPinned}
                >
                  ${r.headerPinned?f(`usage.filters.pinned`):f(`usage.filters.pin`)}
                </button>
                <wa-dropdown
                  class="usage-export-menu"
                  placement="bottom-end"
                  @wa-select=${e=>{switch(e.detail.item.value){case`sessions-csv`:ce(`openclaw-usage-sessions-${ae}.csv`,yn(x),`text/csv;charset=utf-8`);break;case`daily-csv`:ce(`openclaw-usage-daily-${ae}.csv`,bn(N),`text/csv;charset=utf-8`);break;case`json`:s.onExportJson({totals:P,sessions:x,daily:N,aggregates:R});break;case void 0:}}}
                >
                  <button
                    slot="trigger"
                    type="button"
                    class="btn btn--sm"
                    aria-busy=${t.exporting}
                  >
                    ${t.exporting?f(`common.loading`):f(`usage.export.label`)} ▾
                  </button>
                  <wa-dropdown-item value="sessions-csv" ?disabled=${x.length===0}>
                    ${f(`usage.export.sessionsCsv`)}
                  </wa-dropdown-item>
                  <wa-dropdown-item value="daily-csv" ?disabled=${N.length===0}>
                    ${f(`usage.export.dailyCsv`)}
                  </wa-dropdown-item>
                  <wa-dropdown-item
                    value="json"
                    ?disabled=${t.exporting||t.loading||x.length===0&&N.length===0}
                  >
                    ${f(`usage.export.json`)}
                  </wa-dropdown-item>
                </wa-dropdown>
              </div>
            </div>

            <div class="usage-header-row">
              <div class="usage-controls">
                ${kn(n.selectedDays,n.selectedHours,n.selectedSessions,t.sessions,o.onClearDays,o.onClearHours,o.onClearSessions,o.onClearFilters)}
                <div class="usage-presets">
                  ${te.map(e=>H`
                      <button class="btn btn--sm" @click=${()=>ne(e.days)}>
                        ${e.label}
                      </button>
                    `)}
                  <button class="btn btn--sm" @click=${re}>
                    ${f(`usage.presets.all`)}
                  </button>
                </div>
                <div class="usage-date-range">
                  <input
                    class="usage-date-input"
                    type="date"
                    .value=${n.startDate}
                    title=${f(`usage.filters.startDate`)}
                    aria-label=${f(`usage.filters.startDate`)}
                    @change=${e=>o.onStartDateChange(e.target.value)}
                  />
                  <span class="usage-separator">${f(`usage.filters.to`)}</span>
                  <input
                    class="usage-date-input"
                    type="date"
                    .value=${n.endDate}
                    title=${f(`usage.filters.endDate`)}
                    aria-label=${f(`usage.filters.endDate`)}
                    @change=${e=>o.onEndDateChange(e.target.value)}
                  />
                </div>
                <select
                  class="usage-select"
                  title=${f(`usage.filters.timeZone`)}
                  aria-label=${f(`usage.filters.timeZone`)}
                  .value=${n.timeZone}
                  @change=${e=>o.onTimeZoneChange(e.target.value)}
                >
                  <option value="local">${f(`usage.filters.timeZoneLocal`)}</option>
                  <option value="utc">${f(`usage.filters.timeZoneUtc`)}</option>
                </select>
                ${_e({mode:`buttons`,variant:`accent`,ariaPressed:!1,value:n.scope,onChange:o.onScopeChange,onReselect:o.onScopeChange,options:[{value:`instance`,label:f(`usage.scope.instance`),title:f(`usage.scope.instanceHint`)},{value:`family`,label:f(`usage.scope.family`),title:f(`usage.scope.familyHint`)}]})}
                ${_e({mode:`buttons`,variant:`accent`,ariaPressed:!1,value:u?`tokens`:`cost`,onChange:s.onChartModeChange,onReselect:s.onChartModeChange,options:[{value:`tokens`,label:f(`usage.metrics.tokens`)},{value:`cost`,label:f(`usage.metrics.cost`)}]})}
                <button
                  class="btn btn--sm primary"
                  @click=${o.onRefresh}
                  ?disabled=${t.loading}
                >
                  ${f(`common.refresh`)}
                </button>
              </div>
            </div>

            <div class="usage-query-section">
              <div class="usage-query-bar">
                <input
                  class="usage-query-input"
                  type="text"
                  .value=${n.queryDraft}
                  placeholder=${f(`usage.query.placeholder`)}
                  @input=${e=>o.onQueryDraftChange(e.target.value)}
                  @keydown=${e=>{e.key===`Enter`&&(e.preventDefault(),o.onApplyQuery())}}
                />
                <div class="usage-query-actions">
                  <button
                    class="btn btn--sm"
                    @click=${o.onApplyQuery}
                    ?disabled=${t.loading||!p&&!d}
                  >
                    ${f(`usage.query.apply`)}
                  </button>
                  ${p||d?H`
                          <button class="btn btn--sm" @click=${o.onClearQuery}>
                            ${f(`usage.filters.clear`)}
                          </button>
                        `:F}
                  <span class="usage-query-hint">
                    ${l?d?f(`usage.query.matching`,{shown:String(x.length),total:String(L)}):f(`usage.query.inRange`,{total:String(L)}):F}
                  </span>
                </div>
              </div>
              <div class="usage-filter-row">
                ${ie(`channel`,f(`usage.filters.channel`),C.channel)}
                ${ie(`provider`,f(`usage.filters.provider`),C.provider)}
                ${ie(`model`,f(`usage.filters.model`),C.model)}
                ${ie(`tool`,f(`usage.filters.tool`),C.tool)}
                <span class="usage-query-hint">${f(`usage.query.tip`)}</span>
              </div>
              ${T.length>0?H`
                      <div class="usage-query-chips">
                        ${T.map(e=>{let t=e.raw;return H`
                            <span class="usage-query-chip">
                              ${t}
                              <openclaw-tooltip .content=${f(`usage.filters.remove`)}>
                                <button
                                  aria-label=${f(`usage.filters.remove`)}
                                  @click=${()=>o.onQueryDraftChange(Cn(n.queryDraft,t))}
                                >
                                  ×
                                </button>
                              </openclaw-tooltip>
                            </span>
                          `})}
                      </div>
                    `:F}
              ${w.length>0?H`
                      <div class="usage-query-suggestions">
                        ${w.map(e=>H`
                            <button
                              class="usage-query-suggestion"
                              @click=${()=>o.onQueryDraftChange(Sn(n.queryDraft,e.value))}
                            >
                              ${e.label}
                            </button>
                          `)}
                      </div>
                    `:F}
              ${S.length>0?H`
                      <div class="callout warning usage-callout usage-callout--tight">
                        ${S.join(` · `)}
                      </div>
                    `:F}
            </div>

            ${t.error?H`<div class="callout danger usage-callout">${t.error}</div>`:F}
            ${t.cacheRefresh===`complete`?F:H`
                    <div
                      class="callout warning usage-callout usage-cache-warning"
                      role="status"
                      aria-live="polite"
                    >
                      ${f(t.cacheRefresh===`exhausted`?`usage.cacheStatus.paused`:`usage.cacheStatus.warning`)}
                    </div>
                  `}
            ${t.sessionsLimitReached?H`
                    <div class="callout warning usage-callout">
                      ${f(`usage.sessions.limitReached`)}
                    </div>
                  `:F}
          </div>
        </section>

        ${yr(t.providerUsage,t.providerUsageUnavailable,t.providerUsageStalled)}
        ${l?W?vr(o.onRefresh):H`
                  ${Fn(B,V,U,G,n.selectedDays.length===0,Wt(k,n.timeZone),I,L)}
                  ${ur(N,n.startDate,n.endDate)}
                  ${en(k,n.timeZone,n.selectedHours,o.onSelectHour)}

                  <div class="usage-grid">
                    <div class="usage-grid-column">
                      <div class="settings-group usage-panel usage-left-card">
                        ${ee}
                        ${jn(N,n.selectedDays,r.chartMode,r.dailyChartMode,s.onDailyChartModeChange,o.onSelectDay)}
                        ${P?Mn(P,r.chartMode):F}
                      </div>
                      ${In(x,n.selectedSessions,n.selectedDays,u,r.sessionSort,r.sessionSortDir,r.recentSessions,r.sessionsTab,c.onSelectSession,s.onSessionSortChange,s.onSessionSortDirChange,s.onSessionsTabChange,r.visibleColumns,L,o.onClearSessions)}
                    </div>
                    ${D?H`<div class="usage-grid-column">
                            ${Gn(D,i.timeSeries,i.timeSeriesLoading,i.timeSeriesStatus,i.timeSeriesMode,c.onTimeSeriesModeChange,i.timeSeriesBreakdownMode,c.onTimeSeriesBreakdownChange,i.timeSeriesCursorStart,i.timeSeriesCursorEnd,c.onTimeSeriesCursorRangeChange,n.startDate,n.endDate,n.selectedDays,n.timeZone,i.sessionLogs,i.sessionLogsLoading,i.sessionLogsStatus,i.sessionLogsExpanded,c.onToggleSessionLogsExpanded,i.logFilters,c.onLogFilterRolesChange,c.onLogFilterToolsChange,c.onLogFilterHasToolsChange,c.onLogFilterQueryChange,c.onLogFilterClear,i.context,r.contextExpanded,c.onToggleContextExpanded,o.onClearSessions)}
                          </div>`:F}
                  </div>
                `:t.loading?H`<div class="usage-panel usage-loading-card">
                  <div class="usage-loading-grid">
                    <div class="skeleton usage-skeleton-block usage-skeleton-block--tall"></div>
                    <div class="skeleton usage-skeleton-block"></div>
                    <div class="skeleton usage-skeleton-block"></div>
                  </div>
                </div>`:F}
      </div>
    `,{wide:!0})}function xr(){return(xr=e((()=>{L(),Fe(),Se(),ne(),Ce(),C(),_t(),mn(),Tn(),tr(),gr(),Ln()})))()}var $,Sr;function Cr(){return(Cr=e((()=>{d(),L(),z(),U(),h(),b(),Ie(),oe(),N(),w(),Ye(),bt(),_t(),St(),Ne(),Ve(),wt(),xr(),$=class extends x{constructor(...e){super(...e),this.usageSnapshot=null,this.providerUsageSummary=null,this.providerUsageUnavailable=!1,this.providerUsageIncomplete=!1,this.usageError=null,this.usageStartDate=Xe(),this.usageEndDate=Xe(),this.usageScope=`family`,this.usageAgentId=null,this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode=`tokens`,this.usageDailyChartMode=`by-type`,this.usageTimeSeriesMode=`per-turn`,this.usageTimeSeriesBreakdownMode=`by-type`,this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogsExpanded=!1,this.usageQuery=``,this.usageQueryDraft=``,this.usageSessionSort=`recent`,this.usageSessionSortDir=`desc`,this.usageRecentSessions=[],this.usageTimeZone=`local`,this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab=`all`,this.usageVisibleColumns=[...Ct],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery=``,this.dateDebounceTimer=null,this.queryDebounceTimer=null,this.connectionEpoch={},this.routeDataInitialized=!1,this.routeDataEnabled=!0,this.refreshPolicy=new Pe({isLoading:()=>this.usageLoading,reload:e=>{this.clearDateDebounce();let t=e===`manual`&&this.usageSelectedSessions.length===1?this.usageSelectedSessions[0]:void 0;return this.loadUsage(t)},onIncompleteUsageExhausted:()=>this.requestUpdate()}),this.gateway=new ie(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.resetForClientChange(),invalidateRequests:e=>{e.snapshot.phase!==`connected`&&(this.refreshPolicy.interrupt(),this.usageRequest.cancel(),this.details.cancel(),this.usageExportRequest.cancel())},onSnapshot:e=>this.handleGatewaySnapshot(e),onPageActivation:()=>this.refreshPolicy.request(`focus`)}),this.observeAgentScope=le(e=>{this.routeDataInitialized&&this.usageAgentId!==e&&(this.usageAgentId=e,this.clearSelectionsAndDetails(),this.refreshPolicy.request(`manual`)),this.requestUpdate()}),this.usageRequest=Ge(this,{task:async([e,t],{signal:n})=>{this.refreshPolicy.beginLoad();let r=this.connectionEpoch,i=this.currentQuery;return{epoch:r,query:i,refreshSessionKey:t,snapshot:await Be(e,i,n)}},onComplete:e=>{let t=e.snapshot,n=this.isCurrentQuery(e.query);if(n&&t.ok){this.usageSnapshot={query:e.query,result:t.value.result,costSummary:t.value.costSummary},this.usageError=null;let n=this.usageSelectedSessions.length===1?this.usageSelectedSessions[0]:void 0;n&&this.details.load(n,e.refreshSessionKey===n)}else n&&!t.ok&&this.applyUsageError(t.error.cause);this.applyUsageLoadState(ze(t),e.epoch,n&&t.ok?void 0:null),this.refreshPolicy.flushPending()},onError:e=>{this.applyUsageError(e),this.applyUsageLoadState({state:`pending`},this.connectionEpoch,null),this.refreshPolicy.flushPending()}}),this.usageExportRequest=yt(this,this.gateway,()=>this.currentQuery),this.details=new Je(this,this.gateway,()=>this.currentQuery,()=>this.usageResult?.sessions??[],()=>{this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null}),this.subscriptions=new p(this).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t))}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.ensureInitialData())}disconnectedCallback(){this.subscriptions.clear(),this.clearDateDebounce(),this.clearQueryDebounce(),this.refreshPolicy.dispose(),this.usageRequest.cancel(),this.details.cancel(),this.usageExportRequest.cancel(),super.disconnectedCallback()}applyRouteData(){let e=this.routeData;if(!e||(this.routeDataInitialized=!0,!this.routeDataEnabled))return;if(!this.gateway.isRouteDataCurrent(e)){this.routeDataEnabled=!1;return}let t=this.context.agentSelection.state.scopeId;if(e.query.agentId!==t){this.usageAgentId=t,this.clearSelectionsAndDetails(),this.resetProviderUsage(),this.refreshPolicy.request(`manual`);return}this.usageStartDate=e.query.startDate,this.usageEndDate=e.query.endDate,this.usageScope=e.query.scope,this.usageTimeZone=e.query.timeZone,this.usageAgentId=e.query.agentId,this.usageSnapshot={query:this.currentQuery,result:e.result,costSummary:e.costSummary},this.applyUsageLoadState(e.providerUsage,this.connectionEpoch,e.loadedAtMs),this.usageError=e.error}ensureInitialData(){!this.routeDataEnabled&&this.routeDataInitialized&&this.gateway.client&&this.gateway.connected&&!this.usageLoading&&this.loadUsage()}resetForClientChange(){this.clearDateDebounce(),this.usageRequest.cancel(),this.routeDataInitialized&&(this.routeDataEnabled=!1),this.usageSnapshot=null,this.resetProviderUsage(),this.usageError=null,this.usageAgentId=this.context.agentSelection.state.scopeId,this.clearSelectionsAndDetails()}resetProviderUsage(){this.providerUsageSummary=null,this.providerUsageUnavailable=!1,this.providerUsageIncomplete=!1,this.refreshPolicy.resetPayload()}applyUsageLoadState(e,t,n=Date.now()){if(e.state===`settled`){let t=e.result;this.providerUsageUnavailable=!t.ok,this.providerUsageIncomplete=!t.ok||Re(t.value),t.ok&&!this.providerUsageIncomplete&&(this.providerUsageSummary=t.value)}let r=this.providerUsageIncomplete||this.usageCacheIncomplete;this.refreshPolicy.setLastLoadedAtMs(e.state===`pending`?null:n,{incomplete:r,connection:t})}get usageCacheIncomplete(){return He(this.usageResult?.cacheStatus,this.usageCostSummary?.cacheStatus)}get currentQuery(){return{startDate:this.usageStartDate,endDate:this.usageEndDate,scope:this.usageScope,timeZone:this.usageTimeZone,agentId:t(this.usageAgentId??``)||void 0}}isCurrentQuery(e){let t=this.currentQuery;return e.startDate===t.startDate&&e.endDate===t.endDate&&e.scope===t.scope&&e.timeZone===t.timeZone&&e.agentId===t.agentId}get usageResult(){return this.usageSnapshot&&this.isCurrentQuery(this.usageSnapshot.query)?this.usageSnapshot.result:null}get usageCostSummary(){return this.usageSnapshot&&this.isCurrentQuery(this.usageSnapshot.query)?this.usageSnapshot.costSummary:null}get providerUsageStalled(){return this.providerUsageIncomplete&&this.refreshPolicy.incompleteUsageExhausted}applyUsageError(e){let t=v(e);this.usageError=t?y(`usage`):Ze(e),t&&(this.usageSnapshot=null)}get usageLoading(){return!this.routeDataInitialized||this.dateDebounceTimer!==null||this.usageRequest.pending}loadUsage(e){let t=this.gateway.client;return!t||!this.gateway.connected?(this.refreshPolicy.markLoadDeferred(),Promise.resolve()):(this.routeDataEnabled=!1,this.usageError=null,this.usageRequest.run([t,e]))}clearSelections(){this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageSelectedSessions=[]}clearSelectionsAndDetails(){this.usageExportRequest.cancel(),this.clearSelections(),this.details.clear()}clearDateDebounce(){this.dateDebounceTimer!==null&&(window.clearTimeout(this.dateDebounceTimer),this.dateDebounceTimer=null)}scheduleUsageLoad(){this.clearDateDebounce(),this.usageRequest.cancel(),this.usageError=null,this.refreshPolicy.resetPayload(),this.routeDataEnabled=!1,this.dateDebounceTimer=window.setTimeout(()=>{this.dateDebounceTimer=null,this.refreshPolicy.request(`manual`)},400)}handleGatewaySnapshot(e){if(!this.gateway.connected||!this.gateway.client)return;this.context.agents.ensureList(),(e.identityChanged||e.becameConnected)&&(this.connectionEpoch={},this.routeDataInitialized&&this.refreshPolicy.request(`reconnect`));let t=this.usageSelectedSessions.length===1?this.usageSelectedSessions[0]:void 0;if(e.becameAvailable&&t)for(let e of[this.details.timeSeries,this.details.sessionLogs,this.details.contextWeight])e.recover(t,e===this.details.contextWeight)}clearQueryDebounce(){this.queryDebounceTimer!==null&&(window.clearTimeout(this.queryDebounceTimer),this.queryDebounceTimer=null)}selectSession(e,t,n){if(this.details.clear(),this.usageRecentSessions=[e,...this.usageRecentSessions.filter(t=>t!==e)].slice(0,8),this.usageSelectedSessions=$e(this.usageSelectedSessions,e,n,t),this.usageSelectedSessions.length===1){let e=this.usageSelectedSessions[0];e&&this.details.load(e)}}render(){let e=this.details.timeSeries.data,t={data:{loading:this.usageLoading,exporting:this.usageExportRequest.pending,error:this.usageError,sessions:this.usageResult?.sessions??[],agents:this.context.agents.state.agentsList?.agents.map(e=>e.id).filter(Boolean)??[],sessionsLimitReached:(this.usageResult?.sessions.length??0)>=1e3,totals:this.usageResult?.totals??null,aggregates:this.usageResult?.aggregates??null,costDaily:this.usageCostSummary?.daily??[],cacheRefresh:this.usageCacheIncomplete?this.refreshPolicy.incompleteUsageExhausted?`exhausted`:`retrying`:`complete`,providerUsage:this.providerUsageSummary?.providers??[],providerUsageStalled:this.providerUsageStalled,providerUsageUnavailable:this.providerUsageUnavailable},filters:{startDate:this.usageStartDate,endDate:this.usageEndDate,scope:this.usageScope,selectedSessions:this.usageSelectedSessions,selectedDays:this.usageSelectedDays,selectedHours:this.usageSelectedHours,agentId:this.usageAgentId,query:this.usageQuery,queryDraft:this.usageQueryDraft,timeZone:this.usageTimeZone},display:{chartMode:this.usageChartMode,dailyChartMode:this.usageDailyChartMode,sessionSort:this.usageSessionSort,sessionSortDir:this.usageSessionSortDir,recentSessions:this.usageRecentSessions,sessionsTab:this.usageSessionsTab,visibleColumns:this.usageVisibleColumns,contextExpanded:this.usageContextExpanded,headerPinned:this.usageHeaderPinned},detail:{context:{weight:this.details.contextWeight.data,loading:this.details.contextWeight.loading,status:this.details.contextWeight.status},timeSeriesMode:this.usageTimeSeriesMode,timeSeriesBreakdownMode:this.usageTimeSeriesBreakdownMode,timeSeries:e,timeSeriesLoading:this.details.timeSeries.loading,timeSeriesStatus:this.details.timeSeries.status,timeSeriesCursorStart:this.usageTimeSeriesCursorStart,timeSeriesCursorEnd:this.usageTimeSeriesCursorEnd,sessionLogs:this.details.sessionLogs.data,sessionLogsLoading:this.details.sessionLogs.loading,sessionLogsStatus:this.details.sessionLogs.status,sessionLogsExpanded:this.usageSessionLogsExpanded,logFilters:{roles:this.usageLogFilterRoles,tools:this.usageLogFilterTools,hasTools:this.usageLogFilterHasTools,query:this.usageLogFilterQuery}},callbacks:{filters:{onStartDateChange:e=>{this.usageStartDate=e,this.clearSelectionsAndDetails(),this.scheduleUsageLoad()},onEndDateChange:e=>{this.usageEndDate=e,this.clearSelectionsAndDetails(),this.scheduleUsageLoad()},onScopeChange:e=>{this.usageScope=e,this.clearSelectionsAndDetails(),this.refreshPolicy.request(`manual`)},onAgentChange:e=>{this.context.agentSelection.setScope(e)},onRefresh:()=>this.refreshPolicy.request(`manual`),onTimeZoneChange:e=>{this.usageTimeZone=e,this.clearSelectionsAndDetails(),this.refreshPolicy.request(`manual`)},onToggleHeaderPinned:()=>this.usageHeaderPinned=!this.usageHeaderPinned,onSelectHour:(e,t)=>{this.usageSelectedHours=Qe(this.usageSelectedHours,e,Array.from({length:24},(e,t)=>t),t,!0)},onQueryDraftChange:e=>{this.usageQueryDraft=e,this.clearQueryDebounce(),this.queryDebounceTimer=window.setTimeout(()=>{this.usageQuery=this.usageQueryDraft,this.queryDebounceTimer=null},250)},onApplyQuery:()=>{this.clearQueryDebounce(),this.usageQuery=this.usageQueryDraft},onClearQuery:()=>{this.clearQueryDebounce(),this.usageQueryDraft=``,this.usageQuery=``},onSelectDay:(e,t)=>{this.usageSelectedDays=Qe(this.usageSelectedDays,e,(this.usageCostSummary?.daily??[]).map(e=>e.date),t,!1)},onClearDays:()=>this.usageSelectedDays=[],onClearHours:()=>this.usageSelectedHours=[],onClearSessions:()=>{this.usageSelectedSessions=[],this.details.clear()},onClearFilters:()=>this.clearSelectionsAndDetails()},display:{onExportJson:e=>{this.usageExportRequest.run(e)},onChartModeChange:e=>this.usageChartMode=e,onDailyChartModeChange:e=>this.usageDailyChartMode=e,onSessionSortChange:e=>this.usageSessionSort=e,onSessionSortDirChange:e=>this.usageSessionSortDir=e,onSessionsTabChange:e=>this.usageSessionsTab=e,onToggleColumn:e=>{this.usageVisibleColumns=this.usageVisibleColumns.includes(e)?this.usageVisibleColumns.filter(t=>t!==e):[...this.usageVisibleColumns,e]}},details:{onToggleContextExpanded:()=>this.usageContextExpanded=!this.usageContextExpanded,onToggleSessionLogsExpanded:()=>this.usageSessionLogsExpanded=!this.usageSessionLogsExpanded,onLogFilterRolesChange:e=>{this.usageLogFilterRoles=e},onLogFilterToolsChange:e=>{this.usageLogFilterTools=e},onLogFilterHasToolsChange:e=>{this.usageLogFilterHasTools=e},onLogFilterQueryChange:e=>{this.usageLogFilterQuery=e},onLogFilterClear:()=>{this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery=``},onSelectSession:(e,t,n)=>this.selectSession(e,t,n),onTimeSeriesModeChange:e=>{this.usageTimeSeriesMode=e},onTimeSeriesBreakdownChange:e=>{this.usageTimeSeriesBreakdownMode=e},onTimeSeriesCursorRangeChange:(t,n)=>{this.details.timeSeries.data===e&&(this.usageTimeSeriesCursorStart=t,this.usageTimeSeriesCursorEnd=n)}}}};return xt(this.context,this.usageResult,br(t))}},n([i({context:W,subscribe:!0})],$.prototype,`context`,void 0),n([ee({attribute:!1})],$.prototype,`routeData`,void 0),n([B()],$.prototype,`usageSnapshot`,void 0),n([B()],$.prototype,`providerUsageSummary`,void 0),n([B()],$.prototype,`providerUsageUnavailable`,void 0),n([B()],$.prototype,`providerUsageIncomplete`,void 0),n([B()],$.prototype,`usageError`,void 0),n([B()],$.prototype,`usageStartDate`,void 0),n([B()],$.prototype,`usageEndDate`,void 0),n([B()],$.prototype,`usageScope`,void 0),n([B()],$.prototype,`usageAgentId`,void 0),n([B()],$.prototype,`usageSelectedSessions`,void 0),n([B()],$.prototype,`usageSelectedDays`,void 0),n([B()],$.prototype,`usageSelectedHours`,void 0),n([B()],$.prototype,`usageChartMode`,void 0),n([B()],$.prototype,`usageDailyChartMode`,void 0),n([B()],$.prototype,`usageTimeSeriesMode`,void 0),n([B()],$.prototype,`usageTimeSeriesBreakdownMode`,void 0),n([B()],$.prototype,`usageTimeSeriesCursorStart`,void 0),n([B()],$.prototype,`usageTimeSeriesCursorEnd`,void 0),n([B()],$.prototype,`usageSessionLogsExpanded`,void 0),n([B()],$.prototype,`usageQuery`,void 0),n([B()],$.prototype,`usageQueryDraft`,void 0),n([B()],$.prototype,`usageSessionSort`,void 0),n([B()],$.prototype,`usageSessionSortDir`,void 0),n([B()],$.prototype,`usageRecentSessions`,void 0),n([B()],$.prototype,`usageTimeZone`,void 0),n([B()],$.prototype,`usageContextExpanded`,void 0),n([B()],$.prototype,`usageHeaderPinned`,void 0),n([B()],$.prototype,`usageSessionsTab`,void 0),n([B()],$.prototype,`usageVisibleColumns`,void 0),n([B()],$.prototype,`usageLogFilterRoles`,void 0),n([B()],$.prototype,`usageLogFilterTools`,void 0),n([B()],$.prototype,`usageLogFilterHasTools`,void 0),n([B()],$.prototype,`usageLogFilterQuery`,void 0),customElements.get(`openclaw-usage-page`)||customElements.define(`openclaw-usage-page`,$),Sr={header:!0,render:e=>H`<openclaw-usage-page .routeData=${e}></openclaw-usage-page>`}})))()}Cr();export{Sr as usagePageComponent};
//# sourceMappingURL=usage-page-B4OGk2sv.js.map