import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["pktlucrbkljicperffne.supabase.co"],
  },
  devIndicators: {
    buildActivity: false, // desativa o ícone de atividade
  },
};
export default nextConfig;
