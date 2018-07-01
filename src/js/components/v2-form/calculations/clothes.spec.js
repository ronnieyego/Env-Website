import getClothesCo2 from './clothes';
import { expect } from 'chai';

const FIXTURE_DATA = {
    clothingProfile: 'Way too many'
};


 describe('Clothes calculations', () => {
    it('should calculate the CO2 of a super large wardrobe', done => {
        const expected = { totalArticles: 625, totalCo2: 1690, shirtsCo2: 148, jacketsCo2: 128, pantsCo2: 125, shortsCo2: 265, socksUndiesCo2: 23, accessoriesCo2: 139, shoesCo2: 862 };
        const updatedFixtures = {...FIXTURE_DATA};
        const res = getClothesCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate the CO2 of a large wardrobe', done => {
        const expected = { totalArticles: 237, totalCo2: 763, shirtsCo2: 74, jacketsCo2: 64, pantsCo2: 75, shortsCo2: 79, socksUndiesCo2: 14, accessoriesCo2: 14, shoesCo2: 443 };
        const updatedFixtures = {...FIXTURE_DATA, clothingProfile: 'My closet it packed'};
        const res = getClothesCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate the CO2 of a medium wardrobe', done => {
        const expected = { totalArticles: 102, totalCo2: 347, shirtsCo2: 30, jacketsCo2: 30, pantsCo2: 37, shortsCo2: 40, socksUndiesCo2: 6, accessoriesCo2: 7, shoesCo2: 197 };
        const updatedFixtures = {...FIXTURE_DATA, clothingProfile: 'A good amount'};
        const res = getClothesCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate the CO2 of a light wardrobe', done => {
        const expected = { totalArticles: 53, totalCo2: 168, shirtsCo2: 15, jacketsCo2: 9, pantsCo2: 19, shortsCo2: 20, socksUndiesCo2: 3, accessoriesCo2: 4, shoesCo2: 98 };
        const updatedFixtures = {...FIXTURE_DATA, clothingProfile: 'Just the essentials'};
        const res = getClothesCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
    it('should calculate the CO2 of a super light wardrobe', done => {
        const expected = { totalArticles: 22, totalCo2: 75, shirtsCo2: 5, jacketsCo2: 4, pantsCo2: 6, shortsCo2: 7, socksUndiesCo2: 2, accessoriesCo2: 2, shoesCo2: 49 };
        const updatedFixtures = {...FIXTURE_DATA, clothingProfile: 'Hardly any'};
        const res = getClothesCo2(updatedFixtures);
        expect(res).to.deep.equal(expected);
        done();
    });
});
