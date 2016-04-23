module.exports = function (tags, geometry, changeset, version) {
  // Basically the same thing as a multiLine, but maybe? one level deeper
  var newGeometry = {
    coordinates: geometry.coordinates[0]
  };
  return types.multilinestring(tags, newGeometry, changeset, version);
};
