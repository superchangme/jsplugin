<?php 
ini_set('date.timezone','Asia/Shanghai');
$mainFile=dirname(__FILE__).'/main.php'; 
$fileInputs=file_get_contents($mainFile);
echo $mainFile;
echo preg_replace("/define\('START_TIME'[^;]*;/", "123","define('START_TIME',strtotime('2015-10-22 00:00:00'));")   ;
//echo date("Y-m-d H:i:s",strtotime(date("Y-m-d H:i:s")));
//echo date("Y-m-d H:i:s",strtotime("2015-08-23 23:59:59"));
if(strtolower($_SERVER['REQUEST_METHOD'])=="post"){
  
    if(!empty($_POST["startDate"])&&!empty($_POST["endDate"])){
        $startDate=$_POST["startDate"];
        $endDate=$_POST["endDate"];
        if(!empty($_POST['user'])&&!empty($_POST['password'])&&$_POST['user']=="andi"&&$_POST['password']=="andiisagirl"){  
           if($_POST["startDate"]>$_POST["endDate"]){
               echo '结束时间需要大于开始时间';
           }else{
               $fileInputs=preg_replace("/define\('START_TIME'[^;]*;/", "define('START_TIME',strtotime('".$startDate." 00:00:00'));",$fileInputs)   ;
               $fileInputs=preg_replace("/define\('END_TIME'[^;]*;/", "define('END_TIME',strtotime('".$endDate." 23:59:59'));",$fileInputs)   ;
               file_put_contents($mainFile, $fileInputs);
               echo '成功修改活动时间为'.$startDate.' 00:00:00 到'.$endDate.'23:59:59';
           }
       }
    }
    
}else{
    ?>
    <form method='post'>
  用户名  <input type='text' name='user'/>
   密码  <input type='password' name='password'/>
      活动开始时间      <input type='date' name='startDate'/>
  活动结束时间          <input type='date' name='endDate'/>
    <button type='submit'>提交</button>
    </form>
    <?php 
}