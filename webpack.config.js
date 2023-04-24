
// Version if the local Node.js version supports async/await
// webpack.config.js
// https://www.serverless.com/plugins/serverless-webpack
const path = require("path");
const slsw = require("serverless-webpack");
//import * as slsw from "serverless-webpack";
const entries = {};
Object.keys(slsw.lib.entries).forEach(key => entries[key] = ["./source-map-install.js", slsw.lib.entries[key]]);
module.exports = {
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    entry: slsw.lib.entries,
    //entry: entries, // genera: Webpack entry must be automatically resolved when package.individually is set to true. In webpack.config.js, remove the entry declaration or set entry to slsw.lib.entries.
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    output: {
        libraryTarget: "commonjs",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
    },
    target: "node",
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },
};