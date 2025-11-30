<?php
header('Content-Type: application/json');
$products = include __DIR__ . '/data.php';
echo json_encode(array_values($products));
?>
