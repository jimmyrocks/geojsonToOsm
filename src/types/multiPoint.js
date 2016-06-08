// TODO: This doesn't have a test and probably doesn't work
var createElement = require('../createElement');

module.exports = function (osmId, foreignKey, osmVersion, changeset, version, geometry, tags, newIdGenerator) {
  var multiPoint = function () {
    // var coords = geometry.coordinates
    var node = createElement('node', osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator);
    return {
      'node': [
        node
      ]
    };
  };
  multiPoint.elementType = 'relation';
  return multiPoint;
};
