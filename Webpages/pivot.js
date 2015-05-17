var row = undefined, col = undefined, filter = undefined;


$(function () {

    $(".draggable").draggable();

    $("#row.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
        },
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            row = ui.draggable.attr("id");
            console.log(row);
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
        }
    });

    $("#col.droppable").droppable({
        activate: function( event, ui ) {
            $(this).addClass("dragging");
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
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
        },
        deactivate: function( event, ui ) {
            $(this).removeClass("dragging");
        },
        hoverclass: "hovered",
        drop: function( event, ui ) {
            $(this).addClass("dropped");
            filter = ui.draggable.attr("id");
        },
        out: function( event, ui ) {
            $(this).removeClass("dropped");
        }
    });



    $("button").click(function(){
        $("#generate").text("Loading...");
        console.log("row is " + row + " and col is " + col);
        query = "pivot.py?row=" + row + "&col=" + col;
        $.get(query, function(data, status){
            $("#generate").text("Generate Another Table");
        
            var options = data
            var colorAxis = {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            };
            options.colorAxis = colorAxis;
            $('#container').highcharts(options);
        });

    });

});