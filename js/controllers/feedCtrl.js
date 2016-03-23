'use strict';

angular.module('feedCtrl', ['LocalStorageModule'])
	.controller('feedCtrl', ['feedSrc','localStorageService', FeedCtrl]);

	function FeedCtrl(feedSrc, localStorageService) {

	  var vm = this;
	  vm.area = localStorageService.get('area');

	  vm.getTopFeed = (function() {
	  	feedSrc.getTopFeed()
	  		.then(function(response){
	  			vm.postings = response.data.posts;
	  		})
	  		.catch(function(err){
	  			console.log(err);
	  		});
	  })();

	  vm.getAllLocations = (function() {
	  	feedSrc.getAllLocations()
	  		.then(function(response) {
	  			console.log(response);
	  			vm.location = response.data.users;
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  })();

	}
