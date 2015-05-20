from csv import DictReader
from cgi import FieldStorage
import json

def print_unique_values(csvFile, header):
    """
    csvFile - a csv file returned by the open() function
    header - a string sepecifying the headerRow

    prints a json array with all unique values in the header
    """

    uniques = set()

    reader = DictReader(csvFile)

    for row in reader:
        if header == "Month":
            value = row["Month"].split("-")[0]
        elif header == "Year":
            value = "20" + row["Month"].split("-")[-1]
        else:
            value = row[header]
        uniques.add(value)
        
    print "Content-Type: text/json"
    print  
    print json.dumps(list(uniques))


form = FieldStorage()

header = form["header"].value
f = open("Data.csv")

print_unique_values(f, header)​