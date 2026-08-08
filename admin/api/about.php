<?php
/**
 * About Me API
 * GET  /api/about.php       - Get about data (Public)
 * PUT  /api/about.php       - Update about data (auth required)
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    Case 'GET':
        HandleGet();
        Break;
    Case 'PUT':
        RequireAuth();
        HandleUpdate();
        Break;
    Default:
        JsonResponse(['error' => 'Method not allowed'], 405);
}

function ensureAboutDataColumns() {
    $db = Database::getInstance()->getConnection();
    
    // Check existing columns
    $stmt = $db->query("SHOW COLUMNS FROM about_data");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $newCols = [
        'experience' => 'LONGTEXT',
        'education' => 'LONGTEXT',
        'details' => 'LONGTEXT',
        'portfolio_links' => 'LONGTEXT',
        'achievements' => 'LONGTEXT',
        'section_order' => 'LONGTEXT',
        'custom_skills' => 'LONGTEXT',
        'contact_menu_target' => 'VARCHAR(50)'
    ];
    
    Foreach ($newCols as $col => $type) {
        If (!in_array($col, $columns)) {
            $db->exec("ALTER TABLE about_data ADD COLUMN `$col` $type DEFAULT NULL");
        }
    }
}

function handleGet() {
    EnsureAboutDataColumns();
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM about_data ORDER BY id DESC LIMIT 1");
    $about = $stmt->fetch();

    If (!$about) {
        JsonResponse([
            'name' => 'Aufa Rafii Hadibrata',
            'title' => 'Creative Entrepreneur & Digital Strategist',
            'bio' => '',
            'skills' => '[]',
            'social' => '{}',
            'experience' => '[]',
            'education' => '[]',
            'details' => '{}',
            'portfolio_links' => '[]',
            'achievements' => '[]',
            'section_order' => '[]',
            'custom_skills' => '[]',
            'contact_menu_target' => 'section'
        ]);
    }

    // Parse JSON fields
    $about['skills'] = json_decode($about['skills'] ?? '[]', true);
    $about['social'] = json_decode($about['social'] ?? '{}', true);
    $about['experience'] = json_decode($about['experience'] ?? '[]', true);
    $about['education'] = json_decode($about['education'] ?? '[]', true);
    $about['details'] = json_decode($about['details'] ?? '{}', true);
    $about['portfolio_links'] = json_decode($about['portfolio_links'] ?? '[]', true);
    $about['achievements'] = json_decode($about['achievements'] ?? '[]', true);
    $about['section_order'] = json_decode($about['section_order'] ?? '[]', true);
    $about['custom_skills'] = json_decode($about['custom_skills'] ?? '[]', true);
    $about['contact_menu_target'] = $about['contact_menu_target'] ?? 'section';

    JsonResponse($about);
}

function handleUpdate() {
    EnsureAboutDataColumns();
    $body = getJsonBody();
    $db = Database::getInstance()->getConnection();

    $skills = json_encode($body['skills'] ?? [], JSON_UNESCAPED_UNICODE);
    $social = json_encode($body['social'] ?? (object)[], JSON_UNESCAPED_UNICODE);
    $experience = json_encode($body['experience'] ?? [], JSON_UNESCAPED_UNICODE);
    $education = json_encode($body['education'] ?? [], JSON_UNESCAPED_UNICODE);
    $details = json_encode($body['details'] ?? (object)[], JSON_UNESCAPED_UNICODE);
    $portfolio_links = json_encode($body['portfolio_links'] ?? [], JSON_UNESCAPED_UNICODE);
    $achievements = json_encode($body['achievements'] ?? [], JSON_UNESCAPED_UNICODE);
    $section_order = json_encode($body['section_order'] ?? [], JSON_UNESCAPED_UNICODE);
    $custom_skills = json_encode($body['custom_skills'] ?? [], JSON_UNESCAPED_UNICODE);
    $contact_menu_target = $body['contact_menu_target'] ?? 'section';

    // Check if exists
    $stmt = $db->query("SELECT id FROM about_data LIMIT 1");
    $existing = $stmt->fetch();

    If ($existing) {
        $stmt = $db->prepare("UPDATE about_data SET name = ?, title = ?, bio = ?, skills = ?, social = ?, experience = ?, education = ?, details = ?, portfolio_links = ?, achievements = ?, section_order = ?, custom_skills = ?, contact_menu_target = ? WHERE id = ?");
        $stmt->execute([
            $body['name'] ?? 'Aufa Rafii Hadibrata',
            $body['title'] ?? '',
            $body['bio'] ?? '',
            $skills,
            $social,
            $experience,
            $education,
            $details,
            $portfolio_links,
            $achievements,
            $section_order,
            $custom_skills,
            $contact_menu_target,
            $existing['id'],
        ]);
    } else {
        $stmt = $db->prepare("INSERT INTO about_data (name, title, bio, skills, social, experience, education, details, portfolio_links, achievements, section_order, custom_skills, contact_menu_target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $body['name'] ?? 'Aufa Rafii Hadibrata',
            $body['title'] ?? '',
            $body['bio'] ?? '',
            $skills,
            $social,
            $experience,
            $education,
            $details,
            $portfolio_links,
            $achievements,
            $section_order,
            $custom_skills,
            $contact_menu_target,
        ]);
    }

    JsonResponse(['success' => true, 'message' => 'About updated']);
}
