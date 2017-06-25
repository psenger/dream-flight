const describe = require('mocha').describe,
  beforeEach = require('mocha').beforeEach,
  it = require('mocha').it,
  context = require('mocha').describe,
  expect = require('chai').expect,
  should = require('chai').should(),
  assert = require('chai').assert,
  sinon = require('sinon');

let InvalidArgumentError = require('../../../errors/index').InvalidArgumentError;
let flightsFilters = require('./flightFilter');
let mocks = Object.freeze(require('../../../../mock/mock.json'));

describe('HANDLER:', function () {
  describe('flightsFilter.js', function () {
    context('1.0.0', function () {
      const flightFilter = Object.freeze(flightsFilters);
      let debug, info, error, send, req, res, next;
      beforeEach(function () {
        debug = sinon.spy();
        info = sinon.spy();
        error = sinon.spy();
        send = sinon.spy();
        req = {
          body: null,
          flights: null,
          log: {
            debug: debug,
            error: error,
            info: info
          }
        };
        res = {
          send: send
        };
        next = sinon.spy();
      });
      describe('flightsFilter', function () {
        it('should call next with a parameter of InvalidArgumentError if the req.flights is null', function () {
          req.flights = null;
          flightFilter((flight) => flight.airline !== 'QF')(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should call next with a parameter of InvalidArgumentError if the req.flights is undefined', function () {
          delete req.flights;
          flightFilter((flight) => flight.airline !== 'QF')(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should call next with a parameter of InvalidArgumentError if the req.flights is not an array', function () {
          req.flights = { monkey: 'go boom boom' };
          flightFilter((flight) => flight.airline !== 'QF')(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should return valid not code shares flights on the req object', function () {
          req.flights = mocks.validRequest.flights;
          flightFilter((flight) => flight.airline !== 'QF')(req, res, next);
          should.exist(req.flights);
          assert(next.calledOnce);
          expect(req.flights).to.deep.equal(mocks.notCodeShare.flights);
        });
        it('should return an empty array if all the flights are not Code Share flights', function () {
          req.flights = mocks.onlyNotCodeShare.flights;
          flightFilter((flight) => flight.airline !== 'QF')(req, res, next);
          should.exist(req.flights);
          assert(next.calledOnce);
          expect(req.flights).to.deep.equal([]);
        });
      })
    })
  });
});