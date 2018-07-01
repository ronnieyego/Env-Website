import getFurnitureCo2 from './furniture';
import { expect } from 'chai';

const FIXTURE_DATA = {
    homeSqft: 1500,
    furnitureAmount: 'I have all of the essentials'
}
describe.only('Furniture Calculation', () => {
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
    it('should calculate furniture of a cramped home', done => {
        const updatedFixtures = {...FIXTURE_DATA, furnitureAmount: 'My home is cramped'};
        const res = getFurnitureCo2(updatedFixtures);
        expect(res).to.equal(6215);
        done();
    });
});
