<?php
define('ENV','production');
//define('ENV','development');
define('TABLE_PREFIX','yadi_');
define("APPID","wx754d64dcf9dadcd6");
define("APPSECRET","0b45b061b9672dc7b520afbf03c09a0c");
define('BASE_PATH',dirname(__FILE__));
session_start();
require 'conn.php';
require 'jssdk.php';
$action='';
if(isset($_GET['a']))
	$action=$_GET['a'];
if($action=='share')
{
//TODO fetch wechat info
	$id=saveData('share'); //conn.php
	echo $id;
//end
}
if($action=='visit')
{
//TODO fetch wechat info
	$id=saveData('visit'); //conn.php
	echo $id;
//end
}
if($action=='count')
{
//TODO fetch wechat info
	echo countShared(),'---'; //conn.php
//end
}
else if($action=='getsharedata')
{
//TODO fetch wechat info
	$data=getSharedData();
	$tr='';
	foreach($data as $item)
	{
		$tr.='<tr><td>'.$item->openid.'</td><td>'.$item->created.'</td></tr>';
	}
	echo '<table>'.$tr.'</table>';
//end
}
elseif($action=='wechatsign')
{
	//TODO fetch wechat token
	$url='';
	if(!empty($_GET['url']))
		$url=urldecode($_GET['url']);
	$jssdk = new JSSDK(APPID, APPSECRET);
	$signPackage = $jssdk->GetSignPackage($url);
	echo json_encode($signPackage);
	return;
	//end
}elseif($action=="saveform"){
		$result=array('result'=>'0','id'=>0,'path'=>'','message'=>'提交失败');
		$form=array();
     $form["name"]=$_POST['name'];
      $form['phone']=$_POST['phone'];
      $form['province']=$_POST['province'];
      $form['agency']=$_POST['agency'];
     $form['city']=$_POST['city'];
     $id=saveForm($form);
     if(!empty($id)){
            $result['result']=1;
            $result['message']='提交成功';
     }
	echo json_encode($result);
	return;
}elseif($action=='testXss'){
      $result=testXss($_GET);
      $table="<table><tr><th>name</th><th>phone</th>";
      while($row=$result->fetch_array()){
               $table.='<tr><td>'.$row['name'].'</td><td>'.$row['phone'].'</td><tr>';
      }
      $table.='</table>';
      echo $table;
}