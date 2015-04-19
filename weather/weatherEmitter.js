!function (a) {
    if (typeof jQuery === 'undefined') {
        throw new Error('weahterEmiiter \'s JavaScript requires jQuery')
    }
    var fireWorksArea={min:20,max:50};
    var fireWorksColorArr=[];
    var fireRiseDur=25;
    var fireSpreadDur=3000;
    var fireDownDur=10;
    a.fn.weatherEmitter = function (b) {
        this.each(function(){
            var  c=this,d ,raindown=false,e , f ,g, h , i , data = a(c).data("websnowcanvas"),
                k =null , l = null, m = null, n =data!=null? data.flakes:[],o=null,
                p = a.extend({emitterCounts: 5,flakes:n,speed:1,type:"snow",state:null,rainBottom:150,rainSpace:30,increaseGap:200}, b);
            if(data!=null){
                k = data.canvas.getContext("2d");
                $.extend(data.config,p,true);
                clearInterval(data.timer);
                data.flakes.length=[];
                data.timer=setInterval(r, data.increaseGap)
                return;
            }
            function Plugin(){
                this.canvas=j;
                this.config=p;
                this.flakes=n;
                this.timer=o;
            }
            function q(c) {
                j = document.getElementById("websnowjqcan" + d), k = j.getContext("2d"),
                    l = document.createElement("canvas"), l.style.display="none",document.body.appendChild(l), m = l.getContext("2d"),
                    m.canvas.width = k.canvas.width, m.canvas.height = k.canvas.height,
                    o= setInterval(r, p.increaseGap), t(), requestAnimationFrame(v,null), a(window).resize(function () {
                    a("#websnowjqcan" + d).offset({top: a(c).offset().top, left: a(c).offset().left})
                })
                a(c).data("websnowcanvas",data=new Plugin());
            }
            function r() {
                n[n.length] = new s, n.length == p.emitterCounts && clearInterval(data.timer);
            }

            function s() {
                this.x , this.y , this.speed = Math.round( 5* Math.random()) + p.speed, this.width = 3 * Math.random() + 2, this.drift = Math.random()
                this.maxY=k.canvas.height-Math.round(Math.random()*50)- p.rainBottom;
                this.childs=[];
                if(p.type=="fireworks"){
                    var len=Math.floor(Math.random()*20+30),step=Math.ceil(720/len);
                    this.radius=0;
                    this.x = Math.round(Math.random() * (k.canvas.width-fireWorksArea.max/2))+fireWorksArea.max/2;
                    this.y = Math.round(Math.random() * fireWorksArea.max*4)+k.canvas.height/6;
                    this.initY=this.y;
                    this.maxRadius=Math.random()*(fireWorksArea.min+1)+fireWorksArea.max-fireWorksArea.min;
                    this.step=step;
                    this.current=0;
                    this.state="rise";
                    this.opacity=1;
                    this.colors=[];
                    if(fireWorksColorArr.length<Math.min(10,p.emitterCounts*2)){
                        for(var i=0;i<5;i++){
                            this.colors.push(hslToRgb( (Math.floor(Math.random() * 361)/360 ) ,1,.5));
                        }
                        fireWorksColorArr.push(this.colors)
                    }else{
                        this.colors=fireWorksColorArr[Math.floor(Math.random()*fireWorksColorArr.length)];
                    }
                    for(var i=0;i<len;i++){
                        this.childs.push(new Firework(this/*this.x+ this.radius*Math.cos(step*i*Math.PI*2/360),this.y+100- this.radius*Math.sin(step*i*Math.PI*2/360*/))
                    }
                }else{
                    this.x = Math.round(Math.random() * k.canvas.width)
                    this.y = -10
                }
            }
            function Firework(p){
                //this.grColor=fireWorksColorArr[Math.floor(Math.random()*fireWorksColorArr.length)]//
              //  this.x=x;
                //this.y=y;
                this.width=2;
                this.grColor=p.colors[Math.floor(Math.random()*p.colors.length)]
                this.counts=Math.floor(Math.random()*2)+2;
                this.posArr=[]
                var offset=[];
                for(var i= 0,l=this.counts;i<l;i++){
                    do{
                        offset=(Math.random()>0.5?-1:1)*Math.floor(Math.random()*10);
                    }while(this.posArr.indexOf(offset)!=-1)
                    this.posArr.push(offset);
                }
            }

            function updateFireWork(p){
                var high;
                if(p.current ===fireRiseDur&&p.state=="rise"){
                        p.current=0;
                        p.state="spread";
                }else if(p.radius>p.maxRadius-1&&p.state=="spread"){
                        p.current=0;
                        p.state="down";
                }
                p.current++;
                switch (p.state){
                    case "rise":
                        high=Math.tween.Sine.easeOut(p.current, 0,-fireWorksArea.max*2, fireRiseDur);
                        //p.opacity=Math.tween.Expo.easeOut(p.current, p.opacity, 0, p.during);
                        p.y=high+p.initY;
                        break;
                    case "spread":
                        p.radius=Math.tween.Expo.easeOut(p.current, p.radius, p.maxRadius, fireSpreadDur);
                        for(var i= 0,l= p.childs.length;i< l;i++){
                            p.childs[i].x= p.x+ p.radius*Math.cos(p.step*i*Math.PI*2/360);
                            p.childs[i].y= p.y- p.radius*Math.sin(p.step*i*Math.PI*2/360)
                        }
                        break;
                    case "down":
                        for(var i= 0,l= p.childs.length;i< l;i++){
                            p.childs[i].y+=0.5
                        }
                        p.isDown=true;
                        p.opacity=Math.tween.Linear(p.current, p.opacity, -.1, fireDownDur);
                        if(p.current==fireDownDur){
                            p.isOver=true;
                        }
                        break;
                }
            }
            function t() {
                k.save(), u();
                var dx,gr,color;
                for (var a = 0; a < n.length; a++){
                    if(p.type=="snow"){
                        m.beginPath(), m.arc(n[a].x, n[a].y, n[a].width, 0, 2 * Math.PI, !1), m.fillStyle = "#ffffff", m.fill();
                    }else if(p.type=="rain"){
                        /* m.beginPath(), m.moveTo(n[a].x, n[a].y),m.bezierCurveTo(n[a].x-5*0.15,n[a].y+10*0.15,n[a].x-30*0.15,n[a].y+45*0.15,n[a].x,n[a].y+50*0.15),
                         m.bezierCurveTo(n[a].x+30*0.15,n[a].y+45*0.15,n[a].x+5*0.15,n[a].y+10*0.15,n[a].x, n[a].y),
                         */
                        if(n[a].y>= l.height- p.rainBottom-10&& !n[a].isDown){
                            raindown=true;
                            n[a].isDown=true;
                            dismissRain(n[a].x)
                        } else{
                            m.beginPath(), m.moveTo(n[a].x, n[a].y), m.lineTo(n[a].x,n[a].y+3), m.lineWidth=3, m.lineCap="round",
                                m.strokeStyle = "rgba(255, 255, 255,.4)", m.stroke();
                        }
                        //m.scale(0.5,0.5);
                    }else if(p.type=="fireworks"){
                        updateFireWork(n[a]);
                        if(n[a].state!="rise"){
                            for(var i= 0,len=n[a].childs.length;i<len;i++){
                                for(var j=0,clen=n[a].childs[i].posArr.length;j<clen;j++){
                                    gr = m.createRadialGradient(n[a].childs[i].x+n[a].childs[i].posArr[j], n[a].childs[i].y+n[a].childs[i].posArr[j], 0,n[a].childs[i].x+n[a].childs[i].posArr[j],n[a].childs[i].y+n[a].childs[i].posArr[j],n[a].childs[i].width);
                                    color=n[a].childs[i].grColor;
                                    //gr.addColorStop(0, 'rgba('+color[0]+','+color[1]+','+color[2]+','+n[a].opacity*0.9+')');
                                    gr.addColorStop(0.3,'rgba(255,255,255,'+n[a].opacity+')');
                                    gr.addColorStop(1,'rgba('+color[0]+','+color[1]+','+color[2]+','+n[a].opacity+')');
                                    m.beginPath(), m.fillStyle = gr, m.arc(n[a].childs[i].x+n[a].childs[i].posArr[j],n[a].childs[i].y+n[a].childs[i].posArr[j], n[a].childs[i].width, 0, 2 * Math.PI, !1)/*, m.fillStyle = "#ffffff"*/, m.fill();
                                }
                            }
                        }else{
                            gr = m.createRadialGradient(n[a].x, n[a].y, 0,n[a].x,n[a].y,5);
                            color=n[a].childs[0].grColor;
                            //gr.addColorStop(0, 'rgba('+color[0]+','+color[1]+','+color[2]+','+n[a].opacity*0.9+')');
                            gr.addColorStop(0.3,'rgba(255,255,255,'+n[a].opacity+')');
                            gr.addColorStop(1,'rgba('+color[0]+','+color[1]+','+color[2]+','+n[a].opacity+')');
                            m.beginPath(), m.fillStyle = gr, m.arc(n[a].x,n[a].y, 5, 2 * Math.PI, !1)/*, m.fillStyle = "#ffffff"*/, m.fill();
                        }
                    }
                }

                    k.drawImage(l, 0, 0, l.width, l.height), k.restore()
            }

            function dismissRain(dx){
                var gap=0.3,x=0.5,y=0.25,timer,h=l.height-(20+Math.floor(Math.random()* p.rainBottom));
                p.state="rainMiss";
                BezierEllipse2(m,dx,h ,x,y);
                function stepsFc(){
                    //m.clearRect(0, 0, m.canvas.width, m.canvas.height), k.clearRect(0, 0, m.canvas.width, m.canvas.height)
                    if(x<10){
                        x+=gap*2;
                        y+=gap;
                        BezierEllipse2(m,dx, h,x,y);
                        timer=requestAnimationFrame(stepsFc,null)
                    }else{
                        cancelAnimationFrame(timer);
                        m.clearRect(0, 0, m.canvas.width, m.canvas.height), k.clearRect(0, 0, m.canvas.width, m.canvas.height)
                        p.timer=null;
                        p.state="rainDown";
                    }
                }
                requestAnimationFrame(stepsFc,null);
            }
            function u() {
               // if(p.type=="snow"||!raindown){
                if(p.type!="rain"){
                    m.clearRect(0, 0, m.canvas.width, m.canvas.height),
                        k.clearRect(0, 0, m.canvas.width, m.canvas.height)
                }else{
                    m.clearRect(0, 0, m.canvas.width, m.canvas.height- p.rainBottom), k.clearRect(0, 0, m.canvas.width, m.canvas.height- p.rainBottom)
                }
              //  }else{

              //  }

            }

            function v() {
                    w(), t()
                requestAnimationFrame(v,null)
            }
            function w() {
                for (var a = 0; a < n.length; a++)  {
                    if(p.type=="snow"){
                         n[a].y < k.canvas.height ? (n[a].y += n[a].speed, n[a].y > k.canvas.height && (n[a].y = -5), n[a].x += n[a].drift, n[a].x > k.canvas.width && (n[a].x = 0)) : (n.splice(a, 1), n[n.length] = new s)
                    }else if(p.type=="rain"){
                        n[a].y < n[a].maxY ? (n[a].y += n[a].speed, n[a].x > k.canvas.width && (n[a].x = 0)) : (n.splice(a, 1), n[n.length] = new s)
                    }else if(p.type=="fireworks"){
                        //console.log(n[a].radius,n[a].maxRadius)
                        n[a].isOver? (n.splice(a, 1), n[n.length] = new s):null;
                    }
                }
            }
            d = c.id, e = a(c).offset().left, f = a(c).offset().top, g = a(c).height(), h = a(c).width(),i= "top: "+f+"px;" + "left:" + e + "px;" + "position:absolute;";
            a(p.container||"body").append("<canvas width='" + h + "' height='" + g + "' id='websnowjqcan" + d + "' style='" + i + "'></canvas>"), q(c)
        })
     }
}((typeof Zepto!="undefined"&&Zepto)||(typeof jQuery!="undefined"&&jQuery));
//此方法也会产生当lineWidth较宽，椭圆较;
//此方法也会产生当lineWidth较宽，椭圆较扁时
//，长轴端较尖锐，不平滑的现象
//这种方法比前一个贝塞尔方法精确度高，但效率稍差
function BezierEllipse2(ctx, x, y, a, b)
{
    var k = .5522848,
        ox = a * k, // 水平控制点偏移量
        oy = b * k; // 垂直控制点偏移量

    ctx.beginPath();
    ctx.strokeStyle="rgba(255,255,255,0.2)"
    //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
    ctx.moveTo(x - a, y);
    ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
    ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
    ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
    ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
    ctx.closePath();
    ctx.stroke();
};

//tks zhangxinxu http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
(function(){
    /*
     * Tween.js
     * t: current time（当前时间）
     * b: beginning value（初始值）
     * c: change in value（变化量）
     * d: duration（持续时间）
     */
    var Tween = {
        Linear: function(t, b, c, d) { return c*t/d + b; },
        Quad: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d) {
                return -c *(t /= d)*(t-2) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t-2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
                return c / 2*((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t*t + b;
            },
            easeOut: function(t, b, c, d) {
                return -c * ((t = t/d - 1) * t * t*t - 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
            }
        },
        Quint: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2*((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function(t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function(t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t, b, c, d) {
                return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function(t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    s = p / 4;
                    a = c;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p/(2*Math.PI) * Math.asin(c/a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d / 2) == 2) return b+c;
                if (typeof p == "undefined") p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2  *Math.PI) * Math.asin(c / a);
                }
                if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function(t, b, c, d) {
                return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function(t, b, c, d) {
                if (t < d / 2) {
                    return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                } else {
                    return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            }
        }
    }
    Math.tween = Tween;
})();

