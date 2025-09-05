<?php
$host = "localhost";
$user = "root"; 
$pass = "sri2003";
$db = "contact_book";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>