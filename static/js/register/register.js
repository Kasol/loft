$(document).ready(function(){
    $signupBtn = $('#signup');

    var init = function(){
        addEvent();
    }
    var addEvent = function(){
        
         $signupBtn.on('click',function(){
            var data = {
                userName:$('.signup-form input[name=name]').val(),
                password:$('.signup-form input[name=password]').val(),
                email:$('.signup-form input[name=email]').val(),
            }
           $.post('/ssoRegister/signup',data,(result)=>{
              console.dir(result);
           })
        });
    }
    init();
});