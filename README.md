# webpack-mild-compile
a workaround to prevent webpack endlessly compile for `webpack-dev-middleware`. see [#25](https://github.com/webpack/watchpack/issues/25)

this is very useful, if you are using some webpack plugins like webpack-iconfont, webpack-spritesmith.

if this project resolves your headache, please encourage it a star.

如果在webpack的watch动作前创建文件将在10秒内引发多次重复编译，本项目提供了一种可行的解决方案用于修复该问题。

如果你使用了像webpack-iconfont/webpack-spritesmith等需要动态创建文件的插件，那么本项目将会解决上述提到的这个问题。

如果这个项目解决了让你头痛的问题，那么点个赞吧

## Usage 1 - work as a webpack plugin (用法1：作为webpack的插件使用)
```JavaScript
const compiler = webpack(webpackConfig);
const WebpackMildCompile = require('webpack-mild-compile').Plugin;

...
plugins: [
  new WebpackMildCompile()
]
```


## Usage 2 - work as a api (用法2: 作为api使用)
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
[aaron.xiao](https://veryos.com)

## License
MIT