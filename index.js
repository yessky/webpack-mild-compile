/*
  author:
    aaron.xiao<admin@veryos.com>
  summary:
    a workaround to prevent webpack endlessly compile
*/

const pluginName = 'MildCompile';

function timefix(compiler) {
  const timefix = 11000;
  let watching = {};
  const onWatchRun = function (c, callback) {
    watching.startTime += timefix;
    callback && callback();
  };
  const onDone = function (stats, callback) {
    // Webpack5 use stats.compilation.startTime instead
    if (stats.hasOwnProperty('startTime')) {
      stats.startTime -= timefix;
    } else {
      stats.compilation.startTime -= timefix;
    }
    callback && callback();
  };
  const aspectWatch = compiler.watch;
  compiler.watch = function () {
    watching = aspectWatch.apply(compiler, arguments);
    return watching;
  };
  if (compiler.hooks) {
    compiler.hooks.watchRun.tapAsync(pluginName, onWatchRun);
    compiler.hooks.done.tapAsync(pluginName, onDone);
  } else {
    compiler.plugin('watch-run', onWatchRun);
    compiler.plugin('done', onDone);
  }
}

timefix.Plugin = function () {
  this.name = pluginName;
};
timefix.Plugin.prototype.apply = timefix;

module.exports = timefix;
