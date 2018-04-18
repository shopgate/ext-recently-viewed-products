const RecentlyViewedProductIdsList = require('./RecentlyViewedProductIdsList')
const {STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST} = require('./constants')

/**
 * @param {PipelineContext} context
 * @param {getRecentlyViewedProductsInput} input
 * @returns {Promise<getRecentlyViewedProductsResponse>}
 */
module.exports = async function (context, input) {
  const recentlyViewedProductIdsList = await getRecentlyViewedProductsList(context.storage.device, context.config.maximumHistoryEntriesPerUser)

  return {
    totalProductCount: recentlyViewedProductIdsList.count(),
    productIds: recentlyViewedProductIdsList.getList(input.offset ? input.offset : 0, input.limit ? input.limit : null)
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
