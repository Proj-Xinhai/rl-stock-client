import{d as B,u as A,r as c,a as N,w as S,o as u,c as o,e as t,F as f,f as h,s as d,g as V,t as r,n as k,h as D,i as F}from"./index-df16e4d4.js";const L={class:"ts-box u-top-spaced"},T={class:"ts-table is-celled is-single-line"},$=["onClick"],b=["onClick"],z={class:"is-center-aligned is-collapsed"},E={class:"is-center-aligned is-collapsed"},R=B({__name:"TheWorksList",props:{task:{}},setup(g){const v=g,C=A(),y=c([]),n=c([]),a=c("Create At"),s=c(-1),x={0:"pending",1:"running",2:"complete","-1":"failed"},_=(i,m=!1)=>{m&&(a.value!=i?s.value=-1:s.value*=-1,a.value=i),n.value=n.value.slice().sort((e,l)=>e.date>l.date?s.value:-s.value).slice().sort((e,l)=>a.value=="id"?e.id>l.id?s.value:-s.value:a.value=="task_name"?e.task_name>l.task_name?s.value:-s.value:a.value=="Status"?e.status>l.status?s.value:-s.value:a.value=="Create At"?e.date>l.date?s.value:-s.value:0)},p=()=>{y.value=d.tasks,n.value=d.works,v.task!=null&&(n.value=n.value.filter(({task_name:i})=>i==v.task)),_(a.value)};return N(()=>{p()}),S(d,()=>{p()}),(i,m)=>(u(),o("div",L,[t("table",T,[t("thead",null,[t("tr",null,[(u(),o(f,null,h(["id","task_name","Status","Create At"],e=>t("th",{onClick:l=>_(e,!0)},[V(r(e)+" ",1),a.value==e?(u(),o("span",{key:0,class:k(["ts-icon",{"is-sort-down-icon":s.value==-1,"is-sort-up-icon":s.value==1}])},null,2)):D("",!0)],8,$)),64))])]),t("tbody",null,[(u(!0),o(f,null,h(n.value,e=>(u(),o("tr",{key:e.id,class:"has-cursor-pointer",onClick:l=>F(C).push({name:"work",params:{id:e.id}})},[t("td",z,r(e.id),1),t("td",null,r(e.task_name),1),t("td",{class:k(["is-center-aligned is-collapsed",{"is-indicated":e.status!==0,"is-positive":e.status==2,"is-negative":e.status==-1}])},r(x[e.status]),3),t("td",E,r(e.date),1)],8,b))),128))])])]))}});export{R as _};
