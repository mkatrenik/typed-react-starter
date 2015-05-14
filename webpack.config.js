
var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: ['./app/main.ts'],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    // Currently we need to add '.ts' to resolve.extensions array.
    resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js'],
        modulesDirectories: ["node_modules"]
    },

    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',

    // Add loader for .ts files.
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                // module: 'CommonJS'
            }
        ]
    },
    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin("build", "common.js", Infinity)
    // ]
};