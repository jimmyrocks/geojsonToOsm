var IdGenerator = require('./src/idGenerator');
var readFeatureCollection = require('./src/readFeatureCollection');
var js2xml = require('xmljs_trans_js').xmlify;
var xmlTypes = require('./src/requireTypes')('xmlTypes');

module.exports = function (xmlType, changeset, geojson, options) {
  options = options || {};
  var mappedFields = options.mappedFields || {};
  var idGenerator = new IdGenerator(-1, -1);
  var osmJson = readFeatureCollection(geojson, options, changeset, idGenerator);

  return js2xml(xmlTypes[xmlType](osmJson, options), {
    'prettyPrint': options.prettyPrint
  });
};
