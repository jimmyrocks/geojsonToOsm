// TODO: Some Polygons can be relations, if they have more than one group of coords, then they're a relation for some reason
var closePolyline = require('../closePolyline');
var lineString = require('./lineString');
var multiPolygon = require('./multiPolygon');

module.exports = function (osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator) {
  // Basically the same thing as a line, but one level deeper
  var newGeometry = {};
  if (geometry.coordinates.length === 1) {
    // We can just created it like a lineString
    newGeometry.coordinates = geometry.coordinates[0];
    var polyLine = closePolyline(lineString(osmId, foreignKey, osmVersion, changeset, newGeometry, tags, newIdGenerator));
    return polyLine;
  } else {
    // Otherwise let's treat it like a multiPolygon so we can keep that logic in one place
    newGeometry.coordinates = [geometry.coordinates];
    return multiPolygon(osmId, foreignKey, osmVersion, changeset, newGeometry, tags, newIdGenerator);
  }
};
