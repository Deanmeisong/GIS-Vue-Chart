// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/DataBrowser/DataBrowserContentFactory","dojo/_base/declare dojo/dom-class ../_WizardPage ./Breadcrumb ./DataBrowserBase ./DataBrowserManager ./DataCategoriesPage ./DataCollectionsPage ./DataVariablesPage ./DataVariableGrid dojo/i18n!../../../nls/jsapi".split(" "),function(f,r,g,h,d,k,l,m,n,p,q){return f(null,{createManager:function(a){return new k(a)},createBreadcrumb:function(a){return new h(a)},createPage:function(a,c){var b;switch(a){case d.CATEGORIES_PAGE:b=l;
break;case d.COLLECTIONS_PAGE:b=m;break;case d.VARIABLES_PAGE:b=n}b=f([g,b],{buildRendering:function(){function a(a){var c=a.toLowerCase(),e=d[c+"Button"];!0===e&&(e=q.geoenrichment.dijit.WizardButtons[c]);e&&b.push({id:c,label:e,onClick:function(){d.emit(a,{bubbles:!1})}})}this.inherited(arguments);var b=[],d=this;a("Cancel");a("OK");a("Back");b.length?this.addButtons(b):this.buttonsNode&&(this.buttonsNode.style.display="none")}});return new b(c)},createVariableGrid:function(a,c){return new p(a,
c)}})});