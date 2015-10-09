(function(a){typeof define=="function"&&define.amd!=undefined?define(["jquery","megapix-image","exif-js"],a):a(jQuery,MegaPixImage,EXIF,!0)})(function(a,b,c,d){function e(a,b,c,d,e){}function f(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(a.style[c]!==undefined)return{end:b[c]};return!1}var g={};if(d===!0)var b=window.MegaPixImage;g.support={},g.prefixStyle=function(a){var b=document.createElement("div"),c="webkitT,t,,MozT,msT,OT".split(","),d;a=a.slice(1);for(d in c)if(b.style[c[d]+a]!=undefined)return c[d]+a},g.animateFrame=function(a,b,c,d,e,f,g,h,i,j,k,l){function m(){var a=!0;this.list=q,this.isInit=!0,this.reset=n,this.interval=null,this.timeout=null,this.isPlay=!0,this.stop=function(){a=!1},this.start=function(){a=!0},this.getPlayState=function(){return a}}function n(){clearInterval(o.interval),q.filter(function(a,b){return b>0}).removeClass("show"),o.start(),clearTimeout(o.timeout)}var o=a.data("plugin"),p,q,r=o?!0:!1,s=o?o.getPlayState():!1;if(s)return;if(!r){for(var t=0;t<=c;t++)p="png-frame p"+(t+1)+(t==0?" show":""),a.append("<div class='"+p+"'></div>");q=a.find(".png-frame"),a.data("plugin",o=new m)}else o.reset(),q=o.list;return function(){function a(){o.interval=setInterval(function(){if(!o.getPlayState())return;if(k&&k==m){if(!p){p=+(new Date);return}if(+(new Date)-p<l)return;k=null}r=m,e||m++,m==c&&(g&&g--,clearInterval(o.interval),f&&(g!=0||g==null)&&(o.timeout=setTimeout(function(){e&&(m=0),a()},h)),f&&g==0?(o.stop(),typeof i=="function"&&i()):f||o.stop(),typeof i=="function"&&f==0&&i()),e&&m++,m==c+1&&(m=0),q.eq(m).addClass("show"),q.eq(r).removeClass("show"),typeof j=="function"&&j(m)},d)}var m=b,n,p,r;a()}(),o},e.gender=function(a){},function(){function b(b,d){this.dfdList=[],this.$dfdList=[],this.callback=d;var e=a.Deferred(),f;for(var g=0,h=b;g<h;g++)f=new c,e.then(f),g==0&&e.resolve(),e=f.defer,this.dfdList.push(f),this.$dfdList.push(f.defer);typeof d=="function"&&a.when(this.$dfdList).then(d)}function c(){this.defer=a.Deferred(),this.cstate="unfilled"}b.prototype.getItem=function(a){return this.dfdList[a]},b.prototype.dealItem=function(a){var b=!0;for(var c=a-1;c>-1;c--)this.getItem(c).defer.state()!=="resolved"&&(b=!1);return b?(this.getItem(a).changeState("filled"),this.dealWaitList(a)):this.getItem(a).changeState("wait"),this.getItem(a).cstate},b.prototype.dealWaitList=function(a){var b=this.dfdList;for(var c=a+1,d=b.length;c<d;c++){if(this.getItem(c).cstate!=="wait")return!1;this.getItem(c).changeState("filled")}},c.prototype.addCallbacks=function(a,b){this.defer.done(a).fail(b)},c.prototype.changeState=function(a){this.cstate=a,a==="filled"&&this.defer.resolve()},g.DeferredList=b}(),g.getParams=function(a){if(!a)return;typeof a=="string"&&(a=[a]);if(typeof a.slice!="function")return;var b=window.location.search.slice(1),c=b.split("&"),d=0,e=[],f;for(var g=0,h=c.length;g<h;g++)f=c[g].split("="),c[g]={},f.length==2&&(c[g].param=f[0],c[g].value=f[1]);for(var i=0,h=a.length;i<h;i++){while(d<c.length)c[d]["param"]==a[i]?e.push(decodeURI(c[d].value)):d==c.length-1&&!e[i]&&e.push(null),d++;d=0}return e};var h=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null;return g.cropImage=function(d){function e(){var a=n.preview.naturalWidth,b=n.preview.naturalHeight,c,e,f=0,g=0,h,i=d.cropWidth*d.devicePixelRatio,j=d.cropHeight*d.devicePixelRatio;return q.clearRect(0,0,p.width,p.height),i/j<a/b?(console.log("填高"),h=j/b,e=j,c=a*h,f=-(a*h-i)/2):(console.log("填宽"),h=i/a,c=i,e=b*h,g=-(b*h-j)/2),{x:f,y:g,dWidth:c,dHeight:e,scale:h,iWidth:a,iHeight:b}}function f(a){var b=e(),c=-b.dWidth/2*n.scale+n.x,f=-b.dHeight/2*n.scale+n.y,g;return a=a||{},a.lowDpi&&d.enableRatio&&(b.dHeight/=d.devicePixelRatio,b.dWidth/=d.devicePixelRatio,p.width/=d.devicePixelRatio,p.height/=d.devicePixelRatio),q.save(),a.background&&(q.fillStyle=a.background,q.fillRect(0,0,p.width,p.height)),q.translate(p.width/2,p.height/2),q.rotate(Math.PI*n.rotate/180),n.rotate==90?(c=-b.dWidth/2*n.scale+n.y,f=-b.dHeight/2*n.scale-n.x):n.rotate==180?(c=-b.dWidth/2*n.scale-n.x,f=-b.dHeight/2*n.scale-n.y):n.rotate==270&&(c=-b.dWidth/2*n.scale-n.y,f=-b.dHeight/2*n.scale+n.x),q.drawImage(n.preview,c,f,b.dWidth*n.scale,b.dHeight*n.scale),q.restore(),g=p.toDataURL("image/"+a.type?a.type:"png"),a.lowDpi&&d.enableRatio&&(p.width*=d.devicePixelRatio,p.height*=d.devicePixelRatio),g}function h(){}function i(b){a.extend(n,b)}var j="ontouchstart"in window?!0:!1,k="touchstart mousedown",l="touchmove mousemove",m="touchend mouseup";d=a.extend({enableRatio:!0,cropWidth:260,cropHeight:260,container:document.body,canvas:document.createElement("canvas"),success:function(a){},onChange:function(a){},onLoad:function(a){}},d),d.devicePixelRatio=d.enableRatio?window.devicePixelRatio:1;var n={preview:null,moveX:0,moveY:0,scale:1,rotate:0,ratio:d.devicePixelRatio},o=g.prefixStyle("transform"),p=d.canvas,q=p.getContext("2d"),r,s,t,u=a(p).offset(),v=d.bindPreview||a(),w;a(p).prop({width:d.cropWidth*d.devicePixelRatio,height:d.cropHeight*d.devicePixelRatio}).css({width:d.cropWidth,height:d.cropHeight});if(d.bindFile)if(typeof d.bindFile=="string"){var x;x=new Image,x.onload=f.bind(null,x),x.src=d.bindFile,n.preview=x}else a(d.bindFile).is("input[type=file]")?(d.bindFile.attr("cropId",++g.cropImage.id),i({x:0,y:0,scale:1}),a(document).delegate("[cropId="+g.cropImage.id+"]","change",function(){v.prop("src",""),q.clearRect(0,0,p.width,p.height);if(this.files&&this.files.length){var a,f,g=this.files[0],h=new Image;c.getData(g,function(){f=new b(g),f.render(h,{maxWidth:800,maxHeight:800,quality:1,orientation:c.getTag(this,"Orientation")||1},function(){var a=new Image;a.onload=function(){n.preview=h;var a=e();v.prop("style",""),d.onLoad({originSrc:h.src,width:a.dWidth,height:a.dHeight,ratio:n.ratio,x:a.x,y:a.y,dWidth:a.dWidth,dHeight:a.dHeight,scale:a.scale})},a.src=h.src})})}d.bindFile.after(d.bindFile.clone()).remove()})):(n.preview=d.bindFile,f());return d.useHammer||(a(document).on(m,function(a){w=!1}),a(p).on(k,function(b){w=!0,b=b.originalEvent,u=a(p).offset();var c=j?b.targetTouches[0].clientX-u.left:b.clientX-u.left,d=j?b.targetTouches[0].clientY-u.top:b.clientY-u.top;r=c,s=d}),a(p).on(l,function(a){if(!w)return;a=a.originalEvent;var b=j?a.targetTouches[0].clientX-u.left:a.clientX-u.left,c=j?a.targetTouches[0].clientY-u.top:a.clientY-u.top;n.moveX+=b-r,n.moveY+=c-s,v.css(o,"translate3d("+n.moveX+"px,"+n.moveY+"px,0)"),r=b,s=c})),{getCropFile:f,getCropInfo:e,setCropStyle:i}},g.cropImage.id=0,g.animateGroup=function(a){function b(){g.addClass(a.frameClass[h]||a.frameClass[0])}function c(){b(),e=setInterval(function(){a.classSwitch!==!1&&g.removeClass(a.frameClass[h]||a.frameClass[0]),h++,h>d.length-1&&(a.loopTimes--,h=0),g=d.eq(h),(a.loopTimes==null||a.loopTimes!=0)&&b(),a.loopTimes==0&&(clearInterval(e),typeof a.callback=="function"&&a.callback())},f+70)}var d=a.group,e,f=a.duration+(a.gap||0),g=d.eq(0),h=a.startIndex||0;return a.waitTime?setTimeout(function(){c()},a.waitTime):c(),e},d===!0&&(window.tomLib=g),g})