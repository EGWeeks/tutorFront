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
	  			vm.lastName = data.last_name;
	  			vm.email = data.email;
	  			vm.bio = data.bio;
	  			vm.area = data.location;
	  			vm.img = data.img;

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

	  vm.editUser = function(first, last, email, bio, area, img) {

	  	if(img === undefined) {
	  		img = 'img/default.png';
	  	}
	  	profileSrc.editUserById(first, last, email, bio, area, img)
	  		.then(function(response) {
	  			console.log(response);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };
	  
	}