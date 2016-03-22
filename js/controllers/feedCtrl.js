'use strict';

angular.module('feedCtrl', [])
	.controller('feedCtrl', ['feedSrc',FeedCtrl]);

	function FeedCtrl(feedSrc) {

	  var vm = this;

	  vm.getFeed = (function() {
	  	feedSrc.getFeed()
	  		.then(function(response){
	  			console.log(response.data.posts);
	  			vm.postings = response.data.posts;
	  			//Create Map
	  			L.mapbox.accessToken = 'pk.eyJ1Ijoiam1sYWJzIiwiYSI6Imlnc1pXbncifQ.1U4VwxWkGS_Y3TpZ6-sf4A';

	  			var map = L.mapbox.map('map', 'jmlabs.k3egm800', {
    									center: [40.55, -105.07], // lat, long
    									zoom: 13
									  });

									  L.mapbox.tileLayer('mapbox.streets', {
									      maxZoom: 18
									  }).addTo(map);
									  console.log('MAP!!');
	  		})
	  		.catch(function(err){
	  			console.log(err);
	  		});
	  })();
	}
