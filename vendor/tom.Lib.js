/**
 * Created by tom.chang on 2015/4/28.
 */

(function(factory){
    if(typeof define === "function" && define.amd != undefined ){
        // AMD模式
        define([], factory);
    } else {
        // 全局模式
        factory(jQuery,window)
    }
})(function($,global){

    var _ = {};
    if(global){
        window.tomLib=_;
    }
    //browser support feature obj
    _.support={};

    //css3 style浏览器兼容
    _.prefixStyle=function(style){
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

    _.animateFrame=function(el, firstFrame, lastFrame, frameGapTime, isGoToFirstBoo, isLoopBoo, loopTimes, loopGapTime, callBackFun, stepFuc, waitFrame, waitTime) {
        var plugin = el.data("plugin"), frameClass,$list,
            isInit = plugin ? true : false, isPlay = plugin ? plugin.getPlayState() : false;
        if (isPlay) {
            return;
        }
        if (!isInit) {
            for (var i = 0; i <= lastFrame; i++) {
                frameClass="png-frame p" + (i + 1)+((i==0)? " show":"");
                el.append("<div class='"+frameClass+"'></div>");
            }
            $list = el.find(".png-frame");
            el.data("plugin", plugin = new Plugin());
        } else {
            plugin.reset();
            $list = plugin.list;
        }
        function Plugin() {
            var isPlay = true;
            this.list = $list;
            this.isInit = true;
            this.reset = reset;
            this.interval = null;
            this.timeout = null;
            this.isPlay = true;
            this.stop = function(){
                isPlay=false;
            }
            this.start = function(){
                isPlay=true;
            }
            this.getPlayState=function(){
                return isPlay
            }
        }

        function reset() {
            clearInterval(plugin.interval);
            $list.filter(function (item, index) {
                return index > 0
            }).removeClass("show");
            plugin.start();
            clearTimeout(plugin.timeout);
        }

        (function () {
            var count = firstFrame, next, time, prev;
            function frameEvent() {
                plugin.interval = setInterval(function () {
                    if(!plugin.getPlayState()){
                        return;
                    }
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
                            plugin.stop();
                            if (typeof callBackFun == "function") {
                                callBackFun();
                            }
                        } else if(!isLoopBoo) {
                            plugin.stop();
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
        return plugin;
    }


    /*
     */
    function parabola(open,leftOrNot,speed,strength,distance){

    }
    parabola.gender=function(x){


    }
    //enhance jquery plugin
    //from bootstrap

    function transitionEnd() {
        var el = document.createElement('bootstrap')
        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition    : 'transitionend',
            OTransition      : 'oTransitionEnd otransitionend',
            transition       : 'transitionend'
        }
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }
        return false // explicit for ie8 (  ._.)
    }

    //一个异步事件处理队列 实现了当后面事件全部完成时，回滚检查执行之前的未完成等待回调队列
    (function(){
        function DeferredList(len,callback){
            this.dfdList=[];
            this.$dfdList=[];
            this.callback=callback;
            var Gdfd= $.Deferred(),dfd;
            for(var i= 0,l=len;i<l;i++){
                dfd= new DeferredItem();
                Gdfd.then(dfd);
                if(i==0){
                    Gdfd.resolve();
                }
                Gdfd=dfd.defer;
                this.dfdList.push(dfd);
                this.$dfdList.push(dfd.defer);
            }
            if(typeof callback==="function"){
                $.when(this.$dfdList).then(callback)
            }
        }
        DeferredList.prototype.getItem=function(index){
            return this.dfdList[index]
        }
        DeferredList.prototype.dealItem=function(start){
            var beforeDone=true;
            for(var i= start-1;i>-1;i--){
                if(this.getItem(i).defer.state()!=="resolved"){
                    beforeDone=false
                }
            }
            if(beforeDone){
                this.getItem(start).changeState("filled");
                this.dealWaitList(start)
            }else{
                this.getItem(start).changeState("wait");
            }
            return this.getItem(start).cstate;
        }
        DeferredList.prototype.dealWaitList=function(start){
            var list=this.dfdList;
            for(var i= start+1,l=list.length;i<l;i++){
                if(this.getItem(i).cstate!=="wait"){
                    return false;
                }else{
                    this.getItem(i).changeState("filled")
                }
            }
        }
        function DeferredItem(){
            this.defer= $.Deferred();
            this.cstate="unfilled"; //wait filled
        }
        DeferredItem.prototype.addCallbacks=function(success,fail){
            this.defer.done(success).fail(fail);
        }
        DeferredItem.prototype.changeState=function(state){
            this.cstate=state;
            if(state==="filled"){
                this.defer.resolve();
            }
        }
        _.DeferredList=DeferredList;
    })();



    _.getParams=function(names){
        if(!names){
            return;
        }
        if(typeof names=="string"){
            names=[names];
        }
        if(typeof names.slice !="function"){
            return
        }
        var search=window.location.search.slice(1),list=search.split("&"),length= 0,r=[],temp;
        for(var j= 0,l=list.length;j<l;j++){
            temp=list[j].split("=");
            list[j]={};
            if(temp.length==2){
                list[j]["param"]=temp[0]
                list[j]["value"]=temp[1]
            }
        }
        for(var i= 0,l=names.length;i<l;i++){
            while(length<list.length){
                if(list[length]["param"]==names[i]){
                    r.push(decodeURI(list[length]["value"]));
                }else if(length==list.length-1&&!r[i]){
                    r.push(null);
                }
                length++;
            }
            length=0;
        }
        return r
    }
    return _;
});

/*

 document.ready = function (callback) {
 ///兼容FF,Google
 if (document.addEventListener) {
 document.addEventListener('DOMContentLoaded', function () {
 document.removeEventListener('DOMContentLoaded', arguments.callee, false);
 callback();
 }, false)
 }
 //兼容IE
 else if (document.attachEvent) {
 document.attachEvent('onreadytstatechange', function () {
 if (document.readyState == "complete") {
 document.detachEvent("onreadystatechange", arguments.callee);
 callback();
 }
 })
 }
 else if (document.lastChild == document.body) {
 callback();
 }
 }
 */
