var geojsonToOsm = require('../index');
var fs = require('fs');
var path = require('path');

var files = {
  'nps_multiline': {
    'json': 'nps_multiline.json'
  },
  'point': {
    'json': 'point.json'
  },
  'line': {
    'json': 'line.json'
  },
  'polygon': {
    'json': 'polygon.json'
  },
  'multiline': {
    'json': 'multiline.json'
  },
  'multiPolygon': {
    'json': 'multiPolygon.json'
  }
};

var defaults = {
  'directory': 'examples',
  'xmlType': 'changeset',
  'osmIdField': undefined,
  'versionField': 1,
  'changeType': 'delete',
  'prettyPrint': true
};

module.exports = Object.keys(files).map(function (key) {
  var metadata = files[key];
  Object.keys(defaults).forEach(function (field) {
    metadata[field] = metadata[field] !== undefined ? metadata[field] : defaults[field];
  });
  var geometries = JSON.parse(fs.readFileSync(path.join(__dirname, metadata.directory, metadata.json)));
  return {
    'name': 'Test for ' + key,
    'task': geojsonToOsm,
    'params': [metadata.xmlType, metadata.changeset, geometries, {
      'changeType': metadata.changeType,
      'prettyPrint': metadata.prettyPrint
    }],
    'operator': 'jstype',
    'expected': 'string'
  };
});
