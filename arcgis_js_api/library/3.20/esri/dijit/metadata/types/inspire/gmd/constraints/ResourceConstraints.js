// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/inspire/gmd/constraints/templates/ResourceConstraints.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3c!-- gmd:resourceConstraints/gmd:MD_Constraints --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n    data-dojo-props\x3d"target:\'gmd:resourceConstraints\',\r\n      label:\'${i18nIso.MD_Constraints.caption}\',\r\n      matchTopNode: [\r\n        {\r\n           qPath: \'gmd:MD_Constraints\',\r\n          qValue: null,\r\n          qMode: \'must\'\r\n        }  \r\n      ]"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n      data-dojo-props\x3d"target:\'gmd:MD_Constraints\',minOccurs:0"\x3e\r\n      \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/inspire/gmd/constraints/UseLimitation"\x3e\x3c/div\x3e\r\n      \r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \r\n   \x3c!-- gmd:resourceConstraints/gmd:MD_LegalConstraints --\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/ObjectReference"\r\n    data-dojo-props\x3d"target:\'gmd:resourceConstraints\',\r\n      label:\'${i18nIso.MD_LegalConstraints.caption}\',\r\n      matchTopNode: [\r\n        {\r\n           qPath: \'gmd:MD_LegalConstraints\',\r\n          qValue: null,\r\n          qMode: \'must\'\r\n        }  \r\n      ]"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/AbstractObject"\r\n      data-dojo-props\x3d"target:\'gmd:MD_LegalConstraints\',minOccurs:0"\x3e\r\n      \r\n      \x3c!-- fixed accessConstraints --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListReference"\r\n        data-dojo-props\x3d"target:\'gmd:accessConstraints\',\r\n          label:\'${i18nIso.MD_LegalConstraints.accessConstraints}\'"\x3e\r\n        \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListElement"\r\n          data-dojo-props\x3d"target:\'gmd:MD_RestrictionCode\'"\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeSpaceAttribute"\x3e\x3c/div\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListAttribute"\r\n            data-dojo-props\x3d"value:\'${codeListPrefix}MD_RestrictionCode\'"\x3e\x3c/div\x3e\r\n          \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/CodeListValueAttribute"\x3e\r\n            \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputSelectOne"\x3e\r\n              \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Options"\x3e\r\n                \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Option"\r\n                  data-dojo-props\x3d"label:\'${i18nIso.MD_RestrictionCode.otherRestrictions}\',\r\n                    value:\'otherRestrictions\'"\x3e\x3c/div\x3e                                                        \r\n              \x3c/div\x3e\r\n            \x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e  \r\n      \r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/inspire/gmd/constraints/OtherConstraints"\x3e\x3c/div\x3e\r\n      \r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/inspire/gmd/constraints/ResourceConstraints","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/InputSelectOne ../../../../form/Options ../../../../form/Option ../../../../form/iso/AbstractObject ../../../../form/iso/CodeListAttribute ../../../../form/iso/CodeListValueAttribute ../../../../form/iso/CodeListElement ../../../../form/iso/CodeListReference ../../../../form/iso/CodeSpaceAttribute ../../../../form/iso/ObjectReference ./OtherConstraints ./UseLimitation dojo/text!./templates/ResourceConstraints.html ../../../../../../kernel".split(" "),
function(a,b,c,d,g,h,k,l,m,n,p,q,r,t,u,v,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.inspire.gmd.constraints.ResourceConstraints",a,f);return a});