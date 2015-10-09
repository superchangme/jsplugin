<?php
class IndexController extends Zend_Controller_Action
{
    public function init()
    {
    	$this->_helper->layout()->disableLayout();
    	$session_visitor=new Zend_Session_Namespace("visitor");
    	//$reqController=$this->getRequest()->getControllerName();
    	$reqAction=$this->getRequest()->getActionName();
    	$params=$this->getRequest()->getParams();
    	$openid=trim($session_visitor->openid);
    	if(empty($openid) && $reqAction!='wechatauthorize' && $reqAction!='govoting')
    	{
    	    /*
    		$session_visitor->nickname='Leung';
    		$session_visitor->openid='X763734XISIasd981234';
    		
    		$session_visitor->redirectParams=$params;
    		$this->_helper->redirector('wechatauthorize','index');
    		*/
    	}
    }
    
    public function logoutAction()
	{
		$this->getHelper('viewRenderer')->setNoRender(); //remove other display
		$ud=new Zend_Session_Namespace("visitor");
		$ud->unsetAll();
		$this->_helper->redirector("index","index","default");
	}
    
	public function indexAction()
	{
	    //$this->getHelper('viewRenderer')->setNoRender(); //remove other display if submit succeed
	    $req=$this->getRequest();
	    $id=$req->getParam('id');
	    $newsModel=new Admin_Model_News();
	    $dataModel=new Admin_Model_Data();
	    if($req->isPost())
	    {
	        $this->getHelper('viewRenderer')->setNoRender(); //remove other display if submit succeed
    	    $recordFileName=Zend_Session::getId().'_'.date('YmdHis').'_'.rand();
    	    $name=$req->getPost('name');
    	    $sex=$req->getPost('sex');
    	    if(empty($name) || empty($sex))
    	    {
    	        $returnArr=array('result'=>'0','message'=>'请输入完整的资料 from:后台');
    	        $validate=false;
    	    }
    	    else
    	        $validate=true;
    	    if($validate)
    	    {
        	    $contentIndex=$newsModel->draw($sex);
        	    //$content=str_replace('__NAME__',$name,$newsModel->newsCache[$contentIndex]);
        	    //$content=$newsModel->newsCache[$contentIndex];
        	    $contentText=$newsModel->processNameInContentText($name,$newsModel->getNewsContentByIndex($contentIndex));
        	    $contentInfo=str_replace(' ','',$newsModel->seperateContent($contentText));
    	    	$content='蓝鸟大事件独家播报,'.$contentInfo[1];
    	    	//$content='蓝鸟大事件独家播报, '.$contentInfo[1];
    	    	//echo $content;exit;
        	    $this->_helper->voice->text2Voice($content,$recordFileName);
                $news=$newsModel->createRow(array('name'=>$name,'mp3'=>$recordFileName,'content'=>$contentIndex,'created'=>time()));
                $id=$news->save();
                if(empty($id))
                {
                    $returnArr=array('result'=>'0','message'=>'保存失败');
                }
                else
                {
                    $dataModel->saveData('participant');
                    $url=$this->view->serverUrl().$this->view->url(array('action'=>'index','controller'=>'index','id'=>$id),null,true);
                    $returnArr=array('result'=>'1','message'=>'保存成功','url'=>$url);
                }
    	    }
            //$result="<script>window.name='".Zend_Json::encode($returnArr)."';</script>";
			$result=Zend_Json::encode($returnArr);
            echo $result;
	    }
	    elseif(!empty($id) && is_numeric($id))
	    {
	        $fakeModel=new Admin_Model_Fakenum();
    	    $dataModel->saveData('visit','view');
    	    
    	    $displayParticipant=$fakeModel->getFakeFactorByName('participant')+$dataModel->getCountNumByAction('participant');
    	    $displayVisit=$fakeModel->getFakeFactorByName('visit')+$dataModel->getCountNumByAction('visit');
    	    $displayShare=$fakeModel->getFakeFactorByName('share')+$dataModel->getCountNumByAction('share');
    	    $news=$newsModel->getItemById($id);
    	    if(!empty($news)){
    	            	    $contentText=$newsModel->processSpecialWordsInContentText($newsModel->processNameInContentText($news->name,$newsModel->getNewsContentByIndex($news->content)));
                    	    $contentInfo=str_replace(' ','',$newsModel->seperateContent($contentText));
                    	    $news->contentText=$contentInfo[1];
                    	    $news->title=$contentInfo[0];
                    	    //$this->view->signPackage=$this->_helper->wjssdk->GetSignPackage();
                    	    $this->view->displayNum=array('participant'=>$displayParticipant,'visit'=>$displayVisit,'share'=>$displayShare);
                    	    $this->view->news=$news;
    	    }
			$dataModel=new Admin_Model_Data();
			$dataModel->saveData('visit','home');
	    }
	    $this->view->signPackage=$this->_helper->wjssdk->GetSignPackage();
	}
	
	public function viewAction() //查看具体事件
	{
	    $fakeModel=new Admin_Model_Fakenum();
	    $dataModel=new Admin_Model_Data();
	    $dataModel->saveData('visit','view');
	    
	    $displayParticipant=$fakeModel->getFakeFactorByName('participant')+$dataModel->getCountNumByAction('participant');
	    $displayVisit=$fakeModel->getFakeFactorByName('visit')+$dataModel->getCountNumByAction('visit');
	    $displayShare=$fakeModel->getFakeFactorByName('share')+$dataModel->getCountNumByAction('share');
	    $id=$this->getRequest()->getParam('id');
	    $newsModel=new Admin_Model_News();
	    $news=$newsModel->getItemById($id);
	    
	    $contentText=$newsModel->processNameInContentText($news->name,$newsModel->getNewsContentByIndex($news->content));
	    $contentInfo=$newsModel->seperateContent($contentText);
	    $news->contentText=$contentInfo[1];
	    $news->title=$contentInfo[0];
	    //$this->view->signPackage=$this->_helper->wjssdk->GetSignPackage();
	    $this->view->displayNum=array('participant'=>$displayParticipant,'visit'=>$displayVisit,'share'=>$displayShare);
	    $this->view->news=$news;
	}
	
	
    public function testAction()
    {
    	//$this->view->signPackage=$this->_helper->wjssdk->GetSignPackage();
        $session_visitor=new Zend_Session_Namespace("visitor");
        $newsModel=new Admin_Model_News();
        foreach($newsModel->newsCache as $index=>$content)
        {
            //$recordFileName=$session_visitor->openid.'_'.date('YmdHis').'_'.rand();
            $recordFileName='begining';
            //$content=str_replace('__NAME__',$name,$content);
            /*
            $content='本节目由蓝鸟大事件独家播报，关注大事件，马上点击更多爆料';
            $this->_helper->voice->text2Voice($content,$recordFileName,array('spd'=>9,'pit'=>7,'per'=>0));
            */
            $content='蓝鸟大事件独家播报';
            $this->_helper->voice->text2Voice($content,$recordFileName);
        }
        
    	
    	//$content=$newsModel->draw();
    	
        exit;
    }
    
    public function saveshareAction() // 记录分享次数
    {
        $this->getHelper('viewRenderer')->setNoRender();
        $dataModel=new Admin_Model_Data();
        $position=$this->getRequest()->getParam('pos');
        if(empty($position))
            $position='home';
        elseif($position!='home')
            $position='view';
        $id=$dataModel->saveData('share',$position);
        if(empty($id))
            $result=array('result'=>'0','message'=>'分享失败');
        else
            $result=array('result'=>'1','message'=>'分享成功','id'=>$id);
        echo Zend_Json::encode($result);
    }
    
    public function wechatauthorizeAction()
    {
    	$this->getHelper('viewRenderer')->setNoRender(); //remove other display
    	$step=$this->getRequest()->getParam('s');
    	if(empty($step))
    	{
	    	$redirUrl=$this->view->serverUrl().$this->view->url(array('controller'=>'index','action'=>'wechatauthorize','s'=>'code'),null,true);
	    	$this->_helper->wechat->authorize($redirUrl);
    	}
    	else if($step=='code')
    	{
			$state=$this->getRequest()->getParam('state');
			$code=$this->getRequest()->getParam('code');
			if(empty($code))
			{
				header('Location: '.$this->view->serverUrl().$this->view->url(array('controller'=>'index','action'=>'wechatauthorize'),null,true));
				exit;
			}
			$r=$this->_helper->wechat->getAccessTokenByCode($code);// getting openId
			//print_r($r);
			$json=Zend_Json::decode($r);
			if(!empty($json['access_token']) && !empty($json['openid']))
			{
				echo '<br/>Getting userinfo<br/>';
				$r=$this->_helper->wechat->getUserInfoByOpenID($json['access_token'],$json['openid']);
				$userJson=Zend_Json::decode($r);
				$session_visitor=new Zend_Session_Namespace("visitor");
				foreach($userJson as $field=>$val)
				{
					$session_visitor->$field=$val;
				}
				$urlParams=$session_visitor->redirectParams;
				if(!empty($urlParams))
				{
					$url=$this->view->url($urlParams,null,true);
					$url=str_replace('/index.php','',$url);
					$this->_redirect($url);
				}
				//echo $userJson['nickname'];
				//echo '<img src="'.$userJson['headimgurl'].'"/>';
			}
    	}
    }
	
	    public function wxjssdksignAction()
    {
    	$this->getHelper('viewRenderer')->setNoRender(); //remove other display
    	$signPackage=$this->_helper->wjssdk->GetSignPackage();
    	echo Zend_Json::encode($signPackage);
    }
}