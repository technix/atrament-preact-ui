import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';

import { watchInkFiles } from './vite/watch-ink-files-plugin';
import { removeInkFilesFromBuild } from './vite/remove-ink-files-plugin';
import getPWAConfig from './vite/pwa-config';

import atramentCfg from './atrament.config.json';

export default defineConfig(({ mode }) => {
  const plugins = [
    preact(),
    createHtmlPlugin({
      inject: {
        data: {
          title: atramentCfg.name,
          description: atramentCfg.description
        },
      },
    }),
    watchInkFiles(),
    removeInkFilesFromBuild()
  ]

  let buildDir = 'build';

  if (mode === 'singlefile') {
    plugins.push(viteSingleFile());
    buildDir = 'build_singlefile';
  } else {
    plugins.push(VitePWA(getPWAConfig(atramentCfg)));
  }

  return {
    plugins,
    resolve: {
      alias: [
        { find: 'src', replacement: "/src" },
        { find: 'inkjs', replacement: '/node_modules/inkjs/dist/ink.mjs' }
      ],
    },
    server: {
      port: 8900
    },
    build: {
      outDir: buildDir
    },
    publicDir: 'root',
    base: './',
    experimental: {
      renderBuiltUrl(filename, { type, hostType }) {
        if (type === 'asset') {
          if (hostType === 'html') {
            // apply "base: './'" to HTML template
            return `./${filename}`;
          }
          if (hostType === 'css') {
            // fix issue with CSS fonts
            return filename.replace('assets/','');
          }
        }
        return filename;
      },
    },
  };
});
