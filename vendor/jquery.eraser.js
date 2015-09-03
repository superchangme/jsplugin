/**
 * Created by tom.chang on 2014/11/3.
 */

/*how to use
*  $("#container").eraser({bgImage:obj,beforeInit:function(){
*  },success:function(){
*  })
*
*
* */

(function(factory){
    if(typeof define === "function" && define.amd != undefined ){
        // AMD模式
        define([ "jquery",'tomLib' ], factory);
    } else {
        // 全局模式
        factory(jQuery,true)
    }
})(function($,noGlobal){
    if(noGlobal===true){
        var tomLib=window.tomLib
    }
    // 这里才是插件真正的构造函数
    var Eraser=function(element,options){
        for(var i in options){
            this[i] = options[i];
        }
        this.element = element;
        if(!this.customCanvas){
            if($(element).is("canvas")){
                this.canvas=element;
            }else{
                this.canvas = $(element).find("canvas.eraser")[0];
            }
        }else{
            this.canvas= this.customCanvas;
        }
        if(this.canvas==undefined){
            this.canvas = document.createElement("canvas");
            this.container.appendChild(this.canvas);
            this.canvas.style.zIndex = Eraser._zIndex++;
            this.canvas.style.position = "absolute";
            this.canvas.style.top = "0";
            this.canvas.style.left = "0";
            this.canvas.id = "fingerEraser"+Eraser.ID++;
            this.canvas.className = "eraser";
        }


        if(!this.customCanvas){
            this.canvas.width = this.container.clientWidth;
            this.canvas.height = this.container.clientHeight;
        }
        if(this.container){
            this.viewHeight = this.container.clientHeight;
            this.viewWidth = this.container.clientWidth;
        }else{
            this.viewHeight=this.canvas.width;
            this.viewWidth=this.canvas.height;
        }

        if(this.canvas.tagName!="CANVAS" && !typeof  this.canvas.getContext=="function"){
            console.log("浏览器不支持canvas或者传入了错误的canvas对象");
            return;
        }
        this.ctx=this.canvas.getContext("2d");
    }
    Eraser._zIndex = 8888;
    Eraser.ID = 0;
    Eraser.DEFAULTS = {
        container:document.body,
        bindContainer:false,
        customCanvas:false,
        bgImage:null,  //dom: image
        bgColor:null,
        interval:100,
        scaleCanvas:1,
        noneedCalc:null,
        checkPng:false,
        deviceRatio:window.devicePixelRatio||1,
        namespace:".eraser",
        alphaNoZeroNum:0,
        beforeInit:function(){console.log("初始化开始")},
        radius:30,     //draw point
        density:1,    //check  gap
        percent:0.5,/*0-1 how much you erase*/
        success:function(){console.log("请添加回调函数")},
        clipMethod:"tapClip"//tapClip otherClip
    };

    Eraser.prototype.init=function(){
        var self=this,deferList;
        this.ctx.globalCompositeOperation = "source-over";
        //this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.isStop=false;
        if (this.bgColor) {
            this.ctx.save();
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
        if (this.imgList) {
            deferList=new tomLib.DeferredList(this.imgList.length);
            var imgList=[],img;
            for (var i = 0,l=this.imgList.length; i < l; i++){
                (function(index){
                    img=new Image();
                    img.onload=function(){
                        deferList.dealItem(index);
                    }
                    img.src=self.imgList[index].imgSrc;
                    imgList.push(img);
                    deferList.getItem(index).addCallbacks(function(){
                        self.addImage(imgList[index],self.imgList[index].bgPos,self.imgList[index].bgScale,self.imgList[index].isCover)
                    })
                })(i);
            }
        }
        this.beforeInit();
        if(this.checkPng){
            this.alphaNoZeroNum=getAlphaNoZeroNum(this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height),this);
        }
        //detach events
        $(document).off(this.namespace);
        if(this.ctxStyle){
            for(var p in this.ctxStyle){
                this.ctx[p]=this.ctxStyle[p];
            }
        }
        setTimeout(function(){
            self[self["clipMethod"]]();
        },100)
    }
    Eraser.prototype.addImage=function(img,pos,scale,isCover){
        var ratio = 1, start = 0, bgScale = scale || 1;
        if(img!=null){
            if(pos!=undefined){
                pos={top:pos.top||0,left:pos.left||0}
                if(pos.left=="center"){
                    pos.left=(this.viewWidth-img.width*bgScale/this.deviceRatio)/2
                }
                if(pos.top=="center"){
                    pos.top=(this.viewHeight-img.height*bgScale/this.deviceRatio)/2
                }
                this.ctx.drawImage(img,0,0,img.width,img.height,
                    pos.left,pos.top,img.width/this.deviceRatio*bgScale,img.height/this.deviceRatio*bgScale)
            }else if(isCover==true){
                this.ctx.drawImage(img,0,0,this.viewWidth,this.viewHeight)
            }else{
                if(img.width/img.height>this.canvas.width/this.canvas.height){
                    ratio=img.height/this.viewHeight;
                    start=Math.abs((img.width-this.viewWidth*ratio)/2);
                    this.ctx.drawImage(img,start,
                        0,img.width-2*start,img.height,0,0,this.viewWidth,this.viewHeight);
                }else if(img.width/img.height<this.canvas.width/this.canvas.height){
                    ratio=img.width/this.viewWidth;
                    start=Math.abs((img.height-this.viewHeight*ratio)/2);
                    this.ctx.drawImage(img,
                        0,start,img.width,img.height-2*start,0,0,this.viewWidth,this.viewHeight);
                }else{
                    this.ctx.drawImage(img,0,0,this.viewWidth,this.viewHeight);
                }
            }
        }
    }
    Eraser.prototype.stop=function(){
        this.isStop=true;
    }
    Eraser.prototype.start=function(){
        this.isStop=false;
    }
//通过修改globalCompositeOperation来达到擦除的效果
    Eraser.prototype.tapClip=function(){
        var hastouch = "ontouchstart" in window?true:false,
            tapstart = "touchstart mousedown",
            tapmove = "touchmove mousemove",
            tapend = "touchend mouseup",
            self = this,x1,y1,timeout,
            canvas=self.canvas,
            np=self.namespace,
            isTouch=false,
            ctx=self.ctx,beginDraw=false;
        var offset,id=$(canvas).prop("id"),el=this.bindContainer?$(this.container):"#"+id;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = self.radius*2;
        $(document).delegate(el,tapstart , function(e){
            clearTimeout(timeout)
            ctx.save();
            if(self.isStop){
                return;
            }
            e= e.originalEvent;
            beginDraw=true;
            if(self.every||(!isTouch&&self.type!="draw")){
                ctx.globalCompositeOperation = "destination-out";
                isTouch=true;
            }
            //if(!offset){
                offset=canvas.getBoundingClientRect();
            //}
            x1 = hastouch?e.targetTouches[0].clientX-offset.left:e.clientX-(offset.left-(canvas.width/2)*(self.scaleCanvas-1));
            y1 = hastouch?e.targetTouches[0].clientY-offset.top:e.clientY-(offset.top-(canvas.height/2)*(self.scaleCanvas-1));
            x1/=self.scaleCanvas;
            y1/=self.scaleCanvas;
            /*ctx.beginPath();
            ctx.arc(x1,y1,self.radius,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();*/
        })
        $(document).delegate(el, tapmove,tapmoveHandler);
        $(document).delegate(el,tapend, function(){
            if(!beginDraw||self.isStop){
                return;
            }
            beginDraw =false;
            if(!self.noneedCalc){
                timeout = setTimeout(function(){
                    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
                    var dd = getAlphaNoZeroNum(imgData,self);
                    var area=imgData.width*imgData.height;
                    if(self.checkPng){
                        area=self.alphaNoZeroNum;
                    }
                    var left=dd/(area/(self.density*self.density));
                    if(left<1-self.percent){
                        /*  canvas.className = "noOp";*/
                        self.success.call(self,canvas,ctx);
                    }else{
                        console.log("剩余非空白区域"+left)
                    }
                },self.interval)
            }
            if(self.touchEndCb){
                self.touchEndCb.call(self);
            }
            ctx.restore();
        });
        function tapmoveHandler(e){
            if(!beginDraw||self.isStop){
                return;
            }
            clearTimeout(timeout)
            e.preventDefault();
            e= e.originalEvent;
            var x2 = hastouch?e.targetTouches[0].clientX-offset.left:e.clientX-(offset.left-(canvas.width/2)*(self.scaleCanvas-1));
            var y2 = hastouch?e.targetTouches[0].clientY-offset.top:e.clientY-(offset.top-(canvas.height/2)*(self.scaleCanvas-1));
            x2/=self.scaleCanvas;
            y2/=self.scaleCanvas;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            ctx.closePath();
            /*$(canvas).drawLine({
             rounded: true,
             strokeStyle: '#000',
             strokeWidth: 30,
             x1: x1, y1: y1,
             x2: x2, y2: y2,
             compositing:"destination-out",
             closed: true
             });*/
            x1 = x2;
            y1 = y2;
        }
    }

//使用clip来达到擦除效果
    Eraser.prototype.otherClip=function(){
        var hastouch = !!("ontouchstart" in window),
            tapstart = hastouch?"touchstart":"mousedown",
            tapmove = hastouch?"touchmove":"mousemove",
            tapend = hastouch?"touchend":"mouseup",
            self = this,x1,y1,timeout,
            canvas=self.canvas,
            ctx=self.ctx;

        $(canvas).on(tapstart , function(e){
            clearTimeout(timeout)
            e.preventDefault();
            e= e.originalEvent;

            x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
            y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;

            ctx.save()
            ctx.beginPath()
            ctx.arc(x1,y1,self.radius,0,2*Math.PI);
            ctx.clip()
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.restore();
        })
        $(canvas).on(tapmove , tapmoveHandler);
        $(canvas).on(tapend , function(){
            // canvas.removeEventListener(tapmove , tapmoveHandler);
            if(self.noneedCalc){
                setTimeout(function(){
                    ctx.fillStyle="white";
                    ctx.fillRect(0,0,1,1);
                    ctx.fillStyle="black";
                    ctx.fillRect(1,1,2,2);
                    var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
                    var dd;
                    if(dd/(imgData.width*imgData.height/(self.density*self.density))<self.percent){
                        self.success.call(self,canvas,ctx);
                    }
                },self.interval)
            }
        });


        function tapmoveHandler(e){
            e.preventDefault()
            x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
            y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;

            var asin = a*Math.sin(Math.atan((y2-y1)/(x2-x1)));
            var acos = a*Math.cos(Math.atan((y2-y1)/(x2-x1)));
            var x3 = x1+asin;
            var y3 = y1-acos;
            var x4 = x1-asin;
            var y4 = y1+acos;
            var x5 = x2+asin;
            var y5 = y2-acos;
            var x6 = x2-asin;
            var y6 = y2+acos;

            ctx.save()
            ctx.beginPath()
            ctx.arc(x2,y2,self.radius,0,2*Math.PI);
            ctx.clip()
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.restore();
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(x3,y3);
            ctx.lineTo(x5,y5);
            ctx.lineTo(x6,y6);
            ctx.lineTo(x4,y4);
            ctx.closePath();
            ctx.clip()
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.restore();

            x1 = x2;
            y1 = y2;
        }
    }


    $.fn.eraser = function (option, value) {
        return this.each(function () {
            var $this=$(this);
            var  data =$(this).data("style.eraser");
            var  options = $.extend({}, Eraser.DEFAULTS,typeof option == 'object' && option);
            if (!data) $this.data('style.eraser', (data = new Eraser(this, options)));
            var action  = typeof option == 'string' ? option : "init";
            if (action) data[action](value)
        })
    }

    $.fn.eraser.Constructor = Eraser


    // MODAL NO CONFLICT
    // =================

    var old = $.fn.eraser;

    $.fn.eraser.noConflict = function () {
        $.fn.eraser = old
        return this
    }

    function getAlphaNoZeroNum(imgData,self){
        var dd= 0;
        for(var x=0;x<imgData.width;x+=1){
            for(var y=0;y<imgData.height;y+=self.density){
                // console.log(dd++)
                if(imgData.data[x*imgData.width*4+y*4+3] >0){
                    dd++
                }
            }
        }
        return dd;
    }

    return $
});


