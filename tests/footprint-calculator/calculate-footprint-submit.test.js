"use strict";
const expect = require('expect');

const { CALC_PAYLOAD } = require('./fixtures'); 
const costCalc = require('../../src/js/utils/footprint/calculate-footprint-submit');


describe('Cost Calculator', () => {
    it('should calculate kwhs used', done => {
        let result = costCalc(CALC_PAYLOAD);

        expect(result.appliance).toEqual(1049);
        expect(result.food).toEqual(1680);
        expect(result.transportation).toEqual(22746.6);
        done();
    });
});
