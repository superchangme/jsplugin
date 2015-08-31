var G,jquery;
require(["jquery",'tomLib','iscroll-lite','hammer','hammer.fake','hammer.showtouch','tomPlugin','Caman','jcanvas','jquery.eraser','slider'],function($,T,IScroll){
    jquery=$;
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
    //step1 上传图片
    G={
        filterPhoto:null,
        pWidth:400,
        pHeight:400,
        initX:0,initY:0,
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
        photoArr:{
            uploadSrc:'',
            dragSrc:'',
            filterSrc:''
        },
        $emojiTextArea :$("#emojiTextArea"),
        $emojiTextList:$("#emoji-text-list"),
        $emojiList:$("#emoji-tpl-list"),
        $eraserCanvas:$("#eraserCanvas"),
        $resultCanvas:$("#resultCanvas"),
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
            G.$photoFrame.hammer('stop')
            G.stopMove=true;
        },
        startUserMove:function(){
            G.$photoFrame.hammer('start');
            G.$photoCanvas.removeLayer("filter").removeLayer("mask").drawLayers();
            G.stopMove=false;
        },
        startErase:function(cb){
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
            drawPhoto(0,0,1,null,function(){
                G.$photoCanvas.show();
                G.$eraserCanvas.hide();
            });
        },
        resetPhotoConfig:function(){
            G.photoParam.x=0;
            G.photoParam.y=0;
            G.photoParam.scale=1;
        },
        scroll:{
            emojiListScroll:null,
            emojiTextScroll:null
        }
    }
    G.eraseCtx=G.$eraserCanvas[0].getContext("2d");
    G.photoCtx=G.$photoCanvas[0].getContext("2d");
    //step0
    function init(){
        G.btns.$resetEraser.on("click",function(){
            G.startErase();
        })
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
                    G.startErase(updateStep.bind(null,'erase-emoji'));
                    break;
                case "erase-emoji":
                    G.emoji.photoWithErase=G.$eraserCanvas[0].toDataURL("image/png");
                    updateStep('text-emoji');
                    G.stepLock=true;
                    G.$eraserCanvas.eraser("stop");
                    break;
                case 'text-emoji':
                    updateStep('confirm-emoji');
                    work=new WorkMan("生成最终效果",updateStep.bind(null,'confirm-emoji'));
                    drawResult(function(){
                        work.resolve();
                        G.$resultCanvas.show();
                        G.$photoCanvas.hide();
                    });
                    break;
                case 'confirm-emoji':
                    sendFile({imageData:G.$resultCanvas[0].toDataURL("image/png").substring(22),filetype:"png"});
            }
        })
        //soga step
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
                    G.$photoCanvas.removeLayers();
                    G.$uploadMask.show();
                    G.emoji.photo='';
                    break;
                case "filter-emoji":
                    updateStep('choose-emoji');
                    G.startUserMove();
                    break;
                case "erase-emoji":
                    updateStep('filter-emoji');
                    G.$eraserCanvas.eraser("stop");
                    G.$photoCanvas.show();
                    G.$eraserCanvas.hide();
                    break;
                case 'text-emoji':
                    updateStep('erase-emoji');
                    G.startErase();
                    break;
                case 'confirm-emoji' :
                    G.emoji.text='';
                    G.$emojiTextArea.val('');
                    G.stepLock=true;
                    G.$eraserCanvas.show();
                    G.$resultCanvas.hide();
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
            if(!G.emoji.background){
                e.preventDefault();
            }
        })
        G.$uploadMask.on("click",function(){
            if(!G.emoji.background){
                showTips(G.$emojiList.find(".step-tip"))
            }
        })
        G.$emojiList.delegate("img","click",function(){
            G.$photoInput.removeAttr("disabled")
            G.$emojiList.find(".step-tip").addClass("ok")
            G.emoji.mask=this.src.replace("thumb","mask");
            G.emoji.background=this.src.replace("thumb","bg")
            G.$emojiCover.css("background","url("+G.emoji.mask+")")
            G.$emojiBg.css("background","url("+G.emoji.background+")")
            /*G.$photoCanvas.drawImage({
             source:  this,
             groups:['emojiGroup'],
             layer:true,
             name:'emoji',
             x:0,y:0,
             fromCenter:0
             }).moveLayer('emoji',0)*/
        })
        G.$emojiTextList.delegate(".item","click",function(){
            var val=$.trim($(this).html().replace("<br>","\n"));
            G.$emojiTextArea.val(val)
            var r=getLineNum(G.$emojiTextArea,2),oldVal=$(this).data("oldVal");
            if(r.limit){
                $(this).val(oldVal)
            }else{
                if(r.lineNum==2){
                    G.$emojiTextArea.data("oldVal",val).css("line-height",'60px');
                }else{
                    G.$emojiTextArea.css("line-height",'');
                }
            }
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
        G.photoCrop= T.cropImage({
            bindFile:$("#photoInput"),
            cropWidth: G.pWidth/window.devicePixelRatio,
            cropHeight: G.pHeight/window.devicePixelRatio,
            oninit:function(){
            },
            onLoad:function(data){
                updateStep("drag-emoji")
                G.$uploadMask.hide().addClass("wait");
                G.btns.$backStepBtn.removeAttr("disabled")
                G.resetPhotoConfig();
                G.emoji.photo=data.originSrc;
                var work=new WorkMan("初始化照片");
                var imInfo=G.photoCrop.getCropInfo()
                G.photoParam.width=imInfo.dWidth;
                G.photoParam.height=imInfo.dHeight;
                drawPhoto(imInfo.x,imInfo.y,null,null,function(){
                    work.resolve();
                })
            }
        });

        $(".adjust-input").on("change",filterCanton)
        //加载滤镜
        //step
        $("#filterBtn").on("click",function(){
            loadFilter(G.$photoCanvas[0].toDataURL("image/png"))
        })
        //step eraser
        G.$eraserCanvas.eraser({radius:15,container: G.$photoFrame,bindContainer:true,customCanvas:G.$eraserCanvas[0],noneedCalc:true,every:true,touchEndCb:function(){
        }}).eraser('stop')
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
    }

    //step2

    function WorkMan(tips,cb,errcb){
        G.isBusyWork=true;
        var work= $.Deferred(),tips=tips||"";
//           waitLoad.addClass("open");
        work.done(function(data){
            G.isBusyWork=false;
            if(typeof cb==="function"){cb(data);}
//               waitLoad.removeClass("open");
        });
        work.fail(function(err){
            if(typeof errcb=="function"){
                errcb(err);
            }
            else{
                alert('出错咯，再试一次吧!')
            }
            G.isBusyWork=false;
//               waitLoad.removeClass("open");
        } );
        return work;
    }
    //draw result
    function drawResult(cb){
        G.$resultCanvas.removeLayers()  .
            drawImage({
                source: G.emoji.background,
                layer:true,
                name:"photoBg",
                x:0,y:0,width: G.pWidth,
                height: G.pHeight , fromCenter:false
            }).drawImage({
                source: G.emoji.photoWithErase,
                layer:true,
                name:"photo",
                x:0,y:0,width: G.pWidth,
                height: G.pHeight , fromCenter:false,load:function(){
                    if(cb){
                        cb();
                    }
                }
            }).
            drawImage({
                source: G.emoji.mask,
                layer:true,
                name:"photoMask",
                x:0,y:0,width: G.pWidth,
                height: G.pHeight , fromCenter:false
            }).drawText(
            {
                text: G.emoji.text,
                layer:true,
                name:"text",
                fillStyle: '#000',
                fontStyle: 'bold',
                fromCenter:true,
                fontSize: G.$emojiTextArea.css("font-size"),
                fontFamily:G.$emojiTextArea.css("font-family") ,
                x:200,y:345,
                width:400,height:120,maxWidth: 400,lineHeight:"1.2"
            }
        ).drawLayers();
    }
//draw photo
    function drawPhoto(x,y,scale,noLayer,cb){
        G.initX=x||0;
        G.initY=y||0;
        G.scale=scale||1;
        G.$photoCanvas.removeLayer("mask").drawImage(
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
                    if(cb){
                        cb();
                    }
                }
            }
        ).restoreCanvas();
        G.$photoFrame.hammer('reset')
    }
    function drawFilter(cb){
        drawMask();
        G.$photoCanvas.removeLayer("filter").drawImage(
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
        ).restoreCanvas()
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
    //滤镜
    function filterCanton(work){
        if(G.filterPhoto){
            G.stopUserMove();
//               G.$loading.show()
            G.filterPhoto.revert();
//               $("#transparentV").text($transparent.val())
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
    //前进后退
    function updateStep(step){
        var title;
        if(step!="drag-emoji"){
            G.currentStepDom.hide();
            G.currentStepDom= G.steps.filter('[data-step='+step+']:not(.wait)').show();
            G.currentStep=step;
            for(var scrollName in G.scroll){
                G.scroll[scrollName].refresh();
            }
        }
        switch(step){
            case "choose-emoji":
                title='选择表情';break;
            case "drag-emoji":
                title="调整位置";break;
            case "filter-emoji":
                title="加滤镜";break;
            case 'erase-emoji':
                title='擦一擦';break;
            case 'text-emoji':
                title='添加文字';break;
            case 'confirm-emoji':
                title='确认提交';break;
        }
        document.title=title;
    }
    function checkIsLock(){
        switch (G.currentStep){
            case "choose-emoji":
                if(G.emoji.photo&& G.emoji.background){
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
