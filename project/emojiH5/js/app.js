var APP=APP||{},jquery;
require(["jquery",'tomLib','iscroll-lite','fastclick','hammer','hammer.fake','hammer.showtouch','tomPlugin','Caman','jcanvas','jquery.eraser','slider'],function($,T,IScroll,Fastclick){
    Fastclick.attach(document.body);
    jquery=$;
    var originHeight=window.innerHeight;
    var waitLoad=$(".loading")
    //缩放页面
    function resetMeta(){
        console.log(window.innerWidth)
        var g=window.innerWidth,h=window.innerHeight,k;
        (g/h)>=320/504?k=h/1008:k=g/640;
        document.getElementById("eqMobileViewport").setAttribute("content","width=640,initial-scale="+k+",maximum-scale="+k+",user-scalable=no")
    }
    //全局对象APP
    var G=APP ;
    //app预设属性
    $.extend(G,{
        photoBg:$("#photoBg")[0],
        defaultPhotoSrc:"../img/emoji_photo_0.png",
        filterPhoto:null,
        pWidth:$("#photoFrame").width(),
        pHeight:$("#photoFrame").width(),
        initX:0,initY:0,
        transform: T.prefixStyle("transform"),
        emoji:{
            background:null,
            photo:null,
            photoWithErase:null
        },

        btns:{
            $nextStepBtn:$("a.next-step"),
            $backStepBtn:$("a.back-step") ,
            $resetEraser:$("#resetEraser")
        },
        stepLock:true,
        steps:$('[data-step]'),
        currentStep:"choose-emoji",
        currentStepDom:$("[data-step=choose-emoji]"),
        photoParam:{
            scale:1,
            x:0,
            y:0
        },
        textParam:{
            scale:1,
            x:null,
            y:0,
            rotate:0
        },
        photoArr:{
            uploadSrc:'',
            dragSrc:'',
            filterSrc:''
        },
        textStep:'',
        $mainStep:$(".main-step"),
        $textDefaultStep:$("[data-text-step=default]"),
        $hiddenOnInputDom:$(".op-box,.op-bar"),
        $emojiTextArea :$("#emojiTextArea"),
        $emojiTextList:$("#emoji-text-list"),
        $emojiList:$("#emoji-tpl-list"),
        $eraserCanvas:$("#eraserCanvas"),
        $resultCanvas:$("#resultCanvas"),
        $resultImg:$("#resultImg"),
        $photoFrame:$("#photoFrame"),
        $photoCanvas:$("#photoCanvas"),
        $filterCanvas:$("#filterCanvas"),
        $emojiCover:$("#emojiCover"),
        $emojiBg:$("#emojiBg"),
        $photoInput:$("#photoInput"),
        $uploadMask:$(".photo-input-box"),
        photoCrop:null,
        currentLayer:'photo',
        Eraser:null,
        //inputs
        $contrast:$("#contrast"),
        $exposure:$("#exposure"),
        LOCK_PAGE:false,
        //btns
        $backFilterBtn:$("#backFilterBtn"),
        $beginEraser:$("#beginEraser"),
        $backUserMoveBtn:$("#backUserMoveBtn"),
        eraserRadius:30,
        //functions
        stopUserMove:function(){
            //暂停用户手势修改照片响应
            G.$photoFrame.hammer('stop')
            G.stopMove=true;
        },
        startUserMove:function(){
            //恢复用户手势
            G.$photoFrame.hammer('start');
            G.$photoCanvas.removeLayer("filter").removeLayer("mask").drawLayers();
            G.stopMove=false;
        },
        startErase:function(cb){
            //启用橡皮擦
            G.stopUserMove();
            G.emoji.photo=G.$photoCanvas[0].toDataURL("image/png");
            G.eraseCtx.lineWidth= G.eraserRadius;
            G.eraseCtx.globalCompositeOperation="source-over";
            var img=new Image;
            G.eraseCtx.clearRect(0,0, G.pWidth, G.pHeight);
            img.onload=function(){
                G.$photoCanvas.hide();
                G.$eraserCanvas.show();
                G.eraseCtx.drawImage(img,0,0)
                G.$eraserCanvas.eraser("start");
                if(cb){cb()}
            }
            img.src= G.emoji.photo;
        },resetErase:function(){
            //重置橡皮擦回到擦前
            drawPhoto(0,0,1,null,function(){
                G.$photoCanvas.show();
                G.$eraserCanvas.hide();
            });
        },
        resetPhotoConfig:function(){
            //重设照片参数//-
            G.photoParam.x=0;
            G.photoParam.y=0;
            G.photoParam.scale=1;
            G.photoParam.rotate=0;
        },
        //表情滑动列表和文字滑动列表
        scroll:{
            emojiListScroll:null,
            emojiTextScroll:null
        }
    })

    $(function(){
        resetMeta();
        //底部提示按钮点击事件
        $(".btn-tip").on("click",function(){
            var modal=$(this).data("modal-dom");
            if(modal){
                modal.addClass("in")
            }else{
                modal=$($(this).data("modal"));
                modal.addClass("in")
                $(this).data("modal-dom",modal)
            }
        })
        //提示弹窗点击事件
        $(".modal").on("click",function(){
            var last=$(this).find(".step:last"),span=$(this).find(".step.in");
            if(last.is(".in")){
                $(this).removeClass("in")
                last.removeClass("in")
                $(this).find(".step:first").addClass("in")
            }else{
                if(span.length){
                    span.removeClass("in").next().addClass("in")
                }else{
                    $(this).removeClass("in")
                }
            }
        })
        //camanjs库 自定义滤镜效果，把偏亮色的置为透明 ，这样可以留下脸部细节 (认为脸部是深色的前提下)
        Caman.Filter.register("transparent", function (adjust) {
            // Pre-calculate some values that will be used
            // Our process function that will be called for each pixel.
            // Note that we pass the name of the filter as the first argument.
            return this.process("transparent", function (rgba) {
                if(rgba.r>adjust&&rgba.g>adjust&&rgba.b>adjust){
                    rgba.a=0;
                }
                // Return the modified RGB values
                return rgba;
            });
        });
      //初始化canvas画布尺寸
        G.$photoFrame.find("canvas").prop({width: G.pWidth,height: G.pWidth});
        //判断原始高度大于504的情况，把表情制作画布放大
        if(originHeight>=504){
           setTimeout(function(){
               var frameHeight=$(".main-box").height()-20;
               G.$mainStep.css("top",frameHeight- G.$mainStep.height()+20)
               G.photoScale=(Math.min(600,Math.min($("#photoInnerBox").width(),frameHeight))/400);
               G.$photoFrame.find(".frame-inner").css(G.transform,"scale("+G.photoScale+")").addClass("visible")
               G.$uploadMask.find(".photo-input-mask").css(G.transform,"scale("+G.photoScale+")")

           },0)
        }

        setTimeout(function(){
            //初始化橡皮擦
            //step eraser
            G.$eraserCanvas.eraser({scaleCanvas: G.photoScale,radius:15,container: G.$photoFrame,bindContainer:true,customCanvas:G.$eraserCanvas[0],noneedCalc:true,every:true,touchEndCb:function(){
            }}).eraser('stop')
        },0)

        G.eraseCtx=G.$eraserCanvas[0].getContext("2d");
        G.photoCtx=G.$photoCanvas[0].getContext("2d");
        //step0
        function init(){
            //重擦按钮
            G.btns.$resetEraser.on("click",function(){
                G.startErase();
            })
            //下一步按钮
            G.btns.$nextStepBtn.on("click",function(){
                if(G.isBusyWork){
                    return
                }
                var work;
                if($(this).is("[disabled]")){
                    return;
                }
                if(checkIsLock()){
                    showTips();
                    return;
                }
                switch(G.currentStep){
                    case "choose-emoji":
//                       updateStep('text-emoji');
                        work=new WorkMan("加载滤镜效果",updateStep.bind(null,'filter-emoji'));
                        loadFilter(G.$photoCanvas[0].toDataURL("image/png"),work);
                        break;
                    case "filter-emoji":
                        work=new WorkMan("添加橡皮�?");
                        G.startErase(function(){
                            updateStep('erase-emoji');
                            work.resolve();
                        });
                        break;
                    case "erase-emoji":
                        G.emoji.photoWithErase=G.$eraserCanvas[0].toDataURL("image/png");
                        updateStep('text-emoji');
                        G.stepLock=true;
                        G.$eraserCanvas.eraser("stop");
                        break;
                    case 'text-emoji':
                        updateStep('confirm-emoji');
                        setcookie("emojiModalTip","yes")
                        if(G.textStep=='move-text'){
                            $(document.body).addClass("result")
                            G.$resultImg.show()
                            G.$resultImg.attr("src",G.$resultCanvas[0].toDataURL('image/png'));
                            updateStep('confirm-emoji')
                        }else{
                            work=new WorkMan("生成�?终效�?",updateStep.bind(null,'confirm-emoji'));
                            drawResult(function(){
                                work.resolve();
                                $(document.body).addClass("result")
                                G.$resultImg.show()
                                G.$resultImg.attr("src",G.$resultCanvas[0].toDataURL('image/png'));
                                G.$resultImg.show();
                            });
                        }
                        break;
                    case 'confirm-emoji':
                        sendFile({imageData:G.$resultCanvas[0].toDataURL("image/png"),filetype:"png"});
                }
            })
            //上一步按钮a
            G.btns.$backStepBtn.on("click",function(){
                if(G.isBusyWork){
                    return
                }
                if($(this).is("[disabled]")){
                    return;
                }
                G.stepLock=false;
                switch(G.currentStep){
                    case "choose-emoji":
                        $(this).attr("disabled",true);
                        G.$photoCanvas.removeLayers().drawLayers();
                        //G.$uploadMask.show();
                        G.emoji.photo='';
                        break;
                    case "filter-emoji":
                        updateStep('choose-emoji');
                        drawPhoto(G.initX, G.initY, G.scale,null,function(){
                            G.$photoCanvas.animateLayer(G.currentLayer,G.photoParam,0)
                            G.startUserMove();
                        })
                        break;
                    case "erase-emoji":
                        updateStep('filter-emoji');
                        G.$eraserCanvas.eraser("stop");
                        G.$photoCanvas.show();
                        G.$eraserCanvas.hide();
                        break;
                    case 'text-emoji':
                        G.$textDefaultStep.show().siblings("[data-text-step]").hide();
                        G.$resultCanvas.hide()
                        G.$photoCanvas.show();
                        G.textStep='default'
                        G.textParam={scale:1,x:null,y:0,rotate:0};
                        G.$resultCanvas.hammer('reset')
                        updateStep('erase-emoji');
                        G.startErase();
                        break;
                    case 'confirm-emoji' :
                        $(document.body).removeClass("result")
                        //G.emoji.text='';
                        //G.$emojiTextArea.val('');
                        //G.stepLock=true;
                        G.$resultImg.hide();
                        updateStep('text-emoji');
                        break;
                }
            });
            G.scroll.emojiListScroll=new IScroll('#emoji-tpl-list', {
                //click:iScrollClick(),
                preventDefault:false,
                preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT|A)/},
                scrollbars: true,
                mouseWheel: true,
                scrollX: true, scrollY: false,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });
            G.scroll.emojiTextScroll=new IScroll('#emoji-text-list', {
                //click:iScrollClick(),
                preventDefault:false,
                preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT|A)/},
                scrollbars: true,
                mouseWheel: true,
                scrollX: true, scrollY: false,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });
            //上传按钮点击提示

            G.$photoInput.on("click",function(e){
                if(!G.emoji.mask){
                    e.preventDefault();
                }
            })
            G.$uploadMask.on("click",function(){
                if(!G.emoji.mask){
                    showTips(G.$emojiList.find(".step-tip"))
                }
            })
            G.$emojiList.delegate("img","click",function(){
                G.$photoInput.removeAttr("disabled")
                G.$emojiList.find(".step-tip").addClass("ok")
                G.emoji.mask=this.src.replace("thumb","mask");
                G.$emojiCover.css("background","url("+G.emoji.mask+")")
                if($(this).parent("li").data("bg")){
                    G.emoji.background=this.src.replace("thumb","bg");
                    G.$emojiBg.css("background","url("+G.emoji.background+")");
                }else{
                    G.$emojiBg.css("background",'');
                    G.emoji.background=null;
                }
                if($(this).parent("li").data("photo")){
                    G.photoBg.src=this.src.replace("thumb","photo");
                }else{
                    G.photoBg.src=G.defaultPhotoSrc;
                }
                if(!G.emoji.background){
                    G.emoji.background="../img/emoji_bg_white.png";
                }
                /*G.$photoCanvas.drawImage({
                 source:  this,
                 groups:['emojiGroup'],
                 layer:true,
                 name:'emoji',
                 x:0,y:0,
                 fromCenter:0
                 }).moveLayer('emoji',0)*/
            })
            G.$emojiList.find("li:eq(0) img").trigger("click")
            G.$emojiTextList.delegate(".item","click",function(){
                var val=$.trim($(this).find(".v-table-cell").html().replace("<br>","\n"));
                G.$emojiTextArea.val(val)
                var r=getLineNum(G.$emojiTextArea,2),oldVal=$(this).data("oldVal");
                if(r.limit){
                    $(this).val(oldVal)
                }else{
                    if(r.lineNum==2){
                        G.$emojiTextArea.data("oldVal",val).css("line-height",'54px');
                    }else{
                        G.$emojiTextArea.css("line-height",'');
                    }
                }
                G.$emojiTextArea.trigger("change")
            });
            G.$photoFrame.hammer({
                gestureCb:function(o){
                    if(G.stopMove){return}
                    if(o.x!=null){
                        o.x+= G.initX;
                        o.y+= G.initY;
                    }
                    $.extend(G.photoParam, o)
                    G.$photoCanvas.animateLayer(G.currentLayer,G.photoParam,0)
                }
            });
            G.$resultCanvas.hammer({
                gestureCb:function(o){
                    if(o.x!=null){
                        o.x+= G.textX;
                        o.y+= G.textY;
                    }
                    $.extend(G.textParam, o)
                    G.$resultCanvas.animateLayer("text",G.textParam,0)
                }
            })
            $(document).one("moveInput",function(){
                G.$photoInput.appendTo(G.currentStepDom.find(".back-step"));
            })
            G.photoCrop= T.cropImage({
                bindFile:$("#photoInput"),
                cropWidth: G.pWidth/window.devicePixelRatio,
                cropHeight: G.pHeight/window.devicePixelRatio,
                oninit:function(){
                },
                onLoad:function(data){
                    updateStep("drag-emoji")
                    G.$uploadMask.hide().addClass("wait");
                    $(document).trigger("moveInput");
                    G.btns.$backStepBtn.removeAttr("disabled")
                    G.resetPhotoConfig();
                    G.emoji.photo=data.originSrc;
                    var work=new WorkMan("初始化照�?");
                    G.photoParam.width=data.dWidth;
                    G.photoParam.height=data.dHeight;
                    /*        var imInfo=G.photoCrop.getCropInfo()
                     G.photoParam.width=imInfo.dWidth;
                     G.photoParam.height=imInfo.dHeight;*/
                    drawPhoto(data.x,data.y,null,null,function(){
                        work.resolve();
                    })
                }
            });
            $(".radio-box").on("click",function(){
                var work=new WorkMan("调整滤镜效果");
                $(this).addClass("in").siblings().removeClass("in")
                G.$contrast.val($(this).data("val"));
                filterCanton(work);
            })
            $(".adjust-input").on("change",filterCanton)
            //加载滤镜
            //step
            $("#filterBtn").on("click",function(){
                loadFilter(G.$photoCanvas[0].toDataURL("image/png"))
            })
            $('[data-switch]').on("click",function(){
                var type=$(this).data('switch'),step=$("[data-text-step="+type+']');
                if(type== G.textStep){
                    return;
                }
                step.show();
                step.siblings("[data-text-step]").hide();
                if(type=="default"){
                    G.$resultCanvas.hide()
                    G.$eraserCanvas.show();
                    G.textStep='default'
                    G.textParam={scale:1,x:null,y:0,rotate:0};
                    G.$resultCanvas.hammer('reset')
                }else{
                    work=new WorkMan("拖拽文字");
                    G.textStep='move-text'
                    drawResult(function(){
                        work.resolve();
                        G.$resultCanvas.show()
                        G.$eraserCanvas.hide();
                    });
                }
            })

            //btns bind
            G.$backFilterBtn.on("click",function(){
                drawPhoto(0,0,1);
            })
            G.$beginEraser.on("click",function(){
                G.startErase();
            })
            G.$backUserMoveBtn.on("click",function(){
                G.startUserMove();
            })
            $(document).on("change",'input[type=range]',function(){
                $(this).siblings(".info-line").find(".output").html($(this).val())
                if($(this).is("#eraserRange")){
                    G.$eraserCanvas[0].getContext("2d").lineWidth=$(this).val();
                }
            })
            $(document).on("input","#emojiTextArea",function(){

                var r=getLineNum(this,2),oldVal=$(this).data("oldVal");
                if(r.limit){
                    $(this).val(oldVal)
                }else{
                    if(r.lineNum==2){
                        $(this).data("oldVal",$(this).val()).css("line-height",'60px');
                    }else{
                        $(this).css("line-height",'');
                    }
                }
            })

            G.$emojiTextArea.on("focus",function(){
                G.$hiddenOnInputDom.hide();
            }).on("blur",function(){
                G.$hiddenOnInputDom.show();
            }).on("change",function(){
                if($(this).val()==""){
                    $('[data-switch=move-text]').hide();
                }else{
                    $('[data-switch=move-text]').show();
                }
            })

            ;(function(){
                $(".app-wrap").addClass("in")
                $(".loading").addClass("hidden").removeClass('first')
                var img=new Image;
                G.$emojiList.find("img").each(function(){
                    var mask=this.src.replace("thumb","mask");
                    var bg= this.src.replace("thumb","bg");
                    var photo= this.src.replace("thumb","photo");
                    img.src=mask;
                    if($(this).parent("li").data("bg")) {
                        img.src=bg;
                    }
                    if($(this).parent("li").data("photo")) {
                        img.src=photo;
                    }
                })
                img.src= G.defaultPhotoSrc;
                img=null
                for(var scrollName in G.scroll){
                    G.scroll[scrollName].refresh();
                }
            })();

        }


        //step2

        function WorkMan(tips,cb,errcb){
            G.isBusyWork=true;
            var work= $.Deferred(),tips=tips||"";
            waitLoad.removeClass("hidden");
            work.done(function(data){
                G.isBusyWork=false;
                if(typeof cb==="function"){cb(data);}
                waitLoad.addClass("hidden");
            });
            work.fail(function(err){
                if(typeof errcb=="function"){
                    errcb(err);
                }
                else{
                    alert('出错咯，再试�?次吧!')
                }
                G.isBusyWork=false;
//               waitLoad.removeClass("open");
            } );
            return work;
        }
        //draw result生成表情结果
        //共四层
        //1背景层 2用户制作层 3遮罩层 4文字层
        function drawResult(cb,final){

            G.$resultCanvas.removeLayers()[0].getContext("2d").clearRect(0,0, G.pWidth, G.pHeight) ;
            G.$resultCanvas.drawRect({
                fillStyle:"#fff",
                fromCenter:false,
                width: G.pWidth,
                height: G.pHeight,
                x:0,y:0
            })
               //背景层
            if(G.emoji.background){
                G.$resultCanvas.
                    drawImage({
                        source: G.emoji.background,
                        layer:true,
                        name:"photoBg",
                        x:0,y:0,width: G.pWidth,
                        height: G.pHeight , fromCenter:false ,load:function(){
                            drawExceptBg(cb);
                        }
                    });
            }else{
                drawExceptBg(cb);
            }
        }

        function drawExceptBg(cb){
            var one=false,two=false
            //用户制作表情层
            G.$resultCanvas. drawImage({
                source: G.emoji.photoWithErase,
                layer:true,
                name:"photo",
                x:0,y:0,width: G.pWidth,
                height: G.pHeight , fromCenter:false,load:function(){
                    if(one==false){
                        one=true;
                        //表情遮罩层
                        G.$resultCanvas.drawImage({
                            source: G.emoji.mask,
                            layer:true,
                            name:"photoMask",
                            x:0,y:0,width: G.pWidth,
                            height: G.pHeight , fromCenter:false,load:function(){
                                if(two==false){
                                    two=true;
                                    if(G.textParam.x==null){
                                        G.textX=G.pWidth/2;
                                        G.textY=G.pHeight-55;
                                        G.textParam.x= G.textX;
                                        G.textParam.y= G.textY;
                                    }
                                    //表情文字
                                    G.$resultCanvas.drawText(
                                        {
                                            text: G.emoji.text,
                                            layer:true,
                                            name:"text",
                                            scale: G.textParam.scale,
                                            fillStyle: '#000',
                                            fontStyle: 'bold',
                                            rotate: G.textParam.rotate,
                                            fromCenter:true,
                                            fontSize: (G.emoji.textLineNum==2?0.8:1)*parseInt(G.$emojiTextArea.css("font-size"))+"px",
                                            fontFamily:G.$emojiTextArea.css("font-family") ,
                                            x: G.textParam.x ,y: G.textParam.y,
                                            width: G.pWidth,height:120,maxWidth: G.pWidth,lineHeight:"1.2"
                                        }
                                    );
                                    if(cb){
                                        cb();
                                    }
                                }
                            }
                        })
                    }

                }
            })
        }
//draw photo
        //用户照片生成到canvas
        function drawPhoto(x,y,scale,noLayer,cb){
            G.initX=x||0;
            G.initY=y||0;
            G.scale=scale||1;
            var one=true;
            G.$photoCanvas.drawImage(
                {
                    source: G.emoji.photo,
                    groups:['emojiGroup'],
                    layer:!noLayer,
                    name:'photo',
                    x: x,
                    y: y,
                    fromCenter: false,
                    width: G.photoParam.width,
                    height: G.photoParam.height ,
                    load:function(){
                        if(one){
                            one=false;
                            if(cb){
                                cb();
                            }
                        }
                    }
                }
            ).restoreCanvas();
            G.$photoFrame.hammer('reset')
        }
        function drawFilter(cb){
            //drawMask();
            G.$photoCanvas.removeLayer("photo").removeLayer("filter").drawImage(
                {
                    source: G. filterSrc,
                    groups:['emojiGroup'],
                    layer:true,
                    name:'filter',
                    x:0,y:0,
                    fromCenter: false,
                    width: G.pWidth,
                    height: G.pHeight,
                    load:function(){
                        if(typeof cb=="function"){
                            cb()
                        }
                    }
                }
            ).drawLayers().restoreCanvas()
        }
        function drawMask(){
            G.$photoCanvas.drawRect({
                fillStyle: '#fff',
                x: 0, y: 0,
                layer:true,
                name:"mask",
                groups:['emojiGroup'],
                width: G.pWidth*2,
                height: G.pHeight*2
            }).restoreCanvas()
        }
//drawMaskLayer
        //执行滤镜效果
        function loadFilter(img,work){
            var defer= $.Deferred();
            G.$filterCanvas.removeAttr("data-caman-id");
            G.filterPhoto=Caman("#"+G.$filterCanvas.prop("id"), img,function(){
                console.time("t")
                defer.resolve();
            });
            defer.done(function(){
                console.timeEnd("t")
                filterCanton(work);
            })
        }
        //表情滤镜代码d
        //参考链接
        //http://camanjs.com/
        function filterCanton(work){
            if(G.filterPhoto){
                G.stopUserMove();
//               G.$loading.show()
                G.filterPhoto.revert();
//               $("#transparentV").text($transparent.val())
                // 亮度 对比度    以及自定义过滤透明像素  180表示
                G.filterPhoto.brightness(5).saturation(-100).
                    contrast(parseFloat(G.$contrast.val()))./*.sharpen(6)*/
                    exposure(parseFloat(G.$exposure.val())).transparent(180).render(function(){
//                           G.$loading.hide()
                        G.filterSrc= G.$filterCanvas[0].toDataURL("image/png")
                        drawFilter(function(){
                            G.$photoCanvas.animateLayer("filter",{},0);
                            if(work&&typeof work.resolve=="function"){
                                work.resolve();
                            }
                        });
                    });
            }
        }
        //执行下一步逻辑代码
        function updateStep(step){
            var title;
            if(step!="drag-emoji"){
                //非拖拽更新UI, 因为拖拽和choose-emoji公用了样式
                G.currentStepDom.hide();
                G.currentStepDom.removeClass("in")
                G.currentStepDom= G.steps.filter('[data-step='+step+']:not(.wait)').show();
                G.currentStep=step;
                if(step!='choose-emoji'){
                    G.currentStepDom.addClass("in")
                }
                //刷新滚动列表
                for(var scrollName in G.scroll){
                    G.scroll[scrollName].refresh();
                }
            }else{
                G.currentStepDom.addClass("in")
            }
            needTipStep=G.currentStepDom.filter('.in[data-modal]:not(.tiped)')
            if(needTipStep.length&&!getcookie("emojiModalTip")){
                $(needTipStep.data("modal")).addClass("in");
                needTipStep.addClass("tiped")
            }
            switch(step){
                case "choose-emoji":
                    title='选择表情';break;
                case "drag-emoji":
                    title="调整位置";break;
                case "filter-emoji":
                    title=" 滤镜调节";break;
                case 'erase-emoji':
                    title='把多余的擦掉';break;
                case 'text-emoji':
                    title='添加文字';break;
                case 'confirm-emoji':
                    title='确认提交';break;
            }
            //更新标题
            document.title=title;
        }
        //检查是否可以进行下一步j
        function checkIsLock(){
            switch (G.currentStep){
                case "choose-emoji":
                    //选择表情进行下一步需满足已选表情照片
                    if(G.emoji.photo&& G.emoji.mask){
                        G.stepLock=false;
                    }
                    break;
                case "text-emoji":
                    if(G.emoji.text){
                        G.stepLock=false;
                    }
                    break;
            }
            return G.stepLock;
        }
        //显示用户操作提示
        function showTips(dom){
            dom=dom||[]
            if(dom.length==0){
                G.currentStepDom.each(function(){
                    dom=$.makeArray(dom,$(this).find(".step-tip:not(.ok)"))
                })
            }
            var delay=0;
            dom.each(function(index,item){
                T.animateGroup({group: $(item),waitTime:delay,frameClass:["tip-now"],duration:1000,loopTimes:1})
                delay+=700;
            })
        }
        //initialize
        init();
        //滤镜调节滑块初始化c
        $("[data-rangeslider]").rangeslider({

            // Deactivate the feature detection
            polyfill: false,

            // Callback function
            onInit: function() {},

            // Callback function
            onSlide: function(position, value) {
//               console.log('onSlide');
//               console.log('position: ' + position, 'value: ' + value);
            },

            // Callback function
            onSlideEnd: function(position, value) {
                // console.log('onSlideEnd');
                //console.log('position: ' + position, 'value: ' + value);
            }
        });

        //限制表情文本输入，并增加换行功能
        function getLineNum(dom,lineNum){
            var text=$(dom).val(),lineHeight=$(dom).css("line-height"),width=$(dom).width(),fontSize=$(dom).css("font-size"),fontFa=$(dom).css("font-family");;
            var $text=$("<div style='position: absolute;height:0;width: 0;'><div></div></div>"),textnum= 1,temp="",$textarea;
            $text.find("div").css({
                position:"relative",
                opacity: 0,
                "font-size":fontSize,
                "font-family":fontFa,
                "word-break": "break-all",
                "line-height": lineHeight,
                width:width
            });
            $text.appendTo($("body"))
            $textarea=$text.find("div");
            for(var i= 0,l=text.length;i<l;i++){
                temp+=text[i];
                $textarea.html(temp)
                if(Math.ceil($textarea.height()/parseInt(lineHeight))>textnum){
                    textnum+=1;
                    temp=temp.replace(/(.$)/,"\n$1")
                }
            }
//            textnum=Math.ceil($text.find("div").height()/parseInt(lineHeight));
            $text.remove();
            G.emoji.text=temp;
            G.emoji.textLineNum=textnum;
            return {limit:textnum >lineNum,lineNum:textnum}
        }
        /*function getLineNum(text,num,line) {
         num = num||20 ;
         var total = 0,ntext='';
         for (var i = 0, l = text.length; i < l; i++) {
         total++
         if(text[i].charCodeAt(0)>255){
         total++;
         }
         if(Math.ceil(total/num)<=line){
         ntext+=text[i] ;
         }
         }
         return {ntext:ntext,lineNum:Math.ceil(total/num)};
         }*/
    })

})

function setcookie(name,value){
    var Days = 30;
    var exp  = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


function getcookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null){
        return (arr[2]);
    }else{
        return "";
    }
}


function delcookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 3600);
    var cval=getcookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
