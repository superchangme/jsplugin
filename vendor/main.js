require.config({
    /*模块依赖配置*/
    shim: {
        'jquery-eraser': ['jquery']
    },
    /*模块路径配置*/
    paths: {
    "jquery": "jquery",
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
            'jquery': 'jquery-private'
        },
        "jquery-private":{
            "jquery":"jquery"
        }
    }
});
