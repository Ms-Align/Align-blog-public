import{_ as i,r as t,o,c as u,d as s,w as a,a as p,b as n,e as l}from"./app.544e4f17.js";const d={},r=p(`<h2 id="\u57FA\u672C\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u6D41\u7A0B" aria-hidden="true">#</a> \u57FA\u672C\u6D41\u7A0B</h2><p>\u5047\u5982\u4F60\u7684 <code>package.json</code> \u7684 <code>scripts</code> \u90E8\u5206\u957F\u8FD9\u6837\uFF1A</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs --clean-cache&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs --clean-cache&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u90A3\u4E48\u4F60\u9700\u8981\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u8FD0\u884C\uFF1A</p>`,4),k=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"yarn"),l(` docs:build
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),v=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token function"},"npm"),l(` run docs:build
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),m=p(`<p>\u8FD9\u6837 VuePress \u5C31\u4F1A\u5728 <code>docs/.vuepress/dist</code> \u76EE\u5F55\u4E0B\u751F\u6210\u535A\u5BA2\u7684\u9759\u6001\u6587\u4EF6\u3002\u63A5\u4E0B\u6765\u4F60\u53EF\u4EE5\u9009\u62E9\u5C06\u4E0A\u8FF0\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u63A8\u9001\u5230\u4E00\u4E2A\u542F\u7528\u4E86 <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">Github Pages</a> \u529F\u80FD\u7684 Github \u4ED3\u5E93\u4E2D\uFF0C\u4ECE\u800C\u5B9E\u73B0\u90E8\u7F72\u3002\u4E5F\u53EF\u4EE5\u9009\u62E9\u5176\u4ED6\u9759\u6001\u7F51\u7AD9\u90E8\u7F72\u5E73\u53F0\u6216\u4F7F\u7528\u81EA\u5DF1\u7684\u670D\u52A1\u5668\u3002</p><h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> Github Actions</h2><p>\u5982\u679C\u4F60\u9009\u62E9\u90E8\u7F72\u5230 Github Pages \u7684\u8BDD\uFF0C<a href="https://docs.github.com/cn/actions" target="_blank" rel="noopener noreferrer">Github Actions</a>\uFF08Github \u7684\u6301\u7EED\u96C6\u6210\u670D\u52A1\uFF09\u53EF\u4EE5\u5E2E\u4F60\u81EA\u52A8\u5B9E\u73B0\u6253\u5305\u548C\u63A8\u9001\u9759\u6001\u6587\u4EF6\u5230 Github \u4ED3\u5E93\u7684\u6307\u5B9A\u5206\u652F\u8FD9\u4E00\u6B65\u3002</p><p>\u9996\u5148\u5728\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA <code>.github/workflows</code> \u76EE\u5F55\uFF08\u5982\u679C\u6CA1\u6709\u7684\u8BDD\uFF09\uFF0C\u7136\u540E\u5728\u8BE5\u76EE\u5F55\u4E2D\u65B0\u5EFA\u4E00\u4E2A\u914D\u7F6E\u6587\u4EF6 <code>deploy.yaml</code>\uFF08\u53EB\u522B\u7684\u540D\u5B57\u4E5F\u884C\uFF09\u5E76\u5728\u5176\u4E2D\u5199\u5165\u6253\u5305\u548C\u90E8\u7F72\u811A\u672C\u3002</p><h3 id="yarn" tabindex="-1"><a class="header-anchor" href="#yarn" aria-hidden="true">#</a> Yarn</h3><p>\u5982\u679C\u4F60\u4F7F\u7528 Yarn \u4F5C\u4E3A\u5305\u7BA1\u7406\u5668\uFF0C\u4E00\u4E2A\u5BF9\u4E8E\u672C\u4E3B\u9898\u9002\u7528\uFF08\u5BF9\u5176\u4ED6\u4E3B\u9898\u5E94\u8BE5\u4E5F\u9002\u7528\uFF09\u7684 workflow \u662F\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/deploy.yaml</span>

<span class="token key atrule">name</span><span class="token punctuation">:</span> build<span class="token punctuation">-</span>and<span class="token punctuation">-</span>deploy

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span>  <span class="token comment"># main \u5206\u652F\u6709 commit \u65F6\u81EA\u52A8\u89E6\u53D1\u8BE5 workflow</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>  <span class="token comment"># \u968F\u4FBF\u8D77\u4E2A\u540D\u5B57</span>
    <span class="token comment"># \u914D\u7F6E\u8FD0\u884C\u8BE5 workflow \u7684\u7CFB\u7EDF</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">NODE_VERSION</span><span class="token punctuation">:</span> <span class="token string">&#39;16&#39;</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token comment"># \u914D\u7F6E Node.js</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> env.NODE_VERSION <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">cache</span><span class="token punctuation">:</span> yarn

      <span class="token comment"># \u5B89\u88C5\u4F9D\u8D56</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile

      <span class="token comment"># \u6253\u5305\u5E76\u751F\u6210\u9759\u6001\u6587\u4EF6</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn docs<span class="token punctuation">:</span>build

      <span class="token comment"># \u63A8\u9001\u9759\u6001\u6587\u4EF6\u5230 gh-pages \u5206\u652F</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist  <span class="token comment"># \u9759\u6001\u6587\u4EF6\u751F\u6210\u76EE\u5F55</span>
          <span class="token key atrule">cname</span><span class="token punctuation">:</span> zxh.io  <span class="token comment"># \u4F60\u7F51\u7AD9\u7684\u57DF\u540D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pnpm" tabindex="-1"><a class="header-anchor" href="#pnpm" aria-hidden="true">#</a> pnpm</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .github/workflows/deploy.yaml</span>

<span class="token key atrule">name</span><span class="token punctuation">:</span> build<span class="token punctuation">-</span>and<span class="token punctuation">-</span>deploy

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span>  <span class="token comment"># main \u5206\u652F\u6709 commit \u65F6\u81EA\u52A8\u89E6\u53D1\u8BE5 workflow</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
    <span class="token comment"># \u914D\u7F6E\u8FD0\u884C\u8BE5 workflow \u7684\u7CFB\u7EDF</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">NODE_VERSION</span><span class="token punctuation">:</span> <span class="token string">&#39;16&#39;</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token comment"># \u5B89\u88C5 pnpm</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install pnpm
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">6</span>

      <span class="token comment"># \u914D\u7F6E Node.js</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> env.NODE_VERSION <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">cache</span><span class="token punctuation">:</span> pnpm

      <span class="token comment"># \u5B89\u88C5\u4F9D\u8D56</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm install <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile

      <span class="token comment"># \u6253\u5305\u5E76\u751F\u6210\u9759\u6001\u6587\u4EF6</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm build

      <span class="token comment"># \u63A8\u9001\u9759\u6001\u6587\u4EF6\u5230 gh-pages \u5206\u652F</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist  <span class="token comment"># \u9759\u6001\u6587\u4EF6\u751F\u6210\u76EE\u5F55</span>
          <span class="token key atrule">cname</span><span class="token punctuation">:</span> zxh.io  <span class="token comment"># \u4F60\u7F51\u7AD9\u7684\u57DF\u540D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9);function b(h,y){const e=t("CodeGroupItem"),c=t("CodeGroup");return o(),u("div",null,[r,s(c,null,{default:a(()=>[s(e,{title:"YARN",active:""},{default:a(()=>[k]),_:1}),s(e,{title:"NPM"},{default:a(()=>[v]),_:1})]),_:1}),m])}var _=i(d,[["render",b],["__file","deploy.html.vue"]]);export{_ as default};
