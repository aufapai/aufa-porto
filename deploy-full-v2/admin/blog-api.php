<?php
/**
 * Public Blog API
 * This file can be used by the React frontend to fetch published blog posts
 * No authentication required for GET requests
 * 
 * GET /blog-api.php               - Get all published posts
 * GET /blog-api.php?slug=xxx      - Get single post by slug
 */

require_once __DIR__ . '/db.php';
handleCORS();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'GET only'], 405);
}

$db = Database::getInstance()->getConnection();

// Get single post by slug
if (!empty($_GET['slug'])) {
    $stmt = $db->prepare("SELECT id, slug, title, category, excerpt, content, cover_image, author, read_time, created_at FROM blog_posts WHERE slug = ? AND published = 1");
    $stmt->execute([$_GET['slug']]);
    $post = $stmt->fetch();
    
    if (!$post) {
        jsonResponse(['error' => 'Post not found'], 404);
    }
    
    jsonResponse($post);
}

// Get all published posts
$stmt = $db->query("SELECT id, slug, title, category, excerpt, cover_image, author, read_time, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC");
jsonResponse($stmt->fetchAll());
