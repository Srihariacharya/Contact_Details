<?php
include 'db.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sql = "DELETE FROM contacts";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
}
?>
