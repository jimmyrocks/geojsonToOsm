var createElement = require('./createElement');

// TODO: Some Polygons can be relations, if they have more than one group of coords, then they're a relation for some reason

var polygon = function(tags, geometry, changeset, version) {
  // Basically the same thing as a line, but one level deeper
  var newGeometry = {
    coordinates: geometry.coordinates[0]
  };
  return types.linestring(tags, newGeometry, changeset, version);
};

polygon.elementType = function(geometry) {
 return 'way'
};
module.exports = polygon;
