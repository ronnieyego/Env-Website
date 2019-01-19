import { expect } from 'chai';
import getBasicZipData from './get-basic-zip-data';

const FIXTURES = {
    sanJose: {
        "city": "San Jose",
        "county": "Santa Clara",
        "lat": "37.277121",
        "long": "-121.986133",
        "pop": "13911",
        "state": "CA",
        "zip": "95130"
    },
    sedona : {
        "zip": "86351",
        "city": "Sedona",
        "county": "Yavapai",
        "state": "AZ",
        "pop": "6349",
        "lat": "34.778447",
        "long": "-111.785069"
    }
}

describe('Get basic zip data', () => {
    it('gets basic zip data for 95130', done => {
        const res = getBasicZipData('95130');
        expect(res).to.deep.equal(FIXTURES.sanJose)
        done()
    });
    it('gets basic zip data for 86351', done => {
        const res = getBasicZipData('86351');
        expect(res).to.deep.equal(FIXTURES.sedona)
        done()
    });
    it('returns -1 for no zip', done => {
        const res = getBasicZipData(null);
        expect(res).to.equal(-1)
        done()
    });
    it('returns -1 if it cant find a zip code', done => {
        const res = getBasicZipData("99999");
        expect(res).to.equal(-1)
        done()
    });
});