'use strict';

angular.module('feedCtrl', [])
	.controller('feedCtrl', ['feedSrc',FeedCtrl]);

	function FeedCtrl(feedSrc) {

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
	}
