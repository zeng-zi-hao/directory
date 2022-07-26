<?php
    
    require_once('ado_conn.php');

    $users_list = $conn -> execute(" DELETE FROM users WHERE id IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15) ");
    $conn -> execute(" ALTER TABLE users AUTO_INCREMENT = 1 "); 
    
    include('trans_data.php');

    $conn->close();
    
    