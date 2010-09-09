<?php
$parts = explode('/', $_SERVER['REQUEST_URI']);
define('SECTION', $parts[1] ? $parts[1] : 'home');
?>