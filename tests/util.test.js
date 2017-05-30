"use strict";
const expect = require('expect');

const costCalc = require('../src/js/utils/cost-calc');
const getCo2EmissionsByKwh = require('../src/js/utils/get-co2-emissions-by-kwh');

describe('Utils', () => {
   it('should calculate the energy produced and savings', (done) => {
        let happyPath = costCalc(150, 0.12, 6, 12);
        expect(happyPath.electrictyGenerated).toBe(3942);
        expect(happyPath.savings).toBe(473);
        done();
   });

      it('should calculate the co2 emissions by kwh', done => {
        let totalEnergyConsumption = 1724.90;
        let naturalGas = 651.5;
        let coal = 575.9;
        let petroleum = 497.4;
        let result = getCo2EmissionsByKwh(totalEnergyConsumption, naturalGas, coal, petroleum);
        expect(result).toEqual(0.0474);
        done();
   })
});

