// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/editing/tools/Union","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../../../graphicsUtils ../../../graphic ../../../toolbars/draw ../Union ./ButtonToolBase ../../../kernel".split(" "),function(a,b,e,c,m,n,p,q,r,t){a=a([r],{declaredClass:"esri.dijit.editing.tools.Union",id:"btnFeatureUnion",_enabledIcon:"toolbarIcon unionIcon",_disabledIcon:"toolbarIcon unionIcon",_drawType:p.POLYLINE,_enabled:!0,_label:"NLS_unionLbl",_onClick:function(a){this._settings.editor._activeTool=
"UNION";a=e.filter(this._settings.layers,function(a){return"esriGeometryPolygon"===a.geometryType&&a.visible&&a._isMapAtVisibleScale()});var g=[],f=0;e.forEach(a,function(a,c){var d=a.getSelectedFeatures();2<=d.length&&(f++,this._settings.geometryService.union(m.getGeometries(d),b.hitch(this,function(c){var h=d.shift(),k=[],l=[];k.push(new n(h.toJson()));l.push(h.setGeometry(c));g.push({layer:a,updates:l,deletes:d,preUpdates:k});f--;if(0>=f)this.onApplyEdits(g,b.hitch(this,function(){if(this._settings.undoRedoManager){var a=
this._settings.undoRedoManager;e.forEach(this._edits,b.hitch(this,function(b){a.add(new q({featureLayer:b.layer,deletedGraphics:b.deletes,preUpdatedGraphics:b.preUpdates,postUpdatedGraphics:b.updates}))}),this)}this._settings.editor._selectionHelper.clearSelection(!1);this.onFinished()}))})))},this)}});c("extend-esri")&&b.setObject("dijit.editing.tools.Union",a,t);return a});