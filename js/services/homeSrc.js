'use strict';

angular.module('homeSrc', [])
	.service('homeSrc', ['$http', HomeSrc]);

	function HomeSrc($http){

		this.signUp = function(first, last, email, pass) {
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/users/new',
				data: {
					firstName: first,
					lastName: last,
					email: email,
					password: pass
				}
			});
		};

	}