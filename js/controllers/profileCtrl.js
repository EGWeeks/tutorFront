'use strict';

angular.module('profileCtrl', [])
	.controller('profileCtrl', ['profileSrc', ProfileCtrl]);

	function ProfileCtrl(profileSrc) {

	  var vm = this;
	  vm.test = 'blah blah blah';

	  vm.getUserById = (function(id) {
	  	profileSrc.getUserById(id)
	  		.then(function(userData) {
	  			console.log(userData);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  })();

	  
	}