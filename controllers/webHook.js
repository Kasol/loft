const spawn = require('child_process').spawn;
const colors = require('colors');
const path = require('path');
const logger = require('../logger').logger;


let exec_cd = (appName)=>{
    return new Promise((resolve,reject)=>{
        // let args = 
        let app_path = path.resolve(__dirname,'..','..','scorpio-ui');
        let cd = spawn('cd',[app_path],{});

        cd.stdout.on('data',function(data){
           data = data;
           console.log((data+'').green);
        })
        cd.stderr.on('data',function(data){
            console.log((data+'').yellow);
            reject({code:500});
         })
         cd.on('close',function(code){
            console.log(('process exit with '+code).red);
            resolve({code:200});

         })
    });
}


let exec_pull = ()=>{
    return new Promise((resolve,reject)=>{
        let pull = spawn('git',['pull'],{
            cwd:path.resolve(__dirname,'..','..','scorpio-ui')
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


let exec_build = ()=>{
    return new Promise((resolve,reject)=>{
        let nrb = spawn('npm',['run','build'],{
            cwd:path.resolve(__dirname,'..','..','scorpio-ui')
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

let exec_copy = ()=>{
    return new Promise((resolve,reject)=>{
        const pwd = spawn('rm',['/Users/zhongzeming/Desktop/app.js'],{});

        pwd.stdout.on('data',function(data){
           data = data+'ok';
           console.log((data+'').green);
        })
        pwd.stderr.on('data',function(data){
            console.log((data+'').yellow);
         })
        pwd.on('close',function(code){
            console.log(('process exit with '+code).red);
            resolve({code:200});

         })
    });
}

module.exports= (router)=>{
    router.get('/',hook);
    router.post('/',runTask);
    router.get('/test',test);
}

let hook = async (ctx,next) => {
    let pull_res = await exec_pull();
    let build_res = await exec_build();
    logger.error({name:'zzm'});
    return ctx.body = {code:200,message:'accept'}
}

let runTask = async (ctx,next) => {
    logger.info(ctx.request.body);
    return ctx.body = {code:200,message:'ok'}
}
let test = async (ctx,next) => {
   
    return ctx.body = {code:200,message:'test'}
}
