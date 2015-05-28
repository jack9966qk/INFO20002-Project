// Global Variables
var year = "2006";
var month = "Jan";
var IO = "Both";
var map, arrow, paths = [];

function updateMap() {
    // clear all existing routes
    for (var i in paths) {
        paths[i].setMap(null);
    }
    paths = [];

    // add new routes
    query = "map.py?";
    query += "year=" + year;
    query += "&month=" + month;
    query += "&IO=" + IO;

    $.get(query, function(data, status) {
        var coords = [];
        for (var i in data) {
            var routeIO = data[i][0][0];  // indicate In or Out
            route = data[i][0][1];        // array of coordinates
            var num = data[i][1];         // flight number

            // get the coordinates in this route
            coords = [];
            for (var j in route) {
                coords.push( new google.maps.LatLng(route[j][0], route[j][1]) );
            }

            // set the flight path with config
            var flightPath = new google.maps.Polyline({
                path: coords,
                icons: [{
                    icon: arrow,
                    offset: '100%'
                }],
                geodesic: true,
                strokeColor: 'rgba(204,12,2,0.8)', // Red color for inbound flights
                strokeOpacity: 1.0,
                strokeWeight: num/35
            });

            if (routeIO == "O") {
               flightPath.strokeColor = 'rgba(28,143,245,0.8)'; // Blue for outbound
            }
            // add it to the path list
            paths.push(flightPath);
            // set the path
            flightPath.setMap(map);
        }
        
    });


}


// on load
$(function () {
    // config for map
    var mapOptions = {
        center: { lat: 15.562480, lng: -173.057885},
        zoom: 3
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    // prepare the arrow style
        arrow = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeOpacity: 1.0,
    };

    // set up the map
    updateMap(map);

    // update the map when the options are changed
    $("#yearSelect").change( function() { 
        year = $('#yearSelect>option:selected').val();
        updateMap(map);
    });

    $('#monthSelect').change( function() { 
        month = $('#monthSelect>option:selected').val();
        updateMap(map);
    });

    $('input').change( function() {
        IO = $('input:checked').val();
        updateMap(map);
    });
})