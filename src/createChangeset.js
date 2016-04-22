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

var createElement = function (type, changeset, version, tags, lat, lon) {
  var createNode = function (element, lat, lon) {
    var round = function (value) {
      value = parseFloat(value, 10);
      return Math.round(value * 10000000) / 10000000;
    };
    element.lat = round(lat);
    element.lon = round(lon);
    return element;
  };

  var addTags = function (element, tags) {
    var ignoreTags = ['_primary_key', '_last_edit'];
    var tranforms = {
      'nps:unit_code': function (v) {
        return v.toLowerCase();
      }
    };
    var clonedElement = JSON.parse(JSON.stringify(element));
    var newTags = [];
    for (var tag in tags) {
      if (ignoreTags.indexOf(tag) === -1) {
        newTags.push({
          'k': tag,
          'v': tranforms[tag] ? tranforms[tag](tags[tag]) : tags[tag]
        });
      }
    }
    clonedElement.tag = newTags;
    return clonedElement;
  };

  var newElement = {
    'id': getNext(type),
    'version': version.toString(),
    'primaryKey': tags._primary_key,
    'lastEdit': tags._last_edit,
    'changeset': changeset
  };

  if (type === 'node') {
    newElement = createNode(newElement, lat, lon);
  } else {
    newElement.nd = [];
  }

  return addTags(newElement, tags);
};

var types = {
  'point': function (tags, geometry, changeset, version) {
    var coords = geometry.coordinates;
    var node = createElement('node', changeset, version, tags, coords[1], coords[0]);
    return {
      'node': [
        node
      ]
    };
  },
  'linestring': function (tags, geometry, changeset, version) {
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
  },
  multilinestring: function (tags, geometry, changeset, version) {
    // Hack this to only do the first of the line strings (this will need to make relations in the future)
    return types.polygon(tags, geometry, changeset, version);
  },
  polygon: function (tags, geometry, changeset, version) {
    // Basically the same thing as a line, but one level deeper
    var newGeometry = {
      coordinates: geometry.coordinates[0]
    };
    return types.linestring(tags, newGeometry, changeset, version);
  },
  multipolygon: function (tags, geometry, changeset, version) {
    // Basically the same thing as a multiLine, but maybe? one level deeper
    var newGeometry = {
      coordinates: geometry.coordinates[0]
    };
    return types.multilinestring(tags, newGeometry, changeset, version);
  }
};

var addFeature = function (tags, geometry, changeset, version) {
  if (types[geometry.type.toLowerCase()]) {
    return types[geometry.type.toLowerCase()](tags, geometry, changeset, version);
  } else {
    return {};
  }
};
