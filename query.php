<?php
    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));

    $query = $request -> query;

    $query = htmlspecialchars($query,ENT_QUOTES);
    
    if($query != ''){
        $query = $conn -> execute("
        SELECT * FROM users
        WHERE name LIKE '%".$query."%' 
        OR phone LIKE '%".$query."%'
        OR remark LIKE '%".$query."%' 
        ORDER BY id
        ");
    }
    else{
        $query = "
        SELECT * FROM users
        ORDER BY id
        ";
    }
    
    // $temp = array();
    while($result = $query -> fetchRow()){
        $temp[] = array(
            'id' => htmlspecialchars_decode($result['id'],ENT_QUOTES),
            'name' => htmlspecialchars_decode($result['name'],ENT_QUOTES),  
            'phone' => htmlspecialchars_decode($result['phone'],ENT_QUOTES),
            'remark' => htmlspecialchars_decode($result['remark'],ENT_QUOTES)
        );
    }
    $data = [];
    $data['result'] = $temp;
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE);

    $conn->close();
