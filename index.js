var osmTypes = {
  'Point': require('./src/types/point'),
  'LineString': require('./src/types/lineString'),
  'Polygon': require('./src/types/polygon'),
  'MultiPoint': require('./src/types/multiPoint'),
  'MultiLineString': require('./src/types/multiLineString'),
  'MultiPolygon': require('./src/types/multiPolygon')
};

var xmlTypes = {
  'osmChangeCreate': {},
  'osmChangeModify': {},
  'osmChangeRemove': {},
  'osmXml': {}
};

var IdGenerator = function (initial, incrementBy) {
  var types = {};
  return function (type) {
    types[type] = types[type] === undefined ? initial : (types[type] + incrementBy);
    return types[type];
  };
};

var readFeatureCollection = function (featureCollection, osmIdField, versionField, changeset, idGenerator) {
  var geojsonFeatures = featureCollection && featureCollection.features || [];
  var osmFeatures = [];
  geojsonFeatures.forEach(function (feature) {
    if (feature.type === 'Feature') {
      if (feature.geometry && feature.geometry.type && osmTypes[feature.geometry.type]) {
        osmFeatures.push(osmTypes[feature.geometry.type](feature[osmIdField], changeset, feature[versionField], feature.geometry, feature.properties, idGenerator));
      } else {
        throw new Error('Invalid Geometry Type: ' + feature.geometry.type);
      }
    } else if (feature.type === 'FeatureCollection') {
      osmFeatures.concat(readFeatureCollection(feature, osmIdField, changeset, idGenerator));
    } else {
      throw new Error('Invalid Feature Type: ' + feature.type);
    }
  });
  return osmFeatures;
};

module.exports = function (xmlType, changeset, geojson, osmIdField, versionField) {
  var idGenerator = new IdGenerator(-1, -1);
  var osmJson = readFeatureCollection(geojson, osmIdField, versionField, changeset, idGenerator);
  return osmJson;
};
