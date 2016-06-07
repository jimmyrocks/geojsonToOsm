var createNode = function (element, lat, lon) {
  var round = function (value) {
    value = parseFloat(value, 10);
    return Math.round(value * 10000000) / 10000000;
  };
  element.lat = round(lat);
  element.lon = round(lon);
  return element;
};

var addTags = function (element, tags, options) {
  var clonedElement = JSON.parse(JSON.stringify(element));
  var newTags = [];
  var blackList = []; //['_primary_key', '_last_edit'];
  if (options && options.blackList) {
    blackList = blackList.concat(options.blackList);
  }
  for (var tag in tags) {
    if (blackList.indexOf(tag) === -1) {
      if (tags[tag] || tags[tag] === 0 || tags[tag] === false) {
        if (tag === 'nps:unit_code') {
          tags[tag] = tags[tag].toLowerCase();
        }
        newTags.push({
          'k': tag,
          'v': tags[tag].toString()
        });
      }
    }
  }
  clonedElement.tag = newTags;
  return clonedElement;
};

module.exports = function (type, id, changeset, version, geometry, tags, newIdGenerator, options) {
  var newElement = {
    'id': id === undefined ? newIdGenerator(type) : id,
    'version': version === undefined ? '1' : version.toString(),
    'changeset': changeset
  };

  if (type === 'node') {
    var coords = geometry.coordinates;
    newElement = createNode(newElement, coords[1], coords[0]);
  } else if (type === 'way') {
    newElement.nd = [];
  } else {
    newElement.member = [];
  }

  return addTags(newElement, tags, options);
};
