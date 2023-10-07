import banner from './scripts/banner.js'

export default {
    input: './src/index.js',
    output: {
        file: './dist/main.js',
        format: "iife",
        name: 'AutoJob',
        banner: banner,
        footer: 'new AutoJob(config).start()'
    }
}