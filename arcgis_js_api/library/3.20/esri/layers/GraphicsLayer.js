// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/GraphicsLayer","dojo/_base/declare dojo/_base/connect dojo/_base/lang dojo/_base/array dojo/dom-attr dojo/dom-construct dojo/dom-style dojo/dom dojox/gfx dojox/gfx/matrix ./gfxSniff!esri-svg?dojox/gfx/filters ./layer ../kernel ../lang ../sniff ../Color ../domUtils ../symbols/MarkerSymbol ../symbols/SimpleMarkerSymbol ../geometry/Point ../geometry/ScreenPoint ../geometry/Extent ../geometry/mathUtils ../geometry/screenUtils ../PluginTarget ./gfxSniff!esri-svg?dojox/gfx/svgext".split(" "),
function(G,q,y,t,P,S,D,Z,H,I,z,aa,A,U,E,ba,K,T,C,V,Q,J,W,R,ca){var N,L=-1!==H.renderer.toLowerCase().indexOf("svg"),M=-1!==H.renderer.toLowerCase().indexOf("canvas"),v=9>E("ie"),X=E("esri-touch");T=G(null,{declaredClass:"esri.layers._GraphicsContainer",_setMap:function(a,c){var b,d=this._connects=[];this._map=a;this._useWillChange="css-transforms"===a.navigationMode&&L&&E("esri-will-change");M?(b=S.create("div",{style:"overflow: visible; position: absolute;"},c),this._surface={getEventSource:function(){return b}},
d.push(q.connect(b,"onmousedown",this,this._canvasDownHandler)),d.push(q.connect(b,"onmouseup",this,this._canvasUpHandler)),d.push(q.connect(b,"onclick",this,this._canvasClickHandler)),N.prototype._canvas=!0):(b=(this._surface=H.createSurface(c,a.width,a.height)).getEventSource(),this._useWillChange&&D.set(b,"will-change","transform"),D.set(b=v?b.parentNode:b,{overflow:"visible",position:"absolute"}));d.push(q.connect(a,"onResize",this,"_onResizeHandler"));this._useWillChange&&(d.push(q.connect(a,
"onPan",this,"_onPanHandler")),d.push(q.connect(a,"onPanEnd",this,"_onPanEndHandler")),d.push(q.connect(a,"onExtentChange",this,"_onExtentChangeHandler")));return b},_onPanHandler:function(a,c){var b=this._map.__visibleRect,d=b.x+c.x,b=b.y+c.y;this._panDx=d;this._panDy=b;D.set(this._surface.getEventSource(),A._css.names.transform,A._css.translate(d,b))},_onPanEndHandler:function(a,c){var b=this._map.__visibleRect,d=b.x,b=b.y;this._panDx=d;this._panDy=b;D.set(this._surface.getEventSource(),A._css.names.transform,
A._css.translate(d,b))},_onExtentChangeHandler:function(a,c,b,d){b&&(this._panDy=this._panDx=0,D.set(this._surface.getEventSource(),A._css.names.transform,A._css.translate(0,0)))},_getTransform:function(){return{dx:this._panDx||0,dy:this._panDy||0}},_onResizeHandler:function(a,c,b){a=this._surface.getEventSource();var d=this._map,e;v&&D.set(a=a.parentNode,{width:c+"px",height:b+"px",clip:"rect(0px "+c+"px "+b+"px 0px)"});P.set(a,"width",c);P.set(a,"height",b);this._surface.declaredClass||t.forEach(a.childNodes,
function(a){P.set(a,"width",c);P.set(a,"height",b)});d.loaded&&(d.graphics.suspended||(d.graphics._resized=!0),t.forEach(d.graphicsLayerIds,function(a){e=d.getLayer(a);e.suspended||(e._resized=!0,e._childLayer&&(e._childLayer._resized=!0));e._updateSVGFilters(null,null,c,b)}))},_cleanUp:function(){t.forEach(this._connects,q.disconnect,q);this._map=this._surface=null},_processEvent:function(a){var c=this._map;a.screenPoint=new Q(a.pageX-c.position.x,a.pageY-c.position.y);a.mapPoint=c.toMap(a.screenPoint)},
_canvasDownHandler:function(a){this._processEvent(a);this._downPt=a.screenPoint.x+","+a.screenPoint.y},_canvasUpHandler:function(a){this._processEvent(a);this._upPt=a.screenPoint.x+","+a.screenPoint.y},_tolerance:15,_isPrimaryMatch:function(a,c,b,d){if(!a.visible||!c)return!1;var e=c.getTransformedBoundingBox(),f;return e?(f=new J(e[0].x,e[0].y,e[2].x,e[2].y),delete f.spatialReference,X?f.intersects(b):f.contains(d)):t.some(c.children||[],function(a){e=a.getTransformedBoundingBox();f=new J(e[0].x,
e[0].y,e[2].x,e[2].y);delete f.spatialReference;return X?f.intersects(b):f.contains(d)})},_canvasClickHandler:function(a){if(this._downPt&&this._upPt&&this._downPt===this._upPt){this._processEvent(a);var c=this._map,b=t.map(c.graphicsLayerIds,function(a){return c.getLayer(a)});b.push(c.graphics);b.reverse();var b=t.filter(b,function(a){return a.loaded&&a._mouseEvents&&!a.suspended&&(!U.isDefined(a.opacity)||0<a.opacity)}),d=a.screenPoint,e=this._tolerance,f=d.x-e,g=d.y+e,h=d.x+e,e=d.y-e,k=new J(f,
e,h,g),f=c.toMap(new Q(f,g)),h=c.toMap(new Q(h,e)),g=f.spatialReference._getInfo(),l=new J(J.prototype._normalizeX(f.x,g).x,f.y,J.prototype._normalizeX(h.x,g).x,h.y,f.spatialReference),m;delete k.spatialReference;t.some(b,function(a){a=t.filter(a.graphics,function(a){return this._isPrimaryMatch(a,a.getDojoShape(),k,d)||!(!a._bgShape||!this._isPrimaryMatch(a,a._bgShape,k,d))},this);a.reverse();if(0<a.length){var b;t.some(a,function(a){return a.geometry&&l.intersects(a.geometry)?(b=a,!0):!1});if(b)return m=
b,!0}return!1},this);m&&(b=m.getLayer())&&(a.graphic=m,b.onClick(a))}}});N=G(aa,{declaredClass:"esri.layers._GraphicsLayer",managedSuspension:!0,surfaceType:M?"canvas-2d":H.renderer,_eventMap:{"graphic-add":["graphic"],"graphic-remove":["graphic"],"renderer-change":["renderer"]},constructor:function(a,c){a&&(y.isString(a)||y.isObject(a)&&(a.layerDefinition||a.query))&&(a=c);this._params=y.mixin({displayOnPan:!0,drawMode:!0,styling:!0},a||{});var b=this._params.dataAttributes;"string"===typeof b&&
(b=[b]);this.styling=L?this._params.styling:!0;this.dataAttributes=b;this.infoTemplate=a&&a.infoTemplate;this.graphics=[];this._draw=y.hitch(this,this._draw);this._refresh=y.hitch(this,this._refresh);this.registerConnectEvents()},getNode:function(){return this._div&&this._div.getEventSource()},setDrawMode:function(a){this._params.drawMode=a},renderer:null,_setMap:function(a,c){this.inherited(arguments);this._map=a;this._wrap=a.wrapAround180;this._srInfo=a.spatialReference._getInfo();this._svgFilters=
{};this._canvas?(c=H.createSurface(c.getEventSource(),a.width,a.height),D.set(c.rawNode,"position","absolute"),this._div=c.createGroup(),this._renderProto=this._div.constructor.prototype._render,this._div._render=y.hitch(this,this._canvasRender)):this._div=c.createGroup();this._bgGroup=this._div.createGroup();this._div.getEventSource().id=this.id+"_layer";this._initOpacity();return this._div},_unsetMap:function(a,c){t.forEach(this.graphics,function(a){a._shape=null});this._canvas?(c=this._div.getParent(),
c._parent={},S.destroy(c.rawNode),c.destroy()):(this._div.clear(),c.remove(this._div),S.destroy(this._div.getEventSource()));this._map=this._div=this._svgFilters=null;clearTimeout(this._wakeTimer);this._wakeTimer=null;this._disableDrawConnectors();this.inherited(arguments)},_initOpacity:function(){var a=this.opacity;U.isDefined(a)&&1>a&&this.setOpacity(a,!0)},_onZoomStartHandler:function(){K.hide(this._div.getEventSource())},_onExtentChangeHandler:function(a,c,b,d){clearTimeout(this._wakeTimer);this._wakeTimer=
null;b?(a=this._map.__visibleRect,c=this._div,this._evalSDRenderer(),this._refresh(!0),this._updateTransform(c,a.x,a.y,!0),this._renderProto&&c.surface.pendingRender?this._dirty=!0:this.suspended||K.show(c.getEventSource())):this._resized&&(this._resized=!1,this._refresh(!1));if(0<this.graphics.length)this.onUpdate()},_canvasRender:function(){var a=this._div;this._dirty&&(delete this._dirty,this.suspended||K.show(a.getEventSource()));return this._renderProto.apply(a,arguments)},_refresh:function(a){var c=
this.graphics,b=c.length,d,e=this._draw;for(d=0;d<b;d++)e(c[d],a)},refresh:function(){this._refresh(!0)},redraw:function(){this._refresh(!0)},_getTransform:function(){var a={dx:0,dy:0};this._map&&(this._map._gc._useWillChange?a=this._map._gc._getTransform():this._div&&(a=this._div.getTransform()));return a},_onPanHandler:function(a,c){this._panDx=c.x;this._panDy=c.y;var b=this._map.__visibleRect;this._updateTransform(this._div,b.x+c.x,b.y+c.y)},_onPanEndUpdateHandler:function(a,c){var b=this._map.__visibleRect;
this._params._child||c.x===this._panDx&&c.y===this._panDy?this._updateSVGFilters(-b.x,-b.y):this._updateTransform(this._div,b.x,b.y,!0);this._refresh(!1);if(this.graphics.length)this.onUpdate()},_onPanStartHandler:function(){K.hide(this._div.getEventSource())},_onPanEndHandler:function(){var a=this._map.__visibleRect,c=this._div;this._updateTransform(c,a.x,a.y,!0);this._refresh(!1);this._renderProto&&c.surface.pendingRender?this._dirty=!0:K.show(c.getEventSource());if(this.graphics.length)this.onUpdate()},
_updateTransform:function(a,c,b,d){this._map._gc._useWillChange||a.setTransform(I.translate({x:c,y:b}));d&&this._updateSVGFilters(-c,-b)},onSuspend:function(){this.inherited(arguments);K.hide(this._div.getEventSource());clearTimeout(this._wakeTimer);this._wakeTimer=null;this._disableDrawConnectors()},onResume:function(a){this.inherited(arguments);a.firstOccurrence&&this._evalSDRenderer();this._enableDrawConnectors();this._wakeTimer=this._wakeTimer||setTimeout(y.hitch(this,function(){this.suspended||
this._map.__zooming||this._onExtentChangeHandler(null,null,!0)}),0)},_enableDrawConnectors:function(){var a=this._map,c=q.connect;this._disableDrawConnectors();this._params.displayOnPan?(this._params._child||(this._onPanHandler_connect=c(a,"onPan",this,"_onPanHandler")),this._onPanEndHandler_connect=c(a,"onPanEnd",this,"_onPanEndUpdateHandler")):(this._onPanStartHandler_connect=c(a,"onPanStart",this,"_onPanStartHandler"),this._onPanEndHandler_connect=c(a,"onPanEnd",this,"_onPanEndHandler"));this._onZoomStartHandler_connect=
c(a,"onZoomStart",this,"_onZoomStartHandler");this._onExtentChangeHandler_connect=c(a,"onExtentChange",this,"_onExtentChangeHandler")},_disableDrawConnectors:function(){var a=q.disconnect;a(this._onExtentChangeHandler_connect);a(this._onZoomStartHandler_connect);a(this._onPanHandler_connect);a(this._onPanStartHandler_connect);a(this._onPanEndHandler_connect);this._onExtentChangeHandler_connect=this._onZoomStartHandler_connect=this._onPanHandler_connect=this._onPanStartHandler_connect=this._onPanEndHandler_connect=
null},_updateExtent:function(a){var c=a.geometry;if(!c)a._extent=null;else if(!(a._extent=c.getExtent())){var b,d;if("esri.geometry.Point"===c.declaredClass)b=c.x,d=c.y;else if("esri.geometry.Multipoint"===c.declaredClass)b=c.points[0][0],d=c.points[0][1];else{a._extent=null;return}a._extent=new J(b,d,b,d,c.spatialReference)}},_intersects:function(a,c,b){var d=a.spatialReference,e=c.spatialReference,f=d&&e&&!d.equals(e)&&d._canProject(e)&&4326===e.wkid;if(this._wrap&&!b){b=[];var d=a._getFrameWidth(),
g=this._srInfo,h=a._clip?a._getAvailExtent():a.extent,k,l,m,p,n=[];k=c._partwise;f&&(h=a.geographicExtent,g=e._getInfo());a=h._getParts(g);if(k&&k.length)for(c=[],e=0,f=k.length;e<f;e++)c=c.concat(k[e]._getParts(g));else c=c._getParts(g);e=0;for(f=c.length;e<f;e++)for(m=c[e],g=0,h=a.length;g<h;g++)if(p=a[g],p.extent.intersects(m.extent))for(k=0,l=m.frameIds.length;k<l;k++)b.push((p.frameIds[0]-m.frameIds[k])*d);e=0;for(f=b.length;e<f;e++)k=b[e],t.indexOf(b,k)===e&&n.push(k);return n.length?n:null}return(f?
a.geographicExtent:a.extent).intersects(c)?[0]:null},_defaultMarker:{type:"simplemarkersymbol",style:"square",size:1,xoffset:0,yoffset:0,angle:0},_draw:function(a,c){if(this._params.drawMode&&this._map&&!this.suspended&&!this._map.__zooming&&!this._resized)try{var b=a._extent,d,e,f=!L||this.styling,g=L&&this.dataAttributes,h=a.getDojoShape(),k;if(a.visible&&b&&(d=this._intersects(this._map,b,a.geometry._originOnly))&&(e=f?this._getSymbol(a):this._defaultMarker)){if(a._offsets&&a._offsets.join(",")===
d.join(",")?k=!0:a._offsets=d,!h||c||!k){var l=a.geometry.type,b={graphic:a},m=a._bgShape,p=f&&!a.symbol?this._getRenderer(a):null,n=p&&p.backgroundFillSymbol;if("point"===l)this._isInvalidShape(e,h)&&this._removeShape(a),a._shape=this._drawPoint(this._div,a.geometry,e,a.getDojoShape(),d,p,a),f&&this._symbolizePoint(a.getDojoShape(),e,p,a);else if("multipoint"===l)this._drawMarkers(a,e,d,p),f&&this._symbolizeMarkers(a,e,p);else{var r,l=e,w,F,O;f&&(l=(r="simplemarkersymbol"===e.type||"picturemarkersymbol"===
e.type||"textsymbol"===e.type?e:null)?n:e);f&&l&&-1<l.type.indexOf("fillsymbol")&&(w=this._bgGroup,O=!(!w||!r));m&&!O&&this._removeBgShape(a);l&&(!O&&this._isInvalidShape(l,a._shape)&&this._removeShape(a,!1),F=this._drawShape(a,d,w||this._div,O?m:a.getDojoShape()),f&&this._symbolizeShape(F,l,p,l===n,a),a[O?"_bgShape":"_shape"]=F);if(r){this._isInvalidShape(r,a._shape)&&this._removeShape(a,!1);var Y=a.geometry.getCentroid();(F=Y&&this._drawPoint(this._div,Y,r,a._shape,d,p,a))&&this._symbolizePoint(F,
r,p,a);a._shape=F}}M||(a._bgShape&&this._initNode(a,a._bgShape,a._bgShape!==m,b,g),a._shape&&this._initNode(a,a._shape,a._shape!==h,b,g));b.node=a.getNode();this.onGraphicDraw(b)}}else h&&this._removeShape(a)}catch(da){this._errorHandler(da,a)}},_initNode:function(a,c,b,d,e){if(c=c&&c.getNode())c.e_graphic=a,this._addDataAttrs(a,e,c),b&&(d.node=c,this.onGraphicNodeAdd(d))},_removeShape:function(a,c,b){var d=a.getDojoShape(),e=d&&d.getNode();d&&!b&&(d.removeShape(),d.destroy());a._shape=a._offsets=
null;!1!==c&&this._removeBgShape(a,b);if(e&&(e.e_graphic=null,!M))this.onGraphicNodeRemove({graphic:a,node:e})},_removeBgShape:function(a,c){var b=a._bgShape,d=b&&b.getNode();b&&!c&&(b.removeShape(),b.destroy());a._bgShape=null;if(d&&(d.e_graphic=null,!M))this.onGraphicNodeRemove({graphic:a,node:d})},_addDataAttrs:function(a,c,b){var d=a.attributes,e,f=c?c.length:0,g=this._getRenderer(a);if(b&&d){for(e=0;e<f;e++)(b=c[e])&&a.attr("data-"+b,d[b]);!this.styling&&g&&(g.getBreakIndex?(c=g.getBreakIndex(a),
a.attr("data-class-break",-1!==c?c:null)):g.getUniqueValueInfo&&(c=g.getUniqueValueInfo(a),a.attr("data-unique-value",c?c.value:null)))}},_drawShape:function(a,c,b,d){a=a.geometry;var e=a.type,f=this._map,g=f.extent,h=f.width,k=f.height,f=f.__visibleRect,l=[],m,p;m="extent"===e;if("rect"===e||m)l={x:0,y:0,spatialReference:a.spatialReference},l.x=m?a.xmin:a.x,l.y=m?a.ymax:a.y,e=R.toScreenPoint(g,h,k,l),l.x=m?a.xmax:a.x+a.width,l.y=m?a.ymin:a.y+a.height,a=R.toScreenPoint(g,h,k,l),c={x:e.x-f.x+c[0],
y:e.y-f.y,width:Math.abs(a.x-e.x),height:Math.abs(a.y-e.y)},0===c.width&&(c.width=1),0===c.height&&(c.height=1),d=this._drawRect(b,d,c);else if("polyline"===e||"polygon"===e){m=0;for(p=c.length;m<p;m++)l=l.concat(R._toScreenPath(g,h,k,a,-f.x+c[m],-f.y));d=this._drawPath(b,d,l);this._rendererLimits&&("polyline"===e?this._clipPolyline(d,a):this._clipPolygon(d,a))}return d},_drawRect:function(a,c,b){return c?c.setShape(b):a.createRect(b)},_drawImage:function(a,c,b){return c?c.setShape(b):a.createImage(b)},
_drawCircle:function(a,c,b){return c?c.setShape(b):a.createCircle(b)},_drawPath:function(){return v?function(a,c,b,d){b=d?b:b.join(" ");if(c)return c.setShape(b);c=a.createObject(d?H.Path:H.EsriPath,b);a._overrideSize(c.getEventSource());return c}:function(a,c,b,d){b=d?b:b.join(" ");return c?c.setShape(b):a.createPath(b)}}(),_drawText:function(a,c,b){return c?c.setShape(b):a.createText(b)},_evalSDRenderer:function(a){var c=this._map,b=this.renderer,d,e=this._rndForScale;c&&c.loaded&&b&&b.getRendererInfo&&
(d="zoom"===b.rangeType?b.getRendererInfoByZoom(c.getZoom()):b.getRendererInfoByScale(c.getScale()));this._rndForScale=d&&d.renderer;(c=this._getRenderer())&&c.prepareForViewChange();a||this._rndForScale==e||this.emit("renderer-change",{renderer:this._rndForScale})},_getRenderer:function(a){var c=this._rndForScale||this.renderer;a&&c&&c.getObservationRenderer&&(c=c.getObservationRenderer(a));return c},_getSymbol:function(a){var c=this._getRenderer();return a.symbol||c&&c.getSymbol(a)},_getVariable:function(a,
c,b){var d;a&&(d=(a=a.getVisualVariablesForType(c,b))&&a[0]);return d},_applyOpacity:function(a,c,b,d){c=c.getOpacity(d,{opacityInfo:b});null!=c&&(a=new ba(a),a.a=c);return a},_symbolizeShape:function(a,c,b,d,e){var f=c.getStroke(),g=c.getFill(),h=c.type,k,l,m=-1!==h.indexOf("linesymbol"),p=-1!==h.indexOf("fillsymbol")?null:this._getVariable(b,"sizeInfo",!1),n=this._getVariable(b,"colorInfo",!1),r=this._getVariable(b,"opacityInfo",!1);c=m?"none"!==c.style:c.outline&&"none"!==c.outline.style;var w=
m?null:this._getVariable(b,"sizeInfo","outline"),p=(p=d?w:w||p)?b.getSize(e,{sizeInfo:p,resolution:this._map.getResolutionInMeters(),scale:this._map.getScale()}):null;d&&(n=r=null);(n||r)&&"picturefillsymbol"!==h&&(m?(k=f&&f.color,n&&(k=b.getColor(e,{colorInfo:n})||k),k&&r&&(k=this._applyOpacity(k,b,r,e))):g&&g.toCss&&(l=g,n&&(l=b.getColor(e,{colorInfo:n})||l),l&&r&&(l=this._applyOpacity(l,b,r,e))));a.setStroke(!c||null==p&&!k?f:y.mixin({},f,null!=p?{width:p}:null,k&&{color:k})).setFill(l||g)},_smsToPath:function(){return v?
function(a,c,b,d,e,f,g,h,k){switch(c){case a.STYLE_SQUARE:return["M",e+","+g,"L",f+","+g,f+","+h,e+","+h,"X","E"];case a.STYLE_CROSS:return["M",b+","+g,"L",b+","+h,"M",e+","+d,"L",f+","+d,"E"];case a.STYLE_X:return["M",e+","+g,"L",f+","+h,"M",e+","+h,"L",f+","+g,"E"];case a.STYLE_DIAMOND:return["M",b+","+g,"L",f+","+d,b+","+h,e+","+d,"X","E"];case a.STYLE_TARGET:return["M",e+","+g,"L",f+","+g,f+","+h,e+","+h,e+","+g,"M",e-k+","+d,"L",e+","+d,"M",b+","+(g-k),"L",b+","+g,"M",f+k+","+d,"L",f+","+d,"M",
b+","+(h+k),"L",b+","+h,"E"]}}:function(a,c,b,d,e,f,g,h,k){switch(c){case a.STYLE_SQUARE:return["M",e+","+g,f+","+g,f+","+h,e+","+h,"Z"];case a.STYLE_CROSS:return["M",b+","+g,b+","+h,"M",e+","+d,f+","+d];case a.STYLE_X:return["M",e+","+g,f+","+h,"M",e+","+h,f+","+g];case a.STYLE_DIAMOND:return["M",b+","+g,f+","+d,b+","+h,e+","+d,"Z"];case a.STYLE_TARGET:return["M",e+","+g,f+","+g,f+","+h,e+","+h,e+","+g,"M",e-k+","+d,e+","+d,"M",b+","+(g-k),b+","+g,"M",f+k+","+d,f+","+d,"M",b+","+(h+k),b+","+h]}}}(),
_pathStyles:{square:1,cross:1,x:1,diamond:1,target:1},_typeMaps:{picturemarkersymbol:"image",picturefillsymbol:"path",simplefillsymbol:"path",simplelinesymbol:"path",cartographiclinesymbol:"path",textsymbol:"text"},_isInvalidShape:function(a,c){var b=c&&c.shape&&c.shape.type,d=a&&a.type,e=a&&a.style;"rect"===b&&(b="path");d&&(e=this._typeMaps[d]||e);this._pathStyles[e]&&(e="path");return"shieldlabelsymbol"===d?!0:!(!b||!e||b===e)},_drawPoint:function(a,c,b,d,e,f,g){var h=b.type,k=this._map,l=k.__visibleRect,
m=R.toScreenPoint(k.extent,k.width,k.height,c).offset(-l.x+e[0],-l.y),l=m.x,p=m.y,n;c=[];var r,w=this._getVariable(f,"rotationInfo",!1),w=w?f.getRotationAngle(g,{rotationInfo:w}):null,F=this._getVariable(f,"sizeInfo",!1),k=F?f.getSize(g,{sizeInfo:F,shape:b.style,resolution:k.getResolutionInMeters(),scale:k.getScale()}):null;w&&c.push(I.rotategAt(w,m));if(0!==b.xoffset||0!==b.yoffset)r=I.translate(b.xoffset,-b.yoffset),c.push(r);0!==b.angle&&c.push(I.rotategAt(b.angle,m));if("simplemarkersymbol"===
h)switch(n=b.style,f=Math.round,k=null!=k?k:b.size,n){case C.STYLE_SQUARE:case C.STYLE_CROSS:case C.STYLE_X:case C.STYLE_DIAMOND:b=isNaN(k)?16:k/2;n=this._drawPath(a,d,this._smsToPath(C,n,l,p,f(l-b),f(l+b),f(p-b),f(p+b)));break;case C.STYLE_TARGET:g=b._targetWidth/2;m=b._targetHeight/2;n=this._drawPath(a,d,this._smsToPath(C,n,l,p,f(l-g),f(l+g),f(p-m),f(p+m),b._spikeSize));break;case C.STYLE_PATH:n=this._drawPath(a,d,b.path,!0);b=n.getBoundingBox();a=this._getScaleMatrix(b,k);1===a.xx&&1===a.yy||c.push(I.scaleAt(a.xx,
a.yy,m));c.push(I.translate(-(b.x+b.width/2)+l,-(b.y+b.height/2)+p));break;default:b=isNaN(k)?16:k/2,n=this._drawCircle(a,d,{cx:l,cy:p,r:b})}else if("shieldlabelsymbol"===h)n=b.width,m=b.height,d=a.createGroup(),n=a.createImage({x:l-n/2,y:p-m/2,width:n,height:m,src:b.url}),d.add(n),null!=b.font&&(p+=.2*b.getHeight(),a=a.createText({type:"text",text:b.text,x:l,y:p,align:"middle",decoration:b.decoration,rotated:b.rotated,kerning:b.kerning}),a.setFont(b.font),a.setFill(b.color),d.add(a)),n=d;else if("picturemarkersymbol"===
h){if(null==k?(n=b.width,m=b.height):(m=k,n=b.width/b.height*m,r&&(null!=r.dx&&(r.dx=r.dx/b.width*n),null!=r.dy&&(r.dy=r.dy/b.height*m))),n=this._drawImage(a,d,{x:l-n/2,y:p-m/2,width:n,height:m,src:b.url}),L&&(a=n.getNode()))b=(b=this._getVariable(f,"opacityInfo",!1))?f.getOpacity(g,{opacityInfo:b}):null,null!=b?a.setAttribute("opacity",b):a.setAttribute("opacity",1)}else"textsymbol"===h&&(f=b.font,null!=k&&f&&(f=new f.constructor(f.toJson()),f.setSize(k)),n=this._drawText(a,d,{type:"text",text:b.text,
x:l,y:p,align:b.getSVGAlign(),decoration:b.decoration||f&&f.decoration,rotated:b.rotated,kerning:b.kerning}),f&&n.setFont(f),L&&(a=n.getNode(),l=b.getSVGBaseline(),p=b.getSVGBaselineShift(),a&&(a.setAttribute("dominant-baseline",l),p&&a.setAttribute("baseline-shift",p),this._applyHalo(n,b.haloColor,b.haloSize))));n.setTransform(I.multiply(c));n._wrapOffsets=e;return n},_applyHalo:function(a,c,b){var d=c&&b?this._getHaloId(c,b):null;a.setFilter(c&&b?E("webkit")||E("ff")?this._getDilateFilter(c,b,d):
this._getOffsetFilter(c,b,d):null)},_getDilateFilter:function(a,c,b){var d=this._getSVGFilter(b);d||(d=this._createSVGFilter({id:b},[z.feMorphology({operator:"dilate",radius:c,result:"dilated"}),z.feFlood({"flood-color":a.toCss(!0)}),z.feComposite({in2:"dilated",operator:"in",result:"composite"}),z.feMerge("composite","SourceGraphic")]));return d},_getOffsetFilter:function(a,c,b){var d=this._getSVGFilter(b);if(!d){a=a.toCss(!0);var d=this._offsetPrimitives,e,f=d.length,g=[],h=[];for(e=0;e<f;e++){var k=
d[e],l="offset"+k.dir,m="composite"+k.dir;h.push(m);g.push(z.feOffset({dx:k.dx*c,dy:k.dy*c,"in":"SourceAlpha",result:l}),z.feFlood({"flood-color":a}),z.feComposite({in2:l,operator:"in",result:m}))}h.push("SourceGraphic");g.push(z.feMerge.apply(z.feMerge,h));d=this._createSVGFilter({id:b},g)}return d},_offsetPrimitives:[{dir:"L",dx:-1,dy:0},{dir:"TL",dx:-1,dy:-1},{dir:"T",dx:0,dy:-1},{dir:"TR",dx:1,dy:-1},{dir:"R",dx:1,dy:0},{dir:"BR",dx:1,dy:1},{dir:"B",dx:0,dy:1},{dir:"BL",dx:-1,dy:1}],_getHaloId:function(a,
c){return"halo_"+this._map.id+"_"+this.id+"_"+a.r+"_"+a.g+"_"+a.b+"_"+a.a+"_"+c},_getSVGFilter:function(a){return this._svgFilters[a]},_createSVGFilter:function(a,c){var b=z.createFilter(a,c),d=this._map,e=d.__visibleRect;b.x=-e.x;b.y=-e.y;b.width=d.width;b.height=d.height;return this._svgFilters[a.id]=b},_updateSVGFilters:function(a,c,b,d){var e=this._svgFilters,f,g,h;for(g in e)if(f=e[g]){if(h=Z.byId(g))null!=a&&h.setAttribute("x",a),null!=c&&h.setAttribute("y",c),null!=b&&h.setAttribute("width",
b),null!=d&&h.setAttribute("height",d);null!=a&&(f.x=a);null!=c&&(f.y=c);null!=b&&(f.width=b);null!=d&&(f.height=d)}},_getScaleMatrix:function(a,c){var b=a.width/a.height,d=1,e=1;isNaN(c)||(1<b?(d=c/a.width,e=c/b/a.height):(e=c/a.height,d=c*b/a.width));return{xx:d,yy:e}},_symbolizePoint:function(a,c,b,d){var e=c.type,f=c.style;if("shieldlabelsymbol"!==e&&"picturemarkersymbol"!==e){var g=c.getStroke();c=c.getFill();var f=f===C.STYLE_X||f===C.STYLE_CROSS,h=g&&g.color,k=f?h:c;if(b){var l=this._getVariable(b,
"colorInfo",!1),m=this._getVariable(b,"opacityInfo",!1);l&&(k=b.getColor(d,{colorInfo:l})||k);k&&m&&(k=this._applyOpacity(k,b,m,d));k&&(f?k!==h&&(g=g?y.mixin({},g):{},g.color=k):k!==c&&(c=k))}"textsymbol"===e?a.setFill(c):"simplemarkersymbol"===e&&a.setFill(c).setStroke(g)}},_drawMarkers:function(a,c,b,d){var e=a.geometry,f=e.points,g=a.getDojoShape()||this._div.createGroup(),h,k,l=f.length,m=[],p=0,n,r=b?b.length:0;g.children[0]&&this._isInvalidShape(c,g.children[0])&&g.clear();for(k=0;k<l;k++)for(h=
f[k],n=0;n<r;n++)m[0]=b[n],this._drawPoint(g,{x:h[0],y:h[1],spatialReference:e.spatialReference},c,g.children[p++],m,d,a);c=g.children.length;if(l*b.length<c)for(k=c-1;k>=l*b.length;k--)g.children[k].removeShape();a._shape=g},_symbolizeMarkers:function(a,c,b){var d=a.getDojoShape().children,e,f=d.length;for(e=0;e<f;e++)this._symbolizePoint(d[e],c,b,a)},_errorHandler:function(a,c){a.message=c?"Unable to draw graphic (geometry:"+(c.geometry?c.geometry.declaredClass:null)+", symbol:"+(c.symbol?c.symbol.declaredClass:
null)+"): "+a.message:"Unable to draw graphic (null): "+a.message;this.inherited(arguments)},_rendererLimits:function(){var a,c,b;E("ff")?(a=16125,c=-32250,b=32250):v?(a=1E5,c=-1E5,b=1E5):E("chrome")&&6>E("chrome")&&(a=8150,c=-1E4,b=1E4);if(a)return{clipLimit:a,rangeMin:c,rangeMax:b,clipBBox:[-a,-a,a,a],clipSegments:[[[-a,-a],[a,-a]],[[a,-a],[a,a]],[[a,a],[-a,a]],[[-a,a],[-a,-a]]]}}(),_clipPolyline:function(a,c){var b=this._getCorners(a,c),d=b.br,e=this._rendererLimits,f=e.rangeMin,g=e.rangeMax,h=
e.clipBBox,k=e.clipSegments,e=this._isPointWithinRange,l=this._isPointWithinBBox,m=this._getClipperIntersection,p=this._getPlaneIndex;if(!e(b.tl,f,g)||!e(d,f,g)){v&&this._createSegments(a);var n=[];t.forEach(a.segments,function(a){a=a.args;var b=a.length,c=[],d;for(d=0;d<b;d+=2){var e=[a[d],a[d+1]],f=[a[d+2],a[d+3]],g=l(e,h),B=l(f,h);if(g^B){if(B=m([e,f],k))g?(d?c.push(B[1]):c.push(e,B[1]),n.push(c),c=[]):c.push(B[1],f)}else g?d?c.push(f):c.push(e,f):(B=p(e,h),g=p(f,h),-1!==B&&-1!==g&&B!==g&&(e=m([e,
f],k,!0),0<e.length&&(e[B]||(B=e[B[0]]?B[0]:B[1]),e[g]||(g=e[g[0]]?g[0]:g[1]),f=e[B],e=e[g],f&&c.push(f),e&&(c.push(e),n.push(c),c=[]))))}n.push(c)});a.setShape(this._getPathStringFromPaths(n))}},_clipPolygon:function(a,c){var b=this._getCorners(a,c),d=b.br,e=this._rendererLimits,f=e.clipLimit,g=e.rangeMin,h=e.rangeMax,k=e.clipBBox,l=e.clipSegments,e=this._isPointWithinRange,m=this._isPointWithinBBox,p=this._getClipperIntersection,n=this._getPlaneIndex,r=W._pointLineDistance;e(b.tl,g,h)&&e(d,g,h)||
(v&&this._createSegments(a),b=t.filter(a.segments,function(a){return a.args&&a.args.length}),b=t.map(b,function(a){var b=a.args,c=b.length,d=[];a=[];var e;for(e=0;e<c;e+=2){var g=[b[e],b[e+1]],h=[b[e+2],b[e+3]];if(e===c-2){d.push(g);break}var x=m(g,k),u=m(h,k);d.push(g);if(x^u){if(u=p([g,h],l))g=u[1],g[x?"inOut":"outIn"]=!0,d.push(g),a.push([x?"INOUT":"OUTIN",d.length-1,u[0]])}else if(!x){var x=n(g,k),q=n(h,k);-1!==x&&-1!==q&&x!==q&&(u=p([g,h],l,!0),0<u.length?(u[x]||(x=u[x[0]]?x[0]:x[1]),u[q]||(q=
u[q[0]]?q[0]:q[1]),g=u[x],h=u[q],g&&(g.outIn=!0,d.push(g),a.push(["OUTIN",d.length-1,x])),h&&(h.inOut=!0,d.push(h),a.push(["INOUT",d.length-1,q]))):y.isArray(x)&&y.isArray(q)&&(u=x.concat(q),u.sort(),"0123"===u.join("")&&(u=[],3===x[0]+x[1]?u.push([f,-f],[-f,f]):u.push([-f,-f],[f,f]),x=r(u[0],[g,h]),g=r(u[1],[g,h]),d.push(x<g?u[0]:u[1]))))}}var v=k[0],w=k[1],z=k[2],A=k[3];t.forEach(d,function(a){a[0]<v&&(a[1]>=w&&a[1]<=A?a[0]=v:(a[0]=v,a[1]=a[1]<w?w:A))});t.forEach(d,function(a){a[1]<w&&(a[0]>=v&&
a[0]<=z?a[1]=w:(a[1]=w,a[0]=a[0]<v?v:z))});t.forEach(d,function(a){a[0]>z&&(a[1]>=w&&a[1]<=A?a[0]=z:(a[0]=z,a[1]=a[1]<w?w:A))});t.forEach(d,function(a){a[1]>A&&(a[0]>=v&&a[0]<=z?a[1]=A:(a[1]=A,a[0]=a[0]<v?v:z))});b=0;c=a.length;if(0<c){do{h=a[b];e=a[(b+1)%c];if(h[2]===e[2]&&"INOUT"===h[0]&&"OUTIN"===e[0])if(g=h[1],e=e[1],g<e)for(g+=1;g<e;g++)d[g][2]=!0;else if(g>e){for(g+=1;g<d.length;g++)d[g][2]=!0;for(g=0;g<e;g++)d[g][2]=!0}b=(b+1)%c}while(0!==b)}c=d[0];b=d[d.length-1];c[2]&&(b[2]=!0,t.some(a,function(a){return 1===
a[1]?(d.splice(d.length-1,0,y.clone(d[1])),!0):!1}));d=t.filter(d,function(a){return a[2]?!1:!0});for(b=0;b<d.length-1;b++)c=d[b],(e=d[b+1])&&c[0]===e[0]&&c[1]===e[1]&&(e.outIn?c.outIn=!0:e.inOut&&(c.inOut=!0),d.splice(b+1,1));c=Math.abs;a=[];for(b=0;b<d.length-1;b++){h=d[b];g=h[0];h=h[1];x=c(g)===f;u=c(h)===f;e=d[b+1];q=e[0];e=e[1];var C=c(q)===f,D=c(e)===f;x&&D?a.push([b+1,[g,e]]):u&&C&&a.push([b+1,[q,h]])}for(b=a.length-1;0<=b;b--)e=a[b],g=d[e[0]-1],c=d[e[0]],g.outIn||g.inOut||c.outIn||c.inOut||
d.splice(e[0],0,e[1]);c=d[0];b=d[d.length-1];c[0]===b[0]&&c[1]===b[1]||d.push(c);return d}),a.setShape(this._getPathStringFromPaths(b)))},_getCorners:function(a,c){if(v){var b=this._map,d=c.getExtent(),e=d.spatialReference,f=b.toScreen(new V(d.xmin,d.ymax,e)),b=b.toScreen(new V(d.xmax,d.ymin,e));return{tl:f,br:b}}f=a.getTransformedBoundingBox();return{tl:f[0],br:f[2]}},_createSegments:function(a){a.shape.path=a.vmlPath;a.segmented=!1;a._confirmSegmented();var c=a.segments;1<c.length&&(a.segments=
t.filter(c,function(a,c,e){c=e[c+1];return"M"===a.action&&c&&"L"===c.action?(a.args=a.args.concat(c.args),!0):!1}))},_getPathStringFromPaths:function(a){v?(a=t.map(a,function(a){return"m "+t.map(a,function(a,c){return(1===c?"l ":"")+a.join(",")}).join(" ")}),a.push("e")):a=t.map(a,function(a){return"M "+t.map(a,function(a){return a.join(",")}).join(" ")});return a.join(" ")},_isPointWithinBBox:function(a,c){var b=c[1],d=c[2],e=c[3],f=a[0],g=a[1];return f>c[0]&&f<d&&g>b&&g<e?!0:!1},_isPointWithinRange:function(a,
c,b){var d=a.x;a=a.y;return d<c||a<c||d>b||a>b?!1:!0},_getClipperIntersection:function(a,c,b){var d,e=W._getLineIntersection2,f=Math.round,g={length:0};for(d=0;4>d;d++){var h=e(a,c[d]);if(h)if(h[0]=f(h[0]),h[1]=f(h[1]),b)g[d]=h,g.length++;else return[d,h]}return b?g:null},_getPlaneIndex:function(a,c){var b=a[0],d=a[1],e=c[0],f=c[1],g=c[2],h=c[3];return b<=e?d>=f&&d<=h?3:d<f?[0,3]:[2,3]:d<=f?b>=e&&b<=g?0:b<e?[3,0]:[1,0]:b>=g?d>=f&&d<=h?1:d<f?[0,1]:[2,1]:d>=h?b>=e&&b<=g?2:b<e?[3,2]:[1,2]:-1},onGraphicAdd:function(){},
onGraphicRemove:function(){},onGraphicNodeAdd:function(){},onGraphicNodeRemove:function(){},onGraphicDraw:function(){},onGraphicsClear:function(){},onRendererChange:function(){},onOpacityChange:function(){},setInfoTemplate:function(a){this.infoTemplate=a},add:function(a,c){if(a._graphicsLayer===this)return a;c||this.graphics.push(a);a._graphicsLayer=this;a._layer=this;this._updateExtent(a);this._draw(a);if(!c)this.onGraphicAdd(a);return a},remove:function(a,c,b){if(!c&&!b){c=this.graphics;if(-1===
(a=t.indexOf(c,a)))return null;a=c.splice(a,1)[0]}a.getDojoShape()&&this._removeShape(a,null,b);a._shape=a._graphicsLayer=null;this.onGraphicRemove(a);return a},clear:function(a,c){var b=this.graphics,d,e=!v;for(d=b.length-1;0<=d;d--)this.remove(b[d],null,e);this.graphics=[];if(e&&this._div){var f;this._childLayer&&(f=this._childLayer.getNode())&&f.parentNode&&f.parentNode.removeChild(f);this._bgGroup.clear();this._div.clear();this._bgGroup=this._div.createGroup();f&&this._div.getEventSource().appendChild(f);
this._initOpacity()}if(!c)this.onGraphicsClear()},_setIEOpacity:function(a,c){var b=a&&a.getNode();if(b){var d=a.strokeStyle,e=b.stroke;d&&e&&(e.opacity=d.color.a*c);d=a.fillStyle;e=b.fill;d&&e&&("tile"===e.type?D.set(b,"opacity",c):e.opacity=d.a*c)}},setOpacity:function(a,c){if(c||this.opacity!=a){var b=this._div;b&&(v?(t.forEach(this.graphics,function(b){this._setIEOpacity(b._shape,a);this._setIEOpacity(b._bgShape,a)},this),b._esriIeOpacity=a,this._bgGroup._esriIeOpacity=a):this._canvas?D.set(b.getEventSource(),
"opacity",a):b.getEventSource().setAttribute("opacity",a));this.opacity=a;if(!c)this.onOpacityChange(a)}},setRenderer:function(a){this.renderer=a;this._evalSDRenderer(!0);this.emit("renderer-change",{renderer:this._rndForScale||a})}});G=G([N,ca],{declaredClass:"esri.layers.GraphicsLayer",constructor:function(){this.enableMouseEvents=y.hitch(this,this.enableMouseEvents);this.disableMouseEvents=y.hitch(this,this.disableMouseEvents);this._processEvent=y.hitch(this,this._processEvent);this._initLayer()},
_initLayer:function(){this.loaded=!0;this.onLoad(this)},_setMap:function(){var a=this.inherited("_setMap",arguments);this.enableMouseEvents();return a},_unsetMap:function(){this.disableMouseEvents();this.inherited("_unsetMap",arguments)},_processEvent:function(a){var c=this._map,b=a.target,d;a.screenPoint=new Q(a.pageX-c.position.x,a.pageY-c.position.y);for(a.mapPoint=c.toMap(a.screenPoint);b&&!(d=b.e_graphic);)b=b.parentNode;if(d)return a.graphic=d,a},_onMouseOverHandler:function(a){if(this._processEvent(a))this.onMouseOver(a)},
_onMouseMoveHandler:function(a){if(this._processEvent(a))this.onMouseMove(a)},_onMouseDragHandler:function(a){if(this._processEvent(a))this.onMouseDrag(a)},_onMouseOutHandler:function(a){if(this._processEvent(a))this.onMouseOut(a)},_onMouseDownHandler:function(a){this._downGr=this._downPt=null;this._processEvent(a)&&(q.disconnect(this._onmousemove_connect),q.disconnect(this._onmousedrag_connect),this._onmousedrag_connect=q.connect(this._div.getEventSource(),"onmousemove",this,"_onMouseDragHandler"),
this._downGr=a.graphic,this._downPt=a.screenPoint.x+","+a.screenPoint.y,this.onMouseDown(a))},_onMouseUpHandler:function(a){this._upGr=this._upPt=null;this._processEvent(a)&&(q.disconnect(this._onmousedrag_connect),q.disconnect(this._onmousemove_connect),this._onmousemove_connect=q.connect(this._div.getEventSource(),"onmousemove",this,"_onMouseMoveHandler"),this._upGr=a.graphic,this._upPt=a.screenPoint.x+","+a.screenPoint.y,this.onMouseUp(a))},_onClickHandler:function(a){if(this._processEvent(a)){var c=
this._downGr,b=this._upGr;c&&b&&c===b&&this._downPt===this._upPt&&(v&&(A._ieGraphic=a.graphic),this.onClick(a))}},_onDblClickHandler:function(a){if(this._processEvent(a))this.onDblClick(a)},onMouseOver:function(){},onMouseMove:function(){},onMouseDrag:function(){},onMouseOut:function(){},onMouseDown:function(){},onMouseUp:function(){},onClick:function(){},onDblClick:function(){},enableMouseEvents:function(){if(!this._mouseEvents){var a=q.connect,c=this._div.getEventSource();M||(this._onmouseover_connect=
a(c,"onmouseover",this,"_onMouseOverHandler"),this._onmousemove_connect=a(c,"onmousemove",this,"_onMouseMoveHandler"),this._onmouseout_connect=a(c,"onmouseout",this,"_onMouseOutHandler"),this._onmousedown_connect=a(c,"onmousedown",this,"_onMouseDownHandler"),this._onmouseup_connect=a(c,"onmouseup",this,"_onMouseUpHandler"),this._onclick_connect=a(c,"onclick",this,"_onClickHandler"),this._ondblclick_connect=a(c,"ondblclick",this,"_onDblClickHandler"));this._mouseEvents=!0}},disableMouseEvents:function(){if(this._mouseEvents){var a=
q.disconnect;a(this._onmouseover_connect);a(this._onmousemove_connect);a(this._onmousedrag_connect);a(this._onmouseout_connect);a(this._onmousedown_connect);a(this._onmouseup_connect);a(this._onclick_connect);a(this._ondblclick_connect);this._mouseEvents=!1}}});G._GraphicsContainer=T;G._GraphicsLayer=N;E("extend-esri")&&(y.setObject("layers.GraphicsLayer",G,A),y.setObject("layers._GraphicsContainer",T,A),y.setObject("layers._GraphicsLayer",N,A));return G});