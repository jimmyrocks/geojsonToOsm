// TODO: Some Polygons can be relations, if they have more than one group of coords, then they're a relation for some reason
var LineString = require('./LineString');
var MultiPolygon = require('./MultiPolygon');

module.exports = function (id, changeset, version, geometry, tags, newIdGenerator) {
  // Basically the same thing as a line, but one level deeper
  var newGeometry = {};
  if (geometry.coordinates.length === 1) {
    // We can just created it like a LineString
    newGeometry.coordinates = geometry.coordinates[0];
    return LineString(id, changeset, version, newGeometry, tags, newIdGenerator);
  } else {
    // Otherwise let's treat it like a MultiPolygon so we can keep that logic in one place
    newIdGenerator.coordinates = [geometry.coordinates];
    return MultiPolygon(id, changeset, version, newGeometry, tags, newIdGenerator);
  }
};
