//todo generalize methods (remove getUser, setUser etc ...)
require(['angular', 'app', 'services/localstorage.service'], function(angular){

    angular.module('app')
        .service('session', sessionService);

    sessionService.$inject = ['$log', 'localStorage'];

    function sessionService($log, localStorage){

    this._user = JSON.parse(localStorage.getItem('session.user'));
    this._accessToken = JSON.parse(localStorage.getItem('session.AccessToken'));

        this.getUser = function(){
            return this._user;
        }

        this.getFullName = function(){
            if(this._user) {
                return this._user.name;
            }
        }

        this.setUser = function(user){
            this._user = user;

            localStorage.setItem('session.user', JSON.stringify(user));
            return this;
        }

        this.getAccessToken = function(){
            return this._accessToken;
        }

        this.setAccessToken = function(token){
            this._accessToken = token;
            localStorage.setItem('session.accessToken', token);
            return this;
        }

        this.destroy = function destroy(){
            this.setUser(null);
            this.setAccessToken(null);
        }
    }

});