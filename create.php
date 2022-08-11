<?php

    require_once('ado_conn.php');


    $request = json_decode(file_get_contents("php://input"));

    // 驗證規則
    $phone_isnum = "/^[0-9]*$/";
    $name_isword = "/^[\w\x\u4e00-\u9fa5_a-zA-Z0-9]+$/u";
    // $name_isword = "/[\w\x{4e00}-\x{9fa5}]+/u";
    
    // 取得post資料
    $name = $request -> name;
    $phone = $request -> phone;
    $remark = $request -> remark;
    
    // addQ將單引號配上\
    // 消除前後空白
    $name = $conn -> addQ(trim($name));
    $phone = $conn -> addQ(trim($phone));
    $remark = $conn -> addQ(trim($remark));

    // 切割
    $name_arr = mb_str_split($name);
    $phone_arr = mb_str_split($phone);
    $remark_arr = mb_str_split($remark);

    // 判斷create規則
    // 不能空值、姓名小於5、電話小於10、只能中英文和數字
    if($name_arr[0] == "" || $phone_arr[0] == ""){
    }
    else if(count($name_arr) > 5 || count($phone_arr) > 10){
    }
    else if(preg_match($name_isword,$name) == false || preg_match($phone_isnum,$phone)  == false){  
    }
    else{
        $conn -> execute(" INSERT INTO users VALUES('', '$name', '$phone', '$remark')");
    }    
           
    include('data.php');

    $conn->close();