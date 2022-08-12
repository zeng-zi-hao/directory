<?php
    
    require_once('ado_conn.php');

    $users_list = $conn -> execute(" SELECT id,name,phone,remark FROM users ORDER BY id desc ");    

    $temp = array();

    while($result = $users_list -> fetchRow()) {
        $temp[] = array(
            'id' => $result['id'],
            'name' => $result['name'],
            'phone' => $result['phone'],
            'remark' => $result['remark'],
        );
    }

    $json_data = [];
    $json_data['result'] = $temp;

    echo json_encode($json_data, JSON_UNESCAPED_UNICODE);

    $conn->close();
    
