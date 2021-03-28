// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/editing/Add","dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ./EditOperationBase".split(" "),function(e,b,d,f,g,h){b=b(h,{declaredClass:"esri.dijit.editing.Add",type:"edit",label:"Add Features",constructor:function(a){a=a||{};a.featureLayer?(this._featureLayer=a.featureLayer,a.addedGraphics?this._addedGraphics=a.addedGraphics:console.error("In constructor of 'esri.dijit.editing.Add', no graphics provided")):console.error("In constructor of 'esri.dijit.editing.Add', featureLayer is not provided")},
updateObjectIds:function(a,c){this.updateIds(this._featureLayer,this._addedGraphics,a,c)},performUndo:function(){return this._featureLayer.applyEdits(null,null,this._addedGraphics).then(d.hitch(this,function(){return{layer:this._featureLayer,operation:this}}))},performRedo:function(){var a=e.map(this._addedGraphics,function(a){return a.attributes[this._featureLayer.objectIdField]},this);return this._featureLayer.applyEdits(this._addedGraphics,null,null).then(d.hitch(this,function(c,b,d){c=e.map(c,
function(a){return a.objectId});return{oldIds:a,addedIds:c,layer:this._featureLayer,operation:this}}))}});f("extend-esri")&&d.setObject("dijit.editing.Add",b,g);return b});