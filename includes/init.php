<?php
// ACF-JSON LOAD/SAVE POINT group_5b4f42ae66b64

function bccn_acf_json_load_point($paths) {
    $paths[] = BCCN_PATH.'acf-json';
    return $paths;
}
add_filter('acf/settings/load_json', 'bccn_acf_json_load_point');

function bccn_acf_json_save_point($path) {
    if (isset($_POST['acf_field_group']['key']) && $_POST['acf_field_group']['key'] == "group_5b4f42ae66b64") {
        $path = BCCN_PATH.'acf-json';
    }
    return $path;
}
add_filter('acf/settings/save_json', 'bccn_acf_json_save_point');


// Enqueue CSS and JS
function bccn_style_scripts() {
    //main Cookie Consent style https://cookieconsent.insites.com
    wp_register_style('cc-style', BCCN_URL.'css/cookieconsent.min.css');
    wp_enqueue_style('cc-style');

    // plugin's style
    wp_register_style('bccn-style', BCCN_URL.'css/bc-cookie-notice.css');
    wp_enqueue_style('bccn-style');

    //main Cookie Consent script https://cookieconsent.insites.com
    wp_register_script('cc-script', BCCN_URL.'js/cookieconsent.min.js', array(), false, true);
    wp_enqueue_script('cc-script');

    // plugin's script
    wp_register_script('bccn-script', BCCN_URL.'js/bc-cookie-notice.js', array('jquery'), false, true);
    wp_enqueue_script('bccn-script');
    $bccn_request = wp_create_nonce('get_cn_settings');
    wp_localize_script('bccn-script', 'get_cn_setting_ajax_obj', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => $bccn_request,
    ));

}
add_action('wp_enqueue_scripts', 'bccn_style_scripts');


// Add Cookie Notice Option page in backend
if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' 	=> 'BC Cookie Notice Settings',
        'menu_title' 	=> 'BC Cookie Notice',
        'menu_slug' 	=> 'bc-cookie-notice-setting',
        'capability' 	=> 'edit_posts',
        'redirect' 	    => false
    ));
}

// Include files
include(BCCN_PATH.'includes/json.php');
