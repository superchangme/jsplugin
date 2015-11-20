<?php
namespace Middleware;

class WechatCheckMiddleware extends \Slim\Middleware
{
    private $noWechatCheckRoute=array('/wechat/','/admin/');
    public function call()
    {
        $this->app->hook('slim.before.dispatch', array($this, 'onBeforeDispatch'));
        $this->next->call();
    }
    
    public function onBeforeDispatch()
    {
        $wechatObj=new \stdClass();
        $app = $this->app;
        $isBineWechat=$app->config('bineWechat');
        if(!$isBineWechat['bine'])
        {
            return;
        }
        if($isBineWechat['test'])
        {
            $wechatObj->openid='o3EyljuIQiUZoqMN0szlbkPOQDok'.rand(1,12);
            $wechatObj->nickname='Middlewareset :bear:';
            $wechatObj->headimgurl='https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxgeticon?seq=910015&username=@dd8e0b4290dc28bfaf25fdbb69f226f2&skey=@crypt_bf940984_df934ebc67de84763d7c3ea730b1214a&type=big';
            $_SESSION['wechat']=$wechatObj;
        }
        // Get reference to application
        
        $req=$app->request;
        $path=$req->getPathInfo();
        $params=$req->params();
        $needCheck=true;
        $routeName=$app->router()->getCurrentRoute()->getName();
        
        
        foreach($this->noWechatCheckRoute as $route)
        {
            //echo $path,'--',$route,'---',strpos($path,$route)!==false;exit;
            if(strpos($path,$route)!==false || strpos($routeName,'nowechat')!==false)
            {
                $needCheck=false;
            }
        }
        // Capitalize response body
        //$res = $app->response;
        $path='/html/index.html';
        $_SESSION['paramsBeforeRedirect']=array('url'=>$path,'params'=>$params);
        if($needCheck)
        {
            if(isset($_SESSION['wechat']))
                $wechatObj=$_SESSION['wechat'];
            if(!isset($wechatObj->openid) || empty($wechatObj->openid))
            {
                $app->redirect($app->_helper->url->make('/wechat/authorize',null),'302');
            }
        }
        // Run inner middleware and application
    }
}