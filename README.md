# geojsontoosm

Usage:
geojsonToOsm(xmlType, changeset, geojson, options)

xmlType:
  any type in this directory: https://github.com/jimmyrocks/geojsonToOsm/tree/master/src/xmlTypes
  currently josm or changeset
  
changeset:
  the changeset number from OSM
  
geojson:
  the geojson you'd like to convert
  
options: (all optional)
  osmIdField: The id of the OSM Object (for modify or delete)
  versionField: The version of the object (for delete mostly, this appears be ignored by the OSM API otherwise)
  changeType: 'create','modify','delete' -- currently only create and delete are recognized
  prettyPrint: T/F decides if you want your OSM XML to be pretty printed
