import{d as v,u as g,r as p,a as f,w as k,o as i,c as o,e as s,F as C,f as b,g as x,s as c,i as y,t as l,n as B}from"./index-b89dc9f7.js";const F={class:"ts-box u-top-spaced"},L={class:"ts-table is-celled is-single-line"},N=s("thead",null,[s("tr",null,[s("th",{class:"is-collapsed"},"id"),s("th",null,"task_name"),s("th",{class:"is-collapsed"},"Status"),s("th",{class:"is-collapsed"},[x("Create At "),s("span",{class:"ts-icon is-sort-down-icon"})])])],-1),S=["onClick"],T={class:"is-center-aligned"},V={class:"is-center-aligned"},D=v({__name:"TheWorksList",props:{task:{}},setup(_){const d=_,h=g(),r=p([]),a=p([]),m={0:"pending",1:"running",2:"complete","-1":"failed"},u=()=>{r.value=c.tasks,r.value.sort((e,n)=>e.date>n.date?-1:1),a.value=c.works,d.task!=null&&(a.value=a.value.filter(({task_name:e})=>e==d.task)),a.value.sort((e,n)=>e.date>n.date?-1:1)};return f(()=>{u()}),k(c,()=>{u()}),(e,n)=>(i(),o("div",F,[s("table",L,[N,s("tbody",null,[(i(!0),o(C,null,b(a.value,t=>(i(),o("tr",{key:t.id,class:"has-cursor-pointer",onClick:z=>y(h).push({name:"work",params:{id:t.id}})},[s("td",T,l(t.id),1),s("td",null,l(t.task_name),1),s("td",{class:B(["is-center-aligned",{"is-indicated":t.status!==0,"is-positive":t.status==2,"is-negative":t.status==-1}])},l(m[t.status]),3),s("td",V,l(t.date),1)],8,S))),128))])])]))}});export{D as _};