'use strict';

angular.module('feedCtrl', ['LocalStorageModule'])
	.controller('feedCtrl', ['feedSrc','localStorageService', FeedCtrl]);

	function FeedCtrl(feedSrc, localStorageService) {

	  var vm = this;
	  vm.area = localStorageService.get('area');
	  

	  vm.getTopFeed = (function() {
	  	feedSrc.getTopFeed()
	  		.then(function(response){
	  			vm.hideFeed = false;
	  			vm.postings = response.data.posts;
	  		})
	  		.catch(function(err){
	  			console.log(err);
	  		});
	  })();

	  vm.getAllLocations = (function() {
	  	feedSrc.getAllLocations()
	  		.then(function(response) {
	  			vm.location = response.data.users;
	  			//create MAP & markers
	  			console.log(vm.location);
	  			vm.getMap(vm.location);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  })();

	  // Invoke in getAllLocations ^
	  vm.getMap = function(locations) {

	  	var latLng = vm.area.split(',');
	 

	  	var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1]) ),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoomControl: true,
        zoomControlOptions: {
			  	position: google.maps.ControlPosition.LEFT_BOTTOM
			  },
        mapTypeControl: false,
			  scaleControl: false,
			  streetViewControl: false,
			  rotateControl: false
    	};

    	vm.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    	// Loop for locations array to make markers for each
    	// location lat and long
    	locations.forEach(function(obj) {
    		
    		var icon;
    		if (obj.sport === 'Biking') {
    			icon = 'img/biking.png';
    		} else if (obj.sport === 'Kayaking') {
    			icon = 'img/kayaking.png';
    		} else if (obj.sport === 'Skiing') {
    			icon = 'img/skiing.png';
    		} else if (obj.sport === 'Fishing') {
    			icon = 'img/fishing.png';
    		} else if (obj.sport === 'Climbing') {
    			icon = 'img/climbing.png';
    		} else {
    			icon = 'img/Snowboarding.png';
    		}

    		var latLng = new google.maps.LatLng(parseFloat(obj.lat), parseFloat(obj.lng));
    		vm.marker = new google.maps.Marker({
    			position: latLng,
    			title: obj.location,
    			icon: icon,
    			animation: google.maps.Animation.DROP,
    			draggable: true
    		});

    		vm.marker.setMap(vm.map);
    		vm.markerListener(vm.marker, obj.id.toString());

    	});

 	  };

 	  vm.markerListener = function(marker, id) {
 	  	
	  	marker.addListener('click', function() {
	  		
				vm.hideFeed = true;

	  		feedSrc.getPostById(id)
	  			.then(function(response) {
	  				vm.singlePost = response.data.post[0];
	  			})
	  			.catch(function(err) {
	  				console.log(err);
	  			});
	  	});
	  };

	  vm.getPostById = function(id) {

	  	feedSrc.getPostById(id)
	  			.then(function(response) {
	  				console.log(response);
	  				vm.singlePost = response.data.post[0];
	  			})
	  			.catch(function(err) {
	  				console.log(err);
	  			});
	  		};

	  vm.clearFilter = function() {
	  	vm.sport = null;
	  	vm.type = null;
	  };

	  vm.filterTool = function(sport, type) {
	  	feedSrc.getPostingsBySearch(sport, type)
	  		.then(function(response) {
	  			vm.postings = response.data.posts;
	  			//Need to show the markers in the postings feed
	  			//respone is returning lat and lng
	  			// How to updated map to show new markers??
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  };

	}
