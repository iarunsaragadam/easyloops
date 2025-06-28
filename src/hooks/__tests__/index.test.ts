import * as hooks from '../index';

describe('hooks index', () => {
  it('should export all hooks', () => {
    expect(hooks).toBeDefined();
    expect(typeof hooks).toBe('object');
  });
});