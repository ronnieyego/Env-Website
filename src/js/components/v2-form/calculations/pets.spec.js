import getPetsCo2 from './pets';
import { expect } from 'chai';

const FIXTURE_DATA = ['Dog', 'Cat', 'Hamster', 'Gecko', 'Turtle'];

describe('Pets Calculation', () => {
    it('should calculate the co2 of pets', done => {
        const res = getPetsCo2(FIXTURE_DATA);
        expect(res).to.equal(33235);
        done();
    });
    it('should calculate the co2 of no pets', done => {
        const res = getPetsCo2([]);
        expect(res).to.equal(0);
        done();
    });
});
