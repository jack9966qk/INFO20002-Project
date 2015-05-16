from csv import DictReader
from collections import defaultdict
from lxml import etree
from cgi import FieldStorage


def generate_table(csvFile, rowHeader, colHeader):
    """
    csvFile - a csv file returned by the open() function
    rowHeader - a string specifying the rows
    colHeader - a string specifying the columns

    headers must be the exact string in the headers of the csv file, except "month" and "year"

    returns a HTML string representing the whole pivot table
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
    if (rowHeader not in keys + ["Month", "Year"]) or (rowHeader not in keys + ["Month", "Year"]):
        return ""



    # get the number of flights
    for line in reader:
        # determine key used for rows and columns
        if rowHeader == "Month":
            rowKey = line["Month"][:3]
        elif rowHeader == "Year":
            rowKey = "20" + line["Month"][4:]
        else:
            rowKey = line[rowHeader]

        if colHeader == "Month":
            colKey = line["Month"][:3]
        elif colHeader == "Year":
            colKey = "20" + line["Month"][4:]
        else:
            colKey = line[colHeader]

        # record the colKey if it's new
        colKeySet.add(colKey)

        # count 1 for the coresponding "cell"
        data[rowKey][colKey] += 1

    # create the HTML
    table = etree.Element("table")

    # sort the headers
    if rowHeader == "Month":
        rows = sorted(data.keys(), key = lambda x: monthDict[x])
    else:
        rows = sorted(data.keys())

    if colHeader == "Month":
        cols = sorted(list(colKeySet), key = lambda x: monthDict[x])
    else: 
        cols = sorted(list(colKeySet))

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
            td = etree.Element("td")
            td.text = str(data[row][col])
            tr.append(td)
        table.append(tr)

    return etree.tostring(table)​



form = FieldStorage()

row = form["row"].value
col = form["col"].value
f = open("../RawData/Data.csv")

print "Content-Type: text/html"
print          

print(generate_table(f, row, col))