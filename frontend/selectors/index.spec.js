import { stateWithProducts } from '../mock/index';
import { getRecentlyViewedProducts } from './index';

describe('selectors', () => {
  describe('getRecentlyViewedProducts', () => {
    it('should return an empty array', () => {
      const result = getRecentlyViewedProducts({ extensions: {} });
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
  });
});
