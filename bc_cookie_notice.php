<?php
/**
 * Plugin Name:     BC Cookie Notice
 * Plugin URI:      https://github.com/dvranic/bc-cookie-notice
 * Description:     Plugin adds custom cookie notice to a website. There are several layouts and options to choose from like: Country/Regeion, type of notice (information, opt-out or opt-in) etc.
 * Version:         1.0
 * Author:          BetterCollective
 * Author URI:      https://bettercollective.com
 * License:         GPL2
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     bccookienotice
 * Domain Path:     /languages
 */

define('BCCN_PATH', plugin_dir_path(__FILE__));
define('BCCN_URL', plugin_dir_url(__FILE__));

// Activate files only if Advanced Custom Fields are installed
if ( class_exists('acf') ) {
    require_once( BCCN_PATH . 'includes/init.php' );
}

function bccn_check_for_dependencies() {
    // Check is ACF activated
    if (!class_exists('acf')) { ?>
        <div class="notice notice-error is-dismissible">
            <p>You need to install &amp; activate ACF PRO (v5.6.2+) to make <strong>BC COOKIE NOTICE</strong> plugin to work!</p>
        </div>
    <?php }
    // Add check for any new dependence

}
add_action('admin_notices', 'bccn_check_for_dependencies');