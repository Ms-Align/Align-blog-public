import{I as $,a2 as w,_ as N,f as z,u as D,i as h,m as R,n as q,p as A,s as V,O as j,W as O,o as r,g as c,w as m,d as H,b as I,l as M,v as U,h as a,y as L,z as S,x as W,T as X,j as G,X as J}from"./app.544e4f17.js";import{A as K,P as Q}from"./Page.7855427e.js";import{u as Y,C as Z}from"./Common.8a460c29.js";import{P as ee}from"./Pager.352f090f.js";import"./resolveTime.7e2957b0.js";const x=({headers:k,activeLink:l})=>{const n=$();return w("ul",{class:{catalog:!0}},k.map(o=>w("li",{class:{active:l===o.slug,[`level-${o.level}`]:!0,[`toc-link-${o.slug}`]:!0},key:o.title,onClick:()=>{n.currentRoute.value.hash!==`#${o.slug}`&&n.push(`#${o.slug}`)}},o.title)))};x.displayName="Catalog";x.props={headers:{type:Object,required:!0},activeLink:{type:String,default:""}};const te=z({__name:"Post",setup(k){const l=G(),n=D(),o=$(),_=J(),b=_.resolve,E=_.pending,i=Y(),F=h(()=>i.value?l.value.headers:[]),y=e=>e.children.length>0?[e].concat(...e.children.map(y)):e,u=h(()=>[].concat(...F.value.map(y))),t=R({headerHeight:0,catalogTop:0,activeLink:"",isFixed:!1}),p=40,C=80,d=()=>{const e=document.querySelector(".post-header");t.headerHeight=(e==null?void 0:e.offsetHeight)||0,t.catalogTop=t.headerHeight+p};let B;q(()=>{const{y:e}=A(document),s=()=>{for(let v=u.value.length-1;v>=0;v--){const P=u.value[v].slug,T=document.querySelector(`#${P}`);if((T?T.getBoundingClientRect().top:0)<=100){t.activeLink=P;break}}e.value>t.headerHeight+p-C?(t.isFixed=!0,t.catalogTop=C):(t.isFixed=!1,t.catalogTop=t.headerHeight+p)};V(e,s),d(),B=o.afterEach(d),window.onresize=()=>{d(),s()}}),j(()=>{B()});const{post:g}=O(),f=h(()=>{if(!g.value)return{};const e=g.value.info.next;e&&(e.text=n.value.postNext);const s=g.value.info.prev;return s&&(s.text=n.value.postPrev),{next:e,prev:s}});return(e,s)=>(r(),c(Z,null,{page:m(()=>[H(X,{name:"fade-slide-y",mode:"out-in",onBeforeEnter:a(b),onBeforeLeave:a(E)},{default:m(()=>[I("div",{class:S(["post-wrapper",{"show-catalog":a(i)}])},[M(H(K,{class:"post-header"},null,512),[[U,a(l).title]]),(r(),c(Q,{key:a(l).path,class:"post-content"},{bottom:m(()=>[a(f).next||a(f).prev?(r(),c(ee,{key:0,data:a(f)},null,8,["data"])):L("",!0)]),_:1})),a(i)?(r(),c(a(x),{key:0,headers:a(u),"active-link":t.activeLink,class:S({fixed:t.isFixed}),style:W({top:`${t.catalogTop}px`})},null,8,["headers","active-link","class","style"])):L("",!0)],2)]),_:1},8,["onBeforeEnter","onBeforeLeave"])]),_:1}))}});var ce=N(te,[["__file","Post.vue"]]);export{ce as default};
