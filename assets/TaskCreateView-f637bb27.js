import{d as q,o as n,c as i,z as M,u as D,r as m,a as I,A as z,w as J,b as s,i as G,l as H,g as v,x as B,t as g,q as k,B as O,F as y,h as x,s as f,y as K}from"./index-b3483a63.js";const P=q({__name:"TheTaskImporter",props:{parentWrapper:{}},setup(T){const C=T,V=()=>{const c=C.parentWrapper;Object.assign(document.createElement("input"),{type:"file",accept:".rlstask",onchange:w=>{const h=w.target;if(h.files){const _=h.files[0],r=new FileReader;r.readAsText(_),r.onload=()=>{const o=JSON.parse(r.result);c.name.value=o.name,c.algorithm.value=o.algorithm,c.algorithm_args.value=[],c.learn_args.value=[];for(const u in o.algorithm_args)c.algorithm_args.value.push({key:u,value:o.algorithm_args[u]});for(const u in o.learn_args)c.learn_args.value.push({key:u,value:o.learn_args[u]});c.data_locator.value=o.data_locator,c.random_state.value=o.random_state}}}}).click()};return(c,w)=>(n(),i("button",{class:"ts-button is-outlined has-start-spaced",onClick:V},"Import"))}}),Q={class:"ts-header is-huge u-bottom-spaced-big"},X={class:"ts-notice is-negative u-bottom-spaced"},Y=s("div",{class:"title"},"Error",-1),Z={class:"content"},ss={class:"ts-wrap is-vertical"},es={class:"ts-control"},ts=s("div",{class:"label is-start-aligned"},"name",-1),as={class:"content"},os={class:"ts-input"},ls={class:"ts-control"},ns=s("div",{class:"label is-start-aligned"},"algorithm",-1),is={class:"content"},cs={class:"ts-select is-fluid"},ds=["value"],rs=s("option",{selected:"",disabled:"",hidden:""},"Choose algorithm",-1),us={class:"ts-control u-top-spaced-big"},_s=s("div",{class:"label is-start-aligned"},"algorithm_args",-1),vs={class:"content"},ps=s("div",{class:"column is-5-wide"},[s("span",{class:"ts-text is-secondary"},"key")],-1),ms=s("div",{class:"column is-10-wide"},[s("span",{class:"ts-text is-secondary"},"value")],-1),hs={class:"column is-5-wide"},gs={class:"ts-input"},ks=["onUpdate:modelValue","data-dropdown"],ys=["data-name"],fs=["onClick"],ws={class:"column is-10-wide"},bs={class:"ts-input"},xs=["onUpdate:modelValue"],Cs={class:"column is-1-wide"},Vs=["onClick"],Us={class:"ts-control u-top-spaced-big u-bottom-spaced-big"},Ts=s("div",{class:"label is-start-aligned"},"learn_args",-1),As={class:"content"},Es=s("div",{class:"column is-5-wide"},[s("span",{class:"ts-text is-secondary"},"key")],-1),$s=s("div",{class:"column is-10-wide"},[s("span",{class:"ts-text is-secondary"},"value")],-1),Bs={class:"column is-5-wide"},Os={class:"ts-input"},qs=["onUpdate:modelValue"],Ls={class:"column is-10-wide"},Ns={class:"ts-input"},Rs=["onUpdate:modelValue"],Ss={class:"column is-1-wide"},Ws=["onClick"],js={class:"ts-control"},Fs=s("div",{class:"label is-start-aligned"},"data_locator",-1),Ms={class:"content"},Ds={class:"ts-select is-fluid"},Is=["value"],zs=s("option",{selected:"",disabled:"",hidden:""},"Choose data_locator",-1),Js={class:"ts-control"},Gs=s("div",{class:"label is-start-aligned"},"random_state",-1),Hs={class:"content"},Ks={class:"ts-input"},Ps=s("div",{class:"label is-start-aligned"},null,-1),Ys=q({__name:"TaskCreateView",setup(T){const C=M(),V=D(),c=m([]),w=m([]),h=m(""),_=m(""),r=m([]),o=m([]),u=m(""),b=m("");let A=!0;const L={name:h,algorithm:_,algorithm_args:r,learn_args:o,data_locator:u,random_state:b},U=m(""),E=()=>{c.value=f.algorithms,w.value=f.data_locators},N=()=>{r.value.push({key:"",value:""})},R=l=>{r.value.splice(l,1)},S=()=>{o.value.push({key:"",value:""})},W=l=>{o.value.splice(l,1)},j=()=>{f.loading=!0;const l={},t={};r.value.forEach(e=>{l[e.key]=e.value}),o.value.forEach(e=>{t[e.key]=e.value}),K.emit("create_task",{name:h.value,algorithm:_.value,algorithm_args:l,learn_args:t,data_locator:u.value,random_state:b.value},(e,d,p)=>{f.loading=!1,e?(A=!1,V.push({name:"tasks"})):U.value=`${d}: ${p}`})},F=()=>{const l=f.tasks.find(t=>t.name==C.query.copy);if(l){h.value=l.name,_.value=l.args.algorithm,r.value=[];for(const[t,e]of Object.entries(l.args.algorithm_args))r.value.push({key:t,value:e});o.value=[];for(const[t,e]of Object.entries(l.args.learn_args))o.value.push({key:t,value:e});u.value=l.args.data_locator,b.value=l.args.random_state,V.replace({query:{}})}};return I(()=>{E(),C.query.copy&&F(),window.onbeforeunload=()=>"Are you sure you want to leave?"}),z((l,t,e)=>{window.onbeforeunload=null,!A||window.confirm("Are you sure you want to leave?")?e():e(!1)}),J(f,()=>{E()}),(l,t)=>(n(),i(y,null,[s("div",Q,[G("Create Task "),H(P,{parentWrapper:L})]),v(s("div",X,[Y,s("div",Z,g(U.value),1)],512),[[B,U.value!=""]]),s("div",ss,[s("div",es,[ts,s("div",as,[s("div",os,[v(s("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>h.value=e)},null,512),[[k,h.value]])])])]),s("div",ls,[ns,s("div",is,[s("div",cs,[v(s("select",{class:"ts-text is-secondary","onUpdate:modelValue":t[1]||(t[1]=e=>_.value=e)},[(n(!0),i(y,null,x(c.value,e=>(n(),i("option",{value:e.name,key:e.name},g(e.name)+": "+g(e.description),9,ds))),128)),rs],512),[[O,_.value]])])])]),s("div",us,[_s,s("div",vs,[s("div",{class:"ts-grid is-middle-aligned"},[ps,ms,s("div",{class:"column is-1-wide"},[s("span",{class:"ts-icon is-plus-icon has-cursor-pointer",onClick:N})])]),(n(!0),i(y,null,x(r.value,(e,d)=>{var p,$;return n(),i("div",{class:"ts-grid is-middle-aligned u-top-spaced",key:d},[s("div",hs,[s("div",gs,[v((n(),i("input",{type:"text","onUpdate:modelValue":a=>e.key=a,key:d,"data-dropdown":d},null,8,ks)),[[k,e.key]])]),v(s("div",{class:"ts-dropdown","data-name":d},[(n(!0),i(y,null,x((p=c.value.find(a=>a.name==_.value))==null?void 0:p.args.filter(a=>a.includes(e.key)),a=>(n(),i("button",{class:"item",key:a,onClick:Qs=>e.key=a},g(a),9,fs))),128))],8,ys),[[B,c.value.find(a=>a.name==_.value)&&(($=c.value.find(a=>a.name==_.value))==null?void 0:$.args.filter(a=>a.includes(e.key)).length)!==0]])]),s("div",ws,[s("div",bs,[v((n(),i("input",{type:"text","onUpdate:modelValue":a=>e.value=a,key:d},null,8,xs)),[[k,e.value]])])]),s("div",Cs,[s("span",{class:"ts-icon is-minus-icon has-cursor-pointer",onClick:a=>R(d)},null,8,Vs)])])}),128))])]),s("div",Us,[Ts,s("div",As,[s("div",{class:"ts-grid is-middle-aligned"},[Es,$s,s("div",{class:"column is-1-wide"},[s("span",{class:"ts-icon is-plus-icon has-cursor-pointer",onClick:S})])]),(n(!0),i(y,null,x(o.value,(e,d)=>(n(),i("div",{class:"ts-grid is-middle-aligned u-top-spaced",key:d},[s("div",Bs,[s("div",Os,[v((n(),i("input",{type:"text","onUpdate:modelValue":p=>e.key=p,key:d},null,8,qs)),[[k,e.key]])])]),s("div",Ls,[s("div",Ns,[v((n(),i("input",{type:"text","onUpdate:modelValue":p=>e.value=p,key:d},null,8,Rs)),[[k,e.value]])])]),s("div",Ss,[s("span",{class:"ts-icon is-minus-icon has-cursor-pointer",onClick:p=>W(d)},null,8,Ws)])]))),128))])]),s("div",js,[Fs,s("div",Ms,[s("div",Ds,[v(s("select",{class:"ts-text is-secondary","onUpdate:modelValue":t[2]||(t[2]=e=>u.value=e)},[(n(!0),i(y,null,x(w.value,e=>(n(),i("option",{value:e.name,key:e.name},g(e.name)+": "+g(e.description),9,Is))),128)),zs],512),[[O,u.value]])])])]),s("div",Js,[Gs,s("div",Hs,[s("div",Ks,[v(s("input",{type:"number","onUpdate:modelValue":t[3]||(t[3]=e=>b.value=e)},null,512),[[k,b.value]])])])]),s("div",{class:"ts-control"},[Ps,s("div",{class:"content"},[s("div",{class:"ts-content is-end-aligned"},[s("button",{class:"ts-button",onClick:j},"Create")])])])])],64))}});export{Ys as default};