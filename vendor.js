var Rt="6.7.1";function he(r,t,e){let n=t.split("|").map(i=>i.trim());for(let i=0;i<n.length;i++)switch(t){case"any":return;case"bigint":case"boolean":case"number":case"string":if(typeof r===t)return}let s=new Error(`invalid value for type ${t}`);throw s.code="INVALID_ARGUMENT",s.argument=`value.${e}`,s.value=r,s}function m(r,t,e){for(let n in t){let s=t[n],i=e?e[n]:null;i&&he(s,i,n),Object.defineProperty(r,n,{enumerable:!0,value:s,writable:!1})}}function $(r){if(r==null)return"null";if(Array.isArray(r))return"[ "+r.map($).join(", ")+" ]";if(r instanceof Uint8Array){let t="0123456789abcdef",e="0x";for(let n=0;n<r.length;n++)e+=t[r[n]>>4],e+=t[r[n]&15];return e}if(typeof r=="object"&&typeof r.toJSON=="function")return $(r.toJSON());switch(typeof r){case"boolean":case"symbol":return r.toString();case"bigint":return BigInt(r).toString();case"number":return r.toString();case"string":return JSON.stringify(r);case"object":{let t=Object.keys(r);return t.sort(),"{ "+t.map(e=>`${$(e)}: ${$(r[e])}`).join(", ")+" }"}}return"[ COULD NOT SERIALIZE ]"}function j(r,t){return r&&r.code===t}function tt(r,t,e){{let s=[];if(e){if("message"in e||"code"in e||"name"in e)throw new Error(`value will overwrite populated values: ${$(e)}`);for(let i in e){let o=e[i];s.push(i+"="+$(o))}}s.push(`code=${t}`),s.push(`version=${Rt}`),s.length&&(r+=" ("+s.join(", ")+")")}let n;switch(t){case"INVALID_ARGUMENT":n=new TypeError(r);break;case"NUMERIC_FAULT":case"BUFFER_OVERRUN":n=new RangeError(r);break;default:n=new Error(r)}return m(n,{code:t}),e&&Object.assign(n,e),n}function d(r,t,e,n){if(!r)throw tt(t,e,n)}function p(r,t,e,n){d(r,t,"INVALID_ARGUMENT",{argument:e,value:n})}function W(r,t,e){e==null&&(e=""),e&&(e=": "+e),d(r>=t,"missing arguemnt"+e,"MISSING_ARGUMENT",{count:r,expectedCount:t}),d(r<=t,"too many arguemnts"+e,"UNEXPECTED_ARGUMENT",{count:r,expectedCount:t})}var de=["NFD","NFC","NFKD","NFKC"].reduce((r,t)=>{try{if("test".normalize(t)!=="test")throw new Error("bad");if(t==="NFD"){let e=String.fromCharCode(233).normalize("NFD"),n=String.fromCharCode(101,769);if(e!==n)throw new Error("broken")}r.push(t)}catch{}return r},[]);function wt(r){d(de.indexOf(r)>=0,"platform missing String.prototype.normalize","UNSUPPORTED_OPERATION",{operation:"String.prototype.normalize",info:{form:r}})}function K(r,t,e){if(e==null&&(e=""),r!==t){let n=e,s="new";e&&(n+=".",s+=" "+e),d(!1,`private constructor; use ${n}from* methods`,"UNSUPPORTED_OPERATION",{operation:s})}}function Lt(r,t,e){if(r instanceof Uint8Array)return e?new Uint8Array(r):r;if(typeof r=="string"&&r.match(/^0x([0-9a-f][0-9a-f])*$/i)){let n=new Uint8Array((r.length-2)/2),s=2;for(let i=0;i<n.length;i++)n[i]=parseInt(r.substring(s,s+2),16),s+=2;return n}p(!1,"invalid BytesLike value",t||"value",r)}function T(r,t){return Lt(r,t,!1)}function E(r,t){return Lt(r,t,!0)}var Ct="0123456789abcdef";function b(r){let t=T(r),e="0x";for(let n=0;n<t.length;n++){let s=t[n];e+=Ct[(s&240)>>4]+Ct[s&15]}return e}function J(r){return"0x"+r.map(t=>b(t).substring(2)).join("")}var et=BigInt(0),k=BigInt(1),V=9007199254740991;function bt(r,t){let e=G(r,"value"),n=BigInt(A(t,"width"));if(d(e>>n===et,"overflow","NUMERIC_FAULT",{operation:"fromTwos",fault:"overflow",value:r}),e>>n-k){let s=(k<<n)-k;return-((~e&s)+k)}return e}function Et(r,t){let e=P(r,"value"),n=BigInt(A(t,"width")),s=k<<n-k;if(e<et){e=-e,d(e<=s,"too low","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:r});let i=(k<<n)-k;return(~e&i)+k}else d(e<s,"too high","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:r});return e}function D(r,t){let e=G(r,"value"),n=BigInt(A(t,"bits"));return e&(k<<n)-k}function P(r,t){switch(typeof r){case"bigint":return r;case"number":return p(Number.isInteger(r),"underflow",t||"value",r),p(r>=-V&&r<=V,"overflow",t||"value",r),BigInt(r);case"string":try{if(r==="")throw new Error("empty string");return r[0]==="-"&&r[1]!=="-"?-BigInt(r.substring(1)):BigInt(r)}catch(e){p(!1,`invalid BigNumberish string: ${e.message}`,t||"value",r)}}p(!1,"invalid BigNumberish value",t||"value",r)}function G(r,t){let e=P(r,t);return d(e>=et,"unsigned value cannot be negative","NUMERIC_FAULT",{fault:"overflow",operation:"getUint",value:r}),e}var vt="0123456789abcdef";function rt(r){if(r instanceof Uint8Array){let t="0x0";for(let e of r)t+=vt[e>>4],t+=vt[e&15];return BigInt(t)}return P(r)}function A(r,t){switch(typeof r){case"bigint":return p(r>=-V&&r<=V,"overflow",t||"value",r),Number(r);case"number":return p(Number.isInteger(r),"underflow",t||"value",r),p(r>=-V&&r<=V,"overflow",t||"value",r),r;case"string":try{if(r==="")throw new Error("empty string");return A(BigInt(r),t)}catch(e){p(!1,`invalid numeric string: ${e.message}`,t||"value",r)}}p(!1,"invalid numeric value",t||"value",r)}function kt(r){return A(rt(r))}function At(r,t){let n=G(r,"value").toString(16);if(t==null)n.length%2&&(n="0"+n);else{let s=A(t,"width");for(d(s*2>=n.length,`value exceeds width (${s} bits)`,"NUMERIC_FAULT",{operation:"toBeHex",fault:"overflow",value:r});n.length<s*2;)n="0"+n}return"0x"+n}function Nt(r){let t=G(r,"value");if(t===et)return new Uint8Array([]);let e=t.toString(16);e.length%2&&(e="0"+e);let n=new Uint8Array(e.length/2);for(let s=0;s<n.length;s++){let i=s*2;n[s]=parseInt(e.substring(i,i+2),16)}return n}function ye(r,t,e,n,s){p(!1,`invalid codepoint at offset ${t}; ${r}`,"bytes",e)}function Ft(r,t,e,n,s){if(r==="BAD_PREFIX"||r==="UNEXPECTED_CONTINUE"){let i=0;for(let o=t+1;o<e.length&&e[o]>>6===2;o++)i++;return i}return r==="OVERRUN"?e.length-t-1:0}function ge(r,t,e,n,s){return r==="OVERLONG"?(p(typeof s=="number","invalid bad code point for replacement","badCodepoint",s),n.push(s),0):(n.push(65533),Ft(r,t,e,n,s))}var me=Object.freeze({error:ye,ignore:Ft,replace:ge});function xe(r,t){t==null&&(t=me.error);let e=T(r,"bytes"),n=[],s=0;for(;s<e.length;){let i=e[s++];if(!(i>>7)){n.push(i);continue}let o=null,c=null;if((i&224)===192)o=1,c=127;else if((i&240)===224)o=2,c=2047;else if((i&248)===240)o=3,c=65535;else{(i&192)===128?s+=t("UNEXPECTED_CONTINUE",s-1,e,n):s+=t("BAD_PREFIX",s-1,e,n);continue}if(s-1+o>=e.length){s+=t("OVERRUN",s-1,e,n);continue}let a=i&(1<<8-o-1)-1;for(let l=0;l<o;l++){let f=e[s];if((f&192)!=128){s+=t("MISSING_CONTINUE",s,e,n),a=null;break}a=a<<6|f&63,s++}if(a!==null){if(a>1114111){s+=t("OUT_OF_RANGE",s-1-o,e,n,a);continue}if(a>=55296&&a<=57343){s+=t("UTF16_SURROGATE",s-1-o,e,n,a);continue}if(a<=c){s+=t("OVERLONG",s-1-o,e,n,a);continue}n.push(a)}}return n}function _t(r,t){t!=null&&(wt(t),r=r.normalize(t));let e=[];for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);if(s<128)e.push(s);else if(s<2048)e.push(s>>6|192),e.push(s&63|128);else if((s&64512)==55296){n++;let i=r.charCodeAt(n);p(n<r.length&&(i&64512)===56320,"invalid surrogate pair","str",r);let o=65536+((s&1023)<<10)+(i&1023);e.push(o>>18|240),e.push(o>>12&63|128),e.push(o>>6&63|128),e.push(o&63|128)}else e.push(s>>12|224),e.push(s>>6&63|128),e.push(s&63|128)}return new Uint8Array(e)}function we(r){return r.map(t=>t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode((t>>10&1023)+55296,(t&1023)+56320))).join("")}function $t(r,t){return we(xe(r,t))}var w=32,Bt=new Uint8Array(w),be=["then"],nt={};function X(r,t){let e=new Error(`deferred error during ABI decoding triggered accessing ${r}`);throw e.error=t,e}var Z=class r extends Array{#t;constructor(...t){let e=t[0],n=t[1],s=(t[2]||[]).slice(),i=!0;e!==nt&&(n=t,s=[],i=!1),super(n.length),n.forEach((c,a)=>{this[a]=c});let o=s.reduce((c,a)=>(typeof a=="string"&&c.set(a,(c.get(a)||0)+1),c),new Map);if(this.#t=Object.freeze(n.map((c,a)=>{let l=s[a];return l!=null&&o.get(l)===1?l:null})),!!i)return Object.freeze(this),new Proxy(this,{get:(c,a,l)=>{if(typeof a=="string"){if(a.match(/^[0-9]+$/)){let x=A(a,"%index");if(x<0||x>=this.length)throw new RangeError("out of result range");let O=c[x];return O instanceof Error&&X(`index ${x}`,O),O}if(be.indexOf(a)>=0)return Reflect.get(c,a,l);let f=c[a];if(f instanceof Function)return function(...x){return f.apply(this===l?c:this,x)};if(!(a in c))return c.getValue.apply(this===l?c:this,[a])}return Reflect.get(c,a,l)}})}toArray(){let t=[];return this.forEach((e,n)=>{e instanceof Error&&X(`index ${n}`,e),t.push(e)}),t}toObject(){return this.#t.reduce((t,e,n)=>(d(e!=null,"value at index ${ index } unnamed","UNSUPPORTED_OPERATION",{operation:"toObject()"}),e in t||(t[e]=this.getValue(e)),t),{})}slice(t,e){t==null&&(t=0),t<0&&(t+=this.length,t<0&&(t=0)),e==null&&(e=this.length),e<0&&(e+=this.length,e<0&&(e=0)),e>this.length&&(e=this.length);let n=[],s=[];for(let i=t;i<e;i++)n.push(this[i]),s.push(this.#t[i]);return new r(nt,n,s)}filter(t,e){let n=[],s=[];for(let i=0;i<this.length;i++){let o=this[i];o instanceof Error&&X(`index ${i}`,o),t.call(e,o,i,this)&&(n.push(o),s.push(this.#t[i]))}return new r(nt,n,s)}map(t,e){let n=[];for(let s=0;s<this.length;s++){let i=this[s];i instanceof Error&&X(`index ${s}`,i),n.push(t.call(e,i,s,this))}return n}getValue(t){let e=this.#t.indexOf(t);if(e===-1)return;let n=this[e];return n instanceof Error&&X(`property ${JSON.stringify(t)}`,n.error),n}static fromItems(t,e){return new r(nt,t,e)}};function Vt(r){let t=Nt(r);return d(t.length<=w,"value out-of-bounds","BUFFER_OVERRUN",{buffer:t,length:w,offset:t.length}),t.length!==w&&(t=E(J([Bt.slice(t.length%w),t]))),t}var y=class{name;type;localName;dynamic;constructor(t,e,n,s){m(this,{name:t,type:e,localName:n,dynamic:s},{name:"string",type:"string",localName:"string",dynamic:"boolean"})}_throwError(t,e){p(!1,t,this.localName,e)}},U=class{#t;#e;constructor(){this.#t=[],this.#e=0}get data(){return J(this.#t)}get length(){return this.#e}#r(t){return this.#t.push(t),this.#e+=t.length,t.length}appendWriter(t){return this.#r(E(t.data))}writeBytes(t){let e=E(t),n=e.length%w;return n&&(e=E(J([e,Bt.slice(n)]))),this.#r(e)}writeValue(t){return this.#r(Vt(t))}writeUpdatableValue(){let t=this.#t.length;return this.#t.push(Bt),this.#e+=w,e=>{this.#t[t]=Vt(e)}}},st=class r{allowLoose;#t;#e;constructor(t,e){m(this,{allowLoose:!!e}),this.#t=E(t),this.#e=0}get data(){return b(this.#t)}get dataLength(){return this.#t.length}get consumed(){return this.#e}get bytes(){return new Uint8Array(this.#t)}#r(t,e,n){let s=Math.ceil(e/w)*w;return this.#e+s>this.#t.length&&(this.allowLoose&&n&&this.#e+e<=this.#t.length?s=e:d(!1,"data out-of-bounds","BUFFER_OVERRUN",{buffer:E(this.#t),length:this.#t.length,offset:this.#e+s})),this.#t.slice(this.#e,this.#e+s)}subReader(t){return new r(this.#t.slice(this.#e+t),this.allowLoose)}readBytes(t,e){let n=this.#r(0,t,!!e);return this.#e+=n.length,n.slice(0,t)}readValue(){return rt(this.readBytes(w))}readIndex(){return kt(this.readBytes(w))}};function Ot(r){if(!Number.isSafeInteger(r)||r<0)throw new Error(`Wrong positive integer: ${r}`)}function Ee(r){if(typeof r!="boolean")throw new Error(`Expected boolean, not ${r}`)}function Dt(r,...t){if(!(r instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(t.length>0&&!t.includes(r.length))throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${r.length}`)}function ke(r){if(typeof r!="function"||typeof r.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Ot(r.outputLen),Ot(r.blockLen)}function Ae(r,t=!0){if(r.destroyed)throw new Error("Hash instance has been destroyed");if(t&&r.finished)throw new Error("Hash#digest() has already been called")}function Ne(r,t){Dt(r);let e=t.outputLen;if(r.length<e)throw new Error(`digestInto() expects output buffer of length at least ${e}`)}var Be={number:Ot,bool:Ee,bytes:Dt,hash:ke,exists:Ae,output:Ne},R=Be;var Oe={node:void 0,web:typeof self=="object"&&"crypto"in self?self.crypto:void 0};var Mt=r=>new Uint32Array(r.buffer,r.byteOffset,Math.floor(r.byteLength/4));var Te=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!Te)throw new Error("Non little-endian hardware is not supported");var cn=Array.from({length:256},(r,t)=>t.toString(16).padStart(2,"0"));function Se(r){if(typeof r!="string")throw new TypeError(`utf8ToBytes expected string, got ${typeof r}`);return new TextEncoder().encode(r)}function ot(r){if(typeof r=="string"&&(r=Se(r)),!(r instanceof Uint8Array))throw new TypeError(`Expected input type is Uint8Array (got ${typeof r})`);return r}var it=class{clone(){return this._cloneInto()}};function zt(r){let t=n=>r().update(ot(n)).digest(),e=r();return t.outputLen=e.outputLen,t.blockLen=e.blockLen,t.create=()=>r(),t}function Ht(r){let t=(n,s)=>r(s).update(ot(n)).digest(),e=r({});return t.outputLen=e.outputLen,t.blockLen=e.blockLen,t.create=n=>r(n),t}var at=BigInt(4294967295),Tt=BigInt(32);function Wt(r,t=!1){return t?{h:Number(r&at),l:Number(r>>Tt&at)}:{h:Number(r>>Tt&at)|0,l:Number(r&at)|0}}function Ie(r,t=!1){let e=new Uint32Array(r.length),n=new Uint32Array(r.length);for(let s=0;s<r.length;s++){let{h:i,l:o}=Wt(r[s],t);[e[s],n[s]]=[i,o]}return[e,n]}var Pe=(r,t)=>BigInt(r>>>0)<<Tt|BigInt(t>>>0),Ue=(r,t,e)=>r>>>e,Re=(r,t,e)=>r<<32-e|t>>>e,Ce=(r,t,e)=>r>>>e|t<<32-e,Le=(r,t,e)=>r<<32-e|t>>>e,ve=(r,t,e)=>r<<64-e|t>>>e-32,Fe=(r,t,e)=>r>>>e-32|t<<64-e,_e=(r,t)=>t,$e=(r,t)=>r,Ve=(r,t,e)=>r<<e|t>>>32-e,De=(r,t,e)=>t<<e|r>>>32-e,Me=(r,t,e)=>t<<e-32|r>>>64-e,ze=(r,t,e)=>r<<e-32|t>>>64-e;function He(r,t,e,n){let s=(t>>>0)+(n>>>0);return{h:r+e+(s/2**32|0)|0,l:s|0}}var We=(r,t,e)=>(r>>>0)+(t>>>0)+(e>>>0),Ke=(r,t,e,n)=>t+e+n+(r/2**32|0)|0,Je=(r,t,e,n)=>(r>>>0)+(t>>>0)+(e>>>0)+(n>>>0),Ge=(r,t,e,n,s)=>t+e+n+s+(r/2**32|0)|0,Xe=(r,t,e,n,s)=>(r>>>0)+(t>>>0)+(e>>>0)+(n>>>0)+(s>>>0),Ze=(r,t,e,n,s,i)=>t+e+n+s+i+(r/2**32|0)|0,qe={fromBig:Wt,split:Ie,toBig:Pe,shrSH:Ue,shrSL:Re,rotrSH:Ce,rotrSL:Le,rotrBH:ve,rotrBL:Fe,rotr32H:_e,rotr32L:$e,rotlSH:Ve,rotlSL:De,rotlBH:Me,rotlBL:ze,add:He,add3L:We,add3H:Ke,add4L:Je,add4H:Ge,add5H:Ze,add5L:Xe},M=qe;var[Gt,Xt,Zt]=[[],[],[]],Ye=BigInt(0),q=BigInt(1),Qe=BigInt(2),je=BigInt(7),tr=BigInt(256),er=BigInt(113);for(let r=0,t=q,e=1,n=0;r<24;r++){[e,n]=[n,(2*e+3*n)%5],Gt.push(2*(5*n+e)),Xt.push((r+1)*(r+2)/2%64);let s=Ye;for(let i=0;i<7;i++)t=(t<<q^(t>>je)*er)%tr,t&Qe&&(s^=q<<(q<<BigInt(i))-q);Zt.push(s)}var[rr,nr]=M.split(Zt,!0),Kt=(r,t,e)=>e>32?M.rotlBH(r,t,e):M.rotlSH(r,t,e),Jt=(r,t,e)=>e>32?M.rotlBL(r,t,e):M.rotlSL(r,t,e);function sr(r,t=24){let e=new Uint32Array(10);for(let n=24-t;n<24;n++){for(let o=0;o<10;o++)e[o]=r[o]^r[o+10]^r[o+20]^r[o+30]^r[o+40];for(let o=0;o<10;o+=2){let c=(o+8)%10,a=(o+2)%10,l=e[a],f=e[a+1],x=Kt(l,f,1)^e[c],O=Jt(l,f,1)^e[c+1];for(let I=0;I<50;I+=10)r[o+I]^=x,r[o+I+1]^=O}let s=r[2],i=r[3];for(let o=0;o<24;o++){let c=Xt[o],a=Kt(s,i,c),l=Jt(s,i,c),f=Gt[o];s=r[f],i=r[f+1],r[f]=a,r[f+1]=l}for(let o=0;o<50;o+=10){for(let c=0;c<10;c++)e[c]=r[o+c];for(let c=0;c<10;c++)r[o+c]^=~e[(c+2)%10]&e[(c+4)%10]}r[0]^=rr[n],r[1]^=nr[n]}e.fill(0)}var ct=class r extends it{constructor(t,e,n,s=!1,i=24){if(super(),this.blockLen=t,this.suffix=e,this.outputLen=n,this.enableXOF=s,this.rounds=i,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,R.number(n),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=Mt(this.state)}keccak(){sr(this.state32,this.rounds),this.posOut=0,this.pos=0}update(t){R.exists(this);let{blockLen:e,state:n}=this;t=ot(t);let s=t.length;for(let i=0;i<s;){let o=Math.min(e-this.pos,s-i);for(let c=0;c<o;c++)n[this.pos++]^=t[i++];this.pos===e&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:t,suffix:e,pos:n,blockLen:s}=this;t[n]^=e,e&128&&n===s-1&&this.keccak(),t[s-1]^=128,this.keccak()}writeInto(t){R.exists(this,!1),R.bytes(t),this.finish();let e=this.state,{blockLen:n}=this;for(let s=0,i=t.length;s<i;){this.posOut>=n&&this.keccak();let o=Math.min(n-this.posOut,i-s);t.set(e.subarray(this.posOut,this.posOut+o),s),this.posOut+=o,s+=o}return t}xofInto(t){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(t)}xof(t){return R.number(t),this.xofInto(new Uint8Array(t))}digestInto(t){if(R.output(t,this),this.finished)throw new Error("digest() was already called");return this.writeInto(t),this.destroy(),t}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(t){let{blockLen:e,suffix:n,outputLen:s,rounds:i,enableXOF:o}=this;return t||(t=new r(e,n,s,o,i)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=i,t.suffix=n,t.outputLen=s,t.enableXOF=o,t.destroyed=this.destroyed,t}},S=(r,t,e)=>zt(()=>new ct(t,r,e)),dn=S(6,144,224/8),yn=S(6,136,256/8),gn=S(6,104,384/8),mn=S(6,72,512/8),xn=S(1,144,224/8),qt=S(1,136,256/8),wn=S(1,104,384/8),bn=S(1,72,512/8),Yt=(r,t,e)=>Ht((n={})=>new ct(t,r,n.dkLen===void 0?e:n.dkLen,!0)),En=Yt(31,168,128/8),kn=Yt(31,136,256/8);var Qt=!1,jt=function(r){return qt(r)},te=jt;function C(r){let t=T(r,"data");return b(te(t))}C._=jt;C.lock=function(){Qt=!0};C.register=function(r){if(Qt)throw new TypeError("keccak256 is locked");te=r};Object.freeze(C);var ir=BigInt(0),or=BigInt(36);function ee(r){r=r.toLowerCase();let t=r.substring(2).split(""),e=new Uint8Array(40);for(let s=0;s<40;s++)e[s]=t[s].charCodeAt(0);let n=T(C(e));for(let s=0;s<40;s+=2)n[s>>1]>>4>=8&&(t[s]=t[s].toUpperCase()),(n[s>>1]&15)>=8&&(t[s+1]=t[s+1].toUpperCase());return"0x"+t.join("")}var St={};for(let r=0;r<10;r++)St[String(r)]=String(r);for(let r=0;r<26;r++)St[String.fromCharCode(65+r)]=String(10+r);var re=15;function ar(r){r=r.toUpperCase(),r=r.substring(4)+r.substring(0,2)+"00";let t=r.split("").map(n=>St[n]).join("");for(;t.length>=re;){let n=t.substring(0,re);t=parseInt(n,10)%97+t.substring(n.length)}let e=String(98-parseInt(t,10)%97);for(;e.length<2;)e="0"+e;return e}var cr=function(){let r={};for(let t=0;t<36;t++){let e="0123456789abcdefghijklmnopqrstuvwxyz"[t];r[e]=BigInt(t)}return r}();function ur(r){r=r.toLowerCase();let t=ir;for(let e=0;e<r.length;e++)t=t*or+cr[r[e]];return t}function L(r){if(p(typeof r=="string","invalid address","address",r),r.match(/^(0x)?[0-9a-fA-F]{40}$/)){r.startsWith("0x")||(r="0x"+r);let t=ee(r);return p(!r.match(/([A-F].*[a-f])|([a-f].*[A-F])/)||t===r,"bad address checksum","address",r),t}if(r.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)){p(r.substring(2,4)===ar(r),"bad icap checksum","address",r);let t=ur(r.substring(4)).toString(16);for(;t.length<40;)t="0"+t;return ee("0x"+t)}p(!1,"invalid address","address",r)}var N={};function u(r,t){let e=!1;return t<0&&(e=!0,t*=-1),new g(N,`${e?"":"u"}int${t}`,r,{signed:e,width:t})}function h(r,t){return new g(N,`bytes${t||""}`,r,{size:t})}var ne=Symbol.for("_ethers_typed"),g=class r{type;value;#t;_typedSymbol;constructor(t,e,n,s){s==null&&(s=null),K(N,t,"Typed"),m(this,{_typedSymbol:ne,type:e,value:n}),this.#t=s,this.format()}format(){if(this.type==="array")throw new Error("");if(this.type==="dynamicArray")throw new Error("");return this.type==="tuple"?`tuple(${this.value.map(t=>t.format()).join(",")})`:this.type}defaultValue(){return 0}minValue(){return 0}maxValue(){return 0}isBigInt(){return!!this.type.match(/^u?int[0-9]+$/)}isData(){return this.type.startsWith("bytes")}isString(){return this.type==="string"}get tupleName(){if(this.type!=="tuple")throw TypeError("not a tuple");return this.#t}get arrayLength(){if(this.type!=="array")throw TypeError("not an array");return this.#t===!0?-1:this.#t===!1?this.value.length:null}static from(t,e){return new r(N,t,e)}static uint8(t){return u(t,8)}static uint16(t){return u(t,16)}static uint24(t){return u(t,24)}static uint32(t){return u(t,32)}static uint40(t){return u(t,40)}static uint48(t){return u(t,48)}static uint56(t){return u(t,56)}static uint64(t){return u(t,64)}static uint72(t){return u(t,72)}static uint80(t){return u(t,80)}static uint88(t){return u(t,88)}static uint96(t){return u(t,96)}static uint104(t){return u(t,104)}static uint112(t){return u(t,112)}static uint120(t){return u(t,120)}static uint128(t){return u(t,128)}static uint136(t){return u(t,136)}static uint144(t){return u(t,144)}static uint152(t){return u(t,152)}static uint160(t){return u(t,160)}static uint168(t){return u(t,168)}static uint176(t){return u(t,176)}static uint184(t){return u(t,184)}static uint192(t){return u(t,192)}static uint200(t){return u(t,200)}static uint208(t){return u(t,208)}static uint216(t){return u(t,216)}static uint224(t){return u(t,224)}static uint232(t){return u(t,232)}static uint240(t){return u(t,240)}static uint248(t){return u(t,248)}static uint256(t){return u(t,256)}static uint(t){return u(t,256)}static int8(t){return u(t,-8)}static int16(t){return u(t,-16)}static int24(t){return u(t,-24)}static int32(t){return u(t,-32)}static int40(t){return u(t,-40)}static int48(t){return u(t,-48)}static int56(t){return u(t,-56)}static int64(t){return u(t,-64)}static int72(t){return u(t,-72)}static int80(t){return u(t,-80)}static int88(t){return u(t,-88)}static int96(t){return u(t,-96)}static int104(t){return u(t,-104)}static int112(t){return u(t,-112)}static int120(t){return u(t,-120)}static int128(t){return u(t,-128)}static int136(t){return u(t,-136)}static int144(t){return u(t,-144)}static int152(t){return u(t,-152)}static int160(t){return u(t,-160)}static int168(t){return u(t,-168)}static int176(t){return u(t,-176)}static int184(t){return u(t,-184)}static int192(t){return u(t,-192)}static int200(t){return u(t,-200)}static int208(t){return u(t,-208)}static int216(t){return u(t,-216)}static int224(t){return u(t,-224)}static int232(t){return u(t,-232)}static int240(t){return u(t,-240)}static int248(t){return u(t,-248)}static int256(t){return u(t,-256)}static int(t){return u(t,-256)}static bytes1(t){return h(t,1)}static bytes2(t){return h(t,2)}static bytes3(t){return h(t,3)}static bytes4(t){return h(t,4)}static bytes5(t){return h(t,5)}static bytes6(t){return h(t,6)}static bytes7(t){return h(t,7)}static bytes8(t){return h(t,8)}static bytes9(t){return h(t,9)}static bytes10(t){return h(t,10)}static bytes11(t){return h(t,11)}static bytes12(t){return h(t,12)}static bytes13(t){return h(t,13)}static bytes14(t){return h(t,14)}static bytes15(t){return h(t,15)}static bytes16(t){return h(t,16)}static bytes17(t){return h(t,17)}static bytes18(t){return h(t,18)}static bytes19(t){return h(t,19)}static bytes20(t){return h(t,20)}static bytes21(t){return h(t,21)}static bytes22(t){return h(t,22)}static bytes23(t){return h(t,23)}static bytes24(t){return h(t,24)}static bytes25(t){return h(t,25)}static bytes26(t){return h(t,26)}static bytes27(t){return h(t,27)}static bytes28(t){return h(t,28)}static bytes29(t){return h(t,29)}static bytes30(t){return h(t,30)}static bytes31(t){return h(t,31)}static bytes32(t){return h(t,32)}static address(t){return new r(N,"address",t)}static bool(t){return new r(N,"bool",!!t)}static bytes(t){return new r(N,"bytes",t)}static string(t){return new r(N,"string",t)}static array(t,e){throw new Error("not implemented yet")}static tuple(t,e){throw new Error("not implemented yet")}static overrides(t){return new r(N,"overrides",Object.assign({},t))}static isTyped(t){return t&&typeof t=="object"&&"_typedSymbol"in t&&t._typedSymbol===ne}static dereference(t,e){if(r.isTyped(t)){if(t.type!==e)throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);return t.value}return t}};var ut=class extends y{constructor(t){super("address","address",t,!1)}defaultValue(){return"0x0000000000000000000000000000000000000000"}encode(t,e){let n=g.dereference(e,"string");try{n=L(n)}catch(s){return this._throwError(s.message,e)}return t.writeValue(n)}decode(t){return L(At(t.readValue(),20))}};var lt=class extends y{coder;constructor(t){super(t.name,t.type,"_",t.dynamic),this.coder=t}defaultValue(){return this.coder.defaultValue()}encode(t,e){return this.coder.encode(t,e)}decode(t){return this.coder.decode(t)}};function It(r,t,e){let n=[];if(Array.isArray(e))n=e;else if(e&&typeof e=="object"){let a={};n=t.map(l=>{let f=l.localName;return d(f,"cannot encode object for signature with missing names","INVALID_ARGUMENT",{argument:"values",info:{coder:l},value:e}),d(!a[f],"cannot encode object for signature with duplicate names","INVALID_ARGUMENT",{argument:"values",info:{coder:l},value:e}),a[f]=!0,e[f]})}else p(!1,"invalid tuple value","tuple",e);p(t.length===n.length,"types/value length mismatch","tuple",e);let s=new U,i=new U,o=[];t.forEach((a,l)=>{let f=n[l];if(a.dynamic){let x=i.length;a.encode(i,f);let O=s.writeUpdatableValue();o.push(I=>{O(I+x)})}else a.encode(s,f)}),o.forEach(a=>{a(s.length)});let c=r.appendWriter(s);return c+=r.appendWriter(i),c}function Pt(r,t){let e=[],n=[],s=r.subReader(0);return t.forEach(i=>{let o=null;if(i.dynamic){let c=r.readIndex(),a=s.subReader(c);try{o=i.decode(a)}catch(l){if(j(l,"BUFFER_OVERRUN"))throw l;o=l,o.baseType=i.name,o.name=i.localName,o.type=i.type}}else try{o=i.decode(r)}catch(c){if(j(c,"BUFFER_OVERRUN"))throw c;o=c,o.baseType=i.name,o.name=i.localName,o.type=i.type}if(o==null)throw new Error("investigate");e.push(o),n.push(i.localName||null)}),Z.fromItems(e,n)}var ft=class extends y{coder;length;constructor(t,e,n){let s=t.type+"["+(e>=0?e:"")+"]",i=e===-1||t.dynamic;super("array",s,n,i),m(this,{coder:t,length:e})}defaultValue(){let t=this.coder.defaultValue(),e=[];for(let n=0;n<this.length;n++)e.push(t);return e}encode(t,e){let n=g.dereference(e,"array");Array.isArray(n)||this._throwError("expected array value",n);let s=this.length;s===-1&&(s=n.length,t.writeValue(n.length)),W(n.length,s,"coder array"+(this.localName?" "+this.localName:""));let i=[];for(let o=0;o<n.length;o++)i.push(this.coder);return It(t,i,n)}decode(t){let e=this.length;e===-1&&(e=t.readIndex(),d(e*w<=t.dataLength,"insufficient data length","BUFFER_OVERRUN",{buffer:t.bytes,offset:e*w,length:t.dataLength}));let n=[];for(let s=0;s<e;s++)n.push(new lt(this.coder));return Pt(t,n)}};var pt=class extends y{constructor(t){super("bool","bool",t,!1)}defaultValue(){return!1}encode(t,e){let n=g.dereference(e,"bool");return t.writeValue(n?1:0)}decode(t){return!!t.readValue()}};var Y=class extends y{constructor(t,e){super(t,t,e,!0)}defaultValue(){return"0x"}encode(t,e){e=E(e);let n=t.writeValue(e.length);return n+=t.writeBytes(e),n}decode(t){return t.readBytes(t.readIndex(),!0)}},ht=class extends Y{constructor(t){super("bytes",t)}decode(t){return b(super.decode(t))}};var dt=class extends y{size;constructor(t,e){let n="bytes"+String(t);super(n,n,e,!1),m(this,{size:t},{size:"number"})}defaultValue(){return"0x0000000000000000000000000000000000000000000000000000000000000000".substring(0,2+this.size*2)}encode(t,e){let n=E(g.dereference(e,this.type));return n.length!==this.size&&this._throwError("incorrect data length",e),t.writeBytes(n)}decode(t){return b(t.readBytes(this.size))}};var lr=new Uint8Array([]),yt=class extends y{constructor(t){super("null","",t,!1)}defaultValue(){return null}encode(t,e){return e!=null&&this._throwError("not null",e),t.writeBytes(lr)}decode(t){return t.readBytes(0),null}};var fr=BigInt(0),pr=BigInt(1),hr=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),gt=class extends y{size;signed;constructor(t,e,n){let s=(e?"int":"uint")+t*8;super(s,s,n,!1),m(this,{size:t,signed:e},{size:"number",signed:"boolean"})}defaultValue(){return 0}encode(t,e){let n=P(g.dereference(e,this.type)),s=D(hr,w*8);if(this.signed){let i=D(s,this.size*8-1);(n>i||n<-(i+pr))&&this._throwError("value out-of-bounds",e),n=Et(n,8*w)}else(n<fr||n>D(s,this.size*8))&&this._throwError("value out-of-bounds",e);return t.writeValue(n)}decode(t){let e=D(t.readValue(),this.size*8);return this.signed&&(e=bt(e,this.size*8)),e}};var mt=class extends Y{constructor(t){super("string",t)}defaultValue(){return""}encode(t,e){return super.encode(t,_t(g.dereference(e,"string")))}decode(t){return $t(super.decode(t))}};var v=class extends y{coders;constructor(t,e){let n=!1,s=[];t.forEach(o=>{o.dynamic&&(n=!0),s.push(o.type)});let i="tuple("+s.join(",")+")";super("tuple",i,e,n),m(this,{coders:Object.freeze(t.slice())})}defaultValue(){let t=[];this.coders.forEach(n=>{t.push(n.defaultValue())});let e=this.coders.reduce((n,s)=>{let i=s.localName;return i&&(n[i]||(n[i]=0),n[i]++),n},{});return this.coders.forEach((n,s)=>{let i=n.localName;!i||e[i]!==1||(i==="length"&&(i="_length"),t[i]==null&&(t[i]=t[s]))}),Object.freeze(t)}encode(t,e){let n=g.dereference(e,"tuple");return It(t,this.coders,n)}decode(t){return Pt(t,this.coders)}};function H(r){let t=new Set;return r.forEach(e=>t.add(e)),Object.freeze(t)}var dr="external public payable",Es=H(dr.split(" ")),ce="constant external internal payable private public pure view",ks=H(ce.split(" ")),ue="constructor error event fallback function receive struct",As=H(ue.split(" ")),le="calldata memory storage payable indexed",yr=H(le.split(" ")),gr="tuple returns",mr=[ue,le,gr,ce].join(" "),xr=H(mr.split(" ")),wr={"(":"OPEN_PAREN",")":"CLOSE_PAREN","[":"OPEN_BRACKET","]":"CLOSE_BRACKET",",":"COMMA","@":"AT"},br=new RegExp("^(\\s*)"),Er=new RegExp("^([0-9]+)"),kr=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"),Ar=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"),fe=new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$"),xt=class r{#t;#e;get offset(){return this.#t}get length(){return this.#e.length-this.#t}constructor(t){this.#t=0,this.#e=t.slice()}clone(){return new r(this.#e)}reset(){this.#t=0}#r(t=0,e=0){return new r(this.#e.slice(t,e).map(n=>Object.freeze(Object.assign({},n,{match:n.match-t,linkBack:n.linkBack-t,linkNext:n.linkNext-t}))))}popKeyword(t){let e=this.peek();if(e.type!=="KEYWORD"||!t.has(e.text))throw new Error(`expected keyword ${e.text}`);return this.pop().text}popType(t){if(this.peek().type!==t)throw new Error(`expected ${t}; got ${JSON.stringify(this.peek())}`);return this.pop().text}popParen(){let t=this.peek();if(t.type!=="OPEN_PAREN")throw new Error("bad start");let e=this.#r(this.#t+1,t.match+1);return this.#t=t.match+1,e}popParams(){let t=this.peek();if(t.type!=="OPEN_PAREN")throw new Error("bad start");let e=[];for(;this.#t<t.match-1;){let n=this.peek().linkNext;e.push(this.#r(this.#t+1,n)),this.#t=n}return this.#t=t.match+1,e}peek(){if(this.#t>=this.#e.length)throw new Error("out-of-bounds");return this.#e[this.#t]}peekKeyword(t){let e=this.peekType("KEYWORD");return e!=null&&t.has(e)?e:null}peekType(t){if(this.length===0)return null;let e=this.peek();return e.type===t?e.text:null}pop(){let t=this.peek();return this.#t++,t}toString(){let t=[];for(let e=this.#t;e<this.#e.length;e++){let n=this.#e[e];t.push(`${n.type}:${n.text}`)}return`<TokenString ${t.join(" ")}>`}};function Nr(r){let t=[],e=o=>{let c=i<r.length?JSON.stringify(r[i]):"$EOI";throw new Error(`invalid token ${c} at ${i}: ${o}`)},n=[],s=[],i=0;for(;i<r.length;){let o=r.substring(i),c=o.match(br);c&&(i+=c[1].length,o=r.substring(i));let a={depth:n.length,linkBack:-1,linkNext:-1,match:-1,type:"",text:"",offset:i,value:-1};t.push(a);let l=wr[o[0]]||"";if(l){if(a.type=l,a.text=o[0],i++,l==="OPEN_PAREN")n.push(t.length-1),s.push(t.length-1);else if(l=="CLOSE_PAREN")n.length===0&&e("no matching open bracket"),a.match=n.pop(),t[a.match].match=t.length-1,a.depth--,a.linkBack=s.pop(),t[a.linkBack].linkNext=t.length-1;else if(l==="COMMA")a.linkBack=s.pop(),t[a.linkBack].linkNext=t.length-1,s.push(t.length-1);else if(l==="OPEN_BRACKET")a.type="BRACKET";else if(l==="CLOSE_BRACKET"){let f=t.pop().text;if(t.length>0&&t[t.length-1].type==="NUMBER"){let x=t.pop().text;f=x+f,t[t.length-1].value=A(x)}if(t.length===0||t[t.length-1].type!=="BRACKET")throw new Error("missing opening bracket");t[t.length-1].text+=f}continue}if(c=o.match(kr),c){if(a.text=c[1],i+=a.text.length,xr.has(a.text)){a.type="KEYWORD";continue}if(a.text.match(fe)){a.type="TYPE";continue}a.type="ID";continue}if(c=o.match(Er),c){a.text=c[1],a.type="NUMBER",i+=a.text.length;continue}throw new Error(`unexpected token ${JSON.stringify(o[0])} at position ${i}`)}return new xt(t.map(o=>Object.freeze(o)))}function se(r,t){let e=new Set;for(;;){let n=r.peekType("KEYWORD");if(n==null||t&&!t.has(n))break;if(r.pop(),e.has(n))throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);e.add(n)}return Object.freeze(e)}var Br=new RegExp(/^(.*)\[([0-9]*)\]$/);function ie(r){let t=r.match(fe);if(p(t,"invalid type","type",r),r==="uint")return"uint256";if(r==="int")return"int256";if(t[2]){let e=parseInt(t[2]);p(e!==0&&e<=32,"invalid bytes length","type",r)}else if(t[3]){let e=parseInt(t[3]);p(e!==0&&e<=256&&e%8===0,"invalid numeric width","type",r)}return r}var z={},oe=Symbol.for("_ethers_internal"),ae="_ParamTypeInternal";var F=class r{name;type;baseType;indexed;components;arrayLength;arrayChildren;constructor(t,e,n,s,i,o,c,a){if(K(t,z,"ParamType"),Object.defineProperty(this,oe,{value:ae}),o&&(o=Object.freeze(o.slice())),s==="array"){if(c==null||a==null)throw new Error("")}else if(c!=null||a!=null)throw new Error("");if(s==="tuple"){if(o==null)throw new Error("")}else if(o!=null)throw new Error("");m(this,{name:e,type:n,baseType:s,indexed:i,components:o,arrayLength:c,arrayChildren:a})}format(t){if(t==null&&(t="sighash"),t==="json"){let n=this.name||"";if(this.isArray()){let i=JSON.parse(this.arrayChildren.format("json"));return i.name=n,i.type+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`,JSON.stringify(i)}let s={type:this.baseType==="tuple"?"tuple":this.type,name:n};return typeof this.indexed=="boolean"&&(s.indexed=this.indexed),this.isTuple()&&(s.components=this.components.map(i=>JSON.parse(i.format(t)))),JSON.stringify(s)}let e="";return this.isArray()?(e+=this.arrayChildren.format(t),e+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`):this.isTuple()?(t!=="sighash"&&(e+=this.type),e+="("+this.components.map(n=>n.format(t)).join(t==="full"?", ":",")+")"):e+=this.type,t!=="sighash"&&(this.indexed===!0&&(e+=" indexed"),t==="full"&&this.name&&(e+=" "+this.name)),e}isArray(){return this.baseType==="array"}isTuple(){return this.baseType==="tuple"}isIndexable(){return this.indexed!=null}walk(t,e){if(this.isArray()){if(!Array.isArray(t))throw new Error("invalid array value");if(this.arrayLength!==-1&&t.length!==this.arrayLength)throw new Error("array is wrong length");let n=this;return t.map(s=>n.arrayChildren.walk(s,e))}if(this.isTuple()){if(!Array.isArray(t))throw new Error("invalid tuple value");if(t.length!==this.components.length)throw new Error("array is wrong length");let n=this;return t.map((s,i)=>n.components[i].walk(s,e))}return e(this.type,t)}#t(t,e,n,s){if(this.isArray()){if(!Array.isArray(e))throw new Error("invalid array value");if(this.arrayLength!==-1&&e.length!==this.arrayLength)throw new Error("array is wrong length");let o=this.arrayChildren,c=e.slice();c.forEach((a,l)=>{o.#t(t,a,n,f=>{c[l]=f})}),s(c);return}if(this.isTuple()){let o=this.components,c;if(Array.isArray(e))c=e.slice();else{if(e==null||typeof e!="object")throw new Error("invalid tuple value");c=o.map(a=>{if(!a.name)throw new Error("cannot use object value with unnamed components");if(!(a.name in e))throw new Error(`missing value for component ${a.name}`);return e[a.name]})}if(c.length!==this.components.length)throw new Error("array is wrong length");c.forEach((a,l)=>{o[l].#t(t,a,n,f=>{c[l]=f})}),s(c);return}let i=n(this.type,e);i.then?t.push(async function(){s(await i)}()):s(i)}async walkAsync(t,e){let n=[],s=[t];return this.#t(n,t,e,i=>{s[0]=i}),n.length&&await Promise.all(n),s[0]}static from(t,e){if(r.isParamType(t))return t;if(typeof t=="string")try{return r.from(Nr(t),e)}catch{p(!1,"invalid param type","obj",t)}else if(t instanceof xt){let c="",a="",l=null;se(t,H(["tuple"])).has("tuple")||t.peekType("OPEN_PAREN")?(a="tuple",l=t.popParams().map(_=>r.from(_)),c=`tuple(${l.map(_=>_.format()).join(",")})`):(c=ie(t.popType("TYPE")),a=c);let f=null,x=null;for(;t.length&&t.peekType("BRACKET");){let _=t.pop();f=new r(z,"",c,a,null,l,x,f),x=_.value,c+=_.text,a="array",l=null}let O=null;if(se(t,yr).has("indexed")){if(!e)throw new Error("");O=!0}let pe=t.peekType("ID")?t.pop().text:"";if(t.length)throw new Error("leftover tokens");return new r(z,pe,c,a,O,l,x,f)}let n=t.name;p(!n||typeof n=="string"&&n.match(Ar),"invalid name","obj.name",n);let s=t.indexed;s!=null&&(p(e,"parameter cannot be indexed","obj.indexed",t.indexed),s=!!s);let i=t.type,o=i.match(Br);if(o){let c=parseInt(o[2]||"-1"),a=r.from({type:o[1],components:t.components});return new r(z,n||"",i,"array",s,null,c,a)}if(i==="tuple"||i.startsWith("tuple(")||i.startsWith("(")){let c=t.components!=null?t.components.map(l=>r.from(l)):null;return new r(z,n||"",i,"tuple",s,c,null,null)}return i=ie(t.type),new r(z,n||"",i,i,s,null,null,null)}static isParamType(t){return t&&t[oe]===ae}};var B=new Map;B.set(0,"GENERIC_PANIC");B.set(1,"ASSERT_FALSE");B.set(17,"OVERFLOW");B.set(18,"DIVIDE_BY_ZERO");B.set(33,"ENUM_RANGE_ERROR");B.set(34,"BAD_STORAGE_DATA");B.set(49,"STACK_UNDERFLOW");B.set(50,"ARRAY_RANGE_ERROR");B.set(65,"OUT_OF_MEMORY");B.set(81,"UNINITIALIZED_FUNCTION_CALL");var Or=new RegExp(/^bytes([0-9]*)$/),Tr=new RegExp(/^(u?int)([0-9]*)$/),Ut=null;function Sr(r,t,e,n){let s="missing revert data",i=null,o=null,c=null;if(e){s="execution reverted";let l=T(e);if(e=b(e),l.length===0)s+=" (no data present; likely require(false) occurred",i="require(false)";else if(l.length%32!==4)s+=" (could not decode reason; invalid data length)";else if(b(l.slice(0,4))==="0x08c379a0")try{i=n.decode(["string"],l.slice(4))[0],c={signature:"Error(string)",name:"Error",args:[i]},s+=`: ${JSON.stringify(i)}`}catch{s+=" (could not decode reason; invalid string data)"}else if(b(l.slice(0,4))==="0x4e487b71")try{let f=Number(n.decode(["uint256"],l.slice(4))[0]);c={signature:"Panic(uint256)",name:"Panic",args:[f]},i=`Panic due to ${B.get(f)||"UNKNOWN"}(${f})`,s+=`: ${i}`}catch{s+=" (could not decode panic code)"}else s+=" (unknown custom error)"}let a={to:t.to?L(t.to):null,data:t.data||"0x"};return t.from&&(a.from=L(t.from)),tt(s,"CALL_EXCEPTION",{action:r,data:e,reason:i,transaction:a,invocation:o,revert:c})}var Q=class r{#t(t){if(t.isArray())return new ft(this.#t(t.arrayChildren),t.arrayLength,t.name);if(t.isTuple())return new v(t.components.map(n=>this.#t(n)),t.name);switch(t.baseType){case"address":return new ut(t.name);case"bool":return new pt(t.name);case"string":return new mt(t.name);case"bytes":return new ht(t.name);case"":return new yt(t.name)}let e=t.type.match(Tr);if(e){let n=parseInt(e[2]||"256");return p(n!==0&&n<=256&&n%8===0,"invalid "+e[1]+" bit length","param",t),new gt(n/8,e[1]==="int",t.name)}if(e=t.type.match(Or),e){let n=parseInt(e[1]);return p(n!==0&&n<=32,"invalid bytes length","param",t),new dt(n,t.name)}p(!1,"invalid type","type",t.type)}getDefaultValue(t){let e=t.map(s=>this.#t(F.from(s)));return new v(e,"_").defaultValue()}encode(t,e){W(e.length,t.length,"types/values length mismatch");let n=t.map(o=>this.#t(F.from(o))),s=new v(n,"_"),i=new U;return s.encode(i,e),i.data}decode(t,e,n){let s=t.map(o=>this.#t(F.from(o)));return new v(s,"_").decode(new st(e,n))}static defaultAbiCoder(){return Ut==null&&(Ut=new r),Ut}static getBuiltinCallException(t,e,n){return Sr(t,e,n,r.defaultAbiCoder())}};export{Q as AbiCoder};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
