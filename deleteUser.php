<?php
    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));

    $id = $request -> id;
    
    $conn -> execute(" DELETE FROM users WHERE id = '$id' ");
    $conn -> execute(" ALTER TABLE users AUTO_INCREMENT = 1 ");

    include('trans_data.php');

    $conn->close();