require([
    'angular',
    'app',
    'category/category.model',
    'item/item.model',
    'directives/infinityscroll.directive',
    'cart/cart.module',
    //'cart/addcart.directive'
], function(app) {
    angular.module('app.home',[])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
            $stateProvider
                .state('root.home', {
                    url: '/',
                    views: {
                        'categories': {
                            controller: 'CategoryController as category',
                            templateUrl: 'views/menu.tmpl.html'
                        },
                        'items': {
                            controller: 'HomeItems as home',
                            templateUrl: 'views/home-items.html'
                        }
                    }
                })
                .state('root.login',{
                    url: '/login',
                    views: {
                        'items': {
                            templateUrl: 'views/login.html',
                            controller: 'LoginController as login'
                        }
                    }
                })
                .state('root.logout', {
                    url: '/logout',
                    views: {
                        'items': {
                            templateUrl: 'views/login.html',
                            controller: function ($scope, auth,  $state) {
                                auth.logOut();
                                $state.go('root.home');
                            }
                        }
                    }
                })
        }])
        .controller('CategoryController', function CategoryController($scope, CategoryModel) {
            var category = this;
            CategoryModel.getAll(5)
                .then(function (result) {
                    category.all = result;
                });
        })
        .controller('HomeItems', function HomeController($scope, ItemModel) {
            var home = this;
            ItemModel.getItemsByCategory('home', Math.floor(Math.random() * 2) + 1)
                .then(function (items) {
                    home.items = items;
                });


            $scope.getItems = function(){
                ItemModel.getItemsByCategory('home', Math.floor(Math.random() * 10) + 1)
                    .then(function (items) {
                        angular.forEach(items, function (item) {
                            home.items.push(item);
                        });


                    });
            }
        })


        //TODO refactor this
        .controller('LoginController', function($scope, auth, $state){
            var login  = this;
            var formData = {};
            login.submitForm = function() {
                formData.name = login.username;
                formData.password = login.password;
                login.error = false;
                login.loading = true;
                login.username = '';
                login.password = '';
                auth.logIn({
                    user:formData.name,
                    password:formData.password
                }).then(function(token) {
                    if(token){
                        $state.go('root.home');
                    }else{
                        login.error = 'Not authenticated';
                        login.loading = false;
                        login.username = '';
                        login.password = '';
                        $state.go('root.login');
                    }
                });
            };
        })
    ;
});

