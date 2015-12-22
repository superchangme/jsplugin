<?php
$app->map('/',function() use($app){
    $app->redirect($app->_helper->url->make('/html/index.html'));
})->via('GET', 'POST');

$app->get('/index_kpqr/:bottleId', function ($bottleId) use($app){
    $url='http://wechat.remymartin.com/lpnfc/tap/openedbyc';
    $r=$app->_helper->url->sendRequest($url,'post','{"bottle_id":"'.$bottleId.'"}');
    $response=json_decode($r);
    $data['app']=$app;
    $data['qrcodeSrc']='';
    if(isset($response->status) && $response->status=='success')
    {
        $data['qrcodeSrc']=$response->qr_code_url;
        $data['result']='1';
    }
    /**Important**/
    // Retrieve the Qrcode url here //
    //echo json_encode(array('result'=>'1'));
    //echo json_encode(data);
    $app->render('index_kpqr.php',$data);
})->name('nowechat-kpqr')->via('GET');

$app->get('/index_bpym(/:bottleId+)', function ($bottleId='') use($app){
    $data['app']=$app;
    $app->render('index_bpym.php',$data);
})->name('nowechat-bpym')->conditions(array('id' => '.+'))->via('GET');

$app->map('/index/logout',function() use($app){
    session_unset();
    /*
    unset($_SESSION['wechat']);
    unset($_SESSION['fromBar']);
    unset($_SESSION['paramsBeforeRedirect']);
    */
    $app->redirect($app->_helper->url->make('/html/index.html'));
})->via('GET');

//Index method
$app->map('/index',function() use($app){
	unset($_SESSION['fromBar']);
    $isFromBar=$app->request()->get('bar');
    if(!empty($isFromBar) && time()<$app->config('p1EndTime'))
        $_SESSION['fromBar']=$isFromBar;
        /**/
    if(empty($isFromBar))
    	$_SESSION['fromBar']=null;
    	
    if(!isset($_SESSION['wechat']))
	{
		$redirectUrl=$app->_helper->wechat->getAuthorizeUrl();
		echo json_encode(array('result'=>'0','url'=>$redirectUrl));
		return;
	}

    
    /* Helper trigger method
    $signPkg=$app->_helper->wjssdk->getSignPackage();
    print_r($signPkg);exit;
    */
    $wechatObj=$_SESSION['wechat'];
    $url='http://wechat.remymartin.com/lpnfc/tap/enterGame';
    $app->_helper->url->sendRequest($url,'post','{"openId":"'.$wechatObj->openid.'"}');
    $scoreModel=new \Model\Score();
    $wechatObj=$_SESSION['wechat'];
    $scoreInfo=$scoreModel->getScoreByWechat($wechatObj,true);
    
    $dataModel=new \Model\Data();
    $dataModel->saveData('visit','home');
    /**Important**/
    // Enter the Game page here //
    //$app->render('index.php',array('wechat'=>$wechatObj,'app'=>$app));
    $returnJson=array('result'=>'1','id'=>$scoreInfo->id);
    echo json_encode($returnJson);
})->name('nowechat-index')->via('GET');
//Index method end
$app->map('/index/captureshare',function() use($app){
    $dataModel=new \Model\Data();
    $dataModel->saveData('share');
})->via('GET');

$app->map('/index/updatescore',function() use($app){
    $scoreModel=new \Model\Score();
    $wechatObj=$_SESSION['wechat'];
    $scoreInfo=$scoreModel->getScoreByWechat($wechatObj,true);
    $scoreInfo->total=0;
    $gameScore=$app->request()->get();
    $needUpdate=false;
    $total=0;
    $returnResult=array();
    for($i=1;$i<=4;$i++)
    {
        $fieldName='game'.$i;
        if(!empty($gameScore[$fieldName]) && is_numeric($gameScore[$fieldName]) && $gameScore[$fieldName]>$scoreInfo->$fieldName)
        {
            $needUpdate=true;
            $scoreInfo->$fieldName=$gameScore[$fieldName];
        }
        $scoreInfo->total+=$scoreInfo->$fieldName;
        if(isset($_SESSION['fromBar']))
            $scoreInfo->bar=$_SESSION['fromBar'];      
        $returnResult[$fieldName]=$scoreInfo->$fieldName;
    }
    // Prevent hacker
    if(empty($wechatObj->headimgurl) && $scoreInfo->total>10000)
    {
    	$returnResult['result']='1';
        $returnResult['msg']='分数更新成功';
        echo json_encode($returnResult);
        exit;
    }
    // Prevent hacker end
    $returnResult['total']=$scoreInfo->total;
    if($needUpdate)
    {
        $r=$scoreModel->save($scoreInfo);
        if($r)
        {
            $returnResult['result']='1';
            $returnResult['msg']='分数更新成功';
        }
        else
        {
            $returnResult['result']='0';
            $returnResult['msg']='分数更新失败';
        }    
    }
    else
    {
        $returnResult['result']='1';
        $returnResult['msg']='分数不需要更新';
    }
    echo json_encode($returnResult);
})->via('GET');

$app->map('/index/rankinfo(/:id+)',function($id=0) use($app){    
    $scoreModel=new \Model\Score();
    if(empty($id))
    {
        $wechatObj=$_SESSION['wechat'];
        $scoreInfo=$scoreModel->getScoreByWechat($wechatObj,true);
    }
    else
    {
        $scoreInfo=$scoreModel->getItemById($id);
    }
    
    if(empty($scoreInfo))
    {
        echo json_encode(array('result'=>'0','msg'=>'找不到对应的资料'));
        return;
    }
    $whereStack=array();
    if(isset($_SESSION['fromBar']))
    {
        $whereStack['bar=?']=$_SESSION['fromBar'];
    }
    //$topScoresResult=$scoreModel->getItemsByCriteria($whereStack,'order by total DESC',0,50);
    $topScoresResult=$scoreModel->getItemsByCriteria($whereStack,'order by total DESC');
    $selfIndex=-1;
    $index=1;
    if($topScoresResult['total_record']>0)
    {
        foreach($topScoresResult['rows'] as $score)
        {
            if($scoreInfo->openid==$score->openid)
            {
                $selfIndex=$index;
                break;
            }
            $index++;
        }
        $message='排行榜获取成功';
    }
    if($selfIndex<0)
        $selfIndex=rand(50,1500);
    $result=array('result'=>'1','name'=>$app->_helper->emoji->toImage($scoreInfo->name),'img'=>$scoreInfo->img,'total'=>'0');
    for($i=1;$i<=4;$i++)
    {
        $fieldName='game'.$i;
        if(!empty($scoreInfo))
            $result[$fieldName]=$scoreInfo->$fieldName;
        else
            $result[$fieldName]='0';
    }
    if(!empty($scoreInfo))
        $result['total']=$scoreInfo->total;
    $result['rank']=$selfIndex;
    echo json_encode($result);
})->name('nowechat-rankinfo')->conditions(array('id' => '[\s|\d]+'))->via('GET');

$app->map('/index/ranking',function() use($app){
    $scoreModel=new \Model\Score();
    $wechatObj=$_SESSION['wechat'];
    $whereStack=array();
    if(isset($_SESSION['fromBar']) && !empty($_SESSION['fromBar']))
    {
        $whereStack=array('bar=?'=>$_SESSION['fromBar']);
        $whereStack['updated > ?']=$app->config('p1DailyRefreshTime')-86400;
        $whereStack['updated < ?']=$app->config('p1DailyRefreshTime');
    }
    $myScore=$scoreModel->getScoreByWechat($wechatObj,true);
    //$topScoresResult=$scoreModel->getItemsByCriteria($whereStack,'order by total DESC',0,50);
    $topScoresResult=$scoreModel->getItemsByCriteria($whereStack,'order by total DESC');
    $resultList=array();
    $message='本日的挑战就等你来参加!';
    $index=1;
    $selfIndex=-1;
    if($topScoresResult['total_record']>0)
    {
        foreach($topScoresResult['rows'] as $score)
        {
            $score->name=$app->_helper->emoji->toImage($score->name);
            if($score->openid==$wechatObj->openid)
            {
                $score->self=true;
                $selfIndex=$index;
            }
            $score->rank=$index;
            if(count($resultList)<20)
                $resultList[]=$score;
            elseif($selfIndex>0)
                break;  
            $index++;
        }
        $message='排行榜获取成功';
    }
    $myScore->name=$app->_helper->emoji->toImage($myScore->name);
    if($selfIndex<0)
    {
        $selfIndex=rand(50,10000);
    }
    $myScore->rank=$selfIndex;
    $resultList[]=$myScore;
    
    $resule=array('result'=>'1','msg'=>$message,'list'=>$resultList);
    echo json_encode($resule);
})->via('GET');

$app->map('/index/datacapture',function() use($app){
    $position=$app->request()->get('position');
    $type=$app->request()->get('type');
    $dataModel=new \Model\Data();
    $dataModel->saveData($type,$position);
})->via('GET');

$app->map('/index/cron',function() use($app){
    $lockName=APPLICATION_PATH."/data/lock/".date('Ymd').'.html';
    if(time()>$app->config('p1EndTime'))
        die('Event ended at '.date('Y-m-d H:i:s',$app->config('p1EndTime')));
    if(time()<($app->config('p1DailyRefreshTime')-1800) || file_exists($lockName)) //every 0:55 send out notification once per day
    //if(0)
        die('Not the time, planning to launch at '.date('Y-m-d H:i:s',$app->config('p1DailyRefreshTime')-1800));
    $scoreModel=new \Model\Score();
    $bars=$scoreModel->getBars();
    $barArr=array();
    $msgTitle='人头马 - 才华挑战排名';
    //$barNamePool=array('bj'=>'北京','gz'=>'广州','sh'=>'上海');
    $sendContent='';
    $winnerNum=2;
    $contentWin='顾客__NAME__您好，恭喜您在今晚的人头马“才华挑战”游戏中排名第__RANK__，获得本酒吧游戏互动大奖。您可凭此条信息于24小时内至本酒吧人头马现场导购员处领取人头马CLUB特优香槟干邑70CL一瓶！感谢您的参与，期待您继续支持人头马！';
    $contentLost='顾客__NAME__您好，您在今晚的人头马“才华挑战”游戏中排名第__RANK__，感谢你的参与，期待您继续支持人头马！';
    $logContent='wechat message send at : '.date('Y-m-d H:i:s').'<br/>';
    $countingBar=array();
    $winnerTable='Winners data: <br/> <table><tr><td>OpenId</td><td>Nickname</td><td>Img</td><td>Game1</td><td>Game2</td><td>Game3</td><td>Game4</td><td>Total</td><td>Bar</td></tr>';
    $logContent.='<table><tr><td>OpenId</td><td>Nickname</td><td>Img</td><td>Game1</td><td>Game2</td><td>Game3</td><td>Game4</td><td>Total</td><td>Bar</td></tr>';
    foreach($bars as $barNameInfo)
    {
        if(!empty($barNameInfo->bar))
        {
            $winnersResults=$scoreModel->getTopPlayersByBar($barNameInfo->bar);
            //$barName=$barNamePool[$barNameInfo->bar];
            $ranking=1;
            if(!empty($winnersResults))
            {
                foreach($winnersResults as $winnerObj)
                {
                    $tempTableContent='';
                    if(!isset($countingBar[$barNameInfo->bar]))
                        $countingBar[$barNameInfo->bar]=0;
                    if($ranking<=$winnerNum)
                        $content=$contentWin;
                    else
                        $content=$contentLost;
                    //Process Content if need
                    $name=$app->_helper->emoji->shortnameToUnicode($winnerObj->name);
                    $url=$app->_helper->url->make('/html/share.html',array('shareid'=>$winnerObj->id),true);
                    $sendContent=str_replace(array('__NAME__','__RANK__'),array($name,$ranking),$content);
                    echo $sendContent,'<br/>';
                    $r=$app->_helper->wechat->sendMsgByOpenId($winnerObj->openid,$msgTitle,$sendContent,$url,'text');
                    //$r=$app->_helper->wechat->sendMsgByOpenId('oykzLjh42aOfwVZEnfrjnjIIemXU',$msgTitle,$sendContent,$url,'text');
                    $tempTableContent.='<tr><td>'.$winnerObj->openid.'</td><td>'.$winnerObj->name.'</td><td>'.$winnerObj->img.'</td><td>'.$winnerObj->game1.'</td><td>'.$winnerObj->game2.'</td><td>'.$winnerObj->game3.'</td><td>'.$winnerObj->game4.'</td><td>'.$winnerObj->total.'</td><td>'.$winnerObj->bar.'</td></tr>';
                    $logContent.=$tempTableContent;
                    if($ranking<=$winnerNum)
                        $winnerTable.=$tempTableContent;
                    //$logContent.='\r\n sent to openid : '.$winnerObj->openid.', content : '.$sendContent.', result:'.serialize($r);
                    //print_r($r);
                    //TODO write some logs here
                    //Process Content if need end
                    $ranking++;
                    $countingBar[$barNameInfo->bar]++;
                }
            }
        }
    }
    //if()
    //{
    //For Public visitors
        /*
        $ranking=1;
        $rankingResults=$scoreModel->getTopPlayersByBar(null); // fetch all non-bar player
        foreach($rankingResults as $rankObj)
        {
            $content=$contentLost;
            //Process Content if need
            $name=$app->_helper->emoji->shortnameToUnicode($rankObj->name);
            $url=$app->_helper->url->make('/html/share.html',array('shareid'=>$rankObj->id),true);
            $sendContent=str_replace(array('__NAME__','__RANK__'),array($name,$ranking),$content);
            echo $sendContent,'<br/>';
            $r=$app->_helper->wechat->sendMsgByOpenId($rankObj->openid,$msgTitle,$sendContent,$url,'text');
            //$r=$app->_helper->wechat->sendMsgByOpenId('oykzLjh42aOfwVZEnfrjnjIIemXU',$msgTitle,$sendContent,$url,'text');
            $logContent.='\r\n sent to openid : '.$rankObj->openid.', content : '.$sendContent.', result:'.serialize($r);
            //print_r($r);
            //TODO write some logs here
            //Process Content if need end
            $ranking++;
        }
        */
    //For Public visitors end
    //}
    $winnerTable.='</table>';
    $logContent.='</table>';
    foreach($countingBar as $barName=>$num)
        $logContent.='<br/>'.$barName.' - '.$num;
    file_put_contents($lockName,$winnerTable.'<br/><hr/><br/>'.$logContent);
})->name('nowechat-cronjob')->via('GET');