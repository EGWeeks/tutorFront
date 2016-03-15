'use strict';

angular.module('createPostCtrl' , [])
	.controller('createPostCtrl', ['postsSrc', CreatePostCtrl]);

	function CreatePostCtrl(postsSrc) {

		var vm = this;

		vm.createPosts = function(avail, type, subject, cost) {
			postsSrc.createPost(avail, type, subject, cost)
				.then(function(response) {
					console.log(response);
				})
				.catch(function(err) {
					console.log(err);
				});
		};
	}