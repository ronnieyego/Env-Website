const ZIP_DATA = require('../../raw/all-zip-codes-lat-long');
const fs = require('fs');


const FORMATTED_ZIP_DATA = {};
ZIP_DATA.forEach(zip => {
    FORMATTED_ZIP_DATA[zip.zip] = zip;
})

const zipData = JSON.stringify(FORMATTED_ZIP_DATA, null, 2);
fs.writeFile(__dirname + "/../../../../../src/js/data/zip-codes/all-zips-and-lat-long.json", zipData, function(err) {
    if(err) {
        return console.log(err);
    }
    
    console.log("zip temperature data written to /src/js/data/zip-codes/all-zips-and-lat-long.json");
});