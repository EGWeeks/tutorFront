'use strict';

angular.module('postsSrc', [])
	.service('postsSrc', ['$http', PostsSrc]);

	function PostsSrc($http){

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

	}