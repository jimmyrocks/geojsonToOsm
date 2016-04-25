var geojsonToOsm = require('../index');
var fs = require('fs');

var files = {
  'nps_multiline': {
    'json': './test/examples/nps_multiline.json'
  },
  'point': {
    'json': './test/examples/point.json'
  },
  'line': {
    'json': './test/examples/line.json'
  },
  'polygon': {
    'json': './test/examples/polygon.json'
  },
  'multiline': {
    'json': './test/examples/multiline.json'
  },
  'multiPolygon': {
    'json': './test/examples/multiPolygon.json'
  }
};

var xmlType = 'changeset';
var geometries = JSON.parse(fs.readFileSync(files.nps_multiline.json));
var changeset = 1;
osmIdField = undefined;
versionField = 1;

console.log(geojsonToOsm(xmlType, changeset, geometries, {
  'changeType': 'create',
  'prettyPrint': 'true'
}));
