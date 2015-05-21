from csv import DictReader
from cgi import FieldStorage
import json

from pivot.py import value_of

def boundary_values(csvFile, header):
    """return [min value, max value] in the csv file given the header"""
    reader = DictReader(csvFile)
    
    firstLine = reader.next()
    minValue = maxValue = firstLine
    value = value_of(firstLine, header)

    for row in reader:
        value = value_of(row, header)
        if value < minValue:
            minValue = value
        elif value > maxValue:
            maxValue = value

    return [minValue, maxValue]


def unique_values(csvFile, header):
    """return a set for unique values in the csv file given the header"""
    uniques = set()

    reader = DictReader(csvFile)

    for row in reader:
        value = value_of(row, header)
        uniques.add(value)

    return uniques



def print_filter_options(csvFile, header):
    """
    csvFile - a csv file returned by the open() function
    header - a string sepecifying the headerRow

    prints a json array with all filter options for the given type
        [min, max] for numerical values
        [A, B, C...] for string values
    """

    print "Content-Type: text/json"
    print  
    if header in ["AllFlights", "MaxSeats"]:
        print json.dumps(boundary_values(csvFile, header))
    else:
        print json.dumps(list(unique_values(csvFile, header)))


form = FieldStorage()

header = form["header"].value
f = open("Data.csv")

print_unique_values(f, header)​