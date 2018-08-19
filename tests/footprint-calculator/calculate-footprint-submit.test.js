import 'babel-polyfill';
import expect  from 'expect';

import { CALC_PAYLOAD } from './fixtures';
import  submitForm from '../../src/js/utils/footprint/calculate-footprint-submit';


describe('Cost Calculator', () => {
    it('should calculate kwhs used', done => {
        let result = submitForm(CALC_PAYLOAD);

        expect(result.appliance).toEqual(18);
        expect(result.food).toEqual(280);
        expect(result.transportation).toEqual(1036.4);
        done();
    });
});
