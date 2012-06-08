// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.


//////////////////////////////////////////////////////////////////////////////////
// Cloud Zoom V1.0.2
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Please retain this copyright header in all versions of the software
//////////////////////////////////////////////////////////////////////////////////
(function($){$(document).ready(function(){$('.cloud-zoom, .cloud-zoom-gallery').CloudZoom()});function format(str){for(var i=1;i<arguments.length;i++){str=str.replace('%'+(i-1),arguments[i])}return str}function CloudZoom(jWin,opts){var sImg=$('img',jWin);var img1;var img2;var zoomDiv=null;var $mouseTrap=null;var lens=null;var $tint=null;var softFocus=null;var $ie6Fix=null;var zoomImage;var controlTimer=0;var cw,ch;var destU=0;var destV=0;var currV=0;var currU=0;var filesLoaded=0;var mx,my;var ctx=this,zw;setTimeout(function(){if($mouseTrap===null){var w=jWin.width();jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>',w/3,(w/2)-(w/6))).find(':last').css('opacity',0.5)}},200);var ie6FixRemove=function(){if($ie6Fix!==null){$ie6Fix.remove();$ie6Fix=null}};this.removeBits=function(){if(lens){lens.remove();lens=null}if($tint){$tint.remove();$tint=null}if(softFocus){softFocus.remove();softFocus=null}ie6FixRemove();$('.cloud-zoom-loading',jWin.parent()).remove()};this.destroy=function(){jWin.data('zoom',null);if($mouseTrap){$mouseTrap.unbind();$mouseTrap.remove();$mouseTrap=null}if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.fadedOut=function(){if(zoomDiv){zoomDiv.remove();zoomDiv=null}this.removeBits()};this.controlLoop=function(){if(lens){var x=(mx-sImg.offset().left-(cw*0.5))>>0;var y=(my-sImg.offset().top-(ch*0.5))>>0;if(x<0){x=0}else if(x>(sImg.outerWidth()-cw)){x=(sImg.outerWidth()-cw)}if(y<0){y=0}else if(y>(sImg.outerHeight()-ch)){y=(sImg.outerHeight()-ch)}lens.css({left:x,top:y});lens.css('background-position',(-x)+'px '+(-y)+'px');destU=(((x)/sImg.outerWidth())*zoomImage.width)>>0;destV=(((y)/sImg.outerHeight())*zoomImage.height)>>0;currU+=(destU-currU)/opts.smoothMove;currV+=(destV-currV)/opts.smoothMove;zoomDiv.css('background-position',(-(currU>>0)+'px ')+(-(currV>>0)+'px'))}controlTimer=setTimeout(function(){ctx.controlLoop()},30)};this.init2=function(img,id){filesLoaded++;if(id===1){zoomImage=img}if(filesLoaded===2){this.init()}};this.init=function(){$('.cloud-zoom-loading',jWin.parent()).remove();$mouseTrap=jWin.parent().append(format("<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;\'></div>",sImg.outerWidth(),sImg.outerHeight(),0,0)).find(':last');$mouseTrap.bind('mousemove',this,function(event){mx=event.pageX;my=event.pageY});$mouseTrap.bind('mouseleave',this,function(event){clearTimeout(controlTimer);if(lens){lens.fadeOut(299)}if($tint){$tint.fadeOut(299)}if(softFocus){softFocus.fadeOut(299)}zoomDiv.fadeOut(300,function(){ctx.fadedOut()});return false});$mouseTrap.bind('mouseenter',this,function(event){mx=event.pageX;my=event.pageY;zw=event.data;if(zoomDiv){zoomDiv.stop(true,false);zoomDiv.remove()}var xPos=opts.adjustX,yPos=opts.adjustY;var siw=sImg.outerWidth();var sih=sImg.outerHeight();var w=opts.zoomWidth;var h=opts.zoomHeight;if(opts.zoomWidth=='auto'){w=siw}if(opts.zoomHeight=='auto'){h=sih}var appendTo=jWin.parent();switch(opts.position){case'top':yPos-=h;break;case'right':xPos+=siw;break;case'bottom':yPos+=sih;break;case'left':xPos-=w;break;case'inside':w=siw;h=sih;break;default:appendTo=$('#'+opts.position);if(!appendTo.length){appendTo=jWin;xPos+=siw;yPos+=sih}else{w=appendTo.innerWidth();h=appendTo.innerHeight()}}zoomDiv=appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>',xPos,yPos,w,h,zoomImage.src)).find(':last');if(sImg.attr('title')&&opts.showTitle){zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>',sImg.attr('title'))).find(':last').css('opacity',opts.titleOpacity)}if($.browser.msie&&$.browser.version<7){$ie6Fix=$('<iframe frameborder="0" src="#"></iframe>').css({position:"absolute",left:xPos,top:yPos,zIndex:99,width:w,height:h}).insertBefore(zoomDiv)}zoomDiv.fadeIn(500);if(lens){lens.remove();lens=null}cw=(sImg.outerWidth()/zoomImage.width)*zoomDiv.width();ch=(sImg.outerHeight()/zoomImage.height)*zoomDiv.height();lens=jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>",cw,ch)).find(':last');$mouseTrap.css('cursor',lens.css('cursor'));var noTrans=false;if(opts.tint){lens.css('background','url("'+sImg.attr('src')+'")');$tint=jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />',sImg.outerWidth(),sImg.outerHeight(),opts.tint)).find(':last');$tint.css('opacity',opts.tintOpacity);noTrans=true;$tint.fadeIn(500)}if(opts.softFocus){lens.css('background','url("'+sImg.attr('src')+'")');softFocus=jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />',sImg.outerWidth()-2,sImg.outerHeight()-2,opts.tint)).find(':last');softFocus.css('background','url("'+sImg.attr('src')+'")');softFocus.css('opacity',0.5);noTrans=true;softFocus.fadeIn(500)}if(!noTrans){lens.css('opacity',opts.lensOpacity)}if(opts.position!=='inside'){lens.fadeIn(500)}zw.controlLoop();return})};img1=new Image();$(img1).load(function(){ctx.init2(this,0)});img1.src=sImg.attr('src');img2=new Image();$(img2).load(function(){ctx.init2(this,1)});img2.src=jWin.attr('href')}$.fn.CloudZoom=function(options){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}this.each(function(){var relOpts,opts;eval('var	a = {'+$(this).attr('rel')+'}');relOpts=a;if($(this).is('.cloud-zoom')){$(this).css({'position':'relative','display':'block'});$('img',$(this)).css({'display':'block'});if($(this).parent().attr('id')!='wrap'){$(this).wrap('<div id="wrap" style="top:0px;z-index:9999;position:relative;"></div>')}opts=$.extend({},$.fn.CloudZoom.defaults,options);opts=$.extend({},opts,relOpts);$(this).data('zoom',new CloudZoom($(this),opts))}else if($(this).is('.cloud-zoom-gallery')){opts=$.extend({},relOpts,options);$(this).data('relOpts',opts);$(this).bind('click',$(this),function(event){var data=event.data.data('relOpts');$('#'+data.useZoom).data('zoom').destroy();$('#'+data.useZoom).attr('href',event.data.attr('href'));$('#'+data.useZoom+' img').attr('src',event.data.data('relOpts').smallImage);$('#'+event.data.data('relOpts').useZoom).CloudZoom();return false})}});return this};$.fn.CloudZoom.defaults={zoomWidth:'auto',zoomHeight:'auto',position:'right',tint:false,tintOpacity:0.5,lensOpacity:0.5,softFocus:false,smoothMove:3,showTitle:true,titleOpacity:0.5,adjustX:0,adjustY:0}})(jQuery);

//fancybox
(function(a,b,c,d){"use strict";var e=c(a),f=c(b),g=c.fancybox=function(){g.open.apply(this,arguments)},h=false,i=null,j=b.createTouch!==d,k=function(a){return c.type(a)==="string"},l=function(a){return k(a)&&a.indexOf("%")>0},m=function(a,b){if(b&&l(a)){a=g.getViewport()[b]/100*parseInt(a,10)}return Math.round(a)+"px"};c.extend(g,{version:"2.0.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:true,autoResize:!j,autoCenter:!j,fitToView:true,aspectRatio:false,topRatio:.5,fixed:false,scrolling:"auto",wrapCSS:"",arrows:true,closeBtn:true,closeClick:false,nextClick:false,mouseWheel:true,autoPlay:false,playSpeed:3e3,preload:3,modal:false,loop:true,ajax:{dataType:"html",headers:{"X-fancyBox":true}},keys:{next:[13,32,34,39,40],prev:[8,33,37,38],close:[27]},index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"'+(c.browser.msie?' allowtransparency="true"':"")+"></iframe>",swf:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<div title="Close" class="fancybox-item fancybox-close"></div>',next:'<a title="Next" class="fancybox-nav fancybox-next"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev"><span></span></a>'},openEffect:"fade",openSpeed:300,openEasing:"swing",openOpacity:true,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:300,closeEasing:"swing",closeOpacity:true,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:300,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:300,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{speedIn:0,speedOut:300,opacity:.8,css:{cursor:"pointer"},closeClick:true},title:{type:"float"}},onCancel:c.noop,beforeLoad:c.noop,afterLoad:c.noop,beforeShow:c.noop,afterShow:c.noop,beforeClose:c.noop,afterClose:c.noop},group:{},opts:{},coming:null,current:null,isOpen:false,isOpened:false,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:false},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,b){g.close(true);if(a&&!c.isArray(a)){a=a instanceof c?c(a).get():[a]}g.isActive=true;g.opts=c.extend(true,{},g.defaults,b);if(c.isPlainObject(b)&&b.keys!==d){g.opts.keys=b.keys?c.extend({},g.defaults.keys,b.keys):false}g.group=a;g._start(g.opts.index||0)},cancel:function(){if(g.coming&&false===g.trigger("onCancel")){return}g.coming=null;g.hideLoading();if(g.ajaxLoad){g.ajaxLoad.abort()}g.ajaxLoad=null;if(g.imgPreload){g.imgPreload.onload=g.imgPreload.onabort=g.imgPreload.onerror=null}},close:function(a){g.cancel();if(!g.current||false===g.trigger("beforeClose")){return}g.unbindEvents();if(!g.isOpen||a&&a[0]===true){c(".fancybox-wrap").stop().trigger("onReset").remove();g._afterZoomOut()}else{g.isOpen=g.isOpened=false;c(".fancybox-item, .fancybox-nav").remove();g.wrap.stop(true).removeClass("fancybox-opened");g.inner.css("overflow","hidden");g.transitions[g.current.closeMethod]()}},play:function(a){var b=function(){clearTimeout(g.player.timer)},d=function(){b();if(g.current&&g.player.isActive){g.player.timer=setTimeout(g.next,g.current.playSpeed)}},e=function(){b();c("body").unbind(".player");g.player.isActive=false;g.trigger("onPlayEnd")},f=function(){if(g.current&&(g.current.loop||g.current.index<g.group.length-1)){g.player.isActive=true;c("body").bind({"afterShow.player onUpdate.player":d,"onCancel.player beforeClose.player":e,"beforeLoad.player":b});d();g.trigger("onPlayStart")}};if(g.player.isActive||a&&a[0]===false){e()}else{f()}},next:function(){if(g.current){g.jumpto(g.current.index+1)}},prev:function(){if(g.current){g.jumpto(g.current.index-1)}},jumpto:function(a){if(!g.current){return}a=parseInt(a,10);if(g.group.length>1&&g.current.loop){if(a>=g.group.length){a=0}else if(a<0){a=g.group.length-1}}if(g.group[a]!==d){g.cancel();g._start(a)}},reposition:function(a,b){var c;if(g.isOpen){c=g._getPosition(b);if(a&&a.type==="scroll"){delete c.position;g.wrap.stop(true,true).animate(c,200)}else{g.wrap.css(c)}}},update:function(a){if(!g.isOpen){return}if(!h){i=setTimeout(function(){var b=g.current,c=!a||a&&a.type==="orientationchange";if(h){h=false;if(!b){return}if(!a||a.type!=="scroll"||c){if(b.autoSize&&b.type!=="iframe"){g.inner.height("auto");b.height=g.inner.height()}if(b.autoResize||c){g._setDimension()}if(b.canGrow&&b.type!=="iframe"){g.inner.height("auto")}}if(b.autoCenter||c){g.reposition(a)}g.trigger("onUpdate")}},200)}h=true},toggle:function(){if(g.isOpen){g.current.fitToView=!g.current.fitToView;g.update()}},hideLoading:function(){f.unbind("keypress.fb");c("#fancybox-loading").remove()},showLoading:function(){g.hideLoading();f.bind("keypress.fb",function(a){if(a.keyCode===27){a.preventDefault();g.cancel()}});c('<div id="fancybox-loading"><div></div></div>').click(g.cancel).appendTo("body")},getViewport:function(){return{x:e.scrollLeft(),y:e.scrollTop(),w:j&&a.innerWidth?a.innerWidth:e.width(),h:j&&a.innerHeight?a.innerHeight:e.height()}},unbindEvents:function(){if(g.wrap){g.wrap.unbind(".fb")}f.unbind(".fb");e.unbind(".fb")},bindEvents:function(){var a=g.current,b=a.keys;if(!a){return}e.bind("resize.fb orientationchange.fb"+(a.autoCenter&&!a.fixed?" scroll.fb":""),g.update);if(b){f.bind("keydown.fb",function(a){var d,e=a.target||a.srcElement;if(!a.ctrlKey&&!a.altKey&&!a.shiftKey&&!a.metaKey&&!(e&&(e.type||c(e).is("[contenteditable]")))){d=a.keyCode;if(c.inArray(d,b.close)>-1){g.close();a.preventDefault()}else if(c.inArray(d,b.next)>-1){g.next();a.preventDefault()}else if(c.inArray(d,b.prev)>-1){g.prev();a.preventDefault()}}})}if(c.fn.mousewheel&&a.mouseWheel&&g.group.length>1){g.wrap.bind("mousewheel.fb",function(a,b){var c=a.target||null;if(b!==0&&(!c||c.clientHeight===0||c.scrollHeight===c.clientHeight&&c.scrollWidth===c.clientWidth)){a.preventDefault();g[b>0?"prev":"next"]()}})}},trigger:function(a,b){var d,e=b||g[c.inArray(a,["onCancel","beforeLoad","afterLoad"])>-1?"coming":"current"];if(!e){return}if(c.isFunction(e[a])){d=e[a].apply(e,Array.prototype.slice.call(arguments,1))}if(d===false){return false}if(e.helpers){c.each(e.helpers,function(b,d){if(d&&c.isPlainObject(g.helpers[b])&&c.isFunction(g.helpers[b][a])){g.helpers[b][a](d,e)}})}c.event.trigger(a+".fb")},isImage:function(a){return k(a)&&a.match(/\.(jpe?g|gif|png|bmp)((\?|#).*)?$/i)},isSWF:function(a){return k(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var b={},d=g.group[a]||null,e,f,h,i,j;if(d&&(d.nodeType||d instanceof c)){e=true;if(c.metadata){b=c(d).metadata()}}b=c.extend(true,{},g.opts,{index:a,element:d},c.isPlainObject(d)?d:b);c.each(["href","title","content","type"],function(a,f){b[f]=g.opts[f]||e&&c(d).attr(f)||b[f]||null});if(typeof b.margin==="number"){b.margin=[b.margin,b.margin,b.margin,b.margin]}if(b.modal){c.extend(true,b,{closeBtn:false,closeClick:false,nextClick:false,arrows:false,mouseWheel:false,keys:null,helpers:{overlay:{css:{cursor:"auto"},closeClick:false}}})}g.coming=b;if(false===g.trigger("beforeLoad")){g.coming=null;return}h=b.type;f=b.href||d;if(!h){if(e){h=c(d).data("fancybox-type");if(!h){i=d.className.match(/fancybox\.(\w+)/);h=i?i[1]:null}}if(!h&&k(f)){if(g.isImage(f)){h="image"}else if(g.isSWF(f)){h="swf"}else if(f.match(/^#/)){h="inline"}}if(!h){h=e?"inline":"html"}b.type=h}if(h==="inline"||h==="html"){if(!b.content){if(h==="inline"){b.content=c(k(f)?f.replace(/.*(?=#[^\s]+$)/,""):f)}else{b.content=d}}if(!b.content||!b.content.length){h=null}}else if(!f){h=null}if(h==="ajax"&&k(f)){j=f.split(/\s+/,2);f=j.shift();b.selector=j.shift()}b.href=f;b.group=g.group;b.isDom=e;switch(h){case"image":g._loadImage();break;case"ajax":g._loadAjax();break;case"inline":case"iframe":case"swf":case"html":g._afterLoad();break;default:g._error("type")}},_error:function(a){g.hideLoading();c.extend(g.coming,{type:"html",autoSize:true,minWidth:0,minHeight:0,padding:15,hasError:a,content:g.coming.tpl.error});g._afterLoad()},_loadImage:function(){var a=g.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;g.coming.width=this.width;g.coming.height=this.height;g._afterLoad()};a.onerror=function(){this.onload=this.onerror=null;g._error("image")};a.src=g.coming.href;if(a.complete===d||!a.complete){g.showLoading()}},_loadAjax:function(){g.showLoading();g.ajaxLoad=c.ajax(c.extend({},g.coming.ajax,{url:g.coming.href,error:function(a,b){if(g.coming&&b!=="abort"){g._error("ajax",a)}else{g.hideLoading()}},success:function(a,b){if(b==="success"){g.coming.content=a;g._afterLoad()}}}))},_preloadImages:function(){var a=g.group,b=g.current,d=a.length,e,f,h,i=Math.min(b.preload,d-1);if(!b.preload||a.length<2){return}for(h=1;h<=i;h+=1){e=a[(b.index+h)%d];f=e.href||c(e).attr("href")||e;if(e.type==="image"||g.isImage(f)){(new Image).src=f}}},_afterLoad:function(){g.hideLoading();if(!g.coming||false===g.trigger("afterLoad",g.current)){g.coming=false;return}if(g.isOpened){c(".fancybox-item, .fancybox-nav").remove();g.wrap.stop(true).removeClass("fancybox-opened");g.inner.css("overflow","hidden");g.transitions[g.current.prevMethod]()}else{c(".fancybox-wrap").stop().trigger("onReset").remove();g.trigger("afterClose")}g.unbindEvents();g.isOpen=false;g.current=g.coming;g.wrap=c(g.current.tpl.wrap).addClass("fancybox-"+(j?"mobile":"desktop")+" fancybox-type-"+g.current.type+" fancybox-tmp "+g.current.wrapCSS).appendTo("body");g.skin=c(".fancybox-skin",g.wrap).css("padding",m(g.current.padding));g.outer=c(".fancybox-outer",g.wrap);g.inner=c(".fancybox-inner",g.wrap);g._setContent()},_setContent:function(){var a=g.current,b=a.content,d=a.type,e=a.minWidth,f=a.minHeight,h=a.maxWidth,i=a.maxHeight,k;switch(d){case"inline":case"ajax":case"html":if(a.selector){b=c("<div>").html(b).find(a.selector)}else if(b instanceof c){if(b.parent().hasClass("fancybox-inner")){b.parents(".fancybox-wrap").unbind("onReset")}b=b.show().detach();c(g.wrap).bind("onReset",function(){b.appendTo("body").hide()})}if(a.autoSize){k=c('<div class="fancybox-wrap '+g.current.wrapCSS+' fancybox-tmp"></div>').appendTo("body").css({minWidth:m(e,"w"),minHeight:m(f,"h"),maxWidth:m(h,"w"),maxHeight:m(i,"h")}).append(b);a.width=k.width();a.height=k.height();k.width(g.current.width);if(k.height()>a.height){k.width(a.width+1);a.width=k.width();a.height=k.height()}b=k.contents().detach();k.remove()}break;case"image":b=a.tpl.image.replace("{href}",a.href);a.aspectRatio=true;break;case"swf":b=a.tpl.swf.replace(/\{width\}/g,a.width).replace(/\{height\}/g,a.height).replace(/\{href\}/g,a.href);break;case"iframe":b=c(a.tpl.iframe.replace("{rnd}",(new Date).getTime())).attr("scrolling",a.scrolling).attr("src",a.href);a.scrolling=j?"scroll":"auto";break}if(d==="image"||d==="swf"){a.autoSize=false;a.scrolling="visible"}if(d==="iframe"&&a.autoSize){g.showLoading();g._setDimension();g.inner.css("overflow",a.scrolling);b.bind({onCancel:function(){c(this).unbind();g._afterZoomOut()},load:function(){g.hideLoading();try{if(this.contentWindow.document.location){g.current.height=c(this).contents().find("body").height()}}catch(a){g.current.autoSize=false}g[g.isOpen?"_afterZoomIn":"_beforeShow"]()}}).appendTo(g.inner)}else{g.inner.append(b);g._beforeShow()}},_beforeShow:function(){g.coming=null;g.trigger("beforeShow");g._setDimension();g.wrap.hide().removeClass("fancybox-tmp");g.bindEvents();g._preloadImages();g.transitions[g.isOpened?g.current.nextMethod:g.current.openMethod]()},_setDimension:function(){var a=g.wrap,b=g.inner,d=g.current,e=g.getViewport(),f=d.margin,h=d.padding*2,i=d.width,j=d.height,k=d.maxWidth+h,n=d.maxHeight+h,o=d.minWidth+h,p=d.minHeight+h,q,r;e.w-=f[1]+f[3];e.h-=f[0]+f[2];if(l(i)){i=(e.w-h)*parseFloat(i)/100}if(l(j)){j=(e.h-h)*parseFloat(j)/100}q=i/j;i+=h;j+=h;if(d.fitToView){k=Math.min(e.w,k);n=Math.min(e.h,n)}if(d.aspectRatio){if(i>k){i=k;j=(i-h)/q+h}if(j>n){j=n;i=(j-h)*q+h}if(i<o){i=o;j=(i-h)/q+h}if(j<p){j=p;i=(j-h)*q+h}}else{i=Math.max(o,Math.min(i,k));j=Math.max(p,Math.min(j,n))}i=Math.round(i);j=Math.round(j);c(a.add(b)).width("auto").height("auto");b.width(i-h).height(j-h);a.width(i);r=a.height();if(i>k||r>n){while((i>k||r>n)&&i>o&&r>p){j=j-10;if(d.aspectRatio){i=Math.round((j-h)*q+h);if(i<o){i=o;j=(i-h)/q+h}}else{i=i-10}b.width(i-h).height(j-h);a.width(i);r=a.height()}}d.dim={width:m(i),height:m(r)};d.canGrow=d.autoSize&&j>p&&j<n;d.canShrink=false;d.canExpand=false;if(i-h<d.width||j-h<d.height){d.canExpand=true}else if((i>e.w||r>e.h)&&i>o&&j>p){d.canShrink=true}g.innerSpace=r-h-b.height()},_getPosition:function(a){var b=g.current,c=g.getViewport(),d=b.margin,e=g.wrap.width()+d[1]+d[3],f=g.wrap.height()+d[0]+d[2],h={position:"absolute",top:d[0]+c.y,left:d[3]+c.x};if(b.autoCenter&&b.fixed&&!a&&f<=c.h&&e<=c.w){h={position:"fixed",top:d[0],left:d[3]}}h.top=m(Math.max(h.top,h.top+(c.h-f)*b.topRatio));h.left=m(Math.max(h.left,h.left+(c.w-e)*.5));return h},_afterZoomIn:function(){var a=g.current,b=a?a.scrolling:"no";if(!a){return}g.isOpen=g.isOpened=true;g.wrap.addClass("fancybox-opened");g.inner.css("overflow",b==="yes"?"scroll":b==="no"?"hidden":b);g.trigger("afterShow");g.update();if(a.closeClick||a.nextClick){g.inner.css("cursor","pointer").bind("click.fb",function(b){if(!c(b.target).is("a")&&!c(b.target).parent().is("a")){g[a.closeClick?"close":"next"]()}})}if(a.closeBtn){c(a.tpl.closeBtn).appendTo(g.skin).bind("click.fb",g.close)}if(a.arrows&&g.group.length>1){if(a.loop||a.index>0){c(a.tpl.prev).appendTo(g.outer).bind("click.fb",g.prev)}if(a.loop||a.index<g.group.length-1){c(a.tpl.next).appendTo(g.outer).bind("click.fb",g.next)}}if(g.opts.autoPlay&&!g.player.isActive){g.opts.autoPlay=false;g.play()}},_afterZoomOut:function(){var a=g.current;g.wrap.trigger("onReset").remove();c.extend(g,{group:{},opts:{},current:null,isActive:false,isOpened:false,isOpen:false,wrap:null,skin:null,outer:null,inner:null});g.trigger("afterClose",a)}});g.transitions={getOrigPosition:function(){var a=g.current,b=a.element,d=a.padding,e=c(a.orig),f={},h=50,i=50,j;if(!e.length&&a.isDom&&c(b).is(":visible")){e=c(b).find("img:first");if(!e.length){e=c(b)}}if(e.length){f=e.offset();if(e.is("img")){h=e.outerWidth();i=e.outerHeight()}}else{j=g.getViewport();f.top=j.y+(j.h-i)*.5;f.left=j.x+(j.w-h)*.5}f={top:m(f.top-d),left:m(f.left-d),width:m(h+d*2),height:m(i+d*2)};return f},step:function(a,b){var c=b.prop,d,e;if(c==="width"||c==="height"){d=Math.ceil(a-g.current.padding*2);if(c==="height"){e=(a-b.start)/(b.end-b.start);if(b.start>b.end){e=1-e}d-=g.innerSpace*e}g.inner[c](d)}},zoomIn:function(){var a=g.wrap,b=g.current,d=b.openEffect,e=d==="elastic",f=b.dim,h=c.extend({},f,g._getPosition(e)),i=c.extend({opacity:1},h);delete i.position;if(e){h=this.getOrigPosition();if(b.openOpacity){h.opacity=0}g.outer.add(g.inner).width("auto").height("auto")}else if(d==="fade"){h.opacity=0}a.css(h).show().animate(i,{duration:d==="none"?0:b.openSpeed,easing:b.openEasing,step:e?this.step:null,complete:g._afterZoomIn})},zoomOut:function(){var a=g.wrap,b=g.current,c=b.openEffect,d=c==="elastic",e={opacity:0};if(d){if(a.css("position")==="fixed"){a.css(g._getPosition(true))}e=this.getOrigPosition();if(b.closeOpacity){e.opacity=0}}a.animate(e,{duration:c==="none"?0:b.closeSpeed,easing:b.closeEasing,step:d?this.step:null,complete:g._afterZoomOut})},changeIn:function(){var a=g.wrap,b=g.current,c=b.nextEffect,d=c==="elastic",e=g._getPosition(d),f={opacity:1};e.opacity=0;if(d){e.top=m(parseInt(e.top,10)-200);f.top="+=200px"}a.css(e).show().animate(f,{duration:c==="none"?0:b.nextSpeed,easing:b.nextEasing,complete:g._afterZoomIn})},changeOut:function(){var a=g.wrap,b=g.current,d=b.prevEffect,e={opacity:0},f=function(){c(this).trigger("onReset").remove()};a.removeClass("fancybox-opened");if(d==="elastic"){e.top="+=200px"}a.animate(e,{duration:d==="none"?0:b.prevSpeed,easing:b.prevEasing,complete:f})}};g.helpers.overlay={overlay:null,update:function(){var a,d,g;this.overlay.width("100%").height("100%");if(c.browser.msie||j){d=Math.max(b.documentElement.scrollWidth,b.body.scrollWidth);g=Math.max(b.documentElement.offsetWidth,b.body.offsetWidth);a=d<g?e.width():d}else{a=f.width()}this.overlay.width(a).height(f.height())},beforeShow:function(a){if(this.overlay){return}a=c.extend(true,{},g.defaults.helpers.overlay,a);this.overlay=c('<div id="fancybox-overlay"></div>').css(a.css).appendTo("body");if(a.closeClick){this.overlay.bind("click.fb",g.close)}if(g.current.fixed&&!j){this.overlay.addClass("overlay-fixed")}else{this.update();this.onUpdate=function(){this.update()}}this.overlay.fadeTo(a.speedIn,a.opacity)},afterClose:function(a){if(this.overlay){this.overlay.fadeOut(a.speedOut||0,function(){c(this).remove()})}this.overlay=null}};g.helpers.title={beforeShow:function(a){var b,d=g.current.title;if(d){b=c('<div class="fancybox-title fancybox-title-'+a.type+'-wrap">'+d+"</div>").appendTo("body");if(a.type==="float"){b.width(b.width());b.wrapInner('<span class="child"></span>');g.current.margin[2]+=Math.abs(parseInt(b.css("margin-bottom"),10))}b.appendTo(a.type==="over"?g.inner:a.type==="outside"?g.wrap:g.skin)}}};c.fn.fancybox=function(a){var b=c(this),d=this.selector||"",e,h=function(f){var h=this,i=e,j,k;if(!(f.ctrlKey||f.altKey||f.shiftKey||f.metaKey)&&!c(h).is(".fancybox-wrap")){f.preventDefault();j=a.groupAttr||"data-fancybox-group";k=c(h).attr(j);if(!k){j="rel";k=h[j]}if(k&&k!==""&&k!=="nofollow"){h=d.length?c(d):b;h=h.filter("["+j+'="'+k+'"]');i=h.index(this)}a.index=i;g.open(h,a)}};a=a||{};e=a.index||0;if(d){f.undelegate(d,"click.fb-start").delegate(d,"click.fb-start",h)}else{b.unbind("click.fb-start").bind("click.fb-start",h)}return this};c(b).ready(function(){g.defaults.fixed=c.support.fixedPosition||!(c.browser.msie&&c.browser.version<=6)&&!j})})(window,document,jQuery)


