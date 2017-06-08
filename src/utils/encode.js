const encode = val => window.btoa(val);
const decode = hash => window.atob(hash);

export { encode, decode };