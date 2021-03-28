//>>built
require({cache:{"url:dojox/widget/Pager/Pager.html":'\x3cdiv dojoAttachPoint\x3d"pagerContainer" tabIndex\x3d"0" dojoAttachEvent\x3d"onkeypress: _handleKey, onfocus: _a11yStyle, onblur:_a11yStyle" class\x3d"${orientation}PagerContainer"\x3e\r\n    \x3cdiv class\x3d"pagerContainer"\x3e\r\n\t\t\x3cdiv dojoAttachPoint\x3d"pagerContainerStatus" class\x3d"${orientation}PagerStatus"\x3e\x3c/div\x3e\r\n\t\t\x3cdiv dojoAttachPoint\x3d"pagerContainerView" class\x3d"${orientation}PagerView"\x3e\r\n\t\t    \x3cdiv dojoAttachPoint\x3d"pagerItemContainer"\x3e\x3cul dojoAttachPoint\x3d"pagerItems" class\x3d"pagerItems"\x3e\x3c/ul\x3e\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3cdiv dojoAttachPoint\x3d"pagerContainerPager" class\x3d"${orientation}PagerPager"\x3e\r\n\t\t\t\x3cdiv tabIndex\x3d"0" dojoAttachPoint\x3d"pagerNext" class\x3d"pagerIconContainer" dojoAttachEvent\x3d"onclick: _next"\x3e\x3cimg dojoAttachPoint\x3d"pagerIconNext" src\x3d"${iconNext}" alt\x3d"Next" /\x3e\x3c/div\x3e\r\n\t\t\t\x3cdiv tabIndex\x3d"0" dojoAttachPoint\x3d"pagerPrevious" class\x3d"pagerIconContainer" dojoAttachEvent\x3d"onclick: _previous"\x3e\x3cimg dojoAttachPoint\x3d"pagerIconPrevious" src\x3d"${iconPrevious}" alt\x3d"Previous" /\x3e\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\t\x3cdiv dojoAttachPoint\x3d"containerNode" style\x3d"display:none"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojox/widget/Pager","dojo/aspect dojo/_base/array dojo/_base/declare dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/fx dojo/_base/kernel dojo/keys dojo/_base/lang dojo/on dijit/_WidgetBase dijit/_TemplatedMixin ./PagerItem dojo/text!./Pager/Pager.html".split(" "),function(t,v,w,h,x,q,y,p,a,l,z,m,n,u,A,B,C,D){z.experimental("dojox.widget.Pager");return w("dojox.widget.Pager",[A,B],{templateString:D,iconPrevious:"",iconNext:"",iconPage:require.toUrl("dojox/widget/Pager/images/pageInactive.png"),
iconPageActive:require.toUrl("dojox/widget/Pager/images/pageActive.png"),store:null,orientation:"horizontal",statusPos:"leading",pagerPos:"center",duration:500,itemSpace:2,resizeChildren:!0,itemClass:C,itemsPage:3,postMixInProperties:function(){var a="horizontal"==this.orientation;n.mixin(this,{_totalPages:0,_currentPage:1,dirClass:"pager"+(a?"Horizontal":"Vertical"),iconNext:require.toUrl("dojox/widget/Pager/images/"+(a?"h":"v")+"Next.png"),iconPrevious:require.toUrl("dojox/widget/Pager/images/"+
(a?"h":"v")+"Previous.png")})},_next:function(){this.isLeftToRight()?this._pagerNext():this._pagerPrevious()},_previous:function(){this.isLeftToRight()?this._pagerPrevious():this._pagerNext()},postCreate:function(){this.inherited(arguments);this.store.fetch({onComplete:n.hitch(this,"_init")})},_a11yStyle:function(a){q.toggle(a.target,"pagerFocus","focus"==a.type)},_handleKey:function(a){switch(a.charCode==m.SPACE?m.SPACE:a.keyCode){case m.UP_ARROW:case m.RIGHT_ARROW:case 110:case 78:a.preventDefault();
this._next();break;case m.DOWN_ARROW:case m.LEFT_ARROW:case 112:case 80:a.preventDefault();this._previous();break;case m.ENTER:switch(a.target){case this.pagerNext:this._next();break;case this.pagerPrevious:this._previous()}}},_init:function(a){this.items=a;this._renderPages();this._renderStatus();this._renderPager()},generatePagerItem:function(a,f){var b=this.itemClass,b="string"==typeof b?n.getObject(b):b,e=y.create("div",{innerHTML:a.content});return new b({id:this.id+"-item-"+(f+1)},e)},_renderPages:function(){var b=
this.pagerContainerView,f="horizontal"==this.orientation;if(f){var c=p.getMarginBox(this.pagerContainerPager).h,e=p.getMarginBox(this.pagerContainerStatus).h;if("center"!=this.pagerPos)var d=c+e;else{var d=e,k=this.pagerIconNext.width,g=a.get(b,"width");a.set(b,{width:g-2*k+"px",marginLeft:this.pagerIconNext.width+"px",marginRight:this.pagerIconNext.width+"px"})}d=a.get(this.pagerContainer,"height")-d;a.set(this.pagerContainerView,"height",d+"px");var h=Math.floor(a.get(b,"width")/this.itemsPage);
"trailing"==this.statusPos?("center"!=this.pagerPos&&a.set(b,"marginTop",c+"px"),a.set(b,"marginBottom",e+"px")):(a.set(b,"marginTop",e+"px"),"center"!=this.pagerPos&&a.set(b,"marginTop",c+"px"))}else c=p.getMarginBox(this.pagerContainerPager).w,e=p.getMarginBox(this.pagerContainerStatus).w,a.get(this.pagerContainer,"width"),"center"!=this.pagerPos?d=c+e:(d=e,k=this.pagerIconNext.height,g=a.get(b,"height"),a.set(b,{height:g-2*k+"px",marginTop:this.pagerIconNext.height+"px",marginBottom:this.pagerIconNext.height+
"px"})),d=a.get(this.pagerContainer,"width")-d,a.set(b,"width",d+"px"),h=Math.floor(a.get(b,"height")/this.itemsPage),"trailing"==this.statusPos?("center"!=this.pagerPos&&a.set(b,"marginLeft",c+"px"),a.set(b,"marginRight",e+"px")):(a.set(b,"marginLeft",e+"px"),"center"!=this.pagerPos&&a.set(b,"marginRight",c+"px"));var l="padding"+(f?"Left":"Top"),n="padding"+(f?"Right":"Bottom");v.forEach(this.items,function(e,c){var d=this.generatePagerItem(e,c),k={};this.pagerItems.appendChild(d.domNode);k[f?"width":
"height"]=h-this.itemSpace+"px";var g=f?"height":"width";k[g]=a.get(b,g)+"px";a.set(d.containerNode,k);this.resizeChildren&&d.resizeChildren();d.parseChildren();a.set(d.domNode,"position","absolute");c<this.itemsPage?(k=c*h,g=f?"left":"top",a.set(d.domNode,f?"top":"left","0px"),a.set(d.domNode,g,k+"px")):(a.set(d.domNode,"top","-1000px"),a.set(d.domNode,"left","-1000px"));a.set(d.domNode,n,this.itemSpace/2+"px");a.set(d.domNode,l,this.itemSpace/2+"px")},this)},_renderPager:function(){var b=this.pagerContainerPager;
"horizontal"==this.orientation?("center"!=this.statusPos&&("trailing"==this.statusPos?a.set(b,"top","0px"):a.set(b,"bottom","0px")),a.set(this.pagerNext,"right","0px"),a.set(this.pagerPrevious,"left","0px")):("trailing"==this.statusPos?a.set(b,"left","0px"):a.set(b,"right","0px"),a.set(this.pagerNext,"bottom","0px"),a.set(this.pagerPrevious,"top","0px"))},_renderStatus:function(){this._totalPages=Math.ceil(this.items.length/this.itemsPage);this.iconsLoaded=this.iconHeight=this.iconWidth=0;this._iconConnects=
[];for(var b=1;b<=this._totalPages;b++){var f=new Image,c=b;u(f,"click",n.hitch(this,"_pagerSkip",c));this._iconConnects[c]=u(f,"load",n.hitch(this,function(b){this.iconWidth+=f.width;this.iconHeight+=f.height;this.iconsLoaded++;if(this._totalPages==this.iconsLoaded)if("horizontal"==this.orientation){if("trailing"==this.statusPos){if("center"==this.pagerPos){var d=a.get(this.pagerContainer,"height"),c=a.get(this.pagerContainerStatus,"height");a.set(this.pagerContainerPager,"top",d/2-c/2+"px")}a.set(this.pagerContainerStatus,
"bottom","0px")}else"center"==this.pagerPos&&(d=a.get(this.pagerContainer,"height"),c=a.get(this.pagerContainerStatus,"height"),a.set(this.pagerContainerPager,"bottom",d/2-c/2+"px")),a.set(this.pagerContainerStatus,"top","0px");d=a.get(this.pagerContainer,"width")/2-this.iconWidth/2;a.set(this.pagerContainerStatus,this.isLeftToRight()?"paddingLeft":"paddingRight",d+"px")}else"trailing"==this.statusPos?("center"==this.pagerPos&&(d=a.get(this.pagerContainer,"width"),c=a.get(this.pagerContainerStatus,
"width"),a.set(this.pagerContainerPager,"left",d/2-c/2+"px")),a.set(this.pagerContainerStatus,"right","0px")):("center"==this.pagerPos&&(d=a.get(this.pagerContainer,"width"),c=a.get(this.pagerContainerStatus,"width"),a.set(this.pagerContainerPager,"right",d/2-c/2+"px")),a.set(this.pagerContainerStatus,"left","0px")),d=a.get(this.pagerContainer,"height")/2-this.iconHeight/2,a.set(this.pagerContainerStatus,"paddingTop",d+"px");this._iconConnects[b].remove()},c));f.src=b==this._currentPage?this.iconPageActive:
this.iconPage;c=b;q.add(f,this.orientation+"PagerIcon");x.set(f,"id",this.id+"-status-"+b);this.pagerContainerStatus.appendChild(f);"vertical"==this.orientation&&a.set(f,"display","block")}},_pagerSkip:function(a){if(this._currentPage!=a){var b;a<this._currentPage?(b=this._currentPage-a,a=this._totalPages+a-this._currentPage):(b=this._totalPages+this._currentPage-a,a-=this._currentPage);var c=a>b;this._toScroll=c?b:a;var e=c?"_pagerPrevious":"_pagerNext",d=t.after(this,"onScrollEnd",n.hitch(this,
function(){this._toScroll--;if(1>this._toScroll)d.remove();else this[e]()}),!0);this[e]()}},_pagerNext:function(){if(!this._anim){for(var b=[],f=this._currentPage*this.itemsPage;f>(this._currentPage-1)*this.itemsPage;f--)if(h.byId(this.id+"-item-"+f)){var c=h.byId(this.id+"-item-"+f),e=p.getMarginBox(c);"horizontal"==this.orientation?(e=e.l-this.itemsPage*e.w,b.push(l.slideTo({node:c,left:e,duration:this.duration}))):(e=e.t-this.itemsPage*e.h,b.push(l.slideTo({node:c,top:e,duration:this.duration})))}var d=
this._currentPage;this._currentPage==this._totalPages?this._currentPage=1:this._currentPage++;for(var k=this.itemsPage,f=this._currentPage*this.itemsPage;f>(this._currentPage-1)*this.itemsPage;f--){if(h.byId(this.id+"-item-"+f))if(c=h.byId(this.id+"-item-"+f),e=p.getMarginBox(c),"horizontal"==this.orientation){var g=a.get(this.pagerContainerView,"width")+(k-1)*e.w-1;a.set(c,"left",g+"px");a.set(c,"top","0px");e=g-this.itemsPage*e.w;b.push(l.slideTo({node:c,left:e,duration:this.duration}))}else g=
a.get(this.pagerContainerView,"height")+(k-1)*e.h-1,a.set(c,"top",g+"px"),a.set(c,"left","0px"),e=g-this.itemsPage*e.h,b.push(l.slideTo({node:c,top:e,duration:this.duration}));k--}this._anim=l.combine(b);var m=t.after(this._anim,"onEnd",n.hitch(this,function(){delete this._anim;this.onScrollEnd();m.remove()}),!0);this._anim.play();h.byId(this.id+"-status-"+d).src=this.iconPage;h.byId(this.id+"-status-"+this._currentPage).src=this.iconPageActive}},_pagerPrevious:function(){if(!this._anim){for(var b=
[],f=this._currentPage*this.itemsPage;f>(this._currentPage-1)*this.itemsPage;f--)if(h.byId(this.id+"-item-"+f)){var c=h.byId(this.id+"-item-"+f),e=p.getMarginBox(c);if("horizontal"==this.orientation){var d=a.get(c,"left")+this.itemsPage*e.w;b.push(l.slideTo({node:c,left:d,duration:this.duration}))}else d=a.get(c,"top")+this.itemsPage*e.h,b.push(l.slideTo({node:c,top:d,duration:this.duration}))}var k=this._currentPage;1==this._currentPage?this._currentPage=this._totalPages:this._currentPage--;for(var g=
this.itemsPage,m=1,f=this._currentPage*this.itemsPage;f>(this._currentPage-1)*this.itemsPage;f--){if(h.byId(this.id+"-item-"+f))if(c=h.byId(this.id+"-item-"+f),e=p.getMarginBox(c),"horizontal"==this.orientation){var r=-(m*e.w)+1;a.set(c,"left",r+"px");a.set(c,"top","0px");d=(g-1)*e.w;b.push(l.slideTo({node:c,left:d,duration:this.duration}));d=r+this.itemsPage*e.w;b.push(l.slideTo({node:c,left:d,duration:this.duration}))}else r=-(m*e.h+1),a.set(c,"top",r+"px"),a.set(c,"left","0px"),d=(g-1)*e.h,b.push(l.slideTo({node:c,
top:d,duration:this.duration}));g--;m++}this._anim=l.combine(b);var q=t.after(this._anim,"onEnd",n.hitch(this,function(){delete this._anim;this.onScrollEnd();q.remove()}),!0);this._anim.play();h.byId(this.id+"-status-"+k).src=this.iconPage;h.byId(this.id+"-status-"+this._currentPage).src=this.iconPageActive}},onScrollEnd:function(){}})});