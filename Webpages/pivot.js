// Global Variables
var row, col, val, filter;
var isNumFilter;


function generate_options(header, position) {
    // given header (string) and a position (jQuery Object)
    // insert appropriate checkboxes before the position
    query = "pivotHeader.py?header=" + header;
    $.get(query, function(data, status) {
        div = "";
        
        // check the type of the first element, assume data is an array containing either
        //        - two numbers
        //        - multiple strings
        if (typeof data[0] == "number") {
            // generate a range slider
            isNumFilter = true;
            
            div += '<input type="text" id="rangeDisplay" readonly style="border:0; color:#f6931f; font-weight:bold;"><div id="rangeSlider"></div>';
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
                div += "<div>";s
                div += '<input type="checkbox" ckecked="ckecked" class="filOption" ' +
                        'id="' + option + '">' + option;
                div += "</div>";
            }
            position.append(div);
        }
    })
    $("#filterOptions").attr("hidden", false);
}


function update_button() {
    if ( row != undefined && col != undefined && val != undefined) {
        $("button").attr("disabled", false);
        $("button").text("Generate Table");
    } else {
        $("button").attr("disabled", true);
        $("button").text("Drag Options to Boxes");
    }
}


$(function () {

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
            ui.helper.animate({backgroundColor: "#2A57FF"}, "20");
        },
        stop: function( event, ui ) {
            ui.helper.animate({backgroundColor: "#152B40"}, "20");
        }
    });

    $("#row.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drag To Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Row Header");
        },
        hoverclass: "hovered",
        drop: function( event, ui ) {
            ui.draggable.data('dropped', true);
            $(this).addClass("dropped");
            row = ui.draggable.attr("id");
            update_button();
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
            row = undefined;
            update_button();
        }
    });

    $("#col.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drag To Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Column Header");
        },
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            col = ui.draggable.attr("id");
            update_button();
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
            col = undefined;
            update_button();
        }
    });

    $("#val.droppable").droppable({
        accept: "#MaxSeats, #AllFlights",
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drag To Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Value");
        },
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            val = ui.draggable.attr("id");
            update_button();
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
            val = undefined;
            update_button();
        }
    });


    $("#filter.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
            $(this).text("Drag To Here");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
            $(this).text("Filter");
        },
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            $("#selector").empty();
            filter = ui.draggable.attr("id");
            generate_options(ui.draggable.attr("id"), $("#selector"));
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
        }
    });


    $("button").click(function(){
        $("#generate").text("Generating...");
        query = "pivot.py?row=" + row + "&col=" + col + "&val=" + val;
        
        var agg = $("#aggSelect").val();
        query += "&agg=" + agg;
        
        if (filter != undefined) {
            query += "&fil=" + filter;
            if (isNumFilter) {
                var min = $("#rangeSlider").slider("values", 0);
                var max = $("#rangeSlider").slider("values", 1);
                query += "&min=" + min + "&max=" + max;
            } else {
                var options = [];
                
                $('.filterOption:checked').each(function() {
                    options.push($(this).attr("id"));
                });
                var len = options.length;
                for (var i = 0; i < len; i++) {
                    query += "&opt=" + options[i];
                }
            }
        }
        
        console.log(query)
        

        $.get(query, function(data, status) {
            $("#generate").text("Here is");
        
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
            options.chart.zoomType = "xy";
            $('#container').highcharts(options);
        });

    });

});