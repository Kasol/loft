const request = require('request');
let store = {};
function fetchContent(appName,version){
    return new Promise((resolve,reject)=>{
       request(`http://47.94.95.201/${appName}/${version}/hash.json` , (err, response, body) => {
         try{
            if(err){
                reject(err);
            }else{
             resolve(JSON.parse(body));
            }
         }catch(e){
            reject({code:500,message:'error'});
           
         }
          
       });
    });

    
}



module.exports = function(opt){
    return async (ctx,next)=>{
           try{
            let result = await fetchContent(opt.appName,opt.version);
            store.hashMap= result;
           }catch(e){
             
           }
          
      
        await next();
    }
}
module.exports.store = store;