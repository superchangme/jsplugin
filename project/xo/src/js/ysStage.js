/**
 * ...
 * @author YS1984,QQ64780298,http://www.1984.com
 */

(function(window) {
    var ysStage={
        init:init,
        UrlSearch:UrlSearch
    };
    var windowHeight,windowWidth,gameHeight,gameWidth;
    function init(){
        //alert($(window).height());
        //document.documentElement.clientWidth>document.documentElement.clientHeight
        windowHeight=document.documentElement.clientHeight-100;//$(window).height();
        windowWidth=640//document.documentElement.clientWidth;//$(window).width();
        gameHeight=908;
        gameWidth=640;

        var minScale=1140/640;
        var maxScale=640/640;
        ysStage.hwScale=windowHeight/windowWidth;

        ysStage.windowHeight=windowHeight;
        ysStage.windowWidth=windowWidth;
        ysStage.gameHeight=gameHeight;
        ysStage.gameWidth=gameWidth;
        ysStage.wScale=windowWidth/gameWidth;
        ysStage.hScale=windowHeight/gameHeight;
        //alert(windowWidth);
    }
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
    window.ysStage=ysStage;
})(window);