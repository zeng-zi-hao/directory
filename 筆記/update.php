<?php 

    include('ado_conn.php');

    // autoExecute 
    // $table = 'users';
    // $record = array();
    // $record['name'] = 'ddd';
    // $record['phone'] = '1111111111';
    // $record['remark'] = 'update';
    // $where = "name like 'aa%' ";    
    // $conn -> autoExecute($table, $record, 'UPDATE', $where);

    // execute
    $conn -> execute(" UPDATE users SET id = 11, name = 'aa', remark = 'update' WHERE id = 1 ");