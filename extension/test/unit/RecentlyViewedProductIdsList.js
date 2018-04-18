const assert = require('assert')
const {describe, it, beforeEach} = require('mocha')
const RecentlyViewedProductIdsList = require('./../../RecentlyViewedProductIdsList')

describe('RecentlyViewedProductIdsList', () => {
  /**
   * @type RecentlyViewedProductIdsList
   */
  let recentlyViewedProductIds
  beforeEach(() => {
    recentlyViewedProductIds = null
  })

  it('should be initializable with a number array', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdsList([1, 2])
    assert.deepEqual(recentlyViewedProductIds.getList(), [1, 2])
    assert.equal(recentlyViewedProductIds.count(), 2)
  })

  it('should add new numbers in front of the already existing numbers', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdsList([1, 2])
    recentlyViewedProductIds.addProductIds([3, 4])
    assert.deepEqual(recentlyViewedProductIds.getList(), [3, 4, 1, 2])
    assert.equal(recentlyViewedProductIds.count(), 4)
  })

  it('should add new numbers in front of the already existing numbers and only return unique numbers', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdsList([1, 2, 3])
    recentlyViewedProductIds.addProductIds([3, 4])
    assert.deepEqual(recentlyViewedProductIds.getList(), [3, 4, 1, 2])
    assert.equal(recentlyViewedProductIds.count(), 4)
  })

  describe('getList', () => {
    it('should be in the bounds even when the limit and offset is defined more widely', () => {
      recentlyViewedProductIds = new RecentlyViewedProductIdsList([1, 2, 3])
      assert.deepEqual(recentlyViewedProductIds.getList(1, 10), [2, 3])
      assert.equal(recentlyViewedProductIds.count(), 3)
    })

    describe('sorted', () => {
      beforeEach(() => {
        recentlyViewedProductIds = new RecentlyViewedProductIdsList([1, 2, 3])
      })

      it('should return all entries', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(), [1, 2, 3])
      })

      it('should return all entries after the first one', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(1), [2, 3])
      })

      it('should return one entry after the first one', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(1, 1), [2])
      })

      it('should return two entries after the first one', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(1, 2), [2, 3])
      })
    })

    describe('unsorted', () => {
      beforeEach(() => {
        recentlyViewedProductIds = new RecentlyViewedProductIdsList([2, 1, 3])
      })

      it('should return all entries', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(), [2, 1, 3])
      })

      it('should return all entries after the first one', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(1), [1, 3])
      })

      it('should return one entry after the first one', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(1, 1), [1])
      })

      it('should return two entries after the first one', () => {
        assert.deepEqual(recentlyViewedProductIds.getList(1, 2), [1, 3])
      })
    })
  })

  describe('maximumEntries', () => {
    beforeEach(() => {
      recentlyViewedProductIds = new RecentlyViewedProductIdsList([2, 1, 3], 2)
    })

    it('should pay regard the maximum entries when initialized', () => {
      recentlyViewedProductIds = new RecentlyViewedProductIdsList([2, 1, 3], 2)
      assert.deepEqual(recentlyViewedProductIds.getList(), [2, 1])
      assert.equal(recentlyViewedProductIds.count(), 2)
    })

    it('should pay regard the maximum entries when products were added', () => {
      recentlyViewedProductIds = new RecentlyViewedProductIdsList([2, 1, 3], 4)
      recentlyViewedProductIds.addProductIds([5, 6])
      assert.deepEqual(recentlyViewedProductIds.getList(), [5, 6, 2, 1])
      assert.equal(recentlyViewedProductIds.count(), 4)
    })
  })
})
