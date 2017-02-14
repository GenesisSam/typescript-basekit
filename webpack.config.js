module.exports = {
  entry: "./src/App.tsx",
  outpus: {
    filename: "./dist/bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [{
        test: /\.tsx$/, loader: "awesome-typescript-loader" 
      }],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  }
}
