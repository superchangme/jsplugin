


;(function(YAO) {
    if (YAO === undefined) {
        var YAO = function () {
        };
    } else {
        var YAO = YAO;
    }
    var _exec,elapsed,isSupport=false;
    function _throttle(delay, call,args,thisObj)
    {
        var  args=Object.prototype.toString.apply(args).slice(8,-1)==="Array"?args:[args] ;
        function callable()
        {
            function run()
            {
                _exec = +new Date();
                call.apply(thisObj,args);
            }
            if(!_exec){
                _exec=+new Date()
            }else{
                elapsed = +new Date() - _exec;
                if( elapsed > delay ) {
                    run();
                }
            }
        }
        return callable;
    }
    var throttle = 50,isStop=false, throttleFunc = function (args) {
        if(!isStop){
            deviceMotionHandler.call(YAO,args)
            //_throttle(throttle, deviceMotionHandler, args, YAO)();
        }
    };

    YAO.init = function () {
        this.x = this.y = this.z = this.last_x = this.last_y = this.last_z = 0;
        this.isStop = false;
        this.counts = 0;
        this.callback = function () {
        };
    }
    YAO.checkSupport = function(cb){
        function once(e){
                var acceleration = e.accelerationIncludingGravity;
                if(acceleration.x!=null){
                    isSupport=true;
                    cb(isSupport);
                }
                window.removeEventListener("devicemotion",once);
        }
        setTimeout(function(){
            cb(isSupport);
        },200);
        window.addEventListener('devicemotion',once, false);
    }
    YAO.start = function (cb) {
        //move event first
        YAO.destroy();
        if (typeof  cb === "function") {
            YAO.callback = cb;
        }
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', throttleFunc, false);
        } else {
            // alert('not support mobile event');
        }
    };
    YAO.destroy = function () {
        this.init();
        if (window.DeviceMotionEvent) {
            window.removeEventListener('devicemotion', throttleFunc, false);
        }
    };
    YAO.stop = function(){
        this.isStop = true;
        this.counts = 0;
    }
    YAO.restart = function(){
        this.isStop = false;
    };
    function deviceMotionHandler(eventData) {
        if(YAO.isStop){
            return;
        }
        var acceleration = eventData.accelerationIncludingGravity;
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
        if ((Math.abs(this.x- this.last_x)+Math.abs(this.y-this.last_y)+Math.abs(this.z - this.last_z)) / throttle >0.5) {
            this.counts++;
            this.callback();
            // var old=document.getElementById("log").value;
            // document.getElementById("log").value="<br>"+(Math.abs(this.x- this.last_x)+","+Math.abs(this.y-this.last_y)+","+Math.abs(this.z - this.last_z));
        }
        this.last_x = acceleration.x;
        this.last_y = acceleration.y;
        this.last_z = acceleration.z;
    }

    if(window.YAO===undefined){
        window.YAO=YAO;
    }
})(window.YAO);
/**
 * Created by Administrator on 2015/2/1.
 */
