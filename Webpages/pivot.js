// Global Variables
var row, col, filter;

var monthDict = {0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr",
                 4: "May", 5: "Jun", 6: "Jul", 7: "Aug",
                 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"};

var startYear = 2003, avaliableHeaders;

function monthToDate(startYear, monthNum) {
    // Given a start year and the number of months passed, return ["Year", "Month"]
    years = startYear + Math.floor(monthNum / 12);
    months = monthNum % 12;
    return [years.toString(), monthDict[months]];
}



$(function () {

    $(".draggable").draggable({

        revert: function( event, ui ) {
            // From stackoverflow
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
            $(this).addClass("dropped");
            row = ui.draggable.attr("id");
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
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
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
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
            // TODO
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
        }
    });



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



    $("button").click(function(){
        $("#generate").text("Loading...");
        query = "pivot.py?row=" + row + "&col=" + col;
        $.get(query, function(data, status) {
            $("#generate").text("Generate Another Table");
        
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