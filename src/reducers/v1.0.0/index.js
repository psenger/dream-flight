module.exports = {
  flattenFlight: (accumulator, currentValue) => {

    let { airline, flightNumber, departure = {}, arrival = {} } = currentValue;

    // @TODO: PAS - Curry the log into this object so we can report when an object is not formed correctly.
    // if (airline === undefined || flightNumber === undefined || departure.airport === undefined
    //   || arrival.airport === undefined || departure.scheduled === undefined) {
    //   log.error('One more more expected value(s) missing', currentValue, req.flights);
    // }
    accumulator.flights.push({
      flight: (airline || '') + ( flightNumber || ''),
      origin: (departure.airport || ''),
      destination: (arrival.airport || ''),
      departureTime: (departure.scheduled || '')
    });
    return accumulator;
  }
};