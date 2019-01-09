import configureStore from 'redux-mock-store';
import { QUICKLINKS_MENU } from '@shopgate/pwa-common/constants/MenuIDs';
import { REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS } from '../constants';
import { pageId } from '../config';

export const defaultState = {
  extensions: {
    [REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS]: {
      isFetching: false,
      productIds: [],
    },
  },
  product: {
    currentProduct: { productId: null },
  },
  history: { pathname: '' },
  menu: {
    menusById: {

    },
  },
};

/**
 * Creates a mocked store with the passed amount of products.
 * @param {number} [amount=2] The amount of products.
 * @param {boolean} [createPageEntry=true] Tells if an entry for a recently viewed products page
 *   shall be added.
 * @return {Object}
 */
export const createStateWithProducts = (amount = 2, createPageEntry = true) => {
  const productIds = [];
  const productsById = {};

  for (let i = 1; i <= amount; i += 1) {
    productIds.push(i.toString());
    productsById[i] = {
      productData: {
        id: i.toString(),
        featuredImageUrl: `https://example.com/${i}`,
        name: `${i}`,
      },
    };
  }

  return {
    product: {
      productsById,
    },
    extensions: {
      [REDUX_NAMESPACE_RECENTLY_VIEWED_PRODUCTS]: {
        isFetching: false,
        productIds,
      },
    },
    menu: {
      menusById: {
        [QUICKLINKS_MENU]: {
          isFetching: false,
          entries: [{
            url: `/page/${createPageEntry ? pageId : 'noop'}`,
            label: 'Recently viewed',
          }],
        },
      },
    },
  };
};

export const stateWithoutValidMenuEntries = {
  menu: {
    menusById: {
      [QUICKLINKS_MENU]: {
        isFetching: false,
        entries: [{
          url: '/page/foobar',
          label: 'Recently viewed',
        }],
      },
    },
  },
};

/**
 * Empty store.
 * @returns {function}
 */
export const getEmptyStore = () => configureStore()(defaultState);

// eslint-disable-next-line require-jsdoc
export const getStoreWithProducts = (amount = 2, createPageEntry = true) =>
  configureStore()(createStateWithProducts(amount, createPageEntry));
