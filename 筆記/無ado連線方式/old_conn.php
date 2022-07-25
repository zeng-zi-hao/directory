<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = 'directory';
 
// 建立連接
$conn = mysqli_connect($servername, $username, $password, $database);
 
// 檢查連接
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
// echo "連接成功";
?>