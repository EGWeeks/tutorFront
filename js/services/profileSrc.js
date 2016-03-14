'use strict';

angular.module('profileSrc', [])
	.service('profileSrc', ['$http', '$routeParams', ProfileSrc]);

	function ProfileSrc($http, $routeParams){

		this.getUserById = function() {
			return $http({
				method: 'Get',
				url: 'http://localhost:3000/profile/' + $routeParams.id
			});
		};
	}