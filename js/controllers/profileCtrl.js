'use strict';

angular.module('profileCtrl', [])
	.controller('profileCtrl', ['$location','profileSrc', ProfileCtrl]);

	function ProfileCtrl($location, profileSrc) {

	  var vm = this;
	  vm.test = 'blah blah blah';

	  vm.goTo = function(route) {
	  	$location.path(route);
	  };

	  vm.getUserById = (function() {
	  	profileSrc.getUserById()
	  		.then(function(response) {
	  			vm.firstName = response.data.user.first_name;
	  			vm.lastName = response.data.user.last_name;
	  			vm.email = response.data.user.email;
	  			console.log(vm.email);
	  			console.log(response);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  })();

	  vm.deleteUserById = function() {
	  	profileSrc.delUserById()
	  		.then(function(response) {
	  			//TODO: Remove localStorage key and id
	  			// might encapsulate profileCtrl with homeCtrl to access functions
	  			console.log(response);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	  
	}