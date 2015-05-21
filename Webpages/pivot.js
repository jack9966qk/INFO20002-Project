// Global Variables
var row, col, filter;




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