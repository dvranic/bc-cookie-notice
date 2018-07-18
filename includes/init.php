<?php
// ACF-JSON LOAD/SAVE POINT


// Enqueue CSS and JS
function bccn_style_scripts() {
    //main Cookie Consent style https://cookieconsent.insites.com
    wp_register_style('bccn-cookieconsent', BCCN_URL.'css/cookieconsent.min.css');
    wp_enqueue_style('bccn-cookieconsent');

    // plugin's style
    wp_register_style('bccn-style', BCCN_URL.'css/bc-cookie-notice.css');
    wp_enqueue_style('bccn-style');

    //main Cookie Consent script https://cookieconsent.insites.com
}
add_action('wp_enqueue_scripts', 'bccn_style_scripts');


// Continueeee
