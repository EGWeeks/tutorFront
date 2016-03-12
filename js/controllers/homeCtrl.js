'use strict';

angular.module('homeCtrl', [])
	.controller('homeCtrl', ['$location','homeSrc', HomeCtrl]);

	function HomeCtrl($location, homeSrc) {

	  var vm = this;

	  vm.goTo = function(route) {
	  	$location.path(route);
	  };

	  vm.signUp = function(first, last, email, pass) {
	  	console.log(first, last, email, pass);
	  	homeSrc.signUp(first, last, email, pass)
	  		.then(function(response) {
	  			console.log(response);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  vm.logIn = function(email, pass) {
	  	homeSrc.logIn(email, pass)
	  		.then(function(response) {
	  			console.log(response);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  
	}
