var jssdkURL="../php/main.php?a=wechatsign&url="+encodeURIComponent(window.location.href.split("#")[0]);
var app=app||{};
var animateTipArr=new Array(8);
var oneTime=new MyTimer();
$.extend(app,{
    headBar:$("#headBar"),
    $dateTime:$("[data-time]"),
    $dateDate:$("[data-date]"),
    $dateWeek:$("[data-week]"),
    currentSlide:null,
    $lingmuBanner:$("#lingmuBanner"),
    $valueOfLingmu:$("#valueOfLingmu")
})

oneTime.addCb(function(time){
    var hoursAndMins="",date="",week="",weekArrs=['天',"一","二",'三','四','五','六'];
    hoursAndMins+=fillNumByWord(time.getHours(),0,2)+":"+fillNumByWord(time.getMinutes(),0,2);
    date+=(time.getMonth()+1)+"月"+time.getDate()+"日";
    week+="星期"+weekArrs[time.getDay()];
    app.$dateDate.html(date)
    app.$dateTime.html(hoursAndMins)
    app.$dateWeek.html(week)
})
app.headBar.hide();

$.ajax({url:visitUrl,success:function(){
    console.log("记录访问信息")
}})

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
var shareInfo={
    title:'FBI绝密任务！身为传奇特工的你能否侦破？',
    link:location.href.split('#')[0],
    imgUrl:location.href.replace("html/index.html","img/wx_share.jpg"),
    desc:'点击获取线索，秘密就藏在里面！'
}

init_wx_jsapi(jssdkURL,function(config){
    config.debug=isDebug;
    wx.config(config);
    wx.ready(function(){
        shareToWx(shareInfo.title,shareInfo.link,shareInfo.imgUrl,shareInfo.desc,function(){
            $.ajax({
                url:collectShareUrl ,
                complete:function(){

                }
            })
        })
    });
});


FastClick.attach(document.body);
var IS_IPHONE=window.navigator.userAgent.indexOf('iPhone') > -1||true;
var MYSWIPER;
var TRANSFORM=prefixStyle("transform")
var TRANSITION_END=prefixEvent("transitionEnd");
var startAudio;
var bgAudio;
var isSubmiting=false;
var isSubmited=false;
var scrollTop=0;
var loadedTimes=0;
window.addEventListener("orientationchange",function(){
    if (window.orientation == 0 || window.orientation == 180) {
        //orientation = 'portrait';
        document.body.scrollTop=scrollTop;
        return false;
    }
    else if (window.orientation == 90 || window.orientation == -90) {
        //orientation = 'landscape';
        return false;
    }
})

//var basePath = 'http://wximg.gtimg.com/tmt/_events/promo/EyxiHkkq';
var basePath ="../";
if (!(typeof webpsupport == 'function')) {
    var webpsupport = function (cb) {
        cb();
    }
}

webpsupport(function (webpa) {
    var loader = new WxMoment.Loader(),
        fileList =
            ['img/btn_accept.png',
                'img/btn_go_form.png',
                'img/btn_lock.png',
                'img/btn_more.png',
                'img/btn_next.png',
                'img/btn_submit_form.png',
                'img/car_logo_white.png',
                'img/disk.png',
                'img/form_bg.png',
                'img/h5_bg.jpg',
                'img/hand.png',
                'img/light_slide.png',
                'img/lingmu_wall_banner.png',
                'img/p1_bg.jpg',
                'img/p2_bg.png',
                'img/p2_led.png',
                'img/p2_light.png',
                'img/p2_mission_dur.png',
                'img/p2_mission_pwd.png',
                'img/p2_mission_title.png',
                'img/p3_bg.jpg',
                'img/p3_paper.png',
                'img/p3_qs.png',
                'img/p4_bg.jpg',
                'img/p4_deng.png',
                'img/p4_qs.png',
                'img/p4_wall1.png',
                'img/p4_wall2.png',
                'img/p55_bg.jpg',
                'img/p5_bg.jpg',
                'img/p5_qs.png',
                'img/p6_bg.jpg',
                'img/p6_qs.png',
                'img/p8_bg.png',
                'img/p8_fbi.png',
                'img/p8_star.png',
                'img/p8_text.png',
                'img/p8_thumb.png',
                'img/p8_title.png',
                'img/p9_bg.png',
                'img/p9_star.png',
                'img/pd_bg.png',
                'img/pd_text_bg.png',
                'img/pd_tip.png',
                'img/rocket.png',
                'img/share-arrow.png',
                'img/share_logo.png',
                'img/tip_circle.png',
                'img/video_bg.jpg',
                'img/voice-logo.png',
                'img/volume_off.png',
                'img/volume_on.png',
                'img/wx_share.jpg'
            ],
        $numText=$('.loading-num').find('span');
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
        if(loadedTimes==3){
             init_h5();
        }
    }
    function init_h5(){
        MYSWIPER=new Swiper('.swiper-container', {
            speed: 600 ,
            initialSlide:1
        });
        MYSWIPER.lockSwipeToPrev()
        MYSWIPER.on("onSlideChangeStart",function(swiper){
            var index=swiper.activeIndex;
            if(index==0){
                MYSWIPER.unlockSwipeToNext()
                app.headBar.hide();
                bgAudio.pause();
            }else{
                MYSWIPER.lockSwipeToNext()
                app.headBar.show();
                playAudio(bgAudio)
            }
        }).on("onSlideChangeEnd",function(swiper){
            app.currentSlide=$(swiper.slides[swiper.activeIndex]);
            var agroup=animateTipArr[swiper.activeIndex];
            if(agroup){
                setTimeout(function(){
                    agroup.start();
                },3000)
            }
        })
        $("[data-next]").on("click",function(){
            setTimeout(function(){
                MYSWIPER.unlockSwipeToNext()
                MYSWIPER.slideNext();
            },$(this).data("delay"));
        })
        $("[data-bind-tip]").on("click",function(){
            $(this).parent().addClass("success")
        })
        lightFrame=animateFrame($(".light_frame"),0,15-1,100,true,true,null,1000);
        lightFrame.stop();
        setTimeout(function(){
           $('.loading').remove();
            startAudio.play();
            //$(document.documentElement).addClass("auto")
            $('.screen').eq(0).addClass('active');
            lightFrame.start();
        },100)
        animateTipArr[2]=animateGroup({frameClass:["shake"," "],isStop:true,group:$("#paper"),duration:3100});
        animateTipArr[3]=animateGroup({frameClass:["flash"," "],isStop:true,group:$("#wallFrame"),duration:3100});
        animateTipArr[4]=animateGroup({frameClass:["rotate"," "],isStop:true,group:$("#disk"),duration:3100});
    }
    //init_h5();
    //loadBg music
    loadAudio("../media/bg.mp3",function(audio){
        loadedTimes+=1;
        checkLoaded()
        bgAudio=audio;
        bgAudio.loop="loop"
        bgAudio.volume=0.5
    })

    loadAudio("../media/text_notify.mp3",function(audio){
        loadedTimes+=1;
        checkLoaded()
        startAudio=audio;
    })

    function playAudio(audio){
        var image=new Image;
        image.onload=function(){
            audio.play();
            audio.isPaused=false
        }
        image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=';
    }


    //loading 进度监听
    loader.addProgressListener(function (e) {
        var percentUp = Math.round((e.completedCount / e.totalCount) * 100), //正序, 1-100
            progressDown = 100 - percentUp;                                   //倒序, 100-1

        $numText.text(percentUp + '%');
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
    document.getElementById("eqMobileViewport").setAttribute("content","width=640,initial-scale="+k+",maximum-scale="+k+",user-scalable=no")
}
//init
var lightFrame;
var wallFrame;
$(function(){
    resetMeta();
var musicBtn=$(".music-btn"),$modalPages=$(".share-bg"),$awardPage=$("#awardPage"),$sharePage=$("#shareBg"),$readyPage=$("#readyPage");
    $(".btn-go-site").on("click",function(e){
        e.stopImmediatePropagation();
    })
    $("a.btn").on("click",function(e){
        e.preventDefault();
    })
    $('a.btn-go-award').on("click",function(){
        $awardPage.show();
    })
    $("#closeBtn").on("click",function(){
        $awardPage.hide();
    })
    var touchTime=0;
    setTimeout(function(){
        var scale=window.innerWidth/640,hscale=window.innerHeight/1008;
        if(isBgHeightCover()){
       /*     //isBgHeightCover
            1
            //getScale
            bottom:imgHeight/1008     left:46
            0
//
            bottom:imgHeight      left :46/window.innerWidth*/
            scale=hscale;
        }
        app.$lingmuBanner.css({bottom:573*scale,right:18*scale+window.innerWidth/2})[0].style[TRANSFORM]="scale("+scale+") translate3d("+297*(1-scale)/2+"px,"+166*(1-scale)/2+"px,0)"
        $("#paper").css({top:515*scale,right:-246*scale+window.innerWidth/2})[0].style[TRANSFORM]="scale("+scale+") translate3d("+297*(1-scale)/2+"px,"+166*(scale-1)/2+"px,0)"
        $("#disk").css({top:140*scale,right:-88*scale+window.innerWidth/2})[0].style[TRANSFORM]="scale("+scale+") translate3d("+106*(1-scale)/2+"px,"+106*(scale-1)/2+"px,0)"
        $("#wallFrame").css({top:209*scale,right:110*scale+window.innerWidth/2})[0].style[TRANSFORM]="scale("+scale+") translate3d("+136*(1-scale)/2+"px,"+223*(scale-1)/2+"px,0)"

    },500)

    $("#handlerBox").on("touchend",function(e){
        $(this).addClass("in")
                $("#rocketBox").addClass("in")
                document.getElementById("rocket").addEventListener(TRANSITION_END,function(){
                    MYSWIPER.pageLock=false;
                    MYSWIPER.next();
                })
    })

    $("#submitFormBtn").on("click",function(e){
        var $self=$(this);
        if(isSubmited){
            return;
        }
        if(isSubmiting){
            alert("提交中......");
            return;
        }
        //e.preventDefault();
        var $form=$(this).parents("form")
        var inputs=$form.find('input'),result=true,pattern;
        inputs.each(function(index,item){
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
            alert("请检查填写的资料是否正确!")
        }else{
            isSubmiting=true;
            $(this).text("提交中...");
            $.ajax({
                type:"post",
                data: $form.serializeArray(),
                dataType:"json",
                url:uploadUrl,
                success:function(data){
                    isSubmited=true;
                    $self.text("提交成功");
                    $sharePage.removeClass("hidden");
                    //MYSWIPER.unlockSwipeToNext();
                    //MYSWIPER.slideNext();
                    alert(data.message);
                },error:function(){
                    alert("出错了，请重新提交！")
                    $self.text("重新提交");
                } ,complete:function(){
                    isSubmiting=false;
                }
            })
        }
        return result;
    })

    $("#musicPlayBtn").on('click',function(){
        if(musicBtn.is(".off")){
            bgAudio.play();
            bgAudio.isPaused=false;
            musicBtn.removeClass("off")
        }else{
            bgAudio.pause();
            bgAudio.isPaused=true;
            musicBtn.addClass("off")
        }
    })
    $("#videoStartBtn").on("click",function(){
          $("#videoBox").addClass("in")
        $(this).addClass('in')
        video.getPlayer().play();
    })
    $("#videoBox").on("click",function(){
        $(this).addClass('in')

    })
  /*  $(".btn-share").on("click",function(){
        $sharePage.removeClass("hidden")
        MYSWIPER.pageLock=true;
    })*/
    $("#btnReady").on("click",function(){
        $readyPage.removeClass("hidden")
        MYSWIPER.pageLock=true;
    })
    $modalPages.on("click",function(){
        $(this).addClass("hidden")
        MYSWIPER.pageLock=false;
    })
    $("#btnGoForm").on("click",function(){
        var screen=$(".screen6 ");
        if(app.$valueOfLingmu.val()==69800){
            MYSWIPER.unlockSwipeToNext();
            MYSWIPER.slideNext();
        }else{
            app.$valueOfLingmu.prop('placeholder','密码错误').val("");
            screen.addClass("tip")
            setTimeout(function(){
                screen.removeClass("tip")
            },2000)
        }
    })
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


var videoIsRe=false;
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
    var audio=document.createElement("audio");
    audio.preload="preload";
    audio.src=src;
    document.body.appendChild(audio)
    $.ajax({
        url:src,
        success:function(result){
            setTimeout(function(){
                cb.call(null,audio);

            },0)
        }})
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

function fillNumByWord(num,word,len){return (Array(len+1).join(word)).slice(0,len).slice(-len,-(num+'').length)+num}
function MyTimer(cb){
    var myCallbacks=[],self=this;
    var time;
    this.addCb=function(cb){
        myCallbacks.push(cb)
    }
    this.timer=setInterval(function(){
        time=new Date;
        for(var index in myCallbacks){
            myCallbacks[index].call(null,time);
        }
    },1000)
}

function isBgHeightCover(imgWidth,imgHeight){
       if(window.innerHeight/window.innerWidth<1008/640){
           return             0
       }
      return 1;
}

function animateGroup(opts){
    //group,frameClass,duration,gap,startIndex,loopTimes,cb
    var animArr=opts.group,reset,duration=opts.duration+(opts.gap|| 0),curEl=animArr.eq(0),clsIndex= 0,index=opts.startIndex|| 0,reset={isStop:opts.isStop,start:start};
    function run(){
        if(!reset.isStop){
            curEl.addClass(opts.frameClass[clsIndex]||opts.frameClass[0])
        }
    }
    function start(){
        reset.isStop=false;
        init();
    }
    if(!reset.isStop){
        init();
    }
    function init(){
        if(!opts.waitTime){
            go();
        }else{
            setTimeout(function(){
                go();
            },opts.waitTime)
        }
    }
    function go() {
        run();
        reset.interval = setInterval(function () {
            if(reset.isStop){
                return;
            }
            if (opts.classSwitch !== false) {
                curEl.removeClass(opts.frameClass[clsIndex] || opts.frameClass[0]);
            }
            index++;
            clsIndex++;
            if (index > animArr.length - 1) {
                opts.loopTimes--;
                index = 0;
            }
            if(clsIndex>opts.frameClass.length-1){
                clsIndex=0;
            }
            curEl = animArr.eq(index);
            if (opts.loopTimes == null || opts.loopTimes != 0) {
                run();
            }
            if (opts.loopTimes == 0) {
                clearInterval(reset);
                if(opts.noWaitLast){
                    typeof opts.callback == "function" && opts.callback();
                }else{
                    setTimeout(function(){
                        typeof opts.callback == "function" && opts.callback();
                    },duration)
                }

            }
        }, duration );
    }
    return reset;
}
