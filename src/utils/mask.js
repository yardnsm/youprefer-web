/* eslint-disable no-bitwise */

const mask = val => parseInt(val, 10) ^ 1000;
const unmask = hash => parseInt(hash, 10) ^ 1000;

export { mask, unmask };
