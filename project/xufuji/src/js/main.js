var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
if(browser.versions.android){
    $("body").addClass("android")
}
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
var pageSwiper,productsSwiper;
var pagesBtFrame=[];
var bgAudio;
var musicBtn=$(".music-btn")
var $bottomFrame=$("#bottomFrame")
var $logo=$("#logo");
var modalTpl=tmpl("modalItemTpl")
var $modalCnt=$("#modalCnt")
var $pdModal=$("#pdModal");
var $pageSwiper=$("#pageSwiper");
var $coverPage=$("#coverPage");
var $sharePage=$(".sharePage");
var p1AnimGroup;
var $giftList=$(".gift-list  li")
var $slideTip=$(".slide-tip")
var $giftFramesBox=$(".gift-frames-box")
var p1FlashAnim=johnFlashTimeLine({
    animArr:[{
            $item:$(".flame1"),
            frameClass:"zoomIn",
            duration:1200 ,
        noSwitch:true
    }
        ,{
            $item:$(".flames1"),
            frameClass:"zoomIn",
            waitTime:-1000,
            duration:2600
        },
        {
            $item:$(".flame2"),
            frameClass:"zoomIn",
            noSwitch:true,
            waitTime:-1000,
            duration:1200
        }
        ,{
            $item:$(".flames2"),
            frameClass:"zoomIn",
            waitTime:-1000,
            duration:2600
        }
    ] ,
    stoped:true
})
$giftList.each(function(){
    this.$item=$(this)
    this.frameClass="rotate"
    this.duration=3000;
})
var p1GiftAnim=johnFlashTimeLine({
    animArr:$giftList.toArray(),
    stoped:true
})
var $arrowTip=$(".arrow-slideup");
p1AnimGroup=animateGroup({stoped:true,group:$(".gift-list  li"),classSwitch:false,frameClass:["in"],duration:700,loopTimes:1,callback:function(){
    p1GiftAnim.restart();
}})
var zengAnimGroup=animateGroup({stoped:true,group:$(".zeng-frame"),frameClass:["in"],duration:1400,loopGapTime:600,callback:function(){

}})
bangerGroup=animateGroup({stoped:true,group:$(".top-banger  div"),frameClass:["in"],duration:200})
var bangerGroup
$.ajax({url:visitUrl,success:function(){
    console.log("记录访问信息")
}})
init_wx_jsapi(jssdkURL,function(config){
    config.debug=false;
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
$(".btn").on("touchmove click",function(e){
    e.preventDefault();
})
$(".bt-frames").each(function(item){
    var plugin=animateFrame($(this),0,52-1,100,true,true);
    pagesBtFrame.push(plugin);
    plugin.stop();
})
var $giftPage=$(".page31")
var giftFrame=animateFrame($(".gift-frames"),0,10-1,80,null,null,null,null,function(){
    $giftPage.addClass("pd-in");
});
var pdsFrame=animateGroup({stoped:true,group:$(".pd-list .img-box"),frameClass:["pound"],duration:800,loopGapTime:500});

var monkeyFrame=animateFrame($(".monkey .monkey-frame"),0,3-1,400,null,true,null,null,function(){

});
monkeyFrame.stop();
var $giftFrame=$(".gift-frames");
giftFrame.stop();


loadAudio("../media/bg.mp3",function(audio){
    bgAudio=audio;
    bgAudio.loop="loop"
    bgAudio.volume=0.5
    playAudio(audio)
    $("#musicPlayBtn").on('click',function(){
        if(musicBtn.is(".off")){
            bgAudio.play();
            bgAudio.isPaused=false;
            musicBtn.removeClass("off").addClass("on")
        }else{
            bgAudio.pause();
            bgAudio.isPaused=true;
            musicBtn.addClass("off").removeClass("on")
        }
    })
});

$(function(){
    if(!scaleFactor) {
        resetMeta();
    }
})
 function h5Init(){
     $('body').removeClass("hidden")
     loadSwiper();
     $("#modalCloseBtn").on("click",function(){
         $pdModal.removeClass("in")
     })
     $(".btn-share").on("click",function(){
         $sharePage.addClass("in")
     })
     $sharePage.on("click",function(){
         $sharePage.removeClass("in")
     })
 }

function loadSwiper(){
    var pageIndex=0;
    pageSwiper = new Swiper('#pagesContainer', {
        direction: 'vertical',
        observer:true,
        effect: browser.versions.android?"none":'coverflow',
        mousewheelControl: true,
        onSlideChangeStart:function(swiper){
            $pageSwiper.removeClass("up")
            // $tipArrow.show();
            pageIndex=swiper.activeIndex;
            $bottomFrame.removeClass("slideNow")
            if(pageIndex!=4+2){
                setTimeout(function(){
                    if(pageSwiper.snapIndex!=6){
                        $bottomFrame.addClass("slideNow")

                    }
                },2500)
             }
            if(pageIndex==0){
                setTimeout(function(){
                    console.log("111")
                    p1AnimGroup.restart();
                    bangerGroup.restart();
                },3000)
            } else{
                p1AnimGroup.stop();
                p1GiftAnim.stop();
                bangerGroup.stop();
            }
            if(pageIndex==1+2||pageIndex==2+2||pageIndex==3+2){
                $logo.hide();
            }else{
                $logo.show();
                $giftList.removeClass("in")
            }
            console.log(pageIndex)
            $giftPage.removeClass("pd-in")

        },
        onSliderMove:function(){
        }
        ,
        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);


            setTimeout(function(){
               //pagesBtFrame[0].start();
               setTimeout(function(){
                   $("#logo").addClass("animated flipInX")
               },500)
              setTimeout(function(){
                  p1AnimGroup.restart();
                  bangerGroup.restart();
                  p1FlashAnim.start();
                  setTimeout(function(){
                      $bottomFrame.addClass("slideNow")
                  },1000)
              },2600)
           },500)
        },
        onSlideChangeEnd: function (swiper) {
            $pageSwiper.removeClass("up")
            if(pageIndex==1||pageIndex==2){
                $pageSwiper.addClass("up")
                $coverPage.removeClass("hidden")
            }else{
                $coverPage.addClass("hidden")
            }
            if(pageIndex==6){
                $pageSwiper.addClass("up")
            }
            swiperAnimate(swiper);
            if(pageIndex==1){
                $giftFramesBox.show();
                setTimeout(function(){
                    $giftPage.addClass("gift-in")
                },300)
                setTimeout(function(){
                    giftFrame.restart();
                    setTimeout(function(){
                        $giftFramesBox.hide();
                    },4500)
                },1200)
            }else{
                $giftPage.removeClass("gift-in")
                $giftFramesBox.hide();
                giftFrame.reset();
            }
            if(pageIndex==5){
                setTimeout(function(){
                    pdsFrame.restart();
                },3000)
            } else{
                pdsFrame.stop();
            }
            if(pageIndex==4){
                setTimeout(function(){
                    zengAnimGroup.restart();
                },3000)
            }else{
                zengAnimGroup.stop();
            }
        },
        onTransitionEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        onReachEnd:function(){
            setTimeout(function(){
                // $tipArrow.hide();
            },30)
        }
    });
    productsSwiper= new Swiper('#productsContainer', {
        direction: 'horizontal',
        pagination: '.swiper-pagination',
        observer:true,
        mousewheelControl: true,
        onSlideChangeStart:function(){
            /// $tipArrow.show();
        },
        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        onTransitionEnd: function (swiper) {
        },
        onReachEnd:function(){
            setTimeout(function(){
                //   $tipArrow.hide();
            },30)
        }
    });
}



function resetMeta(){
    var g=window.innerWidth,h=window.innerHeight,k;
    (g/h)>=320/504?k=h/1008:k=g/640;
    //alert(window.innerHeight+'-'+window.innerWidth)
    document.getElementById("eqMobileViewport").setAttribute("content","initial-scale="+k+",maximum-scale="+k+",user-scalable=no")
    localStorage.setItem("pageScale",k);
    //alert(k);
    /*   setTimeout(function(){
     alert(window.innerHeight+'-'+window.innerWidth)
     })*/
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
        this.restart=function(){
            reset();
            run();
        }
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
        $list.filter(function (index) {
            return index > 0
        }).removeClass("show")
        $list.eq(0).addClass("show");
        plugin.start();
        clearTimeout(plugin.timeout);
    }

    var run=function () {
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
                    if (isLoopBoo && loopTimes == 0||(!isLoopBoo)) {
                        plugin.stop();
                        if (typeof callBackFun == "function") {
                            callBackFun();
                        }
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
    };
    run();
    return plugin;
}

function loadAudio(src,cb){
    var audio=document.createElement("audio");
    audio.preload="preload";
    audio.autoplay="true"
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
function animateGroup(opts){
    //group,frameClass,duration,gap,startIndex,loopTimes,cb
    var animArr=opts.group,_opts= $.extend({},opts),duration=opts.duration+(opts.gap|| 0),curEl,clsIndex,index,reset={isStop:opts.stoped,start:start};
    function initFirst(){
        if(!reset.isStop){
            curEl.addClass(opts.frameClass[clsIndex]||opts.frameClass[0])
        }
    }
    function start(){
        reset.isStop=false;
        init();
    }
    reset.stop=function(){
        clearInterval(reset.interval);
        reset.isStop=true;
        animArr.each(function(index){
            $(this).removeClass(opts.frameClass[index]||opts.frameClass[0])
        })
    }
    if(!reset.isStop){
        init();
    }
    reset.restart=function(){
        opts= $.extend({},_opts);
        start();
    }
    function init(){
        curEl=animArr.eq(0);clsIndex= 0;index=opts.startIndex|| 0;
        if(!opts.waitTime){
            go();
        }else{
            setTimeout(function(){
                go();
            },opts.waitTime)
        }
    }
    function go() {
        initFirst();
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
                clearInterval(reset.interval);
                if(index==0&&opts.loopGapTime){
                    setTimeout(function(){
                        go();
                    },opts.loopGapTime);
                }else{
                    go();
                }
            }
            if (opts.loopTimes == 0) {
                clearInterval(reset.interval);
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
function playAudio(audio){
    var image=new Image;
    image.onload=function(){
        audio.play();
        audio.isPaused=false
    }
    image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=';
}


// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed



function openModal(index){
    products[index].imgSrc="../img/p3_item"+(index+1)+".png";
    products[index].serial=index+1;
    var html=modalTpl({item:products[index]});

    $modalCnt.html(html)
    setTimeout(function(){
        $pdModal.addClass("in");
    },120)
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


function johnFlashTimeLine(options){
    var animArr=options.animArr,animTime= 0,reset,plugin={},interval,timeLineArr=[],curItemIndex= 0,frameLen=animArr.length,startTime,lastTime;
     if(options.stoped){
         plugin.stoped=true;
     }
    function init(){
        plugin.interval=setInterval(function () {
            startTime=+new Date
            for(var i=0;i<animArr.length;i++){
                    animArr[i].isPlaying=false;
            }
        },animTime)
        startTime=+new Date
        timeCheck();
    }
    function timeCheck(){
        requestAnimFrame(function(){
            if(!plugin.stoped){
                lastTime=+new Date-startTime;
                for(var i=0;i<animArr.length;i++){
                    if(!animArr[i].isPlaying&&timeLineArr[i].start<=lastTime){
                        animArr[i].$item.addClass(animArr[i].frameClass);
                        animArr[i].isPlaying=true;
                        //console.log(timeLineArr[i].start,lastTime)
                    }else if(timeLineArr[i].end<=lastTime&&animArr[i].noSwitch!==true) {
                        animArr[i].$item.removeClass(animArr[i].frameClass);
                    }
                }
                timeCheck();
            }
        })
    }
    for(var i=0;i<animArr.length;i++){
        var time={start:null,end:null};
        time.start=animTime+(animArr[i].waitTime||0);
        animTime+=animArr[i].duration+(animArr[i].waitTime||0);
        time.end=animTime;
        timeLineArr.push(time);
    }
    animTime+=options.waitTime||60;
    plugin.stop=function(){
        this.stoped=true;
    }
    plugin.start=function(){
        this.stoped=false;
        if(plugin.interval){
            startTime=+new Date
            timeCheck();
        }else{
            init();
        }
    }
    plugin.restart=function(){
        plugin.stoped=false;
         window.clearInterval(this.interval);
        for(var i=0;i<animArr.length;i++){
            animArr[i].$item.removeClass(animArr[i].frameClass)
        }
        init();
    }
    if(!plugin.stoped){
        init();
    }
    return plugin
}

/*
 * ax2+bx+c
 * @param p x轴偏移
 *
 * */
function parabolaFn(a,b,c,x,p){
    return a*Math.pow(x+b/(2*a)-p,2)+c-b*b/(4*a);
}



/* Define the number of leaves to be used in the animation */
const NUMBER_OF_LEAVES = 100;

/*
 Called when the "Falling Leaves" page is completely loaded.
 */
function init()
{
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById('leafContainer');
    /* Fill the empty container with new leaves */
    for (var i = 0; i < NUMBER_OF_LEAVES; i++)
    {
        container.appendChild(createALeaf());
    }
}


/*
 Receives the lowest and highest values of a range and
 returns a random integer that falls within that range.
 */
function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}


/*
 Receives the lowest and highest values of a range and
 returns a random float that falls within that range.
 */
function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}


/*
 Receives a number and returns its CSS pixel value.
 */
function pixelValue(value)
{
    return value + 'px';
}


/*
 Returns a duration value for the falling animation.
 */

function durationValue(value)
{
    return value + 's';
}


/*
 Uses an img element to create each leaf. "Leaves.css" implements two spin
 animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
 function determines which of these spin animations should be applied to each leaf.

 */
function createALeaf()
{
    /* Start by creating a wrapper div, and an empty img element */
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');

    /* Randomly choose a leaf image and assign it to the newly created element */
    image.src = '../img/leafs/realLeaf' + randomInteger(1, 10) + '.png';

    leafDiv.style.top = "-100px";

    /* Position the leaf at a random location along the screen */
    leafDiv.style.left = pixelValue(randomInteger(0, window.innerWidth));

    /* Randomly choose a spin animation */
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    var AnimationName=prefixStyle("animationName")
    var  AnimationDuration=prefixStyle("animationDuration")
    var AnimationDelay=prefixStyle("animationDelay")
    /* Set the -webkit-animation-name property with these values */
    leafDiv.style[AnimationName] = 'fade, drop';
    image.style[AnimationName] = spinAnimationName;

    /* Figure out a random duration for the fade and drop animations */
    var fadeAndDropDuration = durationValue(randomFloat(2, 9));

    /* Figure out another random duration for the spin animation */
    var spinDuration = durationValue(randomFloat(1, 4));
    /* Set the -webkit-animation-duration property with these values */
    leafDiv.style[AnimationDuration] = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var leafDelay = durationValue(randomFloat(0, 3));
    leafDiv.style[AnimationDelay] = leafDelay + ', ' + leafDelay;

    image.style[AnimationDuration] = spinDuration;

    // add the <img> to the <div>
    leafDiv.appendChild(image);

    /* Return this img element so it can be added to the document */
    return leafDiv;
}


/* Calls the init function when the "Falling Leaves" page is full loaded */
//window.addEventListener('load', init, false);
init();
function prefixStyle(style){
    var el = document.createElement('div')
    var vendors = 'webkitT,t,,MozT,msT,OT'.split(','),prefix;
    var first=style.slice(0,1);
    style=style.slice(1);
    for(var i in vendors){
        if( vendors[i].slice(-1).charCodeAt()>=97){
            vendors[i]=vendors[i].replace(/\w$/,first)
        }else{
            vendors[i]=vendors[i].replace(/\w$/,first.toUpperCase())
        }
    }
    for ( prefix in vendors) {
        if(el.style[vendors[prefix]+style]!=undefined){
            return vendors[prefix]+style
        }
    }
}

function animateFrame2(opts) {
    var  el=opts.$frames, firstFrame=opts. firstFrame, lastFrame=opts. lastFrame, frameGapTime=opts. frameGapTime, isGoToFirstBoo=opts. isGoToFirstBoo, isLoopBoo=opts. isLoopBoo, loopTimes=opts. loopTimes, loopGapTime=opts. loopGapTime, callBackFun=opts. callBackFun, stepFuc=opts. stepFuc, waitFrame=opts. waitFrame,
        waitTime=opts. waitTime;
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
        this.restart=function(){
            reset();
            run();
        }
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
        $list.filter(function (index) {
            return index > 0
        }).removeClass("show")
        $list.eq(0).addClass("show");
        plugin.start();
        clearTimeout(plugin.timeout);
    }

    var run=function () {
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
                    if (isLoopBoo && loopTimes == 0||(!isLoopBoo)) {
                        plugin.stop();
                        if (typeof callBackFun == "function") {
                            callBackFun();
                        }
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
    };
    run();
    return plugin;
}
