$(document).ready(function(){
    $signinBtn = $('#signin');

    var parseParams = function(search){
          var obj ={}; 
          var params = search.slice(1);
          var arr = params.split('&');
          arr.map(function(ele,index){
               var  inner_arr = ele.split('=');
               var key = inner_arr[0];
               var value = inner_arr[1];
               obj[key]=value;
          });
          return obj;
    }

    var init = function(){
        addEvent();
    }
    var addEvent = function(){
         $signinBtn.on('click',function(){
             var data = {
                 userName:$('.signin-form input[name=name]').val(),
                 password:$('.signin-form input[name=password]').val(),
                 appInfo:parseParams(location.search) 
             }
            $.post('/ssoLogin/signin',data,(result)=>{
                if(result.code === 302){
                    if (result.appInfo){
                    window.location.href =result.appInfo.backUrl+'?tgc='+result.appInfo.tgc;
                    }else{
                        window.location.href = '/';
                    }
                }else if(result.code === 500){
                    alert('login failed');
                }
            })
         });
       
    }

    init();
});


