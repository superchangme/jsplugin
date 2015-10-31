<?php
// 参数数组
$lotteryCount=0;
$totalTimes=1000;
$cookie_jar = tempnam('D:/temp','PHPSESSID');
//$cookie_jar = 'D:/temp/PHP2C3A.tmp';
function lottery(){
    global $lotteryCount;
    global $cookie_jar;
    $uri = "http://127.0.0.1/tomlib/nandu/src/php/main.php?op=lottery";
    $lotteryCount+=1;
    $data = array (
        'name' => 'tanteng'
        // 'password' => 'password'
    );
    
    $ch = curl_init ();
    // print_r($ch);
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_jar);
    
    curl_setopt ( $ch, CURLOPT_URL, $uri );
    curl_setopt ( $ch, CURLOPT_POST, 1 );
    curl_setopt ( $ch, CURLOPT_HEADER, 0 );
    //curl_setopt ( $ch, CURLOPT_USERAGENT, "monitor" );
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: text/plain',
        'User-Agent: monitor'
    ));
   
    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );
    $return = curl_exec ( $ch );
    $http_code = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
    
    curl_close ( $ch );
    /*-----使用COOKIE-----*/
    //$return = json_encode($return);
    //$temp=utf8_decode('{"result":"0","code":"1","id":"0","path":"","msg":"\u624b\u6c14\u4e0d\u592a\u597d"}');
    //echo json_decode("\u624b\u6c14\u4e0d\u592a\u597d", JSON_UNESCAPED_UNICODE);
    print_r("第".$lotteryCount."次抽奖");
    //echo "-------";print_r(json_decode($return));echo "-------";
    //$return='{"result":"0","code":"1","id":"0","path":"","msg":"\u624b\u6c14\u4e0d\u592a\u597d"}';
    
    //echo json_last_error_msg();
    
    //echo "<br>http_code==" . $http_code;
    if ($http_code == 200) {

        $data=getJsonByText($return);
        echo $data->msg;
        if($data->prizeNum!=0){
            saveForm();    
        }

       
    }
    echo '<br/>';

    return array();
}


function saveForm(){
    global $cookie_jar;
    
    $uri = "http://127.0.0.1/tomlib/nandu/src/php/main.php?op=saveform";
    
    $data = array (
        'name' => getRandomText('abcdefghijklmnopqrstuvwxyz', 6),
        'phone' => getRandomText('123567890123567890', 11),
        'address'=>'you can\'t find me'
        // 'password' => 'password'
    );
    //echo http_build_query($data);
    $ch = curl_init ();
    // print_r($ch);
    curl_setopt ( $ch, CURLOPT_URL, $uri );
    curl_setopt ( $ch, CURLOPT_POST, 1 );
    curl_setopt ( $ch, CURLOPT_HEADER, 0 );
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_jar);
    
    //curl_setopt ( $ch, CURLOPT_USERAGENT, "monitor" );
    curl_setopt ( $ch, CURLOPT_HTTPHEADER, array(
        "content-type: application/x-www-form-urlencoded;charset=UTF-8",
        'User-Agent: monitor'
    ));
    curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt ( $ch, CURLOPT_POSTFIELDS, http_build_query($data) );
    $return = curl_exec ( $ch );
    $http_code = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
   // print_r(curl_getinfo($ch));
    curl_close ( $ch );
    //print_r($return);
    print_r($return);
    
    if ($http_code == 200) {
        // 失败返回空数组
       // print_r($return);
        
       // $data=getJsonByText($return);
        //print_r($data);
        //echo $data->msg;
        return array();
    }
}

function getJsonByText($result,$isArr=false){
    $result = trim($result, "\xEF\xBB\xBF");
    switch (json_last_error()) {
        case JSON_ERROR_NONE:
            echo '没有错误发生';
            break;
        case JSON_ERROR_DEPTH:
            echo '到达了最大堆栈深度';
            break;
        case JSON_ERROR_STATE_MISMATCH:
            echo '无效或异常的 JSON';
            break;
        case JSON_ERROR_CTRL_CHAR:
            echo '控制字符错误，可能是编码不对';
            break;
        case JSON_ERROR_SYNTAX:
            echo '语法错误';
            break;
        case JSON_ERROR_UTF8:
            echo '异常的 UTF-8 字符，也许是因为不正确的编码。';
            break;
        default:
            echo '未知错误';
            break;
    }
    return json_decode($result,$isArr);
}

function getRandomText($text,$len){
    $arr=str_split($text);
    shuffle($arr);
    $rst=implode("",$arr);
    return substr($rst,0,$len);    
}
//test lottery

for($i=0;$i<$totalTimes;$i++){
    lottery();
}
//$return='{"result":"0","code":"1","id":0,"path":"","msg":"\u62bd\u5230\u4e86!","prizeNum":5}';
//$data=json_decode($return);