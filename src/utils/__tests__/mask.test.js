import { mask, unmask } from '../mask';

test('mask should return a different number', () => {
  expect(mask(1)).not.toBe(1);
  expect(mask(123)).not.toBe(123);
  expect(mask(4291)).not.toBe(4291);
});

test('unmasking a masked number should resolved to that number', () => {
  expect(unmask(mask(1))).toBe(1);
  expect(unmask(mask(123))).toBe(123);
  expect(unmask(mask(4291))).toBe(4291);
});
