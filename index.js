var jmTools = require('jm-tools');
var osmTypes = jmTools.tools.requireDirectory('./src/types');

var xmlTypes = {
  'osmChangeCreate': {},
  'osmChangeModify': {},
  'osmChangeRemove': {},
  'osmXml': {}
};

var Generator = function (initial, incrementBy) {
  var types = {};
  return function (type) {
    return types[type] === undefined ? initial : (types[type] + incrementBy);
  };
};

var readFeatureCollection = function (featureCollection, osmIdField, generator) {
  var geojsonFeatures = featureCollection && featureCollection.features || [];
  var osmFeatures = [];
  geojsonFeatures.forEach(function (feature) {
    if (feature.type === 'Feature') {
      if (feature.geometry && feature.geometry.type && osmTypes[feature.geometry.type]) {
        var osmId = osmIdField ? parseInt(feature.properties[osmIdField], 10) : generator(osmTypes[feature.geometry.type].elementType);
        if (isNaN(osmId)) {
          throw new Error('Invalid OSM ID: ' + osmId + ' (' + feature.properties[osmIdField] + ')');
        } else {
          osmFeatures.push(osmTypes[feature.geometry.type](feature.properties, feature.geometry, osmId));
        }
      } else {
        throw new Error('Invalid Geometry Type: ' + feature.geometry.type);
      }
    } else if (feature.type === 'FeatureCollection') {
      osmFeatures.concat(readFeatureCollection(feature, osmIdField, generator));
    } else {
      throw new Error('Invalid Feature Type: ' + feature.type);
    }
  });
  return osmFeatures;
};

module.exports = function (xmlType, changeset, geojson, osmIdField) {
  var generator = new Generator(-1, -1);
  return readFeatureCollection(geojson, osmIdField, generator);
};
