import getFoodResults from './food';
import { expect } from 'chai';

 describe('Food Calculations', () => {
    it('should calculate food servings and clories', done => {
        const data = {
            calories: 2200,
            beef: 'Once a week',
            chicken: 'Once a week',
            pork: 'Once a week',
            seafood: 'Once a week',
            grain: 'Once a day',
            fruit: 'Once a day',
            vegetables: 'Once a day',
            dairy: 'Once a day',
            cheese: 'Once a day',
            junkFood: 'Once a day'
        };

        const expectedRes = { 
            servings: { 
              beef: 0.9,
              chicken: 0.9,
              pork: 0.9,
              seafood: 0.9,
              grain: 2.2,
              fruit: 1.5,
              vegetables: 2.2,
              dairy: 2.2,
              cheese: 2.2,
              junkFood: 2.2 
            },
           calories: { 
              total: 2198,
              beef: 187,
              chicken: 179,
              pork: 181,
              seafood: 126,
              grain: 219,
              fruit: 139,
              vegetables: 129,
              dairy: 226,
              cheese: 373,
              junkFood: 439 
            },
            co2: {
                beef: 4.7,
                cheese: 2.9,
                chicken: 0.9,
                dairy: 1.1,
                fruit: 0.6,
                grain: 0.5,
                junkFood: 1.1,
                pork: 1,
                seafood: 1,
                total: 15,
                vegetables: 1.1,
            },
            totalCo2: 15,
            ratioError: 1.33,
            multiplier: 1.1 
        };

        const res = getFoodResults(data);
        expect(res).to.deep.equal(expectedRes);
        done();
    });
});
