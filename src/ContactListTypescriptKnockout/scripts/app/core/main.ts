require.config({
    baseUrl: '/',
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "knockout": "lib/knockoutjs/dist/knockout.debug",
        "knockout.validation": "lib/knockout-Validation/Dist/knockout.validation",
        "bootstrap": "lib/bootstrap/dist/js/bootstrap",
        "text": "lib/text/text",
    },
    shim: {
        "knockout.validation": {
            deps: ['knockout']
        }
    }
});

require(['knockout', 'core/boot']);