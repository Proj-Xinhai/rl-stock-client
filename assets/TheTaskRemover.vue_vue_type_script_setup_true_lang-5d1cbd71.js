import{d as p,o as i,c as r,e as a,s as l,m as k,u as _,r as v,t as d,n as m,l as h,v as b,p as f,q as g,F as y}from"./index-3e69f11c.js";const C={key:0},$={key:1},D=p({__name:"TheTaskExporter",props:{taskName:{},wrapper:{}},setup(c){const o=c,e=()=>{l.loading=!0,k.emit("export_task",o.taskName,t=>{l.loading=!1;const s=new Blob([JSON.stringify(t)],{type:"application/json"}),n=window.URL.createObjectURL(s);Object.assign(document.createElement("a"),{href:n,download:`${o.taskName}.rlstockexport`}).click(),window.URL.revokeObjectURL(n),l.loading=!1})};return(t,s)=>t.wrapper=="button"?(i(),r("div",C,[a("button",{class:"ts-button is-outlined",onClick:e},"Export")])):(i(),r("div",$,[a("a",{class:"ts-text is-link has-cursor-pointer",onClick:e},"Export")]))}}),w={key:0},N={key:1},F=p({__name:"TheTaskCopier",props:{taskName:{},wrapper:{}},setup(c){const o=c,e=_(),t=()=>{e.push({name:"task-create",query:{copy:o.taskName}})};return(s,n)=>s.wrapper=="button"?(i(),r("div",w,[a("button",{class:"ts-button is-outlined",onClick:t},"Copy")])):(i(),r("div",N,[a("a",{class:"ts-text is-link has-cursor-pointer",onClick:t},"Copy")]))}}),T={class:"ts-app-drawer is-right is-small is-visible"},R={class:"content"},B={class:"ts-content"},E={class:"ts-header is-large"},O={class:"ts-input is-underlined has-top-spaced"},U=["placeholder"],j={class:"ts-wrap is-end-aligned has-top-spaced-big"},L=p({__name:"TheConfirm",props:{title:{},message:{},accent:{default:"positive"},check:{},confirm:{},cancel:{}},setup(c){const o=v("");return(e,t)=>(i(),r("div",T,[a("div",R,[a("div",B,[a("div",E,d(e.title),1),a("div",{class:m(["ts-text is-secondary has-top-spaced",{"is-negative":e.accent=="negative"}])},d(e.message),3),a("div",O,[h(a("input",{type:"text",placeholder:e.check,"onUpdate:modelValue":t[0]||(t[0]=s=>o.value=s)},null,8,U),[[b,o.value]])]),a("div",j,[a("button",{class:"ts-button is-outlined",onClick:t[1]||(t[1]=(...s)=>e.cancel&&e.cancel(...s))},"Cancel"),a("button",{class:m(["ts-button",{"is-disabled":e.check!==o.value}]),onClick:t[2]||(t[2]=(...s)=>e.confirm&&e.confirm(...s))},"Ok",2)])])])]))}}),x={key:0},V={key:1},S=p({__name:"TheTaskRemover",props:{taskName:{},wrapper:{}},setup(c){const o=c,e=v(""),t=()=>{l.loading=!0,k.emit("remove_task",o.taskName,(s,n,u)=>{s||alert(`${n}: remove task ${o.taskName} failed: ${u}`),e.value="",l.loading=!1})};return(s,n)=>(i(),r(y,null,[s.wrapper=="button"?(i(),r("div",x,[a("button",{class:"ts-button is-outlined is-negative",onClick:n[0]||(n[0]=u=>e.value=s.taskName)},"Remove")])):(i(),r("div",V,[a("a",{class:"ts-text is-link has-cursor-pointer",onClick:n[1]||(n[1]=u=>e.value=s.taskName)},"Remove")])),e.value!==""?(i(),f(L,{key:2,title:"Confirm removal",accent:"negative",message:`You are about to remove task \`${e.value}\``,check:e.value,confirm:()=>t(),cancel:()=>e.value=""},null,8,["message","check","confirm","cancel"])):g("",!0)],64))}});export{S as _,D as a,F as b};
