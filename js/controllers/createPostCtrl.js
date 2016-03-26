'use strict';

angular.module('createPostCtrl' , ['LocalStorageModule'])
	.controller('createPostCtrl', ['$location','postsSrc', 'localStorageService', CreatePostCtrl]);

	function CreatePostCtrl($location, postsSrc, localStorageService) {

		var vm = this;
		vm.status = 'success';
		vm.area = localStorageService.get('area');

		vm.goTo = function(route) {
			$location.path(route);
		};

		vm.goToEditPost = function(postId) {
			var userId = localStorageService.get('id');
			console.log(postId);
			$location.path('/post/edit/'+ userId + '/' + postId);
		};
		
		vm.getPostsByUserId = function() {
			postsSrc.getPostsUserId()
				.then(function(response) {
					
					vm.posts = response.data.posts;
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.createPosts = function(sport, type, desc, avail, rate) {
			if(rate === undefined) {
	  		rate = 'n/a';
	  	}
			var userId = localStorageService.get('id');
			postsSrc.createPost(sport, type, desc, avail, rate, userId)
				.then(function(response) {
					console.log(response);
					vm.goTo('/feed');
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.getPostByPostId = function() {
			postsSrc.getPostByPostId()
				.then(function(response)  {
					console.log(response);
					vm.singlePost = response.data.post;
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.editPost = function(status, sport, typ, desc, avail, cost) {
			postsSrc.editPost(status, sport, typ, desc, avail, cost)
				.then(function(response) {
					console.log(response);
					vm.goTo("posts/my/" + vm.singlePost.user_id);
				})
				.catch(function(err) {
					console.log(err);
				});
		};

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

    	vm.map = new google.maps.Map(document.getElementById('createMap'), mapOptions);
    		

  		var latLng = new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1]));
  		vm.marker = new google.maps.Marker({
  			position: latLng,
  			icon: null,
  			draggable: true
  		});

  		vm.marker.setMap(vm.map);

  		//get posting location by marker drag
	   	google.maps.event.addListener(vm.marker, 'dragend', function() {
	   		// set the new marker location's lat and lng\
	     	
	     	vm.marker.position[vm.marker.getPosition()];

	     	var locationData = JSON.stringify(vm.marker.position);

	     	var locationObject = JSON.parse(locationData);

	     	var geocoder = new google.maps.Geocoder();
	     	vm.lat = locationObject.lat;
	     	vm.lng = locationObject.lng;

     		geocoder.geocode({'location': locationObject}, function(results, status) {
       		if(status === google.maps.GeocoderStatus.OK){
         		vm.location = results[1].formatted_address;
         		console.log(vm.location);
       		} else {
       			alert('Cannot find location');
       		}
     		});
	 		});
 	  };


	} // End of CreatePostCtrl


