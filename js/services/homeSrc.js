'use strict';

angular.module('homeSrc', [])
	.service('homeSrc', ['$http', HomeSrc]);

	function HomeSrc($http){

		this.signUp = function(first, last, email, image, biography, area, zip, lat, lng, pass) {
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/users/new',
				data: {
					firstName: first,
					lastName: last,
					email: email,
					img: image,
					bio: biography,
					area: area,
					zip: zip,
					lat: lat,
					lng: lng,
					password: pass
				}
			});
		};

		this.logIn = function(email, pass) {
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/users/signin',
				data: {
					email : email,
					password : pass
				}
			});
		};

	}