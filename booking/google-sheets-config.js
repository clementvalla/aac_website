// google-sheets-config.js
// Google Apps Script code for the Desk Booking system
//
// SETUP:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1HmuD3JuGqd6xNrc6oKVi64hENAoA97KUQil_vPNj4Eg/edit
// 2. Rename the first tab to "Bookings"
// 3. Add these headers in Row 1:
//    Timestamp | Desk Number | Desk Type | User Email | Start Date | End Date | Duration | Date Text | Time Text | Status
// 4. Go to Extensions > Apps Script
// 5. Delete any existing code in the editor
// 6. Copy EVERYTHING between the === COPY START === and === COPY END === markers below
// 7. Paste it into the Apps Script editor
// 8. Click Deploy > New deployment
// 9. Select type: "Web app"
// 10. Set "Execute as": your email
// 11. Set "Who has access": "Anyone"
// 12. Click "Deploy" and authorize when prompted
// 13. Copy the Web App URL (looks like: https://script.google.com/macros/s/.../exec)
// 14. Paste that URL into desk-booking-sheets.html on the GOOGLE_SHEETS_URL line
//
// To redeploy after changes: Deploy > Manage deployments > Edit (pencil icon) > New version > Deploy

// ===================== COPY START =====================

/*

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bookings');

  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Bookings sheet not found. Please create a tab named "Bookings".'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      occupiedSemester: [],
      occupiedShortTerm: [],
      bookings: []
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var headers = data[0];
  var rows = data.slice(1);

  var bookings = rows.map(function(row) {
    var booking = {};
    headers.forEach(function(header, index) {
      booking[header] = row[index];
    });
    return booking;
  });

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var occupiedSemester = [];
  var occupiedShortTerm = [];

  bookings.forEach(function(booking) {
    if (booking.Status !== 'active') return;

    var endDate = new Date(booking['End Date']);
    if (endDate < today) return;

    var deskNumStr = String(booking['Desk Number']).replace(/[^0-9]/g, '');
    var deskNum = parseInt(deskNumStr, 10);
    if (isNaN(deskNum)) return;

    if (booking['Desk Type'] === 'semester') {
      if (occupiedSemester.indexOf(deskNum) === -1) {
        occupiedSemester.push(deskNum);
      }
    } else {
      if (occupiedShortTerm.indexOf(deskNum) === -1) {
        occupiedShortTerm.push(deskNum);
      }
    }
  });

  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    occupiedSemester: occupiedSemester,
    occupiedShortTerm: occupiedShortTerm,
    bookings: bookings
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (!data.deskNumber || !data.deskType || !data.userEmail ||
        !data.startDate || !data.endDate) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bookings');

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Bookings sheet not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Check for booking conflicts
    var existingData = sheet.getDataRange().getValues();
    var headers = existingData[0];
    var rows = existingData.slice(1);

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var rowData = {};
      headers.forEach(function(header, index) {
        rowData[header] = row[index];
      });

      if (rowData['Desk Number'] === data.deskNumber &&
          rowData['Desk Type'] === data.deskType &&
          rowData.Status === 'active') {

        var existingStart = new Date(rowData['Start Date']);
        var existingEnd = new Date(rowData['End Date']);
        var newStart = new Date(data.startDate);
        var newEnd = new Date(data.endDate);

        // Check for date overlap
        if (newStart <= existingEnd && newEnd >= existingStart) {
          return ContentService.createTextOutput(JSON.stringify({
            success: false,
            conflict: true,
            message: 'This desk is already booked for the selected dates'
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // Add the new booking
    sheet.appendRow([
      new Date(),              // Timestamp
      data.deskNumber,         // Desk Number
      data.deskType,           // Desk Type
      data.userEmail,          // User Email
      data.startDate,          // Start Date
      data.endDate,            // End Date
      data.duration || '',     // Duration
      data.dateText || '',     // Date Text
      data.timeText || '',     // Time Text
      'active'                 // Status
    ]);

    // Send email notifications
    try {
      sendBookingEmails(data);
    } catch (emailError) {
      // Don't fail the booking if email fails
      Logger.log('Email error: ' + emailError.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Booking created successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendBookingEmails(data) {
  var adminEmail = 'artandcomputation@risd.edu';

  // Admin notification
  var adminSubject = 'New Desk Booking: ' + data.deskNumber;
  var adminBody = 'New desk reservation received:\n\n' +
                  'Desk: ' + data.deskNumber + '\n' +
                  'Type: ' + data.deskType + '\n' +
                  'Date: ' + data.dateText + '\n' +
                  'Time: ' + data.timeText + '\n' +
                  'User Email: ' + data.userEmail + '\n\n' +
                  'View all bookings: https://docs.google.com/spreadsheets/d/1HmuD3JuGqd6xNrc6oKVi64hENAoA97KUQil_vPNj4Eg/edit';

  MailApp.sendEmail(adminEmail, adminSubject, adminBody);

  // User confirmation
  var userSubject = 'Desk Booking Confirmation: ' + data.deskNumber;
  var userBody = 'Your desk reservation has been confirmed!\n\n' +
                 'Desk: ' + data.deskNumber + '\n' +
                 'Date: ' + data.dateText + '\n' +
                 'Time: ' + data.timeText + '\n\n' +
                 'If you need to make changes or cancel, please contact artandcomputation@risd.edu.';

  MailApp.sendEmail(data.userEmail, userSubject, userBody);
}

*/

// ===================== COPY END =====================
