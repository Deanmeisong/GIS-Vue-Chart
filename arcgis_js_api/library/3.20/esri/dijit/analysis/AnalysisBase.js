// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/AnalysisBase","require dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/has dojo/json dojo/Deferred dojo/promise/all dojo/when dojo/data/ItemFileWriteStore dojo/string dojo/Evented dojo/_base/kernel dojo/Stateful ../../kernel ../../lang ../../request ../../tasks/Geoprocessor dojo/i18n!../../nls/jsapi ./utils ../../IdentityManager".split(" "),function(t,m,d,l,g,x,B,n,u,C,D,v,y,z,A,h,f,k,w,p,q){m=m([A,y],{declaredClass:"esri.dijit.analysis.AnalysisBase",
isOutputLayerItemUpdated:!1,analysisGpServer:null,toolName:null,portalUrl:null,jobParams:null,itemParams:null,gp:null,resultParameter:null,signInPromise:null,getResultLyrInfos:!1,checkCreditLimits:!1,_jobInfo:null,_popupInfo:null,_toolServiceUrl:null,_counter:null,_analysisType:"feature",doRefreshItem:!0,constructor:function(a){this.isOutputLayerItemUpdated=!1;this._rids=[];this._counter=0;this._popupInfo=[];a.analysisGpServer?this._signIn(a.analysisGpServer):a.portalUrl&&(this.portalUrl=a.portalUrl,
this._signIn(a.portalUrl,!0));this.i18n={};d.mixin(this.i18n,p.common);d.mixin(this.i18n,p.analysisTools);d.mixin(this.i18n,p.analysisMsgCodes);d.mixin(this.i18n,p.analysisSettings)},execute:function(a){this.jobParams=a.jobParams;this.itemParams=this.jobParams.OutputName?a.itemParams:null;this._analysisType=a.analysisType||"feature";f.isDefined(a.isSpatioTemporalDataStore)&&(this._isSpatioTemporalDataStore=a.isSpatioTemporalDataStore);this.signInPromise.then(d.hitch(this,this._checkUser))},_checkUser:function(){var a;
if(a=h.id.findCredential(this.portalUrl).userId)a=this.portalUrl+"/sharing/rest/community/users/"+a,k({url:a,content:{f:"json"}}).then(d.hitch(this,this._handleUserProfileResponse),d.hitch(this,function(a){this.emit("job-fail",{message:a.message+(a.details?a.details.toString():""),jobParams:this.jobParams})}))},_handleUserProfileResponse:function(a){if(f.isDefined(a)&&f.isDefined(a.orgId))if(-1===l.indexOf(["account_admin","account_publisher","org_admin","org_publisher"],a.role))this.emit("job-fail",
{message:this.i18n.pubRoleMsg,messageCode:"AB_0001",jobParams:this.jobParams});else if(f.isDefined(a.availableCredits)&&this.get("checkCreditLimits")){var b,e={},c;for(b in this.jobParams)this.jobParams.hasOwnProperty(b)&&("object"===typeof this.jobParams[b]?e[b]=g.toJson(this.jobParams[b]):-1!==l.indexOf(["measurementtype"],b.toLowerCase())&&"StraightLine"!==this.jobParams[b]?(c=g.fromJson(this.jobParams[b]),e[b]=c?c.name.replace(/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/g,""):"DrivingTime"):e[b]=
this.jobParams[b]);this.getCreditsEstimate(this.toolName,e).then(d.hitch(this,function(b){b=b&&f.isDefined(b.cost)?b.cost:b.maximumCost;f.isDefined(b)&&a.availableCredits>b?f.isDefined(this.itemParams)?this._checkServiceName(a.orgId):(this.emit("start",this.jobParams),this._submitGpJob()):this.emit("job-fail",{message:this.i18n.insufficientCreditsMsg,messageCode:"AB_0001",jobParams:this.jobParams})}))}else f.isDefined(this.itemParams)?this._checkServiceName(a.orgId):(this.emit("start",this.jobParams),
this._submitGpJob());else this.emit("job-fail",{message:this.i18n.orgUsrMsg,jobParams:this.jobParams})},_checkServiceName:function(a){var b;h.id.findCredential(this.portalUrl);a=this.portalUrl+"/sharing/rest/portals/"+a+"/isServiceNameAvailable";b=g.fromJson(this.jobParams.OutputName);this.isSingleTenant&&f.isDefined(b.serviceProperties)&&f.isDefined(b.serviceProperties.name)&&(b.serviceProperties.name=b.serviceProperties.name.replace(/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?\.]/g,"_"),this.jobParams.OutputName=
g.toJson(b));k({url:a,content:{name:b.serviceProperties.name,type:"raster"===this._analysisType?"Image Service":"Feature Service",f:"json"}}).then(d.hitch(this,function(a){a.available?("raster"===this._analysisType?this._createImageService():this._createService(),this.emit("start",this.jobParams)):this.emit("job-fail",{message:this.i18n.servNameExists,type:"warning",messageCode:"AB_0002",jobParams:this.jobParams})}),d.hitch(this,function(a){this.emit("job-fail",{message:a.message+(a.details?a.details.toString():
""),jobParams:this.jobParams})}))},_createService:function(){var a,b,e;a=h.id.findCredential(this.portalUrl).userId;b=g.fromJson(this.jobParams.OutputName);a&&(e=this.itemParams.folder,a=this.portalUrl+"/sharing/rest/content/users/"+a+(e&&"/"!==e?"/"+e:"")+"/createService",b={createParameters:g.toJson({currentVersion:10.2,serviceDescription:"",hasVersionedData:!1,supportsDisconnectedEditing:!1,hasStaticData:!0,maxRecordCount:2E3,supportedQueryFormats:"JSON",capabilities:"Query",description:"",copyrightText:"",
allowGeometryUpdates:!1,syncEnabled:!1,editorTrackingInfo:{enableEditorTracking:!1,enableOwnershipAccessControl:!1,allowOthersToUpdate:!0,allowOthersToDelete:!0},xssPreventionInfo:{xssPreventionEnabled:!0,xssPreventionRule:"InputOnly",xssInputRule:"rejectInvalid"},tables:[],name:b.serviceProperties.name}),outputType:"featureService",f:"json"},this._isSpatioTemporalDataStore&&(e=g.fromJson(b.createParameters),e.options={dataSourceType:"spatiotemporal"},b.createParameters=g.toJson(e)),k({url:a,content:b},
{usePost:!0}).then(d.hitch(this,this._submitGpJob),d.hitch(this,this._handleCreateServiceError)))},_createImageService:function(){var a,b,e;a=h.id.findCredential(this.portalUrl).userId;b=g.fromJson(this.jobParams.OutputName);a&&(e=this.itemParams.folder,a=this.portalUrl+"/sharing/rest/content/users/"+a+(e&&"/"!==e?"/"+e:"")+"/createService",b={createParameters:g.toJson({name:b.serviceProperties.name,description:"",capabilities:"Image",properties:{path:"@",description:"",copyright:""}}),outputType:"imageService",
f:"json"},k({url:a,content:b},{usePost:!0}).then(d.hitch(this,this._submitGpJob),d.hitch(this,this._handleCreateServiceError)))},_handleCreateServiceError:function(a){this.emit("job-fail",{message:a.message+(a.details?a.details.toString():""),jobParams:this.jobParams})},_getSelf:function(a){return k({url:a+"/sharing/rest/portals/self",content:{culture:z.locale,f:"json"},callbackParamName:"callback",timeout:0},{})},_submitGpJob:function(a){var b;this.itemParams&&(this.currentGpItemId=a.itemId,b=g.fromJson(this.jobParams.OutputName),
b.serviceProperties&&(b.serviceProperties.serviceUrl=a.serviceurl),b.itemProperties={itemId:a.itemId},this.itemParams.folder&&(b.itemProperties.folderId=this.itemParams.folder),this.jobParams.OutputName=g.toJson(b),this.context&&((a=g.fromJson(this.jobParams.context))||(a={}),this.context.outSR&&!a.outSR&&(a.outSR=this.context.outSR),this.context.processSR&&!a.processSR&&(a.processSR=this.context.processSR),this.context.extent&&!a.extent&&(a.extent=this.context.extent),"raster"===this._analysisType&&
(this.context.cellSize&&!a.cellSize&&(a.cellSize=this.context.cellSize),this.context.mask&&!a.mask&&(a.mask=this.context.mask),this.context.snapRaster&&!a.snapRaster&&(a.snapRaster=this.context.snapRaster)),this.jobParams.context=g.toJson(a)));this.analysisGpServer?(this._toolServiceUrl&&this.gp||this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),this.gp.setUpdateDelay(3E3),this.gp.submitJob(this.jobParams,d.hitch(this,this._gpJobComplete),d.hitch(this,this._gpJobStatus),d.hitch(this,
this._gpJobFailed)),this.emit("job-submit",this.jobParams)):this._getSelf(this.portalUrl).then(d.hitch(this,function(a){this.analysisGpServer=a.helperServices.analysis&&a.helperServices.analysis.url?a.helperServices.analysis.url:null;this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName);this.gp.setUpdateDelay(3E3);this.gp.submitJob(this.jobParams,d.hitch(this,this._gpJobComplete),d.hitch(this,this._gpJobStatus),d.hitch(this,this._gpJobFailed));this.emit("job-submit",this.jobParams)}))},
_updateItem:function(a){var b,e,c;if(b=h.id.findCredential(this.portalUrl).userId)return e=this.itemParams.folder,b=this.portalUrl+"/sharing/rest/content/users/"+b+(e&&"/"!==e?"/"+e:"")+"/items/"+this.currentGpItemId+"/update",a&&(c=a.item.properties),f.isDefined(c)||(c={}),f.isDefined(c.jobUrl)||(c.jobUrl=this._toolServiceUrl+"/jobs/"+this._jobInfo.jobId,c.jobType="GPServer",c.jobId=this._jobInfo.jobId,c.jobStatus="processing",this.itemParams.properties=c),c=d.mixin({f:"json"},this.itemParams),a&&
c.folder===a.item.folder&&delete c.folder,a&&a.item&&c.tags===a.item.tags.toString()&&delete c.tags,a&&a.item&&c.snippet===a.item.snippet&&delete c.snippet,a&&a.item&&c.description===a.item.description&&delete c.description,c.properties&&(c.properties=g.toJson(c.properties)),c.text&&(c.text=g.toJson(c.text)),a=k({url:b,content:c},{usePost:!0}),a.then(d.hitch(this,this._handleItemUpdate),d.hitch(this,this._handleUpdateItemError)),a},_handleItemUpdate:function(a){this.isOutputLayerItemUpdated=!0},_handleItemDataUpdate:function(a){},
_handleUpdateItemError:function(a){this.isOutputLayerItemUpdated=!0;this.emit("job-fail",{message:a.message+(a.details?a.details.toString():""),jobParams:this.jobParams})},_handleErrorResponse:function(a){this.emit("job-fail",a)},_refreshItem:function(){var a,b;if(a=h.id.findCredential(this.portalUrl).userId)return b=this.itemParams.folder,a=this.portalUrl+"/sharing/rest/content/users/"+a+(b&&"/"!==b?"/"+b:"")+"/items/"+this.currentGpItemId+"/refresh",k({url:a,content:{f:"json"}},{usePost:!0})},_handleItemRefresh:function(a){},
_readItem:function(){var a,b;if(a=h.id.findCredential(this.portalUrl).userId)return b=this.itemParams.folder,a=this.portalUrl+"/sharing/rest/content/users/"+a+(b&&"/"!==b?"/"+b:"")+"/items/"+this.currentGpItemId,a=k({url:a,content:{f:"json"}}),a.then(d.hitch(this,this._updateItem))},_gpJobStatus:function(a){a.jobParams=this.jobParams;a.resultParameter=this.resultParameter;a.returnProcessInfo=this.jobParams.returnProcessInfo;a.getResultLyrInfos=this.getResultLyrInfos;a.currentGpItemId=this.currentGpItemId;
a.itemParams=this.itemParams;"esriJobFailed"===a.jobStatus||"esriJobSucceeded"===a.jobStatus?(a.messages&&(a.message=this._buildErrorMsg(a)),this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null,this._gpJobComplete(a)),"esriJobFailed"===a.jobStatus&&this._deleteItem(!1)):"esriJobCancelled"===a.jobStatus&&(this.itemParams?this._deleteItem(!0):this.emit("job-cancel",a));this.emit("job-status",a);this._jobInfo=a;this.itemParams&&!this.isOutputLayerItemUpdated&&this._readItem()},_updateRefreshItem:function(a){var b=
[],e=a[0];this.doRefreshItem&&b.push(this._refreshItem());b.push(this._readItem());u(b).then(d.hitch(this,function(a){e.outputLayerName=g.fromJson(this.jobParams.OutputName).serviceProperties.name;e.value.itemId=this.currentGpItemId;e.analysisInfo={toolName:this.toolName,jobParams:this.jobParams};this.emit("job-result",e)}),d.hitch(this,this._handleDeleteItemError))},_gpJobComplete:function(a){var b;"esriJobSucceeded"===a.jobStatus&&(a.jobParams=this.jobParams,this.emit("job-success",a),u(this._getGpResultData(a)).then(d.hitch(this,
function(e){e=l.filter(e,function(a){var b=!0;f.isDefined(a.value.empty)?b=a.value.empty:f.isDefined(a.value.url)||f.isDefined(a.value.itemId)?b=!1:f.isDefined(a.value.featureSet)&&(b=!1);if(!b)return a});0===e.length?(this.currentGpItemId&&this._deleteItem(!1),this.emit("job-fail",{message:this.i18n.emptyResultInfoMsg,type:"warning",jobParams:this.jobParams})):(f.isDefined(this.itemParams)&&this.itemParams.properties&&this.itemParams.properties.jobStatus&&"processing"===this.itemParams.properties.jobStatus&&
(this.itemParams.properties.jobStatus="completed"),l.forEach(e,function(a){if(a.value.featureSet&&!a.value.url)a.value.featureSet.spatialReference=a.value.layerDefinition.spatialReference;else if(a.value.url&&-1!==a.value.url.indexOf("/FeatureServer/")&&a.value.layerInfo&&a.value.layerInfo.popupInfo){var b=a.value.url.match(/[0-9]+$/g)[0];this._popupInfo[b]=a.value.layerInfo.popupInfo}},this),b=e[0],this.jobParams.returnProcessInfo?this.gp.getResultData(a.jobId,"ProcessInfo").then(d.hitch(this,function(a){var c=
[];l.forEach(a.value,function(a){c.push(g.fromJson(a))},this);this.currentGpItemId?(this.itemParams.description=q.buildReport(c),this._updateRefreshItem(e)):(b.analysisReport=q.buildReport(c),this.emit("job-result",b))})):this.currentGpItemId?this._updateRefreshItem(e):this.emit("job-result",b))})))},_gpJobFailed:function(a){d.clone(a).jobParams=this.jobParams;this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null);a.messages&&(a.message=this._buildErrorMsg(a));this.emit("job-fail",
a)},_getGpResultData:function(a){var b=[],e=[];"string"===typeof this.resultParameter?e.push(this.resultParameter):this.resultParameter instanceof Array&&(e=this.resultParameter);l.forEach(e,function(c,e){b.push(this.gp.getResultData(a.jobId,c))},this);return b},cancel:function(a){this.gp.cancelJob(a.jobId).then(d.hitch(this,function(a){"esriJobCancelled"===a.jobStatus&&(this.itemParams?this._deleteItem(!0):this.emit("job-cancel",a))}),function(a){})},checkJobStatus:function(a){this.signInPromise.then(d.hitch(this,
function(){this.gp.setUpdateDelay(3E3);this._checkTimer=setInterval(d.hitch(this,this._checkStatus,a,d.hitch(this,this._gpJobStatus),d.hitch(this,this._gpJobFailed)),3E3)}))},_checkStatus:function(a,b,e){this.gp.checkJobStatus(a,b,e)},_deleteItem:function(a){var b,e;(b=h.id.findCredential(this.portalUrl).userId)&&this.itemParams&&(e=f.isDefined(this.itemParams.folder)?this.itemParams.folder:"",b=this.portalUrl+"/sharing/rest/content/users/"+b+(e&&"/"!==e?"/"+e:"")+"/items/"+this.currentGpItemId+"/delete",
k({url:b,content:{f:"json"}},{usePost:!0}).then(d.hitch(this,this._handleItemDelete,a),d.hitch(this,this._handleDeleteItemError)))},_handleItemDelete:function(a,b){a&&this.emit("job-cancel",b)},_handleDeleteItemError:function(a){this.emit("job-fail",{message:a.message+(a.details?a.details.toString():""),jobParams:this.jobParams})},_initFolderStore:function(a,b){this._fportal=this.portalSelf?new a.Portal({url:this.portalUrl,self:this.portalSelf}):new a.Portal(this.portalUrl);this._fportal.signIn().then(d.hitch(this,
function(a){this.portalUser=a;this.portalUser.getFolders().then(d.hitch(this,function(a){a=q.createFolderStore(a,this.portalUser.username);b.resolve(a)}))}))},getFolderStore:function(){var a=new n,b,e,c,f;this.folderStore?a.resolve(this.folderStore):this.signInPromise.then(d.hitch(this,function(d){b=["../../arcgis/Portal"];e=this._counter++;c=this;this._rids&&this._rids.push(e);t(b,function(b){f=c._rids?l.indexOf(c._rids,e):-1;-1!==f&&(c._rids.splice(f,1),c._initFolderStore(b,a))})}));return a},_checkToolUrl:function(){var a=
new n;this.analysisGpServer?(this._toolServiceUrl&&this.gp||this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName),a.resolve({success:!0})):this._getSelf(this.portalUrl).then(d.hitch(this,function(b){(this.analysisGpServer=b.helperServices.analysis&&b.helperServices.analysis.url?b.helperServices.analysis.url:null)&&this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName);a.resolve({success:!0})}));return a},getCreditsEstimate:function(a,b){var e,c,f,g,h;c=new n;this._checkToolUrl().then(d.hitch(this,
function(E){this._toolServiceUrl?h=this._toolServiceUrl:(g=this.portalUrl&&-1!==this.portalUrl.indexOf("dev")?"dev":this.portalUrl&&-1!==this.portalUrl.indexOf("qa")?"qa":"",h="http://analysis"+g+".arcgis.com/arcgis/rest/services/tasks/GPServer/"+this.toolName);e=h.replace("/"+a,"/exts/Estimate/"+a);f=d.mixin({f:"json"},b);k({url:e,content:f},{usePost:!0}).then(function(a){c.resolve(a)},function(a){c.resolve(a)})}));return c},_signIn:function(a,b){var e,c,g,r,m;this.signInPromise=new n;b?(e=["../../arcgis/Portal"],
c=this._counter++,g=this,this._rids&&this._rids.push(c),t(e,d.hitch(this,function(b){r=g._rids?l.indexOf(g._rids,c):-1;-1!==r&&(g._rids.splice(r,1),this._portal=this.portalSelf?new b.Portal({url:a,self:this.portalSelf}):new b.Portal(a),this._portal.signIn().then(d.hitch(this,function(a){this.portalUser=a;this._portal.helperServices&&this._portal.helperServices.analysis&&this._portal.helperServices.analysis.url?(this.analysisGpServer=this._portal.helperServices.analysis.url,this.showGeoAnalyticsParams&&
this._portal.helperServices.geoanalytics&&(this.analysisGpServer=this._portal.helperServices.geoanalytics.url),k({url:this.analysisGpServer,content:{f:"json"},callbackParamName:"callback"}).then(d.hitch(this,function(a){m=h.id.findCredential(this.analysisGpServer);this.signInPromise.resolve(m)}),d.hitch(this,function(a){this.signInPromise.reject(a)}))):this.signInPromise.resolve(a)}),d.hitch(this,this._handleSignInError)))}))):k({url:a,content:{f:"json"},callbackParamName:"callback"}).then(d.hitch(this,
function(b){var c;b=h.id.findCredential(a);f.isDefined(b)?(c=h.id.findServerInfo(this._toolServiceUrl),f.isDefined(c)&&f.isDefined(c.owningSystemUrl)&&(this.portalUrl=c.owningSystemUrl),this.signInPromise.resolve(b)):h.id.getCredential(a).then(d.hitch(this,function(b){b=h.id.findCredential(a);c=h.id.findServerInfo(this._toolServiceUrl);f.isDefined(c)&&f.isDefined(c.owningSystemUrl)&&(this.portalUrl=c.owningSystemUrl);this.signInPromise.resolve(b)}),d.hitch(this,this._handleSignInError))}),d.hitch(this,
this._handleSignInError));return this.signInPromise},_handleSignInError:function(a){this.emit("job-fail",{message:this.i18n.analysisSignInErrorMsg,messageCode:"AB_0003"});this.signInPromise.reject(a)},_buildErrorMsg:function(a){var b="",e=[],c,d,e=l.filter(a.messages,function(a){if(("esriJobMessageTypeError"===a.type||"esriJobMessageTypeWarning"===a.type)&&-1!==a.description.indexOf("messageCode"))return a.description},this);0<e.length&&l.forEach(e,function(e){try{c=g.fromJson(e.description)}catch(F){c=
e.description}d="";"esriJobMessageTypeWarning"===e.type&&(a.type="warning");c.messageCode?(d=f.isDefined(this.i18n[c.messageCode])?this.i18n[c.messageCode]:c.message,d=f.isDefined(c.params)?v.substitute(d,c.params):d,b+=d+"\x26nbsp;"):c.error&&c.error.messageCode?(d=f.isDefined(this.i18n[c.error.messageCode])?this.i18n[c.error.messageCode]:c.error.message,d=f.isDefined(c.error.params)?v.substitute(d,c.error.params):d,b+=d+"\x26nbsp;"):b+=c+"\x26nbsp;"},this);return b},_toolServiceUrlSetter:function(a){this._toolServiceUrl=
a;this.gp=new w(a)},_setToolServiceUrlAttr:function(a){this._toolServiceUrl=a;this.gp=new w(a)},checkCreditLimitsAttr:function(a){this.checkCreditLimits=a}});x("extend-esri")&&d.setObject("dijit.analysis.AnalysisBase",m,h);return m});