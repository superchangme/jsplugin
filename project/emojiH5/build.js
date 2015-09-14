({
    //appDir: './',
    baseUrl: 'js/',
    dir: './dist',
    fileExclusionRegExp: /^(r|build)\.js|img\/.*|css\/.less$/,
    //dir: "./build",
  /*  modules: [
        {
            name: '../project/emojiH5/app'
        }
    ],*/
    //removeCombined:true,
    optimizeCss:"standard",
    //fileExclusionRegExp: /^(r|build|(?!app))\.js$/,
    paths: {
        "jquery": "jquery-2.1.4",
        "jquery-private":"jquery-private",
        "exif-js":"exif",
        "megapix-image":"megapix-image",
        "tomLib":"tom.Lib",
        "jquery.eraser":"jquery.eraser",
        "jcanvas":"jcanvas",
        "hammer":"Hammer/hammer.min",
        "hammer.fake":"Hammer/hammer.fakemultitouch",
        "hammer.showtouch":"Hammer/hammer.showtouches",
        "tomPlugin":"plugins/tom-jqplugins",
        'Caman':"caman.full",
        'slider':"rangeslider.js-1.3.3/rangeslider.min",
        "iscroll-lite":"iscroll-lite",
        'fastclick':'fastclick'
    }  ,
    map:{
        '*': {
            'jquery': 'jquery-private'
        },
        "jquery-private":{
            "jquery":"jquery"
        }
    },
    modules: [
        {
            name: 'app'
        }
    ],
    onModuleBundleComplete:function(data){
        console.log(arguments,"hhahaha")
    }
})


