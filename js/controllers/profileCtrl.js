'use strict';

angular.module('profileCtrl', [])
	.controller('profileCtrl', ['profileSrc', ProfileCtrl]);

	function ProfileCtrl(profileSrc) {

	  var vm = this;
	  vm.test = 'blah blah blah';

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

	  
	}