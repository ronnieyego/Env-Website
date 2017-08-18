"use strict";
const expect = require('expect');

const { CALC_PAYLOAD } = require('./fixtures'); 
const costCalc = require('../../src/js/utils/footprint/calculate-footprint-submit');


describe('Cost Calculator', () => {
    it('should calculate kwhs used', done => {
        let result = costCalc(CALC_PAYLOAD);

        expect(result.applianceDaily).toEqual(30.5);
        expect(result.applianceMonthly).toEqual(156.3);
        expect(result.food).toEqual(58.2);
        expect(result.transportation).toEqual(6751.0);
        done();
    });
});
