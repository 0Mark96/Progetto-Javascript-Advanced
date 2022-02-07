const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const loader = require('sass-loader');

module.exports = (env, argv) => {
    const entryPath =
    argv.mode === "development" ? "./src/js/app.js" : "./src/js/index.js";
    return {
    entry: {
      main: path.resolve(__dirname, 'src/js/app.js')
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: '[name].bundle.js',
      assetModuleFilename:'[name][ext]',
      clean: true
    },
    devServer: {
        static: "./build",
        open: true,
      },
    module:{
      rules: [
           {test: /\.css$/, use: ['style-loader','css-loader', 'sass-loader']
          },
          {test: /\.(svg|ico|png|webp|jpg|gif|jpeg|otf|ttf)$/, 
            type: 'asset/resource'
          },
        {
            test: /\.html$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "html-loader",
                    options: {
                        sources: {
                            list: [
                                {
                                    tag: "source",
                                    attribute: "src",
                                    type: "src"
                                }
                            ]
                        }
                    }
                }
            ]
        },
     

         {
            test:/\.(mov|mp4)$/,
            use:{
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "video"
              }
            }
          
          }
      ],
    
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Book Finder',
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/temp.html')
        }),
        new Dotenv(),
    ],
}
};