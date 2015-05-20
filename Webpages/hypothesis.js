$(function () {
    // Create the chart
    $('#container1').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)",
			type: "bar"
    	},

        title: {
            text: '10 Cities with most traffic'
        },

        data: {
            googleSpreadsheetKey: '1IclkUH5X83mTJqqhG8PXAono4DZItgKZTpSYhsUTgtM'
        }

    });

    $('#container2').highcharts({

    	chart: {
    		backgroundColor: "rgba(255, 255, 255, 0.3)"
    	},

        title: {
            text: 'Top 10 Airlines'
        },

        data: {
            googleSpreadsheetKey: '1CTpdP735Zmb7YTKa7HNb-8aWE_UDcwmGSRxXGSzGosU'
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
});


