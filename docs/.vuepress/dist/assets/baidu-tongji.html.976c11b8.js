import{_ as l,r as i,o as p,c as u,d as a,w as s,a as o,b as n,e}from"./app.544e4f17.js";const c={},d=o('<p><a href="https://www.npmjs.com/package/@renovamen/vuepress-plugin-baidu-tongji/v/next" target="_blank"><img src="https://img.shields.io/npm/v/@renovamen/vuepress-plugin-baidu-tongji/next.svg?style=flat-square&amp;logo=npm" style="display:inline;margin:0 4px 0 0;" alt="npm"></a><a href="https://github.com/Renovamen/vuepress-theme-gungnir/tree/main/packages/plugins/baidu-tongji" target="_blank"><img src="https://img.shields.io/badge/GitHub-@renovamen/vuepress--plugin--baidu--tongji-26A2FF?style=flat-square&amp;logo=github" style="display:inline;margin:0 4px 0 0;" alt="github"></a><a href="https://github.com/Renovamen/vuepress-theme-gungnir/blob/main/packages/plugins/baidu-tongji/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" style="display:inline;margin:0 4px 0 0;" alt="license"></a></p><p>Plugin <code>@renovamen/vuepress-plugin-baidu-tongji@next</code> for adding <a href="https://tongji.baidu.com" target="_blank" rel="noopener noreferrer">\u767E\u5EA6\u7EDF\u8BA1</a> to <a href="https://v2.vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">VuePress 2</a>. It is edited from <a href="https://github.com/vuepress/vuepress-next/tree/main/packages/%40vuepress/plugin-google-analytics" target="_blank" rel="noopener noreferrer">@vuepress/plugin-google-analytics</a>.</p><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> Install</h2>',3),g=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"pnpm"),e(),n("span",{class:"token function"},"install"),e(` @renovamen/vuepress-plugin-baidu-tongji@next
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),m=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"yarn"),e(),n("span",{class:"token function"},"add"),e(` @renovamen/vuepress-plugin-baidu-tongji@next
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),h=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"npm"),e(),n("span",{class:"token function"},"install"),e(` @renovamen/vuepress-plugin-baidu-tongji@next
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),v=o(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> baiduTongjiPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;@renovamen/vuepress-plugin-baidu-tongji&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">baiduTongjiPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token string-property property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;your-tracking-code&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>id</code> is your tracking code offered by <a href="https://tongji.baidu.com" target="_blank" rel="noopener noreferrer">\u767E\u5EA6\u7EDF\u8BA1</a>.</p><h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2><p><a href="https://github.com/Renovamen/vuepress-theme-gungnir/blob/main/packages/plugins/baidu-tongji/LICENSE" target="_blank" rel="noopener noreferrer">MIT</a></p>`,5);function b(k,f){const t=i("CodeGroupItem"),r=i("CodeGroup");return p(),u("div",null,[d,a(r,null,{default:s(()=>[a(t,{title:"PNPM",active:""},{default:s(()=>[g]),_:1}),a(t,{title:"YARN",active:""},{default:s(()=>[m]),_:1}),a(t,{title:"NPM"},{default:s(()=>[h]),_:1})]),_:1}),v])}var x=l(c,[["render",b],["__file","baidu-tongji.html.vue"]]);export{x as default};
