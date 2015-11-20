<?php
date_default_timezone_set('Asia/Taipei');
define('APPLICATION_ENV','staging');
define('APPLICATION_PATH',realpath(dirname(__FILE__).'/app'));

ini_set('session.cookie_lifetime', '0'); // Expired session once browser closed

session_start();
require APPLICATION_PATH.'/../Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(require(APPLICATION_PATH.'/config/config.php'));

// GET route
$routers = glob(APPLICATION_PATH.'/routers/*.router.php');
foreach ($routers as $router) {
    require $router;
}

/*
$models = glob('../models/*.php');
foreach ($models as $model) {
    require $model;
}
*/
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
require APPLICATION_PATH.'/Bootstrap.php';
$bootstrap=new \Bootstrap($app);
$app->run();