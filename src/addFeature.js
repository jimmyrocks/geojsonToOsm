module.exports = function (tags, geometry, changeset, version) {
  if (types[geometry.type.toLowerCase()]) {
    return types[geometry.type.toLowerCase()](tags, geometry, changeset, version);
  } else {
    return {};
  }
};
