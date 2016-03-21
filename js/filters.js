'use strict';

angular.module('filters', [])
	.filter('dateFilter', function() {
			return function(date) {
				date = date.split('T');
				return date[0];
			};
	})

	.filter('postByRecent', function() {
		return function(date) {
			return date.slice().reverse();
		};
	});