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
					console.log(response);
					vm.posts = response.data.posts;
				})
				.catch(function(err) {
					console.log(err);
				});
		};

		vm.createPosts = function(sport, type, desc, avail, rate) {
			// assign rate a value if not specified
			if(rate === undefined) {
	  		rate = 'n/a';
	  	}
	  	// get user id to send to server
			var userId = localStorageService.get('id');

			// if user does not move marker the lat long and
			if(vm.lat === undefined) {
				vm.lat = parseFloat(vm.cords[0]);
				vm.lng = parseFloat(vm.cords[1]);
			}
			// Obj to send to geocode
			var latLngObj = { lat: vm.lat, lng: vm.lng};
			// create new geocode
			var geocoder = new google.maps.Geocoder();

 	  	geocoder.geocode({location: latLngObj}, function(results, status) {
 	  		//Geocode is successful hit service which hits server to store post
     		if (status === google.maps.GeocoderStatus.OK) {
     			// returning formatted location
       		var formatLocation = results[1].formatted_address;

	        postsSrc.createPost(sport, type, desc, avail, rate, userId, formatLocation, vm.lat, vm.lng)
						.then(function(response) {
							vm.goTo('/feed');
						})
						.catch(function(err) {
							console.log(err);
						});

       	} else {
       		alert('Cannot find location');
       	}
     	}); 

			
		};

		vm.getPostByPostId = function() {
			postsSrc.getPostByPostId()
				.then(function(response) {
					vm.singlePost = response.data.post;
					vm.getMap();
				})
				.catch(function(err) {
					alert("We cannot find that post");
					console.log(err);
				});
		};

		vm.editPost = function(stat, sport, typ, desc, avail, cost) {

			// if user does not move marker the lat long and
			if(vm.lat === undefined) {
				vm.lat = parseFloat(vm.cords[0]);
				vm.lng = parseFloat(vm.cords[1]);
			}
			// Obj to send to geocode
			var latLngObj = { lat: vm.lat, lng: vm.lng};

			var geocoder = new google.maps.Geocoder();

 	  	geocoder.geocode({location: latLngObj}, function(results, status) {
 	  		//Geocode is successful hit service which hits server to store post
     		if(status === google.maps.GeocoderStatus.OK){
     			// returning formatted location
       		var formatLocation = results[1].formatted_address;

					postsSrc.editPost(stat, sport, typ, desc, avail, cost, formatLocation, vm.lat, vm.lng)
						.then(function(response) {
							vm.goTo("posts/my/" + vm.singlePost.user_id);
						})
						.catch(function(err) {
							alert("Error editing post");
							console.log(err);
						});
				} else {
					alert('Cannot find marker location');
				}
			});

		};

		// Map function gets used in creating post and editing posts
		vm.getMap = function() {

			if($location.url() !== '/create') {
				// vm.singlePost is the return obj form getPostByPostId()
				// post lat lng
				vm.cords = [vm.singlePost.lat, vm.singlePost.lng];
			} else {
				// vm.area is user lat lng 
				vm.cords = vm.area.split(',');
			}

	  	var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(parseFloat(vm.cords[0]), parseFloat(vm.cords[1]) ),
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

    	vm.map = new google.maps.Map(document.getElementById('createMap'), mapOptions);
    		

  		var latLng = new google.maps.LatLng(parseFloat(vm.cords[0]), parseFloat(vm.cords[1]));
  		vm.marker = new google.maps.Marker({
  			position: latLng,
  			icon: null,
  			draggable: true
  		});

  		vm.marker.setMap(vm.map);

  		//get posting location by marker drag
	   	google.maps.event.addListener(vm.marker, 'dragend', function() {
	   		// set the new marker location's lat and lng
	     	vm.marker.position[vm.marker.getPosition()];

	     	// gets lat and long out of return functions
	     	var locationData = JSON.stringify(vm.marker.position);

	     	// objectify for assignment to vm.lat and vm.lng
	     	// this is the object we give to gecode for human readability 
	     	var locationObj = JSON.parse(locationData);

	     	// lat lng from marker drop by user 
	     	// will be stored with posting
	     	vm.lat = locationObj.lat;
	     	vm.lng = locationObj.lng;

	     	
     		
	 		});
 	  }; // End of getMap

	} // End of CreatePostCtrl


