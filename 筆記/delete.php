<?php 

    include('ado_conn.php');

    $conn->Execute (" DELETE FROM users WHERE name like 'a%' ");
    
    