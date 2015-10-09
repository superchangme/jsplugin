/**
 * Mega pixel image rendering library for iOS6 Safari
 *
 * Fixes iOS6 Safari's image file rendering issue for large size image (over mega-pixel),
 * which causes unexpected subsampling when drawing it in canvas.
 * By using this library, you can safely render the image with proper stretching.
 *
 * Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
 * Released under the MIT license
 */

(function(){function a(a){var b=a.naturalWidth,c=a.naturalHeight;if(b*c>1048576){var d=document.createElement("canvas");d.width=d.height=1;var e=d.getContext("2d");return e.drawImage(a,-b+1,0),e.getImageData(0,0,1,1).data[3]===0}return!1}function b(a,b,c){var d=document.createElement("canvas");d.width=1,d.height=c;var e=d.getContext("2d");e.drawImage(a,0,0);var f=e.getImageData(0,0,1,c).data,g=0,h=c,i=c;while(i>g){var j=f[(i-1)*4+3];j===0?h=i:g=i,i=h+g>>1}var k=i/c;return k===0?1:k}function c(a,b,c){var e=document.createElement("canvas");return d(a,e,b,c),e.toDataURL("image/jpeg",b.quality||.8)}function d(c,d,f,g){var h=c.naturalWidth,i=c.naturalHeight;if(!(h+i))return;var j=f.width,k=f.height,l=d.getContext("2d");l.save(),j||(j=Math.min(h,1024),k=i*j/h),e(d,l,j,k,f.orientation);var m=a(c);m&&(h/=2,i/=2);var n=1024,o=document.createElement("canvas");o.width=o.height=n;var p=o.getContext("2d"),q=g?b(c,h,i):1,r=Math.ceil(n*j/h),s=Math.ceil(n*k/i/q),t=0,u=0;while(t<i){var v=0,w=0;while(v<h)p.clearRect(0,0,n,n),p.drawImage(c,-v,-t),l.drawImage(o,0,0,n,n,w,u,r,s),v+=n,w+=r;t+=n,u+=s}l.restore(),o=p=null}function e(a,b,c,d,e){switch(e){case 5:case 6:case 7:case 8:a.width=d,a.height=c;break;default:a.width=c,a.height=d}switch(e){case 2:b.translate(c,0),b.scale(-1,1);break;case 3:b.translate(c,d),b.rotate(Math.PI);break;case 4:b.translate(0,d),b.scale(1,-1);break;case 5:b.rotate(.5*Math.PI),b.scale(1,-1);break;case 6:b.rotate(.5*Math.PI),b.translate(0,-d);break;case 7:b.rotate(.5*Math.PI),b.translate(c,-d),b.scale(-1,1);break;case 8:b.rotate(-0.5*Math.PI),b.translate(-c,0);break;default:}}function f(a){if(window.Blob&&a instanceof Blob){if(!g)throw Error("No createObjectURL function found to create blob url");var b=new Image;b.src=g.createObjectURL(a),this.blob=a,a=b}if(!a.naturalWidth&&!a.naturalHeight){var c=this;a.onload=a.onerror=function(){var a=c.imageLoadListeners;if(a){c.imageLoadListeners=null;for(var b=0,d=a.length;b<d;b++)a[b]()}},this.imageLoadListeners=[]}this.srcImage=a}var g=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null;f.prototype.render=function(a,b,e){if(this.imageLoadListeners){var f=this;this.imageLoadListeners.push(function(){f.render(a,b,e)});return}b=b||{};var h=this.srcImage.naturalWidth,i=this.srcImage.naturalHeight,j=b.width,k=b.height,l=b.maxWidth,m=b.maxHeight,n=!this.blob||this.blob.type==="image/jpeg";j&&!k?k=i*j/h<<0:k&&!j?j=h*k/i<<0:(j=h,k=i),l&&j>l&&(j=l,k=i*j/h<<0),m&&k>m&&(k=m,j=h*k/i<<0);var o={width:j,height:k};for(var p in b)o[p]=b[p];var q=a.tagName.toLowerCase();q==="img"?a.src=c(this.srcImage,o,n):q==="canvas"&&d(this.srcImage,a,o,n),typeof this.onrender=="function"&&this.onrender(a),e&&e(),this.blob&&(this.blob=null,g.revokeObjectURL(this.srcImage.src))},typeof define=="function"&&define.amd?define([],function(){return f}):typeof exports=="object"?module.exports=f:this.MegaPixImage=f})()