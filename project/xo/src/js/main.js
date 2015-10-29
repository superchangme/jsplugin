document.addEventListener("touchmove",function(e){
    e.preventDefault();
},false)
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
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
;(function(){
    var cache = {};

    this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
})();
 app=app||{};
 YAO.checkSupport(function(isSupport){
     if(isSupport){
         Game.supportYao=true;
         $("[data-support-yao=true]").show();
         $("[data-support-yao=false]").hide();
     }else{
         Game.supportYao=false;
         $("[data-support-yao=true]").hide();
         $("[data-support-yao=false]").show();
         // debug.log("你的设备关闭了重力感应或者不支持")
     }
 })
$.extend(Game,{
    currentGame:null,
    waitTime:1000,
    $bambooList:$(".bamboo-list li"),
	$highScoreTips:$("[data-high]"),
	$lowScoreTips:$("[data-low]"),
	$myScore:$("#myScore"),
	$myRank:$("#myRank"),
    $myOneScore:$("#myOneScore"),
    $soundPage:$("#soundPage"),
    $playPage:$("#playPage"),
    $rulerPage:$("#rulerPage"),
    $scorePage:$("#scorePage"),
    $rankPage:$("#rankPage"),
	$sharePage:$("#sharePage"),
    init:function(){
        if(isDebug){
            Game.waitTime=0;
        }

        $(document).delegate(".ans-words-list li","click",function(){
            if(Game.isOver){
                return;
            }
            var word=$(this).text(),role=Game.gameBox.role;
            for(var i= 0,l=role.$rstList.length;i<l;i++){
                var mword=role.$rstList.eq(i);
                if(!mword.data("word")){
                    $(this).addClass("fade")
                    mword.text(word).data("word",word).data("wordIndex",$(this).index())
                    role.myRst[i]=word
                    Game.checkRoleAns();
                    break;
                }
            }
        })
        $(document).delegate(".rst-list li","click",function() {
            if(Game.isOver){
                return;
            }
            if($(this).data("word")){
                var index=$(this).data("wordIndex");
                $(this).data("word","").text('');
                Game.gameBox.role.myRst[$(this).index()]=""
                app.$ansWordsList.find("li").eq(index).removeClass("fade")
            }
        });
        $("#nextRoleBtn").on("click",Game.nextRole)
        $("#beginRecord").on("touchstart",Game.playCandle)
        $("#beginClickCandle").on("click",function(){
            Game.addCandleCount();
            Game.candleCountCb();
        })
        $("#beginRecord").on("touchend",Game.stopGame.bind(Game,"candle"))
        Game.gameBox.candle.candleList=[];
        app.$candleList.each(function(index){
            Game.gameBox.candle.candleList[index]=({isPutOut:false,index:index})
        })
        Game.gameBox.candle.counts=0;
        $("#rulerPage .btn-go").on("click",Game.play)
        $(".btn-see-rank").on("click",function(){
			Game.$myScore.html(Game.$myScore.data("loading"))
			Game.$myRank.html(Game.$myRank.data("loading"))
			app.$rankList.html(app.$rankList.data("loading"))
            Game.updatePage(Game.$rankPage)
            $.ajax({
                url:rankListUrl,
                dataType:"json",
                success:function(data){
                    var mydata;
                   if(data.result==1){
                       mydata=data.list.splice(-1,1)[0];
					   Game.$myScore.text(mydata.total)
					   Game.$myRank.text(mydata.rank)
                       app.$rankList.html(app.tpl.ranklistTpl({list:data.list}))
                   }else{
                       alert(data.msg)
                   }
                },error:function(){
                    alert("获取排行榜失败")
					app.$rankList.html('<h2>获取数据失败!</h2>')
                }
            })
        })
        $(".btn-play-next").on("click",function(){
            if(Game.currentGameNames.length==1){
                app.updateScreen(app.screens.chooseScreen)
            }else
            {
                for(var i=0;i<Game.currentGameNames.length;i++){
                    if(Game.currentGame.type==Game.currentGameNames[i]){
                        Game.currentGameNames.splice(i,1)
                    }
                }
                var index=Math.floor(Math.random()*Game.currentGameNames.length)
                Game.start(Game.currentGameNames[index])
            }
        })
        $(".btn-replay").on("click",Game.play)
		$(".btn-see-more-rank").on("click",function(){
			app.scroll.rankScroll.refresh();
		})
		$(".btn-go-share").on("click",function(){
			Game.$sharePage.show();
			  shareInfo.title=Game.currentGame.shareTitle.replace("xx",Game.currentGame.newScore)
			  console.log(shareInfo.title);
			shareToWx(shareInfo.title,shareInfo.link,shareInfo.imgUrl,shareInfo.desc,function(){
				 $.ajax({
					url:collectShareUrl ,
					complete:function(){

					}
				})
			})
		})
		Game.$sharePage.on("click",function(){
			$(this).hide();
		})
		$(".btn-voice").on("click",function(){
			Game.currentGame.voice.one("play",function(){
               Game.updatePage(Game.$rulerPage)
			   setTimeout(function(){
				   bgAudio.play();
			   },200)
           })[0].play()
		})
    },
    playCandle:function(){
        Game.allowRecord();
        //Game.countGame(Game.candleCountCb.bind(null,true))
    },
    openLoad:function(dfer){
        app.screens.waitScreen.removeClass("hidden")
        setTimeout(function(){
            animateGroup({frameClass:["in"],loopTimes:1,noWaitLast:true,group:app.screens.waitScreen.find(".num"),duration:Game.waitTime,callback:function(){
                app.screens.waitScreen.addClass("hidden");
                dfer.resolve();
            }});
        },0)
    },
    allowRecord:function(cb){
        if(Game.isOver||Game.recordAgree!==undefined){
            return;
        }
		wx.startRecord({
			success:function(){
                Game.countGame(Game.candleCountCb.bind(null,true))
				 Game.gameBox.candle.playType="record"
				 $("[data-support-record=true]").show();
				 $("[data-support-record=false]").hide();
				 Game.recordAgree=true;
			}
			,
		  cancel: function () {
			//alert('用户拒绝授权录音');
			   if(Game.supportYao){
                    Game.gameBox.candle.playType="shake"
                }else{
                    Game.gameBox.candle.playType="click"

                }
                Game.countGame()
                $("[data-support-record=true]").hide();
                $("[data-support-record=false]").show();
                YAO.stop();
                YAO.start(function(){
                    Game.addCandleCount();
                    Game.candleCountCb();
                })
		  }
		});
		/*
        if (navigator.getUserMedia) {
            //do something
            navigator.getUserMedia({
                audio: true
            }, onSuccess,function(){
                if(Game.supportYao){
                    Game.gameBox.candle.playType="shake"
                }else{
                    Game.gameBox.candle.playType="click"

                }
                Game.countGame()
                $("[data-support-record=true]").hide();
                $("[data-support-record=false]").show();
                YAO.stop();
                YAO.start(function(){
                    Game.addCandleCount();
                    Game.candleCountCb();
                })
            });
        } else {
            if(Game.supportYao){
                Game.gameBox.candle.playType="shake"
            }else{
                Game.gameBox.candle.playType="click"
            }
            Game.countGame()
            $("[data-support-record=true]").hide();
            $("[data-support-record=false]").show();
            YAO.stop();
            YAO.start(function(){
                Game.addCandleCount();
                Game.candleCountCb();
            })
            console.log('your browser not support getUserMedia');
        }*/
    },
    start:function(type){
		var curTypeDoms=app.screens.gameScreen.find("[data-game="+type+"]")
        app.screens.gameScreen.attr("data-game",type)
        curTypeDoms.removeClass("hidden").siblings("[data-game]").addClass("hidden in");
		setTimeout(function(){
			curTypeDoms.addClass("in")
		},150)
        app.updateScreen(app.screens.gameScreen);
        Game.updatePage(Game.$soundPage)
		setTimeout(function(){
			bgAudio.pause();
		},1000)
		Game.currentGame=Game.gameBox[type];
    },
    play:function(){
		Game.currentGame.newScore=0;
        var dfer= $.Deferred(),countCb=function(){},type=Game.currentGame.type;
        Game.openLoad(dfer)
        dfer.done(function(){
            Game.updatePage(Game.$playPage)
            Game.isOver=false;
            switch(type){
                case "panda":
                    YAO.start(function(){
                        Game.pandaShake();
                    })
                    break;
                case "role":
                    Game.startRole(0);
                    break;
                case "candle":
                  //
                  setTimeout(function(){
                      Game.allowRecord();
                  },100);
                    break;
                case "tree":
                    Game.currentGame.LTreeIndexInit();
            }
            if(type!='candle'){
                Game.countGame(countCb);
            }
        })
    },
    candleCountCb:function(){
        var candle=Game.gameBox.candle;
        if(candle.candleList.length==0){
            Game.stopGame("candle");
            return;
        }
        if((!candle.lastCounts&&candle.counts>getRandom(candle.gapMin,candle.gapMax))||candle.counts-candle.lastCounts>getRandom(candle.gapMin,candle.gapMax)){
            Game.putOutOneCandle();
            candle.lastCounts=candle.counts;
        }
    },
    addCandleCount:function(isRandom){
        if(!isRandom){
            Game.gameBox.candle.counts++;
        }else{
            Game.gameBox.candle.counts+=Math.random()*(16/1000)*10
        }
    },
    putOutOneCandle:function(){
      var candle=this.gameBox.candle,index=Math.floor(Math.random()*candle.candleList.length);
        candleOne=candle.candleList[index]
        candle.candleList.splice(index,1);
        Game.currentGame.newScore+=100;
        Game.updateScore(true,100)
        app.$candleList.eq(candleOne.index).addClass("put-out")
    },
    startRole:function(roleNo){
        var role=Game.gameBox.role;
        role.roleNo=roleNo;
        role.rst=role.roleList[roleNo].rst;
        role.myRst=new Array(role.rst.length);
        role.ansWords=role.roleList[roleNo].ansWords.split("");
        var rstList="",ansList="";
        for(var i= 0,l=role.rst.length;i<l;i++){
            rstList+="<li></li>"
        }
        for(var i= 0,l=role.ansWords.length;i<l;i++){
            ansList+="<li>"+role.ansWords[i]+"</li>"
        }
        app.$rstList.html(rstList);
        app.$ansWordsList.html(ansList);
        app.$rolePhotoList.eq(role.roleNo).addClass("show").siblings().removeClass("show")
        role.$rstList=app.$rstList.find("li")
        this.drawRoleBg();
    },
    checkRoleAns:function(){
        var role=Game.gameBox.role
        if(role.rst==role.myRst.join("")){
        //next question
            if(role.roleNo==role.roleList.length-1){
                //all answered
            }else{
                Game.currentGame.newScore+=100;
                this.updateScore(true,100)
                app.$ansWordsList.empty();
                app.$nextRoleBox.show();
            }
        }else if(role.rst.length==role.myRst.join("").length){
            //wrong tip
            app.$rstList.animate("shake",600)
            //animateGroup({group:app.$rstList,frameClass:["shake",""],loopTimes:1,duration:1400})
        }
    },
    nextRole:function(){
        app.$nextRoleBox.hide();
        animateGroup({group:app.$roleAnsBox,frameClass:["next"],noWaitLast:true,duration:300,loopTimes:1,callback:function(){
            Game.startRole(++Game.gameBox.role.roleNo)
        }});
    },
    drawRoleBg:function(){
      var width=app.$rstList.width();
        var ctx=app.$ansBgCanvas[0].getContext("2d");
        ctx.strokeStyle="#cd273d";
        ctx.lineWidth=2;
        ctx.roundRect(0,0,592,240,6,false,true);
        ctx.clearRect((app.$ansBgCanvas[0].width-width)/2,0,width,4);
    },
    updatePage:function(page){
        if(!Game.currentPage){
            Game.currentPage=page;
            Game.currentPage.show();
        }else{
            Game.currentPage.hide();
            Game.currentPage=page.show();
        }
    },
    countGame:function(countCb){
        var start=+new Date;
        Game.Timer.start=start;
        function run(){
            if(Game.isOver){
                return;
            }
            var now=+new Date;
            var milliseconds=(now-start);
            Game.Timer.now=now;
            if(milliseconds<Game.lastSecnds*1000){
                if(countCb){
                    if(Game.currentGame==Game.gameBox.candle){
                        Game.addCandleCount(true);
                    }
                    countCb();
                }
                requestAnimFrame(run)
            }else{
                Game.stopGame();
            }
            Game.displayTime="00:"+pad(Math.max(0,(Game.lastSecnds-Math.ceil((milliseconds)/1000))),2)+":"+(milliseconds+"").slice(-3);
            Game.updateTime();
        }
        run();
    },
    stopGame:function(){
        Game.$myOneScore.text(Game.currentGame.newScore)
		if(Game.currentGame.newScore>=Game.currentGame.scoreDivide){
			Game.$lowScoreTips.hide();
			Game.$highScoreTips.show();
		}else{
			Game.$highScoreTips.hide();
			Game.$lowScoreTips.show();
		}
        switch(Game.currentGame.type){
            case "candle":
				wx.stopRecord();
                Game.gameBox.candle.counts=0;
                Game.gameBox.candle.lastCounts=0;
                app.$candleList.each(function(index){
                    Game.gameBox.candle.candleList[index]=({isPutOut:false,index:index})
                });
                setTimeout(function(){
                    app.$candleList.removeClass("put-out");
                },100);
                break;
            case "tree":
                Game.currentGame.LGameOver();
        }
        Game.isOver=true;
        Game.recordAgree=undefined;
		Game.$playPage.addClass("gameOver")
		setTimeout(function(){
			Game.updatePage(Game.$scorePage);
		},1000)
		//更新分数
        $.ajax({
            url:updateScoreUrl+"?"+Game.currentGame.gameName+"="+Game.currentGame.newScore
        })
        setTimeout(function(){
            Game.resetGamesNewScore();
			Game.$playPage.removeClass("gameOver")
        },1200)
    },
    updateTime:function(){
        app.$remainTime.text(Game.displayTime)
    },
    updateScore:function(isUp,score){
        var dir=(isUp?"up":"down");
        var op=(isUp?"+":"-");
        app.$gameScore.html(Game.currentGame.newScore)
        animateGroup({group:app.$scoreTip.html(op+score),duration:1000,loopTimes:1,frameClass:[dir,""]});
    },
    showScorePage:function(){

    },
    //摇一摇随机得分
    pandaShake:function(){
        if(Game.isOver==true||Game.shakeLock){
            return;
        }
        Game.shakeLock=true;
        var item;
            var isUp=true,list;
            if(Math.random()<Game.gameBox.panda.goodRatio){
                list=app.$pandaFoodList.filter("[data-good]");
                item=list.eq(Math.floor(Math.random()*list.length))
                Game.currentGame.newScore+=100;
            }else{
                isUp=false;
                list=app.$pandaFoodList.filter("[data-harm]");
                item=list.eq(Math.floor(Math.random()*list.length))
                Game.currentGame.newScore=Game.currentGame.newScore-50;
            }
            item.addClass("show");
        setTimeout(function() {
            Game.updateScore(isUp, isUp ? 100 : 50);
        },1000);
        animateGroup({
            group:app.$pandaTop,frameClass:["open",""],loopTimes:1,duration:1000,callback:function(){
            Game.shakeLock=false;
            item.removeClass("show")
            }
        })
    },
    resetGamesNewScore:function(){
          for(var game in Game.gameBox){
              game.newScore=0;
              game.currentTime=0;
          }
        app.$gameScore.text(0)
        app.$remainTime.text("00:"+Game.lastSecnds+":000");
        Game.$bambooList.data("step",0);
    }
});

function shareToWx(title, link, imgUrl, desc, cb) {
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            cb();
            // 用户确认分享后执行的回调函数fcapp
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
init_wx_jsapi(jssdkURL,function(config){
    config.debug=isDebug;
    wx.config(config);
    wx.ready(function(){
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
    $rankList:$("#rankList"),
    $pandaFoodList:$("#pandaFoodList li"),
    $candleList:$(".o-candle"),
    $nextRoleBox:$("#nextRoleBox"),
    $rolePhotoList:$("#rolePhotoList li"),
    $roleAnsBox:$("#roleAnsBox"),
    $ansWordsList:$("#ansWordsList"),
    $rstList:$("#rstList"),
    $ansBgCanvas:$("#ansBgCanvas"),
    $scoreTip:$("#scoreTip i"),
    $pandaTop:$("#pandaTop"),
    $gameScore:$("#gameScore"),
    $remainTime:$("#remainTime"),
    $checkList:$(".check-list li"),
    $chooseList: $("[data-choose-item]"),
   init:function(){
          var self=this,selLock;
         return (function(){
             $(".screen").each(function(index){
               $(this).data("index",index);
        })
                $("[data-screen]").on("click",function(){
                    console.log(self.screens[$(this).data("screen")])
                    self.updateScreen(self.screens[$(this).data("screen")])
                })

                 app.scroll.rankScroll=new IScroll('#rankScroller', {
                     //click:iScrollClick(),
                     preventDefault:false,
                     preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT|A)/},
                     scrollbars: true,
                     mouseWheel:true,
                     shrinkScrollbars: 'scale',
                     fadeScrollbars: false
                });
			 $(".btn-game-pause").on("click",function(){
				 if(bgAudio.paused){
					 bgAudio.play();
				 }else{
					 bgAudio.play();
				 }
				 $(this).toggleClass("stoped")
				 bgAudio.paused=!bgAudio.paused;
			 })
             app.updateScreen(app.screens.startScreen);
             $(document).on("swipeUp",function(){
                 if(app.currentScreen==app.screens.startScreen){
                     app.updateScreen(app.screens.chooseScreen);
                 }
             })
         }).bind(app)()
   },
    scroll:{
       rankScroll:null
    },
    tpl:{
        ranklistTpl:tmpl("ranklistTpl")
    },
    screens:{
        startScreen:$("#startScreen"),
        waitScreen:$("#waitScreen"),
        gameScreen:$("#gameScreen"),
        chooseScreen:$("#chooseScreen")
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
        var isStart=false;
        if(app.pageLock){app.pageLock=true;return}
        if(choose){
            app.changeStyle(newScreen,choose)
        }
        if(newScreen==app.screens.shareScreen){
            window.location.hash="share";
        }
        if(newScreen==app.screens.qsScreen){
           app.$checkList.removeClass().find("input").prop("checked",false)
        }
        if(app.currentScreen){
            app.currentScreen.removeClass("down up in current")
            newScreen.removeClass("out")
            console.log(app.currentScreen.data("index"),newScreen.data("index"))
            if(app.currentScreen.data("index")<newScreen.data("index")){
                newScreen.addClass(" down")
                app.currentScreen.addClass("out up")
            }else{
                newScreen.addClass(" up")
                app.currentScreen.addClass("out down")
            }
        }
        setTimeout(function(){
            newScreen.addClass("in")
        },0)
        setTimeout(function(){
            //newScreen.removeClass("up down");
            app.pageLock=false;
            app.currentScreen=newScreen.addClass("current in")
        },750)
        if(newScreen==app.screens.startScreen){
            setTimeout(function(){
                YAO.start(function(){
                    if(!isStart){
                           app.updateScreen(app.screens.chooseScreen);
                        isStart=false;
                    }else{
                        YAO.stop();
                    }
                })
            },1000)
            //app.stopEvent();
        }
    }
});
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
              'img/1.png',
  'img/btn_rescan.png',
  'img/btn_volume.png',
  'img/candle.png',
  'img/candle_bg.jpg',
  'img/candle_fire.png',
  'img/candle_flame_sprite.png',
  'img/candle_sprite.png',
  'img/chlist_portrait_candle.png',
  'img/chlist_portrait_panda.png',
  'img/chlist_portrait_role.png',
  'img/chlist_portrait_tree.png',
  'img/chlist_text_candle.png',
  'img/chlist_text_panda.png',
  'img/chlist_text_role.png',
  'img/chlist_text_tree.png',
  'img/choose_bg.jpg',
  'img/choose_circle.png',
  'img/choose_list.png',
  'img/choose_title.png',
  'img/game_bar.png',
  'img/game_bg.png',
  'img/headimg.png',
  'img/ico_bamboo.png',
  'img/ico_good_1.png',
  'img/ico_good_2.png',
  'img/ico_good_3.png',
  'img/ico_harm_1.png',
  'img/ico_harm_2.png',
  'img/ico_hat.png',
  'img/ico_micro.png',
  'img/ico_num1.png',
  'img/ico_num2.png',
  'img/ico_num3.png',
  'img/ico_panda.png',
  'img/ico_spread_voice.png',
  'img/ico_tree.png',
  'img/LBtn.png',
  'img/LEarthBg.png',
  'img/LEF1.png',
  'img/LEF2.png',
  'img/LEF3.png',
  'img/list_2bt_bg.png',
  'img/list_3bt_bg.png',
  'img/list_bt1_bg.png',
  'img/list_title_cong.png',
  'img/list_title_friendscore.png',
  'img/list_title_rank.png',
  'img/list_title_rule.png',
  'img/LLine.png',
  'img/loading_five.png',
  'img/load_bg.jpg',
  'img/LTreeSp.png',
  'img/nfc1_text.png',
  'img/nfc2_intro.png',
  'img/nfc2_title.png',
  'img/nfc_bg.jpg',
  'img/panda.png',
  'img/panda_bg.png',
  'img/panda_bottom.png',
  'img/photo_line.png',
  'img/portrait_blue.png',
  'img/portrait_green.png',
  'img/portrait_orange.png',
  'img/portrait_purple.png',
  'img/qr_code.png',
  'img/qr_intro.png',
  'img/role_photo_1.png',
  'img/role_photo_10.png',
  'img/role_photo_2.png',
  'img/role_photo_3.png',
  'img/role_photo_4.png',
  'img/role_photo_5.png',
  'img/role_photo_6.png',
  'img/role_photo_7.png',
  'img/role_photo_8.png',
  'img/role_photo_9.png',
  'img/ruler_candle.png',
  'img/ruler_panda.png',
  'img/ruler_role.png',
  'img/ruler_tree.png',
  'img/shake_hand.png',
  'img/shake_line.png',
  'img/share_arrow.png',
  'img/start_logo.png',
  'img/start_ming.png',
  'img/start_shake_bg.png',
  'img/start_shake_hand.png',
  'img/start_text.png',
  'img/sun_bg.jpg',
  'img/text_go.png',
  'img/text_ur_right.png',
  'img/Thumbs.db',
  'img/wait_circle.png',
  'img/welcome_xo.png'
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
        if(loadedTimes==5){
            //$('.loading').remove();
            $(document.documentElement).addClass("auto")
            $('.screen').eq(0).addClass('active in');
            app.init();
            Game.init();
            indexInit();
            document.body.scrollTop=0;
            $("img[lazyload]").each(function(){
                $(this).prop("src",$(this).data("src"));
            })
        }
    }
    for(var game in Game.gameBox){
        (function(game){
            loadAudio(Game.gameBox[game].media+"?"+Math.random(),function(audio){
                Game.gameBox[game].voice=$(audio)
                loadedTimes+=1;
                checkLoaded()
            })
        })(game)
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
        image.src='../img/btn_volume.png';
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
    setTimeout(function(){
             document.body.classList.add("reset")
    },100)
}
//init
var lightFrame;
$(function(){
    resetMeta();
var musicBtn=$(".music-btn"),$sharePage=$("#sharePage"),$readyPage=$("#rewardPage");
 $(".choose-list a").on("click",function(){
     var gameType=$(this).data("game");
     Game.start(gameType)
     Game.currentGameNames=Game.gameNames.slice();
 })
    $("#pandaYaoBtn").on("click",Game.pandaShake)
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

 function animateGroup(opts){

     //group,frameClass,duration,gap,startIndex,loopTimes,cb
     var animArr=opts.group,reset,duration=opts.duration+(opts.gap|| 0),curEl=animArr.eq(0),index=opts.startIndex||0;
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
             if (index > animArr.length - 1) {
                 opts.loopTimes--;
                 index = 0;
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
 function pad(num, n) {
     return Array(n>num?(n-(''+num).length+1):0).join(0)+num;
 }
 CanvasRenderingContext2D.prototype.roundRect =function(x, y, width, height, radius, fill, stroke) {
     if (typeof stroke == "undefined") {
         stroke = true;
     }
     if (typeof radius === "undefined") {
         radius = 5;
     }
     this.beginPath();
     this.moveTo(x + radius, y);
     this.lineTo(x + width - radius, y);
     this.quadraticCurveTo(x + width, y, x + width, y + radius);
     this.lineTo(x + width, y + height - radius);
     this.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height);
     this.lineTo(x + radius, y + height);
     this.quadraticCurveTo(x, y + height, x, y + height - radius);
     this.lineTo(x, y + radius);
     this.quadraticCurveTo(x, y, x + radius, y);
     this.closePath();
     if (stroke) {
         this.stroke();
     }
     if (fill) {
         this.fill();
     }
 };



 var URL = window.URL && window.URL.createObjectURL ? window.URL :
     window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
         null;
 function onSuccess(stream) {

     return;
     //创建一个音频环境对像
     audioContext = window.AudioContext || window.webkitAudioContext;
     context = new audioContext();
     //将声音输入这个对像
     audioInput = context.createMediaStreamSources(stream);

     //设置音量节点
     volume = context.createGain();
     audioInput.connect(volume);

     //创建缓存，用来缓存声音
     var bufferSize = 2048;

     // 创建声音的缓存节点，createJavaScriptNode方法的
     // 第二个和第三个参数指的是输入和输出都是双声道。
     recorder = context.createJavaScriptNode(bufferSize, 2, 2);

     // 录音过程的回调函数，基本上是将左右两声道的声音
     // 分别放入缓存。
     recorder.onaudioprocess = function(e){
         console.log('recording');
         var left = e.inputBuffer.getChannelData(0);
         var right = e.inputBuffer.getChannelData(1);
         // we clone the samples
         leftchannel.push(new Float32Array(left));
         rightchannel.push(new Float32Array(right));
         recordingLength += bufferSize;
     }

     // 将音量节点连上缓存节点，换言之，音量节点是输入
     // 和输出的中间环节。
     volume.connect(recorder);

     // 将缓存节点连上输出的目的地，可以是扩音器，也可以
     // 是音频文件。
     recorder.connect(context.destination);

 }
 function indexInit(){
     //初始化lufy canvas，来到这个游戏页之后再初始化， 然后setTimeout 200ms 开始游戏调用函数：LTreeIndexInit(); 不然android会卡。
     ysStage.init();
     LInit(30, "LMainDiv", 640, 908,lMainLoader.init,LEvent.INIT);
     //LGlobal.setDebug(true);
     //LGlobal.backgroundColor="#000";
     LGlobal.align = LStageAlign.MIDDLE;
     LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
     LSystem.screen(LStage.FULL_SCREEN);
 }
 function getRandom(min,max){
  return Math.random()*(max-min+1)   +min
 }

