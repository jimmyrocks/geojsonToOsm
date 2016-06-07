var createElement = require('../createElement');

module.exports = function (id, changeset, version, geometry, tags, newIdGenerator, options) {
    var node = createElement('node', id, changeset, version, geometry, tags, newIdGenerator, options);
    return {
      'node': [node]
    };
};
