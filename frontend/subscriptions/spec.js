import { ACTION_PUSH } from '@virtuous/conductor';
import subscriptions from './index';

const mockedAddRecentlyViewedProducts = jest.fn();
const mockedFetchRecentlyViewedProducts = jest.fn();
jest.mock('../actions', () => ({
  addRecentlyViewedProducts: (...args) => mockedAddRecentlyViewedProducts(...args),
  fetchRecentlyViewedProducts: (...args) => mockedFetchRecentlyViewedProducts(...args),
}));

jest.mock('@shopgate/pwa-common-commerce/product/selectors/product', () => ({
  getProductIdFromRoute: () => 1,
}));

describe('Subscriptions', () => {
  let calls;
  const mockedDispatch = jest.fn();
  // eslint-disable-next-line require-jsdoc
  const mockedGetState = () => {};

  beforeEach(() => {
    mockedDispatch.mockClear();
  });

  it('should subscribe to all required streams', () => {
    const mockedSubscribe = jest.fn();
    subscriptions(mockedSubscribe);
    // eslint-disable-next-line prefer-destructuring
    calls = mockedSubscribe.mock.calls;
    expect(calls.length).toBe(2);
  });
  it('should addProductToList$ on correct pages', () => {
    const positives = [
      { historyAction: ACTION_PUSH, route: { pattern: '/item/:productId' } },

    ];
    const negatives = [
      { historyAction: ACTION_PUSH, route: { pattern: '/item/:productId/reviews' } },
      { historyAction: ACTION_PUSH, route: { pattern: '/item/:productId/reviews/' } },
      { historyAction: ACTION_PUSH, route: { pattern: '/item/:productId/write_review' } },
      { historyAction: ACTION_PUSH, route: { pattern: '/item/:productId/write_review' } },
    ];
    positives.forEach((action) => {
      expect(calls[0][0].operator.predicate({ action }))
        .toBe(true);
    });
    negatives.forEach((action) => {
      expect(calls[0][0].operator.predicate({ action }))
        .toBe(false);
    });
  });
  it('should react on addProductToList$', () => {
    calls[0][1]({ dispatch: mockedDispatch, getState: mockedGetState });
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedAddRecentlyViewedProducts).toHaveBeenCalled();
  });
  it('should react on appDidStart$', () => {
    calls[1][1]({ dispatch: mockedDispatch });
    expect(mockedFetchRecentlyViewedProducts).toHaveBeenCalled();
  });
});
