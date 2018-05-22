import {
  REQUEST_RECENTLY_VIEWED_PRODUCTS,
  RESPONSE_RECENTLY_VIEWED_PRODUCTS,
  ERROR_RECENTLY_VIEWED_PRODUCTS,
} from '../constants';
import reducer from './index';

describe('Reducer', () => {
  it('should prepare default state', () => {
    const newState = reducer(undefined, { type: 'foo' });
    expect(newState).toEqual({
      isFetching: false,
      productIds: [],
    });
  });
  it('should react on REQUEST_RECENTLY_VIEWED_PRODUCTS', () => {
    const oldState = {
      isFetching: false,
      productIds: [],
    };
    const newState = reducer(oldState, { type: REQUEST_RECENTLY_VIEWED_PRODUCTS });
    // Check if new object is returned.
    expect(oldState.isFetching).toBe(false);
    expect(newState).toEqual({
      isFetching: true,
      productIds: [],
    });
  });
  it('should react on RESPONSE_RECENTLY_VIEWED_PRODUCTS', () => {
    const oldState = {
      isFetching: true,
      productIds: [],
    };
    const newState = reducer(oldState, {
      type: RESPONSE_RECENTLY_VIEWED_PRODUCTS,
      productIds: [1, 2],
    });
    // Check if new object is returned.
    expect(oldState.isFetching).toBe(true);
    expect(newState).toEqual({
      isFetching: false,
      productIds: [1, 2],
    });
  });
  it('should rect on ERROR_RECENTLY_VIEWED_PRODUCTS', () => {
    const oldState = {
      isFetching: true,
    };
    const newState = reducer(oldState, { type: ERROR_RECENTLY_VIEWED_PRODUCTS });
    // Check if new object is returned.
    expect(oldState.isFetching).toBe(true);
    expect(newState).toEqual({
      isFetching: false,
    });
  });
});
