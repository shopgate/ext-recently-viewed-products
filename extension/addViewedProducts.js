const RecentlyViewedProductIdsList = require('./RecentlyViewedProductIdList')
const {STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST} = require('./constants')
const InvalidParameterException = require('./error/InvalidParameterException')
const InternalErrorException = require('./error/InternalErrorException')

/**
 * @param {PipelineContext} context
 * @param {addRecentlyViewedProductsInput} input
 * @returns {Promise<void>}
 */
module.exports = async function (context, input) {
  if (!input.productIds || !Array.isArray(input.productIds)) {
    throw new InvalidParameterException('parameter productIds is invalid')
  }

  try {
    const recentlyViewedProductIdsList = await getRecentlyViewedProductsList(context.storage.device, parseInt(context.config.maximumHistoryEntriesPerUser))

    recentlyViewedProductIdsList.addProductIds(input.productIds)

    await context.storage.device.set(STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST, recentlyViewedProductIdsList.getList())
  } catch (err) {
    context.log.error(err)
    throw new InternalErrorException()
  }
}

/**
 * @param {PipelineStorage} storage
 * @param {number} maximumEntriesPerUser
 * @returns {RecentlyViewedProductIdsList}
 */
async function getRecentlyViewedProductsList (storage, maximumEntriesPerUser) {
  let currentRecentlyViewedProducts = await storage.get(STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST)
  if (!currentRecentlyViewedProducts) {
    currentRecentlyViewedProducts = []
  }

  return new RecentlyViewedProductIdsList(currentRecentlyViewedProducts, maximumEntriesPerUser)
}
