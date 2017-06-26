const fs = require('fs');
const plants = require('../formatted/energy/all-power-plants');
const us = require('../formatted/energy/us');

const mapping = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

let noCounty = 0;
let found1 = 0;
let notFound = 0;

let geos = us.objects.counties.geometries;

for(let i = 0; i< plants.length; i++) {
    if (!plants[i].county) {
        console.log('county ot found', plants[i]);
        noCounty++;
    } else {
        let state = plants[i].state;
        let key = plants[i].county + ' County, ' + mapping[state];

        let found = false;
        geos.forEach( el => {
            let name = el.properties.name;
            if(key === name) {
                found = true;
                // Note this wont work as intended because I havent deduped plants by county
                el.properties["entityName"] = plants[i].entityName;
                el.properties["entityCapactity"] = plants[i].entityCapactity;
                el.properties["states"] = plants[i].states;
                el.properties["numberOfPlants"] = plants[i].numberOfPlants;
                el.properties["hydroelectric"] = plants[i].hydroelectric;
                el.properties["wind"] = plants[i].wind;
                el.properties["coal"] = plants[i].coal;
                el.properties["naturalGas"] = plants[i].naturalGas;
                el.properties["petroleum"] = plants[i].petroleum;
                el.properties["geothermal"] = plants[i].geothermal;
                el.properties["solar"] = plants[i].solar;
                el.properties["nuclear"] = plants[i].nuclear;
                el.properties["sector"] = plants[i].sector;
            } 
        })
        if(found) {
            //console.log('MATCH FOUND!! -- ', key);
            found1++;
        } else {
            console.log('Not found -- ', key);
            notFound++;
        }
    }
}


let entities = 'module.exports =' + JSON.stringify(us, null, 2);
    fs.writeFile(__dirname + "/../formatted/energy/us.js", entities, function(err) {
        if(err) {
            return console.log(err);
        }
        
        console.log("US geo map data written");
    }); 

console.log('count of plants', plants.length);
console.log('noCounty', noCounty);
console.log('not Found', notFound);
console.log('found', found1);


/* it looks like i ahve a 50% match rate for this list.  Might be worth to start with it an god from there.
Otherwise, I can try to resolve the county by lat long.  That's probbly better actually
*/