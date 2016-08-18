require(['angular', 'app',  'services/session.service'], function(angular){
	angular.module('app')
		.service('auth', AuthService);
		function AuthService($http, session, API){
			this.isLoggedIn = function isLoggedIn(){
				return session.getUser() !== null;
			}
			this.logIn = function(credentials){
				return $http({
					url: API.URL,
					method: 'POST',
						data: {
							api: 'login',
							credentials: credentials
						},
						headers: { 'Content-Type':'' }
					})
					.then(function(response){
						if(response) {
							var data = response.data;
							session.setUser(data.user);
							session.setAccessToken(data.accessToken);
							return data.accessToken;
						}else{
							return false;
						}
					});
			}
			this.logOut = function(){
				session.destroy();
			}
			AuthService.$inject = ['$http', 'session'];
		}
});