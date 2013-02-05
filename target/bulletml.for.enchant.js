/*
 bulletml.js v0.5.0-SNAPSHOT

 The MIT License (MIT)
 Copyright (c) 2012-2013 daishi@dev7.jp All Rights Reserved.

 Permission is hereby granted, free of charge, to any person obtaining a
 copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
*/
var bulletml={GLOBAL:this,_temp:function(){}};
(function(){function l(a){var b=new bulletml.Root;if(a=a.getElementsByTagName("bulletml")[0]){i(a,"type",function(a){b.type=a});var c=a.getElementsByTagName("action");if(c)for(var h=0,e=c.length;h<e;h++)if(c[h].parentNode===a){var d=p(b,c[h]);d&&(b.actions[b.actions.length]=d)}if(c=a.getElementsByTagName("bullet")){h=0;for(e=c.length;h<e;h++)c[h].parentNode===a&&(d=m(b,c[h]))&&(b.bullets[b.bullets.length]=d)}if(c=a.getElementsByTagName("fire")){h=0;for(e=c.length;h<e;h++)c[h].parentNode===a&&(d=q(b,
c[h]))&&(b.fires[b.fires.length]=d)}return b}}function p(a,b){var c=new bulletml.Action;i(b,"label",function(a){c.label=a});g(b,".",function(b){switch(b.tagName.toLowerCase()){case "action":c.commands[c.commands.length]=p(a,b);break;case "actionref":c.commands[c.commands.length]=n(a,b);break;case "fire":c.commands[c.commands.length]=q(a,b);break;case "fireref":var d=c.commands,k=c.commands.length,l=new bulletml.FireRef;i(b,"label",function(a){l.label=a});g(b,/param$/,function(a){l.params[l.params.length]=
j(a)});l.root=a;d[k]=l;break;case "changedirection":var d=c.commands,k=c.commands.length,m=new bulletml.ChangeDirection;m.root=a;f(b,"direction",function(a){m.direction=e(new bulletml.Direction,a)});f(b,"term",function(a){m.term=j(a)});d[k]=m;break;case "changespeed":var d=c.commands,k=c.commands.length,t=new bulletml.ChangeSpeed;t.root=a;f(b,"speed",function(a){t.speed=e(new bulletml.Speed,a)});f(b,"term",function(a){t.term=j(a)});d[k]=t;break;case "accel":var d=c.commands,k=c.commands.length,r=
new bulletml.Accel;r.root=a;f(b,"horizontal",function(a){r.horizontal=e(new bulletml.Horizontal,a)});f(b,"vertical",function(a){r.vertical=e(new bulletml.Vertical,a)});f(b,"term",function(a){r.term=j(a)});d[k]=r;break;case "wait":var d=c.commands,k=c.commands.length,u=new bulletml.Wait;u.root=a;u.value=j(b);d[k]=u;break;case "vanish":b=c.commands;d=c.commands.length;k=new bulletml.Vanish;k.root=a;b[d]=k;break;case "repeat":var d=c.commands,k=c.commands.length,s=new bulletml.Repeat;f(b,"action",function(b){s.action=
p(a,b)});f(b,"actionRef",function(b){s.action=n(a,b)});f(b,"times",function(a){s.times=j(a)});s.root=a;d[k]=s}});c.root=a;return c}function n(a,b){var c=new bulletml.ActionRef;i(b,"label",function(a){c.label=a});g(b,/param$/,function(a){c.params[c.params.length]=j(a)});c.root=a;return c}function m(a,b){var c=new bulletml.Bullet;i(b,"label",function(a){c.label=a});f(b,"direction",function(a){c.direction=e(new bulletml.Direction,a)});f(b,"speed",function(a){c.speed=e(new bulletml.Speed,a)});g(b,/(action)|(actionRef)$/,
function(b){"action"==b.tagName.toLowerCase()?c.actions[c.actions.length]=p(a,b):"actionref"==b.tagName.toLowerCase()&&(c.actions[c.actions.length]=n(a,b))});c.root=a;return c}function q(a,b){var c=new bulletml.Fire;i(b,"label",function(a){c.label=a});f(b,"direction",function(a){c.direction=e(new bulletml.Direction,a)});f(b,"speed",function(a){c.speed=e(new bulletml.Speed,a)});f(b,"bullet",function(b){c.bullet=m(a,b)});f(b,"bulletref",function(b){var d=new bulletml.BulletRef;i(b,"label",function(a){d.label=
a});g(b,/param$/,function(a){d.params[d.params.length]=j(a)});d.root=a;c.bullet=d});if(!c.bullet)throw Error("fire has no bullet or bulletRef.");c.root=a;return c}function e(a,b){i(b,"type",function(b){a.type=b});j(b,function(b){a.value=b});return a}function d(a,b){for(var c=0,h=a.length;c<h;c++)if(a[c].label==b)return a[c]}function f(a,b,c,h){for(var b=b.toLowerCase(),a=a.childNodes,d=0,e=a.length;d<e;d++)if(a[d].tagName&&a[d].tagName.toLowerCase()==b)return c&&c(a[d]),a[d];h&&h();return null}function g(a,
b,c){for(var a=a.childNodes,h=0,d=a.length;h<d;h++)a[h].tagName&&a[h].tagName.toLowerCase().match(b)&&c(a[h])}function i(a,b,c,h){if(a=a.attributes[b])return c&&c(a.value),a;h&&h()}function j(a,b){var c=a.textContent.trim();if(void 0!==c||a.childNodes[0]&&(c=a.childNodes[0].nodeValue,void 0!==c))return b&&b(c),c}bulletml.build=function(a){if("string"===typeof a)var b=new DOMParser,a=l(b.parseFromString(a,"application/xml"));else if(a.getElementsByTagName("bulletml"))a=l(a);else throw Error("cannot build "+
a);return a};bulletml.Root=function(a){this.type="none";this.root=this;this.actions=[];this.bullets=[];this.fires=[];if(void 0!==a){for(var b in a)a.hasOwnProperty(b)&&(a[b].label=b,a[b]instanceof bulletml.Action?this.actions.push(a[b]):a[b]instanceof bulletml.Bullet?this.bullets.push(a[b]):a[b]instanceof bulletml.Fire&&this.fires.push(a[b]));a=0;for(b=this.actions.length;a<b;a++)this.actions[a].setRoot(this);a=0;for(b=this.bullets.length;a<b;a++)this.bullets[a].setRoot(this);a=0;for(b=this.fires.length;a<
b;a++)this.fires[a].setRoot(this)}};bulletml.Root.prototype.findAction=function(a){return d(this.actions,a)};bulletml.Root.prototype.getTopActionLabels=function(){for(var a=[],b=0,c=this.actions.length;b<c;b++){var h=this.actions[b];h.label&&0===h.label.indexOf("top")&&(a[a.length]=h.label)}return a};bulletml.Root.prototype.findActionOrThrow=function(a){var b;if(b=this.findAction(a))return b;throw Error("action labeled '"+a+"' is undefined.");};bulletml.Root.prototype.findBullet=function(a){return d(this.bullets,
a)};bulletml.Root.prototype.findBulletOrThrow=function(a){var b;if(b=this.findBullet(a))return b;throw Error("bullet labeled '"+a+"' is undefined.");};bulletml.Root.prototype.findFire=function(a){return d(this.fires,a)};bulletml.Root.prototype.findFireOrThrow=function(a){var b;if(b=this.findFire(a))return b;throw Error("fire labeled '"+a+"' is undefined.");};bulletml.Root.prototype.getWalker=function(a,b){var c=new bulletml.Walker(this,b),h=this.findAction(a);if(h)return c._action=h,c};bulletml.Walker=
function(a,b){this._root=a;this._stack=[];this._cursor=-1;this._action=null;this._localScope={};this._globalScope={$rank:b||0}};bulletml.Walker.prototype.next=function(){this._cursor+=1;if(null!==this._action){var a=this._action.commands[this._cursor];if(void 0!==a){if(a instanceof bulletml.Action)return this.pushStack(),this._action=a,this._localScope=this.cloneScope(),this.next();if(a instanceof bulletml.ActionRef)return this.pushStack(),this._action=this._root.findActionOrThrow(a.label),this._localScope=
this.newScope(a.params),this.next();if(a instanceof bulletml.Repeat)return this._localScope.loopCounter=0,this._localScope.loopEnd=this.evalParam(a.times),this.pushStack(),this._action=a.action.clone(),this._localScope=this.cloneScope(),this.next();if(a instanceof bulletml.Fire){var b=new bulletml.Fire;b.bullet=a.bullet.clone(this);null!==a.direction&&(b.direction=new bulletml.Direction(this.evalParam(a.direction.value)),b.direction.type=a.direction.type);null!==a.speed&&(b.speed=new bulletml.Speed(this.evalParam(a.speed.value)),
b.speed.type=a.speed.type);b.option=a.option;return b}return a instanceof bulletml.FireRef?(this.pushStack(),this._action=new bulletml.Action,this._action.commands=[this._root.findFireOrThrow(a.label)],this._localScope=this.newScope(a.params),this.next()):a instanceof bulletml.ChangeDirection?(b=new bulletml.ChangeDirection,b.direction.type=a.direction.type,b.direction.value=this.evalParam(a.direction.value),b.term=this.evalParam(a.term),b):a instanceof bulletml.ChangeSpeed?(b=new bulletml.ChangeSpeed,
b.speed.type=a.speed.type,b.speed.value=this.evalParam(a.speed.value),b.term=this.evalParam(a.term),b):a instanceof bulletml.Accel?(b=new bulletml.Accel,b.horizontal.type=a.horizontal.type,b.horizontal.value=this.evalParam(a.horizontal.value),b.vertical.type=a.vertical.type,b.vertical.value=this.evalParam(a.vertical.value),b.term=this.evalParam(a.term),b):a instanceof bulletml.Wait?new bulletml.Wait(this.evalParam(a.value)):null}this.popStack();if(null===this._action)return null;if((a=this._action.commands[this._cursor])&&
"repeat"==a.commandName)this._localScope.loopCounter++,this._localScope.loopCounter<this._localScope.loopEnd&&(this.pushStack(),this._action=a.action.clone(),this._localScope=this.cloneScope());return this.next()}return null};bulletml.Walker.prototype.pushStack=function(){this._stack.push({action:this._action,cursor:this._cursor,scope:this._localScope});this._cursor=-1};bulletml.Walker.prototype.popStack=function(){var a=this._stack.pop();a?(this._cursor=a.cursor,this._action=a.action,this._localScope=
a.scope):(this._cursor=-1,this._action=null,this._localScope={})};bulletml.Walker.prototype.evalParam=function(a){var b;if("number"===typeof a)return a;if(isNaN(b=Number(a))){if((b=this._localScope[a])||(b=this._globalScope[a]))return b;if("$rand"==a)return Math.random()}else return b;b={};for(var c in this._globalScope)this._globalScope.hasOwnProperty(c)&&(b[c]=this._globalScope[c]);for(c in this._localScope)this._localScope.hasOwnProperty(c)&&(b[c]=this._localScope[c]);b.$rand=Math.random();b.$index=
this._localScope.loopCounter;return eval("bulletml._temp = function() { return "+a.split("$").join("this.$")+"}").bind(b)()};bulletml.Walker.prototype.newScope=function(a){var b={};if(a)for(var c=0,h=a.length;c<h;c++)b["$"+(c+1)]=this.evalParam(a[c]);else for(c in this._localScope)this._localScope.hasOwnProperty(c)&&(b[c]=this._localScope[c]);return b};bulletml.Walker.prototype.cloneScope=function(){var a={},b;for(b in this._localScope)this._localScope.hasOwnProperty(b)&&(a[b]=this._localScope[b]);
return a};bulletml.Bullet=function(){this.root=this.label=null;this.direction=new bulletml.Direction(0);this.speed=new bulletml.Speed(1);this.actions=[];this._localScope={}};bulletml.Bullet.prototype.getWalker=function(a){var a=new bulletml.Walker(this.root,a),b=new bulletml.Action;b.root=this.root;b.commands=this.actions;a._action=b;a._localScope=this._localScope;return a};bulletml.Bullet.prototype.clone=function(a){var b=new bulletml.Bullet;b.label=this.label;b.root=this.root;b.actions=this.actions;
b.direction=new bulletml.Direction(a.evalParam(this.direction.value));b.direction.type=this.direction.type;b.speed=new bulletml.Speed(a.evalParam(this.speed.value));b.speed.type=this.speed.type;b._localScope=a._localScope;return b};bulletml.Bullet.prototype.setRoot=function(a){this.root=a;for(var b=0,c=this.actions.length;b<c;b++)this.actions[b].setRoot(a)};bulletml.BulletRef=function(){this.label=this.root=null;this.params=[]};bulletml.BulletRef.prototype.clone=function(a){var b=a._localScope;a._localScope=
a.newScope(this.params);var c=this.root.findBulletOrThrow(this.label).clone(a);a._localScope=b;return c};bulletml.BulletRef.prototype.setRoot=function(a){this.root=a};bulletml.Command=function(){this.commandName=""};bulletml.Command.prototype.setRoot=function(a){this.root=a};bulletml.Action=function(){this.commandName="action";this.root=this.label=null;this.commands=[];this.params=[]};bulletml.Action.prototype=new bulletml.Command;bulletml.Action.prototype.setRoot=function(a){this.root=a;for(var b=
0,c=this.commands.length;b<c;b++)this.commands[b].setRoot(a)};bulletml.Action.prototype.clone=function(){var a=new bulletml.Action;a.label=this.label;a.root=this.root;a.commands=this.commands;return a};bulletml.ActionRef=function(){this.commandName="actionRef";this.root=this.label=null;this.params=[]};bulletml.ActionRef.prototype=new bulletml.Command;bulletml.ActionRef.prototype.clone=function(){var a=new bulletml.Action;a.root=this.root;a.commands.push(this);return a};bulletml.Fire=function(){this.commandName=
"fire";this.bullet=this.speed=this.direction=this.root=this.label=null;this.option=new bulletml.FireOption};bulletml.Fire.prototype=new bulletml.Command;bulletml.Fire.prototype.setRoot=function(a){this.root=a;this.bullet&&this.bullet.setRoot(a)};bulletml.FireRef=function(){this.commandName="fireRef";this.label=null;this.params=[]};bulletml.FireRef.prototype=new bulletml.Command;bulletml.ChangeDirection=function(){this.commandName="changeDirection";this.direction=new bulletml.Direction;this.term=0};
bulletml.ChangeDirection.prototype=new bulletml.Command;bulletml.ChangeSpeed=function(){this.commandName="changeSpeed";this.speed=new bulletml.Speed;this.term=0};bulletml.ChangeSpeed.prototype=new bulletml.Command;bulletml.Accel=function(){this.commandName="accel";this.horizontal=new bulletml.Horizontal;this.vertical=new bulletml.Vertical;this.term=0};bulletml.Accel.prototype=new bulletml.Command;bulletml.Wait=function(a){this.commandName="wait";this.value=a||0};bulletml.Wait.prototype=new bulletml.Command;
bulletml.Vanish=function(){this.commandName="vanish"};bulletml.Vanish.prototype=new bulletml.Command;bulletml.Repeat=function(){this.commandName="repeat";this.times=0;this.action=null;this.params=[]};bulletml.Repeat.prototype=new bulletml.Command;bulletml.Repeat.prototype.setRoot=function(a){this.root=a;this.action&&this.action.setRoot(a)};bulletml.Direction=function(a){this.type="aim";this.value=a||0};bulletml.Speed=function(a){this.type="absolute";this.value=void 0===a?1:a};bulletml.Horizontal=
function(a){this.type="absolute";this.value=a||0};bulletml.Vertical=function(a){this.type="absolute";this.value=a||0};bulletml.FireOption=function(a){a=a||{};this.offsetX=a.offsetX||0;this.offsetY=a.offsetY||0;this.autonomy=!!a.autonomy};bulletml.dsl=function(){for(var a in bulletml.dsl)bulletml.dsl.hasOwnProperty(a)&&(bulletml.GLOBAL[a]=bulletml.dsl[a])};bulletml.dsl.action=function(a){if(1<arguments.length)for(var b=0,c=arguments.length;b<c;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());
else{b=0;for(c=a.length;b<c;b++)a[b]instanceof Function&&(a[b]=a[b]())}var h=new bulletml.Action;if(a instanceof Array){if(a.some(function(a){return!(a instanceof bulletml.Command)}))throw Error("argument type error.");h.commands=a}else{b=0;for(c=arguments.length;b<c;b++)if(arguments[b]instanceof bulletml.Command)h.commands[b]=arguments[b];else throw Error("argument type error.");}return h};bulletml.dsl.actionRef=function(a,b){for(var c=0,h=arguments.length;c<h;c++)arguments[c]instanceof Function&&
(arguments[c]=arguments[c]());if(void 0===a)throw Error("label is required.");h=new bulletml.ActionRef;h.label=""+a;if(b instanceof Array)h.params=b;else for(c=1;c<arguments.length;c++)h.params.push(arguments[c]);return h};bulletml.dsl.bullet=function(a,b,c,h){for(var d=0,e=arguments.length;d<e;d++)arguments[d]instanceof Function&&(arguments[d]=arguments[d]());e=new bulletml.Bullet;for(d=0;d<arguments.length;d++)arguments[d]instanceof bulletml.Direction?e.direction=arguments[d]:arguments[d]instanceof
bulletml.Speed?e.speed=arguments[d]:arguments[d]instanceof bulletml.Action?e.actions.push(arguments[d]):arguments[d]instanceof bulletml.ActionRef?e.actions.push(arguments[d]):"string"===typeof arguments[d]&&(e.label=arguments[d]);return e};bulletml.dsl.bulletRef=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("label is required.");d=new bulletml.BulletRef;d.label=""+a;if(b instanceof Array)d.params=b;else for(c=
1;c<arguments.length;c++)d.params.push(arguments[c]);return d};bulletml.dsl.fire=function(a,b,c){for(var d=0,e=arguments.length;d<e;d++)arguments[d]instanceof Function&&(arguments[d]=arguments[d]());e=new bulletml.Fire;for(d=0;d<arguments.length;d++)arguments[d]instanceof bulletml.Direction?e.direction=arguments[d]:arguments[d]instanceof bulletml.Speed?e.speed=arguments[d]:arguments[d]instanceof bulletml.Bullet?e.bullet=arguments[d]:arguments[d]instanceof bulletml.BulletRef?e.bullet=arguments[d]:
arguments[d]instanceof bulletml.FireOption&&(e.option=arguments[d]);if(void 0===e.bullet)throw Error("bullet (or bulletRef) is required.");return e};bulletml.dsl.fireRef=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("label is required.");d=new bulletml.FireRef;d.label=""+a;if(b instanceof Array)d.params=b;else for(c=1;c<arguments.length;c++)d.params.push(arguments[c]);return d};bulletml.dsl.changeDirection=
function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("direction is required.");if(void 0===b)throw Error("term is required.");c=new bulletml.ChangeDirection;c.direction=a instanceof bulletml.Direction?a:new bulletml.Direction(a);c.term=b;return c};bulletml.dsl.changeSpeed=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("speed is required.");
if(void 0===b)throw Error("term is required.");c=new bulletml.ChangeSpeed;c.speed=a instanceof bulletml.Speed?a:new bulletml.Speed(a);c.term=b;return c};bulletml.dsl.accel=function(a,b,c){for(var d=0,e=arguments.length;d<e;d++)arguments[d]instanceof Function&&(arguments[d]=arguments[d]());e=new bulletml.Accel;for(d=0;d<arguments.length;d++)arguments[d]instanceof bulletml.Horizontal?e.horizontal=a:arguments[d]instanceof bulletml.Vertical?e.vertical=b:e.term=arguments[d];if(void 0===e.horizontal&&void 0===
e.vertical)throw Error("horizontal or vertical is required.");if(void 0===e.term)throw Error("term is required.");return e};bulletml.dsl.wait=function(a){for(var b=0,c=arguments.length;b<c;b++)arguments[b]instanceof Function&&(arguments[b]=arguments[b]());if(void 0===a)throw Error("value is required.");return new bulletml.Wait(a)};bulletml.dsl.vanish=function(){return new bulletml.Vanish};bulletml.dsl.repeat=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=
arguments[c]());if(void 0===a)throw Error("times is required.");if(void 0===b)throw Error("action is required.");d=new bulletml.Repeat;d.times=a;if(b instanceof bulletml.Action||b instanceof bulletml.ActionRef)d.action=b;else if(b instanceof Array)d.action=bulletml.dsl.action(b);else{for(var e=[],c=1;c<arguments.length;c++)e.push(arguments[c]);d.action=bulletml.dsl.action(e)}return d};bulletml.dsl.direction=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=
arguments[c]());if(void 0===a)throw Error("value is required.");c=new bulletml.Direction(a);void 0!==b&&(c.type=b);return c};bulletml.dsl.speed=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("value is required.");c=new bulletml.Speed(a);b&&(c.type=b);return c};bulletml.dsl.horizontal=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===
a)throw Error("value is required.");c=new bulletml.Horizontal(a);b&&(c.type=b);return c};bulletml.dsl.vertical=function(a,b){for(var c=0,d=arguments.length;c<d;c++)arguments[c]instanceof Function&&(arguments[c]=arguments[c]());if(void 0===a)throw Error("value is required.");c=new bulletml.Vertical(a);b&&(c.type=b);return c};bulletml.dsl.fireOption=function(a){return new bulletml.FireOption(a)}})();var BulletML=bulletml;enchant.bulletml=enchant.bulletml||{};
(function(){function l(e){for(;e<=-Math.PI;)e+=2*Math.PI;for(;Math.PI<e;)e-=2*Math.PI;return e}function p(e,d){return Math.atan2(d.y+(d.height||0)/2-(e.y+(e.height||0)/2),d.x+(d.width||0)/2-(e.x+(e.width||0)/2))}enchant.Game._loadFuncs.bml=enchant.Game._loadFuncs.xml=function(e,d){var f=this,g=new XMLHttpRequest;g.onreadystatechange=function(){if(4===g.readyState){if(200!==g.status&&0!==g.status)throw Error(g.status+": Cannot load an asset: "+e);if(null!=g.responseXML){var i=i.build(g.responseXML);
i?f.assets[e]=new enchant.bulletml.AttackPattern(i):(alert(e+"\u306f\u59a5\u5f53\u306aBulletML\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002"),f.assets[e]=g.responseXML);d()}else throw Error(g.status+": Cannot load an asset: "+e);}};g.open("GET",e,!0);g.overrideMimeType&&g.overrideMimeType("application/xml");g.send(null)};enchant.EventTarget.prototype.setDanmaku=function(e,d){if(void 0===e)throw Error("AttackPattern is required.");this.removeDanmaku();this.on("enterframe",e.createTicker(d))};enchant.EventTarget.prototype.removeDanmaku=
function(){if(this._listeners.enterframe&&0!==this._listeners.enterframe.length){for(var e=[],d=this._listeners.enterframe.length;d--;)this._listeners.enterframe[d].isDanmaku&&(e[e.length]=this._listeners.enterframe[d]);for(d=e.length;d--;)this.removeEventListener("enterframe",e[d])}};enchant.bulletml.getDefaultImage=function(){if(this.value)return this.value;var e=new enchant.Surface(8,8),d=e.context,f=d.createRadialGradient(4,4,0,4,4,4);f.addColorStop(0,"rgba(255,255,255,1.0)");f.addColorStop(0.5,
"rgba(255,255,255,1.0)");f.addColorStop(0.8,"rgba(255,  0,  0,0.8)");f.addColorStop(1,"rgba(255,  0,  0,0.0)");d.fillStyle=f;d.fillRect(0,0,8,8);return this.value=e};enchant.bulletml.AttackPattern=enchant.Class.create({initialize:function(e){if(!e)throw Error("argument is invalid.",e);this._bulletml=e},createTicker:function(e,d){e instanceof enchant.Node&&(e={target:e});var f=this._bulletml.getTopActionLabels();if(void 0===d&&1<f.length){for(var g=[],i=0,j=f.length;i<j;i++)g[g.length]=this._createTicker(e,
f[i]);for(var a=function(){for(var b=g.length;b--;)g[b].call(this);a.compChildCount===g.length&&(a.complete=!0,this.dispatchEvent(new Event("completeattack")))},i=g.length;i--;)g[i].parentTicker=a;a.compChildCount=0;a.completeChild=function(){this.compChildCount++};a.compChildCount=0;a.complete=!1;a.isDanmaku=!0;return a}return this._createTicker(e,d)},_createTicker:function(e,d){var f=e,g={},i=enchant.bulletml.AttackPattern.defaultConfig,j;for(j in i)i.hasOwnProperty(j)&&(g[j]=i[j]);for(j in f)f.hasOwnProperty(j)&&
(g[j]=f[j]);e=g;if(!e.target)throw Error("target is undefined in config.");var a=function(){var b=a.config,c=a._pattern;if(c)if(this.age<a.chDirEnd?a.direction+=a.dirIncr:this.age===a.chDirEnd&&(a.direction=a.dirFin),this.age<a.chSpdEnd?a.speed+=a.spdIncr:this.age===a.chSpdEnd&&(a.speed=a.spdFin),this.age<a.aclEnd?(a.speedH+=a.aclIncrH,a.speedV+=a.aclIncrV):this.age===a.aclEnd&&(a.speedH=a.aclFinH,a.speedV=a.aclFinV),this.x+=Math.cos(a.direction)*a.speed*b.speedRate,this.y+=Math.sin(a.direction)*
a.speed*b.speedRate,this.x+=a.speedH*b.speedRate,this.y+=a.speedV*b.speedRate,b.isInsideOfWorld(this)){if(b.updateProperties&&(this.rotation=a.direction*m,this.speed=a.speed),!(this.age<a.waitTo||a.completed)){for(var d;d=a.walker.next();)switch(d.commandName){case "fire":c._fire.call(this,d,b,a,c);break;case "wait":b=0;a.waitTo="number"===typeof d.value?this.age+d.value:0!==(b=~~d.value)?this.age+b:this.age+eval(d.value);return;case "changeDirection":c._changeDirection.call(this,d,b,a);break;case "changeSpeed":c._changeSpeed.call(this,
d,a);break;case "accel":c._accel.call(this,d,a);break;case "vanish":this.parentNode&&this.parentNode.removeChild(this)}a.completed=!0;a.parentTicker?a.parentTicker.completeChild():this.dispatchEvent(new Event("completeattack"))}}else this.parentNode&&this.parentNode.removeChild(this),a.completed=!0,a.parentTicker?a.parentTicker.completeChild():this.dispatchEvent(new Event("completeattack"))},d=d||"top";if("string"===typeof d)a.walker=this._bulletml.getWalker(d,e.rank);else if(d instanceof bulletml.Bullet)a.walker=
d.getWalker(e.rank);else throw window.console.error(e,d),Error("\u5f15\u6570\u304c\u4e0d\u6b63");a._pattern=this;a.config=e;a.waitTo=-1;a.completed=!1;a.direction=0;a.lastDirection=0;a.speed=0;a.lastSpeed=0;a.speedH=0;a.speedV=0;a.dirIncr=0;a.dirFin=0;a.chDirEnd=-1;a.spdIncr=0;a.spdFin=0;a.chSpdEnd=-1;a.aclIncrH=0;a.aclFinH=0;a.aclIncrV=0;a.aclFinV=0;a.aclEnd=-1;a.isDanmaku=!0;return a},_fire:function(e,d,f,g){var i=d.bulletFactory({label:e.bullet.label});if(i){var j=g.createTicker(d,e.bullet),a=
this;f.lastDirection=j.direction=function(b){var c=eval(b.value)*q;switch(b.type){case "aim":return d.target?p(a,d.target)+c:c-Math.PI/2;case "absolute":return c-Math.PI/2;case "relative":return f.direction+c;default:return f.lastDirection+c}}(e.direction||e.bullet.direction);f.lastSpeed=j.speed=function(a){var c=eval(a.value);switch(a.type){case "relative":return f.speed+c;case "sequence":return f.lastSpeed+c;default:return c}}(e.speed||e.bullet.speed);i.x=this.x+((this.width||0)-(i.width||0))/2;
i.y=this.y+((this.height||0)-(i.height||0))/2;i.addEventListener("enterframe",j);i.addEventListener("removed",function(){this.removeEventListener("enterframe",j)});d.addTarget?d.addTarget.addChild(i):this.parentNode&&this.parentNode.addChild(i)}},_changeDirection:function(e,d,f){var g=eval(e.direction.value)*q,i=eval(e.term);switch(e.direction.type){case "aim":e=d.target;if(!e)return;f.dirFin=p(this,e)+g;f.dirIncr=l(f.dirFin-f.direction)/i;break;case "absolute":f.dirFin=g-Math.PI/2;f.dirIncr=l(f.dirFin-
f.direction)/i;break;case "relative":f.dirFin=f.direction+g;f.dirIncr=l(f.dirFin-f.direction)/i;break;case "sequence":f.dirIncr=g,f.dirFin=f.direction+f.dirIncr*(i-1)}f.chDirEnd=this.age+i},_changeSpeed:function(e,d){var f=eval(e.speed.value),g=eval(e.term);switch(e.speed.type){case "absolute":d.spdFin=f;d.spdIncr=(d.spdFin-d.speed)/g;break;case "relative":d.spdFin=f+d.speed;d.spdIncr=(d.spdFin-d.speed)/g;break;case "sequence":d.spdIncr=f,d.spdFin=d.speed+d.spdIncr*g}d.chSpdEnd=this.age+g},_accel:function(e,
d){var f=eval(e.term);d.aclEnd=this.age+f;if(e.horizontal){var g=eval(e.horizontal.value);switch(e.horizontal.type){case "absolute":case "sequence":d.aclIncrH=(g-d.speedH)/f;d.aclFinH=g;break;case "relative":d.aclIncrH=g,d.aclFinH=(g-d.speedH)*f}}else d.aclIncrH=0,d.aclFinH=d.speedH;if(e.vertical)switch(g=eval(e.vertical.value),e.vertical.type){case "absolute":case "sequence":d.aclIncrV=(g-d.speedV)/f;d.aclFinV=g;break;case "relative":d.aclIncrV=g,d.aclFinV=(g-d.speedV)*f}else d.aclIncrV=0,d.aclFinV=
d.speedV},bulletml:{get:function(){return this._bulletml}}});enchant.bulletml.defaultBulletFactory=function(){var e=new enchant.Sprite(8,8);e.image=enchant.bulletml.getDefaultImage();return e};var n=void 0;enchant.bulletml.defaultIsInsideOfWorld=function(e){void 0===n&&(n=enchant.Game.instance);var d=n.width,f=n.height,g=e.height||0;return-(e.width||0)<=e.x&&e.x<d&&-g<=e.y&&e.y<f};enchant.bulletml.AttackPattern.defaultConfig={bulletFactory:enchant.bulletml.defaultBulletFactory,isInsideOfWorld:enchant.bulletml.defaultIsInsideOfWorld,
rank:0,updateProperties:!1,speedRate:2};var m=180/Math.PI,q=Math.PI/180})();
