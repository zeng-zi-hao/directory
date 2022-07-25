<?php

    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));
    
    
    $name = $request -> name;
    $phone = $request -> phone;
    $remark = $request -> remark;

    $conn -> execute(" INSERT INTO users VALUES('', '$name', '$phone', '$remark')");

    // echo $name,$phone,$remark;

    include('trans_data.php');

    $conn->close();