<?php
/**
 * Messages API (Contact Form)
 * POST /api/messages.php?action=send - Send a message (Public)
 * GET /api/messages.php?action=list - Get messages (Admin)
 * DELETE /api/messages.php?id=X - Delete a message (Admin)
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$action = $_GET['action'] ?? '';
$db = Database::getInstance()->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'send') {
    // Public Endpoint: Save message & send email
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        jsonResponse(['error' => 'Nama, email, dan pesan wajib diisi'], 400);
    }
    
    // 1. Save to Database
    $stmt = $db->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        htmlspecialchars($data['name']),
        htmlspecialchars($data['email']),
        htmlspecialchars($data['subject'] ?? ''),
        htmlspecialchars($data['message'])
    ]);
    
    // 2. Send Email Notification (Simple PHP mail function)
    $to = 'aufatea1@gmail.com';
    $subject = "New Contact from Portfolio: " . ($data['subject'] ?? 'No Subject');
    $message = "Name: {$data['name']}\nEmail: {$data['email']}\n\nMessage:\n{$data['message']}";
    $headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
               "Reply-To: {$data['email']}\r\n" .
               "X-Mailer: PHP/" . phpversion();
               
    @mail($to, $subject, $message, $headers);
    
    jsonResponse(['success' => true, 'message' => 'Pesan berhasil dikirim dan disimpan']);
}

// Below this line requires Admin Auth
requireAuth();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'list') {
    // Admin: List messages
    $stmt = $db->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    jsonResponse($stmt->fetchAll());
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && !empty($_GET['id'])) {
    // Admin: Delete message
    $stmt = $db->prepare("DELETE FROM contact_messages WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    jsonResponse(['success' => true]);
}

jsonResponse(['error' => 'Invalid action'], 400);
