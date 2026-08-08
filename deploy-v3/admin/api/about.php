<?php
/**
 * About Me API
 * GET  /api/about.php       - Get about data
 * PUT  /api/about.php       - Update about data (auth required)
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
    $stmt = $db->query("SELECT * FROM about_data ORDER BY id DESC LIMIT 1");
    $about = $stmt->fetch();

    if (!$about) {
        jsonResponse([
            'name' => 'Aufa Rafii Hadibrata',
            'title' => 'Creative Entrepreneur & Digital Strategist',
            'bio' => '',
            'skills' => '[]',
            'social' => '{}',
        ]);
    }

    // Parse JSON fields
    $about['skills'] = json_decode($about['skills'] ?? '[]', true);
    $about['social'] = json_decode($about['social'] ?? '{}', true);

    jsonResponse($about);
}

function handleUpdate() {
    $body = getJsonBody();
    $db = Database::getInstance()->getConnection();

    $skills = json_encode($body['skills'] ?? [], JSON_UNESCAPED_UNICODE);
    $social = json_encode($body['social'] ?? (object)[], JSON_UNESCAPED_UNICODE);

    // Check if exists
    $stmt = $db->query("SELECT id FROM about_data LIMIT 1");
    $existing = $stmt->fetch();

    if ($existing) {
        $stmt = $db->prepare("UPDATE about_data SET name = ?, title = ?, bio = ?, skills = ?, social = ? WHERE id = ?");
        $stmt->execute([
            $body['name'] ?? 'Aufa Rafii Hadibrata',
            $body['title'] ?? '',
            $body['bio'] ?? '',
            $skills,
            $social,
            $existing['id'],
        ]);
    } else {
        $stmt = $db->prepare("INSERT INTO about_data (name, title, bio, skills, social) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $body['name'] ?? 'Aufa Rafii Hadibrata',
            $body['title'] ?? '',
            $body['bio'] ?? '',
            $skills,
            $social,
        ]);
    }

    jsonResponse(['success' => true, 'message' => 'About updated']);
}
