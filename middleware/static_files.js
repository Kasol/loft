const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        let dirname=path.parse(rpath).dir;
        let basename=path.parse(rpath).base;
        if(dirname === path.parse(rpath).root){
            rpath=dirname+basename;
        }else{
            rpath=dirname+'/'+basename;
        }

        // 判断是否以指定的url开头:
        if (rpath.startsWith(url)){
            // 获取文件完整路径:
            let fp = path.join(dir, rpath.substring(url.length));
            let file_info=await fs.stat(fp);
            let is_dir=file_info.isDirectory();
            let is_file=file_info.isFile();
            if(is_dir){
                let temp_arr=[];
                temp_arr.push({
                    'url':dirname,
                    'value':'..'
                });
                let dirs=await fs.readdir(fp);
                dirs.forEach(  (ele,index)=>{
                    let obj={};
                    let inner_info=  fs.statSync(fp+'/'+ele);
                    if(inner_info.isDirectory()){
                       obj.url=rpath+'/'+ele;
                       obj.value=ele+'/';
                    }else{
                        obj.url=rpath+'/'+ele;
                        obj.value=ele;
                    }
                    temp_arr.push(obj);
                });
                ctx.render('static.html',{
                    links:temp_arr
                });
            }else if(is_file){
                // 查找文件的mime:
                ctx.response.type = mime.lookup(rpath);
                // 读取文件内容并赋值给response.body:
                ctx.response.body = await fs.readFile(fp);
            }
            else {
                // 文件不存在:
                ctx.response.status = 404;
            }
        } else {
            // 不是指定前缀的URL，继续处理下一个middleware:
            await next();
        }
    };
}

module.exports = staticFiles;