import getFurnitureCo2 from './furniture';
import { expect } from 'chai';

const FIXTURE_DATA = {
    homeSqft: 1500,
    furnitureAmount: 'I have all of the essentials'
}
describe('Furniture Calculation', () => {
    it('should calculate furniture of a small home', done => {
        const { totalCo2, monthlyCo2 } = getFurnitureCo2(FIXTURE_DATA);
        expect(totalCo2).to.equal(4781);
        expect(monthlyCo2).to.equal(50);
        done();
    });
    it('should calculate furniture of a large home', done => {
        const updatedFixtures = {...FIXTURE_DATA, homeSqft: 2500};
        const { totalCo2, monthlyCo2 } = getFurnitureCo2(updatedFixtures);
        expect(totalCo2).to.equal(7769);
        expect(monthlyCo2).to.equal(81);
        done();
    });
    it('should calculate furniture of a cramped home', done => {
        const updatedFixtures = {...FIXTURE_DATA, furnitureAmount: 'My home is cramped'};
        const { totalCo2, monthlyCo2 } = getFurnitureCo2(updatedFixtures);
        expect(totalCo2).to.equal(6215);
        expect(monthlyCo2).to.equal(65);
        done();
    });
});
