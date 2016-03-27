'use strict';

angular.module('feedSrc', [])
	.service('feedSrc', ['$http', FeedSrc]);

	function FeedSrc($http){

		this.getTopFeed = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/feed'
			});
		};

		this.getAllLocations = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/feed/location'
			});
		};

		this.getPostById = function(postId) {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/feed/' + postId
			});
		};

		this.getPostingsBySearch = function(sport, type) {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/feed/' + sport + '/' + type
			});
		};

	}