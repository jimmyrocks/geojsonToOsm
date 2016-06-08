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
  var clonedElement = JSON.parse(JSON.stringify(element));
  var newTags = [];
  for (var tag in tags) {
    if (tags[tag] || tags[tag] === 0 || tags[tag] === false) {
      if (tag === 'nps:unit_code') {
        tags[tag] = tags[tag].toLowerCase();
      }
      newTags.push({
        'k': tag,
        'v': tags[tag] === '*' ? 'yes' : tags[tag].toString()
      });
    }
  }
  clonedElement.tag = newTags;
  return clonedElement;
};
module.exports = function (type, osmId, foreignKey, osmVersion, changeset, geometry, tags, newIdGenerator) {
  var newElement = {
    'id': osmId === undefined ? newIdGenerator(type) : osmId,
    'version': osmVersion === undefined ? '1' : osmVersion.toString(),
    'foreignKey': foreignKey,
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

  return addTags(newElement, tags);
};
