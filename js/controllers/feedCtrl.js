'use strict';

angular.module('feedCtrl', ['LocalStorageModule'])
	.controller('feedCtrl', ['feedSrc','localStorageService', FeedCtrl]);

	function FeedCtrl(feedSrc, localStorageService) {

	  var vm = this;
	  vm.area = localStorageService.get('area');
	  

	  vm.getTopFeed = (function() {
	  	feedSrc.getTopFeed()
	  		.then(function(response){
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
	  			console.log(vm.location);
	  			vm.getMap(vm.location);
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		});
	  })();

	  vm.getMap = function(locations) {

	  	var latLng = vm.area.split(',');
	 

	  	var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1]) ),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        zoomControl: false,
        mapTypeControl: false,
			  scaleControl: false,
			  streetViewControl: false,
			  rotateControl: false
    	};

    	vm.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    	console.log(locations);
    	locations.forEach(function(obj) {
    		var icon;
    		if(obj.sport === 'Biking') {
    			icon = 'img/biking.png';
    		} else if (obj.sport === 'Kayaking') {
    			icon = 'img/kayak.png';
    		} else if (obj.sport === 'Skiing') {
    			icon = 'img/skiing.png';
    		} else {
    			icon = '';
    		}

    		var latLng = new google.maps.LatLng(parseFloat(obj.lat), parseFloat(obj.lng));
    		var marker = new google.maps.Marker({
    			position: latLng,
    			title: obj.location,
    			icon: icon
    		});

    		marker.setMap(vm.map);
    	});
    	
 	  };
	}
