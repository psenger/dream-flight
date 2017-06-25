const describe = require('mocha').describe,
  beforeEach = require('mocha').beforeEach,
  it = require('mocha').it,
  context = require('mocha').describe,
  expect = require('chai').expect,
  should = require('chai').should(),
  assert = require('chai').assert,
  sinon = require('sinon');

const filters = require('./index');

describe('CONST:', function () {
  describe('index.js', function () {
    describe('notQf', function () {
      it('should be an empty result when null', function () {
        let result = [null].filter(filters.notQf);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be an empty result when undefined', function () {
        let result = [undefined].filter(filters.notQf);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result of zero when wrong data type of string is sent', function () {
        let result = ['1', 'a'].filter(filters.notQf);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result of zero when wrong data type of object is sent', function () {
        let result = [{}, {}].filter(filters.notQf);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result of 2 when airline not of QF data is sent', function () {
        let result = [{ airline: 'A' }, { airline: 'B' }].filter(filters.notQf);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result of 0 when airline not of QF data and type is not correctly sent', function () {
        let result = [{ airline: null }, { airline: 100 }].filter(filters.notQf);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result of 2 when airline is of QF data', function () {
        let result = [{ airline: 'QF' }, { airline: 'QF' }].filter(filters.notQf);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(2);
      });
    });
    describe('sydney', function () {
      it('should be an empty result when null', function () {
        let result = [null].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be an empty result when undefined', function () {
        let result = [undefined].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result when wrong data type of string is sent', function () {
        let result = ['1', 'a'].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result when wrong data type of object is sent', function () {
        let result = [{}, {}].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result when wrong data type of object is sent', function () {
        let result = [{ departure: null }, { departure: null }, { arrival: null }, { arrival: null }].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result when wrong data type of object is sent', function () {
        let result = [{ departure: 'a' }, { departure: 1 }, { arrival: 'a' }, { arrival: 1 }].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });
      it('should be a result when wrong data type of object is sent', function () {
        let result = [{ departure: { airport: 'a' } }, { departure: { airport: 1 } }, { arrival: { airport: 'a' } }, { arrival: { airport: 1 } }].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(0);
      });

      it('should be a result departure airport is matching SYD', function () {
        let result = [{ departure: { airport: 'SYD' } }, { departure: { airport: 'XXX' } }, { arrival: { airport: 'XXX' } }, { arrival: { airport: 'XXX' } }].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(1);
      });
      it('should be a result arrival airport is matching SYD', function () {
        let result = [{ departure: { airport: 'XXX' } }, { departure: { airport: 'XXX' } }, { arrival: { airport: 'SYD' } }, { arrival: { airport: 'XXX' } }].filter(filters.sydney);
        assert.isArray(result, 'The result should be an array');
        expect(result).to.have.lengthOf(1);
      });
    })
  });
});