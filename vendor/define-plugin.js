/**
 * Created by tom.chang on 2015/5/14.
 */
(function(factory){
    if(typeof define === "function" && define.amd != undefined ){
        // AMDģʽ
        define([ "Zepto" ], factory);
    } else {
        // ȫ��ģʽ
        factory(jQuery)
    }
})(function($) {

})