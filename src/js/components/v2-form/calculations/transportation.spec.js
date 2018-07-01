import getTransportationCo2 from './transportation';
import { expect } from 'chai';

const FIXTURE_DATA = {
    state: 'WA',
    doesDrive: true,
    carType: 'Gasoline',
    carMpg: 25,
    carpoolFrequency: 'Just to and from work',
    carMilesMonth: 150,
    busMiles: 100,
    trainMiles: 100,
    flyMiles: 15000
}

const EXPECTED_OBJECT_KEYS = ['totalCo2', 'car', 'bus', 'plane', 'train'];

 describe('Transportation', () => {
    it('should calculate CO2', done => {
        const expected = { car: 88, bus: 62, train: 39, plane: 289, totalCo2: 478 };
        const res = getTransportationCo2(FIXTURE_DATA);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate electric cars', done => {
        const expected = { car: 10, bus: 62, train: 39, plane: 289, totalCo2: 400 };
        const updatedFixtures = {...FIXTURE_DATA, carType: 'Electric'};
        const res = getTransportationCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate not carpooling', done => {
        const expected = { car: 118, bus: 62, train: 39, plane: 289, totalCo2: 508 };
        const updatedFixtures = {...FIXTURE_DATA, carpoolFrequency: 'Never'};
        const res = getTransportationCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate a heavy flier', done => {
        const expected = { car: 88, bus: 62, train: 39, plane: 770, totalCo2: 959 };
        const updatedFixtures = {...FIXTURE_DATA, flyMiles: 40000 };
        const res = getTransportationCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate a heavy bus user', done => {
        const expected = { car: 88, bus: 187, train: 39, plane: 289, totalCo2: 603 };
        const updatedFixtures = {...FIXTURE_DATA, busMiles: 300 };
        const res = getTransportationCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate a heavy train user', done => {
        const expected = { car: 88, bus: 62, train: 116, plane: 289, totalCo2: 555 };
        const updatedFixtures = {...FIXTURE_DATA, trainMiles: 300 };
        const res = getTransportationCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should have the expected keys in the object', done => {
        const res = getTransportationCo2(FIXTURE_DATA);
        EXPECTED_OBJECT_KEYS.forEach(key => {
            expect(res).to.have.property(key);
        })
        done();
    });
});
