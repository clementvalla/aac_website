<?php
header('Content-Type: application/json');

$jsonFile = __DIR__ . '/bookings.json';

// Read incoming POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['deskNumber'], $input['deskType'], $input['userEmail'], $input['startDate'], $input['endDate'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Read existing bookings
$bookings = [];
if (file_exists($jsonFile)) {
    $bookings = json_decode(file_get_contents($jsonFile), true);
    if (!is_array($bookings)) {
        $bookings = [];
    }
}

// Check for conflicts
$newStart = strtotime($input['startDate']);
$newEnd = strtotime($input['endDate']);

foreach ($bookings as $booking) {
    if ($booking['deskNumber'] === $input['deskNumber'] &&
        $booking['deskType'] === $input['deskType'] &&
        $booking['status'] === 'active') {

        $existingStart = strtotime($booking['startDate']);
        $existingEnd = strtotime($booking['endDate']);

        if ($newStart <= $existingEnd && $newEnd >= $existingStart) {
            echo json_encode(['success' => false, 'conflict' => true, 'message' => 'This desk is already booked for the selected dates']);
            exit;
        }
    }
}

// Add new booking
$bookings[] = [
    'id' => uniqid(),
    'timestamp' => date('c'),
    'deskNumber' => $input['deskNumber'],
    'deskType' => $input['deskType'],
    'userEmail' => $input['userEmail'],
    'startDate' => $input['startDate'],
    'endDate' => $input['endDate'],
    'duration' => $input['duration'] ?? '',
    'dateText' => $input['dateText'] ?? '',
    'timeText' => $input['timeText'] ?? '',
    'status' => 'active'
];

// Write back to file
if (file_put_contents($jsonFile, json_encode($bookings, JSON_PRETTY_PRINT), LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save booking']);
    exit;
}

// Send email notifications
$desk = $input['deskNumber'];
$type = $input['deskType'];
$email = $input['userEmail'];
$dateText = $input['dateText'] ?? '';
$timeText = $input['timeText'] ?? '';

$adminEmail = 'sdavis01@risd.edu';
$subject = "New Desk Booking: $desk";
$body = "New desk reservation received:\n\n"
    . "Desk: $desk\n"
    . "Type: $type\n"
    . "Date: $dateText\n"
    . "Time: $timeText\n"
    . "User Email: $email\n";
$headers = "From: artandcomputation@risd.edu\r\n"
    . "Reply-To: $email\r\n";

@mail($adminEmail, $subject, $body, $headers);

// Confirmation to the user
$userSubject = "Desk Booking Confirmation: $desk";
$userBody = "Your desk reservation has been confirmed!\n\n"
    . "Desk: $desk\n"
    . "Date: $dateText\n"
    . "Time: $timeText\n\n"
    . "If you need to make changes or cancel, please contact artandcomputation@risd.edu.";
$userHeaders = "From: artandcomputation@risd.edu\r\n";

@mail($email, $userSubject, $userBody, $userHeaders);

echo json_encode(['success' => true, 'message' => 'Booking created successfully']);
