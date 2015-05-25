from csv import reader, DictReader
from collections import defaultdict
import json
from cgi import FieldStorage

def get_airport_dict(csvFile):
    f = open(csvFile)
    rows = reader(f)
    d = {};
    for row in rows:
        d[row[4].strip('"')] = [ float(row[6]), float(row[7]) ]
    return d


def generate_routes(csvFile, locDict, year, month, io = "Both"):
    """
    returns a dictionary
     { (I/O, ((lat lon)...)): number }
    """
    
    f = open(csvFile)
    rows = DictReader(f)
    routeDict = defaultdict(int)
    for row in rows:
        if ("20" + row["Month"].split("-")[-1]) == year and row["Month"].split("-")[0] == month:
            if io == "Both" or row["In/Out"] == io:
                route = []
                airports = row["Route"].split("-")
                for airport in airports:
                    if airport in locDict:
                        route.append( tuple(locDict[airport]) )

                routeDict[( row["In/Out"], tuple(route) )] += int(row["AllFlights"])    
    return routeDict.items()

if __name__ == "__main__":

    form = FieldStorage()

    year = form["year"].value
    month = form["month"].value
    io = form["IO"].value

    d = get_airport_dict("airports.csv")
    r = generate_routes("Data.csv", d, year, month, io)

    print "Content-Type: text/json"
    print  
    print json.dumps(r)