import{d as f,u as N,r as _,a as b,s as d,w as $,b as y,o as h,c as m,e as s,F as g,f as k,g as i,t as o,n as A,h as B,i as D,j as v,k as C}from"./index-b89dc9f7.js";import{_ as T,a as F,b as L}from"./TheTaskCopier.vue_vue_type_script_setup_true_lang-cb43c1d5.js";const j={class:"ts-box u-top-spaced"},z={class:"ts-table is-celled is-single-line"},E={class:"has-cursor-pointer"},M=["onClick"],P=["data-toggle","onDblclick"],R={class:"is-collapsed"},S={class:"is-collapsed"},V=["data-name"],q={class:"is-secondary is-padded is-insetted",colspan:"3"},G={class:"ts-grid"},H={class:"column"},I=s("br",null,null,-1),J=s("br",null,null,-1),K=s("br",null,null,-1),O={class:"column is-fluid is-end-aligned",style:{"white-space":"initial !important"}},Q=f({__name:"TheTasksList",setup(w){const p=N(),c=_([]),n=_("Create At"),a=_(-1),r=e=>{e!=="Create At"&&r("Create At"),n.value!==e&&(a.value=-1),n.value=e,c.value=c.value.slice().sort((l,u)=>n.value=="Name"?l.name>u.name?a.value:-a.value:n.value=="Algorithm"?l.args.algorithm>u.args.algorithm?a.value:-a.value:n.value=="Create At"?l.date>u.date?a.value:-a.value:0)};return b(()=>{c.value=d.tasks,r(n.value)}),$(d,e=>{c.value=e.tasks,r(n.value)}),(e,l)=>{const u=y("router-link");return h(),m("div",j,[s("table",z,[s("thead",null,[s("tr",E,[(h(),m(g,null,k(["Name","Algorithm","Create At"],t=>s("th",{onClick:x=>{a.value*=-1,r(t)}},[i(o(t)+" ",1),n.value==t?(h(),m("span",{key:0,class:A(["ts-icon",{"is-sort-down-icon":a.value==-1,"is-sort-up-icon":a.value==1}])},null,2)):B("",!0)],8,M)),64))])]),s("tbody",null,[(h(!0),m(g,null,k(c.value,t=>(h(),m(g,{key:t.name},[s("tr",{class:"has-cursor-pointer","data-toggle":t.name+":has-hidden",onDblclick:x=>D(p).push({name:"task",params:{name:t.name}})},[s("td",null,o(t.name),1),s("td",R,o(t.args.algorithm),1),s("td",S,o(t.date),1)],40,P),s("tr",{class:"has-hidden","data-name":t.name},[s("td",q,[s("div",G,[s("div",H,[i(" algorithm: "+o(t.args.algorithm)+" "+o(t.args.algorithm_args),1),I,i(" learn: "+o(t.args.learn_args),1),J,i(" helper: "+o(t.args.helper),1),K]),s("div",O,[v(u,{class:"ts-text is-link",to:{name:"task",params:{name:t.name}}},{default:C(()=>[i("manage")]),_:2},1032,["to"]),v(T,{"task-name":t.name,wrapper:"link"},null,8,["task-name"]),v(F,{taskName:t.name,wrapper:"link"},null,8,["taskName"]),v(L,{"task-name":t.name,wrapper:"link"},null,8,["task-name"])])])])],8,V)],64))),128))])])])}}}),U={class:"ts-grid is-relaxed is-3-columns u-top-spaced-large u-bottom-spaced-big"},W={class:"column"},X={class:"ts-box"},Y={class:"ts-content"},Z={class:"ts-statistic"},ss={class:"value",style:{display:"table-cell"}},es={class:"ts-text is-secondary is-small"},ts=s("span",{class:"ts-text is-secondary"},"/works",-1),as=s("div",{class:"symbol"},[s("span",{class:"ts-icon is-bars-progress-icon"})],-1),os={class:"column"},ns={class:"ts-box"},ls={class:"ts-content"},is={class:"ts-statistic"},cs={class:"value"},rs=s("div",{class:"symbol"},[s("span",{class:"ts-icon is-gears-icon"})],-1),ds={class:"column"},_s={class:"ts-box"},us={class:"ts-content"},hs={class:"ts-statistic"},ms={class:"value",style:{display:"table-cell"}},vs={class:"ts-text is-secondary is-negative is-small"},ps=s("span",{class:"ts-text is-secondary is-negative"},"/failed",-1),gs=s("div",{class:"symbol"},[s("span",{class:"ts-icon is-check-double-icon"})],-1),ks={class:"ts-grid is-end-aligned"},fs=s("button",{class:"ts-button"},"Create",-1),ys=f({__name:"TasksView",setup(w){const p=_(0),c=_(0),n=_(0),a=_(0),r=_(0);return b(()=>{p.value=d.tasks.length,c.value=d.works.length,n.value=d.works.filter(({status:e})=>[0,1].includes(e)).length,a.value=d.works.filter(({status:e})=>e==2).length,r.value=d.works.filter(({status:e})=>e==-1).length}),$(d,e=>{p.value=e.tasks.length,c.value=e.works.length,n.value=e.works.filter(({status:l})=>[0,1].includes(l)).length,a.value=e.works.filter(({status:l})=>l==2).length,r.value=e.works.filter(({status:l})=>l==-1).length}),(e,l)=>{const u=y("router-link");return h(),m(g,null,[s("div",U,[s("div",W,[s("div",X,[s("div",Y,[s("div",Z,[s("div",ss,[i(o(p.value)+" ",1),s("span",es,"/"+o(c.value),1)])]),i(" tasks "),ts]),as])]),s("div",os,[s("div",ns,[s("div",ls,[s("div",is,[s("div",cs,o(n.value),1)]),i(" works in progress ")]),rs])]),s("div",ds,[s("div",_s,[s("div",us,[s("div",hs,[s("div",ms,[i(o(a.value)+" ",1),s("span",vs,"/"+o(r.value),1)])]),i(" complete "),ps]),gs])])]),s("div",ks,[v(u,{to:{name:"task-create"}},{default:C(()=>[fs]),_:1})]),v(Q)],64)}}});export{ys as default};