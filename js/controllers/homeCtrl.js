'use strict';

angular.module('homeCtrl', ['LocalStorageModule'])
	.controller('homeCtrl', ['$location','homeSrc', 'localStorageService', HomeCtrl]);

	function HomeCtrl($location, homeSrc, localStorageService) {

	  var vm = this;

	  vm.goTo = function(route) {
	  	$location.path(route);
	  };

	  vm.signUp = function(first, last, email, pass) {
	  	console.log(first, last, email, pass);
	  	homeSrc.signUp(first, last, email, pass)
	  		.then(function(response) {
	  			localStorageService.set('key', response.data.token);
	  			vm.userId = response.data.id;
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  vm.logIn = function(email, pass) {
	  	homeSrc.logIn(email, pass)
	  		.then(function(response) {
	  			localStorageService.set('key', response.data.token);
	  			vm.userId = response.data.id;
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  vm.getToken = function() {
	  	return localStorageService.get('key');
	  };

	  vm.logOut = function() {
	  	localStorageService.remove('key');
	  };

	  
	}
