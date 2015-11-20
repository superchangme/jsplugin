<?php 
namespace Model;
use PDO;

abstract class DAO
{
    protected $db;
    protected $app;
    public $_structure;
    public function __construct()
    {
        //TODO connect db
        if(empty($this->db))
        {
            $dbAdapter=\Model\DBAdapter::getInstance();
            $this->db=$dbAdapter->db;
            $this->app=$dbAdapter->getApp();
            $dbSetting=$this->app->config('dbsetting');
            $this->_name=$dbSetting['tablePrefix'].$this->_name;
        }
        $this->setTableFields();
    }
    
    protected function setTableFields()
    {
        if(empty($this->_structure))
        {
            $sql='SHOW COLUMNS FROM `'.$this->_name.'`';
            $r=$this->db->query($sql);
            while($c=$r->fetch())
            {
                $this->_structure[$c['Field']]='';
            }
        }
        return $this->_structure;
    }
    
    public function getItemById($id)
    {
        $fields=implode(',',array_keys($this->_structure));
        $sql='select '.$fields.' from '.$this->_name.' where '.$this->_primary.'=:id';
        $result=$this->db->prepare($sql);
        $result->execute(array(':id'=>$id));
        return $result->fetchObject();
    }
    
    public function getItemsByCriteria($whereStack=array(),$afterWhere='',$page=0,$pageSize=0)
    {
        $placesHolderArr=array();
        $fields=implode(',',array_keys($this->_structure));
        $sql='select '.$fields.' from '.$this->_name.' where 1';
        $totalRecord=0;
        $totalPage=0;
        $where='';
        if(!empty($whereStack))
        {
            foreach($whereStack as $field=>$val)
            {
                $placesHolderArr[]=$val;
                $where.=' and '.$field;
            }
            $sql.=$where;
        }
        if(!empty($pageSize))
        {
            $countingSQL='select count('.$this->_primary.') num from '.$this->_name.' where 1'.$where;
            $result=$this->db->prepare($countingSQL);
            $result->execute($placesHolderArr);
            $r=$result->fetchObject();
            $totalRecord=$r->num;
            $totalPage=ceil($totalRecord/$pageSize);
        }
        $sql.=' '.$afterWhere;
        if(!empty($pageSize))
        {
            $sql.=' limit '.$page*$pageSize.','.$pageSize;
        }
        $result=$this->db->prepare($sql);
        $result->execute($placesHolderArr);
        $r=$result->fetchAll(PDO::FETCH_OBJ);
        if(empty($totalRecord))
            $totalRecord=count($r);
        return array('total_page'=>$totalPage,'total_record'=>$totalRecord,'rows'=>$r);
    }
    
    
    public function save($values)
    {
        $isInsert=false;
        if(is_object($values))
            $values=(array)$values;
        if(empty($values[$this->_primary]))
            $isInsert=true;
        if($isInsert)
        {
            $fields=$paramHolders=$vals=array();
            foreach($values as $key=>$val)
            {
                if(!isset($this->_structure[$key]))
                    continue;
                $fields[]=$key;
                $paramHolders[]=':'.$key;
                $vals[$key]=$val;
            }
            $sql='insert into '.$this->_name.'('.implode(',',$fields).') values ('.implode(',',$paramHolders).')';
        }
        else
        {
            $fields=$paramHolders=$vals=array();
            foreach($values as $key=>$val)
            {
                $vals[$key]=$val;
                if(!isset($this->_structure[$key]) || $key==$this->_primary)
                    continue;
                $updateParams[]=$key.'=:'.$key;
            }
            $sql='update '.$this->_name.' set '.implode(',',$updateParams).' where '.$this->_primary.'=:'.$this->_primary;
        }
        $result=$this->db->prepare($sql);
        $r=$result->execute($vals);
        if($isInsert)
            $r=$this->db->lastInsertId();
        return $r;
    }
}