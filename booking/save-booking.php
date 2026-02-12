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

// Send email notifications with Google Calendar link
$desk = $input['deskNumber'];
$type = $input['deskType'];
$email = $input['userEmail'];
$dateText = $input['dateText'] ?? '';
$timeText = $input['timeText'] ?? '';
$startDate = $input['startDate'];
$endDate = $input['endDate'];

// Build Google Calendar event link
// All-day events use YYYYMMDD format; end date is exclusive so add 1 day
$gcalStart = date('Ymd', strtotime($startDate));
$gcalEnd = date('Ymd', strtotime($endDate . ' +1 day'));
$gcalTitle = urlencode("Desk Booking: $desk");
$gcalDetails = urlencode("Desk: $desk\nType: $type\nDate: $dateText\nTime: $timeText\nBooked by: $email");
$gcalGuests = urlencode($email . ',artandcomputation@risd.edu');

$gcalLink = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    . "&text=$gcalTitle"
    . "&dates=$gcalStart/$gcalEnd"
    . "&details=$gcalDetails"
    . "&add=$gcalGuests";

// Helper function to send clean plain-text email
// Uses noreply@aac.risd.edu as the From address since the server
// is authorized to send from its own domain. Reply-To directs
// responses to artandcomputation@risd.edu.
function sendEmail($to, $subject, $textBody, $replyTo = null) {
    $fromEmail = 'noreply@aac.risd.edu';
    $replyAddr = $replyTo ? $replyTo : 'artandcomputation@risd.edu';

    $headers = "From: Art and Computation <$fromEmail>\r\n";
    $headers .= "Reply-To: $replyAddr\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    return @mail($to, $subject, $textBody, $headers);
}

// Admin notification
$adminEmail = 'sdavis01@risd.edu';
$adminSubject = "New Desk Booking: $desk";
$adminBody = "New desk reservation received:\n\n"
    . "Desk: $desk\n"
    . "Type: $type\n"
    . "Date: $dateText\n"
    . "Time: $timeText\n"
    . "User Email: $email\n\n"
    . "Add to Google Calendar:\n$gcalLink\n";

sendEmail($adminEmail, $adminSubject, $adminBody, $email);

// Confirmation to the user
$userSubject = "Desk Booking Confirmation: $desk";
$userBody = "Your desk reservation has been confirmed!\n\n"
    . "Desk: $desk\n"
    . "Date: $dateText\n"
    . "Time: $timeText\n\n"
    . "Add to Google Calendar:\n$gcalLink\n\n"
    . "If you need to make changes or cancel, please contact artandcomputation@risd.edu.";

sendEmail($email, $userSubject, $userBody);

// Also send to artandcomputation@risd.edu
$aacSubject = "Desk Booking: $desk — $email";
$aacBody = "A desk has been booked:\n\n"
    . "Desk: $desk\n"
    . "Type: $type\n"
    . "Date: $dateText\n"
    . "Time: $timeText\n"
    . "Booked by: $email\n\n"
    . "Add to Google Calendar:\n$gcalLink\n";

sendEmail('artandcomputation@risd.edu', $aacSubject, $aacBody);

echo json_encode(['success' => true, 'message' => 'Booking created successfully']);
