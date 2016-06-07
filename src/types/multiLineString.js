var createElement = require('../createElement');
var lineString = require('./lineString');

module.exports = function (id, changeset, version, geometry, tags, newIdGenerator, options) {
  var relationTags = JSON.parse(JSON.stringify(tags));
  relationTags.type = relationTags.type || 'multilinestring';
  var relation = createElement('relation', id, changeset, version, geometry, relationTags, newIdGenerator, options);

  var returnObject = {
    node: [],
    way: [],
    relation: [
      relation
    ]
  };

  // Go through all the coordinates and create nodes for them
  returnObject.way = geometry.coordinates.map(function (subGeometry) {
    var wayObject = lineString(undefined, changeset, undefined, {
      coordinates: subGeometry
    }, tags, newIdGenerator, options);

    returnObject.relation[0].member.push({
      'type': 'way',
      'ref': wayObject.way[0].id,
      'role': relationTags.type
    });
    wayObject.node.forEach(function (node) {
      returnObject.node.push(node);
    });

    return wayObject.way[0];
  });

  return returnObject;
};
