import { mockedPipelineRequestFactory } from '@shopgate/pwa-core/classes/PipelineRequest/mock';
import {
  addRecentlyViewedProducts,
  fetchRecentlyViewedProducts,
} from './index';
import { ERROR_RECENTLY_VIEWED_PRODUCTS } from '../constants';

// eslint-disable-next-line require-jsdoc
let mockedResolveCb = () => {};
jest.mock('@shopgate/pwa-core/classes/PipelineRequest', () => mockedPipelineRequestFactory((...args) => {
  mockedResolveCb(...args);
}));

const mockedErrorLogger = jest.fn();
jest.mock('@shopgate/pwa-core/helpers', () => ({
  logger: {
    error: (...args) => mockedErrorLogger(...args),
  },
}));

describe('Actions', () => {
  // eslint-disable-next-line require-jsdoc
  const getState = () => ({
    product: {
      productsById: {},
    },
  });
  describe('addRecentlyViewedProducts', () => {
    beforeEach(() => {
      mockedErrorLogger.mockClear();
    });
    it('addRecentlyViewedProducts should log error', (done) => {
      const dispatch = jest.fn();
      mockedResolveCb = (request, resolve, reject) => {
        reject(new Error('Foo'));
        setTimeout(() => {
          expect(dispatch).toHaveBeenCalled();
          expect(mockedErrorLogger).toHaveBeenCalled();
          done();
        }, 0);
      };
      addRecentlyViewedProducts()(dispatch);
    });
    it('should call addRecentlyViewedProducts and then fetchRecentlyViewedProducts', (done) => {
      const dispatch = jest.fn();
      mockedResolveCb = (request, resolve) => {
        expect(dispatch).toHaveBeenCalled();
        resolve();
        setTimeout(() => {
          expect(dispatch).toHaveBeenCalledTimes(3);
          expect(mockedErrorLogger).not.toHaveBeenCalled();
          done();
        }, 0);
      };
      addRecentlyViewedProducts([])(dispatch);
    });
  });
  describe('fetchRecentlyViewedProducts', () => {
    beforeEach(() => {
      mockedErrorLogger.mockClear();
    });
    it('should fetch', (done) => {
      const dispatch = jest.fn();
      mockedResolveCb = (request, resolve) => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        resolve({ productIds: [1] });
        setTimeout(() => {
          expect(mockedErrorLogger).not.toHaveBeenCalled();
          expect(dispatch).toHaveBeenCalledTimes(3);
          done();
        }, 0);
      };
      fetchRecentlyViewedProducts()(dispatch, getState);
    });
    it('should log error', (done) => {
      const dispatch = jest.fn();
      mockedResolveCb = (request, resolve, reject) => {
        reject(new Error('Foo'));
        setTimeout(() => {
          expect(mockedErrorLogger).toHaveBeenCalled();
          expect(dispatch).toHaveBeenCalledWith({
            type: ERROR_RECENTLY_VIEWED_PRODUCTS,
          });
          done();
        });
      };
      fetchRecentlyViewedProducts()(dispatch);
    });
  });
});
