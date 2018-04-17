const ArrayUtil = require('./util/Array')

class RecentlyViewedProductIdsList {
  /**
   * @param {number[]} productIds
   */
  constructor (productIds) {
    this._productIds = productIds
  }

  /**
   * @param {number[]} productIds
   */
  addProductIds (productIds) {
    Array.prototype.push.apply(productIds, this._productIds)
    this._productIds = ArrayUtil.unique(productIds)
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
}

module.exports = RecentlyViewedProductIdsList
