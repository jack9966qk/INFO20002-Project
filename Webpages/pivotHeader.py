from csv import DictReader
from cgi import FieldStorage
import json

from pivot import boundary_values, unique_values

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
    if header in ["AllFlights", "MaxSeats", "Stops"]:
        print json.dumps(boundary_values(csvFile, header))
    else:
        print json.dumps(sorted(list(unique_values(csvFile, header))))


form = FieldStorage()

header = form["header"].value
f = open("Data.csv")

print_filter_options(f, header)
