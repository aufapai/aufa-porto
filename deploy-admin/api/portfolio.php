<?php
/**
 * Portfolio Projects API
 * GET /api/portfolio.php?category=X - Get projects (Public)
 * POST /api/portfolio.php - Create project (Admin)
 * PUT /api/portfolio.php?id=X - Update project (Admin)
 * DELETE /api/portfolio.php?id=X - Delete project (Admin)
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$db = Database::getInstance()->getConnection();

// Public: Get projects (optionally by category)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!empty($_GET['category'])) {
        $stmt = $db->prepare("SELECT * FROM portfolio_projects WHERE category = ? ORDER BY created_at DESC, id DESC");
        $stmt->execute([$_GET['category']]);
        jsonResponse($stmt->fetchAll());
    } else {
        $stmt = $db->query("SELECT * FROM portfolio_projects ORDER BY category, created_at DESC");
        jsonResponse($stmt->fetchAll());
    }
}

// Admin only below here
requireAuth();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $db->prepare("INSERT INTO portfolio_projects (title, category, image_url, description, external_link) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['title'] ?? '',
        $data['category'] ?? '',
        $data['image_url'] ?? '',
        $data['description'] ?? '',
        $data['external_link'] ?? ''
    ]);
    jsonResponse(['success' => true, 'id' => $db->lastInsertId()]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && !empty($_GET['id'])) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $db->prepare("UPDATE portfolio_projects SET title=?, category=?, image_url=?, description=?, external_link=? WHERE id=?");
    $stmt->execute([
        $data['title'] ?? '',
        $data['category'] ?? '',
        $data['image_url'] ?? '',
        $data['description'] ?? '',
        $data['external_link'] ?? '',
        $_GET['id']
    ]);
    jsonResponse(['success' => true]);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && !empty($_GET['id'])) {
    $stmt = $db->prepare("DELETE FROM portfolio_projects WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    jsonResponse(['success' => true]);
}

jsonResponse(['error' => 'Method not allowed'], 405);
