'use strict';

angular.module('feedCtrl', ['LocalStorageModule'])
	.controller('feedCtrl', ['feedSrc', 'localStorageService', FeedCtrl]);

	function FeedCtrl(feedSrc, localStorageService) {

	  var vm = this;

	  vm.getFeed = (function() {
	  	feedSrc.getFeed()
	  		.then(function(response){
	  			console.log(response.data.posts);
	  			vm.postings = response.data.posts;
	  		})
	  		.catch(function(err){
	  			console.log(err);
	  		});
	  })();


	  vm.getMap = (function() { 
	  	//Create Map
			//Shows location of User profile location
			L.mapbox.accessToken = 'pk.eyJ1Ijoiam1sYWJzIiwiYSI6Imlnc1pXbncifQ.1U4VwxWkGS_Y3TpZ6-sf4A';

			var geocoder = L.mapbox.geocoder('mapbox.places'),
				map = L.mapbox.map('map', 'examples.map-h67hf2ic');

				var location = localStorageService.get('location');
				// location = user location 
				// show user location
				geocoder.query(location, showMap);

				function showMap(err, data) {
			    // The geocoder can return an area, like a city, or a
			    // point, like an address. Here we handle both cases,
			    // by fitting the map bounds to an area or zooming to a point.
			    if (data.lbounds) {
			        map.fitBounds(data.lbounds);
			    } else if (data.latlng) {
			        map.setView([data.latlng[0], data.latlng[1]], 13);
			    }
				}
	  })();
	}
