<?php
/**
 * Database Configuration
 * Portfolio Admin CMS
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'aufarafi_porto');
define('DB_USER', 'aufarafi_me');
define('DB_PASS', 'Itsmeaufa517!');
define('DB_CHARSET', 'utf8mb4');

// Admin credentials for initial setup
define('ADMIN_EMAIL', 'aufatea1@gmail.com');
define('ADMIN_PASS', 'Itsmeaufa517');

// Session / Security
define('SESSION_LIFETIME', 86400); // 24 hours
define('CORS_ORIGIN', '*'); // Change to your domain in production

// Timezone
date_default_timezone_set('Asia/Jakarta');
