import {createApp} from "./main";

export default context =>{
  return new Promise((resolve,reject)=>{

    const {app} = createApp() //创建app
    const router = app.$router  //创建路由

    const {url} = context
    const {fullPath} = router.resolve(url).route
    
    if (fullPath !==url ){
      return reject({url:fullPath})
    }
    //更改路由
    router.push(url)

    router.onReady(()=>{
      const matchedComponents = router.getMatchedComponents() //获取到组件
      //如果组件没有长度
      if(!matchedComponents.length){
        return reject({code:404})
      }
    //遍历由下所有的组件，如果有需要服务器渲染的请求，则进行请求
      Promise.all(matchedComponents.map(component =>{
        if (component.serverRequest){
          //未来各组件如果有serverRequest对象，判断是否需要服务器请求数据，并传入store参数
          return component.serverRequest(app.$store);
        }
      })).then(()=>{
        //将状态存储起来
        context.state = app.$store.state;
        resolve(app);
      }).catch(reject)

    },reject)
  })
}
