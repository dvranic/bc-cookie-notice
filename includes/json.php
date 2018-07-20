<?php

add_action('wp_ajax_bccn_get_settings', 'bccn_ajax_handler');
add_action('wp_ajax_nopriv_bccn_get_settings', 'bccn_ajax_handler');
function bccn_ajax_handler() {

//    check_ajax_referer('get_cn_settings');

    // Get ACF fields from Cookie Notice Option page
    $bccn_background_color = get_field('bccn_background_color', 'option');
    $bccn_text_color = get_field('bccn_text_color', 'option');
    $bc_button_background_color = get_field('bc_button_background_color', 'option');
    $bc_button_text_color = get_field('bc_button_text_color', 'option');
    $bc_theme = get_field('bc_theme', 'option');
    $bc_position = get_field('bc_position', 'option');
    $bc_pulldown = get_field('bc_pulldown', 'option');
    $bc_type = get_field('bc_type', 'option');
    $bc_notice = get_field('bc_notice', 'option');
    $bc_deny_text = get_field('bc_deny_text', 'option');
    $bc_allow_text = get_field('bc_allow_text', 'option');
    $bc_dismiss_text = get_field('bc_dismiss_text', 'option');
    $bc_policy_link_text = get_field('bc_policy_link_text', 'option');
    $bc_link_source = get_field('bc_link_source', 'option');


    if ($bc_link_source == 'internal') {
        $policy_link = get_field('bc_link_page', 'option');

    } else {
        $policy_link = get_field('bc_link_url', 'option');
    }

    $cookie_notice_settings = array(
        'bcPopupBackground' => $bccn_background_color,
        'bcPopupText' => $bccn_text_color,
        'bcButtonBackground' => $bc_button_background_color,
        'bcButtonText' => $bc_button_text_color,
        'bcTheme' => $bc_theme,
        'bcPosition' => $bc_position,
        'bcPulldown' => $bc_pulldown,
        'bcTypeOption' => $bc_type,
        'bcHeaderText' => '',
        'bcMessageText' => $bc_notice,
        'bcDenyBtnText' => $bc_deny_text,
        'bcAllowBtnText' => $bc_allow_text,
        'bcDismissBtnText' => $bc_dismiss_text,
        'bcPolicyLinkText' => $bc_policy_link_text,
        'bcPolicyLink' => $policy_link
    );

    wp_send_json($cookie_notice_settings);

    wp_die(); //All ajax handlers die when finished

}




