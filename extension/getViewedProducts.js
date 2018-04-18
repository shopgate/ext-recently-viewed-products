const RecentlyViewedProductIdsList = require('./RecentlyViewedProductIdList')
const {STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST} = require('./constants')

/**
 * @param {PipelineContext} context
 * @param {getRecentlyViewedProductsInput} input
 * @returns {Promise<getRecentlyViewedProductsResponse>}
 */
module.exports = async function (context, input) {
  const offset = input.offset || 0
  const limit = input.limit || null

  let recentlyViewedProductIdsList
  try {
    recentlyViewedProductIdsList = await getRecentlyViewedProductsList(context.storage.device, context.config.maximumHistoryEntriesPerUser)
  } catch (err) {
    context.log.error(err)
    throw err
  }

  return {
    totalProductCount: recentlyViewedProductIdsList.count(),
    productIds: recentlyViewedProductIdsList.getList(offset, limit)
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
