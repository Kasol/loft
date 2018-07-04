"use strict"
 function is_login_entry(path){
     if(path.indexOf('ssoLogin')!==-1 || path.indexOf('ssoRegister')!==-1 ||path.indexOf('query')!==-1)
         return true;
     else{
         return false;
     }    
 }

let sso_server = () => {
    return  async (ctx,next) => {
        // let user_id=ctx.cookies.get('SESSION_ID');
        let userName=ctx.session.userName;
        //如果session失效，那么要清除
        //非登陆注册通道检查用户状态
        if(!is_login_entry(ctx.path)){
            
            if (!userName){
                ctx.redirect('/ssoLogin');
            }
        }
     
        await next();
    }
}


module.exports = sso_server;