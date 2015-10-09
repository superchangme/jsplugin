<?php
class Admin_Bootstrap extends Zend_Application_Module_Bootstrap
{	
	protected function _initAcl()
    {
    	// Role total : admin, super, viewer
        $acl=new Zend_Acl();
        $acl->addRole(new Zend_Acl_Role('viewer'));
        $acl->addRole(new Zend_Acl_Role('super'), "viewer");
        $acl->addRole(new Zend_Acl_Role('admin'));
        $acl->addRole(new Zend_Acl_Role('afl_super'),'super');
        
        $front = Zend_Controller_Front::getInstance();
        //$acl = array();
        foreach ($front->getControllerDirectory() as $module => $path)
        {
            foreach (scandir($path) as $file)
            {
                if (strstr($file, "Controller.php") !== false)
                {
                    include_once $path . DIRECTORY_SEPARATOR . $file;
                    foreach (get_declared_classes() as $class)
                    {
						if (is_subclass_of($class, 'Zend_Controller_Action'))
                        {
                            $controller = strtolower(substr($class, 0, strpos($class, "Controller")));
                            if(strpos($controller,"_")!==false)
                            	$controller=substr($controller,strpos($controller,"_")+1);
                            $actions = array();
                            foreach (get_class_methods($class) as $action)
                            {
                                if (strstr($action, "Action") !== false)
                                {
                                	$action=substr($action,0,strpos($action,"Action"));
                                	$resource_name=$module."-".$controller."-".$action;
                                	if(!$acl->has($resource_name))
	                                	$acl->addResource(new Zend_Acl_Resource($resource_name));
                                    //$actions[] = $action;
									//echo $module."-".$controller."-".$action."<br/>";
									if(strpos($action,"view")!==false || strpos($action,"search")!==false || strpos($action,"index")!==false || strpos($action,"logout")!==false || strpos($action,"changepw")!==false)
										$acl->allow("viewer",$resource_name);
									if(strpos($action,"refund")===false)
									{									
										if(strpos($controller,"exhpay")===false)
										{
											if(strpos($controller,"event")!==false)
											{
												$acl->allow("super",$resource_name);
												$acl->deny("viewer",$resource_name);
											}
											else
												$acl->allow("super",$resource_name);
										}
										else 
										{
											$acl->allow("afl_super",$resource_name);
											$acl->deny("super",$resource_name);
											$acl->deny("viewer",$resource_name);
										}
									}
									else
										$acl->deny("super",$resource_name);
                                }
                            }
                        }
                    }
                    //$acl[$module][$controller] = $actions;
                   //echo $module."-".$controller."-".$action."<br/>";
                    
                    //if($module=='default')
                    //    $acl->allow("guest",$module."-".$controller."-".$action);
                }
            }
        }
        //exit;
        $acl->allow("admin");
        Zend_Registry::set("acl",$acl);
    }
}