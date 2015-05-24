function initialize() {
    var mapOptions = {
        center: { lat: 15.562480, lng: -173.057885},
        zoom: 2
    };
    
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
    
    var flightPlanCoordinates = [
    	new google.maps.LatLng(37.772323, -122.214897),
    	new google.maps.LatLng(21.291982, -157.821856),
    	new google.maps.LatLng(-18.142599, 178.431),
    	new google.maps.LatLng(-27.46758, 153.027892)
  	];
  	var flightPath = new google.maps.Polyline({
    	path: flightPlanCoordinates,
    	geodesic: true,
    	strokeColor: '#FF0000',
    	strokeOpacity: 1.0,
    	strokeWeight: 2
  	});

  	flightPath.setMap(map);

}

google.maps.event.addDomListener(window, 'load', initialize);