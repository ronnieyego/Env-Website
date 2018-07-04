import getStuffCo2 from './stuff';
import { expect } from 'chai';

const FIXTURE_DATA = {
    homeSqft: 1500,
    stuffAmount: 'Reasonably full'
}
describe('Stuff Calculation', () => {
    it('should calculate stuff of a small home', done => {
        const { totalCo2 } = getStuffCo2(FIXTURE_DATA);
        expect(totalCo2).to.equal(2016);
        done();
    });
    it('should calculate stuff of a large home', done => {
        const updatedFixtures = {...FIXTURE_DATA, homeSqft: 2500};
        const { totalCo2 } = getStuffCo2(updatedFixtures);
        expect(totalCo2).to.equal(3276);
        done();
    });
    it('should calculate stuff of a cramped home', done => {
        const updatedFixtures = {...FIXTURE_DATA, stuffAmount: 'Extremely full'};
        const { totalCo2 } = getStuffCo2(updatedFixtures);
        expect(totalCo2).to.equal(2681);
        done();
    });
    it('should calculate monthly Co2 for stuff of a small home', done => {
        const { monthlyCo2 } = getStuffCo2(FIXTURE_DATA);
        expect(monthlyCo2).to.equal(6);
        done();
    });
});
