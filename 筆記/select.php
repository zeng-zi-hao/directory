<?php 

    include('ado_conn.php');

    $a = $conn -> execute(" SELECT * FROM users limit 5 ");

    echo $a;
    phpinfo();

