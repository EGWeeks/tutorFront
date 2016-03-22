'use strict';

angular.module('feedCtrl', ['ngMap'])
	.controller('feedCtrl', ['feedSrc', 'NgMap', FeedCtrl]);

	function FeedCtrl(feedSrc, NgMap) {

	  var vm = this;

	  vm.getFeed = (function() {
	  	feedSrc.getFeed()
	  		.then(function(response){
	  			console.log(response.data.posts);
	  			vm.postings = response.data.posts;
	  		})
	  		.catch(function(err){
	  			console.log(err);
	  		});
	  })();

	  vm.getMap = (function() {
		  NgMap.getMap().then(function(map) {
		  	console.log(map.getCenter());
	    	console.log('markers', map.markers);
	    	console.log('shapes', map.shapes);
		  });
	  })();
	  
	}
