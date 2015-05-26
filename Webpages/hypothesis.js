$(function () {
    // Create the chart
    $('#container1').highcharts({
        credit: {
            enabled: false
        },

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},

        title: {
            text: 'Australian Cities With The Most Flight Traffic'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		xAxis: {
            title: {
                text: 'City'
            }
        },
		
		yAxis: {
            title: {
                text: 'Number of Flights'
            }
        },
		
		legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
		
	    tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:f}k</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        data: {
            googleSpreadsheetKey: '1VcjbxN02sGPudOuGCi_cdef6htU6P44HhDefdewK6t8'//Rahul's key
        }

    });

    $('#container2').highcharts({
        credit: {
            enabled: false
        },

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "area"
    	},

        title: {
            text: 'Airline Market Share'
        },
		
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		yAxis: {
            title: {
				text: 'Percentage'
			}
        },
		
		tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>',
            shared: true
        },
		
		plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                }
            }
        },
		
        data: {
            googleSpreadsheetKey: '1tqsRCX55dmxXTiNdtMJ95vplWac7AZ-on2bO70RDLVE', //Rahul's Key
			googleSpreadsheetWorksheet: 1
        }

    });
	
    $('#container4').highcharts({
        credit: {
            enabled: false
        },

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},
		
		yAxis: {
            title: {
				text: 'Index Percentage Change (2003=0)'
			}
        },

        title: {
            text: 'Economy and Business Class airline ticket pricing - CPI'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },

        data: {
            googleSpreadsheetKey: '1y3qV0N6B9MMTdxf11rCuUu5sYBCsz90AXjc7-nnT_pg' //Rahul's Key
        }

    });

    $('#container5').highcharts({
        credit: {
            enabled: false
        },

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)"
    	},

        title: {
            text: 'Highcharts Data From Google Spreadsheets'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },

        data: {
            googleSpreadsheetKey: '1CTpdP735Zmb7YTKa7HNb-8aWE_UDcwmGSRxXGSzGosU'
        }

    });


	$('#container6').highcharts({
        credit: {
            enabled: false
        },

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)"
    	},

        title: {
            text: 'Arrivals and Departures'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		yAxis: {
            title: {
				text: 'Number of Travellers'
			}
        },

        data: {
            googleSpreadsheetKey: '1n6GT4EgfTNE1PTMnEDt6jDNz9V2AXK_4n-mI-juw6kE', //Rahul's Key
			googleSpreadsheetWorksheet: 1
        }

    });
	    
    $('#container7').highcharts({
        credit: {
            enabled: false
        },
		rangeSelector : {
                selected : 1
        },
    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)"
    	},
		colors: ['#87D37C'],
        title: {
            text: 'Value of The Australian Dollar'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		yAxis: {
            title: {
				text: 'US Dollar'
			},
			plotLines : [{
                    value : 0.761,
                    color : '#f45b5b',
                    dashStyle : 'shortdash',
                    width : 2,
                    label : {
                        text : 'Average Rate'
                    }
            }]
        },

        data: {
            googleSpreadsheetKey: '1n6GT4EgfTNE1PTMnEDt6jDNz9V2AXK_4n-mI-juw6kE', //Rahul's Key
			googleSpreadsheetWorksheet: 2
        }

    });
	   
    $('#container8').highcharts({
        credit: {
            enabled: false
        },
    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "bar"
    	},
        title: {
            text: 'Most Popular Routes Taken To and From Australia'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		colors: ['#AEA8D3'],
		xAxis: {
            title: {
                text: 'Routes'
            }
        },
		
	    yAxis: {
            title: {
				text: 'Number of Flights'
			}
        },
		
        data: {
            googleSpreadsheetKey: '1DkgzFtue_gOly52Qxr9J3OVsjTJLy_Bsh5R8lRL1Uv8', //Rahul's Key
        }

    });

       $('#container9').highcharts({
       	   		
    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},

        colors: ['#FFD700'],

        title: {
            text: 'Top 10 Countries Travelled To From Australia. (September 2003 - February 2015)'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		xAxis: {
            title: {
                text: 'Countries'
            }
        },
        
        yAxis: {
            title: {
                text: 'Number of Flights'
            }
        },
        
       
        data: {
            googleSpreadsheetKey: '1Mowpe6EIG78esqQcyyEscuSO5gP6yymjNMR-T9r9P9M', //Julian's Key
            googleSpreadsheetWorksheet: 1
            
        
        }

    });
       
       $('#container10').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},

        colors: ['#680000'],

        title: {
            text: 'Top Cities In Australia Being Visited. (September 2003 - February 2015)'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		xAxis: {
            title: {
                text: 'City'
            }
        },
        
        yAxis: {
            title: {
                text: 'Number of Flights'
            }
        },

        data: {
            googleSpreadsheetKey: '1Mowpe6EIG78esqQcyyEscuSO5gP6yymjNMR-T9r9P9M', //Julian's Key
            googleSpreadsheetWorksheet: 2
        }

    });
       
       $('#container11').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},

        colors: ['#CCCC52'],

        title: {
            text: 'Top 10 International Cities Visiting Australia. (September 2003 - February 2015)'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		xAxis: {
            title: {
                text: 'City'
            }
        },
        
        yAxis: {
            title: {
                text: 'Number of Flights'
            }
        },

        data: {
            googleSpreadsheetKey: '1Mowpe6EIG78esqQcyyEscuSO5gP6yymjNMR-T9r9P9M', //Julian's Key
            googleSpreadsheetWorksheet: 3
        }

    });
       
       $('#container12').highcharts({
       
       		  
    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},

        colors: ['#0000CC'],

        title: {
            text: 'Top Cities In Australia Departing From. (September 2003 - February 2015)'
        },
		
		subtitle: {
            text: 'Source: bitre.gov.au'
        },
		
		xAxis: {
            title: {
                text: 'City'
            }
        },
        
        yAxis: {
            title: {
                text: 'Number of Flights'
            }
        },

        data: {
            googleSpreadsheetKey: '1Mowpe6EIG78esqQcyyEscuSO5gP6yymjNMR-T9r9P9M', //Julian's Key
            googleSpreadsheetWorksheet: 4
        }

    });
});


