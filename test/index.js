var geojsonToOsm = require('../index');
var fs = require('fs');

var files = {
  'multilinestring': {
    'json': './test/examples/multilinestring.json',
    'osm': './test/examples/multilinestring.osm'
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

var xmlType = 'osmChangeCreate';
var geometries = JSON.parse(fs.readFileSync(files.multiPolygon.json));
var changeset = 1;
osmIdField = undefined;
versionField = 1;

console.log(JSON.stringify(geojsonToOsm(xmlType, changeset, geometries, osmIdField, versionField), null, 2));
