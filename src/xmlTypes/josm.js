module.exports = function (osmJson, options) {
  var returnObj = {
    'version': '0.6',
    'upload': 'true',
    'generator': ((options && options.generator) || 'geojsonToOsm')
  };
  for (var key in osmJson) {
    returnObj[key] = osmJson[key];
  }
  return {
    'osm': returnObj
  };
};
