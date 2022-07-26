<?php
    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));

    $query = $request -> query;

    $query = $conn -> addQ(trim($query));

    if($query != ""){
        $query = $conn -> execute("
        SELECT * FROM directory
        WHERE name LIKE '%".$query."%' 
        OR phone LIKE '%".$query."%'
        OR remark LIKE '%".$query."%' 
        ORDER BY id desc
        ");

        while($result = $query -> fetchRow()){
            $temp[] = array(
                'id' => $result['id'],
                'name' => $result['name'],  
                'phone' => $result['phone'],
                'remark' => $result['remark']
            );
        }

        $data = [];
        $data['result'] = $temp;
    }
    else{
        $query = "
        SELECT * FROM directory
        ORDER BY id desc
        ";

        $data['result'] = "";
    }
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE);

    $conn->close();
