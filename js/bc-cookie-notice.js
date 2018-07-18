(function($){

    // Cookie Consent insert
    window.addEventListener("load", function(){
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#cc2424",
                    "text": "#dbc0c0"
                },
                "button": {
                    "background": "#2f2cbf",
                    "text": "#31f5a3"
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
            "theme": "block",
            "position": "bottom",
            "static": false,
            "type": "opt-in",
            "content": {
                "header": "Cookies used on this website!",
                "message": "This is message text",
                // "dismiss": "Dismmis button", for some reason I can't find it in the design
                "deny": "Deny button",
                "allow": "Allow Keksi",
                "link": "Policy link text",
                "href": "//www.bettercollective.com",
            }
        })
    });

})(jQuery);
