const RecentlyViewedProductIdsList = require('./RecentlyViewedProductIdsList')
const {STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST} = require('./constants')

/**
 * @param {PipelineContext} context
 * @param {getRecentlyViewedProductsInput} input
 * @returns {Promise<getRecentlyViewedProductsResponse>}
 */
module.exports = async function (context, input) {
  const recentlyViewedProductIdsList = getRecentlyViewedProducts(context.storage.device)

  return {
    totalProductCount: recentlyViewedProductIdsList.count(),
    productIds: recentlyViewedProductIdsList.getList(input.offset ? input.offset : 0, input.limit ? input.limit : null)
  }
}

/**
 * @param {PipelineStorage} storage
 * @returns {RecentlyViewedProductIdsList}
 */
async function getRecentlyViewedProducts (storage) {
  let currentRecentlyViewedProducts = await storage.get(STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST)
  if (!currentRecentlyViewedProducts) {
    currentRecentlyViewedProducts = []
  }

  return new RecentlyViewedProductIdsList(currentRecentlyViewedProducts)
}
