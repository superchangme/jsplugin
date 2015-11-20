<?php
namespace Model;

	class Data extends DAO 
	{
		public $_name="data";
		public $_primary="id";
				
		public function saveData($type,$postion='home')
		{
			$session_visitor=$_SESSION['wechat'];
			$openid=$session_visitor->openid;
			$ua=$this->determineBrowser();
			$unionId=null;
			if(!empty($session_visitor->unionid))
				$unionId=$session_visitor->unionid;
			$data=array('openid'=>$openid,'unionid'=>$unionId,'position'=>$postion,'action'=>$type,'ip_address'=>$this->getIP(),'user_agent'=>$_SERVER['HTTP_USER_AGENT'],'browser'=>$ua[0],'browser_version'=>$ua[1],'mobile'=>$this->getDeviceType(),'platform'=>$this->getDeviceType(true),'updated'=>time(),'created'=>time());
			$rowId=$this->save($data);
			//echo $rowId;exit;
			return $rowId; 
		}
		
		private function getIP()
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
			  $cip = "无法获取！";
			}
			return $cip;
		}
		
	private function determineBrowser ()
	{
		$Agent=$_SERVER['HTTP_USER_AGENT'];
		$browseragent="";   //浏览器
		$browserversion=""; //浏览器的版本
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
	
	public function getDeviceType($isPlatform=false)
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
}