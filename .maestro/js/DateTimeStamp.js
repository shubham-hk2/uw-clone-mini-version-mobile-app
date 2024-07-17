function generateUniquePhoneNumber() {
    var now = new Date();
    var timestamp = now.getTime().toString(); // Get current timestamp in milliseconds
    var randomDigits = Math.floor(Math.random() * 1000).toString(); // Generate up to 3 random digits
    var uniqueDigits = timestamp.slice(-5) + randomDigits; // Take the last 5 digits of the timestamp and append the random digits

    // Ensure uniqueDigits is exactly 8 digits long
    while (uniqueDigits.length < 8) {
        uniqueDigits = '0' + uniqueDigits;
    }

    var result = '7' + uniqueDigits; // Prepend '7' to make a 9-digit number
    return result;
}

function generateDateTimeStamp() {
    var now = new Date();
    var dateTimeStamp = now.toISOString();
    return dateTimeStamp;
}

// Generate and log the unique phone number
var uniquePhoneNumber = generateUniquePhoneNumber();
console.log("Generated Unique Phone Number:", uniquePhoneNumber);

// Generate and log the date-time stamp
var dateTimeStamp = generateDateTimeStamp();
console.log("Generated DateTime Stamp:", dateTimeStamp);

// Assign values to output object
output.uniquePhoneNumber = uniquePhoneNumber;
output.dateTimeStamp = dateTimeStamp;


