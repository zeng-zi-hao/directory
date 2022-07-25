<?php
include('adodb/adodb.inc.php');

$driver = 'mysqli';
$server = 'localhost';
$user = 'root';
$password = "";
$database = 'directory'; # eg. 'mysqli' or 'oci8'

$conn = adoNewConnection($driver); 
$conn->debug = false;
$conn->connect($server, $user, $password, $database);

if(!$conn){
    echo '連線失敗';
}
echo "<pre>";
echo '連線成功';
echo "</pre>";
