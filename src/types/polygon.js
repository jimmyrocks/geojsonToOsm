module.exports = function(tags, geometry, changeset, version) {
  // Basically the same thing as a line, but one level deeper
  var newGeometry = {
    coordinates: geometry.coordinates[0]
  };
  return types.linestring(tags, newGeometry, changeset, version);
};
