<?php
    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));

    // 驗證規則
    $phone_isnum = "/^[0-9]*$/";
    $name_isword = "/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/";
    
    $status = $request -> status; 

    switch($status){
        case "name":
            $id = $request -> id;
            $name = $request -> name;
            $name = $conn -> addQ(trim($name));
            $name_arr = str_split($name);
            if($name_arr[0] == ""){        
            }
            elseif(count($name_arr) > 5){
            }
            else if(preg_match($name_isword,$name) == false){
            }
            else{
                $conn -> execute(" UPDATE users SET name='$name' WHERE id = $id ");
            }            
            include('trans_data.php');
        
        case "phone":
            $id = $request -> id;
            $phone = $request -> phone;
            $phone = $conn -> addQ(trim($phone));
            $phone_arr = str_split($phone);
            if($phone_arr[0] == ""){        
            }
            elseif(count($phone_arr) > 10){
            }
            else if(preg_match($phone_isnum,$name) == false){
            }
            else{
                $conn -> execute(" UPDATE users SET phone='$phone' WHERE id = $id ");
            }            
            include('trans_data.php');

        case "remark":
            $id = $request -> id;
            $remark = $request -> remark;
            $remark = $conn -> addQ(trim($remark));
            $conn -> execute(" UPDATE users SET remark='$remark' WHERE id = $id ");
            include('trans_data.php');
    }

    $conn->close();
    