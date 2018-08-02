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
        /**
         * Hanning's script
         * @param cname
         * @returns {string}
         */
        //Cookie check
        function getCookieConsent(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        if (getCookieConsent('cookieconsent_status') == 'deny'){
            console.log('Cookie rejected');
            var analyticalCookies = ['_ga','_gid','_gat','AMP_TOKEN','__utma','__utmt','__utmb','__utmc','__utmz','__utmv','__utmx','__utmxx','_gaexp','_eventqueue','_first_pageview','_jsuid','_custom_data_username','_referrer_og','clicky_userdata','heatmaps_g2g_10','_hjClosedSurveyInvites','_hjDonePolls','_hjMinimizedPolls','_hjDoneTestersWidgets','_hjMinimizedTestersWidgets','_hjIncludedInSample','_vis_opt_exp_EXPERIMENT_ID_goal_GOAL_ID','_vis_opt_test_cookie','_vis_opt_exp_EXPERIMENT_ID_combi','_vis_opt_exp_EXPERIMENT_ID_exclude','_vis_opt_exp_EXPERIMENT_ID_split','_vis_opt_s','_vis_opt_out','_vwo_uuid'];

            var getAllCookieNames = function(){
                var pairs = document.cookie.split(";");
                var cookies = [];
                for (var i=0; i<pairs.length; i++){
                    var pair = pairs[i].split("=");
                    cookies.push(pair[0].trim());
                }
                return cookies;
            };

            function intersect(a, b) {
                var t;
                if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
                return a
                    .filter(function (e) {
                        return b.indexOf(e) > -1;
                    })
                    .filter(function (e, i, c) { // extra step to remove duplicates
                        return c.indexOf(e) === i;
                    });
            }

            var fetchedCookies = getAllCookieNames();
            var foundAnalyticalCookies = intersect(analyticalCookies, fetchedCookies);
            console.log('Found following analytical cookies on site:');
            console.log(foundAnalyticalCookies);
            var host = (window.location.host).replace(/^(https?:\/\/)?(www\.)?/,'');
            console.log(host);
            foundAnalyticalCookies.forEach(function(entry) {
                document.cookie = entry + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.'+host;
                document.cookie = entry + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.'+window.location.hostname;
                document.cookie = entry + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain='+window.location.hostname;
            });
        }
    }

    window.addEventListener("load", function(){

        getAllCookies();

        if (cookieConsent == false) {
            cookieNotice();
        }

    });

})(jQuery);
