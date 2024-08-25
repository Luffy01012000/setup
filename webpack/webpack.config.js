const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ESBuildMinifyPlugin = require("esbuild-loader").ESBuildMinifyPlugin;
const nodemonPlugin = require("nodemon-webpack-plugin");
const forkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const mode = isDevelopment ? "development" : "production";

module.exports = {
  //   entry: {
  //     // code splitting
  //     foo: foo.js,
  //     bar: bar.js
  //   },
  entry: "./src/index.ts",
  mode,
  target: "node",
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  stats: "errors-only",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        // test: /\.scss$/, //any file that ends with .scss
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx", // Or 'ts' if you don't need tsx
          target: "es2015",
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin(),
    new nodemonPlugin(),
    new forkTsCheckerPlugin(),
  ],
  // optimization: {
  //   minimizer: [new ESBuildMinifyPlugin()],
  // },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};

// module.exports = {
//   webpack: {
//     configure: (webpackConfig, { paths }) => {
//       // const { hasFoundAny, matches } = getLoaders(
//       //   webpackConfig,
//       //   loaderByName("babel-loader")
//       // );
//       // if (!hasFoundAny) throwError("failed to find babel-loader");

//       // console.log("removing babel-loader");
//       // const { hasRemovedAny, removedCount } = removeLoaders(
//       //   webpackConfig,
//       //   loaderByName("babel-loader")
//       // );
//       // if (!hasRemovedAny) throwError("no babel-loader to remove");
//       // if (removedCount !== 2)
//       //   throwError("had expected to remove 2 babel loader instances");

//       console.log("adding esbuild-loader");

//       const tsLoader = {
//         test: /\.(js|mjs|jsx|ts|tsx)$/,
//         // include: paths.appSrc,
//         loader: require.resolve("esbuild-loader"),
//         options: {
//           loader: "ts",
//           target: "es2015",
//         },
//       };

//       // const { isAdded: tsLoaderIsAdded } = addAfterLoader(
//       //   webpackConfig,
//       //   loaderByName("url-loader"),
//       //   tsLoader
//       // );
//       // if (!tsLoaderIsAdded) throwError("failed to add esbuild-loader");
//       console.log("added esbuild-loader");

//       // console.log("adding non-application JS babel-loader back");
//       // const { isAdded: babelLoaderIsAdded } = addAfterLoader(
//       //   webpackConfig,
//       //   loaderByName("esbuild-loader"),
//       //   matches[1].loader // babel-loader
//       // );
//       // if (!babelLoaderIsAdded)
//       //   throwError("failed to add back babel-loader for non-application JS");
//       // console.log("added non-application JS babel-loader back");

//       console.log("replacing TerserPlugin with ESBuildMinifyPlugin");
//       webpackConfig.optimization.minimizer = [
//         new ESBuildMinifyPlugin({
//           target: "es2015",
//         }),
//       ];

//       return webpackConfig;
//     },
//   },
// };
