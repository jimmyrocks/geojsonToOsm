var fs = require('fs');
var path = require('path');

module.exports = function (type, blackList, whiteList) {
  blackList = blackList || [];
  var regexp = new RegExp('(.+?)\.js(on)?$');
  var returnValue = {};
  fs.readdirSync('./src/' + type).forEach(function (file) {
    var match = file.match(regexp);
    if (match && blackList.indexOf(file) === -1 && (!whiteList || whiteList.indexOf(file) > -1)) {
      returnValue[match[1].toLowerCase()] = require(path.resolve(path.join('./src/' + type, file)));
    }
  });
  return returnValue;
};
