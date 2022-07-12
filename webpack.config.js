const path = require('path') // 引用path模块
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 入口文件
  entry: "./index.js",
  // 打包后的出口文件
  output: {
    // 输出的路径  是绝对路径(导入path模块) 这里是用node来做的
    path: path.resolve(__dirname, 'dist'),
    // 输出的文件名称
    filename: 'main.js',
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),  
          path.resolve(__dirname, 'lib'),        
        ],
        use: [{
            loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
              loader: 'css-loader',
              options: {
                  modules: true
              }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader','sass-loader']
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
    ],
  },
  // 使用开发模式打包
  mode: "production"
}