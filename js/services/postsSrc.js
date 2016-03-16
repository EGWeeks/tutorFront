'use strict';

angular.module('postsSrc', [])
	.service('postsSrc', ['$http', PostsSrc]);

	function PostsSrc($http){

		this.createPost = function(sub, typ, cost, avail, desc) {
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/posts',
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