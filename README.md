# Dream Flight

A wonderful example of a REST-ful api using [Restify](http://restify.com/) incorporating some of my thoughts on [Best Practices for Building REST Api](https://github.com/psenger/Best-Practices-For-Rest-API). The application simply accepts an array of flights, filters them, transforms the results, and returns them all in a Functional, Single Responsibility Principle, Composition fashion.

Written by Philip A Senger

[philip.a.senger@cngrgroup.com](mailto:philip.a.senger@cngrgroup.com) | mobile: 0404466846 | [CV/Resume](http://www.visualcv.com/philipsenger) | [blog](http://www.apachecommonstipsandtricks.blogspot.com/) | [LinkedIn](http://au.linkedin.com/in/philipsenger) | [twitter](http://twitter.com/PSengerDownUndr) | [keybase](https://keybase.io/psenger)

## Table of Contents

<!-- toc -->

  * [Deployed Endpoint](#deployed-endpoint)
  * [Build and Cover Status](#build-and-cover-status)
    + [Master Branch](#master-branch)
    + [Development Branch](#development-branch)
  * [Environment Variables](#environment-variables)
    + [Production](#production)
    + [Development and Testing](#development-and-testing)
  * [Available Scripts for Command Line](#available-scripts-for-command-line)
    + [`npm start`](#npm-start)
    + [`npm test`](#npm-test)
    + [`npm run doc`](#npm-run-doc)
    + [`npm run test:integration`](#npm-run-testintegration)
    + [`npm run test:coverage`](#npm-run-testcoverage)
  * [API Docs for Dream Flight, version 1.0.0](#api-docs-for-dream-flight-version-100)
    + [Endpoints](#endpoints)
      - [POST /flight](#post-flight)
        * [Response: 200](#response-200)
        * [Response: 409](#response-409)
  * [Versions](#versions)
  * [Directory Structure](#directory-structure)
  * [Technologies used](#technologies-used)
  * [Requirements](#requirements)
    + [Error handling](#error-handling)
    + [Deploying](#deploying)
  * [Deployment:](#deployment)
  * [Developer Notes](#developer-notes)
- [Known Issues](#known-issues)

<!-- tocstop -->

## Deployed Endpoint

[/flights](http://dream-flight.ap-southeast-2.elasticbeanstalk.com/flights)

## Build and Cover Status

### Master Branch
[![Build Status](https://travis-ci.org/psenger/dream-flight.svg?branch=master)](https://travis-ci.org/psenger/dream-flight)
[![Coverage Status](https://coveralls.io/repos/github/psenger/dream-flight/badge.svg?branch=master)](https://coveralls.io/github/psenger/dream-flight?branch=master)

### Development Branch
[![Build Status](https://travis-ci.org/psenger/dream-flight.svg?branch=development)](https://travis-ci.org/psenger/dream-flight)
[![Coverage Status](https://coveralls.io/repos/github/psenger/dream-flight/badge.svg?branch=development)](https://coveralls.io/github/psenger/dream-flight?branch=development)

## Environment Variables

### Production

| Mandate  | Name      | Purpose                       | eg |
|:---------|:----------|:------------------------------|:---|
| required | PORT      | The Port number that the API should listen to. The default if not set is 3000 | ``export PORT=8080`` |
| required | NODE_ENV  | When you deploy to production, set this to 'production' to control the level of logging. | `export NODE_ENV=production`  |

### Development and Testing

| Mandate  | Name      | Purpose                       | eg |
|:---------|:----------|:------------------------------|:---|
| optional | PORT      | The Port number that the API should listen to. The default if not set is 3000 | ``export PORT=8080`` |
| optional | NODE_ENV  | When not set, this assumes the mode is development | `export NODE_ENV=development`  |

## Available Scripts for Command Line

In the project directory, you can run:

### `npm start`

Runs the rest app. If the ``PORT`` is not set, then the default is 3000<br>
Open [http://localhost:3000](http://localhost:3000) 

### `npm test`

Launches the test runner [Mocha](https://mochajs.org/) against the unit tests and calculates the coverage.

### `npm run doc`

Builds the documentation, reading the swagger file and injecting it and table of contents markdown scripts.

### `npm run test:integration`

Assumes the server is running on local host 3000 and runs a handful of integration tests.

### `npm run test:coverage`

Launches the test runner [Mocha](https://mochajs.org/) against the unit tests, calculates the coverage, and sends the results to coveralls.io.<br>

_NOTE: this should only be done by the CI_

<!--START api-doc-->
## API Docs for Dream Flight, version 1.0.0

Base URL: http://dream-flight.ap-southeast-2.elasticbeanstalk.com/

- [Endpoints](#endpoints)
  - [POST /flight](#post-flight)

### Endpoints

#### POST /flight

Given a list of flights that are posted as JSON objects, filter the flights that are not a codeshare flight, arrive or depart in SYD, and transform them to a list of ApiResponse Objects.

**Parameters**

| in   | name | required | description                                                                                               |
|------|------|----------|-----------------------------------------------------------------------------------------------------------|
| body | body | true     | Returns a list of flights from the request, that are not a codeshare flight, and arrive or depart in SYD. |

**Request Body**

- (array)
  - (object)
    - flightNumber (integer) (optional)
    - airline (string, string) (optional)
    - departure (object) (optional)
      - scheduled (string, dateTime) (optional)
      - airport (string, string) (optional)
    - arrival (object) (optional)
      - airport (string, string) (optional)

##### Response: 200

successful operation

**Schema**

- (array)
  - (object)
    - flight (string) (optional)
    - origin (string) (optional)
    - destination (string) (optional)
    - departureTime (string, date-time) (optional)

##### Response: 409

Invalid Argument

**Schema**

- (object)
  - message (string) (optional)

<!--END api-doc-->

## Versions

This App assumes the API will have to support and serve multiple versions. To do this, ``Accept-Version`` header can be 
specified by the client. If none is specified, then the application default ``1.0.0`` will be used.
 
Versions will respect [semver](http://semver.org/) convention.

## Directory Structure

```
|____.gitignore  ( Git Ignore )
|____.nyc_output ( Mocah Work directory )
|____CODE_OF_CONDUCT.md
|____CONTRIBUTING.md
|____LICENSE
|____README.md
|____coverage ( Coverage Work directory )
|____log  ( holds logs )
|____mock ( holds mock files )
|____package.json
|____scripts ( stand alone scripts used to do some form of action )
|____integration ( scripts used to validate the integration )
|____src ( source code )
| |____errors ( standard erro files located here )
| |____filters
| | |____v1.0.0 ( functions used by Array.prototype.filter for the cerified version 1.0.0 handlers )
| |____formatters ( restify formatters )
| |____reducers
| | |____v1.0.0 ( functions used by Array.prototype.reducer for the cerified version 1.0.0 handlers )
| |____routes ( All routes will be located here )
| | |____flights.js ( the routes for flight )
| | |____handlers ( all handlers will be placed in here and under a version directory )
| | | |____v1.0.0 ( cerified version 1.0.0 handlers )
| |____server.js ( the code that configures the server and loads the routers )
|____swagger.json ( THe swagger file ).

```

## Technologies used

This project was bootstrapped with [Restify](http://restify.com/) and uses the following technologies

* Swagger
* Mocha
* Fetch
* Version controlled / tagged with Github
* Issues tracked with Github
* automated Travis CI
* automated code coverage report with Coveralls

## Requirements

Using Node.js and your choice of frameworks/libraries, create an API that accepts JSON posted to ``/flights`` , filters that data, and returns a few fields for each flight.

From the list of flights in the request, return those that are not a codeshare flight, and arrive or depart in SYD. A codeshare is a flight that has an ``airline`` that is not ``QF`` .

The response should be valid JSON object with a ``flights`` key with the filtered array of flights. Each flight should have just the following fields from the request:

* ``flight`` - concatnation of ``airline`` and ``flightNumber`` e.g. ``QF404`` 
* ``origin`` - IATA code from ``departure.airport``
* ``destination`` - IATA code from ``arrival.airport``
* ``departureTime`` - ISO Date + Time of departure, from ``departure.scheduled``
  
Example request and response payloads are included.  

### Error handling  
If invalid JSON is returned, you must return an error with an appropraite HTTP response code and a JSON response of:

```json
{
     "error": "Error parsing JSON",
}
```

### Deploying

Once completed, deploy your service so we can run it remotely. We would suggest either now.sh or Heroku, both which have free accounts and should be straightforward to deploy once completed.

We're looking to guage your skill on creating a new service from scratch, so please create this as a standalone service and deploy it at the root of a domain (http://myproject.herokuapp.com/flight) - both of these services should do this by default.
  
## Deployment:

This service was deployed to AWS Elastic Bean Stalk. Nothing fancy.
  
## Developer Notes

Im pretty happy with these results and *I HAD FUN!* If I could get time to do a few more things:

1. Error logging and reporting
2. Integration tests
3. SRP for the the transformer handler, but this is good for now.

# Known Issues

1. Logging is not perfect, and we need to identify how to notify a service if there are problems, namely bad calls and errors
2. No mention of CORS in the requirements
3. No mention of SSL and or security and DOS filters.
4. The transform flight handler, should be broken down into two funcions for the purpose of SRP. One should transform the other should just send the results.


