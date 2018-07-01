import getHomeCo2 from './home';
import { expect } from 'chai';

const FIXTURE_DATA = {
    homeMaterial: 'Wood',
    homeType: 'Apartment',
    homeSqft: 2500
}

 describe('Home building', () => {
    it('should calculate the CO2 of a wood apartment', done => {
        const { totalCo2 } = getHomeCo2(FIXTURE_DATA);
        expect(totalCo2).to.equal(392000);
        done();
    });
    it('should calculate the CO2 of a brick apartment', done => {
        const updatedFixtures = {...FIXTURE_DATA, homeMaterial: 'Brick'};
        const { totalCo2 } = getHomeCo2(updatedFixtures);
        expect(totalCo2).to.equal(245000);
        done();
    });
    it('should calculate the CO2 of a concrete apartment', done => {
        const updatedFixtures = {...FIXTURE_DATA, homeMaterial: 'Concrete'};
        const { totalCo2 } = getHomeCo2(updatedFixtures);
        expect(totalCo2).to.equal(230300);
        done();
    });
    it('should calculate the CO2 of a wood house', done => {
        const updatedFixtures = {...FIXTURE_DATA, homeType: 'House'};
        const { totalCo2 } = getHomeCo2(updatedFixtures);
        expect(totalCo2).to.equal(400000);
        done();
    });
    it('should calculate the CO2 of a small wood apartment', done => {
        const updatedFixtures = {...FIXTURE_DATA, homeSqft: 1500};
        const { totalCo2 } = getHomeCo2(updatedFixtures);
        expect(totalCo2).to.equal(235200);
        done();
    });
});
