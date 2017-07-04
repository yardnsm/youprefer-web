const encode = val => val ^ 1000;
const decode = hash => hash ^ 1000;

export { encode, decode };
