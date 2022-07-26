<?php
    
    require_once('ado_conn.php');

    $users_list = $conn -> execute(" DELETE FROM users WHERE id IN (1,2,3,4,5) ");
    $conn -> execute(" ALTER TABLE users AUTO_INCREMENT = 1 "); 
    
    include('trans_data.php');

    $conn->close();
    
    