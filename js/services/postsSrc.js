'use strict';

angular.module('postsSrc', [])
	.service('postsSrc', ['$http', '$routeParams', PostsSrc]);

	function PostsSrc($http, $routeParams){

		this.createPost = function(sport, typ, desc, avail, cost, id, location, lat, lng) {
			return $http({
				method: 'POST',
				url: 'https://obscure-earth-64971.herokuapp.com/posts',
				data: {
					sport: sport,
					type: typ,
					rate: cost,
					avail: avail,
					desc: desc, 
					user_id: id,
					location: location,
					lat: lat,
					lng: lng
				}
			});
		};

		this.getPostsUserId = function() {
			return $http({
				method: 'GET',
				url: 'https://obscure-earth-64971.herokuapp.com/posts/my/' + $routeParams.id
			});
		};

		this.getPostByPostId = function() {
			return $http({
				method: 'GET',
				url: 'https://obscure-earth-64971.herokuapp.com/posts/my/' + $routeParams.id + '/' + $routeParams.post
			});
		};

		this.editPost = function(status, sport, typ, desc, avail, cost, location, lat, lng) {
			return $http({
				method: 'PUT',
				url: 'https://obscure-earth-64971.herokuapp.com/posts/my/' + $routeParams.id + '/' + $routeParams.post,
				data: {
					status: status,
					sport: sport,
					type: typ,
					rate: cost,
					avail: avail,
					desc: desc,
					location: location,
					lat: lat, 
					lng: lng
				}
			});
		};

	}