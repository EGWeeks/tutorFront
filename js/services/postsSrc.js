'use strict';

angular.module('postsSrc', [])
	.service('postsSrc', ['$http', PostsSrc]);

	function PostsSrc($http){

		this.createPost = function(avail, typ, sub, cost, desc) {
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/',//create routes
				data: {
					subject: sub,
					type: typ,
					rate: cost,
					avail: avail,
					desc: desc
				}
			});
		};

	}