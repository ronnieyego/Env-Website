import { expect } from 'chai';
import calculateFootprint from './calculate-footprint';

const FIXTURE_DATA = {
    "userZip": 95130,
    "calories": 2000,
    "beef": "Once a week",
    "chicken": "Once a week",
    "pork": "Once a week",
    "seafood": "Once a week",
    "dairy": "Once a day",
    "cheese": "Once a day",
    "vegetables": "Once a day",
    "fruit": "Once a day",
    "grain": "Few times per day",
    "junkFood": "Once a day",
    "homeType": "House",
    "homeSqft": 2500,
    "homeMaterial": "Wood",
    "numHousemates": "0",
    "hoursHome": 6,
    "hoursTv": 4,
    "hoursComputer": "0",
    "cookAtHomeFrequency": "2-3 times per week",
    "doesShowerDaily": false,
    "doesMusicAtHome": false,
    "laundryLoads": "0",
    "insulationType": "Reasonably Insulated",
    "summerTemp": "80",
    "coolingType": "Window Mount AC",
    "coolWholeHouse": "Entire home",
    "usesPersonalFan": false,
    "winterTemp": "70",
    "heatType": "Gas Vents",
    "heatWholeHome": "Entire home",
    "usesPersonalHeater": false,
    "houseSqft": 2500,
    "doesDrive": true,
    "carClass": "Midsize car",
    "carBuildType": "Standard",
    "carMpg": 25,
    "carMilesMonth": 1000,
    "carFuelType": "Gasoline",
    "carpoolFrequency": "Never",
    "doesPublicTransit": false,
    "busMiles": 0,
    "trainMiles": 0,
    "flyMiles": 0,
    "pets": ["Cat"],
    "stuffAmount": "Reasonably full",
    "furnitureAmount": "I have all of the essentials",
    "clothingProfile": "A good amount",
    "state": "CA"
};

describe('calculate footprint', () => {
    it('should calculate footprint', done => {
        const result = calculateFootprint(FIXTURE_DATA);
        expect(result.error).to.be.false;
        expect(result.body).to.not.be.null;
        done();
    })
    it('should tell me missing fields', done => {
        const alteredFixture = { ...FIXTURE_DATA };
        delete alteredFixture.flyMiles;
        const result = calculateFootprint(alteredFixture);
        expect(result.error).to.be.true;
        expect(result.message).to.equal('Missing the following fields: [flyMiles]');
        done();
    })
})