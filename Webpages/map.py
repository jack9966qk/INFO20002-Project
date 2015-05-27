from csv import reader, DictReader
from collections import defaultdict
import json
from cgi import FieldStorage

def get_airport_dict(csvFile):
    """
    csvFile - directory of the OpenFlight csvFile

    returns a directory with keys as airport abbreviations, values as
            a tuple of (latitude, longtitude)
    """

    f = open(csvFile)
    rows = reader(f)
    d = {};
    # iterate through the file and build the dictionary
    for row in rows:
        d[row[4].strip('"')] = [ float(row[6]), float(row[7]) ]
    return d


def generate_routes(csvFile, locDict, year, month, io = "Both"):
    """
    csvFile - directory of the Australian Flights data
    locDict - directory consists airport abbreviations and their locations
              generated from get_airport_dict()
    year, month - strings specifying the certain time period
    io - specifying whether to read inbound flights and outbound flights
         options are "I", "O", "Both"

    returns a dictionary
     {    ( "I" or "O", ((lat, lon)...) ) : total number of flights    }
    """
    
    f = open(csvFile)
    rows = DictReader(f)
    routeDict = defaultdict(int)

    for row in rows:
        if ("20" + row["Month"].split("-")[-1]) == year and row["Month"].split("-")[0] == month:
            # in the required time range
            if io == "Both" or row["In/Out"] == io:
                # IO type matches requirement
                route = []
                airports = row["Route"].split("-") # get all the airports in the route
                for airport in airports:
                    if airport in locDict:
                        # get coordinates for each of the airports
                        route.append( tuple(locDict[airport]) )
                # add to the dictionary
                routeDict[( row["In/Out"], tuple(route) )] += int(row["AllFlights"])    
    return routeDict.items()


if __name__ == "__main__":

    form = FieldStorage()

    # read all the parameters form query string
    year = form["year"].value
    month = form["month"].value
    io = form["IO"].value

    d = get_airport_dict("airports.csv")
    r = generate_routes("Data.csv", d, year, month, io)

    print "Content-Type: text/json"
    print  
    print json.dumps(r)