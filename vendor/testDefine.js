/*! iloveu - v1.0.0 - 2015-05-20 */
!function(a, b) {
    function c(a) {
        return function(b) {
            return {}.toString.call(b) == "[object " + a + "]"
        }
    }
    function d() {
        return A++
    }
    function e(a) {
        return a.match(D)[0]
    }
    function f(a) {
        for (a = a.replace(E, "/"); a.match(F); )
            a = a.replace(F, "/");
        return a = a.replace(G, "$1/")
    }
    function g(a) {
        var b = a.length - 1, c = a.charAt(b);
        return "#" === c ? a.substring(0, b) : ".js" === a.substring(b - 2) || a.indexOf("?") > 0 || ".css" === a.substring(b - 3) || "/" === c ? a : a + ".js"
    }
    function h(a) {
        var b = v.alias;
        return b && x(b[a]) ? b[a] : a
    }
    function i(a) {
        var b, c = v.paths;
        return c && (b = a.match(H)) && x(c[b[1]]) && (a = c[b[1]] + b[2]), a
    }
    function j(a) {
        var b = v.vars;
        return b && a.indexOf("{") > -1 && (a = a.replace(I, function(a, c) {
            return x(b[c]) ? b[c] : a
        })), a
    }
    function k(a) {
        var b = v.map, c = a;
        if (b)
            for (var d = 0, e = b.length; e > d; d++) {
                var f = b[d];
                if (c = z(f) ? f(a) || a : a.replace(f[0], f[1]), c !== a)
                    break
            }
        return c
    }
    function l(a, b) {
        var c, d = a.charAt(0);
        if (J.test(a))
            c = a;
        else if ("." === d)
            c = f((b ? e(b) : v.cwd) + a);
        else if ("/" === d) {
            var g = v.cwd.match(K);
            c = g ? g[0] + a.substring(1) : a
        } else
            c = v.base + a;
        return 0 === c.indexOf("//") && (c = location.protocol + c), c
    }
    function m(a, b) {
        if (!a)
            return "";
        a = h(a), a = i(a), a = j(a), a = g(a);
        var c = l(a, b);
        return c = k(c)
    }
    function n(a) {
        return a.hasAttribute ? a.src : a.getAttribute("src", 4)
    }
    function o(a, b, c) {
        var d = U.test(a), e = L.createElement(d ? "link" : "script");
        if (c) {
            var f = z(c) ? c(a) : c;
            f && (e.charset = f)
        }
        p(e, b, d, a), d ? (e.rel = "stylesheet", e.href = a) : (e.async = !0, e.src = a), Q = e, T ? S.insertBefore(e, T) : S.appendChild(e), Q = null
    }
    function p(a, c, d, e) {
        function f() {
            a.onload = a.onerror = a.onreadystatechange = null, d || v.debug || S.removeChild(a), a = null, c()
        }
        var g = "onload" in a;
        return !d || !V && g ? (g ? (a.onload = f, a.onerror = function() {
            C("error", {uri: e,node: a}), f()
        }) : a.onreadystatechange = function() {
            /loaded|complete/.test(a.readyState) && f()
        }, b) : (setTimeout(function() {
            q(a, c)
        }, 1), b)
    }
    function q(a, b) {
        var c, d = a.sheet;
        if (V)
            d && (c = !0);
        else if (d)
            try {
                d.cssRules && (c = !0)
            } catch (e) {
                "NS_ERROR_DOM_SECURITY_ERR" === e.name && (c = !0)
            }
        setTimeout(function() {
            c ? b() : q(a, b)
        }, 20)
    }
    function r() {
        if (Q)
            return Q;
        if (R && "interactive" === R.readyState)
            return R;
        for (var a = S.getElementsByTagName("script"), b = a.length - 1; b >= 0; b--) {
            var c = a[b];
            if ("interactive" === c.readyState)
                return R = c
        }
    }
    function s(a) {
        var b = [];
        return a.replace(Y, "").replace(X, function(a, c, d) {
            d && b.push(d)
        }), b
    }
    function t(a, b) {
        this.uri = a, this.dependencies = b || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }
    if (!a.seajs) {
        var u = a.seajs = {version: "2.2.0"}, v = u.data = {}, w = c("Object"), x = c("String"), y = Array.isArray || c("Array"), z = c("Function"), A = 0, B = v.events = {};
        u.on = function(a, b) {
            var c = B[a] || (B[a] = []);
            return c.push(b), u
        }, u.off = function(a, b) {
            if (!a && !b)
                return B = v.events = {}, u;
            var c = B[a];
            if (c)
                if (b)
                    for (var d = c.length - 1; d >= 0; d--)
                        c[d] === b && c.splice(d, 1);
                else
                    delete B[a];
            return u
        };
        var C = u.emit = function(a, b) {
            var c, d = B[a];
            if (d)
                for (d = d.slice(); c = d.shift(); )
                    c(b);
            return u
        }, D = /[^?#]*\//, E = /\/\.\//g, F = /\/[^/]+\/\.\.\//, G = /([^:/])\/\//g, H = /^([^/:]+)(\/.+)$/, I = /{([^{]+)}/g, J = /^\/\/.|:\//, K = /^.*?\/\/.*?\//, L = document, M = e(L.URL), N = L.scripts, O = L.getElementById("seajsnode") || N[N.length - 1], P = e(n(O) || M);
        u.resolve = m;
        var Q, R, S = L.getElementsByTagName("head")[0] || L.documentElement, T = S.getElementsByTagName("base")[0], U = /\.css(?:\?|$)/i, V = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") < 536;
        u.request = o;
        var W, X = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, Y = /\\\\/g, Z = u.cache = {}, $ = {}, _ = {}, aa = {}, ba = t.STATUS = {FETCHING: 1,SAVED: 2,LOADING: 3,LOADED: 4,EXECUTING: 5,EXECUTED: 6};
        t.prototype.resolve = function() {
            for (var a = this, b = a.dependencies, c = [], d = 0, e = b.length; e > d; d++)
                c[d] = t.resolve(b[d], a.uri);
            return c
        }, t.prototype.load = function() {
            var a = this;
            if (!(a.status >= ba.LOADING)) {
                a.status = ba.LOADING;
                var c = a.resolve();
                C("load", c);
                for (var d, e = a._remain = c.length, f = 0; e > f; f++)
                    d = t.get(c[f]), d.status < ba.LOADED ? d._waitings[a.uri] = (d._waitings[a.uri] || 0) + 1 : a._remain--;
                if (0 === a._remain)
                    return a.onload(), b;
                var g = {};
                for (f = 0; e > f; f++)
                    d = Z[c[f]], d.status < ba.FETCHING ? d.fetch(g) : d.status === ba.SAVED && d.load();
                for (var h in g)
                    g.hasOwnProperty(h) && g[h]()
            }
        }, t.prototype.onload = function() {
            var a = this;
            a.status = ba.LOADED, a.callback && a.callback();
            var b, c, d = a._waitings;
            for (b in d)
                d.hasOwnProperty(b) && (c = Z[b], c._remain -= d[b], 0 === c._remain && c.onload());
            delete a._waitings, delete a._remain
        }, t.prototype.fetch = function(a) {
            function c() {
                u.request(g.requestUri, g.onRequest, g.charset)
            }
            function d() {
                delete $[h], _[h] = !0, W && (t.save(f, W), W = null);
                var a, b = aa[h];
                for (delete aa[h]; a = b.shift(); )
                    a.load()
            }
            var e = this, f = e.uri;
            e.status = ba.FETCHING;
            var g = {uri: f};
            C("fetch", g);
            var h = g.requestUri || f;
            return !h || _[h] ? (e.load(), b) : $[h] ? (aa[h].push(e), b) : ($[h] = !0, aa[h] = [e], C("request", g = {uri: f,requestUri: h,onRequest: d,charset: v.charset}), g.requested || (a ? a[g.requestUri] = c : c()), b)
        }, t.prototype.exec = function() {
            function a(b) {
                return t.get(a.resolve(b)).exec()
            }
            var c = this;
            if (c.status >= ba.EXECUTING)
                return c.exports;
            c.status = ba.EXECUTING;
            var e = c.uri;
            a.resolve = function(a) {
                return t.resolve(a, e)
            }, a.async = function(b, c) {
                return t.use(b, c, e + "_async_" + d()), a
            };
            var f = c.factory, g = z(f) ? f(a, c.exports = {}, c) : f;
            return g === b && (g = c.exports), delete c.factory, c.exports = g, c.status = ba.EXECUTED, C("exec", c), g
        }, t.resolve = function(a, b) {
            var c = {id: a,refUri: b};
            return C("resolve", c), c.uri || u.resolve(c.id, b)
        }, t.define = function(a, c, d) {
            var e = arguments.length;
            1 === e ? (d = a, a = b) : 2 === e && (d = c, y(a) ? (c = a, a = b) : c = b), !y(c) && z(d) && (c = s("" + d));
            var f = {id: a,uri: t.resolve(a),deps: c,factory: d};
            if (!f.uri && L.attachEvent) {
                var g = r();
                g && (f.uri = g.src)
            }
            C("define", f), f.uri ? t.save(f.uri, f) : W = f
        }, t.save = function(a, b) {
            var c = t.get(a);
            c.status < ba.SAVED && (c.id = b.id || a, c.dependencies = b.deps || [], c.factory = b.factory, c.status = ba.SAVED)
        }, t.get = function(a, b) {
            return Z[a] || (Z[a] = new t(a, b))
        }, t.use = function(b, c, d) {
            var e = t.get(d, y(b) ? b : [b]);
            e.callback = function() {
                for (var b = [], d = e.resolve(), f = 0, g = d.length; g > f; f++)
                    b[f] = Z[d[f]].exec();
                c && c.apply(a, b), delete e.callback
            }, e.load()
        }, t.preload = function(a) {
            var b = v.preload, c = b.length;
            c ? t.use(b, function() {
                b.splice(0, c), t.preload(a)
            }, v.cwd + "_preload_" + d()) : a()
        }, u.use = function(a, b) {
            return t.preload(function() {
                t.use(a, b, v.cwd + "_use_" + d())
            }), u
        }, t.define.cmd = {}, a.define = t.define, u.Module = t, v.fetchedList = _, v.cid = d, u.require = function(a) {
            var b = t.get(t.resolve(a));
            return b.status < ba.EXECUTING && b.exec(), b.exports
        };
        var ca = /^(.+?\/)(\?\?)?(seajs\/)+/;
        v.base = (P.match(ca) || ["", P])[1], v.dir = P, v.cwd = M, v.charset = "utf-8", v.preload = function() {
            var a = [], b = location.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
            return b += " " + L.cookie, b.replace(/(seajs-\w+)=1/g, function(b, c) {
                a.push(c)
            }), a
        }(), u.config = function(a) {
            for (var b in a) {
                var c = a[b], d = v[b];
                if (d && w(d))
                    for (var e in c)
                        d[e] = c[e];
                else
                    y(d) ? c = d.concat(c) : "base" === b && ("/" !== c.slice(-1) && (c += "/"), c = l(c)), v[b] = c
            }
            return C("config", a), u
        }
    }
}(this), !function(a, b) {
    "function" == typeof define && (define.amd || define.cmd) ? define("cmp/jweixin-1.0.0", [], function() {
        return b(a)
    }) : b(a, !0)
}(this, function(a, b) {
    function c(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function(a) {
            g(b, a, d)
        }) : j(b, d)
    }
    function d(b, c, d) {
        a.WeixinJSBridge ? WeixinJSBridge.on(b, function(a) {
            d && d.trigger && d.trigger(a), g(b, a, c)
        }) : d ? j(b, d) : j(b, c)
    }
    function e(a) {
        return a = a || {}, a.appId = z.appId, a.verifyAppId = z.appId, a.verifySignType = "sha1", a.verifyTimestamp = z.timestamp + "", a.verifyNonceStr = z.nonceStr, a.verifySignature = z.signature, a
    }
    function f(a) {
        return {timeStamp: a.timestamp + "",nonceStr: a.nonceStr,"package": a["package"],paySign: a.paySign,signType: a.signType || "SHA1"}
    }
    function g(a, b, c) {
        var d, e, f;
        switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d, c), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || "", z.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(":"), f = d.substring(e + 1)) {
            case "ok":
                c.success && c.success(b);
                break;
            case "cancel":
                c.cancel && c.cancel(b);
                break;
            default:
                c.fail && c.fail(b)
        }
        c.complete && c.complete(b)
    }
    function h(a, b) {
        var c, d, e, f;
        if (b) {
            switch (c = b.indexOf(":"), a) {
                case o.config:
                    d = "config";
                    break;
                case o.openProductSpecificView:
                    d = "openProductSpecificView";
                    break;
                default:
                    d = b.substring(0, c), d = d.replace(/_/g, " "), d = d.replace(/\b\w+\b/g, function(a) {
                        return a.substring(0, 1).toUpperCase() + a.substring(1)
                    }), d = d.substring(0, 1).toLowerCase() + d.substring(1), d = d.replace(/ /g, ""), -1 != d.indexOf("Wcpay") && (d = d.replace("Wcpay", "WCPay")), e = p[d], e && (d = e)
            }
            f = b.substring(c + 1), "confirm" == f && (f = "ok"), "failed" == f && (f = "fail"), -1 != f.indexOf("failed_") && (f = f.substring(7)), -1 != f.indexOf("fail_") && (f = f.substring(5)), f = f.replace(/_/g, " "), f = f.toLowerCase(), ("access denied" == f || "no permission to execute" == f) && (f = "permission denied"), "config" == d && "function not exist" == f && (f = "ok"), b = d + ":" + f
        }
        return b
    }
    function i(a) {
        var b, c, d, e;
        if (a) {
            for (b = 0, c = a.length; c > b; ++b)
                d = a[b], e = o[d], e && (a[b] = e);
            return a
        }
    }
    function j(a, b) {
        if (z.debug && !b.isInnerInvoke) {
            var c = p[a];
            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
        }
    }
    function k() {
        if (!("6.0.2" > w || y.systemType < 0)) {
            var a = new Image;
            y.appId = z.appId, y.initTime = x.initEndTime - x.initStartTime, y.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, C.getNetworkType({isInnerInvoke: !0,success: function(b) {
                y.networkType = b.networkType;
                var c = "https://open.weixin.qq.com/sdk/report?v=" + y.version + "&o=" + y.isPreVerifyOk + "&s=" + y.systemType + "&c=" + y.clientVersion + "&a=" + y.appId + "&n=" + y.networkType + "&i=" + y.initTime + "&p=" + y.preVerifyTime + "&u=" + y.url;
                a.src = c
            }})
        }
    }
    function l() {
        return (new Date).getTime()
    }
    function m(b) {
        t && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener("WeixinJSBridgeReady", b, !1))
    }
    function n() {
        C.invoke || (C.invoke = function(b, c, d) {
            a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d)
        }, C.on = function(b, c) {
            a.WeixinJSBridge && WeixinJSBridge.on(b, c)
        })
    }
    var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
    return a.jWeixin ? void 0 : (o = {config: "preVerifyJSAPI",onMenuShareTimeline: "menu:share:timeline",onMenuShareAppMessage: "menu:share:appmessage",onMenuShareQQ: "menu:share:qq",onMenuShareWeibo: "menu:share:weiboApp",previewImage: "imagePreview",getLocation: "geoLocation",openProductSpecificView: "openProductViewWithPid",addCard: "batchAddCard",openCard: "batchViewCard",chooseWXPay: "getBrandWCPayRequest"}, p = function() {
        var a, b = {};
        for (a in o)
            b[o[a]] = a;
        return b
    }(), q = a.document, r = q.title, s = navigator.userAgent.toLowerCase(), t = -1 != s.indexOf("micromessenger"), u = -1 != s.indexOf("android"), v = -1 != s.indexOf("iphone") || -1 != s.indexOf("ipad"), w = function() {
        var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
        return a ? a[1] : ""
    }(), x = {initStartTime: l(),initEndTime: 0,preVerifyStartTime: 0,preVerifyEndTime: 0}, y = {version: 1,appId: "",initTime: 0,preVerifyTime: 0,networkType: "",isPreVerifyOk: 1,systemType: v ? 1 : u ? 2 : -1,clientVersion: w,url: encodeURIComponent(location.href)}, z = {}, A = {_completes: []}, B = {state: 0,res: {}}, m(function() {
        x.initEndTime = l()
    }), C = {config: function(a) {
        z = a, j("config", a);
        var b = z.check === !1 ? !1 : !0;
        m(function() {
            var a, d, e;
            if (b)
                c(o.config, {verifyJsApiList: i(z.jsApiList)}, function() {
                    A._complete = function(a) {
                        x.preVerifyEndTime = l(), B.state = 1, B.res = a
                    }, A.success = function() {
                        y.isPreVerifyOk = 0
                    }, A.fail = function(a) {
                        A._fail ? A._fail(a) : B.state = -1
                    };
                    var a = A._completes;
                    return a.push(function() {
                        z.debug || k()
                    }), A.complete = function() {
                        for (var b = 0, c = a.length; c > b; ++b)
                            a[b]();
                        A._completes = []
                    }, A
                }()), x.preVerifyStartTime = l();
            else {
                for (B.state = 1, a = A._completes, d = 0, e = a.length; e > d; ++d)
                    a[d]();
                A._completes = []
            }
        }), z.beta && n()
    },ready: function(a) {
        0 != B.state ? a() : (A._completes.push(a), !t && z.debug && a())
    },error: function(a) {
        "6.0.2" > w || (-1 == B.state ? a(B.res) : A._fail = a)
    },checkJsApi: function(a) {
        var b = function(a) {
            var b, c, d = a.checkResult;
            for (b in d)
                c = p[b], c && (d[c] = d[b], delete d[b]);
            return a
        };
        c("checkJsApi", {jsApiList: i(a.jsApiList)}, function() {
            return a._complete = function(a) {
                if (u) {
                    var c = a.checkResult;
                    c && (a.checkResult = JSON.parse(c))
                }
                a = b(a)
            }, a
        }())
    },onMenuShareTimeline: function(a) {
        d(o.onMenuShareTimeline, {complete: function() {
            c("shareTimeline", {title: a.title || r,desc: a.title || r,img_url: a.imgUrl,link: a.link || location.href}, a)
        }}, a)
    },onMenuShareAppMessage: function(a) {
        d(o.onMenuShareAppMessage, {complete: function() {
            c("sendAppMessage", {title: a.title || r,desc: a.desc || "",link: a.link || location.href,img_url: a.imgUrl,type: a.type || "link",data_url: a.dataUrl || ""}, a)
        }}, a)
    },onMenuShareQQ: function(a) {
        d(o.onMenuShareQQ, {complete: function() {
            c("shareQQ", {title: a.title || r,desc: a.desc || "",img_url: a.imgUrl,link: a.link || location.href}, a)
        }}, a)
    },onMenuShareWeibo: function(a) {
        d(o.onMenuShareWeibo, {complete: function() {
            c("shareWeiboApp", {title: a.title || r,desc: a.desc || "",img_url: a.imgUrl,link: a.link || location.href}, a)
        }}, a)
    },startRecord: function(a) {
        c("startRecord", {}, a)
    },stopRecord: function(a) {
        c("stopRecord", {}, a)
    },onVoiceRecordEnd: function(a) {
        d("onVoiceRecordEnd", a)
    },playVoice: function(a) {
        c("playVoice", {localId: a.localId}, a)
    },pauseVoice: function(a) {
        c("pauseVoice", {localId: a.localId}, a)
    },stopVoice: function(a) {
        c("stopVoice", {localId: a.localId}, a)
    },onVoicePlayEnd: function(a) {
        d("onVoicePlayEnd", a)
    },uploadVoice: function(a) {
        c("uploadVoice", {localId: a.localId,isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
    },downloadVoice: function(a) {
        c("downloadVoice", {serverId: a.serverId,isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
    },translateVoice: function(a) {
        c("translateVoice", {localId: a.localId,isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
    },chooseImage: function(a) {
        c("chooseImage", {scene: "1|2",count: a.count || 9,sizeType: a.sizeType || ["original", "compressed"]}, function() {
            return a._complete = function(a) {
                if (u) {
                    var b = a.localIds;
                    b && (a.localIds = JSON.parse(b))
                }
            }, a
        }())
    },previewImage: function(a) {
        c(o.previewImage, {current: a.current,urls: a.urls}, a)
    },uploadImage: function(a) {
        c("uploadImage", {localId: a.localId,isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
    },downloadImage: function(a) {
        c("downloadImage", {serverId: a.serverId,isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1}, a)
    },getNetworkType: function(a) {
        var b = function(a) {
            var b, c, d, e = a.errMsg;
            if (a.errMsg = "getNetworkType:ok", b = a.subtype, delete a.subtype, b)
                a.networkType = b;
            else
                switch (c = e.indexOf(":"), d = e.substring(c + 1)) {
                    case "wifi":
                    case "edge":
                    case "wwan":
                        a.networkType = d;
                        break;
                    default:
                        a.errMsg = "getNetworkType:fail"
                }
            return a
        };
        c("getNetworkType", {}, function() {
            return a._complete = function(a) {
                a = b(a)
            }, a
        }())
    },openLocation: function(a) {
        c("openLocation", {latitude: a.latitude,longitude: a.longitude,name: a.name || "",address: a.address || "",scale: a.scale || 28,infoUrl: a.infoUrl || ""}, a)
    },getLocation: function(a) {
        a = a || {}, c(o.getLocation, {type: a.type || "wgs84"}, function() {
            return a._complete = function(a) {
                delete a.type
            }, a
        }())
    },hideOptionMenu: function(a) {
        c("hideOptionMenu", {}, a)
    },showOptionMenu: function(a) {
        c("showOptionMenu", {}, a)
    },closeWindow: function(a) {
        a = a || {}, c("closeWindow", {immediate_close: a.immediateClose || 0}, a)
    },hideMenuItems: function(a) {
        c("hideMenuItems", {menuList: a.menuList}, a)
    },showMenuItems: function(a) {
        c("showMenuItems", {menuList: a.menuList}, a)
    },hideAllNonBaseMenuItem: function(a) {
        c("hideAllNonBaseMenuItem", {}, a)
    },showAllNonBaseMenuItem: function(a) {
        c("showAllNonBaseMenuItem", {}, a)
    },scanQRCode: function(a) {
        a = a || {}, c("scanQRCode", {needResult: a.needResult || 0,scanType: a.scanType || ["qrCode", "barCode"]}, function() {
            return a._complete = function(a) {
                var b, c;
                v && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
            }, a
        }())
    },openProductSpecificView: function(a) {
        c(o.openProductSpecificView, {pid: a.productId,view_type: a.viewType || 0}, a)
    },addCard: function(a) {
        var b, d, e, f, g = a.cardList, h = [];
        for (b = 0, d = g.length; d > b; ++b)
            e = g[b], f = {card_id: e.cardId,card_ext: e.cardExt}, h.push(f);
        c(o.addCard, {card_list: h}, function() {
            return a._complete = function(a) {
                var b, c, d, e = a.card_list;
                if (e) {
                    for (e = JSON.parse(e), b = 0, c = e.length; c > b; ++b)
                        d = e[b], d.cardId = d.card_id, d.cardExt = d.card_ext, d.isSuccess = d.is_succ ? !0 : !1, delete d.card_id, delete d.card_ext, delete d.is_succ;
                    a.cardList = e, delete a.card_list
                }
            }, a
        }())
    },chooseCard: function(a) {
        c("chooseCard", {app_id: z.appId,location_id: a.shopId || "",sign_type: a.signType || "SHA1",card_id: a.cardId || "",card_type: a.cardType || "",card_sign: a.cardSign,time_stamp: a.timestamp + "",nonce_str: a.nonceStr}, function() {
            return a._complete = function(a) {
                a.cardList = a.choose_card_info, delete a.choose_card_info
            }, a
        }())
    },openCard: function(a) {
        var b, d, e, f, g = a.cardList, h = [];
        for (b = 0, d = g.length; d > b; ++b)
            e = g[b], f = {card_id: e.cardId,code: e.code}, h.push(f);
        c(o.openCard, {card_list: h}, a)
    },chooseWXPay: function(a) {
        c(o.chooseWXPay, f(a), a)
    }}, b && (a.wx = a.jWeixin = C), C)
}), define("cmp/net", [], function(a, b) {
    "use strict";
    function c(a) {
        var b;
        return null == a ? b = String(a) : (b = Object.prototype.toString.call(a).toLowerCase(), b = b.substring(8, b.length - 1)), b
    }
    function d(a, b, d) {
        var e, f, g;
        if ("object" == typeof a)
            if (g = c(a), d = d || a, "array" === g || "arguments" === g || "nodelist" === g) {
                for (e = 0, f = a.length; f > e; e++)
                    if (b.call(d, a[e], e, a) === !1)
                        return
            } else
                for (e in a)
                    if (a.hasOwnProperty(e) && b.call(d, a[e], e, a) === !1)
                        return
    }
    function e() {
        var a = {};
        return d(arguments, function(b) {
            d(b, function(b, c) {
                a[c] = b
            })
        }), a
    }
    function f(a, b) {
        b = b || location.search;
        var c, d = b.indexOf("#");
        return d > 0 && (b = b.substr(0, d)), c = b.match(new RegExp("[?|&]" + encodeURIComponent(a) + "=([^&]*)(&|$)")), c ? decodeURIComponent(c[1]) : ""
    }
    function g(a, b) {
        var c, d;
        return b && (c = a.indexOf("#"), c >= 0 ? (d = a.substr(c), a = a.substr(0, c)) : d = "", a += (a.indexOf("?") < 0 ? "?" : "&") + b.replace(/^[?|&]+/, "") + d), a
    }
    function h(a) {
        a = (a || location.queryString).replace(/^\?/, "");
        var b, c, d = a.split("&"), e = {};
        if (d.length)
            for (b = 0; b < d.length; b++)
                c = d[b].split("="), 2 === c.length && (e[c[0]] = decodeURIComponent(c[1]));
        return e
    }
    function i(a, b) {
        var f, g, i, j, k = [], l = "", m = "string" === c(b);
        return m && (g = b.indexOf("#"), g >= 0 && (l = b.substr(g), b = b.substr(0, g)), i = b.indexOf("?"), i >= 0 && (j = h(b.substr(i)), a = e(j, a), b = b.substr(0, i))), d(a, function(a, b) {
            k.push(encodeURIComponent(b) + "=" + encodeURIComponent(a))
        }), f = k.join("&").replace(/%20/g, "+"), m ? b + "?" + f + l : f
    }
    function j(a) {
        a = a || {};
        var b, f = a.type || "GET", g = a.url || "", h = e(n, a.data), j = a.success, k = a.error, o = new XMLHttpRequest;
        g = i({__t: +new Date}, g), o.onreadystatechange = function() {
            var a;
            4 === o.readyState && (200 === o.status ? (a = JSON.parse(o.responseText), l && l(a), j && j(a)) : k && k(o))
        }, f = "POST" === f.toUpperCase() ? "POST" : "GET";
        try {
            "POST" === f ? (b = new FormData, d(h, function(a, d) {
                d && b.append(d, "array" === c(a) ? a.join() : a)
            }), o.open(f, m(g), !0), o.send(b)) : (g = m(i(h, g)), o.open(f, g, !0), o.send())
        } catch (p) {
            console.error("ajax error", p)
        }
    }
    function k(a) {
        return function(b, c, d, e) {
            j({type: a,url: b,data: c,success: d,error: e})
        }
    }
    var l, m, n = {};
    m = function() {
        var a, b, c, d, e, h, j = 0, k = {};
        if ("wp" === f("fr"))
            for (c = f("uc_param_str"), h = c.length - c.length % 2; h > j; )
                d = c.substr(j, 2), e = f(d), e.length > 0 && (k[d] = e), j += 2;
        return b = f("entry"), b && (k.entry = b), a = i(k), function(b) {
            return b = g(b, a), f("uc_param_str", b) || (b = g(b, "uc_param_str=dnfrpfbivesscpgimibtbmntnisieijblauputog")), b
        }
    }(), b.ping = function(a, b) {
        var c = new Image, d = e({__t: +new Date}, n, b);
        c.src = m(i(d, a))
    }, b.baseParam = function(a, b) {
        if ("string" === c(a)) {
            if (1 === arguments.length)
                return n[a];
            n[a] = b
        } else
            "object" === c(a) && (n = e(n, a))
    }, b.baseSuccess = function(a) {
        "function" === c(a) && (l = a)
    }, b.redirect = function(a) {
        a && (location.href = m(i(n, a)))
    }, b.query = f, b.parseObject = h, b.parseQuery = i, b.ucParam = m, b.ajax = j, b.get = k("GET"), b.post = k("POST")
}), define("cmp/observer", [], function(a, b, c) {
    "use strict";
    function d(a) {
        this._ctx = a || this
    }
    var e = [].slice, f = d.prototype;
    f.on = function(a, b) {
        return this._cbs = this._cbs || {}, (this._cbs[a] = this._cbs[a] || []).push(b), this
    }, f.once = function(a, b) {
        function c() {
            d.off(a, c), b.apply(this, arguments)
        }
        var d = this;
        return this._cbs = this._cbs || {}, c.fn = b, this.on(a, c), this
    }, f.off = function(a, b) {
        if (this._cbs = this._cbs || {}, !arguments.length)
            return this._cbs = {}, this;
        var c = this._cbs[a];
        if (!c)
            return this;
        if (1 === arguments.length)
            return delete this._cbs[a], this;
        for (var d, e = 0; e < c.length; e++)
            if (d = c[e], d === b || d.fn === b) {
                c.splice(e, 1);
                break
            }
        return this
    }, f.emit = function(a, b, c, d) {
        this._cbs = this._cbs || {};
        var e = this._cbs[a];
        if (e) {
            e = e.slice(0);
            for (var f = 0, g = e.length; g > f; f++)
                e[f].call(this._ctx, b, c, d)
        }
        return this
    }, f.applyEmit = function(a) {
        this._cbs = this._cbs || {};
        var b, c = this._cbs[a];
        if (c) {
            c = c.slice(0), b = e.call(arguments, 1);
            for (var d = 0, f = c.length; f > d; d++)
                c[d].apply(this._ctx, b)
        }
        return this
    }, c.exports = d
}), define("cmp/scroll", [], function(a, b) {
    "use strict";
    function c() {
        return 0 === i.documentElement.clientHeight ? i.body.clientHeight : i.documentElement.clientHeight
    }
    function d() {
        return 0 === i.documentElement.scrollTop ? i.body.scrollTop : i.documentElement.scrollTop
    }
    function e() {
        return 0 === i.documentElement.scrollHeight ? i.body.scrollHeight : i.documentElement.scrollHeight
    }
    var f, g, h = window, i = document, j = 50, k = !1;
    b.top = function() {
        h.scrollTo(0, 0)
    }, b.listenBottom = function(a) {
        h.addEventListener ? h.addEventListener("scroll", function() {
            f(a)
        }) : h.onscroll = function() {
            f(a)
        }
    }, f = function(a) {
        c() + d() + j >= e() && (k || (k = !0, a(), k = !1))
    }, b.listenHeight = function(a, b) {
        h.addEventListener ? h.addEventListener("scroll", function() {
            g(a, b)
        }) : h.onscroll = function() {
            g(b)
        }
    }, g = function(a, b) {
        c() + d() > a && b()
    }, b.hideTopBar = function() {
        h.addEventListener("load", function() {
            h.scrollTo(0, 1)
        })
    }
}), define("cmp/share", [], function(a, b, c) {
    "use strict";
    function d(a, b, c, d, f, g) {
        var h = "";
        if (e())
            d && (d = d.replace("SinaWeibo", "kSinaWeibo"), d = d.replace("WechatFriends", "kWeixin"), d = d.replace("WechatTimeline", "kWeixinFriend")), ucbrowser.web_share(a || "", b || "", c || "http://uc.cn", d || "", "", "", f || "");
        else
            try {
                g && 0 !== g.length && (h = g.toString()), ucweb.startRequest("shell.page_share", [a || "", b || "", c || "http://uc.cn", d || "", h || "", "", j(f) || ""])
            } catch (i) {
                console && console.error(i.message)
            }
    }
    function e() {
        return -1 !== k.navigator.userAgent.toLowerCase().indexOf("iphone") ? !0 : !1
    }
    function f(a) {
        var b = a.offsetTop;
        return b += null != a.offsetParent ? b += f(a.offsetParent) : 0
    }
    function g(a) {
        var b = a.offsetLeft;
        return b += null != a.offsetParent ? g(a.offsetParent) : 0
    }
    function h(a) {
        var b, c = getComputedStyle(a, null).webkitTransform;
        return b = "none" === c ? 0 : parseInt(c.split(",")[5].replace(")", "")), b += "BODY" !== a.parentNode.tagName ? h(a.parentNode) : 0
    }
    function i(a) {
        var b, c = getComputedStyle(a, null).webkitTransform;
        return b = "none" === c ? 0 : parseInt(c.split(",")[4]), b += "BODY" !== a.parentNode.tagName ? i(a.parentNode) : 0
    }
    function j(a) {
        var b = document.getElementById(a);
        if (b) {
            var c = [g(b) + i(b), f(b) + h(b), b.offsetWidth, b.offsetHeight];
            return c
        }
        return ""
    }
    var k = window;
    c.exports = d
}), define("cmp/silly-encrypt", [], function(a, b, c) {
    "use strict";
    var d = function() {
    };
    d.config = {dig: 32,el: 1,kl: 2,ke: 2,wd: 14,kd: 13}, d.relation = {9: ["p", "m"],8: ["o", "l"],7: ["i", "k"],6: ["u", "j"],5: ["y", "h"],4: ["t", "g"],3: ["r", "f"],2: ["e", "d"],1: ["w", "s", "x"],0: ["q", "a", "z"],".": ["n", "b"],"-": ["v", "c"]}, d.cw = function(a, b) {
        return "number" != typeof a || isNaN(a) || "number" != typeof b || isNaN(b) ? !1 : (a + "").length > d.config.wd || (b + "").length > d.config.kd ? !1 : !0
    }, d.insert = function(a, b, c) {
        return a.substr(0, b) + c + a.substr(b)
    }, d.convert = function(a, b) {
        a += "", b += "";
        var c = a.length, e = d.ran(c), f = b.length;
        return f = (10 > f ? "0" : "") + f, e = (10 > e ? "0" : "") + e, e + f + d.insert(a, e, b)
    }, d.ran = function(a) {
        return Math.floor(Math.random() * a)
    }, d.hash = function(a) {
        for (var b = d.config.dig - a.length; b--; )
            a = d.insert(a, d.ran(a.length), d.ran(10));
        return a
    }, d.ct = function(a) {
        return a[d.ran(a.length)]
    }, c.exports.encode = d.encode = function(a, b) {
        if (d.cw(a, b)) {
            a = d.convert(a, b);
            for (var c, e = a.length, f = d.relation, g = d.ran(10), h = d.ct(f[g]); e--; )
                c = "." !== a[e] && "-" !== a[e] ? f[(Math.floor(a[e]) + g) % 10] : f[a[e]], h += d.ct(c);
            return d.hash(h)
        }
    }, d.cc = function(a, b) {
        return "string" != typeof a || "number" != typeof b || isNaN(b) ? !1 : !0
    }, d.initIndex = function() {
        if (!d.index) {
            var a, b, c = d.index = {}, e = d.relation;
            for (a in e)
                if (e.hasOwnProperty(a))
                    for (b = e[a].length; b--; )
                        c[e[a][b]] = a
        }
    }, d.clear = function(a) {
        for (var b = "", c = 0; c < a.length; )
            isNaN(parseInt(a[c])) && (b += a[c]), ++c;
        return b
    }, c.exports.decode = d.decode = function(a, b) {
        if (d.cc(a, b)) {
            d.initIndex(), a = d.clear(a);
            for (var c, e, f, g = d.index, h = g[a[0]], i = "", j = a.length; j-- > 1; )
                c = g[a[j]], "." !== c && "-" !== c && (c -= h, c = 0 > c ? c + 10 : c), i += c;
            e = Math.floor(i.substr(0, d.config.ke)), f = Math.floor(i.substr(d.config.ke, d.config.kl));
            var k = d.config.ke + d.config.kl, l = e + k;
            if (Math.floor(i.substr(l, f)) === b)
                return parseFloat(i.substr(k, e) + i.substr(l + f))
        }
    }
}), define("cmp/storage", [], function(a, b) {
    "use strict";
    var c = window;
    b.setLocal = function(a, b) {
        return c.localStorage ? (c.localStorage.setItem(a, JSON.stringify(b)), !0) : !1
    }, b.getLocal = function(a) {
        if (c.localStorage) {
            var b = c.localStorage.getItem(a);
            return b ? JSON.parse(b) : null
        }
        return null
    }, b.clearLocal = function() {
        return c.localStorage ? (c.localStorage.clear(), !0) : !1
    }
}), define("index/allShare", ["utils/utils", "cmp/share", "cmp/jweixin-1.0.0", "index/store", "utils/pf"], function(a, b) {
    "use strict";
    var c = a("utils/utils"), d = a("cmp/share"), e = a("cmp/jweixin-1.0.0"), f = a("index/store"), g = a("utils/pf"), h = c.$("#wx-mask");
    h.on("click", function() {
        h.hide()
    }), b.wxInit = function() {
        f.wxConfig = f.wxConfig, f.wxConfig.debug = !1, f.wxConfig.jsApiList = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ"], e.config(f.wxConfig)
    }, b.share = function(a) {
        var b = a, c = window.location.protocol + "//" + window.location.host + "/iloveu/public/images/shareicon.png";
        "uc" === g() ? (f.log({pg: "index",ck_id: "shareUc"}), b.title = a.t, b.content = a.d, b.ucLink = a.l, b.domid = a.i, b.plat = a.p, d(b.title, b.content, b.ucLink, b.plat, b.domid, "")) : "wechat" === g() ? (f.log({pg: "index",ck_id: "shareWeixin"}), h.show(), b.title = a.t, b.desc = a.d, b.link = a.l, b.imgUrl = f.userInfo.avatar, b.success = function() {
            -1 !== window.location.href.indexOf("shine") && (window.location.href = a.l)
        }, b.cancel = function() {
            h.hide()
        }, e.ready(function() {
            e.onMenuShareTimeline(b), e.onMenuShareAppMessage(b), e.onMenuShareQQ(b)
        })) : "weibo" === g() ? (f.log({pg: "index",ck_id: "shareWeibo"}), window.location.href = "http://rec.uc.cn/actplat/sharetheme/service/index?uc_param_str=nidnssbifrpfuacpve&userId=&ruleId=102&activityId=204&content=" + encodeURIComponent(a.d) + "&title=" + encodeURIComponent(a.t) + "&url=" + encodeURIComponent(a.l) + "&imgUrl=" + encodeURIComponent(c) + "&backUrl=&site=sina") : "qq" === g() && (f.log({pg: "index",ck_id: "shareQQ"}), window.location.href = "http://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(a.l) + "&desc=" + encodeURIComponent(a.d) + "&title=" + encodeURIComponent(a.t) + "&pics=" + encodeURIComponent(c))
    }
}), define("index/canvas", ["utils/utils", "index/matrix", "index/imageCompress", "index/store", "cmp/silly-encrypt", "appData", "utils/pf", "appData", "appData"], function(a, b) {
    "use strict";
    function c(a) {
        return E = a.changedTouches[0], Math.floor((E.clientX + document.body.scrollLeft || E.pageX) - r.offsetLeft - v.offsetLeft)
    }
    function d(a) {
        return E = a.changedTouches[0], Math.floor((E.clientY + document.body.scrollTop || E.pageY) - r.offsetTop)
    }
    function e() {
        for (var a = 0, b = 2, c = 0; a < H.length; ) {
            if (H[a] >= 0 && H[a] < 160 && H[a + 1] >= 0 && H[a + 1] < 320 && (++c, c >= b))
                return !0;
            a += 2
        }
        return !1
    }
    function f() {
        l.ownerInfo.score = p.countScore(j.getStdDist(F)), x.txt(p.getScoreMsg(l.ownerInfo.score, q.score)), s.show()
    }
    function g() {
        y.txt(p.getScoreMsg(p.countScore(j.getStdDist(F)), q.score)), u.show()
    }
    function h() {
        l.userInfo.drawDist = j.getStdDist(F), l.userInfo.score = p.countScore(l.userInfo.drawDist), A.txt(l.userInfo.score), z.txt(p.getScoreMsg(l.userInfo.score, q.score)), t.show()
    }
    var i = a("utils/utils"), j = a("index/matrix"), k = a("index/imageCompress"), l = a("index/store"), m = a("cmp/silly-encrypt"), n = a("appData").CONF, o = a("utils/pf"), p = a("appData").FILTER, q = a("appData").MSG, r = i.$("#module-canvas"), s = i.$("#pop-draw"), t = i.$("#pop-draw-friend"), u = i.$("#pop-draw-other"), v = i.$("#love-canvas"), w = i.$("#love-heart"), x = i.$("#owner-desc"), y = i.$("#other-desc"), z = i.$("#friend-desc"), A = i.$("#friend-score"), B = i.$("#mask-canvas"), C = v.getContext("2d"), D = 0, E = "", F = "", G = [], H = [];
    B.on("touchstart", function() {
        return event.preventDefault(), !1
    }), v.on("touchstart", function() {
        var a = c(event), b = d(event);
        G[0] = a, G[1] = b, event.preventDefault()
    }), v.on("touchmove", function() {
        0 === H.length && (H.push(G[0]), H.push(G[1])), b.canvasMove()
    }), v.on("touchend", function() {
        l.log(l.master ? {pg: "index",ck_id: "paintLeft"} : {pg: "index",ck_id: "paintRight"}), b.canvasLeave()
    }), b.canvasLockOpen = function() {
        D = 1
    }, b.canvasInit = function() {
        v.width = n.PIC.WIDTH, v.height = n.PIC.HEIGHT, C.clearRect(0, 0, n.PIC.WIDTH, n.PIC.HEIGHT), C.lineWidth = 2, C.strokeStyle = "#6A3E82"
    }, b.canvasMove = function() {
        if (event.preventDefault(), D) {
            var a = c(event), b = d(event);
            C.lineTo(a, b), C.stroke(), H.push(a, b), H.length > 300 && this.canvasLeave()
        }
    }, b.canvasLeave = function() {
        if (event.preventDefault(), D) {
            if (!e())
                return;
            C.closePath(), D = 0, F = C.getImageData(0, 0, n.PIC.WIDTH, n.PIC.HEIGHT).data, "others" === o() ? g() : l.master ? f() : h()
        }
    }, b.showHeart = function() {
        w.show(), w.className = "heart", setTimeout(function() {
            w.className = "heart-ani"
        }, 200), setTimeout(function() {
            w.hide()
        }, 800)
    }, b.canvasReplay = function() {
        C.clearRect(0, 0, n.PIC.WIDTH, n.PIC.HEIGHT), D = 1, F = "", H = [], C.beginPath(), b.showHeart()
    }, b.countTaken = function() {
        var a = k.encode(H), b = {}, c = l.userInfo.createTime.toString();
        return c = c.substring(c.length - 6, c.length), l.master ? (b.token = m.encode(-1, Math.floor(a.length + c)), b.imgData = a, l.ownerInfo.imgData = b.imgData) : (l.userInfo.dist = j.getDist(l.ownerInfo.matrix, F), b.token = m.encode(l.userInfo.dist, Math.floor(a.length + c)), b.imgData = a, l.userInfo.imgData = b.imgData), b
    }, b.getImgData = function() {
        return k.encode(H)
    }
}), define("index/download", ["utils/pf", "utils/utils", "index/store", "appData"], function(a, b) {
    "use strict";
    var c = window.location, d = a("utils/pf"), e = a("utils/utils"), f = a("index/store"), g = a("appData").CONF, h = e.$("#download-bar");
    b.init = function() {
        h.show()
    }, h.on("click", function() {
        f.log(f.isShine() ? {pg: "shine",ck_id: "bannerDownload"} : {pg: "index",ck_id: "bannerDownload"}), b.download()
    }), b.download = function() {
        e.isIOS() ? "wechat" === d() ? c.href = g.DOWNLOAD_URL.iosQQ : c.href = g.DOWNLOAD_URL.iosStore : "wechat" === d() ? c.href = g.DOWNLOAD_URL.androidQQ : c.href = g.DOWNLOAD_URL.android
    }
}), define("index/imageCompress", ["utils/utils", "utils/pf", "appData"], function(a, b) {
    "use strict";
    function c() {
    }
    var d = window, e = document, f = a("utils/utils"), g = a("utils/pf"), h = c, i = a("appData").CONF;
    if (c.canvas = e.createElement("canvas"), c.ctx = c.canvas.getContext("2d"), c.min = {x: 0,y: 0}, c.max = {x: 159,y: 319}, c.BB = d.BlobBuilder || d.WebKitBlobBuilder, c.URL = d.URL || d.webkitURL, c.workerPool = [], c.poolHash = 0, c.jobQueue = {}, c.carrybit = function(a) {
            switch ((a + "").length) {
                case 1:
                    return "00" + a;
                case 2:
                    return "0" + a;
                case 3:
                    return "" + a
            }
        }, b.encode = c.encode = function(a) {
            function b(a, b) {
                a = 0 === a ? 2 * h.max.x : a, i += h.carrybit(a), i += h.carrybit(b)
            }
            function c() {
                0 !== i.length && (0 !== j.length && (j += "-"), j += parseInt(i, 10).toString(36), i = "")
            }
            function d() {
                if (0 === k) {
                    var c = g(l.x, l.y, a[n], a[n + 1]);
                    b(c.x, c.y), f(i), k = 1
                }
                m.x = a[n], m.y = a[n + 1]
            }
            function e() {
                if (1 === k) {
                    var c = g(a[n], a[n + 1], m.x, m.y);
                    b(c.x, c.y), f(i), k = 0
                }
                l.x = a[n], l.y = a[n + 1]
            }
            function f() {
                12 === i.length && c()
            }
            function g(a, b, c, d) {
                function e() {
                    if (h.outRange(g, i))
                        return !1;
                    if (b > d) {
                        if (b >= i && i >= d)
                            return !0
                    } else if (i >= b && d >= i)
                        return !0;
                    return !1
                }
                function f() {
                    if (h.outRange(g, i))
                        return !1;
                    if (a > c) {
                        if (a >= g && g >= c)
                            return !0
                    } else if (g >= a && c >= g)
                        return !0;
                    return !1
                }
                if (b === d)
                    return {x: a,y: b};
                if (a === c)
                    return {x: a,y: b};
                var g, i, j = (b - d) / (a - c), k = b - j * a;
                return g = h.min.x, i = Math.floor(j * g + k), e() ? {x: g,y: i} : (g = h.max.x, i = Math.floor(j * g + k), e() ? {x: g,y: i} : (i = h.min.y, g = Math.floor((i - k) / j), f() ? {x: g,y: i} : (i = h.max.y, g = Math.floor((i - k) / j), f() ? {x: g,y: i} : void 0)))
            }
            for (var i = "", j = "", k = 0, l = {}, m = {}, n = 0; n < a.length; )
                h.outRange(a[n], a[n + 1]) ? d() : (e(), b(a[n], a[n + 1]), f(i)), n += 2;
            return c(i), j
        }, c.outRange = function(a, b) {
            return a < h.min.x || b < h.min.y || a > h.max.x || b > h.max.y ? !0 : !1
        }, c.getPoints = function(a, b) {
            h.supportWorker() ? (h.workerPool[h.poolHash % h.workerPool.length].postMessage({c: a,jobId: h.poolHash}), h.jobQueue[h.poolHash] = b, ++h.poolHash) : setTimeout(function() {
                b(d.getPoints(a))
            })
        }, b.decode = c.decode = function(a, b) {
            function c(a, b) {
                d();
                for (var c = 0, e = !1; c < a.length; )
                    e && (h.ctx.beginPath(), e = !1), h.ctx.lineTo(a[c].x, a[c].y), h.ctx.stroke(), (a[c].x === h.min.x || a[c].x === h.max.x || a[c].y === h.min.y || a[c].y === h.max.y) && (e = !0), ++c;
                h.ctx.closePath(), b && b(h.canvas.toDataURL())
            }
            function d() {
                h.canvas.width = 160, h.canvas.height = 320, h.ctx.clearRect(0, 0, 160, 320), h.ctx.lineWidth = 2, h.ctx.strokeStyle = "#6A3E82"
            }
            h.getPoints(a, function(a) {
                c(a, b)
            })
        }, b.decodeMatrix = c.decodeMatrix = function(a) {
            var b = new Image;
            return b.src = a, h.ctx.drawImage(b, 0, 0, i.PIC.WIDTH, i.PIC.HEIGHT), h.ctx.getImageData(0, 0, i.PIC.WIDTH, i.PIC.HEIGHT).data
        }, c.supportWorker = function() {
            return "uc" === g() && i.WORKER && "undefined" != typeof d.Worker && h.BB && h.URL ? !0 : !1
        }, c.initWorkerPool = function() {
            function a(a) {
                h.jobQueue[a.data.jobId](a.data.ps), h.jobQueue[a.data.jobId] = null
            }
            var b, c, d = i.WORKER_NUM, e = new h.BB;
            for (e.append(f.$("#common-method").textContent),
                     e.append(f.$("#worker").textContent), b = h.URL.createObjectURL(e.getBlob()); d--; )
                c = new Worker(b), h.workerPool.push(c), c.onmessage = a
        }, h.supportWorker())
        try {
            h.initWorkerPool()
        } catch (j) {
            i.WORKER = !1
        }
    else {
        var k = e.createElement("script");
        k.type = "text/javascript", k.textContent = f.$("#common-method").textContent, e.body.appendChild(k)
    }
}), define("index/matrix", ["index/store"], function(a, b) {
    "use strict";
    function c() {
    }
    var d = c, e = a("index/store");
    c.PIXEL = {w: 160,h: 320,w01: 40,h01: 80,wf: 10,hf: 20}, c.stdMatrix = {"0_4": 2,"0_5": 4,"0_6": 4,"0_7": 4,"0_8": 4,"0_9": 4,"0_10": 4,"0_11": 3,"1_3": 3,"1_4": 5,"1_11": 2,"1_12": 5,"2_3": 5,"2_13": 7,"2_14": 1,"3_2": 3,"3_3": 1,"3_14": 7,"3_15": 1,"4_2": 4,"4_15": 4,"5_2": 4,"5_15": 1,"5_16": 4,"6_2": 3,"6_3": 1,"6_16": 3,"6_17": 3,"7_3": 5,"7_17": 5,"8_3": 3,"8_4": 2,"8_17": 1,"8_18": 4,"9_4": 3,"9_5": 5,"9_18": 4,"9_19": 1}, c.stdRightMatrix = {"9_4": 2,"9_5": 4,"9_6": 4,"9_7": 4,"9_8": 4,"9_9": 4,"9_10": 4,"9_11": 3,"8_3": 3,"8_4": 5,"8_11": 2,"8_12": 5,"7_3": 5,"7_13": 7,"7_14": 1,"6_2": 3,"6_3": 1,"6_14": 7,"6_15": 1,"5_2": 4,"5_15": 4,"4_2": 4,"4_15": 1,"4_16": 4,"3_2": 3,"3_3": 1,"3_16": 3,"3_17": 3,"2_3": 5,"2_17": 5,"1_3": 3,"1_4": 2,"1_17": 1,"1_18": 4,"0_4": 3,"0_5": 5,"0_18": 4,"0_19": 1}, c.maxPunish = 30, c.stdNum = 80, c.getFuzzyMatrix = function(a) {
        for (var b, c, e, f, g = a.length, h = {}, i = 4; g; )
            e = Math.floor((g - 1) / (i * d.PIXEL.w)), f = i * d.PIXEL.w / d.PIXEL.w01, e % (d.PIXEL.h / d.PIXEL.h01) === 0 && a[g - 1] && (b = g / f % d.PIXEL.w01, b = (b ? b : d.PIXEL.w01) - 1, c = e / (d.PIXEL.h / d.PIXEL.h01), b = Math.floor(b / (d.PIXEL.w01 / d.PIXEL.wf)), c = Math.floor(c / (d.PIXEL.h01 / d.PIXEL.hf)), h[d.getFuzzyHash(b, c)] ? ++h[d.getFuzzyHash(b, c)] : h[d.getFuzzyHash(b, c)] = 1), g -= f;
        return h
    }, c.amountMatrix = function(a) {
        function b() {
            var b, c, d;
            for (d in a)
                a.hasOwnProperty(d) && (b = parseInt(d.split("_")[0], 10), g > b && (g = b), b > h && (h = b), c = parseInt(d.split("_")[1], 10), i > c && (i = c), c > j && (j = c));
            e = h - g + 1, f = j - i + 1
        }
        function c(a, b, c, e, f) {
            var h, j, k, l = {};
            for (k in a)
                a.hasOwnProperty(k) && (h = parseInt(k.split("_")[0], 10), j = parseInt(k.split("_")[1], 10), h = Math.round((h - g) * e / b), j = Math.round((j - i) * f / c), l[d.getFuzzyHash(h, j)] = a[k]);
            return l
        }
        var e, f, g = d.PIXEL.wf - 1, h = 0, i = d.PIXEL.hf - 1, j = 0;
        return b(), c(a, e, f, d.PIXEL.wf, d.PIXEL.hf)
    }, c.calculDist = function(a, b) {
        for (var c = d.PIXEL.wf, e = d.PIXEL.hf, f = 0; c--; ) {
            for (; e--; )
                (a[d.getFuzzyHash(c, e)] || b[d.getFuzzyHash(c, e)]) && (f += a[d.getFuzzyHash(c, e)] ? b[d.getFuzzyHash(c, e)] ? Math.abs(a[d.getFuzzyHash(c, e)] - b[d.getFuzzyHash(c, e)]) : a[d.getFuzzyHash(c, e)] : b[d.getFuzzyHash(c, e)]);
            e = d.PIXEL.hf
        }
        return f
    }, c.getFuzzyHash = function(a, b) {
        return a + "_" + b
    }, b.getStdDist = c.getStdDist = function(a) {
        var b, c = d.amountMatrix(d.getFuzzyMatrix(a));
        return b = e.master ? d.calculDist(c, d.amountMatrix(d.stdMatrix)) : d.calculDist(c, d.amountMatrix(d.stdRightMatrix)), d.punishDist(b, d.getFuzzyMatrixNum(c), d.stdNum)
    }, c.punishDist = function(a, b, c) {
        var e = c > b ? b : c;
        return e < d.stdNum && (a += Math.floor(d.stdNum / (e + 1) * d.maxPunish)), a
    }, b.getDist = c.getDist = function(a, b) {
        var c = d.amountMatrix(d.getFuzzyMatrix(a)), e = d.reversalMatrix(d.amountMatrix(d.getFuzzyMatrix(b))), f = d.calculDist(c, e);
        return d.punishDist(f, d.getFuzzyMatrixNum(c), d.getFuzzyMatrixNum(e))
    }, c.getFuzzyMatrixNum = function(a) {
        var b, c = 0;
        for (b in a)
            a.hasOwnProperty(b) && (c += a[b]);
        return c
    }, window.reversalMatrix = c.reversalMatrix = function(a) {
        var b, c, e, f = {};
        for (b in a)
            a.hasOwnProperty(b) && (c = b.split("_")[0], e = b.split("_")[1], c = d.PIXEL.wf - c - 1, f[d.getFuzzyHash(c, e)] = a[b]);
        return f
    }
}), define("index/page/draw-friend", ["utils/utils", "cmp/net", "index/store", "index/canvas", "utils/ob", "utils/lock", "index/records", "appData"], function(a, b) {
    "use strict";
    var c = a("utils/utils"), d = a("cmp/net"), e = a("index/store"), f = a("index/canvas"), g = a("utils/ob"), h = a("utils/lock"), i = a("index/records"), j = a("appData").CONF, k = c.$("#page-index"), l = c.$("#friend-tech"), m = c.$("#module-canvas"), n = c.$("#friend-pop"), o = c.$("#pop-draw-friend"), p = c.$("#btn-again-friend"), q = c.$("#records-user"), r = c.$("#records"), s = c.$("#records-tips2"), t = c.$("#btn-result");
    l.on("click", function() {
        e.log({pg: "index",ck_id: "startRight"}), n.hide(), m.style.cssText = "", q.hide(), r.hide(), s.hide(), f.canvasLockOpen(), f.showHeart(), window.scrollTo(0, 1e3)
    }), p.on("click", function() {
        e.log({pg: "index",ck_id: "paintRightAgain"}), o.hide(), f.canvasReplay()
    }), t.on("click", function() {
        h("draw-friend", function(a) {
            d.post("draw", f.countTaken(), function(b) {
                b.success ? (e.userInfo.imgData = f.getImgData(), e.shineMagic = b.data.magic, e.records.push(e.userInfo), e.records = e.records.sort(function(a, b) {
                    return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0
                }), a(), g.emit("pageChange")) : (e.log({pg: "front_error",status: "draw_friend",code: b.code}), a())
            })
        })
    }), b.enter = function() {
        k.show(), n.show(), n.style.cssText = "display:block; position:absolute; top:255px;", m.className = "module-canvas-r", m.style.cssText = "height:133px; overflow:hidden; visibility: hidden;", f.canvasInit(), c.$("#records-user").show(), c.$("#records").show(), c.$("#records-tips2").show(), i.refresh(j.RECORDS_NUM), e.needAppend = !0
    }, b.exit = function() {
        n.hide(), k.hide(), window.scrollTo(0, 0), c.$("#records-user").hide(), e.needAppend = !1
    }
}), define("index/page/draw", ["utils/utils", "index/allShare", "cmp/net", "index/store", "appData", "index/download", "utils/ob", "utils/lock", "index/canvas"], function(a, b) {
    "use strict";
    function c() {
        var a = 0 === document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
        a > 560 ? o.style.cssText = "position:absolute; bottom:" + (a - 500) + "px" : o.style.cssText = "position:fixed; bottom: 90px"
    }
    var d = a("utils/utils"), e = a("index/allShare"), f = a("cmp/net"), g = a("index/store"), h = a("appData").MSG, i = a("index/download"), j = a("utils/ob"), k = a("utils/lock"), l = a("index/canvas"), m = d.$("#page-new"), n = d.$("#page-index"), o = d.$("#btn_tech"), p = d.$("#btn-begin"), q = d.$("#pop-draw"), r = d.$("#btn-again"), s = d.$("#btn-share"), t = d.$("#btn-other-down"), u = h.SHAREINDEX;
    p.on("click", function() {
        g.log({pg: "index",ck_id: "startLeft"}), m.hide(), l.canvasLockOpen(), n.show(), l.showHeart(), window.scrollTo(0, 1e3)
    }), r.on("click", function() {
        g.log({pg: "index",ck_id: "paintLeftAgain"}), q.hide(), l.canvasReplay()
    }), t.on("click", function() {
        g.log({pg: "index",ck_id: "ucDownload"}), i.download()
    }), s.on("click", function() {
        k("draw-owner", function(a) {
            "" !== g.ownerInfo.imgData && g.magic ? (g.log({pg: "index",ck_id: "reShare"}), u.l = location.href, e.share(u), a()) : f.post("draw", l.countTaken(), function(b) {
                b.success ? (u.l = window.location.protocol + "//" + window.location.host + "/iloveu/" + b.data.magic + "/index" + g.getUrlSearch(), g.magic = b.data.magic, e.share(u), j.emit("pageChange"), a()) : (g.log({pg: "front_error",status: "draw",code: b.code}), a())
            })
        })
    }), window.onresize = function() {
        c()
    }, b.enter = function() {
        c(), m.show(), l.canvasInit()
    }, b.exit = function() {
        m.hide(), n.hide(), window.scrollTo(0, 0)
    }
}), define("index/page/result-friend", ["utils/utils", "index/allShare", "index/store", "index/records", "index/imageCompress", "appData", "appData", "index/tpl"], function(a, b) {
    "use strict";
    var c = a("utils/utils"), d = a("index/allShare"), e = a("index/store"), f = a("index/records"), g = a("index/imageCompress"), h = a("appData").CONF, i = a("appData").MSG, j = a("index/tpl"), k = c.$("#page-result"), l = c.$("#module-img"), m = c.$("#owner-img"), n = c.$("#friend-img"), o = c.$("#friend-result-bar"), p = c.$("#friend-operate"), q = c.$("#btn-ipaint"), r = c.$("#btn-shine"), s = i.SHAREFRIEND;
    q.on("click", function() {
        e.log({pg: "index",ck_id: "iPaint1"}, function() {
            window.location.replace(window.location.protocol + "//" + window.location.host + "/iloveu/a/index?uc_param_str=dnfrpfbivesscpnieisi")
        })
    }), r.on("click", function() {
        e.log({pg: "index",ck_id: "clickShine"}), s.l = window.location.protocol + "//" + window.location.host + "/iloveu/" + e.shineMagic + "/shine" + e.getUrlSearch(), d.share(s)
    }), b.enter = function() {
        g.decode(e.userInfo.imgData, function(a) {
            m.src = e.ownerInfo.base64, n.src = a
        }), l.className = "module-invite no-after", k.show(), o.innerHTML = j.friendBar(), o.show(), p.show(), e.log({pg: "index",ck_id: "resultDist"}), c.$("#records-user").show(), c.$("#records").show(), c.$("#records-tips2").show(), f.refresh(h.RECORDS_NUM), e.needAppend = !0
    }, b.exit = function() {
        k.hide(), o.hide(), p.hide(), c.$("#records-user").hide(), e.needAppend = !1
    }
}), define("index/page/result", ["utils/utils", "index/allShare", "index/records", "index/store", "appData", "appData", "index/imageCompress"], function(a, b) {
    "use strict";
    var c = a("utils/utils"), d = a("index/allShare"), e = a("index/records"), f = a("index/store"), g = a("appData").MSG, h = a("appData").CONF, i = a("index/imageCompress"), j = c.$("#page-result"), k = c.$("#owner-operate"), l = c.$("#btn-paint"), m = c.$("#btn-owner-again"), n = c.$("#owner-img"), o = g.SHAREINDEX;
    l.on("click", function() {
        o.l = f.magic ? window.location.protocol + "//" + window.location.host + "/iloveu/" + f.magic + "/index" + f.getUrlSearch() : window.location.href, d.share(o), f.log({pg: "index",ck_id: "reShare"})
    }), m.on("click", function() {
        f.log({pg: "index",ck_id: "backIndex"}, function() {
            window.location.replace(window.location.protocol + "//" + window.location.host + "/iloveu/a/index" + window.location.search)
        })
    }), b.enter = function() {
        f.log({pg: "index",ck_id: "wxAfterShare"}), i.decode(f.ownerInfo.imgData, function(a) {
            n.src = a
        }), j.show(), k.show(), c.$("#records-owner").show(), c.$("#records").show(), c.$("#records-tips").show(), e.refresh(h.RECORDS_NUM), f.needAppend = !0
    }, b.exit = function() {
        j.hide(), k.hide(), c.$("#records-owner").hide(), f.needAppend = !1
    }
}), define("index/page/shine", ["utils/utils", "appData", "index/tpl", "index/store", "index/records", "index/imageCompress"], function(a, b) {
    "use strict";
    var c = a("utils/utils"), d = a("appData").CONF, e = a("index/tpl"), f = a("index/store"), g = a("index/records"), h = a("index/imageCompress");
    c.$("#share-btn-ipaint").on("click", function() {
        f.log({pg: "shine",ck_id: "iPaint2"}, function() {
            window.location.replace(window.location.protocol + "//" + window.location.host + "/iloveu/a/index?uc_param_str=dnfrpfbivesscpnieisi")
        })
    }), b.enter = function() {
        h.decode(f.userInfo.imgData, function(a) {
            c.$("#shine-owner-img").src = f.ownerInfo.base64, c.$("#shine-friend-img").src = a, c.$("#shine-bar").innerHTML = e.friendBar(), c.$("#records-user").show(), c.$("#records").show(), c.$("#records-tips2").show(), c.$("#shine-module-img").className = "module-invite no-after", c.$("#page-shine").show(), g.refresh(d.RECORDS_NUM), f.needAppend = !0
        })
    }, b.exit = function() {
    }
}), define("index/records", ["utils/utils", "index/store", "index/tpl", "index/imageCompress"], function(a, b) {
    "use strict";
    function c() {
    }
    var d = a("utils/utils"), e = a("index/store"), f = a("index/tpl"), g = a("index/imageCompress");
    c.ul = d.$("#records"), c.nxt = 0, b.append = c.append = function(a) {
        function b(a, b) {
            g.decode(b, function(b) {
                d.$("#record" + a.id).src = b
            })
        }
        for (var h, i = c.ul, j = [], k = 0; a > k; )
            h = e.records[c.nxt + k], "object" == typeof h && (i.appendChild(f.getRecord(h)), h.imgData ? b(h, h.imgData) : j.push(h), d.$("#records-tips").hide(), d.$("#records-tips2").hide()), ++k;
        j.length && (e.master || "" !== e.userInfo.imgData) && e.getImgDatas(j, function(a) {
            for (k = a.length; k--; )
                b(j[k], a[k])
        }), c.nxt += a, c.status = 0
    }, b.refresh = c.refresh = function(a) {
        d.$("#records").innerHTML = "", c.nxt = 0, c.append(a)
    }
}), define("index/router", ["appData", "cmp/scroll", "index/store", "index/imageCompress", "index/allShare", "index/records", "utils/pf", "index/page/draw", "index/page/draw-friend", "index/page/result", "index/page/result-friend", "index/page/shine", "utils/ob", "index/download"], function(a, b) {
    "use strict";
    function c() {
    }
    var d = a("appData").CONF, e = a("cmp/scroll"), f = a("index/store"), g = a("index/imageCompress"), h = a("index/allShare"), i = a("index/records"), j = a("utils/pf");
    c.page = {draw: a("index/page/draw"),drawFriend: a("index/page/draw-friend"),result: a("index/page/result"),resultFriend: a("index/page/result-friend"),shine: a("index/page/shine")}, c.curPage = null, c.observer = null, c.store = null, c.setupObserver = function() {
        var b = this;
        b.observer = a("utils/ob"), b.observer.on("pageChange", function() {
            b.change()
        })
    }, c.change = function() {
        if (this.curPage && this.curPage.exit(), "wechat" === j() && h.wxInit(), "others" !== j() ? f.isShine() ? this.curPage = this.page.shine : f.master ? "" === f.ownerInfo.imgData ? this.curPage = this.page.draw : this.curPage = this.page.result : "" === f.userInfo.imgData ? this.curPage = this.page.drawFriend : this.curPage = this.page.resultFriend : this.curPage = this.page.draw, this.curPage.enter(), "uc" !== j()) {
            var b = a("index/download");
            b.init()
        }
    }, c.initImgData = function() {
        g.decode(f.ownerInfo.imgData, function(a) {
            f.ownerInfo.base64 = a, f.ownerInfo.matrix = g.decodeMatrix(a), c.change(), c.listenBottom()
        })
    }, c.listenBottom = function() {
        function a() {
            f.needAppend && i.append(d.RECORDS_NUM)
        }
        e.listenBottom(function() {
            a()
        })
    }, b.init = c.init = function() {
        c.setupObserver(), f.ownerInfo.imgData ? c.initImgData() : c.change()
    }
}), define("index/store", ["appData", "utils/lock", "cmp/net"], function(a, b, c) {
    "use strict";
    function d() {
        var a = this;
        this.master = this.ownerInfo.id === this.userInfo.id ? 1 : 0, this.gameStart = function() {
            a.userInfo.newUser = !1
        }, this.getImgDatas = function(a, b) {
            for (var c = [], d = 0; d < a.length; )
                c.push(a[d].id), ++d;
            g.get("getImgDatas", {ids: c}, function(a) {
                a.success && b(a.data)
            })
        }, this.log = function(b, c) {
            f("Store-log", function(d) {
                b = b || {}, c = c || function() {
                    }, b.uid = a.userInfo.id || 0, g.get("../log", b, function() {
                    c(), d()
                }, c)
            })
        }, this.isShine = function() {
            return /shine$/.test(window.location.pathname)
        }, this.getUrlSearch = function() {
            return "?" + ("" !== g.query("entry") ? "entry=" + g.query("entry") + "&" : "") + "uc_param_str=dnfrpfbivesscpnieisi"
        }
    }
    var e = a("appData").RENDER, f = a("utils/lock"), g = a("cmp/net");
    d.prototype = e, c.exports = new d
}), define("index/tpl", ["appData", "appData", "index/store"], function(a, b) {
    "use strict";
    var c = a("appData").MSG, d = a("appData").FILTER, e = a("index/store");
    b.getRecord = function(a) {
        var b = document.createElement("li"), f = d.countScore(a.dist), g = [];
        return g.push('<div class="avatar"><img src="' + d.avatar(a.avatar) + '" /></div>'), g.push('<div class="fit-wrap">'), g.push('    <div class="nickname">' + d.nick(a.nick) + "</div>"), g.push('    <div class="fit-per">'), g.push('        <span class="fit-txt">契合度</span>'), g.push('        <span class="fit-per-num">' + f + "%</span>"), g.push('        <span class="perbg"><em style="width:' + f + '%;"></em></span>'), g.push("    </div>"), g.push("</div>"), e.master || "" !== e.userInfo.imgData ? (g.push('<div class="fit-message">'), g.push("    <p>" + d.getScoreMsg(f, c.RECORDS) + "</p>"), g.push("</div>"), g.push('<div class="love-fit-pic" style="background:initial;">'), g.push('    <img class="record-owner" src="' + e.ownerInfo.base64 + '">'), g.push('    <img id="record' + a.id + '">')) : (g.push('<div class="fit-message">'), g.push("    <p>" + c.RECORDS_SECRET[Math.floor(Math.random() * c.RECORDS_SECRET.length)] + "</p>"), g.push("</div>"), g.push('<div class="love-fit-pic">')), g.push("</div>"), b.innerHTML = g.join(""), b
    }, b.friendBar = function() {
        var a = [];
        return a.push(e.isShine() ? "<h3>" + d.getScoreMsg(d.countScore(e.userInfo.dist), c.RECORDS) + "</h3>" : "<h3>" + d.getScoreMsg(d.countScore(e.userInfo.dist), c.LIKE) + "</h3>"), a.push('<div class="result">'), a.push('    <div class="avatar-left"><img src="' + d.avatar(e.ownerInfo.avatar) + '">'), a.push("    </div>"), a.push('    <div class="avatar-right"><img src="' + d.avatar(e.userInfo.avatar) + '">'), a.push("    </div>"), a.push('    <div class="txt">契合度<span>' + d.countScore(e.userInfo.dist) + "%</span>"), a.push("    </div>"), a.push('    <div class="percent"><em class="ani-per" style="width:' + d.countScore(e.userInfo.dist) + '%;"></em>'), a.push("    </div>"), a.push('    <ul class="nickname">'), a.push("        <li>" + d.nick(e.ownerInfo.nick) + "</li>"), a.push("        <li>" + d.nick(e.userInfo.nick) + "</li>"), a.push("    </ul>"), a.push("</div>"), a.join("")
    }
}), define("utils/lock", [], function(a, b, c) {
    "use strict";
    var d = {};
    c.exports = function(a, b) {
        d[a] || (d[a] = !0, b(function() {
            d[a] = !1
        }))
    }
}), define("utils/ob", ["cmp/observer"], function(a, b, c) {
    "use strict";
    c.exports = new (a("cmp/observer"))
}), define("utils/pf", [], function(a, b, c) {
    "use strict";
    var d, e = window.navigator.userAgent.toLowerCase(), f = new RegExp("qq/\\d+\\.\\d+\\.\\d+\\.\\d+", "i"), g = new RegExp("weibo__\\d+\\.\\d+\\.\\d+", "i");
    c.exports = function() {
        return d || (d = e.indexOf("ucbrowser") >= 0 ? "uc" : e.indexOf("micromessenger") >= 0 ? "wechat" : f.test(e) ? "qq" : g.test(e) ? "weibo" : "others"), d
    }
}), define("utils/utils", [], function(a, b, c) {
    "use strict";
    function d(a) {
        function b(a) {
            return a && (a.hide = function() {
                this.style.display = "none"
            }, a.show = function() {
                this.style.display = "block"
            }, a.txt = function(a) {
                this.innerText = a
            }, a.on = a.addEventListener), a
        }
        function c(a) {
            for (var c = a.length; c--; )
                a[c] = b(a[c]);
            return a.txt = function(b) {
                for (c = a.length; c--; )
                    a[c].txt(b)
            }, a.show = function(b) {
                for (c = a.length; c--; )
                    a[c].show(b)
            }, a.hide = function(b) {
                for (c = a.length; c--; )
                    a[c].hide(b)
            }, a.on = function(b) {
                for (c = a.length; c--; )
                    a[c].on(b)
            }, a
        }
        var d, e;
        return 0 === a.indexOf("#") ? (d = s.querySelector(a), b(d)) : (e = s.querySelectorAll(a), c(e), e)
    }
    function e(a, b) {
        function c() {
            t[a] = e, d()
        }
        function d() {
            b && b.call(e)
        }
        var e = t[a];
        e ? d() : (e = new Image, e.src = a, e.complete && c(), e.onload = c)
    }
    function f(a) {
        return a.replace(/(^\s*)|(\s*$)/g, "")
    }
    function g(a, b) {
        try {
            return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
        } catch (c) {
            return !1
        }
    }
    function h(a, b) {
        if (a.hasOwnProperty("length"))
            for (var c = 0; c < a.length; c++)
                h(a[c], b);
        else if (!g(a, b)) {
            var d = f(a.className) + " " + b;
            a.className = d
        }
    }
    function i(a, b) {
        if (a.hasOwnProperty("length"))
            for (var c = 0; c < a.length; c++)
                i(a[c], b);
        else {
            if ("undefined" == typeof b)
                return void (a.className = "");
            if (g(a, b)) {
                var d = new RegExp("(\\s|^)" + b + "(\\s|$)");
                a.className = a.className.replace(d, " ")
            }
        }
    }
    function j() {
        document.addEventListener("touchmove", function(a) {
            a.preventDefault()
        })
    }
    function k(a) {
        var b = /^((13[0-9])|(14[5,7])|(15[^4,\D])|(17[6-8])|(18[0-9]))\d{8}$/;
        return b.test(a) ? !0 : !1
    }
    function l(a) {
        var b = /^(133|149|153|170|177|180|181|189)\d{8}$/;
        return b.test(a) ? !0 : !1
    }
    function m() {
        return u.indexOf("iphone") > -1 || u.indexOf("ipad") > -1 ? !0 : !1
    }
    function n(a) {
        var b = s.createElement("iframe");
        b.style.display = "none", m() ? b.src = "ucbrowser://" + a : b.src = "ucweb://|" + a, b.src.indexOf("?") < 0 ? b.src += "?fromCallUc=true" : b.src += "&fromCallUc=true", s.body.appendChild(b)
    }
    function o(a) {
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
    }
    function p(a) {
        return a.replace(/[ ]/g, "").length <= 0
    }
    function q(a, b) {
        w[a] || (w[a] = !0, b())
    }
    var r = window, s = document, t = {}, u = r.navigator.userAgent.toLowerCase(), v = function(a, b) {
        var c = new Date(a), d = function(a) {
            return (10 > a ? "0" : "") + a
        };
        return b.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
            switch (a) {
                case "yyyy":
                    return d(c.getFullYear());
                case "MM":
                    return d(c.getMonth() + 1);
                case "mm":
                    return d(c.getMinutes());
                case "dd":
                    return d(c.getDate());
                case "HH":
                    return d(c.getHours());
                case "ss":
                    return d(c.getSeconds())
            }
        })
    }, w = [];
    c.exports = {$: d,preImage: e,trim: f,hasClass: g,addClass: h,removeClass: i,tMovePreDef: j,checkPhone: k,checkTelPhone: l,isIOS: m,callUcbrowser: n,format: v,cancelBubble: o,isInputNull: p,once: q}
});
