1.因为上个月需求较之前少，闲下来对着自己的项目，从0搭建了一个express + node的服务；项目可以执行npm start 启动自动打开浏览器，实现服务端渲染，实现的简单的路由（服务端写死的,正常开发不会这样用）；可以执行npm build 打包命令，引入了websocket ，vconsole。。。
因为做的比较简单：所以有下面几点还没有补充； 2.服务端写的脚本遵循的是common.js规范，不能直接使用es6 import 与default；目前想到的办法是，如需启动项目，先执行npm run build 利用babel 将es6转换成 es5，再执行npm start,如此一来不利于实时开发调试。
3.网上查阅了资料，利用 koa2 + nodejs + react 实现服务端渲染；
4.服务端渲染的优势；    一.减少首屏加载时间
  二.利于seo优化（客户端渲染的时候，有可能因为速度较慢，seo服务器抓取到关键字的时候，页面脚本还没解析完） 
5.一.服务端是如何渲染组件的？
   服务端通过异步请求将数据挂载到组件中。
  二.服务端是如何将数据传递到客户端的？
 服务端可以再script脚本在通过全局window.xx=data，插入加载脚本；
三.服务端如何将获取到的数据加载到不同的组件；
    可以用react 中的context 上下文
四.服务端的路由跟客户端的路由如何同步
    服务端的路由是无状态的路由，通过传递的URL ，加载到对应的组件