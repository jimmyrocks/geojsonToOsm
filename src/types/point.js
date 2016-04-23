var createElement = require('../createElement');

var point = function (tags, geometry, osmId, changeset) {
  var coords = geometry.coordinates;
  var node = createElement(point.elementType, changeset, version, tags, coords[1], coords[0]);
  return {
    'node': [node]
  };
};

point.elementType = 'node';
module.exports = point;
