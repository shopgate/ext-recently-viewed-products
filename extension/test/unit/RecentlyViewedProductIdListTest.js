const assert = require('assert')
const {describe, it, beforeEach} = require('mocha')
const RecentlyViewedProductIdList = require('../../RecentlyViewedProductIdList')

describe('RecentlyViewedProductIdsList', () => {
  /**
   * @type RecentlyViewedProductIdList
   */
  let recentlyViewedProductIds
  beforeEach(() => {
    recentlyViewedProductIds = null
  })

  it('should be initializable with a number array', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2])
    assert.deepEqual(recentlyViewedProductIds.getList(), [1, 2])
    assert.equal(recentlyViewedProductIds.count(), 2)
  })

  it('should add new numbers in front of the already existing numbers', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2])
    recentlyViewedProductIds.addProductIds([3, 4])
    assert.deepEqual(recentlyViewedProductIds.getList(), [3, 4, 1, 2])
  })

  it('should add new numbers in front of the already existing numbers and only return unique numbers', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2, 3])
    recentlyViewedProductIds.addProductIds([3, 4])
    assert.deepEqual(recentlyViewedProductIds.getList(), [3, 4, 1, 2])
  })

  it('should count all entries correct', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2, 3])
    recentlyViewedProductIds.addProductIds([3, 4])
    assert.deepEqual(recentlyViewedProductIds.count(), 4)
  })

  it('should count all entries correct even though its empty', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([])
    assert.deepEqual(recentlyViewedProductIds.count(), 0)
  })

  it('should remove an item on remove', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2, 3])
    recentlyViewedProductIds.removeProductId(3)
    assert.deepEqual(recentlyViewedProductIds.getList(), [1, 2])
  })

  it('should not remove an item on remove if there is no element matching', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2, 3])
    recentlyViewedProductIds.removeProductId(4)
    assert.deepEqual(recentlyViewedProductIds.getList(), [1, 2, 3])
  })

  it('should not save more productIds than the given maximum entries count while initialisation', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2, 3], 2)
    assert.deepEqual(recentlyViewedProductIds.getList(), [1, 2])
  })

  it('should not save more productIds than the given maximum entries count when adding productIds to the list', () => {
    recentlyViewedProductIds = new RecentlyViewedProductIdList([4, 5, 6], 4)
    recentlyViewedProductIds.addProductIds([1, 2, 3])
    assert.deepEqual(recentlyViewedProductIds.getList(), [1, 2, 3, 4])
  })

  describe('getList', () => {
    it('should be in the bounds even when the limit and offset is defined more widely', () => {
      recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2, 3])
      assert.deepEqual(recentlyViewedProductIds.getList(1, 10), [2, 3])
    })

    describe('sorted', () => {
      beforeEach(() => {
        recentlyViewedProductIds = new RecentlyViewedProductIdList([1, 2, 3])
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
        recentlyViewedProductIds = new RecentlyViewedProductIdList([2, 1, 3])
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
      recentlyViewedProductIds = new RecentlyViewedProductIdList([2, 1, 3], 2)
    })

    it('should pay regard the maximum entries when initialized', () => {
      recentlyViewedProductIds = new RecentlyViewedProductIdList([2, 1, 3], 2)
      assert.deepEqual(recentlyViewedProductIds.getList(), [2, 1])
    })

    it('should pay regard the maximum entries when products were added', () => {
      recentlyViewedProductIds = new RecentlyViewedProductIdList([2, 1, 3], 4)
      recentlyViewedProductIds.addProductIds([5, 6])
      assert.deepEqual(recentlyViewedProductIds.getList(), [5, 6, 2, 1])
    })
  })
})
