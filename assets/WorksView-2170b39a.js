import{d as h,u as m,r as u,a as g,w as v,o as i,c as o,e as s,F as f,i as k,f as C,s as c,k as b,t as n,n as x}from"./index-cc388cc1.js";const y={class:"ts-box u-top-spaced"},B={class:"ts-table is-celled is-single-line"},V=s("thead",null,[s("tr",null,[s("th",{class:"is-collapsed"},"id"),s("th",null,"task_name"),s("th",{class:"is-collapsed"},"Status"),s("th",{class:"is-collapsed"},[C("Create At "),s("span",{class:"ts-icon is-sort-down-icon"})])])],-1),F=["onClick"],N={class:"is-center-aligned"},S={class:"is-center-aligned"},E=h({__name:"WorksView",setup(z){const _=m(),d=u([]),l=u([]),p={0:"pending",1:"running",2:"complete","-1":"failed"},r=()=>{d.value=c.tasks,d.value.sort((e,a)=>e.date>a.date?-1:1),l.value=c.works,l.value.sort((e,a)=>e.date>a.date?-1:1)};return g(()=>{r()}),v(c,()=>{r()}),(e,a)=>(i(),o("div",y,[s("table",B,[V,s("tbody",null,[(i(!0),o(f,null,k(l.value,t=>(i(),o("tr",{key:t.id,class:"has-cursor-pointer",onClick:A=>b(_).push({name:"work",params:{id:t.id}})},[s("td",N,n(t.id),1),s("td",null,n(t.task_name),1),s("td",{class:x(["is-center-aligned",{"is-indicated":t.status!==0,"is-positive":t.status==2,"is-negative":t.status==-1}])},n(p[t.status]),3),s("td",S,n(t.date),1)],8,F))),128))])])]))}});export{E as default};
