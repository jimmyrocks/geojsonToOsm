var xmlJs = require('xmljs_trans_js');
var sequences = {};

module.exports = function (changeset, create, modify, remove, options) {
  console.log(changeset, create);
  var changesetJson = {
    'osmChange': {
      'version': '0.3',
      'generator': ((options && options.generator) || 'createChangeset'),
      'create': createOsm(create, changeset),
      'modify': modifyOsm(modify),
      'delete': removeOsm(remove)
    }
  };
  return xmlJs.xmlify(changesetJson, {
    'prettyPrint': (options && options.prettyPrint)
  });
};

var createOsm = function (data, changeset) {
  data = typeof data === 'string' ? JSON.parse(data) : data;
  var changes = {
    'node': [],
    'way': [],
    'relation': []
  };

  if (data && data.features) {
    data.features.forEach(function (feature) {
      var change = addFeature(feature.properties, feature.geometry, changeset, 0);
      for (var type in changes) {
        changes[type] = changes[type].concat(change[type] || []);
      }
    });
  }

  return changes;
};

var modifyOsm = function (data) {
  return {};
};
var removeOsm = function (data) {
  var removes = {
    'if-unused': 'true',
    'node': [],
    'way': [],
    'relation': []
  };
  return removes;
};

var getNext = function (type) {
  sequences[type] = sequences[type] ? sequences[type] - 1 : -1;
  return sequences[type];
};

