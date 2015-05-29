# Flights and Australia

This is the group project for INFO20002 (Foundations of Informatics) subject.

Group Members: Rahul Singh, Jack Qian and Julian Chua

GitHub Page: [Here](https://github.com/jack9966qk/Informatics)


## Sources and Dataset

The main dataset we used for this project is about International airline flights that enter or exit Australia during the period of September 2003 and February 2015.

We also used some smaller datasets such as the changes of airfares and the number of departures and arrivals in Australia to assist us in creating better insights for our main dataset and hypothesis in general. 

All the datasets above have been collected from BITRE (Bureau of Infrastructure, Transport and Regional Economics). It initially was an .xls file which we converted to a csv format.

Additionally, for locating airports by their abbreviations, a csv file from OpenFlights has been used.


## Data Preprocessing

As most data is originally is .xls format, the files are converted to csv format with the export option in Mircosoft Excel. Exported csv files are imported to Google Spreadsheets and read by Python scripts.


## Main Components

### Pivot Table

User customisable pivot table generator. Types of data as row headers, column headers, value, and filter can be easily selected by a drag&drop interface. The webpage will also provide appropriate filter options depdending on the input.

- Python used as CGI (pivot.py, pivotHeader.py), produce JSON.
- HighCharts is used for pivot table presentation and interaction.
- jQuery UI used to implement the drag&drop interface, and to implement AJAX technique.
- An additional Javascript framework is used to support touch screen devices. [GitHub Page](https://github.com/furf/jquery-ui-touch-punch)

### Flight Map

Interactive map generating visualisation of routes of flights in a certain month. The user can choose the month to display, as well as whether to display inbound/outbound flights.

- Python used as CGI (map.py), produces JSON.
- jQuery used for interactivity and AJAX technique.
- Google Maps API v3 is used for map presentation and route visualisation.

### Hypothesis and Analysis

We set several questions...

Details: [Hypothesis](Hypothesis.md)

- Google Spreadsheet is used for data analysing.
- HighCharts is used for visualisation, linked directly to Google Spreadsheet worksheets.

## Credits

### All

- Discussed topic and dataset to choose, hypothesis questions, and overall plan.

### Jack

- HTML: index.html, pivot.html, map.html, skeleton for hypothesis.html
- CSS: Style and layout for all webpages
- Javascipt: pivot.js, pivotHeader.js, map.js, skeleton for hypothesis.js
- User Interacton
- Integration of technologies (jQuery UI, Google Maps API, Highcharts)
- Debugging, debugging and debugging

### Rahul

- Processed data for analysis
- Created hypothesis questions and sub questions
- Data Analysis with Google Spreadsheet
- Highcharts creation for questions
- HTML: hypothesis.html
- Javascript: hypothesis.js

### Julian 

- Aquired dataset
- Data Analysis with Google Spreadsheet
- Highcharts creation for questions
- Slideshow design
- HTML: hypothesis.html
- Javascript: hypothesis.js
