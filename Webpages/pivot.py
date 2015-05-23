from csv import DictReader
from collections import defaultdict
from lxml import etree
from cgi import FieldStorage
from math import log, log10
import json


def value_of(csvDictIterator, header, bin_size = 0):
    if header == "Month":
        value = csvDictIterator["Month"].split("-")[0]
    elif header == "Year":
        value = "20" + csvDictIterator["Month"].split("-")[-1]
    elif header in ["MaxSeats", "AllFlights"]:
        num = int( csvDictIterator[header].replace(" ", "") ) #remove whitespaces
        if bin_size == 0:
            value = num
        else:
            i = int(num / bin_size)
            value = str(bin_size*i) + "-" + str(bin_size*(i+1))
    else:
        value = csvDictIterator[header]
    return value


def boundary_values(csvFile, header):
    """return [min value, max value] in the csv file given the header"""
    reader = DictReader(csvFile)
    
    firstLine = reader.next()
    minValue = maxValue = value_of(firstLine, header)

    for row in reader:
        value = value_of(row, header) 
        if value < minValue:
            minValue = value
        elif value > maxValue:
            maxValue = value

    return [minValue, maxValue]

def bin_size(minimum, maximum):
    """
    given the minimum and maximum numbers
    return an appropriate size for each bin
    """
    size = maximum - minimum
    mag = int(log10(size))
    binsize = int(round(size/10, -(mag-1)))
    return binsize
    
def unique_values(csvFile, header):
    """return a set for unique values in the csv file given the header"""
    uniques = set()

    reader = DictReader(csvFile)

    for row in reader:
        value = value_of(row, header)
        uniques.add(value)

    return uniques



def parse_data(csvFile, rowType, colType, valueType, filterType = "", filterOptions = []):
    """
    csvFile - a csv file returned by the open() function
    rowType - a string specifying the rows
    colType - a string specifying the columns
    filterType - a string sepecifying the type to filter
    filterOptions - contains either [min, max] or [values]

    headers must be the exact string in the headers of the csv file, except "month" and "year"

    returns (sorted row headers, sorted column headers, 2d dictionary data)
    each cell in the 2d-dictionary is a list of values ( [] for no values )
    """

    monthDict = {
                "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4,
                "May": 5, "Jun": 6, "Jul": 7, "Aug": 8,
                "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
                }
    
    if row in ["MaxSeats", "AllFlights"]:
        (row_minvalue, row_maxvalue) = boundary_values(csvFile, rowType)
        row_binsize = bin_size(row_minvalue, row_maxvalue)
    else:
        row_binsize = 1

    if col in ["MaxSeats", "AllFlights"]:
        (col_minvalue, col_maxvalue) = boundary_values(csvFile, colType)
        col_binsize = bin_size(col_minvalue, col_maxvalue)
    else:
        col_binsize = 1
        
    csvFile.seek(0)
    reader = DictReader(csvFile)
    keys = reader.fieldnames

    # use a 2-dimensional dictionary as a buffer
    data = defaultdict(lambda: defaultdict(list))
    # used to store all unique column headers
    colKeySet = set()

    # check if the input is valid
    if (rowType not in keys + ["Month", "Year"]) or (rowType not in keys + ["Month", "Year"]):
        return ""

    
    
    for line in reader:
        # determine key used for rows and columns
        rowKey = value_of(line, rowType, row_binsize)
        colKey = value_of(line, colType, col_binsize)
        value = value_of(line, valueType)
        

        if filterType in ["MaxSeats", "AllFlights", "Year"]:
            # number range as filter
            toFilter = value_of(line, filterType)
            if (toFilter > int(filterOptions[0])) and (toFilter < int(filterOptions[1])):
                data[rowKey][colKey].append(value)
                colKeySet.add(colKey)
        elif filterType:
            # selections as filter
            toFilter = value_of(line, filterType)
            if toFilter in filterOptions:
                data[rowKey][colKey].append(value)
                colKeySet.add(colKey)
        else:
            # no filter
            data[rowKey][colKey].append( value )
            colKeySet.add(colKey)


    # get the header
    if rowType == "Month":
        rows = ["Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"]
    elif rowType in ["MaxSeats", "AllFlights"]:
        # get the bins
        rows = []
        i = 0
        while i + row_binsize < row_maxvalue:
            rows.append( str(i) + "-" + str(i + row_binsize) )
            i += row_binsize
        rows.append( str(i) + "-" + str(min(row_maxvalue, i + row_binsize)) )
    else:
        rows = sorted(data.keys())

    if colType == "Month":
        cols = ["Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"]
    elif colType in ["MaxSeats", "AllFlights"]:
        # get the bins
        cols = []
        i = 0
        while i + col_binsize < col_maxvalue:
            cols.append( str(i) + "-" + str(i + col_binsize) )
            i += col_binsize
        cols.append( str(i) + "-" + str(min(col_maxvalue, i + col_binsize)) )
    else: 
        cols = sorted(list(colKeySet))

    return (rows, cols, data)


def generate_series(rows, cols, data, aggOption):
    """
    rows - the sorted row headers
    cols - the sorted column headers
    data - a 2d dictionary containing all the data to be displayed
    aggOption - be one of "count", "sum", "average", "min", "max"

    returns the data array for Highcharts
    """
    
    
    series = []

    for i in range(len(rows)):
        for j in range(len(cols)):
            l = data[rows[i]][cols[j]]
            # treat 0 as empty
            if len(l) != 0:
                if aggOption == "count":
                    series.append([ i, j, len(l) ])
                elif aggOption == "sum":
                    series.append([ i, j, sum(l) ])
                elif aggOption == "avg":
                    avg = sum(l) / float(len(l))
                    series.append([ i, j, round(avg, 2) ])
                elif aggOption == "min":
                    series.append([ i, j, min(l) ])
                elif aggOption == "max":
                    series.append([ i, j, max(l) ])

    return series



if __name__ == "__main__":

    form = FieldStorage()

    row = form["row"].value
    col = form["col"].value
    val = form["val"].value
    agg = form["agg"].value
    
    f = open("Data.csv")
    
    if "fil" in form:
        fil = form["fil"].value
        if "min" in form:
            filOptions = [form["min"].value, form["max"].value]
        elif "opt" in form:
            filOptions = form.getlist("opt")
        else:
            filOptions = []
        rows, cols, data = parse_data(f, row, col, val, fil, filOptions)
    else:
        rows, cols, data = parse_data(f, row, col, val)
    
    
       

    options = { "chart": {"type": "heatmap",
                      "height": 150*log(len(rows))}, #dynamic height respect to number of rows
            "title": {"text": row + " vs. " + col},
            "xAxis": {"categories": rows},
            "yAxis": {"categories": cols}
            }


    s = {}
    s["name"] = "Number of Flights"
    s["borderWidth"] = 1
    s["data"] = generate_series(rows, cols, data, agg)

    options["series"] = [s]

    print "Content-Type: text/json"
    print  
    print json.dumps(options)