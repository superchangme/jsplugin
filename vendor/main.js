var baseUrl="/js_plugins"+"/vendor/";
require.config({
    /*模块依赖配置*/
    baseUrl:baseUrl,
    shim: {
        'jquery.ui.core': ['jquery'],
        'jquery.ui.widget': ['jquery'],
        'jquery.ui.mouse': ['jquery'],
        'jquery.ui.slider':['jquery'],
        "zepto.touch":"Zepto",
        "zepto.fx":"Zepto"
    },
    /*模块路径配置*/
    paths: {
    "jquery": "jquery-2.1.4",
    "jquery.eraser":"jquery.eraser",
    "underscore": "underscore.min",
    "backbone": "backbone.min",
     "Zepto":"zepto.min",
    "zepto.touch":"zepto.touch",
    "zepto.fx":"zepto.fx",
    "tomLib":"tom.Lib",
     "jquery-private":"jquery-private",
     "tomTest":"tomRequire"
    }  ,
    /*模块规则配置*/
    map:{
        '*': {
            'jquery': 'jquery-private',
            'tomLib':'tomLib'
        },
        "jquery-private":{
            "jquery":"jquery"
        }
    }
});
