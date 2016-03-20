'use strict';

var tutorConfig = angular.module('tutorConfig',['ngRoute']);

tutorConfig.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {

	$httpProvider.interceptors.push('authInterceptor');

	$routeProvider

		.when('/', {
			templateUrl: 'partials/landing.html',
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
		})

		.when('/profile/:id', {
			templateUrl: 'partials/profile.html',
			controller: 'profileCtrl',
			controllerAs: 'PC'
		})

		.when('/create', {
			templateUrl: 'partials/create.html',
			controller: 'createPostCtrl',
			controllerAs: 'CPC'
		})

		.when('/posts/my/:id', {
			templateUrl: 'partials/myposts.html',
			controller: 'createPostCtrl',
			controllerAs: 'CPC'
		})

		.when('/post/edit/:id/:post', {
			templateUrl: 'partials/editpost.html',
			controller: 'createPostCtrl',
			controllerAs: 'CPC'
		})

		.when('/feed', {
			templateUrl: 'partials/feed.html',
			controller: 'feedCtrl',
			controllerAs: 'FC'
		});

}]);