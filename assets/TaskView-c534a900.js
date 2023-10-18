import{d as Ae,u as De,r as X,a as Se,w as Le,o as P,c as q,e as d,t as ie,j as ye,F as de,f as _e,i as Fe,l as ze,v as Me,n as Ue,s as Ee,m as Pe}from"./index-e603295e.js";import{c as qe,g as Be}from"./_commonjsHelpers-725317a4.js";import{_ as Ne,a as je,b as We}from"./TheTaskCopier.vue_vue_type_script_setup_true_lang-6c8899a4.js";import{_ as Ke}from"./TheWorksList.vue_vue_type_script_setup_true_lang-f299a27a.js";var Ie={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(Ce,ke){(function(Q,p){Ce.exports=p()})(qe,function Q(){var p=typeof self<"u"?self:typeof window<"u"?window:p!==void 0?p:{},ee=!p.document&&!!p.postMessage,ce=p.IS_PAPA_WORKER||!1,ae={},ge=0,l={parse:function(t,e){var r=(e=e||{}).dynamicTyping||!1;if(g(r)&&(e.dynamicTypingFunction=r,r={}),e.dynamicTyping=r,e.transform=!!g(e.transform)&&e.transform,e.worker&&l.WORKERS_SUPPORTED){var s=function(){if(!l.WORKERS_SUPPORTED)return!1;var h=(A=p.URL||p.webkitURL||null,w=Q.toString(),l.BLOB_URL||(l.BLOB_URL=A.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",w,")();"],{type:"text/javascript"})))),c=new p.Worker(h),A,w;return c.onmessage=me,c.id=ge++,ae[c.id]=c}();return s.userStep=e.step,s.userChunk=e.chunk,s.userComplete=e.complete,s.userError=e.error,e.step=g(e.step),e.chunk=g(e.chunk),e.complete=g(e.complete),e.error=g(e.error),delete e.worker,void s.postMessage({input:t,config:e,workerId:s.id})}var i=null;return l.NODE_STREAM_INPUT,typeof t=="string"?(t=function(h){return h.charCodeAt(0)===65279?h.slice(1):h}(t),i=e.download?new oe(e):new J(e)):t.readable===!0&&g(t.read)&&g(t.on)?i=new B(e):(p.File&&t instanceof File||t instanceof Object)&&(i=new fe(e)),i.stream(t)},unparse:function(t,e){var r=!1,s=!0,i=",",h=`\r
`,c='"',A=c+c,w=!1,a=null,C=!1;(function(){if(typeof e=="object"){if(typeof e.delimiter!="string"||l.BAD_DELIMITERS.filter(function(n){return e.delimiter.indexOf(n)!==-1}).length||(i=e.delimiter),(typeof e.quotes=="boolean"||typeof e.quotes=="function"||Array.isArray(e.quotes))&&(r=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(w=e.skipEmptyLines),typeof e.newline=="string"&&(h=e.newline),typeof e.quoteChar=="string"&&(c=e.quoteChar),typeof e.header=="boolean"&&(s=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");a=e.columns}e.escapeChar!==void 0&&(A=e.escapeChar+c),(typeof e.escapeFormulae=="boolean"||e.escapeFormulae instanceof RegExp)&&(C=e.escapeFormulae instanceof RegExp?e.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var u=new RegExp(U(c),"g");if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return H(null,t,w);if(typeof t[0]=="object")return H(a||Object.keys(t[0]),t,w)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||a),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),H(t.fields||[],t.data||[],w);throw new Error("Unable to serialize unrecognized input");function H(n,y,F){var E="";typeof n=="string"&&(n=JSON.parse(n)),typeof y=="string"&&(y=JSON.parse(y));var D=Array.isArray(n)&&0<n.length,T=!Array.isArray(y[0]);if(D&&s){for(var I=0;I<n.length;I++)0<I&&(E+=i),E+=L(n[I],I);0<y.length&&(E+=h)}for(var o=0;o<y.length;o++){var f=D?n.length:y[o].length,k=!1,O=D?Object.keys(y[o]).length===0:y[o].length===0;if(F&&!D&&(k=F==="greedy"?y[o].join("").trim()==="":y[o].length===1&&y[o][0].length===0),F==="greedy"&&D){for(var m=[],z=0;z<f;z++){var x=T?n[z]:z;m.push(y[o][x])}k=m.join("").trim()===""}if(!k){for(var v=0;v<f;v++){0<v&&!O&&(E+=i);var $=D&&T?n[v]:v;E+=L(y[o][$],v)}o<y.length-1&&(!F||0<f&&!O)&&(E+=h)}}return E}function L(n,y){if(n==null)return"";if(n.constructor===Date)return JSON.stringify(n).slice(1,25);var F=!1;C&&typeof n=="string"&&C.test(n)&&(n="'"+n,F=!0);var E=n.toString().replace(u,A);return(F=F||r===!0||typeof r=="function"&&r(n,y)||Array.isArray(r)&&r[y]||function(D,T){for(var I=0;I<T.length;I++)if(-1<D.indexOf(T[I]))return!0;return!1}(E,l.BAD_DELIMITERS)||-1<E.indexOf(i)||E.charAt(0)===" "||E.charAt(E.length-1)===" ")?c+E+c:E}}};if(l.RECORD_SEP=String.fromCharCode(30),l.UNIT_SEP=String.fromCharCode(31),l.BYTE_ORDER_MARK="\uFEFF",l.BAD_DELIMITERS=["\r",`
`,'"',l.BYTE_ORDER_MARK],l.WORKERS_SUPPORTED=!ee&&!!p.Worker,l.NODE_STREAM_INPUT=1,l.LocalChunkSize=10485760,l.RemoteChunkSize=5242880,l.DefaultDelimiter=",",l.Parser=ue,l.ParserHandle=S,l.NetworkStreamer=oe,l.FileStreamer=fe,l.StringStreamer=J,l.ReadableStreamStreamer=B,p.jQuery){var G=p.jQuery;G.fn.parse=function(t){var e=t.config||{},r=[];return this.each(function(h){if(!(G(this).prop("tagName").toUpperCase()==="INPUT"&&G(this).attr("type").toLowerCase()==="file"&&p.FileReader)||!this.files||this.files.length===0)return!0;for(var c=0;c<this.files.length;c++)r.push({file:this.files[c],inputElem:this,instanceConfig:G.extend({},e)})}),s(),this;function s(){if(r.length!==0){var h,c,A,w,a=r[0];if(g(t.before)){var C=t.before(a.file,a.inputElem);if(typeof C=="object"){if(C.action==="abort")return h="AbortError",c=a.file,A=a.inputElem,w=C.reason,void(g(t.error)&&t.error({name:h},c,A,w));if(C.action==="skip")return void i();typeof C.config=="object"&&(a.instanceConfig=G.extend(a.instanceConfig,C.config))}else if(C==="skip")return void i()}var u=a.instanceConfig.complete;a.instanceConfig.complete=function(H){g(u)&&u(H,a.file,a.inputElem),i()},l.parse(a.file,a.instanceConfig)}else g(t.complete)&&t.complete()}function i(){r.splice(0,1),s()}}}function M(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var r=be(e);r.chunkSize=parseInt(r.chunkSize),e.step||e.chunk||(r.chunkSize=null),this._handle=new S(r),(this._handle.streamer=this)._config=r}).call(this,t),this.parseChunk=function(e,r){if(this.isFirstChunk&&g(this._config.beforeFirstChunk)){var s=this._config.beforeFirstChunk(e);s!==void 0&&(e=s)}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e;this._partialLine="";var h=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var c=h.meta.cursor;this._finished||(this._partialLine=i.substring(c-this._baseIndex),this._baseIndex=c),h&&h.data&&(this._rowCount+=h.data.length);var A=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(ce)p.postMessage({results:h,workerId:l.WORKER_ID,finished:A});else if(g(this._config.chunk)&&!r){if(this._config.chunk(h,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);h=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(h.data),this._completeResults.errors=this._completeResults.errors.concat(h.errors),this._completeResults.meta=h.meta),this._completed||!A||!g(this._config.complete)||h&&h.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),A||h&&h.meta.paused||this._nextChunk(),h}this._halted=!0},this._sendError=function(e){g(this._config.error)?this._config.error(e):ce&&this._config.error&&p.postMessage({workerId:l.WORKER_ID,error:e,finished:!1})}}function oe(t){var e;(t=t||{}).chunkSize||(t.chunkSize=l.RemoteChunkSize),M.call(this,t),this._nextChunk=ee?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(r){this._input=r,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),ee||(e.onload=te(this._chunkLoaded,this),e.onerror=te(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!ee),this._config.downloadRequestHeaders){var r=this._config.downloadRequestHeaders;for(var s in r)e.setRequestHeader(s,r[s])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;e.setRequestHeader("Range","bytes="+this._start+"-"+i)}try{e.send(this._config.downloadRequestBody)}catch(h){this._chunkError(h.message)}ee&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:e.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(r){var s=r.getResponseHeader("Content-Range");return s===null?-1:parseInt(s.substring(s.lastIndexOf("/")+1))}(e),this.parseChunk(e.responseText)))},this._chunkError=function(r){var s=e.statusText||r;this._sendError(new Error(s))}}function fe(t){var e,r;(t=t||{}).chunkSize||(t.chunkSize=l.LocalChunkSize),M.call(this,t);var s=typeof FileReader<"u";this.stream=function(i){this._input=i,r=i.slice||i.webkitSlice||i.mozSlice,s?((e=new FileReader).onload=te(this._chunkLoaded,this),e.onerror=te(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var i=this._input;if(this._config.chunkSize){var h=Math.min(this._start+this._config.chunkSize,this._input.size);i=r.call(i,this._start,h)}var c=e.readAsText(i,this._config.encoding);s||this._chunkLoaded({target:{result:c}})},this._chunkLoaded=function(i){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(i.target.result)},this._chunkError=function(){this._sendError(e.error)}}function J(t){var e;M.call(this,t=t||{}),this.stream=function(r){return e=r,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var r,s=this._config.chunkSize;return s?(r=e.substring(0,s),e=e.substring(s)):(r=e,e=""),this._finished=!e,this.parseChunk(r)}}}function B(t){M.call(this,t=t||{});var e=[],r=!0,s=!1;this.pause=function(){M.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){M.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(i){this._input=i,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){s&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):r=!0},this._streamData=te(function(i){try{e.push(typeof i=="string"?i:i.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(h){this._streamError(h)}},this),this._streamError=te(function(i){this._streamCleanUp(),this._sendError(i)},this),this._streamEnd=te(function(){this._streamCleanUp(),s=!0,this._streamData("")},this),this._streamCleanUp=te(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function S(t){var e,r,s,i=Math.pow(2,53),h=-i,c=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,A=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,w=this,a=0,C=0,u=!1,H=!1,L=[],n={data:[],errors:[],meta:{}};if(g(t.step)){var y=t.step;t.step=function(o){if(n=o,D())E();else{if(E(),n.data.length===0)return;a+=o.data.length,t.preview&&a>t.preview?r.abort():(n.data=n.data[0],y(n,w))}}}function F(o){return t.skipEmptyLines==="greedy"?o.join("").trim()==="":o.length===1&&o[0].length===0}function E(){return n&&s&&(I("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+l.DefaultDelimiter+"'"),s=!1),t.skipEmptyLines&&(n.data=n.data.filter(function(o){return!F(o)})),D()&&function(){if(!n)return;function o(k,O){g(t.transformHeader)&&(k=t.transformHeader(k,O)),L.push(k)}if(Array.isArray(n.data[0])){for(var f=0;D()&&f<n.data.length;f++)n.data[f].forEach(o);n.data.splice(0,1)}else n.data.forEach(o)}(),function(){if(!n||!t.header&&!t.dynamicTyping&&!t.transform)return n;function o(k,O){var m,z=t.header?{}:[];for(m=0;m<k.length;m++){var x=m,v=k[m];t.header&&(x=m>=L.length?"__parsed_extra":L[m]),t.transform&&(v=t.transform(v,x)),v=T(x,v),x==="__parsed_extra"?(z[x]=z[x]||[],z[x].push(v)):z[x]=v}return t.header&&(m>L.length?I("FieldMismatch","TooManyFields","Too many fields: expected "+L.length+" fields but parsed "+m,C+O):m<L.length&&I("FieldMismatch","TooFewFields","Too few fields: expected "+L.length+" fields but parsed "+m,C+O)),z}var f=1;return!n.data.length||Array.isArray(n.data[0])?(n.data=n.data.map(o),f=n.data.length):n.data=o(n.data,0),t.header&&n.meta&&(n.meta.fields=L),C+=f,n}()}function D(){return t.header&&L.length===0}function T(o,f){return k=o,t.dynamicTypingFunction&&t.dynamicTyping[k]===void 0&&(t.dynamicTyping[k]=t.dynamicTypingFunction(k)),(t.dynamicTyping[k]||t.dynamicTyping)===!0?f==="true"||f==="TRUE"||f!=="false"&&f!=="FALSE"&&(function(O){if(c.test(O)){var m=parseFloat(O);if(h<m&&m<i)return!0}return!1}(f)?parseFloat(f):A.test(f)?new Date(f):f===""?null:f):f;var k}function I(o,f,k,O){var m={type:o,code:f,message:k};O!==void 0&&(m.row=O),n.errors.push(m)}this.parse=function(o,f,k){var O=t.quoteChar||'"';if(t.newline||(t.newline=function(x,v){x=x.substring(0,1048576);var $=new RegExp(U(v)+"([^]*?)"+U(v),"gm"),N=(x=x.replace($,"")).split("\r"),V=x.split(`
`),Z=1<V.length&&V[0].length<N[0].length;if(N.length===1||Z)return`
`;for(var j=0,b=0;b<N.length;b++)N[b][0]===`
`&&j++;return j>=N.length/2?`\r
`:"\r"}(o,O)),s=!1,t.delimiter)g(t.delimiter)&&(t.delimiter=t.delimiter(o),n.meta.delimiter=t.delimiter);else{var m=function(x,v,$,N,V){var Z,j,b,R;V=V||[",","	","|",";",l.RECORD_SEP,l.UNIT_SEP];for(var le=0;le<V.length;le++){var _=V[le],pe=0,Y=0,he=0;b=void 0;for(var re=new ue({comments:N,delimiter:_,newline:v,preview:10}).parse(x),se=0;se<re.data.length;se++)if($&&F(re.data[se]))he++;else{var ne=re.data[se].length;Y+=ne,b!==void 0?0<ne&&(pe+=Math.abs(ne-b),b=ne):b=ne}0<re.data.length&&(Y/=re.data.length-he),(j===void 0||pe<=j)&&(R===void 0||R<Y)&&1.99<Y&&(j=pe,Z=_,R=Y)}return{successful:!!(t.delimiter=Z),bestDelimiter:Z}}(o,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);m.successful?t.delimiter=m.bestDelimiter:(s=!0,t.delimiter=l.DefaultDelimiter),n.meta.delimiter=t.delimiter}var z=be(t);return t.preview&&t.header&&z.preview++,e=o,r=new ue(z),n=r.parse(e,f,k),E(),u?{meta:{paused:!0}}:n||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,r.abort(),e=g(t.chunk)?"":e.substring(r.getCharIndex())},this.resume=function(){w.streamer._halted?(u=!1,w.streamer.parseChunk(e,!0)):setTimeout(w.resume,3)},this.aborted=function(){return H},this.abort=function(){H=!0,r.abort(),n.meta.aborted=!0,g(t.complete)&&t.complete(n),e=""}}function U(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ue(t){var e,r=(t=t||{}).delimiter,s=t.newline,i=t.comments,h=t.step,c=t.preview,A=t.fastMode,w=e=t.quoteChar===void 0||t.quoteChar===null?'"':t.quoteChar;if(t.escapeChar!==void 0&&(w=t.escapeChar),(typeof r!="string"||-1<l.BAD_DELIMITERS.indexOf(r))&&(r=","),i===r)throw new Error("Comment character same as delimiter");i===!0?i="#":(typeof i!="string"||-1<l.BAD_DELIMITERS.indexOf(i))&&(i=!1),s!==`
`&&s!=="\r"&&s!==`\r
`&&(s=`
`);var a=0,C=!1;this.parse=function(u,H,L){if(typeof u!="string")throw new Error("Input must be a string");var n=u.length,y=r.length,F=s.length,E=i.length,D=g(h),T=[],I=[],o=[],f=a=0;if(!u)return W();if(t.header&&!H){var k=u.split(s)[0].split(r),O=[],m={},z=!1;for(var x in k){var v=k[x];g(t.transformHeader)&&(v=t.transformHeader(v,x));var $=v,N=m[v]||0;for(0<N&&(z=!0,$=v+"_"+N),m[v]=N+1;O.includes($);)$=$+"_"+N;O.push($)}if(z){var V=u.split(s);V[0]=O.join(r),u=V.join(s)}}if(A||A!==!1&&u.indexOf(e)===-1){for(var Z=u.split(s),j=0;j<Z.length;j++){if(o=Z[j],a+=o.length,j!==Z.length-1)a+=s.length;else if(L)return W();if(!i||o.substring(0,E)!==i){if(D){if(T=[],he(o.split(r)),ve(),C)return W()}else he(o.split(r));if(c&&c<=j)return T=T.slice(0,c),W(!0)}}return W()}for(var b=u.indexOf(r,a),R=u.indexOf(s,a),le=new RegExp(U(w)+U(e),"g"),_=u.indexOf(e,a);;)if(u[a]!==e)if(i&&o.length===0&&u.substring(a,a+E)===i){if(R===-1)return W();a=R+F,R=u.indexOf(s,a),b=u.indexOf(r,a)}else if(b!==-1&&(b<R||R===-1))o.push(u.substring(a,b)),a=b+y,b=u.indexOf(r,a);else{if(R===-1)break;if(o.push(u.substring(a,R)),ne(R+F),D&&(ve(),C))return W();if(c&&T.length>=c)return W(!0)}else for(_=a,a++;;){if((_=u.indexOf(e,_+1))===-1)return L||I.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:T.length,index:a}),se();if(_===n-1)return se(u.substring(a,_).replace(le,e));if(e!==w||u[_+1]!==w){if(e===w||_===0||u[_-1]!==w){b!==-1&&b<_+1&&(b=u.indexOf(r,_+1)),R!==-1&&R<_+1&&(R=u.indexOf(s,_+1));var pe=re(R===-1?b:Math.min(b,R));if(u.substr(_+1+pe,y)===r){o.push(u.substring(a,_).replace(le,e)),u[a=_+1+pe+y]!==e&&(_=u.indexOf(e,a)),b=u.indexOf(r,a),R=u.indexOf(s,a);break}var Y=re(R);if(u.substring(_+1+Y,_+1+Y+F)===s){if(o.push(u.substring(a,_).replace(le,e)),ne(_+1+Y+F),b=u.indexOf(r,a),_=u.indexOf(e,a),D&&(ve(),C))return W();if(c&&T.length>=c)return W(!0);break}I.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:T.length,index:a}),_++}}else _++}return se();function he(K){T.push(K),f=a}function re(K){var Oe=0;if(K!==-1){var we=u.substring(_+1,K);we&&we.trim()===""&&(Oe=we.length)}return Oe}function se(K){return L||(K===void 0&&(K=u.substring(a)),o.push(K),a=n,he(o),D&&ve()),W()}function ne(K){a=K,he(o),o=[],R=u.indexOf(s,a)}function W(K){return{data:T,errors:I,meta:{delimiter:r,linebreak:s,aborted:C,truncated:!!K,cursor:f+(H||0)}}}function ve(){h(W()),T=[],I=[]}},this.abort=function(){C=!0},this.getCharIndex=function(){return a}}function me(t){var e=t.data,r=ae[e.workerId],s=!1;if(e.error)r.userError(e.error,e.file);else if(e.results&&e.results.data){var i={abort:function(){s=!0,xe(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Re,resume:Re};if(g(r.userStep)){for(var h=0;h<e.results.data.length&&(r.userStep({data:e.results.data[h],errors:e.results.errors,meta:e.results.meta},i),!s);h++);delete e.results}else g(r.userChunk)&&(r.userChunk(e.results,i,e.file),delete e.results)}e.finished&&!s&&xe(e.workerId,e.results)}function xe(t,e){var r=ae[t];g(r.userComplete)&&r.userComplete(e),r.terminate(),delete ae[t]}function Re(){throw new Error("Not implemented.")}function be(t){if(typeof t!="object"||t===null)return t;var e=Array.isArray(t)?[]:{};for(var r in t)e[r]=be(t[r]);return e}function te(t,e){return function(){t.apply(e,arguments)}}function g(t){return typeof t=="function"}return ce&&(p.onmessage=function(t){var e=t.data;if(l.WORKER_ID===void 0&&e&&(l.WORKER_ID=e.workerId),typeof e.input=="string")p.postMessage({workerId:l.WORKER_ID,results:l.parse(e.input,e.config),finished:!0});else if(p.File&&e.input instanceof File||e.input instanceof Object){var r=l.parse(e.input,e.config);r&&p.postMessage({workerId:l.WORKER_ID,results:r,finished:!0})}}),(oe.prototype=Object.create(M.prototype)).constructor=oe,(fe.prototype=Object.create(M.prototype)).constructor=fe,(J.prototype=Object.create(J.prototype)).constructor=J,(B.prototype=Object.create(M.prototype)).constructor=B,l})})(Ie);var He=Ie.exports;const Te=Be(He),$e={class:"ts-wrap is-middle-aligned"},Qe={class:"ts-header is-huge"},Je={class:"ts-wrap is-compact"},Ve=d("div",{class:"ts-space"},null,-1),Ge={class:"ts-accordion",open:""},Ze={class:"ts-text is-secondary"},Ye=d("div",{class:"ts-space"},null,-1),Xe={class:"ts-accordion",open:""},et=d("summary",null,"learn",-1),tt={class:"ts-text is-secondary"},rt=d("div",{class:"ts-space"},null,-1),st={class:"ts-accordion"},nt=d("summary",null,"data",-1),it={class:"ts-box"},at={class:"ts-table is-definition",style:{display:"block","overflow-x":"auto"}},ot=d("div",{class:"ts-space"},null,-1),ut={class:"ts-accordion"},lt=d("summary",null,"preprocess",-1),ht={class:"ts-box"},dt={class:"ts-table is-definition",style:{display:"block","overflow-x":"auto"}},ct=d("div",{class:"ts-space"},null,-1),ft={class:"ts-grid is-end-aligned u-top-spaced"},pt={class:"content"},_t={class:"ts-content"},gt=d("div",{class:"ts-header is-large"},"Create new work",-1),mt=d("div",{class:"ts-text is-secondary has-top-spaced"},"num_work",-1),vt={class:"ts-input is-underlined has-top-spaced"},yt={class:"ts-wrap is-end-aligned has-top-spaced-big"},Ct=Ae({__name:"TaskView",setup(Ce){const ke=De(),Q=X({name:"",args:{name:"",algorithm:"",algorithm_args:{},learn_args:{},helper:""},date:"",data_example:"",preprocess_example:""}),p=X(""),ee=X(""),ce=X(""),ae=X(""),ge=X([]),l=X([]),G=X(1),M=X(!1),oe=()=>{Ee.tasks.length!=0&&(Q.value=Ee.tasks.find(({name:J})=>J==ke.currentRoute.value.params.name),p.value=Q.value.name,ee.value=Q.value.args.algorithm,ce.value=Q.value.args.algorithm_args,ae.value=Q.value.args.learn_args,ge.value=Te.parse(Q.value.data_example,{skipEmptyLines:!0}).data,l.value=Te.parse(Q.value.preprocess_example,{skipEmptyLines:!0}).data)},fe=()=>{Pe.emit("create_work",{task_name:p.value,num_work:G.value},(J,B,S)=>{J?M.value=!1:alert(`create work failed: ${S}`)})};return Se(()=>{oe()}),Le(Ee,()=>{oe()}),(J,B)=>(P(),q(de,null,[d("div",$e,[d("div",Qe,ie(p.value),1),d("div",Je,[ye(Ne,{"task-name":p.value,wrapper:"button"},null,8,["task-name"]),ye(je,{"task-name":p.value,wrapper:"button"},null,8,["task-name"]),ye(We,{"task-name":p.value,wrapper:"button"},null,8,["task-name"])])]),Ve,d("details",Ge,[d("summary",null,"algorithm: "+ie(ee.value),1),d("span",Ze,ie(ce.value),1)]),Ye,d("details",Xe,[et,d("span",tt,ie(ae.value),1)]),rt,d("details",st,[nt,d("div",it,[d("table",at,[d("thead",null,[d("tr",null,[(P(!0),q(de,null,_e(ge.value[0],(S,U)=>(P(),q("th",{key:U},ie(S),1))),128))])]),d("tbody",null,[(P(!0),q(de,null,_e(ge.value.slice(1),(S,U)=>(P(),q("tr",{key:U},[(P(!0),q(de,null,_e(S,(ue,me)=>(P(),q("td",{class:"is-center-aligned is-middle-aligned",key:me},ie(ue),1))),128))]))),128))])])])]),ot,d("details",ut,[lt,d("div",ht,[d("table",dt,[d("thead",null,[d("tr",null,[(P(!0),q(de,null,_e(l.value[0],(S,U)=>(P(),q("th",{key:U},ie(S),1))),128))])]),d("tbody",null,[(P(!0),q(de,null,_e(l.value.slice(1),(S,U)=>(P(),q("tr",{key:U},[(P(!0),q(de,null,_e(S,(ue,me)=>(P(),q("td",{class:"is-center-aligned is-middle-aligned",key:me},ie(ue),1))),128))]))),128))])])])]),ct,d("div",ft,[d("button",{class:"ts-button",onClick:B[0]||(B[0]=S=>M.value=!0)},"Create new work")]),ye(Ke,{task:Fe(ke).currentRoute.value.params.name},null,8,["task"]),d("div",{class:Ue(["ts-app-drawer is-right is-small",{"is-visible":M.value}])},[d("div",pt,[d("div",_t,[gt,mt,d("div",vt,[ze(d("input",{type:"number",min:"1","onUpdate:modelValue":B[1]||(B[1]=S=>G.value=S)},null,512),[[Me,G.value]])]),d("div",yt,[d("button",{class:"ts-button is-outlined",onClick:B[2]||(B[2]=S=>M.value=!1)},"Cancel"),d("button",{class:"ts-button",onClick:fe},"Create")])])])],2)],64))}});export{Ct as default};