'use strict';

angular.module('postsSrc', [])
	.service('postsSrc', ['$http', '$routeParams', PostsSrc]);

	function PostsSrc($http, $routeParams){

		this.createPost = function(sub, typ, desc, avail, cost, id) {
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/posts',
				data: {
					subject: sub,
					type: typ,
					rate: cost,
					avail: avail,
					desc: desc, 
					user_id: id
				}
			});
		};

		this.getPostsUserId = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/posts/my/' + $routeParams.id
			});
		};

		this.getPostByPostId = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/posts/my/' + $routeParams.id + '/' + $routeParams.post
			});
		};

		this.editPost = function(status, sub, typ, desc, avail, cost) {
			return $http({
				method: 'PUT',
				url: 'http://localhost:3000/posts/my/' + $routeParams.id + '/' + $routeParams.post,
				data: {
					status: status,
					subject: sub,
					type: typ,
					rate: cost,
					avail: avail,
					desc: desc
				}
			});
		};

	}