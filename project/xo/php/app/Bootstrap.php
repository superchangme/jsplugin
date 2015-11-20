<?php
class Bootstrap
{
    private $app;
    
    public function __construct($app)
    {
        $this->app=$app;
        $this->_autoload();
        $methods=get_class_methods($this);
        foreach($methods as $method)
        {
            if(strpos($method,'_init')===0)
            {
                $this->$method();
            }
        }
        if(APPLICATION_ENV=='development')
        {
            ini_set('display_errors',1);
            error_reporting(E_ALL);
        }
    }
    
    protected function _initHelper()
    {
        $this->app->_helper=new stdClass();
        //Helper initialize
        $this->app->_helper->wjssdk=new \Helper\Wjssdk($this->app);
        $this->app->_helper->wechat=new \Helper\Wechat($this->app);
        $this->app->_helper->url=new \Helper\Url($this->app);
        $this->app->_helper->emoji=new \Helper\Emoji($this->app);
        //Helper initialize end
    }
    
    protected function _initMiddleware()
    {
        //Helper initialize
        $this->app->add(new \Middleware\WechatCheckMiddleware);
        //Helper initialize end
    }
    
    protected function _initDB()
    {
        $dbAdapter=\Model\DBAdapter::getInstance();
        $dbAdapter->setApp($this->app);
        $dbAdapter->init();
    }
    
    protected function _autoload()
    {
        spl_autoload_register(function($model){
            $masterNameSpace='Model';
            $names=explode('\\',$model);
            //echo $model,'--',count($names),'<br/>';
            if($names[0]=='\\')
                array_shift($names);
            else if(count($names)<=0)
                return true;
            $masterNameSpace=$names[0];
            $model=str_replace($masterNameSpace.'\\','/'.strtolower($masterNameSpace).'/',$model);
            $path=__DIR__.$model.'.php';
            if(file_exists($path))
                require($path);
            else
                die('File not found : '.$path);
        });
    }
}