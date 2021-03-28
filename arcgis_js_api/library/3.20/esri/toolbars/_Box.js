// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/toolbars/_Box","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/Color dojo/has dojo/dom-style dojox/gfx/Moveable dojox/gfx/matrix ../kernel ../lang ../geometry/Point ../geometry/Polyline ../symbols/SimpleMarkerSymbol ../geometry/webMercatorUtils ../geometry/jsonUtils ../graphic".split(" "),function(n,m,k,p,B,u,v,w,l,x,y,q,z,C,r,A,t){n=n(null,{declaredClass:"esri.toolbars._Box",constructor:function(d,a,b,c,e,f,g){this._graphic=d;this._map=a;this._toolbar=
b;this._scale=c;this._rotate=e;this._defaultEventArgs={};this._scaleEvent="Scale";this._rotateEvent="Rotate";this._uniformScaling=f;d=b._options;this._markerSymbol=d.boxHandleSymbol;this._lineSymbol=d.boxLineSymbol;this._moveStartHandler=m.hitch(this,this._moveStartHandler);this._firstMoveHandler=m.hitch(this,this._firstMoveHandler);this._moveStopHandler=m.hitch(this,this._moveStopHandler);this._moveHandler=m.hitch(this,this._moveHandler);this._isTextPoint=g;this._init()},destroy:function(){this._cleanUp();
this._graphic=this._map=this._toolbar=this._markerSymbol=this._lineSymbol=null},refresh:function(){this._draw()},suspend:function(){k.forEach(this._getAllGraphics(),function(d){d.hide()})},resume:function(){k.forEach(this._getAllGraphics(),function(d){d.show()});this._draw()},_init:function(){this._draw()},_cleanUp:function(){this._connects&&k.forEach(this._connects,p.disconnect);var d=this._toolbar._scratchGL;this._anchors&&k.forEach(this._anchors,function(a){d.remove(a.graphic);(a=a.moveable)&&
a.destroy()});this._box&&d.remove(this._box);this._box=this._anchors=this._connects=null},_draw:function(){if(this._graphic.getDojoShape()){var d=this._map,a=this._toolbar._scratchGL,b=this._getBoxCoords(),c=new z(d.spatialReference),e=m.clone(k.filter(b,function(b,a){return 8!==a&&0===a%2}));e[0]&&e.push([e[0][0],e[0][1]]);c.addPath(e);this._rotate&&c.addPath([b[1],b[8]]);this._box?this._box.setGeometry(c):(this._box=new t(c,this._lineSymbol),a.add(this._box));this._anchors?k.forEach(this._anchors,
function(a,c){this._scale||(c=8);var e=new q(b[c],d.spatialReference);a.graphic.setGeometry(e);var e=a.moveable,f=a.graphic.getDojoShape();f&&(e?f!==e.shape&&(e.destroy(),a.moveable=this._getMoveable(a.graphic,c)):a.moveable=this._getMoveable(a.graphic,c))},this):(this._anchors=[],this._connects=[],k.forEach(b,function(b,c){if(this._scale||!(8>c)){b=new q(b,d.spatialReference);var e=new t(b,this._markerSymbol);this._isTextPoint&&1===c%2&&e.hide();a.add(e);this._anchors.push({graphic:e,moveable:this._getMoveable(e,
c)})}},this))}else this._cleanUp()},_getBoxCoords:function(d){var a=this._map,b,c=[],e,f,g;if(this._isTextPoint){b=this._graphic.getNode().getBoundingClientRect();var h=a.__container.getBoundingClientRect();b=[{x:b.left-h.left,y:b.top-h.top},{x:b.right-h.left,y:b.top-h.top},{x:b.right-h.left,y:b.bottom-h.top},{x:b.left-h.left,y:b.bottom-h.top}]}else b=this._getTransformedBoundingBox(this._graphic);k.forEach(b,function(b,h,k){e=b;(f=k[h+1])||(f=k[0]);g={x:(e.x+f.x)/2,y:(e.y+f.y)/2};d||(e=a.toMap(e),
g=a.toMap(g));c.push([e.x,e.y]);c.push([g.x,g.y])});this._rotate&&(b=m.clone(c[1]),b=d?{x:b[0],y:b[1]}:a.toScreen({x:b[0],y:b[1],spatialReference:a.spatialReference}),b.y-=this._toolbar._options.rotateHandleOffset,d||(b=a.toMap(b)),c.push([b.x,b.y]));return c},_getTransformedBoundingBox:function(d){var a=this._map,b=d.geometry.getExtent(),c=d.geometry.spatialReference;d=new q(b.xmin,b.ymax,c);b=new q(b.xmax,b.ymin,c);d=a.toScreen(d);b=a.toScreen(b);return[{x:d.x,y:d.y},{x:b.x,y:d.y},{x:b.x,y:b.y},
{x:d.x,y:b.y}]},_getAllGraphics:function(){var d=[this._box];this._anchors&&k.forEach(this._anchors,function(a){d.push(a.graphic)});return d=k.filter(d,y.isDefined)},_getMoveable:function(d,a){var b=d.getDojoShape();if(b){var c=new w(b);c._index=a;this._connects.push(p.connect(c,"onMoveStart",this._moveStartHandler));this._connects.push(p.connect(c,"onFirstMove",this._firstMoveHandler));this._connects.push(p.connect(c,"onMoveStop",this._moveStopHandler));c.onMove=this._moveHandler;(b=b.getEventSource())&&
v.set(b,"cursor",this._toolbar._cursors["box"+a]);return c}},_moveStartHandler:function(d){this._toolbar["on"+(8===d.host._index?this._rotateEvent:this._scaleEvent)+"Start"](this._graphic)},_firstMoveHandler:function(d){this._toolbar._deactivateScrollWheel();var a=d.host._index,b=this._wrapOffset=d.host.shape._wrapOffsets[0]||0,c=this._graphic.getLayer()._getTransform(),e;d=k.map(this._getBoxCoords(!0),function(a){return{x:a[0]+b,y:a[1]}});e=this._isTextPoint?this._map.toScreen(this._graphic.geometry):
{x:d[1].x,y:d[3].y};this._centerCoord=l.multiplyPoint(l.invert(c),e);if(8===a)e=l.multiplyPoint(l.invert(c),d[1]),this._isTextPoint&&(this._centerCoord=this._deNormalizePoint(this._centerCoord,e)),this._startLine=[this._centerCoord,e],this._moveLine=m.clone(this._startLine);else if(e=l.multiplyPoint(l.invert(c),d[a]),c=l.multiplyPoint(l.invert(c),d[(a+4)%8]),this._isTextPoint&&(this._centerCoord=this._deNormalizePoint(this._centerCoord,e)),this._firstMoverToAnchor=Math.sqrt((e.x-this._centerCoord.x)*
(e.x-this._centerCoord.x)+(e.y-this._centerCoord.y)*(e.y-this._centerCoord.y)),this._startBox=c,this._startBox.width=d[4].x-d[0].x,this._startBox.height=d[4].y-d[0].y,this._moveBox=m.clone(this._startBox),this._xfactor=e.x>c.x?1:-1,this._yfactor=e.y>c.y?1:-1,1===a||5===a)this._xfactor=0;else if(3===a||7===a)this._yfactor=0;this._toolbar._beginOperation("BOX");this._toolbar["on"+(8===a?this._rotateEvent:this._scaleEvent)+"FirstMove"](this._graphic)},_moveHandler:function(d,a){var b=d.host._index,c=
this._defaultEventArgs,e,f,g,h;c.angle=0;c.scaleX=1;c.scaleY=1;if(8===b)e=this._startLine,f=this._moveLine,g=f[1],g.x+=a.dx,g.y+=a.dy,g=this._getAngle(e,f),this._isTextPoint&&(g+=this._graphic.symbol.angle),f=l.rotategAt(g,e[0]),this._graphic.getDojoShape().setTransform(f),c.transform=f,c.angle=g,c.around=e[0];else{e=this._startBox;f=this._moveBox;f.width+=a.dx*this._xfactor;f.height+=a.dy*this._yfactor;this._uniformScaling||this._isTextPoint?(e=f.x+this._xfactor*f.width,f=f.y+this._yfactor*f.height,
e=Math.sqrt((e-this._centerCoord.x)*(e-this._centerCoord.x)+(f-this._centerCoord.y)*(f-this._centerCoord.y)),this._scaleRatio=g=h=e/this._firstMoverToAnchor,e=this._centerCoord):(g=f.width/e.width,h=f.height/e.height,e={x:e.x,y:e.y});if(isNaN(g)||Infinity===g||-Infinity===g)g=1;if(isNaN(h)||Infinity===h||-Infinity===h)h=1;f=l.scaleAt(g,h,e);if(this._isTextPoint){var k=l.rotategAt(this._graphic.symbol.angle,e);this._graphic.getDojoShape().setTransform([k,f])}else this._graphic.getDojoShape().setTransform(f);
c.transform=f;c.scaleX=g;c.scaleY=h;c.around=e}this._toolbar["on"+(8===b?this._rotateEvent:this._scaleEvent)](this._graphic,c)},_moveStopHandler:function(d){this._toolbar._activateScrollWheel();var a=this._graphic,b=this._toolbar,c=b._geo?r.geographicToWebMercator(a.geometry):a.geometry,e=c.spatialReference,f=a.getDojoShape(),g=f.getTransform(),h=a.getLayer()._getTransform();this._isTextPoint?(a=this._graphic.symbol,8===d.host._index?a.angle+=this._getAngle(this._startLine,this._moveLine):a.font.setSize(Math.round(a.font.size*
this._scaleRatio*100)/100),this._graphic.setSymbol(a)):(c=c.toJson(),this._updateSegments(c.paths||c.rings,g,h,e),f.setTransform(null),c=A.fromJson(c),a.setGeometry(b._geo?r.webMercatorToGeographic(c,!0):c));this._draw();this._startLine=this._moveLine=this._startBox=this._moveBox=this._xfactor=this._yfactor=null;b._endOperation("BOX");this._defaultEventArgs.transform=g;b["on"+(8===d.host._index?this._rotateEvent:this._scaleEvent)+"Stop"](this._graphic,this._defaultEventArgs)},_updateSegments:function(d,
a,b,c){var e=this._map,f=this._wrapOffset||0;k.forEach(d,function(d){k.forEach(d,function(d){this._updatePoint(d,c,f,l,e,b,a)},this)},this)},_updatePoint:function(d,a,b,c,e,f,g){a=e.toScreen({x:d[0],y:d[1],spatialReference:a},!0);a.x+=b;a=c.multiplyPoint([f,g,c.invert(f)],a);a.x-=b;b=e.toMap(a);d[0]=b.x;d[1]=b.y},_getAngle:function(d,a){return 180*Math.atan2(a[0].y-a[1].y,a[0].x-a[1].x)/Math.PI-180*Math.atan2(d[0].y-d[1].y,d[0].x-d[1].x)/Math.PI},_deNormalizePoint:function(d,a){var b=this._map._getFrameWidth();
if(-1===b)return d;for(var c={x:d.x,y:d.y};Math.abs(c.x-a.x)>=b;)c.x=c.x<a.x?c.x+b:c.x-b;var e=Math.abs(c.x-a.x);Math.abs(c.x-a.x+b)<e?c.x+=b:Math.abs(c.x-a.x-b)<e&&(c.x-=b);return c}});u("extend-esri")&&m.setObject("toolbars._Box",n,x);return n});