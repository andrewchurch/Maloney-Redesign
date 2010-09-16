<?php
$parts = explode('/', $_SERVER['REQUEST_URI']);
define('SECTION', $parts[1] ? $parts[1] : 'home');

define('LASTFM_KEY', 'f99e29f7adabf3e1c152e2d5a890500c');

include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/functions.inc.php';	
?>