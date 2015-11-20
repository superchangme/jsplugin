<form action='' method='post'>
    <input type='text' name='name'>
    <input type='submit'/>
</form>
<?php echo empty($name)?'':$name;?>
<?php echo $app->_helper->emoji->toImage(':bear:');?>
<?php echo $app->_helper->url->make('/wechat/authorize');?>