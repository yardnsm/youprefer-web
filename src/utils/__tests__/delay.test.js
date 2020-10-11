import { delay, runWithTimeout } from '../delay';

test('delay should resolve', async () => {
  // ¯\_(ツ)_/¯
  await expect(delay(0)).resolves.toBe();
  await expect(delay(100)).resolves.toBe();
  await expect(delay(300)).resolves.toBe();
});

test('runWithTimeout should resolve', async () => {
  // ¯\_(ツ)_/¯
  await expect(
    runWithTimeout(
      delay(100).then(() => 'value'),
      1000,
    ),
  ).resolves.toBe('value');

  await expect(
    runWithTimeout(
      delay(1000).then(() => 'value'),
      100,
    ),
  ).resolves.toBe();
});
