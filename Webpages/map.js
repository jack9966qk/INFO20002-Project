function initialize() {
    var mapOptions = {
        center: { lat: 15.562480, lng: -173.057885},
        zoom: 3
    };
    
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var arrow = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeOpacity: 1.0,
    };


    $.get("map.py", function(data, status) {
        var coords = [];
        for (var i in data) {
            var IO = data[i][0][0];
            route = data[i][0][1];
            var num = data[i][1];

            coords = [];
            for (var j in route) {
                coords.push( new google.maps.LatLng(route[j][0], route[j][1]) );
            }
            var flightPath = new google.maps.Polyline({
                path: coords,
                icons: [{
                    icon: arrow,
                    offset: '100%'
                }],
                geodesic: true,
                strokeColor: 'rgba(204,12,2,0.8)',
                strokeOpacity: 1.0,
                strokeWeight: num/35
            });
            if (IO == "O") {
               flightPath.strokeColor = 'rgba(28,143,245,0.8)';
            }
            flightPath.setMap(map);
        }
        
    });

}

google.maps.event.addDomListener(window, 'load', initialize);