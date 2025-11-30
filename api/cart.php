<?php
session_start();
header('Content-Type: application/json');

$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
$items = [];
$total = 0.0;

foreach ($cart as $id => $entry) {
    $product = $entry['product'];
    $qty = (int)$entry['qty'];
    $line = [
        'id' => $product['id'],
        'name' => $product['name'],
        'price' => $product['price'],
        'qty' => $qty,
        'subtotal' => $product['price'] * $qty,
        'image' => $product['image']
    ];
    $items[] = $line;
    $total += $line['subtotal'];
}

echo json_encode(['items' => $items, 'total' => $total, 'count' => array_sum(array_map(function($i){return $i['qty'];}, $items))]);

?>
