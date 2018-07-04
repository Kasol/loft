const spawn = require('child_process').spawn;
const colors = require('colors');
const path = require('path');
const logger = require('../logger').logger;
const STATICNAME = 'cdn';


module.exports= (router)=>{
    router.post('/',runTask);
    router.get('/test',test);
}




let exec_pull = (appName)=>{
    return new Promise((resolve,reject)=>{
        let pull = spawn('git',['pull'],{
            cwd:path.resolve(__dirname,'..','..',appName)
        });

        pull.stdout.on('data',function(data){
        //    data = data+'ok';
        //    console.log((data+'').green);
        })
        pull.stderr.on('data',function(data){
            // console.log((data+'').yellow);
            reject({code:500});
        })
        pull.on('close',function(code){
            console.log(('process exit with '+code).red);
            resolve({code:200});
         })
    });
}


let exec_build = (appName)=>{
    return new Promise((resolve,reject)=>{
        let nrb = spawn('npm',['run','build'],{
            cwd:path.resolve(__dirname,'..','..',appName)
        });

        nrb.stdout.on('data',function(data){
        //    data = data+'ok';
           console.log((data+'').green);
        })
        nrb.stderr.on('data',function(data){
            console.log((data+'').yellow);
            // reject({code:500});
         })
        nrb.on('close',function(code){
            console.log(('process exit with '+code).red);
            resolve({code:200});
         })
    });
}

let exec_copy = (appName)=>{
    return new Promise((resolve,reject)=>{
        let cur_path = path.resolve(__dirname,'..','..',appName);
        let packageInfo = fs.readFileSync(path.resolve(cur_path,'package.json'));

        let start_path = path.resolve(cur_path,'.build',packageInfo.name,packageInfo.version);
        let end_path = path.resolve(__dirname,'..','..',STATICNAME,packageInfo.name,packageInfo.version);
        const copy = spawn('cp',['-r',start_path,end_path],{
            cwd:path.resolve(__dirname,'..','..',appName)
        });

        copy.stdout.on('data',function(data){
           data = data+'ok';
           console.log((data+'').green);
        })
        copy.stderr.on('data',function(data){
            console.log((data+'').yellow);
         })
         copy.on('close',function(code){
            console.log(('process exit with '+code).red);
            resolve({code:200});
         })
    });
}





let runTask = async (ctx,next) => {
    try{
        let info = ctx.request.body.payload;
        let appName =JSON.parse(info).repository.name;
        logger.info(appName);
        let pull_res = await exec_pull(appName);
        logger.info(pull_res);
        let build_res = await exec_build(appName);
        logger.info(build_res);
        let copy_res = await exec_copy(appName);
        logger.info(copy_res);

        return ctx.body = {code:200,message:'ok'};
    }catch(e){
         logger.error(e.message);
    }
 
}
let test = async (ctx,next) => {
   
    return ctx.body = {code:200,message:'test'}
}
