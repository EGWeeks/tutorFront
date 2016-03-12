'use strict';

var tutorConfig = angular.module('tutorConfig',['ngRoute']);

tutorConfig.config(['$routeProvider', function($routeProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl',
			controllerAs: 'HC'
		})
		
		.when('/signup', {
			templateUrl: 'partials/signup.html',
			controller: 'homeCtrl',
			controllerAs: 'HC'
		})

		.when('/login', {
			templateUrl: 'partials/logIn.html',
			controller: 'homeCtrl',
			controllerAs: 'HC'
		});

}]);