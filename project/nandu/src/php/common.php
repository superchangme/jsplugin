<?php


	 function getIP()
	{
		if(!empty($_SERVER["HTTP_CLIENT_IP"])){
		  $cip = $_SERVER["HTTP_CLIENT_IP"];
		}
		elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
		  $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
		}
		elseif(!empty($_SERVER["REMOTE_ADDR"])){
		  $cip = $_SERVER["REMOTE_ADDR"];
		}
		else{
		  $cip = "�޷���ȡ��";
		}
		return $cip;
	}
		
	 function determineBrowser ()
	{
		$Agent=$_SERVER['HTTP_USER_AGENT'];
		$browseragent="";   //�����
		$browserversion=""; //������İ汾
		if (preg_match('/MSIE ([0-9].[0-9]{1,2})/',$Agent,$version)) {
		 $browserversion=str_replace('MSIE ','',$version[0]);
		 $browseragent="Internet Explorer";
		} 
		else if (preg_match( '/Opera\/[^\s]+/',$Agent,$version)) {
		 $browserversion=str_replace('Opera/','',$version[0]);
		 $browseragent="Opera";
		}
		else if (preg_match( '/AppleWebKit\/[^\s]+/',$Agent,$version)) {
		 $browserversion=str_replace('AppleWebKit/','',$version[0]);
		 $browseragent="AppleWebKit";
		} else if (preg_match( '/Firefox\/[^\s]+/',$Agent,$version)) {
		 $browserversion=str_replace('Firefox/','',$version[0]);
		 $browseragent="Firefox";
		}else if (preg_match( '/Chrome\/[^\s]+/',$Agent,$version))
		{
			$browserversion=str_replace('Chrome/','',$version[0]);
		 	$browseragent="Chrome";
		}
		else if (preg_match( '/Safari\/[^\s]+/',$Agent,$version)) {
		 $browseragent=str_replace('Safari/','',$version[0]);
		 $browserversion="";
		}
		else {
			$browserversion="";
			$browseragent="Unknown";
		}
		return array($browseragent,$browserversion);
	}
	
	 function getDeviceType($isPlatform=false)
	{
		 $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
		 $type = 'other';
		 if(strpos($agent, 'iphone') || strpos($agent, 'ipad'))
		 {
		 	if(strpos($agent, 'iphone') !==false && $isPlatform)
		 		return 'iphone';
		 	else if(strpos($agent, 'ipad') !==false && $isPlatform)
		 		return 'ipad';
			$type = 'ios';
		 }
		 if(strpos($agent, 'android')){
		  $type = 'android';
		 }
		 return $type;
	}
	
	 function get_rand($proArr)
    {
	    $result = '';

	    //概率数组的总概率精度
	    $proSum = array_sum($proArr);

	    //概率数组循环
	    foreach ($proArr as $key => $proCur) {
	        $randNum = mt_rand(1, $proSum);
	        if ($randNum <= $proCur) {
	            $result = $key;
	            break;
	        } else {
	            $proSum -= $proCur;
	        }
	    }
	    unset ($proArr);
	    return $result;
	}

function getrandByFactor($prob=0.01){
    $base=1;
    if($prob>=1){
        return true;
    }
    while(!(number_format($prob,0)==$prob)){
        $prob*=10;
        $base*=10;
    }  
    return rand(1,$base)<=$prob;
}