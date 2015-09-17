FastClick.attach(document.body);
var IS_IPHONE=window.navigator.userAgent.indexOf('iPhone') > -1||true;
var MYSWIPER;
var TRANSFORM=prefixStyle("transform")
var TRANSITION_END=prefixEvent("transitionEnd");
var isSubmiting=false;
var isSubmited=false;
var scrollTop=0;
var loadedTimes=0;
var app=app||{};
var eventsTipArr=[
    {tip:"颜值男团",img:"img/qrcode.png"}
]
$(".btn").on("click",function(e){
    e.preventDefault();
})
$.extend(app,{
    speedFactor: 10,
    $bigShow:$(".bigShow"),
    currentScreen:null,
    play:function(){
        var image=new Image;
        var interval;
        var temp,start,index;
        image.onload=function(){
            app.dubber.play();
            $("#captionText").animate({"translate3d":$("#captionText").parent().width()-$("#captionText").width()+"px,0,0"},app.dubber.duration*1000,function(){
                app.stopEvent();
            })
            if(app.textDisplayTime){
                start=+new Date();
                interval=setInterval(function(){
                    if(+new Date()-start>=app.textDisplayTime){
                        app.$bigShow.addClass("in")
                        clearInterval(interval)
                        setTimeout(function(){
                            app.$bigShow.removeClass("in")
                        },2000)
                    }
                },30)
            }
        }
        image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=';

    } ,
    uploadEvent:function(that,e){
        var form=$(that).parents("form"),eventLoad=$("#eventLoading");
        if(checkForm(form[0])){
            eventLoad.addClass("in");
            $.ajax({
                url:uploadUrl,
                data:form.serialize(),
                dataType:"json",
                type:"post",
                success:function(data){
                    //data= JSON.parse(data);
                    if(data.result==1){
                        window.location.href=data.url;
                    } else{
                        alert(data.message)
                    }
                }
            })
           /* loadCrossData(uploadUrl,form[0],function(data){
                data= JSON.parse(data);
                if(data.result==1){
                window.location.href=data.url;
                } else{
                alert(data.message)
                }
            })*/
        }

        /* $.ajax({
         type:"post",
         url:uploadUrl,
         data:$(that).parents("form").serialize(),
         success:function(data){
         console.log(data)
         }
         })*/
    },
    screens:{
        playScreen:$("#playScreen"),
        createScreen:$("#createScreen"),
        shareScreen:$("#shareScreen") ,
        startShowScreen:$("#startShowScreen")
    },
    $loadingMask:$(".loading-mask"),
    seeEvent:function(){
        var one=false;
        app.newsStartAudio.play();
        app.screens.startShowScreen.addClass("in").find(".endFrame")[0].addEventListener(TRANSITION_END,function(){
            if(!one){
                one=true;
                openMask({
                    maskTop:app.$loadingMask.find(".top")[0],
                    maskBottom:app.$loadingMask.find(".bottom")[0],
                    width:window.innerWidth,
                    height:window.innerHeight,
                    duration: parseInt(1500/16),
                    beforeInit:function(){
                        app.$loadingMask.addClass("in")
                    },
                    success:function(){
                        app.screens.startShowScreen.removeClass("in");
                        app.$loadingMask.removeClass("in");
                        app.updateScreen(app.screens.playScreen);
                        setTimeout(function(){
                            app.newsStartAudio.pause();
                            app.playEvent();
                        },600)
                }})
            }
        })
    },
    showMask:function(){
        app.$videoMask.addClass("in");
    },
    playEvent:function(){
        app.$videoMask.removeClass("in");
        app.play();
    },
    stopEvent:function(){
        app.$videoMask.addClass("in");
        if(app.dubber){
            app.showMask();
            app.dubber.pause();
            $("#captionText").animate({"translate3d":"0,0,0"},0);
        }
    },
    createMyEvent:function() {
        app.updateScreen(app.screens.createScreen);
    },
    updateScreen:function(newScreen){
            if(newScreen!=app.screens.playScreen){
                       app.stopEvent();
            }
            if(newScreen==app.screens.shareScreen){
                window.location.hash="share";
            }
            if(!app.currentScreen){
                newScreen.addClass("in")
            }else{
                app.currentScreen.addClass("out").removeClass("current")
                newScreen.addClass("in")
            }
        app.currentScreen=newScreen.addClass("current")
    },
    sexLock:false,
    updateSex:function(){
        var change=false
        if(app.sexLock){
            return;
        }
        app.$sexInput.each(function(index,item){
            if(!change&&item.checked==true){
                app.$sexInput[1-index].checked=true;
                app.$sexLinkDom.eq(1-index).removeClass("out");
                app.$sexLinkDom.eq(index).addClass("out")
                item.checked=false;
                change=true;
            }
        })
    },
    $sexLinkDom:$("[data-sex]"),
    $sexInput:$("[name=sex]"),
    $videoMask:$("#videoMask")
})

window.addEventListener("hashchange",function(){
    if(window.location.hash=="#share"){

    }else{
         app.updateScreen(app.screens.createScreen)
    }
})
//var basePath = 'http://wximg.gtimg.com/tmt/_events/promo/EyxiHkkq';
if (!(typeof webpsupport == 'function')) {
    var webpsupport = function (cb) {
        cb();
    }
}

webpsupport(function (webpa) {
    var loader = new WxMoment.Loader(),
        fileList =
            [ 'img/anim_pops.png',
                'img/btn_ishare.png',
                'img/btn_itry.png',
                'img/btn_morelink.png',
                'img/btn_see_big.png',
                'img/btn_video_start.png',
                'img/event_loading.png',
                'img/event_loading_white.png',
                'img/p0_bg.png',
                'img/p0_car.png',
                'img/p1_girl.png',
                'img/p1_man.png',
                'img/p3_car.png',
                'img/p3_logo.png',
                'img/p3_share_text.png',
                'img/qrcode.png',
                'img/video_frame.png'
            ],
        $numText=$('.loading-num').find('span'),$loadInner=$("#loadInner");
    for (var i = 0; i < fileList.length; i++) {
        var basename = fileList[i].substring(fileList[i].lastIndexOf('/') + 1);
        if (webpa && img_map && (basename in img_map) && img_map[basename]) { //if webp
            var path = fileList[i].replace(/\.\w+/, '.webp');
        } else {
            var path = fileList[i];
        }
        loader.addImage(basePath + path);
    }

    loader.addCompletionListener(function () {
        loadedTimes+=1;
            checkLoaded()
        $('.screen').addClass("loaded");
    });

    function checkLoaded(){
        if(loadedTimes==2||(app.newsId==""&&loadedTimes==2)){
            $('.loading').remove();
            $(".outer").show();
            resetMeta();
            setTimeout(function(){
                $(document.documentElement).addClass("auto in")
                $('.screen').eq(0).addClass('active');
                document.body.scrollTop=0;
                if(app.newsId!=""){
                    //观看大事件
                    app.seeEvent();
                }else{
                    //生成大事件
                    app.createMyEvent();
                }
            },0)
        }
    }
    //loadBg music
    if(app.newsId){
        loadAudio(app.audioSrc,function(audio){
            var index;
            loadedTimes+=1;
            document.body.appendChild(audio)
            app.dubber=audio;
            app.dubber.isPaused=false
            checkLoaded()
           setTimeout(function(){
               for(var i= 0,l=eventsTipArr.length;i<l;i++){
                   index=app.text.indexOf(eventsTipArr[i].tip);
                   if(index>-1){
                       app.textDisplayTime=(index/app.text.length)*app.dubber.duration*1000;
                       app.$bigShow.find("img").attr("src",basePath+eventsTipArr[i].img)
                   }
                   break;
               }
           },0)
        })
    }

    loadAudio(basePath+"media/news_start.mp3",function(audio){
        loadedTimes+=1;
        document.body.appendChild(audio)
        app.newsStartAudio=audio;
        checkLoaded()
    })


    //loading 进度监听
    loader.addProgressListener(function (e) {
        var percentUp = Math.round((e.completedCount / e.totalCount) * 100), //正序, 1-100
            progressDown = 100 - percentUp;                                   //倒序, 100-1
        $loadInner.animate({translate3d:""+progressDown + '%,0,0'},0)
        $numText.text(percentUp + '%');
        if(percentUp==100){
            $loadInner.animate({translate3d:""+-100 + '%,0,0'},600)
        }
    });

    //启动
    loader.start();
});
//切换
/*
 new WxMoment.PageSlider({
 pages: document.querySelectorAll('.screen')
 });
 */

//滑动插件
;(function(){
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
//张新旭的run
    var _run = function(el,style,curVal,changeVal,curTime,during,unit,cb) {
        //想要什么缓动效果就修改这里Tween
        var newVal = parseInt(Tween.Sine.easeIn(++curTime, curVal, changeVal, during));
        //el.css(style,newVal+unit);
        el[style]=newVal+unit;
        if (curTime < during){
            requestAnimFrame(function(){
                _run(el,style,curVal,changeVal,curTime,during,unit,cb);
            });
        }else{
            if(typeof cb==="function")cb();
        }
    };

    $.fn.myAnimate=function(styleObj,dur,cb){
        return this.each(function(){
            var propKey,curVal,endVal,unit,duration=dur;
            if(duration!=0){
                duration=parseInt(duration/16);
            }else{
                duration=0
            }
            for(var prop in styleObj){
                propKey=prop;
                endVal=styleObj[prop];
                break;
            }
            //curVal=$(this).css(propKey);
            curVal=this[propKey];
            unit=(endVal+"").replace(parseFloat(endVal),"");
            if(curVal!=parseFloat(endVal)){
                _run(this,propKey,parseFloat(curVal),parseFloat(endVal)-parseFloat(curVal),0,duration,unit,cb);
            }else{
                if(typeof cb==="function")cb();
            }
        })
    }
})();
function resetMeta(){
    var g=window.innerWidth,h=window.innerHeight,k;
    (g/h)>=320/504?k=h/1008:k=g/640;
    console.log(g,h,k)
    document.getElementById("eqMobileViewport").setAttribute("content","initial-scale="+k+",maximum-scale="+k+",user-scalable=no")
}
//init
$(function(){
    animateGroup({group:$(".three-dots"),classSwitch:true,frameClass:["a","b","c"],duration:500})
    if(!!app.text){
        $("#captionText").text(app.text);
        loadAudio(app.audioSrc,function(audio){
            app.dubber=audio;
        })
    }
    //性别滑动

    ;(function(){
        var start=0;
        $("#swipeBox").on("touchstart",function(e){
             start=  e.changedTouches[0].clientX;
        }).on("touchend",function(e){
            if(Math.abs(start- e.changedTouches[0].clientX)>50){
                app.updateSex();
            }
            start=0;
        }).on("click",function(){
            app.updateSex();
        })
    })();

    //重新播放
    $("#replayEvent").on("click",function(){
        app.playEvent();
    })
    //上传数据
    $("#uploadMyEvent").on("click",app.uploadEvent.bind(null,$("#uploadMyEvent")))
    //去分享页
    $("#goShare").on("click",app.updateScreen.bind(null,app.screens.shareScreen))
    //去生成页
    $("#goCreate").on("click",app.updateScreen.bind(null,app.screens.createScreen))

})
//swipe plugin
function mySwipe(opts,successCb,beforeSwipeCb){
    document.body.scrollTop=0
    var options={
        current:0,
        pageSelector:".screen",
        wrap:document.body,
        $fixDom:$("") ,
        duration:12.36*50
    },pages,pagesNum= 0,current,$wrapper,pageHeight=window.innerHeight;
    var swiper={pageLock:false}
    options= $.extend(options,opts);
    pages=$(options.wrap).find(options.pageSelector);
    pagesNum=pages.length;
    current=options.current;
    $wrapper=$(options.wrap);
    $wrapper.css('height',pageHeight*pagesNum);
    pages.css('height',pageHeight);
    document.addEventListener("touchmove",function(e){
            e.preventDefault();
    })

    $(document).on('swipeDown',function(){
        if(!swiper.pageLock){
            //上一页
            if(current>0){
                swiper.pageLock=true;
                current=current-1;
                var top=current*pageHeight;
                if(typeof beforeSwipeCb=="function"){
                    beforeSwipeCb.call(swiper,pages.eq(current),current,-1)
                }
                $(document.body).myAnimate({scrollTop:top},options.duration,function(){
                    //  $("#mod_tenvideo_video_player_0").show();
                    //alert("call back");

                    swiper.pageLock=false;
                    options.$fixDom.each(function(index,item){
                        item.style[TRANSFORM]="translate3d(0,"+top+"px,0)";
                    })
                    if(typeof successCb=="function"){
                        successCb.call(swiper,pages.eq(current),current,-1)
                    }
                })
            }
        }
    })
    $(document).on('swipeUp',function(){
        if(!swiper.pageLock){
            //下一页
            if(current<pagesNum-1){
                swiper.pageLock=true;
                current=current+1;
                var top=current*pageHeight;
                if(typeof beforeSwipeCb=="function"){
                    beforeSwipeCb.call(swiper,pages.eq(current),current,-1)
                }
                //$("#mod_tenvideo_video_player_0").hide();
                $(document.body).myAnimate({scrollTop:top},options.duration,function(){
                    //$("#mod_tenvideo_video_player_0").show();
                    swiper.pageLock=false;
                    options.$fixDom.each(function(index,item){
                        item.style[TRANSFORM]="translate3d(0,"+top+"px,0)";
                    })
                    if(typeof successCb=="function"){
                        successCb.call(swiper,pages.eq(current),current,1)
                    }
                })
            }
        }
    })
    swiper.next=function(){
        $(document).trigger("swipeUp")
    }
    swiper.prev=function(){
        $(document).trigger("swipeDown")
    }
    swiper.go=function(index,successCb){
        if(!swiper.pageLock){
            //下一页
            if(index>=0&&index!=current&&index<pagesNum){
                swiper.pageLock=true;
                var gap=Math.abs(current-index);
                current=index;
                var top=index*pageHeight;
                if(typeof beforeSwipeCb=="function"){
                    beforeSwipeCb.call(swiper,pages.eq(current),current,-1)
                }
                //$("#mod_tenvideo_video_player_0").hide();
                $(document.body).myAnimate({scrollTop:top},/*options.duration*gap*/0,function(){
                    //$("#mod_tenvideo_video_player_0").show();
                    swiper.pageLock=false;
                    options.$fixDom.each(function(index,item){
                        item.style[TRANSFORM]="translate3d(0,"+top+"px,0)";
                    })
                    if(typeof successCb=="function"){
                        successCb.call(swiper,pages.eq(current))
                    }
                })
            }
        }
    }
    $(document).on("mousewheel",function(e){
        e.preventDefault();
        if(e.wheelDelta<0){
            swiper.next();
        }else if(e.wheelDelta>0){
            swiper.prev();
        }
    })
    swiper.getCurrent=function(){
        return current;
    }
    return swiper;
}
//旋屏提示
new WxMoment.OrientationTip();



//切换



function prefixStyle(style){
    var el = document.createElement('div')
    var vendors = 'webkitT,t,,MozT,msT,OT'.split(','),prefix;
    style=style.slice(1);
    for ( prefix in vendors) {
        if(el.style[vendors[prefix]+style]!=undefined){
            return vendors[prefix]+style
        }
    }
}
function prefixEvent(t){if(t){var e=document.createElement("div"),n={Webkit:"webkit",Moz:"",O:"o"};for(var i in n)if(void 0!=e.style[i+"TransitionProperty"])return n[i]+String.fromCharCode(t[0].charCodeAt()-32)+t.slice(1)}}
function animateFrame(el, firstFrame, lastFrame, frameGapTime, isGoToFirstBoo, isLoopBoo, loopTimes, loopGapTime, callBackFun, stepFuc, waitFrame, waitTime) {
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

function loadAudio(src,cb){
    var audio=document.createElement("audio"),readyCount=0;
    audio.preload="preload";
    $.ajax({
        url:src,
        success:function(result){
            readyCount++;
            checkReady();
    }})
    audio.addEventListener('loadedmetadata', function() {
        readyCount++;
        checkReady();
    });
    audio.src=src;
    function checkReady(){
        if(readyCount==2){
            cb.call(null,audio);
        }
    }
}
function ajax(url,cb){
    function sendRequest(){
        var xmlHttp=null;
        try{
            xmlHttp=new XMLHttpRequest();
        }
        catch(e){
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    }
    var xhr=sendRequest();
    xhr.open("GET",url,false);
    xhr.onreadystatechange=function(){
        if(xhr.status == 200&&xhr.readyState == 4 ){
            var result=xhr.responseText;
            if(cb){
                cb.call(null,result);
            }
        }
    }
    xhr.send(null);
}

function loadCrossData(src,form,cb){
    var isFirst=false;
    var frame=document.createElement("iframe");
    var selfSrc='about:blank';
    var loaded=false
    var id="loadCorssData_"+Math.floor(Math.random()*1000)
    frame.style.display='none';
    frame.id=id;
    frame.name=id;
    document.body.appendChild(frame)
    frame.addEventListener("load",function(){
        isFirst=true;
        frame.removeAttribute("name")
        if(loaded==false){
            loaded=true;
//                console.log(frameWindow)
//                cb.call(null,frame.contentWindow.name)

            frame.contentWindow.location.href=selfSrc;
        }else{
            console.log(frame.contentWindow.name)
            cb.call(null,frame.contentWindow.name)
            document.body.removeChild(frame)
        }
    })
    if(form&&form.tagName.match(/form/i)){
        form.target=id;
        form.method='post';
        form.action=src;
        form.submit();
    }else{
        frame.src=src;
    }
}
function checkForm(form){
    var inputs=[].slice.call(form.elements),result=true,pattern;
    inputs.forEach(function(item,index){
        if(item.getAttribute("name")){
            if(item.getAttribute('pattern')){
                pattern=new RegExp(item.getAttribute('pattern'));
            }
            if(/^\s*$/.test(item.value)){
                result=false
            }
            if(pattern&&!pattern.test(item.value)){
                result=false;
            }
            pattern=null;
        }
    })
    if(!result){
        alert("请输入正确的中文名字!")
    }
    return result;
}
function shareToWx(title, link, imgUrl, desc, cb) {
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            cb();
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            cb();
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}
function animateGroup(opts){
    //group,frameClass,duration,gap,startIndex,loopTimes,cb
    var animArr=opts.group,reset,duration=opts.duration+(opts.gap|| 0),curEl=animArr.eq(0),index=opts.startIndex|| 0,
        animLen=Math.max(opts.frameClass.length,animArr.length),groupMaxIndex=animArr.length-1;
    function run(){
        curEl.addClass(opts.frameClass[index]||opts.frameClass[0])
    }
    if(!opts.waitTime){
        go();
    }else{
        setTimeout(function(){
            go();
        },opts.waitTime)
    }
    function go() {
        run();
        reset = setInterval(function () {
            if (opts.classSwitch !== false) {
                curEl.removeClass(opts.frameClass[index] || opts.frameClass[0]);
            }
            index++;
            if (index > animLen - 1) {
                opts.loopTimes--;
                index = 0;
            }
            curEl = animArr.eq(Math.min(index,groupMaxIndex));
            if (opts.loopTimes == null || opts.loopTimes != 0) {
                run();
            }
            if (opts.loopTimes == 0) {
                clearInterval(reset);
                typeof opts.callback == "function" && opts.callback();
            }
        }, duration + 70);
    }
    return reset;
}

function openMask(opts){
    var per= 0,init=false,factor=opts.factor|| 1,curTime= 0,step=Number((opts.height*factor/200).toFixed(2)),max=opts.height/2,ctop= 0;
    function _run(){

        if(init==false){
            opts.maskTop.style.clip='rect('+0+"px,"+opts.width+"px,"+0+"px,0";
            opts.maskBottom.style.clip='rect('+opts.height+"px,"+opts.width+"px,"+opts.height+"px,0";
            init=true;
            opts.beforeInit.call();
        }
        requestAnimFrame(function(){
             ctop = parseInt(Tween.Cubic.easeInOut(++curTime, 0, max, opts.duration));
          //  ctop=Math.min(max,ctop+step)
            opts.maskTop.style.clip='rect('+0+"px,"+opts.width+"px,"+ctop+"px,0";
            opts.maskBottom.style.clip='rect('+(opts.height-ctop)+"px,"+opts.width+"px,"+opts.height+"px,0";
            if(curTime<opts.duration){
                _run();
                curTime++
            }else if(curTime>=opts.duration){
                  opts.success.call();
            }
        })
    }
    _run()
}

