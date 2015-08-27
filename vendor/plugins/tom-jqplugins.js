(function(factory){
    if(typeof define === "function" && define.amd != undefined ){
        // AMD模式
        define(["jquery","hammer",'hammer.fake','hammer.showtouch' ], factory);
    } else {
        // 全局模式
        factory()
    }
})(function($) {
    //2015-08-21  hammer plugin
    ;(function(){
        if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
            Hammer.plugins.showTouches();
        }
        if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
            Hammer.plugins.fakeMultitouch();
        }

        $.fn.hammer = Plugin;
        $.fn.hammer.Constructor = Myhammer;
        $.fn.hammer.noConflict=function(){
            $.fn.hammer=old;
            return this;
        }
        var old= $.fn.hammer;
        function Plugin(opt){
            return this.each(function(){
                var $this=$(this);
                //if($this.is("canvas")){
                    var data = $this.data("tom.hammer");
                    var opts = $.extend({},Myhammer.DEFAULTS,$this.data(),typeof opt=="object" &&opt)
                    if(!data) $this.data("tom.hammer",(data=new Myhammer(this,opts)))
                    if(typeof opts=="string") data[opts]()
              /*  }else{
                    console.log("need a  canvas element")
                }*/
            })
        }
        Myhammer.DEFAULTS={
            transform_always_block: true,
            transform_min_scale: 1,
            drag_block_horizontal: true,
            drag_block_vertical: true,
            drag_min_distance: 0,
            gestureCb:function(){
                console.log('请添加手势回调')
            }
        }

        function Myhammer(canvas,opts){
            console.log(opts.gestureCb.toString())
            var posX=0, posY=0,
                lastPosX=0, lastPosY=0,
                bufferX=0, bufferY=0,
                scale=1, last_scale=1 ,rotation= 1, last_rotation, dragReady= 0,self=this;
            var hammertime = Hammer(canvas, opts);
            hammertime.on('touch drag dragend transform', function(ev) {
                if(!self.isStop){
                    manageMultitouch(ev);
                }
            });
            function manageMultitouch(ev){
                switch(ev.type) {
                    case 'touch':
                        last_scale = scale;
                        last_rotation = rotation;
                        break;
                    case 'drag':
                        posX = ev.gesture.deltaX + lastPosX;
                        posY = ev.gesture.deltaY + lastPosY;
                        opts.gestureCb.call(self,{x:posX,y:posY})
                        break;
                    case 'transform':
                        rotation = last_rotation + ev.gesture.rotation;
                        scale = Math.max(0, Math.min(last_scale * ev.gesture.scale, 10));
                        opts.gestureCb.call(self,{scale:scale})
                        break;
                    case 'dragend':
                        lastPosX = posX;
                        lastPosY = posY;
                        break;
                }
            }
            this.reset=function(){
                posX=0, posY=0,
                    lastPosX=0, lastPosY=0,
                    bufferX=0, bufferY=0,
                    scale=1, last_scale=1 ,rotation= 1;
            }
        }
        Myhammer.prototype.stop=function(){
            this.isStop=true;
        }
        Myhammer.prototype.start=function(){
            this.isStop=false;
        }
    })();
})
