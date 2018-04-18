const assert = require('assert')
const ArrayUtil = require('../../../util/Array')
const {describe, it} = require('mocha')

describe('Array', () => {
  describe('unique', () => {
    it('should remove sorted duplicate numbers', () => {
      assert.deepEqual(ArrayUtil.unique([1, 2, 2, 3, 4, 4, 4]), [1, 2, 3, 4])
    })

    it('should remove unsorted duplicate numbers', () => {
      assert.deepEqual(ArrayUtil.unique([4, 1, 3, 2, 1, 4, 3, 1, 2]), [4, 1, 3, 2])
    })

    it('should not remove anything if there is no duplicate', () => {
      assert.deepEqual(ArrayUtil.unique([1, 2, 3, 4]), [1, 2, 3, 4])
    })
  })
})
