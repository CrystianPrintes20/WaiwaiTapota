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

// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
  {
    key: "Permissions-Policy",
    value: "microphone=(self)",
  },
];

module.exports = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["via.placeholder.com", "localhost"], // Adding localhost devtest "embrapa-dev.skalena.com.br"
  },
  env: envData,
  output: "standalone",
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
