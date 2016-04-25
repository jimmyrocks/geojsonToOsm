module.exports = function (osmJson, options) {
  var returnObj = {
    'version': '0.3',
    'generator': ((options && options.generator) || 'geojsonToOsm'),
    'create': {},
    'modify': {},
    'delete': {}
  };

  // Add the JSON
  for (var key in osmJson) {
    returnObj[options.changeType][key] = osmJson[key];
  }

  // Extra params for remove
  if (options.changeType === 'delete') {
    returnObj[options.changeType] = {
      'if-unused': 'true'
    };
  }
  return {
    'osmChange': returnObj
  };
};
