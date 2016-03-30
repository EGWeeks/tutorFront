'use strict';

angular.module('feedSrc', [])
	.service('feedSrc', ['$http', FeedSrc]);

	function FeedSrc($http){

		this.getTopFeed = function() {
			return $http({
				method: 'GET',
				url: 'https://obscure-earth-64971.herokuapp.com/feed'
			});
		};

		this.getAllLocations = function() {
			return $http({
				method: 'GET',
				url: 'https://obscure-earth-64971.herokuapp.com/feed/location'
			});
		};

		this.getPostById = function(postId) {
			return $http({
				method: 'GET',
				url: 'https://obscure-earth-64971.herokuapp.com/feed/' + postId
			});
		};

		this.getPostingsBySearch = function(sport, type) {
			return $http({
				method: 'GET',
				url: 'https://obscure-earth-64971.herokuapp.com/feed/search/' + sport + '/' + type
			});
		};

	}