'use strict';

angular.module('createPostCtrl' , ['LocalStorageModule'])
	.controller('createPostCtrl', ['$location','postsSrc', 'localStorageService', CreatePostCtrl]);

	function CreatePostCtrl($location, postsSrc, localStorageService) {

		var vm = this;
		vm.status = 'success';

		vm.goTo = function(route) {
			$location.path(route);
		};

		vm.goToEditPost = function(postId) {
			var userId = localStorageService.get('id');
			$location.path('/post/edit/'+ userId + '/' + postId);
		};
		
		vm.getPostsByUserId = function() {
			postsSrc.getPostsUserId()
				.then(function(response) {
					
					vm.posts = response.data.posts;
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.createPosts = function(subject, type, desc, avail, rate) {
			if(rate === undefined) {
	  		rate = 'n/a';
	  	}
			var userId = localStorageService.get('id');
			postsSrc.createPost(subject, type, desc, avail, rate, userId)
				.then(function(response) {
					console.log(response);
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.getPostByPostId = function() {
			postsSrc.getPostByPostId()
				.then(function(response)  {
					console.log(response);
					vm.singlePost = response.data.post;
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.editPost = function() {
			postsSrc.editPost()
				.then(function(response) {
					console.log(response);
				})
				.catch(function(err) {
					console.log(err);
				});
		};

	}


