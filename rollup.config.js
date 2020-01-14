import babel from 'rollup-plugin-babel';

export default {
  input: './src/index.js',
  output: {
    file: './dist/Capitalize.js',
    format: 'umd',
    name: 'Capitalize'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
