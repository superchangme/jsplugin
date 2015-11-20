<?php
/**
 * ProjectHelper Action Helper
 *
 * @uses actionHelper Zend_Controller_Action_Helper
 */
class Default_Controller_Action_Helper_Account extends Zend_Controller_Action_Helper_Abstract {
    /**
     * @var Zend_Loader_PluginLoader
     */
    public $pluginLoader;
   
    /**
     * Constructor: initialize plugin loader
     *
     * @return void
     */
    public function __construct() {
        // TODO Auto-generated Constructor
        $this->pluginLoader = new Zend_Loader_PluginLoader ();
    }
   
    /**
     * Strategy pattern: call helper as broker method
     */
    public function direct() {
        // TODO Auto-generated 'direct' method
    }
   
    /*
    	position : exhibitor , rep
    */
    public function login($model)
    {
        $loginForm=new Default_Model_Form_LoginForm();
    	if($this->getRequest()->isPost())
    	{
    		if($loginForm->isValid($this->getRequest()->getPost()))
    		{
	    		$model->email=$loginForm->getValue("email");
	    		$model->password=md5($loginForm->getValue("password"));
	    		$result=$model->doLogin(false);
	    		if($result)
    				return true;
    			else 
    				return "Error : Login fail";
    		}
    		else 
    		{
    			$msg="<ul>";
    			$errors=$loginForm->getMessages();
    			foreach ($errors as $field=>$error_arr)
    				foreach ($error_arr as $error_msg)
    					$msg.="<li>".$error_msg."</li>";
    			$msg.="</ul>";
    			return $msg;
    		}
    	}
    }
    
    public function forgetPassword($controller,$model,$module="default")
    {
    	$view=new Zend_View();
    	$items=$model->getItemsByCriteria(array("email=?"=>$model->email));
    	//print_r($exhibitors);exit;
    	if(count($items["rows"])>0)
    		list($item)=$items["rows"];
    	if(isset($item))
    	{
    		//$mail_model=Default_Model_Mail();
    		$timestamp=time();
    		$security_code=md5($item->id.$timestamp.$item->created);
    		$retrieve_pw_uri=$view->serverUrl().$view->url(array("module"=>$module,"controller"=>$controller,"action"=>"resetpw","id"=>$item->id,"t"=>$timestamp,"c"=>$security_code),null,true);
    		return $retrieve_pw_uri;
    	}
    	else
    		return null;
    }
    
    public function resetPassword($model)
    {
    	$request=$this->getRequest();
    	$semi_id=$request->getParam("id");
    	$timestamp=$request->getParam("t");
    	if(!is_numeric($timestamp))
    		throw new Admin_Model_Exception_AccessRightException(FORBIDDEN_ACCESS);
    	$days=ceil((time()-$timestamp)/86400);
    	$security_code=$request->getParam("c");
    	if(!isset($semi_id) || !isset($timestamp) || !isset($security_code))
    		throw new Admin_Model_Exception_AccessRightException(FORBIDDEN_ACCESS);
    	
    	$item=$model->getItemById($semi_id);
    	// Validate
    	$real_security_code=md5($item->id.$timestamp.$item->created);
    	//die($real_security_code."====".$security_code);
    	if($real_security_code!=$security_code)
    		throw new Admin_Model_Exception_AccessRightException(FORBIDDEN_ACCESS);
    	//echo $days;exit;
    	if(!empty($item->password) && $days>FORGET_PW_URL_EXPRIED)
    		throw new Admin_Model_Exception_AccessRightException(RESET_PW_LINK_EXPRIED);
    	if(!empty($item->password) && !empty($item->login) && $timestamp<$item->login)
    		throw new Admin_Model_Exception_AccessRightException(RESET_PW_LINK_ONE_TIME_ONLY);
    	// Validate end
    	
    	$model->email=$item->email;
    	if(empty($item->password))
    		return $model->doLogin(true);
    	else 
    	{
    		$model->password=$item->password;
    		return $model->doLogin(false);
    	}
    }
    
    public function logout($position)
    {
    	$session = new Zend_Session_Namespace($position);
		$session->unsetAll();
    }
}