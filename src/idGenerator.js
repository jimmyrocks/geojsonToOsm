// Generates a new id for any feature
module.exports = function (initial, incrementBy) {
  var types = {};
  return function (type) {
    types[type] = types[type] === undefined ? initial : (types[type] + incrementBy);
    return types[type];
  };
};
