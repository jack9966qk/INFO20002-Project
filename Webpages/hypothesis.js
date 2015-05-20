$(function () {
    // Create the chart
    $('#container1').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "bar"
    	},

        title: {
            text: '10 Cities with most flight traffic'
        },

        data: {
            googleSpreadsheetKey: '1IclkUH5X83mTJqqhG8PXAono4DZItgKZTpSYhsUTgtM' //Rahul's key
        }

    });

    $('#container2').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "bar"
    	},

        title: {
            text: 'Top 10 Airlines'
        },

        data: {
            googleSpreadsheetKey: '1roA19wO-WiIXiahuphq8Dnov5VB76PY52goUpQQfv8o',
			googleSpreadsheetWorksheet: 1
        }

    });

    $('#container3').highcharts({

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

    $('#container4').highcharts({

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
            googleSpreadsheetKey: '1jdCFKQ3qjZbWkuQgUeBekJpVkvbVMezhohbNgkxp_UA', //Rahul's Key
        }

    })
});


