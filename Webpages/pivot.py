from csv import DictReader
from collections import defaultdict
from lxml import etree


def generate_table(csvFile, rowHeader, colHeader):
    """
    csvFile - a csv file returned by the open() function
    rowHeader - a string specifying the rows
    colHeader - a string specifying the columns

    headers must be the exact string in the headers of the csv file, except "month" and "year"

    returns a HTML string representing the whole pivot table
    """

    reader = DictReader(csvFile)
    keys = reader.fieldnames

    # use a 2-dimensional dictionary as a buffer
    data = defaultdict(lambda: defaultdict(int))
    # used to store all unique column headers
    colKeySet = set()    

    # check if the input is valid
    if (rowHeader not in keys + ["month", "year"]) or (rowHeader not in keys + ["month", "year"]):
        return ""



    # get the number of flights
    for line in reader:
        # determine key used for rows and columns
        if rowHeader == "month":
            rowKey = line["Month"][:3]
        elif rowHeader == "year":
            rowKey = "20" + line["Month"][4:]
        else:
            rowKey = line[rowHeader]

        if colHeader == "month":
            colKey = line["Month"][:3]
        elif colHeader == "year":
            colKey = "20" + line["Month"][4:]
        else:
            colKey = line[colHeader]

        # record the colKey if it's new
        colKeySet.add(colKey)

        # count 1 for the coresponding "cell"
        data[rowKey][colKey] += 1

    # create the HTML
    table = etree.Element("table")
    rows = sorted(data.keys())
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