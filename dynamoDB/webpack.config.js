var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
    entry: {
        "MoviesCreateTable": "./tables/MoviesCreateTable.ts", 
        "MoviesLoadData": "./tables/MoviesLoadData.ts",
        "MoviesItemOps01": "./tables/MoviesItemOps01.ts",
        "MoviesItemOps02": "./tables/MoviesItemOps02.ts",
        "MoviesItemOps03": "./tables/MoviesItemOps03.ts",
        "MoviesItemOps04": "./tables/MoviesItemOps04.ts",
        "MoviesItemOps05": "./tables/MoviesItemOps05.ts",
        "MoviesItemOps06": "./tables/MoviesItemOps06.ts",
        "MoviesQuery01": "./tables/MoviesQuery01.ts",
        "MoviesQuery02": "./tables/MoviesQuery02.ts",
        "MoviesScan": "./tables/MoviesScan.ts",
        "MoviesDeleteTable": "./tables/MoviesDeleteTable.ts"
    },
    target: 'node',
    watch: false,
    externals: [nodeExternals({ modulesFromFile: true })],
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // this should match the first part of function handler in serverless.yml
    },
    stats: 'minimal',
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-es2015']
                    },
                }
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.twig$/,
                use: {
                    loader: "twig-loader"
                }
            }
        ]
    }
};