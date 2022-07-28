<?php
    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));
    
    $status = $request -> status;

    switch($status){
        case "name":
            $id = $request -> id;
            $name = $request -> name;
            $name = htmlspecialchars($name,ENT_QUOTES);
            $conn -> execute(" UPDATE users SET name='$name' WHERE id = $id ");
            include('trans_data.php');
        
        case "phone":
            $id = $request -> id;
            $phone = $request -> phone;
            $phone = htmlspecialchars($phone,ENT_QUOTES);
            $conn -> execute(" UPDATE users SET phone='$phone' WHERE id = $id ");
            include('trans_data.php');

        case "remark":
            $id = $request -> id;
            $remark = $request -> remark;
            $remark = htmlspecialchars($remark,ENT_QUOTES);
            $conn -> execute(" UPDATE users SET remark='$remark' WHERE id = $id ");
            include('trans_data.php');
    }

    $conn->close();
    