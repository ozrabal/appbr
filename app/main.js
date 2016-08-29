require.config({
    baseUrl: 'app/',
    paths: {
        'angular'   : "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular",
        'jquery'    : 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
        'bootstrap' : 'http://netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
        'ui.router' : '../vendor/angular-ui-router.min',
        'lodash'    : 'https://cdn.jsdelivr.net/lodash/4.15.0/lodash.min'
        //'ngCart'    : '../vendor/ngCart'
    },
    shim: {
        angular: {
            exports : 'angular',
            deps    : ['jquery']
        },
        bootstrap: {
            deps    : ['jquery']
        },
        'ui.router': {
            deps    : ['angular']
        },
        /*'ngCart':{
            deps    : ['angular']
        }*/
    }
});
require([
    'app',
    'angular',
    'jquery',
    'bootstrap',
    'ui.router',
    'lodash'
    //'ngCart'
], function (app) {
    app.init();
});