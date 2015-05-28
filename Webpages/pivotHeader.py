from csv import DictReader
from cgi import FieldStorage
import json

from pivot import boundary_values, unique_values

def print_filter_options(csvFile, header):
    """
    header - a string sepecifying the headerRow

    prints a json array with all filter options for the given type
        [min, max] for numerical values
        ["A", "B", "C"...] for string values
    """

    print "Content-Type: text/json"
    print  
    if header in ["AllFlights", "MaxSeats"]:
        # numerical values
        print json.dumps(boundary_values(csvFile, header))
    else:
        # strings
        print json.dumps(unique_values(csvFile, header))


if __name__ == "__main__":

    form = FieldStorage()
    header = form["header"].value
    print_filter_options("../RawData/Data.csv", header)