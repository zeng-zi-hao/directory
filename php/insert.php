<?php 

    include('ado_conn.php');

    $conn -> execute(" INSERT INTO users VALUES('', 'henry', '0932185585', 'Hello World!!')");
    $conn -> execute(" INSERT INTO users VALUES('', '曾子豪', '0911063656', 'Goodbye World!')");
    $conn -> execute(" INSERT INTO users VALUES('', 'WREN', '0912394878', ''')");
    $conn -> execute(" INSERT INTO users VALUES('', 'VERA', '0952768902', '<>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'ERICA', '0989820809', '$$')");
    $conn -> execute(" INSERT INTO users VALUES('', 'CODY', '0953885872', '**')");
    $conn -> execute(" INSERT INTO users VALUES('', 'PIPER', '0961969126', '<script> alert('boom') </script>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'APRIL', '0938342682', ';SELECT * FROM users; SELECT * FROM users --')");
    $conn -> execute(" INSERT INTO users VALUES('', 'LEONA', '0963483110', '#@&*^@*(^&*(@')");
    $conn -> execute(" INSERT INTO users VALUES('', 'NOLAN', '0971202421', 'ew')");
    $conn -> execute(" INSERT INTO users VALUES('', 'DAISY', '0987682520', '<template> 123 </template>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'JULIE', '0954932198', '<a> 123 </a>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'JACK', '0934297657', 'javascript:alert(1)')");
    $conn -> execute(" INSERT INTO users VALUES('', 'JOE', '0953128293', '<script> console.log('123') </script>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'NOLA', '0927696704', '</textarea><script>alert(1)</script>')");
    $conn -> execute(" INSERT INTO users VALUES('', 'LEC', '0955549001', 'one') ");
    // ,"') ");$conn -> execute(" DELETE FROM users WHERE name like '%a%' --");//
    // ","') ");$conn -> execute(" DELETE FROM users WHERE name like '%a%' --");//
    // $conn -> execute(" DELETE FROM users WHERE name like '%a%' ");

    include('data.php');
