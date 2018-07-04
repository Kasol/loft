(function(window){
   var version="1.0.0"; 
   var Kasol=function(selector,context){//工厂方法
    return new Kasol.fn.init(selector,context);//调用工厂方法
}

    Kasol.fn=Kasol.prototype={
    version:version,
    constructor:Kasol,
    setBackground:function(colorStr){
      for(var i=0;i<this.length;i++){
        this[i].style.backgroundColor=colorStr;
      }
      return this;
    },
    setFontsize:function(size){
      for(var i=0;i<this.length;i++){
        this[i].style.fontSize=size+'px';
      }
      return this;
    }
   };
   Kasol.fn.init=function(selector,context){
      if (!selector){
        return  this;
      }else if(selector instanceof Object){
           this[0]=selector;
           this.length=1;
           return this;
      }
       var context=context||document;
       var result=document.querySelectorAll(selector,context);
       // result.__proto__=Kasol.prototype;
       for (var i=0;i<result.length;i++){
        this[i]=result[i];
       }
       this.length=result.length;
       // return result;
       return this;
   }
   Kasol.fn.init.prototype=Kasol.prototype;//保证kasol对象的实例也可以使用挂载在原型链上的方法

    Kasol.extend=Kasol.fn.extend = function(){
        console.log(this);
    };

    window.kasol=Kasol;//将工厂方法挂载到kasol这个属性上

})(window,undefined);