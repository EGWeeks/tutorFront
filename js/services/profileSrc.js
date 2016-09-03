'use strict';

angular.module('profileSrc', [])
	.service('profileSrc', ['$http', '$routeParams', ProfileSrc]);

	function ProfileSrc($http, $routeParams){

		this.getUserById = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/profile/' + $routeParams.id // http://localhost:3000/
			});
		};

		this.delUserById = function() {
			return $http({
				method: 'DELETE',
				url: 'http://localhost:3000/profile/' + $routeParams.id
			});
		};

		this.editUserById = function(first, last, email, bio, area, zip, lat, lng, image) {
			return $http({
				method: 'PUT',
				url: 'http://localhost:3000/profile/' + $routeParams.id,
				data: {
					firstName: first,
					lastName: last, 
					email: email,
					bio: bio,
					area: area,
					zip: zip,
					lat: lat,
					lng: lng,
					img: image
				}
			});
		};
	}