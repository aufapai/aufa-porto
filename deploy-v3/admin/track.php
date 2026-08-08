<?php
/**
 * Traffic Tracker Script
 * Include this script in your portfolio site to track page views
 * 
 * Usage: Add this before </body> in your HTML:
 * <script src="https://your-domain.com/deploy-admin/tracker.js"></script>
 * 
 * OR use the PHP API directly from this file:
 * <script src="https://your-domain.com/deploy-admin/track.php"></script>
 */

header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: no-cache');

// Get the API base URL dynamically
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$baseUrl = $protocol . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']);
?>
(function() {
    'use strict';
    
    // Don't track admin pages
    if (window.location.pathname.indexOf('deploy-admin') !== -1) return;
    if (window.location.pathname.indexOf('z8admin') !== -1) return;
    
    var API_URL = '<?php echo $baseUrl; ?>/api/traffic.php?action=track';
    
    function trackPageView() {
        var data = {
            page: window.location.pathname,
            referrer: document.referrer || 'Direct',
            user_agent: navigator.userAgent,
            screen_size: window.innerWidth + 'x' + window.innerHeight
        };
        
        // Use sendBeacon if available (doesn't block page unload)
        if (navigator.sendBeacon) {
            navigator.sendBeacon(API_URL, JSON.stringify(data));
        } else {
            fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                keepalive: true
            }).catch(function() {});
        }
    }
    
    // Track on page load
    trackPageView();
    
    // Track on SPA navigation (history API)
    var pushState = history.pushState;
    history.pushState = function() {
        pushState.apply(history, arguments);
        setTimeout(trackPageView, 100);
    };
    
    window.addEventListener('popstate', function() {
        setTimeout(trackPageView, 100);
    });
})();
