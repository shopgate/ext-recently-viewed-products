class Array {
  /**
   * @param {Array} entries
   */
  static unique (entries) {
    let seen = {}
    return entries.filter(function (entry) {
      return seen.hasOwnProperty(entry) ? false : (seen[entry] = true)
    })
  }
}

module.exports = Array
