import { terser } from 'rollup-plugin-terser'

const input = 'src/umd.js'
const name = 'DoubleLinkedList'

export default [
  {
    input,
    output: {
      file: 'umd/list.umd.js',
      sourcemap: true,
      format: 'umd',
      name
    },
    plugins: []
  },
  {
    input,
    output: {
      file: 'umd/list.umd.min.js',
      sourcemap: true,
      format: 'umd',
      name
    },
    plugins: [terser()]
  }
]
