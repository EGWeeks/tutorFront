'use strict';

angular.module('navDir', [])
	.directive('ewNavbar', [navbar]);

	function navbar() {
		return {
			templateUrl : '../partials/navbar.html',
			controller : 'homeCtrl',
			controllerAs : 'HC'
		};
	}
