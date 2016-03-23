'use strict';

angular.module('feedCtrl', ['ngMap'])
	.controller('feedCtrl', ['feedSrc', 'NgMap', FeedCtrl]);

	function FeedCtrl(feedSrc, NgMap) {

	  var vm = this;

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
