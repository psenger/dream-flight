module.exports = {
  notQf: (flight) => {
    return ( flight && flight.airline === 'QF' );
  },
  sydney: (flight) => {
    return ( ( flight && flight.departure && flight.departure.airport === 'SYD' ) || ( flight && flight.arrival && flight.arrival.airport === 'SYD' ) );
  }
};