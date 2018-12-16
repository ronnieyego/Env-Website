const ZIP_DATA = require('../../raw/all-zip-codes-lat-long');
const fs = require('fs');

const missingZips = {
  '15231': {lat: 40.4847, long: -80.2144, zip: 15231 },
  '24739': { lat: 37.4225, long: -81.0256, zip: 24739 },
  '32815': { lat: 28.6158, long: -80.6928, zip: 32815 },
  '33574': { lat: 28.3378, long: -82.26, zip: 33574 },
  '33630': { lat: 27.9619, long: -82.5403, zip: 33630 },
  '60666': { lat: 41.995, long: -87.9336, zip: 60666 },
  '63145': { lat: 38.7525, long: -90.3736, zip: 63145 },
  '65409': { lat: 37.9572, long: -91.7758, zip: 65409 },
  '68702': { lat: 41.9856, long: -97.4353, zip: 68702 },
  '71324': { lat: 32.0994, long: -91.7019, zip: 71324 },
  '78347': { lat: 27.5892, long: -97.4547, zip: 78347 },
  '80430': { lat: 40.4725, long: -106.4475, zip: 80430 },
  '82310': { lat: 42.4942, long: -107.8292, zip: 82310 },
  '84122': { lat: 40.7781, long: -111.9694, zip: 84122 },
  '84150': { lat: 40.7708, long: -111.8964, zip: 84150 },
  '86005': { lat: 35.1442, long: -111.6664, zip: 86005 },
  '88213': { lat: 33.3433, long: -103.6783, zip: 88213 },
  '89023': { lat: 36.6206, long: -116.0278, zip: 89023 },
  '89496': { lat: 39.4167, long: -118.7167, zip: 89496 },
  '97917': { lat: 43.4508, long: -118.2244, zip: 97917 }
};

const FORMATTED_ZIP_DATA = { ...missingZips };
ZIP_DATA.forEach(zip => {
    FORMATTED_ZIP_DATA[zip.zip] = zip;
});

const zipData = JSON.stringify(FORMATTED_ZIP_DATA, null, 2);
fs.writeFile(__dirname + "/../../../../../src/js/data/zip-codes/all-zips-and-lat-long.json", zipData, function(err) {
    if(err) {
        return console.log(err);
    }
    
    console.log("zip temperature data written to /src/js/data/zip-codes/all-zips-and-lat-long.json");
});