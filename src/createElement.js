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
    newTags.push({
      'k': tag,
      'v': tags[tag]
    });
  }
  clonedElement.tag = newTags;
  return clonedElement;
};

module.exports = function (type, id, changeset, version, geometry, tags, newIdGenerator) {
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

  return addTags(newElement, tags);
};
