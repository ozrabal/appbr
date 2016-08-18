define('app',[
    'angular',
    'layout/layout.module',
    'category/category.module',
    'item/item.module',
    'services/auth.service',
    'services/session.service',
    'services/authinterceptor.service'
],
function (angular) {
    var app = angular.module('app',[
                'ui.router',
                'app.home',
                'app.category',
                'app.item'
    ])
    .constant('API', {
        'URL': 'http://brand.dv/data/api.php'
    })
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider ) {
        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    'sidebar': {
                        templateUrl: 'views/sidebar.html'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    },
                    'content': {
                        templateUrl: 'views/content.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('AuthInterceptor');
    }])
    .run(assignServices)
    .run(checkAccessOnStateChange)
    .run(preventLoginLoggedIn)
    ;

    function assignServices( $rootScope, auth, session){
        $rootScope.auth = auth;
        $rootScope.session = session;
    }
    assignServices.$inject = ['$rootScope', 'auth', 'session'];

    function checkAccessOnStateChange($rootScope, auth, $state){
        $rootScope.$on('$locationChangeStart', function(event){
            if(!auth.isLoggedIn()){
                $state.go('root.login');
                event.preventDefault()
            }
        });
    }
    checkAccessOnStateChange.$inject = ['$rootScope', 'auth', '$state'];

    function preventLoginLoggedIn($rootScope, auth, $state){
        $rootScope.$on('$stateChangeStart', function (event, toState){
            if(auth.isLoggedIn() && toState.name == 'root.login') {
                $state.go('root.home');
                event.preventDefault();
            }
        });
    }
    preventLoginLoggedIn.$inject = ['$rootScope', 'auth', '$state'];

    app.init = function () {
        angular.bootstrap(document, ['app']);
    };
    return app;
});
//TODO move all views into module directories
//TODO loaders for menu & content