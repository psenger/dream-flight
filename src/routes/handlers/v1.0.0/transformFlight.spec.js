const describe = require('mocha').describe,
  beforeEach = require('mocha').beforeEach,
  it = require('mocha').it,
  context = require('mocha').describe,
  expect = require('chai').expect,
  should = require('chai').should(),
  assert = require('chai').assert,
  sinon = require('sinon');

let InvalidArgumentError = require('../../../errors/index').InvalidArgumentError;
let transformFlights = require('./transformFlight');
let mocks = Object.freeze(require('../../../../mock/mock.json'));

let mockWithMissingData = [
  {
    'arrival': {
      'onblocks': {
        'time': '2017-06-22T11:25:00Z',
        'type': 'scheduled'
      },
      'scheduled': '2017-06-22T11:25:00Z'
    },
    'departure': {
      'offblocks': {
        'time': '2017-06-22T10:00:00Z',
        'type': 'scheduled'
      }
    },
    'originDateLocal': '2017-06-22',
    'lastChanged': '2017-06-22T05:28:56Z',
    'flightSlug': 'EK5490',
    'originDate': '2017-06-22'
  }
];

describe('HANDLER:', function () {
  describe('transformFlight.js', function () {
    context('1.0.0', function () {
      const transformFlight = Object.freeze(transformFlights);
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
      describe('transformFlight', function () {
        it('should call next with a parameter of InvalidArgumentError if the req.flights is null', function () {
          req.flights = null;
          transformFlight(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should call next with a parameter of InvalidArgumentError if the req.flights is undefined', function () {
          delete req.flights;
          transformFlight(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should call next with a parameter of InvalidArgumentError if the req.flights is not an array', function () {
          req.flights = { monkey: 'go boom boom' };
          transformFlight(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should produce the correct results, with blanks for the values if the expected flight object is deeply wrong', function () {
          req.flights = [...mockWithMissingData];
          delete req.flights[0].departure;
          delete req.flights[0].arrival;
          transformFlight(req, res, next);
          assert(next.calledOnce);
          assert(error.calledOnce);
          assert(send.calledWith({ flights: [{ flight: '', origin: '', destination: '', departureTime: '' }] }));
        });
        it('should produce the correct results, with blanks for the values if the expected flight object is shallow wrong', function () {
          req.flights = [...mockWithMissingData];
          transformFlight(req, res, next);
          assert(next.calledOnce);
          assert(error.calledOnce);
          assert(send.calledWith({ flights: [{ flight: '', origin: '', destination: '', departureTime: '' }] }));
        });
        it('should produce the correct results transformed', function () {
          req.flights = mocks.validResponse.flights;
          transformFlight(req, res, next);
          assert(next.calledOnce);
          assert(send.calledWith({
            flights: [{
              flight: 'EK5490',
              origin: 'MEL',
              destination: 'SYD',
              departureTime: '2017-06-22T10:00:00Z'
            }]
          }));
        });
      })
    })
  });
});
