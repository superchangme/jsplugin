// Example using HTTP POST operation
var md5=require("md5");
var fs=require("fs");
var fileFolder="D:\\work\\JS_plugin\\phantomjs/data/";
var user={username:'superchangme'}
var page = require('webpage').create(),
    server = 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=http%3A%2F%2Fm.weibo.cn%2F';
var collectionData=[];
var maxPages=10;
var pageCount=0;
var joshOver=false;
var favorTypesArr=['幽默','名人']
var postUrl="http://127.0.0.1/tom/sina_grab/capture.php"

var headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}

//data = 'username='+user.username+'&pwd='+md5.digest_s(user.pwd)+'&json=f&imgcode';
page.open(server, function (status) {
//    console.log(arguments)
    //console.log(page.content)
    if (status !== 'success') {
        console.log("error----"+status)
    }else{
        console.log("success----"+status)

    }
    console.log("in page")
} );

page.onLoadFinished = function() {
    console.log("page.onLoadFinished");
    pageCount++;
    if(pageCount>maxPages){
        console.log("in----pageCOunt",pageCount)
        return;
    }
    //['http://127.0.0.1/tom/jslib/jquery-1.11.3.min.js','http://127.0.0.1/tom/jslib/lodash.js'];
    //var data = page.evaluate(function(data) {
    var routerArr=['','/cgi-bin/home','/cgi-bin/message'];
    //var uploadUrl='http://127.0.0.1:8080';
    if(page.url=="http://m.weibo.cn/"){
        page.evaluate(function() {
            window.location.href='http://weibo.com/';
        });
        return;
    }
    switch(/(?:\.cn|com)(\/[^\?]*)/.exec(page.url)[1]){
        case '/'+user.username+'/home':
            console.log("come to home page");
            waitFor(function(){
                return page.evaluate(function(){
                    return document.querySelectorAll(".UI_scrollView a");
                })
                //return '---table collect'+list.length;/**
            },function(){
                console.log("match favor list menu")
                page.evaluate(function(favorTypesArr) {    de
                    var favorLinks=[].slice.call(document.querySelectorAll(".UI_scrollView a"));
                    favorLinks.forEach(function(link){
                        favorTypesArr.forEach(function(item){
                            if(link.innerText.indexOf(item)>-1){
                                window.open(link.href);
                            }
                        })
                    })

                },favorTypesArr);
                break;
                case '/mygroups':
                waitFor(function(){
                    return page.evaluate(function(){
                        window.scrollTo(0,100000);//滚动到底部
                        return document.querySelector(".W_pages")
                    })
                    //return '---table collect'+list.length;/**
                },dealPageData,dealPageData)
                break;
                case '/cgi-bin/message':
                if(joshOver){
                    return;
                }
                console.log('so many message',pageCount)

                break;

                case '/wechat':
                return '本地';
                break;
                case '/signin/login':
                console.log("match root url----",page.url)
                page.evaluate(function(data) {
                    var userInfo={account:"superchangme@126.com",password:"changjt945"}
                    var account=document.getElementById('loginName')
                    var password=document.getElementById('loginPassword')
                    var loginBtn=document.getElementById('loginAction');
                    account.value=userInfo.account;
                    password.value=userInfo.password;
                    loginBtn.click();
                    function gDom(id){
                        return document.getElementById(id);
                    }
                });
            }
        // printArgs.apply(this, arguments);
    };

    page.onUrlChanged = function(){
        console.log("url jump to-----",page.url,'---the pathname is',/(?:\.com)(\/[^\?]*)/.exec(page.url)[1] )
    }

    function dealPageData(){
        var data=page.evaluate(function(postUrl){
            var curLink=document.querySelector(".lev_curr"),imgList=[].slice.call(document.querySelectorAll('.WB_feed img')),data={links:[]};
            imgList.forEach(function(item){
                var imgLink=item.replace(/thumbnail|square/g,'bmiddle');
                data.links.push(imgLink);
            })
            data.type=curLink.title
            return data;
        },postUrl)
        post(postUrl,"data="+JSON.stringify(data));
    }
    function saveData(data){
        if(data){
            //console.log("saveData in-----",JSON.stringify(data));
            if(data.mess=='本地'){
                console.log("local visit");
            }
            if(data.result==1){
                //collectionData.push(data.data);
                console.log('统计增加了-----',data.collectionData.length)
            }
            if(data.result==-1){

                joshOver=true;
                /**var page = require('webpage').create(),
                 server = 'http://127.0.0.1/tom/wechat_tongji/capture.php';
                 data = JSON.stringify(data.collectionData);
                 console.log('统计结束了------发送数据',data)

                 page.open(server, 'post', "data="+data,headers, function (status) {
				if (status !== 'success') {
					console.log('Unable to post!');
				} else {
					console.log(page.content);
				}
				phantom.exit();
			});**/
            }
        }
    }
    function printArgs() {
        var i, ilen;
        for (i = 0, ilen = arguments.length; i < ilen; ++i) {
            console.log("    arguments[" + i + "] = " + JSON.stringify(arguments[i]));
        }
        console.log("---",page.url);
    }
    /*
     <form class="login_form" id="loginForm">
     <div class="login_input_panel" id="js_mainContent">
     <div class="login_input">
     <i class="icon_login un"> </i>
     <input type="text" placeholder="邮箱/微信号/QQ号" id="account" name="account">
     </div>
     <div class="login_input">
     <i class="icon_login pwd"> </i>
     <input type="password" placeholder="密码" id="pwd" name="password">
     </div>
     </div>
     <div class="verifycode" style="display:none;" id="verifyDiv">
     <span class="frm_input_box">
     <input class="frm_input" type="text" id="verify" name="verify">
     </span>
     <img id="verifyImg" src="">
     <a href="javascript:;" id="verifyChange">换一张</a>
     </div>
     <div class="login_help_panel">
     <label class="frm_checkbox_label" for="rememberCheck">
     <i class="icon_checkbox"></i>
     <input type="checkbox" class="frm_checkbox" id="rememberCheck">
     记住帐号
     </label>
     <a class="login_forget_pwd" href="/cgi-bin/readtemplate?t=home/find_pwd_tmpl&amp;lang=zh_CN">无法登录？</a>
     </div>
     <div class="login_btn_panel">
     <a class="btn_login" title="点击登录" href="javascript:" id="loginBt">登录</a>
     </div>
     </form>*/
    var webserver = require('webserver');
    var server = webserver.create();
    var service = server.listen(8080, function(request, response) {
        console.log(request.url,'recevie data =-===')
        response.statusCode = 200;
        response.write('&lt;html>&lt;body>Hello!&lt;/body>&lt;/html>')
        response.close();
    });


    function waitFor(testFx, onReady, timeOutMillis,onTimeout) {
        var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
            start = new Date().getTime(),
            condition = null,
            interval = setInterval(function() {
                if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                    // If not time-out yet and condition not yet fulfilled
                    condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
                } else {
                    if(!condition) {
                        // If condition still not fulfilled (timeout but condition is 'false')
                        console.log("'waitFor()' timeout");
                        (typeof(onTimeout) === "string" ? eval(onTimeout) : onTimeout());
                        //phantom.exit(1);
                    } else {
                        // Condition fulfilled (timeout and/or condition is 'true')
                        console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                        typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                        clearInterval(interval); //< Stop this interval
                    }
                }
            }, 250); //< repeat check every 250ms
    };

    page.onError = function (msg, trace) {
        var msgStack = ['ERROR: ' + msg];
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function (t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
            });
        }
        console.error(msgStack.join('\n'));

    };

    function post(url,data){
        var page=require('webpage').create();
        page.open(url, 'post', data, function (status) {
            if (status !== 'success') {
                console.log('Unable to post!');
            } else {
                console.log(page.content);
            }
            phantom.exit();
        });

    }