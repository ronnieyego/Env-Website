import getHeatingCooling from './heating-cooling';
import { expect } from 'chai';

const FIXTURE_DATA = {
    state: 'WA',
    coolingType: 'Central AC',
    summerTemp: 77,
    winterTemp: 32,
    hoursHome: 6,
    coolingWhileSleeping: false,
    houseSqft: 1500
}

 describe('Heating and Cooling Calculations', () => {
    it.only('should calculate Central AC', done => {

        const res = getHeatingCooling(FIXTURE_DATA);
        // expect(res).to.deep.equal(expectedRes);
        done();
    });
});
