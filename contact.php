<?php
// Enable error reporting (remove on production)
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// Define recipient email
$to = "rianasantatra665@gmail.com";

// Sanitize input
function sanitizeInput($data)
{
    return htmlspecialchars(strip_tags(trim($data)));
}

// Check if form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Anti-spam honeypot check
    if (!empty($_POST['website'])) {
        // Bot detected
        http_response_code(403);
        echo "Access denied.";
        exit;
    }

    // Retrieve and sanitize fields
    $name = sanitizeInput($_POST["name"] ?? '');
    $email = filter_var($_POST["email"] ?? '', FILTER_SANITIZE_EMAIL);
    $message = sanitizeInput($_POST["message"] ?? '');

    // Validate fields
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "All fields are required.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format.";
        exit;
    }

    // Email subject and body
    $subject = "New Message from Portfolio Contact Form";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Message sent successfully.";
    } else {
        http_response_code(500);
        echo "Server error. Message not sent.";
    }
} else {
    http_response_code(405);
    echo "Method not allowed.";
}
