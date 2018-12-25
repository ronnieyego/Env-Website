import getHeatingCo2, {
    convertKwhToCo2,
    getTimeOn,
    getHeatLoss,
    getHeatingRequirementBtus,
    getSizeFromHeatWholeHome,
    getRadiatorKwh,
    getRadiantFlooringKwh,
    getPersonalHeaterKwh
} from './heating';
import { expect } from 'chai';
import { createStubInstance, stub } from 'sinon';
import fetchZip from './utils-fetch-user-zip';
import ids from '../../../utils/ids/index';

const seattleZip = {
    zip: '98105',
    "city": 'Seattle',
    "average": 53.5,
    "winter": 46.1,
    "summer": 60.9
}

const FIXTURE_DATA = {
    completePayload: {
        state: 'WA',
        userZipData: seattleZip,
        heatType: ids.gasVents,
        insulationType: ids.reasonableInsulated,
        summerTemp: 77,
        winterTemp: 66,
        houseSqft: 1500,
        hoursHome: 6,
        heatingOnWhileSleeping: false,
        heatWholeHome: ids.entireHome,
        usesPersonalHeater: false
    },
    state: 'WA',
    kwh: 18,
    hoursHome: 5,
    heatingOnWhileSleeping: true,
    houseSqft: 2500,
    insulationType: ids.reasonableInsulated,
    tempDiff: 15,
    hoursOn: 7,
    heatingSize: 600
    
};


 describe('Heating Calculations unit tests', () => {
    it('converts kwh to CO2', done => {
        const totalCo2 = convertKwhToCo2(FIXTURE_DATA.state,FIXTURE_DATA.kwh);
        expect(totalCo2).to.equal(5.2);
        done();
    });
    it('converts kwh to in a different state', done => {
        const totalCo2 = convertKwhToCo2('NE',FIXTURE_DATA.kwh);
        expect(totalCo2).to.equal(30.8);
        done();
    });
    it('should get Time On', done => {
        const timeOn = getTimeOn(FIXTURE_DATA.hoursHome, FIXTURE_DATA.heatingOnWhileSleeping);
        expect(timeOn).to.equal(13);
        done();
    });
    it('should get Time On while heating while seleeping is false', done => {
        const timeOn = getTimeOn(FIXTURE_DATA.hoursHome, false);
        expect(timeOn).to.equal(5);
        done();
    });
    it('should get heat loss', done => {
        const heatLoss = getHeatLoss(FIXTURE_DATA.houseSqft, FIXTURE_DATA.insulationType, FIXTURE_DATA.tempDiff);
        expect(heatLoss).to.equal(320000);
        done();
    });
    it('should get heat loss for a bigger house', done => {
        const heatLoss = getHeatLoss(FIXTURE_DATA.houseSqft + 10000, FIXTURE_DATA.insulationType, FIXTURE_DATA.tempDiff);
        expect(heatLoss).to.equal(1600000);
        done();
    });
    it('should get heat loss for better insulation', done => {
        const heatLoss = getHeatLoss(FIXTURE_DATA.houseSqft, ids.extremelyInsulated, FIXTURE_DATA.tempDiff);
        expect(heatLoss).to.equal(211200);
        done();
    });
    it('should get heat loss for a smaller temp difference', done => {
        const heatLoss = getHeatLoss(FIXTURE_DATA.houseSqft, FIXTURE_DATA.insulationType, 5);
        expect(heatLoss).to.equal(120000);
        done();
    });
    it('should get heat requirement', done => {
        const heatLoss = getHeatingRequirementBtus(FIXTURE_DATA.houseSqft, FIXTURE_DATA.insulationType, FIXTURE_DATA.tempDiff);
        expect(heatLoss).to.equal(342500);
        done();
    });
    it('should get size from the whole home', done => {
        const heatWholeHomeIds = [ids.entireHome, ids.mostRooms, ids.halfOfRooms, ids.someRooms, ids.quarterOfRooms, ids.justCurrentRoom]
        const res = heatWholeHomeIds.map(size => getSizeFromHeatWholeHome(size, FIXTURE_DATA.houseSqft));
        expect(res).to.deep.equal([2500, 1875, 1250, 825, 625, 250]);
        done();
    });
    it('should get getRadiatorKwh', done => {
        const res = getRadiatorKwh(FIXTURE_DATA.hoursOn, FIXTURE_DATA.heatingSize)
        expect(res).to.equal(35.7);
        done();
    });
    it('should get getRadiantFlooringKwh', done => {
        const res = getRadiantFlooringKwh(FIXTURE_DATA.hoursOn, FIXTURE_DATA.heatingSize)
        expect(res).to.equal(50.4);
        done();
    });
    it('should get getPersonalHeaterKwh', done => {
        const res = getPersonalHeaterKwh(FIXTURE_DATA.hoursOn)
        expect(res).to.equal(1.75);
        done();
    });

 });


describe('Heating caluclations integrationy tests', () => {
    it('should calculate Gas Vents', async() => {
        const { totalCo2 } = await getHeatingCo2(FIXTURE_DATA.completePayload);
        expect(totalCo2).to.equal(12);
    });
    it('should calculate Gas Vents in a big house', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, houseSqft: 3000};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(24);
    });
    it('should calculate Gas Vents in a warmer winter state', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, state: 'TX', userZip: '00000'};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(12);
    });
    it('should calculate Gas Vents with a higher winter temp', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, winterTemp: 90, userZip: '00000'};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(13);
    });
    it('should calculate Gas Vents with worse insulation', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, insulationType: 'Poorly Insulated'};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(18);
    });
    it('should calculate Gas Vents with a personal heater', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, usesPersonalHeater: true};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(12);
    });
    it('should calculate Radiator', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'Radiator'};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(11);
    });
    it('should calculate Radiator heating on the room youre in', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'Radiator', heatWholeHome: 'Just my current room'};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(2);
    });
    it('should calculate Radiator when you leave it on at night', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'Radiator', heatingOnWhileSleeping: true};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(26);
    });
    it('should calculate Radiator when your not home very much', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'Radiator', hoursHome: 2};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(4);
    });
    it('should calculate Radiant Flooring ', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'Radiant floors'};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(16);
    });
    it('should calculate Heat Pump', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'Heat pump'};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(27);
    });
    it('should calculate Heat Pump in a big house', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'Heat pump', houseSqft: 3000};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(55);
    });
    it('should calculate None for heating type', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: ids.none};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(0);
    });
    it('should calculate None for heating type with a personal heater', async() => {
        const updatedFixtures = {...FIXTURE_DATA.completePayload, heatType: 'None', usesPersonalHeater: true};
        const { totalCo2 } = await getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(0.4);
    });
    it('should calculate monthly Gas Vents', async() => {
        const { monthlyCo2 } = await getHeatingCo2(FIXTURE_DATA.completePayload);
        expect(monthlyCo2).to.equal(360);
    });
});

    // it.only('should fail if theres no Zip Code', done => {
    //     const noZipData = {...FIXTURE_DATA.completePayload};
    //     delete noZipData.userZipData;
    //     expect(() => getHeatingCo2(noZipData)).to.throw('userZipData required.  Including zip, summer, and winter  -- typeof field is: undefined');
    //     done();
    // });
    // it('should get a difference between state data and zip data', done => {
    //     const zipMonthlyCo2  = getHeatingCo2(FIXTURE_DATA).monthlyCo2;
    //     expect(zipMonthlyCo2).to.equal(360);
    //     const noZipData = {...FIXTURE_DATA};
    //     noZipData.userZipData = '';
    //     const stateMonthlyCo2  = getHeatingCo2(noZipData).monthlyCo2;
    //     expect(stateMonthlyCo2).to.equal(390);
    //     done();
    // });

