<?php
$url='http://wechat.remymartin.com/nfcsite/index/cron';
$c=file_get_contents($url);
echo $c;