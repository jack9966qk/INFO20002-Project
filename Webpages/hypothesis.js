$(function () {
    // Create the chart
    $('#container1').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},

        title: {
            text: 'Cities with the most flight traffic'
        },

        data: {
            googleSpreadsheetKey: '1VcjbxN02sGPudOuGCi_cdef6htU6P44HhDefdewK6t8'//Rahul's key
        }

    });

    $('#container2').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "pie"
    	},

        title: {
            text: 'Airline Market Share - September 2003'
        },
		
		plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
				dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				}
			}
		},
		
        data: {
            googleSpreadsheetKey: '1tqsRCX55dmxXTiNdtMJ95vplWac7AZ-on2bO70RDLVE', //Rahul's Key
			googleSpreadsheetWorksheet: 1
        }

    });
	
	$('#container3').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "pie"
    	},

        title: {
            text: 'Airline Market Share - September 2014'
        },
		
		plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
				dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				}
			}
		},

        data: {
            googleSpreadsheetKey: '1tqsRCX55dmxXTiNdtMJ95vplWac7AZ-on2bO70RDLVE', //Rahul's Key
			googleSpreadsheetWorksheet: 2
        }

    });
	
    $('#container4').highcharts({

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

        data: {
            googleSpreadsheetKey: '1y3qV0N6B9MMTdxf11rCuUu5sYBCsz90AXjc7-nnT_pg' //Rahul's Key
        }

    });

    $('#container5').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)"
    	},

        title: {
            text: 'Highcharts data from Google Spreadsheets'
        },

        data: {
            googleSpreadsheetKey: '1CTpdP735Zmb7YTKa7HNb-8aWE_UDcwmGSRxXGSzGosU'
        }

    });
	    $('#container6').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)"
    	},

        title: {
            text: 'Arrivals and Departures'
        },

        data: {
            googleSpreadsheetKey: '1n6GT4EgfTNE1PTMnEDt6jDNz9V2AXK_4n-mI-juw6kE', //Rahul's Key
			googleSpreadsheetWorksheet: 1
        }

    })
	    $('#container7').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)"
    	},
		colors: ['#70ff2d'],
        title: {
            text: 'Value of the Australian Dollar'
        },

        data: {
            googleSpreadsheetKey: '1n6GT4EgfTNE1PTMnEDt6jDNz9V2AXK_4n-mI-juw6kE', //Rahul's Key
			googleSpreadsheetWorksheet: 2
        }

    })
	   $('#container8').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "column"
    	},
        title: {
            text: 'Most popular routes taken to and from Australia'
        },

        data: {
            googleSpreadsheetKey: '1DkgzFtue_gOly52Qxr9J3OVsjTJLy_Bsh5R8lRL1Uv8', //Rahul's Key
        }

    })
});


