import {
  HISTORY_PUSH_ACTION,
  HISTORY_REPLACE_ACTION,
} from '@shopgate/pwa-common/constants/ActionTypes';
import subscriptions from './index';

const mockedAddRecentlyViewedProducts = jest.fn();
const mockedFetchRecentlyViewedProducts = jest.fn();
jest.mock('../actions', () => ({
  addRecentlyViewedProducts: (...args) => mockedAddRecentlyViewedProducts(...args),
  fetchRecentlyViewedProducts: (...args) => mockedFetchRecentlyViewedProducts(...args),
}));

jest.mock('@shopgate/pwa-common-commerce/product/selectors/product', () => ({
  getCurrentBaseProductId: () => 1,
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
      '/item',

    ];
    const negatives = [
      '/item/21321321/reviews',
      '/item/21321321/reviews/',
      '/item/21321321/write_review',
      '/item/21321321/write_review/',
    ];
    positives.forEach((pathname) => {
      expect(calls[0][0].operator.predicate({ pathname, historyAction: HISTORY_PUSH_ACTION }))
        .toBe(true);
      expect(calls[0][0].operator.predicate({ pathname, historyAction: HISTORY_REPLACE_ACTION }))
        .toBe(true);
    });
    negatives.forEach((pathname) => {
      expect(calls[0][0].operator.predicate({ pathname, historyAction: HISTORY_PUSH_ACTION }))
        .toBe(false);
      expect(calls[0][0].operator.predicate({ pathname, historyAction: HISTORY_REPLACE_ACTION }))
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
