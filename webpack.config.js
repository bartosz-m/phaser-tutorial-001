var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

function absolutePath(...relativePaths) {
    return path.join(__dirname, ...relativePaths);
}

var phaserPath = 'node_modules/phaser-ce/build/custom'

module.exports = {
    entry: {
        main: "./src/main.ts",
    },
    output: {
        path: absolutePath('dist'),
        filename: "js/[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            pixi: absolutePath(phaserPath, 'pixi.js'),
            phaser: absolutePath(phaserPath, 'phaser-split.js'),
            p2: absolutePath(phaserPath, 'p2.js'),
            assets: absolutePath('assets')
        }
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, use: ["ts-loader" ,"source-map-loader"] },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: '/',
        overlay: {
            warnings: true,
            errors: true
        },
        watchContentBase: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
               // this assumes your vendor imports exist in the node_modules directory
               return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
        new webpack.optimize.CommonsChunkPlugin({
            name: 'webpack-runtime' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        }),
        new CopyWebpackPlugin([
            // {output}/file.txt
            { from: 'index.html', to: absolutePath('dist/index.html') },

            // {output}/to/file.txt
            { from: 'assets/**/*', to: absolutePath('dist/') }
        ])
    ]
}
