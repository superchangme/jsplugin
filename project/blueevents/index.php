<?php
ini_set("display_errors","On");
error_reporting(E_ALL);
date_default_timezone_set('Asia/Taipei');

// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/application'));
// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path

set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
    get_include_path(),
)));
/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run

//To load cached application.ini
defined('CONFIG_INC')
    || define('CONFIG_INC',
              APPLICATION_PATH . '/configs/application.ini.inc');
 
// if no cache file, will load ini
$configFile = CONFIG_INC;
$noConfigCache = false;
if (false == is_file(CONFIG_INC)) {
    $configFile = APPLICATION_PATH . '/configs/application.ini';
    $noConfigCache = true;
}
$application = new Zend_Application(
    APPLICATION_ENV,
    $configFile
);

// to initialize applciation cache file
if ($noConfigCache && APPLICATION_ENV=='production') {
    $configs = '<?php' . PHP_EOL
             . 'return '
             . var_export($application->getOptions(), true) . PHP_EOL
             . '?>';
    file_put_contents(CONFIG_INC, $configs);
}

/** Get and set Translation 
$translate = new Zend_Translate('tmx', 'translates/content.tmx', 'en');
$translate->addTranslation('translates/form.tmx', 'en');
$translate->addTranslation('translates/menu.tmx', 'en');
$translate->addTranslation('translates/email.tmx', 'en');

Zend_Registry::set('Zend_Translate', $translate);
*/
if(!defined('DONT_RUN_APP') || DONT_RUN_APP == false)
{
$application->bootstrap()
            ->run();
}