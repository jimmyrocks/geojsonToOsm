module.exports = function (osmLine) {
  var osmPoly = {
    'node': [],
    'way': []
  };
  var nodes = JSON.parse(JSON.stringify(osmLine.node));
  osmPoly.way = osmLine.way.map(function (way) {
    var closedWay = closeWay(nodes, way);
    nodes = closedWay.nodes;
    return closedWay.way;
  });
  osmPoly.node = nodes;
  return osmPoly;
};

var closeWay = function (nodes, way) {
  var findNode = function (id) {
    var returnValue = {};
    nodes.forEach(function (node) {
      if (node.id === id) {
        returnValue = node;
      }
    });
    return returnValue || {};
  };
  // find the first and last node in the obj
  var firstNode = findNode(way.nd[0].ref);
  var lastNode = findNode(way.nd[way.nd.length - 1].ref);

  // Determine if the nodes are the same
  if (firstNode.lat === lastNode.lat && firstNode.lon === lastNode.lon && firstNode.tag.length === lastNode.tag.length) {
    // Remove the last node from nodes
    way.nd[way.nd.length - 1].ref = firstNode.id;
  } else {
    way.nd.push({
      'ref': firstNode.id
    });
  }

  // Remove nodes that aren't included in this way
  var includedNodes = way.nd.map(function (nd) {
    return nd.ref;
  });
  nodes = nodes.filter(function (node) {
    return includedNodes.indexOf(node.id) > -1;
  });
  return {
    'nodes': nodes,
    'way': way
  };
};
