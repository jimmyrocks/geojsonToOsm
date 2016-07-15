var closePolyline = require('../closePolyline');
var createElement = require('../createElement');
var lineString = require('./lineString');

module.exports = function (osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator) {
  tags.type = 'multipolygon';
  var relation = createElement('relation', osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator);

  var returnObject = {
    node: [],
    way: [],
    relation: [
      relation
    ]
  };

  // Go through all the coordinates and create nodes for them
  geometry.coordinates.forEach(function (polygonGroup) {
    polygonGroup.forEach(function (polygonGeometry) {
      // For Polygons with multiple rings, the first must be the exterior ring and any others must be interior rings or holes.
      // http://geojson.org/geojson-spec.html#polygon
      var outerInner = returnObject.relation[0].member.length > 0 ? 'inner' : 'outer';
      var wayObject = closePolyline(lineString(undefined, undefined, undefined, changeset, {
        coordinates: polygonGeometry
      }, undefined, newIdGenerator));

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
