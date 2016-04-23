var createElement = require('../createElement');

module.exports = function (tags, geometry, changeset, version) {
  var multiPoint = function () {
    var coords = geometry.coordinates;
    var node = createElement('node', changeset, version, tags, coords[1], coords[0]);
    return {
      'node': [
        node
      ]
    };
  };
  multiPoint.elementType = 'relation';
  return multiPoint;
};
