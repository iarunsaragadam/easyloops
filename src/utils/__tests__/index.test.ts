import * as utils from '../index';

describe('utils index', () => {
  it('should export all utils', () => {
    expect(utils).toBeDefined();
    expect(typeof utils).toBe('object');
  });
});