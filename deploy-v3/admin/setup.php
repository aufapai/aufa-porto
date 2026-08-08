<?php
/**
 * Setup Script
 * Run this ONCE after importing schema.sql to:
 * 1. Hash the admin password properly
 * 2. Verify database connection
 * 3. Check all tables exist
 * 
 * URL: /deploy-admin/setup.php
 * DELETE THIS FILE AFTER SETUP
 */

require_once __DIR__ . '/config.php';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Setup - Admin CMS</title>
    <style>
        body { font-family: 'Inter', sans-serif; background: #0a0a1a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto; }
        .ok { color: #34d399; }
        .err { color: #f87171; }
        .warn { color: #fbbf24; }
        .box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 16px 0; }
        h1 { font-size: 24px; margin-bottom: 20px; }
        p { margin: 8px 0; font-size: 14px; }
    </style>
</head>
<body>
    <h1>🔧 Admin CMS Setup</h1>
    
    <div class="box">
        <h3>1. Database Connection</h3>
        <?php
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            echo '<p class="ok">✅ Connected to database: ' . DB_NAME . '</p>';
        } catch (PDOException $e) {
            echo '<p class="err">❌ Connection failed: ' . $e->getMessage() . '</p>';
            echo '<p class="warn">⚠️ Make sure you have imported schema.sql via phpMyAdmin first!</p>';
            echo '</div></body></html>';
            exit;
        }
        ?>
    </div>
    
    <div class="box">
        <h3>2. Tables Check</h3>
        <?php
        $tables = ['admin_users', 'blog_posts', 'cv_data', 'about_data', 'traffic_log', 'admin_sessions'];
        foreach ($tables as $table) {
            try {
                $pdo->query("SELECT 1 FROM $table LIMIT 1");
                echo "<p class='ok'>✅ Table <strong>$table</strong> exists</p>";
            } catch (PDOException $e) {
                echo "<p class='err'>❌ Table <strong>$table</strong> not found - import schema.sql!</p>";
            }
        }
        ?>
    </div>
    
    <div class="box">
        <h3>3. Admin User Setup</h3>
        <?php
        try {
            $stmt = $pdo->prepare("SELECT id, email, password FROM admin_users WHERE email = ?");
            $stmt->execute([ADMIN_EMAIL]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                // Hash password if not already hashed
                if (strlen($user['password']) < 50 || !password_verify(ADMIN_PASS, $user['password'])) {
                    $hashed = password_hash(ADMIN_PASS, PASSWORD_DEFAULT);
                    $update = $pdo->prepare("UPDATE admin_users SET password = ? WHERE id = ?");
                    $update->execute([$hashed, $user['id']]);
                    echo '<p class="ok">✅ Admin password hashed and updated</p>';
                } else {
                    echo '<p class="ok">✅ Admin user exists with correct password hash</p>';
                }
                echo '<p>📧 Email: ' . ADMIN_EMAIL . '</p>';
            } else {
                $hashed = password_hash(ADMIN_PASS, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("INSERT INTO admin_users (email, password, name) VALUES (?, ?, 'Aufa Rafii')");
                $stmt->execute([ADMIN_EMAIL, $hashed]);
                echo '<p class="ok">✅ Admin user created</p>';
                echo '<p>📧 Email: ' . ADMIN_EMAIL . '</p>';
            }
        } catch (PDOException $e) {
            echo '<p class="err">❌ Error: ' . $e->getMessage() . '</p>';
        }
        ?>
    </div>
    
    <div class="box">
        <h3>4. Data Check</h3>
        <?php
        $blogCount = $pdo->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn();
        $cvExists = $pdo->query("SELECT COUNT(*) FROM cv_data")->fetchColumn();
        $aboutExists = $pdo->query("SELECT COUNT(*) FROM about_data")->fetchColumn();
        
        echo "<p class='ok'>📝 Blog posts: $blogCount</p>";
        echo "<p class='" . ($cvExists > 0 ? 'ok' : 'warn') . "'>📄 CV data: " . ($cvExists > 0 ? 'OK' : 'Empty') . "</p>";
        echo "<p class='" . ($aboutExists > 0 ? 'ok' : 'warn') . "'>👤 About data: " . ($aboutExists > 0 ? 'OK' : 'Empty') . "</p>";
        ?>
    </div>
    
    <div class="box">
        <h3 class="ok">✅ Setup Complete!</h3>
        <p>You can now access the admin panel at: <a href="index.php" style="color:#a78bfa">/index.php</a></p>
        <p class="warn">⚠️ <strong>IMPORTANT:</strong> Delete this setup.php file after setup for security!</p>
    </div>
</body>
</html>
