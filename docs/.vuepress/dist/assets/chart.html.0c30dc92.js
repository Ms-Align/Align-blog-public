import{_ as c,r as i,o as l,c as u,d as a,w as e,b as n,a as o,e as s}from"./app.544e4f17.js";const r={},d=o('<p><a href="https://www.npmjs.com/package/vuepress-plugin-chart/v/next" target="_blank"><img src="https://img.shields.io/npm/v/vuepress-plugin-chart/next.svg?style=flat-square&amp;logo=npm" style="display:inline;margin:0 4px 0 0;" alt="npm"></a><a href="https://github.com/Renovamen/vuepress-theme-gungnir/tree/main/packages/plugins/chart" target="_blank"><img src="https://img.shields.io/badge/GitHub-vuepress--plugin--chart-26A2FF?style=flat-square&amp;logo=github" style="display:inline;margin:0 4px 0 0;" alt="github"></a><a href="https://github.com/Renovamen/vuepress-theme-gungnir/blob/main/packages/plugins/chart/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" style="display:inline;margin:0 4px 0 0;" alt="license"></a></p><p><code>vuepress-plugin-chart@next</code> \u63D2\u4EF6\uFF0C\u7528\u4E8E\u5728 <a href="https://v2.vuepress.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">VuePress 2</a> \u7684 Markdown \u4E2D\u4F7F\u7528 JavaScript \u56FE\u8868\u5E93 <a href="https://www.chartjs.org" target="_blank" rel="noopener noreferrer">Chart.js</a>\u3002</p><h2 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h2>',3),v=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"pnpm"),s(),n("span",{class:"token function"},"install"),s(` vuepress-plugin-chart@next
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),b=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"yarn"),s(),n("span",{class:"token function"},"add"),s(` vuepress-plugin-chart@next
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),k=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"npm"),s(),n("span",{class:"token function"},"install"),s(` vuepress-plugin-chart@next
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),m=o(`<p>\u7136\u540E\u5728 <code>.vuepress/config.js</code> \u4E2D\u5F15\u5165\u8FD9\u4E2A\u63D2\u4EF6\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> chartPlugin <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;vuepress-plugin-chart&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">chartPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u914D\u7F6E\u9879" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u9879" aria-hidden="true">#</a> \u914D\u7F6E\u9879</h2><h3 id="token" tabindex="-1"><a class="header-anchor" href="#token" aria-hidden="true">#</a> token</h3><ul><li><p>\u7C7B\u578B\uFF1A<code>string</code></p></li><li><p>\u9ED8\u8BA4\u503C\uFF1A<code>&quot;chart&quot;</code></p></li><li><p>\u8BE6\u60C5\uFF1A\u81EA\u5B9A\u4E49\u4EE3\u7801\u5757\u7684 token</p></li></ul><h2 id="\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a> \u4F7F\u7528</h2><p>\u4EE3\u7801\u5757\u7684 token info \u9700\u8981\u4E3A <code>chart</code>\uFF08\u5982\u679C\u4F60\u4F7F\u7528\u4E86\u81EA\u5B9A\u4E49\u4EE3\u7801\u5757 token\uFF0C\u5219\u9700\u8981\u4E3A <code>options.token</code>\uFF09\uFF0C\u6BD4\u5982\uFF1A</p><div class="language-chart ext-chart line-numbers-mode"><pre class="language-chart"><code>{
  &quot;type&quot;: &quot;doughnut&quot;,
  &quot;data&quot;: {
    &quot;datasets&quot;: [{
      &quot;data&quot;: [10, 20, 30],
      &quot;backgroundColor&quot;: [
        &quot;rgba(255, 99, 132)&quot;,
        &quot;rgba(255, 206, 86)&quot;,
        &quot;rgba(54, 162, 235)&quot;
      ]
    }],
    &quot;labels&quot;: [&quot;Red&quot;, &quot;Yellow&quot;, &quot;Blue&quot;]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>\u4EE3\u7801</summary><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>\`\`\`chart
<span class="token punctuation">{</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;doughnut&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;datasets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;backgroundColor&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;rgba(255, 99, 132)&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;rgba(255, 206, 86)&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;rgba(54, 162, 235)&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;labels&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Red&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Yellow&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Blue&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,9),q={class:"custom-container danger"},g={viewBox:"0 0 25 25",xmlns:"http://www.w3.org/2000/svg","xml:space":"preserve",style:{"fill-rule":"evenodd","clip-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2"}},h=n("path",{d:"M297.64 123.31C133.55 123.31 0 256.83 0 420.94c0 164.11 133.55 297.64 297.64 297.64 164.09 0 297.64-133.52 297.64-297.64 0-164.12-133.55-297.63-297.64-297.63Zm107.8 333.25H189.83c-19.541 0-35.62-16.079-35.62-35.62 0-19.541 16.079-35.62 35.62-35.62h215.61c19.541 0 35.62 16.079 35.62 35.62 0 19.541-16.079 35.62-35.62 35.62Z",style:{fill:"#f55","fill-rule":"nonzero"},transform:"matrix(.042 0 0 .042 0 -5.179)"},null,-1),_=[h],f=n("p",{class:"custom-container-title"},"\u8B66\u544A",-1),y=n("p",null,"key \u503C\u4E00\u5B9A\u8981\u52A0\u5F15\u53F7\uFF0C\u5426\u5219\u4F1A\u62A5\u9519\u3002",-1),x=o(`<p>\u5982\u679C\u5E0C\u671B\u901A\u8FC7 <code>callback</code> \u4F20\u5165\u4E00\u4E2A\u51FD\u6570\uFF0C\u9700\u8981\u5C06\u51FD\u6570\u5199\u6210\u5B57\u7B26\u4E32\u3002\u4E0B\u9762\u8FD9\u4E2A\u4F8B\u5B50\u901A\u8FC7 <code>callback</code> \u4FEE\u6539\u4E86 Y \u8F74\u7684\u523B\u5EA6\u503C\uFF1A</p><div class="language-chart ext-chart line-numbers-mode"><pre class="language-chart"><code>{
  &quot;type&quot;: &quot;bar&quot;,
  &quot;data&quot;: {
    &quot;labels&quot;: [&quot;Red&quot;, &quot;Blue&quot;, &quot;Yellow&quot;, &quot;Green&quot;, &quot;Purple&quot;, &quot;Orange&quot;],
    &quot;datasets&quot;: [{
      &quot;label&quot;: &quot;Salary&quot;,
      &quot;data&quot;: [12, 19, 3, 5, 2, 3],
      &quot;backgroundColor&quot;: [
        &quot;rgba(255, 99, 132, 1)&quot;,
        &quot;rgba(54, 162, 235, 1)&quot;,
        &quot;rgba(255, 206, 86, 1)&quot;,
        &quot;rgba(75, 192, 192, 1)&quot;,
        &quot;rgba(153, 102, 255, 1)&quot;,
        &quot;rgba(255, 159, 64, 1)&quot;
      ]
    }]
  },
  &quot;options&quot;: {
    &quot;scales&quot;: {
      &quot;y&quot;: {
        &quot;ticks&quot;: {
          &quot;beginAtZero&quot;: true,
          &quot;callback&quot;: &quot;function(value){ return &#39;\uFFE5&#39; + value + &#39;k&#39;; }&quot;
        }
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>\u4EE3\u7801</summary><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>\`\`\`chart
<span class="token punctuation">{</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;labels&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Red&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Blue&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Yellow&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Green&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Purple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Orange&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;datasets&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token property">&quot;label&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Salary&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;backgroundColor&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;rgba(255, 99, 132, 1)&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;rgba(54, 162, 235, 1)&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;rgba(255, 206, 86, 1)&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;rgba(75, 192, 192, 1)&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;rgba(153, 102, 255, 1)&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;rgba(255, 159, 64, 1)&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;options&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;scales&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;y&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;ticks&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;beginAtZero&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          <span class="token property">&quot;callback&quot;</span><span class="token operator">:</span> <span class="token string">&quot;function(value){ return &#39;\uFFE5&#39; + value + &#39;k&#39;; }&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
\`\`\`
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>\u66F4\u8BE6\u7EC6\u7684\u7528\u6CD5\u53EF\u4EE5\u53C2\u8003 <a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js \u6587\u6863</a>\u3002</p><h2 id="\u5F00\u6E90\u534F\u8BAE" tabindex="-1"><a class="header-anchor" href="#\u5F00\u6E90\u534F\u8BAE" aria-hidden="true">#</a> \u5F00\u6E90\u534F\u8BAE</h2><p><a href="https://github.com/Renovamen/vuepress-theme-gungnir/blob/main/packages/plugins/chart/LICENSE" target="_blank" rel="noopener noreferrer">MIT</a></p>`,6);function w(j,C){const t=i("CodeGroupItem"),p=i("CodeGroup");return l(),u("div",null,[d,a(p,null,{default:e(()=>[a(t,{title:"PNPM",active:""},{default:e(()=>[v]),_:1}),a(t,{title:"YARN",active:""},{default:e(()=>[b]),_:1}),a(t,{title:"NPM"},{default:e(()=>[k]),_:1})]),_:1}),m,n("div",q,[(l(),u("svg",g,_)),f,y]),x])}var B=c(r,[["render",w],["__file","chart.html.vue"]]);export{B as default};
