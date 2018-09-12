import { 
    isNaturalNumber, 
    isInArray,
    isGreaterThanZero
 } from './validators';

import { expect } from 'chai';

 describe('Form Validators', () => {
    it('isNaturalNumber success', done => {
        const res = isNaturalNumber(15);
        expect(res).to.be.true;
        done();
    });
    it('isNaturalNumber fails on negative', done => {
        const res = isNaturalNumber(-15);
        expect(res).to.be.false;
        done();
    });
    it('isNaturalNumber fails on double decimal', done => {
        const res = isNaturalNumber('1..5');
        expect(res).to.be.false;
        done();
    });
    it('isNaturalNumber fails with letters', done => {
        const res = isNaturalNumber('1.5sd');
        expect(res).to.be.false;
        done();
    });
    it('isNaturalNumber fails on null', done => {
        const res = isNaturalNumber('');
        expect(res).to.be.false;
        done();
    });
    it('isGreaterThanZero success', done => {
        const res = isGreaterThanZero(3);
        expect(res).to.be.true;
        done();
    });
    it('isGreaterThanZero fails on 0', done => {
        const res = isGreaterThanZero(0);
        expect(res).to.be.false;
        done();
    });
    it('isGreaterThanZero fails on string', done => {
        const res = isGreaterThanZero('5d');
        expect(res).to.be.false;
        done();
    });
    it('isInArray success', done => {
        const res = isInArray(15,[15,16,17]);
        expect(res).to.be.true;
        done();
    });
    it('isInArray fail', done => {
        const res = isInArray(15,[14,16,17]);
        expect(res).to.be.false;
        done();
    });
});