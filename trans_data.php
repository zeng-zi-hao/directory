<?php
    
    require_once('ado_conn.php');

    $users_list = $conn -> execute(" SELECT id,name,phone,remark FROM users ");    

    $temp = array();

    while($result = $users_list -> fetchRow()) {
        $temp[] = array(
            'id' => htmlspecialchars_decode($result['id'],ENT_QUOTES),
            'name' => htmlspecialchars_decode($result['name'],ENT_QUOTES),  
            'phone' => htmlspecialchars_decode($result['phone'],ENT_QUOTES),
            'remark' => htmlspecialchars_decode($result['remark'],ENT_QUOTES)
        );
    }

    $json_data = [];
    $json_data['result'] = $temp;

    file_put_contents('json/data.json',json_encode($json_data, JSON_UNESCAPED_UNICODE));

    // echo json_encode($json_data, JSON_UNESCAPED_UNICODE);
    $conn->close();
    
    