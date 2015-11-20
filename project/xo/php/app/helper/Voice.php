<?php
/**
 * ProjectHelper Action Helper
 *
 * @uses actionHelper Zend_Controller_Action_Helper
 */
class Default_Controller_Action_Helper_Voice extends Zend_Controller_Action_Helper_Abstract {
    /**
     * @var Zend_Loader_PluginLoader
     */
    public $pluginLoader;
    private $baiduApiKey='BjKhiOewfARUsS7Sq4EMv2ci';
    private $baiduApiSecret='FWVPedG5ubt9asjLtYGguPLPl1nl64ak';
    private $acTokenCacheFilePath='';
    private $mp3FilePath='';
    /**
     * Constructor: initialize plugin loader
     *
     * @return void
     */
    public function __construct() 
    {
        // TODO Auto-generated Constructor
        $this->acTokenCacheFilePath=APPLICATION_PATH.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.'json';
        $this->mp3FilePath=APPLICATION_PATH.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'data'.DIRECTORY_SEPARATOR.'user_mp3';
        $this->pluginLoader = new Zend_Loader_PluginLoader ();
		$fileName='baiduyuyin_access_token.json';
        //echo $this->mp3FilePath;exit;
        if(!file_exists($this->mp3FilePath) || !is_dir($this->mp3FilePath))
            mkdir($this->mp3FilePath,0777);
		if(!file_exists($this->acTokenCacheFilePath.DIRECTORY_SEPARATOR.$fileName)){
			file_put_contents($this->acTokenCacheFilePath.DIRECTORY_SEPARATOR.$fileName,"");
		}
    }
    
    private function getAccessToken()
    {
        if(!file_exists($this->acTokenCacheFilePath) || !is_dir($this->acTokenCacheFilePath))
            mkdir($this->acTokenCacheFilePath,0777);
        $fileName='baiduyuyin_access_token.json';
        $content=file_get_contents($this->acTokenCacheFilePath.DIRECTORY_SEPARATOR.$fileName);
        if(!empty($content) && count($content)>5)
        {
            $content=json_decode($content);
			echo $content->expires_in,time()."hhee";
            if ($content->expires_in>time())
                return $content->access_token;
        }
        $url='https://openapi.baidu.com/oauth/2.0/token';
        $dataToPost=array(
            'grant_type'=>'client_credentials',
            'client_id'=>$this->baiduApiKey,
            'client_secret'=>$this->baiduApiSecret
        );
        unset($content);
        $r=$this->submitRequest($url,'post',$dataToPost);
        $r=json_decode($r);
        if(isset($r->access_token))
        {
            $r->expires_in=time()+$r->expires_in;
        }
        file_put_contents($this->acTokenCacheFilePath.DIRECTORY_SEPARATOR.$fileName,json_encode($r));
        return $r->access_token;
    }
    
    public function text2Voice($content,$fileName,$options=array())
    {
	
        if(empty($fileName))
            return false;
        $defaultSetting=array(
            'tex'=>$content,
            'lan'=>'zh',
            'tok'=>$this->getAccessToken(),
            'ctp'=>1,
            'cuid'=>'F8-B1-56-B9-17-1D',
            'spd'=>7,
            'pit'=>5,
            'vol'=>9, // 1-9
            'per'=>1 //0: man , 1: woman
        );
        if(!empty($options) && is_array($options))
        {
            if(isset($options['tex']))
                unset($options['tex']);
            foreach($options as $k=>$v)
                $defaultSetting[$k]=$v;
        }
		
        $voiceUrl='http://tsn.baidu.com/text2audio?';
        foreach($defaultSetting as $k=>$v)
            $voiceUrl.=$k.'='.$v.'&';
        $voiceUrl=substr($voiceUrl,0,-1);
        $mp3Content=$this->submitRequest($voiceUrl,'get',$defaultSetting);
		//print_r($mp3Content);exit;
        return file_put_contents($this->mp3FilePath.DIRECTORY_SEPARATOR.$fileName.'.mp3',$mp3Content);
    }
   
    /**
     * Strategy pattern: call helper as broker method
     */
    public function direct() {
        // TODO Auto-generated 'direct' method
    }
    
    private function submitRequest($url,$method=null,$data=array())
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, false);
        //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        if(strtolower($method)=='post')
        {
            curl_setopt($ch,CURLOPT_POST,true);
            if(!empty($data))
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }
        //curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($ch);
        curl_close($ch);
		//echo '2222'.$url.$result.'2222';
        return $result;
    }
    
    //fetching MAC address
    private function getMACAddress()
    {
		echo "hahahah";
        $macInfo=array();
        $tempArray=array();
		echo strtoupper(substr(PHP_OS, 0, 3));
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
            $macInfo=$this->forWindows();
        else
            $macInfo=$this->forLinux();
		
		var_dump($macInfo);
        foreach ( $macInfo as $value )
        {
            if (preg_match("/[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f]/i",$value,$tempArray ) )
                return $tempArray[0];
        }
    }
    
    private function forWindows(){
        $return_array=array();
        @exec("ipconfig /all", $return_array);
        if ( $return_array )
            return $return_array;
        else{
            $ipconfig = $_SERVER["WINDIR"]."\system32\ipconfig.exe";
            if ( is_file($ipconfig) )
                @exec($ipconfig." /all", $return_array);
            else
                @exec($_SERVER["WINDIR"]."\system\ipconfig.exe /all", $return_array);
            return $return_array;
        }
    }
    
    
    
    private function forLinux(){
        $return_array=array();
        @exec("ifconfig -a", $return_array);
        return $return_array;
    }
}