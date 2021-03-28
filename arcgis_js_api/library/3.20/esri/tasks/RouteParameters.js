// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/tasks/RouteParameters","dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/has ../kernel ../lang ../graphicsUtils ./NATypes".split(" "),function(c,f,d,g,h,k,e,l){c=c(null,{declaredClass:"esri.tasks.RouteParameters",accumulateAttributes:null,attributeParameterValues:null,barriers:null,directionsLanguage:null,directionsLengthUnits:null,directionsOutputType:null,directionsStyleName:null,directionsTimeAttribute:null,doNotLocateOnRestrictedElements:!0,findBestSequence:null,ignoreInvalidLocations:null,
impedanceAttribute:null,outputLines:"esriNAOutputLineTrueShape",outputGeometryPrecision:null,outputGeometryPrecisionUnits:null,outSpatialReference:null,polygonBarriers:null,polylineBarriers:null,preserveFirstStop:null,preserveLastStop:null,restrictionAttributes:null,restrictUTurns:null,returnBarriers:!1,returnDirections:!1,returnPolygonBarriers:!1,returnPolylineBarriers:!1,returnRoutes:!0,returnStops:!1,returnZ:!0,startTime:null,startTimeIsUTC:null,timeWindowsAreUTC:null,stops:null,useHierarchy:null,
useTimeWindows:null,travelMode:null,toJson:function(c){var a={returnDirections:this.returnDirections,returnRoutes:this.returnRoutes,returnZ:this.returnZ,returnStops:this.returnStops,returnBarriers:this.returnBarriers,returnPolygonBarriers:this.returnPolygonBarriers,returnPolylineBarriers:this.returnPolylineBarriers,attributeParameterValues:this.attributeParameterValues&&d.toJson(this.attributeParameterValues),outSR:this.outSpatialReference?this.outSpatialReference.wkid||d.toJson(this.outSpatialReference.toJson()):
null,outputLines:this.outputLines,findBestSequence:this.findBestSequence,preserveFirstStop:this.preserveFirstStop,preserveLastStop:this.preserveLastStop,useTimeWindows:this.useTimeWindows,startTime:this.startTime?this.startTime.getTime():null,startTimeIsUTC:this.startTimeIsUTC,timeWindowsAreUTC:this.timeWindowsAreUTC,accumulateAttributeNames:this.accumulateAttributes?this.accumulateAttributes.join(","):null,ignoreInvalidLocations:this.ignoreInvalidLocations,impedanceAttributeName:this.impedanceAttribute,
restrictionAttributeNames:this.restrictionAttributes?this.restrictionAttributes.join(","):null,restrictUTurns:this.restrictUTurns,useHierarchy:this.useHierarchy,directionsLanguage:this.directionsLanguage,outputGeometryPrecision:this.outputGeometryPrecision,outputGeometryPrecisionUnits:this.outputGeometryPrecisionUnits,directionsLengthUnits:l.LengthUnit[this.directionsLengthUnits],directionsTimeAttributeName:this.directionsTimeAttribute,directionsStyleName:this.directionsStyleName,travelMode:"object"===
typeof this.travelMode?d.toJson(this.travelMode):this.travelMode},b=this.stops;"esri.tasks.FeatureSet"===b.declaredClass&&0<b.features.length?a.stops=d.toJson({type:"features",features:e._encodeGraphics(b.features,c&&c["stops.features"]),doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}):"esri.tasks.DataLayer"===b.declaredClass?a.stops=b:"esri.tasks.DataFile"===b.declaredClass&&(a.stops=d.toJson({type:"features",url:b.url,doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}));
if(this.directionsOutputType)switch(this.directionsOutputType.toLowerCase()){case "complete":a.directionsOutputType="esriDOTComplete";break;case "complete-no-events":a.directionsOutputType="esriDOTCompleteNoEvents";break;case "instructions-only":a.directionsOutputType="esriDOTInstructionsOnly";break;case "standard":a.directionsOutputType="esriDOTStandard";break;case "summary-only":a.directionsOutputType="esriDOTSummaryOnly";break;default:a.directionsOutputType=this.directionsOutputType}b=function(a,
b){return a?"esri.tasks.FeatureSet"===a.declaredClass?0<a.features.length?d.toJson({type:"features",features:e._encodeGraphics(a.features,c&&c[b])}):null:"esri.tasks.DataLayer"===a.declaredClass?a:"esri.tasks.DataFile"===a.declaredClass?d.toJson({type:"features",url:a.url}):d.toJson(a):null};this.barriers&&(a.barriers=b(this.barriers,"barriers.features"));this.polygonBarriers&&(a.polygonBarriers=b(this.polygonBarriers,"polygonBarriers.features"));this.polylineBarriers&&(a.polylineBarriers=b(this.polylineBarriers,
"polylineBarriers.features"));return k.filter(a,function(a){if(null!==a)return!0})}});g("extend-esri")&&f.setObject("tasks.RouteParameters",c,h);return c});