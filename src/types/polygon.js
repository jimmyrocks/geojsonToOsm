// TODO: Some Polygons can be relations, if they have more than one group of coords, then they're a relation for some reason
var lineString = require('./lineString');
var multiPolygon = require('./multiPolygon');

module.exports = function (osmId, foreignKey, osmVersion, changeset, version, geometry, tags, newIdGenerator) {
  // Basically the same thing as a line, but one level deeper
  var newGeometry = {};
  if (geometry.coordinates.length === 1) {
    // We can just created it like a lineString
    newGeometry.coordinates = geometry.coordinates[0];
    return lineString(osmId, foreignKey, osmVersion, changeset, newGeometry, tags, newIdGenerator);
  } else {
    // Otherwise let's treat it like a multiPolygon so we can keep that logic in one place
    newIdGenerator.coordinates = [geometry.coordinates];
    return multiPolygon(osmId, foreignKey, osmVersion, changeset, newGeometry, tags, newIdGenerator);
  }
};
