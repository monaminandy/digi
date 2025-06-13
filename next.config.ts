import { createCivicAuthPlugin } from "@civic/auth/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "a5fe326c-be75-43dd-9bca-7ccabc5fce41"
});

export default withCivicAuth(nextConfig)