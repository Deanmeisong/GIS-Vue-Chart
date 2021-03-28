// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/urlUtils","dojo/_base/lang dojo/_base/array dojo/_base/url dojo/io-query ./kernel ./lang ./config ./sniff dojo/i18n!./nls/jsapi".split(" "),function(k,v,n,r,l,w,t,q,x){var m=function(){return this}(),b={},p=t.defaults.io,y=/^[a-z][a-z0-9\+\-\.]*:/i,u=/^\s*http:/i;b.isHTTP=function(a){var c=m.location.protocol;return null==a?"http:"===c||"https:"===c:a?"https:"===c:"http:"===c};b.getProtocolForWebResource=function(a){return b.isHTTP()?m.location.protocol:a?"https:":"http:"};b.urlToObject=
function(a){var c={},d=new n(a),b=a.indexOf("?");null===d.query?c={path:a,query:null}:(c.path=a.substring(0,b),c.query=r.queryToObject(d.query));d.fragment&&(c.hash=d.fragment,null===d.query&&(c.path=c.path.substring(0,c.path.length-(d.fragment.length+1))));return c};b.getProxyUrl=function(a,c){var d=k.isString(a)?0===k.trim(a).toLowerCase().indexOf("https:"):a,e=p.proxyUrl,f,g,h=x.io.proxyNotSet;k.isString(a)&&(g=b.getProxyRule(a))&&(e=g.proxyUrl);if(!e)throw console.log(h),Error(h);d&&!1!==c&&0!==
m.location.href.toLowerCase().indexOf("https:")&&(d=e,0!==d.toLowerCase().indexOf("http")&&(d=b.getAbsoluteUrl(d)),d=d.replace(/^http:/i,"https:"),b.canUseXhr(d)&&(e=d,f=1));e=b.urlToObject(e);e._xo=f;return e};b.addProxy=function(a){var c=b.getProxyRule(a),d;c?d=b.urlToObject(c.proxyUrl):p.alwaysUseProxy&&(d=b.getProxyUrl());d&&(c=b.urlToObject(a),a=d.path+"?"+c.path,(d=r.objectToQuery(k.mixin(d.query||{},c.query)))&&(a+="?"+d));return a};b.addProxyRule=function(a){var c=a.urlPrefix=b.urlToObject(a.urlPrefix).path.replace(/([^\/])$/,
"$1/").replace(/^https?:\/\//ig,"").toLowerCase(),d=p.proxyRules,e,f=d.length,g,h=f;for(e=0;e<f;e++)if(g=d[e].urlPrefix,0===c.indexOf(g)){if(c.length===g)return-1;h=e;break}else 0===g.indexOf(c)&&(h=e+1);d.splice(h,0,a);return h};b.getProxyRule=function(a){var c=p.proxyRules,d=c.length,e=b.urlToObject(a).path.replace(/([^\/])$/,"$1/").replace(/^https?:\/\//ig,"").toLowerCase(),f;for(a=0;a<d;a++)if(0===e.indexOf(c[a].urlPrefix)){f=c[a];break}return f};b.hasSameOrigin=function(a,c,d){a=a.toLowerCase();
c=c.toLowerCase();var b=m.location.href.toLowerCase();a=0===a.indexOf("http")?new n(a):b=new n(b);c=0===c.indexOf("http")?new n(c):k.isString(b)?new n(b):b;return(d||a.scheme===c.scheme)&&a.host===c.host&&a.port===c.port};b.canUseXhr=function(a,c){var d=q("esri-phonegap")?!0:!1,e=b.hasSameOrigin,f=p.corsEnabledServers,g,h=-1;!d&&q("esri-cors")&&f&&f.length&&(d=v.some(f,function(b,c){var d=b&&"object"===typeof b?b.host:b;return d&&(g=0!==k.trim(d).toLowerCase().indexOf("http"),e(a,g?"http://"+d:d)||
g&&e(a,"https://"+d))?(h=c,!0):!1}));return c?h:d};b.getAbsoluteUrl=function(a){var c=b.getProtocolForWebResource();return k.isString(a)&&!y.test(a)?0===a.indexOf("//")?c+a:0===a.indexOf("/")?c+"//"+m.location.host+a:l._appBaseUrl+a:a};b.fixUrl=function(a){a=b.getAbsoluteUrl(a);a=b.upgradeToHTTPS(a);return a=a.replace(/^(https?:\/\/)(arcgis\.com)/i,"$1www.$2")};b.normalize=function(a){return b.fixUrl(a)};b.upgradeToHTTPS=function(a){var c=t.defaults.io.httpsDomains,d=b.isHTTP(!1),e=b.isHTTP(!0);if(!u.test(a))return a;
a=k.trim(a);var f=a.indexOf("/",7),f=-1===f?a:a.slice(0,f),f=f.toLowerCase().slice(7);if(d&&f===m.location.host)return a;d=!1;if(e&&f===m.location.host)d=!0;else if(c)for(e=0;e<c.length;e++){var g=c[e];if(f===g||w.endsWith(f,"."+g)){d=!0;break}}d&&(a=a.replace(u,"https:"));return a};q("extend-esri")&&(k.mixin(l,b),l._getProxyUrl=b.getProxyUrl,l._getProxiedUrl=b.addProxy,l._hasSameOrigin=b.hasSameOrigin,l._canDoXOXHR=b.canUseXhr,l._getAbsoluteUrl=b.getAbsoluteUrl,l.fixUrl=b.fixUrl);return b});