/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static export for GitHub Pages
  images: {
    unoptimized: true, // Required for images to work on GitHub Pages
  },
  basePath: "/Food-bank", // Replace with your GitHub repo name
  assetPrefix: "/Food-bank/", // Ensures assets load correctly
};

module.exports = nextConfig;

