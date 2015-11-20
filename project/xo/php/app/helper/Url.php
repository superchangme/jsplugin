<?php
namespace Helper;

class Url
{
    private $app;
    public function __construct($app)
    {
        $this->app=$app;
    }
    
    public function make($routePath,$params=array(),$absolute=false)
    {
        $query='';
        if(!empty($params))
		{
			$p=array();
			foreach($params as $k=>$v)
			{
				$p[]=$k.'='.$v;
			}
            $query='?'.implode('&',$p);
		}
        if($absolute)
            return $this->app->request->getUrl().$this->app->config('baseUrl').$routePath.$query;
        else
            return $this->app->config('baseUrl').$routePath.$query;
    }

    public function sendRequest($url,$method=null,$params=null)
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