var createElement = require('../createElement');

module.exports = function (osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator) {
  var node = createElement('node', osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator);

  return {
    'node': [node]
  };
};
