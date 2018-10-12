import { isNumber } from '../validations';

test('isNumber', () => {
  expect(isNumber()).toBeFalsy();
  expect(isNumber('yo')).toBeFalsy();
  expect(isNumber({})).toBeFalsy();
  expect(isNumber('123num')).toBeFalsy();
  expect(isNumber('num123')).toBeFalsy();

  expect(isNumber(123)).toBeTruthy();
  expect(isNumber('123')).toBeTruthy();
});
