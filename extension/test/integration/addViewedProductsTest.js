const {describe, it, beforeEach, afterEach} = require('mocha')
const sinon = require('sinon')
const addViewedProducts = require('../../addViewedProducts')
const {STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST} = require('../../constants')

describe('addViewedProducts', () => {
  /** @type PipelineContext */
  let context
  let input = {productIds: [1, 2]}
  let sandbox
  let storageMock
  let storageStub

  beforeEach(() => {
    /** @type sinon */
    sandbox = sinon.sandbox.create()
    storageStub = sandbox.stub()
    storageStub.get = sandbox.stub()
    storageStub.get.returns([])
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
    storageStub.get.returns([])
    storageMock.expects('set').withExactArgs(STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST, [1, 2])
    await addViewedProducts(context, input)
  })
})
