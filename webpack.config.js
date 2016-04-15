module.exports = {
    entry: "./lib/main.js",
    output: {
        path: __dirname,
        filename: "jquery_lite.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
