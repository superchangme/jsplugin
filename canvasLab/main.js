require.config({
    baseUrl:"../vendor",
    shim: {
        'jquery-eraser': ['jquery']
    },
    paths: {
    "jquery": "jquery",
    "jquery-eraser":"fingerEraser",
    "underscore": "underscore.min",
    "backbone": "backbone.min",
     "tomLib":"tomLib"
    }
});
require(["jquery","jquery-eraser"],function($,eraser){
    var bg = new Image();
    bg.src = "../source/img/b.jpg";
    bg.onload=function(){
       $("#eraserArea").eraser({bgImage:bg,percent:0.5,density:4,container:$("#eraserArea")[0],success:function(){
           alert("成功擦除50%")
       }});
    }
})
