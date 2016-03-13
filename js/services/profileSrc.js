'use strict';

angular.module('profileSrc', [])
	.service('profileSrc', ['$http', ProfileSrc]);

	function ProfileSrc($http){

		this.getUserById = function(id) {
			return $http({
				method: 'Get',
				url: 'http://localhost:3000/users/3'
			});
		};

	}