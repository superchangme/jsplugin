<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" id="eqMobileViewport" content="width=640,user-scalable=no" />
    <meta name="format-detection" content="telephone=no">
    <meta content="no-cache" http-equiv="Cache-Control">
    <meta content="no-cache" http-equiv="Pragma">
    <title></title>
    <base href="<?php echo $app->_helper->url->make('/')?>" />
    <style>
        *{
            margin: 0;
        }
        html, body {
            height: 100%;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            /*overflow: hidden;*/
            background-color: #caa47b;
        }
        body{
            position: relative;
        }
         body{
             background: url(img/nfc_bg.jpg) ;
             background-size: cover;
         }
        .hidden-text{
            color:transparent;
            font-size:0;
        }
        .btn-close{
            background: url(img/btn_rescan.png);
            width: 162px;
            height:162px ;
            display: block;
            position: absolute;
            bottom:62px;
            left:50%;
            margin-left: -81px;;
        }
        .title{
        	background: url(img/welcome_xo.png) center 0 no-repeat;
            width:443px ;
            height: 40px;
            margin: 15% auto 0 ;
            
        	}
        .welcome-xo{
            background: url(img/welcome_xo.png) center bottom no-repeat;
            width:443px ;
            height: 420px;
            margin: 0 auto ;
              position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
        }
    </style>
</head>
<body>
<div>
	<div class='title'></div>
    <div class="welcome-xo hidden-text">
        <h1>
            欢迎选购人头马

        </h1>
        <p>欢迎联系就近的销售人员
            体验最新的NFC产品鉴别技术
            并参与互动游戏
            角逐全场大奖</p>
    </div>
   <!-- <a class="hidden-text btn-close" onclick="closeWindow()">再次扫描</a>-->
</div>
</body>
<script>
    function closeWindow(){
        window.opener = null;//为了不出现提示框
        window.close();//关闭窗口
    }
</script>
</html>