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
            var routeIO = data[i][0][0];
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
            if (routeIO == "O") {
               flightPath.strokeColor = 'rgba(28,143,245,0.8)';
            }
            paths.push(flightPath);
            flightPath.setMap(map);
        }
        
    });


}

$(function () {
    var mapOptions = {
        center: { lat: 15.562480, lng: -173.057885},
        zoom: 3
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    arrow = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeOpacity: 1.0,
    };

    updateMap(map);

    $("#yearSelect").change( function() { 
        year = $('option[name=year]:selected').val();
        updateMap(map);
    });

    $('#monthSelect').change( function() { 
        month = $('option[name=month]:selected').val();
        updateMap(map);
    });


    $('input[name=IO]').change( function() {
        IO = $('input[name=IO]:checked').val();
        updateMap(map);
    });


})