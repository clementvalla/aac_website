<?php
header('Content-Type: application/json');

$jsonFile = __DIR__ . '/bookings.json';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing booking ID']);
    exit;
}

$bookings = [];
if (file_exists($jsonFile)) {
    $bookings = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($bookings)) {
        $bookings = [];
    }
}

$found = false;
foreach ($bookings as &$booking) {
    if (isset($booking['id']) && $booking['id'] === $input['id']) {
        $booking['status'] = 'cancelled';
        $found = true;
        break;
    }
}
unset($booking);

if (!$found) {
    echo json_encode(['success' => false, 'message' => 'Booking not found']);
    exit;
}

if (file_put_contents($jsonFile, json_encode($bookings, JSON_PRETTY_PRINT), LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Booking cancelled']);
