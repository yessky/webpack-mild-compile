# webpack-mild-compile
a trick to prevent webpack endlessly compile for `webpack-dev-middleware`. see [#25](https://github.com/webpack/watchpack/issues/25)

this is very useful, if you are using some webpack plugins like webpack-iconfont, webpack-spritesmith

## Usage
```JavaScript
const compiler = webpack(webpackConfig);
require('webpack-mild-compile')(compiler);

const app = new Koa();
const devMiddleware = koaWebpack({
  compiler,
  dev: {
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 500,
      ignored: /node_modules/,
      poll: false
    },
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  },
  hot: {
    log: console.log,
    heartbeat: 2000
  }
});
```

## Credit
[aaron.xiao](http://veryos.com)