import{d as N,o,c as n,z as I,u as z,r as v,a as J,A as G,w as H,b as s,i as K,l as P,g as _,x as L,t as m,q as k,B as E,F as g,h as f,s as y,y as Q}from"./index-3b0f2149.js";const X=N({__name:"TheTaskImporter",props:{parentWrapper:{}},setup($){const U=$,T=()=>{const c=U.parentWrapper;Object.assign(document.createElement("input"),{type:"file",accept:".rlstask",onchange:b=>{const w=b.target;if(w.files){const h=w.files[0],u=new FileReader;u.readAsText(h),u.onload=()=>{const l=JSON.parse(u.result);c.name.value=l.name,c.algorithm.value=l.algorithm,c.algorithm_args.value=[],c.learn_args.value=[];for(const d in l.algorithm_args)c.algorithm_args.value.push({key:d,value:l.algorithm_args[d]});for(const d in l.learn_args)c.learn_args.value.push({key:d,value:l.learn_args[d]});c.data_locator.value=l.data_locator,c.environment.value=l.environment,c.random_state.value=l.random_state}}}}).click()};return(c,b)=>(o(),n("button",{class:"ts-button is-outlined has-start-spaced",onClick:T},"Import"))}}),Y={class:"ts-header is-huge u-bottom-spaced-big"},Z={class:"ts-notice is-negative u-bottom-spaced"},ss=s("div",{class:"title"},"Error",-1),es={class:"content"},ts={class:"ts-wrap is-vertical"},as={class:"ts-control"},os=s("div",{class:"label is-start-aligned"},"name",-1),ns={class:"content"},ls={class:"ts-input"},is={class:"ts-control"},cs=s("div",{class:"label is-start-aligned"},"algorithm",-1),ds={class:"content"},rs={class:"ts-select is-fluid"},us=["value"],vs=s("option",{selected:"",disabled:"",hidden:""},"Choose algorithm",-1),_s={class:"ts-control u-top-spaced-big"},ps=s("div",{class:"label is-start-aligned"},"algorithm_args",-1),ms={class:"content"},hs=s("div",{class:"column is-5-wide"},[s("span",{class:"ts-text is-secondary"},"key")],-1),gs=s("div",{class:"column is-10-wide"},[s("span",{class:"ts-text is-secondary"},"value")],-1),ys={class:"column is-5-wide"},ks={class:"ts-input"},fs=["onUpdate:modelValue","data-dropdown"],bs=["data-name"],ws=["onClick"],xs={class:"column is-10-wide"},Cs={class:"ts-input"},Vs=["onUpdate:modelValue"],Us={class:"column is-1-wide"},Ts=["onClick"],As={class:"ts-control u-top-spaced-big u-bottom-spaced-big"},Es=s("div",{class:"label is-start-aligned"},"learn_args",-1),$s={class:"content"},Bs=s("div",{class:"column is-5-wide"},[s("span",{class:"ts-text is-secondary"},"key")],-1),Os=s("div",{class:"column is-10-wide"},[s("span",{class:"ts-text is-secondary"},"value")],-1),qs={class:"column is-5-wide"},Ls={class:"ts-input"},Ns=["onUpdate:modelValue"],Rs={class:"column is-10-wide"},Ss={class:"ts-input"},Ws=["onUpdate:modelValue"],js={class:"column is-1-wide"},Fs=["onClick"],Ms={class:"ts-control"},Ds=s("div",{class:"label is-start-aligned"},"data_locator",-1),Is={class:"content"},zs={class:"ts-select is-fluid"},Js=["value"],Gs=s("option",{selected:"",disabled:"",hidden:""},"Choose data_locator",-1),Hs={class:"ts-control"},Ks=s("div",{class:"label is-start-aligned"},"environment",-1),Ps={class:"content"},Qs={class:"ts-select is-fluid"},Xs=["value"],Ys=s("option",{selected:"",disabled:"",hidden:""},"Choose environment",-1),Zs={class:"ts-control"},se=s("div",{class:"label is-start-aligned"},"random_state",-1),ee={class:"content"},te={class:"ts-input"},ae=s("div",{class:"label is-start-aligned"},null,-1),le=N({__name:"TaskCreateView",setup($){const U=I(),T=z(),c=v([]),b=v([]),w=v([]),h=v(""),u=v(""),l=v([]),d=v([]),x=v(""),C=v(""),V=v("");let B=!0;const R={name:h,algorithm:u,algorithm_args:l,learn_args:d,data_locator:x,environment:C,random_state:V},A=v(""),O=()=>{c.value=y.algorithms,b.value=y.data_locators,w.value=y.environments},S=()=>{l.value.push({key:"",value:""})},W=i=>{l.value.splice(i,1)},j=()=>{d.value.push({key:"",value:""})},F=i=>{d.value.splice(i,1)},M=()=>{y.loading=!0;const i={},t={};l.value.forEach(e=>{i[e.key]=e.value}),d.value.forEach(e=>{t[e.key]=e.value}),Q.emit("create_task",{name:h.value,algorithm:u.value,algorithm_args:i,learn_args:t,data_locator:x.value,environment:C.value,random_state:V.value},(e,r,p)=>{y.loading=!1,e?(B=!1,T.push({name:"tasks"})):A.value=`${r}: ${p}`})},D=()=>{const i=y.tasks.find(t=>t.name==U.query.copy);if(i){h.value=i.name,u.value=i.args.algorithm,l.value=[];for(const[t,e]of Object.entries(i.args.algorithm_args))l.value.push({key:t,value:e});d.value=[];for(const[t,e]of Object.entries(i.args.learn_args))d.value.push({key:t,value:e});x.value=i.args.data_locator,C.value=i.args.environment,V.value=i.args.random_state,T.replace({query:{}})}};return J(()=>{O(),U.query.copy&&D(),window.onbeforeunload=()=>"Are you sure you want to leave?"}),G((i,t,e)=>{window.onbeforeunload=null,!B||window.confirm("Are you sure you want to leave?")?e():e(!1)}),H(y,()=>{O()}),(i,t)=>(o(),n(g,null,[s("div",Y,[K("Create Task "),P(X,{parentWrapper:R})]),_(s("div",Z,[ss,s("div",es,m(A.value),1)],512),[[L,A.value!=""]]),s("div",ts,[s("div",as,[os,s("div",ns,[s("div",ls,[_(s("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>h.value=e)},null,512),[[k,h.value]])])])]),s("div",is,[cs,s("div",ds,[s("div",rs,[_(s("select",{class:"ts-text is-secondary","onUpdate:modelValue":t[1]||(t[1]=e=>u.value=e)},[(o(!0),n(g,null,f(c.value,e=>(o(),n("option",{value:e.name,key:e.name},m(e.name)+": "+m(e.description),9,us))),128)),vs],512),[[E,u.value]])])])]),s("div",_s,[ps,s("div",ms,[s("div",{class:"ts-grid is-middle-aligned"},[hs,gs,s("div",{class:"column is-1-wide"},[s("span",{class:"ts-icon is-plus-icon has-cursor-pointer",onClick:S})])]),(o(!0),n(g,null,f(l.value,(e,r)=>{var p,q;return o(),n("div",{class:"ts-grid is-middle-aligned u-top-spaced",key:r},[s("div",ys,[s("div",ks,[_((o(),n("input",{type:"text","onUpdate:modelValue":a=>e.key=a,key:r,"data-dropdown":r},null,8,fs)),[[k,e.key]])]),_(s("div",{class:"ts-dropdown","data-name":r},[(o(!0),n(g,null,f((p=c.value.find(a=>a.name==u.value))==null?void 0:p.args.filter(a=>a.includes(e.key)),a=>(o(),n("button",{class:"item",key:a,onClick:oe=>e.key=a},m(a),9,ws))),128))],8,bs),[[L,c.value.find(a=>a.name==u.value)&&((q=c.value.find(a=>a.name==u.value))==null?void 0:q.args.filter(a=>a.includes(e.key)).length)!==0]])]),s("div",xs,[s("div",Cs,[_((o(),n("input",{type:"text","onUpdate:modelValue":a=>e.value=a,key:r},null,8,Vs)),[[k,e.value]])])]),s("div",Us,[s("span",{class:"ts-icon is-minus-icon has-cursor-pointer",onClick:a=>W(r)},null,8,Ts)])])}),128))])]),s("div",As,[Es,s("div",$s,[s("div",{class:"ts-grid is-middle-aligned"},[Bs,Os,s("div",{class:"column is-1-wide"},[s("span",{class:"ts-icon is-plus-icon has-cursor-pointer",onClick:j})])]),(o(!0),n(g,null,f(d.value,(e,r)=>(o(),n("div",{class:"ts-grid is-middle-aligned u-top-spaced",key:r},[s("div",qs,[s("div",Ls,[_((o(),n("input",{type:"text","onUpdate:modelValue":p=>e.key=p,key:r},null,8,Ns)),[[k,e.key]])])]),s("div",Rs,[s("div",Ss,[_((o(),n("input",{type:"text","onUpdate:modelValue":p=>e.value=p,key:r},null,8,Ws)),[[k,e.value]])])]),s("div",js,[s("span",{class:"ts-icon is-minus-icon has-cursor-pointer",onClick:p=>F(r)},null,8,Fs)])]))),128))])]),s("div",Ms,[Ds,s("div",Is,[s("div",zs,[_(s("select",{class:"ts-text is-secondary","onUpdate:modelValue":t[2]||(t[2]=e=>x.value=e)},[(o(!0),n(g,null,f(b.value,e=>(o(),n("option",{value:e.name,key:e.name},m(e.name)+": "+m(e.description),9,Js))),128)),Gs],512),[[E,x.value]])])])]),s("div",Hs,[Ks,s("div",Ps,[s("div",Qs,[_(s("select",{class:"ts-text is-secondary","onUpdate:modelValue":t[3]||(t[3]=e=>C.value=e)},[(o(!0),n(g,null,f(w.value,e=>(o(),n("option",{value:e.name,key:e.name},m(e.name)+": "+m(e.description),9,Xs))),128)),Ys],512),[[E,C.value]])])])]),s("div",Zs,[se,s("div",ee,[s("div",te,[_(s("input",{type:"number","onUpdate:modelValue":t[4]||(t[4]=e=>V.value=e)},null,512),[[k,V.value]])])])]),s("div",{class:"ts-control"},[ae,s("div",{class:"content"},[s("div",{class:"ts-content is-end-aligned"},[s("button",{class:"ts-button",onClick:M},"Create")])])])])],64))}});export{le as default};