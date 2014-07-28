<?php 

## No user editable settings in this file - for configuration options use config.php

//Include configuration file
require('config.php');

//Load the Content Creator class
require('contentcreator.php');
$LOADER = new ContentCreator();

// Enforce no trailing slash in the URL
if (substr($_SERVER['QUERY_STRING'], -1) == "/") {
    header("Location: " . $_SERVER['REQUEST_SCHEME'] . "://" . $_SERVER["SERVER_NAME"] . substr($_SERVER['REQUEST_URI'],0,-1));
    exit();
}

// Determine our URI
if (isset($_SERVER['PATH_INFO'])) {
    $uri = $_SERVER['PATH_INFO'];
} else {
    $uri = $_SERVER['QUERY_STRING'];
}
$uri = explode('/', $uri);
if(isset($uri[1]) && $uri[1] != '') {
	$section = $uri[1];
} else {
	$section = $default;
}

// Determine base URL
$dirname = dirname($_SERVER['SCRIPT_NAME']);
if (substr($dirname, -1) != '/') {
    $dirname = $dirname . '/';
}
$baseURL = "//" . $_SERVER["SERVER_NAME"] . $dirname;

// Function to generate absolute URLs
function site_url($file = '') {
	global $baseURL;
	return $baseURL . $file;
}

//Is the requested page allowed?
if(!in_array($section, $sections)) {
	die(header('Location: '.site_url()));
}

//Do we need to load the database?
if(in_array($section, $dbsecs)) {
	$db = mysql_connect($hostname, $username, $password);
	
	if(!$db){
		require('content/wrapper/header.php');
		require('content/errors/db_connect_failure.php');
		require('content/wrapper/footer.php');
		die();
	}

	if(!mysql_select_db($dbname, $db)) {
		require('content/wrapper/header.php');
		require('content/errors/db_connect_failure.php');
		require('content/wrapper/footer.php');
		die();
	}
}

//Does the content directory exist?
if(!file_exists('content/'.$section)) {
	die(header('Location: '.site_url()));
}

// Load and Render Content
$LOADER->loadContent($section);

?>