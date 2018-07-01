import getFurnitureCo2 from './furniture';
import { expect } from 'chai';

const FIXTURE_DATA = {
    homeSqft: 1500
}
describe('Furniture Calculation', () => {
    it('should calculate furniture of a small home', done => {
        const res = getFurnitureCo2(FIXTURE_DATA);
        expect(res).to.equal(4781);
        done();
    });
    it('should calculate furniture of a large home', done => {
        const updatedFixtures = {...FIXTURE_DATA, homeSqft: 2500};
        const res = getFurnitureCo2(updatedFixtures);
        expect(res).to.equal(7769);
        done();
    });
});
