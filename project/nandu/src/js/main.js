var cardPlayFun= animateFrame($(".p2_card"), 0, 10, 80, false, false, false, null, playEnd);
cardPlayFun.stop();
var isClickBoo=false;
var isGetPrizeBoo=false;
var isSaveBoo=false;
var lotteryData;
getPrizeFun();

$(document).ready(function () {
	//记录访问
	$.get(userData.visitURL);
    //首页 “必须要”按钮 btn
    $(".p1_btn1").tap(function(){
        //getPrizeFun();
        $(".page2").css("display","block")
    });

    //首页 “大奖君是谁”按钮 btn
    $(".p1_btn2").tap(function(){

        $(".arrow_tips").css("display","block")
        mySwiper.slideNext();
        mySwiper.lockSwipeToPrev();
        mySwiper.unlockSwipeToNext();

        //mySwiper.slideTo(3,600,false);
        //$(".arrow_tips").css("display","block")
        //$(".arrow_txt").html("");

    });

    //嘉宾页  我要抽奖
    $(".getPrize_btn").tap(function(){
        $(".page2").css("display","block");
    });

    //总冠名  我要抽奖
    $(".getPrize_btn6").tap(function(){
        $(".page2").css("display","block");
    });

    //点击 卡卷  抽奖  btn
    $(".p2_card").tap(function(){

        if(!lotteryData){
        	getPrizeFun(function(){
	            checkLottery(lotteryData)
        	});
        }else{
        	if(isClickBoo!=true){
	            isClickBoo=true;
	            checkLottery(lotteryData)
        	}
        }
    })

    //显示 分享提示 btn
    $(".p3_shareBtn").tap(function(){
        $(".shareTips").css("display","block");
    });

    //隐藏分享提示
    $(".shareTips").tap(function(){
        $(".shareTips").css("display","none");
    });

    //等级领取 btn
    $(".p3_getBtn").tap(function(){

        $(".page4").css("display","block");
    })

    //兑奖页 “返回”按钮
    $(".closeP4Btn").tap(function(){        
    	$(".page2").css("display","none");

        $(".page4").css("display","none");
    })

    //中奖页   “返回”按钮
    $(".closeP3Btn").tap(function(){
        $(".page2").css("display","none");
    })


    //“提交”  按钮
    $(".p4_btn0").tap(function(){

        if(isSaveBoo!=true){
            var inputNameArr = ["name_input","tel_input","addr_input"];
            var inputArr = [];
            for (var i = 0; i < 3; i++) {
                inputArr[inputNameArr[i]] = document.getElementById(inputNameArr[i]);
            }

            if (inputArr["name_input"].value == "") {
                alert("请输入姓名！");
                $('#name_input').focus();
                return false;
            }

            re = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[6,7,8]\d{8}$|(^18\d{9}$)/g;
            if (!re.test(inputArr["tel_input"].value)) {
                alert("请输入正确的手机号码！");
                $('#tel_input').focus();
                return false;
            }

            if (inputArr["addr_input"].value == "") {
                alert("请输入邮寄地址！");
                $('#addr_input').focus();
                return false;
            }

            saveDataFun();
        }

    })




});

//检查抽奖结果
function checkLottery(datas){

    if (datas.code == 1) {
    	
        isGetPrizeBoo=true;//已经抽过奖了

        //$(".prize_result").css("background-image",'url('+"'"+'img/prize'+datas.prizeNum+'.png'+"'"+')');
        $(".prize_result").attr("src",'img/prize'+datas.prizeNum+'.png');

        //$(".savePic").attr("src",'img/myHead'+curNum.toString()+'.png')
        if(datas.prizeNum==0){

            $(".shineBox").css("display","none");
            $(".p3_getBtn").css("display","none");
            $(".closeP3Btn").show().one("click",function(){

            })
            //$(".p3_shareBtn").css({"left":"50%","margin-left":"-128px"});
        }

        cardPlayFun.start();
        $(".p2_jt_box").addClass("p2_jt_boxMoveOut");
        $(".p2_t1").animate({opacity:0},700,function(e){
            $(".p2_t1").css("display","none");
            $(".p2_jt_box").css("display","none");
            $(".prize_box").css("display","block");
        });

    } else {
        alert(datas.msg);
        return false;
    }
}
//ajax 请求中奖
function getPrizeFun(cb) {
    $.ajax({
        url: userData.getPrizeURL,
        type: 'post',
        success: function (datas) {
        	lotteryData=JSON.parse(datas);
        	if(cb){
        		cb();
        	}
        },
        error: function (err) {
            isClickBoo=false;
            console.log(err)
            //alert('服务器繁忙！');
            return false;
        }
    });
}

//ajax  保存资料
function saveDataFun() {
    $.ajax({
        url: userData.saveDataURL,
        data:$("#myform").serialize(),
        type: 'post',
        success: function (datas) {
        	datas=JSON.parse(datas);
            if (datas.code == 1) {
                console.log("保存成功");
                isSaveBoo=true;
                $(".p4_btn0").css("background-image",'url('+"'"+'img/p4_btn1.png'+"'"+')');
                $(".p3_getBtn").css("display","none")
                $(".closeP3Btn").css("display","block")
                $(".getTipsTxt").css("display","block")
                alert(datas.msg)
            } else {
                alert(datas.msg);
                return false;
            }
        },
        error: function () {
            alert('服务器繁忙！');
            return false;
        }
    });
}



function playEnd() {

}
function animateFrame(el, firstFrame, lastFrame, frameGapTime, isGoToFirstBoo, isLoopBoo, loopTimes, loopGapTime, callBackFun, stepFuc, waitFrame, waitTime) {
    var plugin = el.data("plugin"), frameClass, $list,
        isInit = plugin ? true : false, isPlay = plugin ? plugin.getPlayState() : false;
    if (isPlay) {
        return;
    }
    if (!isInit) {
        for (var i = 0; i <= lastFrame; i++) {
            frameClass = "png-frame p" + (i + 1) + ((i == 0) ? " show" : "");
            el.append("<div class='" + frameClass + "'></div>");
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
        this.stop = function () {
            isPlay = false;
        }
        this.start = function () {
            isPlay = true;
        }
        this.getPlayState = function () {
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
                if (!plugin.getPlayState()) {
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
                    } else if (!isLoopBoo) {
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
