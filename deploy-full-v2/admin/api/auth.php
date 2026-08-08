<?php
/**
 * Authentication API
 * POST /api/auth.php?action=login
 * POST /api/auth.php?action=logout
 * GET  /api/auth.php?action=check
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'check':
        handleCheck();
        break;
    case 'setup':
        handleSetup();
        break;
    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function handleLogin() {
    $body = getJsonBody();
    $email = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';

    if (!$email || !$password) {
        jsonResponse(['error' => 'Email dan password wajib diisi'], 400);
    }

    $db = Database::getInstance()->getConnection();

    // Check credentials
    $stmt = $db->prepare("SELECT id, email, name, password FROM admin_users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        jsonResponse(['error' => 'Email atau password salah'], 401);
    }

    // Verify password (support both hashed and plain for initial setup)
    $validPassword = false;
    if (password_verify($password, $user['password'])) {
        $validPassword = true;
    } elseif ($password === ADMIN_PASS && $email === ADMIN_EMAIL) {
        // Fallback for initial setup - update to hashed password
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $updateStmt = $db->prepare("UPDATE admin_users SET password = ? WHERE id = ?");
        $updateStmt->execute([$hashed, $user['id']]);
        $validPassword = true;
    }

    if (!$validPassword) {
        jsonResponse(['error' => 'Email atau password salah'], 401);
    }

    // Create session
    session_start();
    $_SESSION['admin_id'] = $user['id'];
    $_SESSION['admin_email'] = $user['email'];

    // Create token for API access
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', time() + SESSION_LIFETIME);

    $stmt = $db->prepare("INSERT INTO admin_sessions (user_id, token, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$user['id'], $token, $expiresAt]);

    // Update last login
    $stmt = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);

    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
        ],
        'expires_at' => $expiresAt,
    ]);
}

function handleLogout() {
    session_start();
    
    // Remove session token from DB
    $headers = getallheaders();
    if (!empty($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("DELETE FROM admin_sessions WHERE token = ?");
        $stmt->execute([$token]);
    }

    session_destroy();
    jsonResponse(['success' => true, 'message' => 'Logged out']);
}

function handleCheck() {
    session_start();
    if (!empty($_SESSION['admin_id'])) {
        jsonResponse(['authenticated' => true, 'email' => $_SESSION['admin_email']]);
        return;
    }

    // Check token
    $headers = getallheaders();
    if (!empty($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT s.user_id, u.email, u.name FROM admin_sessions s JOIN admin_users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > NOW()");
        $stmt->execute([$token]);
        $session = $stmt->fetch();
        if ($session) {
            jsonResponse(['authenticated' => true, 'email' => $session['email'], 'name' => $session['name']]);
            return;
        }
    }

    jsonResponse(['authenticated' => false], 401);
}

function handleSetup() {
    // One-time setup: create admin user if not exists
    $db = Database::getInstance()->getConnection();
    
    $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM admin_users WHERE email = ?");
    $stmt->execute([ADMIN_EMAIL]);
    $exists = $stmt->fetch()['cnt'];

    if ($exists == 0) {
        $hashed = password_hash(ADMIN_PASS, PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT INTO admin_users (email, password, name) VALUES (?, ?, 'Aufa Rafii')");
        $stmt->execute([ADMIN_EMAIL, $hashed]);
        jsonResponse(['success' => true, 'message' => 'Admin user created']);
    } else {
        // Update password hash
        $hashed = password_hash(ADMIN_PASS, PASSWORD_DEFAULT);
        $stmt = $db->prepare("UPDATE admin_users SET password = ? WHERE email = ?");
        $stmt->execute([$hashed, ADMIN_EMAIL]);
        jsonResponse(['success' => true, 'message' => 'Admin password updated']);
    }
}
