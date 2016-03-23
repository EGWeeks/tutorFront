'use strict';

angular.module('profileCtrl', ['LocalStorageModule'])
	.controller('profileCtrl', ['$location','profileSrc','localStorageService', ProfileCtrl]);

	function ProfileCtrl($location, profileSrc, localStorageService) {

	  var vm = this;

	  vm.goTo = function(route) {
	  	$location.path(route);
	  };

	  vm.getUserById = (function() {
	  	profileSrc.getUserById()
	  		.then(function(response) {

	  			var data = response.data.user;

	  			vm.firstName = data.first_name;
	  			vm.lastName  = data.last_name;
	  			vm.email 		 = data.email;
	  			vm.bio 			 = data.bio;
	  			vm.area 		 = data.location;
	  			vm.zip 			 = data.zip;
	  			vm.img 			 = data.img;

	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  })();

	  vm.deleteUserById = function() {
	  	profileSrc.delUserById()
	  		.then(function(response) {
	  			localStorageService.remove('key', 'id');
	  			console.log(response);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  vm.editUser = function(first, last, email, bio, area, zip, img) {

	  	if(img === undefined) {
	  		img = 'img/default.png';
	  	}

	  	// New geocoder object 
	  	var geoCoder = new google.maps.Geocoder();
	  	// geocode by zip
	  	// send the returned lat and lng
	  	// to the server to be stores with user info
	  	geoCoder.geocode({address: zip}, function(results, status) {

	  		var lat = results[0].geometry.location.lat();
	  		var lng = results[0].geometry.location.lng();
	  		// if gecode return ok run the service and hit the server
	  		if(status === 'OK') {

			  	profileSrc.editUserById(first, last, email, bio, area, zip, lat, lng, img)
			  		.then(function(response) {
			  			console.log(response);
			  		})
			  		.catch(function(err) {
			  			console.log(err);
			  		});

	  		} else {
	  			alert("Could not find location: " + zip);
	  		}
	  	});
	  };
	  
	}

