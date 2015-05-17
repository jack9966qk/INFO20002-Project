$(function () {
    $("button").click(function(){
        $("#generate").text("Loading...");
        row = $('input[name=row]:checked', '#tableForm').val();
        col = $('input[name=col]:checked', '#tableForm').val();
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

});​