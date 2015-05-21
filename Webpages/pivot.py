from csv import DictReader
from collections import defaultdict
from lxml import etree
from cgi import FieldStorage
from math import log
import json

def value_of(csvDictIterator, header):
    if header == "Month":
        value = csvDictIterator["Month"].split("-")[0]
    elif header == "Year":
        value = "20" + csvDictIterator["Month"].split("-")[-1]
    else:
        value = csvDictIterator[header]
    return value


def parse_data(csvFile, rowType, colType, valueType, filterType):
    """
    csvFile - a csv file returned by the open() function
    rowType - a string specifying the rows
    colType - a string specifying the columns
    filterType - a string sepecifying the type to filter

    headers must be the exact string in the headers of the csv file, except "month" and "year"

    returns (sorted row headers, sorted column headers, 2d dictionary data)
    """

    monthDict = {
                "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4,
                "May": 5, "Jun": 6, "Jul": 7, "Aug": 8,
                "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
                }

    reader = DictReader(csvFile)
    keys = reader.fieldnames

    # use a 2-dimensional dictionary as a buffer
    data = defaultdict(lambda: defaultdict(int))
    # used to store all unique column headers
    colKeySet = set()    

    # check if the input is valid
    if (rowType not in keys + ["Month", "Year"]) or (rowType not in keys + ["Month", "Year"]):
        return ""

    # get the number of flights
    for line in reader:
        # determine key used for rows and columns
        rowKey = value_of(line, rowType)
        colKey = value_of(line, colType)
        value = value_of(line, valueType)
        toFilter = value_of(line, filterType)

        ###############
        # Filter TODO #
        ###############

        colKeySet.add(colKey)
        data[rowKey][colKey] += value

    # sort the headers
    if rowType == "Month":
        rows = sorted(data.keys(), key = lambda x: monthDict[x])
    else:
        rows = sorted(data.keys())

    if colType == "Month":
        cols = sorted(list(colKeySet), key = lambda x: monthDict[x])
    else: 
        cols = sorted(list(colKeySet))

    return (rows, cols, data)



def generate_table(rows, cols, data):
    """
    rows - the sorted row headers
    cols - the sorted column headers
    data - a 2d dictionary containing all the data to be displayed
    
    returns a HTML string representing the whole pivot table
    """

    # create the HTML
    table = etree.Element("table")
    table.set("id", "pivotTable")


    # for the first row containing headers:
    headerRow = etree.Element("tr")
    headerRow.append(etree.Element("td")) # empty cell in the topleft
    for col in cols:
        th = etree.Element("th")
        th.text = col
        headerRow.append(th)
    table.append(headerRow)

    for row in rows:
        tr = etree.Element("tr")
        th = etree.Element("th")
        th.text = row
        tr.append(th)
        for col in cols:
            # treat 0 as empty
            if data[row][col] != 0:
                td = etree.Element("td")
                td.text = str(data[row][col])
                tr.append(td)
        table.append(tr)

    return etree.tostring(table)

def generate_series(rows, cols, data):
    """
    rows - the sorted row headers
    cols - the sorted column headers
    data - a 2d dictionary containing all the data to be displayed

    returns the data array for Highcharts
    """
    series = []

    for i in range(len(rows)):
        for j in range(len(cols)):
            # treat 0 as empty
            if data[rows[i]][cols[j]] != 0:
                series.append([ i, j, data[rows[i]][cols[j]] ])

    return series

form = FieldStorage()

row = form["row"].value
col = form["col"].value
f = open("Data.csv")

rows, cols, data = parse_data(f, row, col)


#print "Content-Type: text/html"
#print          

#print generate_table(rows, cols, data)

options = { "chart": {"type": "heatmap",
                      "height": 150*log(len(rows))}, #dynamic height respect to number of rows
            "title": {"text": row + " vs. " + col},
            "xAxis": {"categories": rows},
            "yAxis": {"categories": cols}
        }


s = {}
s["name"] = "Number of Flights"
s["borderWidth"] = 1
s["data"] = generate_series(rows, cols, data)

options["series"] = [s]

print "Content-Type: text/json"
print  
print json.dumps(options)​​