<?php 

    include('../ado_conn.php');

    // autoExecute 
    // $table = 'users';
    // $record = array();
    // $record['name'] = 'ccc';
    // $record['phone'] = '8888';
    // $record['remark'] = '555566111';    
    // $conn -> autoExecute($table, $record, 'INSERT');

    // execute
    $conn -> execute(" INSERT INTO users VALUES('', 'a', '0123456789', 'one')");
    $conn -> execute(" INSERT INTO users VALUES('', 'b', '1234567890', 'two')");
    $conn -> execute(" INSERT INTO users VALUES('', 'c', '2345678901', 'three')");
    $conn -> execute(" INSERT INTO users VALUES('', 'd', '3456789120', 'four')");
    $conn -> execute(" INSERT INTO users VALUES('', 'e', '4567890123', 'five')");