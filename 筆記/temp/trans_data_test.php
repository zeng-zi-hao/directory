<?php
    
    include('無ado連線方式/old_conn.php');

    $query = "SELECT id,name,phone,remark FROM users";
    $list = mysqli_query($conn, $query);    

    $json_data = array();

    while($data =  mysqli_fetch_array($list)) {
        $json_data[] = array(
            'id' => $data['id'],
            'name' => $data['name'],
            'phone' => $data['phone'],
            'remark' => $data['remark']
        );
    }

    $response = [];
    $response['data'] = $json_data;
    
    echo json_encode($response, JSON_PRETTY_PRINT,);