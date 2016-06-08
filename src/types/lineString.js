var createElement = require('../createElement');

module.exports = function (osmId, foreignKey, osmVersion, changeset, version, geometry, tags, newIdGenerator) {
  var way = createElement('way', osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator);

  var returnObject = {
    node: [],
    way: [
      way
    ]
  };

  // Go through all the coordinates and create nodes for them
  returnObject.node = geometry.coordinates.map(function (coords) {
    // Create the node
    // TODO: When updating, these nodes may need to be pulled from the interface (think about this for later!)
    var node = createElement('node', undefined, undefined, undefined, changeset, {
      'coordinates': coords
    }, undefined, newIdGenerator);
    // Add a reference to it
    returnObject.way[0].nd.push({
      'ref': node.id
    });
    // Return it back to the array
    return node;
  });

  return returnObject;
};
