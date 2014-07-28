<?php

## Begin user editable settings

// Base URL
//$baseURL = 'http://'.$_SERVER['SERVER_NAME'].'/tsa/';

// Default section
$default = 'home';

// Allowable sections - order MUST match the order of links the navbar
$sections[] = 'home';
$sections[] = 'artifacts';

// Title Aliasis
$alias['home'] = 'Museum Home';
$alias['artifacts'] = 'Browse Artifacts';

// Delimiter between sections
$preDelimiter = '';
$postDelimiter = '';

// Sections to Include Database
$dbsecs[] = '';

// Database Login Information
$hostname = 'jmooneyham.serveftp.net';
$username = 'tsa';
$password = 'tsamysql';
$dbname =	'tsa';

## End user editable settings

?>