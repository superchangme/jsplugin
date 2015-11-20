<?php
namespace Model;

class Score extends DAO 
{
	public $_name="score";
	public $_primary="id";
			
	public function getScoreByWechat($wechatObj,$autoCreate=true)
	{
	    $r=$this->getItemsByCriteria(array('openid=?'=>$wechatObj->openid));
	    if($r['total_record']>0)
	      return $r['rows'][0];
	    elseif($autoCreate)
	    {
	        return $this->initialScore($wechatObj);
	    }
	    else
	      return false;
	}
	
	public function initialScore($wechatObj)
	{
	    $data=$this->_structure;
	    unset($data['id']);
	    $data['created']=time();
	    $data['updated']=time();
	    $data['openid']=$wechatObj->openid;
	    $data['name']=$wechatObj->nickname;
	    $data['img']=$wechatObj->headimgurl;
	    if(!empty($_SESSION['fromBar']))
	       $data['bar']=$_SESSION['fromBar'];
	    else
	        unset($data['bar']);
	    for($i=1;$i<=4;$i++)
	    {
	        $fieldName='game'.$i;
	        $data[$fieldName]='0';
	    }
	    $data['total']='0';
	    $id=$this->save($data);
	    if(empty($id))
	        return false;
	    else
	    {
	        $data['id']=$id;
	        return (object)$data;
	    }
	}
	
	public function getBars()
	{
	    $sql='select distinct(`bar`) from '.$this->_name;
	    $result=$this->db->prepare($sql);
	    $result->execute();
	    return $r=$result->fetchAll(\PDO::FETCH_OBJ);;
	}
	
	public function getTopPlayersByBar($bar=null,$num=0)
	{
	    $whereStack=array();
	    if(empty($bar))
	        $whereStack['bar is null']='';
	    else
	        $whereStack['bar=?']=$bar;
	    
	    $whereStack['updated > ?']=$this->app->config('p1DailyRefreshTime')-86400;
	    $whereStack['updated < ?']=$this->app->config('p1DailyRefreshTime');
	    
	    $r=$this->getItemsByCriteria($whereStack,'order by total DESC',0,$num);
	    return $r['rows'];
	}
}