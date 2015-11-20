<?php
$app->map('/wechat/authorize',function() use($app)
{
    $step=$app->request->get('s');
    $redirUrl=$app->_helper->url->make('/wechat/authorize',null,true);
    if(empty($step))
    {
        $redirUrl.='?s=code';
	    $app->_helper->wechat->authorize($redirUrl);
    }
    else if($step=='code')
    {
		$state=$app->request->get('state');
		$code=$app->request->get('code');
		if(empty($code))
		{
			$app->redirect($redirUrl);
			exit;
		}
		$r=$app->_helper->wechat->getAccessTokenByCode($code);// getting openId
		$json=json_decode($r);
		if(!empty($json->access_token) && !empty($json->openid))
		{
			echo '<br/>Getting userinfo<br/>';
			$r=$app->_helper->wechat->getUserInfoByOpenID($json->access_token,$json->openid);
			$userJson=json_decode($r);
			$wechatObj=new stdClass();
			foreach($userJson as $field=>$val)
			{
			    if($field=='nickname' && isset($app->_helper->emoji))
			    {
			        $val=$app->_helper->emoji->toShort($val);
			    }
				$wechatObj->$field=$val;
			}
			$_SESSION['wechat']=$wechatObj;
			$urlParams=$_SESSION['paramsBeforeRedirect'];
			if(!empty($urlParams))
			{
				$url=$app->_helper->url->make($urlParams['url'],$urlParams['params'],true);
				$url=str_replace('/index.php','',$url);
				$app->redirect($url);
			}
			//echo $userJson['nickname'];
			//echo '<img src="'.$userJson['headimgurl'].'"/>';
		}
    }
})->via('GET');

$app->map('/wechat/jssdksign',function() use($app)
{
    $signPkg=$app->_helper->wjssdk->getSignPackage();
    echo json_encode($signPkg);
})->via('GET');