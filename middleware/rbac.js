
function RBAC(){
      
}

RBAC.prototype.isAllowed=function(user_id,resource_tag,action){
       return true;
}

let rbac_hock={
    middleware: ()=>{
        return async (ctx,next) =>{
           ctx.rbac=new RBAC();
           await next();
        };
    }
}
module.exports=rbac_hock;