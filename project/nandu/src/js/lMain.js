/**
 * ...
 * @authorys1984,QQ64780298,http://www.1984.com
 */

;(function(window) {
    ////////////////////////////////////////////////////////////////
    var main={init:init};
    var stageAddY=0;
    var LImglist,loadData,fimglist;
     var   objArr=[];
    var root=this;
    var isBtnTweening=false;
    var LSpeedNum=1.2;//转动的角度
    var pageNameArr=["LTreeGame"];
    var page=[];
    var nowOnPage="LTreeGame";
    var outPage="";
    var LIsLoad=false;
    var pageWidth=640;
    var pageHeight=1008;
    var ys=[];
    var isGameRuning=false;
    var gamePage;
    var rotateArr=[];
    var rotateMc;

    var allFSp=[];
    var ETreeSp;
////////////////////////////////////////////////////////////////
    window.addEventListener("load",init);
    function init(){
        //alert("init");
        LImglist=window.datalist;
        fimglist=window.fimglist;
        loadData=window.loadData;
        stageAddY=-parseInt((1008*ysStage.wScale-ysStage.windowHeight)/ysStage.wScale);
        if(stageAddY>0){
            stageAddY=0;
        }
        var wNum=1008/ysStage.hwScale;
        if(wNum>640){
            wNum=640;
        }else  if(wNum<640){
            wNum=640;
        }
        gamePage=new LSprite();
        gamePage.x=-(1008-wNum)/2;
        addChild(gamePage);
        pageInit(pageNameArr[0]);
        page["LTreeGame"].visible=true;


       rotateMc=new LSprite();
       rotateMc.x=ys["LEarthBg"].x;
       rotateMc.y=ys["LEarthBg"].y;
        page["LTreeGame"].addChild(rotateMc);

        //////////////////////////////////////////////////////////////////////////////////////////////   开始游戏  重新开始
        //初始化游戏页  重新开始游戏
        //LTreeIndexInit();
        console.log("in")
        $.extend(window.Game.gameBox.tree,main);
    }

    main.LTreeIndexInit=function(){
        LGlobal.preventDefault=false;
        rotateArr=[];
        allFSp=[];
        for(var i=0;i<7;i++) {
            rotateArr[i] = i * 60;
        }

        rotateMc.removeAllChild();
        rotateMc.rotate=0;


        var allFactorySpStr=["LEF1","LEF2","LEF3","LEF1","LEF2","LEF3"]
        var tnum=60;

        for(var i=0;i<7;i++){
            var fSp=sp(allFactorySpStr[i],true)//factorySP 加载工厂

            fSp.x = (501+135)*Math.cos((i*tnum)*Math.PI/180);
            fSp.y = (501+135)*Math.sin((i*tnum)*Math.PI/180);
            fSp.rotate=90+i*tnum;
            fSp.name="f";
           allFSp.push(fSp);
            rotateMc.addChild(fSp);

        }

        /*var allFactorySpStr=["LTreeSp","LTreeSp","LTreeSp","LTreeSp","LTreeSp","LTreeSp"]
        var tnum=5+16;
        for(var i=0;i<7;i++){
            var fSp=sp(allFactorySpStr[i],true)//factorySP 加载工厂

            fSp.x = (502+70)*Math.cos((i*tnum+8)*Math.PI/180);
            fSp.y = (502+70)*Math.sin((i*tnum+8)*Math.PI/180);
            fSp.rotate=90+i*tnum+8;
            fSp.name="f";
           rotateMc.addChild(fSp);
        }*/

       ys["LEarthBg"].scaleX=ys["LEarthBg"].scaleY=0.6;
       ys["LEarthBg"].y=504;
        rotateMc.y=504;
        rotateMc.scaleX=rotateMc.scaleY=0.6;

       ys["LBtn"].tween=LTweenLite.to(ys["LBtn"],10,{rotate:360,loop:true}).to(ys["LBtn"],0,{rotate:0});

        LGameStart();
    }

    // @tom  倒计时结束，调用游戏开始函数。
    function LGameStart(){
        //初始化按钮
        btnInit();
        isGameRuning=true;
        page["LTreeGame"].addEventListener(LEvent.ENTER_FRAME,LTimeRun);
    }

    //开始旋转
    function LTimeRun(e){
       rotateMc.rotate+=LSpeedNum;
        if(rotateMc.rotate>360){
           rotateMc.rotate=rotateMc.rotate-360;
        }
    }

    //所有文件末端命名"Btn"的按钮  初始化
    function btnInit(){
        for(var n in ys){
            if(n.slice(n.length-3)=="Btn"){
               ys[n].addEventListener(LMouseEvent.MOUSE_DOWN, btnDown);
            }
        }
    }

    function btnDown(event){
        if(isBtnTweening==false){
            isBtnTweening=true;
            var btnName=event.currentTarget.name;

            //LTweenLite .to(event.currentTarget,0.1,{scaleX:0.9,scaleY:0.9}) .to(event.currentTarget,0.1,{scaleX:1,scaleY:1})
            if(LIsLoad==false){
                LIsLoad=true
                setTimeout(btnDownFun,300,btnName);
            }
        }
    }

    //按钮点击 事件
    function btnDownFun(btnName){
        LIsLoad=false;
        //console.info("btnDownFun:"+btnName);
        if(btnName=="LBtn"){
            if(isGameRuning==true){
                //输 从上往下 运动（插树的动画）    完成函数：添加旋转的树木
               ys["LTreeSpMc"].alpha=1;
               ys["LTreeSpMc"].y=224+ys["LTreeSpMc"].getHeight()/2;
                LTweenLite.to(ys["LTreeSpMc"],0.05,{y:650}).to(ys["LTreeSpMc"],0,{alpha:0,onComplete:treeAddSp});
            }
        }
        isBtnTweening=false;
    }

    //添加旋转的树木
    function treeAddSp(e){
       ys["LTreeSpMc"].alpha=1;
       ys["LTreeSpMc"].y=224+ys["LTreeSpMc"].getHeight()/2;

        var rotNum=parseInt(-rotateMc.rotate+90+180)%360;
        ETreeSp=sp("LTreeSp",true);
        ETreeSp.x = (502+70)*Math.cos(rotNum*Math.PI/180);
        ETreeSp.y = (502+70)*Math.sin(rotNum*Math.PI/180);
        ETreeSp.rotate=90+rotNum;
       allFSp.push(ETreeSp);
       rotateMc.addChild(ETreeSp);



        for(var i=0;i<rotateArr.length;i++){
            console.log(allFSp[i].name)
            var conorNum=(allFSp[i].name=="f"?10:5);
            if(Math.abs(rotNum-rotateArr[i])<conorNum){
                if(isGameRuning==true){
                    isGameRuning=false;
                }
                console.log("conorNum: "+conorNum," rotNum-rotateArr[i]: "+(rotNum-rotateArr[i]));
                LTweenLite.to(ETreeSp,0.2,{alpha:0}).to(ETreeSp,0.2,{alpha:1}).to(ETreeSp,0.2,{alpha:0}).to(ETreeSp,0.2,{alpha:1});
                //LGameOver();
                Game.stopGame()
                return;
            }
        }
       rotateArr.push(rotNum);

        //////////////////////////////////////////////////////////////////////////////////////////////   记录分数
        console.log("恭喜你，得分100分！");
        //@汤姆  游戏分数相加！  在你页面点击“勇夺高分”按钮，重新开始时，你需要初始化 分数=0；
        //htmlGameScore+=100;
        Game.currentGame.newScore+=100;
        Game.updateScore(true,100)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////// 倒计时结束，调用 游戏结束函数 LGameOver（）
    //游戏结束
    main.LGameOver=function(){
        if(isGameRuning==true){
            isGameRuning=false;
        }
        page["LTreeGame"].removeEventListener(LEvent.ENTER_FRAME,LTimeRun);
        //////////////////////////////////////////////////////////////////////////////////////////////   游戏结束时
        // @tom   显示HTML游戏结束 结果页
        setTimeout(function(e){
            console.log("GameOver：显示 游戏结果页 post数据");

            //不要在这里写任何数据交互，我的JS随时可能要换，请在以下函数里写
            //HtmlGameResult();
        },1000);
    }

    //以下是类库
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
       ys[pageName]=conSp;
        return conSp;
    }
    function bit(bitName){
        var bitmapdata = new LBitmapData(LImglist[bitName]);
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
       rotateArr[bitName+"Bit"]=bitmap;
        bitmap.name=bitName;
        //ys[bitName]=bitmap;
        return bitmap;
    }
    function sp(spName,isMoveCenter){
        var bitmapdata = new LBitmapData(LImglist[spName]);
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
       rotateArr[spName+"Sp"]=sprite;
        sprite.name=spName;
       ys[spName]=sprite;
        return sprite;
    }
})(window);