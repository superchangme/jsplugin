;$(function(){
        //header && footer ;fixme in backend
        $.ajax({
            url:"header.html",
            async:false,
            success:function(data){
                $(".main-wrap").before(data);

            }
        });

        $.ajax({
            url:"footer.html",
            async:false,
            success:function(data){
                $(".main-wrap").after(data);
            }
        });


        /*顶部促销更多详情按钮*/
        $("#topNewsBtn").bind("click",function(e){
            e.preventDefault();
            $("#topMoreNews").slideDown();
        });

        $("#topCloseBtn").bind("click",function(e){
            e.preventDefault();
            $("#topMoreNews").slideUp();
        });

        /*导航搜索按钮*/

        $('#headerNavSearch').bind("click",function(e){
            e.preventDefault();
            $(".header-nav ").addClass("open-search");
            $("#headerSearchSlide").show().animate({
                left:15},{
                easing: "easeInOutBounce",
                duration: 500,
                complete:function(){

                }
            });
        });

        $("#closeSearch").bind("click",function(e){
            e.preventDefault();
            $("#headerSearchSlide").animate({
                left:"100%"},{
                easing: "easeOutSine",
                duration: 500,
                complete:function(){
                    $("#headerSearchSlide").hide();
                    $(".header-nav ").removeClass("open-search");
                }
            });
        });

    /*返回按钮 点击返回当前页面*/
    $(".page-frame button").bind("click",function(){
        $("html").removeClass("open-slide");
        $(this).parents(".page-frame").animate({
            left:"100%"},{
            easing: "easeInOutBounce",
            duration: 500,
            complete:function(){
                $("#slideContainer,#slideMask").hide();
            }
        });
    });

    /*头部搜索按钮 点击滑出结果页面*/
    $("#topSearchBtn").bind("click",function(e){
        //e.preventDefault();
        $("#slideContainer,#slideMask").show();
        $("html").addClass("open-slide");

        var offset=$("#headerSearchSlide .container").offset(),
            left=$(window).width()>1280?offset.left+100:$(window).width()>1000?offset.left:0,
            width=$(window).width()-left;
        $("#searchSlide").width(width).show().animate({
            left:left},{
            easing: "easeInOutBounce",
            duration: 500,
            complete:function(){
            }
        });

        $(window).bind("resize",function(){
            var wt=$(window).width(),offset;
            if(wt<1000){
                    $("#searchSlide").css({"left":0,"width":"100%"});
            }else{
                offset=$("#headerSearchSlide .container").offset();
                if(wt<1280){
                    left=offset.left;
                }else{
                    left=offset.left+100;
                }
                $("#searchSlide").css({"left":left,"width":wt-left});
            }
        });
    });

        /* 选择送货*/
        $("#deliveryMenu").delegate("a","click",function(){
            var text=$(this).data("text");
            if(text){
                $("#deliveryText").text(text);
                //do sth in backend
                $(this).parent().addClass("active").siblings(".active").removeClass("active");
            }
        });


    /*----register modal && form check----*/

    window.checkRegForm=function(f){
        /*length will change?*/
        return $(f).data("pass");
    };

    $('#registerModal').one("form.tip",function(){
        //common form check
          $(this).find("form").checkForm();

        //custom check
       /* $(this).delegate("input[type=checkbox]").one("init",function(){
            $(this).data({
                "oTips": $(this).next(".tips").text()
            });
        }).trigger("init");*/


        $(this).delegate("input[type=username]","change",function(e){
                $.get("checkusername.action?username="+val,function(data){
                    if(data.isExist){
                        $(this).next(".tips").text("该用户名已被注册").end()
                            .parent("label").removeClass().addClass("warning");
                        $(this).data("isPass",fasle);
                    }else{
                        $(this).data("isPass",true);
                    }
                })
        });
    });

    $('#registerModal').on('show.bs.modal', function (e) {
        $('#registerModal') .trigger("form.tip");
    });

    /*----register modal && form check----*/
});

/* common function*/
function shuffle(arr){
    var f=arr.slice(0),r=[], i,l= f.length,w;
    for(var k=0;k<l;k++){
        i= Math.floor((Math.random()*f.length));
        w=f.splice(i,1).join("");
        r.push(w);
    }
    return r;
}

$.fn.checkForm=function(settings){
    settings = jQuery.extend({
        match: 'input.need-check',
        ignore:".custom-check",
        event: "change",
        element:null
    }, settings);

    if(typeof settings==="string"&& settings==="checkPass"){
        if(!$.fn.checkForm.isPass(this)){
            $(this).find(settings.match+":not("+settings.ignore+"):eq(0)").focus();
            return false;
        }
        return true;
    }

    $.fn.checkForm.commonCheck=function(o,p){
        var pattern=new RegExp($(o).data("pattern")),
            val=$(o).val(),
            equalName=$(o).data("equal"),
            equalEl=equalName?$(p).find("input[name="+equalName+"]"):null,
            tips=$(o).data("tips")?$(o).data("tips"):$(o).data("oldTips"),
            isPass=false;

        if($(o).val()===""){
            $(o).next(".tips").text($(o).data("oldTips")).
                parent("label").removeClass();
        }else{
            if(val.match(pattern)){
                isPass=true;
                $(o).parent("label").removeClass().addClass("success");
            } else{
                isPass=false;
                $(o).next(".tips").text(tips).end()
                    .parent("label").removeClass().addClass("warning");
            }

            if(equalEl&&equalEl.length&&equalEl.val()!=""){
                if(equalEl.val()!=val){
                    $.each([o,equalEl],function() {
                        $(o).next(".tips").text("两次输入不一致").end()
                            .parent("label").removeClass().addClass("warning");
                    });
                    isPass=false;
                }else{
                    if(isPass)
                        $(equalEl).parent("label").removeClass().addClass("success");
                }
            }
            $(o).data("isPass",isPass);
        }
    };

    $.fn.checkForm.isPass=function(o){
        var isPass=true;
        $(this).find(settings.match).each(function(){
            if($(this).data("isPass")){
                isPass=false;
                return ;
            }
        });
        return isPass;
    };

    return this.each(function(){
        var that=this;

        $(this).data("pass",false);

        $(this).find(settings.match).one("init",function(){
            $(this).data({
                "oldTips": $(this).next(".tips").text(),
                "isPass":false
            });
        }).trigger("init");
        $(this).delegate(settings.match+":not("+settings.ignore+")",settings.event,function(e){
            $.fn.checkForm.commonCheck(this,that);
        });


    });
}


