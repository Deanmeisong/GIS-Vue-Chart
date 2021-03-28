//>>built
define("dojox/gfx/arc",["./_base","dojo/_base/lang","./matrix"],function(x,z,b){function n(b){var e=Math.cos(b);b=Math.sin(b);var c={x:e+4/3*(1-e),y:b-4/3*e*(1-e)/b};return{s:{x:e,y:-b},c1:{x:c.x,y:-c.y},c2:c,e:{x:e,y:b}}}var p=2*Math.PI,t=Math.PI/4,q=Math.PI/8,y=t+q,u=n(q);return x.arc={unitArcAsBezier:n,curvePI4:u,arcAsBezier:function(g,e,c,a,h,k,l,f){h=!!h;k=!!k;var m=b._degToRad(a);a=e*e;var r=c*c,d=b.multiplyPoint(b.rotate(-m),{x:(g.x-l)/2,y:(g.y-f)/2}),v=d.x*d.x,w=d.y*d.y;a=Math.sqrt((a*r-a*
w-r*v)/(a*w+r*v));isNaN(a)&&(a=0);a={x:a*e*d.y/c,y:-a*c*d.x/e};h==k&&(a={x:-a.x,y:-a.y});a=b.multiplyPoint([b.translate((g.x+l)/2,(g.y+f)/2),b.rotate(m)],a);e=b.normalize([b.translate(a.x,a.y),b.rotate(m),b.scale(e,c)]);a=b.invert(e);g=b.multiplyPoint(a,g);f=b.multiplyPoint(a,l,f);l=Math.atan2(g.y,g.x);a=l-Math.atan2(f.y,f.x);k&&(a=-a);0>a?a+=p:a>p&&(a-=p);c=q;f=u;c=k?c:-c;g=[];for(h=a;0<h;h-=t)h<y&&(c=h/2,f=n(c),c=k?c:-c,h=0),d=b.normalize([e,b.rotate(l+c)]),k?(a=b.multiplyPoint(d,f.c1),m=b.multiplyPoint(d,
f.c2),d=b.multiplyPoint(d,f.e)):(a=b.multiplyPoint(d,f.c2),m=b.multiplyPoint(d,f.c1),d=b.multiplyPoint(d,f.s)),g.push([a.x,a.y,m.x,m.y,d.x,d.y]),l+=2*c;return g}}});