var baseUrl="../vendor/";
require.config({
    /*模块依赖配置*/
    baseUrl:baseUrl,
    shim: {
        'jquery.ui.core': ['jQuery'],
        'jquery.ui.widget': ['jQuery'],
        'jquery.ui.mouse': ['jQuery'],
        'jquery.ui.slider':['jQuery'],
        "zepto.touch":"Zepto",
        "zepto.fx":"Zepto"
    },	 /*模块路径配置*/
    paths: {
    "jQuery": "jquery-2.1.4",
    "jquery.eraser":"jquery.eraser",
    "underscore": "underscore.min",
    "backbone": "backbone.min",
     "Zepto":"zepto.min",
    "zepto.touch":"zepto.touch",
    "zepto.fx":"zepto.fx",
    "tomLib":"tom.Lib",
        "zxxLib":"zxx.Lib",
     "jquery-private":"jquery-private",
     "tom":"tomRequire",
     "tomTest":"tomRequire",
     "lodash":"lodash",
        "jcanvas":"jcanvas"
    }  ,
    /*模块规则配置*/
    map:{
        '*': {
            'jquery': 'jquery-private',
            'tomLib':'tomLib'
        },
        "jquery-private":{
            "jQuery":"jQuery"
        }
    }
});
