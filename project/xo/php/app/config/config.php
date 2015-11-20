<?php
$production=array(
    'view'=>'\Slim\LayoutView',
    'templates.path'=>APPLICATION_PATH.'/templates',
    'layout'=>'layout/layout.php', //relative templates.path
    'debug'=>false,
    'bineWechat'=>array('test'=>false,'bine'=>true),

    'wechatAppId'=>'wxe5826201582861fc',
    'wechatAppSecret'=>'5d9bc83cec99ea5d77ae92029d3e43e2',
     /*
    'wechatAppId'=>'wx754d64dcf9dadcd6',
    'wechatAppSecret'=>'0b45b061b9672dc7b520afbf03c09a0c',
	   */
    'host'=>$_SERVER['HTTP_HOST'],
    'baseUrl'=>str_replace('/index.php','',$_SERVER['SCRIPT_NAME']),
    'absPath'=>realpath(dirname(__DIR__).'/../'),
    'dbsetting'=>array(
        'host'=>'localhost',
        'user'=>'nfc',
        'password'=>'kTaFiFTPcMzc6Mg9',
        'db'=>'nfc',
        'tablePrefix'=>'nfc_'
    ),
);


$common=array(
    'development'=>array(
        'debug'=>true,
        'bineWechat'=>array('test'=>true,'bine'=>true),
        'dbsetting'=>array(
            'host'=>'localhost',
            'user'=>'root',
            'password'=>'',
            'db'=>'vsop',
            'tablePrefix'=>'nfc_'
        ),
    ),
    'testing'=>array(
        'debug'=>true,
        'bineWechat'=>array('test'=>false,'bine'=>true),
        'dbsetting'=>array(
            'host'=>'localhost',
            'user'=>'root',
            'password'=>'lansurabc123',
            'db'=>'vsop',
            'tablePrefix'=>'nfc_'
        ),
    ),
    'staging'=>array(
        'debug'=>true,
        'bineWechat'=>array('test'=>true,'bine'=>true),
    ),
    'production'=>array(
        'debug'=>false,
        'bineWechat'=>array('test'=>false,'bine'=>true),
    )
);

//This Setting section gotta reset everytime

$p1DailyRefreshTime=strtotime(date('Y-m-d'))+3600;
if(time()>$p1DailyRefreshTime)
    $p1DailyRefreshTime+=86400;
$campaignSetting=array(
    'p1EndTime'=>1483200000, // 2017-01-01 0:0:0
    'p1DailyRefreshTime'=>$p1DailyRefreshTime, // Every 13:00 today
);

return $common[APPLICATION_ENV]+$production+$campaignSetting;