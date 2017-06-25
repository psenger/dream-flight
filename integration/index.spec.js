const describe = require('mocha').describe,
  beforeEach = require('mocha').beforeEach,
  it = require('mocha').it,
  context = require('mocha').describe,
  expect = require('chai').expect,
  should = require('chai').should(),
  assert = require('chai').assert,
  fetch = require('node-fetch'),
  exampleRequest = require('../mock/example-request.json'),
  exampleResponse = require('../mock/example-response.json');

const request =
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
          'airport': 'PER',
          'scheduled': '2017-06-21T00:35:00Z'
        },
        'originDateLocal': '2017-06-21',
        'lastChanged': '2017-06-21T04:05:42Z',
        'flightSlug': 'QF792',
        'originDate': '2017-06-21',
        'airline': 'QF',
        'boardingStatus': 'Closed'
      }
    ]
  };

describe('INTEGRATION:', function () {
  describe('index.js', function () {
    describe('', function () {
      it('simple post', function ( done ) {

        let options = {
          method: 'POST',
          body:    JSON.stringify(exampleRequest),
          headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://127.0.0.1:3000/flights', options )
          .then(res => res.json())
          // .then(json => expect(json).to.deep.equal(exampleResponse) )
          .then(json => console.log(json))
          .catch(function(e){
            console.log(e);
            throw e;
          })
          .then(done)
      });
    })
  })
});