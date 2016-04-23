var multiPoint = function(tags, geometry, changeset, version) {
  var coords = geometry.coordinates;
  var node = createElement('node', changeset, version, tags, coords[1], coords[0]);
  return {
    'node': [
      node
    ]
  };
};

multiPoint.elementType = 'relation';
module.exports = multiPoint;
