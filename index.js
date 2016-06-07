var IdGenerator = require('./src/idGenerator');
var js2xml = require('xmljs_trans_js').xmlify;
var normalize = require('geojson-normalize');
var readFeatureCollection = require('./src/readFeatureCollection');
var rewind = require('geojson-rewind');
var xmlTypes = require('./src/requireTypes')('xmlTypes');

module.exports = function (xmlType, changeset, geojson, options) {
  options = options || {};
  var mappedFields = options.mappedFields || {};
  var idGenerator = new IdGenerator(-1, -1);
  var geojsonObj = {};
  try {
    geojsonObj = typeof geojson === 'string' ? JSON.parse(geojson) : geojson;
  } catch (e) {
    e.message = 'Invalid GeoJSON';
    throw e;
  }

  // Run some cleanup functions on the GeoJSON
  geojsonObj = normalize(geojsonObj);
  geojsonObj = rewind(geojsonObj);

  // Convert to a format that I'm calling osmJson
  var osmJson = readFeatureCollection(geojsonObj, options, changeset, idGenerator, options);

  return js2xml(xmlTypes[xmlType](osmJson, options), {
    'prettyPrint': options.prettyPrint
  });
};
