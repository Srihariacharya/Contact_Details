<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $sql = "DELETE FROM contacts WHERE id=$id";
    $conn->query($sql);
}
?>
