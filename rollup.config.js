// import resolve from 'rollup-'
import typescript from 'rollup-plugin-typescript2';
import autoprefixer from 'autoprefixer';
import sass from 'node-sass';
import postcss from 'rollup-plugin-postcss-modules';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';


const withTypescript = typescript({
  tsconfigOverride: {
    compilerOptions: {
      module: 'ESNext'
    }
  }
});


const withSass = {
  preprocessor: (content) => new Promise(resolve => {
    const result = sass.renderSync({
      // includePaths: [path.resolve(__dirname, "")],
      data: "@import 'src/scss/index.scss'; " + content
    });
    resolve({ code: result.css.toString() });
  }),
  extract: true,
  plugins: [autoprefixer],
  // modules: { generateScopedName: '[local]' },
  extensions: ['.css', '.scss']
};

const withSassModules = {
  ...withSass,
  modules: { generateScopedName: '[hash:base64:7]' },
  // extensions: ['.module.css', '.module.scss']
}

const transformRequire = {
  name: 'Transform require statements',
  transform: code => ({
    code: code.replace(/(const|var|let)\s(.+)\s?=\s?require\(['"](.+)['"]\);/g, (...m) => `import ${m[2]} from '${m[3]}';`),
    // code: code.replace(/require\(/, 'import ('),
    map: null
  }),
}


export default [{
  input: 'src/components/index.ts',
  output: {
    file: 'lib/components.js',
    format: 'es',
    name: 'core',
    sourceMap: true,
    moduleName: 'core'
  },
  external: ['react', 'react-dom', 'classnames'],
  /// @ts-ignore ///
  plugins: [withTypescript, transformRequire, postcss(withSassModules)]
}, {
  input: 'src/utils.ts',
  output: {
    file: 'lib/utils.js',
    format: 'es',
    name: 'utils',
    sourceMap: true,
    moduleName: 'utils'
  },
  plugins: [withTypescript]
}]