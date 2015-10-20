/**
 * ...
 * @author YS1984,QQ64780298,http://www.1984.com
 */

(function(window) {
    var main={init:init,showInputed:showInputed};
    window.main=main;
    var imglist,loadData,fimglist;
    var objArr=[];
    var root=this;
    var stageAddY=0;
    var sound;
    var soundIcon;
    var isGameInited
    var ys=[];
    var gamePage;
    var timeInt;
    var pageNameArr=["home","game","user","rule","gameover","share","tip"];
    var page=[];
    var nowOnPage="home";
    var outPage="";
    var isLoad=false;
    var urlReq,isFriend,prizeData;
    var gameData=[];
    var rotateArr=[];
    var spListArr=[];
    var spMax=6;
    var lvNum=1;
    var speedNum;
    var isGameRuning=false;
    var gameoverType=0;
    var pageWidth=700;
    var pageHeight=1040;
    var stampNum=0;
    var sunLine,sSpCon;
    var isBtnTweening=false;
    function init(){
        //alert("main.init");
        imglist=window.datalist;
        fimglist=window.fimglist;
        loadData=window.loadData;
        stageAddY=-parseInt((1040*ysStage.wScale-ysStage.windowHeight)/ysStage.wScale);
        if(stageAddY>0){
            stageAddY=0;
        }
        var wNum=1040/ysStage.hwScale;
        if(wNum>700){
            wNum=700;
        }else  if(wNum<640){
            wNum=640;
        }
        gamePage=new LSprite();
        //gamePage.x=-(700-wNum)/2;
        addChild(gamePage);

        for(var i=0;i<pageNameArr.length;i++){
            pageInit(pageNameArr[i]);
            page[pageNameArr[i]].visible=false;
        }

        homeInit();
        userInit();
        tipInit();
        page["user"].x=-30;
        gameoverInit();
        //expedInit();
        btnInit();
        urlReq=new UrlSearch();
        //alert(urlReq.page+",id:"+pageNameArr.indexOf(urlReq.page)+urlReq.uid);
        if(pageNameArr.indexOf(urlReq.page)!=-1){
            nowOnPage=urlReq.page;
        }else {
            nowOnPage="home";
            //nowOnPage="game";
            //gameInit()
        }
        page[nowOnPage].visible=true;
        soundInit();
        //window.showInputPage();
    }
    function btnInit(){
        for(var n in ys){
            if(n.slice(n.length-3)=="btn"){
               ys[n].addEventListener(LMouseEvent.MOUSE_DOWN, btnDown);
            }
        }
        page["share"].addEventListener(LMouseEvent.MOUSE_DOWN, btnDown);
        //page["rule"].addEventListener(LMouseEvent.MOUSE_DOWN, btnDown);
    }
    function btnDown(event){
        //console.info("btnDown:"+event);
        if(isBtnTweening==false){
            isBtnTweening==true;
            var btnName=event.currentTarget.name;
            if(btnName=="share"){
                hidePop("share");
                return;
            }
            LTweenLite .to(event.currentTarget,0.1,{scaleX:0.9,scaleY:0.9}) .to(event.currentTarget,0.1,{scaleX:1,scaleY:1})
            if(isLoad==false){
                isLoad=true
                setTimeout(btnDownFun,300,btnName);
            }
        }
    }
    function loadTimeOut(){
        isLoad=false;
    }
    function btnDownFun(btnName){
        isLoad=false;
        //console.info("btnDownFun:"+btnName);
        if(btnName=="home_playbtn"){
            showPage("game");
            gameInit();
        }else if(btnName=="home_rulebtn"){
            showPop("rule","B");
        }else if(btnName=="home_userbtn"){
            userDataInit();
            showPop("user","T");
        }else if(btnName=="rule_closebtn"){
            hidePop("rule","B");
        }else if(btnName=="rule_playbtn"){
            showPage("game");
            gameInit();
        }else if(btnName=="gameover_userbtn"){
            userDataInit();
            showPop("user","T");
        }else if(btnName=="gameover_sharebtn"){
            showPop("share");
        }else if(btnName=="gameover_expbtn"){
            window.showInputPage();
        }else if(btnName=="gameover_playbtn"){
            hidePop("gameover");
            gameStartMovie();
        }else if(btnName=="gameover_nextbtn"){
            hidePop("gameover");
            nextLvInit();
        }else if(btnName=="user_backbtn"){
            hidePop("user");
        }
        isBtnTweening==false;
    }
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var player;
    function gameInit(){
        var lvTxtSp=new LSprite();
        lvTxtSp.x=-110;
        lvTxtSp.y=-32;
        ys["game_lvTxtSp"]=lvTxtSp;
        ys["game_info"].addChild(lvTxtSp);
        var lvTxt=new LTextField();
        lvTxt.size=55;
        lvTxt.color="#ffffff";
        lvTxt.stroke = true;
        lvTxt.lineWidth=8;
        lvTxt.lineColor="#3C848F";
        lvTxt.x=0;
        lvTxt.y=0;
        lvTxt.text="1";
        lvTxt.textAlign="center";
        ys["game_lvTxt"]=lvTxt;
        lvTxtSp.addChild(lvTxt);


        var timeTxt=new LTextField();
        timeTxt.size=55;
        timeTxt.color="#ffffff";
        timeTxt.stroke = true;
        timeTxt.lineWidth=8;
        timeTxt.lineColor="#3C848F";
        timeTxt.x=180;
        timeTxt.y=-32;
        timeTxt.text="20'";
        timeTxt.textAlign="center";
        ys["game_timeTxt"]=timeTxt;
        ys["game_info"].addChild(timeTxt);

        var tNameArr=["game_n1","game_n2","game_n3","game_go","game_timeout"];
        for(var i=0;i<5;i++){
            ys[tNameArr[i]].alpha=0;
            ys[tNameArr[i]].x=320;
            ys[tNameArr[i]].y=500;
        }

        var sSpNumTxt=new LTextField();
        sSpNumTxt.size=40;
        sSpNumTxt.color="#ff8208";
        sSpNumTxt.stroke = true;
        sSpNumTxt.lineWidth=4;
        sSpNumTxt.lineColor="#9c3700";
        sSpNumTxt.x=ys["game_sun"].x-6;
        sSpNumTxt.y=850;
        sSpNumTxt.text="6";
        sSpNumTxt.textAlign="center";
        ys["game_sSpNumTxt"]=sSpNumTxt;
        page["game"].addChild(sSpNumTxt);

        sunLine=new LSprite();
        sunLine.x=ys["game_sun"].x-6;
        sunLine.y=ys["game_sun"].y-8;
        page["game"].addChild(sunLine);

        sSpCon=new LSprite();
        sSpCon.x=ys["game_sun"].x-6;
        sSpCon.y=950;
        page["game"].addChild(sSpCon);

        /*
        var tsp=ys["game_sun"];
        LTweenLite.to(tsp,20,{rotate:360,loop:true}).to(tsp,0,{rotate:0});
        var tsp=ys["game_y0"];
        tsp.bitmap.x=0
        LTweenLite.to(tsp,20,{x:-1280,loop:true}).to(tsp,0,{x:640});
        var tsp=ys["game_y1"];
        tsp.bitmap.x=0
        LTweenLite.to(tsp,20,{x:-640,loop:true}).to(tsp,0,{x:1280});
        */
        var tsp=ys["game_y0"];
        tsp.addEventListener(LEvent.ENTER_FRAME,yunMovEnt);
        gameData.isGamePlaying=false;
        gameStartMovie();

        player=ys["game_p0"];
        //ys["game_p1"].alpha=0;
        //player.addEventListener(LMouseEvent.MOUSE_DOWN,playerDown);
        page["game"].addEventListener(LMouseEvent.MOUSE_DOWN,playerDown);
    }
    function yunMovEnt(){
        for(var i=0;i<4;i++){
            if(ys["game_y"+i].x<-640){
                ys["game_y"+i].x=640+ys["game_y"+i].getWidth()/2;
            }else{
                ys["game_y"+i].x-=2;
            }
        }
    }
    function gameStartMovie(){
        if(gameData.isGamePlaying==false){
            gameData.isGamePlaying=true;
            window.gameStart();
            gameData.time=20*20;
            ys["game_timeTxt"].text=parseInt(gameData.time/20)+"'";
            ys["game_lvTxt"].text=lvNum;
            ys["game_go"].alpha=0;
            ys["game_go"].scaleX=1.5;
            ys["game_go"].scaleY=1.5;
            ys["game_go"].visible=true;
            LTweenLite.to(ys["game_go"],0.5,{alpha:1,scaleX:1,scaleY:1,delay:0.5,ease:LEasing.Strong.easeOut})
                .to(ys["game_go"],0.5,{alpha:0,scaleX:1.5,scaleY:1.5,delay:0.5,ease:LEasing.Strong.easeOut})
                .to(ys["game_go"],0,{visible:false,onComplete:gameStart})
            gameStartInit()
        }else{

        }
    }
    function gameStartInit(){
        rotateArr=[];
        for(var i=0;i<7;i++) {
            rotateArr[i] = i * 60;
        }
        spListArr=[];
        sSpCon.removeAllChild();
        sunLine.removeAllChild();
        sunLine.rotate=0;
        for(var i=0;i<6;i++){
            var lSp=sp("game_l",true)
            lSp.x = 250*Math.cos((i*60)*Math.PI/180);
            lSp.y = 250*Math.sin((i*60)*Math.PI/180);
            lSp.rotate=90+i*60;
            sunLine.addChild(lSp);
        }
        spMax=5+lvNum;
        for(var i=0;i<spMax;i++){
            var typeNum=parseInt(Math.random()*5);
            var sSp=sp("game_s"+typeNum,true);
            sSp.x=i*50;
            sSp.type=typeNum;
            sSpCon.addChild(sSp);
            spListArr.push(sSp);
        }
        ys["game_sSpNumTxt"].text=spListArr.length;
        gameData.time=20*30;
        gameData.lvNum=lvNum;
        ys["game_lvTxt"].text=lvNum;
        speedNum=1+(lvNum/10)*2;
        console.log("speedNum:"+speedNum);
        ys["game_timeTxt"].text=parseInt(gameData.time/30)+"'";

    }
    function nextLvInit(){
        lvNum++;
        gameStartMovie();
    }
    function gameStart(){
        isGameRuning=true;
        page["game"].addEventListener(LEvent.ENTER_FRAME,timeRun);
        //gameData.time*30;
    }
    function playerDown(e){
        if(isGameRuning==true){
            /*
            LTweenLite.to(ys["game_p1"],0,{alpha:1})
                .to(ys["game_p0"],0,{alpha:0})
                .to(ys["game_p0"],0,{alpha:1,delay:0.2})
                .to(ys["game_p1"],0,{alpha:0})*/
            ys["game_p1"].visible=true;
            ys["game_p0"].visible=false;
            LTweenLite.to(ys["game_p0"],0,{visible:true,delay:0.2}).to(ys["game_p1"],0,{visible:false});
            var sSp=spListArr[0];
            //LTweenLite.to(sSp,0.2,{y:-280,onComplete:sunAddSp});
            LTweenLite.to(sSp,0.1,{y:-250}).to(sSp,0,{alpha:0,onComplete:sunAddSp});
            //setTimeout(sunAddSp,200,sSp.type);
            spListArr.remove(spListArr[0]);
            ys["game_sSpNumTxt"].text=spListArr.length;
            for(var i=0;i<spListArr.length;i++){
                //LTweenLite.to(spListArr[i],0.3,{x:spListArr[i].x-60,delay:0.2});
                spListArr[i].x=i*50;
            }

        }
        //console.log(rotateArr);
    }
    function sunAddSp(e){
        //console.log(e.target);
        var type= e.target.type;
        var rotNum=parseInt(-sunLine.rotate+90+360)%360;
        var sSp=sp("game_s"+type,true);
        sSp.x = 220*Math.cos(rotNum*Math.PI/180);
        sSp.y = 220*Math.sin(rotNum*Math.PI/180);
        sSp.rotate=-90+rotNum;
        sunLine.addChild(sSp);
        console.log(sunLine.rotate+" / "+rotNum+" / "+rotateArr);
        for(var i=0;i<rotateArr.length;i++){
            if(Math.abs(rotNum-rotateArr[i])<12){
                sSp.scaleX=0.7;
                sSp.scaleY=0.7;
                LTweenLite.to(sSp,0.8,{scaleX:1.2,scaleY:1.2,ease:LEasing.Elastic.easeOut,delay:0.1});
                gameover(0);
                return;
            }
        }
        rotateArr.push(rotNum);
        if(spListArr.length==0){
            gameover(1);
        }
    }
    function timeRun(e){
        //gameData.time--;
        ys["game_timeTxt"].text=parseInt(gameData.time/30)+"'";
        if(gameData.time==0){
            gameover(0)
        }
        sunLine.rotate+=speedNum;
        if(sunLine.rotate>360){
            sunLine.rotate=sunLine.rotate-360;
        }

    }

    function gameover(type){
        if(isGameRuning==true){
            gameoverType=type;
            gameData.isGamePlaying=false;
            isGameRuning=false;
            page["game"].removeEventListener(LEvent.ENTER_FRAME,timeRun);
            setTimeout(gameoverPlay,500);
        }
    }
    function gameoverInit(){
        var msgTxt=new LTextField();
        msgTxt.size=42;
        msgTxt.color="#623f05";
        msgTxt.text="快来领大奖！";
        msgTxt.x=-220;
        msgTxt.y=-130;
        msgTxt.width=450;
        msgTxt.setWordWrap(true,60);
        //msgTxt.textAlign="center";
        ys["gameover_msgTxt"]=msgTxt;
        ys["gameover_tbg"].addChild(msgTxt);
    }
    function gameoverPlay(){
        window.userData.passLvNum=lvNum-1;
        var sendData=new Object();
        sendData.passLvNum=lvNum-1;
        window.gameOver(sendData);
        if(gameoverType==0){
            ys["gameover_expbtn"].visible=true;
            ys["gameover_playbtn"].visible=true;
            ys["gameover_nextbtn"].visible=false;
            if(lvNum>10){
                ys["gameover_msgTxt"].text="恭喜你，你糊了太阳"+lvNum+"轮，打败了98%的小伙伴，将高温尽数驱逐！";
            }else if(lvNum>8){
                ys["gameover_msgTxt"].text="太棒了，太阳被你糊了"+lvNum+"轮，打败了60%的小伙伴，重返常温不是梦！";
            }else if(lvNum>5){
                ys["gameover_msgTxt"].text="哎哟不错哦，你糊了太阳"+lvNum+"轮，打败了34%的小伙伴，再加把劲哦！";
            }else{
                ys["gameover_expbtn"].visible=false;
                ys["gameover_msgTxt"].text="4.很遗憾，你才打败了9%的小伙伴，差一点点就能把高温降下来了呢......";
            }
        }else{
            ys["gameover_msgTxt"].text="恭喜你，第"+lvNum+"关成功通关，马上下一关吧！";
            ys["gameover_nextbtn"].visible=true;
            ys["gameover_expbtn"].visible=false;
            ys["gameover_playbtn"].visible=false;
        }
        showPop("gameover");
        var tsp=ys["gameover_bg"];
        tsp.alpha=0;
        LTweenLite.to(tsp,0.3,{alpha:0.8});
        var tsp=ys["gameover_tbg"];
        tsp.alpha=0;
        tsp.scaleX=0.2;
        tsp.scaleY=0.2;
        LTweenLite.to(tsp,0.5,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.Sine.easeOut});
        /*
        var tsp=ys["gameover_userbtn"];
        tsp.alpha=0;
        tsp.x=tsp.initX-200;
        LTweenLite.to(tsp,0.5,{alpha:1,x:tsp.initX,ease:LEasing.Sine.easeOut,delay:0.3});*/

        var btnNameArr=["gameover_playbtn","gameover_sharebtn","gameover_expbtn","gameover_userbtn","gameover_nextbtn"]
        for(var i=0;i<btnNameArr.length;i++){
            var tsp=ys[btnNameArr[i]];
            tsp.alpha=0;
            tsp.scaleX=0.2;
            tsp.scaleY=0.2;
            LTweenLite.to(tsp,0.5,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.Back.easeOut,delay:0.3+i*0.1});
        }
    }
    function tipInit(){
        var msgTxt=new LTextField();
        msgTxt.size=42;
        msgTxt.color="#623f05";
        msgTxt.text="快来领大奖！";
        msgTxt.x=-200;
        msgTxt.y=-100;
        msgTxt.width=400;
        msgTxt.setWordWrap(true,60);
        //msgTxt.textAlign="center";
        ys["tip_msgTxt"]=msgTxt;
        ys["tip_tbg"].addChild(msgTxt);
        page["tip"].addEventListener(LMouseEvent.MOUSE_DOWN,tipDown);
    }
    function tipDown(event){
        hidePop("tip")
    }
    function tipPlay(tipText){
        ys["tip_msgTxt"].text=tipText;
        showPop("tip");
        var tsp=ys["tip_tbg"];
        tsp.alpha=0;
        tsp.scaleX=0.2;
        tsp.scaleY=0.2;
        LTweenLite.to(tsp,0.3,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.Back.easeOut});
    }
    function userInit(){
        var hpicLoader=new LLoader();
        hpicLoader.addEventListener(LEvent.COMPLETE, userHpicloadBitmapdata);
        hpicLoader.load(window.userData.hpic, "bitmapData");
        var nameTxt=new LTextField();
        nameTxt.size=36;
        nameTxt.color="#ffffff";
        nameTxt.text=window.userData.name;
        nameTxt.x=350;
        nameTxt.y=160;
        //telTxt.textAlign="center";
        ys["user_nameTxt"]=nameTxt;
        page["user"].addChild(nameTxt);

        var stampTxt=new LTextField();
        stampTxt.size=80;
        stampTxt.color="#ffffff";
        stampTxt.text="0";
        stampTxt.x=500;
        stampTxt.y=210;
        //telTxt.textAlign="center";
        ys["user_stampTxt"]=stampTxt;
        page["user"].addChild(stampTxt);

        var iList=new LSprite();
        iList.x=129;
        iList.y=481;
        ys["user_iList"]=iList;
        page["user"].addChild(iList);
        for(var i=0;i<9;i++) {
            var isp = sp("user_i",true);
            isp.x = i % 3 * 168+54;
            isp.y = (i / 3 >> 0) * 138+54;
            isp.id=i;
            ispArr[i]=isp;
            iList.addChild(isp);
            isp.addEventListener(LMouseEvent.MOUSE_DOWN,ispDown)
        }
        userDataInit();
    }
    function ispDown(event,obj){
        LTweenLite .to(event.currentTarget,0.1,{scaleX:0.8,scaleY:0.8}) .to(event.currentTarget,0.1,{scaleX:1,scaleY:1});
        var data=window.getPrizeData(obj.id);
          var text="很遗憾，您在本期游戏中没有获奖哦~请加油！";
        if(window.userData.isPlayArr[obj.id]==0){
            text="你还没有玩过这个游戏呢！";
        }else if(window.userData.isPlayArr[obj.id]==-1){
            text="这个游戏还没上线呢！";
        }else if(data.isLucky==1){
            text=data.tel+"\n在【"+data.gameName+"】中\n获得 "+data.prize;
        }
        tipPlay(text);
    }

    var ispArr=[];
    function userDataInit(){
        stampNum=0;
        for(var i=0;i<9;i++){
            if(window.userData.isPlayArr[i]>-1){
                var bitx=0;
                var bity=i*107;
                if(window.userData.isPlayArr[i]==1){
                    stampNum++;
                    bitx=107;
                }
                var ibitData=new LBitmapData(imglist["user_ipic"],bitx,bity,107,107,LBitmapData.DATA_CANVAS)
                ispArr[i].bitmap.bitmapData=ibitData;
            }
        }
        ys["user_stampTxt"].text=stampNum;
    }
    function userHpicloadBitmapdata(event){
        var bitmapdata = new LBitmapData(event.target);
        var bitmap = new LBitmap(bitmapdata);
        bitmap.scaleX=bitmap.scaleY=240/bitmap.getWidth();
        bitmap.x=-120;
        bitmap.y=-120;
        var hpic=new LSprite();
        hpic.addChild(bitmap);
        hpic.x=205;
        hpic.y=176;
        page["user"].addChild(hpic);
        var mask=new LSprite();
        mask.graphics.drawArc(0,"",[0,0,118,0,Math.PI*180*2],true,"#ffffff");
        mask.x=hpic.x;
        mask.y=hpic.y;
        //page["p2"].addChild(mask);
        hpic.mask=mask;
    }

    function showInputed(data){
        //hidePop("gameover");
        ys["gameover_msgTxt"].text="恭喜你 "+data.tel+"\n获得 "+data.prize;
        ys["gameover_expbtn"].visible=false;
        //LTweenLite.to(tsp,0.3,{scaleX:0.95,scaleY:0.95,loop:true}).to(tsp,0.3,{scaleX:1,scaleY:1});
    }

    var movStopPart=0;
    function movPlay(){
        page["mov"].visible=true;
        page["home"].visible=false;
        //for(var i=1;i<4;i++){
            ys["mov_p1p"].alpha=0;
            ys["mov_p1t"].alpha=0;
        ys["mov_p2p"].alpha=0;
        ys["mov_p2t"].alpha=0;
        ys["mov_p3p"].alpha=0;
        ys["mov_p3t"].alpha=0;
        ys["mov_playbtn"].visible=false;
        ys["mov_rulebtn"].visible=false;

        var tsp=ys["mov_ufo"];
        tsp.y=1200//tsp.initY-400;
        LTweenLite.to(tsp,1,{y:tsp.initY,ease:LEasing.Back.easeOut});
        var tsp=ys["mov_light"];
        tsp.alpha=0;
        tsp.tween= LTweenLite.to(tsp,0.1,{alpha:1,delay:1})
            .to(tsp,0.1,{alpha:0})
            .to(tsp,0.1,{alpha:1})
            .to(tsp,0.1,{alpha:0})
            .to(tsp,0.5,{alpha:1,loop:true})
            .to(tsp,0.5,{alpha:0.7})

        var tsp=ys["mov_p1p"];
        tsp.scaleY=1.3;
        LTweenLite.to(tsp,1,{alpha:1,scaleY:1,delay:1.5,ease:LEasing.Strong.easeOut})
        var tsp=ys["mov_p1t"];
        LTweenLite.to(tsp,1,{alpha:1,delay:2})
        page["mov"].addChild(ys["home_tip"]);
        ys["home_tip"].y=1000;
        setTimeout(function(){ys["home_tip"].visible=true;movStopPart=1},3000)
       page["mov"].addEventListener(LMouseEvent.MOUSE_DOWN,movPageDown);
    }
    function movPageDown(event){
        if(movStopPart==1){
            movPlayPart2();
        }else if(movStopPart==2){
            movPlayPart3();
        }
    }
    function movPlayEnd(){
        var tsp=ys["mov_p3p"];
        LTweenLite.to(tsp,1,{alpha:0,scaleY:1.3,y:tsp.initY-200,ease:LEasing.Strong.easeIn});
        var tsp=ys["mov_p3t"];
        LTweenLite.to(tsp,1,{alpha:0})
        var tsp=ys["mov_playbtn"];
        LTweenLite.to(tsp,0.5,{alpha:0,x:tsp.initX-100});
        var tsp=ys["mov_rulebtn"];
        LTweenLite.to(tsp,0.5,{alpha:0,x:tsp.initX+100});

        var tsp=ys["mov_ufo"];
        LTweenLite.to(tsp,1,{y:tsp.initY-400,ease:LEasing.Back.easeIn,delay:2});
        var tsp=ys["mov_light"];
        LTweenLite.remove(tsp.tween);
        LTweenLite.to(tsp,1,{alpha:0,delay:0.5});

        setTimeout(gameInit,3000);
    }
    function movPlayPart2(){
        movStopPart=0;
        var tsp=ys["mov_p1p"];
        LTweenLite.to(tsp,1,{alpha:0,scaleY:1.3,ease:LEasing.Strong.easeIn})
        var tsp=ys["mov_p1t"];
        LTweenLite.to(tsp,1,{alpha:0})

        var tsp=ys["mov_p2p"];
        tsp.scaleY=1.3;
        LTweenLite.to(tsp,1,{alpha:1,scaleY:1,ease:LEasing.Strong.easeOut,delay:1})
        var tsp=ys["mov_p2t"];
        LTweenLite.to(tsp,1,{alpha:1,delay:2})

        ys["home_tip"].visible=false;
        setTimeout(function(){ys["home_tip"].visible=true;movStopPart=2},4000)
    }
    function movPlayPart3(){
        movStopPart=0;
        var tsp=ys["mov_p2p"];
        LTweenLite.to(tsp,1,{alpha:0,scaleY:1.3,ease:LEasing.Strong.easeIn})
        var tsp=ys["mov_p2t"];
        LTweenLite.to(tsp,1,{alpha:0})

        var tsp=ys["mov_p3p"];
        tsp.scaleY=1.3;
        LTweenLite.to(tsp,1,{alpha:1,scaleY:1,ease:LEasing.Strong.easeOut,delay:1})
        var tsp=ys["mov_p3t"];
        LTweenLite.to(tsp,1,{alpha:1,delay:2})

        ys["home_tip"].visible=false;
        //setTimeout(function(){ys["home_tip"].visible=true;movStopPart=3},5000)
        page["mov"].removeEventListener(LMouseEvent.MOUSE_DOWN,movPageDown);

        var tsp=ys["mov_playbtn"];
        tsp.visible=true;
        tsp.alpha=0;
        tsp.x=tsp.initX-100;
        LTweenLite.to(tsp,1,{alpha:1,x:tsp.initX,delay:3});
        var tsp=ys["mov_rulebtn"];
        tsp.visible=true;
        tsp.alpha=0;
        tsp.x=tsp.initX+100;
        LTweenLite.to(tsp,1,{alpha:1,x:tsp.initX,delay:3});
    }
    function homePlayEnd(){
        //movPlay()
        var tsp=ys["home_logo"];
        LTweenLite.to(tsp,0.3,{alpha:0,y:tsp.initY-50,ease:LEasing.Sine.easeOut});

        var tsp=ys["home_ufo"];
        LTweenLite.remove(tsp.tween);
        LTweenLite.to(tsp,0.8,{x:500,y:800,scaleX:0.7,scaleY:0.7,delay:0.5})
            .to(tsp,0.5,{x:-100,y:1000,scaleX:0.3,scaleY:0.3})

        var tsp=ys["home_t"];
        LTweenLite.to(tsp,0.5,{alpha:0});

        var tsp=ys["home_t0"];
        LTweenLite.to(tsp,0.5,{alpha:0});

        ys["home_tip"].visible=false;

        setTimeout(movPlay,2000);
    }
    function homeInit(){
        /*
        var tsp=ys["home_logo"];
        tsp.y=tsp.initY-50;
        tsp.alpha=0;
        LTweenLite.to(tsp,0.3,{alpha:1,y:tsp.initY,ease:LEasing.Sine.easeOut,delay:0.5});
        */
        var tsp=ys["home_bg"];
        tsp.alpha=0;
        LTweenLite.to(tsp,0.5,{alpha:1});

        for(var i=0;i<3;i++){
            var tsp=ys["home_t"+i];
            tsp.scaleX=0.2;
            tsp.scaleY=0.2;
            tsp.alpha=0;
            LTweenLite.to(tsp,1.5,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.Elastic.easeOut,delay:1.5+i*0.2})
                .to(tsp,0.3,{scaleX:1.1,scaleY:1.1,loop:true})
                .to(tsp,0.3,{scaleX:1,scaleY:1})
        }

        var btnArrName=["home_playbtn","home_rulebtn","home_userbtn"];
        for(var i=0;i<3;i++){
            var tsp=ys[btnArrName[i]];
            tsp.scaleX=0.2;
            tsp.scaleY=0.2;
            tsp.alpha=0;
            LTweenLite.to(tsp,1.5,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.Elastic.easeOut,delay:2+i*0.3});
        }

        var tsp=ys["home_p"];
        tsp.scaleX=0.2;
        tsp.scaleY=0.2;
        tsp.alpha=0;
        LTweenLite.to(tsp,2,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.Elastic.easeOut,delay:0.3});
        /*
        for(var i=1;i<3;i++){
            var tsp=ys["home_p"+i];
            tsp.scaleX=0.2;
            tsp.scaleY=0.2;
            tsp.alpha=0;
            LTweenLite.to(tsp,1.5,{alpha:1,scaleX:1,scaleY:1,ease:LEasing.Elastic.easeOut,delay:1+i*0.3});
        }*/

    }
    function showPop(pageName,direction,callback){
            //console.info("showPop");
            page[pageName].direction=direction;
            if(direction=="R"){
                page[pageName].x=pageWidth;
                LTweenLite.to(page[pageName],1,{x:0,ease:LEasing.Strong.easeInOut});
            }else if(direction=="L"){
                page[pageName].x=-pageWidth;
                LTweenLite.to(page[pageName],1,{x:0,ease:LEasing.Strong.easeInOut});
            }else if(direction=="T"){
                page[pageName].y=-pageHeight;
                LTweenLite.to(page[pageName],1,{y:0,ease:LEasing.Strong.easeInOut});
            }else if(direction=="B"){
                page[pageName].y=pageHeight;
                LTweenLite.to(page[pageName],1,{y:0,ease:LEasing.Strong.easeInOut});
            }else if(direction=="A"){
                page[pageName].x=0;
                page[pageName].y=0;
                page[pageName].alpha=0;
                LTweenLite.to(page[pageName],0.5,{alpha:1});
            }else{
                page[pageName].x=0;
                page[pageName].y=0;
            }
            page[pageName].visible=true;
            gamePage.setChildIndex(page[pageName],gamePage.numChildren-1);
            if(callback){
                setTimeout(callback,1000);
            }
    }
    function hidePop(pageName){
        var direction=page[pageName].direction;
        var delay=1000;
        if(direction=="R"){
            LTweenLite.to(page[pageName],0.7,{x:pageWidth,ease:LEasing.Strong.easeInOut});
        }else if(direction=="L"){
            LTweenLite.to(page[pageName],0.7,{x:-pageWidth,ease:LEasing.Strong.easeInOut});
        }else if(direction=="T"){
            LTweenLite.to(page[pageName],0.7,{y:-pageHeight,ease:LEasing.Strong.easeInOut});
        }else if(direction=="B"){
            LTweenLite.to(page[pageName],0.7,{y:pageHeight,ease:LEasing.Strong.easeInOut});
        }else if(direction=="A"){
            LTweenLite.to(page[pageName],0.3,{alpha:0});
        }else{
            delay=1;
        }
        setTimeout(hidePopComplete,delay,pageName)
    }
    function hidePopComplete(pageName){
        page[pageName].visible=false;
        gamePage.setChildIndex(page[pageName],0);
    }
    function showPage(pageName,direction,callback){
        if(nowOnPage!=pageName){
            page[pageName].x=0;
            page[pageName].y=0;
            if(direction=="R"){
                page[pageName].x=pageWidth;
                LTweenLite.to(page[nowOnPage],1,{x:-pageWidth,ease:LEasing.Strong.easeInOut});
                LTweenLite.to(page[pageName],1,{x:0,ease:LEasing.Strong.easeInOut});
            }else if(direction=="L"){
                page[pageName].x=-pageWidth;
                LTweenLite.to(page[nowOnPage],1,{x:pageWidth,ease:LEasing.Strong.easeInOut});
                LTweenLite.to(page[pageName],1,{x:0,ease:LEasing.Strong.easeInOut});
            }else if(direction=="T"){
                page[pageName].y=-pageHeight;
                LTweenLite.to(page[nowOnPage],1,{y:pageHeight,ease:LEasing.Strong.easeInOut});
                LTweenLite.to(page[pageName],1,{y:0,ease:LEasing.Strong.easeInOut});
            }else{
                page[pageName].y=pageHeight;
                LTweenLite.to(page[nowOnPage],1,{y:-pageHeight,ease:LEasing.Strong.easeInOut});
                LTweenLite.to(page[pageName],1,{y:0,ease:LEasing.Strong.easeInOut});
            }
            page[pageName].visible=true;
            outPage=nowOnPage;
            nowOnPage=pageName;
            setTimeout(hidePage,1000,outPage);
            setTimeout(callback,1000);
        }
    }
    function hidePage(pageName){
        page[pageName].visible=false;
    }
    function pageInit(pageName){
        var pageSp=new LSprite();
        pageSp.name=pageName;
        for(var n=0;n<loadData.length;n++){
            if(loadData[n].parent==pageName){
                var tbit=new sp(loadData[n].name,true);
                tbit.x=tbit.initX;
                tbit.y=tbit.initY;
                //tbit.alpha=0;
                pageSp.addChild(tbit);
            }
        }
        page[pageName]=pageSp;
        gamePage.addChild(pageSp);
    }
    function conSp(pageName,objType){
        var conSp=new LSprite();
        for(var n=0;n<loadData.length;n++){
            if(loadData[n].parent==pageName){
                if(objType=="bit"){
                    var tbit=new bit(loadData[n].name);
                }else{
                    var tbit=new sp(loadData[n].name,true);
                }
                tbit.x=tbit.initX;
                tbit.y=tbit.initY;
                //tbit.alpha=0;
                conSp.addChild(tbit);
            }
        }
        return conSp;
    }
    function soundInit(){
        soundIcon=sp("soundIcon",true);
        var soundIconae=sp("soundIconae",true);
        soundIcon.addChild(soundIconae);
        soundIcon.ae=soundIconae;
        soundIcon.ae.visible=false;
        soundIcon.x=600;
        soundIcon.y=40
        //LStage.height-30;//1030//+stageAddY;
        soundIcon.addEventListener(LMouseEvent.MOUSE_DOWN,soundIconDown)
        //soundIcon.scaleX=0.7;
        //soundIcon.scaleY=0.7;
        addChild(soundIcon);
        //soundIcon.rotate
        soundIcon.tween=LTweenLite.to(soundIcon,2,{rotate:360,loop:true}).to(soundIcon,0,{rotate:0});
        //soundIcon.scaleX

        /*
         var soundAe=new LSprite();
         var musicalNotes=bit("musicalNotes");
         soundAe.addChild(musicalNotes);
         LTweenLite.to(musicalNotes,0.5,{alpha:1,x:-30,y:-30,loop:true}).to(musicalNotes,0.5,{alpha:0,x:-50,y:-40}).to(musicalNotes,0.1,{alpha:0,x:0,y:0});
         soundIcon.soundAe=soundAe;
         soundIcon.addChild(soundAe);

         sound = new LSound();
         var url = "images/music.";
         sound.load(url+"mp3,"+url+"m4a");
         sound.addEventListener(LEvent.COMPLETE,soundLoadOver);
         */
        //alert(document.getElementById("bgMusic").src);
        var bgMusic= window.document.getElementById("bgMusic");
        //bgMusic.src="images/music.mp3";
        if(bgMusic.paused){
            LGlobal.stage.addEventListener(LMouseEvent.MOUSE_DOWN,bodyDown);
        }
        function bodyDown(event){
            //alert("adfasdfa")
            bgMusic.play();
            LGlobal.stage.removeEventListener(LMouseEvent.MOUSE_DOWN,bodyDown);
        }
    }
    function soundIconDown(event){
        //alert(sound.playing);
        var bgMusic= window.document.getElementById("bgMusic");
        if(bgMusic.paused){
            bgMusic.play();
            soundIcon.alpha=1;
            soundIcon.tween.resume();
            soundIcon.ae.visible=false;
        }else{
            bgMusic.pause();
            //myAuto.currentTime = 0.0;
            soundIcon.ae.visible=true;
            soundIcon.alpha=0.5;
            soundIcon.tween.pause();
        }
    }
    function bit(bitName){
        var bitmapdata = new LBitmapData(imglist[bitName]);
        var bitmap = new LBitmap(bitmapdata);
        var i;
        for(i=0;i<loadData.length;i++){
            if(bitName==loadData[i].name){
                //sprite.data=loadData[i];
                bitmap.initX=loadData[i].x;
                bitmap.initY=loadData[i].y;
                break;
            }
        }
        objArr[bitName+"Bit"]=bitmap;
        bitmap.name=bitName;
        //ys[bitName]=bitmap;
        return bitmap;
    }

    function sp(spName,isMoveCenter){
        var bitmapdata = new LBitmapData(imglist[spName]);
        var bitmap = new LBitmap(bitmapdata);
        var sprite=new LSprite();
        if(isMoveCenter==true){
            bitmap.x=-bitmap.getWidth()/2;
            bitmap.y=-bitmap.getHeight()/2;
        }
        sprite.bitmap=bitmap;
        sprite.bitmapdata=bitmapdata;
        sprite.addChild(bitmap);
        var i;
        for(i=0;i<loadData.length;i++){
            if(spName==loadData[i].name){
                //sprite.data=loadData[i];
                if(isMoveCenter==true){
                    sprite.initX=loadData[i].x+bitmap.getWidth()/2;
                    sprite.initY=loadData[i].y+bitmap.getHeight()/2;
                }else{
                    sprite.initX=loadData[i].x;
                    sprite.initY=loadData[i].y;
                }
                break;
            }
        }
        objArr[spName+"Sp"]=sprite;
        sprite.name=spName;
        ys[spName]=sprite;
        return sprite;
    }
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    function UrlSearch()
    {
        var name,value;
        var str=location.href; //取得整个地址栏
        var num=str.indexOf("?")
        this.rootUrl=str.substr(0,num);
        //alert( this["rootUrl"]);
        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        var arr=str.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                name=arr[i].substring(0,num);
                value=arr[i].substr(num+1);
                this[name]=value;
            }
        }
    }
})(window);