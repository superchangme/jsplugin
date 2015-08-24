/**
 * Created by tom.chang on 2015/5/14.
 */
(function(factory){
    if(typeof define === "function" && define.amd != undefined ){
        // AMD模式
        define([ "Zepto" ], factory);
    } else {
        // 全局模式
        factory(jQuery)
    }
})(function($) {

})