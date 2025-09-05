<?php
include 'db.php';

$sql = "SELECT * FROM contacts ORDER BY id DESC";
$result = $conn->query($sql);


$contacts = [];
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}
echo json_encode($contacts);
?>