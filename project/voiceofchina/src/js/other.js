$(document).ready(function(){
    // 放大元素,按照320x504定位,按比例scale
    function scaleEle(selector,position){
        var pageScale;
        var currentScale=screenWidth/screenHeight;
        var originScale=640/1136;
        if(currentScale>originScale){
            pageScale=screenHeight/1136;
        }else{
            pageScale=screenWidth/640;
        }
        $(selector).css({"-webkit-transform-origin":position,"transform-origin":position,"-webkit-transform":"scale("+pageScale+");","transform":"scale("+pageScale+");"});
    }

    var screenHeight = document.documentElement.clientHeight,
        screenWidth = document.documentElement.clientWidth;

    scaleEle(".screen__inner","center top");
});