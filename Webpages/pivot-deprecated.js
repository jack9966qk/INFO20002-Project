function generate_checkboxes(header, position) {
    // given header (string) and a position (jQuery Object)
    // insert appropriate checkboxes before the position
    query = "pivotHeader.py?header=" + header;
    var checkboxes = "<div>";
    
    $.get(query, function(data, status) {
        for (var option in data) {
            checkboxes += "<div>";
            checkboxes += '<input type="checkbox"' + 'name="' + header + '"value="' + option + '">' + option;
            checkboxes += "</div>";
        }
        checkboxes += "</div>";
        position.before(checkboxes);
    })
}

/*

    $( "#dateSlider" ).slider({
      range: true,
      min: 0,
      max: 13*12 - 1,
      values: [ 0, 13*12 - 1 ],
      slide: function( event, ui ) {
        from = monthToDate(startYear, ui.values[0]);
        to = monthToDate(startYear, ui.values[1]);
        $( "#dateDisplay" ).val( "From " + from[1] + ", " + from[0] + " to " + to[1] + ", " + to[0]);
      }
    });
*/

/*
var monthDict = {0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr",
                 4: "May", 5: "Jun", 6: "Jul", 7: "Aug",
                 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"};

var startYear = 2003;

function monthToDate(startYear, monthNum) {
    // Given a start year and the number of months passed, return ["Year", "Month"]
    years = startYear + Math.floor(monthNum / 12);
    months = monthNum % 12;
    return [years.toString(), monthDict[months]];
}
*/


/*
<!-- For Date Range Selection -->
<div class="dateRangeSelector">
<div id="dateSlider"></div>
<input type="text" id="dateDisplay" readonly style="border:0; color:#f6931f; font-weight:bold;">
</div>
*/