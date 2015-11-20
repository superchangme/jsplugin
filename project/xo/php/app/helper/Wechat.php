<?php
namespace Helper;
/**
 * ProjectHelper Action Helper
 *
 * @uses actionHelper Zend_Controller_Action_Helper
 */
class Wechat 
{

private $appId;
private $appSecret;
private $app;
private $cacheFile;
public function __construct($app) 
{
    $this->app=$app;
    $this->appId=$app->config('wechatAppId');
    $this->appSecret=$app->config('wechatAppSecret');
    $this->cacheFile=APPLICATION_PATH."/data/json/wechat_access_token.json";
    $fileContentTemplate=new \stdClass();
    $fileContentTemplate->expire_time="0";
    $fileContentTemplate->access_token="";
    if(!file_exists($this->cacheFile))
        file_put_contents($this->cacheFile,json_encode($fileContentTemplate));
    
}
   
public function getToken()
{
    $data = json_decode(file_get_contents($this->cacheFile));
	if(!empty($data->access_token) && $data->expire_time>time())
		return $data->access_token;
	$url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$this->appId."&secret=".$this->appSecret;
	$returnJSONStr=$this->submitRequest($url);
	$json=json_decode($returnJSONStr);
	if(isset($json->access_token))
	{
		$data->access_token=$json->access_token;
		$data->expire_time=$json->expires_in+time();
		file_put_contents($this->cacheFile,json_encode($data));
		return $json->access_token;
	}
	else
	{
		return 'Nothing found';
	}
}

public function getAuthorizeUrl($redirectUrl='')
{
    if(empty($redirectUrl))
        $redirectUrl=$this->app->_helper->url->make('/wechat/authorize',array('s'=>'code'),true);
    return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$this->appId."&redirect_uri=".urlencode($redirectUrl)."&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
}

public function authorize($redirectUrl)
{
    $url=$this->getAuthorizeUrl($redirectUrl);
	$this->app->redirect($url);
}

public function getAccessTokenByCode($code) // for fetching user info only
{
	$url='https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->appId.'&secret='.$this->appSecret.'&code='.$code.'&grant_type=authorization_code';
	return $this->submitRequest($url,'get');
}

public function refreshAccessToken($act) // for refreshing access token only
{
	$url='https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='.$this->appId.'&grant_type=refresh_token&refresh_token='.$act;
	return $this->submitRequest($url,'get');
}

public function getUserInfoByOpenID($at,$opid)
{
	if(empty($at) || empty($opid))
		return false;
	$url="https://api.weixin.qq.com/sns/userinfo?access_token=$at&openid=$opid&lang=zh_CN";
	return $this->submitRequest($url,'get');
}

public function sendMsgByOpenId($toOpenid,$title,$content,$url,$type='news')
{
    $token=$this->getToken();
    $articlesArrSetup=array(
        array(
            'title'=>'__TITLE__',
            'description'=>'__DESC__',
            'url'=>$url, // 点全文后跳转的绝对地址
            //'picurl'=>'http://www.php100.com/statics/images//php100/logo.gif' // 图片绝对地址 640*320 PNG最好
        )
    );
    if($type=='news')
        $params=array('touser'=>$toOpenid,"msgtype"=>"news",'news'=>array('articles'=>$articlesArrSetup));
    elseif($type=='text')
        $params=array('touser'=>$toOpenid,"msgtype"=>"text",'text'=>array('content'=>'__DESC__'));
    $paramsJsonStr=json_encode($params);
    $paramsJsonStr=str_replace(array('__TITLE__','__DESC__'),array($title,$content),$paramsJsonStr);
    
    $url='https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='.$token;
    return $this->submitRequest($url,'post',$paramsJsonStr);
}

function submitRequest($url,$method=null,$params=null)
{
	$ch = curl_init();
	$header = array(
		"content-type: application/x-www-form-urlencoded;charset=UTF-8"
	);

	curl_setopt($ch, CURLOPT_HTTPHEADER,$header);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    if(strtolower($method)=='post')
    	curl_setopt($ch,CURLOPT_POST,true);
    if(!empty($params))
    	curl_setopt ( $ch, CURLOPT_POSTFIELDS, $params );
    //curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

}