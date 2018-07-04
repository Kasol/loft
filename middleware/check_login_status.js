"use strict"
 function is_login_entry(path){
     if(path.indexOf('ssoLogin')!==-1 || path.indexOf('ssoRegister')!==-1 ||path.indexOf('query')!==-1)
         return true;
     else{
         return false;
     }    
 }
//  function is_overdue(ctx){
//     let last_stamp=ctx.session.last_login;
//     let now_stamp=(new Date()).getTime();
//     if(now_stamp-last_stamp > 30*60*1000){
//         return true;
//     }
//     else{
//         ctx.session.last_login=now_stamp;
//         return false;
//     }
//  }

 function checkLoginStatus(){
    return  async (ctx,next) => {
        // let user_id=ctx.cookies.get('SESSION_ID');
        let userName=ctx.session.userName;
        //非登陆注册通道检查用户状态
        if(!is_login_entry(ctx.path)){
            
            if (!userName){
                ctx.redirect('/ssoLogin');
            }
        }
     
        await next();
    }
}
module.exports={
'checkLoginStatus':checkLoginStatus
};