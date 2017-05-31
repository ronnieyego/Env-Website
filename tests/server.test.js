require('babel-register');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server'); // maybe ../server.js?

describe('GET /solar', () => {
   it('should get solar/wa', (done) => {      
       request(app)
        .get('/solar/wa')
        .expect(200)
        .expect((res) => {
        	let foundText = (res.text).indexOf('Payback Period for Solar Panels'); // Random text on page to ensure it loaded
        	let pass = foundText === -1 ? false : true;
        	expect(pass).toBe(true);
       })
       .end((err, res) => {
           if(err) {
             return done(err);
           }
          done();
      });
   });

   it('should get solar/wy', (done) => {     
       request(app)
        .get('/solar/wy')
        .expect(200)
        .expect((res) => {
        	let foundText = (res.text).indexOf('Payback Period for Solar Panels'); // Random text on page to ensure it loaded
        	let pass = foundText === -1 ? false : true;
        	expect(pass).toBe(true);
       })
       .end((err, res) => {
           if(err) {
             return done(err);
           }
          done();
      });
   });

   it('should NOT get solar/failureString', (done) => {     
       request(app)
        .get('/solar/failureString')
        .expect(400)
       .end((err, res) => {
           if(err) {
             return done(err);
           }
          done();
      });
   });
}); 
