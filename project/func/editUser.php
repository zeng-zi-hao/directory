<?php
    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));

    // 驗證規則
    $phone_isnum = "/^[0-9]*$/";
    $name_isword = "/^[\w\u4e00-\u9fa5]+$/u";
    // $name_isword = "/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/";
    
    $status = $request -> status; 
    $id = $request -> id;

    switch($status){
        case "name":
            $name = $request -> name;
            $name = $conn -> addQ(trim($name));
            // $name =  mysqli_real_escape_string($conn->_connectionID, trim($name));
            $name_arr = str_split($name);
            if($name_arr[0] == ""){  
                error_log(date("[Y-m-d G:i] ")."Error Message: Edit= {". $id ."} 姓名不能空值".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");      
            }
            elseif(count($name_arr) > 5){
                error_log(date("[Y-m-d G:i] ")."Error Message: Edit= {". $id ."} 姓名大於規定長度".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");
            }
            else if(preg_match($name_isword,$name) == false){
                error_log(date("[Y-m-d G:i] ")."Error Message: Edit= {". $id ."} 姓名不能包含符號".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");
            }
            else{
                $conn -> execute(" UPDATE directory SET name='$name' WHERE id = $id ");
                error_log(date("[Y-m-d G:i] ")."Success Message: Edit= {". $id ."} 姓名成功".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");
            }            
            include('data.php');
            break;
        
        case "phone":
            $phone = $request -> phone;
            $phone = $conn -> addQ(trim($phone));
            // $phone =  mysqli_real_escape_string($conn->_connectionID, trim($phone));
            $phone_arr = str_split($phone);
            if($phone_arr[0] == ""){  
                error_log(date("[Y-m-d G:i] ")."Error Message: Edit= {". $id ."} 電話不能空值".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");       
            }
            elseif(count($phone_arr) > 10){
                error_log(date("[Y-m-d G:i] ")."Error Message: Edit= {". $id ."} 電話大於規定長度".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");
            }
            else if(preg_match($phone_isnum,$name) == false){
                error_log(date("[Y-m-d G:i] ")."Error Message: Edit= {". $id ."} 電話不能包含符號".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");
            }
            else{
                $conn -> execute(" UPDATE directory SET phone='$phone' WHERE id = $id ");
                error_log(date("[Y-m-d G:i] ")."Success Message: Edit= {". $id ."} 電話成功".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");
            }            
            include('data.php');
            break;

        case "remark":
            $remark = $request -> remark;
            $remark = $conn -> addQ(trim($remark));
            // $remark =  mysqli_real_escape_string($conn->_connectionID, trim($remark));
            $conn -> execute(" UPDATE directory SET remark='$remark' WHERE id = $id ");
            error_log(date("[Y-m-d G:i] ")."Success Message: Edit= {". $id ."} 備註成功".PHP_EOL, 3 , "\\xampp\\htdocs\\directory\\php\\log\\log");
            include('data.php');
            break;
    }

    $conn->close();
    