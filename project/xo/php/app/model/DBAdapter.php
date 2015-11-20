<?php 
namespace Model;
use PDO;

class DBAdapter
{
    public $db;
    private static $_instance;
    private $app;
    private function __construct(){}
    
    public function init()
    {
        //TODO connect db
        if(empty($this->db))
        {
            try {
                $dbSetting=$this->app->config('dbsetting');
                //$this->db=new PDO('mysql:host='.$dbSetting['host'].';dbname='.$dbSetting['db'], $dbSetting['user'], $dbSetting['password'], array(PDO::ATTR_PERSISTENT => true));
                $this->db=new PDO('mysql:host='.$dbSetting['host'].';dbname='.$dbSetting['db'], $dbSetting['user'], $dbSetting['password']);
                $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->db->query("set names utf8;");
            } catch (PDOException $e) {
                die($e->getMessage());
            }
        }
    }
    
    public static function getInstance()
    {
        if(empty(DBAdapter::$_instance))
            DBAdapter::$_instance = new DBAdapter();
        return DBAdapter::$_instance;
    }
    
    public function setApp($app)
    {
        $this->app=$app;
    }
    
    public function getApp()
    {
        return $this->app;
    }
}