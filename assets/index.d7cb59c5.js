import{u as e,l as a,n as t,r as o,o as s,h as r,i as u,w as n,k as c,p as d}from"./vendor.fec3cb97.js";const i={setup(){const o=e(),s=a((()=>o.state.user));return{active:t(0),userState:s}}},l=c("首页"),v=c("问答"),f=c("视频");i.render=function(e,a,t,i,m,b){const p=o("router-view"),_=o("van-tabbar-item"),h=o("van-tabbar");return s(),r("div",null,[u(p),u(h,{modelValue:i.active,"onUpdate:modelValue":a[0]||(a[0]=e=>i.active=e),route:""},{default:n((()=>[u(_,{icon:"home-o",to:"/"},{default:n((()=>[l])),_:1}),u(_,{icon:"search",to:"/qa"},{default:n((()=>[v])),_:1}),u(_,{icon:"video-o",to:"/video"},{default:n((()=>[f])),_:1}),u(_,{icon:"contact",to:"/my"},{default:n((()=>[c(d(i.userState?"我的":"未登录"),1)])),_:1})])),_:1},8,["modelValue"])])};export{i as default};