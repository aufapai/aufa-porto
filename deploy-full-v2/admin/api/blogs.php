<?php
/**
 * Blog Posts API
 * GET    /api/blogs.php              - List all posts
 * GET    /api/blogs.php?id=X         - Get single post
 * GET    /api/blogs.php?published=1  - Public: Get published posts only
 * GET    /api/blogs.php?slug=X       - Public: Get post by slug
 * POST   /api/blogs.php              - Create new post (auth required)
 * PUT    /api/blogs.php?id=X         - Update post (auth required)
 * DELETE /api/blogs.php?id=X         - Delete post (auth required)
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet();
        break;
    case 'POST':
        requireAuth();
        handleCreate();
        break;
    case 'PUT':
        requireAuth();
        handleUpdate();
        break;
    case 'DELETE':
        requireAuth();
        handleDelete();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function handleGet() {
    $db = Database::getInstance()->getConnection();

    // Get single post by ID
    if (!empty($_GET['id'])) {
        $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $post = $stmt->fetch();
        if (!$post) jsonResponse(['error' => 'Post not found'], 404);
        jsonResponse($post);
    }

    // Get single post by slug (public)
    if (!empty($_GET['slug'])) {
        $stmt = $db->prepare("SELECT * FROM blog_posts WHERE slug = ? AND published = 1");
        $stmt->execute([$_GET['slug']]);
        $post = $stmt->fetch();
        if (!$post) jsonResponse(['error' => 'Post not found'], 404);
        jsonResponse($post);
    }

    // Get published posts only (public API)
    if (isset($_GET['published'])) {
        $stmt = $db->query("SELECT id, slug, title, category, excerpt, cover_image, author, read_time, created_at, updated_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC");
        jsonResponse($stmt->fetchAll());
    }

    // Get all posts (admin)
    $stmt = $db->query("SELECT * FROM blog_posts ORDER BY created_at DESC");
    jsonResponse($stmt->fetchAll());
}

function handleCreate() {
    $body = getJsonBody();
    $db = Database::getInstance()->getConnection();

    $title = trim($body['title'] ?? '');
    if (!$title) jsonResponse(['error' => 'Title is required'], 400);

    $slug = $body['slug'] ?? generateSlug($title);

    // Check slug uniqueness
    $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM blog_posts WHERE slug = ?");
    $stmt->execute([$slug]);
    if ($stmt->fetch()['cnt'] > 0) {
        $slug .= '-' . time();
    }

    $stmt = $db->prepare("INSERT INTO blog_posts (slug, title, category, excerpt, content, cover_image, author, read_time, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $slug,
        $title,
        $body['category'] ?? '',
        $body['excerpt'] ?? '',
        $body['content'] ?? '',
        $body['cover_image'] ?? '',
        $body['author'] ?? 'Aufa Rafii',
        $body['read_time'] ?? '5 min read',
        isset($body['published']) ? (int)$body['published'] : 1,
    ]);

    $id = $db->lastInsertId();
    $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
    $stmt->execute([$id]);

    jsonResponse($stmt->fetch(), 201);
}

function handleUpdate() {
    $id = $_GET['id'] ?? null;
    if (!$id) jsonResponse(['error' => 'ID is required'], 400);

    $body = getJsonBody();
    $db = Database::getInstance()->getConnection();

    // Check exists
    $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if (!$existing) jsonResponse(['error' => 'Post not found'], 404);

    // Build dynamic update
    $fields = [];
    $values = [];

    $allowedFields = ['title', 'slug', 'category', 'excerpt', 'content', 'cover_image', 'author', 'read_time', 'published'];
    foreach ($allowedFields as $field) {
        $bodyKey = $field;
        // Map snake_case from DB to the body keys
        if (isset($body[$bodyKey])) {
            $fields[] = "$field = ?";
            $values[] = $body[$bodyKey];
        }
    }

    if (empty($fields)) jsonResponse(['error' => 'No fields to update'], 400);

    $values[] = $id;
    $sql = "UPDATE blog_posts SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute($values);

    // Return updated post
    $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
    $stmt->execute([$id]);
    jsonResponse($stmt->fetch());
}

function handleDelete() {
    $id = $_GET['id'] ?? null;
    if (!$id) jsonResponse(['error' => 'ID is required'], 400);

    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("DELETE FROM blog_posts WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) jsonResponse(['error' => 'Post not found'], 404);
    jsonResponse(['success' => true, 'message' => 'Post deleted']);
}
