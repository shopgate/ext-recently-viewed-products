import {
  defaultState,
  createStateWithProducts,
  stateWithoutValidMenuEntries,
} from '../mock/index';
import {
  getRecentlyViewedProducts,
  getRecentlyViewedProductsWithLimit,
  getRecentlyViewedForProductWithLimit,
  getPageUrl,
  hasMore, hasMoreForProduct,
} from './index';

jest.mock('../constants', () => ({
  RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT: 1,
}));

describe('selectors', () => {
  let stateWithProducts;

  beforeEach(() => {
    stateWithProducts = createStateWithProducts(2);
  });

  describe('getRecentlyViewedProducts', () => {
    it('should return an empty array', () => {
      const result = getRecentlyViewedProducts({
        extensions: {}, product: { currentProduct: { productId: null } },
      });
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('should return all products', () => {
      const result = getRecentlyViewedProducts(stateWithProducts);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[1]).toEqual(stateWithProducts.product.productsById[2].productData);
    });

    it('should only return the first product', () => {
      const result = getRecentlyViewedProductsWithLimit(stateWithProducts);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(stateWithProducts.product.productsById[1].productData);
    });

    it('should not return the current product', () => {
      const result = getRecentlyViewedForProductWithLimit({
        ...stateWithProducts,
      }, { productId: '616263' });
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(stateWithProducts.product.productsById[1].productData);
    });

    it('should return true for hasMore', () => {
      expect(hasMore({ ...stateWithProducts })).toBe(true);
    });

    it('should return true for hasMoreForProduct', () => {
      expect(hasMoreForProduct({ ...stateWithProducts }, { productId: '616263' })).toBe(true);
    });
  });

  describe('getPageUrl', () => {
    it('should return null when no cms pages are configured', () => {
      const result = getPageUrl(defaultState);
      expect(result).toBeNull();
    });

    it('should return null when no valid cms page is configured', () => {
      const result = getPageUrl(stateWithoutValidMenuEntries);
      expect(result).toBeNull();
    });

    it('should return an url when a cms page is configured', () => {
      const result = getPageUrl(stateWithProducts);
      expect(result).toEqual(stateWithProducts.menu.menusById.quicklinks.entries[0].url);
    });
  });
});
