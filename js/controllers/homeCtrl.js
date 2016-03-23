'use strict';

angular.module('homeCtrl', ['LocalStorageModule'])
	.controller('homeCtrl', ['$scope','$location','homeSrc', 'localStorageService', HomeCtrl]);

	function HomeCtrl($scope, $location, homeSrc, localStorageService) {

	  var vm = this;

	  vm.goTo = function(route) {
	  	$location.path(route);
	  };

	  vm.signUp = function(first, last, email, img, bio, area, zip, pass) {
	  	//set default picture if undefined
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

		  		homeSrc.signUp(first, last, email, img, bio, area, zip, lat, lng, pass)
		  		.then(function(response) {
		  			localStorageService.set('key', response.data.token);
						localStorageService.set('id', response.data.id);
						localStorageService.set('area', response.data.location);
						// Invoke goTo function after the server has returned with token
						// /feed requires token
						vm.goTo('/feed');
		  		})
		  		.catch(function(err) {
		  			console.log(err);
		  		});
	  		} else {
	  			alert("Could not find location: " + zip);
	  		}
	  	});

	  	
	  };

	  vm.logIn = function(email, pass) {
	  	homeSrc.logIn(email, pass)
	  		.then(function(response) {
	  			localStorageService.set('key', response.data.token);
	  			localStorageService.set('id', response.data.id);
	  			localStorageService.set('area', response.data.location);
					// Invoke goTo function after the server has returned with token
					// /feed requires token
	  			vm.goTo('/feed');
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  vm.getToken = function() {
	  	return localStorageService.get('key');
	  };

	  vm.logOut = function() {
	  	localStorageService.remove('key', 'id', 'area');
	  };

	  vm.goToProfile = function() {
	  	var id = localStorageService.get('id');
	  	$location.path('/profile/' + id);
	  };

	  vm.goToMyPosts = function() {
	  	var id = localStorageService.get('id');
	  	$location.path('/posts/my/' + id);
	  };

	  
	}
