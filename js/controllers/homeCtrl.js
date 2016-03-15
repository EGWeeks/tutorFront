'use strict';

angular.module('homeCtrl', ['LocalStorageModule'])
	.controller('homeCtrl', ['$scope','$location','homeSrc', 'localStorageService', HomeCtrl]);

	function HomeCtrl($scope, $location, homeSrc, localStorageService) {

	  var vm = this;

	  vm.goTo = function(route) {
	  	$location.path(route);
	  };

	  vm.signUp = function(first, last, email, img, bio, area, pass) {
	  	if(img === undefined) {
	  		img = 'img/default.png';
	  	}
	  	homeSrc.signUp(first, last, email, img, bio, area, pass)
	  		.then(function(response) {
	  			localStorageService.set('key', response.data.token);
					localStorageService.set('id', response.data.id);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  vm.logIn = function(email, pass) {
	  	homeSrc.logIn(email, pass)
	  		.then(function(response) {
	  			localStorageService.set('key', response.data.token);
	  			localStorageService.set('id', response.data.id);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  vm.getToken = function() {
	  	return localStorageService.get('key');
	  };

	  vm.logOut = function() {
	  	localStorageService.remove('key', 'id');
	  };

	  vm.goToProfile = function() {
	  	var id = localStorageService.get('id');
	  	$location.path('/profile/' + id);
	  };

	  
	}
