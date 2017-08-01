/*
  author:
    aaron.xiao<admin@veryos.com>
  summary:
    a trick to prevent webpack endlessly compile
*/

module.exports = (compiler) => {
  const timefix = 11000;
  compiler.plugin('watch-run', (watching, callback) => {
    watching.startTime += timefix;
    callback()
  });
  compiler.plugin('done', (stats) => {
    stats.startTime -= timefix
  })
}
