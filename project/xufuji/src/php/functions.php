<?php
function getToken()
{
	if(!empty($_SESSION["token"]))
		return $_SESSION["token"];
	$url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".APPID."&secret=".APPSECRET;
	$returnJSONStr=submitRequest($url);
	$json=json_decode($returnJSONStr);
	if(isset($json->access_token))
	{
		$_SESSION["token"]=$json->access_token;
		return $json->access_token;
	}
	else
	{
		return 'Nothing found';
	}
}

function authorize($redirectUrl)
{
	if(empty($redirectUrl))
		$redirectUrl="http://www.bamboodigital.com.cn/wechat/authorize.php";
	$url="https://open.weixin.qq.com/connect/oauth2/authorize?appid=".APPID."&redirect_uri=".urlencode($redirectUrl)."&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
	header("Location:".$url);
}

function getAccessTokenByCode($code) // for fetching user info only
{
	$url='https://api.weixin.qq.com/sns/oauth2/access_token?appid='.APPID.'&secret='.APPSECRET.'&code='.$code.'&grant_type=authorization_code';
	return submitRequest($url,'get');
}

function getUserInfoByOpenID($at,$opid)
{
	if(empty($at) || empty($opid))
		return false;
	$url="https://api.weixin.qq.com/sns/userinfo?access_token=$at&openid=$opid&lang=zh_CN";
	return submitRequest($url,'get');
}

function submitRequest($url,$method=null)
{
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    if(strtolower($method)=='post')
    	curl_setopt($ch,CURLOPT_POST,true);
    //curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

function checkIsFriend()
{
	
}

@$action=$_GET['a'];
if($action=='access_token')
	echo getToken();