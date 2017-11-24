/*
  author:
    aaron.xiao<admin@veryos.com>
  summary:
    a trick to prevent webpack endlessly compile
*/

function timefix(compiler) {
  const timefix = 11000;
  compiler.plugin('watch-run', function (watching, callback) {
    watching.startTime += timefix;
    callback()
  });
  compiler.plugin('done', function (stats) {
    stats.startTime -= timefix
  })
}

timefix.Plugin = function () { };
timefix.Plugin.prototype.apply = timefix;

module.exports = timefix
