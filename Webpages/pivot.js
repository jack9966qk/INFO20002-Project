// Global Variables
var row, col, val, filter;
var isNumFilter;


function generate_options(header, position) {
    // given header (string) and a position (jQuery Object)
    // insert appropriate checkboxes / slider before the position
    query = "pivotHeader.py?header=" + header.replace(/_/g, ' ');

    // HTTP GET for boundary/unique values
    $.get(query, function(data, status) {
        var div = "";
        
        // check the type of the first element, assume data is an array containing either
        //        - two numbers
        //        - multiple strings
        if (typeof data[0] == "number") {
            // generate a range slider
            isNumFilter = true;
            
            div += '<input type="text" id="rangeDisplay"><div id="rangeSlider"></div>';
            position.append(div);
            $( "#rangeSlider" ).slider({
                range: true,
                min: data[0],
                max: data[1],
                values: [ data[0], data[1] ],
                slide: function( event, ui ) {
                    $( "#rangeDisplay" ).val( ui.values[0] + " - " + ui.values[1] );
                }
            });
            $( "#rangeDisplay" ).val( 
                                $( "#rangeSlider" ).slider( "values", 0 ) + " - " +
                                $( "#rangeSlider" ).slider( "values", 1 ) 
                                     );
        } else {
            // generate checkboxes
            isNumFilter = false;
            var len = data.length;
            for (var i = 0; i < len; i++) {
                option = data[i];
                div += '<div class="cell">';
                // reaplaced all whitespaces with undersocre because of the HTML5 standard
                div += '<input type="checkbox" ckecked="ckecked" class="filOption" ' +
                        'id="' + option.replace(/ /g,"_") + '"><br/>' + option;
                div += "</div>";
            }
            position.append(div);
        }
    })
}


function update_button() {
    // determine if the button should be enabled
    if ( row != undefined && col != undefined && val != undefined) {
        $("button").attr("disabled", false);
        $("button").text("Generate Table");
    } else {
        $("button").attr("disabled", true);
        $("button").text("Drag Options to Boxes");
    }
}


// on load
$(function () {
    // for all the options to be dragged
    $(".draggable").draggable({
        revert: function( event, ui ) {
            // Return to original position when not dragged to droppable
            //    From stackoverflow
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
        },

        start: function( event, ui ) {
            // animate to blue color when dragged
            ui.helper.animate({backgroundColor: "#2A57FF"}, "20");
        },
        stop: function( event, ui ) {
            // animate back when drag finished
            ui.helper.animate({backgroundColor: "#152B40"}, "20");
        }
    });


    // for the 4 boxes where options are dropped
    $("#row.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drop Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Rows");
        },
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            row = ui.draggable.attr("id"); // update option
            $(this).droppable('option', 'accept', ui.draggable); // no more is accepted
            update_button();
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
            $(this).droppable('option', 'accept', '*'); // now accept every option
            row = undefined; // update option
            update_button();
        }
    });

    $("#col.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drop Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Columns");
        },
        // class added when draggable hovered on droppable
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            col = ui.draggable.attr("id"); // update options
            $(this).droppable('option', 'accept', ui.draggable); // no more is accepted
            update_button();
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
            $(this).droppable('option', 'accept', '*'); // now accept every option
            col = undefined; // update option
            update_button();
        }
    });

    $("#val.droppable").droppable({
        accept: "#MaxSeats, #AllFlights", // accept only numerical values
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drop Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Value");
        },
        // class added when draggable hovered on droppable
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            val = ui.draggable.attr("id"); // update options
            $(this).droppable('option', 'accept', ui.draggable); // no more is accepted
            update_button();
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
            $(this).droppable('option', 'accept', "#MaxSeats, #AllFlights"); // accept numerical values
            val = undefined; // update option
            update_button();
        }
    });


    $("#filter.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drop Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Filter");
        },
        // class added when draggable hovered on droppable
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).droppable('option', 'accept', ui.draggable); // no more is accepted
            $(this).addClass("dropped");
            filter = ui.draggable.attr("id"); // update option
            update_button();
            $("#filterOptions").attr("hidden", false);
            generate_options(ui.draggable.attr("id"), $("#selector")); // generate filter options        
        },
        out: function( event, ui ) {
            $(this).droppable('option', 'accept', '*');
            $("#selector").empty();
            filter = undefined; // update option
            $(this).removeClass("dropped");
            update_button();
            $("#filterOptions").attr("hidden", true);
        }
    });
    
    $('input[name=aggregate]').change( function() {
        // update button when user change aggregate option
        update_button();
    });

    $("button").click( function() {
        // ready to submit data
        $("#generate").text("Generating...");

        // build query string
        query = "pivot.py?row=" + row.replace(/_/g, ' ') +
                "&col=" + col.replace(/_/g, ' ') +
                "&val=" + val.replace(/_/g, ' ');
        var agg = $('input[name=aggregate]:checked').val();
        query += "&agg=" + agg;
        if (filter != undefined) {
            // if has filter
            query += "&fil=" + filter.replace(/_/g, ' ');
            if (isNumFilter) {
                // get values from slider
                var min = $("#rangeSlider").slider("values", 0);
                var max = $("#rangeSlider").slider("values", 1);
                query += "&min=" + min + "&max=" + max;
            } else {
                // get values from checkboxes
                var options = [];
                $('.filOption:checked').each(function() {
                    options.push($(this).attr("id").replace(/_/g, ' '));
                });
                var len = options.length;
                for (var i = 0; i < len; i++) {
                    query += "&opt=" + options[i];
                }
            }
        }       

        // HTTP GET for Highcharts config
        $.get(query, function(data, status) {
            if (data.series[0].data.length == 0) {
                // if no data is returned
                $('#generate').text("No data found, check filter");
                $("button").attr("disabled", true);
                return;
            }

            // otherwise (successful) generate the chart
            $("#generate").text("Here is:");
            $("button").attr("disabled", true);
        
            var options = data;
            var colorAxis = {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            };
            
            var tooltip = {
                formatter: function () {
                    return this.series.xAxis.categories[this.point.x] + ', ' +
                        this.series.yAxis.categories[this.point.y] + ': ' +   this.point.value;
                }
            };
            
            options.colorAxis = colorAxis;
            options.tooltip = tooltip;
            options.chart.backgroundColor = "rgba(255, 255, 255, 0.3)";
            options.chart.zoomType = "xy"; // enable zoom
            $('#container').highcharts(options);
        });

    });

});