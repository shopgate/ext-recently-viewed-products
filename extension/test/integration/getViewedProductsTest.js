const assert = require('assert')
const {describe, it, beforeEach, afterEach} = require('mocha')
const sinon = require('sinon')
const getViewedProducts = require('../../getViewedProducts')

describe('getViewedProducts', () => {
  /** @type PipelineContext */
  let context
  let sandbox
  let storageMock
  let storageStub

  beforeEach(() => {
    /** @type sinon */
    sandbox = sinon.sandbox.create()
    storageStub = sandbox.stub()
    storageMock = sandbox.mock(storageStub)

    context = {
      config: {maximumHistoryEntriesPerUser: 50},
      storage: {device: storageStub},
      log: {error: () => {}}
    }
  })

  afterEach(() => {
    sandbox.verify()
    sandbox.restore()
  })

  it('should add productIds', async () => {
    storageMock.expects('get').returns([1, 2])
    const response = await getViewedProducts(context, {})

    assert.equal(response.totalProductCount, 2)
    assert.deepEqual(response.productIds, [1, 2])
  })
})
