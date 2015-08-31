({
    baseUrl: '../../vendor',
    dir: "./build",
    modules: [
        {
            name: 'app'
        }
    ],
    include:["app.js"],
    //fileExclusionRegExp: /^(r|build|(?!app))\.js$/,
    paths: {
        "jquery": "jquery-2.1.4",
        "jquery.eraser":"jquery.eraser",
        "tomLib":"tom.Lib",
        "jquery-private":"jquery-private",
        "jcanvas":"jcanvas",
        "hammer":"Hammer/hammer.min",
        "hammer.fake":"Hammer/hammer.fakemultitouch",
        "hammer.showtouch":"Hammer/hammer.showtouches",
        "tomPlugin":"plugins/tom-jqplugins",
        'Caman':"caman.full",
        'slider':"rangeslider.js-1.3.3/rangeslider.min",
        "iscroll-lite":"iscroll-lite"
    }
})