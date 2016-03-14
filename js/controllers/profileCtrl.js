'use strict';

angular.module('profileCtrl', ['LocalStorageModule'])
	.controller('profileCtrl', ['$location','profileSrc','localStorageService', ProfileCtrl]);

	function ProfileCtrl($location, profileSrc, localStorageService) {

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

	  vm.editUser = function(first, last, email) {
	  	profileSrc.editUserById(first, last, email)
	  		.then(function(response) {
	  			console.log(response);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };
	  
	}