<?php
    require_once('ado_conn.php');

    $request = json_decode(file_get_contents("php://input"));
    
    $id = $request -> id;

    // 判斷是否是陣列
    // 因為 "單一刪除" 與 "全刪" 都使用這一個php
    // 單一刪除傳進來的值不是陣列，所以將數值轉換成陣列
    if(!is_array($id)){
        $btn_id[] = $request -> id;
        $id = $btn_id;
    }

    // 將陣列攤平，並且使用單引號包起來，使符合SQL的IN語法
    $id = "'".implode("','", $id)."'";
    $conn -> execute(" DELETE FROM directory WHERE id IN ($id) ");
    $conn -> execute(" ALTER TABLE directory AUTO_INCREMENT = 1 ");
    error_log(date("[Y-m-d G:i] ")."Delete Message: 刪除的ID為".$id.PHP_EOL, 3 , "C:\\xampp\\htdocs\\directory\\php\\log\\log");
    include('data.php');     

    $conn->close();