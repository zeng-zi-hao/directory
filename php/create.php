<?php

    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));

    // 驗證規則
    $phone_isnum = "/^[0-9]*$/";
    $name_isword = "/^[\w\u4e00-\u9fa5]+$/u";
    // $name_isword = "/^[\w\x\u4e00-\u9fa5_a-zA-Z0-9]+$/u";
    
    // 取得post資料
    $name = $request -> name;
    $phone = $request -> phone;
    $remark = $request -> remark;
    
    // addQ將單引號配上\
    // 消除前後空白
    $name = $conn -> addQ(trim($name));
    $phone = $conn -> addQ(trim($phone));
    $remark = $conn -> addQ(trim($remark));      
    // $name =  mysqli_real_escape_string($conn->_connectionID, trim($name));
    // $phone =  mysqli_real_escape_string($conn->_connectionID, trim($phone));  
    // $remark =  mysqli_real_escape_string($conn->_connectionID, trim($remark));

    // 切割
    $name_arr = mb_str_split($name);
    $phone_arr = mb_str_split($phone);
    $remark_arr = mb_str_split($remark);

    // 判斷create規則
    // 不能空值、姓名小於5、電話小於10、只能中英文和數字
    if($name_arr[0] == "" || $phone_arr[0] == ""){
        error_log(date("[Y-m-d G:i] ")."Error Message: Create 姓名或電話為空值".PHP_EOL, 3 , "C:\\xampp\\htdocs\\directory\\php\\log\\log");
    }
    else if(count($name_arr) > 5 || count($phone_arr) > 10){
        error_log(date("[Y-m-d G:i] ")."Error Message: Create 姓名或電話超過規定長度".PHP_EOL, 3 , "C:\\xampp\\htdocs\\directory\\php\\log\\log");
    }
    else if(preg_match($name_isword,$name) == false || preg_match($phone_isnum,$phone)  == false){  
        error_log(date("[Y-m-d G:i] ")."Error Message: Create 姓名或電話不能包含符號".PHP_EOL, 3 , "C:\\xampp\\htdocs\\directory\\php\\log\\log");
    }
    else{
        $conn -> execute(" INSERT INTO users VALUES('', '$name', '$phone', '$remark')");
        error_log(date("[Y-m-d G:i] ")."Success Eessage: Create 成功".PHP_EOL, 3 , "C:\\xampp\\htdocs\\directory\\php\\log\\log");
    }    
           
    include('data.php');

    $conn->close();