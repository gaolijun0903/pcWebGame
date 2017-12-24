~function(e, n) {
    function t(e, n, t) {
        if (e) if (e.length && e.length === +e.length) {
            for (var o = 0; o < e.length; o++) if (n.call(t, e[o], o, e) === !0) return
        } else for (var r in e) if (n.call(t, e[r], r, e) === !0) return
    }
    function o(e) {
        var n = [];
        return t(e,
        function(e, o) {
            i.isArray(e) ? t(e,
            function(e) {
                n.push(o + "=" + encodeURIComponent(e))
            }) : n.push(o + "=" + encodeURIComponent(e))
        }),
        n.join("&")
    }
    function r(e) {
        try {
            return JSON.parse(e)
        } catch(n) {
            try {
                return new Function("return " + e)()
            } catch(n) {}
        }
    }
    function a() {}
    if (!e.IO) {
        var i = {},
        c = Object.prototype.toString;
        t(["Array", "Boolean", "Function", "Object", "String", "Number"],
        function(e) {
            i["is" + e] = function(n) {
                return c.call(n) === "[object " + e + "]"
            }
        }),
        ~
        function(i) {
            function c(e, n) {
                i.isObject(e) && (n = e, e = n.url);
                var t, r, c, n = n || {},
                l = n.async !== !1,
                f = n.method || "GET",
                d = n.type || "text",
                v = n.encode || "UTF-8",
                p = n.timeout || 0,
                g = n.credential,
                m = n.data,
                y = n.scope,
                h = n.success || a,
                E = n.failure || a;
                return f = f.toUpperCase(),
                i.isObject(m) && (m = o(m)),
                "GET" === f && m && (e += ( - 1 === e.indexOf("?") ? "?": "&") + m),
                (t = s()) ? (r = !1, l && p > 0 && (c = setTimeout(function() {
                    r = !0,
                    t.abort()
                },
                p)), t.onreadystatechange = function() {
                    4 === t.readyState && (r ? E(t, "request timeout") : (u(t, d, h, E, y), clearTimeout(c)))
                },
                t.open(f, e, l), g && (t.withCredentials = !0), "POST" == f && t.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=" + v), t.send(m), t) : void 0
            }
            function u(e, t, o, a, i) {
                var c, u = e.status;
                if (u >= 200 && 300 > u) {
                    switch (t) {
                    case "text":
                        c = e.responseText;
                        break;
                    case "json":
                        c = r(e.responseText);
                        break;
                    case "xml":
                        c = e.responseXML
                    }
                    c !== n && o.call(i, c, u, e)
                } else a(e, e.status);
                e = null
            }
            var s = e.XMLHttpRequest ?
            function() {
                return new XMLHttpRequest
            }: function() {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            },
            l = {
                method: ["get", "post"],
                type: ["text", "json", "xml"],
                async: ["sync", "async"]
            };
            i.ajax = c,
            t(l,
            function(e, n) {
                t(e,
                function(e) {
                    i[e] = function(e, n) {
                        return function(t, o, r) {
                            return i.isObject(t) && (o = t),
                            i.isFunction(o) && (o = {
                                success: o
                            }),
                            i.isFunction(r) && (o = {
                                data: o
                            },
                            o.success = r),
                            "async" === e && (n = "async" === n ? !0 : !1),
                            o = o || {},
                            o[e] = n,
                            c(t, o)
                        }
                    } (n, e)
                })
            })
        } (i),
        ~
        function(t) {
            function r() {
                var e = "",
                n = [],
                t = 0,
                o = "0123456789ABCDEF";
                for (t = 0; 32 > t; t++) n[t] = o.substr(Math.floor(16 * Math.random()), 1);
                return n[12] = "4",
                n[16] = o.substr(3 & n[16] | 8, 1),
                e = "jsonp_" + n.join("")
            }
            function i(e, i) {
                function p(e) {
                    e ? v = !0 : E.call(L),
                    x.onload = x.onerror = x.onreadystatechange = null,
                    f && x.parentNode && (f.removeChild(x), x = null, u[w] = n)
                }
                function g() {
                    setTimeout(function() {
                        v || p()
                    },
                    d)
                }
                t.isObject(e) && (i = e, e = i.url);
                var i = i || {},
                e = -1 === e.indexOf("?") ? e + "?": e + "&",
                m = i.data,
                y = i.charset,
                h = i.success || a,
                E = i.failure || a,
                L = i.scope || u,
                b = i.timestamp,
                N = i.jsonpName || "callback",
                w = i.jsonpCallback || r();
                t.isObject(m) && (m = o(m));
                var x = l.createElement("script");
                c ? x.onreadystatechange = function() {
                    var e = this.readyState;
                    v || "loaded" != e && "complete" != e || p(!0)
                }: (x.onload = function() {
                    p(!0)
                },
                x.onerror = function() {
                    p()
                },
                s && g()),
                e += N + "=" + w,
                y && (x.charset = y),
                m && (e += "&" + m),
                b && (e += "&ts=", e += (new Date).getTime()),
                u[w] = function(e) {
                    h.call(L, e)
                },
                x.src = e,
                f.insertBefore(x, f.firstChild)
            }
            var c = !-[1],
            u = e,
            s = u.opera,
            l = u.document,
            f = l.head || l.getElementsByTagName("head")[0],
            d = 3e3,
            v = !1;
            t.jsonp = function(e, n, o) {
                return t.isObject(e) && (n = e),
                t.isFunction(n) && (n = {
                    success: n
                }),
                t.isFunction(o) && (n = {
                    data: n
                },
                n.success = o),
                i(e, n)
            }
        } (i),
        "function" == typeof define && define.amd ? define("IO", [],
        function() {
            return i
        }) : e.IO = i
    }
} (this);


!function() {
    var doc = document,
    query = {
        add: function() {
            var e = "addEventListener" in document;
            return e ?
            function(e, n, t) {
                e.addEventListener(n, t, !1)
            }: function(e, n, t) {
                e.attachEvent("on" + n, t)
            }
        } (),
        remove: function() {
            var e = "addEventListener" in document;
            return e ?
            function(e, n, t) {
                e.removeEventListener(n, t, !1)
            }: function(e, n, t) {
                e.detachEvent("on" + n, t)
            }
        } (),
        getEvent: function(e) {
            return e || window.event
        },
        getTarget: function(e) {
            var n = query.getEvent(e);
            return n.target || n.srcElement
        },
        preventDefault: function(e) {
            var n = query.getEvent(e);
            n.preventDefault ? n.preventDefault() : n.returnValue = !1
        },
        stopPropagation: function(e) {
            var n = query.getEvent(e);
            n.stopPropagation ? n.stopPropagation() : n.cancelBubble = !0
        },
        addClass: function(e, n) {
            e.classList ? e.classList.add(n) : -1 == e.className.indexOf(n) && (e.className += " " + n)
        },
        removeClass: function(node, classname) {
            if (node.classList) node.classList.remove(classname);
            else {
                var reg = eval("/\\s*" + classname + "/ig");
                node.className = node.className.replace(reg, "")
            }
        },
        getByClass: function(e, n) {
            var n = n ? n: document;
            return n.querySelectorAll ? n.querySelectorAll("." + e) : function(n) {
                for (var n = n.getElementsByTagName("*"), t = [], o = new RegExp("\\b" + e + "\\b", "i"), r = 0; r < n.length; r++) o.test(n[r].className) && t.push(n[r]);
                return t
            } (n)
        },
        getNext: function(e) {
            if (e.nextElementSibling) return e.nextElementSibling;
            for (var n = e.nextSibling; n && 1 !== n.nodeType;) n = n.nextSibling;
            return n
        },
        toArray: function(e) {
            var n = [];
            try {
                n = Array.prototype.slice.call(e, 0)
            } catch(t) {
                for (var o = 0,
                r = e.length; r > o; o++) n[o] = e[o]
            }
            return n
        },
        forEach: function() {
            return function(e, n) {
                if ("function" == typeof Array.prototype.forEach) e.forEach(function(t, o, r) {
                    n.call(e, t, o, r)
                });
                else for (var t = 0,
                o = e.length; o > t; t++) n.call(e, e[t], t, e)
            }
        } ()
    },
    hotRank = function() {
        var e = query.getByClass("rank-item")[0],
        n = query.getByClass("aside-fixed")[0],
        t = function() {
            for (var e = n,
            t = e.offsetTop; e.offsetParent;) e = e.offsetParent,
            t += e.offsetTop;
            return t
        } (),
        o = function(e) {
            "cur" != o.className && query.forEach(query.toArray(e.parentNode.children),
            function(n) {
                n.className = n == e ? "cur": ""
            })
        },
        r = function(e) {
            var n = query.getTarget(e);
            return "li" == n.nodeName.toLowerCase() ? void o(n) : "h4" == n.nodeName.toLowerCase() || "span" == n.nodeName.toLowerCase() || "i" == n.nodeName.toLowerCase() ? void o(n.parentNode) : "a" == n.nodeName.toLowerCase() && "h4" == n.parentNode.nodeName.toLowerCase() ? void o(n.parentNode.parentNode) : void 0
        };
        query.add(e, "mouseover", r),
        query.add(window, "scroll",
        function() {
            var e = doc.body.scrollTop || doc.documentElement.scrollTop;
            e > t ? -1 == n.className.indexOf("cur") && query.addClass(n, "cur") : n.className.indexOf("cur") > -1 && query.removeClass(n, "cur")
        })
    } ()
} ();