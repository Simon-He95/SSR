const Vue = require('vue')
const exp = require('express')
const express = exp()
//创建服务端的渲染器
const renderer = require('vue-server-renderer').createRenderer()
//服务端渲染bundle文件
const createApp = require('./dist/bundle.server')['default']

//设置静态资源目录
express.use('/',exp.static(__dirname+'/dist'));

//客户端bundle
const clientBundleFileUrl = '/bundle.client.js';

express.get('/api/getHomeInfo',(req,res)=>{
  res.send('SSR发送请求了'); //服务端数据
})

// 服务器渲染的核心：通过vue-server-renderer插件的renderToString()方法，将vue实例转换成为字符串插入到html文件（使用服务器渲染事为了弥补单页面应用SEO能力不足的问题）
express.get('*',(req,res)=>{

  const context = {url:req.url};
  createApp(context).then(app=>{
    console.log(context.state); //服务端的数据已经到服务端来了，接下来需要把数据共享给客户端
    let state = JSON.stringify(context.state);

    renderer.renderToString(app,(err,html)=>{
      // console.log(html);
      if (err){return res.state(500).end('运行错误')}
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <title>Vue2.0 SSR渲染页面</title>
            <script>window.__INITIAL_STATE__=${state}</script>
            <script src="${clientBundleFileUrl}"></script>
        </head>
        <body>${html}</body>
      </html>
    `)
    })
  }).catch(()=>{

  })
})

//服务器监听地址
express.listen(8881,()=>{
  console.log('服务器已启动！')
})
