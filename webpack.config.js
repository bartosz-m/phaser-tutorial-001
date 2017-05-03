var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: {
        main: "./src/main.ts",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
            assets: path.join(__dirname, 'assets')
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
    devtool: 'inline-source-map',
    devServer: {
        overlay: {
          warnings: true,
          errors: true
      },
      watchContentBase: true
    }

}
