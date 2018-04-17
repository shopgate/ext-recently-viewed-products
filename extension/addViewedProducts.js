const RecentlyViewedProductIdsList = require('./RecentlyViewedProductIdsList')
const {STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST} = require('./constants')

/**
 * @param {PipelineContext} context
 * @param {addRecentlyViewedProductsInput} input
 * @returns {Promise<addRecentlyViewedProductsResponse>}
 */
module.exports = async function (context, input) {
  if (!input.productIds || !Array.isArray(input.productIds)) {
    return {}
  }

  const recentlyViewedProductIdsList = getRecentlyViewedProductsList(context.storage.device)

  recentlyViewedProductIdsList.addProductIds(input.productIds)

  await context.storage.device.set(STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST, recentlyViewedProductIdsList.getList())

  return {}
}

/**
 * @param {PipelineStorage} storage
 * @returns {RecentlyViewedProductIdsList}
 */
async function getRecentlyViewedProductsList (storage) {
  let currentRecentlyViewedProducts = await storage.get(STORAGE_RECENTLY_VIEWED_PRODUCTS_LIST)
  if (!currentRecentlyViewedProducts) {
    currentRecentlyViewedProducts = []
  }

  return new RecentlyViewedProductIdsList(currentRecentlyViewedProducts)
}
