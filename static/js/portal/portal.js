define(function (require, exports, module) {

    var Portal = function () {
        this.canvas_obj = $("#portalLayer")[0].getContext('2d');
        this.description = "首页";
        this.last_canvas='';

    };
    Portal.prototype.init = function () {
        var _this=this;
        $('.screen-shot').on('click',function(){
            var dom=$('#portalLayer')[0];
            _this.screenShot(dom);
        });
        $('.download-btn').on('click',function(){
            var result=_this.last_canvas.toDataURL('img/png');
            $('.pic-origin').attr('href',result);
            $('.pic-origin').attr('download',(new Date()).toDateString());
            $('.pic-origin')[0].click();

        });
    
    }
    Portal.prototype.drawCanvas = function () {
        this.canvas_obj.strokeStyle = "#ccc";
        this.canvas_obj.beginPath();
        this.canvas_obj.lineWidth = 1;
        this.canvas_obj.moveTo(0, 0);
        this.canvas_obj.lineTo(100, 100);
        this.canvas_obj.stroke();
    }
    Portal.prototype.screenShot=function(dom){
        var _this=this;
        html2canvas(dom).then(function(canvas) {
            console.dir(canvas);
            document.body.appendChild(canvas)
            _this.last_canvas=canvas;

        });
    }
    module.exports = Portal;
});