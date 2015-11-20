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
        .qr-code{
            border:10px solid #ebcd8d;
            width: 288px;
            height: 288px;
            background: white;
            margin: 52px auto 56px;
        }
        .qr-code img{
	       width:100%;
        }
        .title{
            background: url(img/nfc2_title.png);
            width: 380px;
            height: 95px;
        }
        .intro{
            background: url(img/qr_intro.png);
            width: 450px;
            height: 241px;
        }
        .table{
            display: table;
            width: 100%;
            height: 100%;
            table-layout: fixed;
        }
        .table-cell{
            display: table-cell;
            vertical-align: middle;
        }
        div{
            margin: 0 auto;
        }
    </style>
</head>
<body>
<div class="table">
    <div class="table-cell">
        <div class="title"></div>
        <div class="qr-code">
            <img src="<?php echo $qrcodeSrc;?>">
        </div>
        <div class="hidden-text intro"></div>
    </div>

</div>
</body>
</html>