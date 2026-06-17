/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't bundle the WASM-based PDF renderer — let it load from node_modules at
  // runtime, otherwise the .wasm can't be found inside the server bundle.
  serverExternalPackages: ["@hyzyla/pdfium"],
};

export default nextConfig;
