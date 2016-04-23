var createElement = require('../createElement');

module.exports = function (id, changeset, version, geometry, tags, newIdGenerator) {
    var node = createElement('node', id, changeset, version, geometry, tags, newIdGenerator);
    return {
      'node': [node]
    };
};
