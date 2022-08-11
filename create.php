<?php

    require_once('ado_conn.php');


    $request = json_decode(file_get_contents("php://input"));

    // 驗證規則
    $phone_isnum = "/^[0-9]*$/";
    $name_isword = "/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/";
    
    // 取得post資料
    $name = $request -> name;
    $phone = $request -> phone;
    $remark = $request -> remark;
    
    // 將資料進行編碼、消除前後空白
    $name = $conn -> addQ(trim($name));
    $phone = $conn -> addQ(trim($phone));
    $remark = $conn -> addQ(trim($remark));

    // 切割
    $name_arr = str_split($name);
    $phone_arr = str_split($phone);
    $remark_arr = str_split($remark);

    // 判斷create規則
    if($name_arr[0] == "" || $phone_arr[0] == ""){
    }
    elseif(count($name_arr) > 5 || count($phone_arr) > 10){
    }
    else if(preg_match($name_isword,$name) == false || preg_match($phone_isnum,$phone)  == false){  
    }
    else{
        $conn -> execute(" INSERT INTO users VALUES('', '$name', '$phone', '$remark')");
    }    
           
    include('trans_data.php');

    $conn->close();