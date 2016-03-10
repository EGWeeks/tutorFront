'use strict';

var tutorConfig = angular.module('tutorConfig',['ngRoute']);

tutorConfig.config(['$routeProvider', function($routeProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'mainCtrl',
			controllerAs: 'MC'
		});

}]);