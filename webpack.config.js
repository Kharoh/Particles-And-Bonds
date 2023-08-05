const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: "development", // "production"
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
    }
};