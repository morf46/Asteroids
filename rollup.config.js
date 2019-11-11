import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    input: './js/app.js',
    output: {
        file: './bundle.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs({
            namedExports: {
                'chroma-js': ['chroma']
            }
        }),
        babel({
            
            exclude: 'node_modules/**'
        })
    ]
}