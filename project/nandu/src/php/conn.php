<?php

require_once './common.php';

if(defined('ENV') && ENV=='development')
{

	//$conn=mysqli_connect('192.168.205.184', 'weiliang', 'weiliang') or die(mysqli_error());
	//mysqli_select_db("bfd", $conn);
	 $mysqli=new mysqli("localhost","root","lansurabc123","andi");
}
else if(defined('ENV') && ENV=='production')
{

    //$conn=mysqli_connect('192.168.205.184', 'weiliang', 'weiliang') or die(mysqli_error());
    //mysqli_select_db("bfd", $conn);
    $mysqli=new mysqli("localhost","andih5","qGsJhYeyo7ov","andi");
}
else
{
	 $mysqli=new mysqli("localhost","root","","andi");
	// var_dump($mysqli);echo '12112';exit;
}
//mysqli_query();
$mysqli->query("SET NAMES utf8");

function saveData($type='visit')
{
	global $mysqli;
	$ua=determineBrowser();
	$ipaddress=getIP();
	$sessionid=session_id();
	//$time=new Zend_Db_Expr($db->quoteInto("FROM_UNIXTIME(?,'%Y-%m-%d %H:%i:%s')", time()));
	//$time=new Zend_Db_Expr($db->quoteInto("FROM_UNIXTIME(?)", time()));
	$data=array('openid'=>null,'position'=>'home','action'=>$type,'user_agent'=>$_SERVER['HTTP_USER_AGENT'],'browser'=>$ua[0],'browser_version'=>$ua[1],'mobile'=>getDeviceType(),'platform'=>getDeviceType(true),'date_add'=>'now()');
	$sql='insert into '.TABLE_PREFIX.'data (`position`,`session_id`,`action`,`ip_address`,`user_agent`,`browser`,`browser_version`,`mobile`,`platform`) values(\''.$data['position'].'\',\''.$sessionid.'\',\''.$data['action'].'\',\''.$ipaddress.'\',\''.$data['user_agent'].'\',\''.$data['browser'].'\',\''.$data['browser_version'].'\',\''.$data['mobile'].'\',\''.$data['platform'].'\')';
	//echo $sql;
	$mysqli->query($sql);
	$id=$mysqli->insert_id;
	//$mysqli->close();
	return $id;
}

function countShared()
{
	global $conn;
	$sql="select count(id) num from ".TABLE_PREFIX."shared";
	$r=mysqli_query($sql);
	$r=mysqli_fetch_object($r);
	return $r->num;
}

function getSharedData()
{
	global $conn;
	$sql="select * from ".TABLE_PREFIX."shared";
	$r=mysqli_query($sql);
	$data=array();
	while($item=mysqli_fetch_object($r))
		$data[]=$item;
	return $data;
}

function saveHistory($form){ //$form = array('name'=>'value');
	global $mysqli;
	$code=0;//-1已经领过 0已经领完 
	$id=0;
	$ipaddress=getIP();
	$sessionid=session_id();
	//检查重复提交
       $sql="select id from ".TABLE_PREFIX."history  where ( name=? and phone=? ) or ( sessionid=? )";    //准备一条语句放到服务器中
            //$sql="select id from ".TABLE_PREFIX."history  where pid=?";    //准备一条语句放到服务器中

       	 $stmt=$mysqli->prepare($sql);    //放到数据库教程
       	 	 $stmt->bind_param("sss",$form['name'],$form['phone'],$sessionid);  //给占位符传值,类型-变量(不能是值)
       	 	//$stmt->bind_param("sss",$form['pid'],);
        $stmt->execute();
         $id=0;
		$stmt->bind_result($id);
        while ($stmt->fetch()) {
          if(!empty($id)){
    		return -1;
    	   }
        }
    	
     //检查是否超出当日最大抽奖数   
        $sql="select id from ".TABLE_PREFIX."history  where pid='".$form['pid']."'";
        $result=$mysqli->query($sql);
        if($result->num_rows>=$form['total']){
        	return 0;
    	}
        
       $toadyStartTime=strtotime(date('Y-m-d',time()));
       $todayEndTime=$toadyStartTime+86400;
       
       $todayStartDate=date('Y-m-d',$toadyStartTime);
       $todayEndDate=date('Y-m-d',$todayEndTime );
       
       $result=getDailyHistory($form['pid'],$todayStartDate,$todayEndDate);
       
       if($result->num_rows>=$form['daily_limit']){
           return 0;
       }
	   $r=getPrizeResult($form['pid']);
	   //检查缓冲表内是否有剩余奖品
	   if(checkPrizePool($form['pid'])){
	       //更新缓冲表
	       updatePrizeMemory($form['pid']);
	       //更新奖品表
	       updatePrize($form['pid']);
	       //插入奖品记录表
	       $sql="insert into ".TABLE_PREFIX."history  (`name`,`phone`,`address`,`pid`,`describe`,`ip_address`,`sessionid`) values(?,?,?,?,?,?,?)";    //准备一条语句放到服务器中
	       $stmt=$mysqli->prepare($sql);    //放到数据库教程
	       $stmt->bind_param("sssssss",$form['name'],$form['phone'],$form['address'],$form['pid'],$form['describe'],$ipaddress,$sessionid);  //给占位符传值,类型-变量(不能是值)
	       $stmt->execute();    //执行
	       $id=$stmt->insert_id;
	       $stmt->close();
	       return 1;
	   }else{
	       return 0;
	   }
          /*$stmt->bind_result($id);
                while($stmt->fetch())
                {
                	if(!empty($id)){
                		return false;
                	}
                }
                */
        //print_r($stmt);exit;
}

function testXss($form){
      	global $mysqli;
      	$sql='select * from '.TABLE_PREFIX.'user_form where name="'.$form['name']."\"";
      	//echo $sql;exit;
      	print_r($sql);
		$result=$mysqli->multi_query($sql);
	  return $result;
}

function getPrizeResult($id=null){
	global $mysqli;
	$sql='select * from '.TABLE_PREFIX.'prize ';
	if($id!=null){
	   $sql.='where id="'.$id.'"';     
	}
	$result=$mysqli->query($sql);
	return $result;
}

function updatePrize($id){
	global $mysqli;
	$sql='update '.TABLE_PREFIX.'prize set remain=remain-1 where id="'.$id.'"';
	$result=$mysqli->query($sql);
	return $result;
}
	
function insertPrizePool($pid,$release_time){
	global $mysqli;
	$sql="insert into ".TABLE_PREFIX."prize_pool  (`pid`,`release_time`) values('".$pid."','".$release_time."')";    //准备一条语句放到服务器中
	$result=$mysqli->query($sql);
	return $result;

}	

function getPrizePoolResult(){
	global $mysqli;
	$sql='select * from '.TABLE_PREFIX.'prize_pool';
	$result=$mysqli->query($sql);
	return $result;
}

function checkPrizePool($pid){
    global $mysqli;
    $sql='select id from '.TABLE_PREFIX.'prize_memory';
	$result=$mysqli->query($sql);
	if($result->num_rows==0){
	    $r=initMemoryPool();
	    if(empty($r)){ 
	        return false;
	    }; 
	}
	$sql='select * from '.TABLE_PREFIX.'prize_memory where pid="'.$pid.'"';
	$result=$mysqli->query($sql);
	$row=$result->fetch_object();
	if($row->remain>0){
	    return true;
	}
	return false;
}

function initMemoryPool(){
    global $mysqli;
    toggleTableLock('prize_memory');
    $sql='insert into '.TABLE_PREFIX.'prize_memory (`pid`,`remain`) select `id`,`remain` from '.TABLE_PREFIX.'prize';
    //echo $sql;
    $result=$mysqli->query($sql);
    toggleTableLock('prize_memory',false); 
    return $result;
}

function updatePrizeMemory($pid){
    global $mysqli;
    toggleTableLock('prize_memory');
    $sql='update '.TABLE_PREFIX.'prize_memory set remain=remain-1 where pid="'.$pid.'"';
   // echo $sql;
    $result=$mysqli->query($sql);
    toggleTableLock('prize_memory',false);
}

function toggleTableLock($tableName,$isLock=true){
    global $mysqli;
    if($isLock==true){
        $sql='LOCK TABLES '.TABLE_PREFIX.$tableName.' WRITE,'.TABLE_PREFIX.'prize read;';
        //echo $sql;
    }else{
        $sql='UNLOCK TABLES;';
    }
    $mysqli->query($sql);   
}



function getReleaseRst($pid,$currentTime){
    global $mysqli;
    $sql='select * from '.TABLE_PREFIX.'prize_pool where pid="'.$pid.'" and release_time>'.$currentTime.' order by release_time asc limit 1';
    $result=$mysqli->query($sql);
    return $result;
}

function getDailyHistory($pid,$start,$end){
    global $mysqli;
    $sql='select * from '.TABLE_PREFIX.'history where pid="'.$pid.'" and created>"'.$start.'" and created<"'.$end.'"';
   // echo $sql;
    $result=$mysqli->query($sql);
    return $result;
}

function getReleaseData(){
    global $mysqli;
    $sql='select pid,from_unixtime(release_time) time from '.TABLE_PREFIX.'prize_pool ';
    // echo $sql;
    $result=$mysqli->query($sql);
    return $result;
}

function getHistoryData(){
     global $mysqli;
    $sql='select * from '.TABLE_PREFIX.'history ';
   // echo $sql;
    $result=$mysqli->query($sql);
    return $result; 
}

function resetData(){
    global $mysqli;
    $sql='truncate '.TABLE_PREFIX.'prize_pool;truncate '.TABLE_PREFIX.'prize_memory;truncate '.TABLE_PREFIX.'data;truncate '.TABLE_PREFIX.'history;update '.TABLE_PREFIX.'prize set remain=total;';
    //echo $sql;
    $result=$mysqli->multi_query($sql);
    return $result;
}