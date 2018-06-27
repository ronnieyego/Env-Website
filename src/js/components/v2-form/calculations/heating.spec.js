import getHeatingCo2 from './heating';
import { expect } from 'chai';

const FIXTURE_DATA = {
    state: 'WA',
    heatType: 'Natural Gas',
    insulationType: 'Reasonably Insulated',
    summerTemp: 77,
    winterTemp: 66,
    houseSqft: 1500
}

 describe('Heating Calculations', () => {
    it('should calculate Natural Gas', done => {
        const res = getHeatingCo2(FIXTURE_DATA);
        console.log('res is', res);
        expect(res).to.equal(24);
        done();
    });
    it('should calculate Natural Gas in a big house', done => {
        const updatedFixtures = {...FIXTURE_DATA, houseSqft: 3000};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(47);
        done();
    });
    it('should calculate Natural Gas in a warmer winter state', done => {
        const updatedFixtures = {...FIXTURE_DATA, state: 'TX'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(2);
        done();
    });
    it('should calculate Natural Gas with a higher winter temp', done => {
        const updatedFixtures = {...FIXTURE_DATA, winterTemp: 90};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(26);
        done();
    });
    it('should calculate Natural Gas with worse insulation', done => {
        const updatedFixtures = {...FIXTURE_DATA, insulationType: 'Poorly Insulated'};
        const res = getHeatingCo2(updatedFixtures);
        expect(res).to.equal(31);
        done();
    });
});
