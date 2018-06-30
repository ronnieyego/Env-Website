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
        const res = getHeatingCo2(FIXTURE_DATA);
        expect(res).to.equal(24);
        done();
    });
    it('should calculate Gas Vents in a big house', done => {
        const updatedFixtures = {...FIXTURE_DATA, houseSqft: 3000};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(47);
        done();
    });
    it('should calculate Gas Vents in a warmer winter state', done => {
        const updatedFixtures = {...FIXTURE_DATA, state: 'TX'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(2);
        done();
    });
    it('should calculate Gas Vents with a higher winter temp', done => {
        const updatedFixtures = {...FIXTURE_DATA, winterTemp: 90};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(26);
        done();
    });
    it('should calculate Gas Vents with worse insulation', done => {
        const updatedFixtures = {...FIXTURE_DATA, insulationType: 'Poorly Insulated'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(31);
        done();
    });
    it('should calculate Gas Vents with a personal heater', done => {
        const updatedFixtures = {...FIXTURE_DATA, usesPersonalHeater: true};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(24.4);
        done();
    });
    it('should calculate Radiator', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(22);
        done();
    });
    it('should calculate Radiator heating on the room youre in', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator', heatWholeHome: 'Just my current room'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(3.7);
        done();
    });
    it('should calculate Radiator when you leave it on at night', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator', heatingOnWhileSleeping: true};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(51.2);
        done();
    });
    it('should calculate Radiator when your not home very much', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiator', hoursHome: 2};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(7.3);
        done();
    });
    it('should calculate Radiant Flooring ', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Radiant Flooring'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(31);
        done();
    });
    it('should calculate Heat Pump', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Heat Pump'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(54.3);
        done();
    });
    it('should calculate Heat Pump in a big house', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'Heat Pump', houseSqft: 3000};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(108.6);
        done();
    });
    it('should calculate None for heating type', done => {
        const updatedFixtures = {...FIXTURE_DATA, heatType: 'None'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(0);
        done();
    });
});
