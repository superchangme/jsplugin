/**
 * Created by tom.chang on 2015/4/28.
 */

define(function (){
var tomLib = {};
    //css3 style浏览器兼容
    tomLib.prefixStyle=function(style){
        var el = document.createElement('div')
        var vendors = 'webkitT,t,,MozT,msT,OT'.split(','),prefix;
        style=style.slice(1);
        for ( prefix in vendors) {
            if(el.style[vendors[prefix]+style]!=undefined){
                return vendors[prefix]+style
            }
        }
    }

    /*逐帧图片播放函数*/
    /*
     *  用法:animateFrame($rabbit,0,14,50,true,false,1,null,"callBackFun","stepCallBack",null,null);
     *  说明:
     *  el: 装载动画的容器，可以是class，或者id
     *  firstFrame：第一帧的 p0（test0.png 从0开始命名）
     *  lastFrame：最后一帧的 p14
     *  frameGapTime：每一帧动画的间隔时间
     *  isGoToFirstBoo：动画播放完毕是否停留到第一帧  true false
     *  isLoopBoo：是否循环播放  true false
     *  loopTimes：循环次数  默认值1
     *  loopGapTime：循环播放之间的间隔时间   默认值null
     *  callBackFun：回调函数（当循环为false时，播放一次完毕才执行。当循环为true时，循环完才执行）
     *  stepFuc：每一帧动画执行的函数
     *  waitFrame：停留在第几帧
     *  waitTime：停留在第几帧时，停留等待的时间
     *
     */

    tomLib.animateFrame=function(el, firstFrame, lastFrame, frameGapTime, isGoToFirstBoo, isLoopBoo, loopTimes, loopGapTime, callBackFun, stepFuc, waitFrame, waitTime) {
        var plugin = el.data("plugin"), $list, isInit = plugin ? true : false, isPlay = plugin ? plugin.isPlay : false;
        if (isPlay) {
            return;
        }
        if (!isInit) {
            for (var i = 0; i <= lastFrame; i++) {
                el.append("<div class=\"png-frame p" + (i + 1) + "\"></div>");
            }
            ;
            $list = el.find(".png-frame");
            el.data("plugin", plugin = new Plugin());
            reset();

        } else {
            $list = plugin.list;
        }
        function Plugin() {
            this.list = $list;
            this.isInit = true;
            this.reset = reset;
            this.interval = null;
            this.timeout = null;
            this.isPlay = true;
        }

        function reset() {
            clearInterval(plugin.interval);
            $list.filter(function (item, index) {
                return index > 0
            }).removeClass("show");
            clearTimeout(plugin.timeout);
        }

        (function () {
            var count = firstFrame, next, time, prev;
            plugin.isPlay = true;
            function frameEvent() {
                plugin.interval = setInterval(function () {
                    if (waitFrame && (waitFrame == count)) {
                        if (!time) {
                            time = +new Date;
                            return;
                        } else {
                            if (+new Date - time < waitTime) {
                                return;
                            } else {
                                waitFrame = null;
                            }
                        }
                    }
                    prev = count;
                    if (!isGoToFirstBoo) {
                        count++;
                    }
                    if (count == lastFrame) {
                        if (loopTimes)loopTimes--;
                        clearInterval(plugin.interval);

                        if (isLoopBoo && (loopTimes != 0 || loopTimes == null)) {
                            //循环播放 调用
                            plugin.timeout = setTimeout(function () {
                                if (isGoToFirstBoo) {
                                    count = 0;
                                }
                                frameEvent();
                            }, loopGapTime);
                        }
                        if (isLoopBoo && loopTimes == 0) {
                            plugin.isPlay = false;
                            if (typeof callBackFun == "function") {
                                callBackFun();
                            }
                        } else {
                            plugin.isPlay = false;
                        }
                        if (typeof callBackFun == "function" && isLoopBoo == false) {
                            callBackFun();
                        }
                    }

                    if (isGoToFirstBoo) {
                        count++;
                    }
                    if (count == lastFrame + 1) {
                        count = 0;
                    }
                    $list.eq(count).addClass("show");
                    $list.eq(prev).removeClass("show");
                    if (typeof stepFuc == "function") {
                        stepFuc(count);
                    }

                }, frameGapTime);
            }

            frameEvent();
        })();
        return reset;
    }
    return tomLib;
});
