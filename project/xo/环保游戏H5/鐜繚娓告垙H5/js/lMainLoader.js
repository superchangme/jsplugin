/**
 * ...
 * @author YS1984,QQ64780298,http://www.1984.com
 */

(function(window) {
    var lMainLoader={init:init};
    window.lMainLoader=lMainLoader;
    var picVar="20151011a";
    var loadData = [
        //{path:"img/LBg.jpg"+"?picVar="+picVar,name:"LBg", x:184, y:0, parent:"LTreeGame"},
        {path:"img/LEF3.png"+"?picVar="+picVar,name:"LEF3", x:647, y:910, parent:"nullMC"},
        {path:"img/LEF2.png"+"?picVar="+picVar,name:"LEF2", x:529, y:837, parent:"nullMC"},
        {path:"img/LEF1.png"+"?picVar="+picVar,name:"LEF1", x:386, y:735, parent:"nullMC"},
        {path:"img/LEarthBg.png"+"?picVar="+picVar,name:"LEarthBg", x:0, y:723, parent:"LTreeGame"},
        {path:"img/LTreeSp.png"+"?picVar="+picVar,name:"LTreeSp", x:483, y:224, parent:"LTreeGame"},
        {path:"img/LTreeSp.png"+"?picVar="+picVar,name:"LTreeSpMc", x:483, y:224, parent:"LTreeGame"},
        {path:"img/LLine.png"+"?picVar="+picVar,name:"LLine", x:500, y:390, parent:"LTreeGame"},
        {path:"img/LBtn.png"+"?picVar="+picVar,name:"LBtn", x:403, y:190, parent:"LTreeGame"}
    ];
    var loadingLayer;
    var datalist=[];
    function init(){
        //trace("loaderInit");
        loadingLayer = new LoadingSample5(50,"#ffffff","#000000");
        loadingLayer.label.color="#000000";
        addChild(loadingLayer);
        LLoadManage.load(
            loadData,
            function(progress){
                loadingLayer.setProgress(progress);
            },
            mainLoadComplete
        );
    }
    function mainLoadComplete (result) {
        datalist = result;
        window.datalist=datalist;
        window.loadData=loadData;
        removeChild(loadingLayer);
        loadingLayer = null;
        //do something
        //var bitmapData = new LBitmapData(datalist["bg"]);
        //var bitmap=new LBitmap(bitmapData);
        //addChild(bitmap);
     //  window.main.init();
    }
})(window);