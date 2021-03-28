// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/labelLayerUtils/DynamicLabelClass","dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../../geometry/Extent ../../geometry/Polygon".split(" "),function(y,G,H,I,J,F){y=y(null,{declaredClass:"esri.layers.labelLayerUtils.DynamicLabelClass",constructor:function(){this._preparedLabels=[];this._placedLabels=[];this._extent=null;this._y1=this._x1=this._y0=this._x0=this._ymax=this._ymin=this._xmax=this._xmin=0;this._scale=1},setMap:function(e,d){this._labelLayer=d;this._xmin=e.extent.xmin;
this._xmax=e.extent.xmax;this._ymin=e.extent.ymin;this._ymax=e.extent.ymax;this._scale=(this._xmax-this._xmin)/e.width},_process:function(e){this._preparedLabels=e;this._placedLabels=[];var d;for(e=this._preparedLabels.length-1;0<=e;e--){var a=this._preparedLabels[e],f=Math.min(a.labelWidth,a.labelHeight),g=a.labelWidth+0*f,f=a.labelHeight+0*f,h=(d=a.options)&&void 0!==d.lineLabelPlacement?d.lineLabelPlacement:"PlaceAtCenter",c=d&&void 0!==d.lineLabelPosition?d.lineLabelPosition:"Above",b=d&&void 0!==
d.pointPriorities?d.pointPriorities:"AboveRight",k=[2,2,1,3,0,2,3,3,2];"AboveLeft"==b?k=[1,2,2,2,0,3,2,3,3]:"AboveCenter"==b?k=[2,1,2,2,0,2,3,3,3]:"AboveRight"==b?k=[2,2,1,3,0,2,3,3,2]:"CenterLeft"==b?k=[2,2,3,1,0,3,2,2,3]:"CenterCenter"==b?k=[0,0,0,0,1,0,0,0,0]:"CenterRight"==b?k=[3,2,2,3,0,1,3,2,2]:"BelowLeft"==b?k=[2,3,3,2,0,3,1,2,2]:"BelowCenter"==b?k=[3,3,3,2,0,2,2,1,2]:"BelowRight"==b&&(k=[3,3,2,3,0,2,2,2,1]);var m=d&&void 0!==d.labelRotation?d.labelRotation:!0,b=Math.PI/180*a.angle;d=d&&void 0!==
d.howManyLabels?d.howManyLabels:"OneLabel";if("point"==a.geometry.type)this._generatePointPositions(a,a.geometry.x,a.geometry.y,a.text,b,g,f,a.symbolWidth,a.symbolHeight,k);else if("multipoint"==a.geometry.type)for(h=a.geometry,c=0;c<h.points.length;c++)this._generatePointPositions(a,h.points[c][0],h.points[c][1],a.text,b,g,f,a.symbolWidth,a.symbolHeight,k);else"polyline"==a.geometry.type?this._generateLinePositions(a,a.geometry,a.text,g,f,2*a.symbolHeight+f,h,c,m):"polygon"==a.geometry.type&&this._generatePolygonPositions(a,
d,a.geometry,a.text,b,g,f)}return this._placedLabels},_generatePointPositions:function(e,d,a,f,g,h,c,b,k,m){b=(b+h)*this._scale;k=(k+c)*this._scale;var p,l;for(p=1;3>=p;p++)for(l=1;9>=l;l++)if(m[l-1]==p)switch(l){case 1:if(this._findPlace(e,f,d-b,a+k,g,h,c))return;break;case 2:if(this._findPlace(e,f,d,a+k,g,h,c))return;break;case 3:if(this._findPlace(e,f,d+b,a+k,g,h,c))return;break;case 4:if(this._findPlace(e,f,d-b,a,g,h,c))return;break;case 5:if(this._findPlace(e,f,d,a,g,h,c))return;break;case 6:if(this._findPlace(e,
f,d+b,a,g,h,c))return;break;case 7:if(this._findPlace(e,f,d-b,a-k,g,h,c))return;break;case 8:if(this._findPlace(e,f,d,a-k,g,h,c))return;break;case 9:if(this._findPlace(e,f,d+b,a-k,g,h,c))return}},_generateLinePositions:function(e,d,a,f,g,h,c,b,k){var m=f*this._scale*f*this._scale,p,l,n;for(p=0;p<d.paths.length;p++){var t=d.paths[p],r=t.length,q=Math.floor((r-1)/2),v=0!==(r-1)%2?1:-1;"PlaceAtStart"==c&&(q=0,v=1);"PlaceAtEnd"==c&&(q=r-2,v=-1);for(;0<=q&&q<r-1;){for(l=q;l<r;l++){var u=t[q][0],w=t[q][1],
x=t[l][0]-u,y=t[l][1]-w;if(x*x+y*y>m){for(var z=Math.atan2(y,x);z>Math.PI/2;)z-=Math.PI;for(;z<-(Math.PI/2);)z+=Math.PI;var C=Math.sin(z),D=Math.cos(z),A=0,B=0;"Above"==b&&(A=h*C*this._scale,B=h*D*this._scale);"Below"==b&&(A=-h*C*this._scale,B=-h*D*this._scale);if(1==l-q){if(this._clipLine(u,w,t[l][0],t[l][1])&&(u=this._x1-this._x0,n=this._y1-this._y0,u*u+n*n>m&&(l=Math.atan2(n,u),x=f/2+2*g,w=x*this._scale*Math.cos(l),x=x*this._scale*Math.sin(l),"PlaceAtStart"==c?(u=this._x0+w,n=this._y0+x):"PlaceAtEnd"==
c?(u=this._x1-w,n=this._y1-x):(u=this._x0+u/2,n=this._y0+n/2),this._findPlace(e,a,u-A,n+B,k?-l:0,f,g))))return}else{var E=0;for(n=q;n<=l;n++)E=Math.max(E,Math.abs((t[n][1]-w)*D-(t[n][0]-u)*C));if(E<g&&this._findPlace(e,a,u+x/2-A,w+y/2+B,k?-z:0,f,g))return}break}}q+=v}}},_generatePolygonPositions:function(e,d,a,f,g,h,c){var b;if("ManyLabels"==d)for(d=0;d<a.rings.length;d++)b=a.rings[d],F.prototype.isClockwise(b)&&(b=this._findCentroid(b,this._xmin,this._ymin,this._xmax,this._ymax),this._findPlace(e,
f,b[0],b[1],g,h,c));else{b=this._findCentroidForFeature(a,this._xmin,this._ymin,this._xmax,this._ymax);var k=b[1],m=0;for(d=0;10>d;d++){m+=c/4;b=this._findCentroidForFeature(a,this._xmin,k+(m-c/4),this._xmax,k+(m+c/4));if(this._findPlace(e,f,b[0],b[1],g,h,c))break;b=this._findCentroidForFeature(a,this._xmin,k-(m+c/4),this._xmax,k-(m-c/4));if(this._findPlace(e,f,b[0],b[1],g,h,c))break}}},_findCentroid:function(e,d,a,f,g){var h=e.length,c=[0,0],b=0,k=e[0][0],m=e[0][1];k>f&&(k=f);k<d&&(k=d);m>g&&(m=
g);m<a&&(m=a);for(var p=1;p<h-1;p++){var l=e[p][0],n=e[p][1],t=e[p+1][0],r=e[p+1][1];l>f&&(l=f);l<d&&(l=d);n>g&&(n=g);n<a&&(n=a);t>f&&(t=f);t<d&&(t=d);r>g&&(r=g);r<a&&(r=a);var q=(l-k)*(r-m)-(t-k)*(n-m);c[0]+=q*(k+l+t);c[1]+=q*(m+n+r);b+=q}c[0]/=3*b;c[1]/=3*b;if(isNaN(c[0])||isNaN(c[1]))return c;a=[];this._fillBuffer(e,a,c);c[0]=this._sortBuffer(a,c[0],d,f);return c},_findCentroidForFeature:function(e,d,a,f,g){for(var h,c=0,b=[0,0],k=0;k<e.rings.length;k++){var m=e.rings[k],p=m.length,l=m[0][0],n=
m[0][1];l>f&&(l=f);l<d&&(l=d);n>g&&(n=g);n<a&&(n=a);for(h=1;h<p-1;h++){var t=m[h][0],r=m[h][1],q=m[h+1][0],v=m[h+1][1];t>f&&(t=f);t<d&&(t=d);r>g&&(r=g);r<a&&(r=a);q>f&&(q=f);q<d&&(q=d);v>g&&(v=g);v<a&&(v=a);var u=(t-l)*(v-n)-(q-l)*(r-n);b[0]+=u*(l+t+q);b[1]+=u*(n+r+v);c+=u}}b[0]/=3*c;b[1]/=3*c;if(isNaN(b[0])||isNaN(b[1]))return b;a=[];for(h=0;h<e.rings.length;h++)this._fillBuffer(e.rings[h],a,b);b[0]=this._sortBuffer(a,b[0],d,f);return b},_fillBuffer:function(e,d,a){for(var f=e.length-1,g=e[0][1]>=
e[f][1]?1:-1,h=0;h<=f;h++){var c=h,b=h+1;h==f&&(b=0);var k=e[c][0],c=e[c][1],m=e[b][0],b=e[b][1],p=b>=c?1:-1;if(c<=a[1]&&a[1]<=b||b<=a[1]&&a[1]<=c)a[1]!=c&&a[1]!=b?(d.push((a[1]-c)*(m-k)/(b-c)+k),g=p):a[1]==c&&a[1]!=b?(g!=p&&d.push(k),g=p):a[1]!=c&&a[1]==b?(d.push(m),g=p):a[1]==c&&a[1]==b&&(1==g&&d.push(k),d.push(m),g=p)}},_sortBuffer:function(e,d,a,f){var g=e.length;e.sort();if(0<g){for(var h=0,c=d=0;c<g-1;c+=2){var b=Math.abs(e[c+1]-e[c]);!(e[c]<=a&&e[c+1]<=a||e[c]>=f&&e[c+1]>=f)&&b>h&&(h=b,d=c)}g=
e[d];e=e[d+1];g>f&&(g=f);g<a&&(g=a);e>f&&(e=f);e<a&&(e=a);d=(g+e)/2}return d},_findPlace:function(e,d,a,f,g,h,c){if(isNaN(a)||isNaN(f))return!1;for(var b=0;b<this._placedLabels.length;b++){var k=this._placedLabels[b].angle,m=this._placedLabels[b].width*this._scale,p=this._placedLabels[b].height*this._scale,l=this._placedLabels[b].x-a,n=this._placedLabels[b].y-f;if(0===g&&0===k){if(this._findPlace2(-h*this._scale,-c*this._scale,h*this._scale,c*this._scale,l-m,n-p,l+m,n+p))return!1}else{var t=new J(-h*
this._scale,-c*this._scale,h*this._scale,c*this._scale,null),r=0,q=1;0!==g&&(r=Math.sin(g),q=Math.cos(g));var v=l*q-n*r,l=l*r+n*q,k=k-g,r=Math.sin(k),q=Math.cos(k),u=-m*q- -p*r,n=-m*r+-p*q,k=+m*q- -p*r,w=+m*r+-p*q,m=v+u,p=l-n,r=v+k,q=l-w,u=v-u,n=l+n,v=v-k,l=l+w,k=new F;k.addRing([[m,p],[r,q],[u,n],[v,l],[m,p]]);if(t.intersects(k))return!1}}for(;g>Math.PI/2;)g-=Math.PI;for(;g<-(Math.PI/2);)g+=Math.PI;b={};b.layer=e;b.text=d;b.angle=g;b.x=a;b.y=f;b.width=h;b.height=c;this._placedLabels.push(b);return!0},
_findPlace2:function(e,d,a,f,g,h,c,b){return(e>=g&&e<=c||a>=g&&a<=c||e<=g&&a>=c)&&(d>=h&&d<=b||f>=h&&f<=b||d<=h&&f>=b)?!0:!1},_clipLine:function(e,d,a,f){for(var g=this._code(e,d),h=this._code(a,f);0!==g||0!==h;){if(0!==(g&h))return!1;var c=a-e,b=f-d;0!==g?(e<this._xmin?(d+=b*(this._xmin-e)/c,e=this._xmin):e>this._xmax?(d+=b*(this._xmax-e)/c,e=this._xmax):d<this._ymin?(e+=c*(this._ymin-d)/b,d=this._ymin):d>this._ymax&&(e+=c*(this._ymax-d)/b,d=this._ymax),g=this._code(e,d)):(a<this._xmin?(f+=b*(this._xmin-
a)/c,a=this._xmin):a>this._xmax?(f+=b*(this._xmax-a)/c,a=this._xmax):f<this._ymin?(a+=c*(this._ymin-f)/b,f=this._ymin):f>this._ymax&&(a+=c*(this._ymax-f)/b,f=this._ymax),h=this._code(a,f))}this._x0=e;this._y0=d;this._x1=a;this._y1=f;return!0},_code:function(e,d){var a=0;e<this._xmin&&(a+=8);e>this._xmax&&(a+=4);d<this._ymin&&(a+=2);d>this._ymax&&(a+=1);return a}});H("extend-esri")&&G.setObject("layers.labelLayerUtils.DynamicLabelClass",y,I);return y});