var e=Object.defineProperty,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,n=(t,o,r)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,s=(e,s)=>{for(var a in s||(s={}))o.call(s,a)&&n(e,a,s[a]);if(t)for(var a of t(s))r.call(s,a)&&n(e,a,s[a]);return e};import{u as a,r as i,o as d,c as m,a as u,b as c,d as l,m as p,e as h,f,V as _}from"./vendor.fec3cb97.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const g={setup(e){const t=a();return console.log(t.state.user),(e,t)=>{const o=i("router-view");return d(),m(o)}}};const y={},b=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/HelloWorld/${e}`)in y)return;y[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":"modulepreload",t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((e,t)=>{r.addEventListener("load",e),r.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},E=[{path:"/login",name:"login",component:()=>b((()=>import("./index.8a52e4cc.js")),["assets/index.8a52e4cc.js","assets/user.72ebff71.js","assets/vendor.fec3cb97.js"])},{path:"/",name:"layout",component:()=>b((()=>import("./index.d7cb59c5.js")),["assets/index.d7cb59c5.js","assets/vendor.fec3cb97.js"]),children:[{path:"",name:"home",component:()=>b((()=>import("./index.e91db437.js")),["assets/index.e91db437.js","assets/index.94bc50f0.css","assets/user.72ebff71.js","assets/vendor.fec3cb97.js"])},{path:"/qa",name:"qa",component:()=>b((()=>import("./index.397bcc60.js")),["assets/index.397bcc60.js","assets/vendor.fec3cb97.js"])},{path:"/video",name:"video",component:()=>b((()=>import("./index.01cf1d30.js")),["assets/index.01cf1d30.js","assets/vendor.fec3cb97.js"])},{path:"/my",name:"my",component:()=>b((()=>import("./index.63e024a7.js")),["assets/index.63e024a7.js","assets/index.30b57cd9.css","assets/vendor.fec3cb97.js","assets/user.72ebff71.js"])}]}],O=u({history:c(),routes:E});const R=(e,t)=>{"object"==typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t)},w=e=>{const t=window.localStorage.getItem(e);try{return JSON.parse(t)}catch(o){return t}},x=l({state:{user:w("TOUTIAO_USER")},mutations:{setUser(e,t){e.user=t,R("TOUTIAO_USER",e.user)}}});const v=[...[{url:"/user/login",method:"get",timeout:1e3,response:e=>"admin"==e.query.userName&&123456==e.query.userPwd?{code:0,message:"ok",data:s({id:1},e.query),myToken:Date.now()}:{code:-1,message:"账号或密码错误",data:null}},{url:"/userinfo/get",method:"get",response:e=>e.headers.authorization?1==e.query.userId?{userName:"花渐畔",art_count:10,follow_count:12,fans_count:13,like_count:40,photo:"/head.jpg"}:void 0:{}},{url:"/user/channelset",method:"get",response:e=>e.headers.authorization?[{id:3,name:"React"},{id:0,name:"Vue"},{id:1,name:"Vue2"},{id:2,name:"Vue3"}]:[{id:3,name:"React"}]},{url:"/articles",method:"get",timeout:200,response:e=>e.query.refresh?{list:[{id:99,text:"refresh"}]}:{p_num:e.query.pageNumber-0+1,"list|6":e.query.pageNumber-0>15?[]:[{id:1*-e.query.pageNumber+1,aut_name:p.exports.Random.cname(),comm_count:p.exports.Random.cword(),pub_date:p.exports.Random.datetime(),title:p.exports.Random.ctitle(),"imgs|1-3":[p.exports.Random.image()],"type|1-3":1}]}},{url:"/channels",method:"get",timeout:200,response:()=>[{id:3,name:"React"},{id:0,name:"Vue"},{id:1,name:"Vue2"},{id:2,name:"Vue3"},{id:"31",name:p.exports.Random.first()},{id:"32",name:p.exports.Random.first()},{id:"33",name:p.exports.Random.first()},{id:"34",name:p.exports.Random.first()}]},{url:"/user/addChannels",method:"POST",response:e=>Math.random()>.5?{code:-1,message:"添加失败！",data:null}:{code:0,message:"ok",data:null}},{url:"/user/removeChannels",method:"DELETE",response:e=>Math.random()>.5?{code:-1,message:"删除失败！",data:null}:{code:0,message:"ok",data:null}}]];fetch("http://www.baidu.com"),f(g).use(_).use(O).use(x).mount("#app"),h(v);export{R as a,w as g,O as r,x as s};