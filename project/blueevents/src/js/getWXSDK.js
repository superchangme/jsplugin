function xhrRequest(){
    var xmlHttp=null;
    try{
        xmlHttp=new XMLHttpRequest();
    }
    catch(e){
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

function init_wx_jsapi(url,cb){
    var xhr=xhrRequest();
    xhr.open("GET",jssdkURL,false);
    xhr.onreadystatechange=function(){
        if(xhr.status == 200&&xhr.readyState == 4 ){
            var result=xhr.responseText;
                var o={};
                o.jsApiList=[
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ];
                try{
                    for (p in r=JSON.parse(result)) {
                        o[p] = r[p];
                    }
                }catch(e){

                }
                if(typeof cb==="function"){
                    cb(o)
                }
        }
    }
    xhr.send(null);
}

