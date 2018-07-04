const Koa=require('koa');
const router=require('koa-router')();
const templating=require('./middleware/templating');
const check_login_status=require('./middleware/check_login_status');
const bodyParse=require('koa-bodyparser');
const controller=require('./controller');
const session = require('koa-session-minimal');
const util=require('util');
const config = require('./config');
// const attachData = require('./middleware/attach_data')
const MysqlSession = require('koa-mysql-session');
// const filters = require('./customer_tags/filters');
// const extension = require('./customer_tags/extension');

// const sessionStore = new MysqlSession({
//     user: config.username,
//     password: config.password,
//     database: config.database,
//     host: config.host,
// });

// const redis=require("./redis");
const isProduction = process.env.NODE_ENV === 'production';
console.log(`This is app.js and process id is ${process.pid},title is ${process.title}`);

app=new Koa();

 


 

//记录路由和访问时间
app.use(async (ctx,next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});





 // 使用session中间件
//  app.use(session({
//     key: 'SESSION_ID',
//     store:sessionStore,
//     cookie:config.cookie
//   }))

//挂载render方法
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction,
    // filters:filters ,
    // extension:extension,
}));

//挂载rbac
// app.use(rbac.middleware());


//处理静态文件,这里通过nginx做了动静分离，实际上后端应用可以不放静态文件
if (!isProduction) {
    let staticFiles = require('./middleware/static_files');
    app.use(staticFiles('/static', __dirname + '/static'));
}

// app.use(attachData());

//处理非GET请求
app.use(bodyParse());





//验权
// app.use(async (ctx,next)=>{
//         if (ctx.rbac.isAllowed(ctx.session.user_id,ctx.path,'view')){
//             // console.log(user_id,resource_tag,action);
//            await next();
//         }else{
//             // console.log();
//             ctx.render('');
//         }
    
// });



//控制器代码最好靠后放
controller(app);

let server=app.listen(6001);

console.log('server is running at 127.0.0.1:6001');








