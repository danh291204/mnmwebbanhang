<?php
session_start();
header('Content-Type: application/json');

$products = include __DIR__ . '/data.php';

$input = $_POST;
if (empty($input)) {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if ($data) $input = $data;
}

if (!isset($input['product_id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing product_id']);
    exit;
}

$id = (int)$input['product_id'];
$qty = isset($input['qty']) ? max(1, (int)$input['qty']) : 1;

$found = null;
foreach ($products as $p) {
    if ($p['id'] === $id) { $found = $p; break; }
}

if (!$found) {
    echo json_encode(['success' => false, 'message' => 'Product not found']);
    exit;
}

if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

if (isset($_SESSION['cart'][$id])) {
    $_SESSION['cart'][$id]['qty'] += $qty;
} else {
    $_SESSION['cart'][$id] = ['product' => $found, 'qty' => $qty];
}

$cart_count = 0;
foreach ($_SESSION['cart'] as $item) $cart_count += $item['qty'];

echo json_encode(['success' => true, 'cart_count' => $cart_count, 'cart' => $_SESSION['cart']]);

?>
