'use strict';

angular.module('createPostCtrl' , ['LocalStorageModule'])
	.controller('createPostCtrl', ['$location','postsSrc', 'localStorageService', CreatePostCtrl]);

	function CreatePostCtrl($location, postsSrc, localStorageService) {

		var vm = this;

		vm.goTo = function(route) {
			$location.path(route);
		};

		vm.createPosts = function(subject, type, desc, avail, rate) {
			var userId = localStorageService.get('id');
			postsSrc.createPost(subject, type, desc, avail, rate, userId)
				.then(function(response) {
					console.log(response);
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.getPostsByUserId = function() {
			postsSrc.getPostsByUserId()
				.then(function(response) {
					console.log(response);
				})
				.catch(function(err) {
					console.log(err);
				});
		};
	}


