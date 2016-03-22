$(document).ready(function() {
  /*
   * Application Variables
   */
  // Access token
  L.mapbox.accessToken = 'pk.eyJ1Ijoiam1sYWJzIiwiYSI6Imlnc1pXbncifQ.1U4VwxWkGS_Y3TpZ6-sf4A';

  // Define Rob Lowe Icon
  // var robLoweIcon = L.icon({
  //   // Specify a class name we can refer to in CSS.
  //   className: 'rob-lowe-icon',
  //   // Set marker width and height
  //   iconSize: [120, 181],
  //   // Set icon url
  //   iconUrl: 'assets/images/rob-lowe.png'
  // });

  // /*
  //  * Application Functions
  //  */
  // var addRobLoweIconOnClick = function(e) {
  //   // Add this marker to map...
  //   L.marker([e.latlng.lat, e.latlng.lng], {icon: robLoweIcon}).addTo(map);
  // }

  /*
   * Application Init
   */
  var map = L.mapbox.map('map', 'jmlabs.k3egm800', {
    center: [40.55, -105.07], // lat, long
    zoom: 13
  });

  L.mapbox.tileLayer('mapbox.pencil', {
      maxZoom: 18
  }).addTo(map);

  // // Add Rob Lowe Icons when Clicked!
  // map.on('click', addRobLoweIconOnClick);
});