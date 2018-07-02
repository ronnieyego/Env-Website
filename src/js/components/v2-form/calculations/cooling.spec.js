import getHeatingCooling from './cooling';
import { expect } from 'chai';

const FIXTURE_DATA = {
    state: 'WA',
    coolingType: 'Central AC',
    summerTemp: 77,
    winterTemp: 32,
    hoursHome: 6,
    coolingWhileSleeping: false,
    houseSqft: 1500,
    usesPersonalFan: false
}

 describe('Heating and Cooling Calculations', () => {
    it('should calculate Central AC', done => {
        const { totalCo2 } = getHeatingCooling(FIXTURE_DATA);
        expect(totalCo2).to.equal(3.3);
        done();
    });
    it('should calculate Central AC with winter', done => {
        const updatedFixtures = {...FIXTURE_DATA, winterTemp: 77 };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(6.6);
        done();
    });
    it('should calculate Window Mount AC', done => {
        const updatedFixtures = {...FIXTURE_DATA, coolingType: 'Window Mount AC' };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(2.6);
        done();
    });
    it('should calculate Window Mount AC with winter ', done => {
        const updatedFixtures = {...FIXTURE_DATA, coolingType: 'Window Mount AC', winterTemp: 77 };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(5.2);
        done();
    });
    it('should calculate Window Mount AC with a big house ', done => {
        const updatedFixtures = {...FIXTURE_DATA, coolingType: 'Window Mount AC', houseSqft: 2500 };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(3.5);
        done();
    });
    it('should calculate Window Mount AC with ac on at night ', done => {
        const updatedFixtures = {...FIXTURE_DATA, coolingType: 'Window Mount AC', coolingWhileSleeping: true };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(6.1);
        done();
    });
    it('should calculate Lots of Fans', done => {
        const updatedFixtures = {...FIXTURE_DATA, coolingType: 'Lots of Fans' };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(.7);
        done();
    });
    it('should calculate None', done => {
        const updatedFixtures = {...FIXTURE_DATA, coolingType: 'None' };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(0);
        done();
    });
    it('should calculate with personal fan on', done => {
        const updatedFixtures = {...FIXTURE_DATA, usesPersonalFan: true };
        const { totalCo2 } = getHeatingCooling(updatedFixtures);
        expect(totalCo2).to.equal(3.4);
        done();
    });
});
