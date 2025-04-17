import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import { terser } from 'rollup-plugin-terser'

export default {
  input: ['./src/index.ts'],

  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
    sourcemap: false,

    // globals mapping for external dependencies
    globals: {
      'bignumber.js': 'BigNumber',
      elliptic: 'Elliptic',
      stream: 'stream',
      crypto: 'crypto',
    },
  },

  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false, // use browser version of built-in modules
      extensions: ['.ts', '.js'], // 新增配置
      // set polyfill for Node.js core modules
      resolveOnly: ['vm-browserify', 'buffer/', 'stream-browserify', 'path-browserify', 'crypto-browserify'],
      mainFields: ['browser', 'module', 'main'],
      dedupe: ['buffer', 'stream', 'crypto', 'path', 'vm'],
    }),
    commonjs(),
    json(),
    nodePolyfills(), // polyfill Node.js core modules such as Buffer, process, etc.
    typescript({
      tsconfigOverride: { compilerOptions: { declaration: true } }, // generate .d.ts files
      exclude: ['test/**'],
    }),
    terser(), // zip code
  ],

  // 解析外部依赖
  external: ['bignumber.js', 'elliptic', 'stream', 'crypto'],
}
