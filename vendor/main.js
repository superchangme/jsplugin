require.config({
    /*模块依赖配置*/
    /*模块路径配置*/
    paths: {
    "jquery": "jquery-2.1.4",
    "jquery.eraser":"jquery.eraser",
    "underscore": "underscore.min",
    "backbone": "backbone.min",
     "tomLib":"tomLib",
     "jquery-private":"jquery-private",
     "tomRequire":"tomRequire"
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
