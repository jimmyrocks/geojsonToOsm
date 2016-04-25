var osmTypes = require('./requireTypes')('types');

var readFeatureCollection = module.exports = function (featureCollection, options, changeset, idGenerator) {
  var geojsonFeatures = featureCollection && featureCollection.features || [];
  var osmIdField = options.osmIdField;
  var versionField = options.versionField;
  var osmFeatures = [];
  geojsonFeatures.forEach(function (feature) {
    var osmId = feature[osmIdField];
    var osmVersion = feature[versionField]
    if (feature.type === 'Feature') {
      var geometryType = feature.geometry && feature.geometry.type && osmTypes[feature.geometry.type.toLowerCase()];
      if (geometryType) {
        osmFeatures.push(geometryType(osmId, changeset, osmVersion, feature.geometry, feature.properties, idGenerator));
      } else {
        throw new Error('Invalid Geometry Type: ' + feature.geometry.type);
      }
    } else if (feature.type === 'FeatureCollection') {
      osmFeatures.concat(readFeatureCollection(feature, options, changeset, idGenerator));
    } else {
      throw new Error('Invalid Feature Type: ' + feature.type);
    }
  });
  var returnObj = {};
  osmFeatures.forEach(function(feature) {
    for (var elementType in feature) {
      returnObj[elementType] = returnObj[elementType] || [];
      feature[elementType].forEach(function(element) {
        returnObj[elementType].push(element);
      });
    }
  });
  return returnObj;
};
