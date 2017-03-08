# geojsontoosm

##Usage:
```
geojsonToOsm(xmlType, changeset, geojson, options)
```

###xmlType:
* josm: Used for loading the output into JOSM. [More info](https://wiki.openstreetmap.org/wiki/JOSM_file_format)
* changeset: Used to directly push the data into the API. [More Info](https://wiki.openstreetmap.org/wiki/OsmChange)
New types can be added here: https://github.com/jimmyrocks/geojsonToOsm/tree/master/src/xmlTypes
  
###changeset:
  * the changeset number from OSM
  
###geojson:
  * the geojson you'd like to convert
  
###options: (all optional)
  * osmIdField: The id of the OSM Object (for modify or delete)
  * versionField: The version of the object (for delete mostly, this appears be ignored by the OSM API otherwise)
  * changeType: 'create','modify','delete' -- currently only create and delete are recognized
  * prettyPrint: T/F decides if you want your OSM XML to be pretty printed
  * returnJson: T/F decides to return XML or JSON (useful for debugging)
