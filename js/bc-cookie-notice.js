(function($){

    let cookieContainer = [];
    let cookieConsent = false;
    let cookieConsentVal;

    function cookieNotice(){
        // AJAX request to get data from Cookie Notice Option page
        // let bccn_ajax_data;
        $.post(
            get_cn_setting_ajax_obj.ajax_url,
            {
                _ajax_nonce: get_cn_setting_ajax_obj.nonce,
                action: 'bccn_get_settings',

            },
            function(obj) {

                // Cookie Consent API insert
                window.cookieconsent.initialise({
                    palette: {
                        popup: {
                            background: obj.bcPopupBackground,
                            text: obj.bcPopupText
                        },
                        button: {
                            background: obj.bcButtonBackground,
                            text: obj.bcButtonText
                        },
                        highlight: {
                            background: "",
                            border: "",
                            text: ""
                        }
                    },
                    layout: "basic",
                    // Define layouts
                    layouts: {
                        basic: "{{messagelink}}{{compliance}}",
                        basicHeader: "{{header}}{{message}}{{link}}{{compliance}}",
                    },
                    elements: {

                    },
                    theme: obj.bcTheme,
                    position: obj.bcPosition,
                    static: obj.bcPulldown,
                    type: obj.bcTypeOption,
                    content: {
                        header: obj.bcHeaderText,
                        message: obj.bcMessageText,
                        dismiss: obj.bcDismissBtnText,
                        deny: obj.bcDenyBtnText,
                        allow: obj.bcAllowBtnText,
                        link: obj.bcPolicyLinkText,
                        href: obj.bcPolicyLink,
                    },
                    revokable: true,
                    onStatusChange: function(status){
                        if(this.hasConsented()) {
                            cookieEnable();
                        } else {
                            cookieDisable();
                        }
                    },
                });

            }
        );

    }

    function getAllCookies(){
        cookieContainer = [];
        // get all cookies as a string
        let allCookies = document.cookie;

        // split string to arrays of cookies and values
        allCookies = allCookies.split('; ');

        for (let i=0; i<allCookies.length; i++) {
            cookieContainer.push(allCookies[i].split('='));
        }

        for (let i = 0; i < cookieContainer.length; i++) {
            if (cookieContainer[i][0] == 'cookieconsent_status') {
                cookieConsent = true;
                cookieConsentVal = cookieContainer[i][1];
                console.log(`${i}: Cookie consent is ${cookieConsentVal}`);
                break;
            }
        }
    }

    function cookieEnable() {
        console.log('enable cookies');
    }

    function cookieDisable() {
        console.log('disable cookies');
    }

    window.addEventListener("load", function(){

        getAllCookies();

        if (cookieConsent == false) {
            cookieNotice();
        }

    });

})(jQuery);
