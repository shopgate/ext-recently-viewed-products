import configureStore from 'redux-mock-store';
import { REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS } from '../constants';

const defaultState = {
  extensions: {
    [REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS]: {
      isFetching: false,
      productIds: [],
    },
  },
};

export const stateWithProducts = {
  product: {
    productsById: {
      1: {
        productData: {
          id: 1,
          featuredImageUrl: 'https://example.com/one',
          name: 'one',
        },
      },
      2: {
        productData: {
          id: 2,
          featuredImageUrl: 'https://example.com/two',
          name: 'two',
        },
      },
    },
  },
  extensions: {
    [REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS]: {
      isFetching: false,
      productIds: [1, 2],
    },
  },
};

/**
 * Empty store.
 * @returns {function}
 */
export const getEmptyStore = () => configureStore()(defaultState);

// eslint-disable-next-line require-jsdoc
export const getStoreWithProducts = () => configureStore()(stateWithProducts);
