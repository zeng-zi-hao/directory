<?php

require_once('ado_conn.php');
$request = json_decode(file_get_contents("php://input"));

$name = $request -> register_name;
$phone = $request -> register_phone;
$mail = $request -> register_mail;
$password = $request -> register_password;
$confirm_password = $request -> register_confirm_password;



$conn -> execute(" INSERT INTO users VALUES('', '$name', '$mail', '$password', '$phone', '0')");