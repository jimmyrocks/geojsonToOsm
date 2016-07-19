var tools = require('jm-tools');
var iterateTapeTasks = tools.iterateTapeTasks;
var requireDirectory = tools.requireDirectory;
var args = process.argv.slice(2);

var tests = requireDirectory(__dirname, 'index.js', args.length ? args : null);
var mainTaskList = [];

console.log(tests);
for (var test in tests) {
  tests[test].forEach(function (test) {
    mainTaskList.push(test);
  });
}

iterateTapeTasks(mainTaskList, true, true, true).then(function (results) {
  console.log('main tests done ');
}).catch(function (e) {
  if (e === undefined) {
    e = new Error('undefined error ');
  }
  console.log('main test error ');
  throw e;
});
