import getHeatingCo2 from './heating';
import { expect } from 'chai';

const FIXTURE_DATA = {
    state: 'WA',
    heatType: 'Gas Vents',
    insulationType: 'Reasonably Insulated',
    summerTemp: 77,
    winterTemp: 66,
    houseSqft: 1500,
    hoursHome: 6,
    heatingOnWhileSleeping: false,
    heatWholeHome: 'Entire home',
    usesPersonalHeater: false
}

 describe('Heating Calculations', () => {
    it('should calculate Gas Vents', done => {
        const { totalCo2 } = getHeatingCo2(FIXTURE_DATA);
        expect(totalCo2).to.equal(12);
        done();
    });
    it('should calculate Gas Vents in a big house', done => {
        const updatedFixtures = {...FIXTURE_DATA, houseSqft: 3000};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(24);
        done();
    });
    it('should calculate Gas Vents in a warmer winter state', done => {
        const updatedFixtures = {...FIXTURE_DATA, state: 'TX'};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(1);
        done();
    });
    it('should calculate Gas Vents with a higher winter temp', done => {
        const updatedFixtures = {...FIXTURE_DATA, winterTemp: 90};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(13);
        done();
    });
    it('should calculate Gas Vents with worse insulation', done => {
        const updatedFixtures = {...FIXTURE_DATA, insulationType: 'Poorly Insulated'};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(16);
        done();
    });
    it('should calculate Gas Vents with a personal heater', done => {
        const updatedFixtures = {...FIXTURE_DATA, usesPersonalHeater: true};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(12);
        done();
    });
    it('should calculate Radiator', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator'};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(11);
        done();
    });
    it('should calculate Radiator heating on the room youre in', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator', heatWholeHome: 'Just my current room'};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(2);
        done();
    });
    it('should calculate Radiator when you leave it on at night', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator', heatingOnWhileSleeping: true};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(26);
        done();
    });
    it('should calculate Radiator when your not home very much', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator', hoursHome: 2};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(4);
        done();
    });
    it('should calculate Radiant Flooring ', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiant Flooring'};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(16);
        done();
    });
    it('should calculate Heat Pump', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Heat Pump'};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(27);
        done();
    });
    it('should calculate Heat Pump in a big house', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Heat Pump', houseSqft: 3000};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(54);
        done();
    });
    it('should calculate None for heating type', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'None'};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(0);
        done();
    });
    it('should calculate None for heating type with a personal heater', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'None', usesPersonalHeater: true};
        const { totalCo2 } = getHeatingCo2(updatedFixtures);
        expect(totalCo2).to.equal(0.4);
        done();
    });
    it('should calculate monthly Gas Vents', done => {
        const { monthlyCo2 } = getHeatingCo2(FIXTURE_DATA);
        expect(monthlyCo2).to.equal(360);
        done();
    });
});
