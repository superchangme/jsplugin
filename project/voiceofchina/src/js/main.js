var app=app||{};
var jssdkURL="../php/main.php?a=wechatsign&url="+encodeURIComponent(window.location.href.split("#")[0]);
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
    title:'好声音10月7日决战鸟巢之巅！四大门派你看好谁？',
    link:location.href.split('#')[0],
    imgUrl:location.href.replace("html/index.html","img/wx_share.jpg"),
    desc:'想拿赏金？一试即知！'
}

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
var IS_IPHONE=window.navigator.userAgent.indexOf('iPhone') > -1||true;
var MYSWIPER;
var TRANSFORM=prefixStyle("transform")
var TRANSITION_END=prefixEvent("transitionEnd");
var carAudio;
var bgAudio;
var isSubmiting=false;
var isSubmited=false;
var scrollTop=0;
var loadedTimes=0;
$.extend(app,{
    ansList:{
        "halin":1,
        "ying":0,
        "feng":0,
         "zhou":2
    },
    $checkList:$(".check-list li"),
    $chooseList: $("[data-choose-item]"),
   init:function(){
          var self=this,selLock;
         return (function(){
                   this.currentScreen=this.screens.startScreen;
                    this.$chooseList.on("click",function(){
                          self.updateScreen(self.getNextScreen(),$(this).data("choose"))
                   })
                    $("[data-screen]").on("click",function(){
                        self.updateScreen(self.screens[$(this).data("screen")])
                    })
                    $("select").on("change",function(){
                        $(this).addClass("in")
                    })
                    $('input[type=radio]').on("change",function(){
                        if(selLock){return}
                        selLock=true;

                        var updateScreen,chooseName=$(this).attr("name"),ansIndex=self.ansList[chooseName],checkList=$(this).parents(".check-list").find("li"),index=checkList.index($(this).parent("li"));
                        if(ansIndex==index){
                            checkList.eq(ansIndex).addClass("right")
                            updateScreen=self.screens.qsRightScreen
                        }else{
                            updateScreen=self.screens.qsWrongScreen
                        }
                        checkList.eq(index).addClass("choose")
                        setTimeout(function(){
                            self.updateScreen(updateScreen,chooseName)

                        },1000)
                        setTimeout(function(){
                            selLock=false;
                        },2000)
                    })
         }).bind(app)()
   },
    screens:{
        startScreen:$("#startScreen"),
        styleScreen:$("#styleScreen"),
        qsScreen:$("#qsScreen"),
        qsWrongScreen:$("#qsWrongScreen"),
        qsRightScreen:$("#qsRightScreen"),
        yueScreen:$("#yueScreen")
    },
    getNextScreen:function(){
        var stop=false;
          for(var screen in app.screens){
              if(stop){
                 return app.screens[screen]
              }
              if(stop==false&&app.screens[screen]==app.currentScreen){
                  stop=true;
              }
          }
    },
    currentScreen:null,
    changeStyle:function(newScreen,choose){
        newScreen.find('[data-choose='+choose+"]").show().addClass("hover").siblings('[data-choose]').removeClass("hover").hide();
    } ,
    updateScreen:function(newScreen,choose){
        if(choose){
            app.changeStyle(newScreen,choose)
        }
        if(newScreen==app.screens.shareScreen){
            window.location.hash="share";
        }
        if(newScreen==app.screens.qsScreen){
           app.$checkList.removeClass().find("input").prop("checked",false)
        }
        if(!app.currentScreen){
            newScreen.addClass("in")
        }else{
            app.currentScreen.addClass("out").removeClass("in current")
            newScreen.removeClass("out").addClass("in")
        }
        app.currentScreen=newScreen.addClass("current")
        if(newScreen!=app.screens.playScreen){
            //app.stopEvent();
        }
    }
});
//加载省市代理商区域下拉
new MyArea(["province","city","agency","area"],null,true); //初始化地区插件   三级第一个为已选择
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

var Tween = {
    Linear: function(t, b, c, d) { return c*t/d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d / 2) == 2) return b+c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
}
Math.tween = Tween;

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
            [
                'img/volume_off.png',
                'img/volume_on.png',
                'img/ans_feng.png',
                'img/ans_lin.png',
                'img/ans_more_feng.png',
                'img/ans_more_lin.png',
                'img/ans_more_ying.png',
                'img/ans_more_zhou.png',
                'img/ans_wrong_feng.png',
                'img/ans_wrong_lin.png',
                'img/ans_wrong_ying.png',
                'img/ans_wrong_zhou.png',
                'img/ans_ying.png',
                'img/ans_zhou.png',
                'img/ask_lin.png',
                'img/big_titile.png',
                'img/btn_back_text.png',
                'img/btn_isu_text.png',
                'img/btn_iwant_text.png',
                'img/btn_more_text.png',
                'img/btn_onlyu_text.png',
                'img/btn_refuse_text.png',
                'img/btn_replay.png',
                'img/btn_selme_text.png',
                'img/btn_sel_feita.png',
                'img/btn_submit_text.png',
                'img/btn_yue_text.png',
                'img/car_logo.png',
                'img/cry.png',
                'img/dialog_bg.png',
                'img/dialog_long_bg.png',
                'img/feng_portrait.png',
                'img/feng_portrait_s.png',
                'img/feng_style.png',
                'img/form_bg.png',
                'img/form_label.png',
                'img/form_title.png',
                'img/halin_s.png',
                'img/ha_portrait.png',
                'img/ha_style.png',
                'img/ico_right.png',
                'img/jielun_s.png',
                'img/jielun_s2.png',
                'img/label_reward.png',
                'img/lin_portrait_s.png',
                'img/modal_bg.png',
                'img/naying_s.png',
                'img/p1_bg.jpg',
                'img/p1_bg.png',
                'img/p1_check.png',
                'img/p1_check_h.png',
                'img/p1_circle1.png',
                'img/p1_circle2.png',
                'img/p1_circle3.png',
                'img/p1_cool_man.png',
                'img/p1_reward1.png',
                'img/p1_reward2.png',
                'img/p1_reward3.png',
                'img/p1_stamp.png',
                'img/p1_stamp2.png',
                'img/p1_t_1.png',
                'img/p1_t_2.png',
                'img/p1_t_3.png',
                'img/p1_t_4.png',
                'img/p2_sel.png',
                'img/p2_sel_h.png',
                'img/person_bg.png',
                'img/pn_bg.jpg',
                'img/pn_bg.png',
                'img/qrcode.png',
                'img/qs_bg.png',
                'img/qs_feng.png',
                'img/qs_lin.png',
                'img/qs_right.png',
                'img/qs_ying.png',
                'img/qs_zhou.png',
                'img/radio_bg.png',
                'img/red_car.png',
                'img/reward_bg.jpg',
                'img/reward_title.png',
                'img/select_bg.png',
                'img/share-arrow.png',
                'img/share.png',
                'img/share_logo.png',
                'img/text_notrust.png',
                'img/text_onemore.png',
                'img/text_trymore.png',
                'img/text_ur_right.png',
                'img/text_ur_right_feng.png',
                'img/text_ur_right_lin.png',
                'img/text_ur_right_ying.png',
                'img/text_ur_right_zhou.png',
                'img/throne.png',
                'img/voice-logo.png',
                'img/volume_off.png',
                'img/volume_on.png',
                'img/wangfeng_s.png',
                'img/ying_portrait.png',
                'img/ying_s2.png',
                'img/ying_style.png',
                'img/zhou_portrait.png',
                'img/zhou_style.png'
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
        if(loadedTimes==2){
            $('.loading').remove();
            $(document.documentElement).addClass("auto")
            $('.screen').eq(0).addClass('active in');
            app.init();
            document.body.scrollTop=0;
        }
    }
    //loadBg music
    loadAudio("../media/bg.mp3",function(audio){
        loadedTimes+=1;
        checkLoaded()
        bgAudio=audio;
        bgAudio.loop="loop"
        bgAudio.volume=0.5
        var image=new Image;
        image.onload=function(){
            bgAudio.play();
            bgAudio.isPaused=false
        }
        image.src='../img/volume_on.png';
    })



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
    //alert(window.innerHeight+'-'+window.innerWidth)
    document.getElementById("eqMobileViewport").setAttribute("content","initial-scale="+k+",maximum-scale="+k+",user-scalable=no")
    //alert(k);
  /*   setTimeout(function(){
         alert(window.innerHeight+'-'+window.innerWidth)
     })*/
}
//init
var lightFrame;
$(function(){
    resetMeta();
var musicBtn=$(".music-btn"),$sharePage=$("#sharePage"),$readyPage=$("#rewardPage");
    $(".btn-go-site").on("click",function(e){
        e.stopImmediatePropagation();
    })
    $("a.btn").on("click",function(e){
        e.preventDefault();
    })
    $(".btn-more-link").on("click",function(){
        $sharePage.removeClass("hidden");
    })
    $sharePage.on("click",function(){
        $sharePage.addClass("hidden");
    })
    $(".reward-u").on("click",function(){
        $readyPage.removeClass("hidden");
    })
    $readyPage.on("click",function(){
        $readyPage.addClass("hidden");
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
            //$(this).text("提交中...");
            $.ajax({
                type:"post",
                data: $form.serializeArray(),
                dataType:"json",
                url:uploadUrl,
                success:function(data){
                    isSubmited=true;
                    //$self.text("提交成功");
                    alert(data.message);
                },error:function(){
                    alert("出错了，请重新提交！")
                    //$self.text("重新提交");
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
    var audio=document.createElement("audio");
    audio.preload="preload";
    audio.src=src;
    document.body.appendChild(audio)
    $.ajax({
        url:src,
        success:function(result) {
            setTimeout(function () {
                cb.call(null, audio);

            }, 0)
        }
    })
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
