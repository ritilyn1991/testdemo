const { defineConfig } = require('@rsbuild/core');
const { pluginLess } = require('@rsbuild/plugin-less');
const { pluginVue } = require('@rsbuild/plugin-vue');
const { pluginVueJsx } = require('@rsbuild/plugin-vue-jsx');
const { pluginBabel } = require('@rsbuild/plugin-babel');
const { pluginCssMinimizer } = require('@rsbuild/plugin-css-minimizer');
const { pluginNodePolyfill } = require('@rsbuild/plugin-node-polyfill');
const {
  // ElementPlusResolver,
  // AntDesignVueResolver,
  VantResolver
} = require('unplugin-vue-components/resolvers');
const Components = require('unplugin-vue-components/rspack').default({
  dts: 'types/components.d.ts',
  resolvers: [
    // ElementPlusResolver({
    //   importStyle: true
    // }),
    // AntDesignVueResolver({
    //   importStyle: true,
    //   resolveIcons: true
    // }),
    VantResolver()
  ]
});
const AutoImport = require('unplugin-auto-import/rspack').default({
  dts: 'types/auto-imports.d.ts',
  // 目标文件
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/ // .md
  ],
  imports: [
    'vue',
    'vue-router',
    'pinia'
    // { 'element-plus/es': ['ElLoading', 'ElMessage', 'ElMessageBox'] }
  ],
  resolvers: [
    // ElementPlusResolver({
    //   importStyle: true
    // })
  ],
  eslintrc: {
    enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
    globalsPropValue: true
  }
});

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
      target: 'web',
      plugins: [
        Components, 
        AutoImport
      ]
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
    pluginCssMinimizer(),
  ],
  performance: {
    removeMomentLocale: true,
    removeConsole: isPrd ? ['log'] : undefined
    // prefetch: {
    //   type: 'async-chunks'
    // }
  }
})
