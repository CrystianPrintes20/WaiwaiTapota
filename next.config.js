const envData = {};
const notAllowed = [
  "NODE_APP_INSTANCE",
  "__PSLockDownPolicy",
  "NODE_ARGS",
  "NEXT_RUNTIME",
  "NODE_ENV",
  "NODE_OPTIONS",
  "__NEXT_PROCESSED_ENV",
  "NODE_VERSION",
];
Object.keys(process.env).forEach((env) => {
  if (
    !notAllowed.includes(env) &&
    !notAllowed.map((item) => item.toLowerCase()).includes(env)
  ) {
    envData[env] = process.env[env];
  }
});

module.exports = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["via.placeholder.com", "localhost"], // Adding localhost devtest "embrapa-dev.skalena.com.br"
  },
  env: envData,
};