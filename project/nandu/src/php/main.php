<?php
session_start();
//define('ENV','development');
//define('ENV','production');
header("Content-type: text/html; charset=utf-8");

if(defined('ENV') && ENV!='production')
{
    ini_set('display_errors',1);
    error_reporting(E_ALL);
}
date_default_timezone_set('Asia/Taipei');
require_once 'common.php';
require 'conn.php';
require 'jssdk.php';
ini_set('session.cookie_lifetime', '0'); // Expired session once browser closed
define('TABLE_PREFIX','');
define('START_TIME',strtotime('2015-10-23 00:00:00'));
define('END_TIME',strtotime('2015-10-30 23:59:59'));
define('MY_LUCKNUM',9);
define('LOTTERY_HOUR_GAP',6);
define('USER_MIN_INPUT_TIME',6);
define('USER_MAX_INPUT_TIME',300);
define('LOTTERY_GAP_SHRINK',0.7);
//1:1 2:2 3:20 4:70 5:200
//释放时间



$LOTTERY_RELEASE_DUR=array("1"=>60,"2"=>90,"3"=>120,"4"=>240,"5"=>600);
$LOTTERY_LOW_PROB=array("1"=>1,"2"=>10,"3"=>200,"4"=>800,"5"=>3000,"0"=>30000);
$LOTTERY_HIGH_PROB=array("1"=>1,"2"=>5,"3"=>50,"4"=>200,"5"=>800);
//$LOTTERY_LOW_PROB=array("5"=>2000,"0"=>30000);
//$LOTTERY_HIGH_PROB=array("5"=>800,"0"=>800);
define('LOTTERY_HIGH_SND_PROB',0.8);
define("APPID","wx754d64dcf9dadcd6");
define("APPSECRET","0b45b061b9672dc7b520afbf03c09a0c");
define('BASE_PATH',dirname(__FILE__));
$action='';
$postOp='';



if(isset($_GET['a']))
    $action=$_GET['a'];
if(isset($_GET['op']))
    $postOp=$_GET['op'];
if($action=='share')
{
    //TODO fetch wechat info
    $id=saveData('share'); //conn.php
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
}elseif($action=='testXss'){
    $result=testXss($_GET);
    $table="<table><tr><th>name</th><th>phone</th>";
    while($row=$result->fetch_array()){
        $table.='<tr><td>'.$row['name'].'</td><td>'.$row['phone'].'</td><tr>';
    }
    $table.='</table>';
    echo $table;
}elseif($action=="visit"){
    $id=saveData(); //conn.php
    echo $id;
}elseif($action=="loadpool"){
     
}elseif($action=="list_release"){
  
}elseif($action=="reset_data"){
    //resetData();
}elseif($action=='test'){
   
}
if(strtolower($_SERVER['REQUEST_METHOD'])=="post"){
    //抽奖
    if($postOp=='lottery'){
        $id=saveData('lottery');
       
        //$id=saveData(); //conn.php
        $result=array('result'=>'0','code'=>'1','id'=>0,'path'=>'','msg'=>'手气不太好');

        $currentTime=time();
        $result['prizeNum']=0;
        $row='';
        if($currentTime<START_TIME||$currentTime>END_TIME){
            $result['msg']='活动尚未开始或已结束';
            $result['code']=0;
        }else{
            $r=getPrizePoolResult();
            if(getPrizePoolResult()->num_rows==0){
                initLotteryData();
            };
            $lotteryId=get_rand($LOTTERY_HIGH_PROB);
            $r=getReleaseRst($lotteryId,$currentTime);
            if(!empty( $r)&&$r->num_rows>0){  
                $row=$r->fetch_object();
            }
           
            //命中释放时间取高概率
            if(!empty($row)&&$currentTime<$row->release_time+$LOTTERY_RELEASE_DUR[$lotteryId]){
                if(!getrandByFactor(LOTTERY_HIGH_SND_PROB)){
                    $lotteryId=0;
                    $result['msg']='差点就中了';
                }
                //print_r($row);
                // echo "命中大概率".$currentTime.'--'.$row->release_time.'---'.$LOTTERY_RELEASE_DUR[$lotteryId];
            }else{
                //不在释放时间内取低概率
                $lotteryId=get_rand($LOTTERY_LOW_PROB);
                if($lotteryId==0){
                    $result['msg']='手气不太好';
                }
            }
            
            // $lotteryId=5测试抽奖;
            if(defined('ENV') && ENV!='production')
            {
               // $lotteryId=rand(0,5);
            }
            //$lotteryId=5;
            if($lotteryId!=0){
                $prizeRst=getPrizeResult();
                while($row = $prizeRst->fetch_object()){
                    //print_r($row);
                    if($row->id==$lotteryId){
                        break;
                    };
                }
                if($row->remain>0){
                    ///if(updatePrize($row->id,$row->remain-1)){
                    $_SESSION['prize']=array("lotteryTime"=>time(),"daily_limit"=>$row->daily_limit,"pid"=>$row->id,"describe"=>$row->describe,'total'=>$row->total);
                    //header('Location:http://127.0.0.1/nandu/src/php/main.php?op=saveform');
                    $result['msg']='抽到了!';
                    $result['prizeNum']=$lotteryId;
                    //saveLotteryInfo();
                    //};
                }else{
                    $result['msg']='手慢了，奖品领光了.';
                }
            }else{
                $result['msg']='手气不太好';
            }
        }
        
        echo json_encode($result,true);
        return;
    }elseif($postOp=="saveform"){
        $result=array('code'=>'0','id'=>0,'path'=>'','msg'=>'提交失败');
       // print_r($_POST);
        //print_r(file_get_contents("php://input"));
        if(empty($_POST['name']) || empty($_POST['address']) || empty($_POST['phone'])){
            $result["msg"]="资料不完整";
        }else{
            if(isset($_SESSION['prize'])){
                if(false&&time()-$_SESSION['prize']['lotteryTime']<USER_MIN_INPUT_TIME){
                    $result["msg"]="手慢了，明天再来吧.";
                }else{
                    $code=saveLotteryInfo();
                    if($code==0){
                        $result["msg"]="手慢了，明天再来吧.";
                    }else if($code==-1){
                        $result["msg"]="你已经填写过奖品信息，每人只可以领一次!";
                    }else if($code==1){
                        $result["code"]=1;
                        $result["msg"]="保存成功";
                    }
                }

            }else{
                $result["msg"]="没有权限.";
            }
        }
        
        unset($_SESSION['prize']);
        echo json_encode($result,true);
        return;
    }else if($postOp=="resetdata"){
        if(!empty($_POST['user'])&&!empty($_POST['password'])&&$_POST['user']=="tom"&&$_POST['password']=="19880620"){
            resetData();
            echo "重置表成功";
        }else{
            echo '你的输入有误';
        }
    }else if($postOp=="listreleasetime"){
        if(!empty($_POST['user'])&&!empty($_POST['password'])&&$_POST['user']=="tom"&&$_POST['password']=="19880620"){
               $rst=getReleaseData();
            $html="<table>";
            while($row=$rst->fetch_object()){
                $html.="<tr><td>".$row->pid.'</td><td>'.$row->time.'</td></tr>';
            }
            $html.="</table>";
            echo $html;
            return;
        }else{
            echo '你的输入有误';
        }
    }else if($postOp=="seehistory"){
        if(!empty($_POST['user'])&&!empty($_POST['password'])&&$_POST['user']=="andi"&&$_POST['password']=="andiisagirl"){
             $rst=getHistoryData();
            $html="<table border=2 >";
            $isTH=false;
            while($row=$rst->fetch_object()){
                if(!$isTH){
                    $html.="<tr>";
                    foreach ($row as $key=>$val){
                        $html.='<th>'.$key.'</th>';
                    }
                    $html.="</tr>";
                    $isTH=true;
                    
                }
                $html.="<tr>";
                foreach ($row as $val){
                    $html.='<td>'.$val.'</td>';
                }
                $html.="</tr>";
                
                //$html.="<tr><td>".$row->pid.'</td><td>'.$row->time.'</td></tr>';
            }
            print_r($html);
            return;
        }
    }else if($postOp=="addPrize"){
        if(!empty($_POST['prizeNum'])&&!empty($_POST['user'])&&!empty($_POST['password'])&&$_POST['user']=="andi"&&$_POST['password']=="andiisagirl"){
            $r=addPrizeData($_POST['prizeNum'],5);
            if($r==1){
                echo '成功添加奖品数量'.$_POST['prizeNum'];
            }else{
                echo '成功添加奖品数量失败';
            }
        }
    }else if($postOp=="printTable"){
        if(!empty($_POST['tableName'])&&!empty($_POST['user'])&&!empty($_POST['password'])&&$_POST['user']=="andi"&&$_POST['password']=="andiisagirl"){
            $rst=getTaleData($_POST['tableName']);
            $html="<table border=2 >";
            $isTH=false;
            while($row=$rst->fetch_object()){
                if(!$isTH){
                    $html.="<tr>";
                    foreach ($row as $key=>$val){
                        $html.='<th>'.$key.'</th>';
                    }
                    $html.="</tr>";
                    $isTH=true;
            
                }
                $html.="<tr>";
                foreach ($row as $val){
                    $html.='<td>'.$val.'</td>';
                }
                $html.="</tr>";
            
                //$html.="<tr><td>".$row->pid.'</td><td>'.$row->time.'</td></tr>';
            }
            print_r($html);
            return;
        }else{
            echo "输入有误";
        }
        
    }

}


function saveLotteryInfo(){
    //add robot ctrl
    $form=array();
    $form["name"]=$_POST['name'];//$_POST['name'];
    $form['phone']=$_POST['phone'];//$_POST['phone'];
    $form['address']=$_POST['address'];//$_POST['address'];
    $form["daily_limit"]=$_SESSION['prize']['daily_limit'];
    $form['describe']=$_SESSION['prize']['describe'];
    $form['pid']=$_SESSION['prize']['pid'];
    $form['total']=$_SESSION['prize']['total'];
    $code=saveHistory($form);
    return $code;
}
//随机释放奖品时间
function initLotteryData(){
    $LOTTERY_ID=array(1,2,3,4,5);
    $gapSeconds=LOTTERY_HOUR_GAP*3600;
    $nextTime=START_TIME;
    while(($nextTime=$nextTime+$gapSeconds)<END_TIME){
        foreach($LOTTERY_ID as $id){
            $randRelaseTime=rand(-$gapSeconds*LOTTERY_GAP_SHRINK,$gapSeconds*LOTTERY_GAP_SHRINK)+$nextTime;
            insertPrizePool($id,$randRelaseTime);
        }
    }
}
