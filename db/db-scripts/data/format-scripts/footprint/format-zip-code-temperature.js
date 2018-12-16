const ZIP_DATA = require('../../raw/zip-code-temperature');
const fs = require('fs');

const FORMATTED_ZIP_DATA = {};

// Upper case 1st letter of each word
const formatCityName = name => {
    return name.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};

ZIP_DATA.forEach(zip => {
    delete zip.LatLongCombined;
    zip.city = formatCityName(zip.city);
    FORMATTED_ZIP_DATA[zip.zip] = { ...zip};
});

const zipData = JSON.stringify(FORMATTED_ZIP_DATA, null, 2);
fs.writeFile(__dirname + "/../../../../../src/js/data/temperature/temp-by-zip.js", 'module.exports = ' + zipData, function(err) {
    if(err) {
        return console.log(err);
    }
    
    console.log("zip temperature data written to /src/js/data/temperature/temp-by-zip.js");
});