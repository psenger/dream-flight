const describe = require('mocha').describe,
  beforeEach = require('mocha').beforeEach,
  it = require('mocha').it,
  context = require('mocha').describe,
  expect = require('chai').expect,
  should = require('chai').should(),
  assert = require('chai').assert,
  fetch = require('node-fetch');

const exampleRequest =
  {
    'flights': [
      {
        'flightNumber': '801',
        'arrival': {
          'onblocks': {
            'time': '2017-06-21T01:00:00Z',
            'type': 'scheduled'
          },
          'airport': 'PER',
          'scheduled': '2017-06-21T01:00:00Z'
        },
        'departure': {
          'offblocks': {
            'time': '2017-06-20T21:00:00Z',
            'type': 'scheduled'
          },
          'airport': 'DRW',
          'scheduled': '2017-06-20T21:00:00Z'
        },
        'originDateLocal': '2017-06-21',
        'lastChanged': '2017-06-20T06:20:57Z',
        'flightSlug': 'QF801',
        'originDate': '2017-06-20',
        'airline': 'QF'
      },
      {
        'flightNumber': '792',
        'arrival': {
          'onblocks': {
            'time': '2017-06-21T04:04:00Z',
            'type': 'actual'
          },
          'touchdown': {
            'time': '2017-06-21T03:56:00Z',
            'type': 'actual'
          },
          'airport': 'DRW',
          'scheduled': '2017-06-21T04:05:00Z'
        },
        'departure': {
          'airborne': {
            'time': '2017-06-21T00:41:00Z',
            'type': 'actual'
          },
          'offblocks': {
            'time': '2017-06-21T00:33:00Z',
            'type': 'actual'
          },
          'airport': 'SYD',
          'scheduled': '2017-06-21T00:35:00Z'
        },
        'originDateLocal': '2017-06-21',
        'lastChanged': '2017-06-21T04:05:42Z',
        'flightSlug': 'QF792',
        'originDate': '2017-06-21',
        'airline': 'EX',
        'boardingStatus': 'Closed'
      },
      {
        'flightNumber': '457',
        'arrival': {
          'onblocks': {
            'time': '2017-06-22T09:20:00Z',
            'type': 'scheduled'
          },
          'airport': 'MEL',
          'scheduled': '2017-06-22T09:20:00Z'
        },
        'departure': {
          'offblocks': {
            'time': '2017-06-22T07:45:00Z',
            'type': 'scheduled'
          },
          'airport': 'SYD',
          'scheduled': '2017-06-22T07:45:00Z'
        },
        'originDateLocal': '2017-06-22',
        'lastChanged': '2017-06-22T05:28:56Z',
        'flightSlug': 'QF457',
        'originDate': '2017-06-22',
        'airline': 'QF'
      }
    ]
  };

const exampleResponse = {
  flights: [{
    flight: 'QF457',
    origin: 'SYD',
    destination: 'MEL',
    departureTime: '2017-06-22T07:45:00Z'
  }]
};

describe('INTEGRATION:', function () {
  context('/flights', function () {
    describe('when calling default version once', function () {
      it('should return the correct results', function (done) {
        let options = {
          method: 'POST',
          body: JSON.stringify(exampleRequest),
          headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:3000/flights', options)
          .then(res => res.json())
          .then(json => expect(json).to.deep.equal(exampleResponse))
          .then(n => done())
          // for debug turn this on
          // .then(json => console.log(json))
          .catch(done)
      });
    });
    describe('when calling default version the second time',function () {
      it('should return the correct results', function (done) {
        let options = {
          method: 'POST',
          body: JSON.stringify(exampleRequest),
          headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:3000/flights', options)
          .then(res => res.json())
          .then(json => expect(json).to.deep.equal(exampleResponse))
          .then(n => done())
          // for debug turn this on
          // .then(json => console.log(json))
          .catch(done)
      });
    });
    describe('When calling the specified version 1.0.0', function () {
      it('should return the correct results', function (done) {
        let options = {
          method: 'POST',
          body: JSON.stringify(exampleRequest),
          headers: { 'Accept-Version': '1.0.0',
            'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:3000/flights', options)
          .then(res => res.json())
          .then(json => expect(json).to.deep.equal(exampleResponse))
          .then(n => done())
          // for debug turn this on
          // .then(json => console.log(json))
          .catch(done)
      });
    });
    describe('specified illegal parameters', function () {
      it('should fail', function (done) {
        let options = {
          method: 'POST',
          body: {flights:{monekey:'go boom'}},
          headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:3000/flights', options)
          .then(res => { expect(res.status).to.deep.equal(400); return res; })
          .then(res => { expect(res.headers.get('content-type')).to.deep.equal('application/json'); return res; })
          .then(n => done())
          .catch(done)
      });
    });
    describe('specified illegal version 999.999.999', function () {
      it('should fail', function (done) {
        let options = {
          method: 'POST',
          body: JSON.stringify(exampleRequest),
          headers: { 'Accept-Version': '999.999.999',
            'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:3000/flights', options)
          .then(res => { expect(res.status).to.deep.equal(400); return res; })
          .then(res => { expect(res.headers.get('content-type')).to.deep.equal('application/json'); return res; })
          .then(n => done())
          .catch(done)
      });
    })
  })
});