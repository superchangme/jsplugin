<?php
if(defined('ENV') && ENV=='production')
{

	//$conn=mysqli_connect('192.168.205.184', 'weiliang', 'weiliang') or die(mysqli_error());
	//mysqli_select_db("bfd", $conn);
	 $mysqli=new mysqli("localhost","root","lansurabc123","lingmu");
}
else
{
	 $mysqli=new mysqli("localhost","root","","test");
}
//mysqli_query();
$mysqli->query("SET NAMES utf8");

function saveShareInfo()
{
	global $mysqli;
	$sql="insert into ".TABLE_PREFIX."data values(null,'".session_id()."',now())";
	$mysqli->query($sql);
	$id=$mysqli->insert_id;
	$mysqli->close();
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

function saveForm($form){ //$form = array('name'=>'value');
	global $mysqli;
       $sql="select id from ".TABLE_PREFIX."user_form  where name=? and phone=?";    //准备一条语句放到服务器中
       	 $stmt=$mysqli->prepare($sql);    //放到数据库教程
       	 	 $stmt->bind_param("ss",$form['name'],$form['phone']);  //给占位符传值,类型-变量(不能是值)
        $r=$stmt->execute();
		 $result=$stmt->get_result();
        while($row=$result->fetch_array())
        {
        	if(!empty($row['id'])){
        		return false;
        	}
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
	 $sql="insert into ".TABLE_PREFIX."user_form  (name,phone,province,city,agency) values(?,?,?,?,?)";    //准备一条语句放到服务器中
	 $stmt=$mysqli->prepare($sql);    //放到数据库教程
	 $stmt->bind_param("sssss",$form['name'],$form['phone'],$form['province'],$form['city'],$form['agency']);  //给占位符传值,类型-变量(不能是值)
	 $stmt->execute();    //执行
	  $id=$stmt->insert_id;
	 $stmt->close();
	return $id;
}

function testXss($form){
      	global $mysqli;
      	$sql='select * from '.TABLE_PREFIX.'user_form where name="'.$form['name']."\"";
      	//echo $sql;exit;
      	print_r($sql);
		$result=$mysqli->multi_query($sql);
	  return $result;
}