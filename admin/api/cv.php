<?php
/**
 * CV Data API
 * GET  /api/cv.php         - Get CV content
 * PUT  /api/cv.php         - Update CV content (auth required)
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet();
        break;
    case 'PUT':
        requireAuth();
        handleUpdate();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function handleGet() {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM cv_data ORDER BY id DESC LIMIT 1");
    $cv = $stmt->fetch();

    if (!$cv) {
        jsonResponse(['content' => '', 'updated_at' => null]);
    }

    jsonResponse($cv);
}

function handleUpdate() {
    $body = getJsonBody();
    $content = $body['content'] ?? '';

    $db = Database::getInstance()->getConnection();

    // Check if exists
    $stmt = $db->query("SELECT id FROM cv_data LIMIT 1");
    $existing = $stmt->fetch();

    if ($existing) {
        $stmt = $db->prepare("UPDATE cv_data SET content = ? WHERE id = ?");
        $stmt->execute([$content, $existing['id']]);
    } else {
        $stmt = $db->prepare("INSERT INTO cv_data (content) VALUES (?)");
        $stmt->execute([$content]);
    }

    jsonResponse(['success' => true, 'message' => 'CV updated', 'updated_at' => date('Y-m-d H:i:s')]);
}
