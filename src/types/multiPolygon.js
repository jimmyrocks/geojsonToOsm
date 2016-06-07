var createElement = require('../createElement');
var lineString = require('./lineString');

module.exports = function (id, changeset, version, geometry, tags, newIdGenerator, options) {
  var relation = createElement('relation', id, changeset, version, geometry, tags, newIdGenerator, options);

  var returnObject = {
    node: [],
    way: [],
    relation: [
      relation
    ]
  };

  // Go through all the coordinates and create nodes for them
  geometry.coordinates.forEach(function (polygonGroup) {
    var ways = [];
    polygonGroup.forEach(function (polygonGeometry) {
      // For Polygons with multiple rings, the first must be the exterior ring and any others must be interior rings or holes.
      // http://geojson.org/geojson-spec.html#polygon
      var outerInner = ways.length > 0 ? 'inner' : 'outer';
      var wayObject = lineString(undefined, changeset, undefined, {
        coordinates: polygonGeometry
      }, undefined, newIdGenerator, options);

      returnObject.relation[0].member.push({
        'type': 'way',
        'ref': wayObject.way[0].id,
        'role': outerInner
      });
      wayObject.node.forEach(function (node) {
        returnObject.node.push(node);
      });

      returnObject.way.push(wayObject.way[0]);
    });
  });

  return returnObject;
};
