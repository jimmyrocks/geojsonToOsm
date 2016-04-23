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
    if (ignoreTags.indexOf(tag) === -1) {
      newTags.push({
        'k': tag,
        'v': tags[tag]
      });
    }
  }
  clonedElement.tag = newTags;
  return clonedElement;
};

module.exports = function (id, type, changeset, version, tags, lat, lon) {

  var newElement = {
    'id': id,
    'version': version.toString(),
    'changeset': changeset
  };

  if (type === 'node') {
    newElement = createNode(newElement, lat, lon);
  } else {
    newElement.nd = [];
  }

  return addTags(newElement, tags);
};

