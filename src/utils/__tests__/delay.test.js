import delay from '../delay';

test('should resolve', async () => {
  // ¯\_(ツ)_/¯
  await expect(delay(0)).resolves.toBe();
  await expect(delay(100)).resolves.toBe();
  await expect(delay(300)).resolves.toBe();
});
