class InvalidParameterException extends Error {
  /**
   * @param {string} message
   */
  constructor (message) {
    super(message)

    this.code = 'EINVALIDPARAMETER'
  }
}

module.exports = InvalidParameterException
