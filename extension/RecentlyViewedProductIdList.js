const ArrayUtil = require('./util/Array')

class RecentlyViewedProductIdList {
  /**
   * @param {number[]} [productIds=[]]
   * @param {number} [maximumEntries=50]
   */
  constructor (productIds = [], maximumEntries = 50) {
    this._productIds = productIds.slice(0, maximumEntries)
    this._maximumEntries = maximumEntries
  }

  /**
   * @param {number[]} productIds
   */
  addProductIds (productIds) {
    Array.prototype.push.apply(productIds, this._productIds)
    this._productIds = ArrayUtil.unique(productIds).slice(0, this._maximumEntries)
  }

  /**
   * @param {number} [offset=0]
   * @param {number|null} [limit=null]
   *
   * @returns {number[]}
   */
  getList (offset = 0, limit = null) {
    if (offset === 0 && limit === null) {
      return this._productIds
    }

    if (limit === null) {
      return this._productIds.slice(offset)
    }

    return this._productIds.slice(offset, offset + limit)
  }

  /**
   * @returns {number}
   */
  count () {
    return this._productIds.length
  }
}

module.exports = RecentlyViewedProductIdList
