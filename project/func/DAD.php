<?php
    
    require_once('ado_conn.php');

    $users_list = $conn -> execute(" DELETE FROM directory WHERE id BETWEEN 1 AND 20000");
    $conn -> execute(" ALTER TABLE directory AUTO_INCREMENT = 1 "); 
    
    include('trans_data.php');

    $conn->close();
    
    