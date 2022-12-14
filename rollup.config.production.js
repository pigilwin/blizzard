import typescriptPlugin from 'rollup-plugin-typescript2';
import pkg from './package.json' assert {type: 'json'};
import typescript from 'typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'iife',
            name: 'Blizzard'
        },
        {
            file: pkg.module,
            format: 'es',
            name: 'Blizzard'
        },
    ],
    plugins: [
        typescriptPlugin({
            typescript: typescript,
        })
    ]
};