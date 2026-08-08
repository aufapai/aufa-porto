<?php
/**
 * Traffic Analytics API
 * POST /api/traffic.php?action=track     - Track a page visit (public)
 * GET  /api/traffic.php?action=stats     - Get analytics stats (auth required)
 * GET  /api/traffic.php?action=recent    - Get recent visits (auth required)
 * DELETE /api/traffic.php?action=clear   - Clear all data (auth required)
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'track':
        handleTrack();
        break;
    case 'stats':
        requireAuth();
        handleStats();
        break;
    case 'recent':
        requireAuth();
        handleRecent();
        break;
    case 'clear':
        requireAuth();
        handleClear();
        break;
    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function handleTrack() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['error' => 'POST required'], 405);
    }

    $body = getJsonBody();
    $db = Database::getInstance()->getConnection();

    $page = $body['page'] ?? '/';
    $referrer = $body['referrer'] ?? ($_SERVER['HTTP_REFERER'] ?? 'Direct');
    $userAgent = $body['user_agent'] ?? ($_SERVER['HTTP_USER_AGENT'] ?? '');
    $screenSize = $body['screen_size'] ?? '';
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';

    $stmt = $db->prepare("INSERT INTO traffic_log (page, referrer, user_agent, screen_size, ip_address, visit_date) VALUES (?, ?, ?, ?, ?, CURDATE())");
    $stmt->execute([$page, $referrer, $userAgent, $screenSize, $ip]);

    jsonResponse(['success' => true]);
}

function handleStats() {
    $db = Database::getInstance()->getConnection();

    // Total views
    $totalViews = $db->query("SELECT COUNT(*) as cnt FROM traffic_log")->fetch()['cnt'];

    // Today views
    $todayViews = $db->query("SELECT COUNT(*) as cnt FROM traffic_log WHERE visit_date = CURDATE()")->fetch()['cnt'];

    // Week views
    $weekViews = $db->query("SELECT COUNT(*) as cnt FROM traffic_log WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)")->fetch()['cnt'];

    // Month views
    $monthViews = $db->query("SELECT COUNT(*) as cnt FROM traffic_log WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)")->fetch()['cnt'];

    // Top pages
    $pageViews = $db->query("SELECT page, COUNT(*) as views FROM traffic_log GROUP BY page ORDER BY views DESC LIMIT 20")->fetchAll();

    // Daily views (last 30 days)
    $dailyViews = $db->query("SELECT visit_date as date, COUNT(*) as views FROM traffic_log WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY visit_date ORDER BY visit_date ASC")->fetchAll();

    // Referrers
    $referrers = $db->query("SELECT referrer as source, COUNT(*) as views FROM traffic_log GROUP BY referrer ORDER BY views DESC LIMIT 20")->fetchAll();

    // Device breakdown
    $desktopCount = $db->query("SELECT COUNT(*) as cnt FROM traffic_log WHERE user_agent NOT LIKE '%Mobile%' AND user_agent NOT LIKE '%Android%' AND user_agent NOT LIKE '%iPhone%' AND user_agent NOT LIKE '%iPad%' AND user_agent NOT LIKE '%Tablet%'")->fetch()['cnt'];
    $mobileCount = $db->query("SELECT COUNT(*) as cnt FROM traffic_log WHERE (user_agent LIKE '%Mobile%' OR user_agent LIKE '%Android%' OR user_agent LIKE '%iPhone%') AND user_agent NOT LIKE '%iPad%' AND user_agent NOT LIKE '%Tablet%'")->fetch()['cnt'];
    $tabletCount = $db->query("SELECT COUNT(*) as cnt FROM traffic_log WHERE user_agent LIKE '%iPad%' OR user_agent LIKE '%Tablet%'")->fetch()['cnt'];

    // Unique IPs (visitors)
    $uniqueVisitors = $db->query("SELECT COUNT(DISTINCT ip_address) as cnt FROM traffic_log")->fetch()['cnt'];

    jsonResponse([
        'totalViews' => (int)$totalViews,
        'todayViews' => (int)$todayViews,
        'weekViews' => (int)$weekViews,
        'monthViews' => (int)$monthViews,
        'uniqueVisitors' => (int)$uniqueVisitors,
        'pageViews' => $pageViews,
        'dailyViews' => $dailyViews,
        'referrers' => $referrers,
        'devices' => [
            'desktop' => (int)$desktopCount,
            'mobile' => (int)$mobileCount,
            'tablet' => (int)$tabletCount,
        ],
    ]);
}

function handleRecent() {
    $db = Database::getInstance()->getConnection();
    $limit = min((int)($_GET['limit'] ?? 20), 100);

    $stmt = $db->prepare("SELECT page, referrer, user_agent, screen_size, ip_address, created_at FROM traffic_log ORDER BY created_at DESC LIMIT ?");
    $stmt->execute([$limit]);

    jsonResponse($stmt->fetchAll());
}

function handleClear() {
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
        jsonResponse(['error' => 'DELETE required'], 405);
    }

    $db = Database::getInstance()->getConnection();
    $db->exec("TRUNCATE TABLE traffic_log");
    jsonResponse(['success' => true, 'message' => 'Traffic data cleared']);
}
