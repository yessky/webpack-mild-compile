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
    callback();
  };
  const onDone = function (stats) {
    stats.startTime -= timefix;
  };
  const aspectWatch = compiler.watch;
  compiler.watch = function () {
    watching = aspectWatch.apply(compiler, arguments);
    return watching;
  };
  if (compiler.hooks) {
    compiler.hooks.watchRun.tap(pluginName, onWatchRun);
    compiler.hooks.done.tap(pluginName, onDone);
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
