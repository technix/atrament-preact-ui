export default function getPWAConfig(atramentCfg) {
  return {
    registerType: 'autoUpdate',
    includeAssets: ['**/!(*.ink)'],
    workbox: {
      globPatterns: ['**/*.{js,css,html,woff2}'],
    },
    manifest: {
      name: atramentCfg.name,
      short_name: atramentCfg.short_name,
      description: atramentCfg.description,
      start_url: "./",
      display: "standalone",
      orientation: "portrait",
      background_color: "#fff",
      theme_color: "#673ab8",
      icons: [
        {
          src: "./pwa-192x192.png",
          type: "image/png",
          sizes: "192x192"
        },
        {
          src: "./pwa-512x512.png",
          type: "image/png",
          sizes: "512x512"
        }
      ]
    },
    pwaAssets: {
      config: 'pwa-assets.config.js'
    }
  };
}
