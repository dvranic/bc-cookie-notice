(function($){


    // Cookie Consent API insert
    window.addEventListener("load", function(){

        // AJAX request to get data from Cookie Notice Option page
        // let bccn_ajax_data;
        $.post(
            get_cn_setting_ajax_obj.ajax_url,
            {
                _ajax_nonce: get_cn_setting_ajax_obj.nonce,
                action: 'bccn_get_settings',

            },
            function(obj) {

                console.log(obj.bcPolicyLink);

                window.cookieconsent.initialise({
                    "palette": {
                        "popup": {
                            "background": obj.bcPopupBackground,
                            "text": obj.bcPopupText
                        },
                        "button": {
                            "background": obj.bcButtonBackground,
                            "text": obj.bcButtonText
                        },
                        "highlight": {
                            "background": "",
                            "border": "",
                            "text": ""
                        }
                    },
                    "layout": "basic",
                    // Define layouts
                    "layouts": {
                        "basic": "{{messagelink}}{{compliance}}",
                        "basic-header": "{{header}}{{message}}{{link}}{{compliance}}",
                    },
                    "elements": {

                    },
                    "theme": obj.bcTheme,
                    "position": obj.bcPosition,
                    "static": obj.bcPulldown,
                    "type": obj.bcTypeOption,
                    "content": {
                        "header": obj.bcHeaderText,
                        "message": obj.bcMessageText,
                        "dismiss": obj.bcDismissBtnText,
                        "deny": obj.bcDenyBtnText,
                        "allow": obj.bcAllowBtnText,
                        "link": obj.bcPolicyLinkText,
                        "href": obj.bcPolicyLink,
                    }
                });

            }
        );

    });

})(jQuery);
