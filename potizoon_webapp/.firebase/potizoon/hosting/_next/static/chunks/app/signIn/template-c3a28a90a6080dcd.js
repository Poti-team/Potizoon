(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[63],{3653:function(e,t,o){Promise.resolve().then(o.bind(o,7320))},7320:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return w},viewport:function(){return g}});var n=o(7437),a=o(5735),r=o(2265),i=o(5236),s=o(9842);let c={apiKey:"AIzaSyDYQpefxLwh79yaxZs11r6EeedO5lDPAoA",authDomain:"potizoon.web.app",databaseURL:"https://potizoon-default-rtdb.firebaseio.com",projectId:"potizoon",storageBucket:"potizoon.appspot.com",messagingSenderId:"352972018903",appId:"1:352972018903:web:29ba20e8b4fbe054564c92",measurementId:"G-WX4H4L1F6W"};c.authDomain="potizoon.web.app";let u=(0,i.ZF)(c),l=new a.hJ;l.setCustomParameters({prompt:"select_account"});let p=(0,a.v0)(u);p.languageCode="it";let d=()=>(0,a.F6)(p,l),m=(0,s.ad)(),f=async e=>{let t=(0,s.JU)(m,"users",e.uid);if(!(await (0,s.QT)(t)).exists()){let{displayName:o,email:n,photoUrl:a,ProviderId:r}=e,i=new Date;try{await (0,s.pl)(t,{displayName:o,email:n,photoUrl:a,createdAt:i,ProviderId:r})}catch(e){console.log("Error creating user",e.message),console.error("Error creating user",e.message)}}return t},g={width:"device-width",initialScale:1,maximumScale:1,userScalable:!1};var w=function(e){let{children:t}=e;return(0,r.useEffect)(()=>{(async function(){let e=await (0,a.cx)(p);console.log("Response",e),e?(await f(e.user),function(e){try{console.log("Sending message to App Inventor",e),window.AppInventor.setWebViewString(e)}catch(e){console.log("App Inventor Communication Error",e)}}(e.user)):d()})()},[]),(0,n.jsxs)("div",{className:"login-container",children:[(0,n.jsx)("h1",{children:"Voc\xea est\xe1 sendo redirecionado para o login"}),t]})}}},function(e){e.O(0,[898,358,899,971,23,744],function(){return e(e.s=3653)}),_N_E=e.O()}]);