import expect from 'expect';

import questionIds from './index';

describe('Ids', () => {
  it('should not have any duplicate question Ids', done => {
    let unique = true;
    let ids = [];
    const keys = Object.keys(questionIds);
    keys.forEach(key => {
      ids.push(parseInt(questionIds[key]));
    });  
    ids = ids.sort((a,b) => a - b); // must do a - b vs a > b so it sorts on number and not hexadecimal position
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

