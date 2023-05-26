/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // BASE_API_URL: "https://e-commerce-canvas-new.cleverapps.io",
    // BASE_API_URL: "http://localhost:4000",
    BASE_API_URL: "https://newapi.tavlorify.se",
  },
  async headers() {
    return [
      {
        // source: "//e-commerce-canvas-new.cleverapps.io/(.*)",
        // source: "//localhost:4000/(.*)",
        source: "//newapi.tavlorify.se/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://tavlorify.se",
            // value: "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ]
      }
    ];
  }
}

module.exports = nextConfig
