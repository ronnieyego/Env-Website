import getHomeActivitiesCo2 from './home-activities';
import { expect } from 'chai';

const FIXTURE_DATA = {
    state: 'WA',
    hoursHome: 6,
    hoursTv: 2,
    hoursComputer: 4,
    cookAtHomeFrequency: '2-3 times per week',
    doesShowerDaily: true,
    doesMusicAtHome: true,
    laundryLoads: 4,
    homeSqft: 1500
};

const HIGH_VALUE_FIXTURE_DATA = {
    state: 'WA',
    hoursHome: 8,
    hoursTv: 8,
    hoursComputer: 8,
    cookAtHomeFrequency: 'Most nights',
    doesShowerDaily: true,
    doesMusicAtHome: true,
    laundryLoads: 20,
    homeSqft: 2500
};

const EXPECTED_OBJECT_KEYS = ['entertainment', 'cooking', 'cleanliness', 'background', 'totalCo2'];


 describe('Home Hctivities', () => {
    it('should calculate home activities', done => {
        const { totalCo2} = getHomeActivitiesCo2(FIXTURE_DATA);
        expect(totalCo2).to.equal(5);
        done();
    });
    it('should calculate home activities with higer values', done => {
        const { totalCo2} = getHomeActivitiesCo2(HIGH_VALUE_FIXTURE_DATA);
        expect(totalCo2).to.equal(8);
        done();
    });
    it('should have the expected keys in the object', done => {
        const res = getHomeActivitiesCo2(FIXTURE_DATA);
        EXPECTED_OBJECT_KEYS.forEach(key => {
            expect(res).to.have.property(key);
        })
        done();
    });
});
