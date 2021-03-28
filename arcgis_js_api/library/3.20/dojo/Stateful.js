/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/Stateful",["./_base/declare","./_base/lang","./_base/array","./when"],function(h,m,k,l){return h("dojo.Stateful",null,{_attrPairNames:{},_getAttrNames:function(a){var c=this._attrPairNames;return c[a]?c[a]:c[a]={s:"_"+a+"Setter",g:"_"+a+"Getter"}},postscript:function(a){a&&this.set(a)},_get:function(a,c){return"function"===typeof this[c.g]?this[c.g]():this[a]},get:function(a){return this._get(a,this._getAttrNames(a))},set:function(a,c){if("object"===typeof a){for(var b in a)a.hasOwnProperty(b)&&
"_watchCallbacks"!=b&&this.set(b,a[b]);return this}b=this._getAttrNames(a);var g=this._get(a,b);b=this[b.s];var e;"function"===typeof b?e=b.apply(this,Array.prototype.slice.call(arguments,1)):this[a]=c;if(this._watchCallbacks){var d=this;l(e,function(){d._watchCallbacks(a,g,c)})}return this},_changeAttrValue:function(a,c){var b=this.get(a);this[a]=c;this._watchCallbacks&&this._watchCallbacks(a,b,c);return this},watch:function(a,c){var b=this._watchCallbacks;if(!b)var g=this,b=this._watchCallbacks=
function(a,c,e,d){var f=function(b){if(b){b=b.slice();for(var d=0,f=b.length;d<f;d++)b[d].call(g,a,c,e)}};f(b["_"+a]);d||f(b["*"])};c||"function"!==typeof a?a="_"+a:(c=a,a="*");var e=b[a];"object"!==typeof e&&(e=b[a]=[]);e.push(c);var d={};d.unwatch=d.remove=function(){var a=k.indexOf(e,c);-1<a&&e.splice(a,1)};return d}})});