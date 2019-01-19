import { expect } from 'chai';
import getNearestZipData from './get-nearest-zip-temperature-data';
import BASIC_ZIP_DATA  from '../../../../db/db-scripts/data/formatted/basic-zip-data.json';
import ZIP_TEMP_DATA from '../../data/zip-codes/temp-by-zip.json';

const ALL_ZIPS = Object.keys(BASIC_ZIP_DATA);
const length = ALL_ZIPS.length;

const FIXTURES = {
    'Los Gatos': { 
        state: 'CA',
        city: 'Los Gatos',
        zip: 95032,
        lat: 37.2319,
        long: -121.9592,
        jan: 48.3,
        feb: 51.3,
        mar: 54.2,
        apr: 57.3,
        may: 62.1,
        jun: 66.8,
        jul: 70.1,
        aug: 69.6,
        sept: 67.6,
        oct: 61.7,
        nov: 53.3,
        dec: 48.1,
        average: 59.2,
        winter: 52.8,
        summer: 65.6,
        "distanceFromUser": 5
    },
    'Waverly': {
        "state": "OH",
        "city": "Waverly",
        "zip": 45690,
        "lat": 39.1114,
        "long": -82.9797,
        "jan": 29.9,
        "feb": 33.2,
        "mar": 42.1,
        "apr": 52.7,
        "may": 62.3,
        "jun": 71.5,
        "jul": 75,
        "aug": 73.4,
        "sept": 66.1,
        "oct": 54.3,
        "nov": 43.9,
        "dec": 33.6,
        "average": 53.3,
        "winter": 39.5,
        "summer": 66.8,
        "distanceFromUser": 11
      }       
};

const getRandomZipWithLatLong = () => {
    let goodZip = false;
    let zip;
    while(!goodZip) {
        const randIndex = Math.floor(Math.random() * length);
        const randomZip = ALL_ZIPS[randIndex];
        if(BASIC_ZIP_DATA[randomZip].lat && BASIC_ZIP_DATA[randomZip].long) {
            zip = randomZip;
            goodZip = true;
        }
    }
    return zip;
}

const getRandomZips = numOfZips => {
    const zips =[];
    for(let i =0; i < numOfZips; i++) {
        const rand = getRandomZipWithLatLong();
        zips.push(rand);
    }
    return zips;
}

describe('Get nearest zip data', () => {
    it('should get the nearest zip for Campbell', done => {
        const zip = 95130;
        const res = getNearestZipData(zip);
        expect(res).to.deep.equal(FIXTURES['Los Gatos']);
        done();
    })
    it('should get the nearest zip for Waverly, OH', done => {
        const zip = 45673;
        const res = getNearestZipData(zip);
        expect(res).to.deep.equal(FIXTURES['Waverly']);
        done();
    })
    it('should get an existing zip for Los Gatos', done => {
        const zip = 95032;
        const res = getNearestZipData(zip);
        expect(res).to.deep.equal(FIXTURES['Los Gatos']);
        done();
    })
    it('returns -1 if invalid zip -- not found', done => {
        const zip = '00001';
        const res = getNearestZipData(zip);
        expect(res).to.deep.equal(-1);
        done();
    })
    it('returns -1 if invalid zip -- bad zip', done => {
        const zip = 'hello world';
        const res = getNearestZipData(zip);
        expect(res).to.deep.equal(-1);
        done();
    })
    it('returns -1 if invalid zip -- null zip', done => {
        const zip = null;
        const res = getNearestZipData(zip);
        expect(res).to.deep.equal(-1);
        done();
    })
    it('returns -1 if theres not lat long data for zip code', done => {
        const zip = '06094';
        const res = getNearestZipData(zip);
        expect(res).to.deep.equal(-1);
        done();
    })
    it('succeeds with 50 random zips', done => {
        const zips = getRandomZips(50);
        const res = zips
            .map(zip => getNearestZipData(zip))
            .filter(zip => zip !== -1)
        res.forEach(zip => {
            if(zip.distanceFromUser > 100) {
                console.log(zip)
            }
        });
        expect(res.length).to.equal(50);
        done();
    })
    it('all zips should not be missing any termperature zips', done => {
        const temperatureZips = Object.keys(ZIP_TEMP_DATA);
        const allZips = Object.keys(BASIC_ZIP_DATA);
        const missing = temperatureZips.map(zip => {
            if(allZips.indexOf(zip) === -1) {
                return zip;
            }
            return null;
        })
        .filter(zip => zip != null)
        .map(badZip => console.log('missing temp: ', badZip));
        expect(missing.length).to.equal(0);
        done();
    });
    
});