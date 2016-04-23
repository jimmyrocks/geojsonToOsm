var multiLineString = function (tags, geometry, changeset, version) {
  // Hack this to only do the first of the line strings (this will need to make relations in the future)
  return types.polygon(tags, geometry, changeset, version);
};

multiLineString.elementType = 'relation';
module.exports = multiLineString;
