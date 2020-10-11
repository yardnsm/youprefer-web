const delay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const runWithTimeout = (promise, ms) => Promise.race([
  promise,
  delay(ms),
]);

export { delay, runWithTimeout };
