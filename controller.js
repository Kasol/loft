const fs = require('fs');
const Router = require('koa-router');
console.warn(`This is controller.js and process id is ${process.pid},title is ${process.title}`);
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(Router, dir,app) {
    var files = fs.readdirSync(`${__dirname}/${dir}/` );
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    var dirs=files.filter((inner_dir)=>{
        let path=`${__dirname}/${dir}/${inner_dir}`;
        return fs.lstatSync(path).isDirectory()
    });
    //搜寻所有控制器文件，这里是深度优先遍历
    for (var f of js_files) {
        f=f.substring(0, f.length - 3);
        let prefix = f === 'index' ? '' : `/${f}`
        let prefixRoute = new Router({
            prefix: `${prefix}`,
          })
        // console.log(`process controller: ${f}...`);
        let mapping = require(`${__dirname}/${dir}/${f}`);
        if (typeof(mapping)!=='function'){
            mapping = ()=>{}
        }
        // addMapping(router, mapping);
        mapping(prefixRoute);
        app.use(prefixRoute.routes());
    }
    for (let inner_dir of dirs) {
        let new_dir=`${dir}/${inner_dir}`;
        addControllers(Router, new_dir,app);
    }
    
}

module.exports = function (app,dir) {
    let controllers_dir = dir || 'controllers'; // 如果不传参数，扫描目录默认为'controllers'
     addControllers(Router, controllers_dir,app);
    // return Router.routes();
};