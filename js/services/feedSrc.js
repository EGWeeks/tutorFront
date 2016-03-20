'use strict';

angular.module('feedSrc', [])
	.service('feedSrc', ['$http', FeedSrc]);

	function FeedSrc($http){

		this.getFeed = function() {
			return $http({
				method: 'GET',
				url: 'http://localhost:3000/feed'
			});
		};

	}