"use strict";
const expect = require('expect');

const costCalc = require('../src/js/utils/cost-calc');
const getCo2EmissionsByKwh = require('../src/js/utils/get-co2-emissions-by-kwh');
const questionIds = require('../src/js/utils/ids/index');

describe('Utils', () => {
  it('should calculate the energy produced and savings', (done) => {
    let happyPath = costCalc(150, 0.12, 6, 12);
    expect(happyPath.electrictyGenerated).toBe(3942);
    expect(happyPath.savings).toBe(473);
    done();
   });

  it('should not have any duplicate question Ids', done => {
    let unique = true;
    let ids = [];
    // Really weird but since im exporting default { ...ids}, it reshapes it to {default: {...ids}}
    // This is what happens when I mix require and exports. . .
    const keys = Object.keys(questionIds['default']);
    keys.forEach(key => {
      ids.push(questionIds['default'][key]);
      });  
    ids = ids.sort((a,b) => a > b);
    ids.forEach((id, i) => {
      if (ids[i + 1] === id) {
        unique = false;
        console.log('BAD ID: ', id);
      }
    });
    expect(unique).toBe(true);
    done();
   })
});

