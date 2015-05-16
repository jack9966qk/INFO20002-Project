
$(function () {
    $("button").click(function(){
        row = $('input[name=row]:checked', '#tableForm').val()
        col = $('input[name=col]:checked', '#tableForm').val()
        query = "pivot.py?row=" + row + "&col=" + col
        $.get(query, function(data, status){
            //Do something
        });
    });



    $('#container').highcharts({
        data: {
            table: 'pivotTable'
        },
        chart: {
            type: 'heatmap'
        },
        title: {
            text: 'The Pivot Table'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Flights'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' ' + this.point.name.toLowerCase();
            }
        }
    });
});