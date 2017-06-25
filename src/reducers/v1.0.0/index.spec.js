const describe = require('mocha').describe,
  beforeEach = require('mocha').beforeEach,
  it = require('mocha').it,
  context = require('mocha').describe,
  expect = require('chai').expect,
  should = require('chai').should(),
  assert = require('chai').assert,
  sinon = require('sinon');

const reducers = require('./index');

describe('REDUCERS:', function () {
  context('v1.0.0', function () {
    describe('index.js', function () {
      describe('flattenFlight', function () {
        it('should be an empty result when null', function () {
          let result = [null].reduce(reducers.flattenFlight, { flights: [] });
          assert.isArray(result.flights, 'The result should be an array');
          expect(result.flights).to.have.lengthOf(0);
        });
        it('should be an empty result when undefined', function () {
          let result = [undefined].reduce(reducers.flattenFlight, { flights: [] });
          assert.isArray(result.flights, 'The result should be an array');
          expect(result.flights).to.have.lengthOf(0);
        });
        it('should be a result of zero when wrong data type of string is sent', function () {
          let result = ['1', 'a'].reduce(reducers.flattenFlight, { flights: [] });
          assert.isArray(result.flights, 'The result should be an array');
          expect(result.flights).to.have.lengthOf(2);
          expect(result.flights).to.deep.equal([{ flight: '', origin: '', destination: '', departureTime: '' },
            { flight: '', origin: '', destination: '', departureTime: '' }]);
        });
        it('should be a result of zero when wrong data type of object is sent', function () {
          let result = [{}, {}].reduce(reducers.flattenFlight, { flights: [] });
          assert.isArray(result.flights, 'The result should be an array');
          expect(result.flights).to.have.lengthOf(2);
          expect(result.flights).to.deep.equal([{ flight: '', origin: '', destination: '', departureTime: '' },
            { flight: '', origin: '', destination: '', departureTime: '' }]);
        });
      });
    });
  })
});