const { defineConfig } = require('@rsbuild/core');
const { pluginLess } = require('@rsbuild/plugin-less');
const { pluginVue } = require('@rsbuild/plugin-vue');
const { pluginVueJsx } = require('@rsbuild/plugin-vue-jsx');
const { pluginBabel } = require('@rsbuild/plugin-babel');
const { pluginCssMinimizer } = require('@rsbuild/plugin-css-minimizer');
const { pluginNodePolyfill } = require('@rsbuild/plugin-node-polyfill');

// const { publicVars } = loadEnv({ prefixes: [''] });
const { resolve } = require('path');

const cwd = process.cwd(); // 当前命令执行目录

const isPrd = process.env.NODE_ENV === 'production';
module.exports = defineConfig({
  mode: isPrd ? 'production' : 'development',
  node: {
    global: false
  },
  source: {
    entry: {
      index: resolve(cwd, 'src/main.js')
    }
  },
  server: {
    publicDir: {
      name: 'public'
    },
    port: 8080
  },
  output: {
    minify: {
      js: true,
      // 需要配套pluginCssMinimizer使用，否则会出现字体图标乱码
      css: true,
      minimizerOptions: {
        exclude: /node_modules/,
        errorRecovery: false
      }
    },
    charset: 'ascii',
    polyfill: 'usage',
    assetPrefix: '/',
    cleanDistPath: isPrd,
    filename: {
      css: isPrd ? '[name].[contenthash:8].css' : '[name].css'
    },
    distPath: {
      root: 'dist',
      html: '/',
      js: 'js',
      jsAsync: 'js/async',
      css: 'css',
      cssAsync: 'css/async',
      svg: 'svg',
      font: 'font',
      wasm: 'wasm',
      image: 'img',
      media: 'media'
    }
  },
  dev: {
    lazyCompilation: true,
    assetPrefix: '/',
    progressBar: true,
    client: {
      overlay: true
    }
  },
  tools: {
    devtool: 'eval-cheap-module-source-map',
    lightningcssLoader: false,
    cssExtract: {
      pluginOptions: {
        ignoreOrder: true
      },
      loaderOptions: {
        esModule: true
      }
    },
    styleLoader: {
      insert: !isPrd
    },
    rspack: {
      target: 'web'
    }
  },
  plugins: [
    pluginNodePolyfill(),
    pluginVue(),
    pluginBabel({
      exclude: /node_modules/
    }),
    pluginVueJsx(),
    pluginLess({
      lessLoaderOptions: {
        // additionalData: `@import "${(cwd, './assets/less/global.less')}";`,
        lessOptions: {
          math: 'always',
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }),
    pluginCssMinimizer()
  ],
  performance: {
    removeMomentLocale: true,
    removeConsole: isPrd ? ['log'] : undefined
    // prefetch: {
    //   type: 'async-chunks'
    // }
  }
})
