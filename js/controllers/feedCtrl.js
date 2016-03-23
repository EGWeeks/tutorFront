'use strict';

angular.module('feedCtrl', ['ngMap', 'LocalStorageModule'])
	.controller('feedCtrl', ['feedSrc', 'NgMap', 'localStorageService', FeedCtrl]);

	function FeedCtrl(feedSrc, NgMap, localStorageService) {

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

    vm.getRadius = function() {
      return Math.sqrt(100) * 100;
    };

	}
