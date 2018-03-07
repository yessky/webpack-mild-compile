/*
  author:
    aaron.xiao<admin@veryos.com>
  summary:
    a workaround to prevent webpack endlessly compile
*/

function timefix(compiler) {
  const timefix = 11000;
  const onWatchRun = function (watching, callback) {
    watching.startTime += timefix;
    callback();
  };
  const onDone = function (stats) {
    stats.startTime -= timefix;
  };
  if (compiler.hooks) {
    const plugin = { name: 'MildCompilePlugin' };
    compiler.hooks.watchRun.tapAsync(plugin, onWatchRun);
    compiler.hooks.done.tapAsync(plugin, onDone);
  } else {
    compiler.plugin('watch-run', onWatchRun);
    compiler.plugin('done', onDone);
  }
}

timefix.Plugin = function () { };
timefix.Plugin.prototype.apply = timefix;

module.exports = timefix;
