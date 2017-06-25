module.exports = {
  /**
   * Not QA filter used by Array.prototype.filter() to filter airlines of QF
   * @param {*} flight - a flight object
   * @return {*|boolean}
   */
  notQf: (flight) => {
    return ( flight && flight.airline === 'QF' );
  },
  /**
   * Depart or Arrive in SYD filter used by Array.prototype.filter() to filter.
   * @param {*} flight - a flight object
   * @return {*|null|number|departure|{airport}|{offblocks}}
   */
  sydney: (flight) => {
    return ( ( flight && flight.departure && flight.departure.airport === 'SYD' ) || ( flight && flight.arrival && flight.arrival.airport === 'SYD' ) );
  }
};