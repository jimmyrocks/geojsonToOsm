module.exports = function (tags, geometry, changeset, version) {
  var way = createElement('way', changeset, version, tags);
  var returnObject = {
    node: [],
    way: [
      way
    ]
  };
  // Go through all the coordinates and create nodes for them
  returnObject.node = geometry.coordinates.map(function (coords) {
    // Create the node
    var node = createElement('node', changeset, version, {}, coords[1], coords[0]);
    // Add a reference to it
    returnObject.way[0].nd.push({
      'ref': node.id
    });
    // Return it back to the array
    return node;
  });

  return returnObject;
};
