from csv import reader, DictReader
from collections import defaultdict
import json

def get_airport_dict(csvFile):
    f = open(csvFile)
    rows = reader(f)
    d = {};
    for row in rows:
        d[row[4].strip('"')] = [ float(row[6]), float(row[7]) ]
    return d


def generate_routes(csvFile, locDict, year, month, io = "both"):
    """
    returns a dictionary
     { (I/O, ((lat lon)...)): number }
    """

    f = open(csvFile)
    rows = DictReader(f)
    routeDict = defaultdict(int)
    for row in rows:
        #print row["Month"].split("-")[0], row["Month"].split("-")[-1]
        if ("20" + row["Month"].split("-")[-1]) == year and row["Month"].split("-")[0] == month:
            #print "Hello"
            route = []
            airports = row["Route"].split("-")
            for airport in airports:
                if airport in locDict:
                    route.append( tuple(locDict[airport]) )

            routeDict[( row["In/Out"], tuple(route) )] += int(row["AllFlights"])
            
    return routeDict.items()


d = get_airport_dict("airports.csv")
r = generate_routes("Data.csv", d, "2009", "Mar")
        
print "Content-Type: text/json"
print  
print json.dumps(r)