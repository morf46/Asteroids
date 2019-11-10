import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

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
        })
    ]
}