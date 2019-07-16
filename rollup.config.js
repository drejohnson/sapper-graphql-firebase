import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import dotenv from 'dotenv'
import pkg from './package.json'
import autoPreprocess from 'svelte-preprocess'

const env = dotenv.config().parsed

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

const preprocess = autoPreprocess({
  transformers: {
    scss: { sourceMap: false },
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-preset-env')({
          stage: 3,
          preserve: false,
          // features: {
          //   'nesting-rules': true,
          //   'custom-media-queries': true,
          //   'custom-selectors': true,
          //   'color-mod-function': {
          //     unresolved: 'warn',
          //   },
          // },
        }),
      ],
    },
  },
})

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        ...envKeys,
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
      }),
      resolve({
				dedupe
			}),
      commonjs(),
      legacy &&
        babel({
          extensions: ['.js', '.html'],
          runtimeHelpers: true,
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        ...envKeys,
      }),
      svelte({
        generate: 'ssr',
        dev,
        preprocess,
      }),
      resolve({
				dedupe
			}),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives')),
    ),
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],
    onwarn,
  },
}
