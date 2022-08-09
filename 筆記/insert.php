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
    $conn -> execute(" INSERT INTO users VALUES('', 'henry', '0932185585', 'Hello World!!')");
    $conn -> execute(" INSERT INTO users VALUES('', '曾子豪', '0911063656', 'Goodbye World!')");
    $conn -> execute(" INSERT INTO users VALUES('', 'WREN', '0912394878', ''')");
    $conn -> execute(" INSERT INTO users VALUES('', 'VERA', '0952768902', '<>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'ERICA', '0989820809', '$$')");
    $conn -> execute(" INSERT INTO users VALUES('', 'CODY', '0953885872', '**')");
    $conn -> execute(" INSERT INTO users VALUES('', 'PIPER', '0961969126', '<script> alert('boom') </script>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'APRIL', '0938342682', '-- SELECT * FROM users; SELECT * FROM users --')");
    $conn -> execute(" INSERT INTO users VALUES('', 'LEONA', '0963483110', '#@&*^@*(^&*(@')");
    $conn -> execute(" INSERT INTO users VALUES('', 'NOLAN', '0971202421', 'five')");
    $conn -> execute(" INSERT INTO users VALUES('', 'DAISY', '0987682520', 'two')");
    $conn -> execute(" INSERT INTO users VALUES('', 'JULIE', '0954932198', 'three')");
    $conn -> execute(" INSERT INTO users VALUES('', 'JACK', '0934297657', 'four')");
    $conn -> execute(" INSERT INTO users VALUES('', 'JOE', '0953128293', 'five')");
    $conn -> execute(" INSERT INTO users VALUES('', 'NOLA', '0927696704', 'one')");
    $conn -> execute(" INSERT INTO users VALUES('', 'ALEC', '0955549001', 'y')");