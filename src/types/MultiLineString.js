var createElement = require('../createElement');
var LineString = require('./LineString');

module.exports = function (id, changeset, version, geometry, tags, newIdGenerator) {
  var relation = createElement('relation', id, changeset, version, geometry, tags, newIdGenerator);

  var returnObject = {
    node: [],
    way: [],
    relation: [
      relation
    ]
  };

  // Go through all the coordinates and create nodes for them
  returnObject.way = geometry.coordinates.map(function (subGeometry) {
    var wayObject = LineString(undefined, changeset, undefined, {
      coordinates: subGeometry
    }, undefined, newIdGenerator);

    returnObject.relation[0].member.push({
      'type': 'way',
      'ref': wayObject.way[0].id,
      'role': 'multilinestring'
    });
    wayObject.node.forEach(function (node) {
      returnObject.node.push(node);
    });

    return wayObject.way[0];
  });

  return returnObject;
};
