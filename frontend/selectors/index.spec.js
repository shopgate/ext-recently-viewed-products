import {
  defaultState,
  createStateWithProducts,
  stateWithoutValidMenuEntries,
} from '../mock/index';
import { RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT } from '../constants';
import {
  getRecentlyViewedProducts,
  getPageUrl,
  isShowMoreVisible,
} from './index';

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
      const result = getRecentlyViewedProducts(stateWithProducts, 1);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(stateWithProducts.product.productsById[1].productData);
    });

    it('should not return the current product', () => {
      const result = getRecentlyViewedProducts({
        ...stateWithProducts,
        product: {
          ...stateWithProducts.product,
          currentProduct: { productId: 2 },
        },
      });
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(stateWithProducts.product.productsById[1].productData);
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

  describe('isShowMoreVisible', () => {
    it('should return true when enough products are available', () => {
      stateWithProducts = createStateWithProducts(RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT + 1);
      const result = isShowMoreVisible(stateWithProducts);
      expect(result).toBe(true);
    });

    it('should return false when not enough products are available on the list', () => {
      stateWithProducts = createStateWithProducts(RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT);
      const result = isShowMoreVisible(stateWithProducts);
      expect(result).toBe(false);
    });

    it('should return false when no cms page is configured', () => {
      stateWithProducts = createStateWithProducts(RECENTLY_VIEWED_PRODUCTS_SLIDER_LIMIT + 1, false);
      const result = isShowMoreVisible(stateWithProducts);
      expect(result).toBe(false);
    });
  });
});
