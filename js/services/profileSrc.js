'use strict';

angular.module('profileSrc', [])
	.service('profileSrc', ['$http', '$routeParams', ProfileSrc]);

	function ProfileSrc($http, $routeParams){

		this.getUserById = function() {
			return $http({
				method: 'GET',
				url: 'https://obscure-earth-64971.herokuapp.com/profile/' + $routeParams.id // https://obscure-earth-64971.herokuapp.com/
			});
		};

		this.delUserById = function() {
			return $http({
				method: 'DELETE',
				url: 'https://obscure-earth-64971.herokuapp.com/profile/' + $routeParams.id
			});
		};

		this.editUserById = function(first, last, email, bio, area, zip, lat, lng, image) {
			return $http({
				method: 'PUT',
				url: 'https://obscure-earth-64971.herokuapp.com/profile/' + $routeParams.id,
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