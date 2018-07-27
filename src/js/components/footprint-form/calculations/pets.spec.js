import getPetsCo2 from './pets';
import { expect } from 'chai';

const FIXTURE_DATA = {
    pets: ['Dog', 'Cat', 'Hamster', 'Gecko', 'Turtle']
};

describe('Pets Calculation', () => {
    it('should calculate the total co2 of pets', done => {
        const { totalCo2 } = getPetsCo2(FIXTURE_DATA);
        expect(totalCo2).to.equal(33235);
        done();
    });
    it('should calculate the monthly co2 of pets', done => {
        const { monthlyCo2 } = getPetsCo2(FIXTURE_DATA);
        expect(monthlyCo2).to.equal(155);
        done();
    });
    it('should calculate the co2 of no pets', done => {
        const { totalCo2 } = getPetsCo2({ pets: [] });
        expect(totalCo2).to.equal(0);
        done();
    });
});
