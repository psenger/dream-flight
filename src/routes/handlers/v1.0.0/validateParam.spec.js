const describe = require('mocha').describe,
  beforeEach = require('mocha').beforeEach,
  it = require('mocha').it,
  context = require('mocha').describe,
  expect = require('chai').expect,
  should = require('chai').should(),
  assert = require('chai').assert,
  sinon = require('sinon');

let InvalidArgumentError = require('../../../errors/index').InvalidArgumentError;
let validateParams = require('./validateParam');
let mocks = Object.freeze(require('../../../../mock/mock.json'));

describe('HANDLER:', function () {
  describe('validateParam.js', function () {
    context('1.0.0', function () {
      const validateParam = Object.freeze(validateParams);
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
      describe('validateParam', function () {
        it('should call next with a parameter of InvalidArgumentError if the req.body is null', function () {
          req.body = null;
          validateParam(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should call next with a parameter of InvalidArgumentError if the req.body is undefined', function () {
          delete req.body;
          validateParam(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should call next with a parameter of InvalidArgumentError if the req.body is not an array', function () {
          req.body = { monkey: 'go boom boom' };
          validateParam(req, res, next);
          assert.isTrue(next.called);
          assert.isTrue(next.calledWith(InvalidArgumentError));
        });
        it('should set the req.flights to the same values that came in on req.body', function () {
          req.body = mocks.validRequest;
          validateParam(req, res, next);
          should.exist(req.flights);
          assert(next.calledOnce);
          expect(req.flights).to.deep.equal(mocks.validRequest.flights);
        });
      })
    })
  });
});