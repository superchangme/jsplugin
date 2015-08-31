//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
//fis.config.set('modules.postpackager', 'simple');
//fis.config.set('project.include', ["vion/**"]);
var sourceDir='../../vendor'

fis.config.set('project.exclude', [/^\/bower_components\//i,
    /\.psd$/,"dist/**","fis-conf.js","test**","img*","pkg/**","less/**","test/**",
"node_modules/**"]);


//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
fis.config.set('pack', {
     './js/lib.js': [
         sourceDir+"
     ]/*,
     './pkg/lib.css':[
//         "css/normalize.css",
         "css/main.css"
     ]*/
});

//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);


//Step 4. 取消下面的注释开启图片合并功能
/*fis.config.set('roadmap.path', [{
    url:"www.tom.com",
    reg: /.*//*,
    useSprite: true
}]);*/
/**

fis.config.set('settings.spriter.csssprites', {
     scale:1,margin:30, layout: 'matrix'
     //开启模板内联css处理,默认关闭
     //htmlUseSprite: true,
     //默认针对html原生<style></style>标签内的内容处理。
     //用户可以通过配置styleTag来扩展要识别的css片段
     //以下是默认<style></style>标签的匹配正则
     //styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig

     //**styleReg规则**
     //1. 默认不配置styleReg，仅支持html中默认style标签中的css内容
     //2. 配置styleReg时候，仅支持styleReg匹配到的内容。
     //3. styleReg正则必须捕获三个分组，
     //     $1为：开始标签（start tag），
     //     $2为：内容(content) ,
     //     $3为：结束标签(end tag)
});
*/
fis.config.merge({/*
    modules: {
        parser: {
            test: 'test' //
        }
    },*/
    settings : {
        optimizer : {
            'png-compressor' : {
                type : 'pngquant' //default is pngcrush
            }
        }
    }
});
