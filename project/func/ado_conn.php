<?php
date_default_timezone_set('Asia/Taipei');
include('adodb/adodb.inc.php');

$driver = 'mysqli';
$server = 'localhost';
$user = 'root';
$password = "";
$database = 'project';

$conn = adoNewConnection($driver); 
$conn->connect($server, $user, $password, $database);

if(!$conn){
    error_log(date("[Y-m-d G:i] ")."Error Message: 連接伺服器失敗".PHP_EOL, 3 , "C:\\xampp\\htdocs\\directory\\php\\log\\log");
}
